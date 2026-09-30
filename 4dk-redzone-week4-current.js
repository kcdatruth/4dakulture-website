(()=>{const p=(location.pathname||'').toLowerCase();if(!p.endsWith('/nfl.html')&&!p.endsWith('/nfl'))return;
const GROUPS={
'GAME DAY':{status:'WEEK 4 • ON DECK',items:[
['Steelers at Browns opens Week 4 Thursday night. Pittsburgh enters 2–1 after beating Cincinnati 30–27.','nfl-week4-preview-2026.html','TNF'],
['Colts at Commanders opens the October London slate Sunday at 9:30 ET.','nfl-week4-preview-2026.html','LONDON'],
['Chiefs at Raiders puts unbeaten Kansas City and unbeaten Las Vegas in the late-window spotlight.','nfl-week4-preview-2026.html','AFC'],
['Broncos at 49ers: Denver comes off a 30–26 win over the Rams; San Francisco is 3–0 after beating Arizona 36–30.','nfl-week4-preview-2026.html','4DK']
]},
'INJURY REPORT':{status:'WEEK 4 • TRACKING',items:[
['Week 4 injury designations are still developing. 4DK will update this board as official practice reports and game statuses arrive.','nfl-week4-preview-2026.html','WATCH'],
['Do not carry Week 2 OUT/DOUBTFUL labels forward — this board now belongs to Week 4.','nfl-week4-preview-2026.html','CURRENT']
]},
'ROSTER MOVES':{status:'WEEK 4 • WATCH',items:[
['The Week 4 board is tracking depth-chart changes and roster moves that materially affect this week’s matchups.','nfl-week4-preview-2026.html','WATCH'],
['Current-week updates will replace this watch item as official moves are announced.','nfl-week4-preview-2026.html','4DK']
]},
'AROUND THE LEAGUE':{status:'POST-WEEK 3 • QUICK HITS',items:[
['49ers 36, Cardinals 30 — San Francisco reaches Week 4 at 3–0.','nfl-week3-hub-2026.html','NFC'],
['Broncos 30, Rams 26 — Denver moves to 2–1 before its trip to San Francisco.','nfl-week3-hub-2026.html','AFC'],
['Bears 27, Eagles 7 — Chicago closes Week 3 with a Monday-night statement.','nfl-week3-hub-2026.html','MNF'],
['Raiders 35, Saints 27 — Las Vegas enters its Week 4 matchup with Kansas City at 3–0.','nfl-week3-hub-2026.html','AFC']
]}}
function install(){const z=document.querySelector('#redzone,.nfl-redzone');if(!z)return false;
let now=z.querySelector('.fourdk-rz-now');if(now)now.innerHTML='<strong><i></i> RED ZONE NOW</strong><span>WEEK 4 • OCT. 1–5 • CURRENT</span>';
let f=z.querySelector('.fourdk-rz-feature');if(f){f.href='nfl-week4-preview-2026.html';f.innerHTML=`<div class="fourdk-rz-feature-mark"><div><small>WEEK 4</small><strong>3–0<br>vs 3–0</strong></div></div><div class="fourdk-rz-feature-copy"><small>FEATURED NOW • LATE WINDOW</small><h3>CHIEFS AT RAIDERS.</h3><p>Two unbeaten AFC teams meet in Las Vegas while the 4DK board also tracks Broncos–49ers, Rams–Eagles and the London opener.</p></div><span class="fourdk-rz-feature-read">WEEK 4 PREVIEW →</span>`}
let g=z.querySelector('.redzone-grid');if(g){[...g.children].forEach(c=>{let h=c.querySelector('b,strong');if(!h)return;let d=GROUPS[h.textContent.trim().toUpperCase()];if(!d)return;let s=c.querySelector('.fourdk-rz-status');if(!s){s=document.createElement('span');s.className='fourdk-rz-status';c.appendChild(s)}s.textContent=d.status;let l=c.querySelector('.fourdk-rz-links');if(!l){l=document.createElement('div');l.className='fourdk-rz-links';c.appendChild(l)}l.innerHTML=d.items.map(x=>`<a href="${x[1]}"><i aria-hidden="true"></i><span>${x[0]}</span><b>${x[2]} →</b></a>`).join('')});let n=z.querySelector('.fourdk-rz-source-note');if(!n){n=document.createElement('div');n.className='fourdk-rz-source-note';g.insertAdjacentElement('afterend',n)}n.textContent='4DK RED ZONE • WEEK 4 CURRENT • WEEK 1–3 COVERAGE PRESERVED IN ARCHIVES'}
z.dataset.week4Current='true';return true}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();[200,500,1000,1800,3000,5000,8000].forEach(t=>setTimeout(install,t));
})();