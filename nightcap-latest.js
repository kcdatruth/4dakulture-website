/* 4DK Nightcap — one authoritative latest record for both homepages.
   Static HTML remains a fallback when JavaScript or the feed is unavailable. */
(async function(){
  const root=document.querySelector('[data-4dk-nightcap-feature]');
  if(!root)return;
  try {
    const response=await fetch('nightcap-latest.json',{cache:'no-store'});
    if(!response.ok)return;
    const d=await response.json();
    const validLink=v=>typeof v==='string' && /^nba-nightcap-20\d{2}-\d{2}-\d{2}\.html$/.test(v);
    if(!validLink(d.url)||!validLink(d.previousUrl))return;
    const setText=(selector,value)=>{
      const el=root.querySelector(selector);
      if(el&&typeof value==='string')el.textContent=value;
    };
    const setHref=(selector,value)=>{
      const el=root.querySelector(selector);
      if(el)el.setAttribute('href',value);
    };
    setText('[data-nightcap-date]','LATEST • '+d.date);
    setText('[data-nightcap-headline]',d.headline);
    setText('[data-nightcap-summary]',d.summary);
    setHref('[data-nightcap-link]',d.url);
    const previous=root.querySelector('[data-nightcap-previous]');
    if(previous){
      previous.href=d.previousUrl;
      previous.textContent='PREVIOUS NIGHTCAP • '+d.previousDate+' →';
    }
    // The main homepage has a single linked editorial feature card.
    if(root.id==='dk-latest-nightcap'){
      const card=root.querySelector('a[href^="nba-nightcap-"]');
      if(card){
        card.href=d.url;
        const date=card.querySelector('span');if(date)date.textContent='LATEST • '+d.date;
        const headline=card.querySelector('h2');if(headline)headline.textContent=d.headline;
        const summary=card.querySelector('p');if(summary)summary.textContent=d.summary;
      }
      const prev=root.querySelector('p a[href^="nba-nightcap-"]');
      if(prev){prev.href=d.previousUrl;prev.textContent='Previous Nightcap: '+d.previousDate+' →';}
    }
  }catch(error){/* Keep the last published static fallback; never fabricate data. */}
})();
