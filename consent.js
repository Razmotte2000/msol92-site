/* Consentement cookies (CNIL) : Google Analytics ne se charge qu'après « Accepter ».
 * Le choix est gardé 6 mois puis redemandé. Refuser est aussi simple qu'accepter.
 * Tout lien portant l'attribut data-cookies rouvre le bandeau (retrait du consentement). */
(function () {
  var GA_ID = 'G-9PF2ZZW311';
  var KEY = 'msol-consent';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182;

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      return c && Date.now() - c.t < MAX_AGE ? c.v : null;
    } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  function loadGA() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Retrait : efface les cookies _ga déjà posés.
  function clearGA() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') === 0) {
        var host = location.hostname;
        document.cookie = name + '=; Max-Age=0; path=/';
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + host.replace(/^www\./, '');
      }
    });
  }

  var CSS = '#msol-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:560px;margin:0 auto;' +
    'background:#1A1612;color:#FDFBF7;border-radius:14px;padding:20px 22px;box-shadow:0 20px 60px -20px rgba(0,0,0,.5);' +
    "font:300 .9rem/1.6 'Plus Jakarta Sans',system-ui,sans-serif}" +
    '#msol-cookies p{color:rgba(253,251,247,.85);margin:0 0 14px}' +
    '#msol-cookies a{color:#D4B27A;text-decoration:underline}' +
    '#msol-cookies .b{display:flex;gap:10px;flex-wrap:wrap}' +
    '#msol-cookies button{flex:1 1 140px;padding:11px 16px;border-radius:999px;font-weight:500;font-size:.85rem;font-family:inherit;cursor:pointer;' +
    'border:1px solid rgba(253,251,247,.35);background:transparent;color:#FDFBF7}' +
    '#msol-cookies button:focus-visible{outline:2px solid #D4B27A;outline-offset:2px}';

  function banner() {
    if (document.getElementById('msol-cookies')) return;
    if (!document.getElementById('msol-cookies-css')) {
      var st = document.createElement('style');
      st.id = 'msol-cookies-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    var d = document.createElement('div');
    d.id = 'msol-cookies';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookies');
    d.innerHTML = '<p>Avec votre accord, Google (Google Ireland Ltd) dépose des cookies Google Analytics pour nous permettre de mesurer la fréquentation du site, de façon statistique. ' +
      'Refuser n’a aucune conséquence sur votre navigation. <a href="/#legal">En savoir plus</a></p>' +
      '<div class="b"><button type="button" data-v="denied">Refuser</button>' +
      '<button type="button" data-v="granted">Accepter</button></div>';
    d.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-v');
      if (!v) return;
      save(v);
      d.remove();
      if (v === 'granted') loadGA(); else clearGA();
    });
    document.body.appendChild(d);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cookies]');
    if (a) { e.preventDefault(); banner(); }
  });

  var v = read();
  if (v === 'granted') loadGA();
  else if (v === null) {
    if (document.body) banner();
    else document.addEventListener('DOMContentLoaded', banner);
  }
})();
