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
 // Use a complete, server-published 30-team snapshot instead of 30 mobile requests.
 // Team identity must match a stable athlete ID; names alone are never sufficient.
 const idKey=x=>String(x??'').replace(/\.0$/,'');
 let rosterTimestamp=null,rosterComplete=false;
 const logoCodes={'1':'atl','2':'bos','17':'bkn','30':'cha','4':'chi','5':'cle','6':'dal','7':'den','8':'det','9':'gs','10':'hou','11':'ind','12':'lac','13':'lal','29':'mem','14':'mia','15':'mil','16':'min','3':'no','18':'ny','25':'okc','19':'orl','20':'phi','21':'phx','22':'por','23':'sac','24':'sa','28':'tor','26':'utah','27':'wsh'};
 const playerFile=p=>p.teamId&&p.rosterId?'4dk-nba-player-file.html?team='+encodeURIComponent(p.teamId)+'&id='+encodeURIComponent(p.rosterId)+'&name='+encodeURIComponent(p.name):null;
 const loadTeams=async()=>{
  try{
   const response=await fetch('data/4dk-nba-rosters-verified.json',{cache:'no-store'});
   if(!response.ok)throw Error('Roster snapshot unavailable');
   const snapshot=await response.json();
   if(snapshot.schemaVersion!==1||snapshot.teamCount!==30||snapshot.playerCount<300||
      !snapshot.players||Object.keys(snapshot.players).length!==snapshot.playerCount)throw Error('Incomplete roster snapshot');
   rosterTimestamp=snapshot.checked_utc;
   rosterComplete=true;
   const rosterById=snapshot.players;
   for(const p of all){
    const pid=idKey(p.stats?.athlete_id);
    const match=pid&&rosterById[pid];
    p.team=match?.team||null;
    p.teamId=match?.teamId||null;
    p.rosterId=match?.id||null;
   }
  }catch(e){rosterComplete=false;/* Never substitute a guessed team. */}
  render();
 };

 const render=()=>{
  grid.replaceChildren();const q=norm(search.value),type=filter.value;
  const list=all.filter(p=>norm(p.name).includes(q)&&(type==='all'||(type==='editorial'&&p.editorial)||(type==='stats'&&p.stats)));
  count.textContent=list.length+' of '+all.length+' indexed players · '+Object.keys(stats.players).length+' verified statistical records · checked '+stats.checked_utc+(rosterComplete?' · teams checked '+rosterTimestamp:' · team verification temporarily unavailable');
  const fragment=document.createDocumentFragment();
  for(const p of list){
   const card=mk('article');card.className='player';
   const identity=mk('div');identity.className='player-identity';
   const portrait=mk('div');portrait.className='player-portrait';
   if(p.rosterId){const img=mk('img');img.src='https://a.espncdn.com/i/headshots/nba/players/full/'+encodeURIComponent(p.rosterId)+'.png';img.alt=p.name+' player headshot';img.loading='lazy';img.decoding='async';img.addEventListener('error',()=>{img.remove();portrait.textContent=p.name.split(' ').map(x=>x[0]).slice(0,2).join('')},{once:true});portrait.append(img)}else portrait.textContent=p.name.split(' ').map(x=>x[0]).slice(0,2).join('');
   identity.append(portrait);
   const identityText=mk('div');identityText.className='player-identity-text';
   const heading=mk('h2');
   const fileUrl=playerFile(p);
   if(fileUrl||p.profile){const link=mk('a',p.name);link.href=fileUrl||p.profile;heading.append(link)}else heading.textContent=p.name;
   identityText.append(heading);
   const sub=mk('p',p.team||'Team not verified on current 30-team snapshot');sub.className='player-team';
   if(p.teamId&&logoCodes[p.teamId]){const logo=mk('img');logo.className='team-logo';logo.src='https://a.espncdn.com/i/teamlogos/nba/500/'+logoCodes[p.teamId]+'.png';logo.alt=p.team+' logo';logo.loading='lazy';logo.addEventListener('error',()=>logo.remove(),{once:true});sub.prepend(logo)}
   identityText.append(sub);identity.append(identityText);card.append(identity);
   if(p.stats){const row=mk('div');row.className='player-stats';
    for(const [field,label] of [['ppg','PPG'],['rpg','RPG'],['apg','APG'],['spg','SPG'],['bpg','BPG'],['fg_pct','FG%'],['fg3_pct','3PT%'],['ft_pct','FT%']]){const item=mk('div');item.append(mk('strong',format(p.stats[field])),mk('span',label));row.append(item)}
    card.append(mk('p',p.stats.games+' games played · 2026–27'),row);
   }else card.append(mk('p','No verified 2026–27 season averages yet'));
   if(fileUrl){const link=mk('a','Open full 4DK Player File →');link.href=fileUrl;link.className='player-editorial';card.append(link)}
   if(p.editorial){const link=mk('a','Read original 4DK scouting report →');link.href=p.profile;link.className='player-editorial';card.append(link)}
   if(!fileUrl){const link=mk('a','Explore NBA team rosters →');link.href='nba-rosters.html';link.className='player-editorial';card.append(link)}
   fragment.append(card);
  }grid.append(fragment);
 };
 search.addEventListener('input',render);filter.addEventListener('change',render);render();loadTeams();
}catch(e){count.textContent='Player statistics temporarily unavailable. Please try again later.'}
})();