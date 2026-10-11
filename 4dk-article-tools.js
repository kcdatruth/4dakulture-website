(() => {
  const articleMeta=document.querySelector('meta[property="og:type"][content="article"]');
  if(!articleMeta || document.querySelector('.article-tools')) return;

  const path=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
  const title=(document.querySelector('meta[property="og:title"]')?.content || document.querySelector('h1')?.textContent || document.title).trim();
  const canonical=document.querySelector('link[rel="canonical"]')?.href || location.href;

  const sectionMap=[
    {test:/top-26|rappers|hiphop|music/i,label:'4DK MUSIC',url:'hiphop.html'},
    {test:/nfl|football|gridiron/i,label:'4DK NFL',url:'nfl.html'},
    {test:/movie|screen|tv|snowfall|drop/i,label:'4DK SCREEN',url:'movies.html'},
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

  const shareText=`${title} — 4 Da Kulture`;
  const encodedTitle=encodeURIComponent(shareText);
  const encodedUrl=encodeURIComponent(canonical);
  const encodedWhatsApp=encodeURIComponent(`${shareText}\n${canonical}`);

  const iconShare=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.83-4 3 3 0 0 0 .18 1L8.91 8.22a3 3 0 0 0-4.08-.15A3 3 0 1 0 8.9 12.4l6.45 3.22A3 3 0 0 0 15 17a3 3 0 1 0 .83-2.06L9.4 11.72a3.1 3.1 0 0 0 0-1.44l6.43-3.22A3 3 0 0 0 18 8Z"/></svg>`;
  const iconX=`<span class="share-x-glyph" aria-hidden="true">𝕏</span>`;
  const iconFacebook=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.52-1.46H17V4a23 23 0 0 0-2.35-.12c-2.33 0-3.92 1.42-3.92 4.03V10H8v3h2.73v8h2.97Z"/></svg>`;
  const iconWhatsApp=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.9 4.1A10.8 10.8 0 0 0 3 17.1L1.6 22l5-1.3A10.8 10.8 0 0 0 22 11c0-2.6-.9-5-2.1-6.9Zm-8.7 15a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6.1c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.12-.17.26-.65.82-.8.99-.15.17-.3.19-.55.06-1.48-.74-2.45-1.32-3.43-3-.26-.45.26-.42.74-1.39.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.49-.42-.43-.57-.44h-.49c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12 0 1.25.91 2.45 1.04 2.62.12.17 1.79 2.73 4.34 3.83.61.26 1.08.42 1.45.54.61.19 1.16.17 1.6.1.49-.08 1.48-.61 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.3Z"/></svg>`;
  const iconLink=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.59 13.41a2 2 0 0 0 2.82 0l3-3a2 2 0 1 0-2.82-2.82l-1.3 1.29-1.41-1.41 1.3-1.3a4 4 0 1 1 5.65 5.66l-3 3a4 4 0 0 1-5.66 0l-.7-.71 1.41-1.41.71.7Zm2.82-2.82a2 2 0 0 0-2.82 0l-3 3a2 2 0 1 0 2.82 2.82l1.3-1.29 1.41 1.41-1.3 1.3a4 4 0 1 1-5.65-5.66l3-3a4 4 0 0 1 5.66 0l.7.71-1.41 1.41-.71-.7Z"/></svg>`;

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

      <div class="article-share-block">
        <span class="article-share-label">SHARE THIS STORY</span>
        <div class="article-share-actions">
          <button type="button" class="article-share-btn article-native-share" aria-label="Share this story">
            <span class="share-icon">${iconShare}</span><span class="share-text">SHARE</span>
          </button>
          <a class="article-share-btn share-x" target="_blank" rel="noopener noreferrer"
             href="https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}" aria-label="Share on X">
            <span class="share-icon">${iconX}</span><span class="share-text">X</span>
          </a>
          <a class="article-share-btn share-facebook" target="_blank" rel="noopener noreferrer"
             href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" aria-label="Share on Facebook">
            <span class="share-icon">${iconFacebook}</span><span class="share-text">FACEBOOK</span>
          </a>
          <a class="article-share-btn share-whatsapp" target="_blank" rel="noopener noreferrer"
             href="https://wa.me/?text=${encodedWhatsApp}" aria-label="Share on WhatsApp">
            <span class="share-icon">${iconWhatsApp}</span><span class="share-text">WHATSAPP</span>
          </a>
          <button type="button" class="article-share-btn article-copy-link" aria-label="Copy article link">
            <span class="share-icon">${iconLink}</span><span class="share-text">COPY</span>
          </button>
        </div>
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

  function setButtonMessage(button,message,restore){
    const text=button?.querySelector('.share-text');
    if(!text) return;
    text.textContent=message;
    button.classList.add('is-copied');
    setTimeout(()=>{
      text.textContent=restore;
      button.classList.remove('is-copied');
    },1600);
  }

  shareBtn?.addEventListener('click',async()=>{
    if(navigator.share){
      try{
        await navigator.share({title,text:shareText,url:canonical});
      }catch(e){}
    }else{
      try{
        await navigator.clipboard.writeText(canonical);
        setButtonMessage(shareBtn,'COPIED ✓','SHARE');
      }catch(e){}
    }
  });

  copyBtn?.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(canonical);
      setButtonMessage(copyBtn,'COPIED ✓','COPY');
    }catch(e){
      const temp=document.createElement('textarea');
      temp.value=canonical;
      temp.style.position='fixed';
      temp.style.opacity='0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
      setButtonMessage(copyBtn,'COPIED ✓','COPY');
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

// 4DK Week 4 TNF current-story layer. Add-only: homepage, NFL page and Thursday archive.
if(!document.querySelector('script[src="4dk-week4-tnf-update.js"]')){
  const week4TnfScript=document.createElement('script');
  week4TnfScript.src='4dk-week4-tnf-update.js';
  week4TnfScript.defer=true;
  document.body.appendChild(week4TnfScript);
}

// 4DK 2026 rookie cover — additive, site-wide loader.
if(!document.querySelector('script[src="4dk-rookie-cover-2026.js"]')) {
  const rookieArtScript=document.createElement('script');
  rookieArtScript.src='4dk-rookie-cover-2026.js';
  rookieArtScript.defer=true;
  document.body.appendChild(rookieArtScript);
}

// 4DK NFL Week 5 front page and expandable legacy archive (October 10, 2026).
if (/\/nfl(?:\.html)?\/?$/i.test(location.pathname) &&
    !document.querySelector('script[data-dk5-refresh-loader]')) {
  const script = document.createElement('script');
  script.dataset.dk5RefreshLoader = 'v5';
  script.src = '4dk-nfl-week5-refresh.js?v=20261010-feature5';
  script.defer = true;
  document.body.appendChild(script);
}

// 4DK REGIONAL ARTICLE MAGAZINE: inject a linked reading shelf on the exact 12 original rankings.
// Original order, analysis, hero graphics, and article content remain in their existing HTML files.
(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  const regions={
    west:{name:'WEST COAST',label:'THE WEST',headline:'THE WEST<br><em>STILL MOVES.</em>',description:'From the L.A. streets to Bay Area independence. Three original arguments, one regional legacy.',color:'#dd6849',labelLong:'West Coast',art:[['doggystyle.jpg','Doggystyle — Snoop Dogg','DOGGYSTYLE'],['the-chronic.jpg','The Chronic — Dr. Dre','THE CHRONIC'],['me-against-the-world.jpg','Me Against the World — 2Pac','ME AGAINST THE WORLD']],paths:['top-26-west-coast-rappers-since-2000.html','top-20-west-coast-rappers-all-time.html','top-25-west-coast-albums-all-time.html']},
    south:{name:'THE SOUTH',label:'THE SOUTH',headline:'THE SOUTH<br><em>WROTE THE RULES.</em>',description:'New Orleans. Houston. Atlanta. Memphis. The artists and records that changed hip-hop’s center of gravity.',color:'#d4af6e',labelLong:'The South',art:[['south-scarface-the-diary.jpg','The Diary — Scarface','THE DIARY'],['south-outkast-southernplayalistic.jpg','Southernplayalisticadillacmuzik — OutKast','SOUTHERNPLAYALISTIC'],['south-ugk-ridin-dirty.jpg','Ridin’ Dirty — UGK','RIDIN’ DIRTY']],paths:['top-26-southern-rappers-since-2000.html','top-20-southern-rappers-all-time.html','top-25-southern-albums-all-time.html']},
    east:{name:'EAST COAST',label:'THE EAST',headline:'THE EAST<br><em>SET THE BAR.</em>',description:'From the five boroughs to Philly and beyond: cornerstone albums, lyricists and legacies.',color:'#c18ba9',labelLong:'East Coast',art:[['blueprint-cover.jpg','The Blueprint — Jay-Z','THE BLUEPRINT'],['east-08-cuban-linx.jpg','Only Built 4 Cuban Linx… — Raekwon','CUBAN LINX'],['east-13-muddy-waters.jpg','Muddy Waters — Redman','MUDDY WATERS']],paths:['top-26-east-coast-rappers-2000-2026.html','top-20-east-coast-rappers-all-time.html','top-25-east-coast-albums-all-time.html']},
    midwest:{name:'MIDWEST',label:'THE MIDWEST',headline:'THE MIDWEST<br><em>HAS RANGE.</em>',description:'Chicago soul, Detroit bars, Cleveland melodies, St. Louis anthems. A region that never needed one sound.',color:'#9bafc0',labelLong:'Midwest',art:[['','Late Registration — Kanye West','LATE REGISTRATION'],['','The Marshall Mathers LP — Eminem','MARSHALL MATHERS LP'],['','Like Water for Chocolate — Common','LIKE WATER FOR CHOCOLATE']],paths:['top-26-midwest-rappers-2000-2026.html','top-20-midwest-rappers-all-time.html','top-25-midwest-albums-all-time.html']}
  };
  const types=[{short:'MODERN ERA',title:'26 BEST SINCE 2000',size:'26'}, {short:'ALL-TIME MCs',title:'20 GREATEST RAPPERS',size:'20'}, {short:'CLASSIC ALBUMS',title:'25 GREATEST ALBUMS',size:'25'}];
  let current=null;
  for(const [key,region] of Object.entries(regions)){
    const idx=region.paths.indexOf(page);
    if(idx!==-1){current={key,region,idx};break;}
  }
  if(!current||window.__fourdkRegionalCompanionV1)return;
  window.__fourdkRegionalCompanionV1=true;
  function cardArt(item){
    const [src,alt,caption]=item;
    if(!src)return `<div class="fdr-sleeve fdr-type-art" role="img" aria-label="${alt}"><b>${caption}</b></div>`;
    return `<div class="fdr-sleeve has-art"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"><span class="fdr-art-caption">${caption}</span></div>`;
  }
  function install(){
    if(document.querySelector('.fourdk-regional-companion'))return;
    const main=document.querySelector('main');
    if(!main)return;
    document.body.classList.add('fourdk-regional-enhanced');
    if(!document.querySelector('link[data-fourdk-regional-magazine-css]')){
      const link=document.createElement('link');link.rel='stylesheet';link.href='4dk-regional-article-magazine.css?v=20261011a';link.dataset.fourdkRegionalMagazineCss='1';document.head.appendChild(link);
    }
    const {key,region,idx}=current;
    const section=document.createElement('section');
    section.className='fourdk-regional-companion';
    section.style.setProperty('--fourdk-r-accent',region.color);
    section.setAttribute('aria-label','Explore other 4DK regional hip-hop rankings');
    section.innerHTML=`
      <div class="fdr-wrap">
        <div class="fdr-kicker"><span class="fdr-eyebrow">4 DA KULTURE • THE REGIONAL ISSUE • ${types[idx].short}</span><a class="fdr-back" href="music-regional-rankings.html">ALL FOUR REGIONS ↗</a></div>
        <div class="fdr-layout">
          <div><div class="fdr-title-tag">THE ${region.name} COLLECTION · 4DK ORIGINALS</div><h2 class="fdr-main-title">${region.headline}</h2><p class="fdr-copy">${region.description}</p><div class="fdr-metadata"><span>4DK ORIGINAL COVERAGE</span><span>03 PUBLISHED RANKINGS</span><span>REGION / ${key.toUpperCase()}</span></div></div>
          <div class="fdr-vinyl-shelf" aria-label="Album sleeves from the ${region.name} archive"><div class="fdr-shelf-top"><span>THE RECORD SHELF</span><span>4DK / ${region.name}</span></div><div class="fdr-sleeves">${region.art.map(cardArt).join('')}</div><div class="fdr-shelf-foot">Three records from the regional conversation · Not ranked in this display</div></div>
        </div>
        <div class="fdr-toolbar"><div class="fdr-toolbar-head"><strong>KEEP READING THIS REGION</strong><span>Current article is highlighted below</span></div><nav class="fdr-type-grid" aria-label="Other ${region.name} rankings">${types.map((t,i)=>`<a href="${region.paths[i]}" ${i===idx?'aria-current="page"':''}><small>${t.short} · ${t.size}</small><b>${t.title}</b>${i===idx?'<span class="fdr-active-mark">YOU ARE HERE ✓</span>':'<span class="fdr-active-mark">READ THE LIST ↗</span>'}</a>`).join('')}</nav></div>
        <nav class="fdr-region-footer" aria-label="Switch between hip-hop regions"><span>SWITCH REGIONS</span>${Object.entries(regions).map(([otherKey,otherRegion])=>`<a href="${otherRegion.paths[idx]}" ${otherKey===key?'aria-current="true"':''}>${otherRegion.name}</a>`).join('')}</nav>
      </div>`;
    const firstHero=main.querySelector(':scope > section');
    if(firstHero)firstHero.insertAdjacentElement('afterend',section);
    else main.prepend(section);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
