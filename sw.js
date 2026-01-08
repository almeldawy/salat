// ANALOGIE : Le nom du placard où le majordome range les fichiers
const CACHE_NAME = 'salat-premium-v1';

// La liste des fichiers à mettre en mémoire pour le mode hors-ligne
// On ajoute './' pour dire "cherche dans ce dossier"
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// 1. INSTALLATION : Le majordome prépare le placard
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Majordome : Je range les fichiers dans le placard !');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. RÉCUPÉRATION : Le majordome sert les fichiers
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si le fichier est dans le placard, on le donne. 
        // Sinon, on va le chercher sur internet.
        return response || fetch(event.request);
      })
  );
});
