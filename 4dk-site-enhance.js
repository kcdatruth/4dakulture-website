(() => {
  if (window.__fourdkSiteEnhanceLoaded) return;
  window.__fourdkSiteEnhanceLoaded = true;

  const STORIES = [{"cat": "NBA", "title": "2026–27 NBA Season Preview", "url": "nba-season-preview-2026-27.html", "series": "NBA Annual"}, {"cat": "NBA", "title": "2026–27 Atlantic Division Preview", "url": "nba-atlantic-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 Central Division Preview", "url": "nba-central-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 Southeast Division Preview", "url": "nba-southeast-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 Northwest Division Preview", "url": "nba-northwest-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 Pacific Division Preview", "url": "nba-pacific-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 Southwest Division Preview", "url": "nba-southwest-2026-27.html", "series": "Division Previews"}, {"cat": "NBA", "title": "2026–27 NBA Awards Predictions", "url": "nba-awards-predictions-2026-27.html", "series": "NBA Annual"}, {"cat": "NBA", "title": "2026–27 Projected Standings", "url": "nba-projected-standings-2026-27.html", "series": "NBA Annual"}, {"cat": "NBA", "title": "The 50 Best NBA Players Entering 2026–27", "url": "top-50-nba-players-2026-27.html", "series": "NBA Rankings"}, {"cat": "NBA", "title": "The Top 50 NBA Players of the Last 30 Years", "url": "top-50-nba-players-last-30-years.html", "series": "NBA Rankings"}, {"cat": "NBA", "title": "NBA Offseason Winners & Losers", "url": "nba-offseason-winners-losers.html", "series": "NBA Features"}, {"cat": "NBA", "title": "Milwaukee’s Fall From Grace", "url": "milwaukee-fall-from-grace.html", "series": "NBA Features"}, {"cat": "NBA", "title": "Giannis to Miami: The Offseason Winner", "url": "giannis-miami-offseason-winner.html", "series": "NBA Features"}, {"cat": "NBA", "title": "Kawhi & the Clippers: The Offseason Direction", "url": "kawhi-clippers-offseason.html", "series": "NBA Features"}, {"cat": "NBA", "title": "Minnesota’s Offseason Swing", "url": "minnesota-offseason-winner.html", "series": "NBA Features"}, {"cat": "NBA", "title": "The Jalen Duren Contract Gamble", "url": "jalen-duren-contract-gamble-2026.html", "series": "NBA Features"}, {"cat": "NBA", "title": "The Russell Westbrook Debate", "url": "russell-westbrook-debate.html", "series": "NBA Features"}, {"cat": "NBA", "title": "Mamba File 001: Kobe’s 2005–06 Season", "url": "mamba-file-001-kobe-2005-06.html", "series": "Mamba Files"}, {"cat": "NBA", "title": "Mamba File 002: The 1996 NBA Draft", "url": "mamba-file-002-1996-draft.html", "series": "Mamba Files"}, {"cat": "NBA", "title": "Mamba File 003: The Shaq–Kobe Era", "url": "mamba-file-003-shaq-kobe-era.html", "series": "Mamba Files"}, {"cat": "NBA", "title": "The Answer Files — Origin File: Georgetown", "url": "the-answer-files-000-georgetown-before-the-answer.html", "series": "The Answer Files"}, {"cat": "NBA", "title": "The Answer Files 001: Iverson Is the Kulture", "url": "the-answer-files-001-iverson-is-the-kulture.html", "series": "The Answer Files"}, {"cat": "NBA", "title": "The Answer Files 002: The League Knew From Game 1", "url": "the-answer-files-002-the-league-knew-from-game-1.html", "series": "The Answer Files"}, {"cat": "NBA", "title": "The Answer Files 003: From Talent to Winning", "url": "the-answer-files-003-from-talent-to-winning.html", "series": "The Answer Files"}, {"cat": "NBA", "title": "The Answer Files 004: It Was His Time", "url": "the-answer-files-004-it-was-his-time.html", "series": "The Answer Files"}, {"cat": "NBA", "title": "Georgetown: Before He Was The Answer — Legacy File", "url": "answer-file-001-georgetown.html", "series": "The Answer Files"}, {"cat": "NFL", "title": "2026 AFC Season Preview", "url": "afc-preview-2026.html", "series": "NFL Season Preview"}, {"cat": "NFL", "title": "2026 NFC Season Preview", "url": "nfc-preview-2026.html", "series": "NFL Season Preview"}, {"cat": "NFL", "title": "Week 1 Opening Night Recap", "url": "nfl-week-1-opening-recap-2026.html", "series": "NFL Week 1"}, {"cat": "NFL", "title": "Week 1 Sunday Preview", "url": "nfl-week-1-sunday-preview-2026.html", "series": "NFL Week 1"}, {"cat": "NFL", "title": "Sunday NFL Recap — Week 1", "url": "nfl-sunday-recap-week1.html", "series": "Sunday NFL Recaps"}, {"cat": "NFL", "title": "Monday Night Football Recap — Week 1", "url": "nfl-mnf-recap-week1.html", "series": "NFL Week 1"}, {"cat": "NFL", "title": "Thursday Night Recap — Week 2: Bills vs. Lions", "url": "nfl-thursday-recap-week2-bills-lions.html", "series": "NFL Week 2"}, {"cat": "NFL", "title": "Week 2 Sunday Preview + Final Injury Status", "url": "nfl-week2-sunday-preview-2026.html", "series": "NFL Week 2"}, {"cat": "NFL", "title": "What We Learned Sunday — Week 2", "url": "nfl-sunday-recap-week2.html", "series": "Sunday NFL Recaps"}, {"cat": "NFL", "title": "The Rams Got Punched. Now They Have to Respond.", "url": "rams-week1-loss-garrett-injury-giants-mnf-2026.html", "series": "NFL Week 2"}, {"cat": "NFL", "title": "Vick File 001: Virginia Tech", "url": "vick-file-001-virginia-tech.html", "series": "Vick Files"}, {"cat": "Music", "title": "Lil Wayne — Tha Carter II: When Wayne Became Wayne", "url": "tha-carter-ii-when-wayne-became-wayne.html", "series": "Classic Albums Revisited"}, {"cat": "Music", "title": "Jay-Z — The Blueprint: 25 Years Later", "url": "hiphop-jay-z-blueprint-25-years-later.html", "series": "Classic Albums Revisited"}, {"cat": "Music", "title": "Dr. Dre — 2001 Revisited", "url": "hiphop-dr-dre-2001-revisited.html", "series": "Classic Albums Revisited"}, {"cat": "Music", "title": "D’Angelo — Brown Sugar Revisited", "url": "dangelo-brown-sugar-revisited.html", "series": "Classic Albums Revisited"}, {"cat": "Music", "title": "The 26 Best Rappers of 2000–2026", "url": "top-26-rappers-2000-2026.html", "series": "Regional Rankings"}, {"cat": "Music", "title": "The 26 Best West Coast Rappers Since 2000", "url": "top-26-west-coast-rappers-since-2000.html", "series": "Regional Rankings"}, {"cat": "Music", "title": "The 26 Best Southern Rappers Since 2000", "url": "top-26-southern-rappers-since-2000.html", "series": "Regional Rankings"}, {"cat": "Music", "title": "The 26 Best East Coast Rappers of 2000–2026", "url": "top-26-east-coast-rappers-2000-2026.html", "series": "Regional Rankings"}, {"cat": "Music", "title": "The 26 Best Midwest Rappers of 2000–2026", "url": "top-26-midwest-rappers-2000-2026.html", "series": "Regional Rankings"}, {"cat": "Screen", "title": "The Drop — Episode 1 Review", "url": "the-drop-episode-1-review.html", "series": "Snowfall Files"}];
  const SEQUENCES = {"Division Previews": ["nba-atlantic-2026-27.html", "nba-central-2026-27.html", "nba-southeast-2026-27.html", "nba-northwest-2026-27.html", "nba-pacific-2026-27.html", "nba-southwest-2026-27.html"], "Mamba Files": ["mamba-file-001-kobe-2005-06.html", "mamba-file-002-1996-draft.html", "mamba-file-003-shaq-kobe-era.html"], "The Answer Files": ["the-answer-files-000-georgetown-before-the-answer.html", "the-answer-files-001-iverson-is-the-kulture.html", "the-answer-files-002-the-league-knew-from-game-1.html", "the-answer-files-003-from-talent-to-winning.html", "the-answer-files-004-it-was-his-time.html"], "Classic Albums Revisited": ["hiphop-jay-z-blueprint-25-years-later.html", "hiphop-dr-dre-2001-revisited.html", "dangelo-brown-sugar-revisited.html", "tha-carter-ii-when-wayne-became-wayne.html"], "Sunday NFL Recaps": ["nfl-sunday-recap-week1.html", "nfl-sunday-recap-week2.html"], "NFL Season Preview": ["afc-preview-2026.html", "nfc-preview-2026.html"], "Regional Rankings": ["top-26-west-coast-rappers-since-2000.html", "top-26-southern-rappers-since-2000.html", "top-26-east-coast-rappers-2000-2026.html", "top-26-midwest-rappers-2000-2026.html", "top-26-rappers-2000-2026.html"]};
  const byUrl = new Map(STORIES.map(story => [story.url, story]));

  const cleanFile = () => {
    const p=(location.pathname || '/').split('/').filter(Boolean).pop() || 'index.html';
    return p.toLowerCase();
  };

  function addStyles() {
    if (document.getElementById('fourdk-discovery-enhance-style')) return;
    const style=document.createElement('style');
    style.id='fourdk-discovery-enhance-style';
    style.textContent=`
      .fourdk-library-strip{position:relative;overflow:hidden;padding:20px 0;background:#0d0f0e;color:#fff;border-top:1px solid #2b2f2c;border-bottom:1px solid #2b2f2c}
      .fourdk-library-strip:after{content:'48';position:absolute;right:-5px;bottom:-26px;font:1000 100px/.85 Arial Black,Impact,sans-serif;color:#fff;opacity:.035;pointer-events:none}
      .fourdk-library-inner{position:relative;z-index:2;width:min(1160px,calc(100% - 34px));margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}
      .fourdk-library-copy small{display:block;color:#ff684d;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-library-copy strong{display:block;margin:4px 0 2px;font:1000 clamp(22px,3.8vw,36px)/.94 Arial Black,Impact,sans-serif;text-transform:uppercase;letter-spacing:-.035em}
      .fourdk-library-copy span{color:#9da39e;font-size:11px}
      .fourdk-library-link{display:inline-flex;min-height:42px;align-items:center;padding:0 14px;background:#e8452e;color:#fff!important;text-decoration:none!important;font-size:9px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap}
      .fourdk-related-wrap{position:relative;overflow:hidden;background:#0c0d0c;color:#f7f3eb;border-top:4px solid #e8452e;padding:36px 0 42px;clear:both}
      .fourdk-related-shell{width:min(1100px,calc(100% - 34px));margin:auto}
      .fourdk-related-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:17px}
      .fourdk-related-kicker{display:block;color:#ff684d;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .fourdk-related-head h2{margin:5px 0 0;color:#fff;font:1000 clamp(30px,5vw,50px)/.9 Arial Black,Impact,sans-serif;text-transform:uppercase;letter-spacing:-.04em}
      .fourdk-related-head a{color:#d7ac53!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
      .fourdk-series-nav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:17px}
      .fourdk-series-nav a,.fourdk-series-empty{display:flex;flex-direction:column;justify-content:center;min-height:82px;padding:13px 15px;border:1px solid #303331;background:#111311;text-decoration:none!important}
      .fourdk-series-nav a:last-child{text-align:right;align-items:flex-end}
      .fourdk-series-nav small{color:#777d78;font-size:7px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}
      .fourdk-series-nav strong{display:block;margin-top:5px;color:#f4f0e8;font-size:12px;line-height:1.25}
      .fourdk-series-empty{opacity:.25}
      .fourdk-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
      .fourdk-related-card{min-height:174px;display:flex;flex-direction:column;padding:16px;border:1px solid #303331;background:#121412;color:#f5f1e9!important;text-decoration:none!important}
      .fourdk-related-card:hover{border-color:#6a6f6a;transform:translateY(-2px)}
      .fourdk-related-card small{display:block;color:#ff684d;font-size:7px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}
      .fourdk-related-card b{display:block;margin:8px 0;color:#fff;font:700 20px/1.05 Georgia,'Times New Roman',serif}
      .fourdk-related-card span{margin-top:auto;color:#d7ac53;font-size:7px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-allstories-footer-link{font-weight:900!important}
      @media(max-width:700px){
        .fourdk-library-inner,.fourdk-related-head{align-items:flex-start;flex-direction:column}
        .fourdk-library-link{width:100%;justify-content:center}
        .fourdk-related-grid{grid-template-columns:1fr}
        .fourdk-series-nav{grid-template-columns:1fr}
        .fourdk-series-nav a:last-child{text-align:left;align-items:flex-start}
      }
    `;
    document.head.appendChild(style);
  }

  function storyHref(url) {
    return '/' + url.replace(/^\//,'');
  }

  function addHomepageLibraryStrip() {
    const file=cleanFile();
    if (!(file==='index.html' || location.pathname==='/' || location.pathname==='')) return;
    if (document.querySelector('.fourdk-library-strip')) return false;

    const main=document.querySelector('main#main') || document.querySelector('main');
    if (!main) return false;

    const strip=document.createElement('section');
    strip.className='fourdk-library-strip';
    strip.setAttribute('aria-label','4DK Story Library');
    strip.innerHTML=`
      <div class="fourdk-library-inner">
        <div class="fourdk-library-copy">
          <small>THE 4DK ARCHIVE • NOTHING GETS BURIED</small>
          <strong>48 Stories. One Permanent Library.</strong>
          <span>NBA, NFL, music, rankings, recaps, long-form files and screen coverage.</span>
        </div>
        <a class="fourdk-library-link" href="/stories.html">Explore All 48 Stories →</a>
      </div>`;

    const sunday=document.querySelector('.home-v2-sunday-final');
    const jump=document.querySelector('.home-v2-jump');
    const lead=document.querySelector('.home-v2-lead');
    if (sunday) sunday.insertAdjacentElement('afterend',strip);
    else if (jump) jump.insertAdjacentElement('afterend',strip);
    else if (lead) lead.insertAdjacentElement('afterend',strip);
    else main.prepend(strip);
    return true;
  }

  function scheduleHomepageStrip() {
    if (addHomepageLibraryStrip()) return;
    let tries=0;
    const timer=setInterval(() => {
      tries++;
      if (addHomepageLibraryStrip() || tries>12) clearInterval(timer);
    },250);
  }

  function addLibraryToNavigation() {
    document.querySelectorAll('.footer-links').forEach(list => {
      if (list.querySelector('a[href$="stories.html"]')) return;
      const a=document.createElement('a');
      a.href='/stories.html';
      a.textContent='All Stories';
      a.className='fourdk-allstories-footer-link';
      list.appendChild(a);
    });

    const addToMore=() => {
      const grid=document.querySelector('.fourdk-more-grid');
      if(!grid || grid.querySelector('a[href="/stories.html"]')) return false;
      const a=document.createElement('a');
      a.href='/stories.html';
      a.innerHTML='Story Library <span>›</span>';
      grid.prepend(a);
      return true;
    };
    if(!addToMore()){
      let count=0;
      const timer=setInterval(()=>{count++; if(addToMore() || count>12) clearInterval(timer);},250);
    }
  }

  function relatedFor(current) {
    const sameSeries=STORIES.filter(x => x.url!==current.url && x.series===current.series);
    const sameCat=STORIES.filter(x => x.url!==current.url && x.cat===current.cat && x.series!==current.series);
    const allElse=STORIES.filter(x => x.url!==current.url && x.cat!==current.cat);
    return [...sameSeries,...sameCat,...allElse].slice(0,3);
  }

  function seriesNav(current) {
    const seq=SEQUENCES[current.series];
    if(!seq || seq.length<2) return '';
    const i=seq.indexOf(current.url);
    if(i<0) return '';
    const prev=i>0 ? byUrl.get(seq[i-1]) : null;
    const next=i<seq.length-1 ? byUrl.get(seq[i+1]) : null;
    const prevHtml=prev
      ? `<a href="${storyHref(prev.url)}"><small>← PREVIOUS • ${current.series}</small><strong>${prev.title}</strong></a>`
      : `<div class="fourdk-series-empty"></div>`;
    const nextHtml=next
      ? `<a href="${storyHref(next.url)}"><small>NEXT • ${current.series} →</small><strong>${next.title}</strong></a>`
      : `<div class="fourdk-series-empty"></div>`;
    return `<nav class="fourdk-series-nav" aria-label="${current.series} article navigation">${prevHtml}${nextHtml}</nav>`;
  }

  function addRelatedStories() {
    const file=cleanFile();
    const current=byUrl.get(file);
    if(!current || document.querySelector('.fourdk-related-wrap')) return;

    const related=relatedFor(current);
    const section=document.createElement('section');
    section.className='fourdk-related-wrap';
    section.setAttribute('aria-label','Continue reading on 4 Da Kulture');

    const cards=related.map(item=>`
      <a class="fourdk-related-card" href="${storyHref(item.url)}">
        <small>${item.cat} • ${item.series}</small>
        <b>${item.title}</b>
        <span>Read next →</span>
      </a>`).join('');

    section.innerHTML=`
      <div class="fourdk-related-shell">
        <div class="fourdk-related-head">
          <div><span class="fourdk-related-kicker">KEEP READING • 4 DA KULTURE</span><h2>DON’T STOP HERE.</h2></div>
          <a href="/stories.html">Browse All 48 Stories →</a>
        </div>
        ${seriesNav(current)}
        <div class="fourdk-related-grid">${cards}</div>
      </div>`;

    const footer=document.querySelector('footer');
    if(footer) footer.insertAdjacentElement('beforebegin',section);
    else document.body.appendChild(section);
  }

  function run() {
    addStyles();
    scheduleHomepageStrip();
    addLibraryToNavigation();
    addRelatedStories();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
