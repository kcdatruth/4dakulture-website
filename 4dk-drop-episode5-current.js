(() => {
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const isSnow=page==='snowfall.html' || page==='snowfall';
  const isHome=page==='index.html' || page==='' || page==='/';
  if(!isSnow && !isHome) return;
  if(window.__fourdkDropEpisode5Current) return;
  window.__fourdkDropEpisode5Current=true;

  const MARK='drop-episode5-current-v2';
  let timer=0;

  function updateSnowfall(){
    if(!isSnow) return;

    const feature=document.querySelector('#drop .drop-feature');
    if(feature && feature.dataset.ep5!==MARK){
      feature.dataset.ep5=MARK;
      feature.href='the-drop-episode-5.html';

      const art=feature.querySelector('.drop-art');
      if(art){
        art.innerHTML='<span>EPISODE 5 • NEWEST RECAP</span><strong>THE<br>TRUTH<br>COMES OUT</strong><small>MAMA G • ROCHELLE • MAURICE • WANDA • LAMAR</small>';
      }

      const copy=feature.querySelector('.drop-copy');
      if(copy){
        copy.innerHTML=`
          <div class="drop-live"><i></i> NEWEST RECAP • LIVE</div>
          <span>THE TRUTH LAMAR WAS NEVER SUPPOSED TO KNOW</span>
          <h3>The Family Secret Finally Changes Everything</h3>
          <p>Episode 5 opens the door on Rochelle and Maurice, gives Mama G’s fear and guilt real context, and forces Lamar to meet the people his parents were beyond the memories he grew up with.</p>
          <p>Wanda finally pushes back on Mama G, James’ protectiveness hits differently, and the truth about the family’s past may give Lamar an even bigger reason to keep chasing music.</p>
          <div class="drop-music-note">FAMILY FILE — The silence was supposed to protect Lamar. Instead, the truth reframes Mama G, James, Wanda, Rochelle, Maurice and the music dream itself.</div>
          <span class="drop-read">READ THE FULL EPISODE 5 RECAP →</span>`;
      }
    }

    const archive=document.querySelector('#drop .weekly-format');
    if(archive){
      archive.style.gridTemplateColumns='repeat(5,1fr)';

      const ep4=[...archive.querySelectorAll('a')].find(a=>a.getAttribute('href')==='the-drop-episode-4-recap.html');
      if(ep4){
        const small=ep4.querySelector('small');
        if(small) small.textContent='ARCHIVE • READ →';
      }

      if(!archive.querySelector('a[href="the-drop-episode-5.html"]')){
        const a=document.createElement('a');
        a.href='the-drop-episode-5.html';
        a.innerHTML='<span>05</span><strong>THE TRUTH COMES OUT</strong><small>NEWEST • READ →</small>';
        archive.appendChild(a);
      }
    }

    const featured=document.querySelector('#board .board-card.featured a');
    if(featured && featured.dataset.ep5!==MARK){
      featured.dataset.ep5=MARK;
      featured.href='the-drop-episode-5.html';
      const h=featured.querySelector('h3');
      const p=featured.querySelector('p');
      const b=featured.querySelector('b');
      if(h) h.textContent='Episodes 1–5: The Archive Is Live';
      if(p) p.innerHTML='Start with the premiere or jump straight to Episode 5: Mama G’s past, Rochelle and Maurice, Wanda’s confrontation and the truth Lamar was never supposed to know.';
      if(b) b.textContent='OPEN THE NEWEST RECAP →';
    }
  }

  function updateHome(){
    if(!isHome) return;

    const updated=document.querySelector('.home-latest-updated');
    if(updated && /UPDATED/i.test(updated.textContent||'')){
      updated.textContent='UPDATED • OCT. 7, 2026';
    }

    const side=document.querySelector('.home-latest-side');
    if(!side) return;

    let card=[...side.querySelectorAll('.home-latest-card')].find(a=>{
      const href=a.getAttribute('href')||'';
      return href.includes('the-drop-episode-4') || href.includes('the-drop-episode-5');
    });

    if(!card) return;
    if(card.dataset.ep5===MARK) return;
    card.dataset.ep5=MARK;
    card.href='the-drop-episode-5.html';

    const media=card.querySelector('.home-latest-card-media');
    if(media){
      media.classList.add('screen');
      media.innerHTML='';
    }

    const copy=card.querySelector('.home-latest-card-copy');
    if(copy){
      copy.innerHTML=`
        <small>4DK SCREEN • THE DROP • NEWEST</small>
        <h3>Episode 5: The Truth Lamar Was Never Supposed to Know</h3>
        <p>Mama G’s past, Rochelle and Maurice, Wanda’s confrontation and the family secret finally come into focus.</p>
        <b>Read the recap →</b>`;
    }
  }

  function addStyles(){
    if(document.getElementById('fourdk-drop-ep5-css')) return;
    const s=document.createElement('style');
    s.id='fourdk-drop-ep5-css';
    s.textContent=`
      #drop .drop-copy > .drop-read{
        color:#fff!important;
        display:inline-flex!important;
        width:auto!important;
        max-width:100%!important;
        align-self:flex-start!important;
      }
      @media(max-width:880px){
        #drop .weekly-format{grid-template-columns:1fr 1fr!important}
      }
      @media(max-width:560px){
        #drop .weekly-format{grid-template-columns:1fr!important}
      }
    `;
    document.head.appendChild(s);
  }

  function apply(){
    addStyles();
    updateSnowfall();
    updateHome();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }

  [100,350,800,1500,2800,5000,8500].forEach(ms=>setTimeout(apply,ms));

  const observer=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(apply,90);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();