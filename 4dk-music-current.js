(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['hiphop.html','hiphop'].includes(page) || window.__fourdkMusicDesk2026) return;
  window.__fourdkMusicDesk2026=true;
  const MARK='music-desk-2026-v1';

  function css(){
    if(document.getElementById('fourdk-music-current-css')) return;
    const s=document.createElement('style');s.id='fourdk-music-current-css';s.textContent=`
      .music-now{position:relative;overflow:hidden;padding:30px 0 34px;background:radial-gradient(circle at 88% 15%,rgba(239,74,56,.17),transparent 24rem),linear-gradient(180deg,#0b0e11,#080a0c);color:#f5f0e8;border-bottom:1px solid #2d3338}
      .music-now:after{content:'NOW';position:absolute;right:-12px;bottom:-36px;font:1000 clamp(100px,18vw,210px)/.8 Impact,Arial Black,sans-serif;color:#fff;opacity:.02;letter-spacing:-.08em}
      .music-now .shell{position:relative;z-index:2}
      .music-now-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:14px}
      .music-now-head small{display:block;color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}
      .music-now-head h2{margin:6px 0 0;font:1000 clamp(35px,5vw,60px)/.88 Impact,Arial Black,sans-serif;text-transform:uppercase;letter-spacing:-.04em}
      .music-now-head span{color:#d8b45d;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .music-now-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
      .music-now-card{min-height:185px;padding:17px;border:1px solid #30363b;background:#101419;color:#f5f0e8!important;text-decoration:none!important;display:flex;flex-direction:column}
      .music-now-card.red{border-top:4px solid #ef4a38}.music-now-card.gold{border-top:4px solid #d8b45d}.music-now-card.gray{border-top:4px solid #6f777d}
      .music-now-card small{color:#ef6550;font-size:8px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}
      .music-now-card b{display:block;margin:9px 0;font:700 21px/1.05 Georgia,serif}
      .music-now-card p{margin:auto 0 0;color:#979fa4;font-size:11px;line-height:1.45}
      .music-franchise-grid a{color:inherit;text-decoration:none}
      .music-rotation-clean{padding:56px 0;background:#0e1114;color:#f5f0e8}
      .music-rotation-clean-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:20px}
      .music-rotation-clean-head span{color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .music-rotation-clean-head h2{margin:7px 0 0;font:1000 clamp(42px,6vw,72px)/.86 Impact,Arial Black,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .music-rotation-clean-head p{max-width:430px;margin:0;color:#949ca1;font-size:12px;line-height:1.5}
      .music-rotation-featured{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
      .music-rotation-featured article{border:1px solid #30363b;background:#111419;overflow:hidden}
      .music-rotation-featured header{padding:14px 16px}.music-rotation-featured small{color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}.music-rotation-featured h3{margin:5px 0 0;font:700 23px/1 Georgia,serif}
      .music-rotation-cta{display:inline-block;margin-top:18px;padding:12px 14px;border:1px solid #3e454a;color:#fff!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      @media(max-width:900px){.music-now-grid{display:flex!important;overflow-x:auto!important;gap:9px;padding:0 18px 10px 0;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}.music-now-card{flex:0 0 min(82vw,330px);width:min(82vw,330px);min-height:220px;scroll-snap-align:start}}
      @media(max-width:700px){.music-now-head,.music-rotation-clean-head{align-items:flex-start;flex-direction:column}.music-rotation-featured{grid-template-columns:1fr}}
    `;document.head.appendChild(s);
  }

  function addNow(){
    if(document.getElementById('music-now')) return;
    const cover=document.querySelector('.music-cover'); if(!cover) return;
    const sec=document.createElement('section');sec.id='music-now';sec.className='music-now';
    sec.innerHTML=`<div class="shell"><div class="music-now-head"><div><small>4DK MUSIC • RIGHT NOW</small><h2>RIGHT NOW ON 4DK MUSIC.</h2></div><span>SWIPE THE DESK →</span></div><div class="music-now-grid">
      <a class="music-now-card red" href="tha-carter-ii-when-wayne-became-wayne.html"><small>4DK CLASSICS • LATEST</small><b>Tha Carter II: When Wayne Became Wayne</b><p>The 9.6/10 deep dive into the album that launched the next phase of Wayne's run.</p></a>
      <a class="music-now-card gold" href="hiphop-jay-z-blueprint-25-years-later.html"><small>HOV WEDNESDAYS</small><b>The Blueprint at 25</b><p>Jay at his peak, timeless production and the album that still sits at the top of his catalog.</p></a>
      <a class="music-now-card gray" href="top-26-rappers-2000-2026.html"><small>FINAL 4DK RANKING</small><b>The 26 Best Rappers of 2000–2026</b><p>Wayne gets the crown. Kendrick, Nas, Jay and Drake complete the five.</p></a>
      <a class="music-now-card red" href="album-draft.html"><small>INTERACTIVE</small><b>$15 Album Draft</b><p>Five projects. One budget. Build the ultimate hip-hop collection.</p></a>
      <a class="music-now-card gold" href="4dk-rotation.html"><small>4DK ROTATION</small><b>What We're Playing</b><p>210West, regional classics, R&B, neo-soul, personal mixes and current rotation.</p></a>
      <a class="music-now-card gray" href="music-franchises.html"><small>THE FRANCHISES</small><b>Six Series Built to Keep Growing</b><p>Classics, HOV Wednesdays, Next Up, Verzuz Archive, Regional Rankings and Rewind.</p></a>
    </div></div>`;
    cover.after(sec);
  }

  function relinkFranchises(){
    const root=document.querySelector('#franchises .franchise-grid'); if(!root || root.dataset.live===MARK) return;
    root.dataset.live=MARK;
    const cards=[...root.querySelectorAll('.franchise-card')];
    const data=[
      ['classic-albums.html','4DK CLASSICS'],
      ['hov-wednesdays.html','HOV WEDNESDAYS'],
      ['next-up.html','NEXT UP'],
      ['verzuz-archive.html','VERZUZ ARCHIVE'],
      ['#regional-rankings','REGIONAL RANKINGS'],
      ['music-rewind.html','4DK REWIND']
    ];
    cards.forEach((card,i)=>{
      const d=data[i]; if(!d) return;
      const a=document.createElement('a');
      a.href=d[0];a.className='franchise-card';a.innerHTML=card.innerHTML;
      card.replaceWith(a);
    });
    const head=document.querySelector('#franchises .franchise-header');
    if(head && !head.querySelector('a[href="music-franchises.html"]')){
      const a=document.createElement('a');a.href='music-franchises.html';a.textContent='OPEN ALL FRANCHISES →';
      a.style.cssText='display:inline-block;margin-top:12px;color:#d8b45d;font-size:8px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase';
      head.appendChild(a);
    }
  }

  function deskLinks(){
    const desk=document.querySelector('#music-desk'); if(!desk || desk.dataset.live===MARK) return;
    desk.dataset.live=MARK;
    const cards=[...desk.querySelectorAll('.music-desk-card')];
    if(cards[1]) cards[1].href='4dk-rotation.html';
    if(cards[2]) cards[2].href='classic-albums.html';
    if(cards[3]) cards[3].href='hov-wednesdays.html';
  }

  function cleanRotation(){
    const old=document.querySelector('#spotify-shelf'); if(!old || old.dataset.cleaned===MARK) return;
    old.dataset.cleaned=MARK;
    const sec=document.createElement('section');sec.className='music-rotation-clean';sec.id='spotify-shelf-clean';
    sec.innerHTML=`<div class="shell"><div class="music-rotation-clean-head"><div><span>4DK ROTATION</span><h2>WHAT WE'RE PLAYING.</h2></div><p>The homepage keeps the essentials. The full playlist library and the Core Five now live on their own Rotation page.</p></div>
      <div class="music-rotation-featured">
        <article><header><small>4DK ARTIST • ALWAYS UPDATING</small><h3>210West Playlist</h3></header><iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO0RcJqi?utm_source=generator" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></article>
        <article><header><small>CURRENT ROTATION</small><h3>Today in Hip-Hop</h3></header><iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></article>
      </div><a class="music-rotation-cta" href="4dk-rotation.html">OPEN THE FULL 4DK ROTATION →</a></div>`;
    old.replaceWith(sec);
  }

  function nav(){
    const nav=document.querySelector('.music-cover-nav'); if(!nav || nav.dataset.live===MARK) return;
    nav.dataset.live=MARK;
    nav.innerHTML=`<a href="#music-now">Right Now</a><a href="#regional-rankings">Regional Rankings</a><a href="music-franchises.html">4DK Franchises</a><a href="4dk-rotation.html">4DK Rotation</a><a href="#prolific">Featured Album</a>`;
  }

  function apply(){css();addNow();nav();deskLinks();relinkFranchises();cleanRotation()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [150,450,1000,2200].forEach(ms=>setTimeout(apply,ms));
})();