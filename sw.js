const V='njs-v3';
const SHELL=['/','/hi/','/radha-naam-jap-counter/','/ram-naam-jap-counter/','/om-namah-shivaya-counter/','/naam-japa-counter-app/','/108-japa-counter-online/','/assets/style.css','/assets/app.js','/favicon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(V).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('/'))));
});
