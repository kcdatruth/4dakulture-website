(async()=>{'use strict';
const grid=document.getElementById('players'),search=document.getElementById('search'),filter=document.getElementById('filter'),count=document.getElementById('count');
const norm=x=>String(x||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const mk=(tag,txt)=>{const e=document.createElement(tag);if(txt!==undefined)e.textContent=String(txt);return e};
const format=n=>typeof n==='number'&&Number.isFinite(n)?n.toFixed(1):'—';
try{
 const [a,b]=await Promise.all([fetch('data/4dk-league-player-index.json',{cache:'no-store'}),fetch('data/4dk-nba-league-stats-2026-27.json',{cache:'no-store'})]);
 if(!a.ok||!b.ok)throw Error('Data unavailable');
 const index=await a.json(),stats=await b.json();
 if(stats.status!=='verified'||stats.season!==index.season)throw Error('Unverified statistics');
 const known=new Map(index.players.map(p=>[norm(p.name),p]));
 const players=new Map();
 for(const entry of Object.values(stats.players||{})){const key=norm(entry.name);if(!key)continue;const editorial=known.get(key);players.set(key,{name:editorial?.name||entry.name,profile:editorial?.profile||null,team:editorial?.team||null,editorial:!!editorial?.profile,stats:entry})}
 for(const p of index.players){const key=norm(p.name);if(!players.has(key))players.set(key,{name:p.name,profile:p.profile,team:p.team,editorial:!!p.profile,stats:null})}
 const all=[...players.values()].sort((a,b)=>a.name.localeCompare(b.name));
 // Verify current team against the same live ESPN-backed roster service as NBA Rosters.
 // Never infer current team from a historical scouting profile or stats box score.
 const teams=[['1','Atlanta Hawks'],['2','Boston Celtics'],['17','Brooklyn Nets'],['30','Charlotte Hornets'],['4','Chicago Bulls'],['5','Cleveland Cavaliers'],['6','Dallas Mavericks'],['7','Denver Nuggets'],['8','Detroit Pistons'],['9','Golden State Warriors'],['10','Houston Rockets'],['11','Indiana Pacers'],['12','LA Clippers'],['13','Los Angeles Lakers'],['29','Memphis Grizzlies'],['14','Miami Heat'],['15','Milwaukee Bucks'],['16','Minnesota Timberwolves'],['3','New Orleans Pelicans'],['18','New York Knicks'],['25','Oklahoma City Thunder'],['19','Orlando Magic'],['20','Philadelphia 76ers'],['21','Phoenix Suns'],['22','Portland Trail Blazers'],['23','Sacramento Kings'],['24','San Antonio Spurs'],['28','Toronto Raptors'],['26','Utah Jazz'],['27','Washington Wizards']];
 const verifiedById=new Map(),verifiedByName=new Map(),conflicts=new Set();
 const idKey=x=>String(x??'').replace(/\\.0$/,'');
 let verifiedTeams=0;
 const verifyTeam=async([teamId,teamName])=>{
  try{
   const response=await fetch('/api/roster?league=nba&team='+encodeURIComponent(teamId),{cache:'default'});
   if(!response.ok)return;
   const data=await response.json();
   if(!Array.isArray(data.players)||data.players.length<5)return;
   verifiedTeams++;
   for(const p of data.players){
    const key=norm(p.name),pid=idKey(p.id);
    if(pid){if(verifiedById.has(pid)&&verifiedById.get(pid).teamId!==teamId)conflicts.add(pid);else verifiedById.set(pid,{teamId,teamName})}
    if(key){if(verifiedByName.has(key)&&verifiedByName.get(key).teamId!==teamId)conflicts.add(key);else verifiedByName.set(key,{teamId,teamName})}
   }
  }catch(e){/* Unavailable roster feed must never produce a guessed assignment. */}
 };
 const applyTeams=()=>{
  for(const p of all){
   const pid=idKey(p.stats?.athlete_id),key=norm(p.name);
   const verified=pid&&!conflicts.has(pid)?verifiedById.get(pid):null;
   const byName=!conflicts.has(key)?verifiedByName.get(key):null;
   const match=verified||byName;
   p.team=match?.teamName||null;
   p.teamId=match?.teamId||null;
  }
  render();
 };
 // Bounded batches avoid flooding the site's roster endpoint on mobile.
 const loadTeams=async()=>{
  for(let i=0;i<teams.length;i+=5){await Promise.all(teams.slice(i,i+5).map(verifyTeam));applyTeams()}
 };

 const render=()=>{
  grid.replaceChildren();const q=norm(search.value),type=filter.value;
  const list=all.filter(p=>norm(p.name).includes(q)&&(type==='all'||(type==='editorial'&&p.editorial)||(type==='stats'&&p.stats)));
  count.textContent=list.length+' of '+all.length+' indexed players · '+Object.keys(stats.players).length+' verified statistical records · checked '+stats.checked_utc;
  const fragment=document.createDocumentFragment();
  for(const p of list){
   const card=mk('article');card.className='player';
   const heading=mk('h2');
   if(p.profile){const link=mk('a',p.name);link.href=p.profile;heading.append(link)}else heading.textContent=p.name;
   card.append(heading);
   const sub=mk('p',p.team||'Team verification pending / unavailable');sub.className='player-team';card.append(sub);
   if(p.stats){const row=mk('div');row.className='player-stats';
    for(const [field,label] of [['ppg','PPG'],['rpg','RPG'],['apg','APG'],['spg','SPG'],['bpg','BPG'],['fg_pct','FG%'],['fg3_pct','3PT%'],['ft_pct','FT%']]){const item=mk('div');item.append(mk('strong',format(p.stats[field])),mk('span',label));row.append(item)}
    card.append(mk('p',p.stats.games+' games played · 2026–27'),row);
   }else card.append(mk('p','No verified 2026–27 season averages yet'));
   if(p.editorial){const link=mk('a','Read original 4DK scouting report →');link.href=p.profile;link.className='player-editorial';card.append(link)}
   else{const link=mk('a',p.teamId?'View verified team roster →':'Explore NBA team rosters →');link.href=p.teamId?'nba-rosters.html?team='+encodeURIComponent(p.teamId):'nba-rosters.html';link.className='player-editorial';card.append(link)}
   fragment.append(card);
  }grid.append(fragment);
 };
 search.addEventListener('input',render);filter.addEventListener('change',render);render();loadTeams();
}catch(e){count.textContent='Player statistics temporarily unavailable. Please try again later.'}
})();