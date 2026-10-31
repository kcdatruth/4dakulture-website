/* 4DK 2026–27 live stats — snapshot presentation; original scouting untouched. */
(async()=>{
 const style=document.createElement('style');style.textContent='/* 4DK 2026–27 snapshot layout — visual change only. */\n.live-averages.snapshot-live{padding:22px;border:1px solid #6c4d35;border-left:1px solid #6c4d35;background:#171310;color:#e5b974;margin:24px 0;font-family:Arial,Helvetica,sans-serif}\n.snapshot-live .stat-caption{display:block;color:#dcb56e;font-size:12px;letter-spacing:.19em;font-weight:900;line-height:1.5;text-transform:uppercase;margin-bottom:9px}\n.snapshot-live .snapshot-numbers,.snapshot-live .snapshot-shooting{display:block;color:#e5b974;font:900 clamp(18px,2.2vw,22px)/1.45 Arial,Helvetica,sans-serif;letter-spacing:0;overflow-wrap:break-word}\n.snapshot-live .snapshot-shooting{margin-top:9px}\n.card .snapshot-live{margin:12px 0 16px;padding:17px 15px}\n.card .snapshot-live .snapshot-numbers,.card .snapshot-live .snapshot-shooting{font-size:clamp(16px,1.6vw,20px)}\n@media(max-width:570px){.snapshot-live .snapshot-numbers,.snapshot-live .snapshot-shooting{font-size:clamp(18px,4.8vw,22px)}.snapshot-live .stat-caption{font-size:11px;letter-spacing:.14em}.card .snapshot-live .snapshot-numbers,.card .snapshot-live .snapshot-shooting{font-size:18px}}\n';document.head.append(style);
 const targets=[...document.querySelectorAll('[data-4dk-player]')];
 if(!targets.length)return;
 let data;
 try{const r=await fetch('data/4dk-player-stats-2026-27.json',{cache:'no-store'});if(!r.ok)throw Error('not ready');data=await r.json()}catch{return}
 if(data.season!=='2026-27'||!data.players)return;
 const fmt=n=>Number.isFinite(n)?n.toFixed(1):'—';
 for(const el of targets){
  const p=data.players[el.dataset['4dkPlayer']];if(!p||p.games<1)continue;
  el.classList.add('snapshot-live');
  el.innerHTML='<span class="stat-caption">2026–27 REGULAR-SEASON SNAPSHOT</span>'+
   '<strong class="snapshot-numbers">'+p.games+' G · '+fmt(p.ppg)+' PPG · '+fmt(p.rpg)+' RPG · '+fmt(p.apg)+' APG · '+fmt(p.spg)+' SPG · '+fmt(p.bpg)+' BPG</strong>'+
   '<strong class="snapshot-shooting">'+fmt(p.fg_pct)+' FG% · '+fmt(p.fg3_pct)+' 3PT% · '+fmt(p.ft_pct)+' FT%</strong>';
 }
 // Keep required CC BY 4.0 attribution outside the stat cards, once per page.
 if(!document.getElementById('4dk-stats-credit')){
  const credit=document.createElement('p');credit.id='4dk-stats-credit';credit.className='stats-disclosure';
  credit.innerHTML='2026–27 statistical data: <a href="https://www.boxscorelab.com/downloads/" rel="noopener noreferrer">BoxScore Lab</a> · CC BY 4.0. Updated automatically.';
  const footer=document.querySelector('footer,.foot');
  if(footer)footer.prepend(credit);else document.body.append(credit);
 }
})();
