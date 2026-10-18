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
