(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isHome=path==='/' || path.endsWith('/index.html');
  if(!isHome || window.__fourdkMondayHomeCurrent) return;
  window.__fourdkMondayHomeCurrent=true;
  const MARKER='dart-season-feature';

  function addStyles(){
    if(document.getElementById('fourdk-mnf-home-current-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-mnf-home-current-styles';
    style.textContent=`
      body.home-page .home-v2-primary{background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.86)),radial-gradient(circle at 84% 18%,rgba(0,93,161,.30),transparent 16rem),radial-gradient(circle at 14% 82%,rgba(255,209,0,.17),transparent 18rem),linear-gradient(145deg,#151914,#080a08 72%)!important;border-color:#3a3f39!important}
      body.home-page .home-v2-primary:before{content:'28–6'!important;right:-18px!important;bottom:-28px!important;font-size:clamp(88px,15vw,180px)!important;color:#fff!important;opacity:.045!important}
      body.home-page .home-v2-primary h1 em{color:#83a9e5!important}
      .fourdk-current-shelf{position:relative;overflow:hidden;padding:18px 0 20px;background:#0c0d0c;color:#fff;border-top:1px solid #292d29;border-bottom:1px solid #292d29}
      .fourdk-current-shelf:after{content:'W2';position:absolute;right:-8px;bottom:-36px;font:1000 118px/.85 Arial Black,Impact,sans-serif;color:#fff;opacity:.025;pointer-events:none}
      .fourdk-current-shelf-inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto}
      .fourdk-current-shelf-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:11px}
      .fourdk-current-shelf-head small{display:block;color:#ff6548;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-current-shelf-head strong{display:block;margin-top:3px;font:1000 23px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-current-shelf-head a{color:#d8b45d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .fourdk-current-shelf-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px}
      .fourdk-current-shelf-card{display:flex;flex-direction:column;min-height:132px;padding:13px;border:1px solid #303430;background:#121412;color:#f5f2eb!important;text-decoration:none!important}
      .fourdk-current-shelf-card small{color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-current-shelf-card b{display:block;margin:7px 0;font:700 17px/1.05 Georgia,'Times New Roman',serif}
      .fourdk-current-shelf-card span{margin-top:auto;color:#a7ada7;font-size:8px;line-height:1.35}
      .fourdk-current-shelf-card.thursday{border-top:3px solid #2f70bd}.fourdk-current-shelf-card.rams{border-top:3px solid #ffd150}.fourdk-current-shelf-card.nba{border-top:3px solid #6b7fa4}.fourdk-current-shelf-card.music{border-top:3px solid #d4a74a}
      @media(max-width:900px){.fourdk-current-shelf-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:3px}.fourdk-current-shelf-card{flex:0 0 min(76vw,285px);scroll-snap-align:start}}
      @media(max-width:700px){body.home-page .home-search{padding:9px 0!important}body.home-page .site-search input,body.home-page .site-search button{min-height:48px!important;height:48px!important}.fourdk-current-shelf-head{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

  function updateLead(){
    const primary=document.querySelector('.home-v2-primary');
    if(!primary) return false;
    if(primary.dataset.homeLead===MARKER) return true;
    primary.dataset.homeLead=MARKER;
    primary.innerHTML=`<span class="home-v2-lead-kicker">4DK NFL • BREAKING • SEPTEMBER 23</span><h1>DART'S SEASON<br><em>CHANGES EVERYTHING.</em></h1><p>Reports say Jaxson Dart is expected to undergo season-ending knee surgery. The Giants are 1–1, Jameis Winston is next up, and New York now has to decide how aggressively to attack the quarterback market if it still believes this is a playoff roster.</p><div class="home-v2-primary-meta"><span>NYG 1–1</span><span>WINSTON NEXT UP</span><span>QB MARKET WATCH</span></div><div class="home-v2-primary-actions"><a class="home-v2-button" href="jaxson-dart-season-ending-injury-giants-qb-future.html">Read the Full Dart Feature →</a><a class="home-v2-button alt" href="nfl-mnf-recap-week2-rams-giants.html">Rams–Giants MNF Recap</a></div>`;
    return true;
  }

  function currentShelf(){
    if(document.querySelector('.fourdk-current-shelf')) return true;
    const lead=document.querySelector('.home-v2-lead'); if(!lead) return false;
    const section=document.createElement('section');section.className='fourdk-current-shelf';
    section.innerHTML=`<div class="fourdk-current-shelf-inner"><div class="fourdk-current-shelf-head"><div><small>STILL IN THE MIX • NOTHING GETS REMOVED</small><strong>MORE CURRENT 4DK.</strong></div><a href="/stories.html">Browse the Story Library →</a></div><div class="fourdk-current-shelf-grid">
      <a class="fourdk-current-shelf-card rams" href="nfl-sunday-recap-week2.html"><small>WEEK 2 • SUNDAY</small><b>What We Learned Sunday</b><span>Chiefs 33 • Colts 30 OT • Mahomes, Kelce, Walker and all 14 Sunday verdicts.</span></a>
      <a class="fourdk-current-shelf-card thursday" href="nfl-thursday-recap-week2-bills-lions.html"><small>WEEK 2 • THURSDAY</small><b>The House That Allen Built</b><span>Bills 41 • Lions 31 • Josh Allen accounts for five touchdowns.</span></a>
      <a class="fourdk-current-shelf-card rams" href="nfl.html#power-rankings"><small>WEEK 2 • FINAL BOARD</small><b>MVP • Rookie • Power Rankings</b><span>All three 4DK boards are final after Giants–Rams.</span></a>
      <a class="fourdk-current-shelf-card nba" href="nba-pacific-2026-27.html"><small>NBA • PACIFIC</small><b>Luka’s Era. Phoenix’s Crossroads. One More Ride.</b><span>The full Pacific Division outlook remains live.</span></a>
      <a class="fourdk-current-shelf-card nba" href="nba-southwest-2026-27.html"><small>NBA • SOUTHWEST</small><b>Wemby’s Window. Flagg’s Rise. Houston’s Test.</b><span>The Southwest preview completed all 30 teams.</span></a>
    </div></div>`;
    lead.insertAdjacentElement('afterend',section);return true;
  }

  function updateSportsDesk(){
    const desk=document.querySelector('.home-v2-desk.nfl');if(!desk)return false;
    const k=desk.querySelector('.home-v2-desk-kicker'),h=desk.querySelector('h3'),p=desk.querySelector('p'),list=desk.querySelector('.home-v2-desk-list');
    if(k)k.textContent='4DK NFL • GIANTS • BREAKING';if(h)h.innerHTML='Dart\'s Season<br>Changes Everything.';if(p)p.textContent='Reports say season-ending knee surgery is expected for Jaxson Dart. Jameis Winston gets the first shot, but the Giants now have to decide how aggressively to work the quarterback market.';
    if(list){
      let dart=list.querySelector('[data-dart-season-desk]');if(!dart){dart=document.createElement('a');dart.href='jaxson-dart-season-ending-injury-giants-qb-future.html';dart.dataset.dartSeasonDesk='';dart.innerHTML='<small>GIANTS • BREAKING</small><b>Dart season-ending surgery expected — what now at QB?</b><span>→</span>';}list.prepend(dart);
      let mnf=list.querySelector('[data-mnf-week2-final-desk]');if(!mnf){mnf=document.createElement('a');mnf.href='nfl-mnf-recap-week2-rams-giants.html';mnf.dataset.mnfWeek2FinalDesk='';mnf.innerHTML='<small>MONDAY • FINAL</small><b>The Rams Answered — Stafford, Donald & the Dart injury</b><span>→</span>';}dart.insertAdjacentElement('afterend',mnf);
      let sun=list.querySelector('[data-sunday-week2-desk]');if(!sun){sun=document.createElement('a');sun.href='nfl-sunday-recap-week2.html';sun.dataset.sundayWeek2Desk='';sun.innerHTML='<small>SUNDAY • FINAL</small><b>What We Learned Sunday — Chiefs 33, Colts 30 OT</b><span>→</span>';}mnf.insertAdjacentElement('afterend',sun);
    }return true;
  }

  function updateTicker(){
    const ticker=document.querySelector('.ticker-track');if(!ticker)return false;
    const items=['GIANTS: Jaxson Dart season-ending knee surgery expected','Dart ACL intact • MCL, PCL and meniscus reportedly damaged','Jameis Winston next up • 4DK says New York should work the QB market','MNF FINAL: Rams 28, Giants 6','FINAL WEEK 2: MVP Watch, Rookie Watch + Power Rankings updated','SUNDAY: Chiefs 33, Colts 30 OT','CLASSIC ALBUMS: Tha Carter II review • 9.6/10'];
    ticker.innerHTML=items.map(x=>`<span><span class="dot">●</span> ${x}</span>`).join('');return true;
  }

  function apply(){addStyles();updateLead();currentShelf();updateSportsDesk();updateTicker();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [350,700,1200,2000,2800,3800,5200,7000].forEach(ms=>setTimeout(apply,ms));
})();