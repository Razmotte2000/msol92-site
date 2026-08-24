# MSOL92 — site vitrine

Site vitrine de MSOL (artisan parqueteur, Levallois-Perret) — <https://msol92.fr>

## Stack

Site statique sans build : un seul fichier `index.html` (HTML/CSS/JS natif), les images
dans `images/`. Aucune dépendance, aucun `npm install`, aucune étape de compilation.

```
index.html      page d'accueil (styles et scripts inline)
blog/           index du blog et _template.html pour les articles
images/         photos et logos (.webp servis, .png/.jpg sources)
sitemap.xml     sitemap : accueil + /blog/
robots.txt      indexation ouverte, crawlers IA explicitement autorisés (GEO)
CNAME           domaine personnalisé pour GitHub Pages
vercel.json     redirections + cache — utilisé par Vercel uniquement
.htaccess       équivalent Apache des règles ci-dessus — pour Hostinger
```

## Développement local

Le site étant statique, il suffit de servir le dossier :

```bash
python -m http.server 8765
```

Puis ouvrir <http://localhost:8765>.

## Déploiement

**Vercel** — `vercel --prod` depuis la racine. `vercel.json` gère les redirections
`.html` et le cache long des images ; `.vercelignore` exclut les sources non servies.

**Hostinger** — déposer le contenu du dépôt dans `public_html/` (ou brancher le dépôt
Git via hPanel). `.htaccess` reprend les mêmes règles que `vercel.json` : redirection
des URLs `.html`, HTTPS forcé, cache immuable d'un an sur les images, compression.

## À vérifier lors d'un changement d'hébergeur

Les mentions légales (bas de `index.html`) nomment l'hébergeur, ce qu'impose la LCEN.
Elles indiquent actuellement **Vercel Inc.** En cas de migration vers Hostinger, y
substituer la raison sociale et l'adresse de l'hébergeur.
