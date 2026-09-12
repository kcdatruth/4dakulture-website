(() => {
  const page = location.pathname.split('/').pop().toLowerCase();
  if(page !== 'throwback.html' && page !== 'throwback') return;
  if(document.getElementById('mamba-files-teaser')) return;

  if(!document.querySelector('link[href="/mamba-files.css"],link[href="mamba-files.css"]')){
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='/mamba-files.css';
    css.dataset.mambaFiles='1';
    document.head.appendChild(css);
  }

  const tabs=document.querySelector('.archive-tabs .shell');
  if(tabs && !tabs.querySelector('a[href="#mamba-files-teaser"]')){
    const a=document.createElement('a');
    a.href='#mamba-files-teaser';
    a.textContent='Mamba Files';
    tabs.prepend(a);
  }

  const section=document.createElement('section');
  section.className='mamba-files-teaser';
  section.id='mamba-files-teaser';
  section.innerHTML=`
    <div class="shell">
      <div class="mft-head">
        <div>
          <span class="mft-kicker">4DK ORIGINAL THROWBACK SERIES • 8 / 24</span>
          <h2>THE MAMBA FILES.</h2>
        </div>
        <p>A permanent Kobe Bryant archive: seasons, eras, championships, arguments and the moments that deserve more than a highlight clip.</p>
      </div>

      <div class="mft-grid">
        <a class="mft-card" href="mamba-files.html#kobe-06">
          <span>20TH ANNIVERSARY • 2005–06</span>
          <b>THE SEASON HE BROKE THE SCALE</b>
          <small>35.4 PPG, 81, the carry job and the MVP argument.</small>
        </a>
        <a class="mft-card" href="mamba-files.html#draft-96">
          <span>30TH ANNIVERSARY • 1996</span>
          <b>THE DRAFT THAT CHANGED EVERYTHING</b>
          <small>Kobe, Iverson, Nash, Ray Allen and one historic class.</small>
        </a>
        <a class="mft-card" href="mamba-files.html#shaq-kobe">
          <span>DYNASTY FILE</span>
          <b>THE SHAQ–KOBE LAKERS</b>
          <small>Dominance, three straight titles, tension and the breakup.</small>
        </a>
        <a class="mft-card" href="mamba-files.html#8-vs-24">
          <span>THE ARGUMENT</span>
          <b>KOBE 8 OR KOBE 24?</b>
          <small>Explosion versus command. Three-peat Kobe versus repeat Kobe.</small>
        </a>
      </div>

      <a class="mft-enter" href="mamba-files.html">ENTER THE MAMBA FILES <span>→</span></a>
    </div>`;

  const intro=document.querySelector('.archive-intro');
  const nba=document.querySelector('#nba-flashback');
  if(intro) intro.after(section);
  else if(nba) nba.before(section);
  else document.querySelector('main')?.prepend(section);
})();