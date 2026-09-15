
(() => {
  const route = location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const home = route === '' || route === 'index';
  if(!home) return;

  const once = (selector) => document.querySelector(selector);

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
          <span class="home-v2-lead-kicker">4DK NFL • MONDAY NIGHT HEADLINE • WEEK 1</span>
          <h1>THE KING<br>IS <em>BACK.</em></h1>
          <p>Kansas City answered every question in one night. Patrick Mahomes returned, Kenneth Walker exploded for 173 rushing yards and the Chiefs flattened Denver 31–10 to reset the AFC conversation.</p>
          <div class="home-v2-primary-meta">
            <span>Chiefs 31 • Broncos 10</span>
            <span>Walker: 191 scrimmage yards</span>
            <span>Week 1 complete</span>
          </div>
          <div class="home-v2-primary-actions">
            <a class="home-v2-button" href="nfl-mnf-recap-week1.html">Read the MNF Breakdown →</a>
            <a class="home-v2-button alt" href="nfl.html">Enter 4DK NFL</a>
          </div>
        </article>
        <aside class="home-v2-side">
          <a class="home-v2-side-card" href="nfl.html#mvp-watch">
            <small>NFL • UPDATED</small>
            <b>MVP Watch: Week 1 Final Board</b>
            <span>Josh Allen leads. Lamar, Caleb and Purdy are right behind him. Kenneth Walker crashes the Top 10.</span>
            <strong>See the Top 10 →</strong>
          </a>
          <a class="home-v2-side-card" href="nfl.html#rookie-watch">
            <small>NFL • UPDATED</small>
            <b>Rookie Watch: Delane Jumps In</b>
            <span>The full Week 1 rookie board after Monday Night Football.</span>
            <strong>See Rookie Watch →</strong>
          </a>
          <a class="home-v2-side-card" href="nfl-sunday-recap-week1.html">
            <small>NFL • SUNDAY RECAP</small>
            <b>Week 1 Made a Statement</b>
            <span>Chicago explodes. Lamar + Henry dominate. The Giants open a new era.</span>
            <strong>Read Sunday Recap →</strong>
          </a>
          <a class="home-v2-side-card" href="mamba-file-002-1996-draft.html">
            <small>MAMBA FILES • 002</small>
            <b>The 1996 Draft, 30 Years Later</b>
            <span>Kobe at 13 and a class that reshaped the league.</span>
            <strong>Open the File →</strong>
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
            <span class="home-v2-desk-kicker">4DK NFL • WEEK 1</span>
            <h3>The League<br>Already Moved.</h3>
            <p>Monday finished the opening week. The Chiefs jumped to the top of the power board, the MVP race got its first real shape and the rookie board has a new prime-time riser.</p>
            <div class="home-v2-desk-list">
              <a href="nfl-mnf-recap-week1.html"><small>MONDAY</small><b>Chiefs 31, Broncos 10 — The King Is Back</b><span>→</span></a>
              <a href="nfl.html#mvp-watch"><small>TUESDAY</small><b>Top 10 MVP Watch — Week 1 Final</b><span>→</span></a>
              <a href="nfl.html#rookie-watch"><small>TUESDAY</small><b>Top 10 Rookie Watch — Week 1 Final</b><span>→</span></a>
              <a href="nfl-sunday-recaps.html"><small>WEEKLY</small><b>Sunday NFL Recaps</b><span>→</span></a>
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
          <p>Two signature roster games, one place. Basketball perfection or football perfection — pick your challenge.</p>
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
        </div>
      </div>`;
    sports.after(section);
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
      'Chiefs dominate Denver 31–10',
      'NFL MVP + Rookie Watch updated',
      '1996 Draft: Mamba File 002',
      '2026–27 NBA Season Preview',
      'Classic Albums Revisited'
    ];
    ticker.innerHTML = items.map(x => `<span><span class="dot">●</span> ${x}</span>`).join('');
    ticker.dataset.v2Updated = '1';
  }

  function apply(){
    buildLead();
    buildJump();
    buildSports();
    buildInteractive();
    markVault();
    buildStudio();
    updateTicker();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  // Existing 4DK revamp JS is injected dynamically by script.js.
  // Run a second pass after it has had time to add its front-cover/latest modules.
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();
