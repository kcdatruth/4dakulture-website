/* Additive discovery ribbon for existing 4DK pages. Doesn't replace or mutate editorial content. */
(() => {
 'use strict';
 const page=(location.pathname.replace(/\/+$/,'').split('/').pop().toLowerCase()||'index').replace(/\.html$/,'')+'.html';
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
  const page=((location.pathname.replace(/\/+$/,'').split('/').pop().toLowerCase()||'index').replace(/\.html$/,'')+'.html');
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
  const page=(location.pathname.replace(/\/+$/,'').split('/').pop().toLowerCase()||'index').replace(/\.html$/,'')+'.html';
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

/* 4DK NEWSROOM 2.0 — NFL + NBA latest published coverage and permanent archive routes.
   One additive layer. Uses the site's existing editorial JSON; never replaces story content,
   changes game scores, moves the existing features, or invents fresh articles. */
;(() => {
  'use strict';
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(page!=='nfl.html'&&page!=='nba.html')return;
  const nfl=page==='nfl.html';
  const name=nfl?'NFL':'NBA';
  const archive=nfl?[
    ['Sunday Recaps','nfl-sunday-recaps.html'],
    ['Monday Recaps','nfl-monday-recaps.html'],
    ['Thursday Recaps','nfl-thursday-recaps.html'],
    ['2026 Season Archive','nfl-season-archive-2026.html'],
    ['MVP Watch','nfl-mvp-watch-week6-2026.html'],
    ['Rookie Watch','nfl-rookie-watch-week6-2026.html'],
    ['Power Rankings','nfl-power-rankings-week5-2026.html']
  ]:[
    ['NBA Nightcap','nba-nightcap.html'],
    ['Nightcap Archive','4dk-nightcap-explorer.html'],
    ['Rankings HQ','nba-rankings-hq.html'],
    ['Power Rankings','nba-power-rankings-2026-27.html'],
    ['Season Previews','nba-season-preview-2026-27.html'],
    ['Rookie Class','nba-rookie-class-2026.html'],
    ['2026–27 Opening Week','nba-opening-week-2026.html']
  ];
  const safeFile=/^[a-zA-Z0-9._-]+\.html$/;
  const safeImage=/^[a-zA-Z0-9._-]+\.(?:png|jpe?g|webp)$/i;
  const styleText=`
    #fourdk-newsroom-desk{--ndk-bg:#0d1012;--ndk-border:#36383b;--ndk-gold:#f0bf75;
      background:linear-gradient(135deg,#0a1014,#182025 65%,#101214);color:#faf8f3;
      padding:25px max(18px,calc((100% - 1240px)/2));border-top:4px solid #b5322e;
      border-bottom:2px solid #ad843e;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}
    #fourdk-newsroom-desk *,#fourdk-newsroom-desk *:before,#fourdk-newsroom-desk *:after{box-sizing:border-box}
    #fourdk-newsroom-desk .ndk-top{display:flex;justify-content:space-between;align-items:end;
      gap:16px;flex-wrap:wrap;margin-bottom:17px}
    #fourdk-newsroom-desk .ndk-overline{color:var(--ndk-gold);font-size:11px;font-weight:900;
      letter-spacing:.16em;display:block;margin-bottom:5px}
    #fourdk-newsroom-desk h2{font:bold clamp(29px,4.6vw,50px)/.98 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:.025em;margin:0;text-transform:uppercase;color:#fff}
    #fourdk-newsroom-desk .ndk-descriptor{font:13px/1.45 Arial,sans-serif;color:#bdc5c7;
      max-width:430px;margin:0}
    #fourdk-newsroom-desk .ndk-links{display:flex;gap:8px;overflow-x:auto;padding:1px 1px 13px;
      margin:0 0 12px;scrollbar-width:thin;scrollbar-color:#a68b62 #24282a}
    #fourdk-newsroom-desk .ndk-links a{flex-shrink:0;color:#f4ede3;border:1px solid #4e5252;
      background:#1a2326;padding:9px 12px;text-decoration:none;text-transform:uppercase;
      font:900 11px/1.3 Arial,sans-serif;letter-spacing:.025em;border-radius:3px}
    #fourdk-newsroom-desk a:focus-visible{outline:2px solid var(--ndk-gold);outline-offset:3px}
    #fourdk-newsroom-desk .ndk-links a:hover,#fourdk-newsroom-desk .ndk-card:hover{
      border-color:var(--ndk-gold);background:#223036}
    #fourdk-newsroom-desk .ndk-status{color:#b6c1c4;font-size:12px;margin:0 0 10px}
    #fourdk-newsroom-desk .ndk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    #fourdk-newsroom-desk .ndk-card{min-width:0;display:flex;flex-direction:column;
      background:#141b1e;border:1px solid var(--ndk-border);text-decoration:none;
      color:inherit;overflow:hidden;border-radius:4px}
    #fourdk-newsroom-desk .ndk-card img{display:block;width:100%;aspect-ratio:16/9;
      object-fit:cover;background:#222b31}
    #fourdk-newsroom-desk .ndk-card-copy{padding:15px;display:flex;flex:1;flex-direction:column;gap:9px}
    #fourdk-newsroom-desk .ndk-card small{font:800 10px/1.5 Arial,sans-serif;
      letter-spacing:.085em;color:var(--ndk-gold);text-transform:uppercase}
    #fourdk-newsroom-desk .ndk-card strong{font:900 clamp(17px,2vw,22px)/1.07 Arial,sans-serif;
      letter-spacing:-.02em;text-transform:uppercase}
    #fourdk-newsroom-desk .ndk-card p{font:13px/1.45 Arial,sans-serif;color:#cad0d0;
      margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
    #fourdk-newsroom-desk .ndk-card b{font:800 11px/1.4 Arial,sans-serif;
      color:var(--ndk-gold);margin-top:auto;padding-top:6px}
    @media(max-width:800px){#fourdk-newsroom-desk .ndk-grid{grid-template-columns:1fr}
      #fourdk-newsroom-desk .ndk-card{flex-direction:row;align-items:stretch}
      #fourdk-newsroom-desk .ndk-card img{width:35%;aspect-ratio:4/3;object-fit:cover}
      #fourdk-newsroom-desk .ndk-card-copy{padding:12px}}
    @media(max-width:430px){#fourdk-newsroom-desk{padding:20px 14px}
      #fourdk-newsroom-desk .ndk-card img{width:31%}
      #fourdk-newsroom-desk .ndk-card p{display:none}}
  `;
  function create(tag,cls,text){
    const el=document.createElement(tag);if(cls)el.className=cls;
    if(text!==undefined)el.textContent=String(text);return el;
  }
  function build(){
    if(document.getElementById('fourdk-newsroom-desk'))return;
    const main=document.querySelector('main');if(!main)return;
    const style=document.createElement('style');style.id='fourdk-newsroom-style';
    style.textContent=styleText;document.head.appendChild(style);
    const desk=create('section');desk.id='fourdk-newsroom-desk';
    desk.setAttribute('aria-label','Latest published '+name+' coverage and archives');
    const top=create('header','ndk-top');const heading=create('div');
    heading.append(create('span','ndk-overline','4 DA KULTURE • '+name+' NEWSROOM'));
    heading.append(create('h2',null,'THE '+name+' DESK.'));
    top.append(heading,create('p','ndk-descriptor',
      'Our latest published stories, rankings, and analysis. Every previous edition stays in the archive.'));
    const links=create('nav','ndk-links');links.setAttribute('aria-label',name+' newsroom archives');
    archive.forEach(([label,href])=>{const a=create('a',null,label+' ↗');a.href=href;links.appendChild(a)});
    const state=create('p','ndk-status','Loading the latest published '+name+' coverage…');
    const grid=create('div','ndk-grid');
    desk.append(top,links,state,grid);
    main.prepend(desk);
    fetch('4dk-frontdesk-current.json',{cache:'no-store'})
      .then(response=>{if(!response.ok)throw new Error('Newsroom feed unavailable');return response.json()})
      .then(feed=>{
        if(!Array.isArray(feed))throw new Error('Invalid newsroom feed');
        const records=feed.filter(x=>x&&x.category===name&&safeFile.test(x.href||'')&&
          /^\d{4}-\d{2}-\d{2}$/.test(x.date||'')&&typeof x.title==='string')
          .sort((a,b)=>b.date.localeCompare(a.date)||(b.priority||0)-(a.priority||0))
          .slice(0,3);
        if(!records.length){state.textContent='Browse the full '+name+' archive above.';return;}
        records.forEach(x=>{
          const a=create('a','ndk-card');a.href=x.href;
          if(safeImage.test(x.image||'')){
            const img=document.createElement('img');img.src=x.image;img.loading='lazy';
            img.alt=x.alt||x.title;a.appendChild(img);
          }
          const copy=create('div','ndk-card-copy');
          copy.append(create('small',null,x.label||x.date),create('strong',null,x.title));
          if(x.deck)copy.append(create('p',null,x.deck));
          copy.append(create('b',null,'READ THE COMPLETE STORY →'));
          a.appendChild(copy);grid.appendChild(a);
        });
        state.textContent='LATEST PUBLISHED STORIES • '+records[0].date+' • FROM THE 4DK EDITORIAL DESK';
      })
      .catch(()=>{state.textContent='Latest-story feed temporarily unavailable. Use the archive links above.'});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});
  else build();
})();
