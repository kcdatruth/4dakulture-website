
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

  function formatStart(iso){
    if(!iso) return 'UPCOMING';
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return 'UPCOMING';
    return new Intl.DateTimeFormat(undefined,{
      weekday:'short',
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
      track.innerHTML = '<span class="score-ticker-message">No live or scheduled games right now. Check back on game day.</span>';
      liveRegion.textContent = 'No live games right now.';
      return;
    }

    const liveCount = games.filter(g => g.state === 'in').length;
    if(liveCount) root.classList.add('has-live');

    const html = games.map(renderGame).join('');
    // Duplicate the strip so the animation loops smoothly.
    track.innerHTML = html + html;

    const duration = Math.max(26, Math.min(72, games.length * 7));
    root.style.setProperty('--score-duration', `${duration}s`);

    requestAnimationFrame(() => root.classList.add('is-ready'));
    liveRegion.textContent = liveCount
      ? `${liveCount} live game${liveCount === 1 ? '' : 's'} showing in the 4DK Live ticker.`
      : `${games.length} scheduled or recently completed game${games.length === 1 ? '' : 's'} showing in the 4DK Live ticker.`;
  }

  async function loadScores(){
    refreshBtn.disabled = true;
    try{
      const res = await fetch('/api/scores', {cache:'no-store'});
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
  timer = setInterval(loadScores, 30000);

  window.addEventListener('pagehide', () => {
    if(timer) clearInterval(timer);
  }, {once:true});
})();
