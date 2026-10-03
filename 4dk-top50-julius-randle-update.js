(function(){
  const page=(location.pathname||'').toLowerCase();
  if(!page.includes('top-50-nba-players-2026-27')) return;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clean=s=>(s||'').replace(/\s+/g,' ').trim();
  const nameOf=card=>clean(q('h2,h3',card)?.textContent);
  const rankOf=card=>Number(clean(q('.entry-no',card)?.textContent));

  const desired=[
    ['Josh Giddey',50],
    ['Cooper Flagg',49],
    ['Kyrie Irving',48],
    ['Domantas Sabonis',47],
    ["De'Aaron Fox",46],
    ['Zion Williamson',45],
    ['Darius Garland',44],
    ['Julius Randle',43],
    ['Jalen Duren',42],
    ['Deni Avdija',41]
  ];

  let repairing=false;
  let timer=0;

  function findPlayer(name){
    return qa('.rank-entry').find(card=>nameOf(card).toLowerCase()===name.toLowerCase()) || null;
  }

  function setRank(card,n){
    if(!card) return;
    const no=q('.entry-no',card);
    if(no) no.textContent=String(n);
    card.id='rank-'+n;
  }

  function setMeta(card,label,value){
    const labels=qa('small',card);
    const lab=labels.find(el=>clean(el.textContent).toLowerCase()===label.toLowerCase());
    if(!lab) return;
    const wrap=lab.closest('span') || lab.parentElement;
    const target=wrap?.querySelector('b,strong');
    if(target) target.textContent=value;
  }

  function ensureDuren(){
    let duren=findPlayer('Jalen Duren');
    const randle=findPlayer('Julius Randle');
    if(!randle) return null;

    if(!duren){
      duren=randle.cloneNode(true);
      randle.parentNode.insertBefore(duren,randle);
    }

    const h=q('h2,h3',duren);
    if(h) h.textContent='Jalen Duren';
    setRank(duren,42);
    setMeta(duren,'2026–27 TEAM','Detroit Pistons');
    setMeta(duren,'POSITION','C');

    const stats=q('.entry-stats strong',duren);
    if(stats) stats.textContent='19.5 PPG • 10.5 RPG • 65.0 FG% • ALL-STAR • ALL-NBA 3RD';

    const p=q('.entry-analysis p',duren);
    if(p) p.textContent='Duren enters the Top 50 after a breakout season that changed Detroit’s timeline. He averaged 19.5 points and 10.5 rebounds while shooting 65 percent from the field, made his first All-Star team and earned Third Team All-NBA as the Pistons won 60 games. The next step is proving the regular-season production holds up in the playoffs and that his defense can become consistently impactful enough for Detroit to trust him as a true long-term second pillar next to Cade Cunningham.';

    return duren;
  }

  function moveJJJToHM(){
    const main=findPlayer('Jaren Jackson Jr.');
    if(main) main.remove();

    const cuts=qa('.cut-card');
    const brandon=cuts.find(card=>/brandon ingram/i.test(clean(card.textContent)));
    let jjj=cuts.find(card=>/jaren jackson jr/i.test(clean(card.textContent)));

    if(brandon){
      const h=q('h3,h2,strong',brandon);
      if(h) h.textContent='Jaren Jackson Jr.';
      const p=q('p',brandon);
      if(p) p.textContent='Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.';
      jjj=brandon;
    }
  }

  function findTierBreak(){
    return qa('.tier-break').find(el=>/#40\s*→\s*#31|#40\s*-\s*#31|THE NEXT TIER/i.test(clean(el.textContent))) || null;
  }

  function orderIsCorrect(){
    const cards=qa('.rank-entry');
    const names=cards.map(nameOf);
    const seq=desired.map(x=>x[0]);
    const idx=seq.map(n=>names.indexOf(n));
    if(idx.some(i=>i<0)) return false;
    for(let i=1;i<idx.length;i++){
      if(idx[i]!==idx[i-1]+1) return false;
    }
    for(const [name,rank] of desired){
      const card=findPlayer(name);
      if(!card || rankOf(card)!==rank) return false;
    }
    return true;
  }

  function repair(){
    if(repairing) return;
    repairing=true;
    try{
      ensureDuren();
      moveJJJToHM();

      // Lock the rank numbers first.
      desired.forEach(([name,rank])=>setRank(findPlayer(name),rank));

      // HARD ORDER FIX:
      // Rebuild the entire #50→#41 block as one document fragment and
      // place it immediately before the #40→#31 tier break.
      const tier=findTierBreak();
      if(tier && tier.parentNode){
        const frag=document.createDocumentFragment();
        desired.forEach(([name])=>{
          const card=findPlayer(name);
          if(card) frag.appendChild(card);
        });
        tier.parentNode.insertBefore(frag,tier);
      }

      document.documentElement.dataset.top50Order='50-49-48-47-46-45-44-43-42-41';
    } finally {
      repairing=false;
    }
  }

  function check(){
    if(!orderIsCorrect()) repair();
  }

  function start(){
    repair();
    [100,300,700,1200,2200,4000,7000].forEach(ms=>setTimeout(check,ms));

    const obs=new MutationObserver(()=>{
      clearTimeout(timer);
      timer=setTimeout(check,80);
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();