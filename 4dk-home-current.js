(() => {
  const path=(location.pathname||'/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek4FinalHomeV2) return;
  window.__fourdkWeek4FinalHomeV2=true;

  const MARKER='week4-final-week5-next-carousel-fix-v2';
  let repairTimer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week4-final-home-styles-v2')) return;
    const s=document.createElement('style');
    s.id='fourdk-week4-final-home-styles-v2';
    s.textContent=`
      body.home-page .home-v2-primary{position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(4,6,5,.98),rgba(4,6,5,.88) 55%,rgba(4,6,5,.50)),radial-gradient(circle at 84% 18%,rgba(232,69,46,.28),transparent 15rem),radial-gradient(circle at 72% 76%,rgba(215,173,85,.16),transparent 18rem),linear-gradient(135deg,#1d130e,#080b09 72%)!important;border-color:#55412e!important}
      body.home-page .home-v2-primary:before{content:'W5'!important;right:-10px!important;bottom:-28px!important;font-size:clamp(92px,16vw,190px)!important;color:#fff!important;opacity:.045!important}
      body.home-page .home-v2-primary h1 em{color:#f0bf54!important}
      body.home-page .home-v2-desk.nfl{position:relative;overflow:hidden;background:radial-gradient(circle at 86% 10%,rgba(226,82,38,.24),transparent 13rem),linear-gradient(145deg,#17100c,#080b09 72%)!important}
      body.home-page .home-v2-desk.nfl:after{content:'W5 NEXT'!important;position:absolute;right:-12px;top:10px;font:1000 clamp(42px,6vw,84px)/1 Arial Black,Impact,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.035;pointer-events:none}
      .fourdk-current-shelf{position:relative;overflow:hidden;padding:19px 0 21px;background:#0b0d0b;color:#fff;border-top:1px solid #292f2a;border-bottom:1px solid #292f2a}
      .fourdk-current-shelf-inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto;min-width:0}
      .fourdk-current-shelf-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:12px}
      .fourdk-current-shelf-head small{display:block;color:#ff6548;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-current-shelf-head strong{display:block;margin-top:3px;font:1000 24px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-current-shelf-links{display:flex;align-items:center;gap:12px}
      .fourdk-current-shelf-head a,.fourdk-swipe-hint{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .fourdk-swipe-hint{display:none}
      .fourdk-current-shelf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;min-width:0}
      .fourdk-current-shelf-card{display:flex;flex-direction:column;min-height:145px;padding:13px;border:1px solid #303630;background:#121512;color:#f5f2eb!important;text-decoration:none!important;min-width:0}
      .fourdk-current-shelf-card small{color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-current-shelf-card b{display:block;margin:7px 0;font:700 17px/1.05 Georgia,serif}
      .fourdk-current-shelf-card span{margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.38}
      @media(max-width:900px){
        .fourdk-current-shelf{overflow:hidden!important}
        .fourdk-current-shelf-inner{width:100%!important;max-width:none!important;padding-left:34px;padding-right:0}
        .fourdk-current-shelf-head{padding-right:34px}
        .fourdk-current-shelf-grid{display:flex!important;flex-wrap:nowrap!important;gap:10px!important;width:100%!important;max-width:100vw!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-x:contain;touch-action:pan-x pan-y;scroll-snap-type:x proximity;scroll-padding-left:0;padding:0 34px 12px 0;scrollbar-width:thin;scrollbar-color:#5e645f transparent}
        .fourdk-current-shelf-grid::-webkit-scrollbar{height:4px}.fourdk-current-shelf-grid::-webkit-scrollbar-track{background:transparent}.fourdk-current-shelf-grid::-webkit-scrollbar-thumb{background:#5e645f;border-radius:99px}
        .fourdk-current-shelf-card{flex:0 0 min(82vw,330px)!important;width:min(82vw,330px)!important;scroll-snap-align:start;min-height:285px!important;padding:24px!important}
        .fourdk-current-shelf-card small{font-size:10px!important}.fourdk-current-shelf-card b{font-size:26px!important;line-height:1.02!important}.fourdk-current-shelf-card span{font-size:11px!important;line-height:1.45!important}.fourdk-swipe-hint{display:inline-block}
      }
      @media(max-width:700px){.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}.home-v2-primary{min-height:430px}}
    `;
    document.head.appendChild(s);
  }

  function updateLead(){
    const p=document.querySelector('.home-v2-primary'); if(!p) return;
    if(p.dataset.homeLead===MARKER) return;
    p.dataset.homeLead=MARKER;
    p.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 4 FINAL • WEEK 5 NEXT</span>
      <h1>WEEK 4 IS OVER.<br><em>THE BOARD HAS SHAPE.</em></h1>
      <p>Atlanta closed the week by running New Orleans out of its own building. The 49ers, Chiefs and Vikings are 4–0. The Week 4 rankings are locked. Now the league turns toward 49ers–Seahawks, Ravens–Falcons and Bills–Rams.</p>
      <div class="home-v2-primary-meta"><span>ATL 45 • NO 24</span><span>SF • KC • MIN 4–0</span><span>WEEK 5 STARTS THURSDAY</span></div>
      <div class="home-v2-primary-actions"><a class="home-v2-button" href="nfl-week-4-sunday-night-update-2026.html">Read the Week 4 Final →</a><a class="home-v2-button alt" href="nfl-week5-preview-2026.html">Open the Week 5 Lookahead</a></div>`;
  }

  function updateShelf(){
    const lead=document.querySelector('.home-v2-lead'); if(!lead) return;
    let shelf=document.querySelector('.fourdk-current-shelf');
    if(shelf && shelf.dataset.version===MARKER) return;
    const markup=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head"><div><small>WEEK 4 FINAL • WEEK 5 NEXT</small><strong>RIGHT NOW ON 4DK NFL.</strong></div><div class="fourdk-current-shelf-links"><span class="fourdk-swipe-hint">SWIPE HEADLINES →</span><a href="nfl.html">Enter NFL hub →</a></div></div>
        <div class="fourdk-current-shelf-grid" aria-label="Current 4DK NFL headlines">
          <a class="fourdk-current-shelf-card" href="nfl-week-4-sunday-night-update-2026.html"><small>MNF FINAL</small><b>Bijan Runs New Orleans Out The Building</b><span>145 yards, two TDs and a 45–24 Atlanta win.</span></a>
          <a class="fourdk-current-shelf-card" href="nfl-power-rankings-week4-2026.html"><small>POWER RANKINGS</small><b>49ers Hold No. 1</b><span>The full 1–32 board entering Week 5.</span></a>
          <a class="fourdk-current-shelf-card" href="nfl-week-4-sunday-night-update-2026.html#mvp"><small>MVP WATCH</small><b>Purdy No. 1 • Bijan Crashes Top Four</b><span>The Week 4 final awards board.</span></a>
          <a class="fourdk-current-shelf-card" href="nfl-week5-preview-2026.html"><small>WEEK 5</small><b>49ers at Seahawks Leads The Next Slate</b><span>Ravens–Falcons and Bills–Rams are right behind it.</span></a>
        </div>
      </div>`;
    if(!shelf){
      shelf=document.createElement('section');shelf.className='fourdk-current-shelf';shelf.dataset.version=MARKER;shelf.innerHTML=markup;
      const jump=document.querySelector('.home-v2-jump'); if(jump) jump.after(shelf); else lead.after(shelf);
    }else{shelf.dataset.version=MARKER;shelf.innerHTML=markup}
  }

  function updateWeek5Feature(){
    const section=document.querySelector('.home-v2-sunday-final'); if(!section) return;
    if(section.dataset.week5Current===MARKER) return;
    section.dataset.week5Current=MARKER;
    section.setAttribute('aria-label','Week 5 NFL preview');
    section.innerHTML=`
      <div class="shell home-v2-sunday-final-grid">
        <article class="home-v2-sunday-feature">
          <small>4DK NFL • WEEK 5 EARLY LOOK</small>
          <h2>49ERS–SEAHAWKS<br><em>LEADS THE NEXT TEST.</em></h2>
          <p>Our No. 1 team goes into Seattle against a 3–1 division rival. Atlanta gets Baltimore under the lights after two straight statement wins, and Buffalo has to answer its first loss Monday night against the Rams.</p>
          <div class="home-v2-sunday-stats"><span>SF 4–0 • SEA 3–1</span><span>SNF • BAL @ ATL</span><span>MNF • BUF @ LAR</span><span>BYE • KC + CAR</span></div>
          <a href="nfl-week5-preview-2026.html">Open the Full Week 5 Lookahead →</a>
        </article>
        <aside class="home-v2-sunday-side"><div><small>WEEK 4 STAYS ARCHIVED</small><strong>Nothing Gets Deleted.</strong><span>The Falcons–Saints final, all 16 Week 4 games, the final MVP board, Rookie Watch and standings remain live in the completed Week 4 package.</span></div><a href="nfl-week-4-sunday-night-update-2026.html">Open the Week 4 Final →</a></aside>
      </div>`;
  }

  function updateDesk(){
    const d=document.querySelector('.home-v2-desk.nfl'); if(!d || d.dataset.currentVersion===MARKER) return;
    d.dataset.currentVersion=MARKER;
    d.innerHTML=`<span class="home-v2-desk-kicker">4DK NFL • WEEK 4 FINAL</span><h3>The First Month<br>Is In The Books.</h3><p>Atlanta closed Week 4 with a 45–24 beatdown of New Orleans. The full 1–32 ranking is locked, MVP and Rookie Watch are updated, and Week 5 starts with Tampa Bay–Dallas Thursday night.</p><div class="home-v2-desk-list"><a href="nfl-week-4-sunday-night-update-2026.html"><small>WEEK 4 FINAL</small><b>All 16 Games + Falcons–Saints Deep Dive</b><span>→</span></a><a href="nfl-power-rankings-week4-2026.html"><small>POWER</small><b>Full 1–32 Board Entering Week 5</b><span>→</span></a><a href="nfl-week-4-sunday-night-update-2026.html#mvp"><small>MVP</small><b>Purdy Leads • Walker + Bijan in Top Four</b><span>→</span></a><a href="nfl-week-4-sunday-night-update-2026.html#rookies"><small>ROOKIES</small><b>Week 4 Final Rookie Watch</b><span>→</span></a><a href="nfl-week5-preview-2026.html"><small>WEEK 5</small><b>49ers–Seahawks • Ravens–Falcons • Bills–Rams</b><span>→</span></a><a href="nfl-sunday-recaps.html"><small>ARCHIVE</small><b>Sunday Recaps — Newest First</b><span>→</span></a></div>`;
  }

  function updateStaticCard(){
    const c=document.querySelector('.nfl-home-feature'); if(!c || c.dataset.currentVersion===MARKER) return;
    c.dataset.currentVersion=MARKER;
    const over=c.querySelector('.home-feature-overline');if(over)over.textContent='4DK NFL • WEEK 4 FINAL';
    const lock=c.querySelector('.nfl-mini-lockup');if(lock)lock.innerHTML='WEEK 4<br>IS FINAL.';
    const score=c.querySelector('.nfl-mini-score');if(score)score.textContent='W5';
    const copy=c.querySelector('.home-feature-copy');if(copy)copy.innerHTML='<div class="tag">NFL • Week 4 Final</div><h3>Bijan Closed It. Week 5 Is Next.</h3><p>Atlanta 45, New Orleans 24. The full Week 4 package is locked and the next slate is ready.</p><a class="read" href="nfl-week-4-sunday-night-update-2026.html">Read the Final →</a>';
  }

  function updateTicker(){
    const t=document.querySelector('.ticker-track'); if(!t || t.dataset.currentVersion===MARKER) return;
    t.dataset.currentVersion=MARKER;
    const items=['WEEK 4 FINAL: FALCONS 45, SAINTS 24','BIJAN: 145 RUSH YDS • 2 TD','49ERS HOLD #1 IN 4DK POWER RANKINGS','PURDY HOLDS #1 IN MVP WATCH','WEEK 5: 49ERS AT SEAHAWKS','SNF: RAVENS AT FALCONS','MNF: BILLS AT RAMS'];
    t.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
  }

  function apply(){addStyles();updateLead();updateShelf();updateWeek5Feature();updateDesk();updateStaticCard();updateTicker()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [120,400,900,1800,3500,6500,10000].forEach(ms=>setTimeout(apply,ms));
  const observer=new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,120)});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
