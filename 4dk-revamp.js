(() => {
  const rk=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const home=rk===''||rk==='index';
  const nav=document.getElementById('mobileNav');
  const btn=document.getElementById('menuBtn');

  // Add the new final rankings to homepage search.
  try{
    if(typeof siteSearchIndex!=='undefined'){
      const extras=[
        {title:'The 50 Best NBA Players Entering 2026–27',type:'4DK NBA Ranking',url:'top-50-nba-players-2026-27.html',desc:'Wemby, SGA, Luka, Jokić and Brunson lead the 4DK Top 50 entering 2026–27',terms:'top 50 nba players 2026 27 wemby sga luka jokic brunson ranking basketball'},
        {title:'The 26 Best Rappers of 2000–2026',type:'4DK Ranking',url:'top-26-rappers-2000-2026.html',desc:'Wayne, Kendrick, Nas, Jay and Drake lead the final 4DK ranking',terms:'top 26 rappers overall wayne kendrick nas jay drake ranking'},
        {title:'The 26 Best Midwest Rappers of 2000–2026',type:'4DK Ranking',url:'top-26-midwest-rappers-2000-2026.html',desc:'The final regional list: Chicago, Detroit, St. Louis and beyond',terms:'midwest rappers kanye common gibbs eminem lupe'},
        {title:'The 26 Best East Coast Rappers of 2000–2026',type:'4DK Ranking',url:'top-26-east-coast-rappers-2000-2026.html',desc:'Nas, Jadakiss, Jay-Z and the East Coast field',terms:'east coast rappers nas jada jay 50 nicki'},
        {title:'The 26 Best Southern Rappers Since 2000',type:'4DK Ranking',url:'top-26-southern-rappers-since-2000.html',desc:'Wayne, T.I., Jeezy and the South',terms:'south southern rappers wayne ti jeezy future'},
        {title:'The 26 Best West Coast Rappers Since 2000',type:'4DK Ranking',url:'top-26-west-coast-rappers-since-2000.html',desc:'Kendrick, Nipsey, E-40 and the West',terms:'west coast rappers kendrick nipsey e40 game'}
      ];
      extras.forEach(x=>{if(!siteSearchIndex.some(i=>i.url===x.url))siteSearchIndex.push(x);});
    }
  }catch(e){}

  // Premium mobile menu, without removing any existing links.
  if(nav && !nav.querySelector('.mobile-nav-title')){
    const title=document.createElement('div');
    title.className='mobile-nav-title';
    title.innerHTML='<strong>4DK MENU</strong><span>For Da Kulture.</span>';
    nav.prepend(title);

    const quick=document.createElement('div');
    quick.className='mobile-nav-quick';
    quick.innerHTML=`
      <div class="mobile-nav-quick-label">Quick Access</div>
      <div class="mobile-nav-quick-links">
        <a href="index.html#latest-4dk">Latest</a>
        <a href="top-26-rappers-2000-2026.html">Top 26</a>
        <a href="82-0.html">82–0</a>
        <a href="hiphop.html#spotify-shelf">4DK Rotation</a>
      </div>`;
    nav.appendChild(quick);

    const backdrop=document.createElement('div');
    backdrop.className='mobile-nav-backdrop';
    document.body.appendChild(backdrop);

    const syncNav=()=>{
      const open=nav.classList.contains('open');
      document.body.classList.toggle('nav-open',open);
      btn?.setAttribute('aria-expanded',String(open));
    };
    btn?.addEventListener('click',()=>setTimeout(syncNav,0));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');
      syncNav();
    }));
    backdrop.addEventListener('click',()=>{
      nav.classList.remove('open');
      syncNav();
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&nav.classList.contains('open')){
        nav.classList.remove('open');
        syncNav();
        btn?.focus();
      }
    });
  }

  // Homepage becomes the 4DK front cover while keeping every existing block.
  if(home){
    const main=document.querySelector('main#main');
    const hero=main?.querySelector('.hero');

    if(main && hero && !document.querySelector('.front-cover-feature')){
      const front=document.createElement('section');
      front.className='front-cover-feature';
      front.innerHTML=`
        <div class="shell front-cover-inner">
          <div>
            <div class="front-cover-kicker">4DK Front Page • Lead Story</div>
            <h2>The 26 Best Rappers <em>of 2000–2026.</em></h2>
            <p class="front-cover-deck">Four regional rankings became one final argument. Wayne gets the crown. Kendrick is right behind him. Nas, Jay and Drake complete the five.</p>
            <div class="front-cover-actions">
              <a class="front-cover-btn" href="top-26-rappers-2000-2026.html">Read the Final Ranking →</a>
              <a class="front-cover-btn alt" href="hiphop.html">Enter 4DK Music</a>
            </div>
          </div>
          <aside class="front-cover-side">
            <span>Inside This Issue</span>
            <strong>Sports. Music. Screen. Archive. No network voice.</strong>
            <p>The homepage now works like the front cover of 4DK — the biggest story first, then the sections and franchises that make the publication different.</p>
          </aside>
        </div>`;
      main.insertBefore(front,hero);

      const latest=document.createElement('section');
      latest.className='latest-4dk';
      latest.id='latest-4dk';
      latest.innerHTML=`
        <div class="shell latest-4dk-inner">
          <div class="latest-4dk-head"><h2>Latest From 4DK</h2><span>New drops across the publication</span></div>
          <div class="latest-4dk-grid">
            <a class="latest-4dk-card" href="top-26-rappers-2000-2026.html"><small>4DK Music</small><strong>The 26 Best Rappers of 2000–2026</strong><span>Final Ranking →</span></a>
            <a class="latest-4dk-card" href="nba-season-preview-2026-27.html"><small>Basketball Annual</small><strong>2026–27 NBA Season Preview</strong><span>Read →</span></a>
            <a class="latest-4dk-card" href="82-0.html"><small>Interactive</small><strong>Can Your Starting Five Go 82–0?</strong><span>Play →</span></a>
            <a class="latest-4dk-card" href="movies.html"><small>4DK Screen</small><strong>The Screen Is Part of the Kulture</strong><span>Enter →</span></a>
          </div>
        </div>`;
      hero.after(latest);

      // Keep the X promo, but move it below the lead story + Latest rail.
      const xFollow=[...document.querySelectorAll('body > section')].find(
        s=>s.textContent.includes('FOLLOW 4 DA KULTURE')
      );
      if(xFollow) latest.after(xFollow);

      const across=[...main.querySelectorAll('section')].find(s=>s.querySelector('.split'));
      const franchise=document.createElement('section');
      franchise.className='signature-franchises';
      franchise.innerHTML=`
        <div class="shell">
          <div class="signature-franchise-head">
            <div><span class="eyebrow">Built Different</span><h2>Signature 4DK Franchises</h2></div>
            <p>These are the recurring ideas that turn 4DK from a collection of stories into a publication people can follow.</p>
          </div>
          <div class="signature-franchise-grid">
            <a class="signature-franchise-card" href="top-26-rappers-2000-2026.html"><small>01 • Music</small><strong>Regional Rankings</strong><span>West. South. East. Midwest. Then the final Top 26.</span></a>
            <a class="signature-franchise-card" href="nba-season-preview-2026-27.html"><small>02 • NBA</small><strong>4DK Basketball Annual</strong><span>The season preview, awards, pressure points and predictions.</span></a>
            <a class="signature-franchise-card" href="82-0.html"><small>03 • Interactive</small><strong>82–0</strong><span>Build the impossible five and let 4DK judge the fit.</span></a>
            <a class="signature-franchise-card" href="movies.html"><small>04 • Screen</small><strong>4DK Screen</strong><span>Movies, TV, rewatches and the stories we still talk about.</span></a>
            <a class="signature-franchise-card" href="throwback.html"><small>05 • Archive</small><strong>4DK Archive</strong><span>Throwbacks across hoops, music, games, TV and culture.</span></a>
            <a class="signature-franchise-card" href="hiphop.html#franchises"><small>06 • Music</small><strong>HOV Wednesdays + Rewind</strong><span>Recurring music conversations that keep the catalog alive.</span></a>
          </div>
        </div>`;
      if(across)main.insertBefore(franchise,across);
      else main.appendChild(franchise);

      const ticker=document.querySelector('.ticker-track');
      if(ticker && !ticker.textContent.includes('Final Top 26')){
        const s=document.createElement('span');
        s.innerHTML='<span class="dot">●</span> Final Top 26 rappers live now';
        ticker.prepend(s);
      }
    }
  }

  // NBA front-page flagship: 4DK Top 50 players entering 2026–27.
  if(rk==='nba' && !document.querySelector('.nba-top50-feature')){
    if(!document.getElementById('nbaTop50FeatureStyles')){
      const st=document.createElement('style');
      st.id='nbaTop50FeatureStyles';
      st.textContent=`
        .nba-top50-feature{position:relative;overflow:hidden;background:#0b0b0e;color:#fff;border-top:1px solid #29272d;border-bottom:1px solid #29272d;padding:42px 0}
        .nba-top50-feature:before{content:'50';position:absolute;right:-22px;top:-76px;font:900 300px/.8 Georgia,serif;letter-spacing:-.09em;color:#fff;opacity:.035;pointer-events:none}
        .nba-top50-feature:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 82% 25%,rgba(157,25,29,.35),transparent 28rem),linear-gradient(110deg,transparent 0 58%,rgba(157,25,29,.08) 58% 100%);pointer-events:none}
        .nba-top50-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.2fr .8fr;gap:28px;align-items:stretch;border:1px solid #3a373e;background:linear-gradient(135deg,#17161b,#0b0b0e 70%);box-shadow:0 22px 55px rgba(0,0,0,.22)}
        .nba-top50-copy{padding:34px 34px 30px;display:flex;flex-direction:column;justify-content:center}
        .nba-top50-kicker{font-size:9px;font-weight:1000;letter-spacing:.16em;color:#ef7666;text-transform:uppercase}
        .nba-top50-copy h2{margin:10px 0 14px;font-family:Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;font-size:clamp(54px,7vw,92px);line-height:.78;letter-spacing:-.02em;text-transform:uppercase}
        .nba-top50-copy h2 em{display:block;color:#d8b0aa;font:italic 400 .68em/1 Georgia,serif;letter-spacing:-.04em;margin-top:8px}
        .nba-top50-copy p{max-width:680px;margin:0;color:#c8c0b8;font:16px/1.45 Georgia,serif}
        .nba-top50-btn{align-self:flex-start;margin-top:22px;padding:11px 14px;background:#9d191d;color:#fff!important;text-decoration:none;font-size:9px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase}
        .nba-top50-board{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:30px;border-left:1px solid #37343b;background:repeating-linear-gradient(90deg,transparent 0 44px,rgba(255,255,255,.025) 45px 46px),radial-gradient(circle at 50% 50%,transparent 0 76px,rgba(255,255,255,.07) 77px 79px,transparent 80px)}
        .nba-top50-board:before{content:'4DK';position:absolute;right:-8px;bottom:-20px;font:1000 100px/1 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;color:#fff;opacity:.035}
        .nba-top50-board>span{font-size:8px;font-weight:1000;letter-spacing:.16em;color:#d7b56d;text-transform:uppercase;margin-bottom:14px}
        .nba-top50-five{display:grid;gap:7px}
        .nba-top50-five div{display:grid;grid-template-columns:30px 1fr;gap:10px;align-items:center;padding:9px 10px;border:1px solid #34323a;background:rgba(255,255,255,.025)}
        .nba-top50-five b{font:900 22px/1 Georgia,serif;color:#8d8080}
        .nba-top50-five strong{font-size:10px;letter-spacing:.08em;text-transform:uppercase}
        .nba-top50-five div:first-child{background:#9d191d;border-color:#9d191d}
        .nba-top50-five div:first-child b{color:#fff}
        @media(max-width:760px){
          .nba-top50-feature{padding:28px 0}
          .nba-top50-feature:before{font-size:210px;top:-40px;right:-14px}
          .nba-top50-inner{grid-template-columns:1fr}
          .nba-top50-copy{padding:27px 22px 24px}
          .nba-top50-copy h2{font-size:58px}
          .nba-top50-board{border-left:0;border-top:1px solid #37343b;padding:22px}
          .nba-top50-five{grid-template-columns:1fr}
        }
      `;
      document.head.appendChild(st);
    }

    const hero=document.querySelector('.nba-hero');
    if(hero){
      const feature=document.createElement('section');
      feature.className='nba-top50-feature';
      feature.innerHTML=`
        <div class="shell">
          <div class="nba-top50-inner">
            <div class="nba-top50-copy">
              <span class="nba-top50-kicker">4DK Signature Ranking • 2026–27</span>
              <h2>THE 50 BEST<br>NBA PLAYERS <em>RIGHT NOW.</em></h2>
              <p>Not a career ranking. Not a legacy list. More than 65 names went into the pool — then we cut it down one by one. Wemby gets the crown entering 2026–27.</p>
              <a class="nba-top50-btn" href="top-50-nba-players-2026-27.html">READ THE FULL TOP 50 →</a>
            </div>
            <aside class="nba-top50-board" aria-label="4DK Top 5 NBA players entering 2026–27">
              <span>THE FINAL FIVE</span>
              <div class="nba-top50-five">
                <div><b>1</b><strong>Victor Wembanyama</strong></div>
                <div><b>2</b><strong>Shai Gilgeous-Alexander</strong></div>
                <div><b>3</b><strong>Luka Dončić</strong></div>
                <div><b>4</b><strong>Nikola Jokić</strong></div>
                <div><b>5</b><strong>Jalen Brunson</strong></div>
              </div>
            </aside>
          </div>
        </div>`;
      hero.after(feature);
    }
  }

  // Related-story system for article pages.
  const stories={
    final:{url:'top-26-rappers-2000-2026.html',label:'4DK MUSIC • FINAL LIST',title:'The 26 Best Rappers of 2000–2026',desc:'Wayne. Kendrick. Nas. Jay. Drake. One final ranking.'},
    west:{url:'top-26-west-coast-rappers-since-2000.html',label:'FROM THE WEST',title:'The 26 Best West Coast Rappers Since 2000',desc:'The West never disappeared. It just stopped sounding like one thing.'},
    south:{url:'top-26-southern-rappers-since-2000.html',label:'FROM THE SOUTH',title:'The 26 Best Southern Rappers Since 2000',desc:'The South did not just take over rap. For long stretches, the South was rap.'},
    east:{url:'top-26-east-coast-rappers-2000-2026.html',label:'FROM THE EAST',title:'The 26 Best East Coast Rappers of 2000–2026',desc:'Nas, Jadakiss, Jay-Z and the East Coast argument.'},
    midwest:{url:'top-26-midwest-rappers-2000-2026.html',label:'FROM THE MIDWEST',title:'The 26 Best Midwest Rappers of 2000–2026',desc:'Chicago had the bench. Detroit had the bars. The Midwest had everything.'},
    nba:{url:'nba-season-preview-2026-27.html',label:'4DK BASKETBALL ANNUAL',title:'2026–27 NBA Season Preview',desc:'Nobody feels inevitable. The full 4DK look at the season ahead.'},
    russ:{url:'russell-westbrook-debate.html',label:'NBA LEGACY',title:'Russell Westbrook Was Never Supposed to Be This Great',desc:'From UCLA afterthought to MVP and triple-double king.'},
    giannis:{url:'giannis-miami-offseason-winner.html',label:'NBA • NEW ERA',title:'Winner: Giannis Antetokounmpo',desc:'A new city, a new pressure point and another MVP conversation.'},
    bucks:{url:'milwaukee-fall-from-grace.html',label:'FRANCHISE RETROSPECTIVE',title:'The Party’s Over: Milwaukee’s Fall From Grace',desc:'How a championship window slowly closed.'},
    awards:{url:'nba-awards-predictions-2026-27.html',label:'NBA PREDICTIONS',title:'2026–27 NBA Awards & All-NBA Predictions',desc:'MVP, DPOY, Rookie of the Year and All-NBA picks.'},
    game:{url:'82-0.html',label:'4DK INTERACTIVE',title:'Can Your Starting Five Go 82–0?',desc:'Five positions. Three choices each. Build the impossible five.'}
  };
  const related={
    'top-26-rappers-2000-2026':['midwest','east','south'],
    'top-26-west-coast-rappers-since-2000':['final','south','east'],
    'top-26-southern-rappers-since-2000':['final','east','west'],
    'top-26-east-coast-rappers-2000-2026':['final','midwest','south'],
    'top-26-midwest-rappers-2000-2026':['final','east','west'],
    'nba-season-preview-2026-27':['awards','russ','game'],
    'russell-westbrook-debate':['nba','game','giannis'],
    'giannis-miami-offseason-winner':['nba','bucks','awards'],
    'milwaukee-fall-from-grace':['giannis','nba','russ'],
    'nba-awards-predictions-2026-27':['nba','game','russ'],
    'nba-offseason-winners-losers':['giannis','bucks','nba'],
    'minnesota-offseason-winner':['nba','awards','game'],
    'kawhi-clippers-offseason':['nba','awards','russ']
  };

  const picks=related[rk];
  const footer=document.querySelector('footer.footer');
  if(picks && footer && !document.querySelector('.keep-reading-section')){
    const section=document.createElement('section');
    section.className='keep-reading-section';
    section.innerHTML=`
      <div class="shell">
        <div class="keep-reading-head">
          <div><span>More From 4DK</span><h2>Keep Reading</h2></div>
          <a href="index.html">Back to the Front Page →</a>
        </div>
        <div class="keep-reading-grid">
          ${picks.map(k=>{
            const s=stories[k];
            return `<a class="keep-reading-card" href="${s.url}"><div><small>${s.label}</small><strong>${s.title}</strong><p>${s.desc}</p></div><b>Read Next →</b></a>`;
          }).join('')}
        </div>
      </div>`;
    footer.parentNode.insertBefore(section,footer);
  }

  // 4DK secondary brand mark in the sitewide footer.
  const footerEl=document.querySelector('footer.footer');
  if(footerEl && !footerEl.querySelector('.footer-alt-brand')){
    if(!document.getElementById('footerAltBrandStyles')){
      const st=document.createElement('style');
      st.id='footerAltBrandStyles';
      st.textContent=`
        .footer .footer-alt-brand{
          display:flex;
          align-items:center;
          gap:16px;
          margin:0 0 18px;
        }
        .footer .footer-alt-brand a{
          display:block;
          flex:0 0 auto;
          width:68px;
          height:68px;
          border-radius:50%;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.14);
          box-shadow:0 10px 26px rgba(0,0,0,.22);
          background:#050505;
        }
        .footer .footer-alt-brand img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }
        .footer .footer-alt-brand-copy{
          min-width:0;
        }
        .footer .footer-alt-brand-copy strong{
          display:block;
          color:#fff;
          font-size:15px;
          line-height:1.1;
          letter-spacing:.06em;
          text-transform:uppercase;
        }
        .footer .footer-alt-brand-copy span{
          display:block;
          margin-top:5px;
          color:#aaa39a;
          font-size:10px;
          line-height:1.45;
          max-width:250px;
        }
        .footer .footer-alt-brand + p{
          margin-top:0;
          max-width:430px;
        }
        @media(max-width:700px){
          .footer .footer-alt-brand{
            gap:13px;
            margin-bottom:16px;
          }
          .footer .footer-alt-brand a{
            width:58px;
            height:58px;
          }
          .footer .footer-alt-brand-copy strong{
            font-size:13px;
          }
          .footer .footer-alt-brand-copy span{
            font-size:9px;
          }
        }
      `;
      document.head.appendChild(st);
    }

    const firstCol=footerEl.querySelector('.footer-grid > div') || footerEl.querySelector('.shell > div');
    if(firstCol){
      const brand=document.createElement('div');
      brand.className='footer-alt-brand';
      brand.innerHTML=`
        <a href="index.html" aria-label="4 Da Kulture home">
          <img src="4dk-footer-logo.png" alt="4DK alternate logo">
        </a>
        <div class="footer-alt-brand-copy">
          <strong>4 Da Kulture</strong>
          <span>Built for the conversations fans actually have.</span>
        </div>`;
      firstCol.prepend(brand);

      // Remove the old duplicate footer wordmark directly underneath the new logo lockup.
      firstCol.querySelector('.footer-brand')?.remove();
    }

    // Add Kcdatruth to the 4DK footer links without disturbing the existing links.
    const footerGroups=[...footerEl.querySelectorAll('.footer-grid > div')];
    const fourDKGroup=footerGroups.find(group=>
      group.querySelector('h4')?.textContent.trim().toUpperCase()==='4DK'
    );
    const fourDKLinks=fourDKGroup?.querySelector('.footer-links');
    if(fourDKLinks && !fourDKLinks.querySelector('a[href="kcdatruth.html"]')){
      const authorLink=document.createElement('a');
      authorLink.href='kcdatruth.html';
      authorLink.textContent='Kcdatruth';
      const westLink=fourDKLinks.querySelector('a[href="210west.html"]');
      if(westLink)fourDKLinks.insertBefore(authorLink,westLink);
      else fourDKLinks.appendChild(authorLink);
    }
  }

})();
