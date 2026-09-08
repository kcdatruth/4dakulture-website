(() => {
  const root = document.querySelector('.nfl-pickem');
  if(!root) return;

  const gamesEl = root.querySelector('[data-pickem-games]');
  const statusEl = root.querySelector('[data-pickem-status]');
  const weekEl = root.querySelector('[data-pickem-week]');
  const countEl = root.querySelector('[data-pickem-count]');
  const totalEl = root.querySelector('[data-pickem-total]');
  const summaryEl = root.querySelector('[data-pickem-summary]');
  const clearBtn = root.querySelector('[data-pickem-clear]');

  let payload = null;
  let picks = {};

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function storageKey(){
    const season = payload?.season || '2026';
    const week = payload?.week || 'current';
    return `4dk-nfl-picks-${season}-week-${week}`;
  }

  function loadPicks(){
    try{
      picks = JSON.parse(localStorage.getItem(storageKey()) || '{}') || {};
    }catch{
      picks = {};
    }
  }

  function savePicks(){
    try{
      localStorage.setItem(storageKey(), JSON.stringify(picks));
    }catch{}
  }

  function formatKickoff(iso){
    if(!iso) return 'TBD';
    const date = new Date(iso);
    if(Number.isNaN(date.getTime())) return 'TBD';
    return new Intl.DateTimeFormat(undefined,{
      weekday:'short',
      month:'short',
      day:'numeric',
      hour:'numeric',
      minute:'2-digit'
    }).format(date);
  }

  function locked(game){
    const start = new Date(game.startTime || 0).getTime();
    return game.state !== 'pre' || (Number.isFinite(start) && Date.now() >= start);
  }

  function winnerId(game){
    if(game.state !== 'post') return '';
    const awayScore = Number(game.away.score);
    const homeScore = Number(game.home.score);
    if(!Number.isFinite(awayScore) || !Number.isFinite(homeScore) || awayScore === homeScore) return '';
    return awayScore > homeScore ? game.away.id : game.home.id;
  }

  function resultText(game){
    const pick = picks[game.id];
    if(!pick) return locked(game) ? 'No pick submitted' : 'Tap a team to make your pick';
    if(game.state !== 'post') return locked(game) ? 'Pick locked' : 'Your pick — tap the other team to change it';

    const win = winnerId(game);
    if(!win) return 'Final';
    return pick === win ? '✓ You called it' : '✕ Missed this one';
  }

  function teamButton(game, team, side){
    const pick = picks[game.id];
    const isSelected = pick === team.id;
    const isLocked = locked(game);
    const winner = winnerId(game);
    const classes = [
      'pickem-team',
      isSelected ? 'selected' : '',
      isLocked ? 'locked' : '',
      winner === team.id ? 'winner' : '',
      game.state === 'post' && isSelected && pick === winner ? 'correct' : '',
      game.state === 'post' && isSelected && winner && pick !== winner ? 'wrong' : ''
    ].filter(Boolean).join(' ');

    return `
      <button
        type="button"
        class="${classes}"
        data-game="${esc(game.id)}"
        data-team="${esc(team.id)}"
        ${isLocked ? 'disabled' : ''}
        aria-pressed="${isSelected ? 'true' : 'false'}"
        aria-label="Pick ${esc(team.name)} to beat ${esc(side === 'away' ? game.home.name : game.away.name)}"
      >
        <span class="pickem-abbr">${esc(team.abbr)}</span>
        <span class="pickem-name">${esc(team.name)}</span>
        <span class="pickem-score">${game.state !== 'pre' ? esc(team.score) : ''}</span>
      </button>`;
  }

  function render(){
    if(!payload) return;

    const games = payload.games || [];
    weekEl.textContent = payload.week ? `NFL WEEK ${payload.week}` : 'NFL THIS WEEK';
    totalEl.textContent = String(games.length);

    const validIds = new Set(games.map(g => g.id));
    Object.keys(picks).forEach(id => {
      if(!validIds.has(id)) delete picks[id];
    });

    const count = games.filter(g => picks[g.id]).length;
    countEl.textContent = String(count);

    const completed = games.filter(g => g.state === 'post' && winnerId(g));
    const correct = completed.filter(g => picks[g.id] === winnerId(g)).length;

    if(completed.length){
      summaryEl.textContent = `${count}/${games.length} picked • ${correct}/${completed.length} correct so far`;
    }else if(count === games.length && games.length){
      summaryEl.textContent = `Card complete — ${count}/${games.length} picks locked in on this device.`;
    }else{
      summaryEl.textContent = `${count}/${games.length} picks made. Change any selection before kickoff.`;
    }

    if(!games.length){
      gamesEl.innerHTML = '';
      statusEl.textContent = 'No NFL matchups are available for the current week yet.';
      return;
    }

    statusEl.textContent = payload.week
      ? `2026 NFL Week ${payload.week} • ${games.length} games on the card`
      : `${games.length} games on the card`;

    gamesEl.innerHTML = games.map(game => {
      const statusClass = game.state === 'in' ? 'live' : (game.state === 'post' ? 'final' : '');
      const status = game.state === 'pre' ? formatKickoff(game.startTime) : (game.statusText || game.state);
      const pick = picks[game.id];
      const win = winnerId(game);
      const resultClass = game.state === 'post' && pick
        ? (pick === win ? 'correct' : 'wrong')
        : '';

      return `
        <article class="pickem-game">
          <div class="pickem-game-head">
            <span>${esc(formatKickoff(game.startTime))}</span>
            <span class="${statusClass}">${esc(status)}</span>
          </div>
          <div class="pickem-matchup">
            ${teamButton(game, game.away, 'away')}
            <div class="pickem-vs">@</div>
            ${teamButton(game, game.home, 'home')}
          </div>
          <div class="pickem-result ${resultClass}">${esc(resultText(game))}</div>
        </article>`;
    }).join('');

    gamesEl.querySelectorAll('.pickem-team:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        picks[btn.dataset.game] = btn.dataset.team;
        savePicks();
        render();
      });
    });
  }

  clearBtn?.addEventListener('click', () => {
    if(!payload) return;

    // Don't erase picks for games that have already kicked off.
    const openGameIds = new Set(
      (payload.games || []).filter(game => !locked(game)).map(game => game.id)
    );
    Object.keys(picks).forEach(gameId => {
      if(openGameIds.has(gameId)) delete picks[gameId];
    });
    savePicks();
    render();
  });

  async function load(){
    try{
      const response = await fetch('/api/nfl-pickem', {cache:'no-store'});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      payload = await response.json();
      loadPicks();
      render();
    }catch(error){
      console.error('4DK Pickem:', error);
      statusEl.textContent = 'Weekly Pick’em is temporarily unavailable. Try again shortly.';
      gamesEl.innerHTML = '';
    }
  }

  load();
})();