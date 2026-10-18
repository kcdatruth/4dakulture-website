/* 4 DA KULTURE — NBA Rankings HQ (Oct 18, 2026)
   Read-only rankings and player comparison: sources of truth are the original published rankings pages.
   No rank changes, no newly invented movement, no truncated replacement essays.
*/
(() => {
  'use strict';
  const root = document.getElementById('rankings-app');
  const panel = document.getElementById('hub-panel');
  if (!root || !panel) return;
  const PLAYER_SOURCE = 'top-50-nba-players-2026-27.html';
  const TEAM_SOURCE = 'nba-power-rankings-2026-27.html';
  const state = {tab:'players', filter:'all', search:'', playerRank:1, teamRank:1, compareA:1, compareB:2, players:[], teams:[], history:null};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const text = element => element?.textContent?.trim() || '';
  const headshot = id => `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;
  const absolute = (path, origin) => {try{return new URL(path, origin).href;} catch {return ''}};
  const paragraphs = parent => [...(parent?.querySelectorAll('p') || [])].map(p => text(p)).filter(Boolean);
  const essays = arr => arr.map(p=>`<p>${esc(p)}</p>`).join('');
  const motion = (name, current, previous) => {
    if (!previous || !Object.prototype.hasOwnProperty.call(previous, name)) return { label:'INITIAL', prior:'—', cls:'', line:'Opening-night edition • no previous ranking' };
    const old = Number(previous[name]);
    if (!Number.isInteger(old) || old < 1) return {label:'INITIAL', prior:'—', cls:'', line:'No verified previous ranking'};
    const d = old-current;
    return {label:d>0?`↑ ${d}`:d<0?`↓ ${-d}`:'→ SAME',prior:`#${old}`,cls:d>0?'up':d<0?'down':'same',line:d>0?`Up ${d} spot${d===1?'':'s'}`:d<0?`Down ${-d} spot${d===-1?'':'s'}`:'Unchanged since previous edition'};
  };
  async function loadSource(path) {
    const resp = await fetch(path, {cache:'no-cache'});
    if (!resp.ok) throw new Error(`Could not read ${path} (HTTP ${resp.status}).`);
    const html = await resp.text();
    return new DOMParser().parseFromString(html,'text/html');
  }
  function readPlayers(doc) {
    let history = null;
    const json = text(doc.getElementById('fourdk-top50-ranking-history'));
    if (json) {try {history=JSON.parse(json);}catch(err){console.warn('4DK ranking history unavailable',err);}}
    const players = [...doc.querySelectorAll('section.rank-entry[id^="rank-"]')].map(section=>{
      const rank = Number(section.id.replace('rank-',''));
      const name = text(section.querySelector('h2'));
      const meta = [...section.querySelectorAll('.entry-meta span')].map(el=>({label:text(el.querySelector('small')).toLowerCase(),value:text(el.querySelector('b'))}));
      const lookup = part => meta.find(o=>o.label.includes(part))?.value||'—';
      const img = section.querySelector('.fourdk-top25-photo img, .entry-photo img');
      return {
        rank,name,team:lookup('team'),age:lookup('age'),position:lookup('position'),
        stats:text(section.querySelector('.entry-stats strong')),
        statLabel:text(section.querySelector('.entry-stats small')),
        image:img?.getAttribute('src') || '',
        content:paragraphs(section.querySelector('.entry-analysis')),
        href:`${PLAYER_SOURCE}#rank-${rank}`
      };
    }).filter(p=>p.rank>=1&&p.rank<=50&&p.name).sort((a,b)=>a.rank-b.rank);
    if (players.length!==50 || new Set(players.map(p=>p.rank)).size!==50) throw new Error('Top 50 article did not return all 50 uniquely ranked players.');
    return {players,history};
  }
  function readTeams(doc) {
    const teams=[...doc.querySelectorAll('section.team-card[id^="rank-"]')].map(section=>{
      const rank=Number(section.id.replace('rank-',''));
      const image = section.querySelector('.team-media img');
      const facts=[...section.querySelectorAll('.team-grid > div')].map(el=>({label:text(el.querySelector('small')),value:text(el.querySelector('b'))}));
      return {
        rank,name:text(section.querySelector('.team-head h2')),tier:text(section.querySelector('.tier')),
        tag:text(section.querySelector('.team-head .tag')),
        image:image?.getAttribute('src')||'',
        content:paragraphs(section.querySelector('.team-copy')),
        filmTitle:text(section.querySelector('.preseason-brief h3')),
        film:paragraphs(section.querySelector('.preseason-brief')),
        filmNote:text(section.querySelector('.preseason-note')),
        facts,href:`${TEAM_SOURCE}#rank-${rank}`
      };
    }).filter(t=>t.rank>=1&&t.rank<=30&&t.name).sort((a,b)=>a.rank-b.rank);
    if (teams.length!==30 || new Set(teams.map(t=>t.rank)).size!==30) throw new Error('NBA team article did not return all 30 uniquely ranked teams.');
    return teams;
  }
  function tabMarkup(tab) {
    document.querySelectorAll('.hub-tab').forEach(button => {
      const active=button.dataset.tab===tab;
      button.setAttribute('aria-selected',String(active));
      button.tabIndex=active?0:-1;
    });
    panel.setAttribute('aria-labelledby',`tab-${tab}`);
  }
  function changeTab(tab,rank) {
    state.tab=tab;state.filter='all';state.search='';
    if(tab==='players'&&rank)state.playerRank=rank;
    if(tab==='teams'&&rank)state.teamRank=rank;
    if(tab!=='compare' && location.search.includes('compare=')){const u=new URL(location.href);u.searchParams.delete('compare');try{history.replaceState(null,'',u.pathname+u.search+u.hash);}catch(_){/* local preview */}}
    tabMarkup(tab);render();
  }
  function filterButtons() {
    const buttons = state.tab==='players' ? [
      ['all','ALL 50'],['top','TOP 10'],['middle','11–25'],['rest','26–50']
    ] : [['all','ALL 30'],['title','TITLE LEVEL'],['contender','CONTENDERS'],['playoff','PLAYOFF CHASE'],['development','DEVELOPMENT']];
    return `<div class="filter-row" role="group" aria-label="Filter rankings">${buttons.map(([key,label])=>`<button type="button" class="filter-btn ${state.filter===key?'active':''}" data-filter="${key}" aria-pressed="${state.filter===key}">${label}</button>`).join('')}</div>`;
  }
  function filterEntry(p) {
    if(state.search && !`${p.name} ${p.team||''} ${p.tag||''}`.toLowerCase().includes(state.search.toLowerCase()))return false;
    const r=p.rank;
    if(state.tab==='players')return state.filter==='all'||state.filter==='top'&&r<=10||state.filter==='middle'&&r>=11&&r<=25||state.filter==='rest'&&r>=26;
    return state.filter==='all'||state.filter==='title'&&r<=6||state.filter==='contender'&&r>=7&&r<=10||state.filter==='playoff'&&r>=11&&r<=18||state.filter==='development'&&r>=19;
  }
  function listEntry(p) {
    const isPlayer=state.tab==='players',selected=(isPlayer?state.playerRank:state.teamRank)===p.rank;
    const indicator=isPlayer?motion(p.name,p.rank,state.history?.previous):{label:'PRESEASON',cls:''};
    return `<button type="button" class="entry" data-entry="${p.rank}" aria-pressed="${selected}" aria-label="Read ${esc(p.name)} ranked number ${p.rank}">
      <span class="num">${p.rank}</span>${isPlayer&&p.image?`<img class="thumb" src="${esc(p.image)}" alt="" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'">`:''}
      <span class="entry-text"><strong>${esc(p.name)}</strong><small>${esc(isPlayer?p.team:p.tag)}</small></span><span class="status ${indicator.cls}">${esc(indicator.label)}</span>
    </button>`;
  }
  function playerDetail(p) {
    const movement=motion(p.name,p.rank,state.history?.previous);
    return `<article class="profile" id="active-ranking-profile" aria-label="4DK profile: ${esc(p.name)}">
     <div class="profile-hero"><img class="profile-hero-image" src="${esc(p.image)}" alt="Portrait of ${esc(p.name)}" loading="lazy" decoding="async" onerror="this.hidden=true"><div class="profile-hero-content"><span class="eyebrow">FULL 4DK PLAYER PROFILE</span><div class="profile-rank">#${p.rank}</div><h3>${esc(p.name)}</h3><div class="subtitle">${esc(p.team)} • ${esc(p.position)}</div></div></div>
     <div class="profile-inner"><div class="facts"><div class="fact"><small>AGE · SOURCE EDITION</small><strong>${esc(p.age)}</strong></div><div class="fact"><small>CURRENT RANK</small><strong>#${p.rank}</strong></div><div class="fact"><small>PREVIOUS RANK</small><strong>${esc(movement.prior)}</strong></div></div>
     <h4>${esc(p.statLabel||'2025–26 REGULAR SEASON')}</h4><div class="statline">${esc(p.stats||'No stat line listed in original profile')}</div>
     <div class="movement-banner"><span>RANKING HISTORY<br>${esc(movement.line)}</span><b>${esc(movement.label)}</b></div>
     <div class="analysis"><h4>THE COMPLETE 4DK BREAKDOWN</h4>${essays(p.content)||'<p>Read the original feature for the full 4DK analysis.</p>'}</div>
     <a class="source-cta" href="${esc(p.href)}">OPEN THE ORIGINAL PLAYER ARTICLE <span aria-hidden="true">↗</span></a>
     <p class="fineprint">Full essay displayed from our existing Top 50 page. Rankings and written evaluations are not rewritten by this hub.</p>
     </div></article>`;
  }
  function teamDetail(t) {
    return `<article class="profile" id="active-ranking-profile" aria-label="4DK team profile: ${esc(t.name)}">
      <div class="profile-hero has-team">${t.image?`<img class="profile-hero-image" src="${esc(t.image)}" alt="${esc(t.name)} image from original 4DK power rankings" loading="lazy" decoding="async" onerror="this.hidden=true">`:''}
        <div class="profile-hero-content"><span class="eyebrow">${esc(t.tier||'4DK NBA POWER RANKINGS')}</span><div class="profile-rank">#${t.rank}</div><h3>${esc(t.name)}</h3><div class="subtitle">${esc(t.tag)}</div></div>
      </div><div class="profile-inner">
       <div class="movement-banner"><span>2026–27 PRESEASON BASELINE<br>All 30 team placements preserved</span><b>INITIAL BOARD</b></div>
       <div class="analysis"><h4>THE COMPLETE 4DK TEAM ANALYSIS</h4>${essays(t.content)||'<p>Read our existing 30-team feature for the complete analysis.</p>'}</div>
       ${t.filmTitle||t.film.length?`<h4>OCTOBER 17 • PRESEASON FILM ROOM</h4><div class="film-room">${t.filmTitle?`<h5 class="notes-title">${esc(t.filmTitle)}</h5>`:''}${essays(t.film)}${t.filmNote?`<div class="fineprint">${esc(t.filmNote)}</div>`:''}</div>`:''}
       ${t.facts.length?`<h4>THE 4DK TEAM FILE</h4><div class="team-facts">${t.facts.map(f=>`<div class="team-fact"><small>${esc(f.label)}</small><b>${esc(f.value)}</b></div>`).join('')}</div>`:''}
       <a class="source-cta" href="${esc(t.href)}">OPEN THE ORIGINAL TEAM ARTICLE <span aria-hidden="true">↗</span></a><p class="fineprint">Original team order, preseason analysis and measuring sticks remain unchanged.</p>
      </div></article>`;
  }
  function renderList() {
    const list=panel.querySelector('[data-list]');if(!list)return;
    const entries=(state.tab==='players'?state.players:state.teams).filter(filterEntry);
    const count=panel.querySelector('[data-count]');if(count)count.textContent=`${entries.length} SHOWN`;
    list.innerHTML=entries.length?entries.map(listEntry).join(''):'<div class="empty">No matches found. Try another player or team.</div>';
  }
  function renderProfile() {
    const target=panel.querySelector('[data-profile]');if(!target)return;
    const item=state.tab==='players'?state.players[state.playerRank-1]:state.teams[state.teamRank-1];
    target.innerHTML=item?(state.tab==='players'?playerDetail(item):teamDetail(item)):'<div class="empty">Profile not found.</div>';
  }
  function renderBoard() {
    const isPlayer=state.tab==='players';
    const title=isPlayer?'50 BEST PLAYERS. RIGHT NOW.':'30 TEAMS. ONE BOARD.';
    const subtitle=isPlayer?'Every established Top 50 ranking, portrait, age, stat line and full player essay.':'The locked preseason 1–30, with every original evaluation and October 17 film-room note.';
    panel.innerHTML=`<div class="hub-title"><div><span class="eyebrow">${isPlayer?'THE 4DK PLAYER BOARD':'THE 4DK TEAM BOARD'} • 2026–27</span><h2>${title}</h2><p>${subtitle}</p></div></div>
    <div class="hub-toolbar"><label class="search-wrap"><span class="search-icon" aria-hidden="true">⌕</span><input type="search" id="hub-search" autocomplete="off" placeholder="${isPlayer?'Search players or teams…':'Search any NBA team…'}" aria-label="Search rankings"></label>${filterButtons()}</div>
    <div class="hub-grid"><div class="board"><div class="board-head"><strong>${isPlayer?'TOP 50 PLAYER INDEX':'ALL 30 NBA TEAMS'}</strong><small data-count></small></div><div class="board-scroll" data-list aria-label="Rankings list"></div></div><div data-profile></div></div>`;
    renderList();renderProfile();
    const searchInput=panel.querySelector('#hub-search');
    searchInput.value=state.search;
    searchInput.addEventListener('input',()=>{state.search=searchInput.value;renderList();});
    panel.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
      state.filter=button.dataset.filter;
      panel.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      renderList();
    }));
    panel.querySelector('[data-list]').addEventListener('click',e=>{
      const button=e.target.closest('button[data-entry]');if(!button)return;
      const rank=Number(button.dataset.entry);
      if(isPlayer)state.playerRank=rank;else state.teamRank=rank;
      renderList();renderProfile();
      if(window.matchMedia('(max-width:680px)').matches)panel.querySelector('#active-ranking-profile')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }
  function renderHistory() {
    const old=state.history?.previous;
    const havePrevious=!!old;
    const changes=state.players.map(p=>({...p,motion:motion(p.name,p.rank,old)}));
    const up=havePrevious?changes.filter(p=>p.motion.cls==='up').length:0;
    const down=havePrevious?changes.filter(p=>p.motion.cls==='down').length:0;
    const same=havePrevious?changes.filter(p=>p.motion.cls==='same').length:0;
    panel.innerHTML=`<div class="hub-title"><div><span class="eyebrow">4DK RANKING ARCHIVE • 2026–27</span><h2>EVERY MOVE HAS TO BE EARNED.</h2><p>Historic comparisons use actual 4DK ranking editions. No invented rises, falls or weekly shifts.</p></div></div>
      <div class="history"><span class="eyebrow">${havePrevious?'LATEST VERIFIED COMPARISON':'OPENING-NIGHT BASELINE'}</span><h3>${havePrevious?'A REAL RANKING-TO-RANKING COMPARISON.':'THE FIRST 50. THE STARTING LINE.'}</h3>
       <p>${havePrevious?'Movement below is calculated by comparing the previous saved 4DK player ranking map with the current original Top 50 page.':'The currently published 4DK Top 50 establishes the initial 2026–27 edition. Since the ranking-history file contains no prior edition, every player is correctly labeled INITIAL. No arrows appear until a later editorial update supplies an authentic previous-rank map.'}</p>
       <div class="history-grid"><div class="history-box"><b>${havePrevious?up:50}</b><small>${havePrevious?'RANKED HIGHER':'INITIAL POSITIONS'}</small></div><div class="history-box"><b>${havePrevious?down:'—'}</b><small>${havePrevious?'RANKED LOWER':'PRIOR EDITION'}</small></div><div class="history-box"><b>${havePrevious?same:'0'}</b><small>${havePrevious?'UNCHANGED':'VERIFIED MOVES'}</small></div></div>
       <div class="history-legend"><span><b>↑</b> Higher rank</span><span><b>↓</b> Lower rank</span><span><b>→</b> No change</span><span><b>INITIAL</b> First edition</span></div>
      </div><div class="board"><div class="board-head"><strong>PLAYER RANK MOVEMENT • SOURCE HISTORY</strong><small>ALL 50</small></div><div class="board-scroll" data-history-list></div></div>
      <div class="history-footer">Power rankings: the 30-team preseason board is a baseline as well. No regular-season team movement is implied or automatically generated.</div>`;
    const list=panel.querySelector('[data-history-list]');
    list.innerHTML=changes.map(p=>`<button type="button" class="entry" data-history-player="${p.rank}" aria-label="Open ${esc(p.name)} current rank ${p.rank}, ${esc(p.motion.line)}"><span class="num">${p.rank}</span><img class="thumb" src="${esc(p.image)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span class="entry-text"><strong>${esc(p.name)}</strong><small>Previous rank: ${esc(p.motion.prior)}</small></span><span class="status ${p.motion.cls}">${esc(p.motion.label)}</span></button>`).join('');
    list.addEventListener('click', e=>{const b=e.target.closest('[data-history-player]');if(b)changeTab('players',Number(b.dataset.historyPlayer));});
  }

  /* The head-to-head board uses ONLY published Top 50 source data.
     No generated scouting grades, simulated winners, or invented ranking movement. */
  function publishedStat(p, stat) {
    const label = String(p.stats || '');
    const match = new RegExp('(?:^|\\s|•)([0-9]+(?:\\.[0-9]+)?)\\s*' + stat + '\\b', 'i').exec(label);
    if (!match) return null;
    const val=Number(match[1]);
    return Number.isFinite(val) ? val : null;
  }
  function seasonGames(p) {
    const match=/\b(\d+)\s*G\b/.exec(String(p.stats||''));
    return match ? Number(match[1]) : null;
  }
  function comparePhoto(p) {
    return p.image ? `<img src="${esc(p.image)}" alt="Portrait of ${esc(p.name)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.classList.add('photo-unavailable')"><div class="compare-no-photo compare-photo-fallback" aria-hidden="true">PORTRAIT UNAVAILABLE</div>` : `<div class="compare-no-photo">PORTRAIT UNAVAILABLE</div>`;
  }
  function comparePortrait(p, side) {
    return `<div class="compare-player compare-player-${side}">
      <span class="eyebrow">${side==='a'?'PLAYER ONE':'PLAYER TWO'} · 4DK TOP 50</span>
      <strong class="compare-rank">#${p.rank}</strong>
      <h3>${esc(p.name)}</h3>
      <span class="compare-team">${esc(p.team)} · ${esc(p.position)}</span>
      <div class="compare-portrait">${comparePhoto(p)}</div>
      <div class="compare-player-footer"><span>AGE · SOURCE EDITION</span><strong>${esc(p.age)}</strong></div>
    </div>`;
  }
  function compareOptions(selected,other) {
    return state.players.map(p=>`<option value="${p.rank}" ${p.rank===selected?'selected':''} ${p.rank===other?'disabled':''}>#${p.rank} ${esc(p.name)}</option>`).join('');
  }
  function compareMetric(p1,p2,label,stat) {
    const a=publishedStat(p1,stat),b=publishedStat(p2,stat);
    const max=Math.max(a===null?0:a,b===null?0:b,1);
    function half(value,who){
      return `<div class="compare-half ${who}" aria-label="${esc(who==='a'?p1.name:p2.name)}: ${value===null?'unavailable':value+' '+stat}">
       <div class="compare-number">${value===null?'—':value.toFixed(1)}</div>
       <div class="compare-track"><div class="compare-fill" style="width:${value===null?0:Math.max(0,Math.min(100,value/max*100)).toFixed(2)}%"></div></div>
      </div>`;
    }
    return `<div class="compare-metric" role="group" aria-label="${esc(label)} comparison">
     ${half(a,'a')}<span class="compare-metric-label">${esc(label)}</span>${half(b,'b')}
     </div>`;
  }
  function compareEssay(p,side) {
    return `<div class="compare-editorial compare-editorial-${side}">
      <span class="eyebrow">THE 4DK READ · #${p.rank}</span><h3>${esc(p.name)}</h3>
      <div class="compare-analysis">
       ${p.content.length?`<p>${esc(p.content[0])}</p>`:'<p>The complete original analysis is available at the source article.</p>'}
       ${p.content.length>1?`<details><summary>CONTINUE THE ORIGINAL 4DK ESSAY <span aria-hidden="true">↓</span></summary><div class="compare-more">${essays(p.content.slice(1))}</div></details>`:''}
      </div>
      <a class="source-cta" href="${esc(p.href)}">ORIGINAL 4DK PROFILE <span aria-hidden="true">↗</span></a>
    </div>`;
  }
  function renderCompare(){
    const a=state.players[state.compareA-1], b=state.players[state.compareB-1];
    if(!a||!b) {panel.innerHTML='<div class="error">Comparison could not be loaded from the Top 50 source.</div>';return;}
    const url=new URL(location.href);url.searchParams.set('compare',`${a.rank}-${b.rank}`);url.hash='';
    const aGames=seasonGames(a),bGames=seasonGames(b);
    const gamesText= aGames===null||bGames===null ? 'Games-played information is unavailable for at least one player in the original source.' : `Games played in the source: ${a.name} ${aGames} · ${b.name} ${bGames}.`;
    panel.innerHTML=`<div class="hub-title compare-title"><div><span class="eyebrow">4DK BASKETBALL · HEAD-TO-HEAD</span>
    <h2>THE PLAYER SHOWDOWN.</h2>
    <p>Pick any two of our established Top 50. See their published numbers and complete original 4DK evaluations side by side. We don't invent a winner.</p></div></div>
    <div class="compare-picker" aria-label="Choose two ranked players"><label for="compare-select-a">PLAYER ONE<select id="compare-select-a">${compareOptions(a.rank,b.rank)}</select></label>
     <button class="compare-swap" type="button" id="compare-swap" aria-label="Swap player positions" title="Swap players">⇄ <span>SWAP</span></button>
     <label for="compare-select-b">PLAYER TWO<select id="compare-select-b">${compareOptions(b.rank,a.rank)}</select></label></div>
    <div class="compare-presets" role="group" aria-label="Quick matchup examples"><span>QUICK MATCHUPS</span>
      <button type="button" data-matchup="1-2">WEMBY / SGA</button><button type="button" data-matchup="3-4">LUKA / JOKIĆ</button><button type="button" data-matchup="44-48">FLAGG / JA</button>
    </div>
    <div class="compare-card-grid">${comparePortrait(a,'a')}<div class="compare-vs" aria-hidden="true">VS</div>${comparePortrait(b,'b')}</div>
    <div class="compare-rank-note"><span><b>4DK BOARD POSITION</b><br>#${a.rank} ${esc(a.name)} · #${b.rank} ${esc(b.name)}</span>
       <span class="compare-rank-gap">${Math.abs(a.rank-b.rank)} RANK ${Math.abs(a.rank-b.rank)===1?'PLACE':'PLACES'} APART</span></div>
    <div class="compare-stats"><div class="compare-stats-head"><span class="eyebrow">2025–26 · PUBLISHED PLAYER STAT LINES</span><h3>BY THE NUMBERS.</h3><p>Values are read directly from our existing Top 50. Bars are proportional within each statistic, not a composite score.</p></div>
      <div class="compare-metric-names"><span>${esc(a.name)}</span><span>${esc(b.name)}</span></div>
      ${compareMetric(a,b,'POINTS','PPG')}${compareMetric(a,b,'REBOUNDS','RPG')}${compareMetric(a,b,'ASSISTS','APG')}
      <div class="compare-stat-raw"><div><strong>${esc(a.name)}</strong><p>${esc(a.stats||'Not supplied')}</p></div><div><strong>${esc(b.name)}</strong><p>${esc(b.stats||'Not supplied')}</p></div></div>
      <p class="fineprint">${esc(gamesText)} Different game totals and injury absences affect interpretation. A dash (—) means the published source does not supply a comparable value; it does not mean zero.</p>
    </div>
    <div class="compare-essays-head"><span class="eyebrow">4DK SCOUTING ROOM</span><h2>THE ORIGINAL ARGUMENTS.</h2><p>These are the actual words from our existing Top 50, not a condensed or newly generated verdict.</p></div>
    <div class="compare-editorial-grid">${compareEssay(a,'a')}${compareEssay(b,'b')}</div>
    <div class="compare-bottom"><span>SHARE THIS SPECIFIC MATCHUP</span><a href="${esc(url.pathname+url.search)}">${esc(url.pathname+url.search)}</a><p>Use this link to revisit the same comparison. The player order and existing ranking essays are preserved.</p></div>`;
    const selectA=panel.querySelector('#compare-select-a'),selectB=panel.querySelector('#compare-select-b');
    selectA.addEventListener('change',()=>setMatchup(Number(selectA.value),state.compareB));
    selectB.addEventListener('change',()=>setMatchup(state.compareA,Number(selectB.value)));
    panel.querySelector('#compare-swap').addEventListener('click',()=>setMatchup(state.compareB,state.compareA));
    panel.querySelectorAll('[data-matchup]').forEach(button=>button.addEventListener('click',()=>{const pair=button.dataset.matchup.split('-').map(Number);setMatchup(pair[0],pair[1]);}));
  }
  function setMatchup(a,b){
    if(!Number.isInteger(a)||!Number.isInteger(b)||a<1||a>50||b<1||b>50||a===b)return;
    state.compareA=a;state.compareB=b;
    const url=new URL(location.href);url.searchParams.set('compare',`${a}-${b}`);
    try {history.replaceState(null,'',url.pathname+url.search+url.hash);} catch (_) { /* local/offline preview origin */ }
    renderCompare();
  }

  function render(){if(state.tab==='history')renderHistory();else if(state.tab==='compare')renderCompare();else renderBoard();}
  document.querySelectorAll('.hub-tab').forEach(button=>button.addEventListener('click',()=>changeTab(button.dataset.tab)));
  async function start() {
    try {
      const [pDoc,tDoc]=await Promise.all([loadSource(PLAYER_SOURCE),loadSource(TEAM_SOURCE)]);
      const data=readPlayers(pDoc);state.players=data.players;state.history=data.history;
      state.teams=readTeams(tDoc);
      if(location.hash){const rank=Number(location.hash.slice(1).replace('player-',''));if(rank>=1&&rank<=50)state.playerRank=rank;}
      const requested=new URLSearchParams(location.search).get('compare');
      if(requested){const match=/^(\d{1,2})-(\d{1,2})$/.exec(requested);if(match){const a=Number(match[1]),b=Number(match[2]);if(a>=1&&a<=50&&b>=1&&b<=50&&a!==b){state.compareA=a;state.compareB=b;state.tab='compare';tabMarkup('compare');}}}
      render();
      root.dataset.ready='true';
      console.info('4DK NBA Rankings HQ verified',state.players.length,'player profiles and',state.teams.length,'team profiles.');
    } catch (err) {
      console.error('4DK Rankings HQ could not load its source articles:',err);
      panel.innerHTML=`<div class="error" role="alert"><strong>The rankings could not be loaded right now.</strong><p>This hub needs both original 4DK ranking pages on the same website. The original articles are still available and have not been changed.</p><p><a href="${PLAYER_SOURCE}">Read Top 50 players →</a> &nbsp; <a href="${TEAM_SOURCE}">Read 30-team rankings →</a></p><p class="fineprint">${esc(err.message)}</p></div>`;
    }
  }
  start();
})();
