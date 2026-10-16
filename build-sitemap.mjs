#!/usr/bin/env node
/**
 * build-sitemap.mjs — génère sitemap.xml et robots.txt pour msol92.com
 *
 * Site statique (Apache/Hostinger) : pas de framework, pas de build.
 * Ce script remplace un `sitemap.ts` / `robots.ts` Next.js — il produit
 * directement les fichiers que Google ira lire.
 *
 * Usage :  node build-sitemap.mjs
 * À relancer après chaque ajout d'article dans blog/.
 */

import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://msol92.com';

/** Crawlers IA/LLM explicitement autorisés (optimisation GEO). */
const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'GoogleOther',
  'cohere-ai', 'Bytespider', 'Applebot-Extended',
  'meta-externalagent', 'Diffbot',
];

const isoDay = (d) => new Date(d).toISOString().slice(0, 10);

async function lastmod(relPath) {
  try {
    return isoDay((await stat(join(ROOT, relPath))).mtime);
  } catch {
    return isoDay(Date.now());
  }
}

async function collect() {
  const pages = [
    { loc: `${SITE}/`, lastmod: await lastmod('index.html'), changefreq: 'weekly', priority: '1.0' },
  ];

  // Pages generees par build-pages.mjs (services, zones)
  try {
    const { PAGES } = await import('./content/pages.mjs');
    for (const g of PAGES) {
      pages.push({
        loc: `${SITE}/${g.slug}/`,
        lastmod: await lastmod(`${g.slug}/index.html`),
        changefreq: 'monthly',
        priority: g.isHub ? '0.9' : '0.8',
      });
    }
  } catch { /* content/pages.mjs absent */ }

  // Articles de blog : tout blog/*.html sauf index et les templates (_*.html)
  let entries = [];
  try {
    entries = await readdir(join(ROOT, 'blog'));
  } catch { /* pas de dossier blog */ }

  for (const file of entries.sort()) {
    if (!file.endsWith('.html')) continue;
    if (file === 'index.html' || file.startsWith('_')) continue;
    pages.push({
      loc: `${SITE}/blog/${file}`,
      lastmod: await lastmod(`blog/${file}`),
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
  // L'index du blog n'entre au sitemap qu'avec au moins un article (sinon page vide, en noindex).
  if (pages.some((p) => p.loc.startsWith(`${SITE}/blog/`))) {
    pages.splice(1, 0, { loc: `${SITE}/blog/`, lastmod: await lastmod('blog/index.html'), changefreq: 'weekly', priority: '0.8' });
  }
  return pages;
}

function renderSitemap(pages) {
  const urls = pages.map((p) => [
    '  <url>',
    `    <loc>${p.loc}</loc>`,
    `    <lastmod>${p.lastmod}</lastmod>`,
    `    <changefreq>${p.changefreq}</changefreq>`,
    `    <priority>${p.priority}</priority>`,
    '  </url>',
  ].join('\n')).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  const ai = AI_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');
  return `# MSOL — robots.txt
# Généré par build-sitemap.mjs — ne pas éditer à la main.

User-agent: *
Allow: /

# Fichiers de travail : inutiles pour l'index
Disallow: /blog/_template.html

# Crawlers IA / LLM explicitement bienvenus (optimisation GEO)
${ai}

Sitemap: ${SITE}/sitemap.xml
`;
}

const pages = await collect();
await writeFile(join(ROOT, 'sitemap.xml'), renderSitemap(pages), 'utf8');
await writeFile(join(ROOT, 'robots.txt'), renderRobots(), 'utf8');

console.log(`sitemap.xml — ${pages.length} URL(s) :`);
for (const p of pages) console.log(`  ${p.loc}  (lastmod ${p.lastmod})`);
console.log('robots.txt — écrit.');
