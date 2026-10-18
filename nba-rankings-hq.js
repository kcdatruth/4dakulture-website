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
    const match = new RegExp('(?:^|\\s|•)([0-9]+(?:\\.[0-9]+)?)\\s*' + stat + '(?=\\s|$|•)', 'i').exec(label);
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

  /* OCT 18 — 4DK expanded Head-to-Head extras. No new player evaluations or invented votes. */
  const voteMemory = Object.create(null);
  const debateKey = (a,b) => `4dk-my-pick-2026-27-${Math.min(a,b)}-${Math.max(a,b)}`;
  function ownPick(a,b){
    const key=debateKey(a,b);
    try { const val=localStorage.getItem(key); return val===null?(voteMemory[key]||null):Number(val); }
    catch(_) { return voteMemory[key]||null; }
  }
  function saveOwnPick(a,b,pick){
    const key=debateKey(a,b); voteMemory[key]=pick;
    try {localStorage.setItem(key,String(pick));}catch(_){/* browser storage may be unavailable */}
  }
  function currentMatchupLink(a,b){
    const url=new URL(location.href); url.hash=''; url.searchParams.set('compare',`${a.rank}-${b.rank}`);
    return url.href;
  }
  async function copyText(str){
    if(navigator.clipboard && window.isSecureContext){try {await navigator.clipboard.writeText(str);return true;}catch(_){/* fallback below */}}
    const ta=document.createElement('textarea'); ta.value=str;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;opacity:0;left:-9999px;top:0';document.body.appendChild(ta);ta.select();
    let worked=false;try {worked=document.execCommand('copy');}catch(_){}ta.remove();return worked;
  }
  function socialShareText(a,b,pick=null){return `4 DA KULTURE · WHO YOU GOT?\n#${a.rank} ${a.name} vs #${b.rank} ${b.name}${pick?`\nMy pick: ${pick.name}`:''}\n${currentMatchupLink(a,b)}`;}
  function verdictMarkup(a,b){
    const high=a.rank<b.rank?a:b;const low=a.rank<b.rank?b:a;
    return `<section class="extra-verdict" aria-label="4DK editorial comparison">
      <span class="eyebrow">THE 4DK VERDICT DESK</span><h2>THE RANKINGS EDGE. <em>THE REAL DEBATE.</em></h2>
      <div class="verdict-grid"><div class="verdict-lead"><small>WHAT OUR PUBLISHED BOARD SAYS</small><strong>#${high.rank} ${esc(high.name)}</strong><p>4DK currently ranks ${esc(high.name)} above ${esc(low.name)} on its 2026–27 Top 50. That's our documented overall ranking, <b>not</b> a newly declared one-game or playoff-series winner.</p></div>
      <div class="verdict-pending"><small>HEAD-TO-HEAD EDITORIAL CALL</small><strong>NOT YET PUBLISHED</strong><p>We won't invent 4DK's playoff pick, defensive grades, or overall winner. The original essays below contain the full case for both players. An official 4DK showdown verdict can be published once the editors make that call.</p></div></div>
      <div class="verdict-lenses"><div><b>SCORING & CREATION</b><p>Compare the documented scoring and playmaking plus each player's original 4DK analysis.</p></div><div><b>DEFENSE & AVAILABILITY</b><p>Use source game totals, scouting context, and what the original essays say about each player's impact.</p></div><div><b>PLAYOFF TRUST</b><p>Who would we take in a series? A separate editorial judgment—not something a stat bar can decide.</p></div></div>
    </section>`;
  }
  function voteMarkup(a,b){
    const selected=ownPick(a.rank,b.rank);
    return `<section class="extra-debate" aria-label="Fan debate preview"><span class="eyebrow">4DK WHO YOU GOT?</span><h2>YOUR CALL. YOUR SIDE.</h2>
      <p>Choose your player for this matchup. Your pick is saved <strong>only in this browser</strong> when storage is available. This is not a public vote, and no sitewide vote totals are being counted yet.</p>
      <div class="vote-choice"><button type="button" data-debate-vote="${a.rank}" aria-pressed="${selected===a.rank}">#${a.rank} ${esc(a.name)}</button><button type="button" data-debate-vote="${b.rank}" aria-pressed="${selected===b.rank}">#${b.rank} ${esc(b.name)}</button></div>
      <div class="vote-result" role="status" aria-live="polite">${selected?`Your pick: <b>${esc(state.players[selected-1]?.name||'')}</b>. This is your saved preference, not a public result.`:'Make your pick to save your side on this device.'}</div>
      <button type="button" class="extra-share-pick" id="share-own-pick" ${!selected?'disabled':''}>SHARE MY PICK ↗</button>
    </section>`;
  }
  function socialMarkup(a,b){
    const url=currentMatchupLink(a,b);
    return `<section class="extra-social" aria-label="Share matchup"><div><span class="eyebrow">4DK SHARE STUDIO</span><h2>TAKE THE DEBATE OUTSIDE.</h2><p>Save a branded matchup graphic for Instagram or X, or copy the exact matchup link. Only source-published rankings and statistics appear on the graphic.</p></div>
      <div class="social-preview"><div class="social-brand">4<span>DA</span>KULTURE <small>NBA • HEAD-TO-HEAD</small></div><div class="social-names"><div><b>#${a.rank}</b><strong>${esc(a.name)}</strong><small>${esc(a.team)}</small></div><i>VS</i><div><b>#${b.rank}</b><strong>${esc(b.name)}</strong><small>${esc(b.team)}</small></div></div><p>WHO YOU GOT? <span>4DAKULTUREMEDIA.COM</span></p></div>
      <div class="social-actions"><button type="button" id="save-feed">SAVE IG FEED · 1080×1350</button><button type="button" id="save-story">SAVE STORY · 1080×1920</button><button type="button" id="copy-matchup">COPY MATCHUP LINK</button><button type="button" id="native-share">SHARE MATCHUP ↗</button></div>
      <div class="social-feedback" id="social-feedback" role="status" aria-live="polite"></div><p class="fineprint">Exports use real 4DK text and stats. Portraits are included when the NBA image server permits safe image export; otherwise a clean typography-first card is generated without fake player photos.</p>
      <div class="social-link"><small>DIRECT MATCHUP LINK</small><a href="${esc(url)}">${esc(url)}</a></div>
    </section>`;
  }
  function roundRect(ctx,x,y,w,h,r,fill){
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();
  }
  function textLines(ctx,value,maxWidth,fontSize,maxLines=3){
    let size=fontSize; ctx.font=`900 ${size}px Impact, 'Arial Narrow', sans-serif`;
    let lines=[];
    for(;size>=25;size-=2){
      ctx.font=`900 ${size}px Impact, 'Arial Narrow', sans-serif`;
      const rawWords=value.toUpperCase().split(/\s+/);let words=[];lines=[];let cur='';
      for(const raw of rawWords){
        if(ctx.measureText(raw).width<=maxWidth){words.push(raw);continue;}
        let chunk='';for(const ch of raw){if(chunk && ctx.measureText(chunk+ch).width>maxWidth){words.push(chunk);chunk=ch;}else{chunk+=ch;}}
        if(chunk)words.push(chunk);
      }
      for(const word of words){const candidate=cur?cur+' '+word:word;
        if(ctx.measureText(candidate).width>maxWidth && cur){lines.push(cur);cur=word;}else{cur=candidate;}}
      if(cur)lines.push(cur);if(lines.length<=maxLines && lines.every(x=>ctx.measureText(x).width<=maxWidth))break;
    }
    return {lines,size};
  }
  async function exportPortrait(ctx,p,x,y,w,h){
    if(!p.image)return false;
    const img=new Image(); img.crossOrigin='anonymous'; img.decoding='async';
    const loaded=await new Promise(resolve=>{
      let done=false;const finish=v=>{if(!done){done=true;resolve(v)}};
      const timeout=setTimeout(()=>finish(false),5000);
      img.onload=()=>{clearTimeout(timeout);finish(true)};
      img.onerror=()=>{clearTimeout(timeout);finish(false)};
      img.src=p.image;
    });
    if(!loaded)return false;
    try{ const ratio=Math.min(w/img.width,h/img.height);const iw=img.width*ratio,ih=img.height*ratio;ctx.drawImage(img,x+(w-iw)/2,y+h-ih,iw,ih);return true;}catch(_){return false;}
  }
  async function exportCard(a,b,story,feedback){
    const W=1080,H=story?1920:1350,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext('2d');if(!ctx){feedback.textContent='Graphic export is not supported in this browser.';return;}
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#141116');bg.addColorStop(.6,'#2e1b24');bg.addColorStop(1,'#090a0f');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#e34b3e';ctx.fillRect(0,0,W,15);
    ctx.fillStyle='#edc887';ctx.font='900 80px Impact, sans-serif';ctx.fillText('4',56,108);
    ctx.fillStyle='#f9eee1';ctx.font='900 37px Arial, sans-serif';ctx.fillText('DA KULTURE',109,105);
    ctx.fillStyle='#eac27f';ctx.font='bold 20px Arial, sans-serif';ctx.fillText('NBA • 2026–27 • HEAD-TO-HEAD',55,165);
    ctx.fillStyle='#fff4e8';ctx.font='900 86px Impact, sans-serif';ctx.fillText('WHO YOU GOT?',55,270);
    ctx.fillStyle='#b9a9ab';ctx.font='24px Arial, sans-serif';ctx.fillText('THE RANKINGS. THE CULTURE. THE ARGUMENT.',55,318);
    const gap=22,px=55,cardW=(W-110-gap)/2,top=story?420:350,cardH=story?890:550;
    const portraits=story?440:290;
    for(const [idx,p] of [a,b].entries()){
      const x=px+idx*(cardW+gap);
      roundRect(ctx,x,top,cardW,cardH,16,idx?'#30242b':'#39232d');
      ctx.strokeStyle=idx?'#907356':'#ac5554';ctx.lineWidth=2;ctx.strokeRect(x,top,cardW,cardH);
      ctx.fillStyle='#edc887';ctx.font='900 91px Impact, sans-serif';ctx.fillText('#'+p.rank,x+20,top+102);
      const name=textLines(ctx,p.name,cardW-35,53,2);ctx.fillStyle='#fff5ea';ctx.font=`900 ${name.size}px Impact, sans-serif`;
      name.lines.forEach((line,j)=>ctx.fillText(line,x+20,top+170+j*(name.size+3)));
      const team=p.team.length>29?p.team.slice(0,28)+'…':p.team;
      // NBA portraits are included only if the host explicitly permits cross-origin canvas access.
      const py=top+cardH-portraits-24;
      const portraitOk=await exportPortrait(ctx,p,x+12,py,cardW-24,portraits);
      if(!portraitOk){
        // Photo-free fallback: true-to-4DK typography, without generating a fake athlete portrait.
        const cy=py+portraits*.5,cx=x+cardW*.5,r=Math.min(cardW*.32,portraits*.40);
        ctx.save();ctx.globalAlpha=.35;ctx.lineWidth=4;ctx.strokeStyle=idx?'#eac281':'#f0aa97';
        ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(cx-r,cy);ctx.lineTo(cx+r,cy);ctx.stroke();
        ctx.beginPath();ctx.moveTo(cx,cy-r);ctx.lineTo(cx,cy+r);ctx.stroke();
        ctx.beginPath();ctx.ellipse(cx,cy,r*.58,r,0,0,Math.PI*2);ctx.stroke();ctx.restore();
        const initials=p.name.split(/\s+/).map(v=>v[0]).join('').slice(0,3).toUpperCase();
        ctx.fillStyle='#f0d3a4';ctx.font='900 84px Impact, sans-serif';ctx.textAlign='center';ctx.fillText(initials,cx,cy+29);ctx.textAlign='start';
      }
      ctx.fillStyle='rgba(13,12,19,.92)';ctx.fillRect(x+2,top+cardH-58,cardW-4,56);
      ctx.fillStyle='#efd1aa';ctx.font='bold 19px Arial, sans-serif';ctx.fillText(team,x+18,top+cardH-22);
    }
    roundRect(ctx,W/2-54,top+cardH*.43,108,94,48,'#b6383d');ctx.fillStyle='#fff';ctx.font='900 47px Impact, sans-serif';ctx.fillText('VS',W/2-30,top+cardH*.43+62);
    const statTop=top+cardH+55;
    ctx.fillStyle='#edc887';ctx.font='900 37px Impact, sans-serif';ctx.fillText('2025–26 • BY THE NUMBERS',55,statTop);
    const fields=[['PPG','POINTS'],['RPG','REBOUNDS'],['APG','ASSISTS']];
    const fieldGap=story?86:65;
    fields.forEach(([code,label],i)=>{const y=statTop+50+i*fieldGap;const av=publishedStat(a,code),bv=publishedStat(b,code);
      ctx.fillStyle='#ece0d8';ctx.font='bold 24px Arial, sans-serif';ctx.fillText(av===null?'—':av.toFixed(1),60,y);
      ctx.fillStyle='#c9aaa5';ctx.font='bold 19px Arial, sans-serif';const tw=ctx.measureText(label).width;ctx.fillText(label,(W-tw)/2,y);
      const str=bv===null?'—':bv.toFixed(1);const width=ctx.measureText(str).width;ctx.fillStyle='#f2cc92';ctx.fillText(str,W-60-width,y);
      ctx.fillStyle='#54404a';ctx.fillRect(55,y+12,W-110,1);
    });
    ctx.fillStyle='#c4ada6';ctx.font='18px Arial, sans-serif';ctx.fillText('SOURCE: 4DK 2026–27 TOP 50 • NOT AN AUTOMATED VERDICT',55,H-115);
    ctx.fillStyle='#edc887';ctx.font='900 25px Arial, sans-serif';ctx.fillText('4DAKULTUREMEDIA.COM',55,H-65);
    const blob=await new Promise(resolve=>{try{canvas.toBlob(resolve,'image/png')}catch(_){resolve(null)}});
    if(!blob){feedback.textContent='Graphic could not be exported. Try the copy-link option.';return;}
    const obj=URL.createObjectURL(blob),anchor=document.createElement('a');anchor.href=obj;anchor.download=`4DK-${a.rank}-vs-${b.rank}-${story?'story':'feed'}.png`;
    document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(obj),15000);
    feedback.textContent=`${story?'Story':'Feed'} graphic ready. Check your browser downloads.`;
  }
  function wireExtendedCompare(a,b){
    const feedback=panel.querySelector('#social-feedback');
    panel.querySelector('#copy-matchup')?.addEventListener('click',async()=>{feedback.textContent=(await copyText(currentMatchupLink(a,b)))?'Matchup link copied.':'Copy not available; use the direct link below.'});
    panel.querySelector('#native-share')?.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:`4DK: ${a.name} vs ${b.name}`,text:'4DK NBA Head-to-Head',url:currentMatchupLink(a,b)});return;}catch(e){if(e.name==='AbortError')return;}}
      feedback.textContent=(await copyText(currentMatchupLink(a,b)))?'Matchup link copied for sharing.':'Use the matchup link below to share.';});
    panel.querySelector('#save-feed')?.addEventListener('click',async e=>{e.currentTarget.disabled=true;feedback.textContent='Creating feed graphic…';try{await exportCard(a,b,false,feedback)}finally{const b=panel.querySelector('#save-feed');if(b)b.disabled=false;}});
    panel.querySelector('#save-story')?.addEventListener('click',async e=>{e.currentTarget.disabled=true;feedback.textContent='Creating story graphic…';try{await exportCard(a,b,true,feedback)}finally{const b=panel.querySelector('#save-story');if(b)b.disabled=false;}});
    panel.querySelectorAll('[data-debate-vote]').forEach(button=>button.addEventListener('click',()=>{saveOwnPick(a.rank,b.rank,Number(button.dataset.debateVote));
      panel.querySelectorAll('[data-debate-vote]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const selected=state.players[Number(button.dataset.debateVote)-1];
      panel.querySelector('.vote-result').innerHTML=`Your pick: <b>${esc(selected.name)}</b>. This is your saved preference, not a public result.`;
      const share=panel.querySelector('#share-own-pick');if(share)share.disabled=false;
    }));
    panel.querySelector('#share-own-pick')?.addEventListener('click',async()=>{
      const rank=ownPick(a.rank,b.rank),pick=state.players[rank-1];if(!pick)return;
      const msg=socialShareText(a,b,pick);
      if(navigator.share){try{await navigator.share({title:'4DK WHO YOU GOT?',text:msg});return;}catch(e){if(e.name==='AbortError')return;}}
      feedback.textContent=(await copyText(msg))?'Your pick and matchup link copied.':'Use the matchup link to share your pick.';
    });
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
      ${compareMetric(a,b,'GAMES PLAYED','G')}${compareMetric(a,b,'FIELD GOAL %','FG%')}
      <div class="compare-stat-raw"><div><strong>${esc(a.name)}</strong><p>${esc(a.stats||'Not supplied')}</p></div><div><strong>${esc(b.name)}</strong><p>${esc(b.stats||'Not supplied')}</p></div></div>
      <p class="fineprint">${esc(gamesText)} Different game totals and injury absences affect interpretation. A dash (—) means the published source does not supply a comparable value; it does not mean zero.</p>
    </div>
    ${verdictMarkup(a,b)}
    <div class="compare-essays-head"><span class="eyebrow">4DK SCOUTING ROOM</span><h2>THE ORIGINAL ARGUMENTS.</h2><p>These are the actual words from our existing Top 50, not a condensed or newly generated verdict.</p></div>
    <div class="compare-editorial-grid">${compareEssay(a,'a')}${compareEssay(b,'b')}</div>
    ${voteMarkup(a,b)}
    ${socialMarkup(a,b)}
    <div class="compare-bottom"><span>SHARE THIS SPECIFIC MATCHUP</span><a href="${esc(url.pathname+url.search)}">${esc(url.pathname+url.search)}</a><p>Use this link to revisit the same comparison. The player order and existing ranking essays are preserved.</p></div>`;
    const selectA=panel.querySelector('#compare-select-a'),selectB=panel.querySelector('#compare-select-b');
    selectA.addEventListener('change',()=>setMatchup(Number(selectA.value),state.compareB));
    selectB.addEventListener('change',()=>setMatchup(state.compareA,Number(selectB.value)));
    panel.querySelector('#compare-swap').addEventListener('click',()=>setMatchup(state.compareB,state.compareA));
    panel.querySelectorAll('[data-matchup]').forEach(button=>button.addEventListener('click',()=>{const pair=button.dataset.matchup.split('-').map(Number);setMatchup(pair[0],pair[1]);}));
    wireExtendedCompare(a,b);
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
