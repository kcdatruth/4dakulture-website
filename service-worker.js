const CACHE_NAME='4dk-pwa-v33-top50-source-fix';

const APP_SHELL=[
  '/',
  '/index.html',
  '/offline.html',
  '/app.webmanifest',
  '/pwa-install.js',
  '/app-nav.css',
  '/app-nav.js',
  '/4dk-site-enhance.js',
  '/4dk-discovery-upgrade.js',
  '/4dk-home-current.js',
  '/4dk-week4-current.js',
  '/4dk-nfl-visuals.js',
  '/4dk-redzone-week4-current.js',
  '/4dk-week4-tnf-update.js',
  '/top-50-nba-players-2026-27.html',
  '/nfl-picks.js',
  '/4dk-push.js'
];

self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE_NAME)
    .then(c=>Promise.all(APP_SHELL.map(async u=>{try{await c.add(u)}catch(_){}})))
    .then(()=>self.skipWaiting())
));

self.addEventListener('activate',e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));

function injectSiteShell(h){
  const additions=[];
  const items=[
    ['/app-nav.css','<link rel="stylesheet" href="/app-nav.css">'],
    ['/4dk-site-enhance.js','<script defer src="/4dk-site-enhance.js"></script>'],
    ['/4dk-discovery-upgrade.js','<script defer src="/4dk-discovery-upgrade.js"></script>'],
    ['/4dk-home-current.js','<script defer src="/4dk-home-current.js"></script>'],
    ['/4dk-week4-current.js','<script defer src="/4dk-week4-current.js"></script>'],
    ['/4dk-nfl-visuals.js','<script defer src="/4dk-nfl-visuals.js"></script>'],
    ['/4dk-redzone-week4-current.js','<script defer src="/4dk-redzone-week4-current.js"></script>']
  ];

  for(const [needle,tag] of items){
    if(!h.includes(needle)) additions.push(tag);
  }

  return h.includes('</head>')
    ? h.replace('</head>',additions.join('\n')+'\n</head>')
    : additions.join('\n')+h;
}

function sectionBoundsByName(html,name){
  const marker=`<h2>${name}</h2>`;
  const mid=html.indexOf(marker);
  if(mid<0) return null;

  const start=html.lastIndexOf('<section class="rank-entry"',mid);
  const close=html.indexOf('</section>',mid);

  if(start<0 || close<0) return null;
  return {start,end:close+'</section>'.length};
}

function replacePlayerRank(html,name,newRank){
  const b=sectionBoundsByName(html,name);
  if(!b) return html;

  let block=html.slice(b.start,b.end);
  block=block
    .replace(/id="rank-\d+"/,`id="rank-${newRank}"`)
    .replace(/<div class="entry-no">\d+<\/div>/,`<div class="entry-no">${newRank}</div>`);

  return html.slice(0,b.start)+block+html.slice(b.end);
}

function removePlayerCard(html,name){
  const b=sectionBoundsByName(html,name);
  if(!b) return html;
  return html.slice(0,b.start)+html.slice(b.end);
}

function rewriteTop50(html){
  // Start from the actual static page every time.
  // JJJ leaves the main Top 50 and becomes an Honorable Mention.
  html=removePlayerCard(html,'Jaren Jackson Jr.');

  // Everybody below the new #42 moves down one slot.
  html=replacePlayerRank(html,'Cooper Flagg',49);
  html=replacePlayerRank(html,'Kyrie Irving',48);
  html=replacePlayerRank(html,'Domantas Sabonis',47);
  html=replacePlayerRank(html,'De’Aaron Fox',46);
  html=replacePlayerRank(html,'Zion Williamson',45);
  html=replacePlayerRank(html,'Darius Garland',44);
  html=replacePlayerRank(html,'Julius Randle',43);

  // Duren is inserted directly before #41 Deni Avdija,
  // so the visual order is 43 Randle → 42 Duren → 41 Avdija.
  if(!html.includes('<h2>Jalen Duren</h2>')){
    const duren=`<section class="rank-entry" id="rank-42">
  <div class="entry-no">42</div>
  <div class="entry-copy">
    <div class="entry-label">SCOUTING SNAPSHOT</div>
    <h2>Jalen Duren</h2>
    <div class="entry-meta">
      <span><small>2026–27 TEAM</small><b>Detroit Pistons</b></span>
      <span><small>POSITION</small><b>C</b></span>
    </div>
    <div class="entry-stats"><small>2025–26 REGULAR SEASON</small><strong>19.5 PPG • 10.5 RPG • 65.0 FG% • ALL-STAR • ALL-NBA 3RD</strong></div>
    <div class="entry-analysis"><p>Duren enters the Top 50 after a breakout season that changed Detroit’s timeline. He averaged 19.5 points and 10.5 rebounds while shooting 65 percent from the field, made his first All-Star team and earned Third Team All-NBA as the Pistons won 60 games. The next step is proving the regular-season production holds up in the playoffs and that his defense can become consistently impactful enough for Detroit to trust him as a true long-term second pillar next to Cade Cunningham.</p></div>
  </div>
</section>
`;

    const avdija=sectionBoundsByName(html,'Deni Avdija');
    if(avdija){
      html=html.slice(0,avdija.start)+duren+html.slice(avdija.start);
    }
  }

  // Giddey stays #50. JJJ replaces Brandon Ingram in Honorable Mentions.
  html=html.replace(
    '<article class="cut-card"><span>JUST MISSED</span><h3>Brandon Ingram</h3><p>The scoring talent is Top-50 caliber, but the overall field was deeper.</p></article>',
    '<article class="cut-card"><span>JUST MISSED</span><h3>Jaren Jackson Jr.</h3><p>Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.</p></article>'
  );

  return html;
}

async function getNavigationResponse(r){
  try{
    return await fetch(r,{cache:'no-store'});
  }catch(_){
    return await caches.match(r);
  }
}

async function nav(r){
  const response=await getNavigationResponse(r);
  if(!response) return caches.match('/offline.html');
  if(!response.ok) return response;

  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;

  let html=await response.text();
  const url=new URL(r.url);

  if(url.pathname.endsWith('/top-50-nba-players-2026-27.html')){
    html=rewriteTop50(html);
  }

  html=injectSiteShell(html);

  const headers=new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');

  return new Response(html,{status:response.status,headers});
}

async function networkFirst(r){
  try{
    const response=await fetch(r,{cache:'no-store'});
    if(response&&response.ok){
      const cache=await caches.open(CACHE_NAME);
      cache.put(r,response.clone());
    }
    return response;
  }catch(_){
    return caches.match(r);
  }
}

self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET') return;

  const u=new URL(r.url);
  if(u.origin!==location.origin || u.pathname.startsWith('/api/')) return;

  if(r.mode==='navigate'){
    return e.respondWith(nav(r));
  }

  if([
    '/4dk-site-enhance.js',
    '/4dk-home-current.js',
    '/4dk-week4-current.js',
    '/4dk-nfl-visuals.js',
    '/4dk-redzone-week4-current.js'
  ].includes(u.pathname)){
    return e.respondWith(networkFirst(r));
  }

  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
