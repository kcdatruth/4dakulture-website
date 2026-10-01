(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek4HomeCurrent) return;
  window.__fourdkWeek4HomeCurrent=true;

  const MARKER='week4-2026';
  let repairTimer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week4-home-current-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week4-home-current-styles';
    style.textContent=`
      body.home-page .home-v2-primary{
        position:relative;overflow:hidden;
        background:
          linear-gradient(90deg,rgba(5,7,6,.96) 0%,rgba(5,7,6,.88) 53%,rgba(5,7,6,.52) 100%),
          repeating-linear-gradient(90deg,transparent 0 74px,rgba(255,255,255,.027) 75px 76px),
          radial-gradient(circle at 84% 19%,rgba(226,57,50,.29),transparent 15rem),
          radial-gradient(circle at 70% 74%,rgba(215,173,85,.18),transparent 18rem),
          linear-gradient(135deg,#16241b,#080b09 73%)!important;
        border-color:#445148!important;
      }
      body.home-page .home-v2-primary:before{
        content:'W4'!important;right:-18px!important;bottom:-30px!important;
        font-size:clamp(92px,16vw,190px)!important;color:#fff!important;opacity:.045!important
      }
      body.home-page .home-v2-primary h1 em{color:#f0bf54!important}
      body.home-page .home-v2-side-card.week4-tnf{border-top:3px solid #d9b24f!important;background:linear-gradient(145deg,#211d12,#0b0e0c)!important}
      body.home-page .home-v2-side-card.week4-gotw{border-top:3px solid #d6313a!important;background:linear-gradient(145deg,#231013,#0b0e0c)!important}
      body.home-page .home-v2-desk.nfl{
        position:relative;overflow:hidden;
        background:repeating-linear-gradient(90deg,transparent 0 88px,rgba(255,255,255,.022) 89px 90px),radial-gradient(circle at 86% 10%,rgba(66,137,82,.24),transparent 13rem),linear-gradient(145deg,#0f1812,#080b09 72%)!important;
      }
      body.home-page .home-v2-desk.nfl:after{
        content:'WEEK 4'!important;position:absolute;right:-12px;top:10px;
        font:1000 clamp(54px,8vw,110px)/1 Arial Black,Impact,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.035;pointer-events:none;
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
      .fourdk-current-shelf-card.gold{border-top:3px solid #d8b45d}.fourdk-current-shelf-card.red{border-top:3px solid #d6313a}.fourdk-current-shelf-card.green{border-top:3px solid #5f9c68}.fourdk-current-shelf-card.blue{border-top:3px solid #637ea7}
      body.home-page .home-v2-sunday-final{background:radial-gradient(circle at 86% 20%,rgba(214,49,58,.17),transparent 18rem),radial-gradient(circle at 12% 80%,rgba(215,173,85,.11),transparent 18rem),linear-gradient(145deg,#13150f,#080b09 72%)!important}
      body.home-page .home-v2-sunday-final:after{content:'3–0'!important;font-size:clamp(82px,14vw,180px)!important}
      @media(max-width:900px){.fourdk-current-shelf-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:3px}.fourdk-current-shelf-card{flex:0 0 min(76vw,285px);scroll-snap-align:start}}
      @media(max-width:700px){.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}.home-v2-primary{min-height:430px}}
    `;
    document.head.appendChild(style);
  }

  function updateLead(){
    const primary=document.querySelector('.home-v2-primary');
    if(!primary || primary.dataset.homeLead===MARKER) return !!primary;
    primary.dataset.homeLead=MARKER;
    primary.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 4 • THURSDAY NIGHT</span>
      <h1>WEEK 4.<br><em>NOW THE PRESSURE CHANGES.</em></h1>
      <p>Three weeks gave us the first real hierarchy. San Francisco, Buffalo, Kansas City, Minnesota and Las Vegas are unbeaten. Week 4 opens with AFC North pressure in Cleveland, hits London Sunday morning and peaks with a 3–0 Chiefs–Raiders collision in Vegas.</p>
      <div class="home-v2-primary-meta">
        <span>PIT @ CLE • TONIGHT</span>
        <span>KC @ LV • 3–0 VS 3–0</span>
        <span>DEN @ SF • #6 VS #1</span>
        <span>IND @ WAS • LONDON</span>
      </div>
      <div class="home-v2-primary-actions">
        <a class="home-v2-button" href="nfl-week4-preview-2026.html">Open the Week 4 Preview →</a>
        <a class="home-v2-button alt" href="nfl.html#scoreboard">Open the Live Game Center</a>
      </div>`;
    return true;
  }

  function updateSide(){
    const side=document.querySelector('.home-v2-side');
    if(!side || side.dataset.week4Current==='1') return !!side;
    side.dataset.week4Current='1';
    side.innerHTML=`
      <a class="home-v2-side-card week4-tnf" href="nfl-week4-preview-2026.html">
        <small>TONIGHT • AFC NORTH</small><b>Steelers at Browns</b>
        <span>Both enter 2–1. Week 4 starts with a divisional game that can reshuffle the entire AFC North.</span><strong>Open the Week 4 desk →</strong>
      </a>
      <a class="home-v2-side-card week4-gotw" href="nfl-week4-preview-2026.html#game-of-the-week">
        <small>GAME OF THE WEEK</small><b>Chiefs at Raiders: 3–0 vs. 3–0</b>
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
    if(old && old.dataset.week4Shelf==='1') return true;
    if(old) old.remove();
    const lead=document.querySelector('.home-v2-lead');
    if(!lead) return false;
    const section=document.createElement('section');
    section.className='fourdk-current-shelf';
    section.dataset.week4Shelf='1';
    section.innerHTML=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head">
          <div><small>WEEK 4 IS LIVE • OLDER WEEKS STAY ARCHIVED</small><strong>RIGHT NOW ON 4DK.</strong></div>
          <a href="nfl.html">Enter the NFL hub →</a>
        </div>
        <div class="fourdk-current-shelf-grid">
          <a class="fourdk-current-shelf-card gold" href="nfl-week4-preview-2026.html"><small>THURSDAY • 8:15 ET</small><b>Steelers at Browns</b><span>2–1 vs. 2–1 opens Week 4 in Cleveland.</span></a>
          <a class="fourdk-current-shelf-card blue" href="nfl-week4-preview-2026.html"><small>LONDON • 9:30 ET</small><b>Colts at Commanders</b><span>Sunday starts overseas with two 1–2 teams looking for a reset.</span></a>
          <a class="fourdk-current-shelf-card red" href="nfl-week4-preview-2026.html#game-of-the-week"><small>GAME OF THE WEEK</small><b>Chiefs at Raiders</b><span>Two 3–0 AFC West teams. The first real measuring stick in Vegas.</span></a>
          <a class="fourdk-current-shelf-card green" href="nfl-week4-preview-2026.html#power-test"><small>4DK #6 @ #1</small><b>Broncos at 49ers</b><span>Denver’s rise meets San Francisco’s unbeaten standard.</span></a>
          <a class="fourdk-current-shelf-card gold" href="nfl-power-rankings-week3-2026.html"><small>4DK POWER RANKINGS</small><b>49ers Still No. 1</b><span>The full 1–32 board entering Week 4 is locked.</span></a>
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
          <small>4DK NFL • WEEK 3 FINAL • ENTERING WEEK 4</small>
          <h2>THE UNBEATEN GROUP IS REAL.<br><em>NOW SOMEBODY HAS TO BLINK.</em></h2>
          <p>San Francisco, Buffalo, Kansas City, Minnesota and Las Vegas all reached 3–0. The 49ers hold our No. 1 spot, Brock Purdy just delivered a four-touchdown Sunday, and Week 4 gives us two massive tests: Kansas City at Las Vegas and Denver at San Francisco.</p>
          <div class="home-v2-sunday-stats"><span>SF • 3–0 • #1</span><span>BUF • 3–0 • #2</span><span>KC • 3–0 • #3</span><span>MIN + LV • 3–0</span></div>
          <a href="nfl-power-rankings-week3-2026.html">See the 1–32 Board →</a>
        </article>
        <aside class="home-v2-sunday-side"><div><small>WEEK 3 ARCHIVE</small><strong>Every Week Stays Live.</strong><span>The Falcons’ Lambeau statement, Purdy’s four-touchdown Sunday, Chicago’s Monday-night win and the complete Week 3 desk remain archived while Week 4 moves to the front.</span></div><a href="nfl-week3-hub-2026.html">Open the Week 3 Desk →</a></aside>
      </div>`;
    return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');
    if(!desk || desk.dataset.week4Desk==='1') return !!desk;
    desk.dataset.week4Desk='1';
    desk.innerHTML=`
      <span class="home-v2-desk-kicker">4DK NFL • WEEK 4</span>
      <h3>The First Month<br>Starts to Matter.</h3>
      <p>Five teams are unbeaten. Five teams are still winless. Week 4 gives us an AFC North opener, London, a 3–0 vs. 3–0 AFC West showdown and a top-six 4DK matchup in San Francisco.</p>
      <div class="home-v2-desk-list">
        <a href="nfl-week4-preview-2026.html"><small>WEEK 4</small><b>Full Week 4 Preview — All 16 Games</b><span>→</span></a>
        <a href="nfl-power-rankings-week3-2026.html"><small>RANKINGS</small><b>4DK 1–32 Entering Week 4</b><span>→</span></a>
        <a href="nfl-week4-preview-2026.html#game-of-the-week"><small>SPOTLIGHT</small><b>Chiefs at Raiders — 3–0 vs. 3–0</b><span>→</span></a>
        <a href="nfl.html#scoreboard"><small>LIVE</small><b>4DK NFL Game Center + Red Zone</b><span>→</span></a>
      </div>`;
    return true;
  }

  function updateStaticNFLCard(){
    const card=document.querySelector('.nfl-home-feature');
    if(!card || card.dataset.week4Card==='1') return !!card;
    card.dataset.week4Card='1';
    const over=card.querySelector('.home-feature-overline'); if(over) over.textContent='4DK NFL • WEEK 4';
    const lock=card.querySelector('.nfl-mini-lockup'); if(lock) lock.innerHTML='WEEK 4.<br>PRESSURE CHANGES.';
    const score=card.querySelector('.nfl-mini-score'); if(score) score.textContent='W4';
    const copy=card.querySelector('.home-feature-copy');
    if(copy) copy.innerHTML='<div class="tag">NFL • Week 4</div><h3>Five Unbeatens. Five Winless Teams. The First Month Gets Real.</h3><p>Chiefs–Raiders, Broncos–49ers, London and a loaded Week 4 slate move to the front.</p><a class="read" href="nfl-week4-preview-2026.html">Open Week 4 →</a>';
    return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');
    if(!ticker || ticker.dataset.week4Current==='1') return !!ticker;
    ticker.dataset.week4Current='1';
    const items=['NFL WEEK 4: STEELERS AT BROWNS TONIGHT','CHIEFS AT RAIDERS: 3–0 VS 3–0','4DK #6 DENVER AT #1 SAN FRANCISCO','LONDON: COLTS AT COMMANDERS','WEEK 3 POWER RANKINGS: 49ERS HOLD #1','NBA 2026–27 COVERAGE CONTINUES'];
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
  [120,350,800,1400,2400,4200,7000].forEach(ms=>setTimeout(apply,ms));
  const observer=new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,70)});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
