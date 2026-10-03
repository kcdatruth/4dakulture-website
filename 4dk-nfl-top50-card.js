(() => {
  const PAGE = '/top-50-nfl-players-2026.html';

  function addTop50Card() {
    if (!/\/(?:nfl\.html)?(?:[?#].*)?$/.test(location.pathname + location.search + location.hash) &&
        location.pathname !== '/nfl.html') return;

    const board = document.querySelector('.nfl-v2-board');
    if (!board || board.querySelector('[data-4dk-nfl-top50]')) return;

    const foot = board.querySelector('.nfl-v2-board-foot');

    const card = document.createElement('a');
    card.className = 'nfl-v2-board-row live';
    card.href = PAGE;
    card.setAttribute('data-4dk-nfl-top50', 'true');
    card.innerHTML = `
      <div>
        <small>WEEK 4 EDITION • 50 → 1</small>
        <b>4DK TOP 50 NFL PLAYERS</b>
      </div>
      <span>READ RANKINGS →</span>
    `;

    if (foot) board.insertBefore(card, foot);
    else board.appendChild(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTop50Card, { once: true });
  } else {
    addTop50Card();
  }

  // The site has a few scripts that refresh/replace current-week content.
  // Re-check briefly so the link survives any late DOM updates.
  let tries = 0;
  const timer = setInterval(() => {
    addTop50Card();
    tries += 1;
    if (tries >= 12) clearInterval(timer);
  }, 500);
})();
