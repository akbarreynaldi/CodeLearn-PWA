//menyimpan asset ke cache storage
const CACHE_NAME = "CodeLearnpwa-v1";
var urlsToCache = [
    "/",
    "/nav-menu.html",
    "/index.html",
    "/pages/home.html",
    "/pages/ios.html",
    "/pages/android.html",
    "/pages/web.html",
    "/pages/about.html",
    "/src/css/materialize.min.css",
    "/src/js/materialize.min.js",
    "/src/js/nav-menu.js",
    "src/images",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

//menggunakan asset dari cache bila ada jika tidak ada maka menggunakan fetch request
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

//menghapus cache lama
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});