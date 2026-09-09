(() => {
  const root = document.querySelector('[data-score-ticker]');
  if (!root) return;

  const track = root.querySelector('[data-score-track]');
  const refreshBtn = root.querySelector('[data-score-refresh]');
  const liveRegion = root.querySelector('[data-score-live-region]');
  let timer = null;

  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function localDateKey(){
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function formatStart(iso){
    if(!iso) return 'UPCOMING';
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return 'UPCOMING';
    return new Intl.DateTimeFormat(undefined,{
      hour:'numeric',
      minute:'2-digit'
    }).format(d);
  }

  function formatStatus(game){
    if(game.state === 'in') return game.statusText || 'LIVE';
    if(game.state === 'post') return 'FINAL';
    return formatStart(game.startTime);
  }

  function renderGame(game){
    const awayScore = game.away?.score ?? '';
    const homeScore = game.home?.score ?? '';
    const hasScore = awayScore !== '' || homeScore !== '';

    return `
      <div class="score-game ${game.state === 'in' ? 'live' : ''}">
        <span class="score-league">${esc(game.league)}</span>
        <span class="score-team">${esc(game.away?.abbr || 'AWAY')}${hasScore ? `<b>${esc(awayScore)}</b>` : ''}</span>
        <span class="score-at">${game.state === 'pre' ? '@' : '–'}</span>
        <span class="score-team">${esc(game.home?.abbr || 'HOME')}${hasScore ? `<b>${esc(homeScore)}</b>` : ''}</span>
        <span class="score-status">${esc(formatStatus(game))}</span>
      </div>
    `;
  }

  function setTicker(games){
    root.classList.remove('is-ready','has-live');

    if(!Array.isArray(games) || games.length === 0){
      track.innerHTML = '<span class="score-ticker-message">No games scheduled in tracked leagues today.</span>';
      liveRegion.textContent = 'No games scheduled in tracked leagues today.';
      return;
    }

    const liveCount = games.filter(g => g.state === 'in').length;
    const upcomingCount = games.filter(g => g.state === 'pre').length;
    const finalCount = games.filter(g => g.state === 'post').length;

    if(liveCount) root.classList.add('has-live');

    const html = games.map(renderGame).join('');

    // Duplicate the strip so the animation loops smoothly.
    track.innerHTML = html + html;

    const duration = Math.max(30, Math.min(120, games.length * 5));
    root.style.setProperty('--score-duration', `${duration}s`);

    requestAnimationFrame(() => root.classList.add('is-ready'));

    const parts = [];
    if(liveCount) parts.push(`${liveCount} live`);
    if(upcomingCount) parts.push(`${upcomingCount} upcoming`);
    if(finalCount) parts.push(`${finalCount} final`);

    liveRegion.textContent = `${parts.join(', ')} game${games.length === 1 ? '' : 's'} in today's 4DK Live ticker.`;
  }

  async function loadScores(){
    refreshBtn.disabled = true;

    try{
      // Send the visitor's local calendar date so "today" means today where they are.
      const date = localDateKey();
      const res = await fetch(`/api/scores?date=${encodeURIComponent(date)}`, {cache:'no-store'});

      if(!res.ok) throw new Error(`Score feed returned ${res.status}`);

      const data = await res.json();
      setTicker(data.games || []);
    }catch(err){
      console.warn('4DK score ticker:', err);
      root.classList.remove('is-ready','has-live');
      track.innerHTML = '<span class="score-ticker-message">Live scores are temporarily unavailable.</span>';
      liveRegion.textContent = 'Live scores are temporarily unavailable.';
    }finally{
      refreshBtn.disabled = false;
    }
  }

  refreshBtn.addEventListener('click', loadScores);
  loadScores();

  // Refresh every 30 seconds so live scores stay current.
  timer = setInterval(loadScores, 30000);

  window.addEventListener('pagehide', () => {
    if(timer) clearInterval(timer);
  }, {once:true});
})();
