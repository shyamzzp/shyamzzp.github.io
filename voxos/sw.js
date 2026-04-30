const CACHE_NAME = 'voxos-pwa-v1';
const BASE_PATH = '/voxos/';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([BASE_PATH])),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match(BASE_PATH)));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
