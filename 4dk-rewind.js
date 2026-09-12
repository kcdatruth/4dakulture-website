(() => {
  const page = location.pathname.split('/').pop().toLowerCase();
  const isMovies = page === 'movies.html' || page === 'movies';
  const isThrowback = page === 'throwback.html' || page === 'throwback';
  if (!isMovies && !isThrowback) return;

  if (!document.querySelector('link[href="/4dk-rewind.css"],link[href="4dk-rewind.css"]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/4dk-rewind.css';
    css.dataset.fourdkRewind = '1';
    document.head.appendChild(css);
  }

  if (isMovies) {
    const pills = document.querySelector('.screen-nav-pills');
    if (pills && !pills.querySelector('a[href="#4dk-rewind"]')) {
      const pill = document.createElement('a');
      pill.href = '#4dk-rewind';
      pill.textContent = '4DK Rewind';
      const snow = pills.querySelector('a[href="snowfall.html"]');
      if (snow) snow.before(pill);
      else pills.appendChild(pill);
    }

    if (!document.getElementById('4dk-rewind')) {
      const section = document.createElement('section');
      section.className = 'rewind-screen-feature';
      section.id = '4dk-rewind';
      section.innerHTML = `
        <div class="shell">
          <div class="rewind-mini-grid">
            <div class="rewind-mini-art">
              <span>4DK REWIND • FILM 001 • 1993</span>
              <strong>MENACE<br>II<br>SOCIETY</strong>
              <small>33 YEARS LATER</small>
            </div>
            <div class="rewind-mini-copy">
              <span class="rewind-mini-kicker">NEW 4DK SCREEN FRANCHISE • COMING SOON</span>
              <h2>Menace II Society:<br><em>More Than a Hood Classic</em></h2>
              <p>4DK Rewind goes back to the movies and shows that became part of the culture — the performances, soundtracks, themes, scenes and legacy, without giving anything a nostalgia pass. Menace II Society will be the first full feature.</p>
              <div class="rewind-mini-actions">
                <a href="4dk-rewind.html">ENTER 4DK REWIND →</a>
                <span>FULL REVIEW / TRIBUTE IN DEVELOPMENT</span>
              </div>
            </div>
          </div>
        </div>`;
      const nowShowing = document.querySelector('#now-showing');
      const desk = document.querySelector('#desk');
      if (nowShowing) nowShowing.after(section);
      else if (desk) desk.before(section);
      else document.querySelector('main')?.appendChild(section);
    }
  }

  if (isThrowback) {
    const tabs = document.querySelector('.archive-tabs .shell');
    if (tabs && !tabs.querySelector('a[href="#4dk-rewind"]')) {
      const tab = document.createElement('a');
      tab.href = '#4dk-rewind';
      tab.textContent = '4DK Rewind';
      tabs.appendChild(tab);
    }

    if (!document.getElementById('4dk-rewind')) {
      const section = document.createElement('section');
      section.className = 'rewind-throwback-feature';
      section.id = '4dk-rewind';
      section.innerHTML = `
        <div class="shell">
          <div class="rewind-archive-card">
            <div class="rewind-archive-art">
              <span>4DK REWIND • FIRST FILM</span>
              <strong>MENACE<br>II<br>SOCIETY</strong>
              <small>1993 → 2026 • 33 YEARS LATER</small>
            </div>
            <div class="rewind-archive-copy">
              <span>SCREEN × THROWBACK • COMING SOON</span>
              <h2>More Than a<br><em>Hood Classic.</em></h2>
              <p>The first 4DK Rewind will revisit Menace II Society through the performances, soundtrack, atmosphere, ending, cultural impact and the question that matters 33 years later: why does it still hit?</p>
              <a class="rewind-archive-enter" href="4dk-rewind.html">ENTER 4DK REWIND →</a>
            </div>
          </div>
        </div>`;

      const mamba = document.getElementById('mamba-files-teaser');
      const intro = document.querySelector('.archive-intro');
      const nba = document.querySelector('#nba-flashback');

      if (mamba) mamba.after(section);
      else if (intro) intro.after(section);
      else if (nba) nba.before(section);
      else document.querySelector('main')?.prepend(section);
    }
  }
})();