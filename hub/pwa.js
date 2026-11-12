// ============================================================
// LOBE LIMPET: install as an app
// Loaded by site.js on every page. It:
//  1. registers the service worker (sw.js), which makes the app
//     installable and shows offline.html when there's no connection
//  2. offers "Add Lobe Limpet to your home screen" on the home pages
//     (hub, parent, teacher) from the second visit on:
//       Android / Chrome / Edge: an Install button (browser's own prompt)
//       iPhone / iPad: how to do it from the Share menu
//     Not shown once installed, in "View as", or for 30 days after "Not now".
//  3. window.llInstall.open() shows the same help on demand (Help page button)
// Nothing here is saved to the account: it's per device (localStorage).
// ============================================================
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  var HOME_PAGES = ['hub.html', 'parent.html', 'teacher-dashboard.html'];
  var KEY_SNOOZE = 'll_install_snooze';
  var KEY_VISITS = 'll_install_visits';
  var SNOOZE_DAYS = 30;

  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var deferred = null; // the browser's install prompt, when it offers one

  // ── 1. Service worker ───────────────────────────────────
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function (e) { console.warn('Service worker not registered:', e.message); });
    });
  }

  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  // ── 2. The offer ────────────────────────────────────────
  var css = function () {
    if (document.getElementById('ll-install-css')) return;
    var s = document.createElement('style');
    s.id = 'll-install-css';
    s.textContent =
      '.ll-install{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:950;' +
      'width:min(440px,calc(100% - 24px));box-sizing:border-box;background:var(--color-surface,#fff);color:var(--color-text,#123a4a);' +
      'border:1px solid var(--color-border,#cfe3de);border-radius:var(--radius-card,14px);box-shadow:0 12px 32px rgba(0,0,0,0.22);' +
      'padding:14px 16px;display:flex;gap:12px;align-items:flex-start;font-family:var(--font-ui,Inter,system-ui,sans-serif);font-size:0.92rem;line-height:1.45;' +
      'animation:ll-install-in .3s ease-out}' +
      '@keyframes ll-install-in{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}' +
      '.ll-install img{width:44px;height:44px;border-radius:10px;flex:none}' +
      '.ll-install .ll-i-body{flex:1;min-width:0}' +
      '.ll-install strong{display:block;font-size:0.98rem;margin-bottom:2px}' +
      '.ll-install p{margin:0;color:var(--color-text-muted,#3d5d6a)}' +
      '.ll-install ol{margin:6px 0 0;padding-left:20px;color:var(--color-text-muted,#3d5d6a)}' +
      '.ll-install .ll-i-btns{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}' +
      '.ll-install button{border:0;border-radius:var(--radius-button,10px);padding:8px 14px;font:700 0.9rem var(--font-ui,Inter,system-ui,sans-serif);cursor:pointer}' +
      '.ll-install .ll-i-go{background:var(--color-primary,#ff7a59);color:#fff}' +
      '.ll-install .ll-i-no{background:transparent;color:var(--color-text-muted,#3d5d6a)}' +
      '.ll-install .ll-i-x{position:absolute;top:6px;right:8px;background:none;padding:4px 8px;font-size:1.1rem;color:var(--color-text-faint,#888)}' +
      '.ll-share-ico{display:inline-block;width:14px;height:16px;vertical-align:-2px}';
    document.head.appendChild(s);
  };

  var SHARE_ICO = '<svg class="ll-share-ico" viewBox="0 0 14 18" aria-label="Share" role="img"><path d="M7 1v10M3.5 4.5 7 1l3.5 3.5M2 8H1v9h12V8h-1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function close(snooze) {
    var el = document.querySelector('.ll-install');
    if (el) el.remove();
    if (snooze) set(KEY_SNOOZE, String(Date.now()));
  }

  function show(onDemand) {
    if (document.querySelector('.ll-install')) return;
    css();
    var el = document.createElement('div');
    el.className = 'll-install';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Add Lobe Limpet to your home screen');
    var body;
    if (isStandalone) {
      body = '<strong>You\'re using the app</strong><p>Lobe Limpet is already on your home screen.</p>' +
        '<div class="ll-i-btns"><button class="ll-i-go" data-a="ok">OK</button></div>';
    } else if (deferred) {
      body = '<strong>Add Lobe Limpet to your home screen</strong><p>Open it like an app, full screen, in one tap.</p>' +
        '<div class="ll-i-btns"><button class="ll-i-go" data-a="install">Install</button><button class="ll-i-no" data-a="later">Not now</button></div>';
    } else if (isIOS) {
      body = '<strong>Add Lobe Limpet to your home screen</strong><p>Open it like an app, full screen, in one tap:</p>' +
        '<ol><li>Tap ' + SHARE_ICO + ' Share (at the bottom in Safari, or top right on iPad)</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b></li></ol>' +
        '<p style="margin-top:6px">You\'ll sign in once more the first time you open it.</p>' +
        '<div class="ll-i-btns"><button class="ll-i-go" data-a="later">Got it</button></div>';
    } else if (onDemand) {
      body = '<strong>Add Lobe Limpet to your home screen</strong><p>In your browser\'s menu, look for <b>Install app</b> or <b>Add to Home screen</b>. Chrome, Edge and Safari support it; some other browsers don\'t.</p>' +
        '<div class="ll-i-btns"><button class="ll-i-go" data-a="ok">OK</button></div>';
    } else return; // browser can't install apps: say nothing
    el.innerHTML = '<img src="assets/images/brand/icon-192.png" alt=""><div class="ll-i-body">' + body + '</div>' +
      '<button class="ll-i-x" data-a="' + (onDemand ? 'ok' : 'later') + '" aria-label="Close">×</button>';
    el.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('[data-a]');
      if (!a) return;
      var act = a.getAttribute('data-a');
      if (act === 'install' && deferred) {
        var p = deferred; deferred = null; close(false);
        p.prompt();
        (p.userChoice || Promise.resolve({})).then(function (c) { if (c.outcome !== 'accepted') set(KEY_SNOOZE, String(Date.now())); });
      } else close(act === 'later' && !onDemand);
    });
    document.body.appendChild(el);
  }

  function shouldOffer() {
    if (HOME_PAGES.indexOf(page) < 0 || isStandalone) return false;
    try { if (page === 'hub.html' && sessionStorage.getItem('clasp_viewAs')) return false; } catch (e) {}
    if (document.querySelector('[data-step="app"]:not(.is-done)')) return false; // the Getting started checklist is already offering it
    var snoozed = +get(KEY_SNOOZE) || 0;
    if (snoozed && Date.now() - snoozed < SNOOZE_DAYS * 86400000) return false;
    return true;
  }

  // Count home-page visits; offer from the second one, after the page has settled
  if (shouldOffer()) {
    var visits = (+get(KEY_VISITS) || 0) + 1;
    set(KEY_VISITS, String(visits));
    if (visits >= 2) setTimeout(function () { ready = true; if (shouldOffer() && (deferred || isIOS)) show(false); }, 4000);
  }
  var ready = false; // page has settled and an offer is due

  window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault(); // we offer it ourselves, at a better moment
    deferred = ev;
    if (ready && shouldOffer()) show(false); // the browser decided late
  });
  window.addEventListener('appinstalled', function () { deferred = null; close(false); set(KEY_SNOOZE, String(Date.now() + 3650 * 86400000)); });

  // ── 3. On demand (Help page) ────────────────────────────
  window.llInstall = {
    open: function () { show(true); },
    installed: isStandalone,
  };
})();
