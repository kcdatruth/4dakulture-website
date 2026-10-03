const CACHE_NAME='4dk-pwa-v31-top50-local-order';
const APP_SHELL=['/','/index.html','/offline.html','/app.webmanifest','/pwa-install.js','/app-nav.css','/app-nav.js','/4dk-site-enhance.js','/4dk-discovery-upgrade.js','/4dk-home-current.js','/4dk-week4-current.js','/4dk-nfl-visuals.js','/4dk-redzone-week4-current.js','/4dk-week4-tnf-update.js','/4dk-top50-julius-randle-update.js','/top-50-nba-players-2026-27.html','/nfl-picks.js','/4dk-push.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.all(APP_SHELL.map(async u=>{try{await c.add(u)}catch(_){}}))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
function inject(h){
  let a=[];
  for(const x of [
    ['/app-nav.css','<link rel="stylesheet" href="/app-nav.css">'],
    ['/4dk-site-enhance.js','<script defer src="/4dk-site-enhance.js"></script>'],
    ['/4dk-discovery-upgrade.js','<script defer src="/4dk-discovery-upgrade.js"></script>'],
    ['/4dk-home-current.js','<script defer src="/4dk-home-current.js"></script>'],
    ['/4dk-week4-current.js','<script defer src="/4dk-week4-current.js"></script>'],
    ['/4dk-nfl-visuals.js','<script defer src="/4dk-nfl-visuals.js"></script>'],
    ['/4dk-redzone-week4-current.js','<script defer src="/4dk-redzone-week4-current.js"></script>'],
    ['/4dk-top50-julius-randle-update.js','<script defer src="/4dk-top50-julius-randle-update.js"></script>']
  ]) if(!h.includes(x[0])) a.push(x[1]);
  return h.includes('</head>')?h.replace('</head>',a.join('\n')+'</head>'):a.join('\n')+h;
}
async function nav(r){
  try{
    let x=await fetch(r,{cache:'no-store'});
    if(!x.ok)return x;
    let t=x.headers.get('content-type')||'';
    if(!t.includes('text/html'))return x;
    let h=new Headers(x.headers);
    h.delete('content-length');h.delete('content-encoding');
    return new Response(inject(await x.text()),{status:x.status,headers:h});
  }catch(_){
    return await caches.match(r)||await caches.match('/offline.html');
  }
}
async function net(r){
  try{
    let x=await fetch(r,{cache:'no-store'});
    if(x&&x.ok){let c=await caches.open(CACHE_NAME);c.put(r,x.clone())}
    return x;
  }catch(_){return caches.match(r)}
}
self.addEventListener('fetch',e=>{
  let r=e.request;if(r.method!=='GET')return;
  let u=new URL(r.url);
  if(u.origin!==location.origin||u.pathname.startsWith('/api/'))return;
  if(r.mode==='navigate')return e.respondWith(nav(r));
  if(['/4dk-top50-julius-randle-update.js','/4dk-site-enhance.js'].includes(u.pathname))return e.respondWith(net(r));
  e.respondWith(caches.match(r).then(x=>x||fetch(r)));
});