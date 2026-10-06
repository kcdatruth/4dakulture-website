(() => {
  const root = document.querySelector('[data-score-ticker]');
  if (!root) return;

  const page = (location.pathname.split('/').pop() || '').toLowerCase();
  if (page !== 'nba.html' && page !== 'nba') return;

  const track = root.querySelector('[data-score-track]');
  const refreshBtn = root.querySelector('[data-score-refresh]');
  const liveRegion = root.querySelector('[data-score-live-region]');
  const label = root.querySelector('.score-ticker-label strong');
  let timer = null;

  if (label) label.textContent = '4DK NBA LIVE';

  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function localDateKey(){
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
  }

  const compactDate = d => d.replaceAll('-','');

  function scoreValue(c){
    const s = c?.score;
    if(s == null) return '';
    return typeof s === 'object' ? (s.displayValue ?? s.value ?? '') : String(s);
  }

  function formatStart(iso){
    if(!iso) return 'UPCOMING';
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return 'UPCOMING';
    return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(d);
  }

  function normalizeEvent(event){
    const comp = event?.competitions?.[0];
    if(!comp) return null;

    const cs = comp.competitors || [];
    const home = cs.find(c => c.homeAway === 'home') || cs[0];
    const away = cs.find(c => c.homeAway === 'away') || cs[1];
    if(!home || !away) return null;

    const st = event.status || comp.status || {};
    const type = st.type || {};
    const state = type.state || (type.completed ? 'post' : 'pre');

    let statusText = '';
    if(state === 'in'){
      const period = st.period || comp.status?.period;
      const clock = st.displayClock || comp.status?.displayClock || '';
      statusText = period && clock
        ? `Q${period} ${clock}`
        : (type.shortDetail || type.detail || 'LIVE');
    }else if(state === 'post'){
      statusText = 'FINAL';
    }

    return {
      id:String(event.id || ''),
      league:'NBA',
      state,
      statusText,
      startTime:event.date || comp.date || '',
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
    const rank = {in:0,pre:1,post:2};
    return ((rank[a.state] ?? 9) - (rank[b.state] ?? 9))
      || (new Date(a.startTime || 0) - new Date(b.startTime || 0));
  }

  async function directNBAGames(){
    const date = compactDate(localDateKey());
    const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}&limit=100`;
    const res = await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error(`NBA ${res.status}`);
    const data = await res.json();
    return (data.events || []).map(normalizeEvent).filter(Boolean).sort(sortGames);
  }

  function gameKey(g){
    return g?.id ? `NBA:${g.id}` : [
      'NBA',g?.away?.abbr || '',g?.home?.abbr || '',g?.startTime || ''
    ].join(':');
  }

  function mergeGames(...lists){
    const map = new Map();
    lists.flat().forEach(g => {
      if(!g || g.league !== 'NBA') return;
      const k = gameKey(g);
      const prev = map.get(k);
      if(!prev){ map.set(k,g); return; }

      const prevScore = prev.away?.score !== '' || prev.home?.score !== '';
      const newScore = g.away?.score !== '' || g.home?.score !== '';
      const pw = (prev.state === 'in' ? 3 : prev.state === 'post' ? 2 : 1) + (prevScore ? 1 : 0);
      const nw = (g.state === 'in' ? 3 : g.state === 'post' ? 2 : 1) + (newScore ? 1 : 0);
      if(nw >= pw) map.set(k,g);
    });
    return [...map.values()].sort(sortGames);
  }

  const formatStatus = g =>
    g.state === 'in'
      ? (g.statusText || 'LIVE')
      : g.state === 'post'
        ? 'FINAL'
        : formatStart(g.startTime);

  function renderGame(g){
    const as = g.away?.score ?? '';
    const hs = g.home?.score ?? '';
    const hasScore = g.state !== 'pre' && (as !== '' || hs !== '');

    return `<div class="score-game ${g.state === 'in' ? 'live' : ''}">
      <span class="score-league">NBA</span>
      <span class="score-team">${esc(g.away?.abbr || 'AWAY')}${hasScore ? `<b>${esc(as)}</b>` : ''}</span>
      <span class="score-at">${g.state === 'pre' ? '@' : '–'}</span>
      <span class="score-team">${esc(g.home?.abbr || 'HOME')}${hasScore ? `<b>${esc(hs)}</b>` : ''}</span>
      <span class="score-status">${esc(formatStatus(g))}</span>
    </div>`;
  }

  function setTicker(games){
    root.classList.remove('is-ready','has-live');

    if(!Array.isArray(games) || !games.length){
      track.innerHTML = '<span class="score-ticker-message">No NBA games scheduled today.</span>';
      if(liveRegion) liveRegion.textContent = 'No NBA games scheduled today.';
      return;
    }

    if(games.some(g => g.state === 'in')) root.classList.add('has-live');

    const h = games.map(renderGame).join('');
    track.innerHTML = h + h;

    requestAnimationFrame(() => {
      const half = Math.max(1,track.scrollWidth / 2);
      const duration = Math.max(28,half / 62);
      root.style.setProperty('--score-duration',`${duration.toFixed(1)}s`);
      root.classList.add('is-ready');
    });

    if(liveRegion){
      const liveCount = games.filter(g => g.state === 'in').length;
      liveRegion.textContent = liveCount
        ? `${liveCount} NBA game${liveCount === 1 ? '' : 's'} live now.`
        : `${games.length} NBA game${games.length === 1 ? '' : 's'} on today's board.`;
    }
  }

  async function loadScores(){
    if(refreshBtn) refreshBtn.disabled = true;

    let workerGames = [];
    let browserGames = [];
    let workerWorked = false;
    let browserWorked = false;

    try{
      const res = await fetch(`/api/scores?date=${encodeURIComponent(localDateKey())}`,{cache:'no-store'});
      if(res.ok){
        const data = await res.json();
        workerGames = (Array.isArray(data.games) ? data.games : [])
          .filter(g => g?.league === 'NBA');
        workerWorked = true;
      }
    }catch(e){
      console.warn('4DK NBA ticker worker feed failed:',e);
    }

    try{
      browserGames = await directNBAGames();
      browserWorked = true;
    }catch(e){
      console.warn('4DK NBA ticker direct feed failed:',e);
    }

    try{
      if(workerWorked || browserWorked){
        setTicker(mergeGames(workerGames,browserGames));
      }else{
        throw new Error('All NBA score feeds failed');
      }
    }catch(e){
      track.innerHTML = '<span class="score-ticker-message">NBA live scores are temporarily unavailable.</span>';
      if(liveRegion) liveRegion.textContent = 'NBA live scores are temporarily unavailable.';
    }finally{
      if(refreshBtn) refreshBtn.disabled = false;
    }
  }

  refreshBtn?.addEventListener('click',loadScores);
  loadScores();
  timer = setInterval(loadScores,30000);

  window.addEventListener('pagehide',() => {
    if(timer) clearInterval(timer);
  },{once:true});
})();

