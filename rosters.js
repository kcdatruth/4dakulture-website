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

  /* Permanent 4DK team directory.
     This keeps all 62 team cards visible even if an upstream "all teams" endpoint
     has a temporary outage. Rosters themselves still update live. */
  const NBA_TEAMS = [
    ['1','ATL','Atlanta Hawks','Atlanta','Hawks','atl'],
    ['2','BOS','Boston Celtics','Boston','Celtics','bos'],
    ['17','BKN','Brooklyn Nets','Brooklyn','Nets','bkn'],
    ['30','CHA','Charlotte Hornets','Charlotte','Hornets','cha'],
    ['4','CHI','Chicago Bulls','Chicago','Bulls','chi'],
    ['5','CLE','Cleveland Cavaliers','Cleveland','Cavaliers','cle'],
    ['6','DAL','Dallas Mavericks','Dallas','Mavericks','dal'],
    ['7','DEN','Denver Nuggets','Denver','Nuggets','den'],
    ['8','DET','Detroit Pistons','Detroit','Pistons','det'],
    ['9','GS','Golden State Warriors','Golden State','Warriors','gs'],
    ['10','HOU','Houston Rockets','Houston','Rockets','hou'],
    ['11','IND','Indiana Pacers','Indiana','Pacers','ind'],
    ['12','LAC','LA Clippers','Los Angeles','Clippers','lac'],
    ['13','LAL','Los Angeles Lakers','Los Angeles','Lakers','lal'],
    ['29','MEM','Memphis Grizzlies','Memphis','Grizzlies','mem'],
    ['14','MIA','Miami Heat','Miami','Heat','mia'],
    ['15','MIL','Milwaukee Bucks','Milwaukee','Bucks','mil'],
    ['16','MIN','Minnesota Timberwolves','Minnesota','Timberwolves','min'],
    ['3','NO','New Orleans Pelicans','New Orleans','Pelicans','no'],
    ['18','NY','New York Knicks','New York','Knicks','ny'],
    ['25','OKC','Oklahoma City Thunder','Oklahoma City','Thunder','okc'],
    ['19','ORL','Orlando Magic','Orlando','Magic','orl'],
    ['20','PHI','Philadelphia 76ers','Philadelphia','76ers','phi'],
    ['21','PHX','Phoenix Suns','Phoenix','Suns','phx'],
    ['22','POR','Portland Trail Blazers','Portland','Trail Blazers','por'],
    ['23','SAC','Sacramento Kings','Sacramento','Kings','sac'],
    ['24','SA','San Antonio Spurs','San Antonio','Spurs','sa'],
    ['28','TOR','Toronto Raptors','Toronto','Raptors','tor'],
    ['26','UTA','Utah Jazz','Utah','Jazz','utah'],
    ['27','WSH','Washington Wizards','Washington','Wizards','wsh']
  ];

  const NFL_TEAMS = [
    ['22','ARI','Arizona Cardinals','Arizona','Cardinals','ari'],
    ['1','ATL','Atlanta Falcons','Atlanta','Falcons','atl'],
    ['33','BAL','Baltimore Ravens','Baltimore','Ravens','bal'],
    ['2','BUF','Buffalo Bills','Buffalo','Bills','buf'],
    ['29','CAR','Carolina Panthers','Carolina','Panthers','car'],
    ['3','CHI','Chicago Bears','Chicago','Bears','chi'],
    ['4','CIN','Cincinnati Bengals','Cincinnati','Bengals','cin'],
    ['5','CLE','Cleveland Browns','Cleveland','Browns','cle'],
    ['6','DAL','Dallas Cowboys','Dallas','Cowboys','dal'],
    ['7','DEN','Denver Broncos','Denver','Broncos','den'],
    ['8','DET','Detroit Lions','Detroit','Lions','det'],
    ['9','GB','Green Bay Packers','Green Bay','Packers','gb'],
    ['34','HOU','Houston Texans','Houston','Texans','hou'],
    ['11','IND','Indianapolis Colts','Indianapolis','Colts','ind'],
    ['30','JAX','Jacksonville Jaguars','Jacksonville','Jaguars','jax'],
    ['12','KC','Kansas City Chiefs','Kansas City','Chiefs','kc'],
    ['13','LV','Las Vegas Raiders','Las Vegas','Raiders','lv'],
    ['24','LAC','Los Angeles Chargers','Los Angeles','Chargers','lac'],
    ['14','LAR','Los Angeles Rams','Los Angeles','Rams','lar'],
    ['15','MIA','Miami Dolphins','Miami','Dolphins','mia'],
    ['16','MIN','Minnesota Vikings','Minnesota','Vikings','min'],
    ['17','NE','New England Patriots','New England','Patriots','ne'],
    ['18','NO','New Orleans Saints','New Orleans','Saints','no'],
    ['19','NYG','New York Giants','New York','Giants','nyg'],
    ['20','NYJ','New York Jets','New York','Jets','nyj'],
    ['21','PHI','Philadelphia Eagles','Philadelphia','Eagles','phi'],
    ['23','PIT','Pittsburgh Steelers','Pittsburgh','Steelers','pit'],
    ['25','SF','San Francisco 49ers','San Francisco','49ers','sf'],
    ['26','SEA','Seattle Seahawks','Seattle','Seahawks','sea'],
    ['27','TB','Tampa Bay Buccaneers','Tampa Bay','Buccaneers','tb'],
    ['10','TEN','Tennessee Titans','Tennessee','Titans','ten'],
    ['28','WSH','Washington Commanders','Washington','Commanders','was']
  ];

  const TEAM_COLORS = {
    nba:{
      ATL:['e03a3e','c1d32f'],BOS:['007a33','ba9653'],BKN:['000000','ffffff'],CHA:['1d1160','00788c'],
      CHI:['ce1141','000000'],CLE:['860038','fdbb30'],DAL:['00538c','002b5e'],DEN:['0e2240','fec524'],
      DET:['c8102e','1d42ba'],GS:['1d428a','ffc72c'],HOU:['ce1141','000000'],IND:['002d62','fdbb30'],
      LAC:['c8102e','1d428a'],LAL:['552583','fdb927'],MEM:['5d76a9','12173f'],MIA:['98002e','f9a01b'],
      MIL:['00471b','eee1c6'],MIN:['0c2340','78be20'],NO:['0c2340','c8102e'],NY:['006bb6','f58426'],
      OKC:['007ac1','ef3b24'],ORL:['0077c0','c4ced4'],PHI:['006bb6','ed174c'],PHX:['1d1160','e56020'],
      POR:['e03a3e','000000'],SAC:['5a2d81','63727a'],SA:['c4ced4','000000'],TOR:['ce1141','000000'],
      UTA:['002b5c','f9a01b'],WSH:['002b5c','e31837']
    },
    nfl:{
      ARI:['97233f','ffb612'],ATL:['a71930','000000'],BAL:['241773','9e7c0c'],BUF:['00338d','c60c30'],
      CAR:['0085ca','101820'],CHI:['0b162a','c83803'],CIN:['fb4f14','000000'],CLE:['311d00','ff3c00'],
      DAL:['041e42','869397'],DEN:['fb4f14','002244'],DET:['0076b6','b0b7bc'],GB:['203731','ffb612'],
      HOU:['03202f','a71930'],IND:['002c5f','a2aaad'],JAX:['006778','d7a22a'],KC:['e31837','ffb81c'],
      LV:['000000','a5acaf'],LAC:['0080c6','ffc20e'],LAR:['003594','ffa300'],MIA:['008e97','fc4c02'],
      MIN:['4f2683','ffc62f'],NE:['002244','c60c30'],NO:['d3bc8d','101820'],NYG:['0b2265','a71930'],
      NYJ:['125740','ffffff'],PHI:['004c54','a5acaf'],PIT:['ffb612','101820'],SF:['aa0000','b3995d'],
      SEA:['002244','69be28'],TB:['d50a0a','ff7900'],TEN:['0c2340','4b92db'],WSH:['5a1414','ffb612']
    }
  };

  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  function logoUrl(slug){
    return `https://a.espncdn.com/i/teamlogos/${league}/500/${slug}.png`;
  }

  function fixedTeams(){
    const rows = league === 'nba' ? NBA_TEAMS : NFL_TEAMS;
    return rows.map(([id,abbreviation,displayName,location,nickname,logoSlug]) => {
      const colors = TEAM_COLORS[league]?.[abbreviation] || ['20252f','d7dce2'];
      return {
        id,abbreviation,displayName,location,nickname,logoSlug,
        color:colors[0],alternateColor:colors[1],logo:logoUrl(logoSlug)
      };
    });
  }

  let teams = fixedTeams();
  let activeTeam = null;
  let roster = [];
  let activeFilter = 'ALL';

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
          <img src="${esc(team.logo)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
          <b style="display:none">${esc(team.abbreviation)}</b>
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

  function birthPlaceText(place){
    if(!place) return '';
    return [place.city,place.state,place.country].filter(Boolean).join(', ');
  }

  function injuryText(injuries){
    if(!Array.isArray(injuries) || !injuries.length) return '';
    const injury = injuries[0] || {};
    return injury.status
      || injury.type?.description
      || injury.type?.name
      || injury.details?.type
      || injury.details?.detail
      || injury.shortComment
      || injury.longComment
      || 'Injury listed';
  }

  function playerLink(athlete){
    const links = Array.isArray(athlete?.links) ? athlete.links : [];
    const card = links.find(link => Array.isArray(link.rel) && link.rel.includes('playercard'));
    return card?.href || links.find(link => /^https?:\/\//.test(link?.href || ''))?.href || '';
  }

  function normalizeDirectPlayer(athlete, group){
    return {
      id:String(athlete?.id || ''),
      name:athlete?.displayName || athlete?.fullName || athlete?.shortName || 'Player',
      shortName:athlete?.shortName || '',
      jersey:athlete?.jersey || '',
      position:athlete?.position?.abbreviation || athlete?.position?.displayName || group || '',
      positionName:athlete?.position?.displayName || athlete?.position?.name || group || '',
      group:group || athlete?.position?.displayName || 'Roster',
      age:athlete?.age ?? null,
      height:athlete?.displayHeight || '',
      weight:athlete?.displayWeight || '',
      experience:athlete?.experience?.years ?? null,
      college:athlete?.college?.name || athlete?.college?.shortName || '',
      birthPlace:birthPlaceText(athlete?.birthPlace),
      headshot:athlete?.headshot?.href || '',
      status:athlete?.status?.name || athlete?.status?.type || athlete?.status?.abbreviation || 'Active',
      injury:injuryText(athlete?.injuries),
      salary:null,
      profile:playerLink(athlete)
    };
  }

  function flattenDirectRoster(data){
    const source = Array.isArray(data?.athletes) ? data.athletes : [];
    const players = [];
    source.forEach(entry => {
      if(Array.isArray(entry?.items)){
        const group = entry.position || entry.displayName || entry.name || 'Roster';
        entry.items.forEach(athlete => players.push(normalizeDirectPlayer(athlete,group)));
      }else{
        players.push(normalizeDirectPlayer(
          entry,
          entry?.position?.displayName || entry?.position?.name || 'Roster'
        ));
      }
    });
    return players.filter(player => player.id || player.name !== 'Player');
  }

  function directCoach(data){
    const coaches = Array.isArray(data?.coach) ? data.coach : (data?.coach ? [data.coach] : []);
    const coach = coaches[0];
    return coach?.displayName
      || [coach?.firstName,coach?.lastName].filter(Boolean).join(' ')
      || coach?.name
      || '';
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

  async function getWorkerRoster(team){
    const res = await fetch(`/api/roster?league=${encodeURIComponent(league)}&team=${encodeURIComponent(team.id)}`, {cache:'no-store'});
    if(!res.ok) throw new Error('Worker roster unavailable');
    const data = await res.json();
    if(!Array.isArray(data.players) || !data.players.length) throw new Error('Worker returned empty roster');
    return data;
  }

  async function getDirectRoster(team){
    const sport = league === 'nba' ? 'basketball' : 'football';
    const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${encodeURIComponent(team.id)}/roster`;
    const res = await fetch(url, {cache:'no-store'});
    if(!res.ok) throw new Error(`Direct roster ${res.status}`);
    const data = await res.json();
    const players = flattenDirectRoster(data);
    if(!players.length) throw new Error('Direct roster returned empty');
    return {
      updatedAt:new Date().toISOString(),
      team,
      coach:directCoach(data),
      season:data?.season || null,
      count:players.length,
      players
    };
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
      let data;
      let source = '4DK live feed';

      try{
        data = await getWorkerRoster(team);
      }catch(workerError){
        console.warn('4DK Worker roster failed, trying direct feed:', workerError);
        data = await getDirectRoster(team);
        source = 'live fallback feed';
      }

      roster = Array.isArray(data.players) ? data.players : [];
      teamCount.textContent = `${roster.length} PLAYERS`;

      const parts = [];
      if(data.season?.displayName) parts.push(data.season.displayName);
      else if(data.season?.year) parts.push(String(data.season.year));
      if(data.season?.name) parts.push(data.season.name);
      if(data.coach) parts.push(`Head Coach: ${data.coach}`);
      parts.push(source);
      teamMeta.textContent = parts.join(' • ');
      updateText.textContent = data.updatedAt ? `Updated ${prettyTime(data.updatedAt)}` : '';
      rosterStatus.hidden = true;

      renderFilters();
      renderPlayers();
    }catch(err){
      console.error('4DK roster failed:', err);
      rosterStatus.hidden = false;
      rosterStatus.textContent = 'This roster feed is temporarily unavailable. The team directory is still available — try again shortly.';
    }
  }

  function bootTeams(){
    teamsStatus.hidden = true;
    renderTeams();

    const teamId = new URL(location.href).searchParams.get('team');
    if(teamId) loadRoster(teamId, false);

    /* Optional background refresh:
       If /api/teams is healthy, merge fresher names/logos/colors into our fixed
       directory without ever making the page depend on that endpoint. */
    fetch(`/api/teams?league=${encodeURIComponent(league)}`, {cache:'no-store'})
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(!Array.isArray(data?.teams) || !data.teams.length) return;
        const fresh = new Map(data.teams.map(team => [String(team.id),team]));
        teams = teams.map(team => {
          const live = fresh.get(String(team.id));
          return live ? {...team,...live,logo:live.logo || team.logo} : team;
        });
        renderTeams();
      })
      .catch(() => {});
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

  bootTeams();
})();
