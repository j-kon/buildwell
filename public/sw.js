/* Local-first UI assets only. Demo database lives in each browser's localStorage. */
const CACHE='buildwell-shell-v3';
const ASSETS=['/','/index.html','/styles.css','/mobile.css','/app.js','/demo-api.js','/install.js','/vendor/react.min.js','/vendor/react-dom.min.js','/manifest.webmanifest','/icons/buildwell-192.png','/icons/buildwell-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
   event.respondWith(fetch(event.request).then(response=>{const c=response.clone();caches.open(CACHE).then(cache=>cache.put('/',c));return response;}).catch(()=>caches.match('/')));return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
