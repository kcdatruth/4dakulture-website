(()=>{'use strict';
const OPEN='2026-10-20',LAST='2027-04-11',TZ='America/Los_Angeles',DAY=864e5;
const FALLBACK={
'2026-10-20':[['BOS','DET','12:00 PM'],['PHI','NYK','4:00 PM'],['OKC','SAS','6:30 PM']],
'2026-10-21':[['MIL','WAS','4:00 PM'],['ATL','ORL','4:00 PM'],['CHA','BKN','4:30 PM'],['CHI','TOR','4:30 PM'],['MIN','MIA','4:30 PM'],['IND','NOP','5:00 PM'],['UTA','MEM','5:00 PM'],['DAL','HOU','5:30 PM'],['PHX','POR','7:00 PM'],['GS','LAL','7:00 PM'],['SAC','LAC','7:30 PM']],
'2026-10-22':[['CLE','PHI','4:00 PM'],['DEN','OKC','6:30 PM']]
};
const names={ATL:'Atlanta Hawks',BKN:'Brooklyn Nets',BOS:'Boston Celtics',CHA:'Charlotte Hornets',CHI:'Chicago Bulls',CLE:'Cleveland Cavaliers',DAL:'Dallas Mavericks',DEN:'Denver Nuggets',DET:'Detroit Pistons',GS:'Golden State Warriors',GSW:'Golden State Warriors',HOU:'Houston Rockets',IND:'Indiana Pacers',LAC:'LA Clippers',LAL:'Los Angeles Lakers',MEM:'Memphis Grizzlies',MIA:'Miami Heat',MIL:'Milwaukee Bucks',MIN:'Minnesota Timberwolves',NOP:'New Orleans Pelicans',NYK:'New York Knicks',OKC:'Oklahoma City Thunder',ORL:'Orlando Magic',PHI:'Philadelphia 76ers',PHX:'Phoenix Suns',POR:'Portland Trail Blazers',SAC:'Sacramento Kings',SAS:'San Antonio Spurs',TOR:'Toronto Raptors',UTA:'Utah Jazz',WAS:'Washington Wizards'};
const $=s=>document.querySelector(s),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isoUTC=date=>new Date(date+'T12:00:00Z');
const shift=(date,n)=>{let d=isoUTC(date);d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const pacificToday=()=>{const pieces=new Intl.DateTimeFormat('en-US',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=Object.fromEntries(pieces.map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`};
const clamp=date=>date<OPEN?OPEN:date>LAST?LAST:date;
const clean=code=>(code||'').toUpperCase()==='GSW'?'GS':(code||'').toUpperCase();
let selected=clamp(pacificToday()), seq=0, timer=null;
const shownDate=date=>new Intl.DateTimeFormat('en-US',{timeZone:'UTC',weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(isoUTC(date)).toUpperCase();
const gameLabel=(code)=>names[clean(code)]||code;
function card(game,i){const {away,home,as,hs,state,description,time} = game;
 const show=state==='in'||state==='post'; const status=state==='post'?'FINAL':state==='in'?(description||'LIVE'):(time||'SCHEDULED');
 const phase=state==='post'?'final':state==='in'?'live':'';
 const a=esc(gameLabel(away)),h=esc(gameLabel(home));
 return `<article class="match" aria-label="${a} at ${h}: ${esc(status)}"><div class="match-head"><span>GAME ${String(i+1).padStart(2,'0')}</span><span class="tag ${phase}">${esc(status)}</span></div><h4>${esc(away)} @ ${esc(home)}</h4><div class="teams"><div class="team"><span>${a}</span>${show&&as!==''?`<b>${esc(as)}</b>`:`<span class="placeholder">AWAY</span>`}</div><div class="team"><span>${h}</span>${show&&hs!==''?`<b>${esc(hs)}</b>`:`<span class="placeholder">HOME</span>`}</div></div><div class="match-foot">${state==='pre'?esc(time||'Tipoff not confirmed'):state==='in'?'LIVE · Scoring supplied by external feed':state==='post'?'Full 4DK analysis appears only after verification':''}</div></article>`;
}
function fallback(date){return (FALLBACK[date]||[]).map(([away,home,time])=>({away,home,as:'',hs:'',state:'pre',description:'',time:time+' PT'}))}
const parseScore=x=>{const s=x?.score;if(s===null||s===undefined)return '';return typeof s==='object'?(s.displayValue??s.value??''):s};
const timePT=dateString=>{if(!dateString)return 'TIME NOT CONFIRMED';const d=new Date(dateString);if(Number.isNaN(+d))return 'TIME NOT CONFIRMED';return new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'numeric',minute:'2-digit',hour12:true}).format(d)+' PT'};
const teamCode=x=>clean(x?.team?.abbreviation??'');
function fromESPN(data){return (data?.events||[]).map(ev=>{const cmp=ev.competitions?.[0],away=cmp?.competitors?.find(x=>x.homeAway==='away'),home=cmp?.competitors?.find(x=>x.homeAway==='home');if(!away||!home)return null;
 const type=ev.status?.type||cmp?.status?.type||{},state=type.state||(type.completed?'post':'pre');
 return {away:teamCode(away),home:teamCode(home),as:parseScore(away),hs:parseScore(home),state:state==='in'||state==='post'?state:'pre',time:timePT(ev.date),description:type.shortDetail||type.detail||''};}).filter(Boolean)}
function display(games,source){let live=games.filter(g=>g.state==='in').length,fin=games.filter(g=>g.state==='post').length;
 $('#gameday-list').innerHTML=games.length?games.map(card).join(''):'<div class="loading">No NBA games are listed for this date. Use the date selector to browse another slate.</div>';
 $('#gameday-count').textContent=`${games.length} GAME${games.length===1?'':'S'} · ${fin} FINAL${fin===1?'':'S'}${live?' · '+live+' LIVE':''}`;
 const feed=$('#gameday-feed');feed.classList.toggle('on',source==='feed');feed.textContent=source==='feed'?'SCORE FEED CONNECTED · 60-SECOND AUTO REFRESH':source==='fallback'?'SCHEDULE FALLBACK · LIVE SCORES TEMPORARILY UNAVAILABLE':'NO GAME DATA AVAILABLE · TRY REFRESH';
}
function changeDate(v){selected=clamp(v);$('#day-picker').value=selected;$('#day-prev').disabled=selected===OPEN;$('#day-next').disabled=selected===LAST;$('#gameday-date-title').textContent=shownDate(selected);$('#gameday-eyebrow').textContent=selected==='2026-10-20'?'OPENING NIGHT · TUESDAY OCTOBER 20':selected==='2026-10-21'?'THE FIRST FULL SLATE · WEDNESDAY OCTOBER 21':'THE DAILY DESK · NBA 2026–27';load()}
async function load(){const q=++seq, date=selected,filestr=date.replace(/-/g,'');$('#gameday-feed').textContent='CONNECTING TO THE GAME DATA FEED…';const fb=fallback(date);display(fb,fb.length?'fallback':'empty');try{const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),12000);let r;try{r=await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${filestr}&limit=100`,{cache:'no-store',signal:ctrl.signal})}finally{clearTimeout(timeout)}if(!r.ok)throw Error('feed');const data=await r.json();if(q!==seq)return;const games=fromESPN(data);if(!games.length&&fb.length){display(fb,'fallback');return}display(games,'feed')}catch(e){if(q!==seq)return;display(fb,fb.length?'fallback':'empty')}}
function start(){const picker=$('#day-picker');picker.addEventListener('change',()=>{if(/^\d{4}-\d{2}-\d{2}$/.test(picker.value))changeDate(picker.value)});$('#day-prev').addEventListener('click',()=>changeDate(shift(selected,-1)));$('#day-next').addEventListener('click',()=>changeDate(shift(selected,1)));$('#day-refresh').addEventListener('click',load);changeDate(selected);timer=setInterval(()=>{if(!document.hidden)load()},60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)load()});window.addEventListener('pagehide',()=>clearInterval(timer),{once:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();