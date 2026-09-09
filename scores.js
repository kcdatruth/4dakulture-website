(() => {
  const root = document.querySelector('[data-score-ticker]');
  if (!root) return;

  const track = root.querySelector('[data-score-track]');
  const refreshBtn = root.querySelector('[data-score-refresh]');
  const liveRegion = root.querySelector('[data-score-live-region]');
  let timer = null;

  const SPORTS = [
    { league:'NFL',  path:'football/nfl' },
    { league:'NBA',  path:'basketball/nba' },
    { league:'MLB',  path:'baseball/mlb' },
    { league:'NHL',  path:'hockey/nhl' },
    { league:'WNBA', path:'basketball/wnba' },
    { league:'NCAAF',path:'football/college-football' },
    { league:'NCAAM',path:'basketball/mens-college-basketball' },
    { league:'NCAAW',path:'basketball/womens-college-basketball' }
  ];

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

  function compactDate(dayKey){
    return dayKey.replaceAll('-','');
  }

  function scoreValue(competitor){
    const score = competitor?.score;
    if(score == null) return '';
    if(typeof score === 'object') return score.displayValue ?? score.value ?? '';
    return String(score);
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

  function normalizeEvent(event, league){
    const competition = event?.competitions?.[0];
    if(!competition) return null;

    const competitors = competition.competitors || [];
    const home = competitors.find(c => c.homeAway === 'home') || competitors[0];
    const away = competitors.find(c => c.homeAway === 'away') || competitors[1];
    if(!home || !away) return null;

    const status = event.status || competition.status || {};
    const type = status.type || {};
    const state = type.state || (type.completed ? 'post' : 'pre');

    let statusText = '';
    if(state === 'in'){
      statusText = type.shortDetail || type.detail || status.displayClock || 'LIVE';
    }else if(state === 'post'){
      statusText = 'FINAL';
    }

    return {
      id:String(event.id || ''),
      league,
      state,
      statusText,
      startTime:event.date || competition.date || '',
      away:{
        abbr:away.team?.abbreviation || away.team?.shortDisplayName || 'AWAY',
        score:scoreValue(away)
      },
      home:{
        abbr:home.team?.abbreviation || home.team?.shortDisplayName || 'HOME',
        score:scoreValue(home)
      }
    };
  }

  function sortGames(a,b){
    const rank = {in:0, pre:1, post:2};
    const diff = (rank[a.state] ?? 9) - (rank[b.state] ?? 9);
    if(diff) return diff;

    const timeDiff = new Date(a.startTime || 0) - new Date(b.startTime || 0);
    if(timeDiff) return timeDiff;

    return String(a.league).localeCompare(String(b.league));
  }

  async function browserAllGames(){
    const date = compactDate(localDateKey());

    const settled = await Promise.allSettled(
      SPORTS.map(async sport => {
        // High limit so college slates are not chopped at 80/100 games.
        const endpoint = `https://site.api.espn.com/apis/site/v2/sports/${sport.path}/scoreboard?dates=${date}&limit=500`;
        const res = await fetch(endpoint, {cache:'no-store'});
        if(!res.ok) throw new Error(`${sport.league} ${res.status}`);
        const data = await res.json();
        return (data.events || [])
          .map(event => normalizeEvent(event, sport.league))
          .filter(Boolean);
      })
    );

    return settled
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value)
      .sort(sortGames);
  }

  function gameKey(game){
    if(game?.id) return `${game.league}:${game.id}`;
    return [
      game?.league || '',
      game?.away?.abbr || '',
      game?.home?.abbr || '',
      game?.startTime || ''
    ].join(':');
  }

  function mergeGames(...lists){
    const merged = new Map();

    lists.flat().forEach(game => {
      if(!game) return;
      const key = gameKey(game);
      const prev = merged.get(key);

      // Prefer whichever copy has a live/final state or actual score data.
      if(!prev){
        merged.set(key, game);
        return;
      }

      const prevScore = (prev.away?.score !== '' || prev.home?.score !== '');
      const nextScore = (game.away?.score !== '' || game.home?.score !== '');
      const prevWeight = (prev.state === 'in' ? 3 : prev.state === 'post' ? 2 : 1) + (prevScore ? 1 : 0);
      const nextWeight = (game.state === 'in' ? 3 : game.state === 'post' ? 2 : 1) + (nextScore ? 1 : 0);

      if(nextWeight >= prevWeight) merged.set(key, game);
    });

    return [...merged.values()].sort(sortGames);
  }

  function formatStatus(game){
    if(game.state === 'in') return game.statusText || 'LIVE';
    if(game.state === 'post') return 'FINAL';
    return formatStart(game.startTime);
  }

  function renderGame(game){
    const awayScore = game.away?.score ?? '';
    const homeScore = game.home?.score ?? '';

    // Scheduled games should read cleanly as TEAM @ TEAM • TIME, not 0–0.
    const hasScore = game.state !== 'pre' && (awayScore !== '' || homeScore !== '');

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
    if(liveCount) root.classList.add('has-live');

    const html = games.map(renderGame).join('');
    track.innerHTML = html + html;

    // Keep a consistent readable scroll speed no matter how many games are on the slate.
    requestAnimationFrame(() => {
      const halfWidth = Math.max(1, track.scrollWidth / 2);
      const pixelsPerSecond = 62;
      const duration = Math.max(32, halfWidth / pixelsPerSecond);
      root.style.setProperty('--score-duration', `${duration.toFixed(1)}s`);
      root.classList.add('is-ready');
    });

    liveRegion.textContent = `${games.length} games in today's 4DK Live ticker.`;
  }

  async function loadScores(){
    refreshBtn.disabled = true;

    let primaryGames = [];
    let directGames = [];
    let primaryWorked = false;
    let directWorked = false;

    try{
      const date = localDateKey();
      const res = await fetch(`/api/scores?date=${encodeURIComponent(date)}`, {cache:'no-store'});
      if(res.ok){
        const data = await res.json();
        primaryGames = Array.isArray(data.games) ? data.games : [];
        primaryWorked = true;
      }
    }catch(err){
      console.warn('4DK score ticker Worker feed failed:', err);
    }

    // Always ask the league scoreboards too. This fills in games the Worker may cap.
    try{
      directGames = await browserAllGames();
      directWorked = true;
    }catch(err){
      console.warn('4DK direct scoreboard feed failed:', err);
    }

    try{
      if(primaryWorked || directWorked){
        setTicker(mergeGames(primaryGames, directGames));
      }else{
        throw new Error('All score feeds failed');
      }
    }catch(err){
      console.warn('4DK score ticker failed:', err);
      root.classList.remove('is-ready','has-live');
      track.innerHTML = '<span class="score-ticker-message">Live scores are temporarily unavailable.</span>';
      liveRegion.textContent = 'Live scores are temporarily unavailable.';
    }finally{
      refreshBtn.disabled = false;
    }
  }

  refreshBtn.addEventListener('click', loadScores);
  loadScores();

  // Live score refresh every 30 seconds.
  timer = setInterval(loadScores, 30000);

  window.addEventListener('pagehide', () => {
    if(timer) clearInterval(timer);
  }, {once:true});
})();
