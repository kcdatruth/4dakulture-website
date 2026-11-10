/* 4DK connected latest: editorial feed, with safe static fallbacks. */
(function(){
  function build(data){
    if(!data||!Array.isArray(data.sections)||document.getElementById('fourdk-connected-latest'))return;
    var safe=function(h){return typeof h==='string'&&/^[a-z0-9][a-z0-9-]*\.html$/.test(h)};
    var section=document.createElement('section');section.id='fourdk-connected-latest';section.setAttribute('aria-label','Latest 4DK coverage');
    var header=document.createElement('div');header.className='fourdk-connected-heading';
    var eyebrow=document.createElement('span');eyebrow.textContent='THE 4DK NETWORK';header.appendChild(eyebrow);
    var title=document.createElement('h2');title.textContent='LATEST ACROSS THE KULTURE';header.appendChild(title);section.appendChild(header);
    var grid=document.createElement('div');grid.className='fourdk-connected-grid';
    data.sections.slice(0,6).forEach(function(item){
      if(!item||!safe(item.url)||!safe(item.hub))return;
      var article=document.createElement('article');article.className='fourdk-connected-card';
      if(typeof item.image==='string' && (item.image==='week9-snf-spotlight.svg'||item.image==='4dk-power-01-okc.jpeg'||item.image==='https://coverartarchive.org/release/a9003c45-896e-3138-a07e-22f56a81847c/front-500')){
        var image=document.createElement('img');image.className='fourdk-connected-image';image.src=item.image;image.alt=String(item.imageAlt||item.title||'4DK feature');image.loading='lazy';image.decoding='async';article.appendChild(image);
      }
      var label=document.createElement('span');label.className='fourdk-connected-label';label.textContent=String(item.label||'4DK FEATURE');article.appendChild(label);
      var h=document.createElement('h3');var link=document.createElement('a');link.className='fourdk-connected-story-link';link.href=item.url;link.textContent=String(item.title||'Read the feature');h.appendChild(link);article.appendChild(h);
      var hub=document.createElement('a');hub.className='fourdk-connected-hub';hub.href=item.hub;hub.textContent=String(item.hubLabel||'Explore more')+' →';article.appendChild(hub);
      article.addEventListener('click',function(event){if(event.target.closest('a'))return;window.location.href=item.url;});
      article.classList.add('fourdk-connected-clickable');
      grid.appendChild(article);
    });
    if(!grid.children.length)return;
    section.appendChild(grid);
    var target=document.querySelector('#fourdk-discovery-rail')||document.querySelector('main');
    if(target&&target.parentNode)target.parentNode.insertBefore(section,target.nextSibling);
  }
  var fallback={sections:[
    {label:'NFL WEEKLY HQ',title:'Week 9 — What We Learned Sunday',url:'nfl-sunday-recap-week9-2026.html',hub:'nfl.html',hubLabel:'NFL Coverage',image:'week9-snf-spotlight.svg',imageAlt:'Chicago Bears versus Tampa Bay Buccaneers — Week 9 Sunday Night Football'},
    {label:'NBA RANKINGS HQ',title:'4DK NBA Power Rankings',url:'nba-power-rankings-2026-27.html',hub:'nba-rankings-hq.html',hubLabel:'Rankings HQ',image:'4dk-power-01-okc.jpeg',imageAlt:'Oklahoma City Thunder in the 4DK NBA Power Rankings'},
    {label:'ALBUM FILES',title:'The Game — The Documentary',url:'album-files-the-documentary.html',hub:'album-files.html',hubLabel:'Album Files Archive',image:'https://coverartarchive.org/release/a9003c45-896e-3138-a07e-22f56a81847c/front-500',imageAlt:'The Game The Documentary album cover'}
  ]};
  function init(){fetch('homepage-latest.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('feed unavailable');return r.json()}).then(build).catch(function(){build(fallback)});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();