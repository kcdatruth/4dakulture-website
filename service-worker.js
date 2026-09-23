const CACHE_NAME = '4dk-pwa-v17-ai-direct-embed';
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/app.webmanifest',
  '/pwa-install.js',
  '/app-nav.css',
  '/app-nav.js',
  '/4dk-site-enhance.js',
  '/4dk-home-current.js',
  '/4dk-week2-rankings.js',
  '/4dk-redzone-week2-final.js',
  '/4dk-week3-framework.js',
  '/4dk-ai-2001-video.js',
  '/nfl-week3-hub-2026.html',
  '/4dk-push.js',
  '/OneSignalSDKWorker.js',
  '/power-rankings.js',
  '/nfl-picks.js',
  '/17-0.css',
  '/17-0.js',
  '/mamba-files.js',
  '/mamba-files.css',
  '/mamba-files.html',
  '/social-follow.css',
  '/4dk-rewind.js',
  '/4dk-rewind.css',
  '/4dk-rewind.html',
  '/4dk-icon-192.png',
  '/4dk-icon-512.png',
  '/4dk-icon-maskable-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(APP_SHELL.map(async url => {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn('4DK precache skipped:', url);
        }
      })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});


function injectAI2001Video(html) {
  const marker = '<h2><span>05.</span> THE ALL-STAR GAME MADE THE WHOLE LEAGUE WATCH.</h2>';
  const videoId = 'zgkSkPRRtJQ';

  // Do nothing on unrelated pages, or if the player is already present.
  if (!html.includes(marker) || html.includes(`youtube-nocookie.com/embed/${videoId}`)) {
    return html;
  }

  const styles = `
<style id="fourdk-ai-2001-direct-video-styles">
  .a4-direct-video{
    margin:34px 0;
    overflow:hidden;
    border:1px solid rgba(255,255,255,.14);
    border-top:4px solid #d7a92e;
    background:#0a0f18;
    box-shadow:0 18px 45px rgba(0,0,0,.22)
  }
  .a4-direct-video-head{
    padding:16px 18px;
    border-bottom:1px solid rgba(255,255,255,.12);
    background:linear-gradient(90deg,rgba(215,169,46,.12),rgba(35,78,145,.09),transparent)
  }
  .a4-direct-video-head small{
    display:block;color:#e8bd4a;font-size:8px;font-weight:1000;
    letter-spacing:.13em;text-transform:uppercase
  }
  .a4-direct-video-head b{
    display:block;margin-top:6px;color:#fff;
    font:1000 clamp(22px,3.6vw,34px)/.96 Arial Black,Impact,sans-serif;
    letter-spacing:-.035em;text-transform:uppercase
  }
  .a4-direct-video-embed{
    position:relative;width:100%;aspect-ratio:16/9;background:#000
  }
  .a4-direct-video-embed iframe{
    position:absolute;inset:0;width:100%;height:100%;border:0
  }
  .a4-direct-video-caption{
    display:flex;justify-content:space-between;align-items:center;gap:14px;
    padding:12px 16px;color:#9da8b8;font-size:9px;line-height:1.45
  }
  .a4-direct-video-caption a{
    color:#e8bd4a!important;text-decoration:none!important;font-weight:1000;
    letter-spacing:.08em;text-transform:uppercase;white-space:nowrap
  }
  @media(max-width:560px){
    .a4-direct-video{margin:28px 0}
    .a4-direct-video-caption{align-items:flex-start;flex-direction:column}
  }
</style>`;

  const block = `
<section class="a4-direct-video" aria-label="4DK Watch the Tape: Allen Iverson 2000-01 season highlights">
  <div class="a4-direct-video-head">
    <small>4DK WATCH THE TAPE • 2000–01 MVP SEASON</small>
    <b>ALLEN IVERSON • IT WAS HIS TIME.</b>
  </div>
  <div class="a4-direct-video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}"
      title="Allen Iverson 2000-01 season highlights"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>
  </div>
  <div class="a4-direct-video-caption">
    <span>Watch the 2000–01 tape, then continue into the All-Star Game, Mutombo trade and the rest of the 4DK breakdown.</span>
    <a href="https://youtu.be/${videoId}" target="_blank" rel="noopener">YouTube →</a>
  </div>
</section>`;

  if (!html.includes('fourdk-ai-2001-direct-video-styles')) {
    html = html.includes('</head>')
      ? html.replace('</head>', `${styles}\n</head>`)
      : styles + html;
  }

  return html.replace(marker, `${block}\n${marker}`);
}

