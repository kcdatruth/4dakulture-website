(() => {
  const path = (location.pathname || '/').toLowerCase();
  const isHome = path === '/' || path.endsWith('/index.html');
  if (!isHome || window.__fourdkLatestWeek5TNF) return;
  window.__fourdkLatestWeek5TNF = true;

  const ARTICLE = 'nfl-thursday-recap-week5-buccaneers-cowboys.html';
  const MARK = 'week5-tnf-latest-v1';

  function addStyle(){
    if (document.getElementById('fourdk-latest-week5-tnf-style')) return;
    const s = document.createElement('style');
    s.id = 'fourdk-latest-week5-tnf-style';
    s.textContent = `
      .home-latest-lead:after{content:'TNF'!important}
      .home-latest-lead{
        background:
          linear-gradient(90deg,rgba(5,6,5,.97) 0%,rgba(5,6,5,.88) 52%,rgba(5,6,5,.58) 100%),
          radial-gradient(circle at 84% 20%,rgba(198,38,49,.34),transparent 15rem),
          radial-gradient(circle at 70% 80%,rgba(67,103,156,.18),transparent 18rem),
          linear-gradient(135deg,#241013,#080b09 72%)!important;
      }
      .home-latest-lead .home-latest-tag{background:#d93636!important}
    `;
    document.head.appendChild(s);
  }

  function apply(){
    addStyle();

    const updated = document.querySelector('.home-latest-updated');
    if (updated) updated.textContent = 'UPDATED • OCT. 8, 2026';

    const lead = document.querySelector('.home-latest-lead');
    if (!lead) return;
    if (lead.dataset.latestTnf === MARK) return;

    lead.dataset.latestTnf = MARK;
    lead.href = ARTICLE;
    lead.removeAttribute('style');
    lead.innerHTML = `
      <div class="home-latest-lead-copy">
        <span class="home-latest-tag">NFL • WEEK 5 • TNF FINAL</span>
        <h3>DALLAS LET ONE GET AWAY.</h3>
        <p>Tampa Bay got its first win behind Jalon Daniels and a huge Bucky Irving night. Dallas fell to 2–3 after dropping a winnable home game — and now the playoff questions get louder.</p>
        <span class="home-latest-cta">READ THE FULL TNF RECAP →</span>
      </div>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  [100,300,700,1200,2200,4000,7000,10500].forEach(ms => setTimeout(apply, ms));

  let timer = 0;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(apply, 100);
  }).observe(document.documentElement, {subtree:true, childList:true});
})();