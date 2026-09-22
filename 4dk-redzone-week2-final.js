(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkRedZoneWeek2Final) return;
  window.__fourdkRedZoneWeek2Final=true;

  const GROUPS = {
    'GAME DAY': {
      status:'WEEK 2 • FINAL',
      items:[
        ['Rams 28, Giants 6 — Stafford throws 4 TD, Davante Adams goes for 195 and Aaron Donald completes his comeback.','nfl-mnf-recap-week2-rams-giants.html','MNF'],
        ['Chiefs 33, Colts 30 OT — Mahomes throws for 382, Kelce tops 100 and Kenneth Walker changes the game.','nfl-sunday-recap-week2.html','SNF'],
        ['Bills 41, Lions 31 — Josh Allen accounts for five touchdowns as Buffalo moves to 2–0.','nfl-thursday-recap-week2-bills-lions.html','TNF']
      ]
    },
    'INJURY REPORT': {
      status:'POST-WEEK 2 • WATCH',
      items:[
        ['Jaxson Dart exits with a left-knee injury. Early concern is a possible MCL sprain; X-rays were negative and MRI confirmation is pending.','nfl-mnf-recap-week2-rams-giants.html','MRI'],
        ['Puka Nacua missed Monday night with the hip/groin issue. His next chance to return comes in Week 3 at Denver.','nfl-mnf-recap-week2-rams-giants.html','RAMS'],
        ['Myles Garrett remains on IR after knee surgery and must miss at least four games before a possible return.','rams-week1-loss-garrett-injury-giants-mnf-2026.html','IR']
      ]
    },
    'ROSTER MOVES': {
      status:'AFTER WEEK 2 • DEPTH CHART',
      items:[
        ['Aaron Donald is officially back on the field after 32 months away, giving the Rams front a new centerpiece while Garrett heals.','nfl-mnf-recap-week2-rams-giants.html','RAMS'],
        ['Las Vegas is 2–0 in the Kirk Cousins era after a three-touchdown road win over the Chargers.','nfl.html#mvp-watch','RAIDERS'],
        ['The Giants now prepare for a short week with Jameis Winston next up if Dart cannot go.','nfl-mnf-recap-week2-rams-giants.html','GIANTS']
      ]
    },
    'AROUND THE LEAGUE': {
      status:'WEEK 2 • QUICK HITS',
      items:[
        ['Raiders 26, Chargers 14 — Cousins throws three touchdowns and Vegas opens 2–0.','nfl.html#power-rankings','AFC'],
        ['Eagles 24, Titans 20 — Philadelphia survives late and joins the 2–0 group.','nfl-sunday-recap-week2.html','NFC'],
        ['Seahawks 31, Cardinals 7 — Seattle answers Week 1 with one of Sunday’s most complete wins.','nfl-sunday-recap-week2.html','NFC']
      ]
    }
  };

  function install(){
    const redzone=document.querySelector('#redzone, .nfl-redzone');
    if(!redzone) return false;

    const now=redzone.querySelector('.fourdk-rz-now');
    if(now){
      now.innerHTML='<strong><i></i> RED ZONE NOW</strong><span>WEEK 2 • COMPLETE • WEEK 3 LOADING</span>';
    }

    const feature=redzone.querySelector('.fourdk-rz-feature');
    if(feature){
      feature.href='nfl-mnf-recap-week2-rams-giants.html';
      feature.setAttribute('aria-label','Read the Week 2 Monday Night Football recap');
      feature.innerHTML=`
        <div class="fourdk-rz-feature-mark"><div><small>FINAL</small><strong>28–6</strong></div></div>
        <div class="fourdk-rz-feature-copy">
          <small>FEATURED NOW • MONDAY NIGHT FINAL</small>
          <h3>THE RAMS ANSWERED.</h3>
          <p>Stafford throws four touchdowns, Davante Adams takes over without Puka, Aaron Donald returns after 32 months and Jaxson Dart leaves with a knee injury.</p>
        </div>
        <span class="fourdk-rz-feature-read">READ MNF →</span>`;
    }

    const grid=redzone.querySelector('.redzone-grid');
    if(grid){
      [...grid.children].forEach(card=>{
        const heading=card.querySelector('b, strong');
        if(!heading) return;
        const key=heading.textContent.trim().toUpperCase();
        const data=GROUPS[key];
        if(!data) return;

        let status=card.querySelector('.fourdk-rz-status');
        if(!status){
          status=document.createElement('span');
          status.className='fourdk-rz-status';
          card.appendChild(status);
        }
        status.textContent=data.status;

        let links=card.querySelector('.fourdk-rz-links');
        if(!links){
          links=document.createElement('div');
          links.className='fourdk-rz-links';
          card.appendChild(links);
        }
        links.innerHTML=data.items.map(([text,href,tag]) =>
          `<a href="${href}"><i aria-hidden="true"></i><span>${text}</span><b>${tag} →</b></a>`
        ).join('');
      });

      let source=redzone.querySelector('.fourdk-rz-source-note');
      if(!source){
        source=document.createElement('div');
        source.className='fourdk-rz-source-note';
        grid.insertAdjacentElement('afterend',source);
      }
      source.textContent='4DK RED ZONE • WEEK 2 COMPLETE • UPDATED AFTER MONDAY NIGHT FOOTBALL';
    }

    redzone.dataset.week2Final='true';
    return true;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }

  // nfl-scoreboard.js builds Red Zone dynamically, so repeat safely after its install passes.
  [250,600,1100,1800,2800,4200,6000].forEach(ms=>setTimeout(install,ms));
})();