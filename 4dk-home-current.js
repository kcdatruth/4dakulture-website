(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkWeek3HomeCurrent) return;
  window.__fourdkWeek3HomeCurrent=true;

  const MARKER='week3-falcons-packers';

  function addStyles(){
    if(document.getElementById('fourdk-week3-home-current-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week3-home-current-styles';
    style.textContent=`
      body.home-page .home-v2-primary{
        background:
          linear-gradient(90deg,rgba(5,6,6,.95) 0%,rgba(5,6,6,.88) 48%,rgba(5,6,6,.54) 100%),
          url('/falcons-storm-lambeau-35-14.png') center/cover no-repeat!important;
        border-color:#5c2a27!important
      }
      body.home-page .home-v2-primary:before{
        content:'35–14'!important;
        right:-16px!important;
        bottom:-28px!important;
        font-size:clamp(88px,15vw,180px)!important;
        color:#fff!important;
        opacity:.045!important
      }
      body.home-page .home-v2-primary h1 em{color:#f0b342!important}

      body.home-page .home-v2-side-card.week3-tnf{
        border-top:3px solid #d6313a!important;
        background:
          radial-gradient(circle at 88% 12%,rgba(214,49,58,.19),transparent 9rem),
          linear-gradient(145deg,#241012,#0b0e0c)!important
      }

      .fourdk-current-shelf{
        position:relative;overflow:hidden;padding:18px 0 20px;
        background:#0c0d0c;color:#fff;border-top:1px solid #292d29;border-bottom:1px solid #292d29
      }
      .fourdk-current-shelf:after{
        content:'W3';position:absolute;right:-8px;bottom:-36px;
        font:1000 118px/.85 Arial Black,Impact,sans-serif;
        color:#fff;opacity:.025;pointer-events:none
      }
      .fourdk-current-shelf-inner{
        position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto
      }
      .fourdk-current-shelf-head{
        display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:11px
      }
      .fourdk-current-shelf-head small{
        display:block;color:#ff6548;font-size:8px;font-weight:1000;
        letter-spacing:.13em;text-transform:uppercase
      }
      .fourdk-current-shelf-head strong{
        display:block;margin-top:3px;font:1000 23px/.95 Arial Black,Impact,sans-serif;
        text-transform:uppercase
      }
      .fourdk-current-shelf-head a{
        color:#d8b45d!important;text-decoration:none!important;
        font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase
      }
      .fourdk-current-shelf-grid{
        display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px
      }
      .fourdk-current-shelf-card{
        display:flex;flex-direction:column;min-height:132px;padding:13px;
        border:1px solid #303430;background:#121412;color:#f5f2eb!important;text-decoration:none!important
      }
      .fourdk-current-shelf-card small{
        color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase
      }
      .fourdk-current-shelf-card b{
        display:block;margin:7px 0;font:700 17px/1.05 Georgia,'Times New Roman',serif
      }
      .fourdk-current-shelf-card span{
        margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.35
      }
      .fourdk-current-shelf-card.thursday{border-top:3px solid #d6313a}
      .fourdk-current-shelf-card.sunday{border-top:3px solid #d8b45d}
      .fourdk-current-shelf-card.nba{border-top:3px solid #6b7fa4}
      .fourdk-current-shelf-card.music{border-top:3px solid #b22d40}

      body.home-page .home-v2-sunday-final{
        background:
          radial-gradient(circle at 86% 20%,rgba(214,49,58,.18),transparent 18rem),
          radial-gradient(circle at 12% 80%,rgba(215,173,85,.11),transparent 18rem),
          linear-gradient(145deg,#14130f,#080b09 72%)!important
      }
      body.home-page .home-v2-sunday-final:after{
        content:'WEEK 3'!important;
        font-size:clamp(72px,13vw,165px)!important
      }

      .home-fresh-card[data-week3-tnf-home]{
        border-top:4px solid #d6313a!important;
        box-shadow:0 12px 34px rgba(0,0,0,.08)
      }
      .home-fresh-card[data-week3-tnf-home] img{
        object-position:center 44%
      }

      @media(max-width:900px){
        .fourdk-current-shelf-grid{
          display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:3px
        }
        .fourdk-current-shelf-card{
          flex:0 0 min(76vw,285px);scroll-snap-align:start
        }
      }
      @media(max-width:700px){
        body.home-page .home-search{padding:9px 0!important}
        body.home-page .site-search input,body.home-page .site-search button{
          min-height:48px!important;height:48px!important
        }
        .fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}
        body.home-page .home-v2-primary{
          background:
            linear-gradient(180deg,rgba(5,6,6,.78),rgba(5,6,6,.94)),
            url('/falcons-storm-lambeau-35-14.png') 50% 40%/cover no-repeat!important
        }
      }
    `;
    document.head.appendChild(style);
  }

  function updateLead(){
    const primary=document.querySelector('.home-v2-primary');
    if(!primary) return false;
    if(primary.dataset.homeLead===MARKER) return true;
    primary.dataset.homeLead=MARKER;
    primary.innerHTML=`
      <span class="home-v2-lead-kicker">4DK NFL • WEEK 3 • THURSDAY FINAL</span>
      <h1>WEEK 3 IS LIVE.<br><em>ATLANTA WOKE UP.</em></h1>
      <p>Michael Penix Jr. returned, Bijan Robinson ran for 194 yards and Drake London exploded for 194 receiving as the Falcons walked into Lambeau and beat Green Bay 35–14. Now the rest of Week 3 is waiting: 14 Sunday games, Ravens–Cowboys in Rio and Rams–Broncos under the lights.</p>
      <div class="home-v2-primary-meta">
        <span>ATL 35 • GB 14</span>
        <span>BIJAN: 194 RUSH • 2 TD</span>
        <span>LONDON: 9 REC • 194 YDS</span>
        <span>14 SUNDAY GAMES</span>
      </div>
      <div class="home-v2-primary-actions">
        <a class="home-v2-button" href="nfl-thursday-recap-week3-falcons-packers.html">Read the Week 3 TNF Recap →</a>
        <a class="home-v2-button alt" href="nfl-week3-hub-2026.html">Open the Week 3 Hub</a>
      </div>`;
    return true;
  }

  function updateSide(){
    const side=document.querySelector('.home-v2-side');
    if(!side) return false;
    if(side.dataset.week3Current==='1') return true;
    side.dataset.week3Current='1';
    side.innerHTML=`
      <a class="home-v2-side-card week3-tnf" href="nfl-thursday-recap-week3-falcons-packers.html">
        <small>TNF • FINAL • WEEK 3</small>
        <b>Penix Is Back. Bijan Took Over.</b>
        <span>Atlanta 35, Green Bay 14. Penix returns, Bijan makes his RB1 case and Drake London goes off.</span>
        <strong>Read the full recap →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl.html#scoreboard">
        <small>NFL • SUNDAY • 14 GAMES</small>
        <b>Week 3 Takes Over Sunday</b>
        <span>Chargers–Bills, Chiefs–Dolphins, Bengals–Steelers, 49ers–Cardinals and more.</span>
        <strong>Open the live game center →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl-week3-hub-2026.html">
        <small>INTERNATIONAL • RIO</small>
        <b>Ravens vs. Cowboys</b>
        <span>Baltimore and Dallas meet Sunday afternoon in the NFL's Rio de Janeiro game.</span>
        <strong>Open Week 3 →</strong>
      </a>
      <a class="home-v2-side-card" href="nfl-week3-hub-2026.html">
        <small>SUNDAY NIGHT FOOTBALL</small>
        <b>Rams vs. Broncos</b>
        <span>Matthew Stafford and the Rams head to Denver for the Week 3 Sunday night closer.</span>
        <strong>See the Week 3 slate →</strong>
      </a>`;
    return true;
  }

  function currentShelf(){
    const old=document.querySelector('.fourdk-current-shelf');
    if(old && old.dataset.week3Shelf==='1') return true;
    if(old) old.remove();

    const lead=document.querySelector('.home-v2-lead');
    if(!lead) return false;

    const section=document.createElement('section');
    section.className='fourdk-current-shelf';
    section.dataset.week3Shelf='1';
    section.innerHTML=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head">
          <div>
            <small>WEEK 3 IS ACTIVE • NOTHING GETS REMOVED</small>
            <strong>RIGHT NOW ON 4DK.</strong>
          </div>
          <a href="/stories.html">Browse the Story Library →</a>
        </div>
        <div class="fourdk-current-shelf-grid">
          <a class="fourdk-current-shelf-card thursday" href="nfl-thursday-recap-week3-falcons-packers.html">
            <small>WEEK 3 • THURSDAY FINAL</small>
            <b>Penix Is Back. Bijan Took Over.</b>
            <span>Falcons 35 • Packers 14 • The full Lambeau breakdown.</span>
          </a>
          <a class="fourdk-current-shelf-card sunday" href="nfl.html#scoreboard">
            <small>WEEK 3 • SUNDAY</small>
            <b>14 Games. All Day.</b>
            <span>Live scores, team stats, player leaders and Red Zone from the NFL hub.</span>
          </a>
          <a class="fourdk-current-shelf-card sunday" href="nfl-week3-hub-2026.html">
            <small>RIO • SUNDAY</small>
            <b>Ravens vs. Cowboys</b>
            <span>The NFL's Week 3 international spotlight lands in Rio de Janeiro.</span>
          </a>
          <a class="fourdk-current-shelf-card sunday" href="nfl-week3-hub-2026.html">
            <small>SNF • SUNDAY</small>
            <b>Rams vs. Broncos</b>
            <span>Two 2025 conference-finalists meet in Denver under the lights.</span>
          </a>
          <a class="fourdk-current-shelf-card nba" href="nba-opening-week-2026.html">
            <small>NBA • OPENING WEEK</small>
            <b>The Season Starts With Everything on the Line.</b>
            <span>Eight Opening Week storylines are live now.</span>
          </a>
          <a class="fourdk-current-shelf-card music" href="top-20-west-coast-rappers-all-time.html">
            <small>4DK MUSIC • WEST COAST</small>
            <b>The 20 Greatest West Coast Rappers.</b>
            <span>Pac at one. Kendrick at two. Snoop at three.</span>
          </a>
        </div>
      </div>`;
    lead.insertAdjacentElement('afterend',section);
    return true;
  }

  function updateSundayBlock(){
    const section=document.querySelector('.home-v2-sunday-final');
    if(!section) return false;
    if(section.dataset.week3Sunday==='1') return true;
    section.dataset.week3Sunday='1';
    section.setAttribute('aria-label','Week 3 NFL Sunday preview');
    section.innerHTML=`
      <div class="shell home-v2-sunday-final-grid">
        <article class="home-v2-sunday-feature">
          <small>4DK NFL • WEEK 3 • SUNDAY NEXT</small>
          <h2>THURSDAY SET THE TONE.<br><em>SUNDAY GETS THE WHOLE LEAGUE.</em></h2>
          <p>Atlanta already made the first Week 3 statement. Sunday brings 14 more games: Chargers–Bills, Chiefs–Dolphins, Bengals–Steelers, 49ers–Cardinals, Ravens–Cowboys in Rio and Rams–Broncos on Sunday Night Football.</p>
          <div class="home-v2-sunday-stats">
            <span>14 SUNDAY GAMES</span>
            <span>LAC @ BUF • 1 PM ET</span>
            <span>BAL @ DAL • RIO • 4:25 ET</span>
            <span>LAR @ DEN • SNF • 8:20 ET</span>
          </div>
          <a href="nfl.html#scoreboard">Open the Week 3 Game Center →</a>
        </article>
        <aside class="home-v2-sunday-side">
          <div>
            <small>WEEK 3 • WHAT TO WATCH</small>
            <strong>Pressure Games.<br>Statement Games.</strong>
            <span>Buffalo gets the Chargers. Kansas City heads to Miami. San Francisco hosts Arizona. Baltimore and Dallas get the Rio stage. The Rams and Broncos close Sunday.</span>
          </div>
          <a href="nfl-week3-hub-2026.html">Open the Week 3 Hub →</a>
        </aside>
      </div>`;

    const jumpLink=document.querySelector('.home-v2-jump a[href="#home-sunday-final"]');
    if(jumpLink) jumpLink.textContent='Week 3 Sunday';
    return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');
    if(!desk) return false;

    const k=desk.querySelector('.home-v2-desk-kicker');
    const h=desk.querySelector('h3');
    const p=desk.querySelector('p');
    const list=desk.querySelector('.home-v2-desk-list');

    if(k) k.textContent='4DK NFL • WEEK 3';
    if(h) h.innerHTML='Week 3 Is<br>Already Talking.';
    if(p) p.textContent='Atlanta opened the week with a 35–14 statement in Green Bay. Penix is back, Bijan has an RB1 case, and Sunday brings 14 more games plus Rio and a loaded Sunday night matchup.';

    if(list){
      list.innerHTML=`
        <a href="nfl-thursday-recap-week3-falcons-packers.html">
          <small>THURSDAY • FINAL</small><b>Falcons 35, Packers 14 — Penix is back, Bijan took over</b><span>→</span>
        </a>
        <a href="nfl.html#scoreboard">
          <small>SUNDAY • LIVE</small><b>Week 3 Game Center — 14 games all day</b><span>→</span>
        </a>
        <a href="nfl-week3-hub-2026.html">
          <small>RIO</small><b>Ravens vs. Cowboys — international spotlight</b><span>→</span>
        </a>
        <a href="nfl-week3-hub-2026.html">
          <small>SNF</small><b>Rams vs. Broncos — Sunday night in Denver</b><span>→</span>
        </a>
        <a href="nfl-week3-hub-2026.html">
          <small>MNF</small><b>Eagles vs. Bears closes Week 3 Monday night</b><span>→</span>
        </a>`;
    }
    return true;
  }

  function updateFresh(){
    const grid=document.querySelector('.home-fresh-grid');
    if(!grid) return false;
    if(grid.querySelector('[data-week3-tnf-home]')) return true;

    const card=document.createElement('a');
    card.className='home-fresh-card';
    card.href='nfl-thursday-recap-week3-falcons-packers.html';
    card.dataset.week3TnfHome='1';
    card.innerHTML=`
      <img src="falcons-storm-lambeau-35-14.png" alt="4DK Week 3 Falcons 35 Packers 14 Thursday Night Football recap graphic">
      <div class="home-fresh-copy">
        <small>NFL • WEEK 3 • TNF FINAL</small>
        <h3>Penix Is Back. Bijan Took Over.</h3>
        <p>Atlanta walks into Lambeau and wins 35–14. Penix returns, Bijan runs wild and Drake London erupts.</p>
        <b>Read the full recap →</b>
      </div>`;
    grid.prepend(card);
    return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');
    if(!ticker) return false;
    const items=[
      'WEEK 3: Falcons 35, Packers 14',
      'Penix returns: 18/25 • 256 YDS • TD',
      'Bijan Robinson: 194 rush yards • 2 TD',
      'Drake London: 9 catches • 194 yards',
      'SUNDAY: 14 games across the Week 3 slate',
      'RIO: Ravens vs. Cowboys • Sunday 4:25 ET',
      'SNF: Rams vs. Broncos • Sunday 8:20 ET',
      'NBA: Opening Week headline board live now',
      '4DK MUSIC: Top 20 West Coast rappers live now'
    ];
    ticker.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
    return true;
  }

  function apply(){
    addStyles();
    updateLead();
    updateSide();
    currentShelf();
    updateSundayBlock();
    updateSportsDesk();
    updateFresh();
    updateTicker();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  } else {
    apply();
  }

  [250,500,900,1400,2200,3200,4500,6500].forEach(ms=>setTimeout(apply,ms));
})();
