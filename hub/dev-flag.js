/* ── LOBE LIMPET: "this is the dev site" marker ─────────────
   On the development copy (carygibbs.com/hub, or a local server) every
   page gets: "DEV ·" at the start of the tab title, a purple DEV tab
   icon, a purple browser bar (Safari and phones colour it from
   theme-color), a thin striped line along the top and a small DEV
   badge in the corner. On the live site (lobelimpet.com) it does nothing. */
(function () {
  var h = location.hostname;
  var dev = /(^|\.)carygibbs\.com$/.test(h) || h === 'localhost' || h === '127.0.0.1';
  if (!dev) return;
  var C = '#7c3aed';
  window.LL_DEV = true;

  // Tab title (kept when pages change their title later)
  // (only once the page's own <title> exists: setting it earlier would replace it)
  var mark = function () { if (document.title && document.title.indexOf('DEV · ') !== 0) document.title = 'DEV · ' + document.title; };
  document.addEventListener('DOMContentLoaded', function () {
    mark();
    var t = document.querySelector('title');
    if (t && window.MutationObserver) new MutationObserver(mark).observe(t, { childList: true, characterData: true, subtree: true });
  });

  // Tab icon
  var icon = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="' + C + '"/><text x="16" y="21" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">DEV</text></svg>');
  var setIcons = function () {
    document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach(function (l) { l.remove(); });
    var l = document.createElement('link'); l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = icon; document.head.appendChild(l);
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
    m.content = C;
  };
  if (document.head) setIcons(); else document.addEventListener('DOMContentLoaded', setIcons);

  // Stripe and corner badge (never in the way: clicks pass through)
  var css = '.ll-dev-stripe{position:fixed;top:0;left:0;right:0;height:4px;z-index:99999;pointer-events:none;background:repeating-linear-gradient(45deg,' + C + ' 0 10px,#c4b5fd 10px 20px)}' +
    '.ll-dev-badge{position:fixed;left:10px;bottom:10px;z-index:99999;pointer-events:none;background:' + C + ';color:#fff;font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.08em;padding:5px 8px;border-radius:999px;opacity:.85;box-shadow:0 2px 6px rgba(0,0,0,.2)}' +
    '@media print{.ll-dev-stripe,.ll-dev-badge{display:none}}';
  var add = function () {
    if (document.getElementById('ll-dev-style')) return;
    var s = document.createElement('style'); s.id = 'll-dev-style'; s.textContent = css; document.head.appendChild(s);
    var a = document.createElement('div'); a.className = 'll-dev-stripe'; a.setAttribute('aria-hidden', 'true');
    var b = document.createElement('div'); b.className = 'll-dev-badge'; b.textContent = 'DEV'; b.title = 'Development site';
    document.body.appendChild(a); document.body.appendChild(b);
  };
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
