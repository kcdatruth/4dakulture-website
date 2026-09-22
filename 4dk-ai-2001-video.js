(() => {
  const path=(location.pathname || '/').toLowerCase();
  const isAI2001=path.endsWith('/the-answer-files-004-it-was-his-time.html');
  if(!isAI2001 || window.__fourdkAI2001Video) return;
  window.__fourdkAI2001Video=true;

  const VIDEO_ID='zgkSkPRRtJQ';

  function addStyles(){
    if(document.getElementById('fourdk-story-video-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-story-video-styles';
    style.textContent=`
      .fourdk-story-video{
        margin:34px 0;
        overflow:hidden;
        border:1px solid rgba(255,255,255,.14);
        border-top:4px solid #d7a92e;
        background:#0a0f18;
        box-shadow:0 18px 45px rgba(0,0,0,.22);
      }
      .fourdk-story-video-head{
        padding:16px 18px;
        border-bottom:1px solid rgba(255,255,255,.12);
        background:linear-gradient(90deg,rgba(215,169,46,.12),rgba(35,78,145,.09),transparent);
      }
      .fourdk-story-video-head small{
        display:block;
        color:#e8bd4a;
        font-size:8px;
        font-weight:1000;
        letter-spacing:.13em;
        text-transform:uppercase;
      }
      .fourdk-story-video-head b{
        display:block;
        margin-top:6px;
        color:#fff;
        font:1000 clamp(22px,3.6vw,34px)/.96 Arial Black,Impact,sans-serif;
        letter-spacing:-.035em;
        text-transform:uppercase;
      }
      .fourdk-story-video-embed{
        position:relative;
        width:100%;
        aspect-ratio:16/9;
        background:#000;
      }
      .fourdk-story-video-embed iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
      }
      .fourdk-story-video-caption{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:14px;
        padding:12px 16px;
        color:#9da8b8;
        font-size:9px;
        line-height:1.45;
      }
      .fourdk-story-video-caption a{
        color:#e8bd4a!important;
        text-decoration:none!important;
        font-weight:1000;
        letter-spacing:.08em;
        text-transform:uppercase;
        white-space:nowrap;
      }
      @media(max-width:560px){
        .fourdk-story-video{margin:28px 0}
        .fourdk-story-video-caption{align-items:flex-start;flex-direction:column}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    if(document.querySelector(`iframe[src*="${VIDEO_ID}"]`)) return true;

    const article=document.querySelector('.a4-copy');
    if(!article) return false;

    const headings=[...article.querySelectorAll('h2')];
    const allStarHeading=headings.find(h=>
      /05\./.test(h.textContent || '') &&
      /ALL-STAR GAME/i.test(h.textContent || '')
    );

    const block=document.createElement('section');
    block.className='fourdk-story-video';
    block.setAttribute('aria-label','4DK Watch the Tape: Allen Iverson 2000-01 season highlights');
    block.innerHTML=`
      <div class="fourdk-story-video-head">
        <small>4DK WATCH THE TAPE • 2000–01 MVP SEASON</small>
        <b>ALLEN IVERSON • IT WAS HIS TIME.</b>
      </div>
      <div class="fourdk-story-video-embed">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}"
          title="Allen Iverson 2000-01 season highlights"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
      <div class="fourdk-story-video-caption">
        <span>Watch the 2000–01 tape after the scoring, sleeve and MVP-era setup — then continue into the All-Star Game and full 4DK breakdown.</span>
        <a href="https://youtu.be/${VIDEO_ID}" target="_blank" rel="noopener">YouTube →</a>
      </div>`;

    if(allStarHeading){
      allStarHeading.insertAdjacentElement('beforebegin',block);
    }else{
      const openingPull=article.querySelector('.a4-pull');
      if(openingPull) openingPull.insertAdjacentElement('afterend',block);
      else article.prepend(block);
    }
    return true;
  }

  addStyles();
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }

  [300,800,1500,2800].forEach(ms=>setTimeout(install,ms));
})();