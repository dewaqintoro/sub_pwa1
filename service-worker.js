const CACHE_NAME = "subPWA1_final";
var urlsToCache = [
	"/",
  "/index.html",
	"/nav.html",
	"/pages/apple.html", 
	"/pages/huawei.html",
	"/pages/oppo.html",
	"/pages/home.html",
	"/pages/xiaomi.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
	"/js/nav.js",
	"/img/Apple/apple-iphone-11-pro.jpg",
	"/img/Apple/apple-ipad7-102-inches.jpg",
	"/img/Apple/apple-watch-series-5.jpg",
	"/img/Oppo/oppo-a5-2020.jpg",
	"/img/Oppo/oppo-k5.jpg",
	"/img/Oppo/oppo-reno-ace.jpg",
	"/img/Huawei/huawei-enjoy-10s.jpg",
	"/img/Huawei/huawei-mate-30-rs-porsche-design.jpg",
	"/img/Huawei/huawei-nova-5z.jpg",
	"/img/Xiaomi/xiaomi-redmi-8.jpg",
	"/img/Xiaomi/xiaomi-mi-mix-alpha.jpg",
	"/img/Xiaomi/xiaomi-mi-9-pro-5g.jpg"

];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

