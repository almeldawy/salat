// ANALOGIE : Le nom du placard où le majordome range les affaires
const CACHE_NAME = 'salat-premium-v1';

// La liste des objets (fichiers) à mettre dans le placard
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap'
];

// ÉVÉNEMENT 1 : L'installation (Le majordome prend son poste)
// Il ouvre le placard et y dépose les fichiers importants
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// ÉVÉNEMENT 2 : La récupération (Le majordome intercepte les demandes)
// Quand l'app demande un fichier, le majordome regarde d'abord s'il l'a dans son placard.
// S'il l'a, il le donne (mode hors-ligne). Sinon, il va le chercher sur Internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
