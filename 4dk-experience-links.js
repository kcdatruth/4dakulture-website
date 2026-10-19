/* Additive discovery ribbon for existing 4DK pages. Doesn't replace or mutate editorial content. */
(() => {
 'use strict';
 const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
 const active=new Set(['index.html','nba.html','nfl.html','hiphop.html','king-files.html']);
 if(!active.has(page) || document.getElementById('fx-launcher'))return;
 const items=[
 ['NBA NIGHTCAP','NIGHTCAP EXPLORER','4dk-nightcap-explorer.html'],
 ['NFL','NFL COMMAND CENTER','4dk-nfl-command-center.html'],
 ['HIP-HOP','ALBUM FILES LIBRARY','4dk-album-files-library.html'],
 ['THE KING','LEBRON TIMELINE','4dk-king-files-timeline.html'],
 ['WHO YOU GOT?','PLAYER HEAD-TO-HEAD','nba-rankings-hq.html?compare=1-2']
 ];
 const section=document.createElement('section');section.id='fx-launcher';section.setAttribute('aria-label','4 Da Kulture interactive experiences');
 section.innerHTML='<div class="fxl-upper"><div><span>4DK · INTERACTIVE WORLD</span><strong style="display:block;margin-top:5px">FIVE WAYS TO GO DEEPER.</strong></div><a class="fxl-full" href="4dk-interactive.html">ENTER THE FULL INTERACTIVE DESK →</a></div><div class="fxl-grid">'+items.map(x=>`<a href="${x[2]}"><b>${x[0]}</b>${x[1]} →</a>`).join('')+'</div>';
 const main=document.querySelector('main');if(!main)return;
 const first=main.firstElementChild;
 if(first && first.tagName==='SECTION' && first.parentNode===main){first.insertAdjacentElement('afterend',section)}else main.insertBefore(section,first);
})();

/* The current-edition feed promotes verified newly published coverage above the preserved archive. */
if ((location.pathname.split("/").pop().toLowerCase()||"index.html")==="index.html") {
  const refreshCss=document.createElement("link");refreshCss.rel="stylesheet";refreshCss.href="4dk-home-refresh.css";document.head.appendChild(refreshCss);
  const refreshJs=document.createElement("script");refreshJs.src="4dk-home-refresh.js";refreshJs.defer=true;document.body.appendChild(refreshJs);
}


/* 4DK NFL EMERGENCY DESK — Week 6 Cardinals 18, Rams 16, October 18 2026.
   Add-only story spotlight; existing scores, articles, editorial and navigation remain untouched. */
;(() => {
  'use strict';
  const page=(location.pathname.split('/').pop().toLowerCase()||'index.html');
  if(page!=='nfl.html')return;
  function insert(){
    if(document.getElementById('fourdk-rams-emergency-banner'))return;
    const main=document.querySelector('main');if(!main)return;
    const style=document.createElement('style');style.id='fourdk-rams-emergency-style';
    style.textContent='#fourdk-rams-emergency-banner{background:linear-gradient(114deg,#22171b,#5e292f 65%,#211b21);border-top:4px solid #e5b978;border-bottom:3px solid #e34a3f;color:#f8efe8;padding:25px 5%;display:block;text-decoration:none;font-family:Arial,sans-serif}#fourdk-rams-emergency-banner .rams-inner{max-width:1150px;margin:auto}#fourdk-rams-emergency-banner small{color:#eed3a3;font-size:11px;font-weight:900;letter-spacing:.15em}#fourdk-rams-emergency-banner strong{display:block;font-size:clamp(37px,6vw,74px);line-height:.96;margin:10px 0;font-weight:1000;letter-spacing:-.035em}#fourdk-rams-emergency-banner p{color:#e6d3cd;font-size:clamp(14px,2vw,18px);line-height:1.5;margin:0 0 12px;max-width:840px}#fourdk-rams-emergency-banner b{font-size:11px;color:#f5c47c;letter-spacing:.08em}';
    document.head.appendChild(style);
    const promo=document.createElement('a');promo.href='rams-week6-emergency-oct18-2026.html';promo.id='fourdk-rams-emergency-banner';
    promo.innerHTML='<div class="rams-inner"><small>4DK EMERGENCY NFL REPORT • WEEK 6 FINAL • OCT 18</small><strong>THE RAMS ARE IN TROUBLE.</strong><p>Arizona 18, Los Angeles 16. Two and four, last in the NFC West. Our preseason 14–3 prediction is officially dead.</p><b>READ THE COMPLETE 4DK EMERGENCY BREAKDOWN →</b></div>';
    main.insertBefore(promo,main.firstChild);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',insert,{once:true});else insert();
})();

/* 4DK Week 6 Sunday full recap • additive NFL-only entry point.
 * Never replaces the Rams emergency report, current rankings or historical articles. */
;(() => {
  'use strict';
  const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
  if(page!=='nfl.html')return;
  function addSundayRecap(){
    if(document.getElementById('fourdk-week6-sunday-recap-banner'))return;
    const main=document.querySelector('main');if(!main)return;
    const style=document.createElement('style');style.id='fourdk-week6-sunday-banner-style';
    style.textContent='#fourdk-week6-sunday-recap-banner{display:flex;align-items:stretch;justify-content:space-between;gap:23px;background:linear-gradient(112deg,#281921,#492830,#140e14);border-bottom:4px solid #e4493e;color:#f9f0e9;text-decoration:none;font-family:Arial,Helvetica,sans-serif;min-width:0}#fourdk-week6-sunday-recap-banner .recap-copy{padding:31px max(5%,calc((100% - 1120px)/2));flex:1;min-width:0}#fourdk-week6-sunday-recap-banner small{display:block;color:#efc183;font-weight:900;letter-spacing:.14em;font-size:10px}#fourdk-week6-sunday-recap-banner strong{display:block;font:1000 clamp(37px,6vw,76px)/.94 Impact,Arial,sans-serif;margin:13px 0;letter-spacing:-.02em}#fourdk-week6-sunday-recap-banner p{color:#e2d1c8;font:16px/1.5 Georgia,serif;max-width:800px;margin:0 0 15px}#fourdk-week6-sunday-recap-banner b{color:#f4c88b;font-weight:900;font-size:11px;letter-spacing:.09em}#fourdk-week6-sunday-recap-banner .recap-image{max-width:250px;width:28%;min-height:205px;object-fit:cover;object-position:center}@media(max-width:590px){#fourdk-week6-sunday-recap-banner .recap-image{width:32%;max-width:115px}#fourdk-week6-sunday-recap-banner .recap-copy{padding:22px 16px}#fourdk-week6-sunday-recap-banner strong{font-size:clamp(31px,8vw,48px)}}';
    document.head.appendChild(style);
    const promo=document.createElement('a');
    promo.id='fourdk-week6-sunday-recap-banner';promo.href='nfl-sunday-recap-week6-2026.html';
    promo.innerHTML='<div class="recap-copy"><small>4DK NFL • WEEK 6 SUNDAY RECAP • ALL 12 FINALS</small><strong>SUNDAY BROKE THE SCRIPT.</strong><p>Every result, every fourth-quarter swing, and the complete 4DK film-room analysis. From the Rams crisis to Dallas’s offensive collapse in Green Bay—every game, including our full Sunday Night Football film room.</p><b>READ THE ENTIRE SUNDAY RECAP →</b></div><img class="recap-image" loading="lazy" src="4dk-week6-josh-allen.jpg" alt="4DK NFL archive image of Josh Allen">';
    main.insertBefore(promo,main.firstChild);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addSundayRecap,{once:true});else addSundayRecap();
})();
