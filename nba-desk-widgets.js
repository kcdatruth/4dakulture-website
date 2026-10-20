(()=>{'use strict';
/* 4DK NBA 2026–27: live standings + next-day schedule, distinct from original Nightcap reporting. */
const TZ='America/Los_Angeles',SEASON=2027;
const $=sel=>document.querySelector(sel),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const day=(date,n=0)=>{const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const pacific=()=>{const parts=new Intl.DateTimeFormat('en-US',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`};
const nice=d=>new Intl.DateTimeFormat('en-US',{timeZone:'UTC',weekday:'long',month:'short',day:'numeric'}).format(new Date(d+'T12:00:00Z'));
const time=d=>{const x=new Date(d);if(Number.isNaN(+x))return 'TBD';return new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:TZ}).format(x)+' PT'};
const names={ATL:'Hawks',BKN:'Nets',BOS:'Celtics',CHA:'Hornets',CHI:'Bulls',CLE:'Cavaliers',DAL:'Mavericks',DEN:'Nuggets',DET:'Pistons',GS:'Warriors',GSW:'Warriors',HOU:'Rockets',IND:'Pacers',LAC:'Clippers',LAL:'Lakers',MEM:'Grizzlies',MIA:'Heat',MIL:'Bucks',MIN:'Timberwolves',NOP:'Pelicans',NYK:'Knicks',OKC:'Thunder',ORL:'Magic',PHI:'76ers',PHX:'Suns',POR:'Blazers',SAC:'Kings',SAS:'Spurs',TOR:'Raptors',UTA:'Jazz',WAS:'Wizards'};
const east=new Set(['ATL','BKN','BOS','CHA','CHI','CLE','DET','IND','MIA','MIL','NYK','ORL','PHI','TOR','WAS']);
let tab='east',standings={east:[],west:[]},lastStandings=0,standingRequest=0,previewRequest=0;
const stat=(arr,...names)=>{for(const n of names){const v=(arr||[]).find(x=>String(x.name||x.type||'').toLowerCase()===n.toLowerCase());if(v)return v;}return null};
function parseStandings(obj){if(Number(obj?.season?.year||SEASON)!==SEASON)return null;
const result={east:[],west:[]};const groups=[];
function collect(x,parent=''){if(!x||typeof x!=='object')return;let title=String(x.name||x.abbreviation||parent);if(Array.isArray(x.standings?.entries))groups.push({name:title,entries:x.standings.entries});for(let ch of x.children||[])collect(ch,title)}collect(obj);
for(let g of groups){const conf=/east/i.test(g.name)?'east':/west/i.test(g.name)?'west':null;for(let e of g.entries){const code=String(e.team?.abbreviation||'').toUpperCase();const key=conf||(east.has(code)?'east':'west');if(!code)continue;let a=e.stats||[];let W=stat(a,'wins'),L=stat(a,'losses'),pct=stat(a,'winPercent','win_percent'),gb=stat(a,'gamesBehind','games_behind');const wins=Number(W?.value),losses=Number(L?.value);if(!Number.isFinite(wins)||!Number.isFinite(losses))continue;
result[key].push({code,team:e.team?.displayName||names[code]||code,wins,losses,pct:pct?.displayValue??(wins+losses? (wins/(wins+losses)).toFixed(3):'.000'),gb:gb?.displayValue??'—'});
}}
for(const k of ['east','west']){const m=new Map(result[k].map(x=>[x.code,x]));result[k]=[...m.values()] /* Retain provider's conference order and tie-breaks; never invent ranks. */}if(!result.east.length||!result.west.length)return null;return result;}
function showStandings(){let el=$('[data-standings-view]'),st=$('[data-standings-status]');if(!el||!st)return;
for(let b of document.querySelectorAll('[data-standings-tab]')){let yes=b.dataset.standingsTab===tab;b.setAttribute('aria-pressed',String(yes));b.classList.toggle('selected',yes)}
const rows=standings[tab];if(!rows?.length){el.innerHTML=`<p class="fdk-fallback">No verified 2026–27 standings yet. The first results arrive after opening night. <a href="https://www.nba.com/standings" target="_blank" rel="noopener noreferrer">Check the official standings ↗</a></p>`;return}
let haveGames=rows.some(x=>x.wins+x.losses>0);st.textContent=haveGames?`2026–27 REGULAR SEASON · LAST REFRESH ${new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'numeric',minute:'2-digit'}).format(lastStandings)} PT · UPDATES WHEN FEED REFRESHES`:'SEASON NOT STARTED · CONFERENCE ORDER IS NOT A REAL RANKING YET';
if(!haveGames){el.innerHTML=`<p class="fdk-fallback">The 2026–27 standings feed is connected. Teams have not played a regular-season game yet, so there is no meaningful conference order to publish.</p>`;return}
el.innerHTML=`<div class="fdk-scroll"><table class="fdk-table"><thead><tr><th scope="col">#</th><th scope="col">TEAM</th><th scope="col">W</th><th scope="col">L</th><th scope="col">PCT</th><th scope="col">GB</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><th scope="row">${esc(r.team)}</th><td>${r.wins}</td><td>${r.losses}</td><td>${esc(r.pct)}</td><td>${esc(r.gb)}</td></tr>`).join('')}</tbody></table></div>`;
}
async function requestJSON(url){const c=new AbortController(),t=setTimeout(()=>c.abort(),12000);try{const r=await fetch(url,{cache:'no-store',signal:c.signal});if(!r.ok)throw Error('feed unavailable');return await r.json()}finally{clearTimeout(t)}}
async function refreshStandings(){const st=$('[data-standings-status]');if(!st)return;const q=++standingRequest;st.textContent='CHECKING THE 2026–27 STANDINGS FEED…';try{const obj=await requestJSON(`https://site.api.espn.com/apis/v2/sports/basketball/nba/standings?season=${SEASON}&seasontype=2&type=0`);if(q!==standingRequest)return;const parsed=parseStandings(obj);if(!parsed)throw Error('incorrect season or standings unavailable');standings=parsed;lastStandings=Date.now();showStandings()}catch(e){if(q!==standingRequest)return;st.textContent='LIVE STANDINGS UNAVAILABLE · NO RECORDS FABRICATED';showStandings()}}
const FALLBACK={
'2026-10-20':[['BOS','DET','12:00 PM'],['PHI','NYK','4:00 PM'],['OKC','SAS','6:30 PM']],
'2026-10-21':[['MIN','MIA','4:30 PM'],['GSW','LAL','7:00 PM']],
'2026-10-22':[['CLE','PHI','4:00 PM'],['DEN','OKC','6:30 PM']],
'2026-10-23':[['NYK','BOS','4:00 PM'],['LAC','LAL','7:00 PM']]
};
function nextDate(){let t=pacific();return day(t< '2026-10-20'?'2026-10-19':t,1)}
function updatePreviewLink(date){let a=$('[data-next-day-link]');if(a){a.href=`nba-gameday-2026-27.html?date=${date}#today-board`;a.dataset.date=date}}
function renderNext(items,date,isFeed){const box=$('[data-next-day-view]'),lbl=$('[data-next-day-label]');if(!box||!lbl)return;lbl.textContent=nice(date).toUpperCase();updatePreviewLink(date);
if(!items.length){box.innerHTML='<p class="fdk-fallback">No NBA games scheduled for this date.</p>';return}
box.innerHTML=`<div class="fdk-matchup-count">${items.length} GAME${items.length===1?'':'S'} ${isFeed?'· VERIFIED SCHEDULE FEED':'· FEATURED FALLBACK MATCHUPS (FULL SLATE UNAVAILABLE)'}</div>${items.slice(0,12).map(x=>`<div class="fdk-mini-game"><strong>${esc(x.away)} @ ${esc(x.home)}</strong><small>${esc(x.time)}</small></div>`).join('')}${items.length>12?`<p class="fdk-source">${items.length-12} MORE GAMES · OPEN THE FULL GAME DAY BOARD</p>`:''}`}
async function refreshPreview(){const box=$('[data-next-day-view]');if(!box)return;const q=++previewRequest,dt=nextDate();const fb=(FALLBACK[dt]||[]).map(([away,home,t])=>({away,home,time:t+' PT'}));box.textContent='CHECKING TOMORROW\'S MATCHUPS…';try{let data=await requestJSON(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${dt.replace(/-/g,'')}&limit=100`);if(q!==previewRequest)return;let parsed=(data.events||[]).map(g=>{let c=g.competitions?.[0];let a=c?.competitors?.find(v=>v.homeAway==='away'),h=c?.competitors?.find(v=>v.homeAway==='home');return a&&h?{away:a.team?.abbreviation||'AWAY',home:h.team?.abbreviation||'HOME',time:time(g.date)}:null}).filter(Boolean);renderNext(parsed.length?parsed:fb,dt,!!parsed.length)}catch(e){if(q===previewRequest)renderNext(fb,dt,false)}}
function start(){if(!$('[data-standings-view]')&&!$('[data-next-day-view]'))return;document.addEventListener('click',e=>{let b=e.target.closest('[data-standings-tab],[data-standings-refresh]');if(!b)return;if(b.dataset.standingsTab){tab=b.dataset.standingsTab;showStandings()}else refreshStandings()});refreshStandings();refreshPreview();setInterval(()=>{if(!document.hidden)refreshStandings()},300000);setInterval(()=>{if(!document.hidden)refreshPreview()},900000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){refreshStandings();refreshPreview()}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
