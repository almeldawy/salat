const CACHE_NAME = 'salat-v2'; // On change le nom (v1 -> v2) pour forcer le navigateur à voir du neuf
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installation : on met les fichiers dans le sac (cache)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Force le nouveau service worker à prendre le contrôle immédiatement
});

// Nettoyage des vieux sacs (caches)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Stratégie : Réseau en priorité, sinon Cache
// C'est plus sûr pour un débutant car les changements sur GitHub s'affichent vite
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
