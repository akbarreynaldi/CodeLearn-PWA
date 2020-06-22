const CACHE_NAME = "CodeLearnpwa-v2";
var urlsToCache = [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/",
    "/manifest.json",
    "/nav-menu.html",
    "/index.html",
    "/pages/home.html",
    "/pages/ios.html",
    "/pages/android.html",
    "/pages/web.html",
    "/pages/about.html",
    "/src",
    "/src/css/materialize.min.css",
    "/src/css/main.css",
    "/src/js/materialize.min.js",
    "/src/js/loadContent.js",
    "/src/images",
    "/src/images/android-1.jpg",
    "/src/images/ios-1.jpg",
    "/src/images/web-1.jpg",
    "/src/images/user_pic.svg",
    "/src/images/mentor_pic-5.svg",
    "/src/images/mentor_pic-4.svg",
    "/src/images/mentor_pic-3.svg",
    "/src/images/mentor_pic-2.svg",
    "/src/images/mentor_pic-1.svg",
    "/src/images/logo_CodeLearn_white.png",
    "/src/images/ic_CodeLearn_72.svg",
    "/src/images/ic_CodeLearn_96.svg",
    "/src/images/ic_CodeLearn_128.svg",
    "/src/images/ic_CodeLearn_144.svg",
    "/src/images/ic_CodeLearn_192.svg",
    "/src/images/ic_CodeLearn_256.svg",
    "/src/images/ic_CodeLearn_384.svg",
    "/src/images/ic_CodeLearn_512.svg",
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