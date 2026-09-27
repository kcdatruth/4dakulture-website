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
      .fourdk-story-video{
        margin:34px 0;
        overflow:hidden;
        border:1px solid rgba(255,255,255,.14);
        border-top:4px solid #d7a92e;
        background:#0a0f18;
        box-shadow:0 18px 45px rgba(0,0,0,.22);
      }
      .fourdk-story-video-head{
        padding:16px 18px;
        border-bottom:1px solid rgba(255,255,255,.12);
        background:linear-gradient(90deg,rgba(215,169,46,.12),rgba(35,78,145,.09),transparent);
      }
      .fourdk-story-video-head small{
        display:block;
        color:#e8bd4a;
        font-size:8px;
        font-weight:1000;
        letter-spacing:.13em;
        text-transform:uppercase;
      }
      .fourdk-story-video-head b{
        display:block;
        margin-top:6px;
        color:#fff;
        font:1000 clamp(22px,3.6vw,34px)/.96 Arial Black,Impact,sans-serif;
        letter-spacing:-.035em;
        text-transform:uppercase;
      }
      .fourdk-story-video-embed{
        position:relative;
        width:100%;
        aspect-ratio:16/9;
        background:#000;
      }
      .fourdk-story-video-embed iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
      }
      .fourdk-story-video-caption{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:14px;
        padding:12px 16px;
        color:#9da8b8;
        font-size:9px;
        line-height:1.45;
      }
      .fourdk-story-video-caption a{
        color:#e8bd4a!important;
        text-decoration:none!important;
        font-weight:1000;
        letter-spacing:.08em;
        text-transform:uppercase;
        white-space:nowrap;
      }
      @media(max-width:560px){
        .fourdk-story-video{margin:28px 0}
        .fourdk-story-video-caption{align-items:flex-start;flex-direction:column}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    if(document.querySelector(`iframe[src*="${VIDEO_ID}"]`)) return true;

    const article=document.querySelector('.a4-copy');
    if(!article) return false;

    const headings=[...article.querySelectorAll('h2')];
    const allStarHeading=headings.find(h=>
      /05\./.test(h.textContent || '') &&
      /ALL-STAR GAME/i.test(h.textContent || '')
    );

    const block=document.createElement('section');
    block.className='fourdk-story-video';
    block.setAttribute('aria-label','4DK Watch the Tape: Allen Iverson 2000-01 season highlights');
    block.innerHTML=`
      <div class="fourdk-story-video-head">
        <small>4DK WATCH THE TAPE • 2000–01 MVP SEASON</small>
        <b>ALLEN IVERSON • IT WAS HIS TIME.</b>
      </div>
      <div class="fourdk-story-video-embed">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}"
          title="Allen Iverson 2000-01 season highlights"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
      <div class="fourdk-story-video-caption">
        <span>Watch the 2000–01 tape after the scoring, sleeve and MVP-era setup — then continue into the All-Star Game and full 4DK breakdown.</span>
        <a href="https://youtu.be/${VIDEO_ID}" target="_blank" rel="noopener">YouTube →</a>
      </div>`;

    if(allStarHeading){
      allStarHeading.insertAdjacentElement('beforebegin',block);
    }else{
      const openingPull=article.querySelector('.a4-pull');
      if(openingPull) openingPull.insertAdjacentElement('afterend',block);
      else article.prepend(block);
    }
    return true;
  }

  addStyles();
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }

  [300,800,1500,2800].forEach(ms=>setTimeout(install,ms));
})();

