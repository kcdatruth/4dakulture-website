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


  function normalizeESPNEvent(event){
    const competition = event?.competitions?.[0];
    if(!competition) return null;

    const competitors = competition.competitors || [];
    const home = competitors.find(c => c.homeAway === 'home') || competitors[0];
    const away = competitors.find(c => c.homeAway === 'away') || competitors[1];
    if(!home || !away) return null;

    const status = event.status || competition.status || {};
    const type = status.type || {};
    const state = type.state || (type.completed ? 'post' : 'pre');

    const scoreValue = competitor => {
      const score = competitor?.score;
      if(score == null) return '';
      if(typeof score === 'object') return score.displayValue ?? score.value ?? '';
      return String(score);
    };

    let statusText = '';
    if(state === 'post') statusText = 'FINAL';
    else if(state === 'in'){
      const period = status.period || competition.status?.period;
      const clock = status.displayClock || competition.status?.displayClock || '';
      statusText = period && clock ? `Q${period} ${clock}` : (type.shortDetail || type.detail || 'LIVE');
    }else{
      statusText = type.shortDetail || type.detail || 'Scheduled';
    }

    return {
      id: String(event.id || ''),
      season: event.season?.year || new Date().getFullYear(),
      week: event.week?.number || null,
      state,
      statusText,
      startTime: event.date || competition.date || '',
      away: {
        id: String(away.team?.id || away.id || ''),
        abbr: away.team?.abbreviation || away.team?.shortDisplayName || 'AWAY',
        name: away.team?.displayName || away.team?.shortDisplayName || 'Away',
        score: scoreValue(away)
      },
      home: {
        id: String(home.team?.id || home.id || ''),
        abbr: home.team?.abbreviation || home.team?.shortDisplayName || 'HOME',
        name: home.team?.displayName || home.team?.shortDisplayName || 'Home',
        score: scoreValue(home)
      }
    };
  }

  async function loadDirectFromESPN(){
    const endpoint = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
    const response = await fetch(endpoint, {cache:'no-store', mode:'cors'});
    if(!response.ok) throw new Error(`ESPN HTTP ${response.status}`);

    const data = await response.json();
    const allGames = (data.events || [])
      .map(normalizeESPNEvent)
      .filter(Boolean)
      .sort((a,b) => new Date(a.startTime || 0) - new Date(b.startTime || 0));

    const counts = new Map();
    allGames.forEach(game => {
      if(game.week != null) counts.set(game.week,(counts.get(game.week)||0)+1);
    });

    const week = [...counts.entries()].sort((a,b) => b[1]-a[1])[0]?.[0] ?? allGames[0]?.week ?? null;
    const games = week == null ? allGames : allGames.filter(game => game.week === week);

    return {
      updatedAt: new Date().toISOString(),
      season: games[0]?.season || allGames[0]?.season || new Date().getFullYear(),
      week,
      games
    };
  }

  async function load(){
    statusEl.textContent = 'Loading this week’s matchups…';

    try{
      const response = await fetch('/api/nfl-pickem', {cache:'no-store'});
      if(!response.ok) throw new Error(`4DK API HTTP ${response.status}`);

      const apiPayload = await response.json();
      if(!apiPayload?.games?.length) throw new Error('4DK API returned no games');

      payload = apiPayload;
    }catch(workerError){
      console.warn('4DK Pickem Worker fallback:', workerError);

      try{
        payload = await loadDirectFromESPN();
      }catch(espnError){
        console.error('4DK Pickem ESPN fallback:', espnError);
        statusEl.textContent = 'Weekly Pick’em is temporarily unavailable. Try again shortly.';
        gamesEl.innerHTML = '';
        return;
      }
    }

    loadPicks();
    render();
  }

  load();
})();

/* 4DK 17–0 Challenge discoverability layer — added without replacing nfl.html */
(() => {
  const href = '17-0.html';

  const board = document.querySelector('.nfl-v2-board');
  if(board && !board.querySelector('[data-17-0-link]')){
    const row = document.createElement('a');
    row.className = 'nfl-v2-board-row live';
    row.href = href;
    row.setAttribute('data-17-0-link','1');
    row.innerHTML = '<div><small>4DK INTERACTIVE</small><b>17–0 CHALLENGE</b></div><span>PLAY →</span>';
    const foot = board.querySelector('.nfl-v2-board-foot');
    board.insertBefore(row, foot || null);
  }

  const nav = document.querySelector('.nfl-v2-nav');
  if(nav && !nav.querySelector('a[href="17-0.html"]')){
    const link = document.createElement('a');
    link.href = href;
    link.textContent = '17–0 Challenge';
    nav.appendChild(link);
  }

  const grid = document.querySelector('#season-board .board-grid');
  if(grid && !grid.querySelector('[data-17-0-card]')){
    const card = document.createElement('article');
    card.className = 'nfl-mini-card lombardi';
    card.setAttribute('data-17-0-card','1');
    card.innerHTML = `
      <span class="nfl-label">4DK Interactive</span>
      <div class="mini-icon">17–0</div>
      <h3>THE 17–0 CHALLENGE</h3>
      <p>Build a prime-season all-time NFL roster across offense and defense, then see if the fit is good enough to survive a perfect season.</p>
      <a class="nfl-coming" href="${href}">Play the challenge →</a>
    `;
    grid.prepend(card);
  }
})();