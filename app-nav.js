(() => {
  const isStandalone = () =>
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://');

  if (!isStandalone() || document.querySelector('.fourdk-app-nav')) return;

  document.documentElement.classList.add('fourdk-app-mode');

  const cleanPath = (location.pathname || '/').toLowerCase();
  const section = cleanPath.endsWith('/nba.html') || cleanPath.includes('/nba-') ? 'nba'
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
      <a href="/classic-albums.html">Classic Albums <span>›</span></a>
      <a href="/podcast.html">Podcast <span>›</span></a>
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

  // Make taps on same-site links feel app-like and close the sheet immediately.
  sheet.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMore));
})();
