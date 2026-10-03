(function(){
  const path=(location.pathname||'').toLowerCase();
  if(!path.includes('top-50-nba-players-2026-27')) return;

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const clean=s=>(s||'').replace(/\s+/g,' ').trim();

  function findPlayer(name){
    return $$('.rank-entry').find(card=>{
      const h=$('h2,h3',card);
      return h && clean(h.textContent).toLowerCase()===name.toLowerCase();
    }) || null;
  }

  function setRank(card,n){
    if(!card) return;
    const no=$('.entry-no',card);
    if(no) no.textContent=String(n);
    card.id='rank-'+n;
  }

  function setMeta(card,label,value){
    if(!card) return;
    const lab=$$('small',card).find(x=>clean(x.textContent).toLowerCase()===label.toLowerCase());
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

    const h=$('h2,h3',duren);
    if(h) h.textContent='Jalen Duren';

    setRank(duren,42);
    setMeta(duren,'2026–27 TEAM','Detroit Pistons');
    setMeta(duren,'POSITION','C');

    const stats=$('.entry-stats strong',duren);
    if(stats) stats.textContent='19.5 PPG • 10.5 RPG • 65.0 FG% • ALL-STAR • ALL-NBA 3RD';

    const p=$('.entry-analysis p',duren);
    if(p) p.textContent='Duren enters the Top 50 after a breakout season that changed Detroit’s timeline. He averaged 19.5 points and 10.5 rebounds while shooting 65 percent from the field, made his first All-Star team and earned Third Team All-NBA as the Pistons won 60 games. The next step is proving the regular-season production holds up in the playoffs and that his defense can become consistently impactful enough for Detroit to trust him as a true long-term second pillar next to Cade Cunningham.';

    return duren;
  }

  function fixHonorableMentions(){
    // Remove JJJ from the main Top 50.
    const jjjMain=findPlayer('Jaren Jackson Jr.');
    if(jjjMain) jjjMain.remove();

    // Replace Brandon Ingram in Honorable Mentions.
    const cuts=$$('.cut-card');
    const brandon=cuts.find(card=>/brandon ingram/i.test(clean(card.textContent)));
    if(brandon){
      const h=$('h3,h2,strong',brandon);
      if(h) h.textContent='Jaren Jackson Jr.';
      const p=$('p',brandon);
      if(p) p.textContent='Elite rim protection, switchability and floor spacing still give JJJ major two-way value. Health, rebounding and offensive consistency keep him just outside the main 50, but he remains one of the league’s most impactful defensive bigs when right.';
    }
  }

  function find40Tier(){
    return $$('.tier-break').find(el=>/#40\s*→\s*#31|THE NEXT TIER/i.test(clean(el.textContent))) || null;
  }

  function apply(){
    ensureDuren();
    fixHonorableMentions();

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

    // Lock all numbers.
    desired.forEach(([name,rank])=>setRank(findPlayer(name),rank));

    // Hard rebuild the visual 50→41 block in the exact order.
    const tier40=find40Tier();
    if(!tier40 || !tier40.parentNode) return;

    const frag=document.createDocumentFragment();
    desired.forEach(([name])=>{
      const card=findPlayer(name);
      if(card) frag.appendChild(card);
    });
    tier40.parentNode.insertBefore(frag,tier40);

    document.documentElement.dataset.fourdkTop50Final='v32';
  }

  function verify(){
    const expected=['Josh Giddey','Cooper Flagg','Kyrie Irving','Domantas Sabonis',"De'Aaron Fox",'Zion Williamson','Darius Garland','Julius Randle','Jalen Duren','Deni Avdija'];
    const cards=$$('.rank-entry');
    const names=cards.map(c=>clean($('h2,h3',c)?.textContent));
    const indexes=expected.map(n=>names.indexOf(n));
    const consecutive=indexes.every((x,i)=>i===0 || x===indexes[i-1]+1);
    if(indexes.some(x=>x<0) || !consecutive) apply();
  }

  function start(){
    apply();
    [150,500,1200,2500,5000].forEach(ms=>setTimeout(verify,ms));
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();