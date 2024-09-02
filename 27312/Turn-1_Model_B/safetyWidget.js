const CACHE_NAME = 'travel-safety-cache-v1';
const urlsToCache = [
    '/',
    'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css'
    // Add more static assets or API endpoints you want to cache here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response; // Return from cache if available
            }
            return fetch(event.request);
        }
    ));
});