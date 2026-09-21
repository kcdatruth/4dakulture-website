(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkSundayHomeCurrent) return;
  window.__fourdkSundayHomeCurrent=true;

  const MARKER='sunday-week2-final';

  function addStyles(){
    if(document.getElementById('fourdk-sunday-home-current-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-sunday-home-current-styles';
    style.textContent=`
      body.home-page .home-v2-primary{
        background:
          linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.86)),
          radial-gradient(circle at 84% 18%,rgba(225,71,43,.30),transparent 16rem),
          radial-gradient(circle at 14% 82%,rgba(213,171,79,.16),transparent 18rem),
          linear-gradient(145deg,#151914,#080a08 72%)!important;
        border-color:#3a3f39!important
      }
      body.home-page .home-v2-primary:before{
        content:'33–30'!important;
        right:-18px!important;
        bottom:-28px!important;
        font-size:clamp(88px,15vw,180px)!important;
        color:#fff!important;
        opacity:.045!important
      }
      body.home-page .home-v2-primary h1 em{color:#ffd268!important}

      .fourdk-current-shelf{
        position:relative;overflow:hidden;
        padding:18px 0 20px;
        background:#0c0d0c;color:#fff;
        border-top:1px solid #292d29;border-bottom:1px solid #292d29
      }
      .fourdk-current-shelf:after{
        content:'W2';position:absolute;right:-8px;bottom:-36px;
        font:1000 118px/.85 Arial Black,Impact,sans-serif;
        color:#fff;opacity:.025;pointer-events:none
      }
      .fourdk-current-shelf-inner{
        position:relative;z-index:2;
        width:min(1180px,calc(100% - 34px));margin:auto
      }
      .fourdk-current-shelf-head{
        display:flex;align-items:end;justify-content:space-between;gap:16px;
        margin-bottom:11px
      }
      .fourdk-current-shelf-head small{
        display:block;color:#ff6548;font-size:8px;font-weight:1000;
        letter-spacing:.13em;text-transform:uppercase
      }
      .fourdk-current-shelf-head strong{
        display:block;margin-top:3px;
        font:1000 23px/.95 Arial Black,Impact,sans-serif;
        text-transform:uppercase
      }
      .fourdk-current-shelf-head a{
        color:#d8b45d!important;text-decoration:none!important;
        font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase
      }
      .fourdk-current-shelf-grid{
        display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px
      }
      .fourdk-current-shelf-card{
        display:flex;flex-direction:column;min-height:132px;
        padding:13px;border:1px solid #303430;background:#121412;
        color:#f5f2eb!important;text-decoration:none!important
      }
      .fourdk-current-shelf-card:hover{border-color:#646a64;transform:translateY(-1px)}
      .fourdk-current-shelf-card small{
        color:#ff6548;font-size:7px;font-weight:1000;
        letter-spacing:.1em;text-transform:uppercase
      }
      .fourdk-current-shelf-card b{
        display:block;margin:7px 0;
        font:700 17px/1.05 Georgia,'Times New Roman',serif
      }
      .fourdk-current-shelf-card span{
        margin-top:auto;color:#a7ada7;
        font-size:8px;line-height:1.35
      }
      .fourdk-current-shelf-card.thursday{border-top:3px solid #2f70bd}
      .fourdk-current-shelf-card.rams{border-top:3px solid #d7aa3d}
      .fourdk-current-shelf-card.nba{border-top:3px solid #6b7fa4}
      .fourdk-current-shelf-card.music{border-top:3px solid #d4a74a}

      @media(max-width:900px){
        .fourdk-current-shelf-grid{
          display:flex;overflow-x:auto;scroll-snap-type:x mandatory;
          gap:8px;padding-bottom:3px
        }
        .fourdk-current-shelf-card{
          flex:0 0 min(76vw,285px);scroll-snap-align:start
        }
      }

      @media(max-width:700px){
        body.home-page .home-search{padding:9px 0!important}
        body.home-page .home-search .shell{padding-top:0!important;padding-bottom:0!important}
        body.home-page .search-shell{min-height:0!important}
        body.home-page .site-search input{
          min-height:48px!important;height:48px!important;
          padding-top:10px!important;padding-bottom:10px!important
        }
        body.home-page .site-search button{
          min-height:48px!important;height:48px!important;
          padding-top:0!important;padding-bottom:0!important
        }
        body.home-page .home-v2-primary{min-height:420px!important}
        .fourdk-current-shelf{padding:14px 0 16px}
        .fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}
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
      <span class="home-v2-lead-kicker">4DK NFL • WHAT WE LEARNED SUNDAY • WEEK 2</span>
      <h1>WHAT WE LEARNED<br><em>SUNDAY.</em></h1>
      <p>Kansas City survives Indianapolis 33–30 in overtime. Patrick Mahomes throws for 382 yards and three touchdowns, Travis Kelce turns back the clock, Kenneth Walker gives the Chiefs balance and Daniel Jones makes a statement in a game that came down to one controversial replay reversal.</p>
      <div class="home-v2-primary-meta">
        <span>KC 33 • IND 30 OT</span>
        <span>Mahomes: 382 YDS • 3 TD</span>
        <span>14 Sunday games • 14 verdicts</span>
      </div>
      <div class="home-v2-primary-actions">
        <a class="home-v2-button" href="nfl-sunday-recap-week2.html">Read the Full Sunday Recap →</a>
        <a class="home-v2-button alt" href="nfl-sunday-recaps.html">Sunday Recap Archive</a>
      </div>`;
    return true;
  }

  function currentShelf(){
    if(document.querySelector('.fourdk-current-shelf')) return true;
    const lead=document.querySelector('.home-v2-lead');
    if(!lead) return false;

    const section=document.createElement('section');
    section.className='fourdk-current-shelf';
    section.setAttribute('aria-label','More current 4 Da Kulture coverage');
    section.innerHTML=`
      <div class="fourdk-current-shelf-inner">
        <div class="fourdk-current-shelf-head">
          <div>
            <small>STILL IN THE MIX • NOTHING GETS REMOVED</small>
            <strong>MORE CURRENT 4DK.</strong>
          </div>
          <a href="/stories.html">Browse the Story Library →</a>
        </div>
        <div class="fourdk-current-shelf-grid">
          <a class="fourdk-current-shelf-card thursday" href="nfl-thursday-recap-week2-bills-lions.html">
            <small>EARLIER WEEK 2 • THURSDAY</small>
            <b>The House That Allen Built</b>
            <span>Bills 41 • Lions 31 • Josh Allen accounts for five touchdowns.</span>
          </a>
          <a class="fourdk-current-shelf-card rams" href="rams-week1-loss-garrett-injury-giants-mnf-2026.html">
            <small>RAMS • MONDAY NIGHT</small>
            <b>The Rams Got Punched. Now They Have to Respond.</b>
            <span>Garrett on IR. Giants at Rams. The response game stays featured.</span>
          </a>
          <a class="fourdk-current-shelf-card nba" href="nba-pacific-2026-27.html">
            <small>NBA • PACIFIC</small>
            <b>Luka’s Era. Phoenix’s Crossroads. One More Ride.</b>
            <span>The full Pacific Division outlook remains live.</span>
          </a>
          <a class="fourdk-current-shelf-card nba" href="nba-southwest-2026-27.html">
            <small>NBA • SOUTHWEST</small>
            <b>Wemby’s Window. Flagg’s Rise. Houston’s Test.</b>
            <span>The Southwest preview completed all 30 teams.</span>
          </a>
          <a class="fourdk-current-shelf-card music" href="tha-carter-ii-when-wayne-became-wayne.html">
            <small>MUSIC • CLASSIC ALBUMS</small>
            <b>Tha Carter II: When Wayne Became Wayne</b>
            <span>4DK rating: 9.6/10 • the full review stays in rotation.</span>
          </a>
        </div>
      </div>`;
    lead.insertAdjacentElement('afterend',section);
    return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');
    if(!desk) return false;

    const kicker=desk.querySelector('.home-v2-desk-kicker');
    const heading=desk.querySelector('h3');
    const copy=desk.querySelector('p');
    const list=desk.querySelector('.home-v2-desk-list');

    if(kicker) kicker.textContent='4DK NFL • WEEK 2 • SUNDAY FINAL';
    if(heading) heading.innerHTML='Sunday<br>Set the Board.';
    if(copy) copy.textContent='Fourteen Sunday games changed the Week 2 picture. Kansas City finished the day in overtime, while the Thursday result, Rams response story, injuries and live game center stay one click away.';

    if(list){
      let sunday=list.querySelector('[data-sunday-week2-desk]');
      if(!sunday){
        sunday=document.createElement('a');
        sunday.href='nfl-sunday-recap-week2.html';
        sunday.dataset.sundayWeek2Desk='';
        sunday.innerHTML='<small>SUNDAY • FINAL</small><b>What We Learned Sunday — Chiefs 33, Colts 30 OT</b><span>→</span>';
      }
      list.prepend(sunday);

      const thursday=list.querySelector('[data-thursday-week2-desk]');
      if(thursday) sunday.insertAdjacentElement('afterend',thursday);
    }
    return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');
    if(!ticker) return false;
    const items=[
      'WHAT WE LEARNED SUNDAY: Chiefs 33, Colts 30 OT',
      'Mahomes 382 yards • Kelce 101 • Walker 117 rushing',
      'Earlier Week 2: Bills 41, Lions 31 • Allen scores 5 TD',
      'Rams response watch: Giants at Rams Monday Night Football',
      'NBA: Pacific + Southwest division previews live',
      'CLASSIC ALBUMS: Tha Carter II review • 9.6/10',
      'Mamba File 003: The Shaq–Kobe Era'
    ];
    ticker.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');
    ticker.dataset.sundayWeek2=MARKER;
    return true;
  }

  function apply(){
    addStyles();
    updateLead();
    currentShelf();
    updateSportsDesk();
    updateTicker();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }

  // app-nav.js currently promotes Thursday at several delayed passes.
  // Re-apply the newer Sunday layer after each of those passes so the
  // latest story owns the hero while Thursday remains discoverable below.
  [350,700,1200,2000,2800,3800,5200].forEach(ms=>setTimeout(apply,ms));

  const observer=new MutationObserver(()=>{
    const primary=document.querySelector('.home-v2-primary');
    if(primary && primary.dataset.homeLead!==MARKER){
      setTimeout(apply,0);
    }
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});
  setTimeout(()=>observer.disconnect(),8000);
})();
