(function(){
  const page=(location.pathname||'').toLowerCase();
  if(!page.includes('top-50-nba-players-2026-27')) return;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();

  function findPlayer(name){
    return qa('.rank-entry').find(card=>{
      const h=q('h2,h3',card);
      return h && txt(h).toLowerCase()===name.toLowerCase();
    });
  }

  function rankOf(card){
    const el=q('.entry-no',card);
    const n=Number(txt(el));
    return Number.isFinite(n)?n:null;
  }

  function setRank(card,n){
    if(!card) return;
    const el=q('.entry-no',card);
    if(el) el.textContent=String(n);
    card.id='rank-'+n;
  }

  function setMeta(card,label,value){
    if(!card) return;
    const labels=qa('small',card);
    const lab=labels.find(el=>txt(el).toLowerCase()===label.toLowerCase());
    if(!lab) return;
    const wrap=lab.closest('span') || lab.parentElement;
    const target=wrap?.querySelector('b,strong');
    if(target) target.textContent=value;
  }

  function makeOrUpdateDuren(){
    let duren=findPlayer('Jalen Duren');
    let randle=findPlayer('Julius Randle');
    if(!randle) return null;

    if(!duren){
      duren=randle.cloneNode(true);
      randle.parentNode.insertBefore(duren,randle);
    }

    setRank(duren,42);

    const heading=q('h2,h3',duren);
    if(heading) heading.textContent='Jalen Duren';

    setMeta(duren,'2026–27 TEAM','Detroit Pistons');
    setMeta(duren,'POSITION','C');

    const stats=q('.entry-stats strong',duren);
    if(stats) stats.textContent='19.5 PPG • 10.5 RPG • 65.0 FG% • ALL-STAR • ALL-NBA 3RD';

    const p=q('.entry-analysis p',duren);
    if(p) p.textContent='Duren enters the Top 50 after a breakout season that changed Detroit’s timeline. He averaged 19.5 points and 10.5 rebounds while shooting 65 percent from the field, made his first All-Star team and earned Third Team All-NBA as the Pistons won 60 games. The next step is proving the regular-season production holds up in the playoffs and that his defense can become consistently impactful enough for Detroit to trust him as a true long-term second pillar next to Cade Cunningham.';

    return duren;
  }

  function replaceBrandonWithJJJ(){
    const cards=qa('.cut-card');
    let jjjHM=cards.find(card=>/jaren jackson jr/i.test(txt(card)));
    const bi=cards.find(card=>/brandon ingram/i.test(txt(card)));

    if(bi){
      const h=q('h3,h2,strong',bi);
      if(h) h.textContent='Jaren Jackson Jr.';
      const p=q('p',bi);
      if(p) p.textContent='Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.';
      jjjHM=bi;
    }

    if(jjjHM){
      const p=q('p',jjjHM);
      if(p && !/rim protection/i.test(p.textContent)){
        p.textContent='Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.';
      }
    }
  }

  function enforceBottomOrder(){
    // JJJ is honorable mention now, not part of the main 50.
    const jjjMain=findPlayer('Jaren Jackson Jr.');
    if(jjjMain) jjjMain.remove();

    const duren=makeOrUpdateDuren();

    const desired=[
      ['Josh Giddey',50],
      ['Cooper Flagg',49],
      ['Kyrie Irving',48],
      ['Domantas Sabonis',47],
      ["De'Aaron Fox",46],
      ['Zion Williamson',45],
      ['Darius Garland',44],
      ['Julius Randle',43],
      ['Jalen Duren',42]
    ];

    desired.forEach(([name,rank])=>setRank(findPlayer(name),rank));

    // The page runs from #50 down to #1.
    // Put the entire 50→42 block immediately before #41 in the correct visual order.
    const rank41=qa('.rank-entry').find(card=>rankOf(card)===41);
    if(rank41 && rank41.parentNode){
      desired.forEach(([name])=>{
        const card=findPlayer(name);
        if(card) rank41.parentNode.insertBefore(card,rank41);
      });
    }

    replaceBrandonWithJJJ();

    console.log('4DK Top 50 order locked: 50 Giddey, 49 Flagg, 48 Kyrie, 47 Sabonis, 46 Fox, 45 Zion, 44 Garland, 43 Randle, 42 Duren, then 41.');
  }

  function run(){
    enforceBottomOrder();
    // A couple quick repair passes cover any late page enhancement scripts.
    setTimeout(enforceBottomOrder,250);
    setTimeout(enforceBottomOrder,900);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }
})();