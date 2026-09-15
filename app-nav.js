(() => {
  const isStandalone = () =>
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://');

  if (!isStandalone() || document.querySelector('.fourdk-app-nav')) return;

  document.documentElement.classList.add('fourdk-app-mode');

  const cleanPath = (location.pathname || '/').toLowerCase();
  const section = cleanPath.endsWith('/nba.html') || cleanPath.includes('/nba-') ||
      cleanPath.includes('/king-files') || cleanPath.includes('/mamba-files') ||
      cleanPath.includes('/mamba-file-') || cleanPath.includes('/the-answer-files') ? 'nba'
    : cleanPath.endsWith('/nfl.html') || cleanPath.includes('/nfl-') || cleanPath.includes('/afc-') || cleanPath.includes('/nfc-') ? 'nfl'
    : cleanPath.endsWith('/hiphop.html') || cleanPath.includes('hiphop') || cleanPath.includes('rap') || cleanPath.includes('album') || cleanPath.includes('music') ? 'music'
    : cleanPath === '/' || cleanPath.endsWith('/index.html') ? 'home'
    : 'more';

  const nav = document.createElement('nav');
  nav.className = 'fourdk-app-nav';
  nav.setAttribute('aria-label', '4 Da Kulture app navigation');
  nav.innerHTML = `
    <a href="/" data-fourdk-tab="home" aria-label="Home">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>
      <span>Home</span>
    </a>
    <a href="/nba.html" data-fourdk-tab="nba" aria-label="NBA">
      <span class="fourdk-ball" aria-hidden="true">🏀</span><span>NBA</span>
    </a>
    <a href="/nfl.html" data-fourdk-tab="nfl" aria-label="NFL">
      <span class="fourdk-ball" aria-hidden="true">🏈</span><span>NFL</span>
    </a>
    <a href="/hiphop.html" data-fourdk-tab="music" aria-label="Music">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>
      <span>Music</span>
    </a>
    <button type="button" data-fourdk-more aria-label="More sections" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></svg>
      <span>More</span>
    </button>`;

  const backdrop = document.createElement('div');
  backdrop.className = 'fourdk-more-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  const sheet = document.createElement('section');
  sheet.className = 'fourdk-more-sheet';
  sheet.setAttribute('aria-label', 'More 4 Da Kulture sections');
  sheet.innerHTML = `
    <div class="fourdk-more-handle"></div>
    <div class="fourdk-more-head">
      <div class="fourdk-more-brand">
        <img src="/4dk-icon-192.png" alt="" aria-hidden="true">
        <div><strong>4 DA KULTURE</strong><span>More from the Kulture</span></div>
      </div>
      <button class="fourdk-more-close" type="button" aria-label="Close more menu">×</button>
    </div>
    <div class="fourdk-more-grid">
      <a href="/magazine.html">Magazine <span>›</span></a>
      <a href="/throwback.html">Throwback <span>›</span></a>
      <a href="/classic-albums.html">Classic Albums <span>›</span></a>
      <a href="/king-files.html">The King Files <span>›</span></a>
      <a href="/podcast.html">Podcast <span>›</span></a>
      <button type="button" class="fourdk-push-control" data-fourdk-push-control>Notifications <span data-fourdk-push-state>Set up ›</span></button>
      <a href="/about.html">About 4DK <span>›</span></a>
    </div>`;

  document.body.append(backdrop, sheet, nav);

  nav.querySelector(`[data-fourdk-tab="${section}"]`)?.classList.add('active');
  if (section === 'more') nav.querySelector('[data-fourdk-more]')?.classList.add('active');

  const moreButton = nav.querySelector('[data-fourdk-more]');
  const closeButton = sheet.querySelector('.fourdk-more-close');
  const openMore = () => {
    document.documentElement.classList.add('fourdk-more-open');
    moreButton?.setAttribute('aria-expanded', 'true');
  };
  const closeMore = () => {
    document.documentElement.classList.remove('fourdk-more-open');
    moreButton?.setAttribute('aria-expanded', 'false');
  };

  moreButton?.addEventListener('click', () => {
    document.documentElement.classList.contains('fourdk-more-open') ? closeMore() : openMore();
  });
  backdrop.addEventListener('click', closeMore);
  closeButton?.addEventListener('click', closeMore);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMore(); });



  const pushControl = sheet.querySelector('[data-fourdk-push-control]');
  const pushState = sheet.querySelector('[data-fourdk-push-state]');
  const renderPushState = (state = window.FourDKPush?.status?.() || {}) => {
    if (!pushState) return;
    if (state.permission === 'denied') pushState.textContent = 'Blocked ›';
    else if (state.optedIn) pushState.textContent = 'On ✓';
    else if (state.ready) pushState.textContent = 'Off ›';
    else pushState.textContent = 'Set up ›';
  };
  renderPushState();
  window.addEventListener('fourdk:push-status', event => renderPushState(event.detail || {}));
  pushControl?.addEventListener('click', async () => {
    if (!window.FourDKPush) {
      pushState.textContent = 'Loading…';
      setTimeout(() => renderPushState(), 1200);
      return;
    }
    const state = window.FourDKPush.status();
    if (state.optedIn) {
      await window.FourDKPush.turnOff();
    } else {
      await window.FourDKPush.request();
    }
    renderPushState();
  });

  // Make taps on same-site links feel app-like and close the sheet immediately.
  sheet.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMore));
})();


