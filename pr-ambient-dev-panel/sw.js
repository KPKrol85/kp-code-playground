const CACHE = 'ambient-dev-panel-v1';
const ASSETS = [
  './index.html', './settings.html', './about.html', './manifest.webmanifest',
  './assets/css/tokens.css', './assets/css/base.css', './assets/css/components.css', './assets/css/pages.css',
  './assets/js/app.js', './assets/js/data/defaults.js',
  './assets/js/modules/state.js', './assets/js/modules/storage.js', './assets/js/modules/timer.js',
  './assets/js/modules/audio.js', './assets/js/modules/ui.js', './assets/js/modules/shortcuts.js',
  './assets/js/modules/a11y.js', './assets/js/modules/stats.js', './assets/js/modules/router.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((resp) => {
    const copy = resp.clone();
    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return resp;
  }).catch(() => caches.match('./index.html'))));
});
