/* 4DK NBA 2026-27. Top NBA-only ticker + live Nightcap link; no invented results. */
(()=>{
  const path=(location.pathname.split('/').pop()||'').toLowerCase();
  if(path!=='nba.html'&&path!=='nba')return;
  const host=document.getElementById('fourdk-rs-ticker');
  if(!host||window.__fourdkRegular2627)return;
  window.__fourdkRegular2627=true;
  const track=host.querySelector('[data-rs-track]');
  const label=host.querySelector('[data-rs-label]');
  const state=host.querySelector('[data-rs-status]');
  const start=Date.parse('2026-10-20T19:00:00Z');
  const opening=[
    {away:'BOS',home:'DET',time:'12:00 PM PT',text:'Celtics at Pistons'},
    {away:'PHI',home:'NYK',time:'4:00 PM PT',text:'76ers at Knicks'},
    {away:'OKC',home:'SAS',time:'6:30 PM PT',text:'Thunder at Spurs'}
  ];
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateET=(shift=0)=>{
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const map={};parts.forEach(p=>map[p.type]=p.value);
    const d=new Date(Date.UTC(+map.year,+map.month-1,+map.day+shift,12));
    return `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}`;
  };
  const timeLocal=x=>{const d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(d):'Tip TBD'};
  const staticOpening=()=>opening.map(g=>`<div class="fourdk-rs-ticker-card"><strong>${g.away} @ ${g.home}</strong><span>${g.time} • OCT 20</span></div>`).join('');
  const setOpening=()=>{label.textContent='NBA TIPOFF';state.textContent='Tuesday, October 20';track.innerHTML=staticOpening()};
  const getGames=async(day)=>{
    const url=`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${day}&limit=100`;
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok)throw new Error('Scoreboard unavailable');
    const json=await r.json();
    return (json.events||[]).map(e=>{
      const c=e.competitions?.[0];if(!c)return null;
      const teams=c.competitors||[];const a=teams.find(t=>t.homeAway==='away');const h=teams.find(t=>t.homeAway==='home');if(!a||!h)return null;
      const tp=e.status?.type||c.status?.type||{};
      const phase=tp.state||((tp.completed)?'post':'pre');
      return {date:e.date||c.date,phase,period:e.status?.period,clock:e.status?.displayClock||'',away:a.team?.abbreviation||'AWAY',home:h.team?.abbreviation||'HOME',as:a.score,hs:h.score};
    }).filter(Boolean).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
  };
  const render=(games,desc)=>{
    const live=games.some(g=>g.phase==='in');
    label.textContent=live?'NBA • LIVE':games.some(g=>g.phase==='post')?'NBA • RESULTS':'NBA • UPCOMING';
    state.textContent=desc;
    track.innerHTML=games.map(g=>{
      const final=g.phase==='post',playing=g.phase==='in';
      const awayScore=g.as==null?'':String(g.as),homeScore=g.hs==null?'':String(g.hs);
      let status=final?'FINAL':playing?(g.period?`Q${g.period} ${g.clock}`:'LIVE'):timeLocal(g.date);
      return `<div class="fourdk-rs-ticker-card ${playing?'live':final?'final':''}"><strong>${escape(g.away)}${playing||final?` ${escape(awayScore)}`:''} @ ${escape(g.home)}${playing||final?` ${escape(homeScore)}`:''}</strong><span>${escape(status)}</span></div>`;
    }).join('');
  };
  let pending=false;
  async function refresh(){
    if(pending)return;pending=true;
    try{
      if(Date.now()<start){setOpening();return}
      const today=await getGames(dateET());
      if(today.length){render(today,'Today’s NBA slate');return}
      const next=await getGames(dateET(1));
      if(next.length){render(next,'Next NBA slate');return}
      label.textContent='NBA SCOREBOARD';
      track.innerHTML='<span class="fourdk-rs-ticker-state">No games on today’s or tomorrow’s board. <a href="https://www.nba.com/schedule" target="_blank" rel="noopener noreferrer" style="color:#e9bd65">Full schedule ↗</a></span>';
      state.textContent='Updated automatically';
    }catch(err){
      if(Date.now()<start){setOpening();return}
      label.textContent='NBA SCORES';
      state.textContent='Feed temporarily unavailable';
      track.innerHTML='<span class="fourdk-rs-ticker-state">Live data unavailable. <a href="https://www.nba.com/games" target="_blank" rel="noopener noreferrer" style="color:#e9bd65">View NBA scores ↗</a></span>';
    }finally{pending=false}
  }
  function markSeason(){
    const s=document.querySelector('[data-rs-season-status]');
    const t=document.querySelector('[data-rs-slate-label]');
    const now=Date.now();
    if(s)s.textContent=now>=start?'REGULAR SEASON COVERAGE • 2026–27':'TIPOFF COUNTDOWN • OCTOBER 20';
    if(t)t.textContent=now>=Date.parse('2026-10-23T00:00:00Z')?'OPENING NIGHT • OCT 20 ARCHIVE':'OPENING NIGHT • TUESDAY, OCT 20';
  }
  async function loadNightcap(){
    try{
      const res=await fetch('nba-nightcap-index.json',{cache:'no-store'});if(!res.ok)throw new Error('Archive unavailable');
      const data=await res.json();if(!Array.isArray(data)||!data.length)return;
      const sorted=data.filter(x=>x.href&&x.date_iso).sort((a,b)=>b.date_iso.localeCompare(a.date_iso));
      const latest=sorted[0];if(!latest)return;
      document.querySelectorAll('[data-rs-latest-nightcap]').forEach(a=>{a.href=latest.href;
        const b=a.querySelector('[data-rs-nightcap-date]');if(b)b.textContent=`${latest.date} • ${latest.label}`;
      });
    }catch(e){/* Preserve the verified Oct 14 fallback link. */}
  }
  setOpening();markSeason();loadNightcap();refresh();
  setInterval(()=>{markSeason();refresh()},60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
})();
