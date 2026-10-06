(() => {
  const page = (location.pathname.split('/').pop() || '').toLowerCase();
  const isNBA = page === 'nba.html' || page === 'nba';
  if (!isNBA || window.__fourdkNBALiveScoreboard) return;
  window.__fourdkNBALiveScoreboard = true;

  const REFRESH_MS = 30000;
  let timer = null;
  let loading = false;

  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function easternDateKey(date = new Date()){
    const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
    const map = {}; parts.forEach(p => map[p.type] = p.value);
    return `${map.year}-${map.month}-${map.day}`;
  }

  function shiftDateKey(dayKey, amount){
    const [y,m,d] = dayKey.split('-').map(Number);
    const dt = new Date(Date.UTC(y,m-1,d+amount,12,0,0));
    return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth()+1).padStart(2,'0')}-${String(dt.getUTCDate()).padStart(2,'0')}`;
  }

  function readableDate(dayKey){
    const [y,m,d] = dayKey.split('-').map(Number);
    const dt = new Date(y,m-1,d,12,0,0);
    return new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(dt);
  }

  function localTip(iso){
    if(!iso) return 'TBD';
    const dt = new Date(iso);
    if(Number.isNaN(dt.getTime())) return 'TBD';
    return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(dt);
  }

  function addStyles(){
    if(document.getElementById('fourdk-nba-scoreboard-styles')) return;
    const style = document.createElement('style');
    style.id = 'fourdk-nba-scoreboard-styles';
    style.textContent = `
      .nba-live-scoreboard{position:relative;overflow:hidden;background:radial-gradient(circle at 88% 10%,rgba(225,68,47,.19),transparent 20rem),radial-gradient(circle at 8% 90%,rgba(213,172,84,.10),transparent 18rem),#080a0d;color:#f4f0e8;border-top:1px solid #292c31;border-bottom:1px solid #292c31;padding:26px 0 30px}
      .nba-live-scoreboard:after{content:'LIVE';position:absolute;right:-18px;bottom:-44px;font:1000 clamp(95px,16vw,190px)/.8 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.07em;color:#fff;opacity:.025;pointer-events:none}
      .nba-live-scoreboard .shell{position:relative;z-index:2}
      .nba-score-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:16px}
      .nba-score-kicker{display:flex;align-items:center;gap:8px;color:#ef593e;font-size:9px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .nba-score-dot{width:8px;height:8px;border-radius:50%;background:#ef4934;box-shadow:0 0 0 5px rgba(239,73,52,.10)}
      .nba-live-scoreboard.has-live .nba-score-dot{animation:nbaLivePulse 1.35s infinite}
      @keyframes nbaLivePulse{0%,100%{box-shadow:0 0 0 3px rgba(239,73,52,.10)}50%{box-shadow:0 0 0 8px rgba(239,73,52,.02)}}
      .nba-score-head h2{margin:7px 0 0;font:1000 clamp(35px,5vw,60px)/.86 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .nba-score-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
      .nba-score-date{color:#a39d95;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .nba-score-refresh{min-height:38px;padding:0 12px;border:1px solid #3a3e44;background:#101318;color:#f4f0e8;cursor:pointer;font-size:9px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .nba-score-refresh:disabled{opacity:.55;cursor:wait}
      .nba-score-meta{display:flex;justify-content:space-between;gap:15px;margin:-3px 0 14px;color:#777d83;font-size:8px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
      .nba-score-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}
      .nba-score-game{position:relative;min-height:190px;padding:16px;border:1px solid #31353b;background:#101318;display:flex;flex-direction:column;min-width:0}
      .nba-score-game.live{border-top:4px solid #ef4934;background:linear-gradient(145deg,#191312,#101318)}
      .nba-score-game.final{border-top:4px solid #7d817f}
      .nba-score-game.upcoming{border-top:4px solid #d1ad5f}
      .nba-game-status{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;font-size:8px;font-weight:1000;letter-spacing:.10em;text-transform:uppercase}
      .nba-game-status b{color:#ef5b42}.nba-score-game.upcoming .nba-game-status b{color:#d8b45d}.nba-score-game.final .nba-game-status b{color:#a7aaa8}
      .nba-game-team{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;padding:11px 0;border-top:1px solid #272b30}
      .nba-game-team:first-of-type{border-top:0}.nba-game-name{min-width:0}
      .nba-game-name strong{display:block;font-size:15px;line-height:1.05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .nba-game-name small{display:block;margin-top:4px;color:#777f85;font-size:8px;font-weight:1000;letter-spacing:.08em}
      .nba-game-score{min-width:42px;text-align:right;font:1000 31px/.9 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;color:#f7f3eb}
      .nba-score-game.upcoming .nba-game-score{font-size:18px;color:#5f656a}
      .nba-game-foot{margin-top:auto;padding-top:12px;border-top:1px solid #272b30;color:#7e858a;font-size:8px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
      .nba-score-empty{grid-column:1/-1;padding:26px;border:1px solid #31353b;background:#101318;color:#9ca2a6;text-align:center}
      .nba-score-empty strong{display:block;margin-bottom:6px;color:#f0ece5;font-size:18px}
      @media(max-width:980px){.nba-score-board{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){.nba-live-scoreboard{padding:22px 0 25px}.nba-score-head{align-items:flex-start;flex-direction:column}.nba-score-controls{justify-content:flex-start}.nba-score-meta{align-items:flex-start;flex-direction:column;gap:5px}.nba-score-board{display:flex!important;grid-template-columns:none!important;overflow-x:auto!important;overflow-y:hidden!important;gap:9px;padding:0 18px 10px 0;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y;scrollbar-width:thin;scrollbar-color:#555b60 transparent}.nba-score-game{flex:0 0 min(82vw,330px);width:min(82vw,330px);min-height:205px;scroll-snap-align:start}.nba-score-empty{flex:0 0 calc(100% - 18px)}}
    `;
    document.head.appendChild(style);
  }

  function install(){
    if(document.getElementById('nba-scoreboard')) return document.getElementById('nba-scoreboard');
    const hero = document.querySelector('.nba-hero');
    if(!hero) return null;
    const nav = document.querySelector('.nba-hero-nav');
    if(nav && !nav.querySelector('a[href="#nba-scoreboard"]')){
      const link = document.createElement('a'); link.href = '#nba-scoreboard'; link.textContent = 'Live Scores'; nav.insertBefore(link,nav.firstChild);
    }
    const section = document.createElement('section');
    section.id = 'nba-scoreboard'; section.className = 'nba-live-scoreboard'; section.setAttribute('aria-label','NBA live scoreboard');
    section.innerHTML = `<div class="shell"><div class="nba-score-head"><div><div class="nba-score-kicker"><span class="nba-score-dot" aria-hidden="true"></span>4DK NBA • LIVE SCOREBOARD</div><h2>Today's NBA Board.</h2></div><div class="nba-score-controls"><span class="nba-score-date" data-nba-score-date>Loading…</span><button class="nba-score-refresh" type="button" data-nba-score-refresh>Refresh Scores ↻</button></div></div><div class="nba-score-meta"><span data-nba-score-mode>Live games first • tip times shown in your local time</span><span>Auto-refreshes every 30 seconds</span></div><div class="nba-score-board" data-nba-score-board><div class="nba-score-empty"><strong>Loading today's NBA games…</strong>4DK Live is checking the board.</div></div><span class="sr-only" data-nba-score-live aria-live="polite"></span></div>`;
    hero.insertAdjacentElement('afterend',section);
    return section;
  }

  async function fetchDay(dayKey){
    const response = await fetch(`/api/scores?date=${encodeURIComponent(dayKey)}`,{cache:'no-store'});
    if(!response.ok) throw new Error(`Scores ${response.status}`);
    const payload = await response.json();
    return (Array.isArray(payload.games) ? payload.games : []).filter(game => game && game.league === 'NBA');
  }

  function gameStatus(game){
    if(game.state === 'in') return game.statusText || 'LIVE';
    if(game.state === 'post') return 'FINAL';
    return localTip(game.startTime);
  }

  function render(games,dayKey,isFallback=false){
    const section = install(); if(!section) return;
    const board = section.querySelector('[data-nba-score-board]');
    const date = section.querySelector('[data-nba-score-date]');
    const mode = section.querySelector('[data-nba-score-mode]');
    const live = section.querySelector('[data-nba-score-live]');
    date.textContent = readableDate(dayKey);
    section.classList.toggle('has-live',games.some(g => g.state === 'in'));
    mode.textContent = isFallback ? 'No NBA games today • showing the next NBA board' : 'Live games first • tip times shown in your local time';
    if(!games.length){
      board.innerHTML = `<div class="nba-score-empty"><strong>No NBA games on the board.</strong>Check back for the next slate.</div>`;
      if(live) live.textContent = 'No NBA games found.'; return;
    }
    const rank={in:0,pre:1,post:2};
    const ordered = games.slice().sort((a,b)=>(rank[a.state]??9)-(rank[b.state]??9)||new Date(a.startTime||0)-new Date(b.startTime||0));
    board.innerHTML = ordered.map(game => {
      const liveGame=game.state==='in', finalGame=game.state==='post', cls=liveGame?'live':finalGame?'final':'upcoming';
      const hasScore=liveGame||finalGame;
      const awayScore=hasScore?(game.away?.score??'–'):'–', homeScore=hasScore?(game.home?.score??'–'):'–';
      const foot=liveGame?'LIVE • updates automatically':finalGame?'Final score':`Tipoff • ${localTip(game.startTime)}`;
      return `<article class="nba-score-game ${cls}"><div class="nba-game-status"><span>${esc(game.away?.abbr||'AWAY')} @ ${esc(game.home?.abbr||'HOME')}</span><b>${esc(gameStatus(game))}</b></div><div class="nba-game-team"><div class="nba-game-name"><strong>${esc(game.away?.name||game.away?.abbr||'Away')}</strong><small>${esc(game.away?.abbr||'')}</small></div><span class="nba-game-score">${esc(awayScore)}</span></div><div class="nba-game-team"><div class="nba-game-name"><strong>${esc(game.home?.name||game.home?.abbr||'Home')}</strong><small>${esc(game.home?.abbr||'')}</small></div><span class="nba-game-score">${esc(homeScore)}</span></div><div class="nba-game-foot">${esc(foot)}</div></article>`;
    }).join('');
    if(live){const liveCount=ordered.filter(g=>g.state==='in').length;live.textContent=liveCount?`${liveCount} NBA game${liveCount===1?' is':'s are'} live.`:`${ordered.length} NBA game${ordered.length===1?' is':'s are'} on the board.`}
  }

  async function load(){
    if(loading) return; loading=true;
    const section=install(); const button=section?.querySelector('[data-nba-score-refresh]'); if(button) button.disabled=true;
    try{
      const today=easternDateKey(); let games=await fetchDay(today), key=today, fallback=false;
      if(!games.length){for(let i=1;i<=3;i++){const next=shiftDateKey(today,i);games=await fetchDay(next);if(games.length){key=next;fallback=true;break}}}
      render(games,key,fallback);
    }catch(error){const board=section?.querySelector('[data-nba-score-board]');if(board)board.innerHTML=`<div class="nba-score-empty"><strong>NBA scores are temporarily unavailable.</strong>Tap refresh in a moment.</div>`;console.warn('4DK NBA scoreboard:',error)}
    finally{loading=false;if(button)button.disabled=false}
  }

  function start(){
    addStyles(); const section=install(); if(!section)return;
    section.querySelector('[data-nba-score-refresh]')?.addEventListener('click',load);
    load(); timer=setInterval(load,REFRESH_MS);
    window.addEventListener('pagehide',()=>timer&&clearInterval(timer),{once:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