function injectAppFeatures(html) {
  const addHead = [];
  const addBody = [];

  if (!html.includes('/app-nav.css')) {
    addHead.push('<link rel="stylesheet" href="/app-nav.css" data-fourdk-appnav="1">');
  }
  if (!html.includes('/4dk-site-enhance.js')) {
    addHead.push('<script defer src="/4dk-site-enhance.js" data-fourdk-site-enhance="1"></script>');
  }
  if (!html.includes('/4dk-home-current.js')) {
    addHead.push('<script defer src="/4dk-home-current.js" data-fourdk-home-current="1"></script>');
  }
  if (!html.includes('/4dk-week2-rankings.js')) {
    addHead.push('<script defer src="/4dk-week2-rankings.js" data-fourdk-week2-rankings="1"></script>');
  }
  if (!html.includes('/4dk-redzone-week2-final.js')) {
    addHead.push('<script defer src="/4dk-redzone-week2-final.js" data-fourdk-redzone-current="1"></script>');
  }
  if (!html.includes('/4dk-week3-framework.js')) {
    addHead.push('<script defer src="/4dk-week3-framework.js" data-fourdk-week3-framework="1"></script>');
  }
  if (!html.includes('/4dk-ai-2001-video.js')) addHead.push('<script defer src="/4dk-ai-2001-video.js" data-fourdk-ai-2001-video="1"></script>');
  if (!html.includes('/4dk-push.js')) {
    addHead.push('<script defer src="/4dk-push.js" data-fourdk-push="1"></script>');
  }
  if (!html.includes('/power-rankings.js')) {
    addHead.push('<script defer src="/power-rankings.js" data-fourdk-power-rankings="1"></script>');
  }
  if (!html.includes('/mamba-files.js')) {
    addHead.push('<script defer src="/mamba-files.js" data-fourdk-mamba-files="1"></script>');
  }
  if (!html.includes('/social-follow.css')) {
    addHead.push('<link rel="stylesheet" href="/social-follow.css" data-fourdk-social-follow="1">');
  }
  if (!html.includes('/4dk-rewind.js')) {
    addHead.push('<script defer src="/4dk-rewind.js" data-fourdk-rewind="1"></script>');
  }
  if (!html.includes('/app-nav.js') && !html.includes('fourdk-app-nav')) {
    addBody.push('<script defer src="/app-nav.js" data-fourdk-appnav="1"></script>');
  }

  if (addHead.length) {
    const payload = addHead.join('\n');
    if (html.includes('</head>')) html = html.replace('</head>', `${payload}\n</head>`);
    else html = payload + html;
  }

  if (addBody.length) {
    const payload = addBody.join('\n');
    if (html.includes('</body>')) html = html.replace('</body>', `${payload}\n</body>`);
    else html += payload;
  }

  return html;
}

async function navigationResponse(request) {
  try {
    const response = await fetch(request, {cache:'no-store'});
    if (!response || !response.ok) return response;

    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    }

    let html = injectAppFeatures(await response.text());
    html = injectAI2001Video(html);
    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('content-encoding');

    const transformed = new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });

    caches.open(CACHE_NAME).then(cache => cache.put(request, transformed.clone()));
    return transformed;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      const type = cached.headers.get('content-type') || '';
      if (type.includes('text/html')) {
        let html = injectAppFeatures(await cached.text());
        html = injectAI2001Video(html);
        const headers = new Headers(cached.headers);
        headers.delete('content-length');
        headers.delete('content-encoding');
        return new Response(html, {
          status: cached.status,
          statusText: cached.statusText,
          headers
        });
      }
      return cached;
    }
    return caches.match('/offline.html');
  }
}

async function networkFirstAsset(request) {
  try {
    const response = await fetch(request, {cache:'no-store'});
    if (response && response.status === 200 && response.type === 'basic') {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  } catch (error) {
    return caches.match(request);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }

  if (
    url.pathname === '/4dk-site-enhance.js' ||
    url.pathname === '/4dk-home-current.js' ||
    url.pathname === '/4dk-week2-rankings.js' ||
    url.pathname === '/4dk-redzone-week2-final.js' ||
    url.pathname === '/4dk-week3-framework.js' ||
    url.pathname === '/4dk-ai-2001-video.js' ||
    url.pathname === '/power-rankings.js' ||
    url.pathname === '/nfl-picks.js' ||
    url.pathname === '/17-0.css' ||
    url.pathname === '/17-0.js' ||
    url.pathname === '/mamba-files.js' ||
    url.pathname === '/mamba-files.css' ||
    url.pathname === '/social-follow.css' ||
    url.pathname === '/4dk-rewind.js' ||
    url.pathname === '/4dk-rewind.css'
  ) {
    event.respondWith(networkFirstAsset(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);

      return cached || network;
    })
  );
});