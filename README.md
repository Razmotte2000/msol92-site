# MSOL — site vitrine

Site vitrine de MSOL (artisan parqueteur, Levallois-Perret) — <https://msol92.com>

## Stack

Site statique sans build : un seul fichier `index.html` (HTML/CSS/JS natif), les images
dans `images/`. Aucune dépendance, aucun `npm install`, aucune étape de compilation.

```
index.html      page d'accueil (styles et scripts inline)
blog/           index du blog et _template.html pour les articles
images/         photos et logos (.webp servis, .png/.jpg sources)
sitemap.xml     sitemap : accueil + /blog/ — GÉNÉRÉ, ne pas éditer à la main
robots.txt      indexation ouverte, crawlers IA autorisés (GEO) — GÉNÉRÉ aussi
build-sitemap.mjs  régénère sitemap.xml + robots.txt (`node build-sitemap.mjs`)
CNAME           domaine personnalisé pour GitHub Pages
vercel.json     redirections + cache — utilisé par Vercel uniquement
.htaccess       équivalent Apache des règles ci-dessus — pour Hostinger
```

## SEO — après chaque ajout d'article

```bash
node build-sitemap.mjs
```

Le script relit `blog/*.html` et réécrit `sitemap.xml` et `robots.txt` sur
`https://msol92.com`. Le site est statique : il n'y a pas de `sitemap.ts` /
`robots.ts` (conventions Next.js) — ce script en tient lieu.

Ne pas supprimer `google2ed55e933f841caa.html` ni la balise
`google-site-verification` du `<head>` : ce sont les preuves de propriété
Search Console.

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
