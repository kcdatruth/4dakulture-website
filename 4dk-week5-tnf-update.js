(() => {
  const ARTICLE='nfl-thursday-recap-week5-buccaneers-cowboys.html';
  const path=(location.pathname||'/').toLowerCase();
  const isHome=path==='/'||path.endsWith('/index.html');
  const isNFL=path.endsWith('/nfl.html')||path.endsWith('/nfl');
  if(!isHome&&!isNFL) return;
  if(window.__fourdkWeek5TNFCurrentV2) return;
  window.__fourdkWeek5TNFCurrentV2=true;

  const MARK='week5-tnf-current-v2';
  let timer=0;

  function addStyles(){
    if(document.getElementById('fourdk-week5-tnf-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-week5-tnf-css';
    s.textContent=`
      .w5current{padding:42px 0;background:#080b09;color:#f6f2e8;border-bottom:1px solid #293029}
      .w5current .shell{width:min(1180px,calc(100% - 32px));margin:auto}
      .w5k{color:#ef5b35;font:1000 10px Arial;letter-spacing:.15em;text-transform:uppercase}
      .w5current h2{margin:7px 0 12px;font:1000 clamp(38px,7vw,72px)/.87 Arial Black,Impact,sans-serif;letter-spacing:-.05em;text-transform:uppercase}
      .w5current h2 em{font-style:normal;color:#f0bd54}
      .w5p{max-width:860px;color:#a5aba5;line-height:1.6}
      .w5btn{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}
      .w5btn a{padding:12px 14px;border:1px solid #394039;color:#fff!important;text-decoration:none!important;font:900 9px Arial}
      .w5btn a:first-child{background:#d93636;border-color:#d93636}
      .w5grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .w5card{min-height:170px;padding:15px;border:1px solid #303730;background:#101511;color:#fff!important;text-decoration:none!important;display:flex;flex-direction:column}
      .w5card small{color:#ef6650;font:1000 9px Arial}
      .w5card b{display:block;margin:8px 0;font:1000 18px/1 Arial Black,Impact,sans-serif}
      .w5card span{margin-top:auto;color:#a1a7a1;font:12px/1.45 Arial}
      @media(max-width:900px){.w5grid{grid-template-columns:1fr 1fr}}
      @media(max-width:760px){.w5grid{grid-template-columns:1fr}.nfl-v2-hero .nfl-v2-copy h1{font-size:clamp(46px,15vw,62px)!important;line-height:.84!important}}
    `;
    document.head.appendChild(s);
  }

  function home(){
    if(!isHome) return;
    const shelf=document.querySelector('.fourdk-current-shelf-grid');
    if(shelf){
      let card=shelf.querySelector('[data-week5-tnf]');
      if(!card){
        card=document.createElement('a');
        card.className='fourdk-current-shelf-card';
        card.dataset.week5Tnf='1';
        shelf.prepend(card);
      }
      card.href=ARTICLE;
      card.innerHTML='<small>TNF FINAL • WEEK 5</small><b>Dallas Let One Get Away</b><span>Tampa 24, Dallas 16 • Jalon Daniels’ first win • Bucky Irving 165 rushing yards.</span>';
      const head=document.querySelector('.fourdk-current-shelf-head small');
      if(head) head.textContent='WEEK 5 • TNF FINAL';
    }
  }

  function ensureSection(){
    let sec=document.getElementById('w5current');
    const nav=document.querySelector('.nfl-v2-nav');
    if(!sec && nav){
      sec=document.createElement('section');
      sec.id='w5current';
      sec.className='w5current';
      nav.insertAdjacentElement('afterend',sec);
    }
    if(sec){
      sec.innerHTML=`<div class="shell">
        <span class="w5k">WEEK 5 • THURSDAY NIGHT FINAL</span>
        <h2>TAMPA GOT ITS FIRST WIN.<br><em>DALLAS LET ONE GET AWAY.</em></h2>
        <p class="w5p">Tampa Bay beat Dallas 24–16 behind Jalon Daniels’ first NFL win and Bucky Irving’s 165-yard rushing night. Dallas is 2–3 after dropping a home game it should have banked. Week 5 is officially underway.</p>
        <div class="w5btn">
          <a href="${ARTICLE}">READ THE FULL TNF RECAP →</a>
          <a href="nfl-week5-preview-2026.html">OPEN THE WEEK 5 LOOKAHEAD →</a>
          <a href="nfl-thursday-recaps.html">THURSDAY RECAP ARCHIVE →</a>
        </div>
        <div class="w5grid">
          <a class="w5card" href="${ARTICLE}"><small>TNF FINAL</small><b>TB 24 • DAL 16</b><span>Jalon Daniels gets his first win. Bucky Irving runs for 165. Dallas falls to 2–3.</span></a>
          <a class="w5card" href="nfl-week5-preview-2026.html"><small>SUNDAY</small><b>WEEK 5 IS NEXT</b><span>49ers–Seahawks, Ravens–Falcons and the rest of the slate.</span></a>
          <a class="w5card" href="nfl-power-rankings-week4-2026.html"><small>POWER RANKINGS</small><b>WEEK 4 BASELINE</b><span>The current 1–32 board entering the rest of Week 5.</span></a>
          <a class="w5card" href="nfl-prediction-checkpoint-week4-2026.html"><small>RECEIPTS</small><b>CHECK THE PICKS</b><span>Our preseason calls compared with the first month of actual football.</span></a>
        </div>
      </div>`;
    }
  }

  function nfl(){
    if(!isNFL) return;
    addStyles();

    const hero=document.querySelector('.nfl-v2-hero .nfl-v2-copy');
    if(hero && hero.dataset.week5Tnf!==MARK){
      hero.dataset.week5Tnf=MARK;
      hero.innerHTML=`<div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 5 • TNF FINAL</div>
        <h1>DALLAS LET<br><em>ONE GET AWAY.</em></h1>
        <p class="nfl-v2-deck">Tampa Bay got its first win, Jalon Daniels got his first NFL victory and Bucky Irving ran for 165 yards. Dallas is 2–3 after dropping a winnable home game. Week 5 is underway.</p>
        <div class="nfl-v2-actions">
          <a class="nfl-v2-primary" href="${ARTICLE}">READ THE TNF RECAP</a>
          <a class="nfl-v2-secondary" href="nfl-week5-preview-2026.html">WEEK 5 LOOKAHEAD</a>
        </div>`;
    }

    const board=document.querySelector('.nfl-v2-board');
    if(board && board.dataset.week5Tnf!==MARK){
      board.dataset.week5Tnf=MARK;
      board.innerHTML=`<div class="nfl-v2-board-top"><span>THE 4DK BOARD</span><strong>WEEK 5 IN PROGRESS</strong></div>
        <a class="nfl-v2-board-row live" href="${ARTICLE}"><div><small>TNF FINAL</small><b>TB 24 • DAL 16</b></div><span>RECAP →</span></a>
        <a class="nfl-v2-board-row live" href="nfl-week5-preview-2026.html"><div><small>REST OF WEEK 5</small><b>FULL WEEKEND LOOKAHEAD</b></div><span>OPEN →</span></a>
        <a class="nfl-v2-board-row" href="nfl-power-rankings-week4-2026.html"><div><small>POWER RANKINGS</small><b>FULL 1–32 BOARD</b></div><span>OPEN →</span></a>
        <a class="nfl-v2-board-row" href="nfl-thursday-recaps.html"><div><small>THURSDAY ARCHIVE</small><b>WEEKS 2–5</b></div><span>VIEW →</span></a>
        <a class="nfl-v2-board-row" href="nfl-prediction-checkpoint-week4-2026.html"><div><small>PREDICTION CHECKPOINT</small><b>CHECK THE RECEIPTS</b></div><span>READ →</span></a>
        <div class="nfl-v2-board-foot">WEEK 4 STAYS ARCHIVED. WEEK 5 IS NOW LIVE.</div>`;
    }

    const ticker=document.querySelector('.nfl-ticker-track');
    if(ticker && ticker.dataset.week5Tnf!==MARK){
      ticker.dataset.week5Tnf=MARK;
      ticker.innerHTML=[
        'TNF FINAL: TAMPA BAY 24, DALLAS 16',
        'JALON DANIELS: FIRST NFL WIN',
        'BUCKY IRVING: 165 RUSH YDS',
        'DALLAS FALLS TO 2–3',
        'WEEK 5: 49ERS AT SEAHAWKS',
        'SNF: RAVENS AT FALCONS',
        'MNF: BILLS AT RAMS'
      ].map(x=>`<span><b>●</b> ${x}</span>`).join('');
    }

    const nav=document.querySelector('.nfl-v2-nav');
    if(nav && nav.dataset.week5Tnf!==MARK){
      nav.dataset.week5Tnf=MARK;
      nav.innerHTML=`<a class="active" href="#w5current">Week 5</a><a href="#scoreboard">Scores</a><a href="${ARTICLE}">TNF Recap</a><a href="nfl-week5-preview-2026.html">Weekend Preview</a><a href="nfl-power-rankings-week4-2026.html">Rankings</a><a href="nfl-week-4-sunday-night-update-2026.html#mvp">MVP</a><a href="nfl-week-4-sunday-night-update-2026.html#rookies">Rookies</a><a href="nfl-thursday-recaps.html">Thursday Archive</a><a href="nfl-sunday-recaps.html">Sunday Archive</a>`;
    }

    const oldNext=document.getElementById('w5next');
    if(oldNext) oldNext.remove();

    const oldFinal=document.getElementById('w4final');
    if(oldFinal){
      oldFinal.className='w5current';
      oldFinal.innerHTML=`<div class="shell">
        <span class="w5k">WEEK 4 • ARCHIVED</span>
        <h2>THE FIRST MONTH<br><em>STAYS IN THE BOOKS.</em></h2>
        <p class="w5p">The Week 4 final package, Power Rankings, MVP Watch, Rookie Watch and prediction checkpoint are all still live. Nothing gets deleted when the new week starts.</p>
        <div class="w5btn">
          <a href="nfl-week-4-sunday-night-update-2026.html">OPEN WEEK 4 FINAL →</a>
          <a href="nfl-power-rankings-week4-2026.html">WEEK 4 POWER RANKINGS →</a>
          <a href="nfl-prediction-checkpoint-week4-2026.html">CHECK THE RECEIPTS →</a>
        </div>
      </div>`;
    }

    ensureSection();
  }

  function apply(){home();nfl()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [100,300,700,1300,2500,4500,7500,11000].forEach(ms=>setTimeout(apply,ms));

  const observer=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(apply,100);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();