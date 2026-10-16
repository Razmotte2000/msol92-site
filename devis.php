<?php
// Formulaire de devis : envoie la demande par e-mail depuis contact@msol92.com vers la boîte de MSOL.
// Rien n'est enregistré sur le serveur. Répond en JSON au script de la page.

const TO   = 'Msol.said@gmail.com';
const FROM = 'contact@msol92.com';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $code, bool $ok, string $msg = ''): void {
  http_response_code($code);
  echo json_encode(['ok' => $ok, 'error' => $msg], JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, false, 'Méthode non autorisée.');

// Piège à robots : champ invisible rempli. On répond « ok » pour ne pas renseigner le robot.
if (($_POST['site'] ?? '') !== '') reply(200, true);
$started = (int)($_POST['t'] ?? 0);
if ($started > 0 && time() - intdiv($started, 1000) < 3) reply(422, false, 'Merci de patienter quelques secondes avant d’envoyer.');

// Limite : 3 envois par IP toutes les 10 minutes. Seule une empreinte de l'IP est gardée, 10 minutes.
$rate = sys_get_temp_dir() . '/msol-devis-' . hash('sha256', 'msol92' . ($_SERVER['REMOTE_ADDR'] ?? '')) . '.txt';
$recent = array_filter(
  is_file($rate) ? array_map('intval', file($rate, FILE_IGNORE_NEW_LINES)) : [],
  fn($t) => $t > time() - 600
);
if (count($recent) >= 3) reply(429, false, 'Trop de demandes envoyées. Merci de réessayer dans quelques minutes ou d’appeler le 06 35 26 13 63.');

// Une ligne : retire les retours à la ligne (pas d'injection d'en-têtes) et borne la longueur.
function line(string $k, int $max): string {
  $v = trim(preg_replace('/[\r\n\t]+/', ' ', (string)($_POST[$k] ?? '')));
  return mb_substr($v, 0, $max);
}

$nom        = line('nom', 100);
$tel        = line('telephone', 30);
$email      = line('email', 254);
$prestation = line('prestation', 60);
$surface    = line('surface', 30);
$ville      = line('ville', 80);
$message    = mb_substr(trim((string)($_POST['message'] ?? '')), 0, 5000);

if ($nom === '' || $prestation === '') reply(422, false, 'Merci d’indiquer votre nom et la prestation souhaitée.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, false, 'Adresse e-mail invalide.');

$subject = 'Demande de devis — ' . $prestation . ' (' . $nom . ')';
$body = "Nouvelle demande de devis reçue sur msol92.com\n\n"
  . "Nom : $nom\nTéléphone : $tel\nE-mail : $email\nPrestation : $prestation\n"
  . "Surface : $surface\nVille : $ville\n\n----- Message du client -----\n$message\n----- Fin du message -----\n\n"
  . "— Répondez directement à ce mail pour écrire au client.\n";

$headers = [
  'From' => 'MSOL - site web <' . FROM . '>',
  'Reply-To' => $email,
  'MIME-Version' => '1.0',
  'Content-Type' => 'text/plain; charset=UTF-8',
  'Content-Transfer-Encoding' => '8bit',
];

$sent = mail(TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . FROM);
if (!$sent) reply(500, false, 'L’envoi a échoué.');
$recent[] = time();
@file_put_contents($rate, implode("\n", $recent), LOCK_EX);
reply(200, true);
