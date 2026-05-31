// MaliTaxi VIP Service Worker v2
const CACHE_NAME = 'malitaxi-vip-v2';
const BASE_URL = '/malitaxi-vip/';

self.addEventListener('install', e => {
  console.log('[SW] MaliTaxi VIP installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[SW] MaliTaxi VIP activated');
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
