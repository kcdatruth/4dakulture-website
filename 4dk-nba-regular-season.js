(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['nba.html','nba'].includes(page)) return;

  // v2 supersedes the original regular-season runtime without deleting any page content.
  window.__fourdkNBARegularSeason=true;
  if(window.__fourdkNBADailyDeskV2) return;
  window.__fourdkNBADailyDeskV2=true;

  const MARK='nba-daily-desk-v2';
  let observerTimer=0;

  const eastKey=()=>{
    const p=new Intl.DateTimeFormat('en-US',{
      timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    const m={};p.forEach(x=>m[x.type]=x.value);
    return `${m.year}-${m.month}-${m.day}`;
  };

  const shift=(k,n)=>{
    const [y,m,d]=k.split('-').map(Number);
    const x=new Date(Date.UTC(y,m-1,d+n,12));
    return `${x.getUTCFullYear()}-${String(x.getUTCMonth()+1).padStart(2,'0')}-${String(x.getUTCDate()).padStart(2,'0')}`;
  };

  const tip=iso=>{
    const d=new Date(iso);
    return Number.isNaN(d.getTime())?'TBD':
      new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(d);
  };

  function css(){
    if(document.getElementById('nba-rs-css')) document.getElementById('nba-rs-css').remove();
    if(document.getElementById('nba-daily-desk-v2-css')) return;

    const s=document.createElement('style');
    s.id='nba-daily-desk-v2-css';
    s.textContent=`
      .nba-now{
        position:relative;overflow:hidden;padding:28px 0 32px;
        background:radial-gradient(circle at 88% 15%,rgba(232,69,46,.16),transparent 22rem),
                   linear-gradient(180deg,#0a0d10,#07090c);
        color:#f5f0e8;border-top:1px solid #2b3035;border-bottom:1px solid #2b3035
      }
      .nba-now:after{
        content:'NOW';position:absolute;right:-18px;bottom:-45px;
        font:1000 clamp(100px,18vw,210px)/.8 Impact,Arial Black,sans-serif;
        letter-spacing:-.08em;color:#fff;opacity:.02;pointer-events:none
      }
      .nba-now .shell{position:relative;z-index:2}
      .nba-now-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:14px}
      .nba-now-head small{display:block;color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}
      .nba-now-head h2{margin:6px 0 0;font:1000 clamp(34px,5vw,58px)/.88 Impact,Arial Black,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .nba-now-head span{color:#d5b25f;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .nba-now-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
      .nba-now-card{min-height:170px;padding:16px;border:1px solid #30363b;background:#101419;color:#f6f2eb!important;text-decoration:none!important;display:flex;flex-direction:column}
      .nba-now-card.red{border-top:4px solid #ef4a38}
      .nba-now-card.gold{border-top:4px solid #d8b45d}
      .nba-now-card.gray{border-top:4px solid #717980}
      .nba-now-card small{color:#ef6550;font-size:8px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}
      .nba-now-card b{display:block;margin:9px 0;font:700 20px/1.05 Georgia,serif}
      .nba-now-card p{margin:auto 0 0;color:#939ba2;font-size:11px;line-height:1.45}

      .nba-daily-strip{
        position:relative;overflow:hidden;padding:28px 0;
        background:linear-gradient(135deg,#15100d,#0d1014 55%,#0b0c0f);
        color:#f5f0e8;border-top:1px solid #3a3430;border-bottom:1px solid #3a3430
      }
      .nba-daily-strip:after{
        content:'24H';position:absolute;right:-10px;bottom:-30px;
        font:1000 118px/.8 Impact,Arial Black,sans-serif;color:#fff;opacity:.025
      }
      .nba-daily-strip .shell{position:relative;z-index:2}
      .nba-daily-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:14px}
      .nba-daily-head small{color:#ef5b43;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .nba-daily-head h2{margin:6px 0 0;font:1000 clamp(34px,5vw,58px)/.88 Impact,Arial Black,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .nba-daily-head a{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .nba-daily-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .nba-daily-box{padding:15px;border:1px solid #34383b;background:#101419}
      .nba-daily-box small{display:block;color:#d8b45d;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .nba-daily-box b{display:block;margin-top:6px;font:700 17px/1.08 Georgia,serif;color:#f6f2eb}
      .nba-daily-box span{display:block;margin-top:5px;color:#939ba2;font-size:9px;line-height:1.4}
      .nba-daily-box.feature{border-top:4px solid #ef4937}
      .nba-daily-box.feature small{color:#ef6550}

      .nba-hero-feature.nba-nightly-lead{
        position:relative;min-height:430px;display:flex!important;flex-direction:column;justify-content:flex-end;
        padding:26px!important;overflow:hidden;background:
          radial-gradient(circle at 78% 18%,rgba(239,73,55,.34),transparent 15rem),
          radial-gradient(circle at 22% 82%,rgba(216,180,93,.12),transparent 17rem),
          linear-gradient(145deg,#161b22,#090b0f 72%)!important
      }
      .nba-hero-feature.nba-nightly-lead img{display:none!important}
      .nba-hero-feature.nba-nightly-lead:before{
        content:'NIGHTCAP';position:absolute;right:-18px;top:55px;
        font:1000 clamp(62px,8vw,105px)/.78 Impact,Arial Black,sans-serif;
        color:#fff;opacity:.035;letter-spacing:-.06em
      }
      .nba-hero-feature.nba-nightly-lead .nba-feature-label,
      .nba-hero-feature.nba-nightly-lead .nba-feature-big,
      .nba-hero-feature.nba-nightly-lead .nba-feature-deck,
      .nba-hero-feature.nba-nightly-lead .nba-feature-read{position:relative;z-index:2}
      .nba-hero-feature.nba-nightly-lead .nba-feature-big{
        font-size:clamp(36px,5vw,66px)!important;line-height:.9!important;
        max-width:760px!important
      }
      .nba-hero-feature.nba-nightly-lead .nba-feature-deck{
        max-width:650px!important;color:#c8cdd1!important
      }

      /* Legacy/offseason material stays live but is visually pushed behind the daily desk. */
      #legacy-ranking,#nba-culture-cover{scroll-margin-top:90px}

      @media(max-width:900px){
        .nba-now-grid{display:flex!important;overflow-x:auto!important;overflow-y:hidden!important;gap:9px;padding:0 18px 10px 0;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y}
        .nba-now-card{flex:0 0 min(82vw,330px);width:min(82vw,330px);min-height:210px;scroll-snap-align:start}
        .nba-daily-grid{grid-template-columns:1fr 1fr}
      }
      @media(max-width:700px){
        .nba-now-head,.nba-daily-head{align-items:flex-start;flex-direction:column}
        .nba-daily-grid{grid-template-columns:1fr}
        .nba-hero-feature.nba-nightly-lead{min-height:360px}
      }
    `;
    document.head.appendChild(s);
  }

  function hero(){
    const k=document.querySelector('.nba-hero .nba-kicker');
    const h=document.querySelector('.nba-hero .nba-hero-copy h1');
    const p=document.querySelector('.nba-hero .nba-hero-copy>p');
    const n=document.querySelector('.nba-hero-nav');

    if(k) k.textContent='4DK BASKETBALL • 2026–27 DAILY DESK';
    if(h) h.innerHTML='NOW IT<br>COUNTS.';
    if(p) p.textContent='Live scores. Nightly takeaways. Nightcap. Power rankings. MVP Watch. Rookie Watch. Every game moves the board.';

    if(n && n.dataset.daily!==MARK){
      n.dataset.daily=MARK;
      n.innerHTML=[
        '<a href="#nba-scoreboard">Live Scores</a>',
        '<a href="#nba-now">Right Now</a>',
        '<a href="nba-nightcap.html">Nightcap</a>',
        '<a href="#nba-daily-strip">Daily Leaders</a>',
        '<a href="nba-power-rankings-2026-27.html">Power Rankings</a>',
        '<a href="nba-rookie-class-2026.html">Rookie Watch</a>',
        '<a href="#latest">Latest</a>',
        '<a href="nba-season-preview-2026-27.html">Preseason Archive</a>',
        '<a href="nba-rosters.html">Teams & Rosters</a>'
      ].join('');
    }
  }

  function pulse(){
    const x=document.querySelector('.nba-pulse-grid');
    if(!x || x.dataset.daily===MARK) return;
    x.dataset.daily=MARK;
    x.innerHTML=
      '<div><span>01</span><strong>LIVE BOARD</strong><small>Scores and tip times stay at the top of the desk.</small></div>'+
      '<div><span>02</span><strong>NBA NIGHTCAP</strong><small>Every completed slate gets a permanent record.</small></div>'+
      '<div><span>03</span><strong>POWER RANKINGS</strong><small>The preseason baseline stays on record as results pile up.</small></div>'+
      '<div><span>04</span><strong>ROOKIE WATCH</strong><small>Thirty expectations. Real games keep changing the board.</small></div>';
  }

  function relabel(){
    const s=document.querySelector('#season-preview');
    if(s && s.dataset.daily!==MARK){
      s.dataset.daily=MARK;
      const e=s.querySelector('.nba-eyebrow'),h=s.querySelector('h2'),p=s.querySelector('p'),b=s.querySelector('b');
      if(e)e.textContent='4DK • 2026–27 PRESEASON ARCHIVE';
      if(h)h.innerHTML='THE PREDICTIONS<br>ARE ON RECORD.';
      if(p)p.textContent='The full East, West, MVP, awards and Finals preview stays live as the baseline. Every new result now gives us evidence.';
      if(b)b.textContent='OPEN THE PRESEASON ARCHIVE →';
    }

    const pr=document.querySelector('#power-rankings-feature');
    if(pr && pr.dataset.daily!==MARK){
      pr.dataset.daily=MARK;
      const e=pr.querySelector('small'),h=pr.querySelector('h2'),p=pr.querySelector('p');
      if(e)e.textContent='4DK BASKETBALL • PRESEASON BASELINE';
      if(h)h.textContent='THE BOARD STARTS HERE.';
      if(p)p.innerHTML='<strong>Preseason rankings stay on record.</strong> The first in-season refresh will be built from what actually happens on the floor.';
    }

    const r=document.querySelector('#rookie-class-feature');
    if(r && r.dataset.daily!==MARK){
      r.dataset.daily=MARK;
      const e=r.querySelector('.nba-eyebrow'),h=r.querySelector('h2'),p=r.querySelector('p');
      if(e)e.textContent='4DK ROOKIE WATCH • 2026 CLASS';
      if(h)h.innerHTML='EXPECTATIONS<br>MEET REAL MINUTES.';
      if(p)p.textContent='The class entered with projections. Every game now starts changing the rookie conversation.';
    }

    const l=document.querySelector('#latest .nba-section-head');
    if(l && l.dataset.daily!==MARK){
      l.dataset.daily=MARK;
      const e=l.querySelector('.nba-eyebrow'),h=l.querySelector('h2'),p=l.querySelector('p');
      if(e)e.textContent='4DK NBA • LONG-FORM DESK';
      if(h)h.textContent='THE FEATURES STILL LIVE HERE.';
      if(p)p.textContent='Legacy pieces, offseason stories and deep dives stay intact underneath the daily basketball desk.';
    }

    const d=document.querySelector('#preview-desk');
    if(d && d.dataset.daily!==MARK){
      d.dataset.daily=MARK;
      const e=d.querySelector('.nba-eyebrow'),h=d.querySelector('.nba-section-head h2'),a=d.querySelector('.nba-text-link');
      if(e)e.textContent='Season Watchlist';
      if(h)h.textContent='THE QUESTIONS WE KEEP TRACKING.';
      if(a){a.href='nba-season-preview-2026-27.html';a.textContent='PRESEASON RECEIPTS →'}
    }
  }

  function rail(){
    let s=document.getElementById('nba-now');
    if(!s){
      s=document.createElement('section');
      s.id='nba-now';
      s.className='nba-now';
      s.innerHTML=`<div class="shell">
        <div class="nba-now-head">
          <div><small>4DK NBA • DAILY DESK</small><h2>RIGHT NOW ON 4DK NBA.</h2></div>
          <span>SWIPE THE BOARD →</span>
        </div>
        <div class="nba-now-grid" data-nba-now-grid>
          <a class="nba-now-card red" href="#nba-scoreboard">
            <small>LIVE BOARD</small>
            <b data-now-live>Today's NBA slate is loading…</b>
            <p data-now-live-copy>Scores, clocks and tip times update above.</p>
          </a>
          <a class="nba-now-card gray" href="#nba-scoreboard">
            <small>LAST SLATE</small>
            <b data-now-last>Loading the latest finals…</b>
            <p data-now-last-copy>The board starts with what actually happened.</p>
          </a>
          <a class="nba-now-card gold" href="nba-nightcap.html">
            <small>NBA NIGHTCAP</small>
            <b>Every completed slate gets a permanent 4DK record.</b>
            <p>Player of the Night. Rookie spotlight. Top numbers. Game of the Night.</p>
          </a>
          <a class="nba-now-card gold" href="nba-power-rankings-2026-27.html">
            <small>POWER RANKINGS</small>
            <b>The preseason board is the baseline.</b>
            <p>Results are now building the first in-season movement.</p>
          </a>
          <a class="nba-now-card red" href="nba-awards-predictions-2026-27.html">
            <small>MVP WATCH</small>
            <b>The predictions stay on record.</b>
            <p>The real race takes over when the regular season begins.</p>
          </a>
          <a class="nba-now-card gold" href="nba-rookie-class-2026.html">
            <small>ROOKIE WATCH</small>
            <b>Thirty expectations meet real NBA minutes.</b>
            <p>The 2026 class is already giving us new evidence.</p>
          </a>
        </div>
      </div>`;
    }
    return s;
  }

  function dailyStrip(){
    let s=document.getElementById('nba-daily-strip');
    if(!s){
      s=document.createElement('section');
      s.id='nba-daily-strip';
      s.className='nba-daily-strip';
      s.innerHTML=`<div class="shell">
        <div class="nba-daily-head">
          <div><small>4DK NBA • LAST 24 HOURS</small><h2>THE DAILY RECEIPTS.</h2></div>
          <a href="nba-nightcap.html">OPEN NIGHTCAP ARCHIVE →</a>
        </div>
        <div class="nba-daily-grid">
          <div class="nba-daily-box feature"><small>LATEST NIGHTCAP</small><b data-daily-title>Loading the latest Nightcap…</b><span data-daily-date></span></div>
          <div class="nba-daily-box"><small>PLAYER OF THE NIGHT</small><b data-daily-player>Loading…</b><span>Latest completed 4DK slate</span></div>
          <div class="nba-daily-box"><small>ROOKIE SPOTLIGHT</small><b data-daily-rookie>Loading…</b><span>Latest completed 4DK slate</span></div>
          <div class="nba-daily-box"><small>GAME OF THE NIGHT</small><b data-daily-game>Loading…</b><span data-daily-link>Nightcap archive</span></div>
        </div>
      </div>`;
    }
    return s;
  }

  async function latestNightcap(){
    try{
      const r=await fetch('nba-nightcap-index.json',{cache:'no-store'});
      if(!r.ok) throw Error(r.status);
      const items=await r.json();
      return Array.isArray(items)&&items.length?items[0]:null;
    }catch(e){
      console.warn('4DK daily desk Nightcap',e);
      return null;
    }
  }

  async function games(k){
    const r=await fetch(`/api/scores?date=${encodeURIComponent(k)}`,{cache:'no-store'});
    if(!r.ok) throw Error(r.status);
    const d=await r.json();
    return (d.games||[]).filter(g=>g?.league==='NBA');
  }

  function summary(g){
    const a=g.away?.abbr||'AWAY',h=g.home?.abbr||'HOME';
    if(g.state==='in') return `${a} ${g.away?.score??''} • ${h} ${g.home?.score??''} • ${g.statusText||'LIVE'}`;
    if(g.state==='post') return `${a} ${g.away?.score??''} • ${h} ${g.home?.score??''} • FINAL`;
    return `${a} @ ${h} • ${tip(g.startTime)}`;
  }

  async function updateNightcap(){
    const item=await latestNightcap();
    if(!item) return;

    const strip=dailyStrip();
    const t=strip.querySelector('[data-daily-title]');
    const d=strip.querySelector('[data-daily-date]');
    const p=strip.querySelector('[data-daily-player]');
    const r=strip.querySelector('[data-daily-rookie]');
    const g=strip.querySelector('[data-daily-game]');
    const l=strip.querySelector('[data-daily-link]');
    if(t)t.textContent=item.title;
    if(d)d.textContent=`${item.label} • ${item.date}`;
    if(p)p.textContent=item.player;
    if(r)r.textContent=item.rookie;
    if(g)g.textContent=item.game;
    if(l)l.textContent='Read the full Nightcap →';

    const feature=document.querySelector('.nba-hero-feature');
    if(feature){
      feature.classList.add('nba-nightly-lead');
      feature.href=item.href;
      const label=feature.querySelector('.nba-feature-label');
      const big=feature.querySelector('.nba-feature-big');
      const deck=feature.querySelector('.nba-feature-deck');
      const read=feature.querySelector('.nba-feature-read');
      if(label)label.textContent=`LATEST NIGHTCAP • ${item.date}`;
      if(big)big.textContent=item.title;
      if(deck)deck.textContent=item.deck;
      if(read)read.textContent='READ THE LATEST NIGHTCAP →';
    }
  }

  async function refreshScores(){
    const s=rail();
    try{
      const t=eastKey();
      const [now,last]=await Promise.all([games(t),games(shift(t,-1))]);
      const live=now.filter(g=>g.state==='in');
      const pre=now.filter(g=>g.state==='pre');
      const postToday=now.filter(g=>g.state==='post');
      const fin=last.filter(g=>g.state==='post');

      const a=s.querySelector('[data-now-live]');
      const ac=s.querySelector('[data-now-live-copy]');
      const b=s.querySelector('[data-now-last]');
      const bc=s.querySelector('[data-now-last-copy]');

      if(now.length){
        if(a){
          if(live.length) a.textContent=`${live.length} NBA game${live.length===1?' is':'s are'} live right now.`;
          else if(postToday.length && !pre.length) a.textContent=`${postToday.length} final${postToday.length===1?'':'s'} on today's NBA board.`;
          else a.textContent=`${now.length} game${now.length===1?'':'s'} on today's NBA board.`;
        }
        if(ac) ac.textContent=summary(live[0]||pre[0]||postToday[0]||now[0]);
      }else{
        if(a)a.textContent='No NBA games on today’s board.';
        if(ac)ac.textContent='The scoreboard above automatically moves to the next slate.';
      }

      const finals=postToday.length?postToday:fin;
      if(finals.length){
        if(b)b.textContent=`${finals.length} recent final${finals.length===1?'':'s'} on the board.`;
        if(bc)bc.textContent=finals.slice(0,3).map(summary).join(' • ');
      }else{
        if(b)b.textContent='No recent NBA finals on the board.';
        if(bc)bc.textContent='The live board stays focused on the current slate.';
      }
    }catch(e){
      console.warn('4DK NBA daily desk scores',e);
    }
  }

  function order(){
    const hero=document.querySelector('.nba-hero');
    const scoreboard=document.getElementById('nba-scoreboard');
    const now=rail();
    const nightcap=document.querySelector('.nba-nightcap-band');
    const daily=dailyStrip();
    const pulse=document.querySelector('.nba-pulse');

    // Desired top-of-page order:
    // HERO → LIVE SCOREBOARD → RIGHT NOW → NIGHTCAP → DAILY RECEIPTS → PULSE
    let anchor=hero;
    [scoreboard,now,nightcap,daily,pulse].forEach(node=>{
      if(node && anchor && anchor.nextElementSibling!==node){
        anchor.insertAdjacentElement('afterend',node);
      }
      if(node) anchor=node;
    });

    // Push legacy/evergreen blocks lower without deleting them.
    const latest=document.getElementById('latest');
    const culture=document.getElementById('nba-culture-cover');
    const legacy=document.getElementById('legacy-ranking');

    if(latest){
      let after=latest;
      if(culture && latest.nextElementSibling!==culture){
        after.insertAdjacentElement('afterend',culture);
        after=culture;
      }else if(culture){after=culture}
      if(legacy && after.nextElementSibling!==legacy){
        after.insertAdjacentElement('afterend',legacy);
      }
    }
  }

  function apply(){
    css();
    hero();
    pulse();
    relabel();
    rail();
    dailyStrip();
    order();
  }

  function start(){
    apply();
    updateNightcap();
    refreshScores();

    [150,500,1000,1800,3000,5000,8500].forEach(ms=>setTimeout(()=>{
      apply();
      order();
      if(ms>=1000){
        updateNightcap();
        refreshScores();
      }
    },ms));

    setInterval(refreshScores,60000);

    new MutationObserver(()=>{
      clearTimeout(observerTimer);
      observerTimer=setTimeout(()=>{
        apply();
        order();
      },90);
    }).observe(document.documentElement,{childList:true,subtree:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();