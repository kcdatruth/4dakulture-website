const CACHE_NAME = '4dk-pwa-v3-appnav';
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/app.webmanifest',
  '/pwa-install.js',
  '/app-nav.css',
  '/app-nav.js',
  '/4dk-icon-192.png',
  '/4dk-icon-512.png',
  '/4dk-icon-maskable-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
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

function injectAppNav(html) {
  if (html.includes('/app-nav.js') || html.includes('fourdk-app-nav')) return html;
  const css = '<link rel="stylesheet" href="/app-nav.css" data-fourdk-appnav="1">';
  const js = '<script defer src="/app-nav.js" data-fourdk-appnav="1"></script>';
  if (html.includes('</head>')) html = html.replace('</head>', `${css}\n</head>`);
  else html = css + html;
  if (html.includes('</body>')) html = html.replace('</body>', `${js}\n</body>`);
  else html += js;
  return html;
}

async function navigationResponse(request) {
  try {
    const response = await fetch(request);
    if (!response || !response.ok) return response;

    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    }

    const html = injectAppNav(await response.text());
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
        const html = injectAppNav(await cached.text());
        const headers = new Headers(cached.headers);
        headers.delete('content-length');
        headers.delete('content-encoding');
        return new Response(html, {status:cached.status,statusText:cached.statusText,headers});
      }
      return cached;
    }
    return caches.match('/offline.html');
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return; // Keep live scores/data fresh.

  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
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
