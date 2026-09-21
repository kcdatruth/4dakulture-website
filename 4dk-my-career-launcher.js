/* OPTIONAL NBA PAGE LAUNCHER */
(() => {
  if(!/(^|\/)nba(?:\.html)?$/.test(location.pathname.replace(/\/+$/,''))) return;
  if(document.querySelector('#mycareer-launch')) return;
  const style=document.createElement('style');
  style.textContent=`
    #mycareer-launch{padding:38px 0;background:#07090d;border-top:1px solid #292f39;border-bottom:1px solid #292f39}
    #mycareer-launch .mcl-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:0;border:1px solid #353d49;background:linear-gradient(140deg,#151b25,#080b10);overflow:hidden;text-decoration:none!important;color:#fff!important}
    #mycareer-launch .mcl-copy{padding:32px}#mycareer-launch small{color:#ff5261;font-size:9px;font-weight:1000;letter-spacing:.15em}
    #mycareer-launch h2{margin:10px 0;color:#fff;font:1000 clamp(52px,7vw,88px)/.82 Impact,Arial Black,sans-serif;letter-spacing:-.035em}#mycareer-launch h2 em{display:block;color:#e93142;font-style:normal}
    #mycareer-launch p{max-width:650px;color:#aeb5c0;font:15px/1.55 Georgia,serif}#mycareer-launch b{display:inline-block;margin-top:13px;background:#e93142;padding:10px 13px;font-size:9px;letter-spacing:.1em}
    #mycareer-launch .mcl-board{padding:28px;border-left:1px solid #303744;background:radial-gradient(circle at center,rgba(233,49,66,.18),transparent 60%)}
    #mycareer-launch .mcl-board span{display:block;padding:10px 0;border-bottom:1px solid #2b3340;color:#8e99a8;font-size:9px;font-weight:1000;letter-spacing:.08em}#mycareer-launch .mcl-board span:first-child{color:#fff}
    @media(max-width:720px){#mycareer-launch .mcl-inner{grid-template-columns:1fr}#mycareer-launch .mcl-board{border-left:0;border-top:1px solid #303744}}
  `;
  document.head.appendChild(style);
  const sec=document.createElement('section');
  sec.id='mycareer-launch';
  sec.innerHTML=`<div class="shell"><a class="mcl-inner" href="4dk-my-career.html"><div class="mcl-copy"><small>4DK INTERACTIVE • PLAYABLE BETA</small><h2>4DK <em>MY CAREER</em></h2><p>Create a senior. Choose any real high school. Play full games, key moments or sim. Build recruiting stars, earn real college offers and choose where your story goes next.</p><b>START YOUR CAREER →</b></div><div class="mcl-board"><span>01 • SENIOR YEAR — LIVE NOW</span><span>02 • REAL HIGH SCHOOLS</span><span>03 • 1★ → 5★ RECRUITING</span><span>04 • REAL COLLEGE OFFERS</span><span>05 • COLLEGE / NIL / DRAFT — NEXT</span></div></a></div>`;
  const pulse=document.querySelector('.nba-pulse'); const legacy=document.querySelector('#legacy-ranking');
  if(pulse) pulse.after(sec); else if(legacy) legacy.before(sec); else document.querySelector('main')?.prepend(sec);
})();

