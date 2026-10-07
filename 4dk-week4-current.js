(()=> {
  const p=(location.pathname||'').toLowerCase();
  if(!p.endsWith('/nfl.html') && !p.endsWith('/nfl')) return;
  if(window.__fourdkWeek4FinalNFL) return;
  window.__fourdkWeek4FinalNFL=true;

  const stories=[
    ['MNF','BIJAN RUNS NEW ORLEANS OUT THE BUILDING','145 yards, two touchdowns and a 45–24 Atlanta win.','nfl-week-4-sunday-night-update-2026.html'],
    ['#1','49ERS STAY ON TOP','San Francisco is 4–0 and keeps winning clean.','nfl-power-rankings-week4-2026.html'],
    ['MVP','PURDY HOLDS NO. 1','Mahomes and Kenneth Walker stay close; Bijan jumps into the top four.','nfl-week-4-sunday-night-update-2026.html#mvp'],
    ['RECEIPTS','CHECK THE PREDICTIONS','Every preseason call vs. four weeks of actual production.','nfl-prediction-checkpoint-week4-2026.html'],
    ['W5','49ERS AT SEAHAWKS','The No. 1 team gets a 3–1 division rival on the road.','nfl-week5-preview-2026.html'],
    ['SNF','RAVENS AT FALCONS','Atlanta’s two-game surge gets a real Baltimore measuring stick.','nfl-week5-preview-2026.html'],
    ['MNF','BILLS AT RAMS','Buffalo needs a response; the Rams just stole one in Philadelphia.','nfl-week5-preview-2026.html'],
    ['BYE','KC + CAR REST','The 4–0 Chiefs and 2–2 Panthers sit Week 5 out.','nfl-week5-preview-2026.html']
  ];

  function css(){
    if(document.getElementById('fourdk-week4-final-nfl-css')) return;
    const s=document.createElement('style');s.id='fourdk-week4-final-nfl-css';s.textContent=`
      #mvp-watch,#power-rankings,#rookie-watch,.fourdk-live-board,.fourdk-mnf-headline,#week2-current,.w3rookies,#w4m-rank,#w4m-mvp,#w4m-rook{display:none!important}
      .w4f{padding:42px 0;background:#080b09;color:#f6f2e8;border-bottom:1px solid #293029}.w4f .shell{width:min(1180px,calc(100% - 32px));margin:auto}.w4fk{color:#ef5b35;font:1000 10px Arial;letter-spacing:.15em}.w4f h2{margin:7px 0 12px;font:1000 clamp(38px,7vw,72px)/.87 Arial Black,Impact,sans-serif;letter-spacing:-.05em;text-transform:uppercase}.w4f h2 em{font-style:normal;color:#f0bd54}.w4fp{max-width:860px;color:#a5aba5;line-height:1.6}.w4f-btn{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}.w4f-btn a{padding:12px 14px;border:1px solid #394039;color:#fff!important;text-decoration:none!important;font:900 9px Arial}.w4f-btn a:first-child{background:#d9561d;border-color:#d9561d}.w4f-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.w4f-card{min-height:170px;padding:15px;border:1px solid #303730;background:#101511;color:#fff!important;text-decoration:none!important;display:flex;flex-direction:column}.w4f-card small{color:#ef6650;font:1000 9px Arial}.w4f-card b{display:block;margin:8px 0;font:1000 18px/1 Arial Black,Impact,sans-serif}.w4f-card span{margin-top:auto;color:#a1a7a1;font:12px/1.45 Arial}
      @media(max-width:900px){.w4f-grid{grid-template-columns:1fr 1fr}}@media(max-width:760px){.w4f-grid{grid-template-columns:1fr}.nfl-v2-hero .nfl-v2-copy h1{font-size:clamp(46px,15vw,62px)!important;line-height:.84!important}}
    `;document.head.appendChild(s);
  }

  function section(id,after){let s=document.getElementById(id);if(!s){s=document.createElement('section');s.id=id;s.className='w4f';after?.insertAdjacentElement('afterend',s)}return s}
  function cleanup(){['w4m-current','w4m-stories','w4m-rank','w4m-mvp','w4m-rook','w4current','w4tnf','w4redzone','w4rank','w4mvp','w4rook','w4archive'].forEach(id=>document.getElementById(id)?.remove())}

  function run(){
    css();cleanup();
    const hero=document.querySelector('.nfl-v2-hero .nfl-v2-copy');
    if(hero)hero.innerHTML=`<div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 4 FINAL • WEEK 5 NEXT</div><h1>THE FIRST MONTH<br><em>IS IN THE BOOKS.</em></h1><p class="nfl-v2-deck">Atlanta closed Week 4 by running New Orleans out of the building. The 49ers, Chiefs and Vikings are 4–0. The full 1–32 ranking is locked. Week 5 starts Thursday.</p><div class="nfl-v2-actions"><a class="nfl-v2-primary" href="nfl-week-4-sunday-night-update-2026.html">WEEK 4 FINAL</a><a class="nfl-v2-secondary" href="nfl-prediction-checkpoint-week4-2026.html">CHECK THE RECEIPTS</a></div>`;

    const board=document.querySelector('.nfl-v2-board');
    if(board)board.innerHTML=`<div class="nfl-v2-board-top"><span>THE 4DK BOARD</span><strong>WEEK 4 FINAL</strong></div>
      <a class="nfl-v2-board-row live" href="nfl-week-4-sunday-night-update-2026.html"><div><small>ALL 16 GAMES</small><b>WEEK 4 FINAL PACKAGE</b></div><span>READ →</span></a>
      <a class="nfl-v2-board-row" href="nfl-power-rankings-week4-2026.html"><div><small>POWER RANKINGS</small><b>FULL 1–32 BOARD</b></div><span>OPEN →</span></a>
      <a class="nfl-v2-board-row" href="nfl-week-4-sunday-night-update-2026.html#mvp"><div><small>MVP WATCH</small><b>PURDY HOLDS #1</b></div><span>VIEW →</span></a>
      <a class="nfl-v2-board-row" href="nfl-week-4-sunday-night-update-2026.html#rookies"><div><small>ROOKIE WATCH</small><b>WEEK 4 FINAL</b></div><span>VIEW →</span></a>
      <a class="nfl-v2-board-row live" href="nfl-prediction-checkpoint-week4-2026.html"><div><small>NEW • PREDICTION CHECKPOINT</small><b>CHECK THE RECEIPTS</b></div><span>READ →</span></a>
      <a class="nfl-v2-board-row live" href="nfl-week5-preview-2026.html"><div><small>NEXT</small><b>WEEK 5 EARLY LOOK</b></div><span>OPEN →</span></a>
      <div class="nfl-v2-board-foot">ORIGINAL PICKS STAY LIVE. THE CHECKPOINT SHOWS WHAT CHANGED.</div>`;

    const ticker=document.querySelector('.nfl-ticker-track');
    if(ticker)ticker.innerHTML=['WEEK 4 FINAL: ATLANTA 45, NEW ORLEANS 24','NEW: 4DK PREDICTION CHECKPOINT — CHECK THE RECEIPTS','49ERS #1 • FULL 1–32 LIVE','PURDY #1 MVP WATCH','WEEK 5: 49ERS AT SEAHAWKS','SNF: RAVENS AT FALCONS','MNF: BILLS AT RAMS'].map(x=>`<span><b>●</b> ${x}</span>`).join('');

    const nav=document.querySelector('.nfl-v2-nav');
    if(nav)nav.innerHTML=`<a class="active" href="#w4final">Week 4 Final</a><a href="#scoreboard">Scores</a><a href="nfl-prediction-checkpoint-week4-2026.html">Prediction Check</a><a href="#w5next">Week 5</a><a href="nfl-power-rankings-week4-2026.html">Rankings</a><a href="nfl-week-4-sunday-night-update-2026.html#mvp">MVP</a><a href="nfl-week-4-sunday-night-update-2026.html#rookies">Rookies</a><a href="nfl-sunday-recaps.html">Sunday Recaps</a><a href="nfl-week3-hub-2026.html">Archives</a>`;

    const anchor=nav||document.getElementById('scoreboard');
    const final=section('w4final',anchor);final.innerHTML=`<div class="shell"><span class="w4fk">WEEK 4 IS FINAL</span><h2>BIJAN CLOSED IT.<br><em>THE BOARD IS LOCKED.</em></h2><p class="w4fp">Atlanta ran for 205 yards and five touchdowns in New Orleans. Penix played clean football. Shough piled up late volume in a game the Saints never controlled. Week 4 is complete.</p><div class="w4f-btn"><a href="nfl-week-4-sunday-night-update-2026.html">FULL WEEK 4 FINAL →</a><a href="nfl-prediction-checkpoint-week4-2026.html">CHECK THE RECEIPTS →</a><a href="nfl-power-rankings-week4-2026.html">FULL 1–32 POWER RANKINGS →</a><a href="nfl-sunday-recaps.html">SUNDAY ARCHIVE →</a></div><div class="w4f-grid">${stories.slice(0,4).map(x=>`<a class="w4f-card" href="${x[3]}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></a>`).join('')}</div></div>`;

    const next=section('w5next',final);next.innerHTML=`<div class="shell"><span class="w4fk">WEEK 5 STARTS THURSDAY</span><h2>THE NEXT TESTS<br><em>ARE READY.</em></h2><p class="w4fp">49ers–Seahawks is our game of the week. Atlanta gets Baltimore on Sunday night. Buffalo has to answer in Los Angeles on Monday. Kansas City and Carolina are on bye.</p><div class="w4f-btn"><a href="nfl-week5-preview-2026.html">OPEN WEEK 5 EARLY LOOK →</a></div><div class="w4f-grid">${stories.slice(4).map(x=>`<a class="w4f-card" href="${x[3]}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></a>`).join('')}</div></div>`;
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  [100,350,800,1500,3000,5500,9000].forEach(ms=>setTimeout(run,ms));
  let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;setTimeout(()=>{run();busy=false},90)}).observe(document.documentElement,{childList:true,subtree:true});
})();