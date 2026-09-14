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
/* 4DK Sunday NFL Recaps — additive recurring section */
(() => {
  if (document.querySelector('#sunday-recaps')) return;
  const scoreboard = document.querySelector('[data-nfl-scoreboard]');
  if (!scoreboard) return;

  const style = document.createElement('style');
  style.id = 'fourdk-sunday-recaps-style';
  style.textContent = `
    .fourdk-sunday-recaps{padding:42px 0 44px;border-bottom:1px solid #1e251f;background:#080b09;color:#f6f2e8}
    .fourdk-sunday-recaps-head{display:flex;justify-content:space-between;gap:22px;align-items:flex-end;margin-bottom:18px}
    .fourdk-sunday-recaps-kicker{display:block;color:#ff5a36;font-size:10px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}
    .fourdk-sunday-recaps h2{margin:5px 0 5px;font:1000 clamp(34px,5vw,50px)/.92 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.035em;text-transform:uppercase}
    .fourdk-sunday-recaps-head p{margin:0;max-width:600px;color:#93968f;font-size:12px;line-height:1.5}
    .fourdk-sunday-recaps-all{flex:none;border:1px solid #343b34;padding:10px 12px;color:#f6f2e8;font-size:9px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
    .fourdk-sunday-recaps-card{display:grid;grid-template-columns:110px minmax(0,1fr) auto;gap:18px;align-items:center;border:1px solid #2b322c;background:linear-gradient(120deg,#111611,#0b0f0c);padding:18px;color:#f6f2e8}
    .fourdk-sunday-recaps-card:hover{border-color:#ff5a36}
    .fourdk-sunday-recaps-week{border-right:1px solid #313831;padding-right:16px;text-align:center}
    .fourdk-sunday-recaps-week small{display:block;color:#ff5a36;font-size:9px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase}
    .fourdk-sunday-recaps-week strong{display:block;margin-top:4px;font:1000 28px/.95 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;text-transform:uppercase}
    .fourdk-sunday-recaps-copy small{color:#767b75;font-size:9px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
    .fourdk-sunday-recaps-copy h3{margin:5px 0 7px;font:1000 24px/.98 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;text-transform:uppercase}
    .fourdk-sunday-recaps-copy p{margin:0;color:#afb1ab;font-size:11px;line-height:1.45}
    .fourdk-sunday-recaps-read{font-size:9px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;color:#ff6b45}
    .fourdk-sunday-rhythm{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px}
    .fourdk-sunday-rhythm span{border:1px solid #2c332d;background:#0b0e0c;padding:7px 9px;color:#777c76;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
    @media(max-width:760px){.fourdk-sunday-recaps-head{align-items:flex-start;flex-direction:column}.fourdk-sunday-recaps-card{grid-template-columns:82px minmax(0,1fr);gap:13px}.fourdk-sunday-recaps-read{grid-column:2}.fourdk-sunday-recaps-week{padding-right:10px}.fourdk-sunday-recaps-week strong{font-size:23px}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'sunday-recaps';
  section.className = 'fourdk-sunday-recaps';
  section.innerHTML = `
    <div class="shell">
      <div class="fourdk-sunday-recaps-head">
        <div>
          <span class="fourdk-sunday-recaps-kicker">4DK WEEKLY NFL SERIES</span>
          <h2>SUNDAY NFL RECAPS</h2>
          <p>Every Sunday after Sunday Night Football: the full slate, the performances that mattered, the injuries, the trends and what carries into next week.</p>
        </div>
        <a class="fourdk-sunday-recaps-all" href="nfl-sunday-recaps.html">ALL SUNDAY RECAPS →</a>
      </div>
      <a class="fourdk-sunday-recaps-card" href="nfl-sunday-recap-week1.html">
        <div class="fourdk-sunday-recaps-week"><small>2026</small><strong>Week 1</strong></div>
        <div class="fourdk-sunday-recaps-copy"><small>Sunday • September 13</small><h3>SUNDAY STATEMENT: WEEK 1</h3><p>Chicago explodes. Lamar + Henry dominate. Kirk opens Vegas 1-0. Cleveland's QB question begins. Harbaugh and Dart close the night with a Giants win over Dallas.</p></div>
        <span class="fourdk-sunday-recaps-read">READ RECAP →</span>
      </a>
      <div class="fourdk-sunday-rhythm"><span>Sunday • Full Recap</span><span>Monday • MNF Headline</span><span>Tuesday • Power Rankings</span><span>Tuesday • MVP Watch</span></div>
    </div>`;
  scoreboard.insertAdjacentElement('afterend', section);

  const nav = document.querySelector('.nfl-v2-nav');
  if (nav && !nav.querySelector('a[href="#sunday-recaps"]')) {
    const link = document.createElement('a');
    link.href = '#sunday-recaps';
    link.textContent = 'Sunday Recaps';
    const scoreboardLink = nav.querySelector('a[href="#scoreboard"]');
    if (scoreboardLink) scoreboardLink.insertAdjacentElement('afterend', link);
    else nav.appendChild(link);
  }
})();
