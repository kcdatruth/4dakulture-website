/* 4DK TNF Week 8: additive homepage and archive feature. No other stories removed. */
(()=>{'use strict';
const article='nfl-tnf-packers-panthers-oct29-2026.html';
const path=location.pathname.split('/').pop().toLowerCase();
const style=document.createElement('style');style.textContent=`
#fourdk-tnf-week8{background:#100d0c;color:#f5e9d8;border-top:4px solid #c79857;border-bottom:3px solid #b73c32;padding:38px 20px;font-family:Arial,sans-serif}
#fourdk-tnf-week8 .inner{max-width:1120px;margin:auto}#fourdk-tnf-week8 .ey{color:#dfb778;letter-spacing:.16em;font-weight:900;font-size:12px}
#fourdk-tnf-week8 h2{font:900 clamp(36px,7vw,75px)/.98 Arial,sans-serif;letter-spacing:-.04em;margin:17px 0;text-transform:uppercase}
#fourdk-tnf-week8 p{font:clamp(17px,2.4vw,22px)/1.6 Georgia,serif;max-width:850px}
#fourdk-tnf-week8 .score{color:#e2ba80;font-weight:900;letter-spacing:.05em}#fourdk-tnf-week8 a{display:inline-block;background:#c69a5c;color:#160e0b;text-decoration:none;padding:16px 22px;font-weight:900;margin-top:12px}
`;document.head.appendChild(style);
if(path==='nfl.html'||path===''){
 if(!document.getElementById('fourdk-tnf-week8')){
 const section=document.createElement('section');section.id='fourdk-tnf-week8';section.setAttribute('aria-label','Latest Thursday Night Football recap');
 section.innerHTML='<div class="inner"><div class="ey">LATEST TNF RECAP · WEEK 8 · OCTOBER 29, 2026</div><h2>LOVE DELIVERS. GREEN BAY SURVIVES. BUT THE CRACKS REMAIN.</h2><div class="score">GREEN BAY PACKERS 27 · CAROLINA PANTHERS 19</div><p>Jordan Love delivered three touchdown passes and the Packers defense piled up six sacks. But an uneven ground game and a scoreless fourth quarter kept Carolina in striking distance. Our full 4DK film-room-style analysis examines both teams, the turning points and what comes next.</p><a href="'+article+'">READ THE COMPLETE 4DK TNF RECAP →</a> <a href="nfl-thursday-recaps.html">ALL THURSDAY RECAPS →</a></div>';
 const rank=document.querySelector('[id*="rankings-hq"], [id*="nfl-rankings"], [id*="fourdk-nfl-week8"]');
 const main=document.querySelector('main');if(rank&&rank.parentNode)rank.insertAdjacentElement('afterend',section);else if(main)main.insertAdjacentElement('afterbegin',section);
 }
 // Only replace the specific misleading empty-state text; never override real scores.
 document.querySelectorAll('body *').forEach(el=>{if(el.children.length===0&&el.textContent.trim()==='No games scheduled in tracked leagues today'){el.textContent='NFL WEEK 8 · GB 27–CAR 19 FINAL · NEXT: SUNDAY, NOV 1';}});
}
if(path==='nfl-thursday-recaps.html'){
 const grid=document.querySelector('.tnr-grid');if(grid&&!grid.querySelector('a[href="'+article+'"]')){
 const a=document.createElement('a');a.className='tnr-card latest';a.href=article;
 a.innerHTML='<small>Week 8 · October 29, 2026</small><h3>Love Delivers. Green Bay Survives.</h3><div class="tnr-score">GB 27 · CAR 19</div><p>Three Love touchdown passes, six Packers sacks, and a Carolina comeback that exposed unfinished business in Green Bay.</p><b>Read the full Thursday recap →</b>';
 grid.querySelectorAll('.tnr-card.latest').forEach(e=>e.classList.remove('latest'));grid.prepend(a);
 }
}
})();
