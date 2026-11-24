// ============================================================
// LOBE LIMPET: help in place
// Links to a Help answer (help.html#something) open that answer in a
// panel over the current page, so nobody loses their place (mid-quiz,
// mid-form). Section links (e.g. #flashcards) show that section's
// questions. "Open full Help" still goes to the Help page.
// If Help can't be loaded, the link works as a normal link.
// Loaded by site.js on every page except Help itself.
// ============================================================
(function () {
  // "Get help" buttons (data-get-help) open the support form (support.js),
  // also on pages that load this file without site.js (the quiz)
  if (!window.__llGetHelp) window.__llGetHelp = true, document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-get-help]');
    if (!b) return;
    e.preventDefault();
    import('./support.js?v=20261124a').then(function (m) {
      m.openSupport({ topic: b.getAttribute('data-get-help') || '' });
    }).catch(function () { location.href = 'contact.html'; });
  });
  if (/help\.html$/.test(location.pathname)) return;

  var helpDoc = null;
  var load = function () {
    if (!helpDoc) {
      helpDoc = fetch('help.html', { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (t) { return new DOMParser().parseFromString(t, 'text/html'); })
        .catch(function (e) { helpDoc = null; throw e; });
    }
    return helpDoc;
  };

  var css = document.createElement('style');
  css.textContent =
    '.hs-scrim{position:fixed;inset:0;background:rgba(18,58,74,.45);z-index:9998;opacity:0;transition:opacity .2s;}' +
    '.hs-scrim.on{opacity:1;}' +
    '.hs-panel{position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-46%);opacity:0;transition:opacity .2s,transform .2s;' +
      'width:min(560px,calc(100vw - 32px));max-height:min(80vh,640px);display:flex;flex-direction:column;background:#fff;color:#1d2b33;' +
      'border-radius:18px;box-shadow:0 24px 60px rgba(18,58,74,.28);font-family:Inter,system-ui,sans-serif;}' +
    '.hs-panel.on{opacity:1;transform:translate(-50%,-50%);}' +
    '.hs-head{display:flex;align-items:flex-start;gap:12px;padding:20px 20px 8px 22px;}' +
    '.hs-head h2{flex:1;margin:0;font:700 1.12rem/1.35 "Plus Jakarta Sans",Inter,sans-serif;color:#123a4a;}' +
    '.hs-close{flex-shrink:0;border:0;background:#f1f4f5;border-radius:50%;width:34px;height:34px;font-size:1.2rem;line-height:1;cursor:pointer;color:#123a4a;}' +
    '.hs-close:hover,.hs-close:focus-visible{background:#e2e9eb;}' +
    '.hs-body{overflow:auto;padding:4px 22px 8px;font-size:.97rem;line-height:1.6;}' +
    '.hs-body p{margin:0 0 12px;} .hs-body a{color:#e85f3d;}' +
    '.hs-body details{border-top:1px solid #e8eef0;padding:10px 0;} .hs-body summary{cursor:pointer;font-weight:600;color:#123a4a;}' +
    '.hs-body details p{margin:8px 0 4px;}' +
    '.hs-lead{font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#5d7c89;margin:4px 0 2px !important;}' +
    '.hs-menu-acts{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 8px;}' +
    '.hs-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:10px 18px;font:600 .93rem Inter,system-ui,sans-serif;text-decoration:none;background:#f1f4f5;color:#123a4a !important;}' +
    '.hs-btn:hover{background:#e2e9eb;} .hs-btn-go{background:#ff7a59;color:#fff !important;} .hs-btn-go:hover{background:#e8643f;}' +
    '.hs-small{font-size:.8rem;color:#5d7c89;margin:4px 0 6px !important;}' +
    '.hs-panel.is-menu .hs-foot{display:none;}' +
    '.hs-foot{padding:10px 22px 18px;border-top:1px solid #eef2f3;font-size:.88rem;}' +
    '.hs-foot a{color:#5d7c89;} .hs-foot{display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:space-between;} .hs-stuck{color:#5d7c89;} .hs-foot .hs-stuck a{color:#e85f3d;font-weight:600;}' +
    '@media (max-width:600px){.hs-panel{left:0;right:0;top:auto;bottom:0;width:100%;max-height:85vh;border-radius:18px 18px 0 0;transform:translateY(30px);}' +
      '.hs-panel.on{transform:translateY(0);} .hs-foot{padding-bottom:calc(18px + env(safe-area-inset-bottom));}}' +
    '@media (prefers-reduced-motion:reduce){.hs-scrim,.hs-panel{transition:none;}}';
  document.head.appendChild(css);

  var scrim = null, panel = null, lastFocus = null;
  var close = function () {
    if (!panel) return;
    var s = scrim, p = panel; scrim = panel = null;
    s.classList.remove('on'); p.classList.remove('on');
    setTimeout(function () { s.remove(); p.remove(); }, 200);
    document.removeEventListener('keydown', onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  var onKey = function (e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab' && panel) {   // keep focus inside the panel
      var f = panel.querySelectorAll('a[href],button,summary');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  // The Help menu (help.html#menu-parent etc.): popular answers for that
  // view, then "See all Help & FAQs" and "Send us a message"
  var MENU = {
    parent:  ['setup', 'revision-list', 'link-own', 'whats-free', 'plus-family', 'password'],
    teacher: ['teachers', 'setup', 'revision-list', 'whats-free', 'ai-allowance', 'password'],
    student: ['start', 'review', 'make-cards', 'marking', 'rewards', 'password'],
    admin:   ['setup', 'plus-cancel', 'plus-refund', 'ai-allowance', 'password'],
  };
  var menuFor = function (doc, view) {
    var ids = MENU[view] || MENU.parent;
    var qs = ids.map(function (i) { var d = doc.getElementById(i); return d && d.tagName === 'DETAILS' ? d.outerHTML : ''; }).join('');
    return { title: 'Help', menu: true, html:
      '<p class="hs-lead">Popular questions</p>' + qs +
      '<div class="hs-menu-acts">' +
        '<a class="hs-btn hs-btn-go" href="contact.html" data-get-help>Send us a message</a>' +
        '<a class="hs-btn" data-hs-full href="help.html" target="_blank" rel="noopener">See all Help &amp; FAQs \u2197</a>' +
      '</div>' +
      '<p class="hs-small">Messages get a reply by email, usually within two working days.</p>' };
  };

  // What to show for an anchor: one answer, or a section's questions
  var contentFor = function (doc, id) {
    var mm = /^menu-(\w+)$/.exec(id);
    if (mm) return menuFor(doc, mm[1]);
    var el = doc.getElementById(id);
    if (!el) return null;
    if (el.tagName === 'DETAILS') {
      var sum = el.querySelector('summary');
      var body = el.cloneNode(true); body.querySelector('summary').remove();
      return { title: sum ? sum.textContent : 'Help', html: body.innerHTML };
    }
    if (/^H[1-6]$/.test(el.tagName)) {
      var parts = [], n = el.nextElementSibling;
      while (n && !/^H[1-2]$/.test(n.tagName)) { parts.push(n.outerHTML); n = n.nextElementSibling; }
      return { title: el.textContent, html: parts.join('') };
    }
    return { title: 'Help', html: el.innerHTML };
  };

  var open = function (id, href) {
    return load().then(function (doc) {
      var c = contentFor(doc, id);
      if (!c) throw new Error('not found');
      if (panel) close();
      lastFocus = document.activeElement;
      scrim = document.createElement('div'); scrim.className = 'hs-scrim';
      panel = document.createElement('div'); panel.className = 'hs-panel';
      panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'hs-title');
      panel.innerHTML = '<div class="hs-head"><h2 id="hs-title"></h2><button class="hs-close" type="button" aria-label="Close">\u00d7</button></div>' +
        '<div class="hs-body"></div>' +
        '<div class="hs-foot"><a data-hs-full href="' + href + '">Open full Help \u2197</a><span class="hs-stuck">Still stuck? <a href="contact.html" data-get-help>Send us a message</a></span></div>';
      panel.querySelector('#hs-title').textContent = c.title;
      panel.querySelector('.hs-body').innerHTML = c.html;
      // Links inside: other Help answers open here; anything else in a new tab
      panel.querySelectorAll('.hs-body a[href]').forEach(function (a) {
        if (!/^help\.html#/.test(a.getAttribute('href'))) { a.target = '_blank'; a.rel = 'noopener'; }
      });
      panel.querySelector('.hs-foot a').target = '_blank';
      panel.querySelector('.hs-foot a').rel = 'noopener';
      if (c.menu) panel.classList.add('is-menu');
      panel.querySelectorAll('[data-get-help]').forEach(function (b) { b.addEventListener('click', close); });
      document.body.appendChild(scrim); document.body.appendChild(panel);
      scrim.addEventListener('click', close);
      panel.querySelector('.hs-close').addEventListener('click', close);
      document.addEventListener('keydown', onKey, true);
      requestAnimationFrame(function () { scrim.classList.add('on'); panel.classList.add('on'); });
      panel.querySelector('.hs-close').focus();
    });
  };

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.hasAttribute('data-hs-full')) return;   // "Open full Help" goes to the page
    var m = /^(?:\.\/)?help\.html#([\w-]+)$/.exec(a.getAttribute('href') || '');
    if (!m) return;
    e.preventDefault();
    var href = a.getAttribute('href'), target = a.target;
    open(m[1], href).catch(function () {
      // Couldn't show it here: go to Help the normal way
      if (target === '_blank') window.open(href, '_blank', 'noopener'); else location.href = href;
    });
  });
})();
