/* 4DK homepage presentation cleanup: non-destructive archive wrapper.
   Does not edit article feeds, story cards, images, or existing content. */
(() => {
  'use strict';
  const page = location.pathname.split('/').pop().toLowerCase();
  if (page && page !== 'index.html') return;
  const archiveId = 'fourdk-original-frontdesk-archive';
  const styleId = 'fourdk-frontdesk-cleanup-style';
  function run() {
    // Do not archive anything unless the approved main newsroom is visible.
    const newsroomHeading = Array.from(document.querySelectorAll('h1,h2,h3'))
      .find(el => /straight\s+from\s+the\s+desk/i.test(el.textContent || ''));
    if (!newsroomHeading) return;
    const oldDesk = document.getElementById('fourdk-daily-desk');
    if (!oldDesk || document.getElementById(archiveId)) return;
    const wrapper = document.createElement('details');
    wrapper.id = archiveId;
    wrapper.className = 'dk-edition-archive';
    const summary = document.createElement('summary');
    summary.textContent = '4DK ARCHIVES • ORIGINAL DAILY FRONT DESK ▾';
    wrapper.appendChild(summary);
    oldDesk.parentNode.insertBefore(wrapper, oldDesk);
    wrapper.appendChild(oldDesk); // Moves the original DOM node, never deletes it.
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #${archiveId}{margin:24px auto;max-width:1200px;border:1px solid #69523d;background:#0b0c0d;color:#f4e9d5}
        #${archiveId}>summary{cursor:pointer;list-style-position:inside;padding:19px 16px;font:800 13px/1.5 Arial,sans-serif;letter-spacing:.07em;color:#e6b56d}
        #${archiveId}[open]>summary{border-bottom:1px solid #69523d}
        #${archiveId} #fourdk-daily-desk{margin:0}
        @media(max-width:640px){#${archiveId}{margin:18px 10px}#${archiveId}>summary{font-size:11px;padding:16px 12px}}
      `;
      document.head.appendChild(style);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  window.addEventListener('load', run, {once:true});
  // Other 4DK scripts may render the sections after DOMContentLoaded.
  let attempts = 0;
  const interval = setInterval(() => {
    run();
    if (document.getElementById(archiveId) || ++attempts >= 20) clearInterval(interval);
  }, 500);
})();


/* 4DK October 26 homepage refresh — presentation-only; archives and feature grid preserved. */
(() => {
  'use strict';
  const path = location.pathname.split('/').pop().toLowerCase();
  if (path && path !== 'index.html') return;
  function refresh() {
    const main = document.querySelector('main');
    if (!main) return;
    // Keep the follow panel, but place it after editorial content and before the footer.
    const follow = [...document.querySelectorAll('section')].find(s =>
      s.querySelector('a[href*="x.com/4DaKultureMedia"]') &&
      /FOLLOW 4 DA KULTURE/i.test(s.textContent || '')
    );
    if (follow && main.nextElementSibling !== follow) main.insertAdjacentElement('afterend', follow);
    if (follow) {
      follow.id = 'fourdk-home-social-footer';
      follow.style.padding = '22px 20px';
      follow.style.borderLeft = '0';
      follow.style.borderTop = '3px solid #ef4b37';
      follow.style.maxWidth = 'none';
    }
    // Refresh the dated front-desk label without modifying story content.
    [...main.querySelectorAll('p,small')].forEach(el => {
      if ((el.textContent || '').trim() === '4 DA KULTURE • CURRENT DESK • OCTOBER 22, 2026')
        el.textContent = '4 DA KULTURE • CURRENT DESK • OCTOBER 26, 2026';
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',refresh);
  else refresh();
  window.addEventListener('load',refresh);
  setTimeout(refresh,1000);
})();


/* 4DK Oct 26: prioritize editorial content over the interactive launcher.
   Move only the existing launcher; preserve all links and cards. */
(() => {
  'use strict';
  const page = location.pathname.split('/').pop().toLowerCase();
  if (page && page !== 'index.html') return;
  function arrange() {
    const main = document.querySelector('main');
    const desk = document.getElementById('fourdk-current-front-desk');
    const launcher = document.getElementById('fx-launcher');
    if (!main || !desk || !launcher || !main.contains(desk)) return;
    // Place Interactive World immediately after the current editorial desk.
    if (desk.nextElementSibling !== launcher) desk.insertAdjacentElement('afterend', launcher);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrange);
  else arrange();
  window.addEventListener('load', arrange);
  [300, 1000, 2200, 4000].forEach(ms => setTimeout(arrange, ms));
})();


/* 4DK homepage: synchronize featured cards with published current feed. */
(() => {
  'use strict';
  if (!['','index.html'].includes(location.pathname.split('/').pop().toLowerCase())) return;
  const FALLBACK = [
    {category:'NFL',label:'NFL • WEEK 7 • SUNDAY RECAP',title:'UNBEATEN NO MORE.',deck:'Atlanta ends San Francisco’s unbeaten run. Read our complete Week 7 Sunday analysis.',href:'nfl-sunday-recap-week7-2026.html',image:'4dk-week7-falcons.jpg'},
    {category:'NBA',label:'NBA • NIGHTCAP • OCTOBER 25',title:'LUKA’S 52. SUNDAY SHAKES THE LEAGUE.',deck:'The October 25 NBA Nightcap: Luka’s 52 headlines our full Sunday breakdown.',href:'nba-nightcap-2026-10-25.html',image:'4DK-NBA-POWER-RANKINGS-TOP8-ACCURATE.png'}
  ];
  const pick = (data, cat) => {
    const rows = Array.isArray(data) ? data.filter(x => x.category === cat && /\.html$/.test(x.href||'')) : [];
    rows.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')) || ((+b.priority||0)-(+a.priority||0)));
    return rows[0] || FALLBACK.find(x=>x.category===cat);
  };
  const update = (data) => {
    const desk = document.getElementById('fourdk-current-front-desk');
    if (!desk) return;
    const cards = [...desk.querySelectorAll('a')];
    for (const cat of ['NFL','NBA']) {
      const item = pick(data,cat);
      const card = cards.find(a=>a.querySelector('small')?.textContent.toUpperCase().includes(cat));
      if (!card || !item) continue;
      card.href=item.href;
      const label=card.querySelector('small'),title=card.querySelector('h3'),deck=card.querySelector('p'),pic=card.querySelector('img');
      if(label)label.textContent=item.label||cat;
      if(title)title.textContent=item.title||'';
      if(deck)deck.textContent=item.deck||'';
      if(pic && item.image) {pic.src=item.image;pic.alt=item.alt||'4DK '+cat+' featured coverage';}
    }
    const quick = document.querySelector('#fourdk-reader-nav a[href*="nba-nightcap"]');
    if(quick)quick.href=pick(data,'NBA').href;
    // Update other visible homepage links that still point to the October 22 edition.
    document.querySelectorAll('a[href="nba-nightcap-2026-10-22.html"]').forEach(a=>{
      if (!a.closest('details')) a.href=pick(data,'NBA').href;
    });
  };
  const run=()=>{
    update(FALLBACK);
    fetch('4dk-frontdesk-current.json?v=20261026',{cache:'no-store'})
      .then(r=>{if(!r.ok)throw Error('feed unavailable');return r.json()})
      .then(update).catch(()=>{});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  window.addEventListener('load',run);
  setTimeout(run,1400);
})();
