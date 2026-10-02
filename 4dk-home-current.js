(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek4TnfFinalHome) return;
  window.__fourdkWeek4TnfFinalHome=true;

  const MARKER='week4-tnf-final-2026';
  let repairTimer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week4-home-current-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week4-home-current-styles';
    style.textContent=`
      body.home-page .home-v2-primary{
        position:relative;overflow:hidden;
        background:
          linear-gradient(90deg,rgba(5,7,6,.97) 0%,rgba(5,7,6,.9) 53%,rgba(5,7,6,.55) 100%),
          repeating-linear-gradient(90deg,transparent 0 74px,rgba(255,255,255,.027) 75px 76px),
          radial-gradient(circle at 84% 19%,rgba(226,82,38,.30),transparent 15rem),
          radial-gradient(circle at 70% 74%,rgba(215,173,85,.17),transparent 18rem),
          linear-gradient(135deg,#21130d,#080b09 73%)!important;
        border-color:#5d3b29!important;
      }
      body.home-page .home-v2-primary:before{
        content:'3–1'!important;right:-10px!important;bottom:-26px!important;
        font-size:clamp(92px,16vw,190px)!important;color:#fff!important;opacity:.045!important
      }
      body.home-page .home-v2-primary h1 em{color:#f0bf54!important}
      body.home-page .home-v2-side-card.week4-tnf{border-top:3px solid #e35b20!important;background:linear-gradient(145deg,#2a160d,#0b0e0c)!important}
      body.home-page .home-v2-side-card.week4-gotw{border-top:3px solid #d6313a!important;background:linear-gradient(145deg,#231013,#0b0e0c)!important}
      body.home-page .home-v2-desk.nfl{
        position:relative;overflow:hidden;
        background:repeating-linear-gradient(90deg,transparent 0 88px,rgba(255,255,255,.022) 89px 90px),radial-gradient(circle at 86% 10%,rgba(226,82,38,.23),transparent 13rem),linear-gradient(145deg,#17100c,#080b09 72%)!important;
      }
      body.home-page .home-v2-desk.nfl:after{
        content:'CLE 3–1'!important;position:absolute;right:-12px;top:10px;
        font:1000 clamp(48px,7vw,96px)/1 Arial Black,Impact,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.035;pointer-events:none;
      }
      .fourdk-current-shelf{position:relative;overflow:hidden;padding:19px 0 21px;background:#0b0d0b;color:#fff;border-top:1px solid #292f2a;border-bottom:1px solid #292f2a}
      .fourdk-current-shelf:after{content:'W4';position:absolute;right:-8px;bottom:-38px;font:1000 122px/.85 Arial Black,Impact,sans-serif;color:#fff;opacity:.025;pointer-events:none}
      .fourdk-current-shelf-inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto}
      .fourdk-current-shelf-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:12px}
      .fourdk-current-shelf-head small{display:block;color:#ff6548;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-current-shelf-head strong{display:block;margin-top:3px;font:1000 24px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-current-shelf-head a{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .fourdk-current-shelf-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px}
      .fourdk-current-shelf-card{display:flex;flex-direction:column;min-height:139px;padding:13px;border:1px solid #303630;background:#121512;color:#f5f2eb!important;text-decoration:none!important}
      .fourdk-current-shelf-card small{color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-current-shelf-card b{display:block;margin:7px 0;font:700 17px/1.05 Georgia,'Times New Roman',serif}
      .fourdk-current-shelf-card span{margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.38}
      .fourdk-current-shelf-card.gold{border-top:3px solid #d8b45d}.fourdk-current-shelf-card.red{border-top:3px solid #d6313a}.fourdk-current-shelf-card.green{border-top:3px solid #5f9c68}.fourdk-current-shelf-card.blue{border-top:3px solid #637ea7}.fourdk-current-shelf-card.orange{border-top:3px solid #e35b20}
      body.home-page .home-v2-sunday-final{background:radial-gradient(circle at 86% 20%,rgba(214,49,58,.17),transparent 18rem),radial-gradient(circle at 12% 80%,rgba(215,173,85,.11),transparent 18rem),linear-gradient(145deg,#13150f,#080b09 72%)!important}
      body.home-page .home-v2-sunday-final:after{content:'3–0'!important;font-size:clamp(82px,14vw,180px)!important}
      @media(max-width:900px){.fourdk-current-shelf-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:3px}.fourdk-current-shelf-card{flex:0 0 min(76vw,285px);scroll-snap-align:start}}
      @media(max-width:700px){.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}.home-v2-primary{min-height:430px}}
    `;
    document.head.appendChild(style);
  }

  function updateLead(){
    const primary=document.querySelector('.home-v2-primary');
    if(!primary) return false;
    if(primary.dataset.homeLead===MARKER && primary.textContent.includes('CLEVELAND IS 3–1')) return true;
    primary.dataset.homeLead=MARKER;
    primary.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 4 • THURSDAY FINAL</span>
      <h1>CLEVELAND IS 3–1.<br><em>NOW WHAT?</em></h1>
      <p>Deshaun Watson played winning football, Cleveland's defense hit Aaron Rodgers all night, and the Browns' young core helped turn a 27–24 win over Pittsburgh into the first real statement of Week 4.</p>
      <div class="home-v2-primary-meta">
        <span>CLE 27 • PIT 24 • FINAL</span>
        <span>WATSON • 268 PASS YDS</span>
        <span>BROWNS • 5 SACKS</span>
        <span>RODGERS • 299 YDS • 3 TD</span>
      </div>
      <div class="home-v2-primary-actions">
        <a class="home-v2-button" href="nfl-thursday-recap-week4-steelers-browns.html">Read the Week 4 TNF Recap →</a>
        <a class="home-v2-button alt" href="nfl-week4-preview-2026.html">Keep the Week 4 Preview Open</a>
      </div>`;
    return true;
  }

  function updateSide(){
    const side=document.querySelector('.home-v2-side');
    if(!side) return false;
    if(side.dataset.week4TnfFinal==='1') return true;
    side.dataset.week4Current='1';
    side.dataset.week4TnfFinal='1';
    side.innerHTML=`
      <a class="home-v2-side-card week4-tnf" href="nfl-thursday-recap-week4-steelers-browns.html">
        <small>TNF FINAL • AFC NORTH</small><b>Browns 27, Steelers 24</b>
        <span>Cleveland is 3–1. Watson delivered late, the defense sacked Rodgers five times and the young Browns are becoming part of the story now.</span><strong>Read the full recap →</strong>
      </a>
      <a class="home-v2-side-card week4-gotw" href="nfl-week4-preview-2026.html#game-of-the-week">
        <small>GAME OF THE WEEK • SUNDAY</small><b>Chiefs at Raiders: 3–0 vs. 3–0</b>
        <span>Kansas City’s championship standard meets the biggest early test of the new Vegas era.</span><strong>Read the matchup →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl-week4-preview-2026.html#power-test">
        <small>4DK POWER TEST</small><b>Broncos at 49ers</b>
        <span>Our No. 6 team visits our No. 1 team. San Francisco’s unbeaten start gets another serious test.</span><strong>See what we’re watching →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl-power-rankings-week3-2026.html">
        <small>WEEK 3 FINAL • ENTERING WEEK 4</small><b>49ers Hold the Top Spot</b>
        <span>San Francisco, Buffalo, Kansas City, Minnesota and Las Vegas make up the current 4DK top five.</span><strong>See the full 1–32 →</strong>
      </a>`;
    return true;
  }

  function currentShelf(){
    const old=document.querySelector('.fourdk-current-shelf');
    if(old && old.dataset.week4TnfFinal==='1') return true;
    if(old) old.remove();
    const lead=document.querySelector('.home-v2-lead');
    if(!lead) return false;
    const section=document.createElement('section');
    section.className='fourdk-current-shelf';
    section.dataset.week4Shelf='1';
    section.dataset.week4TnfFinal='1';
    section.innerHTML=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head">
          <div><small>WEEK 4 IS LIVE • THURSDAY IS FINAL</small><strong>RIGHT NOW ON 4DK.</strong></div>
          <a href="nfl.html">Enter the NFL hub →</a>
        </div>
        <div class="fourdk-current-shelf-grid">
          <a class="fourdk-current-shelf-card orange" href="nfl-thursday-recap-week4-steelers-browns.html"><small>THURSDAY • FINAL</small><b>Browns 27, Steelers 24</b><span>Cleveland reaches 3–1. Watson, the defense and the young core all matter.</span></a>
          <a class="fourdk-current-shelf-card blue" href="nfl-week4-preview-2026.html"><small>LONDON • SUNDAY 9:30 ET</small><b>Colts at Commanders</b><span>Sunday starts overseas with two 1–2 teams looking for a reset.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl-week4-preview-2026.html#game-of-the-week"><small>GAME OF THE WEEK</small><b>Chiefs at Raiders</b><span>Two 3–0 AFC West teams. The first real measuring stick in Vegas.</span></a>
          <a class="fourdk-current-shelf-card green" href="nfl-week4-preview-2026.html#power-test"><small>4DK #6 @ #1</small><b>Broncos at 49ers</b><span>Denver’s rise meets San Francisco’s unbeaten standard.</span></a>
          <a class="fourdk-current-shelf-card gold" href="nfl-power-rankings-week3-2026.html"><small>4DK POWER RANKINGS</small><b>49ers Still No. 1</b><span>The full Week 3 1–32 board remains locked entering the rest of Week 4.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl-week3-hub-2026.html"><small>WEEK 3 ARCHIVE</small><b>Week 3 Is in the Books</b><span>Thursday, Sunday, MNF and the final Week 3 boards stay one click away.</span></a>
        </div>
      </div>`;
    lead.insertAdjacentElement('afterend',section);
    return true;
  }

  function updateSundayFinal(){
    const section=document.querySelector('.home-v2-sunday-final');
    if(!section || section.dataset.week4Bridge==='1') return !!section;
    section.dataset.week4Bridge='1';
    section.setAttribute('aria-label','Week 3 final and Week 4 setup');
    section.innerHTML=`
      <div class="shell home-v2-sunday-final-grid">
        <article class="home-v2-sunday-feature">
          <small>4DK NFL • WEEK 3 FINAL • WEEK 4 IN PROGRESS</small>
          <h2>THE UNBEATEN GROUP IS REAL.<br><em>NOW SOMEBODY HAS TO BLINK.</em></h2>
          <p>San Francisco, Buffalo, Kansas City, Minnesota and Las Vegas all reached 3–0. Cleveland has already made the first move of Week 4 by beating Pittsburgh and moving to 3–1.</p>
          <div class="home-v2-sunday-stats"><span>SF • 3–0 • #1</span><span>BUF • 3–0 • #2</span><span>KC • 3–0 • #3</span><span>CLE • 3–1</span></div>
          <a href="nfl-thursday-recap-week4-steelers-browns.html">Read the TNF Recap →</a>
        </article>
        <aside class="home-v2-sunday-side"><div><small>WEEK 3 ARCHIVE</small><strong>Every Week Stays Live.</strong><span>The Falcons’ Lambeau statement, Purdy’s four-touchdown Sunday, Chicago’s Monday-night win and the complete Week 3 desk remain archived while Week 4 moves forward.</span></div><a href="nfl-week3-hub-2026.html">Open the Week 3 Desk →</a></aside>
      </div>`;
    return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');
    if(!desk) return false;
    if(desk.dataset.week4TnfFinal==='1') return true;
    desk.dataset.week4Desk='1';
    desk.dataset.week4TnfFinal='1';
    desk.innerHTML=`
      <span class="home-v2-desk-kicker">4DK NFL • WEEK 4</span>
      <h3>Cleveland Made<br>The First Move.</h3>
      <p>The Browns are 3–1 after beating Pittsburgh 27–24. Now Week 4 turns to London, Chiefs–Raiders, Broncos–49ers and the rest of the Sunday slate.</p>
      <div class="home-v2-desk-list">
        <a href="nfl-thursday-recap-week4-steelers-browns.html"><small>TNF FINAL</small><b>Browns 27, Steelers 24 — Full 4DK Breakdown</b><span>→</span></a>
        <a href="nfl-week4-preview-2026.html"><small>WEEK 4</small><b>Full Week 4 Preview — Remaining Games</b><span>→</span></a>
        <a href="nfl-week4-preview-2026.html#game-of-the-week"><small>SPOTLIGHT</small><b>Chiefs at Raiders — 3–0 vs. 3–0</b><span>→</span></a>
        <a href="nfl.html#scoreboard"><small>LIVE</small><b>4DK NFL Game Center + Red Zone</b><span>→</span></a>
      </div>`;
    return true;
  }

  function updateStaticNFLCard(){
    const card=document.querySelector('.nfl-home-feature');
    if(!card) return false;
    if(card.dataset.week4TnfFinal==='1') return true;
    card.dataset.week4Card='1';
    card.dataset.week4TnfFinal='1';
    const over=card.querySelector('.home-feature-overline'); if(over) over.textContent='4DK NFL • WEEK 4 TNF FINAL';
    const lock=card.querySelector('.nfl-mini-lockup'); if(lock) lock.innerHTML='BROWNS 3–1.<br>NOW WHAT?';
    const score=card.querySelector('.nfl-mini-score'); if(score) score.textContent='27–24';
    const copy=card.querySelector('.home-feature-copy');
    if(copy) copy.innerHTML='<div class="tag">NFL • Week 4 TNF</div><h3>Cleveland Is 3–1. Now the Conversation Changes.</h3><p>Watson played well, Cleveland got five sacks on Rodgers and the young Browns showed up in a divisional win.</p><a class="read" href="nfl-thursday-recap-week4-steelers-browns.html">Read the TNF Recap →</a>';
    return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');
    if(!ticker) return false;
    if(ticker.dataset.week4TnfFinal==='1') return true;
    ticker.dataset.week4Current='1';
    ticker.dataset.week4TnfFinal='1';
    const items=['TNF FINAL: BROWNS 27, STEELERS 24','CLEVELAND MOVES TO 3–1','CHIEFS AT RAIDERS: 3–0 VS 3–0','4DK #6 DENVER AT #1 SAN FRANCISCO','LONDON: COLTS AT COMMANDERS','WEEK 3 POWER RANKINGS: 49ERS HOLD #1'];
    ticker.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
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
    updateTicker();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [80,220,500,900,1500,2600,4400,7000].forEach(ms=>setTimeout(apply,ms));
  const observer=new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,80)});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();