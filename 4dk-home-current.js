(() => {
  const path=(location.pathname||'/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek4FinalHome) return;
  window.__fourdkWeek4FinalHome=true;
  const MARKER='week4-final-week5-next-2026';
  let repairTimer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week4-final-home-styles')) return;
    const s=document.createElement('style');s.id='fourdk-week4-final-home-styles';s.textContent=`
      body.home-page .home-v2-primary{position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(4,6,5,.98),rgba(4,6,5,.88) 55%,rgba(4,6,5,.50)),radial-gradient(circle at 84% 18%,rgba(232,69,46,.28),transparent 15rem),radial-gradient(circle at 72% 76%,rgba(215,173,85,.16),transparent 18rem),linear-gradient(135deg,#1d130e,#080b09 72%)!important;border-color:#55412e!important}
      body.home-page .home-v2-primary:before{content:'W5'!important;right:-10px!important;bottom:-28px!important;font-size:clamp(92px,16vw,190px)!important;color:#fff!important;opacity:.045!important}
      body.home-page .home-v2-primary h1 em{color:#f0bf54!important}
      body.home-page .home-v2-desk.nfl{position:relative;overflow:hidden;background:radial-gradient(circle at 86% 10%,rgba(226,82,38,.24),transparent 13rem),linear-gradient(145deg,#17100c,#080b09 72%)!important}
      body.home-page .home-v2-desk.nfl:after{content:'W5 NEXT'!important;position:absolute;right:-12px;top:10px;font:1000 clamp(42px,6vw,84px)/1 Arial Black,Impact,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.035;pointer-events:none}
      .fourdk-current-shelf{position:relative;overflow:hidden;padding:19px 0 21px;background:#0b0d0b;color:#fff;border-top:1px solid #292f2a;border-bottom:1px solid #292f2a}
      .fourdk-current-shelf-inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto}.fourdk-current-shelf-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:12px}.fourdk-current-shelf-head small{display:block;color:#ff6548;font-size:8px;font-weight:1000;letter-spacing:.13em}.fourdk-current-shelf-head strong{display:block;margin-top:3px;font:1000 24px/.95 Arial Black,Impact,sans-serif}.fourdk-current-shelf-head a{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000}.fourdk-current-shelf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.fourdk-current-shelf-card{display:flex;flex-direction:column;min-height:145px;padding:13px;border:1px solid #303630;background:#121512;color:#f5f2eb!important;text-decoration:none!important}.fourdk-current-shelf-card small{color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em}.fourdk-current-shelf-card b{display:block;margin:7px 0;font:700 17px/1.05 Georgia,serif}.fourdk-current-shelf-card span{margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.38}
      @media(max-width:900px){.fourdk-current-shelf-grid{display:flex;overflow-x:auto;gap:8px}.fourdk-current-shelf-card{flex:0 0 min(76vw,285px)}}@media(max-width:700px){.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}.home-v2-primary{min-height:430px}}
    `;document.head.appendChild(s);
  }

  function lead(){
    const p=document.querySelector('.home-v2-primary'); if(!p) return;
    p.dataset.homeLead=MARKER;p.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 4 FINAL • WEEK 5 NEXT</span>
      <h1>WEEK 4 IS OVER.<br><em>THE BOARD HAS SHAPE.</em></h1>
      <p>Atlanta closed the week by running New Orleans out of its own building. The 49ers, Chiefs and Vikings are 4–0. The Week 4 rankings are locked. Now the league turns toward 49ers–Seahawks, Ravens–Falcons and Bills–Rams.</p>
      <div class="home-v2-primary-meta"><span>ATL 45 • NO 24</span><span>SF • KC • MIN 4–0</span><span>WEEK 5 STARTS THURSDAY</span></div>
      <div class="home-v2-primary-actions"><a class="home-v2-button" href="nfl-week-4-sunday-night-update-2026.html">Read the Week 4 Final →</a><a class="home-v2-button alt" href="nfl-week5-preview-2026.html">Open the Week 5 Lookahead</a></div>`;
  }

  function shelf(){
    document.querySelector('.fourdk-current-shelf')?.remove();
    const lead=document.querySelector('.home-v2-lead'); if(!lead) return;
    const s=document.createElement('section');s.className='fourdk-current-shelf';s.innerHTML=`
      <div class="fourdk-current-shelf-inner"><div class="fourdk-current-shelf-head"><div><small>WEEK 4 FINAL • WEEK 5 NEXT</small><strong>RIGHT NOW ON 4DK NFL.</strong></div><a href="nfl.html">Enter NFL hub →</a></div>
      <div class="fourdk-current-shelf-grid">
        <a class="fourdk-current-shelf-card" href="nfl-week-4-sunday-night-update-2026.html"><small>MNF FINAL</small><b>Bijan Runs New Orleans Out The Building</b><span>145 yards, two TDs and a 45–24 Atlanta win.</span></a>
        <a class="fourdk-current-shelf-card" href="nfl-power-rankings-week4-2026.html"><small>POWER RANKINGS</small><b>49ers Hold No. 1</b><span>The full 1–32 board entering Week 5.</span></a>
        <a class="fourdk-current-shelf-card" href="nfl-week-4-sunday-night-update-2026.html#mvp"><small>MVP WATCH</small><b>Purdy No. 1 • Bijan Crashes Top Four</b><span>The Week 4 final awards board.</span></a>
        <a class="fourdk-current-shelf-card" href="nfl-week5-preview-2026.html"><small>WEEK 5</small><b>49ers at Seahawks Leads The Next Slate</b><span>Ravens–Falcons and Bills–Rams are right behind it.</span></a>
      </div></div>`;
    const jump=document.querySelector('.home-v2-jump'); if(jump) jump.after(s); else lead.after(s);
  }

  function desk(){
    const d=document.querySelector('.home-v2-desk.nfl'); if(!d) return;
    d.innerHTML=`
      <span class="home-v2-desk-kicker">4DK NFL • WEEK 4 FINAL</span>
      <h3>The First Month<br>Is In The Books.</h3>
      <p>Atlanta closed Week 4 with a 45–24 beatdown of New Orleans. The full 1–32 ranking is locked, MVP and Rookie Watch are updated, and Week 5 starts with Tampa Bay–Dallas Thursday night.</p>
      <div class="home-v2-desk-list">
        <a href="nfl-week-4-sunday-night-update-2026.html"><small>WEEK 4 FINAL</small><b>All 16 Games + Falcons–Saints Deep Dive</b><span>→</span></a>
        <a href="nfl-power-rankings-week4-2026.html"><small>POWER</small><b>Full 1–32 Board Entering Week 5</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html#mvp"><small>MVP</small><b>Purdy Leads • Walker + Bijan in Top Four</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html#rookies"><small>ROOKIES</small><b>Week 4 Final Rookie Watch</b><span>→</span></a>
        <a href="nfl-week5-preview-2026.html"><small>WEEK 5</small><b>49ers–Seahawks • Ravens–Falcons • Bills–Rams</b><span>→</span></a>
        <a href="nfl-sunday-recaps.html"><small>ARCHIVE</small><b>Sunday Recaps — Newest First</b><span>→</span></a>
      </div>`;
  }

  function staticCard(){
    const c=document.querySelector('.nfl-home-feature');if(!c)return;
    const over=c.querySelector('.home-feature-overline');if(over)over.textContent='4DK NFL • WEEK 4 FINAL';
    const lock=c.querySelector('.nfl-mini-lockup');if(lock)lock.innerHTML='WEEK 4<br>IS FINAL.';
    const score=c.querySelector('.nfl-mini-score');if(score)score.textContent='W5';
    const copy=c.querySelector('.home-feature-copy');if(copy)copy.innerHTML='<div class="tag">NFL • Week 4 Final</div><h3>Bijan Closed It. Week 5 Is Next.</h3><p>Atlanta 45, New Orleans 24. The full Week 4 package is locked and the next slate is ready.</p><a class="read" href="nfl-week-4-sunday-night-update-2026.html">Read the Final →</a>';
  }

  function ticker(){
    const t=document.querySelector('.ticker-track');if(!t)return;
    const items=['WEEK 4 FINAL: FALCONS 45, SAINTS 24','BIJAN: 145 RUSH YDS • 2 TD','49ERS HOLD #1 IN 4DK POWER RANKINGS','PURDY HOLDS #1 IN MVP WATCH','WEEK 5: 49ERS AT SEAHAWKS','SNF: RAVENS AT FALCONS','MNF: BILLS AT RAMS'];
    t.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
  }

  function apply(){addStyles();lead();shelf();desk();staticCard();ticker();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [80,250,600,1200,2400,4500,8000].forEach(ms=>setTimeout(apply,ms));
  new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,100)}).observe(document.documentElement,{subtree:true,childList:true});
})();