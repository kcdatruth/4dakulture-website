(() => {
  if (window.__fourdkDiscoveryUpgrade) return;
  window.__fourdkDiscoveryUpgrade = true;

  const path = (location.pathname || '/').toLowerCase();
  const clean = path.split('/').filter(Boolean).pop() || 'index.html';

  const DESTS = {
    stories: '/stories.html',
    hubs: '/4dk-hubs.html',
    rankings: '/rankings.html'
  };

  function addStyles(){
    if (document.getElementById('fourdk-discovery-upgrade-css')) return;
    const s = document.createElement('style');
    s.id = 'fourdk-discovery-upgrade-css';
    s.textContent = `
      .fourdk-discovery-new{
        display:inline-flex;align-items:center;justify-content:center;
        margin-left:7px;padding:2px 5px;border-radius:999px;
        background:#e8452e;color:#fff;font-size:6px;font-weight:1000;
        letter-spacing:.08em;vertical-align:1px
      }

      .fourdk-discovery-rail{
        position:relative;overflow:hidden;clear:both;
        padding:31px 0 34px;background:#0c0e0c;color:#f7f3eb;
        border-top:1px solid #2c312d;border-bottom:1px solid #2c312d
      }
      .fourdk-discovery-rail:after{
        content:'4DK';position:absolute;right:-14px;bottom:-47px;
        font:1000 clamp(115px,20vw,240px)/.8 Arial Black,Impact,sans-serif;
        color:#fff;opacity:.025;pointer-events:none
      }
      .fourdk-discovery-shell{
        position:relative;z-index:2;width:min(1160px,calc(100% - 34px));margin:auto
      }
      .fourdk-discovery-head{
        display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:14px
      }
      .fourdk-discovery-head small{
        display:block;color:#ff6548;font-size:8px;font-weight:1000;
        letter-spacing:.14em;text-transform:uppercase
      }
      .fourdk-discovery-head h2{
        margin:5px 0 0;color:#fff;
        font:1000 clamp(29px,5vw,48px)/.88 Arial Black,Impact,sans-serif;
        letter-spacing:-.045em;text-transform:uppercase
      }
      .fourdk-discovery-head p{
        margin:0;max-width:520px;color:#909790;font-size:11px;line-height:1.45
      }
      .fourdk-discovery-grid{
        display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px
      }
      .fourdk-discovery-card{
        position:relative;overflow:hidden;display:flex;flex-direction:column;
        min-height:158px;padding:16px;border:1px solid #303630;background:#121512;
        color:#f5f1e9!important;text-decoration:none!important
      }
      .fourdk-discovery-card:hover{border-color:#686f69;transform:translateY(-2px)}
      .fourdk-discovery-card:after{
        content:attr(data-mark);position:absolute;right:-5px;bottom:-24px;
        font:1000 86px/.85 Arial Black,Impact,sans-serif;color:#fff;opacity:.035
      }
      .fourdk-discovery-card>*{position:relative;z-index:2}
      .fourdk-discovery-card small{
        color:#ff6548;font-size:7px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase
      }
      .fourdk-discovery-card strong{
        display:block;margin:7px 0;color:#fff;
        font:1000 24px/.95 Arial Black,Impact,sans-serif;text-transform:uppercase
      }
      .fourdk-discovery-card span{
        color:#959c96;font-size:9px;line-height:1.4
      }
      .fourdk-discovery-card b{
        margin-top:auto;padding-top:14px;color:#d7ad55;
        font-size:7px;letter-spacing:.1em;text-transform:uppercase
      }

      .fourdk-browser-discovery{
        border-top:1px solid rgba(255,255,255,.08)!important
      }

      @media(max-width:760px){
        .fourdk-discovery-rail{padding:26px 0 29px}
        .fourdk-discovery-head{align-items:flex-start;flex-direction:column}
        .fourdk-discovery-grid{
          display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;padding-bottom:2px
        }
        .fourdk-discovery-card{
          flex:0 0 min(79vw,300px);scroll-snap-align:start;min-height:150px
        }
      }
    `;
    document.head.appendChild(s);
  }

  function addAppMoreLinks(){
    const grid = document.querySelector('.fourdk-more-grid');
    if (!grid || grid.dataset.discoveryUpgraded === '1') return false;
    grid.dataset.discoveryUpgraded = '1';

    const fragment = document.createDocumentFragment();
    const links = [
      ['Story Library', DESTS.stories, '67 stories'],
      ['Player + Team Hubs', DESTS.hubs, 'NEW'],
      ['Rankings HQ', DESTS.rankings, 'NEW']
    ];

    links.reverse().forEach(([label, href, badge]) => {
      if (grid.querySelector(`a[href="${href}"]`)) return;
      const a = document.createElement('a');
      a.href = href;
      a.className = 'fourdk-browser-discovery';
      a.innerHTML = `${label} <span>${badge === 'NEW' ? '<i class="fourdk-discovery-new">NEW</i>' : badge + ' ›'}</span>`;
      grid.prepend(a);
    });

    grid.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => document.documentElement.classList.remove('fourdk-more-open'));
    });
    return true;
  }

  function addBrowserNavLinks(){
    document.querySelectorAll('.mobile-nav').forEach(nav => {
      const items = [
        ['Story Library', DESTS.stories],
        ['Hubs', DESTS.hubs],
        ['Rankings', DESTS.rankings]
      ];
      items.forEach(([label, href]) => {
        if (nav.querySelector(`a[href="${href}"],a[href="${href.slice(1)}"]`)) return;
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        nav.appendChild(a);
      });
    });

    document.querySelectorAll('.footer-links').forEach(group => {
      if (!group.querySelector(`a[href="${DESTS.stories}"],a[href="stories.html"]`)) {
        const a = document.createElement('a'); a.href = DESTS.stories; a.textContent = 'Story Library'; group.appendChild(a);
      }
      if (!group.querySelector(`a[href="${DESTS.hubs}"],a[href="4dk-hubs.html"]`)) {
        const a = document.createElement('a'); a.href = DESTS.hubs; a.textContent = 'Player + Team Hubs'; group.appendChild(a);
      }
      if (!group.querySelector(`a[href="${DESTS.rankings}"],a[href="rankings.html"]`)) {
        const a = document.createElement('a'); a.href = DESTS.rankings; a.textContent = 'Rankings HQ'; group.appendChild(a);
      }
    });
  }

  function addDiscoveryRail(){
    if (
      document.querySelector('.fourdk-discovery-rail') ||
      ['stories.html','4dk-hubs.html','rankings.html'].includes(clean)
    ) return true;

    const footer = document.querySelector('footer,.footer');
    const main = document.querySelector('main');
    if (!footer || !main) return false;

    const section = document.createElement('section');
    section.className = 'fourdk-discovery-rail';
    section.setAttribute('aria-label','Explore more 4 Da Kulture');
    section.innerHTML = `
      <div class="fourdk-discovery-shell">
        <div class="fourdk-discovery-head">
          <div>
            <small>DON'T LOSE THE GOOD STUFF</small>
            <h2>EXPLORE 4DK.</h2>
          </div>
          <p>Every story stays alive. Search the full library, follow a player or team across the archive, or jump straight into the rankings.</p>
        </div>
        <div class="fourdk-discovery-grid">
          <a class="fourdk-discovery-card" data-mark="67" href="${DESTS.stories}">
            <small>FULL ARCHIVE • 67 STORIES</small>
            <strong>STORY LIBRARY</strong>
            <span>NBA, NFL, music, player files, classic albums, recaps and screen coverage in one searchable place.</span>
            <b>SEARCH THE ARCHIVE →</b>
          </a>
          <a class="fourdk-discovery-card" data-mark="HUB" href="${DESTS.hubs}">
            <small>CONNECTED ARCHIVES</small>
            <strong>PLAYER + TEAM HUBS</strong>
            <span>Kobe, Iverson, Melo, LeBron, Lakers and 49ers — with more hubs built as the coverage grows.</span>
            <b>EXPLORE THE HUBS →</b>
          </a>
          <a class="fourdk-discovery-card" data-mark="#" href="${DESTS.rankings}">
            <small>4DK LISTS + WEEKLY BOARDS</small>
            <strong>RANKINGS HQ</strong>
            <span>Player rankings, regional music lists, NFL boards and the NBA weekly rankings coming this season.</span>
            <b>OPEN RANKINGS HQ →</b>
          </a>
        </div>
      </div>`;
    footer.insertAdjacentElement('beforebegin', section);
    return true;
  }

  function labelDiscoveryPages(){
    if (clean === 'stories.html') document.documentElement.dataset.fourdkDiscoveryPage = 'stories';
    if (clean === '4dk-hubs.html') document.documentElement.dataset.fourdkDiscoveryPage = 'hubs';
    if (clean === 'rankings.html') document.documentElement.dataset.fourdkDiscoveryPage = 'rankings';
  }

  function apply(){
    addStyles();
    addAppMoreLinks();
    addBrowserNavLinks();
    addDiscoveryRail();
    labelDiscoveryPages();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  [250,500,900,1500,2600,4200,6500].forEach(ms => setTimeout(apply, ms));

  const obs = new MutationObserver(() => {
    addAppMoreLinks();
    addBrowserNavLinks();
  });
  obs.observe(document.documentElement, {subtree:true, childList:true});
})();