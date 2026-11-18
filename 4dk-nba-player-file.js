(async()=>{'use strict';
const params=new URLSearchParams(location.search),team=params.get('team'),id=params.get('id'),name=params.get('name');
const title=document.getElementById('name'),status=document.getElementById('status'),root=document.getElementById('profile');
const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const node=(tag,value)=>{const e=document.createElement(tag);if(value!==undefined)e.textContent=String(value);return e};
const addLink=(parent,label,href)=>{const a=node('a',label);a.href=href;parent.append(a)};
const numericId=value=>String(value??'').replace(/\.0$/,'');
const logoCodes={'1':'atl','2':'bos','17':'bkn','30':'cha','4':'chi','5':'cle','6':'dal','7':'den','8':'det','9':'gs','10':'hou','11':'ind','12':'lac','13':'lal','29':'mem','14':'mia','15':'mil','16':'min','3':'no','18':'ny','25':'okc','19':'orl','20':'phi','21':'phx','22':'por','23':'sac','24':'sa','28':'tor','26':'utah','27':'wsh'};
const ageAt=(birth,now=new Date())=>{if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(birth||''))return null;const d=new Date(birth+'T00:00:00Z');if(Number.isNaN(d.getTime())||d>now)return null;let age=now.getUTCFullYear()-d.getUTCFullYear();if(now.getUTCMonth()<d.getUTCMonth()||(now.getUTCMonth()===d.getUTCMonth()&&now.getUTCDate()<d.getUTCDate()))age--;return age>=15&&age<=65?age:null};
const prettyTime=s=>{const d=new Date(s);return Number.isNaN(d.getTime())?s:new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit',timeZone:'UTC',timeZoneName:'short'}).format(d)};
const format=v=>typeof v==='number'&&Number.isFinite(v)?v.toFixed(1):'—';
if(!team||!name||!/^[0-9]+$/.test(team)){title.textContent='Select a player from NBA Rosters';status.textContent='No roster player selected';return}
title.textContent=name;
try{
 const [rosterResponse,indexResponse,statsResponse,coverageResponse]=await Promise.all([
  fetch('data/4dk-nba-rosters-verified.json',{cache:'no-store'}),
  fetch('data/4dk-league-player-index.json',{cache:'no-store'}),
  fetch('data/4dk-nba-league-stats-2026-27.json',{cache:'no-store'}),
  fetch('data/4dk-player-coverage.json',{cache:'no-store'})
 ]);
 if(!rosterResponse.ok)throw Error('Verified roster snapshot unavailable');
 const data=await rosterResponse.json();
 if(data.teamCount!==30||!data.players||!data.checked_utc)throw Error('Incomplete roster snapshot');
 const player=id?data.players[numericId(id)]:null;
 if(!player||String(player.teamId)!==String(team)||norm(player.name)!==norm(name))throw Error('Player identity/team mismatch');
 title.textContent=player.name;
 status.textContent='Team roster verified · '+prettyTime(data.checked_utc);
 const hero=node('section');hero.className='pf-hero';hero.setAttribute('aria-label','Player overview');
 {const img=node('img');img.src='https://a.espncdn.com/i/headshots/nba/players/full/'+encodeURIComponent(player.id)+'.png';img.alt=player.name+' headshot';img.loading='lazy';img.decoding='async';img.addEventListener('error',()=>img.remove(),{once:true});hero.append(img)}
 const details=node('div');details.append(node('div','4DK PLAYER FILES / 2026–27'));details.lastChild.className='pf-kicker';
 const teamHeading=node('h2');if(logoCodes[player.teamId]){const logo=node('img');logo.className='pf-team-logo';logo.src='https://a.espncdn.com/i/teamlogos/nba/500/'+logoCodes[player.teamId]+'.png';logo.alt=player.team+' logo';logo.addEventListener('error',()=>logo.remove(),{once:true});teamHeading.append(logo)}teamHeading.append(document.createTextNode(player.team));details.append(teamHeading);
 details.append(node('p',[player.position,player.jersey?'#'+player.jersey:'',player.experience===0?'Rookie':null].filter(Boolean).join(' · ')||'Current team assignment verified by athlete ID'));
 hero.append(details);root.append(hero);
 const facts=node('div');facts.className='pf-facts';
 const age=ageAt(player.dateOfBirth);
 for(const [label,value] of [['Age',age==null?'Not yet verified':age],['Birth date',player.dateOfBirth||null],['Position',player.position],['Height',player.height],['Weight',player.weight],['Experience',player.experience===0?'Rookie':player.experience!=null?player.experience+' years':null],['College',player.college]]){
  if(value==null||value==='')continue;
  const item=node('div');item.append(node('strong',label),node('span',value));facts.append(item)
 }if(facts.childElementCount)root.append(facts);
 let editorial=null;
 if(indexResponse.ok){const index=await indexResponse.json();editorial=(index.players||[]).find(p=>String(p.athleteId||'')===String(player.id)||norm(p.name)===norm(player.name))}
 const story=node('section');story.className='pf-story';story.append(node('h2','THE 4DK SCOUTING FILE'));
 if(editorial?.profile){story.append(node('p','Original 4 Da Kulture scouting analysis, preserved in its published edition.'));
 addLink(story,'Read full original 4DK scouting report →',editorial.profile)}
 else story.append(node('p','Original 4DK scouting analysis is being developed for this player. Verified roster and statistical details appear below.'));
 if(coverageResponse.ok){const coverage=await coverageResponse.json();const articles=coverage.coverage?.[editorial?.id];if(Array.isArray(articles)){const heading=node('h3','RELATED 4DK COVERAGE');story.append(heading);for(const [label,url] of articles){if(typeof url==='string'&&url.endsWith('.html')&&!url.includes('/')&&!url.includes('..'))addLink(story,label+' →',url)}}}
 root.append(story);
 const nav=node('nav');nav.className='pf-player-nav';nav.setAttribute('aria-label','Player navigation');addLink(nav,'← Player Index','4dk-league-player-directory.html');addLink(nav,'All NBA rosters','nba-rosters.html');const teammates=Object.values(data.players).filter(p=>p.teamId===player.teamId&&p.id!==player.id).sort((a,b)=>a.name.localeCompare(b.name));if(teammates.length){const select=node('select');select.setAttribute('aria-label','Open a teammate Player File');const placeholder=node('option','Browse teammates…');placeholder.value='';select.append(placeholder);for(const mate of teammates){const option=node('option',mate.name);option.value='4dk-nba-player-file.html?team='+encodeURIComponent(mate.teamId)+'&id='+encodeURIComponent(mate.id)+'&name='+encodeURIComponent(mate.name);select.append(option)}select.addEventListener('change',()=>{if(select.value)location.href=select.value});nav.append(select)}root.append(nav);
 if(statsResponse.ok){
  const stats=await statsResponse.json();
  if(stats.status==='verified'&&stats.season==='2026-27'){
   const all=Object.values(stats.players||{});
   const byId=all.find(p=>p.athlete_id&&numericId(p.athlete_id)===numericId(player.id));
   const byName=all.filter(p=>norm(p.name)===norm(player.name));
   const entry=byId||(byName.length===1?byName[0]:null);
   const box=node('section');box.className='pf2-panel';box.append(node('div','2026–27 / REGULAR SEASON'));box.lastChild.className='pf2-eyebrow';
   box.append(node('h2','Season averages'));
   if(entry){
    box.append(node('p','Verified box-score dataset · '+entry.games+' GP · checked '+(stats.checked_utc||'time unavailable')));
    const grid=node('div');grid.className='pf2-grid';
    for(const [field,label] of [['ppg','PPG'],['rpg','RPG'],['apg','APG'],['spg','SPG'],['bpg','BPG'],['fg_pct','FG%'],['fg3_pct','3PT%'],['ft_pct','FT%']]){
     const cell=node('div');cell.className='pf2-stat';cell.append(node('strong',format(entry[field])),node('span',label));grid.append(cell)
    }box.append(grid)
   }else box.append(node('p','No verified regular-season averages available for this player. This does not imply zero games played.'));
   root.append(box)
  }
 }
 const note=node('p','Team assignment comes from the dated 30-team roster snapshot; season averages are a separately updated snapshot, not live box scores.');note.className='muted';root.append(note);
}catch(e){status.textContent='Unable to verify this player against the published roster snapshot. Return to the Player Index and try again.'}
})();