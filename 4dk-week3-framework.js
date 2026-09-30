(() => {
const isNFL=()=>{const p=(location.pathname||'/').toLowerCase();return p.endsWith('/nfl.html')||p.endsWith('/nfl')};
if(!isNFL())return;

let busy=false;
function style(){
 if(document.getElementById('w3-final-fix'))return;
 const s=document.createElement('style');s.id='w3-final-fix';
 s.textContent=`.fourdk-w3{padding:30px 0;background:#090c0a;color:#f5f2eb;border-top:1px solid #29302a;border-bottom:1px solid #29302a}.fourdk-w3 .shell{position:relative}.w3h{display:flex;justify-content:space-between;gap:18px;align-items:end;margin-bottom:14px}.w3h small{color:#ef503a;font-size:8px;font-weight:1000;letter-spacing:.13em}.w3h h2{margin:5px 0 0;font:1000 clamp(30px,5vw,52px)/.9 Arial Black,Impact,sans-serif}.w3h a{color:#e1b85c!important;text-decoration:none!important;font-size:8px;font-weight:1000}.w3lead{border:1px solid #343a34;background:#111512;margin-bottom:9px;padding:22px}.w3lead small{color:#ef503a;font-size:8px;font-weight:1000}.w3lead h3{margin:7px 0 9px;font:1000 clamp(30px,5vw,54px)/.88 Arial Black,Impact,sans-serif}.w3lead h3 em{font-style:normal;color:#efb24b}.w3lead p{color:#a9b0aa;font:13px/1.55 Georgia,serif}.w3stats{display:flex;gap:7px;flex-wrap:wrap;margin:16px 0}.w3stats span{padding:7px 8px;border:1px solid #353d36;background:#0b0f0c;color:#d2d6d2;font-size:7px;font-weight:1000}.w3lead a{display:inline-flex;padding:12px;background:#c92d38;color:#fff!important;text-decoration:none!important;font-size:8px;font-weight:1000}.w3g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.w3c{display:flex;flex-direction:column;min-height:105px;padding:14px;border:1px solid #303731;border-top:3px solid #c92d38;background:#111512;color:#fff!important;text-decoration:none!important}.w3c small{color:#ef503a;font-size:7px;font-weight:1000}.w3c b{display:block;margin:8px 0;font:1000 20px/.98 Arial Black,Impact,sans-serif}.w3c span{margin-top:auto;color:#909990;font-size:8px}@media(max-width:650px){.w3h{display:block}.w3h a{display:block;margin-top:10px}.w3g{grid-template-columns:1fr}}`;
 document.head.appendChild(s);
}
function hero(){
 const c=document.querySelector('.nfl-v2-hero .nfl-v2-copy');if(!c)return;
 if(!c.textContent.includes('WEEK 3')||!c.textContent.includes('IN THE BOOKS')){
 c.innerHTML=`<div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 3 FINAL</div><h1>WEEK 3<br><em>IS IN THE BOOKS.</em></h1><p class="nfl-v2-deck">Chicago closed the week with a 27–7 statement over Philadelphia. Case Keenum delivered three total touchdowns, both teams leave at 2–1, and our Week 3 boards are locked as we turn toward Week 4.</p><div class="nfl-v2-actions"><a class="nfl-v2-primary" href="nfl-mnf-recap-week3-bears-eagles.html">Read MNF Recap</a><a class="nfl-v2-secondary" href="nfl-week3-hub-2026.html">Open Week 3 Archive</a></div><div class="nfl-v2-meta"><span>CHI 27 • PHI 7</span><i>•</i><span>WEEK 3 FINAL</span><i>•</i><span>WEEK 4 NEXT</span></div>`;
 }}
function board(){
 const b=document.querySelector('.nfl-v2-board');if(!b)return;
 if(b.dataset.week3Board==='final'&&b.textContent.includes('CHICAGO 27'))return;
 b.dataset.week3Board='final';b.innerHTML=`<div class="nfl-v2-board-top"><span>THE 4DK BOARD</span><strong>WEEK 3 • FINAL</strong></div><a class="nfl-v2-board-row live" href="nfl-mnf-recap-week3-bears-eagles.html"><div><small>MONDAY • FINAL</small><b>CHICAGO 27 • PHILADELPHIA 7</b></div><span>RECAP →</span></a><a class="nfl-v2-board-row" href="nfl-sunday-recap-week3.html"><div><small>SUNDAY • FINAL</small><b>FULL WEEK 3 SUNDAY RECAP</b></div><span>RECAP →</span></a><a class="nfl-v2-board-row" href="nfl-power-rankings-week3-2026.html"><div><small>TUESDAY • FINAL</small><b>POWER RANKINGS • 1–32</b></div><span>RANKINGS →</span></a><a class="nfl-v2-board-row" href="#mvp-watch"><div><small>TUESDAY • FINAL</small><b>MVP WATCH • ROOKIE WATCH</b></div><span>BOARDS →</span></a><div class="nfl-v2-board-foot">WEEK 3 IS COMPLETE • COVERAGE STAYS ARCHIVED • WEEK 4 IS NEXT.</div>`;
}
function ticker(){
 const t=document.querySelector('.nfl-ticker-track');if(!t)return;
 const wanted='WEEK 3 FINAL: Bears 27, Eagles 7';
 if(t.textContent.includes(wanted))return;
 t.innerHTML=['WEEK 3 FINAL: Bears 27, Eagles 7','Case Keenum: 247 pass yds • 3 total TD','Chicago 2–1 • Philadelphia 2–1','Power Rankings: San Francisco No. 1','MVP Watch: Brock Purdy No. 1','NEXT: Week 4'].map(x=>`<span><b>●</b> ${x}</span>`).join('');
}
function desk(){
 const a=document.querySelector('#redzone,.nfl-redzone,[data-nfl-scoreboard]');if(!a)return;
 let x=document.querySelector('.fourdk-w3');
 if(x&&x.textContent.includes('WEEK 3 IS CLOSED'))return;
 x?.remove();x=document.createElement('section');x.className='fourdk-w3';x.id='week3-desk';
 x.innerHTML=`<div class="shell"><div class="w3h"><div><small>4DK NFL • WEEK 3 ARCHIVE</small><h2>WEEK 3 IS CLOSED.</h2></div><a href="nfl-week3-hub-2026.html">OPEN FULL WEEK 3 ARCHIVE →</a></div><article class="w3lead"><small>MONDAY NIGHT FOOTBALL • FINAL</small><h3>CHICAGO DIDN’T JUST SURVIVE.<br><em>THEY EXPOSED PHILLY.</em></h3><p>Case Keenum went 24-of-34 for 247 yards, threw two touchdowns and ran for another as Chicago beat Philadelphia 27–7.</p><div class="w3stats"><span>CHI 27 • PHI 7</span><span>KEENUM 247 PASS YDS</span><span>3 TOTAL TD</span></div><a href="nfl-mnf-recap-week3-bears-eagles.html">READ THE FULL MNF RECAP →</a></article><div class="w3g"><a class="w3c" href="nfl-thursday-recap-week3-falcons-packers.html"><small>THURSDAY • FINAL</small><b>FALCONS 35, PACKERS 14</b><span>Week 3 opener</span></a><a class="w3c" href="nfl-sunday-recap-week3.html"><small>SUNDAY • FINAL</small><b>FULL SUNDAY RECAP</b><span>Sunday archived</span></a><a class="w3c" href="nfl-mnf-recap-week3-bears-eagles.html"><small>MONDAY • FINAL</small><b>BEARS 27, EAGLES 7</b><span>Keenum delivers</span></a><a class="w3c" href="nfl-power-rankings-week3-2026.html"><small>TUESDAY • FINAL</small><b>POWER • MVP • ROOKIE</b><span>Final Week 3 boards</span></a></div></div>`;
 a.insertAdjacentElement('beforebegin',x);
}
function legacy(){
 const s=document.querySelector('#week2-current');if(!s)return;
 const k=s.querySelector('.w2-kicker'),h=s.querySelector('.w2-top h2'),p=s.querySelector('.w2-top p'),n=s.querySelector('.w2-note');
 if(k)k.textContent='4DK NFL • ARCHIVE';
 if(h)h.textContent='WEEK 2 ARCHIVE.';
 if(p)p.textContent='Week 2 remains preserved in the archive. Week 3 is complete and Week 4 is next.';
 if(n)n.textContent='Archived Week 2 coverage • preserved as part of the 2026 season timeline.';
}
function labels(){
 const w=document.querySelector('#mvp-watch,.mvp-watch');
 if(w){const p=w.querySelector('.mvp-head p'),s=w.querySelector('.mvp-stamp');if(p)p.textContent='Week 3 is complete. Team results, individual production and early-season impact shape our final board as the league turns to Week 4.';if(s)s.innerHTML='WEEK 3 • FINAL<br>SEPT. 29, 2026'}
 const st=document.querySelector('.w3standings');
 if(st){st.querySelectorAll('.w3conf-title span').forEach(x=>x.textContent='WEEK 3 • FINAL');st.querySelectorAll('.w3team').forEach(r=>{const n=r.querySelector('strong')?.textContent.trim(),b=r.querySelector('b');if((n==='Philadelphia Eagles'||n==='Chicago Bears')&&b)b.textContent='2–1'});}
}
function nav(){
 const n=document.querySelector('.nfl-v2-nav');if(!n)return;
 let w=n.querySelector('a[href="#week3-desk"]');if(!w){w=document.createElement('a');w.href='#week3-desk';n.prepend(w)}w.textContent='Week 3 Archive';w.classList.remove('active');
 let x=n.querySelector('[data-week4-next]');if(!x){x=document.createElement('a');x.href='#';x.dataset.week4Next='1';n.prepend(x)}x.textContent='Week 4 Next';x.classList.add('active');
}
function run(){if(busy)return;busy=true;try{style();ticker();hero();board();desk();legacy();labels();nav()}finally{busy=false}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();

/* Old Week 2 scripts can rewrite the DOM after load. Keep Week 3 final authoritative. */
[250,700,1400,2800,5000,8000,12000,18000].forEach(t=>setTimeout(run,t));
const obs=new MutationObserver(()=>{clearTimeout(window.__fourdkW3Repair);window.__fourdkW3Repair=setTimeout(run,60)});
obs.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
setInterval(run,15000);
})();