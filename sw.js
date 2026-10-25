var V="libenga-v7";
var F=["./","./index.html","./manifest.json","./icon-192.png","./logo.jpg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(function(n){var c=n.clone();caches.open(V).then(function(x){x.put(r,c)});return n}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("./index.html")})}))});
