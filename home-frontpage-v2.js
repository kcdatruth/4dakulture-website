(() => {
  const route = location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const home = route === '' || route === 'index';
  if(!home) return;

  function installWeek2Theme(){
    if(document.getElementById('fourdk-home-week2-theme')) return;
    const style = document.createElement('style');
    style.id = 'fourdk-home-week2-theme';
    style.textContent = `
      body.home-page .home-v2-lead:before{
        content:"WEEK 2"!important;
        right:-20px!important;
        bottom:-34px!important;
        opacity:.035!important;
      }
      body.home-page .home-v2-primary{
        background:
          linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.84)),
          repeating-linear-gradient(90deg,transparent 0 76px,rgba(255,255,255,.028) 77px 78px),
          radial-gradient(circle at 80% 22%,rgba(78,151,88,.38),transparent 14rem),
          radial-gradient(circle at 14% 18%,rgba(232,69,46,.24),transparent 17rem),
          linear-gradient(135deg,#142319,#080b09 72%)!important;
        border-color:#34463a!important;
      }
      body.home-page .home-v2-primary:before{
        content:"W2"!important;
        color:#fff!important;
        opacity:.07!important;
      }
      body.home-page .home-v2-primary h1 em{color:#ffd268!important}
      body.home-page .home-v2-side-card.week2-rams{
        border-top:3px solid #2e6db4!important;
        background:
          radial-gradient(circle at 88% 12%,rgba(255,196,37,.14),transparent 9rem),
          linear-gradient(145deg,#101923,#0b0e11)!important;
      }
      body.home-page .home-v2-desk.nfl{
        background:
          repeating-linear-gradient(90deg,transparent 0 88px,rgba(255,255,255,.022) 89px 90px),
          radial-gradient(circle at 86% 10%,rgba(66,137,82,.24),transparent 13rem),
          linear-gradient(145deg,#0f1812,#080b09 72%)!important;
      }
      body.home-page .home-v2-desk.nfl:after{
        content:"WEEK 2";
        position:absolute;
        right:-12px;
        top:10px;
        font:1000 clamp(54px,8vw,110px)/1 Arial Black,Impact,sans-serif;
        letter-spacing:-.07em;
        color:#fff;
        opacity:.035;
        pointer-events:none;
      }
      @media(max-width:760px){
        body.home-page .home-v2-primary{min-height:440px}
      }
    `;
    document.head.appendChild(style);
  }

  function buildLead(){
    const main = document.querySelector('main#main');
    if(!main || document.querySelector('.home-v2-lead')) return;

    const lead = document.createElement('section');
    lead.className = 'home-v2-lead';
    lead.id = 'home-now';
    lead.setAttribute('aria-label','4DK right now');
    lead.innerHTML = `
      <div class="shell home-v2-lead-inner">
        <article class="home-v2-primary">
          <span class="home-v2-lead-kicker">4DK NFL • WEEK 2 • SUNDAY TAKEOVER</span>
          <h1>WEEK 2.<br>NOW IT <em>GETS REAL.</em></h1>
          <p>Week 1 gave us the first impressions. Week 2 starts separating real trends from opening-week noise. Fourteen games hit Sunday, the injury picture is set, and Giants–Rams waits under the lights Monday night.</p>
          <div class="home-v2-primary-meta">
            <span>14 Sunday games</span>
            <span>Final injury statuses updated</span>
            <span>Giants @ Rams • MNF</span>
          </div>
          <div class="home-v2-primary-actions">
            <a class="home-v2-button" href="nfl-week2-sunday-preview-2026.html">Open the Week 2 Preview →</a>
            <a class="home-v2-button alt" href="nfl.html">Enter 4DK NFL</a>
          </div>
        </article>
        <aside class="home-v2-side">
          <a class="home-v2-side-card week2-rams" href="rams-week1-loss-garrett-injury-giants-mnf-2026.html">
            <small>RAMS • NEW 4DK WRITE</small>
            <b>The Rams Got Punched. Now They Have to Respond.</b>
            <span>A 27–7 Week 1 loss, Myles Garrett on IR and a 1–0 Giants team coming to SoFi on Monday night.</span>
            <strong>Read the Rams feature →</strong>
          </a>
          <a class="home-v2-side-card" href="nfl-week2-sunday-preview-2026.html">
            <small>NFL • WEEK 2 INJURY REPORT</small>
            <b>Who’s Out Changes Everything</b>
            <span>Final game-status designations across the Week 2 Sunday slate.</span>
            <strong>Open injury report →</strong>
          </a>
          <a class="home-v2-side-card" href="nfl.html#scoreboard">
            <small>NFL • LIVE GAME CENTER</small>
            <b>Week 2 Scores All Day</b>
            <span>Live scores, scoring updates, team stats and player leaders from the 4DK NFL hub.</span>
            <strong>Open game center →</strong>
          </a>
          <a class="home-v2-side-card" href="mamba-file-003-shaq-kobe-era.html">
            <small>MAMBA FILES • 003</small>
            <b>The Shaq–Kobe Era</b>
            <span>The dynasty, the dominance, the three-peat and the breakup.</span>
            <strong>Open File 003 →</strong>
          </a>
        </aside>
      </div>`;

    const anchor = main.querySelector('.front-cover-feature') || main.querySelector('.hero') || main.firstChild;
    main.insertBefore(lead, anchor);
  }

  function buildJump(){
    if(document.querySelector('.home-v2-jump')) return;
    const lead = document.querySelector('.home-v2-lead');
    if(!lead) return;
    const jump = document.createElement('nav');
    jump.className = 'home-v2-jump';
    jump.setAttribute('aria-label','Homepage sections');
    jump.innerHTML = `<div class="shell">
      <a href="#home-now">Right Now</a>
      <a href="#home-sports">Sports Desk</a>
      <a href="#home-interactive">Interactive</a>
      <a href="#latest-4dk">Latest</a>
      <a href="#home-vault">Vault</a>
      <a href="#home-studio">Magazine + Podcast</a>
    </div>`;
    lead.after(jump);
  }

  function buildSports(){
    const main = document.querySelector('main#main');
    if(!main || document.querySelector('.home-v2-sports')) return;
    const sports = document.createElement('section');
    sports.className = 'home-v2-sports';
    sports.id = 'home-sports';
    sports.innerHTML = `
      <div class="shell">
        <div class="home-v2-section-head">
          <div><span class="home-v2-desk-kicker">THE SPORTS DESK</span><h2>NBA + NFL. ONE FRONT PAGE.</h2></div>
          <p>The current season lives up front. The deeper archives stay below it. Nothing disappears — the hierarchy just gets clearer.</p>
        </div>
        <div class="home-v2-sports-grid">
          <article class="home-v2-desk nfl">
            <span class="home-v2-desk-kicker">4DK NFL • WEEK 2</span>
            <h3>Week 2 Is<br>About Response.</h3>
            <p>Can Week 1’s breakout teams prove it twice? Can the teams that got hit answer back? Sunday tests the league, then the Rams get a national-stage response game against New York on Monday night.</p>
            <div class="home-v2-desk-list">
              <a href="nfl-week2-sunday-preview-2026.html"><small>SUNDAY</small><b>Week 2 Sunday Preview — All 14 Games</b><span>→</span></a>
              <a href="nfl-week2-sunday-preview-2026.html"><small>INJURIES</small><b>Week 2 Final Injury Status</b><span>→</span></a>
              <a href="rams-week1-loss-garrett-injury-giants-mnf-2026.html"><small>RAMS</small><b>Garrett Goes to IR — How L.A. Responds</b><span>→</span></a>
              <a href="nfl.html#scoreboard"><small>LIVE</small><b>4DK NFL Game Center + Red Zone</b><span>→</span></a>
            </div>
          </article>
          <article class="home-v2-desk nba">
            <span class="home-v2-desk-kicker">4DK NBA • 2026–27</span>
            <h3>The New Season<br>Starts Here.</h3>
            <p>The Basketball Annual stays in the spotlight while the season gets closer: the Top 50, the offseason power shift and the roster questions that will define 2026–27.</p>
            <div class="home-v2-desk-list">
              <a href="nba-season-preview-2026-27.html"><small>ANNUAL</small><b>2026–27 NBA Season Preview</b><span>→</span></a>
              <a href="top-50-nba-players-2026-27.html"><small>RANKING</small><b>The 50 Best NBA Players Entering 2026–27</b><span>→</span></a>
              <a href="jalen-duren-contract-gamble-2026.html"><small>DETROIT</small><b>The Jalen Duren Contract Gamble</b><span>→</span></a>
              <a href="nba-offseason-winners-losers.html"><small>OFFSEASON</small><b>The Power Shift Is Real</b><span>→</span></a>
            </div>
          </article>
        </div>
      </div>`;

    const latest = document.querySelector('.latest-4dk');
    const hero = main.querySelector('.hero');
    if(latest) latest.after(sports);
    else if(hero) hero.after(sports);
    else main.prepend(sports);
  }

  function buildInteractive(){
    if(document.querySelector('.home-v2-interactive')) return;
    const sports = document.querySelector('.home-v2-sports');
    if(!sports) return;
    const section = document.createElement('section');
    section.className = 'home-v2-interactive';
    section.id = 'home-interactive';
    section.innerHTML = `
      <div class="shell">
        <div class="home-v2-section-head">
          <div><span class="home-v2-desk-kicker">4DK INTERACTIVE</span><h2>BUILD IT. DEFEND IT.</h2></div>
          <p>Three signature games, one place. Build the roster, chase perfection or spend $15 on the ultimate hip-hop collection.</p>
        </div>
        <div class="home-v2-interactive-grid">
          <a class="home-v2-game basketball" href="82-0.html">
            <span class="big">82–0</span>
            <small>NBA • INTERACTIVE</small>
            <h3>CAN YOUR FIVE<br>GO 82–0?</h3>
            <p>Five positions. Three choices each. Build the impossible starting five and let 4DK grade the fit.</p>
            <b>PLAY THE 82–0 CHALLENGE →</b>
          </a>
          <a class="home-v2-game football" href="17-0.html">
            <span class="big">17–0</span>
            <small>NFL • INTERACTIVE</small>
            <h3>BUILD A PERFECT<br>FOOTBALL TEAM.</h3>
            <p>Build a prime-season all-time roster across offense and defense and see if your squad can survive perfection.</p>
            <b>PLAY THE 17–0 CHALLENGE →</b>
          </a>
          <a class="home-v2-game album-draft" href="album-draft.html">
            <span class="big">$15</span>
            <small>MUSIC • INTERACTIVE</small>
            <h3>DRAFT YOUR<br>5-ALBUM COLLECTION.</h3>
            <p>Seventy-five all-time hip-hop projects. Five picks. Fifteen dollars. No more than two projects from one artist.</p>
            <b>PLAY THE ALBUM DRAFT →</b>
          </a>
        </div>
      </div>`;
    sports.after(section);
  }

  function wireAlbumDraftDiscovery(){
    if(!document.getElementById('fourdk-album-draft-discovery-style')){
      const style = document.createElement('style');
      style.id = 'fourdk-album-draft-discovery-style';
      style.textContent = `
        body.home-page .home-v2-interactive-grid{
          grid-template-columns:repeat(3,minmax(0,1fr))!important;
        }
        body.home-page .home-v2-game.album-draft{
          background:
            radial-gradient(circle at 80% 18%,rgba(212,169,62,.42),transparent 10rem),
            linear-gradient(145deg,#1d1710,#0d0d0f 62%);
          border-color:#5c4a24;
        }
        body.home-page .home-v2-game.album-draft .big{color:#d8b35f}
        .home-franchise-grid .album-draft-franchise{border-top-color:#d8b35f!important}
        @media(max-width:980px){
          body.home-page .home-v2-interactive-grid{grid-template-columns:1fr 1fr!important}
          body.home-page .home-v2-game.album-draft{grid-column:1/-1}
          .home-franchise-grid .album-draft-franchise{grid-column:auto!important}
        }
        @media(max-width:620px){
          body.home-page .home-v2-interactive-grid{grid-template-columns:1fr!important}
          body.home-page .home-v2-game.album-draft{grid-column:auto}
        }`;
      document.head.appendChild(style);
    }

    const franchiseGrid = document.querySelector('.home-franchise-grid');
    if(franchiseGrid && !franchiseGrid.querySelector('a[href="album-draft.html"]')){
      const card = document.createElement('a');
      card.className = 'home-franchise album-draft-franchise';
      card.href = 'album-draft.html';
      card.innerHTML = `<small>INTERACTIVE • MUSIC</small><strong>4DK Album Draft</strong><span>$15. Five projects. Build the ultimate all-time hip-hop collection.</span><b>Draft five →</b>`;
      franchiseGrid.appendChild(card);
    }

    try{
      if(typeof siteSearchIndex !== 'undefined' && !siteSearchIndex.some(item => item.url === 'album-draft.html')){
        siteSearchIndex.push({
          title:'4DK Album Draft — All-Time Hip-Hop Edition',
          type:'Interactive',
          url:'album-draft.html',
          desc:'Spend $15 to draft five all-time hip-hop albums and mixtapes from a 75-project board',
          terms:'interactive album draft music hip hop game all time albums mixtapes 15 dollars five picks east west south midwest'
        });
      }
    }catch(e){}
  }

  function markVault(){
    const vault = document.querySelector('.home-vault-section');
    if(vault && !vault.id) vault.id = 'home-vault';
  }

  function buildStudio(){
    const main = document.querySelector('main#main');
    if(!main || document.querySelector('.home-v2-studio')) return;
    const section = document.createElement('section');
    section.className = 'home-v2-studio';
    section.id = 'home-studio';
    section.innerHTML = `
      <div class="shell">
        <div class="home-v2-section-head">
          <div><span class="home-v2-desk-kicker">4DK BEYOND THE ARTICLES</span><h2>THE ISSUE + THE VOICE.</h2></div>
          <p>The magazine is the long-form package. The podcast is the conversation. Both now get a real home on the front page.</p>
        </div>
        <div class="home-v2-studio-grid">
          <a class="home-v2-studio-card mag" href="magazine.html">
            <small>4DK MAGAZINE</small>
            <h3>THE DIGITAL<br>ISSUE.</h3>
            <p>Season previews, covers, long-form packages and special editions built like a real magazine.</p>
            <b>ENTER 4DK MAGAZINE →</b>
          </a>
          <a class="home-v2-studio-card pod" href="podcast.html">
            <small>4 DA KULTURE PODCAST</small>
            <h3>KCDATRUTH<br>+ 210WEST.</h3>
            <p>Sports, hip-hop and culture in the same voice as the site — built for the conversations that don't fit in one article.</p>
            <b>ENTER THE PODCAST →</b>
          </a>
        </div>
      </div>`;

    const across = [...main.querySelectorAll(':scope > section')].find(s => s.querySelector('.split'));
    if(across) main.insertBefore(section, across);
    else main.appendChild(section);
  }

  function updateTicker(){
    const ticker = document.querySelector('.ticker-track');
    if(!ticker || ticker.dataset.v2Updated) return;
    const items = [
      'NFL WEEK 2: NOW IT GETS REAL',
      'Rams respond after 27–7 Week 1 loss',
      'Myles Garrett to IR after knee surgery',
      'Giants at Rams Monday Night Football',
      'Mamba File 003: The Shaq–Kobe Era'
    ];
    ticker.innerHTML = items.map(x => `<span><span class="dot">●</span> ${x}</span>`).join('');
    ticker.dataset.v2Updated = '1';
  }

  function addRamsToSearch(){
    try{
      if(typeof siteSearchIndex !== 'undefined' && !siteSearchIndex.some(item => item.url === 'rams-week1-loss-garrett-injury-giants-mnf-2026.html')){
        siteSearchIndex.push({
          title:'The Rams Got Punched. Now They Have to Respond.',
          type:'NFL • Rams • Week 2',
          url:'rams-week1-loss-garrett-injury-giants-mnf-2026.html',
          desc:'Week 1 loss to San Francisco, Myles Garrett’s knee injury and the Rams’ Monday Night Football response test against New York.',
          terms:'rams los angeles 49ers week 1 myles garrett injury injured reserve knee giants monday night football jaxson dart aaron donald'
        });
      }
    }catch(e){}
  }

  function apply(){
    installWeek2Theme();
    buildLead();
    buildJump();
    buildSports();
    buildInteractive();
    wireAlbumDraftDiscovery();
    markVault();
    buildStudio();
    updateTicker();
    addRamsToSearch();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();
