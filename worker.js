
const SPORTS = [
  { league: 'NFL', path: 'football/nfl', limit: 8 },
  { league: 'NBA', path: 'basketball/nba', limit: 8 },
  { league: 'MLB', path: 'baseball/mlb', limit: 8 },
  { league: 'NHL', path: 'hockey/nhl', limit: 8 },
  { league: 'WNBA', path: 'basketball/wnba', limit: 6 },

  // College sports
  { league: 'NCAAF', path: 'football/college-football', limit: 10 },
  { league: 'NCAAM', path: 'basketball/mens-college-basketball', limit: 12 },
  { league: 'NCAAW', path: 'basketball/womens-college-basketball', limit: 8 }
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

function liveStatusText(league, status, competitionStatus, type){
  const period = status.period || competitionStatus?.period;
  const clock = status.displayClock || competitionStatus?.displayClock || '';

  if(period && clock){
    if(['NFL','NCAAF','NBA','WNBA'].includes(league)){
      return `Q${period} ${clock}`;
    }

    if(league === 'NHL'){
      return `P${period} ${clock}`;
    }

    if(['NCAAM','NCAAW'].includes(league)){
      let segment = '';
      if(period === 1) segment = '1H';
      else if(period === 2) segment = '2H';
      else if(period === 3) segment = 'OT';
      else segment = `OT${period - 2}`;
      return `${segment} ${clock}`;
    }
  }

  return type.shortDetail || type.detail || 'LIVE';
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
    statusText = liveStatusText(league, status, competition.status, type);
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

function sortGames(a,b){
  const rank = {in:0, pre:1, post:2};
  const stateDiff = (rank[a.state] ?? 9) - (rank[b.state] ?? 9);
  if(stateDiff) return stateDiff;
  return new Date(a.startTime || 0) - new Date(b.startTime || 0);
}

async function fetchLeague({league, path, limit = 30}, todayKey){
  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`;
  const response = await fetch(url, {
    headers: {'Accept':'application/json'},
    cf: { cacheTtl: 15, cacheEverything: true }
  });

  if(!response.ok) throw new Error(`${league} upstream ${response.status}`);

  const data = await response.json();

  return (data.events || [])
    .map(event => normalizeEvent(event, league, todayKey))
    .filter(Boolean)
    .sort(sortGames)
    .slice(0, limit);
}


function normalizePickemEvent(event){
  const competition = event?.competitions?.[0];
  if(!competition) return null;

  const competitors = competition.competitors || [];
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0];
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1];
  if(!home || !away) return null;

  const status = event.status || competition.status || {};
  const type = status.type || {};
  const state = type.state || (type.completed ? 'post' : 'pre');

  return {
    id: String(event.id || ''),
    season: event.season?.year || 2026,
    week: event.week?.number || null,
    state,
    statusText: state === 'post'
      ? 'FINAL'
      : (state === 'in'
          ? liveStatusText('NFL', status, competition.status, type)
          : (type.shortDetail || type.detail || 'Scheduled')),
    startTime: event.date || competition.date || '',
    away: {
      id: String(away.team?.id || away.id || ''),
      abbr: away.team?.abbreviation || away.team?.shortDisplayName || 'AWAY',
      name: away.team?.displayName || away.team?.shortDisplayName || 'Away',
      score: scoreValue(away)
    },
    home: {
      id: String(home.team?.id || home.id || ''),
      abbr: home.team?.abbreviation || home.team?.shortDisplayName || 'HOME',
      name: home.team?.displayName || home.team?.shortDisplayName || 'Home',
      score: scoreValue(home)
    }
  };
}

async function fetchNFLPickem(){
  const endpoint = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';
  const response = await fetch(endpoint, {
    headers:{'Accept':'application/json'},
    cf:{cacheTtl:60,cacheEverything:true}
  });

  if(!response.ok) throw new Error(`NFL pickem upstream ${response.status}`);
  const data = await response.json();

  const games = (data.events || [])
    .map(normalizePickemEvent)
    .filter(Boolean)
    .sort((a,b) => new Date(a.startTime || 0) - new Date(b.startTime || 0));

  const weekCounts = new Map();
  games.forEach(game => {
    if(game.week != null) weekCounts.set(game.week,(weekCounts.get(game.week)||0)+1);
  });

  const week = [...weekCounts.entries()]
    .sort((a,b) => b[1]-a[1])[0]?.[0] ?? games[0]?.week ?? null;

  const weekGames = week == null ? games : games.filter(game => game.week === week);

  return {
    season: weekGames[0]?.season || games[0]?.season || 2026,
    week,
    games: weekGames
  };
}


export default {
  async fetch(request, env){
    const url = new URL(request.url);


    if(url.pathname === '/api/nfl-pickem'){
      try{
        const payload = await fetchNFLPickem();
        return Response.json({
          updatedAt:new Date().toISOString(),
          ...payload
        },{
          headers:{'Cache-Control':'public, max-age=60, s-maxage=60'}
        });
      }catch(error){
        return Response.json({
          error:'NFL Pick’em is temporarily unavailable',
          games:[]
        },{status:503});
      }
    }

    if(url.pathname === '/api/scores'){
      const todayKey = easternDateKey();

      const results = await Promise.allSettled(
        SPORTS.map(sport => fetchLeague(sport, todayKey))
      );

      const games = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .sort(sortGames)
        .slice(0, 40);

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
