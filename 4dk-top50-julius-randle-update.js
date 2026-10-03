(function(){
  const page=(location.pathname||'').toLowerCase();
  if(!page.includes('top-50-nba-players-2026-27')) return;

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();

  function rankOf(card){
    const el=q('.entry-no',card);
    const n=Number(txt(el));
    return Number.isFinite(n)?n:null;
  }

  function setRank(card,n){
    const el=q('.entry-no',card);
    if(el) el.textContent=String(n);
    card.id='rank-'+n;
  }

  function findPlayer(name){
    return qa('.rank-entry').find(card=>{
      const h=q('h2,h3',card);
      return h && txt(h).toLowerCase()===name.toLowerCase();
    });
  }

  function setLeafAfterLabel(card,label,value){
    const labels=qa('small',card);
    const lab=labels.find(el=>txt(el).toLowerCase()===label.toLowerCase());
    if(!lab) return;
    const wrap=lab.closest('span') || lab.parentElement;
    const b=wrap?.querySelector('b,strong');
    if(b) b.textContent=value;
  }

  function buildDuren(template){
    const card=template.cloneNode(true);
    setRank(card,42);

    const heading=q('h2,h3',card);
    if(heading) heading.textContent='Jalen Duren';

    setLeafAfterLabel(card,'2026–27 TEAM','Detroit Pistons');
    setLeafAfterLabel(card,'POSITION','C');

    const stats=q('.entry-stats strong',card);
    if(stats) stats.textContent='19.5 PPG • 10.5 RPG • 65.0 FG% • ALL-STAR • ALL-NBA 3RD';

    const p=q('.entry-analysis p',card);
    if(p) p.textContent='Duren enters the Top 50 after a breakout season that changed Detroit’s timeline. He averaged 19.5 points and 10.5 rebounds while shooting 65 percent from the field, made his first All-Star team and earned Third Team All-NBA as the Pistons won 60 games. The next step is proving the regular-season production holds up in the playoffs and that his defense can become consistently impactful enough for Detroit to trust him as a true long-term second pillar next to Cade Cunningham.';

    return card;
  }

  function replaceBrandonWithJJJ(){
    const cards=qa('.cut-card');
    const bi=cards.find(card=>/brandon ingram/i.test(txt(card)));
    if(!bi) return;

    const h=q('h3,h2,strong',bi);
    if(h) h.textContent='Jaren Jackson Jr.';

    const p=q('p',bi);
    if(p) p.textContent='Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the best defensive bigs in the league when right.';
  }

  function run(){
    // If this exact correction already ran, only make sure the honorable mention is right.
    const existingDuren=findPlayer('Jalen Duren');
    const giddey=findPlayer('Josh Giddey');
    if(existingDuren && rankOf(existingDuren)===42 && giddey && rankOf(giddey)===50){
      replaceBrandonWithJJJ();
      return;
    }

    // Start from the page's original lower tier.
    const randle=findPlayer('Julius Randle');
    if(!randle) return;

    // Remove Jaren Jackson Jr. from the main Top 50.
    const jjj=findPlayer('Jaren Jackson Jr.');
    if(jjj) jjj.remove();

    // Shift ONLY #42 through #48 down one.
    // This keeps Josh Giddey locked at #50.
    const lower=qa('.rank-entry')
      .map(card=>({card,rank:rankOf(card)}))
      .filter(x=>x.rank!==null && x.rank>=42 && x.rank<=48)
      .sort((a,b)=>b.rank-a.rank);

    lower.forEach(({card,rank})=>setRank(card,rank+1));

    // Insert Duren at #42 immediately before the shifted Randle card (#43).
    const duren=buildDuren(randle);
    randle.parentNode.insertBefore(duren,randle);

    // Explicitly protect Giddey's spot.
    const g=findPlayer('Josh Giddey');
    if(g) setRank(g,50);

    // JJJ replaces Brandon Ingram in Honorable Mentions.
    replaceBrandonWithJJJ();

    console.log('4DK Top 50 corrected: Duren #42, Randle #43, Garland #44, Zion #45, Fox #46, Sabonis #47, Kyrie #48, Flagg #49, Giddey stays #50; JJJ to HM, Brandon Ingram removed.');
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }
})();