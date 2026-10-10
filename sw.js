const C='ironlog-v10',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(C).then(c=>c.put(r,res.clone()));return res;}).catch(()=>hit);return hit||net;}));});
