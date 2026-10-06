(()=> {
  const p=(location.pathname||'').toLowerCase();
  if(!p.endsWith('/nfl.html') && !p.endsWith('/nfl')) return;
  if(window.__fourdkWeek4MondayNFL) return;
  window.__fourdkWeek4MondayNFL=true;

  const ranks=[
    ['San Francisco 49ers','4–0','Cleanest all-around résumé. Purdy remains efficient and the defense keeps closing.'],
    ['Kansas City Chiefs','4–0','Still perfect, and Kenneth Walker gives Mahomes a new way to win.'],
    ['Minnesota Vikings','4–0','Won without an offensive touchdown. That kind of floor matters.'],
    ['Baltimore Ravens','3–1','Efficient Lamar plus a defense that can dictate games.'],
    ['Seattle Seahawks','3–1','Three wins and another turnover-driven victory.'],
    ['Las Vegas Raiders','3–1','The first loss came by three to 4–0 Kansas City. Their stock does not crash.'],
    ['Buffalo Bills','3–1','The Patriots exposed late-game vulnerability, but the ceiling remains contender level.'],
    ['Jacksonville Jaguars','3–1','Lawrence is playing clean football and Jacksonville keeps winning leverage downs.'],
    ['Chicago Bears','3–1','A physical identity is forming behind the run game and possession control.'],
    ['Cleveland Browns','3–1','Three wins through four and another clutch finish.']
  ];

  const mvp=[
    ['Brock Purdy','SF • QB • 4–0','1,007 PASS YDS • 11 TD • 1 INT • 126.2 RATE'],
    ['Patrick Mahomes','KC • QB • 4–0','1,037 PASS YDS • 9 TD • 2 INT'],
    ['Kenneth Walker III','KC • RB','537 RUSH YDS • 4 TD • W4: 177 YDS, 2 TD'],
    ['Jared Goff','DET • QB','1,214 PASS YDS • 9 TD • 0 INT'],
    ['Bryce Young','CAR • QB','NFL-HIGH 1,268 PASS YDS • 9 TD • 2 INT'],
    ['Kirk Cousins','LV • QB','1,026 PASS YDS • 11 TD • 4 INT'],
    ['Lamar Jackson','BAL • QB','967 PASS YDS • 6 TD • 1 INT'],
    ['Josh Allen','BUF • QB','1,039 PASS YDS • 6 PASS TD • 3 INT'],
    ['Dak Prescott','DAL • QB','1,065 PASS YDS • 8 TD • 1 INT'],
    ['Trevor Lawrence','JAX • QB • 3–1','8 PASS TD • 2 INT']
  ];

  const rook=[
    ['Jacob Rodriguez','MIA • LB','46 COMBINED TACKLES'],
    ['Anthony Hill Jr.','TEN • LB','42 COMBINED TACKLES'],
    ['Denzel Boston','CLE • WR','13 REC • 284 YDS • 2 TD'],
    ['Hezekiah Masses','LV • CB','3 INT • TIED FOR NFL LEAD'],
    ['Carnell Tate','TEN • WR','W4: 9 REC • 145 YDS'],
    ['Arvell Reese','NYG • LB','W4: 9 SOLO • 1 INT • 3 PDEF'],
    ['Jeremiyah Love','ARI • RB','223 RUSH YDS • 2 TOTAL TD'],
    ['Caleb Downs','DAL • S','19 TKL • 1 SACK • 2 FF THROUGH W3'],
    ['Sonny Styles','WAS • LB','1 SACK • 1 INT • 1 FF THROUGH W3'],
    ['Athan Kaliakmanis','WAS • QB','W4: 186 PASS YDS • 1 TD • 1 INT']
  ];

  const stories=[
    ['#1','49ERS HOLD THE TOP SPOT','San Francisco is 4–0 and still the cleanest team on the board.','nfl-week-4-sunday-night-update-2026.html#power'],
    ['4–0','CHIEFS ADD A RUNNING-GAME HAMMER','Kenneth Walker ran for 177 yards and two TDs against Vegas.','nfl-week-4-sunday-night-update-2026.html'],
    ['4–0','MINNESOTA KEEPS FINDING WAYS','The Vikings won without an offensive touchdown.','nfl-week-4-sunday-night-update-2026.html#power'],
    ['3–1','RAIDERS LOSE WITHOUT FALLING OFF','Vegas pushed KC to the final seconds and still looks real.','nfl-week-4-sunday-night-update-2026.html'],
    ['SNF','CAROLINA OFFENSE ARRIVES','Bryce Young and Tetairoa McMillan lit up Detroit.','nfl-week-4-sunday-night-update-2026.html'],
    ['3–1','BUFFALO TAKES ITS FIRST HIT','New England exposed late-game vulnerability in Buffalo.','nfl-week-4-sunday-night-update-2026.html'],
    ['0–4','CHARGERS ARE IN EMERGENCY MODE','Turnovers and penalties keep burying a talented roster.','nfl-week-4-sunday-night-update-2026.html'],
    ['MNF','FALCONS–SAINTS CLOSES WEEK 4','Follow the live score from the 4DK game center.','#scoreboard']
  ];

  function css(){
    if(document.getElementById('fourdk-week4-monday-nfl-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-week4-monday-nfl-css';
    s.textContent=`
      #mvp-watch,#power-rankings,#rookie-watch,.fourdk-live-board,.fourdk-mnf-headline,#week2-current,.w3rookies{display:none!important}
      .w4m{padding:42px 0;background:#080b09;color:#f6f2e8;border-bottom:1px solid #293029}
      .w4m .shell{width:min(1180px,calc(100% - 32px));margin:auto}
      .w4mk{color:#ef5b35;font:1000 10px Arial;letter-spacing:.15em;text-transform:uppercase}
      .w4m h2{margin:7px 0 12px;font:1000 clamp(38px,7vw,72px)/.87 Arial Black,Impact,sans-serif;letter-spacing:-.05em;text-transform:uppercase}
      .w4m h2 em{font-style:normal;color:#f0bd54}
      .w4mp{max-width:860px;color:#a5aba5;line-height:1.6}
      .w4m-btn{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}
      .w4m-btn a{padding:12px 14px;border:1px solid #394039;color:#fff!important;text-decoration:none!important;font:900 9px Arial}
      .w4m-btn a:first-child{background:#d9561d;border-color:#d9561d}
      .w4m-story-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .w4m-story{min-height:170px;padding:15px;border:1px solid #303730;background:#101511;color:#fff!important;text-decoration:none!important;display:flex;flex-direction:column}
      .w4m-story small{color:#ef6650;font:1000 9px Arial;letter-spacing:.1em}
      .w4m-story b{display:block;margin:8px 0;font:1000 18px/1 Arial Black,Impact,sans-serif}
      .w4m-story span{margin-top:auto;color:#a1a7a1;font:12px/1.45 Arial}
      .w4m-list{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .w4m-row{display:grid;grid-template-columns:48px 1fr;gap:12px;padding:14px;background:#101511;border:1px solid #303730}
      .w4m-num{font:1000 28px Arial;color:#747d75}
      .w4m-row h3{margin:0;font:1000 17px Arial}
      .w4m-row small{display:block;color:#ef6650;margin:4px 0;font:900 9px Arial}
      .w4m-row b{display:block;color:#e4b65c;font:900 9px Arial}
      .w4m-row p{margin:6px 0 0;color:#a1a7a1;font:12px/1.45 Arial}
      @media(max-width:900px){.w4m-story-grid{grid-template-columns:1fr 1fr}}
      @media(max-width:760px){.w4m-story-grid,.w4m-list{grid-template-columns:1fr}.nfl-v2-hero .nfl-v2-copy h1{font-size:clamp(46px,15vw,62px)!important;line-height:.84!important}}
    `;
    document.head.appendChild(s);
  }

  function section(id,after){
    let s=document.getElementById(id);
    if(!s){s=document.createElement('section');s.id=id;s.className='w4m';after?.insertAdjacentElement('afterend',s)}
    return s;
  }

  function run(){
    css();

    const hero=document.querySelector('.nfl-v2-hero .nfl-v2-copy');
    if(hero) hero.innerHTML=`
      <div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 4 • MONDAY NIGHT</div>
      <h1>THE LEAGUE IS<br><em>STARTING TO SHOW ITS HAND.</em></h1>
      <p class="nfl-v2-deck">San Francisco, Kansas City and Minnesota are 4–0. Carolina just lit up Detroit. Vegas took its first loss without losing our respect. Buffalo got clipped at home. The Chargers are 0–4. Falcons–Saints closes the week tonight.</p>
      <div class="nfl-v2-actions"><a class="nfl-v2-primary" href="nfl-week-4-sunday-night-update-2026.html">FULL WEEK 4 UPDATE</a><a class="nfl-v2-secondary" href="#scoreboard">FOLLOW MNF LIVE</a></div>`;

    const board=document.querySelector('.nfl-v2-board');
    if(board) board.innerHTML=`
      <div class="nfl-v2-board-top"><span>THE 4DK BOARD</span><strong>WEEK 4</strong></div>
      <a class="nfl-v2-board-row live" href="nfl-week-4-sunday-night-update-2026.html"><div><small>THROUGH SUNDAY</small><b>FULL WEEK 4 UPDATE</b></div><span>READ →</span></a>
      <a class="nfl-v2-board-row live" href="nfl-week-4-sunday-night-update-2026.html#power"><div><small>POWER RANKINGS</small><b>49ERS HOLD #1</b></div><span>TOP 10 →</span></a>
      <a class="nfl-v2-board-row" href="nfl-week-4-sunday-night-update-2026.html#mvp"><div><small>MVP WATCH</small><b>PURDY LEADS THE RACE</b></div><span>VIEW →</span></a>
      <a class="nfl-v2-board-row" href="nfl-week-4-sunday-night-update-2026.html#rookies"><div><small>ROOKIE WATCH</small><b>WEEK 4 BOARD</b></div><span>VIEW →</span></a>
      <a class="nfl-v2-board-row live" href="#scoreboard"><div><small>MONDAY NIGHT</small><b>FALCONS AT SAINTS • LIVE</b></div><span>OPEN →</span></a>
      <div class="nfl-v2-board-foot">SUNDAY IS LOCKED. MONDAY CLOSES THE WEEK.</div>`;

    const ticker=document.querySelector('.nfl-ticker-track');
    if(ticker) ticker.innerHTML=['49ERS 4–0 • 4DK #1','CHIEFS 4–0 • WALKER LEADS NFL IN RUSHING','VIKINGS 4–0','RAIDERS 3–1 • STILL REAL','PANTHERS 32, LIONS 26','BILLS FALL TO 3–1','CHARGERS 0–4','MNF LIVE: FALCONS AT SAINTS'].map(x=>`<span><b>●</b> ${x}</span>`).join('');

    const nav=document.querySelector('.nfl-v2-nav');
    if(nav) nav.innerHTML=`<a class="active" href="#w4m-current">Week 4</a><a href="#scoreboard">Scores</a><a href="#w4m-stories">Storylines</a><a href="#w4m-rank">Rankings</a><a href="#w4m-mvp">MVP</a><a href="#w4m-rook">Rookies</a><a href="nfl-week3-hub-2026.html">Week 3 Archive</a>`;

    const anchor=nav||document.getElementById('scoreboard');
    const cur=section('w4m-current',anchor);
    cur.innerHTML=`<div class="shell"><span class="w4mk">4DK NFL • CURRENT WEEK</span><h2>WEEK 4 <em>HAS SHAPE.</em></h2><p class="w4mp">Sunday is complete. Three teams are 4–0. San Francisco remains our No. 1. Kenneth Walker leads the league in rushing. Carolina found a real offensive identity. Buffalo took its first loss. The Chargers are winless. Monday night closes it.</p><div class="w4m-btn"><a href="nfl-week-4-sunday-night-update-2026.html">FULL WEEK 4 UPDATE →</a><a href="#scoreboard">MNF LIVE SCOREBOARD →</a><a href="nfl-week3-hub-2026.html">WEEK 3 ARCHIVE →</a></div></div>`;

    const st=section('w4m-stories',cur);
    st.innerHTML=`<div class="shell"><span class="w4mk">8 STORIES SHAPING THE BOARD</span><h2>WHAT MATTERS <em>RIGHT NOW.</em></h2><div class="w4m-story-grid">${stories.map(x=>`<a class="w4m-story" href="${x[3]}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></a>`).join('')}</div></div>`;

    const rk=section('w4m-rank',st);
    rk.innerHTML=`<div class="shell"><span class="w4mk">4DK POWER RANKINGS • THROUGH SUNDAY</span><h2>THE TOP 10.</h2><div class="w4m-list">${ranks.map((x,i)=>`<div class="w4m-row"><div class="w4m-num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small><p>${x[2]}</p></div></div>`).join('')}</div></div>`;

    const mv=section('w4m-mvp',rk);
    mv.innerHTML=`<div class="shell"><span class="w4mk">4DK MVP WATCH • THROUGH SUNDAY</span><h2>THE RACE.</h2><div class="w4m-list">${mvp.map((x,i)=>`<div class="w4m-row"><div class="w4m-num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small><b>${x[2]}</b></div></div>`).join('')}</div></div>`;

    const ro=section('w4m-rook',mv);
    ro.innerHTML=`<div class="shell"><span class="w4mk">2026 DRAFT CLASS ONLY</span><h2>ROOKIE WATCH.</h2><div class="w4m-list">${rook.map((x,i)=>`<div class="w4m-row"><div class="w4m-num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small><b>${x[2]}</b></div></div>`).join('')}</div></div>`;
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  [100,350,800,1500,3000,5500,9000].forEach(ms=>setTimeout(run,ms));
  let busy=false;
  new MutationObserver(()=>{if(busy)return;busy=true;setTimeout(()=>{run();busy=false},90)}).observe(document.documentElement,{childList:true,subtree:true});
})();