/* 4DK NBA — 2026–27 DIVISION PREVIEWS */
(() => {
  if(!/(^|\/)nba(?:\.html)?$/.test(location.pathname.replace(/\/+$/,''))) return;
  if(document.querySelector('#division-previews')) return;
  if(!document.getElementById('division-preview-styles')){
    const style=document.createElement('style'); style.id='division-preview-styles';
    style.textContent=`
      #division-previews{padding:46px 0;background:#0b0b0d;color:#fff;border-top:1px solid #252525;border-bottom:1px solid #252525}
      #division-previews .dp-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:22px}#division-previews .dp-eyebrow{display:block;color:#ef6130;font-size:9px;font-weight:1000;letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px}
      #division-previews h2{margin:0;font:1000 clamp(38px,6vw,68px)/.9 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.03em;text-transform:uppercase;color:#fff}#division-previews .dp-head p{max-width:520px;margin:0;color:#a9a9ae;font:14px/1.5 Georgia,serif}
      #division-previews .dp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}#division-previews .dp-card{position:relative;overflow:hidden;min-height:245px;padding:28px;text-decoration:none!important;color:#fff!important;border:1px solid #343434;display:flex;flex-direction:column;justify-content:flex-end;background:#141414}
      #division-previews .dp-card:before{content:'';position:absolute;inset:0;opacity:.75;pointer-events:none}#division-previews .dp-card.atlantic:before{background:radial-gradient(circle at 80% 18%,rgba(34,110,194,.35),transparent 34%),linear-gradient(145deg,#151515 0%,#111722 100%)}
      #division-previews .dp-card.central:before{background:radial-gradient(circle at 80% 18%,rgba(201,52,48,.3),transparent 34%),linear-gradient(145deg,#151515 0%,#211312 100%)}#division-previews .dp-card.southeast:before{background:radial-gradient(circle at 80% 18%,rgba(209,145,45,.32),transparent 34%),linear-gradient(145deg,#151515 0%,#211b11 100%)}
      #division-previews .dp-card.northwest:before{background:radial-gradient(circle at 80% 18%,rgba(76,142,190,.34),transparent 34%),linear-gradient(145deg,#151515 0%,#10202b 100%)}#division-previews .dp-card.pacific:before{background:radial-gradient(circle at 80% 18%,rgba(144,95,201,.34),transparent 34%),linear-gradient(145deg,#151515 0%,#1a1124 100%)}#division-previews .dp-card.southwest:before{background:radial-gradient(circle at 80% 18%,rgba(42,177,126,.34),transparent 34%),linear-gradient(145deg,#151515 0%,#0f211b 100%)}
      #division-previews .dp-card>*{position:relative;z-index:1}#division-previews .dp-card small{font-size:9px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase;color:#ef8b62;margin-bottom:8px}#division-previews .dp-card strong{font:1000 clamp(34px,5vw,56px)/.88 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.025em;text-transform:uppercase}
      #division-previews .dp-card p{margin:12px 0 0;color:#d0d0d3;font-size:13px;line-height:1.45;max-width:520px}#division-previews .dp-teams{margin-top:18px;padding-top:12px;border-top:1px solid rgba(255,255,255,.16);font-size:9px;font-weight:900;letter-spacing:.09em;color:#aaaeb5;text-transform:uppercase}#division-previews .dp-read{display:inline-block;margin-top:14px;color:#fff;font-size:9px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}
      @media(max-width:760px){#division-previews{padding:34px 0}#division-previews .dp-head{align-items:flex-start;flex-direction:column}#division-previews .dp-grid{grid-template-columns:1fr}#division-previews .dp-card{min-height:220px;padding:23px}}
    `; document.head.appendChild(style);
  }
  const nav=document.querySelector('.nba-hero-nav'); if(nav && !nav.querySelector('a[href="#division-previews"]')){const link=document.createElement('a');link.href='#division-previews';link.textContent='Division Previews';nav.appendChild(link)}
  const sec=document.createElement('section'); sec.id='division-previews';
  sec.innerHTML=`<div class="shell"><div class="dp-head"><div><span class="dp-eyebrow">4DK NBA • 2026–27 TEAM OUTLOOKS</span><h2>ALL SIX DIVISION<br>PREVIEWS ARE LIVE.</h2></div><p>All 30 teams are now on the board. The Southwest closes the series with Wemby's title expectations, the rise of Cooper Flagg, Houston's high ceiling and three franchises sorting out their futures.</p></div><div class="dp-grid">
    <a class="dp-card atlantic" href="nba-atlantic-2026-27.html"><small>ATLANTIC DIVISION</small><strong>CHAMPS.<br>STAR POWER.<br>PRESSURE.</strong><p>New York defends the crown while Philly, Toronto and Boston enter the year with completely different kinds of expectations. Brooklyn stays focused on the future.</p><span class="dp-teams">KNICKS • 76ERS • RAPTORS • CELTICS • NETS</span><span class="dp-read">READ THE ATLANTIC PREVIEW →</span></a>
    <a class="dp-card central" href="nba-central-2026-27.html"><small>CENTRAL DIVISION</small><strong>CONTENDERS.<br>BREAKOUTS.<br>REBUILDS.</strong><p>Detroit wants the next step, Cleveland has playoff pressure, Indiana stays dangerous and Chicago and Milwaukee are building toward what comes next.</p><span class="dp-teams">PISTONS • CAVALIERS • PACERS • BULLS • BUCKS</span><span class="dp-read">READ THE CENTRAL PREVIEW →</span></a>
    <a class="dp-card southeast" href="nba-southeast-2026-27.html"><small>SOUTHEAST DIVISION</small><strong>STAR POWER.<br>YOUTH.<br>NEW DIRECTIONS.</strong><p>Miami is chasing a title with Giannis, Orlando wants the next jump, Atlanta stays dangerous, Charlotte keeps building and Washington hands the future to AJ Dybantsa.</p><span class="dp-teams">HEAT • MAGIC • HAWKS • HORNETS • WIZARDS</span><span class="dp-read">READ THE SOUTHEAST PREVIEW →</span></a>
    <a class="dp-card northwest" href="nba-northwest-2026-27.html"><small>NORTHWEST DIVISION</small><strong>CONTENDERS.<br>MVP PRESSURE.<br>REBUILDS.</strong><p>OKC has Finals expectations, Denver still rides Jokic, Minnesota believes LaMelo unlocks Ant, Portland sorts out its crowded backcourt and Utah keeps stacking for the future.</p><span class="dp-teams">THUNDER • NUGGETS • TIMBERWOLVES • BLAZERS • JAZZ</span><span class="dp-read">READ THE NORTHWEST PREVIEW →</span></a>
    <a class="dp-card pacific" href="nba-pacific-2026-27.html"><small>PACIFIC DIVISION</small><strong>LUKA'S ERA.<br>PHOENIX'S CROSSROADS.<br>ONE MORE RIDE.</strong><p>The Lakers fully belong to Luka now, Phoenix has to think about the future, Golden State rides out the Steph era, and the Clippers and Kings face transition decisions.</p><span class="dp-teams">LAKERS • CLIPPERS • SUNS • KINGS • WARRIORS</span><span class="dp-read">READ THE PACIFIC PREVIEW →</span></a>
    <a class="dp-card southwest" href="nba-southwest-2026-27.html"><small>SOUTHWEST DIVISION</small><strong>WEMBY'S WINDOW.<br>FLAGG'S RISE.<br>HOUSTON'S TEST.</strong><p>San Antonio expects to contend, Dallas builds around Cooper Flagg, Houston has WCF upside, while Memphis and New Orleans put development and future decisions first.</p><span class="dp-teams">SPURS • MAVERICKS • ROCKETS • GRIZZLIES • PELICANS</span><span class="dp-read">READ THE SOUTHWEST PREVIEW →</span></a>
  </div></div>`;
  const latest=document.querySelector('#latest'); const season=document.querySelector('#season-preview'); if(latest) latest.before(sec); else if(season) season.after(sec); else document.querySelector('main')?.append(sec);
})();
