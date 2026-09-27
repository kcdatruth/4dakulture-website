(() => {
  if (window.__fourdkMenuDiscoveryFix) return;
  window.__fourdkMenuDiscoveryFix = true;

  const items = [
    {href:'/stories.html', label:'Story Library', meta:'67 stories'},
    {href:'/4dk-hubs.html', label:'Player + Team Hubs', meta:'NEW'},
    {href:'/rankings.html', label:'Rankings HQ', meta:'NEW'}
  ];

  function install(){
    const grid = document.querySelector('.fourdk-more-grid');
    if (!grid) return false;

    // Remove stale duplicates from earlier attempts.
    items.forEach(item => {
      [...grid.querySelectorAll(`a[href="${item.href}"]`)].slice(1).forEach(x => x.remove());
    });

    // Insert in the exact intended order, directly above Magazine.
    const first = grid.querySelector('a[href="/magazine.html"]') || grid.firstElementChild;

    items.slice().reverse().forEach(item => {
      let a = grid.querySelector(`a[href="${item.href}"]`);
      if (!a) {
        a = document.createElement('a');
        a.href = item.href;
        a.dataset.fourdkDiscoveryCore = '1';
        a.innerHTML = `${item.label} <span>${item.meta === 'NEW' ? 'NEW ›' : item.meta + ' ›'}</span>`;
      } else {
        a.innerHTML = `${item.label} <span>${item.meta === 'NEW' ? 'NEW ›' : item.meta + ' ›'}</span>`;
      }

      if (first) grid.insertBefore(a, first);
      else grid.prepend(a);
    });

    // Reorder one final time so the visible order is:
    // Story Library, Player + Team Hubs, Rankings HQ, Magazine...
    const magazine = grid.querySelector('a[href="/magazine.html"]');
    if (magazine) {
      const ordered = items.map(item => grid.querySelector(`a[href="${item.href}"]`)).filter(Boolean);
      ordered.reverse().forEach(a => grid.insertBefore(a, magazine));
    }

    return true;
  }

  function keepAlive(){
    install();
    const more = document.querySelector('[data-fourdk-more]');
    if (more && !more.dataset.discoveryFixBound) {
      more.dataset.discoveryFixBound = '1';
      more.addEventListener('click', () => {
        setTimeout(install, 0);
        setTimeout(install, 100);
        setTimeout(install, 350);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', keepAlive, {once:true});
  } else {
    keepAlive();
  }

  [100,250,500,900,1500,2500,4000,6500].forEach(ms => setTimeout(keepAlive, ms));

  const observer = new MutationObserver(() => install());
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();