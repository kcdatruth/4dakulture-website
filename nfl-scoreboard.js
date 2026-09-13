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
  let firstLoad=true;
  const detailsCache=new Map();
  const openGames=new Set();
  const seenScoringPlays=new Map();
  const pendingScoreChanges=new Map();
  const liveFeed=[];
  let alertTimer=null;

  const esc=value=>String(value ?? '').replace(/[&<>"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  injectLiveStyles();
  ensureWeekOneRecaps();
  const liveCenter=ensureLiveCenter();
  const alertEl=liveCenter.querySelector('[data-live-score-alert]');
  const feedEl=liveCenter.querySelector('[data-live-score-feed]');
  const liveRegion=liveCenter.querySelector('[data-live-scoring-region]');

  function injectLiveStyles(){
    if(document.getElementById('fourdk-live-scoreboard-v2')) return;
    const style=document.createElement('style');
    style.id='fourdk-live-scoreboard-v2';
    style.textContent=`
      .nfl-live-center{margin:0 0 13px;border:1px solid #303638;background:#0c1011;overflow:hidden}
      .nfl-live-center-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #272d2f;background:#111517}
      .nfl-live-center-label{display:flex;align-items:center;gap:8px;color:#dfe3df;font:1000 8px/1 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}
      .nfl-live-center-label i{width:7px;height:7px;border-radius:50%;background:#ff523d;box-shadow:0 0 0 4px rgba(255,82,61,.12);animation:nflScorePulse 1.3s infinite}
      .nfl-live-center-top small{color:#6e7778;font:900 7px/1 Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase}
      .nfl-live-score-alert{display:none;padding:12px 14px;border-bottom:1px solid #3d3320;background:linear-gradient(90deg,rgba(230,178,74,.16),rgba(239,75,55,.09));color:#fff}
      .nfl-live-score-alert.show{display:block;animation:fourdkScoreFlash .45s ease-out}
      .nfl-live-score-alert b{display:block;color:#f0bc59;font:1000 10px/1 Arial,sans-serif;letter-spacing:.11em;text-transform:uppercase;margin-bottom:5px}
      .nfl-live-score-alert span{display:block;font-size:12px;font-weight:800;line-height:1.45}
      @keyframes fourdkScoreFlash{0%{background:#7b241b}100%{background:linear-gradient(90deg,rgba(230,178,74,.16),rgba(239,75,55,.09))}}
      .nfl-live-score-feed{display:flex;gap:8px;overflow-x:auto;padding:10px 12px;scrollbar-width:none}
      .nfl-live-score-feed::-webkit-scrollbar{display:none}
      .nfl-live-feed-empty{color:#6f7879;font-size:9px;font-weight:800;padding:5px 0}
      .nfl-live-feed-item{flex:0 0 min(300px,82vw);border:1px solid #2c3335;background:#111517;padding:10px 11px}
      .nfl-live-feed-item.touchdown{border-left:4px solid #e8452e}.nfl-live-feed-item.field-goal{border-left:4px solid #e6b24a}.nfl-live-feed-item.score{border-left:4px solid #79bb61}
      .nfl-live-feed-item small{display:block;color:#777f80;font-size:7px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px}
      .nfl-live-feed-item strong{display:block;color:#f1f2ee;font-size:11px;line-height:1.35}
      .nfl-score-card-foot{gap:10px}
      .nfl-score-details-btn{margin-left:auto;border:1px solid #383f42;background:#14191b;color:#d9ddda;min-height:25px;padding:0 8px;cursor:pointer;font:1000 6px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
      .nfl-score-details-btn:hover,.nfl-score-details-btn:focus-visible{border-color:#e8452e;color:#fff}
      .nfl-score-details-btn[aria-expanded="true"]{background:#e8452e;border-color:#e8452e;color:#fff}
      .nfl-score-detail{border-top:1px solid #2b3032;background:#0c1011;padding:12px}
      .nfl-score-detail[hidden]{display:none!important}
      .nfl-score-detail-status{color:#747c7d;font-size:8px;font-weight:900;padding:2px 0}
      .nfl-detail-title{display:flex;justify-content:space-between;gap:8px;align-items:center;margin:0 0 9px;color:#f2f2ed;font:1000 9px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}
      .nfl-detail-title span{color:#71797a;font-size:7px}
      .nfl-team-stats{display:grid;grid-template-columns:1fr auto 1fr;gap:7px 10px;align-items:center;margin-bottom:13px}
      .nfl-team-stats .stat-away{text-align:right}.nfl-team-stats .stat-home{text-align:left}.nfl-team-stats b{color:#f0f1ed;font-size:10px}.nfl-team-stats small{color:#6f7879;font-size:6px;font-weight:1000;letter-spacing:.08em;text-align:center;text-transform:uppercase}
      .nfl-player-leaders{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px}
      .nfl-leader-team{border:1px solid #272e30;background:#111517;padding:9px}
      .nfl-leader-team>strong{display:block;color:#fff;font-size:8px;margin-bottom:7px}
      .nfl-leader-row{display:grid;grid-template-columns:49px 1fr;gap:6px;padding:4px 0;border-top:1px solid #23292b}.nfl-leader-row:first-of-type{border-top:0}
      .nfl-leader-row small{color:#697173;font-size:6px;font-weight:1000;text-transform:uppercase}.nfl-leader-row span{color:#bdc2bf;font-size:7px;line-height:1.35}
      .nfl-scoring-list{display:grid;gap:6px}
      .nfl-scoring-row{display:grid;grid-template-columns:58px 1fr auto;gap:7px;align-items:start;padding:7px;border:1px solid #282f31;background:#111517}
      .nfl-scoring-row b{color:#f0b84d;font-size:7px;letter-spacing:.06em;text-transform:uppercase}.nfl-scoring-row span{color:#c8ceca;font-size:8px;line-height:1.4}.nfl-scoring-row em{color:#fff;font:1000 9px/1 Arial,sans-serif;font-style:normal;white-space:nowrap}
      .nfl-card-score-flash{animation:fourdkCardFlash 1.2s ease-out}
      @keyframes fourdkCardFlash{0%{box-shadow:inset 0 0 0 2px #e6b24a,0 0 34px rgba(230,178,74,.35)}100%{box-shadow:inherit}}
      .nfl-week1-recaps{padding:28px 0 30px;background:#0b0e0c;color:#f4f4ef;border-bottom:1px solid #27302a}
      .nfl-week1-recaps-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:14px}
      .nfl-week1-recaps-head small{display:block;color:#ef4b37;font:1000 9px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:7px}
      .nfl-week1-recaps-head h2{margin:0;font:1000 clamp(28px,4vw,45px)/.95 Arial,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .nfl-week1-recaps-head>a{color:#dce1dd;font:1000 8px/1 Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid #59635d;padding-bottom:4px}
      .nfl-week1-recaps-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .nfl-recap-card{position:relative;overflow:hidden;display:block;text-decoration:none;color:inherit;border:1px solid #2b3530;background:linear-gradient(135deg,#121713,#0c100d 70%);padding:18px;min-height:190px}
      .nfl-recap-card:hover,.nfl-recap-card:focus-visible{border-color:#59665d;transform:translateY(-1px)}
      .nfl-recap-card:after{content:'FINAL';position:absolute;right:-5px;bottom:-12px;font:1000 58px/1 Arial,sans-serif;letter-spacing:-.06em;color:rgba(255,255,255,.025);pointer-events:none}
      .nfl-recap-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#7f8882;font:1000 8px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}
      .nfl-recap-score{color:#fff;border:1px solid #3b4540;padding:6px 8px;background:#111612}
      .nfl-recap-teams{display:flex;align-items:center;gap:9px;margin:15px 0 12px}
      .nfl-recap-teams img{width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}
      .nfl-recap-teams span{color:#d6b15a;font:1000 9px/1 Arial,sans-serif;letter-spacing:.1em}
      .nfl-recap-card h3{position:relative;z-index:1;margin:0 0 8px;font:1000 24px/.98 Arial,sans-serif;letter-spacing:-.035em;text-transform:uppercase}
      .nfl-recap-card p{position:relative;z-index:1;margin:0;color:#aeb7b0;font-size:11px;line-height:1.55}
      .nfl-recap-cta{position:relative;z-index:1;display:inline-block;margin-top:14px;color:#fff;font:1000 8px/1 Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase}
      @media(max-width:680px){.nfl-week1-recaps-head{align-items:flex-start;flex-direction:column}.nfl-week1-recaps-grid{grid-template-columns:1fr}.nfl-recap-card{min-height:0}}
      @media(max-width:520px){
        .nfl-live-center{margin-bottom:10px}.nfl-live-score-feed{padding:8px}.nfl-live-feed-item{flex-basis:84vw}
        .nfl-score-detail{padding:10px}.nfl-player-leaders{grid-template-columns:1fr}.nfl-team-stats{gap:6px 8px}
        .nfl-score-card-foot small{display:none}.nfl-score-details-btn{min-height:28px;padding:0 9px;font-size:7px}
      }
    `;
    document.head.appendChild(style);
  }

  function ensureWeekOneRecaps(){
    if(document.querySelector('[data-week1-recaps]')) return;
    const scoreboard=root;
    const section=document.createElement('section');
    section.className='nfl-week1-recaps';
    section.dataset.week1Recaps='';
    section.setAttribute('aria-label','Week 1 opening game recaps');
    section.innerHTML=`
      <div class="shell">
        <div class="nfl-week1-recaps-head">
          <div>
            <small>4DK NFL • WEEK 1 RECAPS</small>
            <h2>The Opening Two.</h2>
          </div>
          <a href="nfl-week-1-opening-recap-2026.html">Read the full opening recap →</a>
        </div>
        <div class="nfl-week1-recaps-grid">
          <a class="nfl-recap-card" href="nfl-week-1-opening-recap-2026.html">
            <div class="nfl-recap-meta"><span>WEDNESDAY • RING NIGHT</span><b class="nfl-recap-score">SEA 13 • NE 10</b></div>
            <div class="nfl-recap-teams">
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/ne.png" alt="New England Patriots logo">
              <span>@</span>
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/sea.png" alt="Seattle Seahawks logo">
            </div>
            <h3>Seattle Survives Ring Night</h3>
            <p>Darnold goes down. Drew Lock answers. Seattle erases a 10-point deficit while Drake Maye’s fourth quarter collapses with three straight interceptions.</p>
            <span class="nfl-recap-cta">Darnold • Lock • Maye • Seattle outlook →</span>
          </a>
          <a class="nfl-recap-card" href="nfl-week-1-opening-recap-2026.html">
            <div class="nfl-recap-meta"><span>THURSDAY • MELBOURNE</span><b class="nfl-recap-score">SF 27 • LAR 7</b></div>
            <div class="nfl-recap-teams">
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/sf.png" alt="San Francisco 49ers logo">
              <span>@</span>
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/lar.png" alt="Los Angeles Rams logo">
            </div>
            <h3>49ers Send a Message</h3>
            <p>Purdy throws three touchdowns, McCaffrey runs efficiently, Deebo and Mike Evans make immediate impact, and the 49ers defense overwhelms Stafford and the Rams.</p>
            <span class="nfl-recap-cta">Purdy • CMC • Deebo • Evans • dominant defense →</span>
          </a>
        </div>
      </div>`;
    scoreboard.parentNode?.insertBefore(section,scoreboard);
  }

  function ensureLiveCenter(){
    let center=root.querySelector('[data-live-score-center]');
    if(center) return center;
    center=document.createElement('div');
    center.className='nfl-live-center';
    center.dataset.liveScoreCenter='';
    center.innerHTML=`
      <div class="nfl-live-center-top">
        <span class="nfl-live-center-label"><i></i> 4DK LIVE SCORING FEED</span>
        <small>TD + FG UPDATES • AUTO REFRESH</small>
      </div>
      <div class="nfl-live-score-alert" data-live-score-alert></div>
      <div class="nfl-live-score-feed" data-live-score-feed>
        <span class="nfl-live-feed-empty">Scoring updates will appear here when games are live.</span>
      </div>
      <span class="sr-only" data-live-scoring-region aria-live="assertive"></span>`;
    const filters=root.querySelector('.nfl-scoreboard-filters');
    filters?.parentNode?.insertBefore(center,filters);
    return center;
  }

  function stateRank(state){return state==='in'?0:state==='pre'?1:2}

  function formatKickoff(iso){
    if(!iso) return 'TBD';
    const date=new Date(iso); if(Number.isNaN(date.getTime())) return 'TBD';
    const day=new Intl.DateTimeFormat(undefined,{weekday:'short'}).format(date).toUpperCase();
    const time=new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(date);
    return `${day} • ${time}`;
  }
  function formatDate(iso){
    if(!iso) return '';
    const date=new Date(iso); if(Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(date).toUpperCase();
  }
  function teamName(team){return team?.name||team?.abbr||'TEAM'}
  function score(team,game){
    if(game.state==='pre') return '—';
    const value=team?.score; return value===''||value==null?'0':value;
  }
  function statusText(game){
    if(game.state==='in') return game.statusText||'LIVE';
    if(game.state==='post') return 'FINAL';
    return formatKickoff(game.startTime);
  }
  function statusClass(game){return game.state==='in'?'live':game.state==='post'?'final':'upcoming'}

  function gameCard(game){
    const live=game.state==='in';
    const awayScore=Number(game.away?.score),homeScore=Number(game.home?.score);
    const awayLeader=game.state==='post'&&Number.isFinite(awayScore)&&Number.isFinite(homeScore)&&awayScore>homeScore;
    const homeLeader=game.state==='post'&&Number.isFinite(awayScore)&&Number.isFinite(homeScore)&&homeScore>awayScore;
    const detail=detailsCache.get(game.id);
    const expanded=openGames.has(game.id);
    return `
      <article class="nfl-score-card ${statusClass(game)}" data-game-state="${esc(game.state)}" data-game-id="${esc(game.id)}">
        <div class="nfl-score-card-top"><span>${esc(formatDate(game.startTime))}</span><b class="${live?'live':''}">${live?'<i></i>':''}${esc(statusText(game))}</b></div>
        <div class="nfl-score-team ${awayLeader?'winner':''}"><span class="nfl-score-abbr">${esc(game.away?.abbr||'AWAY')}</span><span class="nfl-score-name">${esc(teamName(game.away))}</span><strong>${esc(score(game.away,game))}</strong></div>
        <div class="nfl-score-team ${homeLeader?'winner':''}"><span class="nfl-score-abbr">${esc(game.home?.abbr||'HOME')}</span><span class="nfl-score-name">${esc(teamName(game.home))}</span><strong>${esc(score(game.home,game))}</strong></div>
        <div class="nfl-score-card-foot">
          <span>${game.state==='pre'?'UPCOMING':game.state==='in'?'LIVE NOW':'FINAL'}</span>
          <small>${game.state==='pre'?'LOCAL TIME':'4DK NFL'}</small>
          <button class="nfl-score-details-btn" type="button" data-game-details="${esc(game.id)}" aria-expanded="${expanded?'true':'false'}">${expanded?'HIDE STATS':'LIVE STATS'}</button>
        </div>
        <div class="nfl-score-detail" data-game-panel="${esc(game.id)}" ${expanded?'':'hidden'}>${renderDetail(game,detail)}</div>
      </article>`;
  }

  function renderDetail(game,detail){
    if(!detail) return `<div class="nfl-score-detail-status">${game.state==='pre'?'Stats unlock at kickoff.':'Loading live stats and scoring plays…'}</div>`;
    if(detail.error) return `<div class="nfl-score-detail-status">Live stats are temporarily unavailable. Score updates will keep running.</div>`;
    const stats=detail.teamStats||{};
    const statRows=[
      ['TOTAL YDS','totalYards'],['PASS YDS','netPassingYards'],['RUSH YDS','rushingYards'],['TURNOVERS','turnovers'],['3RD DOWN','thirdDownEff']
    ].filter(([,key])=>stats.away?.[key]!=null||stats.home?.[key]!=null);
    const leaderTeam=(side,label)=>{
      const rows=(detail.leaders?.[side]||[]).map(r=>`<div class="nfl-leader-row"><small>${esc(r.label)}</small><span>${esc(r.value)}</span></div>`).join('');
      return `<div class="nfl-leader-team"><strong>${esc(label)}</strong>${rows||'<div class="nfl-score-detail-status">Leaders loading…</div>'}</div>`;
    };
    const scoring=(detail.scoringPlays||[]).slice(-4).reverse().map(play=>`<div class="nfl-scoring-row"><b>${esc(play.kindLabel)}</b><span>${esc(play.text)}</span><em>${esc(play.score||'')}</em></div>`).join('');
    return `
      <div class="nfl-detail-title">TEAM STATS <span>${esc(game.statusText||statusText(game))}</span></div>
      ${statRows.length?`<div class="nfl-team-stats">${statRows.map(([label,key])=>`<b class="stat-away">${esc(stats.away?.[key]??'—')}</b><small>${esc(label)}</small><b class="stat-home">${esc(stats.home?.[key]??'—')}</b>`).join('')}</div>`:''}
      <div class="nfl-detail-title">PLAYER LEADERS <span>PASS • RUSH • REC</span></div>
      <div class="nfl-player-leaders">${leaderTeam('away',game.away?.abbr||'AWAY')}${leaderTeam('home',game.home?.abbr||'HOME')}</div>
      <div class="nfl-detail-title">LATEST SCORING <span>TD + FG</span></div>
      <div class="nfl-scoring-list">${scoring||'<div class="nfl-score-detail-status">No touchdown or field goal yet.</div>'}</div>`;
  }

  function updateCounts(games){
    const counts={all:games.length,in:games.filter(g=>g.state==='in').length,post:games.filter(g=>g.state==='post').length,pre:games.filter(g=>g.state==='pre').length};
    countEls.forEach(el=>{const key=el.dataset.filterCount;el.textContent=String(counts[key]||0)});
  }

  function render(){
    if(!payload) return;
    const games=[...(payload.games||[])].sort((a,b)=>{const r=stateRank(a.state)-stateRank(b.state);return r||new Date(a.startTime||0)-new Date(b.startTime||0)});
    updateCounts(games);
    weekEl.textContent=payload.week?`WEEK ${payload.week} SCOREBOARD`:'NFL SCOREBOARD';
    const filtered=activeFilter==='all'?games:games.filter(g=>g.state===activeFilter);
    gamesEl.innerHTML=filtered.length?filtered.map(gameCard).join(''):`<div class="nfl-scoreboard-empty"><strong>NOTHING HERE YET.</strong><span>No ${activeFilter==='in'?'live':activeFilter==='post'?'final':'upcoming'} games in this view.</span></div>`;
    const liveCount=games.filter(g=>g.state==='in').length;
    statusEl.innerHTML=liveCount?`<b>${liveCount} LIVE</b> • Scores, stats and scoring plays refresh automatically every 15 seconds.`:`${games.length} games on this week's NFL slate.`;
    renderLiveFeed();
  }

  function normalizeESPNEvent(event){
    const competition=event?.competitions?.[0]; if(!competition) return null;
    const competitors=competition.competitors||[];
    const home=competitors.find(c=>c.homeAway==='home')||competitors[0];
    const away=competitors.find(c=>c.homeAway==='away')||competitors[1];
    if(!home||!away) return null;
    const status=event.status||competition.status||{},type=status.type||{};
    const state=type.state||(type.completed?'post':'pre');
    const scoreValue=competitor=>{const value=competitor?.score;if(value==null)return'';if(typeof value==='object')return value.displayValue??value.value??'';return String(value)};
    let detail='';
    if(state==='post') detail='FINAL';
    else if(state==='in'){
      const period=status.period||competition.status?.period,clock=status.displayClock||competition.status?.displayClock||'';
      detail=period&&clock?`Q${period} ${clock}`:(type.shortDetail||type.detail||'LIVE');
    }else detail=type.shortDetail||type.detail||'Scheduled';
    return {id:String(event.id||''),season:event.season?.year||new Date().getFullYear(),week:event.week?.number||null,state,statusText:detail,startTime:event.date||competition.date||'',away:{id:String(away.team?.id||away.id||''),abbr:away.team?.abbreviation||away.team?.shortDisplayName||'AWAY',name:away.team?.displayName||away.team?.shortDisplayName||'Away',score:scoreValue(away)},home:{id:String(home.team?.id||home.id||''),abbr:home.team?.abbreviation||home.team?.shortDisplayName||'HOME',name:home.team?.displayName||home.team?.shortDisplayName||'Home',score:scoreValue(home)}};
  }

  async function loadDirectFromESPN(){
    const endpoint='https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
    const response=await fetch(`${endpoint}?limit=100&_=${Date.now()}`,{cache:'no-store',mode:'cors',headers:{Accept:'application/json'}});
    if(!response.ok) throw new Error(`ESPN NFL feed HTTP ${response.status}`);
    const data=await response.json();
    const allGames=(data.events||[]).map(normalizeESPNEvent).filter(Boolean).sort((a,b)=>new Date(a.startTime||0)-new Date(b.startTime||0));
    if(!allGames.length) throw new Error('ESPN returned no NFL games');
    const counts=new Map(); allGames.forEach(game=>{if(game.week!=null) counts.set(game.week,(counts.get(game.week)||0)+1)});
    const week=[...counts.entries()].sort((a,b)=>b[1]-a[1])[0]?.[0]??allGames[0]?.week??null;
    const games=week==null?allGames:allGames.filter(game=>game.week===week);
    return {updatedAt:new Date().toISOString(),season:games[0]?.season||allGames[0]?.season||new Date().getFullYear(),week,games,source:'espn-fallback'};
  }

  function statMap(teamBlock){
    const out={};
    (teamBlock?.statistics||[]).forEach(stat=>{out[stat.name]=stat.displayValue??stat.value??''});
    return out;
  }

  function buildLeader(category){
    const first=category?.athletes?.[0]; if(!first) return null;
    const labels=category.labels||[],values=first.stats||[];
    const athlete=first.athlete?.displayName||first.athlete?.shortName||'Player';
    const val=name=>{const i=labels.findIndex(label=>String(label).toUpperCase()===name);return i>=0?values[i]:''};
    const key=String(category.name||category.displayName||'').toLowerCase();
    if(key.includes('pass')) return {label:'PASS',value:`${athlete} • ${val('YDS')||''}${val('TD')?` YDS • ${val('TD')} TD`:''}`.replace(' •  YDS','')};
    if(key.includes('rush')) return {label:'RUSH',value:`${athlete} • ${val('YDS')||''} YDS${val('TD')?` • ${val('TD')} TD`:''}`};
    if(key.includes('receiv')) return {label:'REC',value:`${athlete} • ${val('YDS')||''} YDS${val('TD')?` • ${val('TD')} TD`:''}`};
    return null;
  }

  function normalizeScoringPlay(play,game){
    const text=play?.text||play?.shortText||play?.type?.text||'Scoring play';
    const raw=[play?.scoringType?.name,play?.scoringType?.displayName,play?.type?.text,text].filter(Boolean).join(' ').toLowerCase();
    let kind=''; if(raw.includes('touchdown')) kind='touchdown'; else if(raw.includes('field goal')) kind='field-goal'; else return null;
    const period=play?.period?.number||play?.period||'';
    const clock=play?.clock?.displayValue||play?.clock||'';
    const id=String(play?.id||`${period}-${clock}-${text}`);
    const awayScore=play?.awayScore??play?.awayScoreValue??'';
    const homeScore=play?.homeScore??play?.homeScoreValue??'';
    const scoreText=awayScore!==''&&homeScore!==''?`${game.away?.abbr||'AWAY'} ${awayScore} • ${game.home?.abbr||'HOME'} ${homeScore}`:'';
    return {id,kind,kindLabel:kind==='touchdown'?'TOUCHDOWN':'FIELD GOAL',text:`${period?`Q${period} ${clock} • `:''}${text}`,score:scoreText,gameId:game.id,matchup:`${game.away?.abbr||'AWAY'} @ ${game.home?.abbr||'HOME'}`};
  }

  function normalizeSummary(data,game){
    const boxTeams=data?.boxscore?.teams||[];
    let awayBlock=boxTeams.find(t=>String(t.team?.id||'')===String(game.away?.id||''));
    let homeBlock=boxTeams.find(t=>String(t.team?.id||'')===String(game.home?.id||''));
    if(!awayBlock||!homeBlock){awayBlock=boxTeams[0]||awayBlock;homeBlock=boxTeams[1]||homeBlock}
    const playerBlocks=data?.boxscore?.players||[];
    const leaders={away:[],home:[]};
    playerBlocks.forEach(block=>{
      const id=String(block.team?.id||'');
      const side=id===String(game.home?.id||'')?'home':id===String(game.away?.id||'')?'away':null;
      if(!side) return;
      leaders[side]=(block.statistics||[]).map(buildLeader).filter(Boolean).slice(0,3);
    });
    const scoringPlays=(data?.scoringPlays||[]).map(p=>normalizeScoringPlay(p,game)).filter(Boolean);
    return {teamStats:{away:statMap(awayBlock),home:statMap(homeBlock)},leaders,scoringPlays};
  }

  async function fetchGameDetails(game){
    if(!game?.id) return null;
    const endpoint=`https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${encodeURIComponent(game.id)}&_=${Date.now()}`;
    const response=await fetch(endpoint,{cache:'no-store',mode:'cors',headers:{Accept:'application/json'}});
    if(!response.ok) throw new Error(`ESPN summary HTTP ${response.status}`);
    return normalizeSummary(await response.json(),game);
  }

  function addFeedItem(item,announce=true){
    const key=`${item.gameId}:${item.id}`;
    if(liveFeed.some(x=>x.key===key)) return;
    liveFeed.unshift({...item,key});
    if(liveFeed.length>12) liveFeed.length=12;
    renderLiveFeed();
    if(announce) showScoreAlert(item);
  }

  function renderLiveFeed(){
    if(!feedEl) return;
    if(!liveFeed.length){
      const anyLive=(payload?.games||[]).some(g=>g.state==='in');
      feedEl.innerHTML=`<span class="nfl-live-feed-empty">${anyLive?'Watching every live game for the next touchdown or field goal…':'Scoring updates will appear here when games are live.'}</span>`;
      return;
    }
    feedEl.innerHTML=liveFeed.map(item=>`<div class="nfl-live-feed-item ${esc(item.kind||'score')}"><small>${esc(item.kindLabel||'SCORE')} • ${esc(item.matchup||'NFL')}</small><strong>${esc(item.text)}${item.score?` • ${esc(item.score)}`:''}</strong></div>`).join('');
  }

  function showScoreAlert(item){
    if(!alertEl) return;
    clearTimeout(alertTimer);
    alertEl.innerHTML=`<b>${esc(item.kindLabel||'SCORE UPDATE')} • ${esc(item.matchup||'NFL')}</b><span>${esc(item.text)}${item.score?` • ${esc(item.score)}`:''}</span>`;
    alertEl.classList.remove('show'); void alertEl.offsetWidth; alertEl.classList.add('show');
    liveRegion.textContent=`${item.kindLabel||'Score update'}: ${item.matchup||''}. ${item.text}. ${item.score||''}`;
    const card=gamesEl.querySelector(`[data-game-id="${CSS.escape(String(item.gameId))}"]`);
    card?.classList.remove('nfl-card-score-flash'); if(card){void card.offsetWidth;card.classList.add('nfl-card-score-flash')}
    alertTimer=setTimeout(()=>alertEl.classList.remove('show'),9000);
  }

  function recordScoreChanges(oldData,newData){
    if(!oldData) return;
    const oldMap=new Map((oldData.games||[]).map(g=>[String(g.id),g]));
    (newData.games||[]).forEach(game=>{
      if(game.state!=='in') return;
      const old=oldMap.get(String(game.id)); if(!old) return;
      const oldAway=Number(old.away?.score),oldHome=Number(old.home?.score),newAway=Number(game.away?.score),newHome=Number(game.home?.score);
      const dAway=Number.isFinite(oldAway)&&Number.isFinite(newAway)?newAway-oldAway:0;
      const dHome=Number.isFinite(oldHome)&&Number.isFinite(newHome)?newHome-oldHome:0;
      if(dAway>0||dHome>0) pendingScoreChanges.set(String(game.id),{game,dAway,dHome});
    });
  }

  function fallbackScoreItem(change){
    const {game,dAway,dHome}=change;
    const delta=dAway>0?dAway:dHome;
    const team=dAway>0?game.away:game.home;
    let kind='score',kindLabel='SCORE UPDATE';
    if(delta===3){kind='field-goal';kindLabel='FIELD GOAL'}
    else if(delta>=6&&delta<=8){kind='touchdown';kindLabel='TOUCHDOWN'}
    return {id:`fallback-${Date.now()}-${game.id}`,kind,kindLabel,gameId:game.id,matchup:`${game.away?.abbr||'AWAY'} @ ${game.home?.abbr||'HOME'}`,text:`${team?.abbr||'Team'} adds ${delta} point${delta===1?'':'s'}.`,score:`${game.away?.abbr} ${game.away?.score} • ${game.home?.abbr} ${game.home?.score}`};
  }

  async function refreshLiveDetails(){
    const liveGames=(payload?.games||[]).filter(g=>g.state==='in');
    if(!liveGames.length) return;
    await Promise.allSettled(liveGames.map(async game=>{
      try{
        const detail=await fetchGameDetails(game);
        detailsCache.set(game.id,detail);
        const previous=seenScoringPlays.get(game.id);
        const ids=detail.scoringPlays.map(p=>p.id);
        if(!previous){seenScoringPlays.set(game.id,new Set(ids));return}
        const fresh=detail.scoringPlays.filter(play=>!previous.has(play.id));
        fresh.forEach(play=>{previous.add(play.id);addFeedItem(play,true)});
        if(fresh.length) pendingScoreChanges.delete(String(game.id));
      }catch(err){
        console.warn('4DK live game detail unavailable',game.id,err);
        if(!detailsCache.has(game.id)) detailsCache.set(game.id,{error:true});
      }
    }));
    for(const [id,change] of pendingScoreChanges){addFeedItem(fallbackScoreItem(change),true);pendingScoreChanges.delete(id)}
    render();
  }

  async function load(){
    if(loading) return;
    loading=true; refreshBtn?.classList.add('loading'); statusEl.textContent='Updating NFL scoreboard…';
    let data=null,usedFallback=false;
    try{
      const response=await fetch(`/api/nfl-pickem?t=${Date.now()}`,{cache:'no-store'});
      if(!response.ok) throw new Error(`4DK NFL feed HTTP ${response.status}`);
      data=await response.json(); if(!Array.isArray(data?.games)||!data.games.length) throw new Error('4DK NFL feed returned no games');
    }catch(workerError){
      console.warn('4DK NFL scoreboard Worker fallback:',workerError);
      try{data=await loadDirectFromESPN();usedFallback=true}
      catch(espnError){
        console.error('4DK NFL scoreboard ESPN fallback:',espnError);
        if(!payload) gamesEl.innerHTML='<div class="nfl-scoreboard-empty"><strong>SCOREBOARD TEMPORARILY UNAVAILABLE.</strong><span>Try refresh in a moment.</span></div>';
        statusEl.textContent='Could not refresh the scoreboard. Existing scores will stay on screen.';
        loading=false;refreshBtn?.classList.remove('loading');armTimer();return;
      }
    }
    if(!firstLoad) recordScoreChanges(payload,data);
    payload=data; render();
    const stamp=new Date(data.updatedAt||Date.now());
    updatedEl.textContent=`UPDATED ${new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(stamp)}${usedFallback?' • LIVE FEED':''}`;
    loading=false;refreshBtn?.classList.remove('loading');
    firstLoad=false;
    if((payload.games||[]).some(g=>g.state==='in')) refreshLiveDetails();
    armTimer();
  }

  function armTimer(){
    clearInterval(timer);
    if(document.hidden) return;
    const anyLive=(payload?.games||[]).some(g=>g.state==='in');
    timer=setInterval(load,anyLive?15000:60000);
  }

  filters.forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.scoreboardFilter||'all';filters.forEach(other=>other.classList.toggle('active',other===btn));render()}));
  refreshBtn?.addEventListener('click',load);

  gamesEl.addEventListener('click',async event=>{
    const btn=event.target.closest('[data-game-details]'); if(!btn) return;
    const id=btn.dataset.gameDetails; const game=(payload?.games||[]).find(g=>String(g.id)===String(id)); if(!game) return;
    if(openGames.has(id)) openGames.delete(id); else openGames.add(id);
    render();
    if(openGames.has(id)&&!detailsCache.has(id)&&game.state!=='pre'){
      try{detailsCache.set(id,await fetchGameDetails(game))}catch(err){detailsCache.set(id,{error:true})}
      render();
    }
  });

  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(timer);timer=null}else{load()}});

  load();
})();
