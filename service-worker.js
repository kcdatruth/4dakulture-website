const CACHE_NAME='4dk-pwa-v35-top50-static-final';
const APP_SHELL=['/','/index.html','/offline.html','/app.webmanifest','/pwa-install.js','/app-nav.css','/app-nav.js','/4dk-site-enhance.js','/4dk-discovery-upgrade.js','/4dk-home-current.js','/4dk-week4-current.js','/4dk-nfl-visuals.js','/4dk-redzone-week4-current.js','/4dk-week4-tnf-update.js','/top-50-nba-players-2026-27.html','/nfl-picks.js','/4dk-push.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.all(APP_SHELL.map(async u=>{try{await c.add(u)}catch(_){}}))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function inject(h){
  const add=[];
  for(const x of [
    ['/app-nav.css','<link rel="stylesheet" href="/app-nav.css">'],
    ['/4dk-site-enhance.js','<script defer src="/4dk-site-enhance.js"></script>'],
    ['/4dk-discovery-upgrade.js','<script defer src="/4dk-discovery-upgrade.js"></script>'],
    ['/4dk-home-current.js','<script defer src="/4dk-home-current.js"></script>'],
    ['/4dk-week4-current.js','<script defer src="/4dk-week4-current.js"></script>'],
    ['/4dk-nfl-visuals.js','<script defer src="/4dk-nfl-visuals.js"></script>'],
    ['/4dk-redzone-week4-current.js','<script defer src="/4dk-redzone-week4-current.js"></script>']
  ]) if(!h.includes(x[0])) add.push(x[1]);
  return h.includes('</head>')?h.replace('</head>',add.join('\n')+'\n</head>'):add.join('\n')+h;
}
async function nav(r){
  try{
    const x=await fetch(r,{cache:'no-store'});
    if(!x.ok)return x;
    const t=x.headers.get('content-type')||'';
    if(!t.includes('text/html'))return x;
    const headers=new Headers(x.headers);
    headers.delete('content-length');headers.delete('content-encoding');
    return new Response(inject(await x.text()),{status:x.status,headers});
  }catch(_){return await caches.match(r)||await caches.match('/offline.html')}
}
async function net(r){
  try{
    const x=await fetch(r,{cache:'no-store'});
    if(x&&x.ok){const c=await caches.open(CACHE_NAME);c.put(r,x.clone())}
    return x;
  }catch(_){return caches.match(r)}
}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin||u.pathname.startsWith('/api/'))return;
  if(r.mode==='navigate')return e.respondWith(nav(r));
  if(['/4dk-site-enhance.js','/4dk-home-current.js','/4dk-week4-current.js','/4dk-nfl-visuals.js','/4dk-redzone-week4-current.js'].includes(u.pathname))return e.respondWith(net(r));
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
