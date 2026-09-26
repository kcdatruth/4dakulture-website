(() => {
  const p=(location.pathname||'/').toLowerCase();
  if(!(p.endsWith('/nfl.html')||p.endsWith('/nfl'))||window.__fourdkW3Refresh) return;
  window.__fourdkW3Refresh=true;

  function addStyles(){
    if(document.getElementById('fourdk-w3-refresh-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-w3-refresh-css';
    s.textContent=`
      .fourdk-w3{
        padding:30px 0;background:#090c0a;color:#f5f2eb;
        border-top:1px solid #29302a;border-bottom:1px solid #29302a;
        position:relative;overflow:hidden
      }
      .fourdk-w3:after{
        content:'W3';position:absolute;right:-8px;bottom:-40px;
        font:1000 140px/.8 Arial Black,Impact,sans-serif;color:#fff;opacity:.025
      }
      .fourdk-w3 .shell{position:relative;z-index:2}
      .w3h{display:flex;justify-content:space-between;gap:18px;align-items:end;margin-bottom:14px}
      .w3h small{color:#ef503a;font-size:8px;font-weight:1000;letter-spacing:.13em}
      .w3h h2{margin:5px 0 0;font:1000 clamp(30px,5vw,52px)/.9 Arial Black,Impact,sans-serif;text-transform:uppercase;letter-spacing:-.04em}
      .w3h a{color:#e1b85c!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}

      .w3lead{
        display:grid;grid-template-columns:minmax(0,1.35fr) minmax(260px,.65fr);
        border:1px solid #343a34;background:#111512;margin-bottom:9px;overflow:hidden
      }
      .w3lead-copy{padding:22px}
      .w3lead-copy small{display:block;color:#ef503a;font-size:8px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase}
      .w3lead-copy h3{margin:7px 0 9px;font:1000 clamp(30px,5vw,54px)/.88 Arial Black,Impact,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .w3lead-copy h3 em{font-style:normal;color:#efb24b}
      .w3lead-copy p{margin:0;color:#a9b0aa;font:13px/1.55 Georgia,serif;max-width:720px}
      .w3lead-stats{display:flex;gap:7px;flex-wrap:wrap;margin:16px 0 17px}
      .w3lead-stats span{padding:7px 8px;border:1px solid #353d36;background:#0b0f0c;color:#d2d6d2;font-size:7px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .w3lead-copy a{display:inline-flex;align-items:center;min-height:39px;padding:0 12px;background:#c92d38;color:#fff!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .w3lead-art{min-height:260px;background:
        linear-gradient(90deg,rgba(10,12,10,.28),rgba(10,12,10,.02)),
        url('/falcons-storm-lambeau-35-14.png') center/cover no-repeat}

      .w3g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .w3c{display:flex;flex-direction:column;min-height:130px;padding:14px;border:1px solid #303731;background:#111512;color:#fff!important;text-decoration:none!important}
      .w3c small{color:#ef503a;font-size:7px;font-weight:1000;letter-spacing:.1em}
      .w3c b{display:block;margin:8px 0;font:1000 20px/.98 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .w3c span{margin-top:auto;color:#909990;font-size:8px}
      .w3c.final{border-top:3px solid #c92d38}
      .w3c.live{border-top:3px solid #e1b85c}

      .w3flow{display:grid;grid-template-columns:repeat(5,1fr);margin-top:9px;border:1px solid #2f362f}
      .w3flow div{padding:11px;border-right:1px solid #2f362f}
      .w3flow div:last-child{border-right:0}
      .w3flow small{display:block;color:#6f786f;font-size:7px;font-weight:1000}
      .w3flow b{display:block;margin-top:4px;font-size:9px}

      body.nfl-page .nfl-v2-hero{
        background:
          radial-gradient(circle at 82% 18%,rgba(177,31,44,.14),transparent 23rem),
          linear-gradient(145deg,#090c0a,#050706 72%)
      }
      body.nfl-page .nfl-v2-hero .nfl-v2-kicker span{color:#ef503a}
      body.nfl-page .nfl-v2-hero h1 em{color:#efb24b}
      body.nfl-page .nfl-v2-board{border-color:#4b302e}
      body.nfl-page .nfl-v2-board-top strong{color:#efb24b}


      .w3standings{
        padding:34px 0 38px;background:#ece8df;color:#171717;
        border-bottom:1px solid #cfc8bb
      }
      .w3standings-head{
        display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:18px
      }
      .w3standings-head small{
        display:block;color:#b82e38;font-size:8px;font-weight:1000;
        letter-spacing:.13em;text-transform:uppercase
      }
      .w3standings-head h2{
        margin:5px 0 0;font:1000 clamp(30px,5vw,50px)/.9 Arial Black,Impact,sans-serif;
        letter-spacing:-.04em;text-transform:uppercase
      }
      .w3standings-head p{
        margin:0;max-width:560px;color:#666158;font:12px/1.5 Georgia,serif
      }
      .w3standings-confs{
        display:grid;grid-template-columns:1fr 1fr;gap:14px
      }
      .w3conf{
        border:1px solid #c9c1b5;background:#f8f5ee
      }
      .w3conf-title{
        display:flex;justify-content:space-between;align-items:center;
        padding:12px 14px;background:#111512;color:#fff
      }
      .w3conf-title b{
        font:1000 20px/.9 Arial Black,Impact,sans-serif;letter-spacing:-.03em
      }
      .w3conf-title span{
        color:#efb24b;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase
      }
      .w3div{
        padding:13px 14px;border-top:1px solid #d8d1c6
      }
      .w3div:first-of-type{border-top:0}
      .w3div h3{
        margin:0 0 7px;color:#7b756c;font-size:8px;font-weight:1000;
        letter-spacing:.12em;text-transform:uppercase
      }
      .w3team{
        display:grid;grid-template-columns:minmax(0,1fr) auto;
        gap:10px;align-items:center;padding:7px 0;border-top:1px solid #e4ded4
      }
      .w3team:first-of-type{border-top:0}
      .w3team strong{
        min-width:0;font-size:11px;line-height:1.1
      }
      .w3team b{
        font:1000 13px/1 Arial Black,Impact,sans-serif;white-space:nowrap
      }
      .w3team.leader strong:before{
        content:'◆';margin-right:6px;color:#b82e38;font-size:7px;vertical-align:1px
      }
      .w3standings-note{
        margin-top:12px;color:#777168;font-size:9px;line-height:1.45
      }

      @media(max-width:850px){
        .w3lead{grid-template-columns:1fr}
        .w3lead-art{min-height:230px;order:-1}
        .w3g{grid-template-columns:1fr 1fr}
        .w3standings-confs{grid-template-columns:1fr}
        .w3standings-head{align-items:flex-start;flex-direction:column}
        .w3flow{display:flex;overflow-x:auto}
        .w3flow div{flex:0 0 165px}
      }
      @media(max-width:520px){
        .w3h{align-items:flex-start;flex-direction:column}
        .w3g{grid-template-columns:1fr}
        .w3c{min-height:105px}
        .w3lead-art{min-height:210px}
      }
    `;
    document.head.appendChild(s);
  }

  function currentStage(){
    const d=new Date(), k=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate(), h=d.getHours();
    if(k<=20260926) return 'sunday-build';
    if(k===20260927 && h<13) return 'pregame';
    if(k===20260927 && h<16) return 'early';
    if(k===20260927 && h<20) return 'late';
    if(k===20260927) return 'snf';
    if(k===20260928) return 'mnf';
    return 'final';
  }

  function updateTicker(){
    const t=document.querySelector('.nfl-ticker-track');
    if(!t) return false;
    const items=[
      'WEEK 3: Falcons 35, Packers 14',
      'Penix: 18/25 • 256 YDS • TD',
      'Bijan: 194 rush yards • 2 TD',
      'Drake London: 9 catches • 194 yards',
      'Sunday: 14 games across the Week 3 slate',
      'Rio: Ravens vs Cowboys',
      'SNF: Rams at Broncos',
      'MNF: Eagles at Bears'
    ];
    t.innerHTML=items.map(x=>`<span><b>●</b> ${x}</span>`).join('');
    return true;
  }

  function updateHero(){
    const hero=document.querySelector('.nfl-v2-hero');
    const copy=hero?.querySelector('.nfl-v2-copy');
    if(!copy) return false;
    if(copy.dataset.week3Hero==='1') return true;
    copy.dataset.week3Hero='1';
    copy.innerHTML=`
      <div class="nfl-v2-kicker"><span>4DK NFL</span> • WEEK 3</div>
      <h1>WEEK 3<br><em>IS HERE.</em></h1>
      <p class="nfl-v2-deck">Atlanta opened the week with a statement at Lambeau. Penix is back, Bijan ran wild, Drake London erupted — and now 14 Sunday games, Rio, Sunday Night Football and Monday night are next.</p>
      <div class="nfl-v2-actions">
        <a class="nfl-v2-primary" href="nfl-thursday-recap-week3-falcons-packers.html">Read TNF Recap</a>
        <a class="nfl-v2-secondary" href="nfl-week3-hub-2026.html">Open Week 3 Hub</a>
      </div>
      <div class="nfl-v2-meta">
        <span>ATL 35 • GB 14</span><i>•</i><span>14 SUNDAY GAMES</span><i>•</i><span>WEEK 3</span>
      </div>`;
    return true;
  }

  function updateBoard(){
    const board=document.querySelector('.nfl-v2-board');
    if(!board) return false;
    if(board.dataset.week3Board==='1') return true;
    board.dataset.week3Board='1';
    board.innerHTML=`
      <div class="nfl-v2-board-top">
        <span>THE 4DK BOARD</span>
        <strong>WEEK 3</strong>
      </div>
      <a class="nfl-v2-board-row live" href="nfl-thursday-recap-week3-falcons-packers.html">
        <div><small>FINAL</small><b>ATLANTA 35 • GREEN BAY 14</b></div>
        <span>RECAP →</span>
      </a>
      <a class="nfl-v2-board-row live" href="nfl.html#scoreboard">
        <div><small>SUNDAY</small><b>14-GAME WEEK 3 SLATE</b></div>
        <span>GAME CENTER →</span>
      </a>
      <a class="nfl-v2-board-row" href="nfl-week3-hub-2026.html">
        <div><small>FEATURED</small><b>RAVENS • COWBOYS • RIO</b></div>
        <span>WEEK 3 →</span>
      </a>
      <a class="nfl-v2-board-row" href="nfl-week3-hub-2026.html">
        <div><small>PRIMETIME</small><b>RAMS @ BRONCOS • SNF</b></div>
        <span>PREVIEW →</span>
      </a>
      <div class="nfl-v2-board-foot">WEEK 2 RANKINGS STAY FINAL UNTIL TUESDAY'S WEEK 3 REFRESH.</div>`;
    return true;
  }

  function desk(){
    let x=document.querySelector('.fourdk-w3');
    const anchor=document.querySelector('#redzone,.nfl-redzone,[data-nfl-scoreboard]');
    if(!anchor) return false;
    if(x) x.remove();

    x=document.createElement('section');
    x.className='fourdk-w3';
    x.id='week3-desk';
    x.innerHTML=`
      <div class="shell">
        <div class="w3h">
          <div>
            <small>4DK NFL • WEEK 3 DESK</small>
            <h2>THE WEEK IS ALREADY TALKING.</h2>
          </div>
          <a href="nfl-week3-hub-2026.html">OPEN FULL WEEK 3 DESK →</a>
        </div>

        <article class="w3lead">
          <div class="w3lead-copy">
            <small>THURSDAY NIGHT FOOTBALL • FINAL</small>
            <h3>PENIX IS BACK.<br><em>BIJAN TOOK OVER.</em></h3>
            <p>Atlanta walked into Lambeau and beat Green Bay 35–14. Michael Penix Jr. returned, Bijan Robinson ran for 194 yards and two touchdowns, and Drake London finished with nine catches for 194 yards.</p>
            <div class="w3lead-stats">
              <span>ATL 35 • GB 14</span>
              <span>PENIX 256 PASS YDS</span>
              <span>BIJAN 194 RUSH • 2 TD</span>
              <span>LONDON 9 REC • 194 YDS</span>
            </div>
            <a href="nfl-thursday-recap-week3-falcons-packers.html">READ THE FULL RECAP →</a>
          </div>
          <div class="w3lead-art" role="img" aria-label="4DK Falcons Packers Week 3 Thursday Night Football recap graphic"></div>
        </article>

        <div class="w3g">
          <a class="w3c final" href="nfl-thursday-recap-week3-falcons-packers.html">
            <small>THURSDAY • FINAL</small>
            <b>FALCONS 35, PACKERS 14</b>
            <span>Penix returns • Bijan runs wild • London erupts</span>
          </a>
          <a class="w3c live" href="nfl.html#scoreboard">
            <small>SUNDAY • 14 GAMES</small>
            <b>THE FULL WEEK 3 SLATE</b>
            <span>Live scores, finals, team stats and player leaders</span>
          </a>
          <a class="w3c" href="nfl-week3-hub-2026.html">
            <small>SUNDAY • 4:25 ET</small>
            <b>RAVENS @ COWBOYS</b>
            <span>International game • Rio de Janeiro</span>
          </a>
          <a class="w3c" href="nfl-week3-hub-2026.html">
            <small>SUNDAY • 8:20 ET</small>
            <b>RAMS @ BRONCOS</b>
            <span>Sunday Night Football</span>
          </a>
        </div>

        <div class="w3flow">
          <div><small>THURSDAY</small><b>ATL 35 • GB 14</b></div>
          <div><small>FRI / SAT</small><b>Sunday setup</b></div>
          <div><small>SUNDAY</small><b>14 games + recap</b></div>
          <div><small>MONDAY</small><b>Eagles @ Bears</b></div>
          <div><small>TUESDAY</small><b>Power • MVP • Rookie</b></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',x);
    return true;
  }

  function updateNav(){
    const nav=document.querySelector('.nfl-v2-nav');
    if(!nav) return false;

    let week3=nav.querySelector('a[href="#week3-desk"]');
    if(!week3){
      week3=document.createElement('a');
      week3.href='#week3-desk';
      nav.prepend(week3);
    }
    week3.textContent='Week 3';
    week3.classList.add('active');

    [...nav.querySelectorAll('a')].forEach(a=>{
      if(a!==week3 && a.getAttribute('href')==='#storylines') a.classList.remove('active');
    });

    if(!nav.querySelector('a[href="nfl-thursday-recaps.html"]')){
      const a=document.createElement('a');
      a.href='nfl-thursday-recaps.html';
      a.textContent='Thursday Recaps';
      week3.insertAdjacentElement('afterend',a);
    }

    if(!nav.querySelector('a[href="#standings"]')){
      const a=document.createElement('a');
      a.href='#standings';
      a.textContent='Standings';
      const scores=nav.querySelector('a[href="#scoreboard"]');
      if(scores) scores.insertAdjacentElement('afterend',a);
      else nav.appendChild(a);
    }
    return true;
  }


  function standings(){
    if(document.querySelector('.w3standings')) return true;

    const scoreboard=document.querySelector('#scoreboard,[data-nfl-scoreboard]');
    if(!scoreboard) return false;

    const section=document.createElement('section');
    section.className='w3standings';
    section.id='standings';
    section.setAttribute('aria-label','Current NFL standings');

    const afc=[
      ['AFC EAST',[
        ['Buffalo Bills','2–0',1],
        ['New England Patriots','1–1',0],
        ['New York Jets','1–1',0],
        ['Miami Dolphins','0–2',0]
      ]],
      ['AFC NORTH',[
        ['Cincinnati Bengals','2–0',1],
        ['Baltimore Ravens','1–1',0],
        ['Pittsburgh Steelers','1–1',0],
        ['Cleveland Browns','1–1',0]
      ]],
      ['AFC SOUTH',[
        ['Jacksonville Jaguars','1–1',1],
        ['Tennessee Titans','0–2',0],
        ['Houston Texans','0–2',0],
        ['Indianapolis Colts','0–2',0]
      ]],
      ['AFC WEST',[
        ['Kansas City Chiefs','2–0',1],
        ['Las Vegas Raiders','2–0',0],
        ['Denver Broncos','1–1',0],
        ['Los Angeles Chargers','0–2',0]
      ]]
    ];

    const nfc=[
      ['NFC EAST',[
        ['Philadelphia Eagles','2–0',1],
        ['New York Giants','1–1',0],
        ['Dallas Cowboys','1–1',0],
        ['Washington Commanders','0–2',0]
      ]],
      ['NFC NORTH',[
        ['Minnesota Vikings','2–0',1],
        ['Detroit Lions','1–1',0],
        ['Chicago Bears','1–1',0],
        ['Green Bay Packers','1–2',0]
      ]],
      ['NFC SOUTH',[
        ['Carolina Panthers','1–1',1],
        ['New Orleans Saints','1–1',0],
        ['Atlanta Falcons','1–2',0],
        ['Tampa Bay Buccaneers','0–2',0]
      ]],
      ['NFC WEST',[
        ['Seattle Seahawks','2–0',1],
        ['San Francisco 49ers','2–0',0],
        ['Los Angeles Rams','1–1',0],
        ['Arizona Cardinals','1–1',0]
      ]]
    ];

    const conf=(name,divs)=>`
      <div class="w3conf">
        <div class="w3conf-title"><b>${name}</b><span>WEEK 3 • CURRENT</span></div>
        ${divs.map(([d,teams])=>`
          <div class="w3div">
            <h3>${d}</h3>
            ${teams.map(([team,rec,lead])=>`
              <div class="w3team${lead?' leader':''}">
                <strong>${team}</strong><b>${rec}</b>
              </div>`).join('')}
          </div>`).join('')}
      </div>`;

    section.innerHTML=`
      <div class="shell">
        <div class="w3standings-head">
          <div>
            <small>4DK NFL • CURRENT STANDINGS</small>
            <h2>WHERE EVERYBODY STANDS.</h2>
          </div>
          <p>Division standings through Thursday Night Football of Week 3. Atlanta and Green Bay have played three games; the rest of the league enters the Sunday slate with two.</p>
        </div>
        <div class="w3standings-confs">
          ${conf('AFC',afc)}
          ${conf('NFC',nfc)}
        </div>
        <div class="w3standings-note">◆ Division leader shown in the current official order. Snapshot: September 26, 2026, after Falcons 35, Packers 14 and before the Week 3 Sunday games.</div>
      </div>`;

    scoreboard.insertAdjacentElement('afterend',section);
    return true;
  }

  function redzone(){
    const rz=document.querySelector('#redzone,.nfl-redzone');
    if(!rz) return false;

    const now=rz.querySelector('.fourdk-rz-now');
    const feature=rz.querySelector('.fourdk-rz-feature');

    if(now) now.innerHTML=`<strong><i></i> RED ZONE NOW</strong><span>WEEK 3 • THURSDAY FINAL • SUNDAY NEXT</span>`;

    if(feature){
      feature.href='nfl-thursday-recap-week3-falcons-packers.html';
      feature.innerHTML=`
        <div class="fourdk-rz-feature-mark"><div><small>TNF</small><strong>35–14</strong></div></div>
        <div class="fourdk-rz-feature-copy">
          <small>WEEK 3 • FIRST STATEMENT</small>
          <h3>ATLANTA WOKE UP.</h3>
          <p>Penix returned. Bijan ran for 194. Drake London went for 194. The Falcons opened Week 3 by taking over Lambeau.</p>
        </div>
        <span class="fourdk-rz-feature-read">READ RECAP →</span>`;
    }

    const g=rz.querySelector('.redzone-grid');
    if(!g) return true;

    const groups={
      'GAME DAY':[
        'WEEK 3 • SUNDAY BOARD',
        [
          ['Chargers at Bills — a major AFC test in the early window.','LAC–BUF'],
          ['Chiefs at Dolphins — Kansas City heads to Miami.','KC–MIA'],
          ['Ravens vs. Cowboys — Rio gets one of the week’s biggest stages.','RIO']
        ]
      ],
      'INJURY REPORT':[
        'WEEK 3 • AVAILABILITY',
        [
          ['Use the live Week 3 desk for final game-status updates before kickoff.','W3'],
          ['Sunday statuses stay separate from the completed Thursday recap.','SUN'],
          ['The scoreboard takes over once games go live.','LIVE']
        ]
      ],
      'ROSTER MOVES':[
        'WEEK 3 • STORYLINES',
        [
          ['Penix is back in Atlanta and the offense looked completely different.','ATL'],
          ['Green Bay has questions after getting outrushed 242–17.','GB'],
          ['Tuesday remains the next Power Rankings, MVP and Rookie Watch refresh.','TUE']
        ]
      ],
      'AROUND THE LEAGUE':[
        'WEEK 3 • PRIMETIME',
        [
          ['Rams at Broncos owns Sunday Night Football.','SNF'],
          ['Eagles at Bears closes Week 3 Monday night.','MNF'],
          ['Thursday recap archive now leads with Atlanta–Green Bay.','TNF']
        ]
      ]
    };

    [...g.children].forEach(card=>{
      const h=card.querySelector('b,strong');
      if(!h) return;
      const d=groups[h.textContent.trim().toUpperCase()];
      if(!d) return;

      let s=card.querySelector('.fourdk-rz-status');
      if(!s){
        s=document.createElement('span');
        s.className='fourdk-rz-status';
        card.appendChild(s);
      }
      s.textContent=d[0];

      let l=card.querySelector('.fourdk-rz-links');
      if(!l){
        l=document.createElement('div');
        l.className='fourdk-rz-links';
        card.appendChild(l);
      }
      l.innerHTML=d[1].map(([t,tag])=>`<a href="nfl-week3-hub-2026.html"><i></i><span>${t}</span><b>${tag} →</b></a>`).join('');
    });

    let note=rz.querySelector('.fourdk-rz-source-note');
    if(!note){
      note=document.createElement('div');
      note.className='fourdk-rz-source-note';
      g.insertAdjacentElement('afterend',note);
    }
    note.textContent='4DK RED ZONE • WEEK 3 ACTIVE • WEEK 2 COVERAGE REMAINS IN THE ARCHIVE';
    return true;
  }

  function labelRankings(){
    const watch=document.querySelector('#mvp-watch,.mvp-watch');
    if(watch){
      const p=watch.querySelector('.mvp-head p');
      const stamp=watch.querySelector('.mvp-stamp');
      if(p) p.textContent='Week 2 final board stays locked through the Week 3 Sunday and Monday games. The next full refresh comes Tuesday.';
      if(stamp) stamp.innerHTML='WEEK 2 FINAL<br>NEXT UPDATE: TUESDAY';
    }
    return true;
  }

  function apply(){
    addStyles();
    updateTicker();
    updateHero();
    updateBoard();
    desk();
    updateNav();
    standings();
    redzone();
    labelRankings();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  } else {
    apply();
  }

  [250,600,1100,1800,2800,4200,6000,8000].forEach(ms=>setTimeout(apply,ms));
})();
