(() => {
  const root = document.querySelector('[data-roster-app]');
  if(!root) return;

  const league = root.dataset.league;
  const leagueLabel = league === 'nba' ? 'NBA' : 'NFL';

  const teamsGrid = root.querySelector('[data-teams-grid]');
  const search = root.querySelector('[data-team-search]');
  const teamsStatus = root.querySelector('[data-teams-status]');
  const rosterView = root.querySelector('[data-roster-view]');
  const rosterStatus = root.querySelector('[data-roster-status]');
  const rosterPlayers = root.querySelector('[data-roster-players]');
  const rosterFilters = root.querySelector('[data-roster-filters]');
  const teamLogo = root.querySelector('[data-team-logo]');
  const teamName = root.querySelector('[data-team-name]');
  const teamMeta = root.querySelector('[data-team-meta]');
  const teamCount = root.querySelector('[data-team-count]');
  const updateText = root.querySelector('[data-update-text]');
  const backBtn = root.querySelector('[data-back-teams]');

  let teams = [];
  let activeTeam = null;
  let roster = [];
  let activeFilter = 'ALL';

  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  const money = value => {
    if(!Number.isFinite(value)) return '';
    return new Intl.NumberFormat('en-US',{
      style:'currency',currency:'USD',maximumFractionDigits:0
    }).format(value);
  };

  function prettyTime(iso){
    if(!iso) return '';
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(undefined,{
      month:'short',day:'numeric',hour:'numeric',minute:'2-digit'
    }).format(d);
  }

  function teamCard(team){
    const color = `#${team.color || '20252f'}`;
    const alt = `#${team.alternateColor || 'd7dce2'}`;
    return `
      <button class="roster-team-card" type="button" data-team-id="${esc(team.id)}"
        style="--team:${esc(color)};--team-alt:${esc(alt)}">
        <span class="roster-team-logo">
          ${team.logo ? `<img src="${esc(team.logo)}" alt="">` : `<b>${esc(team.abbreviation)}</b>`}
        </span>
        <span class="roster-team-copy">
          <small>${esc(team.abbreviation)}</small>
          <strong>${esc(team.displayName)}</strong>
        </span>
        <span class="roster-team-arrow">→</span>
      </button>
    `;
  }

  function renderTeams(){
    const q = (search?.value || '').toLowerCase().trim();
    const shown = teams.filter(team => {
      const hay = `${team.displayName} ${team.abbreviation} ${team.location} ${team.nickname}`.toLowerCase();
      return !q || hay.includes(q);
    });

    teamsGrid.innerHTML = shown.length
      ? shown.map(teamCard).join('')
      : `<div class="roster-empty">No ${leagueLabel} team matches that search.</div>`;

    teamsGrid.querySelectorAll('[data-team-id]').forEach(btn => {
      btn.addEventListener('click',() => loadRoster(btn.dataset.teamId, true));
    });
  }

  function playerGroup(player){
    const raw = String(player.group || player.positionName || player.position || 'Roster').trim();
    if(league === 'nfl'){
      const value = raw.toLowerCase();
      if(/quarter|running|fullback|wide receiver|tight end|offensive|guard|center|tackle/.test(value)) return 'OFFENSE';
      if(/defensive|lineback|corner|safety|nose/.test(value)) return 'DEFENSE';
      if(/special|kicker|punter|long snapper/.test(value)) return 'SPECIAL TEAMS';
    }
    if(league === 'nba'){
      const value = `${player.position} ${player.positionName}`.toLowerCase();
      if(value.includes('guard')) return 'GUARDS';
      if(value.includes('forward')) return 'FORWARDS';
      if(value.includes('center')) return 'CENTERS';
    }
    return raw.toUpperCase() || 'ROSTER';
  }

  function playerCard(player){
    const injury = player.injury
      ? `<span class="player-alert">INJURY: ${esc(player.injury)}</span>`
      : '';
    const salary = league === 'nba' && Number.isFinite(player.salary)
      ? `<span><b>Salary</b>${esc(money(player.salary))}</span>`
      : '';
    const college = player.college ? `<span><b>College</b>${esc(player.college)}</span>` : '';
    const exp = player.experience != null
      ? `<span><b>Experience</b>${player.experience === 0 ? 'Rookie' : `${esc(player.experience)} yr${player.experience === 1 ? '' : 's'}`}</span>`
      : '';

    return `
      <article class="roster-player" data-group="${esc(playerGroup(player))}">
        <div class="player-photo">
          ${player.headshot
            ? `<img loading="lazy" src="${esc(player.headshot)}" alt="${esc(player.name)}">`
            : `<div class="player-no-photo">#${esc(player.jersey || '—')}</div>`}
          <span class="player-number">#${esc(player.jersey || '—')}</span>
        </div>
        <div class="player-main">
          <div class="player-title">
            <div>
              <small>${esc(player.position || player.positionName || 'ROSTER')}</small>
              <h3>${esc(player.name)}</h3>
            </div>
            <span class="player-status">${esc(player.status || 'Active')}</span>
          </div>
          ${injury}
          <div class="player-facts">
            ${player.height ? `<span><b>Height</b>${esc(player.height)}</span>` : ''}
            ${player.weight ? `<span><b>Weight</b>${esc(player.weight)}</span>` : ''}
            ${player.age != null ? `<span><b>Age</b>${esc(player.age)}</span>` : ''}
            ${exp}
            ${college}
            ${salary}
          </div>
          ${player.profile ? `<a class="player-profile" href="${esc(player.profile)}" target="_blank" rel="noopener">Player profile ↗</a>` : ''}
        </div>
      </article>
    `;
  }

  function renderFilters(){
    const groups = ['ALL', ...new Set(roster.map(playerGroup))];
    rosterFilters.innerHTML = groups.map(group => `
      <button type="button" class="${group === activeFilter ? 'active' : ''}" data-filter="${esc(group)}">${esc(group)}</button>
    `).join('');

    rosterFilters.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click',() => {
        activeFilter = btn.dataset.filter;
        rosterFilters.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        renderPlayers();
      });
    });
  }

  function renderPlayers(){
    const shown = activeFilter === 'ALL'
      ? roster
      : roster.filter(player => playerGroup(player) === activeFilter);

    rosterPlayers.innerHTML = shown.length
      ? shown.map(playerCard).join('')
      : `<div class="roster-empty">No players in this filter.</div>`;
  }

  async function loadRoster(teamId, push=false){
    const team = teams.find(t => String(t.id) === String(teamId));
    if(!team) return;

    activeTeam = team;
    activeFilter = 'ALL';
    rosterView.hidden = false;
    rosterStatus.hidden = false;
    rosterPlayers.innerHTML = '';
    rosterFilters.innerHTML = '';
    rosterStatus.textContent = `Loading ${team.displayName} roster…`;

    teamLogo.src = team.logo || '';
    teamLogo.alt = `${team.displayName} logo`;
    teamName.textContent = team.displayName;
    teamCount.textContent = '';
    teamMeta.textContent = '';
    rosterView.style.setProperty('--team', `#${team.color || '20252f'}`);
    rosterView.style.setProperty('--team-alt', `#${team.alternateColor || 'd7dce2'}`);

    if(push){
      const next = new URL(location.href);
      next.searchParams.set('team', team.id);
      history.pushState({team:team.id},'',next);
    }

    rosterView.scrollIntoView({behavior:'smooth',block:'start'});

    try{
      const res = await fetch(`/api/roster?league=${encodeURIComponent(league)}&team=${encodeURIComponent(team.id)}`, {cache:'no-store'});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Roster unavailable');

      roster = Array.isArray(data.players) ? data.players : [];
      teamCount.textContent = `${roster.length} PLAYERS`;
      const parts = [];
      if(data.season?.displayName) parts.push(data.season.displayName);
      else if(data.season?.year) parts.push(String(data.season.year));
      if(data.season?.name) parts.push(data.season.name);
      if(data.coach) parts.push(`Head Coach: ${data.coach}`);
      teamMeta.textContent = parts.join(' • ');
      updateText.textContent = data.updatedAt ? `Updated ${prettyTime(data.updatedAt)}` : '';
      rosterStatus.hidden = true;

      renderFilters();
      renderPlayers();
    }catch(err){
      rosterStatus.hidden = false;
      rosterStatus.textContent = 'Roster data is temporarily unavailable. Try again in a moment.';
    }
  }

  async function loadTeams(){
    teamsStatus.hidden = false;
    teamsStatus.textContent = `Loading all ${leagueLabel} teams…`;

    try{
      const res = await fetch(`/api/teams?league=${encodeURIComponent(league)}`, {cache:'no-store'});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Teams unavailable');

      teams = Array.isArray(data.teams) ? data.teams : [];
      teamsStatus.hidden = true;
      renderTeams();

      const teamId = new URL(location.href).searchParams.get('team');
      if(teamId) loadRoster(teamId, false);
    }catch(err){
      teamsStatus.hidden = false;
      teamsStatus.textContent = `The ${leagueLabel} team feed is temporarily unavailable.`;
    }
  }

  search?.addEventListener('input',renderTeams);

  backBtn?.addEventListener('click',() => {
    rosterView.hidden = true;
    activeTeam = null;
    const next = new URL(location.href);
    next.searchParams.delete('team');
    history.pushState({},'',next);
    root.querySelector('.roster-team-browser')?.scrollIntoView({behavior:'smooth',block:'start'});
  });

  window.addEventListener('popstate',() => {
    const teamId = new URL(location.href).searchParams.get('team');
    if(teamId) loadRoster(teamId, false);
    else rosterView.hidden = true;
  });

  loadTeams();
})();
