// ============================================================
// LOBE LIMPET: shared header and footer
// Public pages:  <div id="site-header"></div> ... <div id="site-footer"></div>
//                gets the logo + tagline header and the full footer.
// App pages:     just include this script; a slim footer line is added
//                at the end of <main class="main"> (or the page body).
// Change links or the contact email here and every page updates.
// ============================================================
(function () {
  var CONTACT_EMAIL = 'support@lobelimpet.com';
  // <a data-email="privacy"> → privacy@lobelimpet.com (also billing, press, safeguarding)
  var EMAIL_DOMAIN = 'lobelimpet.com';
  var TAGLINE = 'Knowledge that sticks.';
  var YEAR = new Date().getFullYear();

  var LOGO = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M2 89 Q5 81 16 81 H84 Q95 81 98 89 V93 a4 4 0 0 1 -4 4 H6 a4 4 0 0 1 -4 -4 Z" fill="#5d7c89"/><path d="M8 83 C7 42 26 14 50 13 C74 14 93 42 92 83 Q87 88 82 83 Q77 88 72 83 Q67 88 61.5 83 Q56 88 50 83 Q44 88 38.5 83 Q33 88 28 83 Q23 88 18 83 Q13 88 8 83 Z" fill="#ff7a59"/><path d="M20 54 C21 40 27 30 35 23" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="5" stroke-linecap="round"/><g fill="none" stroke="#c94a28" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 15 C46 23 54 30 50 37 C47 42 52 45 50 48"/><path d="M24 47 C25 41 31 40 33 44 C35 48 41 46 40 40"/><path d="M31 30 C34 25 40 26 40 30 C40 34 45 34 45 28"/><path d="M76 47 C75 41 69 40 67 44 C65 48 59 46 60 40"/><path d="M69 30 C66 25 60 26 60 30 C60 34 55 34 55 28"/></g><ellipse cx="28" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><ellipse cx="72" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><circle cx="39" cy="62" r="7.5" fill="#123a4a"/><circle cx="61" cy="62" r="7.5" fill="#123a4a"/><circle cx="36.5" cy="59" r="2.8" fill="#fff"/><circle cx="58.5" cy="59" r="2.8" fill="#fff"/><circle cx="41.5" cy="65" r="1.2" fill="#fff"/><circle cx="63.5" cy="65" r="1.2" fill="#fff"/><path d="M45.5 70 Q50 74.5 54.5 70" fill="none" stroke="#123a4a" stroke-width="2.6" stroke-linecap="round"/></svg>';
  var BRAND = '<a class="brand" href="./" aria-label="Lobe Limpet home">' + LOGO +
    '<span class="brand-text"><span class="word">lobe <span>limpet</span></span><span class="brand-tag">' + TAGLINE + '</span></span></a>';

  var page = location.pathname.split('/').pop() || 'index.html';
  var cur = function (f) { return page === f ? ' aria-current="page"' : ''; };
  // Sign up from the header picks the account type for the page they're on
  var signupType = page === 'students.html' ? 'student' : page === 'teachers.html' ? 'teacher' : 'parent';

  window.LL_CONTACT_EMAIL = CONTACT_EMAIL;

  // The signed-in person's own home in the app (student hub, or their
  // parent/teacher/admin page). Remembered by auth.js; sign-in page if unknown.
  var myHome = 'login.html', likelyIn = false;
  try { likelyIn = !!localStorage.getItem('ll_home'); myHome = localStorage.getItem('ll_home') || 'login.html'; } catch (e) {}
  // Remembered as signed in (ll_home is cleared on sign-out): draw the header that
  // way from the start, so it doesn't jump when sign-in is confirmed a moment later
  window.LL_MY_HOME = myHome;

  // ── Public header ───────────────────────────────────────
  var head = document.getElementById('site-header');
  if (head) {
    head.outerHTML = '<header><div class="wrap nav">' + BRAND +
      '<div class="nav-right"><nav class="nav-links" aria-label="Main">' +
      '<a href="parents.html"' + cur('parents.html') + '>Parents</a>' +
      '<a href="students.html"' + cur('students.html') + '>Students</a>' +
      '<a href="teachers.html"' + cur('teachers.html') + '>Teachers</a>' +
      '<a href="features.html"' + cur('features.html') + '>Features</a>' +
      '<a href="plus.html"' + cur('plus.html') + '>Pricing</a>' +
      '<a href="resources.html"' + cur('resources.html') + '>Resources</a>' +
      '<a href="about.html"' + cur('about.html') + '>About</a>' +
      '<a href="help.html"' + cur('help.html') + '>Help</a></nav>' +
      // Sign in / Sign out: always there and the same width, so the menu never shifts
      '<a class="nav-signin" href="login.html" id="nav-btn"' + (likelyIn ? ' data-out="1"' : '') + '>' + (likelyIn ? 'Sign out' : 'Sign in') + '</a>' +
      (likelyIn ? '<a class="btn btn-coral nav-signup" href="' + myHome + '" id="nav-signup">Go to my home</a>'
                : '<a class="btn btn-coral nav-signup" href="login.html?signup=' + signupType + '" id="nav-signup">Sign up free</a>') +
      '<button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span><span></span></button>' +
      '</div></div>' +
      // Phone menu (the links above are hidden on narrow screens)
      '<nav class="nav-menu" id="nav-menu" aria-label="Menu" hidden>' +
      '<a href="./"' + cur('index.html') + '>Home</a>' +
      '<a href="parents.html"' + cur('parents.html') + '>For parents</a>' +
      '<a href="students.html"' + cur('students.html') + '>For students</a>' +
      '<a href="teachers.html"' + cur('teachers.html') + '>For teachers</a>' +
      '<a href="features.html"' + cur('features.html') + '>Features</a>' +
      '<a href="plus.html"' + cur('plus.html') + '>Pricing</a>' +
      '<a href="resources.html"' + cur('resources.html') + '>Resources</a>' +
      '<a href="about.html"' + cur('about.html') + '>About us</a>' +
      '<a href="help.html"' + cur('help.html') + '>Help</a>' +
      '<a href="contact.html"' + cur('contact.html') + '>Contact us</a>' +
      '<a href="' + (likelyIn ? myHome : 'login.html') + '" id="menu-signin">' + (likelyIn ? 'My home' : 'Sign in') + '</a>' +
      // Phones hide the header "Sign out", so the menu has its own (signed in only)
      '<a href="login.html" id="menu-signout" data-out="1"' + (likelyIn ? '' : ' hidden') + '>Sign out</a>' +
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
      '<div>' + BRAND + '<p class="foot-blurb">Snap a revision list and get everything needed to revise it.</p></div>' +
      '<div><h4>Lobe Limpet</h4><ul><li><a href="parents.html">For parents</a></li><li><a href="students.html">For students</a></li><li><a href="teachers.html">For teachers</a></li><li><a href="features.html">Features</a></li><li><a href="plus.html">Pricing</a></li><li><a href="resources.html">Resources and guides</a></li><li><a href="free-revision-quizzes.html">Free revision quizzes</a></li></ul></div>' +
      '<div><h4>Get started</h4><ul><li><a href="login.html?signup=' + signupType + '" id="foot-signup">Sign up free</a></li><li><a href="login.html" id="foot-signin">Sign in</a></li><li><a href="help.html">Help &amp; FAQs</a></li><li><a href="contact.html">Contact us</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="press.html">Press and brand</a></li><li><a data-email></a></li></ul></div>' +
      '<div><h4>Legal</h4><ul><li><a href="privacy.html">Privacy notice</a></li><li><a href="terms.html">Terms of use</a></li></ul></div>' +
      '</div><div class="foot-base"><span>© ' + YEAR + ' Lobe Limpet</span><span>Made in the UK</span></div></div></footer>';
  }

  // ── Slim footer (signed-in app pages) ───────────────────
  if (!head && !foot && page !== 'login.html') {
    var css = document.createElement('style');
    css.textContent =
      '.ll-slimfoot{position:relative;z-index:1;margin:40px auto 24px;padding:16px;text-align:center;font-family:var(--font-ui,Inter,system-ui,sans-serif);font-size:0.82rem;color:var(--color-text-faint,#888);}' +
      '.ll-slimfoot a{color:var(--color-text-muted,#666);text-decoration:none;margin:0 8px;}' +
      '.ll-slimfoot a:hover{color:var(--color-primary,#ff7a59);text-decoration:underline;}' +
      '.ll-slimfoot .ll-tag{display:block;margin-top:6px;}' +
      '.ll-slimfoot .ll-row{margin:2px 0;line-height:1.9;}.ll-slimfoot .ll-small{font-size:0.76rem;}.ll-slimfoot .ll-small a{color:var(--color-text-faint,#999);}';
    document.head.appendChild(css);
    var mount = function () {
      if (document.querySelector('.ll-slimfoot')) return;
      var el = document.createElement('footer');
      el.className = 'll-slimfoot';
      // "My home" is the person's own home in the app (hub, or their
      // parent/teacher/admin page). Website pages open in a new tab so
      // nothing in the app (a quiz, an unsaved form) is lost.
      var w = function (href, text) { return '<a href="' + href + '" target="_blank" rel="noopener">' + text + '</a>'; };
      el.innerHTML = '<div class="ll-row"><a href="' + myHome + '"><strong>My home</strong></a>·' + w('help.html', 'Help &amp; FAQs') + '·' + w('contact.html', 'Contact us') + '·' + w('plus.html', 'Pricing') + '·' + w('./', 'Lobe Limpet website ↗') + '</div>' +
        '<div class="ll-row ll-small">' + w('about.html', 'About us') + '·' + w('press.html', 'Press and brand') + '·' + w('privacy.html', 'Privacy') + '·' + w('terms.html', 'Terms') + '</div>' +
        '<span class="ll-tag">© ' + YEAR + ' Lobe Limpet · ' + TAGLINE + '</span>';
      (document.querySelector('main.main') || document.body).appendChild(el);
    };
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', mount) : mount();
  }

  // ── Email links: <a data-email> becomes a mailto link ───
  var fill = function () {
    document.querySelectorAll('[data-email]').forEach(function (a) {
      var box = (a.dataset.email || '').replace(/[^a-z]/g, '');
      var addr = box ? box + '@' + EMAIL_DOMAIN : CONTACT_EMAIL;
      a.href = 'mailto:' + addr + (a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : '');
      if (!a.textContent.trim()) a.textContent = addr;
    });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fill) : fill();

  // ── Signed in? Sign-in links go straight to their home ──
  if (head) {
    var check = function () {
      Promise.all([
        import('./firebase-config.js?v=20261126h'),
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js')
      ]).then(function (m) {
        m[1].onAuthStateChanged(m[0].auth, function (user) {
          if (!user) {
            // Remembered as signed in, but the sign-in has gone (expired, or another
            // browser tab signed out): put the signed-out header back
            if (!likelyIn) return;
            likelyIn = false;
            try { localStorage.removeItem('ll_home'); } catch (e) {}
            var su = document.getElementById('nav-signup');
            if (su) { su.textContent = 'Sign up free'; su.href = 'login.html?signup=' + signupType; }
            var si = document.getElementById('nav-btn'); if (si) { si.textContent = 'Sign in'; si.removeAttribute('data-out'); }
            var ms = document.getElementById('menu-signin'); if (ms) { ms.textContent = 'Sign in'; ms.href = 'login.html'; }
            var mo = document.getElementById('menu-signout'); if (mo) mo.hidden = true;
            return;
          }
          // Signed in: "Sign up free" becomes a direct way back to their home,
          // and the sign-in links go there too
          var up = document.getElementById('nav-signup');
          if (up) { up.textContent = 'Go to my home'; up.href = myHome; }
          var inBtn = document.getElementById('nav-btn');
          if (inBtn) { inBtn.textContent = 'Sign out'; inBtn.setAttribute('data-out', '1'); }
          var mso = document.getElementById('menu-signout'); if (mso) mso.hidden = false;
          var fu = document.getElementById('foot-signup');
          if (fu) fu.parentNode.hidden = true;
          ['foot-signin', 'menu-signin'].forEach(function (id) {
            var b = document.getElementById(id);
            if (b) { b.textContent = 'My home'; b.href = myHome; }
          });
          document.dispatchEvent(new CustomEvent('ll-signed-in'));
        });
      }).catch(function () {});
    };
    ('requestIdleCallback' in window) ? requestIdleCallback(check, { timeout: 1500 }) : setTimeout(check, 300);
  }

  // ── Links to other websites open in a new tab, so Lobe Limpet stays open,
  //    with a small ↗ so people know before they tap ──
  var extLinks = function () {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      var u; try { u = new URL(a.href); } catch (x) { return; }
      if (u.host === location.host || /(^|\.)lobelimpet\.com$/.test(u.hostname)) return;
      a.target = '_blank';
      var rel = (a.rel || '').split(/\s+/); if (rel.indexOf('noopener') < 0) a.rel = (a.rel + ' noopener').trim();
      if (a.closest('header, .ll-slimfoot') || a.querySelector('img') || a.classList.contains('btn') || a.dataset.noArrow !== undefined) return;
      if (!a.querySelector('.ext-mark')) {
        a.insertAdjacentHTML('beforeend', '<span class="ext-mark" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>');
        if (!a.title) a.title = 'Opens in a new tab';
      }
    });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', extLinks) : extLinks();

  // ── "Sign out" in the website header ──
  if (head) document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#nav-btn[data-out], #menu-signout');
    if (!a) return;
    e.preventDefault();
    try { localStorage.removeItem('ll_home'); } catch (x) {}
    Promise.all([
      import('./firebase-config.js?v=20261126h'),
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js')
    ]).then(function (m) { return m[1].signOut(m[0].auth); })
      .catch(function () {})
      .then(function () { location.reload(); });
  });

  // ── "Get help" buttons (data-get-help) open the support form ──
  // support.js is only loaded when one is pressed. data-get-help="plus"
  // picks that topic to start with.
  if (!window.__llGetHelp) window.__llGetHelp = true, document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-get-help]');
    if (!b) return;
    e.preventDefault();
    import('./support.js?v=20261126h').then(function (m) {
      m.openSupport({ topic: b.getAttribute('data-get-help') || '' });
    }).catch(function () { location.href = 'contact.html'; });
  });

  // ── Help answers open over the page (help-sheet.js) ─────
  var hs = document.createElement('script');
  hs.src = 'help-sheet.js?v=20261126h';
  hs.defer = true;
  document.head.appendChild(hs);

  // ── Install as an app (service worker + home screen offer) ─
  var pwa = document.createElement('script');
  pwa.src = 'pwa.js?v=20261126h';
  pwa.defer = true;
  document.head.appendChild(pwa);
})();
