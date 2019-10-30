const CACHE_NAME = "firstpwa-v3.4.l";
var urlsToCache = [
	"/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
	"/js/nav.js",
	"/icon.png"
];


self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
	);
	
self.addEventListener("fetch", function(event){
	event.respondWith (
		caches
			.match(event.request, {cacheName : CACHE_NAME})
			.then(function(response){
				if (response){
					console.log("ServiseWorker: gunakan aset dari cache : ", response.url);
					return response;
				}

				console.log(
					"ServiceWorker : Memuat aset dari cache: ",
					event.request.url
				);

				return fetch(event.request)
			})
	)
})

self.addEventListener("activate", function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if (cacheName != CACHE_NAME){
						console.log("ServiceWorker: cache " + cacheName + "dihapus")
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})




});