/* ==========================================================
   THE KING FILES — 4DK DISCOVERY WIRING
   Add-only integration for Home, NBA and Throwback.
   This does not replace or remove any existing content.
   ========================================================== */
(() => {
  const kingUrl = 'king-files.html';
  const path = (location.pathname || '/').toLowerCase();
  const isHome = path === '/' || path.endsWith('/index.html');
  const isNBA = path.endsWith('/nba.html');
  const isThrowback = path.endsWith('/throwback.html');

  const addStyles = () => {
    if (document.getElementById('fourdk-king-files-wiring-styles')) return;
    const style = document.createElement('style');
    style.id = 'fourdk-king-files-wiring-styles';
    style.textContent = `
      .king-files-home-card{
        position:relative!important;
        overflow:hidden!important;
        border-top-color:#d7ad55!important;
        background:
          radial-gradient(circle at 88% 12%,rgba(215,173,85,.16),transparent 8rem),
          #121014!important;
        color:#fff!important
      }
      .king-files-home-card small{color:#d7ad55!important}
      .king-files-home-card span{color:#b9b1aa!important}
      .king-files-home-card:after{
        content:'23';position:absolute;right:-10px;bottom:-28px;
        font:1000 105px/.9 Arial Black,Impact,sans-serif;
        color:rgba(255,255,255,.035);pointer-events:none
      }
      @media(min-width:901px){
        .home-franchise-grid.king-files-expanded{
          grid-template-columns:repeat(4,minmax(0,1fr))!important
        }
      }

      .king-files-nba-promo{
        position:relative;overflow:hidden;
        padding:38px 0;
        background:
          radial-gradient(circle at 86% 18%,rgba(215,173,85,.15),transparent 17rem),
          radial-gradient(circle at 12% 78%,rgba(143,22,36,.18),transparent 20rem),
          linear-gradient(145deg,#151116,#08090a 74%);
        color:#fff;border-top:1px solid #2e2a30;border-bottom:1px solid #2e2a30
      }
      .king-files-nba-promo:after{
        content:'23';position:absolute;right:-14px;bottom:-44px;
        font:1000 clamp(130px,22vw,290px)/.8 Arial Black,Impact,sans-serif;
        letter-spacing:-.09em;color:#fff;opacity:.025;pointer-events:none
      }
      .king-files-nba-inner{
        position:relative;z-index:2;
        display:grid;grid-template-columns:minmax(0,1.25fr) minmax(240px,.75fr);
        gap:28px;align-items:end;
        padding:26px;border:1px solid #353039;
        background:rgba(11,11,13,.75);
        color:#fff;text-decoration:none
      }
      .king-files-nba-copy small,
      .king-files-nba-side small{
        display:block;color:#d7ad55;font-size:9px;font-weight:1000;
        letter-spacing:.15em;text-transform:uppercase
      }
      .king-files-nba-copy h2{
        margin:9px 0 10px;
        font:1000 clamp(45px,7vw,82px)/.82 Arial Black,Impact,sans-serif;
        letter-spacing:-.055em;text-transform:uppercase
      }
      .king-files-nba-copy h2 em{font-style:normal;color:#d7ad55}
      .king-files-nba-copy p{
        max-width:760px;margin:0;color:#c1bbb4;
        font:15px/1.5 Georgia,'Times New Roman',serif
      }
      .king-files-nba-cta{
        display:inline-block;margin-top:18px;padding:11px 14px;
        background:#8f1624;color:#fff;font-size:9px;font-weight:1000;
        letter-spacing:.1em;text-transform:uppercase
      }
      .king-files-nba-side{
        border-top:3px solid #d7ad55;padding-top:15px
      }
      .king-files-nba-side strong{
        display:block;margin:8px 0 8px;
        font:1000 29px/.92 Arial Black,Impact,sans-serif;
        text-transform:uppercase
      }
      .king-files-nba-side span{
        color:#96908a;font-size:11px;line-height:1.45
      }

      .king-player-archives{
        padding:38px 0 42px;
        background:#0c0c0e;color:#fff;
        border-top:1px solid #2d2b30;border-bottom:1px solid #2d2b30
      }
      .king-player-archives-head{
        display:flex;align-items:end;justify-content:space-between;gap:20px;
        margin-bottom:18px
      }
      .king-player-archives-head small{
        color:#d7ad55;font-size:9px;font-weight:1000;
        letter-spacing:.15em;text-transform:uppercase
      }
      .king-player-archives-head h2{
        margin:6px 0 0;
        font:1000 clamp(38px,6vw,66px)/.86 Arial Black,Impact,sans-serif;
        letter-spacing:-.055em;text-transform:uppercase
      }
      .king-player-archives-head p{
        max-width:520px;margin:0;color:#9e9892;font-size:12px;line-height:1.45
      }
      .king-player-archives-grid{
        display:grid;grid-template-columns:repeat(3,1fr);gap:10px
      }
      .king-player-archive-card{
        position:relative;overflow:hidden;min-height:220px;
        display:flex;flex-direction:column;justify-content:flex-end;
        padding:20px;border:1px solid #333138;
        color:#fff;text-decoration:none;background:#131316
      }
      .king-player-archive-card:after{
        position:absolute;right:-9px;top:-18px;
        font:1000 112px/.9 Arial Black,Impact,sans-serif;
        color:#fff;opacity:.035;pointer-events:none
      }
      .king-player-archive-card.mamba{
        background:radial-gradient(circle at 80% 15%,rgba(85,37,130,.33),transparent 10rem),#141017
      }
      .king-player-archive-card.mamba:after{content:'24'}
      .king-player-archive-card.answer{
        background:radial-gradient(circle at 80% 15%,rgba(23,52,103,.32),transparent 10rem),#10131a
      }
      .king-player-archive-card.answer:after{content:'3'}
      .king-player-archive-card.king{
        border-top:4px solid #d7ad55;
        background:
          radial-gradient(circle at 80% 15%,rgba(143,22,36,.24),transparent 10rem),
          #151216
      }
      .king-player-archive-card.king:after{content:'23'}
      .king-player-archive-card small{
        position:relative;z-index:2;color:#d7ad55;font-size:9px;
        font-weight:1000;letter-spacing:.13em;text-transform:uppercase
      }
      .king-player-archive-card strong{
        position:relative;z-index:2;display:block;margin:8px 0;
        font:1000 30px/.92 Arial Black,Impact,sans-serif;text-transform:uppercase
      }
      .king-player-archive-card span{
        position:relative;z-index:2;color:#a8a19b;font-size:11px;line-height:1.4
      }
      .king-player-archive-card b{
        position:relative;z-index:2;margin-top:17px;
        font-size:9px;letter-spacing:.09em;text-transform:uppercase
      }

      @media(max-width:760px){
        .king-files-nba-promo{padding:28px 0}
        .king-files-nba-inner{grid-template-columns:1fr;padding:20px}
        .king-files-nba-copy h2{font-size:54px}
        .king-player-archives{padding:30px 0 34px}
        .king-player-archives-head{align-items:flex-start;flex-direction:column}
        .king-player-archives-grid{
          display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:9px
        }
        .king-player-archive-card{
          flex:0 0 84%;scroll-snap-align:start;min-height:205px
        }
      }
    `;
    document.head.appendChild(style);
  };

  const addToSearch = () => {
    try {
      if (typeof siteSearchIndex !== 'undefined' &&
          !siteSearchIndex.some(item => item.url === kingUrl)) {
        siteSearchIndex.push({
          title:'The King Files',
          type:'4DK Basketball Archive',
          url:kingUrl,
          desc:'The evolving LeBron James timeline — nearly 25 years of moments, awards, failures, titles and the final GOAT debate.',
          terms:'lebron james king files goat michael jordan mj cleveland miami lakers archive basketball history'
        });
      }
    } catch (e) {}
  };

  const wireHome = () => {
    if (!isHome) return;
    const grid = document.querySelector('.home-franchise-grid');
    if (!grid) return;

    let card = grid.querySelector('[data-king-files-home]');
    if (!card) {
      card = document.createElement('a');
      card.className = 'home-franchise king-files-home-card';
      card.href = kingUrl;
      card.dataset.kingFilesHome = '';
      card.innerHTML = `
        <small>BASKETBALL HISTORY • IN DEVELOPMENT</small>
        <strong>The King Files</strong>
        <span>Nearly 25 years of LeBron — from Akron to the final GOAT verdict.</span>
        <b>Open the archive →</b>`;
    }

    const answer = grid.querySelector('a[href="the-answer-files.html"],a[href="/the-answer-files.html"]');
    const mamba = grid.querySelector('a[href="mamba-files.html"],a[href="/mamba-files.html"]');
    const anchor = answer || mamba;

    if (!card.isConnected) {
      if (anchor) anchor.after(card);
      else grid.prepend(card);
    } else if (anchor && card.previousElementSibling !== anchor) {
      anchor.after(card);
    }
    grid.classList.add('king-files-expanded');
  };

  const wireNBA = () => {
    if (!isNBA) return;

    const heroNav = document.querySelector('.nba-hero-nav');
    if (heroNav && !heroNav.querySelector('[data-king-files-nav]')) {
      const link = document.createElement('a');
      link.href = kingUrl;
      link.dataset.kingFilesNav = '';
      link.textContent = 'King Files';
      heroNav.appendChild(link);
    }

    if (document.querySelector('.king-files-nba-promo')) return;
    const pulse = document.querySelector('.nba-pulse');
    const season = document.querySelector('.nba-season-feature');
    const target = pulse || season;
    if (!target) return;

    const promo = document.createElement('section');
    promo.className = 'king-files-nba-promo';
    promo.setAttribute('aria-label','The King Files');
    promo.innerHTML = `
      <div class="shell">
        <a class="king-files-nba-inner" href="${kingUrl}">
          <div class="king-files-nba-copy">
            <small>4DK BASKETBALL HISTORY • ARCHIVE IN DEVELOPMENT</small>
            <h2>THE <em>KING</em> FILES.</h2>
            <p>High school hype. Cleveland. Miami. 3–1. Los Angeles. Records. Failures. Championships. Reinvention. We are building the complete LeBron James timeline while the final chapter is still being written.</p>
            <span class="king-files-nba-cta">ENTER THE ARCHIVE →</span>
          </div>
          <aside class="king-files-nba-side">
            <small>THE FINAL FILE</small>
            <strong>MICHAEL<br>OR LEBRON?</strong>
            <span>The GOAT verdict stays locked until the career is over and the evidence is complete.</span>
          </aside>
        </a>
      </div>`;
    target.after(promo);
  };

  const wireThrowback = () => {
    if (!isThrowback || document.querySelector('.king-player-archives')) return;
    const nbaFlashback = document.querySelector('#nba-flashback');
    if (!nbaFlashback) return;

    const section = document.createElement('section');
    section.className = 'king-player-archives';
    section.setAttribute('aria-label','4DK player archives');
    section.innerHTML = `
      <div class="shell">
        <div class="king-player-archives-head">
          <div><small>4DK PLAYER ARCHIVES</small><h2>THE FILE ROOM.</h2></div>
          <p>Not just nostalgia. Full player timelines built one season, moment and argument at a time.</p>
        </div>
        <div class="king-player-archives-grid">
          <a class="king-player-archive-card mamba" href="mamba-files.html">
            <small>BASKETBALL HISTORY</small>
            <strong>THE MAMBA FILES</strong>
            <span>Kobe seasons, moments, rivalries and the history around them.</span>
            <b>OPEN THE FILES →</b>
          </a>
          <a class="king-player-archive-card answer" href="the-answer-files.html">
            <small>BASKETBALL + CULTURE</small>
            <strong>THE ANSWER FILES</strong>
            <span>Allen Iverson's game, style, cultural weight and complete timeline.</span>
            <b>OPEN THE FILES →</b>
          </a>
          <a class="king-player-archive-card king" href="${kingUrl}">
            <small>IN DEVELOPMENT • CAREER ACTIVE</small>
            <strong>THE KING FILES</strong>
            <span>Nearly 25 years of LeBron James history — with the final GOAT verdict still unwritten.</span>
            <b>ENTER THE ARCHIVE →</b>
          </a>
        </div>
      </div>`;
    nbaFlashback.parentNode.insertBefore(section, nbaFlashback);
  };

  const apply = () => {
    addStyles();
    addToSearch();
    wireHome();
    wireNBA();
    wireThrowback();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  // Some 4DK cards are added dynamically by script.js / 4dk-revamp.js.
  // Re-run safely so The King Files lands in the right place without duplicates.
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2200);
})();
