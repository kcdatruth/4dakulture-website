(()=>{const p=(location.pathname||'').toLowerCase();if(!p.endsWith('/nfl.html')&&!p.endsWith('/nfl'))return;
const GROUPS={
'GAME DAY':{status:'WEEK 4 • TNF FINAL',items:[
['Browns 27, Steelers 24 — Cleveland moves to 3–1 behind Deshaun Watson, five defensive sacks and a 56-yard game-winner.','nfl-thursday-recap-week4-steelers-browns.html','FINAL'],
['Colts at Commanders opens the October London slate Sunday at 9:30 ET.','nfl-week4-preview-2026.html','LONDON'],
['Chiefs at Raiders puts unbeaten Kansas City and unbeaten Las Vegas in the late-window spotlight.','nfl-week4-preview-2026.html#game-of-the-week','AFC'],
['Broncos at 49ers: Denver visits the 3–0 team holding the current 4DK No. 1 spot.','nfl-week4-preview-2026.html#power-test','4DK']
]},
'INJURY REPORT':{status:'WEEK 4 • TRACKING',items:[
['Mason Graham left Thursday night with a knee injury and did not return. His status is one of Cleveland’s biggest post-TNF questions.','nfl-thursday-recap-week4-steelers-browns.html','CLE'],
['The rest of the Week 4 injury board continues to update as official game statuses arrive.','nfl-week4-preview-2026.html','WATCH']
]},
'ROSTER MOVES':{status:'WEEK 4 • WATCH',items:[
['The Week 4 board is tracking depth-chart changes and roster moves that materially affect this week’s matchups.','nfl-week4-preview-2026.html','WATCH'],
['Current-week updates replace old-week status items while archived coverage stays intact.','nfl-week4-preview-2026.html','4DK']
]},
'AROUND THE LEAGUE':{status:'WEEK 4 • CURRENT',items:[
['Browns 27, Steelers 24 — Cleveland reaches 3–1 and opens Week 4 with an AFC North statement.','nfl-thursday-recap-week4-steelers-browns.html','TNF'],
['Chiefs at Raiders — two 3–0 AFC West teams meet Sunday afternoon in Las Vegas.','nfl-week4-preview-2026.html#game-of-the-week','AFC'],
['Broncos at 49ers — Denver’s rise meets San Francisco’s unbeaten start.','nfl-week4-preview-2026.html#power-test','NFC'],
['Colts at Commanders — the first London game of October starts Sunday morning.','nfl-week4-preview-2026.html','LONDON']
]}}
function install(){const z=document.querySelector('#redzone,.nfl-redzone');if(!z)return false;
let now=z.querySelector('.fourdk-rz-now');if(now)now.innerHTML='<strong><i></i> RED ZONE NOW</strong><span>WEEK 4 • TNF FINAL • SUNDAY AHEAD</span>';
let f=z.querySelector('.fourdk-rz-feature');if(f){f.href='nfl-thursday-recap-week4-steelers-browns.html';f.innerHTML=`<div class="fourdk-rz-feature-mark"><div><small>TNF FINAL</small><strong>3–1<br>CLE</strong></div></div><div class="fourdk-rz-feature-copy"><small>FEATURED NOW • AFC NORTH</small><h3>CLEVELAND IS 3–1.</h3><p>Watson played winning football, the Browns sacked Aaron Rodgers five times and Cleveland’s young core turned Thursday into a real playoff conversation.</p></div><span class="fourdk-rz-feature-read">READ TNF RECAP →</span>`}
let g=z.querySelector('.redzone-grid');if(g){[...g.children].forEach(c=>{let h=c.querySelector('b,strong');if(!h)return;let d=GROUPS[h.textContent.trim().toUpperCase()];if(!d)return;let s=c.querySelector('.fourdk-rz-status');if(!s){s=document.createElement('span');s.className='fourdk-rz-status';c.appendChild(s)}s.textContent=d.status;let l=c.querySelector('.fourdk-rz-links');if(!l){l=document.createElement('div');l.className='fourdk-rz-links';c.appendChild(l)}l.innerHTML=d.items.map(x=>`<a href="${x[1]}"><i aria-hidden="true"></i><span>${x[0]}</span><b>${x[2]} →</b></a>`).join('')});let n=z.querySelector('.fourdk-rz-source-note');if(!n){n=document.createElement('div');n.className='fourdk-rz-source-note';g.insertAdjacentElement('afterend',n)}n.textContent='4DK RED ZONE • WEEK 4 CURRENT • THURSDAY FINAL • WEEK 1–3 COVERAGE PRESERVED IN ARCHIVES'}
z.dataset.week4Current='true';z.dataset.week4TnfFinal='true';return true}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();[200,500,1000,1800,3000,5000,8000].forEach(t=>setTimeout(install,t));
})();