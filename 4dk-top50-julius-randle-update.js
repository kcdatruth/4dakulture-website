(function(){
  const page=(location.pathname||'').toLowerCase();
  if(!page.includes('top-50-nba-players-2026-27')) return;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clean=s=>(s||'').replace(/\s+/g,' ').trim();

  function findPlayer(name){
    return qa('.rank-entry').find(card=>{
      const h=q('h2,h3',card);
      return h && clean(h.textContent).toLowerCase()===name.toLowerCase();
    }) || null;
  }

  function setRank(card,n){
    if(!card) return;
    const no=q('.entry-no',card);
    if(no) no.textContent=String(n);
    card.id='rank-'+n;
  }

  function fixLocalOrder(){
    const randle=findPlayer('Julius Randle');
    const duren=findPlayer('Jalen Duren');
    const avdija=findPlayer('Deni Avdija');

    if(!randle || !duren || !avdija) return;

    setRank(randle,43);
    setRank(duren,42);
    setRank(avdija,41);

    const parent=duren.parentNode;
    if(!parent || randle.parentNode!==parent || avdija.parentNode!==parent) return;

    // Absolute local order:
    // 43 Randle
    // 42 Duren
    // 41 Avdija
    parent.insertBefore(randle,duren);
    parent.insertBefore(avdija,duren.nextSibling);

    document.documentElement.dataset.top50Order='43-42-41';
  }

  function start(){
    fixLocalOrder();

    // Run after every other page script has had a chance to touch the list.
    [100,300,700,1200,2000,3500,5500,8000,12000].forEach(ms=>setTimeout(fixLocalOrder,ms));

    let t=0;
    const obs=new MutationObserver(()=>{
      clearTimeout(t);
      t=setTimeout(fixLocalOrder,50);
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  } else {
    start();
  }
})();