/* Keep the existing NBA Teams & Rosters entry that scores.js previously added. */
(() => {
  const page=(location.pathname.split('/').pop() || '').toLowerCase();
  if(page !== 'nba.html' && page !== 'nba') return;

  if(!document.getElementById('rosterEntryStyles')){
    const s=document.createElement('style');
    s.id='rosterEntryStyles';
    s.textContent=`
      .roster-entry-strip{position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.13);border-bottom:1px solid rgba(255,255,255,.13);background:#090d10;color:#fff}
      .roster-entry-strip:after{content:'ROSTERS';position:absolute;right:-12px;top:-18px;font:1000 clamp(70px,14vw,180px)/1 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.06em;color:#fff;opacity:.035;pointer-events:none}
      .roster-entry-inner{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:24px 20px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
      .roster-entry-copy small{display:block;margin-bottom:5px;font-size:9px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase;color:#ef6130}
      .roster-entry-copy strong{display:block;font:1000 clamp(27px,4vw,43px)/.95 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;text-transform:uppercase;letter-spacing:-.02em}
      .roster-entry-copy p{margin:7px 0 0;color:#aeb7bd;font-size:13px;line-height:1.4}
      .roster-entry-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;background:#ef6130;border:1px solid #ef6130;color:#fff!important;text-decoration:none!important;font-size:10px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase;white-space:nowrap}
      @media(max-width:650px){.roster-entry-inner{grid-template-columns:1fr;gap:14px}.roster-entry-btn{width:100%}}
    `;
    document.head.appendChild(s);
  }

  const nav=document.querySelector('.nba-hero-nav');
  if(nav && !nav.querySelector('a[href="nba-rosters.html"]')){
    nav.insertAdjacentHTML('beforeend','<a href="nba-rosters.html">Teams & Rosters</a>');
  }

  const pulse=document.querySelector('.nba-pulse');
  if(pulse && !document.querySelector('.nba-roster-entry')){
    pulse.insertAdjacentHTML(
      'afterend',
      '<section class="roster-entry-strip nba-roster-entry"><div class="roster-entry-inner"><div class="roster-entry-copy"><small>4DK NBA • Live Team Database</small><strong>30 Teams. Current Rosters.</strong><p>Player photos, jersey numbers, positions, measurements, experience and live roster status.</p></div><a class="roster-entry-btn" href="nba-rosters.html">Explore NBA Teams & Rosters →</a></div></section>'
    );
  }
})();