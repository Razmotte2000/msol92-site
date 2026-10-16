# MSOL — mémo technique

Tout ce qu'il faut pour reprendre le site sans rien chercher.
Aucun mot de passe ici : uniquement des identifiants publics ou semi-publics.

---

## Domaines

| | |
|---|---|
| **Domaine canonique** | `https://msol92.com` |
| Ancien domaine | `msol92.fr` — **ne résout plus en DNS**, abandonné en 09/2026 |
| www | redirigé vers non-www par `.htaccess` |

Le `.htaccess` force en **une seule redirection 301** : HTTPS + non-www + `msol92.com`.
Si `msol92.fr` est un jour repointé sur cet hébergement, il sera redirigé automatiquement.

Registrar de msol92.com : Hostinger (vérifié par RDAP le 2026-10-16), mentionné ainsi
dans les mentions légales.

**Google Analytics ne se charge qu'après consentement** (`consent.js`, partagé par
toutes les pages). Ne jamais remettre la balise gtag en dur dans un `<head>` : sans
consentement préalable, c'est une infraction CNIL. Polices auto-hébergées dans `fonts/`.

## Hébergement et déploiement

| | |
|---|---|
| Hébergeur | Hostinger (International Ltd, Larnaca, Chypre) |
| Méthode | dépôt Git branché sur hPanel — `git push` puis déploiement |
| Dépôt | `github.com/Razmotte2000/msol92-site` |
| Dossier local | `C:\Users\FlowUP\MSOL92` |
| Auteur des commits | Razmotte2000 &lt;pleniere_endroit3p@icloud.com&gt; |
| Ancien hébergeur | Vercel (`vercel.json` conservé, inutilisé) |

**Le bac à sable Cowork n'a pas d'accès réseau** : `git push` doit être lancé
depuis un terminal Windows normal, pas depuis l'assistant.

## Comptes Google — tous sous `msol.said@gmail.com`

| Service | Identifiant | Où |
|---|---|---|
| **Analytics 4** | `G-9PF2ZZW311` — propriété « MSOL — msol92.com », flux « Site MSOL » | analytics.google.com |
| **Search Console** | propriété préfixe d'URL `https://msol92.com/` | search.google.com/search-console |
| Validation SC | balise meta + fichier `google2ed55e933f841caa.html` | racine du site |
| **Fiche d'établissement** | ID `685866782808159363` | business.google.com |
| Chaîne YouTube | `@parqueteurmsol7296` | — |

**Ne jamais supprimer** la balise `google-site-verification` du `<head>` ni le
fichier `google2ed55e933f841caa.html` : ce sont les preuves de propriété
Search Console. Le `.htaccess` exclut explicitement ce fichier de la
redirection des `.html`.

## Fiche Google d'établissement

- Nom : **MSOL** — Service de pose de parquet à Levallois-Perret
- 7 rue Victor Hugo, 92300 Levallois-Perret
- Note : 5,0 sur 68 avis
- Site web : `https://msol92.com/` (corrigé en 09/2026 — pointait sur une URL de préversion Vercel)
- Téléphone `06 35 26 13 63` rendu public en 09/2026 (il était masqué par un réglage de la fiche)

## Coordonnées de l'entreprise (NAP — doit rester identique partout)

```
MSOL — SAS
7 Rue Victor Hugo, 92300 Levallois-Perret
06 35 26 13 63
Msol.said@gmail.com
SIRET 847 961 620 00014 · RCS Nanterre · TVA FR23847961620 · APE 4333Z
Directrice de la publication : Hasna Maadarni
```

Toute divergence entre le site, la fiche Google et les annuaires (Houzz,
PagesJaunes, AlloVoisins…) affaiblit le référencement local. Une seule
écriture, partout.

---

## Structure du projet

```
index.html                    accueil, one-page (styles et scripts inline)
blog/index.html               index du blog
blog/_template.html           gabarit d'article
content/pages.mjs             CONTENU des pages services et zones
build-pages.mjs               génère ces pages en HTML
build-sitemap.mjs             génère sitemap.xml et robots.txt
services/*/index.html         GÉNÉRÉ — ne pas éditer
parqueteur-paris/index.html   GÉNÉRÉ — ne pas éditer
sitemap.xml, robots.txt       GÉNÉRÉS — ne pas éditer
.htaccess                     redirections Apache (Hostinger)
vercel.json                   vestige Vercel, sans effet chez Hostinger
CNAME                         msol92.com
```

**Site statique, sans build ni dépendances.** Il n'y a pas de Next.js :
un `sitemap.ts` ou un `robots.ts` n'y serait jamais exécuté. Les scripts
`build-*.mjs` en tiennent lieu et s'exécutent à la main.

### Modifier une page service ou la page Paris

1. éditer `content/pages.mjs`
2. `node build-pages.mjs && node build-sitemap.mjs`
3. commit + push

### Ajouter un article de blog

1. dupliquer `blog/_template.html` en `blog/mon-article.html`, remplacer les `{{...}}`
2. `node build-sitemap.mjs` — l'article entre dans le sitemap tout seul
3. au premier article seulement : dans `blog/index.html`, repasser la balise
   `robots` de `noindex, follow` à `index, follow` (le sitemap ajoute `/blog/` tout seul)
4. commit + push

### Développement local

```bash
python -m http.server 8765
```

---

## Pièges connus

- **`.htaccess`** : la redirection des `.html` vers l'accueil est limitée au
  premier niveau (`^/[^/]+\.html$`). Sans cette condition, `/services/` et
  `/blog/` seraient renvoyés vers l'accueil. À ne pas « simplifier ».
- **Verrous git** : le dossier monté dans l'assistant Cowork n'autorise pas
  la suppression de fichiers, donc git ne peut pas nettoyer ses `.git/*.lock`.
  Les verrous périmés sont écartés dans `.git/_stale-locks/`. Sans effet
  depuis un terminal Windows normal.
- **`_to_delete/`** : dossier tampon pour les fichiers que l'assistant ne peut
  pas supprimer. Ignoré par git, à vider à la main de temps en temps.
- **Entité schema** : l'accueil définit `@id: https://msol92.com/#organization`.
  Toutes les pages générées y renvoient via `provider`. Si vous supprimez cet
  `@id` de l'accueil, les données structurées des 5 autres pages pointent dans
  le vide — sans erreur visible.
- **Ne pas ajouter `aggregateRating`** au schema : Google interdit le balisage
  d'avis auto-déclarés pour un établissement sur son propre site. La note peut
  rester affichée en clair sur la page, c'est le balisage qui est proscrit.
- **Pas de `geo` ni d'`openingHoursSpecification`** dans le JSON-LD : MSOL est un
  artisan qui se déplace, sans local à visiter ni horaires d'accueil. Ne pas les
  réintroduire « parce que le référentiel SEO les demande » — publier des horaires
  fictifs est pire que ne rien publier.
- **Fins de ligne** : les fichiers sont en LF dans le dépôt. Un éditeur qui
  réécrit en CRLF fait apparaître tout le fichier comme modifié.
