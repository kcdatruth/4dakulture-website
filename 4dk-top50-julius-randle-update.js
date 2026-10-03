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

  function fix(){
    const randle=findPlayer('Julius Randle');
    const duren=findPlayer('Jalen Duren');
    const avdija=findPlayer('Deni Avdija');

    if(!randle || !duren || !avdija || !avdija.parentNode) return;

    setRank(randle,43);
    setRank(duren,42);
    setRank(avdija,41);

    // Targeted visual-order fix:
    // put 43 and 42 directly before 41, every time.
    avdija.parentNode.insertBefore(randle,avdija);
    avdija.parentNode.insertBefore(duren,avdija);

    document.documentElement.dataset.top50LocalOrder='43-42-41';
  }

  function start(){
    fix();

    // Re-apply after every other site script has had time to run.
    [50,150,350,700,1200,2000,3500,6000,9000].forEach(ms=>setTimeout(fix,ms));

    // If another script moves the cards later, put them right back.
    let timer=0;
    const obs=new MutationObserver(()=>{
      clearTimeout(timer);
      timer=setTimeout(fix,40);
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();