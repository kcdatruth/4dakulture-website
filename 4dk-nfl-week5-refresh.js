/* 4 DA KULTURE — NFL WEEK 5 CURRENT DESK
 * Latest completed week: Week 4; Week 5 TNF final; Sunday/Monday games upcoming.
 * Archives are kept in the DOM and on their original URLs; this layer never deletes articles.
 * October 10, 2026 edition. Editorial snapshots are labeled as such.
 */
(() => {
  'use strict';
  const route = (location.pathname.replace(/\/+$/, '').split('/').pop() || '').toLowerCase();
  if (!['nfl','nfl.html'].includes(route) || window.__fourdkWeek5NFLRefresh) return;
  window.__fourdkWeek5NFLRefresh = true;
  const version = '2026-10-10-w5-archive-fix-v2';
  const logo = (team) => `https://a.espncdn.com/i/teamlogos/nfl/500/${team}.png`;
  const matchup = (a,b) => `<div class="dk5logos"><img src="${logo(a)}" alt="${a.toUpperCase()} logo" loading="lazy"><span>AT</span><img src="${logo(b)}" alt="${b.toUpperCase()} logo" loading="lazy"></div>`;
  const matchupCards = [
    {a:'sf',b:'sea',type:'SUNDAY • 4:25 ET',title:'49ERS AT SEAHAWKS',subtitle:'The 4–0 Niners travel to the 3–1 defending champs. Seattle gets Leonard Williams back, while Nick Bosa remains out for San Francisco.',tag:'NFC WEST • GAME OF THE WEEK'},
    {a:'bal',b:'atl',type:'SUNDAY NIGHT • 8:20 ET',title:'RAVENS AT FALCONS',subtitle:'Lamar Jackson is out with an ankle injury; Tyler Huntley gets the start. Bijan and Atlanta get their next measuring stick.',tag:'INJURY CHANGES THE MATCHUP'},
    {a:'phi',b:'jax',type:'LONDON • SUNDAY 9:30 ET',title:'EAGLES AT JAGUARS',subtitle:'Jacksonville enters 3–1. Philly enters 2–2. The overseas opener puts both teams under a microscope.',tag:'EARLY KICKOFF'},
    {a:'lv',b:'ne',type:'SUNDAY • 1:00 ET',title:'RAIDERS AT PATRIOTS',subtitle:'A 3–1 Vegas team looks to rebound against the Patriots team that just handed Buffalo its first defeat.',tag:'AFC CREDIBILITY TEST'},
    {a:'buf',b:'lar',type:'MONDAY NIGHT • 8:15 ET',title:'BILLS AT RAMS',subtitle:'Buffalo has a response to make after its first loss. The Rams have an opportunity to make another statement in prime time.',tag:'MNF • STAR POWER'}
  ];
  const mvp = [
    ['1','BROCK PURDY','SF • QB','4–0; No. 1 in 4DK’s completed Week 4 ranking'],
    ['2','PATRICK MAHOMES','KC • QB','4–0; Kansas City enters its bye week unbeaten'],
    ['3','KENNETH WALKER III','KC • RB','A central piece of the Chiefs’ undefeated start'],
    ['4','BIJAN ROBINSON','ATL • RB','145 rushing yards and 2 TD on Week 4 Monday night'],
    ['5','JARED GOFF','DET • QB','Detroit’s passing production keeps him in the debate']
  ];
  const rookies = [
    ['1','JACOB RODRIGUEZ','MIAMI • LB'],
    ['2','ANTHONY HILL JR.','TENNESSEE • LB'],
    ['3','DENZEL BOSTON','CLEVELAND • WR'],
    ['4','HEZEKIAH MASSES','LAS VEGAS • CB'],
    ['5','CARNELL TATE','TENNESSEE • WR']
  ];
  const card = (s) => `<article class="dk5game"><span class="dk5micro">${s.type}</span>${matchup(s.a,s.b)}<h3>${s.title}</h3><p>${s.subtitle}</p><small>${s.tag}</small></article>`;

  function styles(){
    if(document.getElementById('dk5refresh-styles')) return;
    const css=document.createElement('style'); css.id='dk5refresh-styles'; css.textContent=`
    body.nfl-page {scroll-padding-top:86px}
    body.nfl-page #w5current, body.nfl-page:has(#dk5current) .nfl-v2-hero {display:none!important} /* superseded page hero; originals and the TNF article are preserved */
    body.nfl-page .dk5wrap {width:min(1170px,calc(100% - 34px));margin:auto}
    body.nfl-page #dk5current {position:relative;background:#070a08;color:#f8f5ed;overflow:hidden;border-bottom:1px solid #383a31}
    .dk5top{background:radial-gradient(ellipse at 82% 15%,rgba(233,48,42,.18),transparent 33%),linear-gradient(120deg,#111814,#070a08 65%);padding:48px 0 32px;border-top:5px solid #e94234}
    .dk5micro{display:block;font:900 11px/1.4 Arial,sans-serif;letter-spacing:.14em;color:#f06a51;text-transform:uppercase}
    .dk5eyebrow{font:900 11px Arial,sans-serif;color:#d6b768;letter-spacing:.17em;text-transform:uppercase}
    .dk5title{margin:16px 0 14px;font:1000 clamp(53px,10vw,124px)/.84 Impact,'Arial Black',sans-serif;letter-spacing:-.045em;text-transform:uppercase}
    .dk5title em{color:#f3c45d;font-style:normal}
    .dk5deck{max-width:835px;color:#c5c7bf;font:clamp(16px,2.2vw,21px)/1.55 Georgia,serif;margin:0 0 23px}
    .dk5actions{display:flex;flex-wrap:wrap;gap:9px;margin:20px 0 30px}
    .dk5actions a,.dk5all{font:900 11px Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;text-decoration:none!important;color:#f7f6f1!important;border:1px solid #59605a;padding:12px 15px;background:#101712}
    .dk5actions a:first-child{background:#db4136;border-color:#db4136}
    .dk5strap{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(240px,1fr);gap:13px}
    .dk5lead{border:1px solid #473d34;padding:23px;background:linear-gradient(125deg,#18100f,#100d0c 65%)}
    .dk5lead .dk5score{display:block;margin:14px 0;color:#f8f2e8;font:1000 clamp(42px,7vw,78px)/.95 Impact,'Arial Black',sans-serif}
    .dk5lead h2{margin:0 0 10px;font:1000 27px/1.04 Impact,'Arial Black',sans-serif}
    .dk5lead p,.dk5aside p{font:15px/1.65 Arial,sans-serif;color:#bac0b8}
    .dk5lead a,.dk5aside a{font:900 10px Arial,sans-serif;color:#f0bf5a!important;text-decoration:none}
    .dk5aside{border:1px solid #334038;padding:22px;background:#111913}
    .dk5aside h3{font:1000 26px/1.05 Impact,'Arial Black',sans-serif;margin:8px 0 10px}
    .dk5body{padding:36px 0 45px}
    .dk5head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin:0 0 19px}
    .dk5head h2{margin:7px 0 0;font:1000 clamp(31px,6vw,52px)/.93 Impact,'Arial Black',sans-serif;text-transform:uppercase}
    .dk5head p{max-width:420px;margin:0;color:#aab1a9;font:12px/1.5 Arial,sans-serif}
    .dk5games{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .dk5game{padding:18px;border:1px solid #39423c;background:linear-gradient(160deg,#111914,#0d110e);min-width:0}
    .dk5logos{display:flex;align-items:center;justify-content:flex-start;gap:12px;margin:10px 0}
    .dk5logos img{width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 4px 8px #0009)}
    .dk5logos span{font:900 10px Arial;color:#9da99d}
    .dk5game h3{font:1000 23px/.99 Impact,'Arial Black',sans-serif;margin:10px 0}
    .dk5game p{color:#b8bdb8;font:13px/1.62 Arial,sans-serif;min-height:85px;margin:0 0 14px}
    .dk5game small{display:block;color:#f0bb5b;font:900 10px Arial,sans-serif;letter-spacing:.06em}
    .dk5boards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:40px}
    .dk5board{border:1px solid #39423c;background:#0d120e;padding:20px}
    .dk5board h3{font:1000 28px/1 Impact,'Arial Black',sans-serif;margin:7px 0 11px}
    .dk5row{display:grid;grid-template-columns:30px 1fr;gap:11px;padding:13px 0;border-top:1px solid #303931}
    .dk5row b{color:#f1c260;font:900 22px/1 Georgia,serif}
    .dk5row strong{display:block;font:900 13px Arial,sans-serif;color:#f8f5ed}
    .dk5row small{display:block;margin-top:4px;font:11px/1.45 Arial,sans-serif;color:#aab1aa}
    .dk5board>a{display:inline-block;margin-top:15px;color:#f2c55c!important;font:900 11px Arial,sans-serif;text-decoration:none}
    .dk5tip{margin:25px 0 0;border-left:5px solid #e24c3b;background:#131812;padding:18px;color:#d0d1ca;font:14px/1.65 Arial,sans-serif}
    .dk5tip b{color:#f4c561}
    #nfl-season-archive{margin:22px auto 44px;border:1px solid #394139;background:#0c100e;color:#f8f5ed}
    #nfl-season-archive>summary{cursor:pointer;list-style:none;padding:22px;display:flex;justify-content:space-between;gap:15px;align-items:center}
    #nfl-season-archive>summary::-webkit-details-marker{display:none}
    #nfl-season-archive>summary b{font:1000 28px Impact,'Arial Black',sans-serif}
    #nfl-season-archive>summary span{font:900 11px Arial,sans-serif;color:#f1c260}
    .dk5archlinks{padding:0 22px 23px;display:flex;flex-wrap:wrap;gap:9px}
    .dk5archlinks a{display:inline-block;text-decoration:none!important;color:#f1eee5!important;border:1px solid #3e493f;padding:10px 12px;font:900 11px Arial,sans-serif}
    #dk5-archived-originals{border-top:1px solid #354038}
    #dk5-archived-originals>.dk5archlabel{padding:20px 20px 0;color:#f1c260;font:900 10px Arial,sans-serif;letter-spacing:.11em}
    #dk5-archived-originals>section{max-width:none}
    /* Previously hidden legacy sections must still be readable when the archive opens. */
    body.nfl-page #dk5-archived-originals > [data-dk5-archived="true"]{display:block!important}
    #nfl-season-archive[open] #dk5-archived-originals > *{max-width:100%}
    body.nfl-page #dk5-archived-originals #mvp-watch,
    body.nfl-page #dk5-archived-originals #rookie-watch,
    body.nfl-page #dk5-archived-originals #power-rankings,
    body.nfl-page #dk5-archived-originals #week2-current {display:block!important}
    
    .dk5time{color:#969f98;font:900 10px Arial,sans-serif;letter-spacing:.09em}
    @media(max-width:950px){.dk5games{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:680px){.dk5top{padding:34px 0 25px}.dk5title{font-size:clamp(51px,13vw,82px)}.dk5strap,.dk5boards,.dk5games{grid-template-columns:1fr}.dk5logos img{width:63px;height:63px}.dk5game p{min-height:0}.dk5head{display:block}.dk5head p{margin-top:10px}.dk5body{padding-top:27px}.dk5board{padding:16px}.dk5archlinks{padding:0 13px 18px}#nfl-season-archive>summary{padding:17px}}
    `;document.head.appendChild(css);
  }

  function render(){
    let section=document.getElementById('dk5current');
    if(section) return;
    const nav=document.querySelector('.nfl-v2-nav');
    if(!nav)return;
    section=document.createElement('section');section.id='dk5current';section.dataset.edition=version;
    section.innerHTML=`<div class="dk5top"><div class="dk5wrap">
      <span class="dk5eyebrow">4 DA KULTURE • NFL WEEK 5 • OCTOBER 10, 2026</span>
      <h1 class="dk5title">THE PRESSURE<br><em>JUST WENT UP.</em></h1>
      <p class="dk5deck">One game is in the books. The rest of Week 5 is ready to test the league's early pecking order. Our 4–0 49ers head to Seattle, Atlanta hosts Baltimore without Lamar Jackson, and Buffalo closes the week in Los Angeles.</p>
      <div class="dk5actions"><a href="nfl-week5-preview-2026.html">FULL SUNDAY PREVIEW →</a><a href="nfl-week5-five-major-headlines.html">FIVE STORYLINES →</a><a href="#dk5rankings">MVP + ROOKIE WATCH →</a><a href="#scoreboard">LIVE SCOREBOARD →</a><a href="nfl-week5-standings-2026.html">WEEK 5 STANDINGS →</a><a href="nfl-season-archive-2026.html">SEASON ARCHIVE →</a></div>
      <div class="dk5strap"><article class="dk5lead"><span class="dk5micro">THURSDAY NIGHT • FINAL</span><span class="dk5score">TAMPA BAY 24 <span style="color:#f1be5d">–</span> DALLAS 16</span><h2>DALLAS LET ONE GET AWAY.</h2><p>The Bucs get their first win; Jalon Daniels earns his first as an NFL starter, and Bucky Irving's ground game helps Tampa secure the road victory. Dallas falls to 2–3 and the playoff questions only get louder.</p><a href="nfl-thursday-recap-week5-buccaneers-cowboys.html">READ THE FULL 4DK BREAKDOWN →</a></article>
      <aside class="dk5aside"><span class="dk5micro">WEEK 5 • INJURY DESK</span><h3>LAMAR OUT.<br>BOSA OUT.<br>THE BOARD CHANGES.</h3><p>Lamar Jackson will miss Baltimore's Sunday night trip to Atlanta with an ankle injury; Tyler Huntley starts. San Francisco will be without Nick Bosa and Kyle Juszczyk against Seattle, while Leonard Williams is cleared for the Seahawks.</p><p class="dk5time">Statuses checked October 10 • Check again before kickoff</p><a href="nfl-week5-preview-2026.html">THE WEEKEND OUTLOOK →</a></aside></div>
    </div></div><div class="dk5body dk5wrap"><div class="dk5head"><div><span class="dk5micro">MATCHUPS • TEAMS • STORIES</span><h2>THE WEEK 5 BOARD.</h2></div><p>Tomorrow's biggest tests. This is pregame analysis, not a prediction of final results.</p></div>
      <div class="dk5games">${matchupCards.map(card).join('')}</div>
      <div class="dk5boards" id="dk5rankings"><div class="dk5board"><span class="dk5micro">4DK MVP WATCH • WEEK 4 FINAL BASELINE</span><h3>THE TOP OF THE RACE</h3>${mvp.map(p=>`<div class="dk5row"><b>${p[0]}</b><div><strong>${p[1]}</strong><small>${p[2]} • ${p[3]}</small></div></div>`).join('')}<a href="nfl-week-4-sunday-night-update-2026.html#mvp">FULL TOP 10 MVP BOARD →</a></div>
      <div class="dk5board"><span class="dk5micro">4DK ROOKIE WATCH • WEEK 4 FINAL BASELINE</span><h3>THE NEW NAMES TO KNOW</h3>${rookies.map(p=>`<div class="dk5row"><b>${p[0]}</b><div><strong>${p[1]}</strong><small>${p[2]} • entering Week 5</small></div></div>`).join('')}<a href="nfl-week-4-sunday-night-update-2026.html#rookies">FULL TOP 10 ROOKIE BOARD →</a></div></div>
      <div class="dk5tip"><b>4DK's editorial rule:</b> New-week coverage moves to the front; past-week boards stay in the archive. MVP and Rookie Watch are Week 4 FINAL snapshots until this week's games are complete. Full 1–32 <a style="color:#f4c461" href="nfl-power-rankings-week4-2026.html">Power Rankings entering Week 5</a>, <a style="color:#f4c461" href="nfl-week5-standings-2026.html">Week 5 standings through Thursday</a> and <a style="color:#f4c461" href="nfl-season-archive-2026.html">all archived recaps</a> remain available.</div>
      </div>`;
    nav.insertAdjacentElement('afterend',section);
  }


  // Fix v2: Earlier layouts generated their own containers AFTER DOMContentLoaded.
  // Move each completed-week block into the native, collapsed archive without
  // removing any original article, link, or event handler.
  const oldSelectors = [
    '#mvp-watch','#rookie-watch','#power-rankings','#mnf-headline',
    '#this-week-4dk-nfl','#sunday-recaps','#redzone',
    '#w4final','#w4m-current','#w4m-stories','#w4m-rank',
    '#w4m-mvp','#w4m-rook','#w4current','#w4tnf','#w4redzone',
    '#w4rank','#w4mvp','#w4rook','#w4archive',
    '#week2-current','#week1-recaps',
    '[data-week1-recaps]','.nfl-week1-recaps','.fourdk-sunday-recaps',
    '.fourdk-this-week','.fourdk-mnf-headline','.w3rookies'
  ];

  function archive(){
    let details=document.getElementById('nfl-season-archive');
    if(!details){
      details=document.createElement('details');
      details.id='nfl-season-archive';
      details.className='dk5wrap';
      details.innerHTML=`<summary><b>SEASON ARCHIVE • WEEKS 1–4</b><span>OPEN / CLOSE ▾</span></summary>
        <div class="dk5archlinks">
        <a href="nfl-season-archive-2026.html">FULL SEASON ARCHIVE →</a>
        <a href="nfl-sunday-recaps.html">SUNDAY RECAPS →</a>
        <a href="nfl-thursday-recaps.html">THURSDAY RECAPS →</a>
        <a href="nfl-week-4-sunday-night-update-2026.html">WEEK 4 FINAL →</a>
        <a href="nfl-power-rankings-week4-2026.html">WEEK 4 POWER RANKINGS →</a>
        </div><div id="dk5-archived-originals"><div class="dk5archlabel">EARLY-SEASON COVERAGE • ALL ORIGINAL CONTENT PRESERVED</div></div>`;
      const anchor=document.getElementById('season-board')||document.querySelector('footer');
      if(anchor)anchor.before(details);else document.body.append(details);
    }

    const dest=document.getElementById('dk5-archived-originals');
    if(!dest) return;
    const prevent=new Set(['dk5current','nfl-season-archive','scoreboard','season-board','pickem','storylines']);
    const collection=new Set();

    // Known legacy insertions, including the Week 1 opening-two cards added by nfl-scoreboard.js.
    for(const sel of oldSelectors){
      try { document.querySelectorAll(sel).forEach(el=>collection.add(el)); } catch(e) {}
    }

    // Catch earlier week cards created by other site layers under slightly different names.
    // Only inspect main/top-level SECTIONS, not individual cards or all the page's paragraphs.
    document.querySelectorAll('body > section, main > section, .nfl-page > section').forEach(el=>{
      const title=el.querySelector('h1,h2')?.textContent?.trim()||'';
      const id=el.id||'';
      const cls=typeof el.className==='string'?el.className:'';
      const olderHeading=/\bWEEK\s*[1-4]\b/i.test(title);
      const olderContainer=/^(?:w[1-4](?:-|$)|week[1-4](?:-|$))/.test(id) ||
        /\b(?:nfl-week1-recaps|fourdk-sunday-recaps|fourdk-this-week)\b/i.test(cls);
      if(olderHeading||olderContainer||/THE OPENING TWO|SUNDAY NFL RECAPS/i.test(title)){
        collection.add(el);
      }
    });

    collection.forEach(el=>{
      if(!el.isConnected || dest.contains(el) || el===details || el.contains(details)) return;
      if(prevent.has(el.id)||el.contains(document.getElementById('dk5current')))return;
      if(el.matches('.nfl-scoreboard,.nfl-v2-hero,.nfl-v2-nav,.nfl-v2-season,.nfl-pickem'))return;
      // Don't move a child of an already archived panel a second time.
      if([...collection].some(parent=>parent!==el && parent.contains(el) && !dest.contains(parent)))return;
      el.dataset.dk5Archived='true';
      dest.appendChild(el);
    });
  }

  function watchLateInsertions(){
    if(window.__dk5ArchiveObserver) return;
    let pending=false;
    const observer=new MutationObserver(records=>{
      // Ignore DOM updates INSIDE our already-archived material to avoid render loops.
      if(!records.some(rec=>!document.getElementById('nfl-season-archive')?.contains(rec.target))) return;
      if(pending)return;
      pending=true;
      setTimeout(()=>{pending=false;archive();},240);
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.__dk5ArchiveObserver=observer;
  }

  function navEnhance(){
    const nav=document.querySelector('.nfl-v2-nav');if(!nav)return;
    const first=nav.querySelector('a[href="#dk5current"]');
    if(!first){let a=document.createElement('a');a.href='#dk5current';a.textContent='WEEK 5 CURRENT';a.className='active';nav.prepend(a);}
    if(!nav.querySelector('a[href="#nfl-season-archive"]')){
      const a=document.createElement('a');a.href='#nfl-season-archive';a.textContent='ARCHIVES';nav.append(a);
    }
  }

  function run(){styles();render();archive();navEnhance();watchLateInsertions();if(location.hash==='#nfl-season-archive')document.getElementById('nfl-season-archive').open=true;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  [600,1800,4000,8500,13000].forEach(ms=>setTimeout(run,ms));
})();
