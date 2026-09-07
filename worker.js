
const SPORTS = [
  { league: 'NFL', path: 'football/nfl' },
  { league: 'NBA', path: 'basketball/nba' },
  { league: 'MLB', path: 'baseball/mlb' },
  { league: 'NHL', path: 'hockey/nhl' },
  { league: 'WNBA', path: 'basketball/wnba' },
  { league: 'NCAAF', path: 'football/college-football' }
];

function easternDateKey(date = new Date()){
  const parts = new Intl.DateTimeFormat('en-US',{
    timeZone:'America/New_York',
    year:'numeric',
    month:'2-digit',
    day:'2-digit'
  }).formatToParts(date);

  const map = {};
  for(const p of parts) map[p.type] = p.value;
  return `${map.year}-${map.month}-${map.day}`;
}

function eventDateKey(iso){
  if(!iso) return '';
  const d = new Date(iso);
  if(Number.isNaN(d.getTime())) return '';
  return easternDateKey(d);
}

function scoreValue(competitor){
  const score = competitor?.score;
  if(score == null) return '';
  if(typeof score === 'object') return score.displayValue ?? score.value ?? '';
  return String(score);
}

function normalizeEvent(event, league, todayKey){
  const competition = event?.competitions?.[0];
  if(!competition) return null;

  const competitors = competition.competitors || [];
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0];
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1];

  if(!home || !away) return null;

  const status = event.status || competition.status || {};
  const type = status.type || {};
  const state = type.state || (type.completed ? 'post' : 'pre');
  const startTime = event.date || competition.date || '';

  // Keep live games no matter what. Otherwise keep only today's games.
  if(state !== 'in' && eventDateKey(startTime) !== todayKey) return null;

  let statusText = '';
  if(state === 'in'){
    const period = status.period || competition.status?.period;
    const clock = status.displayClock || competition.status?.displayClock || '';
    if(period && clock) statusText = `Q${period} ${clock}`;
    else statusText = type.shortDetail || type.detail || 'LIVE';
  }else if(state === 'post'){
    statusText = 'FINAL';
  }

  return {
    id: String(event.id || ''),
    league,
    state,
    statusText,
    startTime,
    away: {
      abbr: away.team?.abbreviation || away.team?.shortDisplayName || 'AWAY',
      name: away.team?.displayName || '',
      score: scoreValue(away)
    },
    home: {
      abbr: home.team?.abbreviation || home.team?.shortDisplayName || 'HOME',
      name: home.team?.displayName || '',
      score: scoreValue(home)
    }
  };
}

async function fetchLeague({league, path}, todayKey){
  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`;
  const response = await fetch(url, {
    headers: {'Accept':'application/json'},
    cf: { cacheTtl: 15, cacheEverything: true }
  });
  if(!response.ok) throw new Error(`${league} upstream ${response.status}`);
  const data = await response.json();
  return (data.events || [])
    .map(event => normalizeEvent(event, league, todayKey))
    .filter(Boolean);
}

function sortGames(a,b){
  const rank = {in:0, pre:1, post:2};
  const stateDiff = (rank[a.state] ?? 9) - (rank[b.state] ?? 9);
  if(stateDiff) return stateDiff;
  return new Date(a.startTime || 0) - new Date(b.startTime || 0);
}

export default {
  async fetch(request, env){
    const url = new URL(request.url);

    if(url.pathname === '/api/scores'){
      const todayKey = easternDateKey();

      const results = await Promise.allSettled(
        SPORTS.map(sport => fetchLeague(sport, todayKey))
      );

      const games = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .sort(sortGames)
        .slice(0, 30);

      return Response.json({
        updatedAt: new Date().toISOString(),
        games
      }, {
        headers: {
          'Cache-Control':'public, max-age=15, s-maxage=15'
        }
      });
    }

    if(url.pathname.startsWith('/api/')){
      return Response.json({error:'Not found'}, {status:404});
    }

    return env.ASSETS.fetch(request);
  }
};
