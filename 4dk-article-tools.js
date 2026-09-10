(() => {
  const articleMeta=document.querySelector('meta[property="og:type"][content="article"]');
  if(!articleMeta || document.querySelector('.article-tools')) return;

  const path=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const title=(document.querySelector('meta[property="og:title"]')?.content || document.querySelector('h1')?.textContent || document.title).trim();
  const canonical=document.querySelector('link[rel="canonical"]')?.href || location.href;

  const sectionMap=[
    {test:/top-26|rappers|hiphop|music/i,label:'4DK MUSIC',url:'hiphop.html'},
    {test:/nfl|football|gridiron/i,label:'4DK NFL',url:'nfl.html'},
    {test:/movie|screen|tv/i,label:'4DK SCREEN',url:'movies.html'},
    {test:/throwback|archive|rewind/i,label:'4DK ARCHIVE',url:'throwback.html'},
    {test:/nba|westbrook|giannis|milwaukee|minnesota|kawhi|basketball/i,label:'4DK NBA',url:'nba.html'}
  ];
  const section=sectionMap.find(x=>x.test.test(path)) || {label:'4 DA KULTURE',url:'index.html'};

  const authorAnchor=[
    ...document.querySelectorAll(
      '.byline a[href*="kcdatruth"],.meta a[href*="kcdatruth"],.byline a[href*="210west"],.meta a[href*="210west"]'
    )
  ][0];

  let author='Kcdatruth';
  let authorUrl='kcdatruth.html';
  let authorRole='Writer • Host';
  let initials='KC';

  if(authorAnchor){
    const href=authorAnchor.getAttribute('href') || '';
    if(href.includes('210west')){
      author='210West';
      authorUrl='210west.html';
      authorRole='Contributor • Co-host';
      initials='210';
    }else{
      author=(authorAnchor.textContent || 'Kcdatruth').trim().replace(/^By\s+/i,'') || 'Kcdatruth';
    }
  }

  const publishedMeta=document.querySelector('meta[property="article:published_time"]')?.content;
  let published='';
  if(publishedMeta){
    const d=new Date(`${publishedMeta}T12:00:00`);
    if(!Number.isNaN(d.getTime())){
      published=d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    }
  }
  if(!published){
    const text=[...document.querySelectorAll('.byline,.meta')].map(el=>el.textContent).join(' ');
    const match=text.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/i);
    if(match) published=match[0];
  }

  const storyRoot=
    document.querySelector('.article-story') ||
    document.querySelector('.final-article') ||
    document.querySelector('main article') ||
    document.querySelector('main');

  const storyText=(storyRoot?.innerText || '').replace(/\s+/g,' ').trim();
  const words=storyText ? storyText.split(' ').filter(Boolean).length : 0;
  const readMinutes=Math.max(1,Math.ceil(words/220));

  const tools=document.createElement('section');
  tools.className='article-tools';
  tools.setAttribute('aria-label','Article information and sharing');
  tools.innerHTML=`
    <div class="shell article-tools-inner">
      <a class="article-author-card" href="${authorUrl}">
        <span class="article-author-mark">${initials}</span>
        <span class="article-author-copy">
          <small>Written by</small>
          <strong>${author}</strong>
          <em>${authorRole}</em>
        </span>
        <span class="article-author-arrow">→</span>
      </a>

      <div class="article-meta-dock">
        <a href="${section.url}">${section.label}</a>
        ${published ? `<span>${published}</span>` : ''}
        <span>${readMinutes} MIN READ</span>
      </div>

      <div class="article-share-actions">
        <button type="button" class="article-share-btn article-native-share">SHARE</button>
        <a class="article-share-btn" target="_blank" rel="noopener noreferrer"
           href="https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonical)}">𝕏</a>
        <button type="button" class="article-share-btn article-copy-link">COPY LINK</button>
      </div>
    </div>
  `;

  const hero=
    document.querySelector('.final-hero') ||
    document.querySelector('.article-hero') ||
    document.querySelector('main > section:first-child');

  if(hero) hero.insertAdjacentElement('afterend',tools);
  else document.querySelector('main')?.prepend(tools);

  const shareBtn=tools.querySelector('.article-native-share');
  const copyBtn=tools.querySelector('.article-copy-link');

  shareBtn?.addEventListener('click',async()=>{
    if(navigator.share){
      try{
        await navigator.share({title,text:title,url:canonical});
      }catch(e){}
    }else{
      try{
        await navigator.clipboard.writeText(canonical);
        shareBtn.textContent='COPIED ✓';
        setTimeout(()=>shareBtn.textContent='SHARE',1600);
      }catch(e){}
    }
  });

  copyBtn?.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(canonical);
      copyBtn.textContent='COPIED ✓';
      copyBtn.classList.add('is-copied');
      setTimeout(()=>{
        copyBtn.textContent='COPY LINK';
        copyBtn.classList.remove('is-copied');
      },1600);
    }catch(e){
      const temp=document.createElement('textarea');
      temp.value=canonical;
      temp.style.position='fixed';
      temp.style.opacity='0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
      copyBtn.textContent='COPIED ✓';
      setTimeout(()=>copyBtn.textContent='COPY LINK',1600);
    }
  });

  // 4DK Reader Reactions
  if(!document.querySelector('link[href="4dk-reactions.css"]')){
    const reactionStyles=document.createElement('link');
    reactionStyles.rel='stylesheet';
    reactionStyles.href='4dk-reactions.css';
    document.head.appendChild(reactionStyles);
  }
  if(!document.querySelector('script[src="4dk-reactions.js"]')){
    const reactionScript=document.createElement('script');
    reactionScript.src='4dk-reactions.js';
    reactionScript.defer=true;
    document.body.appendChild(reactionScript);
  }
})();