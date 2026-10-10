/* 4 DA KULTURE — DAILY FRONT DESK 2.0
 * Additive homepage upgrade. Existing content is kept intact.
 * Editorial stories: 4dk-frontdesk-feed.json
 * NBA nightly feed: nba-nightcap-index.json (automatic, no duplicate edits).
 */
(() => {
  const route = location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  if (route && route !== 'index' || window.__fourdkDailyDesk2) return;
  window.__fourdkDailyDesk2 = true;

  const qs = s => document.querySelector(s);
  const safe = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const page = p => typeof p === 'string' && /^(?!\/)(?!.*\.\.\/)[a-z0-9][a-z0-9-]*\.html(?:#[a-z0-9-]+)?$/i.test(p) ? p : 'stories.html';
  const asset = p => typeof p === 'string' && /^[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp)$/i.test(p) ? p : '';
  const MAX = 14;
  let active = 'ALL';
  let stories = [];

  function styles() {
    if (qs('#fourdk-daily-desk-style')) return;
    const st = document.createElement('style');
    st.id = 'fourdk-daily-desk-style';
    st.textContent = `
      #fourdk-daily-desk{background:#090b0d;color:#f4f0e7;isolation:isolate;border-bottom:5px solid #d94631;font-family:Arial,Helvetica,sans-serif}
      #fourdk-daily-desk *{box-sizing:border-box}
      #fourdk-daily-desk .dk-shell{width:min(1220px,calc(100% - 36px));margin-inline:auto}
      #fourdk-daily-desk .dk-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:17px 0;border-bottom:1px solid #34383d}
      #fourdk-daily-desk .dk-edition{display:flex;gap:10px;align-items:center;font-size:10px;font-weight:900;letter-spacing:.16em}
      #fourdk-daily-desk .dk-edition b{color:#f6c767}
      #fourdk-daily-desk .dk-edition i{width:9px;height:9px;background:#eb5038;border-radius:50%;box-shadow:0 0 0 4px #eb503820}
      #fourdk-daily-desk .dk-date{font-size:9px;color:#b4b6b5;letter-spacing:.10em;text-transform:uppercase}
      #fourdk-daily-desk .dk-mast{display:flex;justify-content:space-between;align-items:end;gap:24px;padding:28px 0 23px}
      #fourdk-daily-desk .dk-mast h2{font:900 clamp(42px,6.9vw,94px)/.83 Impact,'Arial Black',sans-serif;letter-spacing:-.046em;text-transform:uppercase;margin:0;max-width:840px}
      #fourdk-daily-desk .dk-mast h2 em{font-style:normal;color:#f2bc55}
      #fourdk-daily-desk .dk-mast p{max-width:280px;margin:0;color:#b9bdbe;font:15px/1.55 Georgia,serif}
      #fourdk-daily-desk .dk-columns{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(300px,.75fr);gap:12px}
      #fourdk-daily-desk a{text-decoration:none}
      #fourdk-daily-desk .dk-lead{display:flex;flex-direction:column;justify-content:end;min-height:430px;padding:31px;position:relative;overflow:hidden;background:linear-gradient(115deg,#182129,#0b1318 48%,#14120e);color:#fff!important;border:1px solid #4b4140}
      #fourdk-daily-desk .dk-lead:before{content:'4DK';position:absolute;right:-10px;top:-35px;font:900 clamp(150px,24vw,300px)/1 Impact,sans-serif;color:#f4b957;opacity:.065;transform:rotate(-8deg);pointer-events:none}
      #fourdk-daily-desk .dk-lead:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 15%,#d9463140,transparent 35%),repeating-linear-gradient(90deg,transparent 0 72px,#ffffff08 73px 74px);pointer-events:none}
      #fourdk-daily-desk .dk-lead.has-image{background-position:center;background-size:cover}
      #fourdk-daily-desk .dk-lead > *{position:relative;z-index:2}
      #fourdk-daily-desk .dk-stamp{align-self:flex-start;background:#d94631;padding:9px 11px;color:#fff;font-weight:900;font-size:9px;letter-spacing:.13em;text-transform:uppercase}
      #fourdk-daily-desk .dk-lead h3{font:900 clamp(40px,5.2vw,69px)/.92 Impact,'Arial Black',sans-serif;letter-spacing:-.035em;text-transform:uppercase;margin:14px 0 12px;max-width:720px;color:#fff}
      #fourdk-daily-desk .dk-lead p{font:16px/1.55 Georgia,serif;color:#e0e2e2;max-width:650px;margin:0}
      #fourdk-daily-desk .dk-read{margin-top:20px;font-size:11px;font-weight:900;letter-spacing:.08em;color:#f3c46b;text-transform:uppercase}
      #fourdk-daily-desk .dk-side{display:grid;gap:12px;grid-template-rows:repeat(3,minmax(0,1fr))}
      #fourdk-daily-desk .dk-side-card{position:relative;min-height:130px;overflow:hidden;display:flex;flex-direction:column;justify-content:end;background:#15191c;border:1px solid #333c40;padding:19px;color:#fff!important;transition:border-color .2s,transform .2s}
      #fourdk-daily-desk .dk-side-card:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#090b0cf2,#0a0d0c99 85%),radial-gradient(circle at 80% 20%,#ed4d3540,transparent 55%);pointer-events:none}
      #fourdk-daily-desk .dk-side-card.has-image{background-size:cover;background-position:center}
      #fourdk-daily-desk .dk-side-card>*{z-index:1;position:relative}
      #fourdk-daily-desk .dk-side-card small{font-size:9px;font-weight:900;color:#f4bf60;letter-spacing:.12em;text-transform:uppercase}
      #fourdk-daily-desk .dk-side-card strong{margin:6px 0 0;font:900 clamp(21px,2.4vw,28px)/1.05 Impact,'Arial Black',sans-serif;text-transform:uppercase;letter-spacing:.005em}
      #fourdk-daily-desk .dk-ribbon{display:flex;gap:7px;flex-wrap:wrap;align-items:center;padding:16px 0 24px;border-bottom:1px solid #373737}
      #fourdk-daily-desk .dk-ribbon strong{color:#f1bf65;font-size:10px;letter-spacing:.12em;margin-right:9px}
      #fourdk-daily-desk .dk-ribbon a{color:#fff!important;border:1px solid #4a4f52;font-size:10px;font-weight:900;padding:10px 12px;letter-spacing:.04em}
      #fourdk-daily-desk .dk-latest{padding:29px 0 36px}
      #fourdk-daily-desk .dk-rail-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:16px}
      #fourdk-daily-desk .dk-rail-head h3{font:900 clamp(32px,4.1vw,52px)/.9 Impact,'Arial Black',sans-serif;letter-spacing:-.025em;margin:4px 0 0;color:#f5f0e5}
      #fourdk-daily-desk .dk-rail-head small{font-size:9px;letter-spacing:.13em;color:#f3b25e;font-weight:900}
      #fourdk-daily-desk .dk-rail-head a{font-size:10px;font-weight:900;color:#f4bc63!important}
      #fourdk-daily-desk .dk-filters{display:flex;gap:7px;overflow-x:auto;padding:0 0 14px;scrollbar-width:thin}
      #fourdk-daily-desk .dk-filters button{flex:0 0 auto;cursor:pointer;background:transparent;color:#c9cbcb;border:1px solid #4b4b4b;padding:9px 13px;font-size:10px;font-weight:900;letter-spacing:.07em}
      #fourdk-daily-desk .dk-filters button[aria-pressed=true]{background:#d94631;color:#fff;border-color:#d94631}
      #fourdk-daily-desk .dk-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
      #fourdk-daily-desk .dk-card{background:#14171a;border:1px solid #383c42;overflow:hidden;min-width:0;color:#fff!important;transition:transform .2s,border-color .2s}
      #fourdk-daily-desk .dk-card .dk-poster{height:142px;position:relative;overflow:hidden;background:linear-gradient(145deg,#43201a,#131a22)}
      #fourdk-daily-desk .dk-card .dk-poster img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
      #fourdk-daily-desk .dk-card .dk-poster.no-image:after{content:'4DK';position:absolute;right:8px;bottom:-13px;color:#ffffff18;font:900 100px/1 Impact,sans-serif;letter-spacing:-.1em}
      #fourdk-daily-desk .dk-card .dk-copy{padding:15px}
      #fourdk-daily-desk .dk-card small{font-size:9px;color:#e9bc72;letter-spacing:.08em;font-weight:900;text-transform:uppercase}
      #fourdk-daily-desk .dk-card h4{margin:9px 0;font:900 23px/1.02 Impact,'Arial Black',sans-serif;color:#fff;text-transform:uppercase;letter-spacing:-.007em}
      #fourdk-daily-desk .dk-card p{color:#b3babe;font:12px/1.5 Georgia,serif;margin:0 0 11px}
      #fourdk-daily-desk .dk-card .dk-cta{color:#f5be63;font-weight:900;font-size:9px;letter-spacing:.1em}
      #fourdk-daily-desk a:hover{border-color:#e6a954;transform:translateY(-2px)}
      #fourdk-daily-desk .dk-card:hover img{transform:scale(1.04)}
      #fourdk-daily-desk .dk-closer{border-top:1px solid #30353b;display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;padding:16px 0 21px;color:#9ca3a5;font-size:10px;letter-spacing:.065em}
      #fourdk-daily-desk .dk-closer b{color:#f3bb60}
      @media(max-width:960px){#fourdk-daily-desk .dk-columns{grid-template-columns:1fr}#fourdk-daily-desk .dk-side{grid-template-columns:repeat(3,1fr);grid-template-rows:auto}#fourdk-daily-desk .dk-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#fourdk-daily-desk .dk-mast{align-items:start;flex-direction:column}#fourdk-daily-desk .dk-mast p{max-width:640px}}
      @media(max-width:640px){#fourdk-daily-desk .dk-shell{width:calc(100% - 28px)}#fourdk-daily-desk .dk-mast{padding:23px 0 18px}#fourdk-daily-desk .dk-mast h2{font-size:clamp(47px,12vw,70px)}#fourdk-daily-desk .dk-columns{gap:8px}#fourdk-daily-desk .dk-lead{min-height:400px;padding:21px}#fourdk-daily-desk .dk-lead h3{font-size:clamp(41px,11vw,61px)}#fourdk-daily-desk .dk-side{grid-template-columns:1fr}#fourdk-daily-desk .dk-side-card{min-height:110px}#fourdk-daily-desk .dk-grid{grid-template-columns:1fr 1fr;gap:8px}#fourdk-daily-desk .dk-card .dk-poster{height:95px}#fourdk-daily-desk .dk-card .dk-copy{padding:11px}#fourdk-daily-desk .dk-card h4{font-size:18px}#fourdk-daily-desk .dk-card p{display:none}#fourdk-daily-desk .dk-ribbon{padding-bottom:19px}#fourdk-daily-desk .dk-ribbon a{font-size:9px}#fourdk-daily-desk .dk-date{font-size:8px}}
    `;
    document.head.appendChild(st);
  }

  function formatDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return 'LATEST EDITION';
    const [y,m,d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y,m-1,d,12)).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).toUpperCase();
  }
  const visible = x => !!x && !!x.title && !!x.href && !!x.category;
  const cat = v => ({NBA:'NBA',NFL:'NFL',MUSIC:'MUSIC',SCREEN:'SCREEN'}[String(v || '').toUpperCase()] || 'CULTURE');

  async function readJSON(path) {
    const resp = await fetch(path,{cache:'no-store'});
    if (!resp.ok) throw Error(`${path}: ${resp.status}`);
    const json = await resp.json();
    if (!Array.isArray(json)) throw Error(`${path}: invalid data`);
    return json;
  }

  function nightcaps(rows) {
    return rows.slice(0,7).filter(x=>x.href && x.title && /^\d{4}-\d{2}-\d{2}$/.test(x.date_iso || '')).map(x=>({
      category:'NBA', title:`NBA NIGHTCAP: ${x.title}`, label:x.label || 'NBA NIGHTCAP',
      deck:x.deck || 'Every game. The moments that mattered.', href:x.href,
      date:x.date_iso, image:'', feature:true
    }));
  }

  function render() {
    styles();
    const main = qs('main#main');
    if(!main) return;
    const lead = stories[0];
    if(!lead) return;
    // Keep the homepage multi-disciplinary even on nights with many NBA recaps.
    const candidates = stories.filter(x=>x.href!==lead.href);
    const sides = [];
    for (const category of ['NBA','SCREEN','MUSIC']) {
      const entry = candidates.find(x=>x.category===category && !sides.some(y=>y.href===x.href));
      if(entry) sides.push(entry);
    }
    for (const entry of candidates) {
      if(sides.length===3)break;
      if(!sides.some(y=>y.href===entry.href))sides.push(entry);
    }
    const latest = stories.filter(x=>active==='ALL'||x.category===active).slice(0,MAX);
    const date = stories.map(x=>x.date||'').sort().reverse()[0] || '';
    let desk = qs('#fourdk-daily-desk');
    if (!desk) {desk=document.createElement('section'); desk.id='fourdk-daily-desk'; desk.setAttribute('aria-label','4 Da Kulture daily front desk'); main.insertBefore(desk,main.firstElementChild);}
    const imageStyle = x => asset(x.image) ? `background-image:linear-gradient(0deg,#080b0c 0%,#080b0ca8 58%,#080b0c36 100%),url('${asset(x.image)}')` : '';
    desk.innerHTML = `
      <div class="dk-shell">
        <div class="dk-top"><div class="dk-edition"><i aria-hidden="true"></i><b>4DK</b><span>THE DAILY FRONT DESK</span></div><div class="dk-date">LATEST PUBLISHED: ${formatDate(date)} • ORIGINAL COVERAGE</div></div>
        <div class="dk-mast"><h2>THE KULTURE<br><em>DOESN'T CLOCK OUT.</em></h2><p>The games. The records. The stories. The conversations. Independent coverage—on our time and in our voice.</p></div>
        <div class="dk-columns">
          <a class="dk-lead${asset(lead.image)?' has-image':''}" href="${page(lead.href)}" ${imageStyle(lead)?`style="${imageStyle(lead)}"`:''}>
            <span class="dk-stamp">${safe(lead.label||lead.category+' • LEAD STORY')}</span>
            <h3>${safe(lead.title)}</h3><p>${safe(lead.deck)}</p><span class="dk-read">READ THE FULL STORY →</span>
          </a>
          <div class="dk-side">${sides.map(x=>`<a class="dk-side-card${asset(x.image)?' has-image':''}" href="${page(x.href)}" ${imageStyle(x)?`style="${imageStyle(x)}"`:''}><small>${safe(x.label||x.category)}</small><strong>${safe(x.title)}</strong></a>`).join('')}</div>
        </div>
        <nav class="dk-ribbon" aria-label="4DK desks and rankings"><strong>THE 4DK BEAT</strong><a href="nba.html">NBA DESK ↗</a><a href="nba-nightcap.html">NBA NIGHTCAP ↗</a><a href="nfl.html">NFL DESK ↗</a><a href="hiphop.html">MUSIC DESK ↗</a><a href="the-drop-episode-5.html">THE DROP ↗</a><a href="stories.html">STORY ARCHIVE ↗</a></nav>
        <div class="dk-latest"><div class="dk-rail-head"><div><small>NEW WRITES • ARCHIVES STAY PUT</small><h3>STRAIGHT FROM THE DESK.</h3></div><a href="stories.html">ALL 4DK STORIES →</a></div>
          <div class="dk-filters" role="group" aria-label="Filter coverage">${['ALL','NBA','NFL','MUSIC','SCREEN'].map(x=>`<button type="button" data-dk-filter="${x}" aria-pressed="${active===x}">${x==='ALL'?'ALL STORIES':x==='SCREEN'?'TV & FILM':x}</button>`).join('')}</div>
          <div class="dk-grid">${latest.map(x=>`<a class="dk-card" href="${page(x.href)}"><div class="dk-poster${asset(x.image)?'':' no-image'}">${asset(x.image)?`<img loading="lazy" src="${asset(x.image)}" alt="${safe(x.alt||x.title)}">`:''}</div><div class="dk-copy"><small>${safe(x.label||x.category)}${x.date?' • '+formatDate(x.date):''}</small><h4>${safe(x.title)}</h4><p>${safe(x.deck||'An original story from the 4DK desk.')}</p><span class="dk-cta">READ THE STORY ↗</span></div></a>`).join('')||'<p>No stories in this desk yet.</p>'}</div>
        </div>
        <div class="dk-closer"><span><b>4 DA KULTURE</b> • SPORTS. HIP-HOP. CULTURE.</span><span>AN INDEPENDENT VOICE. NOT A COPY OF SOMEBODY ELSE.</span></div>
      </div>`;
    desk.querySelectorAll('[data-dk-filter]').forEach(b=>b.addEventListener('click',()=>{
      const chosen=b.dataset.dkFilter;
      if(chosen!==active){active=chosen;render();desk.querySelector('.dk-latest')?.scrollIntoView({block:'nearest',behavior:'smooth'});}
    }));
  }

  async function start() {
    let curated=[];let nightly=[];
    try{curated=await readJSON('4dk-frontdesk-feed.json')}catch(e){console.warn('4DK editorial feed:',e.message)}
    try{nightly=nightcaps(await readJSON('nba-nightcap-index.json'))}catch(e){console.warn('4DK nightcap feed:',e.message)}
    const combined=[...nightly,...curated].filter(visible).map(x=>({...x,category:cat(x.category)}));
    const seen=new Set();
    stories=combined.filter(x=>{if(seen.has(x.href))return false;seen.add(x.href);return true}).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||((b.priority||0)-(a.priority||0)));
    if(!stories.length) return;
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
