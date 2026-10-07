(() => {
  const path = (location.pathname || '/').toLowerCase();
  const isHome = path === '/' || path.endsWith('/index.html');
  if (!isHome || window.__fourdkWeek5HeadlinesHomeLink) return;
  window.__fourdkWeek5HeadlinesHomeLink = true;

  const ARTICLE = 'nfl-week5-five-major-headlines.html';

  function updateBoard(){
    const desk = document.querySelector('.home-v2-desk.nfl');
    if (!desk) return;

    const links = [...desk.querySelectorAll('.home-v2-desk-list a')];
    const week5 = links.find(a => {
      const small = a.querySelector('small');
      return small && small.textContent.trim().toUpperCase() === 'WEEK 5';
    });

    if (week5) {
      week5.href = ARTICLE;
      const small = week5.querySelector('small');
      const b = week5.querySelector('b');
      if (small) small.textContent = 'NEXT • WEEK 5';
      if (b) b.textContent = '5 Major Headlines Heading Into Week 5';
      week5.dataset.week5Headlines = '1';
    }
  }

  function updateShelf(){
    const cards = [...document.querySelectorAll('.fourdk-current-shelf-card')];
    const card = cards.find(a => {
      const small = a.querySelector('small');
      return small && small.textContent.trim().toUpperCase() === 'WEEK 5';
    });

    if (card) {
      card.href = ARTICLE;
      const small = card.querySelector('small');
      const b = card.querySelector('b');
      const span = card.querySelector('span');
      if (small) small.textContent = 'WEEK 5 • 5 MAJOR HEADLINES';
      if (b) b.textContent = '49ers–Seahawks Leads Five Big Questions';
      if (span) span.textContent = 'Buffalo–L.A., Vegas in New England, surprise teams and the injury test.';
      card.dataset.week5Headlines = '1';
    }
  }

  function updateTicker(){
    const t = document.querySelector('.ticker-track');
    if (!t || t.querySelector('[data-week5-headlines-ticker]')) return;
    const item = document.createElement('span');
    item.dataset.week5HeadlinesTicker = '1';
    item.innerHTML = '<span class="dot">●</span> NEW: 5 MAJOR NFL HEADLINES HEADING INTO WEEK 5';
    t.appendChild(item);
  }

  function apply(){
    updateBoard();
    updateShelf();
    updateTicker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  [150, 500, 1000, 1800, 3500, 6500, 10000].forEach(ms => setTimeout(apply, ms));

  let timer = 0;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(apply, 100);
  }).observe(document.documentElement, {subtree:true, childList:true});
})();
