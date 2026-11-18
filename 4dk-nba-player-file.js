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
  fetch('/api/roster?league=nba&team='+encodeURIComponent(team),{cache:'no-store'}),
  fetch('data/4dk-league-player-index.json',{cache:'no-store'}),
  fetch('data/4dk-nba-league-stats-2026-27.json',{cache:'no-store'}),
  fetch('data/4dk-player-coverage.json',{cache:'no-store'})
 ]);
 if(!rosterResponse.ok)throw Error('Roster feed unavailable');
 const data=await rosterResponse.json(),players=Array.isArray(data.players)?data.players:[];
 const player=players.find(p=>id&&numericId(p.id)===numericId(id))||players.find(p=>norm(p.name)===norm(name));
 if(!player)throw Error('Player not found on roster');
 title.textContent=player.name;
 status.textContent='Team roster snapshot · '+(data.updatedAt||'update time unavailable');
 const hero=node('section');hero.className='pf-hero';hero.setAttribute('aria-label','Player overview');
 if(player.headshot&&/^https:\/\//i.test(player.headshot)){const img=node('img');img.src=player.headshot;img.alt=player.name+' headshot';img.loading='lazy';img.decoding='async';hero.append(img)}
 const details=node('div');details.append(node('div','4DK PLAYER FILES / 2026–27'));details.lastChild.className='pf-kicker';
 details.append(node('h2',data.team?.displayName||data.team?.name||'NBA roster'));
 details.append(node('p',[player.position,player.jersey?'#'+player.jersey:'',player.status].filter(Boolean).join(' · ')));
 hero.append(details);root.append(hero);
 const facts=node('div');facts.className='pf-facts';
 for(const [label,value] of [['Position',player.position],['Height',player.height],['Weight',player.weight],['Experience',player.experience===0?'Rookie':player.experience!=null?player.experience+' years':null],['College',player.college]]){
  if(value==null||value==='')continue;
  const item=node('div');item.append(node('strong',label),node('span',value));facts.append(item)
 }if(facts.childElementCount)root.append(facts);
 let editorial=null;
 if(indexResponse.ok){const index=await indexResponse.json();editorial=(index.players||[]).find(p=>norm(p.name)===norm(player.name))}
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
 const note=node('p','Roster details come from the team roster feed; season averages are a separately updated snapshot, not live box scores.');note.className='muted';root.append(note);
}catch(e){status.textContent='Unable to verify this player against the current roster feed. Return to NBA Rosters and try again.'}
})();