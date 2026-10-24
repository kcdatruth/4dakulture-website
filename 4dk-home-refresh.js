/* 4 Da Kulture homepage newsroom — safe replacement for 4dk-home-refresh.js.
   Combines existing feeds, never removes articles, retains original editorial cards.
*/
(() => {
  'use strict';
  if (!['', 'index.html'].includes(location.pathname.split('/').pop().toLowerCase())) return;
  const sources = ['4dk-frontdesk-feed.json', '4dk-frontdesk-current.json'];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fileOK = value => typeof value === 'string' && /^[a-z0-9._-]+\.html$/i.test(value);
  const imageOK = value => typeof value === 'string' && /^[a-z0-9._-]+\.(png|jpe?g|webp)$/i.test(value);
  const today = Object.fromEntries(new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date()).map(x => [x.type,x.value]));
  const todayKey = `${today.year}-${today.month}-${today.day}`;
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value+'T12:00:00Z')) && value <= todayKey;
  const prettyDate = value => new Date(value+'T12:00:00Z').toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  const card = x => `<a class="dk-current-card" href="${esc(x.href)}"><span class="dk-current-media">${imageOK(x.image) ? `<img loading="lazy" src="${esc(x.image)}" alt="${esc(x.alt||x.title)}">` : ''}</span><span class="dk-current-copy"><small class="dk-current-category">${esc(x.label||x.category||'4DK FEATURE')}</small><strong class="dk-current-title">${esc(x.title)}</strong><p>${esc(x.deck||'')}</p><b class="dk-current-open">READ THE COMPLETE 4DK FEATURE →</b></span></a>`;
  async function load() {
    const results = await Promise.allSettled(sources.map(async name => {const r=await fetch(name,{cache:'no-store'});if(!r.ok)throw Error(name);return r.json();}));
    const seen = new Set();
    return results.flatMap(r => r.status==='fulfilled' && Array.isArray(r.value) ? r.value : [])
      .filter(x => x && typeof x.title==='string' && fileOK(x.href) && validDate(x.date))
      .sort((a,b) => b.date.localeCompare(a.date) || (Number(b.priority)||0)-(Number(a.priority)||0))
      .filter(x => {if(seen.has(x.href))return false;seen.add(x.href);return true;});
  }
  function render(stories) {
    const desk=document.getElementById('fourdk-daily-desk');
    const mast=desk?.querySelector('.dk-mast');
    if(!mast || !stories.length)return false;
    let current=desk.querySelector('#dk-current-edition');
    if(!current){current=document.createElement('section');current.id='dk-current-edition';current.className='dk-current';mast.insertAdjacentElement('afterend',current);}
    // If an earlier script archived this same element, move it into the current edition position.
    if(current.parentElement !== desk || current.previousElementSibling !== mast)mast.insertAdjacentElement('afterend',current);
    current.innerHTML=`<div class="dk-current-header"><div><span class="dk-current-kicker">CURRENT 4DK EDITION • ${prettyDate(stories[0].date)}</span><h3>THE KULTURE DOESN’T CLOCK OUT.</h3><p>Freshly published 4DK reporting, commentary and culture. Original stories stay in the archive.</p></div><a class="dk-current-all" href="4dk-interactive.html">EXPLORE THE INTERACTIVE WORLD ↗</a></div><div class="dk-current-grid">${stories.slice(0,6).map(card).join('')}</div>`;
    let archive=desk.querySelector('#dk-feed-archive');
    if(!archive){archive=document.createElement('details');archive.id='dk-feed-archive';archive.className='dk-edition-archive';current.insertAdjacentElement('afterend',archive);}
    archive.innerHTML=`<summary>MORE FROM THE 4DK ARCHIVES (${Math.max(0,stories.length-6)}) ▾</summary><div class="dk-current-grid">${stories.slice(6).map(card).join('')}</div>`;
    const original=desk.querySelector('.dk-columns');
    if(original && !original.closest('details')){
      const oldArchive=document.createElement('details');oldArchive.id='dk-original-home-archive';oldArchive.className='dk-edition-archive';
      const summary=document.createElement('summary');summary.textContent='ORIGINAL 4DK HOMEPAGE EDITION ▾';oldArchive.append(summary);
      original.before(oldArchive);oldArchive.append(original);
    }
    const date=desk.querySelector('.dk-date');
    if(date)date.textContent=`LATEST PUBLISHED EDITION: ${prettyDate(stories[0].date)} • ORIGINAL 4DK COVERAGE`;
    return true;
  }
  load().then(stories => {
    if(!stories.length)return;
    render(stories);
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>render(stories),{once:true});
    window.addEventListener('load',()=>render(stories),{once:true});
  }).catch(error => console.warn('4DK newsroom feed unavailable; original homepage retained.',error));
})();
