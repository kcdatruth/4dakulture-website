const CACHE_NAME='4dk-pwa-v34-top50-rank-block-fix';

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

function getRankBlock(html,rank){
  const marker=`<section class="rank-entry" id="rank-${rank}">`;
  const start=html.indexOf(marker);
  if(start<0) return null;

  const close=html.indexOf('</section>',start);
  if(close<0) return null;

  return html.slice(start,close+'</section>'.length);
}

function changeRank(block,newRank){
  if(!block) return '';
  return block
    .replace(/id="rank-\d+"/,`id="rank-${newRank}"`)
    .replace(/<div class="entry-no">\d+<\/div>/,`<div class="entry-no">${newRank}</div>`);
}

function rewriteTop50(html){
  /*
    IMPORTANT:
    We rebuild the entire #50→#41 section from the ORIGINAL STATIC RANK SLOTS.
    We do not match player names at all.

    Original:
    50 Giddey
    49 JJJ
    48 Flagg
    47 Kyrie
    46 Sabonis
    45 Fox
    44 Zion
    43 Garland
    42 Randle
    41 Avdija

    Final:
    50 Giddey
    49 Flagg
    48 Kyrie
    47 Sabonis
    46 Fox
    45 Zion
    44 Garland
    43 Randle
    42 Duren
    41 Avdija
  */

  const start50=html.indexOf('<section class="rank-entry" id="rank-50">');
  const tier40=html.indexOf(
    '<div class="tier-break"><span>THE NEXT TIER</span><strong>#40 → #31</strong></div>',
    start50
  );

  if(start50<0 || tier40<0) return html;

  const b50=getRankBlock(html,50);
  const b48=getRankBlock(html,48);
  const b47=getRankBlock(html,47);
  const b46=getRankBlock(html,46);
  const b45=getRankBlock(html,45);
  const b44=getRankBlock(html,44);
  const b43=getRankBlock(html,43);
  const b42=getRankBlock(html,42);
  const b41=getRankBlock(html,41);

  if(!b50||!b48||!b47||!b46||!b45||!b44||!b43||!b42||!b41){
    return html;
  }

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
</section>`;

  const rebuilt=[
    changeRank(b50,50),
    changeRank(b48,49),
    changeRank(b47,48),
    changeRank(b46,47),
    changeRank(b45,46),
    changeRank(b44,45),
    changeRank(b43,44),
    changeRank(b42,43),
    duren,
    changeRank(b41,41)
  ].join('\n');

  html=html.slice(0,start50)+rebuilt+'\n'+html.slice(tier40);

  // JJJ replaces Brandon Ingram in Honorable Mentions.
  html=html.replace(
    '<article class="cut-card"><span>JUST MISSED</span><h3>Brandon Ingram</h3><p>The scoring talent is Top-50 caliber, but the overall field was deeper.</p></article>',
    '<article class="cut-card"><span>JUST MISSED</span><h3>Jaren Jackson Jr.</h3><p>Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.</p></article>'
  );

  return html;
}

async function nav(r){
  try{
    const response=await fetch(r,{cache:'no-store'});
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
  }catch(_){
    return await caches.match(r)||await caches.match('/offline.html');
  }
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
