const CACHE_NAME = '4dk-pwa-v21-week4-current';
const APP_SHELL = [
  '/', '/index.html', '/offline.html', '/app.webmanifest', '/pwa-install.js', '/app-nav.css', '/app-nav.js',
  '/4dk-site-enhance.js','/4dk-discovery-upgrade.js','/4dk-home-current.js','/4dk-week4-current.js','/4dk-ai-2001-video.js',
  '/nfl-week4-preview-2026.html','/nfl-week3-hub-2026.html','/rankings.html','/stories.html','/4dk-hubs.html','/4dk-push.js','/OneSignalSDKWorker.js',
  '/power-rankings.js','/nfl-picks.js','/17-0.css','/17-0.js','/mamba-files.js','/mamba-files.css','/mamba-files.html','/social-follow.css',
  '/4dk-rewind.js','/4dk-rewind.css','/4dk-rewind.html','/4dk-icon-192.png','/4dk-icon-512.png','/4dk-icon-maskable-512.png','/apple-touch-icon.png'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>Promise.all(APP_SHELL.map(async url=>{try{await cache.add(url)}catch(e){console.warn('4DK precache skipped:',url)}}))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function inject(html){const head=[];const body=[];
 if(!html.includes('/app-nav.css'))head.push('<link rel="stylesheet" href="/app-nav.css" data-fourdk-appnav="1">');
 if(!html.includes('/4dk-site-enhance.js'))head.push('<script defer src="/4dk-site-enhance.js" data-fourdk-site-enhance="1"></script>');
 if(!html.includes('/4dk-discovery-upgrade.js'))head.push('<script defer src="/4dk-discovery-upgrade.js" data-fourdk-discovery-upgrade="1"></script>');
 if(!html.includes('/4dk-home-current.js'))head.push('<script defer src="/4dk-home-current.js" data-fourdk-home-current="1"></script>');
 if(!html.includes('/4dk-week4-current.js'))head.push('<script defer src="/4dk-week4-current.js" data-fourdk-week4-current="1"></script>');
 if(!html.includes('/4dk-ai-2001-video.js'))head.push('<script defer src="/4dk-ai-2001-video.js" data-fourdk-ai-2001-video="1"></script>');
 if(!html.includes('/4dk-push.js'))head.push('<script defer src="/4dk-push.js" data-fourdk-push="1"></script>');
 if(!html.includes('/power-rankings.js'))head.push('<script defer src="/power-rankings.js" data-fourdk-power-rankings="1"></script>');
 if(!html.includes('/mamba-files.js'))head.push('<script defer src="/mamba-files.js" data-fourdk-mamba-files="1"></script>');
 if(!html.includes('/social-follow.css'))head.push('<link rel="stylesheet" href="/social-follow.css" data-fourdk-social-follow="1">');
 if(!html.includes('/4dk-rewind.js'))head.push('<script defer src="/4dk-rewind.js" data-fourdk-rewind="1"></script>');
 if(!html.includes('/app-nav.js')&&!html.includes('fourdk-app-nav'))body.push('<script defer src="/app-nav.js" data-fourdk-appnav="1"></script>');
 if(head.length)html=html.includes('</head>')?html.replace('</head>',head.join('\n')+'\n</head>'):head.join('\n')+html;
 if(body.length)html=html.includes('</body>')?html.replace('</body>',body.join('\n')+'\n</body>'):html+body.join('\n');return html}
async function navResp(req){try{const res=await fetch(req,{cache:'no-store'});if(!res||!res.ok)return res;const type=res.headers.get('content-type')||'';if(!type.includes('text/html')){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,cp));return res}const html=inject(await res.text());const h=new Headers(res.headers);h.delete('content-length');h.delete('content-encoding');const out=new Response(html,{status:res.status,statusText:res.statusText,headers:h});caches.open(CACHE_NAME).then(c=>c.put(req,out.clone()));return out}catch(e){const cached=await caches.match(req);if(cached)return cached;return caches.match('/offline.html')}}
async function networkFirst(req){try{const res=await fetch(req,{cache:'no-store'});if(res&&res.status===200&&res.type==='basic'){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,cp))}return res}catch(e){return caches.match(req)}}
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);if(u.origin!==self.location.origin||u.pathname.startsWith('/api/'))return;if(req.mode==='navigate'){event.respondWith(navResp(req));return}const nf=['/4dk-site-enhance.js','/4dk-discovery-upgrade.js','/4dk-home-current.js','/4dk-week4-current.js','/4dk-ai-2001-video.js','/power-rankings.js','/nfl-picks.js','/17-0.css','/17-0.js','/mamba-files.js','/mamba-files.css','/social-follow.css','/4dk-rewind.js','/4dk-rewind.css'];if(nf.includes(u.pathname)){event.respondWith(networkFirst(req));return}event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res&&res.status===200&&res.type==='basic'){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,cp))}return res}).catch(()=>cached)))})
