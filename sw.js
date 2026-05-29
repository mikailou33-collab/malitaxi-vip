// MaliTaxi VIP Service Worker
const CACHE_NAME = 'malitaxi-v1';

self.addEventListener('install', e => {
  console.log('MaliTaxi SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('MaliTaxi SW activated');
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
