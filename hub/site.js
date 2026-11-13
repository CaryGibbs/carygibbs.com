// ============================================================
// LOBE LIMPET: shared header and footer
// Public pages:  <div id="site-header"></div> ... <div id="site-footer"></div>
//                gets the logo + tagline header and the full footer.
// App pages:     just include this script; a slim footer line is added
//                at the end of <main class="main"> (or the page body).
// Change links or the contact email here and every page updates.
// ============================================================
(function () {
  var CONTACT_EMAIL = 'cary@carygibbs.com';
  var TAGLINE = 'Knowledge that sticks.';
  var YEAR = new Date().getFullYear();

  var LOGO = '<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M4 86 L16 80 L38 82 L60 79 L84 82 L104 80 L116 86 V92 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4 Z" fill="#5d7c89"/><path d="M14 82 C18 46 38 16 60 14 C82 16 102 46 106 82 Q100 87 94 82 Q88 87 82 82 Q76 87 70 82 Q64 87 58 82 Q52 87 46 82 Q40 87 34 82 Q28 87 22 82 Q18 86 14 82 Z" fill="#ff7a59"/><path d="M60 16 C57 28 63 40 60 54" fill="none" stroke="#b8401f" stroke-width="6" stroke-linecap="round"/><circle cx="52" cy="66" r="6" fill="#123a4a"/><circle cx="68" cy="66" r="6" fill="#123a4a"/></svg>';
  var BRAND = '<a class="brand" href="./" aria-label="Lobe Limpet home">' + LOGO +
    '<span class="brand-text"><span class="word">lobe <span>limpet</span></span><span class="brand-tag">' + TAGLINE + '</span></span></a>';

  var page = location.pathname.split('/').pop() || 'index.html';
  var cur = function (f) { return page === f ? ' aria-current="page"' : ''; };

  window.LL_CONTACT_EMAIL = CONTACT_EMAIL;

  // ── Public header ───────────────────────────────────────
  var head = document.getElementById('site-header');
  if (head) {
    head.outerHTML = '<header><div class="wrap nav">' + BRAND +
      '<div class="nav-right"><nav class="nav-links" aria-label="Main">' +
      '<a href="./"' + cur('index.html') + '>Parents</a>' +
      '<a href="students.html"' + cur('students.html') + '>Students</a>' +
      '<a href="teachers.html"' + cur('teachers.html') + '>Teachers</a>' +
      '<a href="features.html"' + cur('features.html') + '>Features</a>' +
      '<a href="plus.html"' + cur('plus.html') + '>Pricing</a>' +
      '<a href="help.html"' + cur('help.html') + '>Help</a></nav>' +
      '<a class="btn btn-deep" href="login.html" id="nav-btn">Sign in</a>' +
      '<button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span><span></span></button>' +
      '</div></div>' +
      // Phone menu (the links above are hidden on narrow screens)
      '<nav class="nav-menu" id="nav-menu" aria-label="Menu" hidden>' +
      '<a href="./"' + cur('index.html') + '>For parents</a>' +
      '<a href="students.html"' + cur('students.html') + '>For students</a>' +
      '<a href="teachers.html"' + cur('teachers.html') + '>For teachers</a>' +
      '<a href="features.html"' + cur('features.html') + '>Features</a>' +
      '<a href="plus.html"' + cur('plus.html') + '>Pricing</a>' +
      '<a href="help.html"' + cur('help.html') + '>Help</a>' +
      '<a href="contact.html"' + cur('contact.html') + '>Contact</a>' +
      '</nav></header>';
    var tog = document.getElementById('nav-toggle'), menu = document.getElementById('nav-menu');
    var setOpen = function (open) { menu.hidden = !open; tog.setAttribute('aria-expanded', open); tog.classList.toggle('open', open); };
    tog.addEventListener('click', function () { setOpen(menu.hidden); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('header')) setOpen(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  // ── Full footer (public pages) ──────────────────────────
  var foot = document.getElementById('site-footer');
  if (foot) {
    foot.outerHTML = '<footer class="site-foot"><div class="wrap"><div class="foot-grid">' +
      '<div>' + BRAND + '<p class="foot-blurb">Turn school revision sheets into notes and quizzes that stick.</p></div>' +
      '<div><h4>Lobe Limpet</h4><ul><li><a href="./">For parents</a></li><li><a href="students.html">For students</a></li><li><a href="teachers.html">For teachers</a></li><li><a href="features.html">Features</a></li><li><a href="plus.html">Pricing</a></li></ul></div>' +
      '<div><h4>Support</h4><ul><li><a href="help.html">Help &amp; FAQs</a></li><li><a href="contact.html">Contact us</a></li><li><a href="about.html">About</a></li><li><a href="login.html">Sign in</a></li></ul></div>' +
      '<div><h4>Legal</h4><ul><li><a href="privacy.html">Privacy</a></li><li><a href="terms.html">Terms</a></li></ul></div>' +
      '</div><div class="foot-base"><span>© ' + YEAR + ' Lobe Limpet</span><span>Made in the UK</span></div></div></footer>';
  }

  // ── Slim footer (signed-in app pages) ───────────────────
  if (!head && !foot) {
    var css = document.createElement('style');
    css.textContent =
      '.ll-slimfoot{position:relative;z-index:1;margin:40px auto 24px;padding:16px;text-align:center;font-family:var(--font-ui,Inter,system-ui,sans-serif);font-size:0.82rem;color:var(--color-text-faint,#888);}' +
      '.ll-slimfoot a{color:var(--color-text-muted,#666);text-decoration:none;margin:0 8px;}' +
      '.ll-slimfoot a:hover{color:var(--color-primary,#ff7a59);text-decoration:underline;}' +
      '.ll-slimfoot .ll-tag{display:block;margin-top:6px;}';
    document.head.appendChild(css);
    var mount = function () {
      if (document.querySelector('.ll-slimfoot')) return;
      var el = document.createElement('footer');
      el.className = 'll-slimfoot';
      // On the sign-in page, Home is the website's front page; in the app it's
      // the person's own home (hub, or their parent/teacher/admin page)
      var home = 'login.html';
      try { home = localStorage.getItem('ll_home') || 'login.html'; } catch (e) {}
      if (page === 'login.html') home = './';
      el.innerHTML = '<a href="' + home + '"><strong>Home</strong></a>·<a href="plus.html">Pricing</a>·<a href="help.html">Help</a>·<a href="contact.html">Contact</a>·<a href="about.html">About</a>·<a href="privacy.html">Privacy</a>·<a href="terms.html">Terms</a>' +
        '<span class="ll-tag">© ' + YEAR + ' Lobe Limpet · ' + TAGLINE + '</span>';
      (document.querySelector('main.main') || document.body).appendChild(el);
    };
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', mount) : mount();
  }

  // ── Email links: <a data-email> becomes a mailto link ───
  var fill = function () {
    document.querySelectorAll('[data-email]').forEach(function (a) {
      a.href = 'mailto:' + CONTACT_EMAIL + (a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : '');
      if (!a.textContent.trim()) a.textContent = CONTACT_EMAIL;
    });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fill) : fill();

  // ── Signed in? Header button goes to the hub instead ────
  if (head) {
    var check = function () {
      Promise.all([
        import('./firebase-config.js?v=20261113d'),
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js')
      ]).then(function (m) {
        m[1].onAuthStateChanged(m[0].auth, function (user) {
          if (!user) return;
          var b = document.getElementById('nav-btn');
          if (b) b.textContent = 'Go to my hub';
          document.dispatchEvent(new CustomEvent('ll-signed-in'));
        });
      }).catch(function () {});
    };
    ('requestIdleCallback' in window) ? requestIdleCallback(check, { timeout: 1500 }) : setTimeout(check, 300);
  }

  // ── Install as an app (service worker + home screen offer) ─
  var pwa = document.createElement('script');
  pwa.src = 'pwa.js?v=20261113d';
  pwa.defer = true;
  document.head.appendChild(pwa);
})();
