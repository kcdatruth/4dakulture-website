(() => {
  const path = (location.pathname || '/').toLowerCase();
  const isHome = path === '/' || path.endsWith('/index.html');
  if (!isHome || window.__fourdkLatestWeek5) return;
  window.__fourdkLatestWeek5 = true;

  const ARTICLE = 'nfl-week5-five-major-headlines.html';

  function addStyle(){
    if (document.getElementById('fourdk-latest-week5-style')) return;
    const s = document.createElement('style');
    s.id = 'fourdk-latest-week5-style';
    s.textContent = `
      .home-latest-lead:after{content:'W5'!important}
    `;
    document.head.appendChild(s);
  }

  function apply(){
    addStyle();

    const updated = document.querySelector('.home-latest-updated');
    if (updated) updated.textContent = 'UPDATED • OCT. 7, 2026';

    const lead = document.querySelector('.home-latest-lead');
    if (!lead) return;

    lead.href = ARTICLE;
    lead.style.background = "linear-gradient(90deg,rgba(3,6,4,.96) 0%,rgba(3,6,4,.82) 48%,rgba(3,6,4,.48) 100%),url('nfl-week-4-snf-update-2026.jpg') center/cover no-repeat";
    lead.innerHTML = `
      <div class="home-latest-lead-copy">
        <span class="home-latest-tag">NFL • WEEK 5 • 5 MAJOR HEADLINES</span>
        <h3>WEEK 5: THE PRESSURE CHANGES.</h3>
        <p>San Francisco goes into Seattle against the defending champs. Buffalo gets a Monday-night contender check in Los Angeles. Vegas has a must-win road test, Jacksonville leads the surprise teams we trust, and injuries are starting to test the league's depth.</p>
        <span class="home-latest-cta">READ THE WEEK 5 HEADLINES →</span>
      </div>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }

  [150, 500, 1000, 1800, 3500, 6500, 10000].forEach(ms => setTimeout(apply, ms));

  let timer = 0;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(apply, 120);
  }).observe(document.documentElement, {subtree:true, childList:true});
})();
