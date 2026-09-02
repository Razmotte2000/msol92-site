#!/usr/bin/env node
/**
 * build-pages.mjs — génère les pages services et zones à partir de content/pages.mjs
 *
 * Site statique : ces pages sont écrites sur disque, pas rendues à la volée.
 * Après modification de content/pages.mjs :
 *     node build-pages.mjs && node build-sitemap.mjs
 *
 * Les fichiers produits sont marqués « généré » : ne pas les éditer à la main,
 * la prochaine exécution écrasera les retouches.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, BIZ, PAGES } from './content/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const GA_ID = 'G-9PF2ZZW311';

// Zones desservies, alignees sur le JSON-LD de l'accueil (entites Wikipedia
// pour que les moteurs et les systemes d'IA relient la page a un lieu reel).
const AREA_SERVED = [
  { '@type': 'City', name: 'Paris', sameAs: 'https://fr.wikipedia.org/wiki/Paris' },
  { '@type': 'City', name: 'Levallois-Perret', sameAs: 'https://fr.wikipedia.org/wiki/Levallois-Perret' },
  { '@type': 'City', name: 'Neuilly-sur-Seine', sameAs: 'https://fr.wikipedia.org/wiki/Neuilly-sur-Seine' },
  { '@type': 'City', name: 'Boulogne-Billancourt', sameAs: 'https://fr.wikipedia.org/wiki/Boulogne-Billancourt' },
  { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine', sameAs: 'https://fr.wikipedia.org/wiki/Hauts-de-Seine' },
  { '@type': 'AdministrativeArea', name: 'Île-de-France', sameAs: 'https://fr.wikipedia.org/wiki/%C3%8Ele-de-France' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');

const STYLE = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--cream:#FDFBF7;--cream-2:#F5EFE5;--ink:#1A1612;--ink-soft:#4A413A;--ink-mute:#8A7F75;
--espresso:#2A1F18;--gold:#B8924C;--gold-soft:#D4B27A;--hairline:rgba(26,22,18,.08)}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,Segoe UI,sans-serif;font-weight:300;
background:var(--cream);color:var(--ink-soft);line-height:1.75;font-size:1.0625rem;
-webkit-font-smoothing:antialiased}
img{max-width:100%;height:auto;display:block}
a{color:inherit}
.wrap{max-width:74ch;margin:0 auto;padding:0 24px}
h1,h2,h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;color:var(--ink);
line-height:1.15;letter-spacing:-.01em}
h1{font-size:clamp(2.1rem,5.5vw,3.4rem);margin-bottom:.5em}
h2{font-size:clamp(1.5rem,3.4vw,2.1rem);margin:2.4em 0 .7em}
h3{font-size:1.2rem;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;margin:2em 0 .4em}
p{margin-bottom:1.1em}
p a{color:var(--ink);text-decoration:underline;text-decoration-color:var(--gold-soft);
text-underline-offset:3px}
p a:hover{text-decoration-color:var(--gold)}
strong{font-weight:600;color:var(--ink)}
.site-head{border-bottom:1px solid var(--hairline);background:var(--cream);position:sticky;top:0;z-index:10}
.site-head .wrap{max-width:1100px;display:flex;align-items:center;justify-content:space-between;
gap:16px;padding-top:14px;padding-bottom:14px}
.site-head img{width:40px;height:40px}
.head-cta{font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
text-decoration:none;color:var(--ink);border:1px solid var(--ink);border-radius:100px;
padding:9px 18px;white-space:nowrap;transition:background .2s,color .2s}
.head-cta:hover{background:var(--ink);color:var(--cream)}
.crumb{font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-mute);
padding:26px 0 0}
.crumb a{text-decoration:none;color:var(--ink-mute)}
.crumb a:hover{color:var(--gold)}
.hero{padding:14px 0 8px}
.lead{font-size:1.2rem;color:var(--ink-soft);border-left:2px solid var(--gold-soft);
padding-left:20px;margin:1.4em 0 0}
.hero+h2{margin-top:1.6em}
.brief{background:var(--cream-2);border:1px solid rgba(26,22,18,.07);border-radius:3px;
padding:22px 26px;margin:2.2em 0 .6em}
.brief h2{margin:0 0 .45em;font-size:clamp(1.25rem,2.6vw,1.6rem)}
.brief p{margin:0;font-size:1.02rem}
.brief+h2{margin-top:2.2em}
.faq{margin-top:3.2em;border-top:1px solid var(--hairline);padding-top:.6em}
.faq h3{font-size:1.05rem}
.cta-band{background:var(--espresso);color:var(--cream);margin-top:4em;padding:56px 0}
.cta-band h2{color:var(--cream);margin:0 0 .4em}
.cta-band p{color:rgba(253,251,247,.72)}
.cta-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:1.6em}
.btn{display:inline-block;text-decoration:none;border-radius:100px;padding:14px 26px;
font-size:.85rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.btn-gold{background:var(--gold);color:#1A1612}
.btn-gold:hover{background:var(--gold-soft)}
.btn-ghost{border:1px solid rgba(253,251,247,.35);color:var(--cream)}
.btn-ghost:hover{border-color:var(--cream)}
.also{margin-top:3.4em;border-top:1px solid var(--hairline);padding-top:1.6em}
.also h2{font-size:1.25rem;margin:0 0 .6em}
.also ul{list-style:none;display:grid;gap:8px}
.also a{text-decoration:none;color:var(--ink);border-bottom:1px solid var(--hairline);
padding-bottom:8px;display:block}
.also a:hover{color:var(--gold)}
.site-foot{border-top:1px solid var(--hairline);margin-top:0;padding:40px 0;
font-size:.85rem;color:var(--ink-mute)}
.site-foot .wrap{max-width:1100px}
.site-foot a{color:var(--ink-soft)}
.site-foot p{margin-bottom:.5em}
`.trim();

function jsonld(page, others) {
  const url = `${SITE}/${page.slug}/`;
  const biz = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE}/#organization`,
    name: BIZ.name,
    legalName: BIZ.legal,
    url: `${SITE}/`,
    telephone: BIZ.telRaw,
    email: BIZ.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BIZ.street,
      addressLocality: BIZ.city,
      postalCode: BIZ.zip,
      addressRegion: BIZ.region,
      addressCountry: 'FR',
    },
  };
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.serviceName,
      serviceType: page.serviceName,
      provider: biz,
      areaServed: AREA_SERVED,
      url,
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: page.title, item: url },
      ],
    },
  ];
  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: strip(f.a) },
      })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function render(page, others) {
  const url = `${SITE}/${page.slug}/`;
  const depth = page.slug.split('/').length;
  const brief = page.brief
    ? `<section class="brief">\n<h2>${esc(page.brief.q)}</h2>\n<p>${page.brief.a}</p>\n</section>`
    : '';
  const body = page.sections
    .map((s) => `<h2>${esc(s.h)}</h2>\n` + s.p.map((p) => `<p>${p}</p>`).join('\n'))
    .join('\n\n');
  const faq = page.faq?.length
    ? `<section class="faq">\n<h2>Questions fréquentes</h2>\n` +
      page.faq.map((f) => `<h3>${esc(f.q)}</h3>\n<p>${f.a}</p>`).join('\n') +
      `\n</section>`
    : '';
  const links = others
    .filter((o) => o.slug !== page.slug)
    .map((o) => `<li><a href="/${o.slug}/">${esc(o.title)}</a></li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>${esc(page.metaTitle)}</title>
<meta name="description" content="${esc(page.metaDesc)}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#0E0B08" />
<link rel="icon" type="image/png" href="/images/logo-msol-sm.png" />
<link rel="apple-touch-icon" href="/images/logo-msol-sm.png" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="MSOL" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:title" content="${esc(page.metaTitle)}" />
<meta property="og:description" content="${esc(page.metaDesc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE}${BIZ.hero}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(page.metaTitle)}" />
<meta name="twitter:description" content="${esc(page.metaDesc)}" />
<meta name="twitter:image" content="${SITE}${BIZ.hero}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
${STYLE}
</style>
<script type="application/ld+json">
${jsonld(page, others)}
</script>
<!-- Google tag (gtag.js) — GA4 ${GA_ID} -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
</head>
<body>
<!-- Page générée par build-pages.mjs — éditer content/pages.mjs, pas ce fichier. -->
<header class="site-head">
  <div class="wrap">
    <a href="/" aria-label="MSOL — accueil"><img src="/images/logo-msol-sm.png" alt="MSOL" width="40" height="40" /></a>
    <a class="head-cta" href="/#quote">Devis gratuit</a>
  </div>
</header>

<main>
  <div class="wrap">
    <p class="crumb"><a href="/">Accueil</a> — ${esc(page.title)}</p>
    <div class="hero">
      <h1>${esc(page.h1)}</h1>
      <p class="lead">${page.lead}</p>
    </div>

${brief}

${body}

${faq}

    <section class="also">
      <h2>Voir aussi</h2>
      <ul>
${links}
        <li><a href="/">Accueil — MSOL, parqueteur en Île-de-France</a></li>
      </ul>
    </section>
  </div>

  <section class="cta-band">
    <div class="wrap">
      <h2>Parlons de votre projet</h2>
      <p>Visite et devis gratuits, à Paris comme en proche couronne. Réponse sous 24 h.</p>
      <div class="cta-btns">
        <a class="btn btn-gold" href="tel:${BIZ.telRaw}">${BIZ.tel}</a>
        <a class="btn btn-ghost" href="/#quote">Demander un devis</a>
      </div>
    </div>
  </section>
</main>

<footer class="site-foot">
  <div class="wrap">
    <p><strong>MSOL</strong> — artisan parqueteur · ${BIZ.street}, ${BIZ.zip} ${BIZ.city}</p>
    <p><a href="tel:${BIZ.telRaw}">${BIZ.tel}</a> · <a href="mailto:${BIZ.email}">${BIZ.email}</a></p>
    <p><a href="/">Accueil</a> · <a href="/blog/">Blog</a> · <a href="/#legal">Mentions légales</a></p>
  </div>
</footer>
</body>
</html>
`;
}

let n = 0;
for (const page of PAGES) {
  const dir = join(ROOT, page.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), render(page, PAGES), 'utf8');
  console.log(`  /${page.slug}/`);
  n++;
}
console.log(`${n} page(s) générée(s).`);
