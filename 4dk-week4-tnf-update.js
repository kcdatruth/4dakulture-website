
/* 4DK Week 4 TNF — additive homepage, NFL page and Thursday archive feature. */
(() => {
  const articleUrl='nfl-thursday-recap-week4-steelers-browns.html';
  const key=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const home=key===''||key==='index';

  try{
    if(typeof siteSearchIndex!=='undefined' && !siteSearchIndex.some(i=>i.url===articleUrl)){
      siteSearchIndex.push({
        title:'Cleveland Is 3–1. Now What?',
        type:'NFL • Week 4 TNF Recap',
        url:articleUrl,
        desc:'Watson, Cleveland’s defense, Aaron Rodgers at 42 and the Browns’ young core after a 27–24 win.',
        terms:'browns steelers cleveland pittsburgh deshaun watson aaron rodgers week 4 thursday night football tnf judkins denzel boston kc concepcion fannin schwesinger mason graham'
      });
    }
  }catch(e){}

  if(!document.getElementById('fourdk-week4-tnf-styles')){
    const st=document.createElement('style');
    st.id='fourdk-week4-tnf-styles';
    st.textContent=`
      .fourdk-week4-home{background:linear-gradient(135deg,#251207,#080a09 70%);color:#fff;border-top:1px solid #57301c;border-bottom:5px solid #d9561d;padding:32px 0;position:relative;overflow:hidden}
      .fourdk-week4-home:after{content:'3–1';position:absolute;right:-12px;bottom:-35px;font:1000 clamp(90px,15vw,190px)/.8 Arial,sans-serif;color:rgba(255,255,255,.035);letter-spacing:-.08em;pointer-events:none}
      .fourdk-week4-home-inner{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:28px;align-items:center}
      .fourdk-week4-kicker{font-size:10px;font-weight:1000;letter-spacing:.15em;color:#ff8a4d;text-transform:uppercase}
      .fourdk-week4-home h2,.fourdk-week4-nfl h2{margin:8px 0 11px;font:1000 clamp(40px,6vw,72px)/.86 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.035em;text-transform:uppercase}
      .fourdk-week4-home h2 em,.fourdk-week4-nfl h2 em{font-style:normal;color:#ff6a22}
      .fourdk-week4-home p,.fourdk-week4-nfl p{margin:0;color:#c9c1bb;font-size:15px;line-height:1.55;max-width:830px}
      .fourdk-week4-btn{display:inline-block;margin-top:18px;background:#d9561d;color:#fff!important;text-decoration:none;padding:12px 16px;font-size:10px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-week4-score{border:1px solid #5d3a27;background:rgba(0,0,0,.28);padding:20px;text-align:center}
      .fourdk-week4-score small{display:block;color:#ff8a4d;font-size:9px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-week4-score strong{display:block;margin:10px 0 5px;font:1000 42px/1 Impact,sans-serif}
      .fourdk-week4-score span{display:block;font-size:13px;font-weight:900;color:#d4cbc5}
      .fourdk-week4-score b{display:block;margin-top:12px;color:#ff8a4d;font-size:11px;letter-spacing:.08em}

      .fourdk-week4-nfl{padding:35px 0;background:linear-gradient(135deg,#241208,#080b09 72%);color:#fff;border-top:1px solid #49301f;border-bottom:5px solid #d9561d;position:relative;overflow:hidden}
      .fourdk-week4-nfl-inner{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(245px,.65fr);gap:25px;align-items:center;position:relative;z-index:2}
      .fourdk-week4-nfl-panel{border:1px solid #49301f;background:#110d0a;padding:20px}
      .fourdk-week4-nfl-row{display:flex;justify-content:space-between;gap:20px;font-weight:1000}
      .fourdk-week4-nfl-row + .fourdk-week4-nfl-row{border-top:1px solid #39291f;margin-top:10px;padding-top:10px}
      .fourdk-week4-nfl-row b{font-size:20px}.fourdk-week4-nfl-row:last-of-type b{color:#ff6a22}
      .fourdk-week4-nfl-panel p{margin-top:15px;font-size:11px;color:#a9a49e;line-height:1.55}
      .fourdk-week4-secondary{display:inline-block;margin:18px 0 0 8px;border:1px solid #625047;color:#fff!important;padding:11px 15px;text-decoration:none;font-size:10px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      @media(max-width:760px){
        .fourdk-week4-home-inner,.fourdk-week4-nfl-inner{grid-template-columns:1fr}
        .fourdk-week4-score{max-width:300px;text-align:left}
        .fourdk-week4-secondary{margin-left:0;display:table}
      }
    `;
    document.head.appendChild(st);
  }

  if(home && !document.querySelector('[data-week4-tnf-home]')){
    const section=document.createElement('section');
    section.className='fourdk-week4-home';
    section.dataset.week4TnfHome='';
    section.innerHTML=`
      <div class="shell fourdk-week4-home-inner">
        <div>
          <div class="fourdk-week4-kicker">4DK NFL • WEEK 4 • THURSDAY NIGHT RECAP</div>
          <h2>CLEVELAND IS 3–1.<br><em>NOW WHAT?</em></h2>
          <p>Deshaun Watson played winning football, Cleveland sacked Aaron Rodgers five times, and a young core led by Denzel Boston, Quinshon Judkins, KC Concepcion and Harold Fannin Jr. is growing up fast.</p>
          <a class="fourdk-week4-btn" href="${articleUrl}">READ THE FULL TNF RECAP →</a>
        </div>
        <div class="fourdk-week4-score">
          <small>FINAL • TNF</small>
          <strong>CLE 27</strong>
          <span>PIT 24</span>
          <b>BROWNS • 3–1</b>
        </div>
      </div>`;
    const fresh=document.querySelector('.home-refresh-section.home-fresh');
    const latest=document.querySelector('.latest-4dk');
    const hero=document.querySelector('main#main .hero');
    if(fresh)fresh.parentNode.insertBefore(section,fresh);
    else if(latest)latest.after(section);
    else if(hero)hero.after(section);
    else document.querySelector('main#main')?.prepend(section);

    const ticker=document.querySelector('.ticker-track');
    if(ticker && !ticker.textContent.includes('Browns 3–1')){
      const span=document.createElement('span');
      span.innerHTML='<span class="dot">●</span> Browns 3–1 after Week 4 TNF';
      ticker.prepend(span);
    }
  }

  if(key==='nfl' && !document.querySelector('[data-week4-tnf-nfl]')){
    const section=document.createElement('section');
    section.className='fourdk-week4-nfl';
    section.dataset.week4TnfNfl='';
    section.id='tnf-week4';
    section.innerHTML=`
      <div class="shell fourdk-week4-nfl-inner">
        <div>
          <div class="fourdk-week4-kicker">JUST DROPPED • WEEK 4 TNF</div>
          <h2>CLEVELAND IS 3–1.<br><em>IS THIS A PLAYOFF TEAM?</em></h2>
          <p>Watson’s best sustained stretch. Five sacks on Aaron Rodgers. Boston, Judkins, Concepcion, Fannin, Schwesinger and Graham. We go all the way inside Cleveland’s 27–24 win over Pittsburgh.</p>
          <a class="fourdk-week4-btn" href="${articleUrl}">READ THE WEEK 4 RECAP →</a>
          <a class="fourdk-week4-secondary" href="nfl-thursday-recaps.html">TNF ARCHIVE →</a>
        </div>
        <div class="fourdk-week4-nfl-panel">
          <div class="fourdk-week4-kicker">WEEK 4 FINAL</div>
          <div class="fourdk-week4-nfl-row"><span>PITTSBURGH</span><b>24</b></div>
          <div class="fourdk-week4-nfl-row"><span>CLEVELAND</span><b>27</b></div>
          <p>Watson: 268 pass yards • Browns defense: 5 sacks, 2 INT • Szmyt: 56-yard game-winner</p>
        </div>
      </div>`;
    const mvp=document.querySelector('#mvp-watch');
    const scoreboard=document.querySelector('#scoreboard');
    if(mvp)mvp.parentNode.insertBefore(section,mvp);
    else if(scoreboard)scoreboard.after(section);
    else document.querySelector('main#main')?.prepend(section);

    const nav=document.querySelector('.nfl-v2-nav');
    if(nav && !nav.querySelector('a[href="#tnf-week4"]')){
      const a=document.createElement('a');
      a.href='#tnf-week4';
      a.textContent='TNF Recap';
      const active=nav.querySelector('.active');
      if(active)active.after(a);else nav.prepend(a);
    }
    const ticker=document.querySelector('.nfl-ticker-track');
    if(ticker && !ticker.textContent.includes('Browns 3–1')){
      const span=document.createElement('span');
      span.innerHTML='<b>●</b> Browns 3–1: Week 4 TNF recap live';
      ticker.prepend(span);
    }
  }

  if(key==='nfl-thursday-recaps'){
    const grid=document.querySelector('.tnr-grid');
    if(grid && !grid.querySelector(`a[href="${articleUrl}"]`)){
      grid.querySelectorAll('.tnr-card.latest').forEach(card=>card.classList.remove('latest'));
      const card=document.createElement('a');
      card.className='tnr-card latest';
      card.href=articleUrl;
      card.innerHTML=`
        <small>Week 4 • October 1, 2026</small>
        <h3>Cleveland Is 3–1. Now What?</h3>
        <div class="tnr-score">CLE 27 • PIT 24</div>
        <p>Watson played well, Cleveland sacked Rodgers five times, and the Browns’ young core turned a 3–1 start into a real playoff conversation.</p>
        <b>Read the full Thursday recap →</b>`;
      grid.prepend(card);
      [...grid.querySelectorAll('.tnr-coming')].forEach(el=>{
        if(el.textContent.includes('Week 4'))el.remove();
      });
    }
  }
})();
