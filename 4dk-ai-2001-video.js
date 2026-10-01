/* 4DK Answer Files 004 video + Week 4 NFL landing-page current layer */
(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isAI2001=path.endsWith('/the-answer-files-004-it-was-his-time.html');
  if(!isAI2001 || window.__fourdkAI2001Video) return;
  window.__fourdkAI2001Video=true;
  const VIDEO_ID='zgkSkPRRtJQ';

  function addStyles(){
    if(document.getElementById('fourdk-story-video-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-story-video-styles';
    style.textContent=`
      .fourdk-story-video{margin:34px 0;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-top:4px solid #d7a92e;background:#0a0f18;box-shadow:0 18px 45px rgba(0,0,0,.22)}
      .fourdk-story-video-head{padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.12);background:linear-gradient(90deg,rgba(215,169,46,.12),rgba(35,78,145,.09),transparent)}
      .fourdk-story-video-head small{display:block;color:#e8bd4a;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-story-video-head b{display:block;margin-top:6px;color:#fff;font:1000 clamp(22px,3.6vw,34px)/.96 Arial Black,Impact,sans-serif;letter-spacing:-.035em;text-transform:uppercase}
      .fourdk-story-video-embed{position:relative;width:100%;aspect-ratio:16/9;background:#000}.fourdk-story-video-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
      .fourdk-story-video-caption{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:12px 16px;color:#9da8b8;font-size:9px;line-height:1.45}.fourdk-story-video-caption a{color:#e8bd4a!important;text-decoration:none!important;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
      @media(max-width:560px){.fourdk-story-video{margin:28px 0}.fourdk-story-video-caption{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

  function install(){
    if(document.querySelector(`iframe[src*="${VIDEO_ID}"]`)) return true;
    const article=document.querySelector('.a4-copy'); if(!article) return false;
    const headings=[...article.querySelectorAll('h2')];
    const allStarHeading=headings.find(h=>/05\./.test(h.textContent||'') && /ALL-STAR GAME/i.test(h.textContent||''));
    const block=document.createElement('section');
    block.className='fourdk-story-video';
    block.setAttribute('aria-label','4DK Watch the Tape: Allen Iverson 2000-01 season highlights');
    block.innerHTML=`<div class="fourdk-story-video-head"><small>4DK WATCH THE TAPE • 2000–01 MVP SEASON</small><b>ALLEN IVERSON • IT WAS HIS TIME.</b></div><div class="fourdk-story-video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}" title="Allen Iverson 2000-01 season highlights" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="fourdk-story-video-caption"><span>Watch the 2000–01 tape after the scoring, sleeve and MVP-era setup — then continue into the All-Star Game and full 4DK breakdown.</span><a href="https://youtu.be/${VIDEO_ID}" target="_blank" rel="noopener">YouTube →</a></div>`;
    if(allStarHeading) allStarHeading.insertAdjacentElement('beforebegin',block);
    else { const openingPull=article.querySelector('.a4-pull'); if(openingPull) openingPull.insertAdjacentElement('afterend',block); else article.prepend(block); }
    return true;
  }

  addStyles();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
  [300,800,1500,2800].forEach(ms=>setTimeout(install,ms));
})();

/* ---------- 4DK NFL — WEEK 4 CURRENT LAYER ---------- */
(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkNFLWeek4Current) return;
  window.__fourdkNFLWeek4Current=true;
  let repairTimer=0;

  const topFive=[
    ['1','San Francisco 49ers','3–0','The standard through three weeks. Purdy is rolling and the health question remains the only real cloud.'],
    ['2','Buffalo Bills','3–0','Buffalo survived five turnovers in Week 3 and still found a way to win.'],
    ['3','Kansas City Chiefs','3–0','More balanced than a year ago, still unbeaten, still built around Mahomes in the biggest moments.'],
    ['4','Minnesota Vikings','3–0','Three weeks is enough to take the defense and the unbeaten start seriously.'],
    ['5','Las Vegas Raiders','3–0','The early surprise is now a real story. Kansas City is the measuring stick.']
  ];

  const rookieFive=[
    ['1','Jeremiyah Love','ARI • RB','90 rush yards plus five catches and a receiving TD in Week 3.'],
    ['2','Kenyon Sadiq','NYJ • TE','Seven catches, 105 yards and his first receiving TD in Week 3.'],
    ['3','Hezekiah Masses','LV • CB','Three interceptions through three games.'],
    ['4','Jaishawn Barham','DAL • LB','Seven tackles, two TFL and a goal-line stop on Derrick Henry in Week 3.'],
    ['5','Genesis Smith','LAC • S','Two interceptions of Josh Allen pushed him onto the board.']
  ];

  function addStyles(){
    if(document.getElementById('fourdk-nfl-week4-current-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-nfl-week4-current-css';
    s.textContent=`
      .fourdk-w4desk{position:relative;overflow:hidden;padding:38px 0 44px;background:#080b09;color:#f6f2e8;border-top:1px solid #29312a;border-bottom:1px solid #29312a}
      .fourdk-w4desk:after{content:'W4';position:absolute;right:-12px;bottom:-50px;font:1000 clamp(120px,20vw,250px)/.8 Arial Black,Impact,sans-serif;color:#fff;opacity:.025;pointer-events:none}
      .fourdk-w4inner{position:relative;z-index:2;width:min(1180px,calc(100% - 34px));margin:auto}
      .fourdk-w4head{display:grid;grid-template-columns:1.3fr .7fr;gap:26px;align-items:end;margin-bottom:18px}.fourdk-w4head small{display:block;color:#ff6042;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}.fourdk-w4head h2{margin:6px 0 0;font:1000 clamp(38px,6vw,65px)/.88 Arial Black,Impact,sans-serif;letter-spacing:-.045em;text-transform:uppercase}.fourdk-w4head p{margin:0;color:#a5ada6;font:13px/1.55 Georgia,serif}
      .fourdk-w4grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.fourdk-w4card{min-height:185px;padding:17px;border:1px solid #303730;background:#111511;display:flex;flex-direction:column}.fourdk-w4card small{color:#dcb45c;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}.fourdk-w4card h3{margin:8px 0 8px;font:1000 22px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase}.fourdk-w4card p{margin:0;color:#989f99;font-size:9px;line-height:1.5}.fourdk-w4card a{margin-top:auto;padding-top:14px;color:#ff6c4d!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .fourdk-w4card.gotw{border-top:3px solid #d6313a}.fourdk-w4card.power{border-top:3px solid #5f9c68}.fourdk-w4card.london{border-top:3px solid #6b80a6}.fourdk-w4card.tnf{border-top:3px solid #d9b24f}
      .fourdk-w4boards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.fourdk-w4panel{border:1px solid #303730;background:#101410}.fourdk-w4panel-head{padding:15px 16px;border-bottom:1px solid #2b322c}.fourdk-w4panel-head small{color:#d8b45d;font-size:7px;font-weight:1000;letter-spacing:.1em}.fourdk-w4panel-head h3{margin:5px 0 0;font:1000 27px/.92 Arial Black,Impact,sans-serif;text-transform:uppercase}.fourdk-w4row{display:grid;grid-template-columns:34px 1fr;gap:11px;padding:12px 15px;border-top:1px solid #222922}.fourdk-w4row:first-child{border-top:0}.fourdk-w4rank{font:1000 24px/1 Arial Black,Impact,sans-serif;color:#6f796f}.fourdk-w4row:first-child .fourdk-w4rank{color:#ff6042}.fourdk-w4row b{display:block;font-size:10px}.fourdk-w4row span{display:block;margin-top:3px;color:#d9b15b;font-size:7px;font-weight:900}.fourdk-w4row em{display:block;margin-top:5px;color:#8f988f;font-size:8px;line-height:1.4;font-style:normal}
      .fourdk-w4injury{margin-top:10px;padding:16px;border:1px solid #3c3525;background:#17150f;color:#d8d1c3}.fourdk-w4injury small{display:block;color:#e4b75e;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}.fourdk-w4injury b{display:block;margin:6px 0 8px;color:#fff;font-size:13px}.fourdk-w4injury p{margin:0;color:#a9a294;font-size:9px;line-height:1.5}.fourdk-w4injury a{display:inline-block;margin-top:10px;color:#e4b75e!important;text-decoration:none!important;font-size:8px;font-weight:1000}
      @media(max-width:900px){.fourdk-w4grid{grid-template-columns:1fr 1fr}.fourdk-w4boards{grid-template-columns:1fr}.fourdk-w4head{grid-template-columns:1fr}}
      @media(max-width:560px){.fourdk-w4grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function updateHero(){
    const copy=document.querySelector('.nfl-v2-copy');
    if(copy && copy.dataset.week4!=='1'){
      copy.dataset.week4='1';
      copy.innerHTML=`<div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 4 • 2026</div><h1>WEEK 4<br><em>PRESSURE CHANGES.</em></h1><p class="nfl-v2-deck">Five teams are 3–0. Five teams are 0–3. The first month starts to mean something now — and Week 4 gives us an AFC North opener, London, Chiefs–Raiders and a top-six 4DK matchup in San Francisco.</p><div class="nfl-v2-actions"><a class="nfl-v2-primary" href="nfl-week4-preview-2026.html">Open Week 4 Preview</a><a class="nfl-v2-secondary" href="#scoreboard">Live Game Center</a></div><div class="nfl-v2-meta"><span>WEEK 4</span><i>•</i><span>OCT. 1–5</span><i>•</i><span>16 GAMES</span></div>`;
    }
    const board=document.querySelector('.nfl-v2-board');
    if(board && board.dataset.week4!=='1'){
      board.dataset.week4='1';
      board.innerHTML=`<div class="nfl-v2-board-top"><span>THE 4DK BOARD</span><strong>WEEK 4</strong></div><a class="nfl-v2-board-row live" href="nfl-week4-preview-2026.html"><div><small>THIS WEEK</small><b>WEEK 4 PREVIEW</b></div><span>OPEN →</span></a><a class="nfl-v2-board-row live" href="nfl-power-rankings-week3-2026.html"><div><small>1–32</small><b>POWER RANKINGS</b></div><span>LIVE →</span></a><a class="nfl-v2-board-row" href="#pickem"><div><small>WEEKLY</small><b>4DK PICK’EM</b></div><span>PICK NOW →</span></a><a class="nfl-v2-board-row" href="#redzone"><div><small>ALL SEASON</small><b>4DK RED ZONE</b></div><span>ENTER →</span></a><div class="nfl-v2-board-foot">THE FIRST MONTH STARTS TO MATTER.</div>`;
    }
    const ticker=document.querySelector('.nfl-ticker-track');
    if(ticker && ticker.dataset.week4!=='1'){
      ticker.dataset.week4='1';
      ticker.innerHTML='<span><b>●</b> WEEK 4 IS LIVE</span><span><b>●</b> Steelers at Browns tonight</span><span><b>●</b> Chiefs at Raiders: 3–0 vs 3–0</span><span><b>●</b> 4DK #6 Denver at #1 San Francisco</span><span><b>●</b> London: Colts at Commanders</span>';
    }
  }

  function week4Desk(){
    let sec=document.querySelector('.fourdk-w4desk');
    if(sec) return true;
    const nav=document.querySelector('.nfl-v2-nav');
    const scoreboard=document.querySelector('#scoreboard');
    if(!nav && !scoreboard) return false;
    sec=document.createElement('section');
    sec.className='fourdk-w4desk'; sec.id='week4-desk';
    sec.innerHTML=`<div class="fourdk-w4inner"><div class="fourdk-w4head"><div><small>4DK NFL • WEEK 4 DESK</small><h2>FIVE TEAMS ARE 3–0.<br>NOW SOMEBODY BLINKS.</h2></div><p>The records are starting to carry weight. Kansas City and Las Vegas meet unbeaten, the 49ers put No. 1 on the line against our No. 6 Broncos, and five winless teams enter October already needing a response.</p></div><div class="fourdk-w4grid"><article class="fourdk-w4card tnf"><small>THURSDAY • 8:15 ET</small><h3>Steelers at Browns</h3><p>Both are 2–1 in a four-way AFC North race where every team enters the week above .500.</p><a href="nfl-week4-preview-2026.html">Open Week 4 →</a></article><article class="fourdk-w4card london"><small>LONDON • 9:30 ET</small><h3>Colts at Commanders</h3><p>Two 1–2 teams get the Sunday morning spotlight with a chance to reset their first month.</p><a href="nfl-week4-preview-2026.html">See the full slate →</a></article><article class="fourdk-w4card gotw" id="game-of-the-week"><small>GAME OF THE WEEK • 4:25 ET</small><h3>Chiefs at Raiders</h3><p>3–0 vs. 3–0. Vegas gets the measuring stick it has been waiting for, and Kansas City gets another AFC West test.</p><a href="nfl-week4-preview-2026.html#game-of-the-week">Matchup breakdown →</a></article><article class="fourdk-w4card power" id="power-test"><small>4DK #6 @ #1 • 4:25 ET</small><h3>Broncos at 49ers</h3><p>Denver just earned a major bump. San Francisco is still our standard. This is the cleanest power-ranking test on the slate.</p><a href="nfl-week4-preview-2026.html#power-test">What we’re watching →</a></article></div><div class="fourdk-w4boards"><section class="fourdk-w4panel"><div class="fourdk-w4panel-head"><small>4DK POWER RANKINGS • ENTERING WEEK 4</small><h3>THE CURRENT TOP FIVE.</h3></div>${topFive.map(x=>`<div class="fourdk-w4row"><div class="fourdk-w4rank">${x[0]}</div><div><b>${x[1]}</b><span>${x[2]}</span><em>${x[3]}</em></div></div>`).join('')}</section><section class="fourdk-w4panel"><div class="fourdk-w4panel-head"><small>WEEK 3 FINAL • ROOKIE WATCH</small><h3>THE FIVE TO KNOW.</h3></div>${rookieFive.map(x=>`<div class="fourdk-w4row"><div class="fourdk-w4rank">${x[0]}</div><div><b>${x[1]}</b><span>${x[2]}</span><em>${x[3]}</em></div></div>`).join('')}</section></div><div class="fourdk-w4injury"><small>THURSDAY NIGHT • FINAL GAME STATUS</small><b>INJURY WATCH: PITTSBURGH–CLEVELAND</b><p>Pittsburgh: Rico Dowdle and Joey Porter Jr. are out; Brandin Echols and Jalen Ramsey are questionable. Cleveland: Tylan Wallace, Teven Jenkins and Elgton Jenkins are out.</p><a href="nfl-week4-preview-2026.html#injury-watch">See the Week 4 desk →</a></div></div>`;
    if(nav) nav.insertAdjacentElement('afterend',sec); else scoreboard.insertAdjacentElement('beforebegin',sec);
    return true;
  }

  function updateWatchHeader(){
    const w=document.querySelector('#mvp-watch,.mvp-watch');
    if(!w || w.dataset.week4Header==='1') return !!w;
    w.dataset.week4Header='1';
    const head=w.querySelector('.mvp-head');
    if(head) head.innerHTML='<div><span class="mvp-kicker">4DK WEEKLY NFL FEATURE</span><h2>TOP 10 MVP WATCH</h2><p>The Week 3 board is locked and carries into Week 4. Thursday night opens the next evaluation window.</p></div><div class="mvp-stamp">WEEK 3 • FINAL<br>ENTERING WEEK 4</div>';
    return true;
  }

  function updateSeasonCards(){
    const root=document.querySelector('#season-board .board-grid');
    if(!root) return false;
    const cards=[...root.querySelectorAll('.nfl-mini-card')];
    const find=t=>cards.find(c=>(c.querySelector('h3')?.textContent||'').trim()===t);
    const rookie=find('2026 NFL ROOKIE WATCH');
    if(rookie && rookie.dataset.week4!=='1'){ rookie.dataset.week4='1'; rookie.innerHTML='<span class="nfl-label">WEEK 3 FINAL • ENTERING WEEK 4</span><div class="mini-icon">10</div><h3>2026 NFL ROOKIE WATCH</h3><p>Jeremiyah Love leads our current rookie board, with Kenyon Sadiq and Hezekiah Masses right behind him.</p><a class="nfl-coming" href="#week4-desk">OPEN THE CURRENT BOARD →</a>'; }
    const contender=find('THE FAVORITES TO WIN IT ALL') || find('THE CONTENDER BOARD');
    if(contender && contender.dataset.week4!=='1'){ contender.dataset.week4='1'; contender.innerHTML='<span class="nfl-label">4DK • ENTERING WEEK 4</span><div class="mini-icon">5</div><h3>THE UNBEATEN FIVE</h3><p>San Francisco, Buffalo, Kansas City, Minnesota and Las Vegas are all 3–0. Week 4 forces Kansas City and Vegas into the same game.</p><a class="nfl-coming" href="nfl-power-rankings-week3-2026.html">SEE THE 1–32 BOARD →</a>'; }
  }

  function apply(){ addStyles(); updateHero(); week4Desk(); updateWatchHeader(); updateSeasonCards(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [100,300,700,1200,2200,4000,6500,9000].forEach(t=>setTimeout(apply,t));
  const o=new MutationObserver(()=>{clearTimeout(repairTimer);repairTimer=setTimeout(apply,60)}); o.observe(document.documentElement,{subtree:true,childList:true});
})();
