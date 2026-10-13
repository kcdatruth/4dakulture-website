/* 4 DA KULTURE — NFL WEEK 5 CURRENT DESK
 * Week 5 Sunday is final; Monday Bills–Rams is still upcoming.
 * Archives are kept in the DOM and on their original URLs; this layer never deletes articles.
 * October 11, 2026 Sunday final edition. Week 4 rankings remain labeled snapshots.
 */
(() => {
  'use strict';
  const route = (location.pathname.replace(/\/+$/, '').split('/').pop() || '').toLowerCase();
  if (!['nfl','nfl.html'].includes(route) || window.__fourdkWeek5NFLRefresh) return;
  window.__fourdkWeek5NFLRefresh = true;
  const version = '2026-10-11-w5-sunday-final-v1';
  const logo = (team) => `https://a.espncdn.com/i/teamlogos/nfl/500/${team}.png`;
  const matchup = (a,b) => `<div class="dk5logos"><img src="${logo(a)}" alt="${a.toUpperCase()} logo" loading="lazy"><span>AT</span><img src="${logo(b)}" alt="${b.toUpperCase()} logo" loading="lazy"></div>`;
  const matchupCards = [
    {a:'bal',b:'atl',type:'SUNDAY NIGHT • FINAL / OT',title:'RAVENS 30 • FALCONS 23',subtitle:'Tyler Huntley ties it with 40 seconds left and wins it with a 1-yard overtime touchdown run. Atlanta loses Penix to a rib injury, then sees Kyle Hamilton intercept Tua Tagovailoa.',tag:'SUNDAY NIGHT • OVERTIME FINISH'},
    {a:'sf',b:'sea',type:'SUNDAY • FINAL',title:'49ERS 32 • SEAHAWKS 29',subtitle:'San Francisco survives a turnover-filled road battle to reach 5–0. Purdy throws for 189 yards and two touchdowns in the NFC West showdown.',tag:'49ERS 5–0 • NFC WEST STATEMENT'},
    {a:'phi',b:'jax',type:'LONDON • FINAL',title:'JAGUARS 19 • EAGLES 17',subtitle:'Cam Little wins it from 57 yards after an Ameer Abdullah return flips the final seconds. Jacksonville rises to 4–1.',tag:'WALK-OFF IN LONDON'},
    {a:'lv',b:'ne',type:'SUNDAY • FINAL',title:'PATRIOTS 45 • RAIDERS 17',subtitle:'The Patriots flatten Vegas and both clubs move to 3–2. A hard reality check for a Raiders team chasing legitimacy.',tag:'AFC • THE RESULT THAT STINGS'},
    {a:'buf',b:'lar',type:'MONDAY NIGHT • FINAL / OT',title:'BILLS 37 • RAMS 34',subtitle:'Josh Allen delivers 331 combined yards, Puka catches 17 passes, and Greg Rousseau blocks a crucial overtime field goal before Tyler Bass wins it.',tag:'MNF • BUFFALO SURVIVES'}
  ];
  const mvp = [
    ['1','BROCK PURDY','SF • QB','5–0; San Francisco survives Seattle in a division thriller'],
    ['2','JOSH ALLEN','BUF • QB','331 combined yards and 2 total TD; OT win over the Rams'],
    ['3','PATRICK MAHOMES','KC • QB','4–0; undefeated Chiefs return from Week 5 bye'],
    ['4','KENNETH WALKER III','KC • RB','Remains a centerpiece of unbeaten Kansas City’s attack'],
    ['5','BIJAN ROBINSON','ATL • RB','Still in the conversation despite the Falcons’ OT loss']
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

    /* 4DK editorial photo desk: independently licensed real photography, not AI portraits. */
    .dk5photodesk{margin:0 0 33px;padding:0;background:#080b09;color:#f8f4ec}
    .dk5photohead{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:0 0 17px}
    .dk5photohead h2{font:1000 clamp(34px,5.8vw,64px)/.9 Impact,'Arial Black',sans-serif;letter-spacing:-.038em;text-transform:uppercase;margin:7px 0}
    .dk5photohead h2 em{font-style:normal;color:#eab95b}
    .dk5photohead p{font:13px/1.6 Arial,sans-serif;color:#aab4ad;max-width:340px;margin:0}
    .dk5photogrid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:12px}
    .dk5photocard{min-width:0;border:1px solid #42463e;display:flex;flex-direction:column;background:#111714;position:relative}
    .dk5photocard:first-child{border-color:#bb8c52}
    .dk5photocard::after{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#e84a38,#e6b659);pointer-events:none}
    .dk5photolink{color:#f6f2e8!important;text-decoration:none!important;display:flex;flex-direction:column;flex:1;min-width:0}
    .dk5photoframe{margin:0;position:relative;height:275px;overflow:hidden;background:linear-gradient(140deg,#28241d,#101612);border-bottom:1px solid #3e463b}
    .dk5photocard:first-child .dk5photoframe{height:320px}
    .dk5photoframe img.dk5realpic{display:block;width:100%;height:100%;object-fit:cover;object-position:center 29%;filter:saturate(.86) contrast(1.06)}
    .dk5photocard:first-child .dk5photoframe img.dk5realpic{object-position:center 19%}
    .dk5photoframe::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 52%,#060b09aa 100%);pointer-events:none}
    .dk5photowatermark{position:absolute;left:15px;bottom:13px;z-index:1;background:#131714d9;border-left:3px solid #d74637;padding:7px 10px;color:#f8d08a;font:900 10px Arial,sans-serif;letter-spacing:.08em}
    .dk5photo-fallback{position:absolute;inset:0;display:grid;place-items:center;z-index:0;pointer-events:none;opacity:.3}
    .dk5photo-fallback img{width:140px;height:140px;object-fit:contain}
    .dk5photoframe:not(.dk5photo-error) .dk5photo-fallback{display:none}
    .dk5photoframe.dk5photo-error .dk5realpic{display:none!important}
    .dk5photodesc{padding:21px 18px 22px;flex:1}
    .dk5photokicker{color:#f36b54;font:1000 10px Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase}
    .dk5photodesc h3{font:1000 clamp(24px,2.5vw,38px)/.98 Impact,'Arial Black',sans-serif;text-transform:uppercase;margin:11px 0;letter-spacing:-.025em}
    .dk5photodesc p{font:13px/1.6 Arial,sans-serif;color:#c0c5bd;margin:0 0 17px}
    .dk5photoread{color:#efbc5d;font:1000 10px Arial,sans-serif;letter-spacing:.08em}

    /* The new graphics are COMPLETE posters: show the full artwork without cropping or overlays. */
    .dk5graphic-card .dk5poster{display:block;width:100%;height:auto;object-fit:contain;background:#0a0e0c;filter:none}
    .dk5graphic-card .dk5photolink{display:flex;flex-direction:column;align-items:stretch;justify-content:space-between}
    .dk5graphic-card .dk5graphic-read{display:block;padding:13px 17px;color:#efbc5d;background:#0e1612;font:900 11px Arial,sans-serif;letter-spacing:.07em;text-decoration:none;border-top:1px solid #293b32}
    .dk5graphic-card .dk5poster:hover{filter:brightness(1.07)}
    .dk5graphic-card:first-child{grid-column:span 1}
    @media(max-width:960px){.dk5photogrid{grid-template-columns:repeat(2,minmax(0,1fr))}.dk5graphic-card:first-child{grid-column:1/-1}}
    @media(max-width:680px){.dk5photogrid{grid-template-columns:minmax(0,1fr)}.dk5graphic-card:first-child{grid-column:auto}.dk5graphic-card .dk5poster{height:auto;object-fit:contain}}
    .dk5photocredit{border-top:1px solid #2d3930;margin:0;padding:10px 16px 13px;color:#8d9890;font:10px/1.5 Arial,sans-serif}
    .dk5photocredit a{color:#bfcbbf!important;text-decoration:underline;text-underline-offset:2px}
    .dk5photohead .dk5more{color:#efbd5e!important;text-decoration:none!important;font:900 11px Arial,sans-serif;white-space:nowrap}
    .dk5photonote{margin-top:12px;color:#929c92;font:11px/1.55 Arial,sans-serif}
    @media(max-width:960px){.dk5photogrid{grid-template-columns:1fr 1fr}.dk5photocard:first-child{grid-column:1/-1}.dk5photocard:first-child .dk5photoframe{height:360px}}
    @media(max-width:680px){.dk5photohead{display:block}.dk5photohead p{margin-top:8px}.dk5photogrid{grid-template-columns:1fr;gap:14px}.dk5photocard:first-child{grid-column:auto}
      .dk5photocard:first-child .dk5photoframe,.dk5photoframe{height:300px}.dk5photodesc{padding:17px}.dk5photodesc h3{font-size:34px}.dk5photodesk{margin-bottom:28px}}

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
    

    /* 4DK Week 5 polish: one active tab, true swipeable mobile rail. */
    body.nfl-page .nfl-v2-nav {
      display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;
      overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:none;
      scroll-snap-type:x proximity;gap:8px;min-width:0;max-width:100%;
    }
    body.nfl-page .nfl-v2-nav::-webkit-scrollbar{display:none}
    body.nfl-page .nfl-v2-nav a {flex:0 0 auto!important;white-space:nowrap!important;scroll-snap-align:start;padding:12px 16px;min-height:46px;display:inline-flex;align-items:center;justify-content:center}
    /* Belt-and-suspenders in case the older TNF script re-inserts its tab. */
    body.nfl-page .nfl-v2-nav a[href="#w5current"],
    body.nfl-page .nfl-v2-nav a[href="#w5next"]{display:none!important}
    /* Main navigation hamburger: accessible against the dark NFL masthead. */
    body.nfl-page .nfl-masthead #menuBtn {
      color:#f8f4e9!important;-webkit-text-fill-color:#f8f4e9!important;
      opacity:1!important;text-shadow:0 1px 2px #000;
      font-size:29px!important;line-height:1;min-width:44px;min-height:44px;
      background:transparent!important;cursor:pointer;
    }
    body.nfl-page .nfl-masthead #menuBtn:focus-visible {outline:2px solid #f3c45d;outline-offset:4px}
    body.nfl-page .nfl-masthead .mobile-nav.open {background:#101813!important;color:#f8f4e9!important;position:relative;z-index:25}
    body.nfl-page .nfl-masthead .mobile-nav.open a {color:#f8f4e9!important}
    /* Authentic team-logo graphic treatment: editorial design, no synthetic player portraits. */
    body.nfl-page .dk5game{
      position:relative;isolation:isolate;overflow:hidden;
      border:1px solid #465044;box-shadow:inset 0 1px 0 #ffffff0a;
      background:radial-gradient(ellipse at 50% 13%,rgba(236,195,91,.10),transparent 64%),
        radial-gradient(ellipse at 92% 88%,rgba(218,51,43,.10),transparent 50%),linear-gradient(145deg,#182019,#0b0e0c 75%);
      padding:20px;
    }
    body.nfl-page .dk5game::before{
      content:'';position:absolute;inset:0;pointer-events:none;z-index:-1;
      background:repeating-linear-gradient(90deg,transparent 0 62px,#fff1 63px,#fff0 64px);
      opacity:.25;
    }
    body.nfl-page .dk5game::after{
      content:'';position:absolute;top:0;left:0;width:88px;height:4px;background:#e84636;pointer-events:none;
    }
    body.nfl-page .dk5logos{justify-content:center;gap:clamp(15px,3vw,35px);padding:13px 4px;margin:13px 0 15px;
      border-top:1px solid #44493e;border-bottom:1px solid #44493e;
      background:radial-gradient(ellipse at center,#44402d55,transparent 73%)}
    body.nfl-page .dk5logos img{width:clamp(63px,9vw,94px);height:clamp(63px,9vw,94px);object-fit:contain;
      filter:drop-shadow(0 9px 13px #000a)}
    body.nfl-page .dk5logos span{font:1000 11px Arial,sans-serif;letter-spacing:.18em;color:#e5c271}
    body.nfl-page .dk5game:first-child{grid-column:span 2;border-color:#c69356;
      background:radial-gradient(ellipse at 48% 8%,#9f342b36,transparent 55%),linear-gradient(150deg,#251a17,#0d100e 80%)}
    body.nfl-page .dk5game:first-child::after{width:100%;background:linear-gradient(90deg,#de4639,#e8be67)}
    body.nfl-page .dk5game:first-child .dk5logos img{width:clamp(95px,12vw,136px);height:clamp(95px,12vw,136px)}
    body.nfl-page .dk5game:first-child h3{font-size:clamp(30px,4vw,43px)}
    body.nfl-page .dk5game h3{overflow-wrap:break-word}
    body.nfl-page .dk5game small{margin-top:10px}
    /* Thursday's final also gets authentic team art rather than a generic text box. */
    body.nfl-page .dk5tnf-logos{display:flex;align-items:center;gap:16px;margin:14px 0 8px;max-width:370px}
    body.nfl-page .dk5tnf-logos img{width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 7px 11px #000a)}
    body.nfl-page .dk5tnf-logos span{font:1000 12px Arial,sans-serif;color:#d6b467;letter-spacing:.13em}
    @media(max-width:680px){
      body.nfl-page .nfl-v2-nav{width:100%!important;max-width:none!important;margin:0!important;
        padding:10px 13px!important;scroll-padding-inline:13px}
      body.nfl-page .nfl-v2-nav a{font-size:11px;padding:11px 14px;min-height:44px}
      body.nfl-page .dk5game:first-child{grid-column:auto}
      body.nfl-page .dk5logos img{width:82px;height:82px}
      body.nfl-page .dk5game:first-child .dk5logos img{width:106px;height:106px}
      body.nfl-page .dk5game{padding:17px}
    }

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
      <span class="dk5eyebrow">4 DA KULTURE • NFL WEEK 5 • OCTOBER 11, 2026</span>
      <h1 class="dk5title">SUNDAY GOT WILD.<br><em>ONE GAME LEFT.</em></h1>
      <p class="dk5deck">Thirteen Sunday games. Baltimore steals the Sunday night finale 30–23 in overtime. The 49ers survive Seattle 32–29 to reach 5–0, Minnesota stays unbeaten, and Jacksonville wins a London thriller. Bills–Rams is still waiting on Monday.</p>
      <div class="dk5actions"><a href="nfl-sunday-recap-week5.html">FULL SUNDAY RECAP →</a><a href="nfl-sunday-recaps.html">SUNDAY ARCHIVE →</a><a href="#dk5rankings">MVP + ROOKIE WATCH →</a><a href="#scoreboard">LIVE SCOREBOARD →</a><a href="nfl-week5-standings-2026.html">WEEK 5 STANDINGS →</a><a href="nfl-season-archive-2026.html">SEASON ARCHIVE →</a></div>
      <div class="dk5strap"><article class="dk5lead"><span class="dk5micro">SUNDAY NIGHT • FINAL / OT</span><div class="dk5tnf-logos"><img src="${logo('bal')}" alt="Baltimore Ravens official team logo" loading="lazy"><span>OT FINAL</span><img src="${logo('atl')}" alt="Atlanta Falcons official team logo" loading="lazy"></div><span class="dk5score">BALTIMORE 30 <span style="color:#f1be5d">–</span> ATLANTA 23 (OT)</span><h2>BALTIMORE STOLE THE NIGHT.</h2><p>Tyler Huntley engineers the tying touchdown and two-point conversion, then scores the overtime winner. Atlanta led 23–15 late but fell to 2–3 after a chaotic finish.</p><a href="nfl-sunday-recap-week5.html#game-01">READ THE SUNDAY NIGHT BREAKDOWN →</a></article>
      <aside class="dk5aside"><span class="dk5micro">WEEK 5 • SUNDAY FINAL</span><h3>TWO TEAMS<br>AT 5–0.<br>MNF AWAITS.</h3><p>San Francisco beats Seattle 32–29, Minnesota handles New Orleans 23–13, and Jacksonville jolts Philadelphia in London. Penix leaves the Falcons game with a rib injury; follow team updates for his status.</p><p class="dk5time">13 Sunday games completed • Monday still pending</p><a href="nfl-sunday-recap-week5.html">ALL 13 GAME RECAPS →</a></aside></div>
    </div></div><div class="dk5body dk5wrap"><section class="dk5photodesk" id="dk5-photo-desk" aria-label="4DK NFL Week 5 feature graphics">
  <div class="dk5photohead"><div><span class="dk5micro">4 DA KULTURE • NFL FEATURE DESK</span><h2>THE WEEK 5 <em>SPOTLIGHT.</em></h2></div><p>The original pregame magazine covers are preserved; tap through for updated Sunday-final analysis.</p></div>
  <div class="dk5photogrid">
    <article class="dk5photocard dk5graphic-card"><a class="dk5photolink" href="nfl-sunday-recap-week5.html#game-02" aria-label="Open the 4DK 49ers–Seahawks Week 5 final recap"><img class="dk5poster" src="the_west_is_on_the_line.png?v=20261010-feature-v5" alt="4DK NFL Week 5: The West Is on the Line. A San Francisco 49ers quarterback graphic for the NFC West matchup." loading="lazy" decoding="async"><span class="dk5graphic-read">READ THE 4DK STORY →</span></a></article>
    <article class="dk5photocard dk5graphic-card"><a class="dk5photolink" href="nfl-sunday-recap-week5.html#game-01" aria-label="Open the 4DK Ravens–Falcons Sunday Night overtime recap"><img class="dk5poster" src="falcons_sunday_night_feature_card.png?v=20261010-feature-v5" alt="4DK NFL Week 5: Atlanta Runs Through Bijan. Sunday Night matchup feature graphic." loading="lazy" decoding="async"><span class="dk5graphic-read">READ THE 4DK STORY →</span></a></article>
    <article class="dk5photocard dk5graphic-card"><a class="dk5photolink" href="nfl-week-4-sunday-night-update-2026.html#mvp" aria-label="Open 4DK MVP Watch: Who Owns the League? Kansas City Chiefs MVP race feature graphic"><img class="dk5poster" src="who_owns_the_league.png?v=20261010-feature-v5" alt="4DK MVP Watch: Who Owns the League? Kansas City Chiefs MVP race feature graphic." loading="lazy" decoding="async"><span class="dk5graphic-read">READ THE 4DK STORY →</span></a></article>
  </div>
</section><div class="dk5head"><div><span class="dk5micro">WEEK 5 • ALL GAMES FINAL</span><h2>THE WEEK 5 BOARD.</h2></div><p>The full Week 5 slate is complete. Buffalo wins Monday’s overtime thriller, while the 49ers and Vikings remain undefeated. Read the Sunday and Monday recaps.</p></div>
      <div class="dk5games">${matchupCards.map(card).join('')}</div>
      <div class="dk5boards" id="dk5rankings"><div class="dk5board"><span class="dk5micro">4DK MVP WATCH • POST-WEEK 5 TOP FIVE</span><h3>THE TOP OF THE RACE</h3>${mvp.map(p=>`<div class="dk5row"><b>${p[0]}</b><div><strong>${p[1]}</strong><small>${p[2]} • ${p[3]}</small></div></div>`).join('')}<a href="nfl-week-4-sunday-night-update-2026.html#mvp">FULL TOP 10 MVP BOARD →</a></div>
      <div class="dk5board"><span class="dk5micro">4DK ROOKIE WATCH • WEEK 4 VERIFIED BASELINE</span><h3>THE NEW NAMES TO KNOW</h3>${rookies.map(p=>`<div class="dk5row"><b>${p[0]}</b><div><strong>${p[1]}</strong><small>${p[2]} • previous ranking; Week 5 review pending</small></div></div>`).join('')}<a href="nfl-week-4-sunday-night-update-2026.html#rookies">FULL TOP 10 ROOKIE BOARD →</a></div></div>
      <div class="dk5tip"><b>4DK's editorial rule:</b> Sunday coverage moves to the front while every preview stays in the archive. MVP Watch reflects our post-Week 5 editorial top five. Rookie Watch is explicitly retained as the Week 4 baseline until individual Week 5 rookie performances are checked. The previous full Top 10 boards remain archived. Full 1–32 <a style="color:#f4c461" href="nfl-power-rankings-week4-2026.html">Power Rankings entering Week 5</a>, <a style="color:#f4c461" href="nfl-week5-standings-2026.html">Week 5 final standings</a> and <a style="color:#f4c461" href="nfl-season-archive-2026.html">all archived recaps</a> remain available.</div>
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
      details.innerHTML=`<summary><b>SEASON ARCHIVE • WEEKS 1–5</b><span>OPEN / CLOSE ▾</span></summary>
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
      setTimeout(()=>{pending=false;archive();navEnhance();},240);
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.__dk5ArchiveObserver=observer;
  }

  function navEnhance(){
    const nav=document.querySelector('.nfl-v2-nav');
    if(!nav) return;
    let primary=nav.querySelector('a[href="#dk5current"]');
    if(!primary){
      primary=document.createElement('a');
      primary.href='#dk5current';
      primary.className='active';
      nav.prepend(primary);
    }
    if(primary.textContent!=='WEEK 5') primary.textContent='WEEK 5';
    primary.classList.add('active');
    if(nav.firstElementChild!==primary) nav.prepend(primary);
    // Two earlier 4DK scripts were creating separate Week 5 tabs.
    // Remove only the duplicate navigation links, never content or archives.
    nav.querySelectorAll('a').forEach(a=>{
      if(a===primary) return;
      const href=a.getAttribute('href')||'';
      const label=(a.textContent||'').trim().replace(/\s+/g,' ');
      if(href==='#w5current'||href==='#w5next'||
         (/^week\s*5(?:\s*current)?$/i.test(label) && href[0]==='#')) {
        a.remove();
      }
    });
    // Keep every remaining navigation tab horizontally scrollable on mobile.
    if(!nav.querySelector('a[href="#dk5-photo-desk"]')){
      const a=document.createElement('a');a.href='#dk5-photo-desk';a.textContent='PHOTO DESK';
      const current=nav.querySelector('a[href="#dk5current"]');
      if(current)current.insertAdjacentElement('afterend',a);else nav.prepend(a);
    }
    if(!nav.querySelector('a[href="#nfl-season-archive"]')){
      const a=document.createElement('a');
      a.href='#nfl-season-archive';
      a.textContent='ARCHIVES';
      nav.append(a);
    }
    nav.setAttribute('aria-label','NFL sections — swipe horizontally to see more');
  }

  function run(){styles();render();document.querySelectorAll('#dk5-photo-desk img.dk5realpic').forEach(img=>{if(img.dataset.fallbackWired)return;img.dataset.fallbackWired='1';img.addEventListener('error',()=>img.closest('.dk5photoframe')?.classList.add('dk5photo-error'));});archive();navEnhance();watchLateInsertions();if(location.hash==='#nfl-season-archive')document.getElementById('nfl-season-archive').open=true;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  [600,1800,4000,8500,13000].forEach(ms=>setTimeout(run,ms));
})();
