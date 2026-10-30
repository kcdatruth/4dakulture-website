/* 4DK free player averages: read-only display. Does not change historical scouting copy. */
(async()=>{
  const targets=[...document.querySelectorAll('[data-4dk-player]')];
  if(!targets.length)return;
  let data;
  try{const r=await fetch('data/4dk-player-stats-2026-27.json',{cache:'no-store'});if(!r.ok)throw Error('not ready');data=await r.json();}
  catch{return;}
  if(data.season!=='2026-27'||!data.players)return;
  const fmt=(n,d=1)=>Number.isFinite(n)?n.toFixed(d):'—';
  const safe=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  for(const el of targets){
    const p=data.players[el.dataset['4dkPlayer']];if(!p||p.games<1)continue;
    el.innerHTML='<span class="stat-caption">2026–27 verified season averages</span>'+
      fmt(p.ppg)+' PPG · '+fmt(p.rpg)+' RPG · '+fmt(p.apg)+' APG · '+fmt(p.spg)+' SPG · '+fmt(p.bpg)+' BPG · '+p.games+' GP'+
      '<span class="stat-meta">'+fmt(p.fg_pct)+'% FG · '+fmt(p.fg3_pct)+'% 3PT · '+fmt(p.ft_pct)+'% FT · Source: <a href="https://www.boxscorelab.com/downloads/" rel="noopener">BoxScore Lab</a> (CC BY 4.0) · Data checked '+safe(data.checked_utc||'date unavailable')+'</span>';
  }
})();
