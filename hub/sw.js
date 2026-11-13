// ============================================================
// LOBE LIMPET: service worker (scope: the folder it is served from)
// Makes Lobe Limpet installable as an app and shows a friendly
// "you're offline" page instead of the browser's error.
// Deliberately caches nothing else: pages and scripts always come
// fresh from the network, so an update is never stuck behind an
// old copy. Later this is where push notifications will arrive.
// Bump VERSION when offline.html or its picture changes.
// ============================================================
const VERSION = 'll-offline-1';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([OFFLINE_URL, 'assets/images/brand/icon-192.png']))
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
