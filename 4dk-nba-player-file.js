(async()=>{'use strict';
const params=new URLSearchParams(location.search),team=params.get('team'),id=params.get('id'),name=params.get('name');
const title=document.getElementById('name'),status=document.getElementById('status'),root=document.getElementById('profile');
const norm=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const node=(tag,value)=>{const e=document.createElement(tag);if(value!==undefined)e.textContent=String(value);return e};
const addLink=(parent,label,href)=>{const a=node('a',label);a.href=href;parent.append(a)};
const numericId=value=>String(value??'').replace(/\.0$/,'');
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
 status.textContent='Verified 30-team roster snapshot · '+data.checked_utc;
 const hero=node('section');hero.className='pf-hero';hero.setAttribute('aria-label','Player overview');
 {const img=node('img');img.src='https://a.espncdn.com/i/headshots/nba/players/full/'+encodeURIComponent(player.id)+'.png';img.alt=player.name+' headshot';img.loading='lazy';img.decoding='async';img.addEventListener('error',()=>img.remove(),{once:true});hero.append(img)}
 const details=node('div');details.append(node('div','4DK PLAYER FILES / 2026–27'));details.lastChild.className='pf-kicker';
 details.append(node('h2',player.team));
 details.append(node('p','Current team assignment verified by athlete ID'));
 hero.append(details);root.append(hero);
 const facts=node('div');facts.className='pf-facts';
 for(const [label,value] of [['Team',player.team],['Roster athlete ID',player.id]]){
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