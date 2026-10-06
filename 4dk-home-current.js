(() => {
  const path=(location.pathname||'/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek4MondayHome) return;
  window.__fourdkWeek4MondayHome=true;

  const MARKER='week4-monday-current-2026';
  let repairTimer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week4-monday-home-styles')) return;
    const s=document.createElement('style');
    s.id='fourdk-week4-monday-home-styles';
    s.textContent=`
      body.home-page .home-v2-primary{
        position:relative;overflow:hidden;
        background:
          linear-gradient(90deg,rgba(4,6,5,.98) 0%,rgba(4,6,5,.90) 54%,rgba(4,6,5,.52) 100%),
          repeating-linear-gradient(90deg,transparent 0 78px,rgba(255,255,255,.026) 79px 80px),
          radial-gradient(circle at 84% 18%,rgba(232,69,46,.30),transparent 15rem),
          radial-gradient(circle at 72% 76%,rgba(215,173,85,.16),transparent 18rem),
          linear-gradient(135deg,#1d130e,#080b09 72%)!important;
        border-color:#55412e!important;
      }
      body.home-page .home-v2-primary:before{
        content:'W4'!important;right:-10px!important;bottom:-28px!important;
        font-size:clamp(92px,16vw,190px)!important;color:#fff!important;opacity:.045!important;
      }
      body.home-page .home-v2-primary h1 em{color:#f0bf54!important}
      body.home-page .home-v2-side-card.current-w4{border-top:3px solid #e45a2a!important;background:linear-gradient(145deg,#24140d,#0b0e0c)!important}
      body.home-page .home-v2-side-card.current-power{border-top:3px solid #d8b45d!important}
      body.home-page .home-v2-side-card.current-mnf{border-top:3px solid #d6313a!important}
      body.home-page .home-v2-desk.nfl{
        position:relative;overflow:hidden;
        background:
          repeating-linear-gradient(90deg,transparent 0 88px,rgba(255,255,255,.022) 89px 90px),
          radial-gradient(circle at 86% 10%,rgba(226,82,38,.24),transparent 13rem),
          linear-gradient(145deg,#17100c,#080b09 72%)!important;
      }
      body.home-page .home-v2-desk.nfl:after{
        content:'WEEK 4'!important;position:absolute;right:-12px;top:10px;
        font:1000 clamp(46px,7vw,94px)/1 Arial Black,Impact,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.035;pointer-events:none;
      }
      body.home-page .home-v2-desk.nfl .home-v2-desk-list{
        position:relative;z-index:2;
      }
      body.home-page .home-v2-desk.nfl .home-v2-desk-list a{
        grid-template-columns:116px minmax(0,1fr) 24px!important;
      }
      body.home-page .home-v2-sunday-final{
        position:relative;overflow:hidden;
        background:
          radial-gradient(circle at 86% 20%,rgba(214,49,58,.17),transparent 18rem),
          radial-gradient(circle at 12% 80%,rgba(215,173,85,.11),transparent 18rem),
          linear-gradient(145deg,#13150f,#080b09 72%)!important;
      }
      body.home-page .home-v2-sunday-final:after{
        content:'4–0'!important;font-size:clamp(82px,14vw,180px)!important;
      }
      .fourdk-current-shelf{position:relative;overflow:hidden;padding:19px 0 21px;background:#0b0d0b;color:#fff;border-top:1px solid #292f2a;border-bottom:1px solid #292f2a}
      .fourdk-current-shelf:after{content:'W4';position:absolute;right:-8px;bottom:-38px;font:1000 122px/.85 Arial Black,Impact,sans-serif;color:#fff;opacity:.025;pointer-events:none}
      .fourdk-current-shelf-inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto}
      .fourdk-current-shelf-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:12px}
      .fourdk-current-shelf-head small{display:block;color:#ff6548;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-current-shelf-head strong{display:block;margin-top:3px;font:1000 24px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-current-shelf-head a{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .fourdk-current-shelf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}
      .fourdk-current-shelf-card{display:flex;flex-direction:column;min-height:145px;padding:13px;border:1px solid #303630;background:#121512;color:#f5f2eb!important;text-decoration:none!important}
      .fourdk-current-shelf-card small{color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-current-shelf-card b{display:block;margin:7px 0;font:700 17px/1.05 Georgia,'Times New Roman',serif}
      .fourdk-current-shelf-card span{margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.38}
      .fourdk-current-shelf-card.gold{border-top:3px solid #d8b45d}.fourdk-current-shelf-card.red{border-top:3px solid #d6313a}.fourdk-current-shelf-card.green{border-top:3px solid #5f9c68}.fourdk-current-shelf-card.blue{border-top:3px solid #637ea7}.fourdk-current-shelf-card.orange{border-top:3px solid #e35b20}
      @media(max-width:900px){.fourdk-current-shelf-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:3px}.fourdk-current-shelf-card{flex:0 0 min(76vw,285px);scroll-snap-align:start}}
      @media(max-width:700px){.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}.home-v2-primary{min-height:430px}}
    `;
    document.head.appendChild(s);
  }

  function updateLead(){
    const primary=document.querySelector('.home-v2-primary');
    if(!primary) return false;
    if(primary.dataset.homeLead===MARKER && primary.textContent.includes('SHOW ITS HAND')) return true;
    primary.dataset.homeLead=MARKER;
    primary.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 4 • MONDAY NIGHT</span>
      <h1>THE LEAGUE IS<br><em>STARTING TO SHOW ITS HAND.</em></h1>
      <p>San Francisco, Kansas City and Minnesota are 4–0. Carolina just lit up Detroit. Vegas took its first loss without losing our respect. The Chargers are 0–4. Week 4 closes tonight with Falcons–Saints.</p>
      <div class="home-v2-primary-meta">
        <span>SF • 4–0 • 4DK #1</span>
        <span>KC • 4–0</span>
        <span>MIN • 4–0</span>
        <span>MNF • ATL @ NO</span>
      </div>
      <div class="home-v2-primary-actions">
        <a class="home-v2-button" href="nfl-week-4-sunday-night-update-2026.html">Read the Full Week 4 Update →</a>
        <a class="home-v2-button alt" href="nfl.html#scoreboard">Follow Monday Night Live</a>
      </div>`;
    return true;
  }

  function updateSide(){
    const side=document.querySelector('.home-v2-side');
    if(!side) return false;
    if(side.dataset.currentWeek4Monday==='1' && side.textContent.includes('49ers Hold No. 1')) return true;
    side.dataset.currentWeek4Monday='1';
    side.innerHTML=`
      <a class="home-v2-side-card current-w4" href="nfl-week-4-sunday-night-update-2026.html">
        <small>WEEK 4 • SUNDAY COMPLETE</small><b>The League Is Starting to Show Its Hand</b>
        <span>Every completed game, updated power rankings, MVP Watch, Rookie Watch, standings and league leaders.</span><strong>Open the full Week 4 package →</strong>
      </a>
      <a class="home-v2-side-card current-power" href="nfl-week-4-sunday-night-update-2026.html#power">
        <small>4DK POWER RANKINGS</small><b>49ers Hold No. 1</b>
        <span>San Francisco, Kansas City and Minnesota are the unbeaten top three after Sunday.</span><strong>See the Top 10 →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl-week-4-sunday-night-update-2026.html">
        <small>AFC WEST • STATEMENT GAME</small><b>Chiefs 30, Raiders 27</b>
        <span>Kenneth Walker III ran for 177 yards and two touchdowns as KC moved to 4–0.</span><strong>Read the breakdown →</strong>
      </a>
      <a class="home-v2-side-card current-mnf" href="nfl.html#scoreboard">
        <small>MONDAY NIGHT • LIVE</small><b>Falcons at Saints</b>
        <span>Week 4 closes in New Orleans. Follow the live score and game center from the NFL hub.</span><strong>Open live game center →</strong>
      </a>`;
    return true;
  }

  function currentShelf(){
    let shelf=document.querySelector('.fourdk-current-shelf');
    if(shelf) shelf.remove();
    const lead=document.querySelector('.home-v2-lead');
    if(!lead) return false;
    shelf=document.createElement('section');
    shelf.className='fourdk-current-shelf';
    shelf.dataset.currentWeek4Monday='1';
    shelf.innerHTML=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head">
          <div><small>8 STORIES SHAPING THE BOARD</small><strong>RIGHT NOW ON 4DK NFL.</strong></div>
          <a href="nfl.html">Enter the NFL hub →</a>
        </div>
        <div class="fourdk-current-shelf-grid">
          <a class="fourdk-current-shelf-card gold" href="nfl-week-4-sunday-night-update-2026.html#power"><small>1 • POWER</small><b>49ers Stay No. 1</b><span>4–0, clean football and another complete win.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl-week-4-sunday-night-update-2026.html"><small>2 • KANSAS CITY</small><b>Walker Changes the Chiefs</b><span>177 yards, two TDs and the league rushing lead.</span></a>
          <a class="fourdk-current-shelf-card blue" href="nfl-week-4-sunday-night-update-2026.html#power"><small>3 • MINNESOTA</small><b>Vikings Are 4–0</b><span>They won without an offensive touchdown. That floor matters.</span></a>
          <a class="fourdk-current-shelf-card orange" href="nfl-week-4-sunday-night-update-2026.html"><small>4 • LAS VEGAS</small><b>First Loss, Still Real</b><span>Vegas pushed 4–0 KC to the final seconds.</span></a>
          <a class="fourdk-current-shelf-card green" href="nfl-week-4-sunday-night-update-2026.html"><small>5 • CAROLINA</small><b>Panthers Offense Erupts</b><span>Bryce Young and Tetairoa McMillan lit up Detroit.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl-week-4-sunday-night-update-2026.html"><small>6 • BUFFALO</small><b>Patriots Hand Bills First Loss</b><span>Buffalo is still a contender, but the late-game cracks showed.</span></a>
          <a class="fourdk-current-shelf-card orange" href="nfl-week-4-sunday-night-update-2026.html"><small>7 • CHARGERS</small><b>0–4 Is an Emergency</b><span>Turnovers and penalties keep burying a talented roster.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl.html#scoreboard"><small>8 • MNF LIVE</small><b>Falcons at Saints</b><span>Monday night closes Week 4 in New Orleans.</span></a>
        </div>
      </div>`;
    const jump=document.querySelector('.home-v2-jump');
    if(jump) jump.insertAdjacentElement('afterend',shelf);
    else lead.insertAdjacentElement('afterend',shelf);
    return true;
  }

  function updateSundayFinal(){
    const section=document.querySelector('.home-v2-sunday-final');
    if(!section) return false;
    if(section.dataset.currentWeek4Monday==='1' && section.textContent.includes('UNBEATEN GROUP')) return true;
    section.dataset.currentWeek4Monday='1';
    section.setAttribute('aria-label','Week 4 Sunday final and Monday night setup');
    section.innerHTML=`
      <div class="shell home-v2-sunday-final-grid">
        <article class="home-v2-sunday-feature">
          <small>4DK NFL • WEEK 4 • THROUGH SUNDAY NIGHT</small>
          <h2>THE UNBEATEN GROUP IS REAL.<br><em>NOW THE BOARD HAS SHAPE.</em></h2>
          <p>San Francisco, Kansas City and Minnesota are 4–0. Baltimore, Seattle, Las Vegas, Buffalo, Jacksonville, Chicago and Cleveland round out the current 4DK top ten before Monday night closes the week.</p>
          <div class="home-v2-sunday-stats"><span>SF • 4–0 • #1</span><span>KC • 4–0 • #2</span><span>MIN • 4–0 • #3</span><span>MNF • ATL @ NO</span></div>
          <a href="nfl-week-4-sunday-night-update-2026.html">Read the Full Week 4 Update →</a>
        </article>
        <aside class="home-v2-sunday-side"><div><small>THE WEEK STAYS ARCHIVED</small><strong>Everything Is One Click Away.</strong><span>Thursday, every Sunday game, the new rankings, MVP Watch, Rookie Watch and the complete Week 3 archive stay live while Week 4 finishes.</span></div><a href="nfl-week3-hub-2026.html">Open the Week 3 Archive →</a></aside>
      </div>`;
    return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');
    if(!desk) return false;
    if(desk.dataset.currentWeek4Monday==='1' && desk.textContent.includes('Week 4 Changed')) return true;
    desk.dataset.currentWeek4Monday='1';
    desk.innerHTML=`
      <span class="home-v2-desk-kicker">4DK NFL • WEEK 4 • MONDAY NIGHT</span>
      <h3>Week 4 Changed<br>The Board.</h3>
      <p>San Francisco, Kansas City and Minnesota are 4–0. Kenneth Walker has the rushing lead. Carolina exploded on Sunday night. Buffalo took its first loss. The Chargers are 0–4. Falcons–Saints closes the week tonight.</p>
      <div class="home-v2-desk-list">
        <a href="nfl-week-4-sunday-night-update-2026.html"><small>FULL WEEK 4</small><b>Every Sunday Game + Complete 4DK Breakdown</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html#power"><small>POWER</small><b>49ers No. 1 — Updated Top 10 After Sunday</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html#mvp"><small>MVP WATCH</small><b>Purdy Leads — Mahomes, Walker Keep Pressure On</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html#rookies"><small>ROOKIES</small><b>Week 4 Rookie Watch — 2026 Draft Class Only</b><span>→</span></a>
        <a href="nfl-week-4-sunday-night-update-2026.html"><small>SPOTLIGHT</small><b>Chiefs 30, Raiders 27 — Walker Takes Over</b><span>→</span></a>
        <a href="nfl.html#scoreboard"><small>LIVE MNF</small><b>Falcons at Saints — 4DK Game Center</b><span>→</span></a>
      </div>`;
    return true;
  }

  function updateStaticNFLCard(){
    const card=document.querySelector('.nfl-home-feature');
    if(!card) return false;
    card.dataset.currentWeek4Monday='1';
    const over=card.querySelector('.home-feature-overline'); if(over) over.textContent='4DK NFL • WEEK 4';
    const lock=card.querySelector('.nfl-mini-lockup'); if(lock) lock.innerHTML='THE BOARD<br>HAS SHAPE.';
    const score=card.querySelector('.nfl-mini-score'); if(score) score.textContent='W4';
    const copy=card.querySelector('.home-feature-copy');
    if(copy) copy.innerHTML='<div class="tag">NFL • Week 4</div><h3>The League Is Starting to Show Its Hand.</h3><p>Three 4–0 teams. A new top ten. MVP and rookie races moving. Monday night closes the week.</p><a class="read" href="nfl-week-4-sunday-night-update-2026.html">Read the Week 4 Update →</a>';
    return true;
  }

  function updateLatestStamp(){
    const stamp=document.querySelector('.home-latest-updated');
    if(stamp) stamp.textContent='UPDATED • OCT. 5, 2026 • MNF LIVE';
    return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');
    if(!ticker) return false;
    const items=[
      'WEEK 4: 49ERS, CHIEFS, VIKINGS ARE 4–0',
      '4DK POWER RANKINGS: SAN FRANCISCO HOLDS #1',
      'KENNETH WALKER: 537 RUSH YDS • NFL LEADER',
      'PANTHERS 32, LIONS 26 • CAROLINA OFFENSE ARRIVES',
      'PATRIOTS HAND BUFFALO ITS FIRST LOSS',
      'CHARGERS FALL TO 0–4',
      'MNF LIVE: FALCONS AT SAINTS'
    ];
    ticker.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
    ticker.dataset.currentWeek4Monday='1';
    return true;
  }

  function apply(){
    addStyles();
    updateLead();
    updateSide();
    currentShelf();
    updateSundayFinal();
    updateSportsDesk();
    updateStaticNFLCard();
    updateLatestStamp();
    updateTicker();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [80,220,500,900,1500,2600,4400,7000,10000,15000].forEach(ms=>setTimeout(apply,ms));
  const observer=new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,90)});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();