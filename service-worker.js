const CACHE_NAME = "CodeLearnpwa-v3";
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
    "/src/css/materialize.min.css",
    "/src/css/main.css",
    "/src/js/materialize.min.js",
    "/src/js/loadContent.js",
    "/src/images/android-1.jpg",
    "/src/images/ios-1.jpg",
    "/src/images/web-1.jpg",
    "/src/images/user_pic.png",
    "/src/images/mentor_pic-5.png",
    "/src/images/mentor_pic-4.png",
    "/src/images/mentor_pic-3.png",
    "/src/images/mentor_pic-2.png",
    "/src/images/mentor_pic-1.png",
    "/src/images/logo_CodeLearn_white.png",
    "/src/images/ic_CodeLearn_72.png",
    "/src/images/ic_CodeLearn_96.png",
    "/src/images/ic_CodeLearn_128.png",
    "/src/images/ic_CodeLearn_144.png",
    "/src/images/ic_CodeLearn_192.png",
    "/src/images/ic_CodeLearn_256.png",
    "/src/images/ic_CodeLearn_384.png",
    "/src/images/ic_CodeLearn_512.png",
    "/src/images/ic_CodeLearn_iOS.png"
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