/* ---------- 4DK NFL SEASON BOARD — LIVE THROUGH WEEK 2 ---------- */
(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkSeasonBoardLive) return;
  window.__fourdkSeasonBoardLive=true;

  const rookieBoard=[
    ['1','Josiah Trotter','TB • LB','24 TKL • 1 SACK • 38-YD PICK-SIX'],
    ['2','Denzel Boston','CLE • WR','7 REC • 154 YDS • 2 TD'],
    ['3','Hezekiah Masses','LV • CB','5 TKL • 3 PBU • 2 INT'],
    ['4','David Bailey','NYJ • EDGE','7 TKL • 2 SACK • 1 FF'],
    ['5','Caleb Downs','DAL • S','17 TKL • 2 FF • 1 SACK • 1 PBU'],
    ['6','Dillon Thieneman','CHI • S','17 TKL • 2 PBU'],
    ['7','Treydan Stukes','LV • S','10 TKL • 1 INT'],
    ['8','Antonio Williams','WAS • WR','7 REC • 88 YDS • 1 TD'],
    ['9','Kenyon Sadiq','NYJ • TE','5 REC • 38 YDS • 1 RUSH TD'],
    ['10','Mansoor Delane','KC • CB','1 INT • 1 PBU']
  ];

  const contenders=[
    ['1','Kansas City Chiefs','2–0','Mahomes + Walker have already shown two different ways to win.'],
    ['2','Buffalo Bills','2–0','Josh Allen and the offense have looked explosive through two weeks.'],
    ['3','San Francisco 49ers','2–0','Purdy has been surgical; health is the pressure point now.'],
    ['4','Philadelphia Eagles','2–0','Still finding ways to finish even when the game gets messy.'],
    ['5','Seattle Seahawks','2–0','The defending champs followed the opener with a statement win.'],
    ['6','Cincinnati Bengals','2–0','The defense has raised the floor while Burrow settles in.'],
    ['7','Minnesota Vikings','2–0','They have already won two very different kinds of games.'],
    ['8','Las Vegas Raiders','2–0','The six-win preseason baseline already looks conservative.']
  ];

  function addStyles(){
    if(document.getElementById('fourdk-season-board-live-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-season-board-live-css';
    s.textContent=`
      #season-board .nfl-mini-card[data-live-board="1"]{
        min-height:315px;
        box-shadow:0 15px 34px rgba(0,0,0,.22);
      }
      #season-board .nfl-mini-card[data-live-board="1"] .nfl-label{
        color:#fff;
        border-color:#5f675f;
      }
      #season-board .nfl-mini-card[data-live-board="1"] .nfl-coming{
        display:inline-flex;
        margin-top:18px;
        padding:8px 10px;
        border:1px solid #667069;
        color:#fff!important;
        text-decoration:none!important;
      }

      .fourdk-live-board{
        padding:42px 0 48px;
        background:#080b09;
        color:#f6f2e8;
        border-top:1px solid #283029;
        border-bottom:1px solid #283029;
      }
      .fourdk-live-board-head{
        display:flex;justify-content:space-between;align-items:end;
        gap:20px;margin-bottom:18px;
      }
      .fourdk-live-board-head small{
        display:block;color:#ef503a;font-size:8px;font-weight:1000;
        letter-spacing:.13em;text-transform:uppercase;
      }
      .fourdk-live-board-head h2{
        margin:6px 0 0;
        font:1000 clamp(34px,6vw,58px)/.88 Arial Black,Impact,sans-serif;
        letter-spacing:-.045em;text-transform:uppercase;
      }
      .fourdk-live-board-head p{
        max-width:560px;margin:0;color:#8f988f;
        font:12px/1.5 Georgia,serif;
      }
      .fourdk-board-panel{
        margin-top:12px;border:1px solid #303731;background:#101410;
      }
      .fourdk-board-panel:first-of-type{margin-top:0}
      .fourdk-board-panel-head{
        display:flex;justify-content:space-between;gap:18px;align-items:end;
        padding:18px;border-bottom:1px solid #303731;
      }
      .fourdk-board-panel-head small{
        display:block;color:#d9b25a;font-size:7px;font-weight:1000;letter-spacing:.11em;
      }
      .fourdk-board-panel-head h3{
        margin:5px 0 0;font:1000 28px/.92 Arial Black,Impact,sans-serif;
        text-transform:uppercase;
      }
      .fourdk-board-panel-head span{
        color:#7f8981;font-size:8px;text-align:right;
      }

      .fourdk-rookie-list{display:grid;grid-template-columns:1fr 1fr}
      .fourdk-rookie-row{
        display:grid;grid-template-columns:34px minmax(0,1fr);
        gap:11px;padding:13px 15px;border-top:1px solid #222922;
      }
      .fourdk-rookie-row:nth-child(odd){border-right:1px solid #222922}
      .fourdk-rookie-rank{
        font:1000 25px/1 Arial Black,Impact,sans-serif;color:#677168;
      }
      .fourdk-rookie-row:first-child .fourdk-rookie-rank{color:#ef503a}
      .fourdk-rookie-row b{display:block;color:#fff;font-size:11px}
      .fourdk-rookie-row small{
        display:block;margin-top:3px;color:#efb24b;font-size:7px;font-weight:1000;
        letter-spacing:.08em;
      }
      .fourdk-rookie-row span{
        display:block;margin-top:5px;color:#8f988f;font-size:8px;
      }

      .fourdk-contender-grid{
        display:grid;grid-template-columns:repeat(4,1fr);
      }
      .fourdk-contender{
        min-height:145px;padding:15px;border-top:1px solid #222922;
        border-right:1px solid #222922;
      }
      .fourdk-contender:nth-child(4n){border-right:0}
      .fourdk-contender i{
        display:block;color:#687168;font:1000 26px/1 Arial Black,Impact,sans-serif;
        font-style:normal;
      }
      .fourdk-contender b{
        display:block;margin-top:8px;color:#fff;font-size:11px;line-height:1.15;
      }
      .fourdk-contender small{
        display:block;margin-top:4px;color:#efb24b;font-size:8px;font-weight:1000;
      }
      .fourdk-contender p{
        margin:8px 0 0;color:#8e978f;font-size:8px;line-height:1.45;
      }

      .fourdk-pred-grid{
        display:grid;grid-template-columns:repeat(3,1fr);
      }
      .fourdk-pred{
        padding:17px;border-top:1px solid #222922;border-right:1px solid #222922;
      }
      .fourdk-pred:last-child{border-right:0}
      .fourdk-pred small{
        color:#ef503a;font-size:7px;font-weight:1000;letter-spacing:.1em;
      }
      .fourdk-pred b{
        display:block;margin:7px 0;color:#fff;font-size:13px;
      }
      .fourdk-pred p{
        margin:0;color:#8f988f;font-size:9px;line-height:1.48;
      }
      .fourdk-pred-links{
        display:flex;gap:8px;flex-wrap:wrap;padding:15px 17px;border-top:1px solid #303731;
      }
      .fourdk-pred-links a{
        padding:8px 10px;border:1px solid #3c443d;color:#dcb45d!important;
        text-decoration:none!important;font-size:7px;font-weight:1000;
        letter-spacing:.09em;text-transform:uppercase;
      }

      @media(max-width:850px){
        .fourdk-rookie-list{grid-template-columns:1fr}
        .fourdk-rookie-row:nth-child(odd){border-right:0}
        .fourdk-contender-grid{grid-template-columns:1fr 1fr}
        .fourdk-contender:nth-child(2n){border-right:0}
        .fourdk-pred-grid{grid-template-columns:1fr}
        .fourdk-pred{border-right:0}
        .fourdk-live-board-head{align-items:flex-start;flex-direction:column}
      }
      @media(max-width:520px){
        .fourdk-contender-grid{grid-template-columns:1fr}
        .fourdk-contender{border-right:0}
        .fourdk-board-panel-head{align-items:flex-start;flex-direction:column}
        .fourdk-board-panel-head span{text-align:left}
      }
    `;
    document.head.appendChild(s);
  }

  function updateCards(){
    const root=document.querySelector('#season-board .board-grid');
    if(!root) return false;

    const cards=[...root.querySelectorAll('.nfl-mini-card')];
    const byTitle=t=>cards.find(c=>(c.querySelector('h3')?.textContent||'').trim()===t);

    const rookie=byTitle('2026 NFL ROOKIE WATCH');
    if(rookie && rookie.dataset.liveBoard!=='1'){
      rookie.dataset.liveBoard='1';
      rookie.innerHTML=`
        <span class="nfl-label">WEEK 2 BOARD • UPDATED</span>
        <div class="mini-icon">10</div>
        <h3>2026 NFL ROOKIE WATCH</h3>
        <p>Josiah Trotter leads the early race, with Denzel Boston, Hezekiah Masses, David Bailey and Caleb Downs pushing hard behind him.</p>
        <a class="nfl-coming" href="#rookie-watch-live">OPEN THE TOP 10 →</a>`;
    }

    const bowl=byTitle('THE FAVORITES TO WIN IT ALL');
    if(bowl && bowl.dataset.liveBoard!=='1'){
      bowl.dataset.liveBoard='1';
      bowl.innerHTML=`
        <span class="nfl-label">SUPER BOWL LXI • EARLY BOARD</span>
        <div class="mini-icon">8</div>
        <h3>THE CONTENDER BOARD</h3>
        <p>The current 4DK top eight after Week 2: Kansas City, Buffalo, San Francisco, Philadelphia, Seattle, Cincinnati, Minnesota and Las Vegas.</p>
        <a class="nfl-coming" href="#contender-board-live">SEE THE BOARD →</a>`;
    }

    const awards=byTitle('2026 NFL AWARD PREDICTIONS');
    if(awards && awards.dataset.liveBoard!=='1'){
      awards.dataset.liveBoard='1';
      awards.innerHTML=`
        <span class="nfl-label">4DK PREDICTIONS • TRACKING LIVE</span>
        <div class="mini-icon">26</div>
        <h3>PRESEASON PICKS vs. THE SEASON</h3>
        <p>The original forecasts stay visible while the weekly results show us what is holding up, what is changing and what needs a rewrite.</p>
        <a class="nfl-coming" href="#predictions-live">TRACK THE PICKS →</a>`;
    }
    return true;
  }

  function installLiveSection(){
    if(document.querySelector('.fourdk-live-board')) return true;
    const season=document.querySelector('#season-board');
    if(!season) return false;

    const sec=document.createElement('section');
    sec.className='fourdk-live-board';
    sec.setAttribute('aria-label','4DK NFL live season board');
    sec.innerHTML=`
      <div class="shell">
        <div class="fourdk-live-board-head">
          <div>
            <small>4DK NFL • THROUGH WEEK 2 • NEXT REFRESH TUESDAY</small>
            <h2>THE SEASON BOARD IS LIVE.</h2>
          </div>
          <p>No more placeholder cards. Rookie Watch, the early contender board and the preseason prediction tracker now move with the season.</p>
        </div>

        <article class="fourdk-board-panel" id="rookie-watch-live">
          <div class="fourdk-board-panel-head">
            <div><small>2026 NFL ROOKIE WATCH</small><h3>TOP 10 • THROUGH WEEK 2</h3></div>
            <span>Production • role • impact • weekly movement</span>
          </div>
          <div class="fourdk-rookie-list">
            ${rookieBoard.map(([r,n,t,s])=>`
              <div class="fourdk-rookie-row">
                <div class="fourdk-rookie-rank">${r}</div>
                <div><b>${n}</b><small>${t}</small><span>${s}</span></div>
              </div>`).join('')}
          </div>
        </article>

        <article class="fourdk-board-panel" id="contender-board-live">
          <div class="fourdk-board-panel-head">
            <div><small>SUPER BOWL LXI • EARLY CONTENDER SNAPSHOT</small><h3>WHO LOOKS BUILT FOR FEBRUARY?</h3></div>
            <span>Current 4DK order after Week 2 — not a final February prediction.</span>
          </div>
          <div class="fourdk-contender-grid">
            ${contenders.map(([r,t,rec,note])=>`
              <div class="fourdk-contender">
                <i>${r}</i><b>${t}</b><small>${rec}</small><p>${note}</p>
              </div>`).join('')}
          </div>
        </article>

        <article class="fourdk-board-panel" id="predictions-live">
          <div class="fourdk-board-panel-head">
            <div><small>4DK PREDICTIONS TRACKER</small><h3>KEEP THE RECEIPTS.</h3></div>
            <span>Preseason forecast stays on record while the season gives us new evidence.</span>
          </div>
          <div class="fourdk-pred-grid">
            <div class="fourdk-pred">
              <small>HOLDING UP</small>
              <b>THE HEAVYWEIGHTS ARE STILL THERE.</b>
              <p>Kansas City, Buffalo and San Francisco all reached Week 3 at 2–0 and remain at the front of the current 4DK power board.</p>
            </div>
            <div class="fourdk-pred">
              <small>EARLY SURPRISE</small>
              <b>LAS VEGAS IS AHEAD OF SCHEDULE.</b>
              <p>The Raiders entered with a much lower preseason baseline. A 2–0 start and Kirk Cousins' early production changed the tone immediately.</p>
            </div>
            <div class="fourdk-pred">
              <small>STILL DEVELOPING</small>
              <b>TWO WEEKS ISN'T A SEASON.</b>
              <p>The original AFC and NFC previews stay intact. The Tuesday boards track what the games are actually telling us without rewriting history.</p>
            </div>
          </div>
          <div class="fourdk-pred-links">
            <a href="afc-preview-2026.html">ORIGINAL AFC PREVIEW →</a>
            <a href="nfc-preview-2026.html">ORIGINAL NFC PREVIEW →</a>
            <a href="rankings.html#nfl-rankings">RANKINGS HQ →</a>
          </div>
        </article>
      </div>`;

    season.insertAdjacentElement('afterend',sec);
    return true;
  }

  function run(){
    addStyles();
    updateCards();
    installLiveSection();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }
  [250,700,1500,3000].forEach(ms=>setTimeout(run,ms));
})();