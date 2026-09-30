(()=>{const P=(location.pathname||'').toLowerCase();if(!P.endsWith('/nfl.html')&&!P.endsWith('/nfl'))return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ranks=`San Francisco 49ers|3–0
Buffalo Bills|3–0
Kansas City Chiefs|3–0
Minnesota Vikings|3–0
Las Vegas Raiders|3–0
Denver Broncos|2–1
Jacksonville Jaguars|2–1
Baltimore Ravens|2–1
Detroit Lions|2–1
Seattle Seahawks|2–1
Los Angeles Rams|1–2
Pittsburgh Steelers|2–1
Chicago Bears|2–1
Philadelphia Eagles|2–1
Cincinnati Bengals|2–1
Dallas Cowboys|1–2
New York Giants|2–1
Cleveland Browns|2–1
Atlanta Falcons|1–2
Washington Commanders|1–2
New Orleans Saints|1–2
Carolina Panthers|1–2
Green Bay Packers|1–2
Indianapolis Colts|1–2
New York Jets|1–2
Arizona Cardinals|1–2
New England Patriots|1–2
Houston Texans|0–3
Los Angeles Chargers|0–3
Tampa Bay Buccaneers|0–3
Tennessee Titans|0–3
Miami Dolphins|0–3`.split('\n').map(x=>x.split('|'));
const mvp=[
['Brock Purdy','QB • SF','789 PASS YDS • 9 PASS TD • 1 INT • 3–0','297 yards and four touchdowns in Week 3 keep Purdy at No. 1.'],
['Josh Allen','QB • BUF','786 PASS YDS • 11 TOTAL TD • 2 INT • 3–0','Buffalo is unbeaten and Allen remains one of the league’s biggest early engines.'],
['Patrick Mahomes','QB • KC','812 PASS YDS • 7 PASS TD • 3–0','Kansas City is unbeaten and Mahomes remains firmly in the race.'],
['Kirk Cousins','QB • LV','9 PASS TD • LV 3–0','Vegas is 3–0 and Cousins has helped drive one of the league’s biggest early stories.'],
['Jared Goff','QB • DET','802 PASS YDS • 8 PASS TD','One of the league’s most productive passers through three weeks.'],
['Trevor Lawrence','QB • JAX','7 PASS TD • JAX 2–1','Jacksonville’s Week 3 blowout keeps Lawrence moving.'],
['Lamar Jackson','QB • BAL','745 PASS YDS • BAL 2–1','Baltimore escaped Dallas and Lamar remains the engine.'],
['Jahmyr Gibbs','RB • DET','83 TOUCHES','Workload and scoring impact keep a non-QB on the board.'],
['Kenneth Walker III','RB • KC','76 TOUCHES • KC 3–0','Walker has changed the shape of Kansas City’s offense.'],
['Dak Prescott','QB • DAL','7 PASS TD','Dallas is 1–2, but the early passing production keeps Prescott in the ten.']];
const rook=[
['Jeremiyah Love','ARI • RB','90 rush yards, five catches and a receiving TD in Week 3.'],
['Kenyon Sadiq','NYJ • TE','Seven catches, 105 yards and a receiving TD in Week 3.'],
['Hezekiah Masses','LV • CB','Three interceptions through three games for unbeaten Vegas.'],
['Jaishawn Barham','DAL • LB','Seven tackles and two TFL against Baltimore.'],
['Genesis Smith','LAC • S','Two interceptions of Josh Allen in Week 3.'],
['Antonio Williams','WAS • WR','Still part of Washington’s young offensive core.'],
['Denzel Boston','CLE • WR','One of the rookie pass-catchers we continue to track.'],
['Jadarian Price','SEA • RB','Remains in Seattle’s early offensive rookie picture.'],
['Arvell Reese','NYG • LB','A major piece of the Giants’ young defensive core.'],
['Caleb Downs','DAL • S','A fourth-down stop on Derrick Henry highlighted Week 3.']];
const games=[['THU • 8:15 ET','Steelers at Browns'],['SUN • LONDON • 9:30 ET','Colts at Commanders'],['SUN • 1 ET','Titans at Ravens'],['SUN • 1 ET','Patriots at Bills'],['SUN • 1 ET','Jets at Bears'],['SUN • 1 ET','Jaguars at Bengals'],['SUN • 1 ET','Cowboys at Texans'],['SUN • 1 ET','Cardinals at Giants'],['SUN • 1 ET','Rams at Eagles'],['SUN • 1 ET','Packers at Buccaneers'],['SUN • 4:05 ET','Dolphins at Vikings'],['SUN • 4:25 ET','Chiefs at Raiders'],['SUN • 4:25 ET','Chargers at Seahawks'],['SUN • 4:25 ET','Broncos at 49ers'],['SNF • 8:20 ET','Lions at Panthers'],['MNF • 8:15 ET','Falcons at Saints']];
function css(){if($('#w4mastercss'))return;let s=document.createElement('style');s.id='w4mastercss';s.textContent=`
.fourdk-live-board,.fourdk-mnf-headline,#week2-current,.w3rookies,#power-rankings,#mvp-watch,#rookie-watch{display:none!important}
.w4{padding:40px 0;background:#080b09;color:#f6f2e8;border-bottom:1px solid #293029}.w4 .shell{width:min(1180px,calc(100% - 32px));margin:auto}.w4k{color:#ef4144;font:1000 10px Arial;letter-spacing:.15em}.w4 h2{margin:7px 0 12px;font:1000 clamp(38px,7vw,72px)/.87 Arial Black,Impact,sans-serif;letter-spacing:-.05em}.w4 h2 em{font-style:normal;color:#ef3438}.w4p{max-width:820px;color:#a5aba5;line-height:1.6}.w4btn{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}.w4btn a{padding:12px 14px;border:1px solid #394039;color:#fff!important;text-decoration:none!important;font:900 9px Arial}.w4btn a:first-child{background:#ef3438;border-color:#ef3438}.w4grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.w4box{padding:13px;background:#101511;border:1px solid #303730}.w4box small{color:#dfb45a;font:900 8px Arial}.w4box b{display:block;margin-top:6px;font:1000 14px Arial}.w4list{display:grid;grid-template-columns:1fr 1fr;gap:7px}.w4row{display:grid;grid-template-columns:42px 1fr;gap:11px;padding:14px;background:#101511;border:1px solid #303730}.w4num{font:1000 25px Arial;color:#747d75}.w4row h3{margin:0;font:1000 17px Arial}.w4row small{display:block;color:#ef6650;margin:4px 0;font:900 9px Arial}.w4row b{display:block;color:#e4b65c;font:900 9px Arial}.w4row p{margin:6px 0 0;color:#a1a7a1;font:12px/1.45 Arial}.w4archive{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.w4archive a{padding:18px;border:1px solid #303730;color:#fff!important;text-decoration:none!important}.w4archive b{display:block;font:1000 22px Arial;margin:6px 0}.w4archive span{color:#9aa19a;font-size:11px}@media(max-width:760px){.w4grid{grid-template-columns:1fr 1fr}.w4list,.w4archive{grid-template-columns:1fr}}`;document.head.appendChild(s)}
function kill(){$$('.fourdk-live-board,.fourdk-mnf-headline,.w3rookies,#week2-current').forEach(x=>x.remove())}
function sec(id,after){let s=$('#'+id);if(!s){s=document.createElement('section');s.id=id;s.className='w4';after?.insertAdjacentElement('afterend',s)}return s}
function run(){css();kill();
let t=$('.nfl-ticker-track');if(t)t.innerHTML=['WEEK 4: STEELERS AT BROWNS','LONDON: COLTS AT COMMANDERS','RAMS AT EAGLES','CHIEFS AT RAIDERS','BRONCOS AT 49ERS','SNF: LIONS AT PANTHERS','MNF: FALCONS AT SAINTS'].map(x=>`<span><b>●</b> ${x}</span>`).join('');
let h=$('.nfl-v2-hero .nfl-v2-copy');if(h)h.innerHTML=`<div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 4 CURRENT</div><h1>WEEK 4<br><em>STARTS NOW.</em></h1><p class="nfl-v2-deck">Week 3 is final and preserved. The board turns to Week 4 without deleting the season behind it.</p><div class="nfl-v2-actions"><a class="nfl-v2-primary" href="nfl-week4-preview-2026.html">OPEN WEEK 4 PREVIEW</a><a class="nfl-v2-secondary" href="nfl-week3-hub-2026.html">WEEK 3 ARCHIVE</a></div>`;
let n=$('.nfl-v2-nav');if(n)n.innerHTML=`<a class="active" href="#w4current">Week 4</a><a href="#scoreboard">Scores</a><a href="#w4redzone">Red Zone</a><a href="#w4rank">Rankings</a><a href="#w4mvp">MVP</a><a href="#w4rook">Rookies</a><a href="#w4archive">Archives</a>`;
let anchor=n||$('#scoreboard'),a=sec('w4current',anchor);a.innerHTML=`<div class="shell"><span class="w4k">4DK NFL • CURRENT WEEK</span><h2>WEEK 4 <em>ON DECK.</em></h2><p class="w4p">Week 3 is closed. Week 4 runs October 1–5 with the first London game of October and a loaded late Sunday window.</p><div class="w4btn"><a href="nfl-week4-preview-2026.html">FULL PREVIEW →</a><a href="#scoreboard">LIVE SCOREBOARD →</a><a href="nfl-week3-hub-2026.html">WEEK 3 ARCHIVE →</a></div><div class="w4grid">${games.map(x=>`<div class="w4box"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div></div>`;
let z=sec('w4redzone',a);z.innerHTML=`<div class="shell"><span class="w4k">4DK RED ZONE • WEEK 4</span><h2>WHAT MATTERS <em>NOW.</em></h2><div class="w4grid"><div class="w4box"><small>UNBEATEN PRESSURE</small><b>CHIEFS AT RAIDERS</b></div><div class="w4box"><small>4DK SPOTLIGHT</small><b>BRONCOS AT 49ERS</b></div><div class="w4box"><small>RESPONSE GAME</small><b>RAMS AT EAGLES</b></div><div class="w4box"><small>PRIME TIME</small><b>LIONS AT PANTHERS</b></div></div></div>`;
let r=sec('w4rank',z);r.innerHTML=`<div class="shell"><span class="w4k">WEEK 3 • FINAL</span><h2>POWER RANKINGS.</h2><div class="w4list">${ranks.map((x,i)=>`<div class="w4row"><div class="w4num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small></div></div>`).join('')}</div></div>`;
let m=sec('w4mvp',r);m.innerHTML=`<div class="shell"><span class="w4k">WEEK 3 • FINAL</span><h2>MVP WATCH.</h2><div class="w4list">${mvp.map((x,i)=>`<div class="w4row"><div class="w4num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small><b>${x[2]}</b><p>${x[3]}</p></div></div>`).join('')}</div></div>`;
let o=sec('w4rook',m);o.innerHTML=`<div class="shell"><span class="w4k">WEEK 3 • FINAL</span><h2>ROOKIE WATCH.</h2><div class="w4list">${rook.map((x,i)=>`<div class="w4row"><div class="w4num">${i+1}</div><div><h3>${x[0]}</h3><small>${x[1]}</small><p>${x[2]}</p></div></div>`).join('')}</div></div>`;
let ar=sec('w4archive',o);ar.innerHTML=`<div class="shell"><span class="w4k">4DK NFL • 2026 ARCHIVE</span><h2>NOTHING GETS DELETED.</h2><div class="w4archive"><a href="nfl-sunday-recaps.html"><small>ARCHIVE</small><b>WEEK 1</b><span>Opening-week coverage and boards.</span></a><a href="nfl-sunday-recap-week2.html"><small>ARCHIVE</small><b>WEEK 2</b><span>Completed Week 2 coverage.</span></a><a href="nfl-week3-hub-2026.html"><small>ARCHIVE</small><b>WEEK 3</b><span>Recaps, MNF closeout and final boards.</span></a></div></div>`}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,400,900,1800,3500,6500].forEach(x=>setTimeout(run,x));let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;setTimeout(()=>{run();busy=false},80)}).observe(document.documentElement,{childList:true,subtree:true});
})();