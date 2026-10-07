(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['nba.html','nba'].includes(page) || window.__fourdkNBARegularSeason) return;
  window.__fourdkNBARegularSeason=true;
  const MARK='nba-rs-v1';

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const eastKey=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const m={};p.forEach(x=>m[x.type]=x.value);return `${m.year}-${m.month}-${m.day}`};
  const shift=(k,n)=>{const [y,m,d]=k.split('-').map(Number),x=new Date(Date.UTC(y,m-1,d+n,12));return `${x.getUTCFullYear()}-${String(x.getUTCMonth()+1).padStart(2,'0')}-${String(x.getUTCDate()).padStart(2,'0')}`};
  const tip=iso=>{const d=new Date(iso);return Number.isNaN(d.getTime())?'TBD':new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(d)};

  function css(){
    if(document.getElementById('nba-rs-css')) return;
    const s=document.createElement('style');s.id='nba-rs-css';s.textContent=`
      .nba-now{position:relative;overflow:hidden;padding:28px 0 32px;background:radial-gradient(circle at 88% 15%,rgba(232,69,46,.16),transparent 22rem),linear-gradient(180deg,#0a0d10,#07090c);color:#f5f0e8;border-top:1px solid #2b3035;border-bottom:1px solid #2b3035}
      .nba-now:after{content:'NOW';position:absolute;right:-18px;bottom:-45px;font:1000 clamp(100px,18vw,210px)/.8 Impact,Arial Black,sans-serif;letter-spacing:-.08em;color:#fff;opacity:.02;pointer-events:none}
      .nba-now .shell{position:relative;z-index:2}.nba-now-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:14px}.nba-now-head small{display:block;color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}.nba-now-head h2{margin:6px 0 0;font:1000 clamp(34px,5vw,58px)/.88 Impact,Arial Black,sans-serif;letter-spacing:-.04em;text-transform:uppercase}.nba-now-head span{color:#d5b25f;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .nba-now-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.nba-now-card{min-height:170px;padding:16px;border:1px solid #30363b;background:#101419;color:#f6f2eb!important;text-decoration:none!important;display:flex;flex-direction:column}.nba-now-card.red{border-top:4px solid #ef4a38}.nba-now-card.gold{border-top:4px solid #d8b45d}.nba-now-card.gray{border-top:4px solid #717980}.nba-now-card small{color:#ef6550;font-size:8px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}.nba-now-card b{display:block;margin:9px 0;font:700 20px/1.05 Georgia,serif}.nba-now-card p{margin:auto 0 0;color:#939ba2;font-size:11px;line-height:1.45}
      @media(max-width:900px){.nba-now-grid{display:flex!important;overflow-x:auto!important;overflow-y:hidden!important;gap:9px;padding:0 18px 10px 0;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y}.nba-now-card{flex:0 0 min(82vw,330px);width:min(82vw,330px);min-height:210px;scroll-snap-align:start}}
      @media(max-width:700px){.nba-now-head{align-items:flex-start;flex-direction:column}}
    `;document.head.appendChild(s);
  }

  function hero(){
    const k=document.querySelector('.nba-hero .nba-kicker'),h=document.querySelector('.nba-hero .nba-hero-copy h1'),p=document.querySelector('.nba-hero .nba-hero-copy>p'),n=document.querySelector('.nba-hero-nav');
    if(k)k.textContent='4DK BASKETBALL • 2026–27 REGULAR SEASON';
    if(h)h.innerHTML='NOW IT<br>COUNTS.';
    if(p)p.textContent='Live scores. Nightly takeaways. Power rankings. MVP Watch. Rookie Watch. Every game moves the board.';
    if(n && n.dataset.rs!==MARK){n.dataset.rs=MARK;n.innerHTML='<a href="#nba-scoreboard">Live Scores</a><a href="#nba-now">Right Now</a><a href="nba-power-rankings-2026-27.html">Power Rankings</a><a href="nba-rookie-class-2026.html">Rookie Watch</a><a href="#latest">Latest</a><a href="#challenge">82–0</a><a href="nba-season-preview-2026-27.html">Preseason Archive</a><a href="nba-rosters.html">Teams & Rosters</a>'}
  }

  function pulse(){
    const x=document.querySelector('.nba-pulse-grid');if(!x||x.dataset.rs===MARK)return;x.dataset.rs=MARK;
    x.innerHTML='<div><span>01</span><strong>LIVE SCORES</strong><small>Tonight\'s board updates throughout the night.</small></div><div><span>02</span><strong>POWER RANKINGS</strong><small>Preseason baseline now gives way to real results.</small></div><div><span>03</span><strong>MVP WATCH</strong><small>The predictions are over. The race starts now.</small></div><div><span>04</span><strong>ROOKIE WATCH</strong><small>Thirty expectations. Now the games give us evidence.</small></div>';
  }

  function relabel(){
    const s=document.querySelector('#season-preview');if(s&&s.dataset.rs!==MARK){s.dataset.rs=MARK;s.querySelector('.nba-eyebrow').textContent='4DK • 2026–27 PRESEASON ARCHIVE';s.querySelector('h2').innerHTML='THE PREDICTIONS<br>ARE ON RECORD.';s.querySelector('p').textContent='The full East, West, MVP, awards and Finals preview stays live as the baseline. Now the regular season gets to prove us right — or make us rewrite the board.';s.querySelector('b').textContent='OPEN THE PRESEASON ARCHIVE →'}
    const pr=document.querySelector('#power-rankings-feature');if(pr&&pr.dataset.rs!==MARK){pr.dataset.rs=MARK;pr.querySelector('small').textContent='4DK BASKETBALL • PRESEASON BASELINE';pr.querySelector('h2').textContent='THE BOARD STARTS HERE.';pr.querySelector('p').innerHTML='<strong>Preseason rankings stay on record.</strong> Every result now starts building the first in-season refresh.'}
    const r=document.querySelector('#rookie-class-feature');if(r&&r.dataset.rs!==MARK){r.dataset.rs=MARK;r.querySelector('.nba-eyebrow').textContent='4DK ROOKIE WATCH • REGULAR SEASON';r.querySelector('h2').innerHTML='EXPECTATIONS<br>MEET REAL GAMES.';r.querySelector('p').textContent='The 2026 class entered with projections. Now every night starts changing the rookie board.'}
    const l=document.querySelector('#latest .nba-section-head');if(l&&l.dataset.rs!==MARK){l.dataset.rs=MARK;l.querySelector('.nba-eyebrow').textContent='4DK NBA • REGULAR SEASON DESK';l.querySelector('h2').textContent='THE STORIES MOVE EVERY NIGHT.';l.querySelector('p').textContent='Live games now sit on top of the long-form features, legacy debates and team stories already built into 4DK NBA.'}
    const d=document.querySelector('#preview-desk');if(d&&d.dataset.rs!==MARK){d.dataset.rs=MARK;const e=d.querySelector('.nba-eyebrow'),h=d.querySelector('.nba-section-head h2'),a=d.querySelector('.nba-text-link');if(e)e.textContent='Regular Season Watchlist';if(h)h.textContent='THE QUESTIONS WE START TRACKING NOW.';if(a){a.href='nba-season-preview-2026-27.html';a.textContent='PRESEASON RECEIPTS →'}}
  }

  function rail(){
    let s=document.getElementById('nba-now');if(s)return s;
    s=document.createElement('section');s.id='nba-now';s.className='nba-now';s.innerHTML=`<div class="shell"><div class="nba-now-head"><div><small>4DK NBA • REGULAR SEASON</small><h2>RIGHT NOW ON 4DK NBA.</h2></div><span>SWIPE THE BOARD →</span></div><div class="nba-now-grid" data-nba-now-grid>
      <a class="nba-now-card red" href="#nba-scoreboard"><small>LIVE BOARD</small><b data-now-live>Tonight's NBA slate is loading…</b><p data-now-live-copy>Scores, clocks and tip times update above throughout the night.</p></a>
      <a class="nba-now-card gray" href="#nba-scoreboard"><small>LAST SLATE</small><b data-now-last>Loading the latest finals…</b><p data-now-last-copy>The board starts with what actually happened.</p></a>
      <a class="nba-now-card gold" href="nba-power-rankings-2026-27.html"><small>POWER RANKINGS</small><b>The preseason board becomes the baseline.</b><p>Now every result starts building the first in-season refresh.</p></a>
      <a class="nba-now-card red" href="nba-awards-predictions-2026-27.html"><small>MVP WATCH</small><b>The race is officially live.</b><p>The predictions are over. Real games now drive the conversation.</p></a>
      <a class="nba-now-card gold" href="nba-rookie-class-2026.html"><small>ROOKIE WATCH</small><b>Thirty expectations meet real NBA minutes.</b><p>The 2026 class is no longer a projection exercise.</p></a>
      <a class="nba-now-card gray" href="#latest"><small>LATEST</small><b>The long-form 4DK desk stays underneath the nightly action.</b><p>Features, legacy debates, team stories and season-long analysis.</p></a>
    </div></div>`;
    const sb=document.getElementById('nba-scoreboard'),p=document.querySelector('.nba-pulse');if(sb)sb.after(s);else if(p)p.before(s);else document.querySelector('.nba-hero')?.after(s);return s;
  }

  async function games(k){const r=await fetch(`/api/scores?date=${encodeURIComponent(k)}`,{cache:'no-store'});if(!r.ok)throw Error(r.status);const d=await r.json();return (d.games||[]).filter(g=>g?.league==='NBA')}
  function summary(g){const a=g.away?.abbr||'AWAY',h=g.home?.abbr||'HOME';if(g.state==='in')return `${a} ${g.away?.score??''} • ${h} ${g.home?.score??''} • ${g.statusText||'LIVE'}`;if(g.state==='post')return `${a} ${g.away?.score??''} • ${h} ${g.home?.score??''} • FINAL`;return `${a} @ ${h} • ${tip(g.startTime)}`}
  async function refresh(){
    const s=rail();if(!s)return;try{const t=eastKey(),[now,last]=await Promise.all([games(t),games(shift(t,-1))]);const live=now.filter(g=>g.state==='in'),pre=now.filter(g=>g.state==='pre'),fin=last.filter(g=>g.state==='post');const a=s.querySelector('[data-now-live]'),ac=s.querySelector('[data-now-live-copy]'),b=s.querySelector('[data-now-last]'),bc=s.querySelector('[data-now-last-copy]');if(now.length){a.textContent=live.length?`${live.length} NBA game${live.length===1?' is':'s are'} live right now.`:`${now.length} game${now.length===1?'':'s'} on today's NBA board.`;ac.textContent=summary(live[0]||pre[0]||now[0])}else{a.textContent='No NBA games on today’s board.';ac.textContent='The scoreboard above will automatically move to the next slate.'}if(fin.length){b.textContent=`${fin.length} final${fin.length===1?'':'s'} from the previous NBA slate.`;bc.textContent=fin.slice(0,3).map(summary).join(' • ')}else{b.textContent='No final NBA results from the previous slate.';bc.textContent='The live board stays focused on the current night.'}}
    catch(e){console.warn('4DK NBA regular season rail',e)}
  }

  function apply(){css();hero();pulse();relabel();rail()}
  function start(){apply();refresh();[150,500,1200,2500].forEach(ms=>setTimeout(()=>{apply();if(ms>500)refresh()},ms));setInterval(refresh,60000);new MutationObserver(()=>setTimeout(apply,80)).observe(document.documentElement,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
