// ============================================================
// LOBE LIMPET: service worker (scope: the folder it is served from)
// Makes Lobe Limpet installable as an app and shows a friendly
// "you're offline" page instead of the browser's error.
// Deliberately caches nothing else: pages and scripts always come
// fresh from the network, so an update is never stuck behind an
// old copy. Reminders (push notifications) arrive here too: the AI
// Worker sends { title, body, url, tag }.
// Bump VERSION when offline.html or its picture changes.
// ============================================================
const VERSION = 'll-offline-3';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([OFFLINE_URL, 'assets/images/brand/icon-192.png', 'assets/images/brand/mascot/limpet-sleep.svg']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ll-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Only page loads; everything else (Firebase, scripts, pictures) goes straight to the network
  if (req.mode !== 'navigate' || req.method !== 'GET') return;
  event.respondWith(
    fetch(req).catch(() => caches.open(VERSION).then((cache) => cache.match(OFFLINE_URL)))
  );
});

// ── Reminders (push notifications) ──
self.addEventListener('push', (event) => {
  let m = {};
  try { m = event.data ? event.data.json() : {}; } catch (e) { m = { body: event.data && event.data.text() }; }
  event.waitUntil(self.registration.showNotification(m.title || 'Lobe Limpet', {
    body: m.body || '', tag: m.tag || 'lobe-limpet', renotify: false,
    icon: 'assets/images/brand/icon-192.png', badge: 'assets/images/brand/favicon-32.png',
    data: { url: m.url || 'hub.html' },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || 'hub.html', self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if (c.url.startsWith(self.registration.scope) && 'focus' in c) { c.navigate(url).catch(() => {}); return c.focus(); } }
      return self.clients.openWindow(url);
    })
  );
});
