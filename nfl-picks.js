/* =========================================================
   4DK NFL — Pick'em + 17–0 + Week 1 Watches + Week 2 Current Layer
   Additive season update — Sept. 18, 2026
   ========================================================= */

/* ---------- WEEKLY PICK'EM (preserved) ---------- */
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
    try{ picks = JSON.parse(localStorage.getItem(storageKey()) || '{}') || {}; }
    catch{ picks = {}; }
  }

  function savePicks(){
    try{ localStorage.setItem(storageKey(), JSON.stringify(picks)); }catch{}
  }

  function formatKickoff(iso){
    if(!iso) return 'TBD';
    const date = new Date(iso);
    if(Number.isNaN(date.getTime())) return 'TBD';
    return new Intl.DateTimeFormat(undefined,{
      weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'
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
      <button type="button" class="${classes}"
        data-game="${esc(game.id)}" data-team="${esc(team.id)}"
        ${isLocked ? 'disabled' : ''}
        aria-pressed="${isSelected ? 'true' : 'false'}"
        aria-label="Pick ${esc(team.name)} to beat ${esc(side === 'away' ? game.home.name : game.away.name)}">
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
    Object.keys(picks).forEach(id => { if(!validIds.has(id)) delete picks[id]; });

    const count = games.filter(g => picks[g.id]).length;
    countEl.textContent = String(count);
    const completed = games.filter(g => g.state === 'post' && winnerId(g));
    const correct = completed.filter(g => picks[g.id] === winnerId(g)).length;

    if(completed.length) summaryEl.textContent = `${count}/${games.length} picked • ${correct}/${completed.length} correct so far`;
    else if(count === games.length && games.length) summaryEl.textContent = `Card complete — ${count}/${games.length} picks locked in on this device.`;
    else summaryEl.textContent = `${count}/${games.length} picks made. Change any selection before kickoff.`;

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
      const resultClass = game.state === 'post' && pick ? (pick === win ? 'correct' : 'wrong') : '';
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
    const openGameIds = new Set((payload.games || []).filter(game => !locked(game)).map(game => game.id));
    Object.keys(picks).forEach(gameId => { if(openGameIds.has(gameId)) delete picks[gameId]; });
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
    }else statusText = type.shortDetail || type.detail || 'Scheduled';

    return {
      id:String(event.id || ''),
      season:event.season?.year || new Date().getFullYear(),
      week:event.week?.number || null,
      state, statusText,
      startTime:event.date || competition.date || '',
      away:{
        id:String(away.team?.id || away.id || ''),
        abbr:away.team?.abbreviation || away.team?.shortDisplayName || 'AWAY',
        name:away.team?.displayName || away.team?.shortDisplayName || 'Away',
        score:scoreValue(away)
      },
      home:{
        id:String(home.team?.id || home.id || ''),
        abbr:home.team?.abbreviation || home.team?.shortDisplayName || 'HOME',
        name:home.team?.displayName || home.team?.shortDisplayName || 'Home',
        score:scoreValue(home)
      }
    };
  }

  async function loadDirectFromESPN(){
    const endpoint = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
    const response = await fetch(endpoint,{cache:'no-store',mode:'cors'});
    if(!response.ok) throw new Error(`ESPN HTTP ${response.status}`);
    const data = await response.json();
    const allGames = (data.events || []).map(normalizeESPNEvent).filter(Boolean)
      .sort((a,b) => new Date(a.startTime||0) - new Date(b.startTime||0));

    const counts = new Map();
    allGames.forEach(game => { if(game.week != null) counts.set(game.week,(counts.get(game.week)||0)+1); });
    const week = [...counts.entries()].sort((a,b)=>b[1]-a[1])[0]?.[0] ?? allGames[0]?.week ?? null;
    return {
      updatedAt:new Date().toISOString(),
      season:allGames[0]?.season || new Date().getFullYear(),
      week,
      games:week == null ? allGames : allGames.filter(game => game.week === week)
    };
  }

  async function load(){
    statusEl.textContent = 'Loading this week’s matchups…';
    try{
      const response = await fetch('/api/nfl-pickem',{cache:'no-store'});
      if(!response.ok) throw new Error(`4DK API HTTP ${response.status}`);
      const apiPayload = await response.json();
      if(!apiPayload?.games?.length) throw new Error('4DK API returned no games');
      payload = apiPayload;
    }catch(workerError){
      console.warn('4DK Pickem Worker fallback:',workerError);
      try{ payload = await loadDirectFromESPN(); }
      catch(espnError){
        console.error('4DK Pickem ESPN fallback:',espnError);
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

/* ---------- 17–0 CHALLENGE DISCOVERABILITY (preserved) ---------- */
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
    board.insertBefore(row,foot || null);
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
      <a class="nfl-coming" href="${href}">Play the challenge →</a>`;
    grid.prepend(card);
  }
})();

/* ---------- FINAL WEEK 1 MVP + ROOKIE WATCH (preserved) ---------- */
(() => {
  const isNFL = /(^|\/)nfl(?:\.html)?$/.test(location.pathname.replace(/\/+$/,'')) || !!document.querySelector('#mvp-watch');
  if(!isNFL) return;

  const watch = document.querySelector('#mvp-watch');
  if(watch && watch.dataset.week1FinalUpdate !== 'true'){
    const existingImages = {};
    watch.querySelectorAll('.mvp-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent?.trim();
      const src = card.querySelector('.mvp-photo img')?.getAttribute('src');
      if(name && src) existingImages[name] = src;
    });

    const board = [
      {rank:1,name:'Josh Allen',meta:'QB • BUF • 334 PASS YDS • 4 TOTAL TD',note:'The Week 1 leader stays on top. Allen threw for 334, accounted for four touchdowns and finished the job with the late go-ahead strike in Buffalo’s 36–31 road win at Houston.',move:'HOLD • EARLY LEADER',cls:'hot'},
      {rank:2,name:'Lamar Jackson',meta:'QB • BAL • 324 PASS YDS • 40 RUSH YDS • 2 TOTAL TD',note:'Baltimore rolled up 506 yards in a 41–23 road win. Lamar was explosive and efficient, and the Ravens already look built to keep him in the race all season.',move:'HOLD • CONTENDER',cls:'hot'},
      {rank:3,name:'Caleb Williams',meta:'QB • CHI • 334 TOTAL YDS • 4 TOTAL TD',note:'Chicago hung 59 on Carolina and Caleb accounted for four touchdowns. The Year 3 leap looked real, and his ceiling after one week is suddenly much higher.',move:'HOLD • BIG START',cls:'up'},
      {rank:4,name:'Brock Purdy',meta:'QB • SF • 205 PASS YDS • 3 TD',note:'Purdy threw three touchdown passes and San Francisco beat the Rams 27–7. He did not need a huge yardage total because the 49ers controlled the game from start to finish.',move:'HOLD • STRONG START',cls:'hot'},
      {rank:5,name:'Jahmyr Gibbs',meta:'RB • DET • 156 RUSH YDS • 2 TD',note:'Gibbs was the engine of Detroit’s overtime escape against New Orleans. A non-quarterback needs monster production to stay this high, and 156 rushing yards with two scores qualifies.',move:'HOLD • RB PUSH',cls:'up'},
      {rank:6,name:'Trevor Lawrence',meta:'QB • JAX • 245 PASS YDS • 4 TD • 0 INT',note:'Four touchdown passes, no interceptions and a 150.6 passer rating in Jacksonville’s 34–10 win. Lawrence delivered one of the cleanest quarterback performances of the entire opening week.',move:'▲ 1 • RISING',cls:'up'},
      {rank:7,name:'Kenneth Walker III',meta:'RB • KC • 191 SCRIMMAGE YDS • 2 TD',note:'The biggest Monday-night riser. Walker ran for a career-high 173 yards, added 18 receiving yards and scored twice as Kansas City blasted Denver 31–10.',move:'NEW • 🔥 MNF RISER',cls:'hot',image:'https://a.espncdn.com/i/headshots/nfl/players/full/4567048.png'},
      {rank:8,name:'Patrick Mahomes',meta:'QB • KC • 184 PASS YDS • 3 TOTAL TD • 1 INT',note:'Kansas City made a major team statement, but Walker was the offensive headliner. Mahomes accounted for three touchdowns in his return and stays firmly on the board despite a modest passing line.',move:'▼ 2 • WINNING START',cls:'down'},
      {rank:9,name:'Derrick Henry',meta:'RB • BAL • 144 RUSH YDS • 3 TD',note:'Henry opened the year by bulldozing Indianapolis for 144 yards and three touchdowns. Lamar drives Baltimore’s MVP case, but Henry’s Week 1 impact was impossible to ignore.',move:'▼ 1 • POWER START',cls:''},
      {rank:10,name:'Joe Burrow',meta:'QB • CIN • 254 PASS YDS • 1 TD • 1 INT',note:'Cincinnati won, but Burrow was not the reason the game tilted. He stays in the Top 10 because of the ceiling and the Bengals’ 1–0 start, but he has ground to make up after Week 1.',move:'▼ 1 • SLOW START',cls:'down'}
    ];

    const headCopy = watch.querySelector('.mvp-head p');
    if(headCopy) headCopy.textContent = 'Full Week 1 board after Monday Night Football. Performance matters, but the preseason baseline, team ceiling and sustainability still count.';
    const stamp = watch.querySelector('.mvp-stamp');
    if(stamp) stamp.innerHTML = 'WEEK 1 • FINAL<br>SEPT. 15, 2026';

    const grid = watch.querySelector('.mvp-grid');
    if(grid){
      grid.innerHTML = board.map(p => {
        const img = p.image || existingImages[p.name] || '';
        return `<article class="mvp-card">
          <div class="mvp-rank">${p.rank}</div>
          <div class="mvp-photo">${img ? `<img src="${img}" alt="${p.name}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div><h3>${p.name}</h3><div class="mvp-meta">${p.meta}</div><div class="mvp-note">${p.note}</div><span class="mvp-move ${p.cls}">${p.move}</span></div>
        </article>`;
      }).join('');
    }

    const hm = watch.querySelector('.mvp-hm-list');
    if(hm) hm.innerHTML = ['Bijan Robinson','D’Andre Swift','C.J. Stroud','Ashton Jeanty','Jalen Hurts','Zay Flowers'].map(name=>`<span>${name}</span>`).join('');
    const foot = watch.querySelector('.mvp-foot');
    if(foot) foot.textContent = 'Week 1 is complete. NEW this update: Kenneth Walker III after 191 scrimmage yards and two touchdowns on Monday night. OUT of the Top 10: Bijan Robinson. Next full ranking refresh: after Week 2.';
    watch.dataset.week1FinalUpdate = 'true';
  }

  const rookieWatch = document.querySelector('#rookie-watch');
  if(rookieWatch && rookieWatch.dataset.week1FinalUpdate !== 'true'){
    const rookieImages = {};
    rookieWatch.querySelectorAll('.rookie-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent?.trim();
      const src = card.querySelector('.rookie-photo img')?.getAttribute('src');
      if(name && src) rookieImages[name] = src;
    });

    const rookies = [
      {rank:1,name:'Josiah Trotter',team:'TB',pos:'LB',stats:'1 SACK • 38-YD PICK-SIX',note:'The Week 1 rookie leader stays put. Trotter sacked Joe Burrow and later took a Burrow interception 38 yards for a touchdown — the loudest defensive rookie debut of the opening week.',tag:'🔥 EARLY LEADER',tagClass:'hot'},
      {rank:2,name:'Dillon Thieneman',team:'CHI',pos:'S',stats:'10 TKL • 8 SOLO • 1 PD',note:'Ten tackles, eight solo and a pass breakup in Chicago’s 59-point opener. He stepped directly into a major role and looked comfortable doing it.',tag:'📈 STOCK UP',tagClass:'up'},
      {rank:3,name:'Caleb Downs',team:'DAL',pos:'S',stats:'8 TKL • 1 SACK • 1 FF',note:'Dallas lost, but Downs filled the stat sheet immediately. Eight tackles, a sack and a forced fumble showed why his range and versatility were valued so highly.',tag:'🔥 IMPACT',tagClass:'hot'},
      {rank:4,name:'Mansoor Delane',team:'KC',pos:'CB',stats:'1 INT • OPENING SERIES',note:'Delane intercepted Bo Nix on Denver’s third offensive snap and helped Kansas City seize control early on Monday night. A shoulder injury ended his night by halftime, so his availability now becomes part of the watch.',tag:'▲ NEW • PRIME-TIME PICK',tagClass:'up',image:'https://a.espncdn.com/i/headshots/college-football/players/full/4880124.png'},
      {rank:5,name:'Treydan Stukes',team:'LV',pos:'S',stats:'1 INT • 1 PBU',note:'Stukes rewarded Las Vegas for trusting him with a starting job, producing an interception and a pass breakup in the Raiders’ 27–13 win over Miami.',tag:'📈 STOCK UP',tagClass:'up'},
      {rank:6,name:'David Bailey',team:'NYJ',pos:'EDGE',stats:'1 SACK • 6 PRESSURES • 4 TKL',note:'The No. 2 pick flashed the disruption New York drafted him for: a sack, steady pressure and four tackles in a controlled 23–10 road win.',tag:'🔥 DROY WATCH',tagClass:'hot'},
      {rank:7,name:'Denzel Boston',team:'CLE',pos:'WR',stats:'2 REC • 59 YDS • 1 TD',note:'Cleveland’s offense struggled, but Boston produced one of its few explosive plays — a 46-yard touchdown — and finished with 59 yards on only two catches.',tag:'📈 FLASHED',tagClass:'up'},
      {rank:8,name:'Kenyon Sadiq',team:'NYJ',pos:'TE',stats:'1 RUSH TD • FIRST NFL SCORE',note:'The box score was small, but the moment was not. Sadiq scored on a three-yard rush in his NFL debut, giving the Jets an early glimpse of how they can use his athleticism near the goal line.',tag:'👀 ROLE WATCH',tagClass:''},
      {rank:9,name:'Sonny Styles',team:'WAS',pos:'LB',stats:'1 SACK • ACTIVE VS PHI',note:'Styles opened his career with a sack and showed the physical range Washington drafted him for in a two-point loss at Philadelphia.',tag:'📈 TRENDING',tagClass:'up'},
      {rank:10,name:'Jeremiyah Love',team:'ARI',pos:'RB',stats:'1 TD • SCORED ON 3RD NFL CARRY',note:'The workload was light, but Love found the end zone almost immediately and gave Arizona another reason to grow his role after a 26–14 road win.',tag:'⚡ BIG-PLAY WATCH',tagClass:'hot'}
    ];

    const headCopy = rookieWatch.querySelector('.rookie-head p');
    if(headCopy) headCopy.textContent = 'Full Week 1 rookie board after Monday Night Football. Production, role, winning impact and sustainable opportunity all matter.';
    const stamp = rookieWatch.querySelector('.rookie-stamp');
    if(stamp) stamp.innerHTML = 'WEEK 1 • FINAL<br>SEPT. 15, 2026';

    const grid = rookieWatch.querySelector('.rookie-grid');
    if(grid){
      grid.innerHTML = rookies.map(p => {
        const initials = p.name.split(' ').map(x=>x[0]).join('').slice(0,2);
        const img = p.image || rookieImages[p.name] || '';
        return `<article class="rookie-card">
          <div class="rookie-rank">${p.rank}</div>
          <div class="rookie-photo"><span>${initials}</span>${img ? `<img src="${img}" alt="${p.name}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div><h3>${p.name}</h3><div class="rookie-meta">${p.pos} • ${p.team} • ${p.stats}</div><div class="rookie-note">${p.note}</div><span class="rookie-tag ${p.tagClass}">${p.tag}</span></div>
        </article>`;
      }).join('');
    }

    const hm = rookieWatch.querySelector('.rookie-hm-list');
    if(hm) hm.innerHTML = ['KC Concepcion • CLE','Omar Cooper Jr. • NYJ','Mike Washington Jr. • LV','Emmett Johnson • KC','Peter Woods • KC','R Mason Thomas • KC'].map(name=>`<span>${name}</span>`).join('');
    const foot = rookieWatch.querySelector('.rookie-foot');
    if(foot) foot.textContent = 'Week 1 is complete. Mansoor Delane jumps into the Top 10 after an interception on the opening series of Monday Night Football. Next full ranking refresh: after Week 2.';
    rookieWatch.dataset.week1FinalUpdate = 'true';
  }
})();

/* ---------- NEW: WEEK 2 CURRENT LAYER (add-only) ---------- */
(() => {
  const onNFL = /(^|\/)nfl(?:\.html)?$/.test(location.pathname.replace(/\/+$/,'')) || !!document.querySelector('.nfl-v2-hero');
  if(!onNFL || document.querySelector('#week2-current')) return;

  // Keep all existing board rows — just move the "current week" marker forward.
  const boardTop = document.querySelector('.nfl-v2-board-top strong');
  if(boardTop) boardTop.textContent = 'WEEK 2';

  const board = document.querySelector('.nfl-v2-board');
  if(board && !board.querySelector('[data-week2-current-row]')){
    const firstRow = board.querySelector('.nfl-v2-board-row');
    const preview = document.createElement('a');
    preview.className = 'nfl-v2-board-row live';
    preview.href = 'nfl-week2-sunday-preview-2026.html';
    preview.setAttribute('data-week2-current-row','preview');
    preview.innerHTML = '<div><small>WEEK 2 • CURRENT</small><b>SUNDAY PREVIEW</b></div><span>READ →</span>';
    board.insertBefore(preview, firstRow || null);

    const recap = document.createElement('a');
    recap.className = 'nfl-v2-board-row live';
    recap.href = 'nfl-thursday-recap-week2-bills-lions.html';
    recap.setAttribute('data-week2-current-row','tnf');
    recap.innerHTML = '<div><small>WEEK 2 • FINAL</small><b>BILLS 41, LIONS 31</b></div><span>RECAP →</span>';
    board.insertBefore(recap, preview.nextSibling);
  }

  const ticker = document.querySelector('.nfl-revamp-ticker .nfl-ticker-track');
  if(ticker && !ticker.querySelector('[data-week2-ticker]')){
    const a = document.createElement('span');
    a.setAttribute('data-week2-ticker','1');
    a.innerHTML = '<b>●</b> WEEK 2: Sunday preview is live';
    const b = document.createElement('span');
    b.setAttribute('data-week2-ticker','1');
    b.innerHTML = '<b>●</b> TNF FINAL: Bills 41, Lions 31';
    ticker.prepend(b);
    ticker.prepend(a);
  }

  if(!document.querySelector('#week2-current-styles')){
    const style = document.createElement('style');
    style.id = 'week2-current-styles';
    style.textContent = `
      #week2-current{background:#070a08;border-top:1px solid #242924;border-bottom:1px solid #242924;padding:34px 0}
      .w2-shell{width:min(1180px,calc(100% - 32px));margin:auto}
      .w2-top{display:flex;align-items:flex-end;justify-content:space-between;gap:22px;margin-bottom:18px}
      .w2-kicker{display:block;color:#ff5a36;font:900 10px/1 Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase}
      .w2-top h2{margin:7px 0 0;color:#f8f4ea;font:1000 clamp(31px,6vw,54px)/.94 Arial Black,Arial,sans-serif;letter-spacing:-.045em;text-transform:uppercase}
      .w2-top p{margin:0;max-width:560px;color:#9ea49e;font:700 13px/1.5 Arial,sans-serif}
      .w2-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:12px}
      .w2-card{display:block;text-decoration:none;background:#101511;border:1px solid #293029;padding:20px;color:#f7f2e8}
      .w2-card:hover{border-color:#ff5a36}
      .w2-card small{display:block;color:#ff6542;font:900 9px/1 Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase}
      .w2-card h3{margin:9px 0 8px;font:1000 27px/1 Arial Black,Arial,sans-serif;letter-spacing:-.035em;text-transform:uppercase}
      .w2-card p{margin:0;color:#aeb3ad;font:700 13px/1.55 Arial,sans-serif}
      .w2-score{display:flex;gap:14px;align-items:baseline;margin:9px 0 10px}
      .w2-score b{font:1000 35px/1 Arial Black,Arial,sans-serif}
      .w2-score span{color:#7f887f;font:900 9px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}
      .w2-pulse{margin-top:12px;padding-top:12px;border-top:1px solid #2a302a;display:flex;gap:10px;flex-wrap:wrap}
      .w2-pulse span{border:1px solid #353d35;background:#0a0d0b;padding:7px 9px;color:#d6d6cf;font:900 9px/1 Arial,sans-serif;letter-spacing:.05em;text-transform:uppercase}
      .w2-note{margin-top:13px;color:#7e857e;font:800 10px/1.45 Arial,sans-serif}
      @media(max-width:760px){.w2-top{display:block}.w2-top p{margin-top:10px}.w2-grid{grid-template-columns:1fr}.w2-card h3{font-size:24px}}
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement('section');
  section.id = 'week2-current';
  section.setAttribute('aria-label','4 Da Kulture NFL Week 2 current coverage');
  section.innerHTML = `
    <div class="w2-shell">
      <div class="w2-top">
        <div>
          <span class="w2-kicker">4DK NFL • CURRENT WEEK</span>
          <h2>WEEK 2 IS LIVE.</h2>
        </div>
        <p>Nothing from Week 1 is being removed. The archive stays intact while the newest layer moves to the front.</p>
      </div>
      <div class="w2-grid">
        <a class="w2-card" href="nfl-week2-sunday-preview-2026.html">
          <small>SUNDAY • SEPTEMBER 20</small>
          <h3>THE FULL WEEK 2 SUNDAY PREVIEW</h3>
          <p>All 14 Sunday games: matchup reads, players to watch, injury watch and the pressure points that can swing the weekend.</p>
          <div class="w2-pulse">
            <span>Vikings at Bears</span><span>Dolphins at 49ers</span><span>Colts at Chiefs • SNF</span>
          </div>
        </a>
        <a class="w2-card" href="nfl-thursday-recap-week2-bills-lions.html">
          <small>THURSDAY NIGHT • FINAL</small>
          <h3>THE HOUSE THAT ALLEN BUILT.</h3>
          <div class="w2-score"><b>BUF 41 • DET 31</b><span>Bills 2–0</span></div>
          <p>Josh Allen accounted for five touchdowns, James Cook ran for 135, and Buffalo opened Week 2 with another offensive statement.</p>
          <div class="w2-pulse">
            <span>Allen: 5 total TD</span><span>Cook: 135 rush yds</span><span>Goff: 327 / 4 TD</span>
          </div>
        </a>
      </div>
      <div class="w2-note">MVP Watch, Rookie Watch and Power Rankings remain preserved as the final Week 1 boards. Full ranking refresh stays on the Tuesday schedule after Week 2.</div>
    </div>`;

  const nav = document.querySelector('.nfl-v2-nav');
  const scoreboard = document.querySelector('#scoreboard');
  if(nav && nav.parentNode) nav.insertAdjacentElement('afterend',section);
  else if(scoreboard && scoreboard.parentNode) scoreboard.parentNode.insertBefore(section,scoreboard);
  else document.querySelector('main')?.prepend(section);
})();
