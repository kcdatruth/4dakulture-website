/* 4DK Nightcap: both homepages read one latest edition record. */ 
(async function(){
  const root=document.querySelector('[data-4dk-nightcap-feature]');
  if(!root)return;
  try {
    const response=await fetch('nightcap-latest.json',{cache:'no-store'});
    if(!response.ok) return;
    const d=await response.json();
    const localLink=(v)=>typeof v==='string' && /^nba-nightcap-(?:20\\d{2}-\\d{2}-\\d{2})\\.html$/.test(v);
    if(!localLink(d.url)||!localLink(d.previousUrl))return;
    const setText=(sel,val)=>{const el=root.querySelector(sel);if(el&&typeof val==='string')el.textContent=val};
    const setHref=(sel,val)=>{const el=root.querySelector(sel);if(el)el.href=val};
    const date=root.querySelector('[data-nightcap-date]');
    if(date)date.textContent='LATEST • '+d.date;
    setText('[data-nightcap-headline]',d.headline);
    setText('[data-nightcap-summary]',d.summary);
    setHref('[data-nightcap-link]',d.url);
    const previous=root.querySelector('[data-nightcap-previous]');
    if(previous){previous.href=d.previousUrl;previous.textContent='PREVIOUS NIGHTCAP • '+d.previousDate+' →'}
    // Homepage's original card has no child data attributes, so update its known elements.
    if(root.id==='dk-latest-nightcap'){
      const card=root.querySelector('a[href^="nba-nightcap-"]');
      if(card){
        card.href=d.url;
        const span=card.querySelector('span');if(span)span.textContent='LATEST • '+d.date;
        const h=card.querySelector('h2');if(h)h.textContent=d.headline;
        const p=card.querySelector('p');if(p)p.textContent=d.summary;
      }
      const prev=root.querySelector('p a[href^="nba-nightcap-"]');
      if(prev){prev.href=d.previousUrl;prev.textContent='Previous Nightcap: '+d.previousDate+' →'}
    }
  }catch(e){/* preserve static fallback */ }
})();