/* 4 DA KULTURE • DAILY FRONT DESK CURRENT EDITION • LIVE NEWSROOM
   Presentation layer. Existing 4dk-frontdesk-feed.json, older stories,
   original page and rankings remain unchanged.
*/
(() => {
  'use strict';
  const page=location.pathname.split('/').pop().toLowerCase()||'index.html';
  if(page!=='index.html')return;
  const feedUrl='4dk-frontdesk-current.json';
  const allowedFile=/^[a-zA-Z0-9._-]+\.html$/;
  const allowedImage=/^[a-zA-Z0-9._-]+\.(?:jpe?g|png|webp)$/i;
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fmt=d=>new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).toUpperCase();
  const localParts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(v=>[v.type,v.value]));
  const todayPacific=[localParts.year,localParts.month,localParts.day].join('-');
  const dateOK=x=>/^\d{4}-\d{2}-\d{2}$/.test(x.date||'')&&x.date<=todayPacific;
  const existingIds=['dk-current-edition','dk-earlier-edition'];
  const trustedLinks=[
    ['INTERACTIVE WORLD','4dk-interactive.html'],
    ['WHO YOU GOT?','nba-rankings-hq.html?compare=1-2'],
    ['NFL COMMAND CENTER','4dk-nfl-command-center.html'],
    ['NIGHTCAP EXPLORER','4dk-nightcap-explorer.html'],
    ['ALBUM FILES','4dk-album-files-library.html'],
    ['KING FILES','4dk-king-files-timeline.html']
  ];
  function safeRecords(raw){return raw.filter(x=>x&&typeof x.title==='string'&&allowedFile.test(x.href||'')&&dateOK(x)).sort((a,b)=>b.date.localeCompare(a.date)||(b.priority||0)-(a.priority||0));}
  function renderNew(records){
    const desk=document.querySelector('#fourdk-daily-desk');
    if(!desk)return false;
    const mast=desk.querySelector('.dk-mast');
    if(!mast||!mast.parentNode)return false;
    const [nfl,nba,king]=[
      records.find(x=>x.category==='NFL'),
      records.find(x=>x.category==='NBA'&&/OPENING NIGHT PREVIEW/.test(x.label)),
      records.find(x=>/KING FILES/.test(x.label))
    ];
    const cards=[nfl,nba,king].filter(Boolean);
    if(cards.length!==3)return false;
    const existing=desk.querySelector('#dk-current-edition');
    if(!existing){
      const section=document.createElement('section');section.className='dk-current';section.id='dk-current-edition';section.setAttribute('aria-label','Latest published 4DK newsroom coverage');
      section.innerHTML=`
        <div class="dk-current-header"><div><span class="dk-current-kicker">CURRENT 4DK EDITION • ${fmt(records[0].date)}</span><h3>THE STORIES KEEP MOVING.</h3><p>Week 6 is final. The 49ers are 6–0. NBA opening night is next, and the King Files continue. Original reports, not fabricated results.</p></div><a class="dk-current-all" href="4dk-interactive.html">EXPLORE THE INTERACTIVE WORLD ↗</a></div>
        <div class="dk-current-grid">${cards.map(x=>`<a class="dk-current-card" href="${esc(x.href)}"><span class="dk-current-media">${allowedImage.test(x.image||'')?`<img loading="lazy" src="${esc(x.image)}" alt="${esc(x.alt||x.title)}">`:''}</span><span class="dk-current-copy"><small class="dk-current-category">${esc(x.label)}</small><strong class="dk-current-title">${esc(x.title)}</strong><p>${esc(x.deck)}</p><b class="dk-current-open">READ THE COMPLETE 4DK FEATURE →</b></span></a>`).join('')}</div>
        <nav class="dk-current-quick" aria-label="Explore 4DK interactive tools"><span>GO DEEPER</span>${trustedLinks.map(([label,href])=>`<a href="${href}">${label} ↗</a>`).join('')}</nav>`;
      // Preserve the October 19 editorial edition, but keep it collapsed in archives.
      const archive=document.createElement('details');
      archive.id='dk-oct19-edition-archive';
      archive.className='dk-edition-archive';
      archive.innerHTML='<summary style="cursor:pointer;padding:16px 18px;background:#201b19;color:#edba77;font:800 13px Arial,sans-serif;letter-spacing:.08em;border:1px solid #6c5640">FROM THE ARCHIVES · OCTOBER 19 EDITION ▾</summary>';
      archive.appendChild(section);
      mast.insertAdjacentElement('afterend',archive);
    }
    // Keep the October 15 editorial cards and their original links, but collapse them.
    const old=desk.querySelector('.dk-columns');
    if(old && !desk.querySelector('#dk-oct15-edition-archive')){
      const earlier=document.createElement('details');
      earlier.id='dk-oct15-edition-archive';
      earlier.className='dk-edition-archive';
      const summary=document.createElement('summary');
      summary.textContent='FROM THE ARCHIVES · OCTOBER 15 EDITION ▾';
      summary.style.cssText='cursor:pointer;padding:16px 18px;background:#201b19;color:#edba77;font:800 13px Arial,sans-serif;letter-spacing:.08em;border:1px solid #6c5640';
      earlier.appendChild(summary);
      old.parentNode.insertBefore(earlier,old);
      earlier.appendChild(old);
      const oldLabel=desk.querySelector('#dk-earlier-edition');
      if(oldLabel)oldLabel.remove();
    }
    const date=desk.querySelector('.dk-date');
    if(date){const latest=records[0].date;const display=`LATEST CURATED EDITION: ${fmt(latest)} • ORIGINAL 4DK COVERAGE`;if(date.textContent!==display)date.textContent=display;}
    return true;
  }
  async function start(){
    let records=[];
    try{const response=await fetch(feedUrl,{cache:'no-store'});if(!response.ok)throw new Error('feed');const raw=await response.json();if(!Array.isArray(raw))throw new Error('invalid feed');records=safeRecords(raw);}catch(e){console.warn('4DK homepage current edition unavailable; original stories remain untouched.',e);return;}
    if(!records.length)return;
    let updating=false;
    function refresh(){if(updating)return;updating=true;try{renderNew(records);}finally{updating=false;}}
    refresh();
    const observer=new MutationObserver(()=>{if(!document.getElementById('dk-current-edition')||document.querySelector('#fourdk-daily-desk .dk-date')?.textContent?.includes('OCT 15'))refresh();});
    observer.observe(document.body,{childList:true,subtree:true,characterData:false});
    // Existing front desk may hydrate after this script starts.
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});
    window.addEventListener('load',refresh,{once:true});
  }
  start();
})();
