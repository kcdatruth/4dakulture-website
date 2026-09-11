(() => {
  const root=document.querySelector('[data-nfl-scoreboard]');
  if(!root) return;

  const gamesEl=root.querySelector('[data-scoreboard-games]');
  const statusEl=root.querySelector('[data-scoreboard-status]');
  const weekEl=root.querySelector('[data-scoreboard-week]');
  const updatedEl=root.querySelector('[data-scoreboard-updated]');
  const refreshBtn=root.querySelector('[data-scoreboard-refresh]');
  const filters=[...root.querySelectorAll('[data-scoreboard-filter]')];
  const countEls=[...root.querySelectorAll('[data-filter-count]')];

  let payload=null;
  let activeFilter='all';
  let timer=null;
  let loading=false;

  const esc=value=>String(value ?? '').replace(/[&<>"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function stateRank(state){
    return state==='in' ? 0 : state==='pre' ? 1 : 2;
  }

  function formatKickoff(iso){
    if(!iso) return 'TBD';
    const date=new Date(iso);
    if(Number.isNaN(date.getTime())) return 'TBD';

    const day=new Intl.DateTimeFormat(undefined,{weekday:'short'}).format(date).toUpperCase();
    const time=new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(date);
    return `${day} • ${time}`;
  }

  function formatDate(iso){
    if(!iso) return '';
    const date=new Date(iso);
    if(Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(date).toUpperCase();
  }

  function teamName(team){
    return team?.name || team?.abbr || 'TEAM';
  }

  function score(team,game){
    if(game.state==='pre') return '—';
    const value=team?.score;
    return value === '' || value == null ? '0' : value;
  }

  function statusText(game){
    if(game.state==='in') return game.statusText || 'LIVE';
    if(game.state==='post') return 'FINAL';
    return formatKickoff(game.startTime);
  }

  function statusClass(game){
    if(game.state==='in') return 'live';
    if(game.state==='post') return 'final';
    return 'upcoming';
  }

  function gameCard(game){
    const live=game.state==='in';
    const awayScore=Number(game.away?.score);
    const homeScore=Number(game.home?.score);
    const awayLeader=game.state==='post' && Number.isFinite(awayScore) && Number.isFinite(homeScore) && awayScore>homeScore;
    const homeLeader=game.state==='post' && Number.isFinite(awayScore) && Number.isFinite(homeScore) && homeScore>awayScore;

    return `
      <article class="nfl-score-card ${statusClass(game)}" data-game-state="${esc(game.state)}">
        <div class="nfl-score-card-top">
          <span>${esc(formatDate(game.startTime))}</span>
          <b class="${live ? 'live' : ''}">${live ? '<i></i>' : ''}${esc(statusText(game))}</b>
        </div>

        <div class="nfl-score-team ${awayLeader ? 'winner' : ''}">
          <span class="nfl-score-abbr">${esc(game.away?.abbr || 'AWAY')}</span>
          <span class="nfl-score-name">${esc(teamName(game.away))}</span>
          <strong>${esc(score(game.away,game))}</strong>
        </div>

        <div class="nfl-score-team ${homeLeader ? 'winner' : ''}">
          <span class="nfl-score-abbr">${esc(game.home?.abbr || 'HOME')}</span>
          <span class="nfl-score-name">${esc(teamName(game.home))}</span>
          <strong>${esc(score(game.home,game))}</strong>
        </div>

        <div class="nfl-score-card-foot">
          <span>${game.state==='pre' ? 'UPCOMING' : game.state==='in' ? 'LIVE NOW' : 'FINAL'}</span>
          <small>${game.state==='pre' ? 'LOCAL TIME' : '4DK NFL'}</small>
        </div>
      </article>`;
  }

  function updateCounts(games){
    const counts={
      all:games.length,
      in:games.filter(g=>g.state==='in').length,
      post:games.filter(g=>g.state==='post').length,
      pre:games.filter(g=>g.state==='pre').length
    };

    countEls.forEach(el=>{
      const key=el.dataset.filterCount;
      el.textContent=String(counts[key] || 0);
    });
  }

  function render(){
    if(!payload) return;

    const games=[...(payload.games || [])].sort((a,b)=>{
      const rankDiff=stateRank(a.state)-stateRank(b.state);
      if(rankDiff) return rankDiff;
      return new Date(a.startTime || 0)-new Date(b.startTime || 0);
    });

    updateCounts(games);
    weekEl.textContent=payload.week ? `WEEK ${payload.week} SCOREBOARD` : 'NFL SCOREBOARD';

    const filtered=activeFilter==='all'
      ? games
      : games.filter(game=>game.state===activeFilter);

    if(!filtered.length){
      gamesEl.innerHTML=`
        <div class="nfl-scoreboard-empty">
          <strong>NOTHING HERE YET.</strong>
          <span>No ${activeFilter==='in' ? 'live' : activeFilter==='post' ? 'final' : 'upcoming'} games in this view.</span>
        </div>`;
    }else{
      gamesEl.innerHTML=filtered.map(gameCard).join('');
    }

    const liveCount=games.filter(g=>g.state==='in').length;
    if(liveCount){
      statusEl.innerHTML=`<b>${liveCount} LIVE</b> • Scores refresh automatically every 30 seconds.`;
    }else{
      statusEl.textContent=`${games.length} games on this week's NFL slate.`;
    }
  }

  async function load(){
    if(loading) return;
    loading=true;
    refreshBtn?.classList.add('loading');
    statusEl.textContent='Updating NFL scoreboard…';

    try{
      const response=await fetch(`/api/nfl-pickem?t=${Date.now()}`,{cache:'no-store'});
      if(!response.ok) throw new Error(`4DK NFL feed HTTP ${response.status}`);

      const data=await response.json();
      if(!Array.isArray(data?.games)) throw new Error('Invalid NFL scoreboard response');

      payload=data;
      render();

      const stamp=new Date(data.updatedAt || Date.now());
      updatedEl.textContent=`UPDATED ${new Intl.DateTimeFormat(undefined,{
        hour:'numeric',minute:'2-digit'
      }).format(stamp)}`;
    }catch(error){
      console.error('4DK NFL scoreboard:',error);
      if(!payload){
        gamesEl.innerHTML=`
          <div class="nfl-scoreboard-empty">
            <strong>SCOREBOARD TEMPORARILY UNAVAILABLE.</strong>
            <span>Try refresh in a moment.</span>
          </div>`;
      }
      statusEl.textContent='Could not refresh the scoreboard. Existing scores will stay on screen.';
    }finally{
      loading=false;
      refreshBtn?.classList.remove('loading');
    }
  }

  filters.forEach(btn=>{
    btn.addEventListener('click',()=>{
      activeFilter=btn.dataset.scoreboardFilter || 'all';
      filters.forEach(other=>other.classList.toggle('active',other===btn));
      render();
    });
  });

  refreshBtn?.addEventListener('click',load);

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      clearInterval(timer);
      timer=null;
    }else{
      load();
      if(!timer) timer=setInterval(load,30000);
    }
  });

  load();
  timer=setInterval(load,30000);
})();