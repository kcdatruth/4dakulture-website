const menuBtn=document.getElementById('menuBtn');const mobileNav=document.getElementById('mobileNav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));

// 4DK team-specific article styling.
const pageKey=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
const teamThemes={
  'minnesota-offseason-winner':'theme-minnesota',
  'giannis-miami-offseason-winner':'theme-miami',
  'milwaukee-fall-from-grace':'theme-milwaukee',
  'kawhi-clippers-offseason':'theme-clippers'
};
const teamClass=teamThemes[pageKey];
if(teamClass){
  document.body.classList.add(teamClass);
  if(!document.querySelector('link[href="team-themes.css"]')){
    const themeLink=document.createElement('link');
    themeLink.rel='stylesheet';
    themeLink.href='team-themes.css';
    document.head.appendChild(themeLink);
  }
}

// 4DK home-page background treatment.
const isHome=pageKey===''||pageKey==='index';
if(isHome){
  document.body.classList.add('home-page');
  if(!document.querySelector('link[href="home.css"]')){
    const homeLink=document.createElement('link');
    homeLink.rel='stylesheet';
    homeLink.href='home.css';
    document.head.appendChild(homeLink);
  }
}

// Expand the site-wide navigation without requiring every page to be rewritten.
function addNavLink(nav,href,label,position='end'){
  if(!nav || nav.querySelector(`a[href="${href}"]`))return;
  const a=document.createElement('a');
  a.href=href;
  a.textContent=label;
  if(pageKey===href.replace('.html',''))a.classList.add('active');
  if(position==='start')nav.prepend(a);
  else nav.append(a);
}

const desktopNavs=document.querySelectorAll('.masthead .nav');
if(desktopNavs[0])addNavLink(desktopNavs[0],'movies.html','TV & Movies');
if(desktopNavs[1])addNavLink(desktopNavs[1],'throwback.html','Throwback','start');

if(mobileNav){
  addNavLink(mobileNav,'movies.html','TV & Movies');
  addNavLink(mobileNav,'throwback.html','Throwback');
  mobileNav.querySelectorAll('a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')===`${pageKey}.html`);
    a.addEventListener('click',()=>mobileNav.classList.remove('open'));
  });
}

// Expand the first footer section list on standard pages.
const footerSectionLinks=document.querySelector('.footer .footer-links');
if(footerSectionLinks){
  addNavLink(footerSectionLinks,'movies.html','TV & Movies');
  addNavLink(footerSectionLinks,'throwback.html','Throwback');
}

// Jalen Duren contract feature — inject into Latest From 4DK NBA without removing existing stories.
if(pageKey==='nba'){
  const storyGrid=document.querySelector('.nba-story-grid');
  if(storyGrid && !storyGrid.querySelector('[data-duren-contract-card]')){
    if(!document.getElementById('fourdk-duren-card-styles')){
      const durenStyle=document.createElement('style');
      durenStyle.id='fourdk-duren-card-styles';
      durenStyle.textContent=`
        .nba-story-art.duren-contract{
          position:relative;overflow:hidden;
          background-image:url('jalen-duren-contract-gamble-feature.png');
          background-size:cover;
          background-position:center;
          background-repeat:no-repeat;
        }
        .nba-story-art.duren-contract:before{
          content:'$190M';position:absolute;right:-8px;bottom:-18px;
          font:1000 clamp(54px,8vw,92px)/.9 Arial,sans-serif;
          letter-spacing:-.08em;color:rgba(255,255,255,.07);
          pointer-events:none;
        }

        .nba-story-art.duren-contract > .nba-story-label,
        .nba-story-art.duren-contract > .duren-chip,
        .nba-story-art.duren-contract > strong,
        .nba-story-art.duren-contract > small,
        .nba-story-art.duren-contract > .nba-story-overlay{
          display:none !important;
        }

        .nba-story-art.duren-contract .duren-chip{
          position:absolute;right:14px;top:14px;z-index:2;
          border:1px solid rgba(255,255,255,.24);padding:7px 9px;
          color:#fff;font:1000 8px/1 Arial,sans-serif;
          letter-spacing:.1em;text-transform:uppercase;background:rgba(5,9,15,.55);
        }
        .nba-story-art.duren-contract strong{position:relative;z-index:2}
        .nba-story-art.duren-contract small{position:relative;z-index:2}
      `;
      document.head.appendChild(durenStyle);
    }

    const card=document.createElement('article');
    card.className='nba-story-card';
    card.dataset.durenContractCard='';
    card.innerHTML=`
      <a class="nba-story-art duren-contract" href="jalen-duren-contract-gamble-2026.html">
        <span class="nba-story-overlay"></span>
        <span class="nba-story-label">CONTRACT WATCH</span>
        <span class="duren-chip">DETROIT • 2026</span>
        <strong>THE $190M<br>GAMBLE.</strong>
        <small>DUREN • DETROIT • PROVE IT</small>
      </a>
      <div class="nba-story-copy">
        <h3><a href="jalen-duren-contract-gamble-2026.html">The Jalen Duren Contract Gamble: How Much Has He Really Earned?</a></h3>
        <p>Detroit should hold firm at $190M — while giving Duren every chance to prove he is worth more.</p>
        <div class="meta">By Kcdatruth • September 2026</div>
      </div>`;
    storyGrid.prepend(card);
  }
}

// 4DK homepage search.
const siteSearch=document.getElementById('siteSearch');
const siteSearchInput=document.getElementById('siteSearchInput');
const siteSearchResults=document.getElementById('siteSearchResults');

const siteSearchIndex=[
  {title:'NBA',type:'Section',url:'nba.html',desc:'NBA stories, previews, rankings and debates',terms:'basketball nba hoops'},
  {title:'NFL',type:'Section',url:'nfl.html',desc:'Gridiron storylines, contenders, rookies and 4DK Red Zone',terms:'football nfl gridiron chiefs raiders rams 49ers'},
  {title:'TV & Movies',type:'Section',url:'movies.html',desc:'4DK Screen reviews, rewatches, rankings, movies and television',terms:'movies film tv television screen review rewatch'},
  {title:'4DK Throwback',type:'Section',url:'throwback.html',desc:'Old-school hoops, classic hip-hop, vintage TV, games and culture',terms:'throwback archive nostalgia rewind classic old school time capsule'},
  {title:'4DK Magazine',type:'Section',url:'magazine.html',desc:'Long-form 4 Da Kulture features and season-preview coverage',terms:'magazine issue features'},
  {title:'4DK Rotation',type:'Music',url:'hiphop.html',desc:'Playable playlists, hip-hop commentary and the Music Desk',terms:'hip hop music spotify playlists rotation'},
  {title:'4 Da Kulture Podcast',type:'Podcast',url:'podcast.html',desc:'Kcdatruth and 210West on sports, hip-hop and culture',terms:'podcast kcdatruth 210west'},
  {title:'2026–27 NBA Season Preview: Nobody Feels Inevitable',type:'NBA Preview',url:'nba-season-preview-2026-27.html',desc:'East, West, MVP, awards and the OKC-in-7 Finals prediction',terms:'nba preview season nobody inevitable okc philly luka wemby'},
  {title:'The Jalen Duren Contract Gamble',type:'NBA Contract Watch',url:'jalen-duren-contract-gamble-2026.html',desc:'Why Detroit should hold at $190M while Duren proves he is worth more',terms:'jalen duren detroit pistons contract 190 million 200 max sacramento cade'},
  {title:'Russell Westbrook Was Never Supposed to Be This Great',type:'NBA Legacy',url:'russell-westbrook-debate.html',desc:'From UCLA afterthought to MVP and triple-double king',terms:'russ westbrook okc thunder mvp triple double'},
  {title:'The Party’s Over: Milwaukee’s Fall From Grace',type:'NBA Feature',url:'milwaukee-fall-from-grace.html',desc:'The end of Milwaukee’s championship era',terms:'milwaukee bucks giannis dame rebuild'},
  {title:'Winner: Giannis Antetokounmpo',type:'NBA Feature',url:'giannis-miami-offseason-winner.html',desc:'Giannis in Miami and the pressure of a new era',terms:'giannis heat miami offseason'},
  {title:'Winner: Minnesota Timberwolves',type:'NBA Feature',url:'minnesota-offseason-winner.html',desc:'Minnesota’s offseason and the LaMelo–Ant fit',terms:'wolves timberwolves lamelo ant edwards minnesota'},
  {title:'Winner: Kawhi Leonard. Loser: LA Clippers.',type:'NBA Feature',url:'kawhi-clippers-offseason.html',desc:'Kawhi’s Toronto reunion and the Clippers’ reset',terms:'kawhi clippers toronto raptors'},
  {title:'The Power Shift Is Real',type:'NBA Feature',url:'nba-offseason-winners-losers.html',desc:'Philadelphia, Boston and the changing East',terms:'sixers philly boston celtics offseason'},
  {title:'2026–27 NBA Awards & All-NBA Predictions',type:'NBA Predictions',url:'nba-awards-predictions-2026-27.html',desc:'MVP, DPOY, Rookie of the Year and All-NBA picks',terms:'awards mvp all nba predictions luka wemby'},
  {title:'4DK 82–0 Challenge',type:'Interactive',url:'82-0.html',desc:'Build an all-time starting five and see if it can threaten 82–0',terms:'82 0 game challenge all time lineup starting five'},
  {title:'Kcdatruth',type:'Writer',url:'kcdatruth.html',desc:'4DK writer and host profile',terms:'author writer host kcdatruth'},
  {title:'210West',type:'Writer',url:'210west.html',desc:'4DK co-host and contributor profile',terms:'author contributor host 210west'},
  {title:'About 4 Da Kulture',type:'4DK',url:'about.html',desc:'The mission, identity and voice behind 4DK',terms:'about mission identity culture'}
];

function normalizeSearch(value){
  return value.toLowerCase().replace(/[’'–—-]/g,' ').replace(/\s+/g,' ').trim();
}

function search4DK(query){
  const q=normalizeSearch(query);
  if(!q)return [];
  const words=q.split(' ');
  return siteSearchIndex
    .map(item=>{
      const title=normalizeSearch(item.title);
      const hay=normalizeSearch(`${item.title} ${item.type} ${item.desc} ${item.terms}`);
      let score=0;
      if(title===q)score+=100;
      if(title.startsWith(q))score+=45;
      if(title.includes(q))score+=30;
      words.forEach(w=>{
        if(title.includes(w))score+=12;
        else if(hay.includes(w))score+=5;
      });
      return {...item,score};
    })
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,6);
}

function renderSearchResults(){
  if(!siteSearchInput||!siteSearchResults)return;
  const q=siteSearchInput.value.trim();
  if(!q){
    siteSearchResults.hidden=true;
    siteSearchInput.setAttribute('aria-expanded','false');
    return;
  }
  const hits=search4DK(q);
  siteSearchResults.innerHTML=hits.length
    ?hits.map(item=>`
      <a class="search-result" href="${item.url}">
        <span class="result-type">${item.type}</span>
        <span><strong>${item.title}</strong><small>${item.desc}</small></span>
        <span class="result-arrow">→</span>
      </a>`).join('')
    :`<div class="search-empty">No 4DK result for <strong>${q.replace(/[<>&"]/g,'')}</strong> yet.</div>`;
  siteSearchResults.hidden=false;
  siteSearchInput.setAttribute('aria-expanded','true');
}

siteSearchInput?.addEventListener('input',renderSearchResults);
siteSearchInput?.addEventListener('focus',renderSearchResults);
siteSearch?.addEventListener('submit',e=>{
  e.preventDefault();
  const first=search4DK(siteSearchInput.value)[0];
  if(first)location.href=first.url;
  else renderSearchResults();
});
document.addEventListener('click',e=>{
  if(siteSearchResults && siteSearch && !siteSearch.contains(e.target) && !siteSearchResults.contains(e.target)){
    siteSearchResults.hidden=true;
    siteSearchInput?.setAttribute('aria-expanded','false');
  }
});
siteSearchInput?.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    siteSearchResults.hidden=true;
    siteSearchInput.setAttribute('aria-expanded','false');
    siteSearchInput.blur();
  }
});

// 4DK Phase 1 revamp: homepage front cover, mobile navigation, and article discovery.
if(!document.querySelector('link[href="4dk-revamp.css"]')){
  const revampStyles=document.createElement('link');
  revampStyles.rel='stylesheet';
  revampStyles.href='4dk-revamp.css';
  document.head.appendChild(revampStyles);
}
if(!document.querySelector('script[src="4dk-revamp.js"]')){
  const revampScript=document.createElement('script');
  revampScript.src='4dk-revamp.js';
  revampScript.defer=true;
  document.body.appendChild(revampScript);
}

// 4DK article header / author / share treatment.
if(!document.querySelector('link[href="4dk-article-tools.css"]')){
  const articleToolsStyles=document.createElement('link');
  articleToolsStyles.rel='stylesheet';
  articleToolsStyles.href='4dk-article-tools.css';
  document.head.appendChild(articleToolsStyles);
}
if(!document.querySelector('script[src="4dk-article-tools.js"]')){
  const articleToolsScript=document.createElement('script');
  articleToolsScript.src='4dk-article-tools.js';
  articleToolsScript.defer=true;
  document.body.appendChild(articleToolsScript);
}

// The Answer Files — add-only discovery cards for Home, NBA and Throwback.
(() => {
  const answerUrl='the-answer-files.html';

  if(!document.getElementById('fourdk-answer-files-wiring-styles')){
    const style=document.createElement('style');
    style.id='fourdk-answer-files-wiring-styles';
    style.textContent=`
      .answer-files-home-card{border-top-color:#d52b36!important;position:relative;overflow:hidden}
      .answer-files-home-card:after{content:'3';position:absolute;right:-5px;bottom:-28px;font:900 110px/.9 Georgia,serif;color:rgba(23,52,103,.07);pointer-events:none}
      .answer-files-home-card .answer-detail-line{display:block!important;color:#9b1d29!important;font-size:9px!important;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-top:2px!important}

      .answer-files-throwback-card{display:grid;grid-template-columns:.8fr 1.2fr;margin-top:24px;border:1px solid #2a2926;background:#0b0d12;color:#f7f2ea;text-decoration:none;overflow:hidden;box-shadow:0 20px 45px rgba(0,0,0,.14)}
      .answer-files-throwback-mark{min-height:280px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(circle at 78% 22%,rgba(42,82,154,.38),transparent 44%),linear-gradient(145deg,#161b26,#07080c 68%);border-right:1px solid #292d35;position:relative;overflow:hidden}
      .answer-files-throwback-mark:after{content:'3';position:absolute;right:-10px;bottom:-36px;font:1000 190px/.8 Georgia,serif;color:rgba(255,255,255,.045)}
      .answer-files-throwback-mark small{font-size:10px;font-weight:900;letter-spacing:.16em;color:#ef6973;text-transform:uppercase;position:relative;z-index:2}
      .answer-files-throwback-mark strong{font:900 clamp(42px,7vw,72px)/.82 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase;position:relative;z-index:2}
      .answer-files-throwback-mark span{font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:#9ab7ee;position:relative;z-index:2}
      .answer-files-throwback-copy{padding:30px;display:flex;flex-direction:column;justify-content:center}
      .answer-files-throwback-copy>span{font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#ef6973}
      .answer-files-throwback-copy h3{margin:8px 0 12px;font:700 clamp(28px,4vw,45px)/.95 Georgia,serif;letter-spacing:-.035em}
      .answer-files-throwback-copy p{margin:0 0 17px;color:#beb9b2;line-height:1.55}
      .answer-files-detail-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:17px}
      .answer-files-detail-chips i{font-style:normal;border:1px solid #343843;padding:7px 9px;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#dcd7cf}
      .answer-files-throwback-copy b{font-size:10px;letter-spacing:.11em;text-transform:uppercase;color:#fff}

      .answer-files-nba-section{padding:42px 0;background:#090b10;color:#fff;border-top:1px solid #292d35;border-bottom:1px solid #292d35;position:relative;overflow:hidden}
      .answer-files-nba-section:after{content:'ANSWER';position:absolute;right:-15px;bottom:-30px;font:1000 clamp(76px,13vw,180px)/.8 Arial,sans-serif;letter-spacing:-.07em;color:rgba(255,255,255,.025);pointer-events:none}
      .answer-files-nba-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr .9fr;gap:1px;background:#2c3038;border:1px solid #2c3038}
      .answer-files-nba-copy,.answer-files-nba-index{background:#0d1016;padding:30px}
      .answer-files-nba-kicker{font-size:10px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#ef6973}
      .answer-files-nba-copy h2{margin:9px 0 12px;font:900 clamp(44px,7vw,78px)/.82 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase}
      .answer-files-nba-copy h2 em{display:block;color:#9ab7ee;font:italic 500 .48em/1 Georgia,serif;letter-spacing:-.03em;margin-top:10px;text-transform:none}
      .answer-files-nba-copy p{margin:0;color:#c4c0ba;max-width:700px;line-height:1.55}
      .answer-files-nba-copy a{display:inline-block;margin-top:19px;background:#b7222d;color:#fff;text-decoration:none;padding:11px 14px;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .answer-files-nba-index>span{font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#9ab7ee}
      .answer-files-nba-index-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:13px}
      .answer-files-nba-index-grid div{border:1px solid #2c3038;background:#10141c;padding:11px}
      .answer-files-nba-index-grid b{display:block;color:#ef6973;font:900 14px/1 Georgia,serif;margin-bottom:4px}
      .answer-files-nba-index-grid small{font-size:9px;line-height:1.3;letter-spacing:.05em;text-transform:uppercase;color:#d5d1c9}

      @media(max-width:760px){
        .answer-files-throwback-card,.answer-files-nba-inner{grid-template-columns:1fr}
        .answer-files-throwback-mark{min-height:220px;border-right:0;border-bottom:1px solid #292d35}
        .answer-files-throwback-copy,.answer-files-nba-copy,.answer-files-nba-index{padding:22px}
        .answer-files-nba-index-grid{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(style);
  }

  try{
    if(typeof siteSearchIndex!=='undefined' && !siteSearchIndex.some(i=>i.url===answerUrl)){
      siteSearchIndex.push({title:'The Answer Files',type:'NBA Legends Archive',url:answerUrl,desc:'The full Allen Iverson archive from Georgetown to the Hall of Fame',terms:'allen iverson ai answer files georgetown 1996 draft 2001 mvp sixers philly denver culture hall fame'});
    }
  }catch(e){}

  if(isHome){
    const grid=document.querySelector('.home-franchise-grid');
    if(grid && !grid.querySelector('[data-answer-files-home]')){
      const card=document.createElement('a');
      card.className='home-franchise answer-files-home-card';
      card.href=answerUrl;
      card.dataset.answerFilesHome='';
      card.innerHTML=`<small>BASKETBALL HISTORY</small><strong>The Answer Files</strong><span>Allen Iverson’s game, style, cultural weight and the full story from Georgetown to the Hall of Fame.</span><span class="answer-detail-line">Georgetown • 1996 Draft • 2001 MVP • Culture • Denver • Legacy</span><b>Open files →</b>`;
      const mamba=grid.querySelector('a[href="mamba-files.html"]');
      if(mamba)mamba.after(card); else grid.prepend(card);
    }
  }

  if(pageKey==='throwback'){
    const section=document.querySelector('#nba-flashback');
    const shell=section?.querySelector('.shell');
    const storyGrid=section?.querySelector('.archive-story-grid');
    if(shell && !shell.querySelector('[data-answer-files-throwback]')){
      const card=document.createElement('a');
      card.className='answer-files-throwback-card';
      card.href=answerUrl;
      card.dataset.answerFilesThrowback='';
      card.innerHTML=`
        <div class="answer-files-throwback-mark">
          <small>NBA LEGENDS ARCHIVE</small>
          <strong>THE<br>ANSWER<br>FILES</strong>
          <span>ALLEN IVERSON • #3 • CULTURE</span>
        </div>
        <div class="answer-files-throwback-copy">
          <span>10 FILES • FULL CAREER ARCHIVE</span>
          <h3>He Changed the Game. Then He Changed the Culture.</h3>
          <p>From Georgetown and the legendary 1996 Draft to the Jordan crossover, Larry Brown, the 2001 MVP run, Philadelphia, Denver and the Hall of Fame.</p>
          <div class="answer-files-detail-chips"><i>Georgetown</i><i>1996 Draft</i><i>Rookie AI</i><i>2001 MVP</i><i>Philly</i><i>Culture</i><i>Denver</i><i>Legacy</i></div>
          <b>ENTER THE ANSWER FILES →</b>
        </div>`;
      if(storyGrid)storyGrid.after(card); else shell.appendChild(card);
    }
  }

  if(pageKey==='nba'){
    const latest=document.querySelector('.nba-latest');
    if(latest && !document.querySelector('[data-answer-files-nba]')){
      const section=document.createElement('section');
      section.className='answer-files-nba-section';
      section.dataset.answerFilesNba='';
      section.innerHTML=`
        <div class="shell">
          <div class="answer-files-nba-inner">
            <div class="answer-files-nba-copy">
              <span class="answer-files-nba-kicker">4DK NBA • LEGENDS ARCHIVE</span>
              <h2>THE ANSWER FILES <em>Allen Iverson • Basketball • Culture • Legacy</em></h2>
              <p>A permanent 4DK archive built to cover every part of Allen Iverson’s story — the college rise, the No. 1 pick, rookie electricity, Larry Brown, the 2001 masterpiece, Philadelphia, Denver, cultural impact and where The Answer belongs all time.</p>
              <a href="${answerUrl}">EXPLORE THE FULL ARCHIVE →</a>
            </div>
            <aside class="answer-files-nba-index">
              <span>THE FILE INDEX</span>
              <div class="answer-files-nba-index-grid">
                <div><b>001</b><small>Georgetown</small></div><div><b>002</b><small>1996 Draft</small></div>
                <div><b>003</b><small>Rookie AI</small></div><div><b>004</b><small>Larry Brown</small></div>
                <div><b>005</b><small>2001 MVP + Finals</small></div><div><b>006</b><small>Sixers Legacy</small></div>
                <div><b>007</b><small>Cultural Impact</small></div><div><b>008</b><small>Denver + Melo</small></div>
                <div><b>009</b><small>Hall of Fame</small></div><div><b>010</b><small>All-Time Verdict</small></div>
              </div>
            </aside>
          </div>
        </div>`;
      latest.after(section);
    }
  }
})();
// 4DK NFL MVP Watch — Week 1 Monday update (pre-MNF).
// Add-only runtime refresh: preserves the NFL page, scoreboard, recaps, rankings and all other sections.
(() => {
  if(pageKey !== 'nfl') return;

  const watch = document.querySelector('#mvp-watch');
  if(!watch || watch.dataset.week1MondayUpdate === 'true') return;

  // Preserve the existing embedded portraits for returning players.
  const existingImages = {};
  watch.querySelectorAll('.mvp-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent?.trim();
    const src = card.querySelector('.mvp-photo img')?.getAttribute('src');
    if(name && src) existingImages[name] = src;
  });

  const board = [
    {
      rank: 1, name: 'Josh Allen',
      meta: 'QB • BUF • 334 PASS YDS • 4 TOTAL TD',
      note: 'The early leader stays on top. Four total touchdowns and a late go-ahead strike in Buffalo’s 36–31 road win over Houston gave Allen the strongest complete MVP statement of Week 1.',
      move: 'HOLD • EARLY LEADER', cls: 'hot'
    },
    {
      rank: 2, name: 'Lamar Jackson',
      meta: 'QB • BAL • 324 PASS YDS • 40 RUSH YDS • 2 TOTAL TD',
      note: 'Baltimore rolled 41–23 and Lamar was efficient, explosive and turnover-free. The Ravens already look like an offense capable of keeping him in the race all season.',
      move: '▲ 1 • RISING', cls: 'up'
    },
    {
      rank: 3, name: 'Caleb Williams',
      meta: 'QB • CHI • 334 TOTAL YDS • 4 TOTAL TD',
      note: 'Chicago dropped 59 points and Caleb accounted for four touchdowns. That kind of Year 3 leap is exactly what could turn him from breakout candidate into a real MVP threat.',
      move: '▲ 4 • BIG RISE', cls: 'up'
    },
    {
      rank: 4, name: 'Brock Purdy',
      meta: 'QB • SF • 205 PASS YDS • 3 TD',
      note: 'Three touchdown passes and a 27–7 statement win over the Rams keep Purdy near the top. San Francisco looked organized, physical and ready to win right now.',
      move: 'HOLD • STRONG START', cls: 'hot'
    },
    {
      rank: 5, name: 'Jahmyr Gibbs',
      meta: 'RB • DET • 156 RUSH YDS • 2 TD',
      note: 'Gibbs carried Detroit’s offense with 156 rushing yards and two scores in an overtime win. For a non-QB to stay this high, he needs monster weeks — and Week 1 qualified.',
      move: '▲ 3 • RISING', cls: 'up'
    },
    {
      rank: 6, name: 'Patrick Mahomes',
      meta: 'QB • KC • MNF VS DEN',
      note: 'No movement yet. Mahomes gets his first chance tonight to begin the Chiefs comeback story against Denver, so his spot remains provisional until Monday Night Football is finished.',
      move: 'HOLD • MNF PENDING', cls: ''
    },
    {
      rank: 7, name: 'Trevor Lawrence',
      meta: 'QB • JAX • 245 PASS YDS • 4 TD • 0 INT',
      note: 'New to the board after a nearly flawless opener. Four touchdowns, no interceptions and a 34–10 win put Lawrence directly into the early conversation.',
      move: 'NEW • 🔥 WATCH', cls: 'hot',
      image: 'https://a.espncdn.com/i/headshots/nfl/players/full/4360310.png'
    },
    {
      rank: 8, name: 'Derrick Henry',
      meta: 'RB • BAL • 144 RUSH YDS • 3 TD',
      note: 'Henry enters after bulldozing Indianapolis for 144 yards and three touchdowns. Lamar may drive Baltimore’s MVP case, but Henry deserves his own place on the board after that opener.',
      move: 'NEW • 🔥 WATCH', cls: 'hot',
      image: 'https://a.espncdn.com/i/headshots/nfl/players/full/3043078.png'
    },
    {
      rank: 9, name: 'Joe Burrow',
      meta: 'QB • CIN • 254 PASS YDS • 1 TD • 1 INT',
      note: 'Cincinnati got the win, but the defense and four Tampa Bay turnovers shaped the game more than Burrow did. He stays in the ten on talent and ceiling, but Week 1 drops him hard.',
      move: '▼ 7 • FALLING', cls: 'down'
    },
    {
      rank: 10, name: 'Bijan Robinson',
      meta: 'RB • ATL • 173 SCRIMMAGE YDS • 1 REC TD',
      note: 'The individual production was still elite — 173 yards from scrimmage — but Atlanta lost 20–13. For a running back MVP case, team success has to match the numbers.',
      move: '▼ 5 • WATCH', cls: 'down'
    }
  ];

  const headCopy = watch.querySelector('.mvp-head p');
  if(headCopy){
    headCopy.textContent = 'Monday update after the Week 1 Sunday slate. Patrick Mahomes still plays tonight, so this is the 4DK board heading into Monday Night Football.';
  }

  const stamp = watch.querySelector('.mvp-stamp');
  if(stamp) stamp.innerHTML = 'WEEK 1 • MONDAY<br>SEPT. 14, 2026';

  const grid = watch.querySelector('.mvp-grid');
  if(grid){
    grid.innerHTML = board.map(p => {
      const img = p.image || existingImages[p.name] || '';
      return `
        <article class="mvp-card">
          <div class="mvp-rank">${p.rank}</div>
          <div class="mvp-photo">
            ${img ? `<img src="${img}" alt="${p.name}" loading="lazy">` : ''}
          </div>
          <div>
            <h3>${p.name}</h3>
            <div class="mvp-meta">${p.meta}</div>
            <div class="mvp-note">${p.note}</div>
            <span class="mvp-move ${p.cls}">${p.move}</span>
          </div>
        </article>`;
    }).join('');
  }

  const hm = watch.querySelector('.mvp-hm-list');
  if(hm){
    hm.innerHTML = [
      'Christian McCaffrey',
      'D’Andre Swift',
      'C.J. Stroud',
      'Zay Flowers',
      'Bryce Young',
      'Puka Nacua'
    ].map(name => `<span>${name}</span>`).join('');
  }

  const foot = watch.querySelector('.mvp-foot');
  if(foot){
    foot.textContent = 'Monday movement is based on Week 1 performance plus the preseason baseline. OUT this update: Matthew Stafford and Christian McCaffrey. Next update: after Broncos–Chiefs on Monday Night Football.';
  }

  watch.dataset.week1MondayUpdate = 'true';
})();

// 4DK NFL Rookie Watch — Week 1 Monday board.
// Add-only feature inserted directly after MVP Watch. No existing NFL content is removed.
(() => {
  if(pageKey !== 'nfl') return;
  if(document.querySelector('#rookie-watch')) return;

  const rookies = [{"rank": 1, "name": "Josiah Trotter", "team": "TB", "pos": "LB", "stats": "1 SACK • 38-YD PICK-SIX", "note": "A dream NFL debut. Trotter got home for a sack and took a Joe Burrow interception 38 yards to the house. Immediate Defensive Rookie of the Year energy.", "tag": "🔥 EARLY LEADER", "tagClass": "hot", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/buccaneers/tzxpayidmmfipoewb9bv.png"}, {"rank": 2, "name": "Dillon Thieneman", "team": "CHI", "pos": "S", "stats": "10 TKL • 8 SOLO • 1 PD", "note": "The No. 25 pick stepped right in and produced. Ten tackles, eight solo and a pass breakup in Chicago’s explosive Week 1 win made him one of the cleanest rookie debuts on the board.", "tag": "📈 STOCK UP", "tagClass": "up", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/v1778214884/bears/ogdnyasp7asfdje8qwlm.jpg"}, {"rank": 3, "name": "Caleb Downs", "team": "DAL", "pos": "S", "stats": "8 TKL • 1 SACK • 1 FF", "note": "Dallas lost, but Downs looked NFL-ready immediately. Eight tackles, a sack and a forced fumble showed the range and impact that made him a premium draft pick.", "tag": "🔥 IMPACT", "tagClass": "hot", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/cowboys/s5r3kwwpcwsaccsryk4g.png"}, {"rank": 4, "name": "Treydan Stukes", "team": "LV", "pos": "S", "stats": "1 INT • 1 PBU", "note": "Stukes won a starting job and rewarded Vegas immediately with an interception and a pass breakup in the Raiders’ 27–13 win. That is how you announce yourself.", "tag": "📈 STOCK UP", "tagClass": "up", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/v1779812407/raiders/ugi0vz1mkr2teaz8kn8y.jpg"}, {"rank": 5, "name": "David Bailey", "team": "NYJ", "pos": "EDGE", "stats": "1 SACK • 6 PRESSURES • 4 TKL", "note": "The No. 2 pick flashed exactly why the Jets invested so heavily in him. First NFL sack, steady pressure and real disruption off the edge in a convincing opening win.", "tag": "🔥 DROY WATCH", "tagClass": "hot", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/jets/vk3kv9iyqio3lbbiuavr.png"}, {"rank": 6, "name": "Denzel Boston", "team": "CLE", "pos": "WR", "stats": "2 REC • 59 YDS • 1 TD", "note": "Cleveland struggled, but Boston did not disappear with the rest of the offense. His 46-yard touchdown was one of the Browns’ few explosive plays and put his vertical talent on display.", "tag": "📈 FLASHED", "tagClass": "up", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/browns/smz27rdprihmreifekln.jpg"}, {"rank": 7, "name": "Kenyon Sadiq", "team": "NYJ", "pos": "TE", "stats": "1 REC TD • FIRST NFL SCORE", "note": "Sadiq’s first big NFL moment came fast: a touchdown in his debut. The box score was modest, but the Jets already showed they are comfortable featuring him near the goal line.", "tag": "👀 ROLE WATCH", "tagClass": "", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/jets/yespxuci41ovoxfahyfj.png"}, {"rank": 8, "name": "Sonny Styles", "team": "WAS", "pos": "LB", "stats": "1 SACK • ACTIVE VS PHI", "note": "Styles made his presence felt against Philadelphia, including a sack and several physical stops. The athleticism is translating and Washington already trusts him in meaningful snaps.", "tag": "📈 TRENDING", "tagClass": "up", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/commanders/ghjxvgpyvvmf8da4jtvd.jpg"}, {"rank": 9, "name": "KC Concepcion", "team": "CLE", "pos": "WR", "stats": "58 SCRIMMAGE YDS", "note": "Four catches, 43 receiving yards and another 15 on the ground showed Cleveland wants the ball in his hands. The fumble keeps him lower, but the usage is already encouraging.", "tag": "👀 USAGE WATCH", "tagClass": "", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/browns/dhpkiue9r6s56gppzdc8.jpg"}, {"rank": 10, "name": "Jeremiyah Love", "team": "ARI", "pos": "RB", "stats": "1 TD • SCORED ON 3RD NFL CARRY", "note": "The workload was limited, but the explosiveness was immediate. Love found the end zone on just his third NFL carry and gave Arizona another reason to expand his role.", "tag": "⚡ BIG-PLAY WATCH", "tagClass": "hot", "image": "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_auto/cardinals/fr6kxiyfgfqwukop6a7p.jpg"}];
  const honorable = ["Omar Cooper Jr. • NYJ", "Eli Raridon • NE", "Mike Washington Jr. • LV", "Mansoor Delane • KC • MNF", "Peter Woods • KC • MNF"];

  if(!document.getElementById('fourdk-rookie-watch-styles')) {
    const style = document.createElement('style');
    style.id = 'fourdk-rookie-watch-styles';
    style.textContent = `
      .rookie-watch{background:#0a0d0b;color:#f6f2e8;border-bottom:1px solid #202620;padding:44px 0 48px;position:relative;overflow:hidden}
      .rookie-watch:after{content:'ROOKIES';position:absolute;right:-16px;bottom:-34px;font:1000 clamp(84px,14vw,190px)/.8 Arial,sans-serif;letter-spacing:-.07em;color:rgba(255,255,255,.022);pointer-events:none}
      .rookie-head{position:relative;z-index:2;display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:22px}
      .rookie-kicker{font-size:11px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase;color:#ff5a36}
      .rookie-head h2{margin:5px 0 7px;font-size:clamp(34px,6vw,58px);line-height:.92;letter-spacing:-.045em;text-transform:uppercase}
      .rookie-head p{margin:0;color:#aaa89f;max-width:720px;font-size:14px;line-height:1.5}
      .rookie-stamp{flex:none;border:1px solid #30362f;padding:10px 12px;text-align:right;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#b9b7ae}
      .rookie-grid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .rookie-card{display:grid;grid-template-columns:58px 92px minmax(0,1fr);gap:16px;align-items:center;background:#111511;border:1px solid #242a24;padding:15px 16px;min-width:0}
      .rookie-rank{font-size:32px;font-weight:1000;line-height:1;color:#f7f3e9;letter-spacing:-.05em;text-align:center}
      .rookie-photo{width:92px;height:92px;border-radius:12px;overflow:hidden;border:1px solid #313831;background:linear-gradient(145deg,#1d251f,#0e120f);box-shadow:0 10px 26px rgba(0,0,0,.28);position:relative;display:grid;place-items:center}
      .rookie-photo span{position:absolute;inset:auto 0 9px;text-align:center;font:1000 22px/1 Arial,sans-serif;color:rgba(255,255,255,.12);letter-spacing:-.05em}
      .rookie-photo img{display:block;width:100%;height:100%;object-fit:cover;position:relative;z-index:2}
      .rookie-card h3{margin:0 0 3px;font-size:17px;line-height:1.05;text-transform:uppercase}
      .rookie-meta{font-size:10px;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:#ff6b45}
      .rookie-note{margin-top:6px;color:#b9b8b1;font-size:12px;line-height:1.38}
      .rookie-tag{display:block;margin-top:14px;font-size:10px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;color:#d8d5cb;white-space:nowrap}
      .rookie-tag.hot{color:#ff6b45} .rookie-tag.up{color:#78d897}
      .rookie-hm{position:relative;z-index:2;margin-top:18px;border-top:1px solid #2a302a;padding-top:18px;display:flex;gap:12px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}
      .rookie-hm strong{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#ff5a36}
      .rookie-hm-list{display:flex;gap:8px;flex-wrap:wrap}
      .rookie-hm-list span{border:1px solid #343a34;background:#0d100e;padding:8px 10px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.05em}
      .rookie-foot{position:relative;z-index:2;margin-top:15px;color:#7f827c;font-size:11px;line-height:1.45}
      @media(max-width:920px){.rookie-grid{grid-template-columns:1fr}}
      @media(max-width:760px){
        .rookie-head{align-items:flex-start;flex-direction:column}
        .rookie-stamp{text-align:left}
        .rookie-card{grid-template-columns:48px 74px minmax(0,1fr);gap:14px;align-items:start}
        .rookie-photo{width:74px;height:74px;border-radius:10px}
        .rookie-rank{font-size:28px;padding-top:16px}
        .rookie-note{font-size:11.5px}
      }
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement('section');
  section.className = 'rookie-watch';
  section.id = 'rookie-watch';
  section.setAttribute('aria-label','4 Da Kulture NFL Rookie Watch');
  section.innerHTML = `
    <div class="shell">
      <div class="rookie-head">
        <div>
          <span class="rookie-kicker">4DK WEEKLY NFL FEATURE</span>
          <h2>TOP 10 ROOKIE WATCH</h2>
          <p>Week 1 impact board after Sunday’s games. Production matters, but so do role, winning impact and what the film says about who can sustain it.</p>
        </div>
        <div class="rookie-stamp">WEEK 1 • MONDAY<br>SEPT. 14, 2026</div>
      </div>

      <div class="rookie-grid">
        ${rookies.map(p => {
          const initials = p.name.split(' ').map(x => x[0]).join('').slice(0,2);
          return `
            <article class="rookie-card">
              <div class="rookie-rank">${p.rank}</div>
              <div class="rookie-photo">
                <span>${initials}</span>
                <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.remove()">
              </div>
              <div>
                <h3>${p.name}</h3>
                <div class="rookie-meta">${p.pos} • ${p.team} • ${p.stats}</div>
                <div class="rookie-note">${p.note}</div>
                <span class="rookie-tag ${p.tagClass}">${p.tag}</span>
              </div>
            </article>`;
        }).join('')}
      </div>

      <div class="rookie-hm">
        <strong>5 Honorable Mentions</strong>
        <div class="rookie-hm-list">
          ${honorable.map(name => `<span>${name}</span>`).join('')}
        </div>
      </div>

      <div class="rookie-foot">4DK Rookie Watch updates weekly. Chiefs rookies Mansoor Delane and Peter Woods remain eligible to move into the Top 10 after Monday Night Football.</div>
    </div>`;

  const mvp = document.querySelector('#mvp-watch');
  if(mvp) mvp.after(section);
  else {
    const scoreboard = document.querySelector('#scoreboard');
    if(scoreboard) scoreboard.after(section);
    else document.querySelector('main')?.appendChild(section);
  }

  const nflNav = document.querySelector('.nfl-v2-nav');
  if(nflNav && !nflNav.querySelector('a[href="#rookie-watch"]')) {
    const link = document.createElement('a');
    link.href = '#rookie-watch';
    link.textContent = 'Rookie Watch';
    nflNav.appendChild(link);
  }
})();

// 4DK Week 1 MNF Headline + post-Week 1 NFL Power Rankings.
// Add-only update. Preserves every existing section and feature.
(() => {
  const mnfUrl = 'nfl-mnf-recap-week1.html';

  try {
    if(typeof siteSearchIndex !== 'undefined' && !siteSearchIndex.some(i => i.url === mnfUrl)) {
      siteSearchIndex.push({
        title:'The King Is Back: Chiefs Dominate Denver on Monday Night',
        type:'NFL • MNF Headline',
        url:mnfUrl,
        desc:'Mahomes returns, Kenneth Walker erupts and Kansas City humbles Denver 31–10.',
        terms:'chiefs broncos mahomes kenneth walker monday night football mnf week 1 recap denver kansas city'
      });
    }
  } catch(e) {}

  if(pageKey !== 'nfl') return;

  // --- Monday Night Football headline card ---
  if(!document.getElementById('fourdk-mnf-week1-styles')) {
    const style = document.createElement('style');
    style.id = 'fourdk-mnf-week1-styles';
    style.textContent = `
      .fourdk-mnf-headline{padding:38px 0;background:#070a08;color:#f7f2e8;border-top:1px solid #252c27;border-bottom:1px solid #252c27;position:relative;overflow:hidden}
      .fourdk-mnf-headline:after{content:'31–10';position:absolute;right:-18px;bottom:-36px;font:1000 clamp(88px,15vw,190px)/.8 Arial,sans-serif;letter-spacing:-.08em;color:rgba(255,255,255,.025);pointer-events:none}
      .mnf-headline-card{position:relative;z-index:2;display:grid;grid-template-columns:.78fr 1.22fr;border:1px solid #303832;background:linear-gradient(145deg,#111611,#090c0a);text-decoration:none;color:inherit;overflow:hidden}
      .mnf-score-panel{min-height:310px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(circle at 20% 15%,rgba(227,24,55,.19),transparent 42%),radial-gradient(circle at 85% 82%,rgba(251,79,20,.14),transparent 38%),#0c100d;border-right:1px solid #303832}
      .mnf-score-panel small{font:1000 10px/1 Arial,sans-serif;letter-spacing:.16em;color:#ff654b;text-transform:uppercase}
      .mnf-teams{display:flex;align-items:center;justify-content:center;gap:18px}
      .mnf-teams img{width:78px;height:78px;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(0,0,0,.38))}
      .mnf-final{text-align:center}
      .mnf-final strong{display:block;font:1000 clamp(54px,8vw,82px)/.9 Arial,sans-serif;letter-spacing:-.07em}
      .mnf-final span{font:900 9px/1 Arial,sans-serif;letter-spacing:.14em;color:#9ba29d;text-transform:uppercase}
      .mnf-copy{padding:30px;display:flex;flex-direction:column;justify-content:center}
      .mnf-copy>span{font:1000 10px/1 Arial,sans-serif;letter-spacing:.14em;color:#ff654b;text-transform:uppercase}
      .mnf-copy h2{margin:9px 0 12px;font:1000 clamp(38px,6vw,67px)/.86 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase}
      .mnf-copy h2 em{color:#ffcf54;font-style:normal}
      .mnf-copy p{margin:0;color:#b7beb8;font-size:14px;line-height:1.58;max-width:760px}
      .mnf-takeaways{display:flex;flex-wrap:wrap;gap:7px;margin:17px 0}
      .mnf-takeaways i{font-style:normal;border:1px solid #3a433d;padding:7px 9px;color:#e9ece8;font:900 9px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
      .mnf-copy b{font:1000 10px/1 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff}
      @media(max-width:760px){.mnf-headline-card{grid-template-columns:1fr}.mnf-score-panel{min-height:230px;border-right:0;border-bottom:1px solid #303832}.mnf-copy{padding:23px}.mnf-teams img{width:64px;height:64px}}
    `;
    document.head.appendChild(style);
  }

  if(!document.querySelector('[data-mnf-week1-headline]')) {
    const section = document.createElement('section');
    section.className = 'fourdk-mnf-headline';
    section.id = 'mnf-headline';
    section.dataset.mnfWeek1Headline = '';
    section.innerHTML = `
      <div class="shell">
        <a class="mnf-headline-card" href="${mnfUrl}">
          <div class="mnf-score-panel">
            <small>4DK NFL • MONDAY NIGHT HEADLINE</small>
            <div class="mnf-teams">
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/den.png" alt="Denver Broncos logo">
              <span style="font-weight:1000;color:#6f7771">@</span>
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/kc.png" alt="Kansas City Chiefs logo">
            </div>
            <div class="mnf-final"><strong>31–10</strong><span>FINAL • ARROWHEAD</span></div>
          </div>
          <div class="mnf-copy">
            <span>WEEK 1 • SEPTEMBER 14, 2026</span>
            <h2>THE KING<br>IS <em>BACK.</em></h2>
            <p>Mahomes returned from major knee surgery, Kenneth Walker ran through Denver, Kansas City controlled both lines and the Broncos’ vaunted defense got humbled in a 21-point statement.</p>
            <div class="mnf-takeaways"><i>Mahomes Returns</i><i>Walker: 173 Rush Yards</i><i>392–176 Yard Edge</i><i>Denver Reality Check</i></div>
            <b>READ THE FULL 4DK MNF BREAKDOWN →</b>
          </div>
        </a>
      </div>`;
    const rookie = document.querySelector('#rookie-watch');
    const mvp = document.querySelector('#mvp-watch');
    const anchor = rookie || mvp || document.querySelector('#scoreboard');
    if(anchor) anchor.after(section);
  }

  const nflNav = document.querySelector('.nfl-v2-nav');
  if(nflNav && !nflNav.querySelector('a[href="#mnf-headline"]')) {
    const a = document.createElement('a');
    a.href = '#mnf-headline';
    a.textContent = 'MNF Recap';
    const rookieLink = nflNav.querySelector('a[href="#rookie-watch"]');
    if(rookieLink) rookieLink.after(a); else nflNav.appendChild(a);
  }

  // --- Post-Week 1 power rankings refresh ---
  const week1Rankings = [{"team": "Kansas City Chiefs", "abbr": "KC", "prev": 4, "meta": "1–0 • W 31–10 vs DEN", "note": "Mahomes is back, Kenneth Walker changed the offense, and Kansas City just flattened the preseason AFC favorite. The revenge season opens at No. 1."}, {"team": "Buffalo Bills", "abbr": "BUF", "prev": 5, "meta": "1–0 • W 36–31 at HOU", "note": "Josh Allen delivered four total touchdowns and the late winning strike. Buffalo looked like a team that still expects to play deep into January."}, {"team": "San Francisco 49ers", "abbr": "SF", "prev": 7, "meta": "1–0 • W 27–7 vs LAR", "note": "The most complete NFC statement of Week 1. Purdy threw three touchdowns and the defense made a loaded Rams offense look ordinary."}, {"team": "Baltimore Ravens", "abbr": "BAL", "prev": 13, "meta": "1–0 • W 41–23 at IND", "note": "Lamar was explosive and efficient, Derrick Henry scored three times and Baltimore put up 506 yards. That looked like a contender."}, {"team": "Chicago Bears", "abbr": "CHI", "prev": 8, "meta": "1–0 • W 59–37 at CAR", "note": "Fifty-nine points changes the conversation immediately. Caleb Williams accounted for four touchdowns and Chicago’s offensive ceiling looks real."}, {"team": "Philadelphia Eagles", "abbr": "PHI", "prev": 9, "meta": "1–0 • W 24–22 vs WAS", "note": "Not dominant, but Philadelphia survived a division fight and remains one of the league’s most complete rosters."}, {"team": "Detroit Lions", "abbr": "DET", "prev": 3, "meta": "1–0 • W 31–30 OT vs NO", "note": "Detroit escaped, and Jahmyr Gibbs was excellent. The Lions remain dangerous, but Week 1 was much shakier than the preseason No. 3 slot suggested."}, {"team": "Cincinnati Bengals", "abbr": "CIN", "prev": 10, "meta": "1–0 • W 33–27 vs TB", "note": "The Bengals took advantage of Tampa Bay mistakes and got the win. Good start, but the offense was not yet at full Burrow-level force."}, {"team": "Seattle Seahawks", "abbr": "SEA", "prev": 6, "meta": "1–0 • W 13–10 vs NE", "note": "The champs found a way on ring night. It was ugly and costly, but surviving still matters while Seattle settles into its new season."}, {"team": "Jacksonville Jaguars", "abbr": "JAX", "prev": 15, "meta": "1–0 • W 34–10 vs CLE", "note": "Trevor Lawrence threw four touchdowns without a pick and Jacksonville handled business from start to finish. One of Week 1’s cleanest wins."}, {"team": "Houston Texans", "abbr": "HOU", "prev": 11, "meta": "0–1 • L 31–36 vs BUF", "note": "Houston lost, but pushed Buffalo to the final seconds. The Texans stay high because the performance still looked like playoff-level football."}, {"team": "Minnesota Vikings", "abbr": "MIN", "prev": 26, "meta": "1–0 • W 39–22 vs GB", "note": "The biggest upward mover. Minnesota’s offense exploded against a division rival and immediately made the preseason projection look too low."}, {"team": "Denver Broncos", "abbr": "DEN", "prev": 2, "meta": "0–1 • L 10–31 at KC", "note": "The defense that entered the year with elite expectations was pushed around for 392 yards. Denver is still talented, but the Week 1 reality check was severe."}, {"team": "Los Angeles Rams", "abbr": "LAR", "prev": 1, "meta": "0–1 • L 7–27 vs SF", "note": "The preseason No. 1 got humbled by San Francisco. Too much talent to bury, but a 20-point loss forces a major correction."}, {"team": "New York Giants", "abbr": "NYG", "prev": 20, "meta": "1–0 • W 28–20 vs DAL", "note": "Jaxson Dart looked comfortable, Malik Nabers is back and the John Harbaugh era opened with a division win. The Giants feel different."}, {"team": "Las Vegas Raiders", "abbr": "LV", "prev": 27, "meta": "1–0 • W 27–13 vs MIA", "note": "Vegas was more physical and more composed than Miami. The Raiders already look better than the six-win preseason baseline."}, {"team": "Pittsburgh Steelers", "abbr": "PIT", "prev": 18, "meta": "1–0 • W 20–13 vs ATL", "note": "The formula worked: functional offense, defense making the biggest play. Pittsburgh does not need pretty if the defense controls games."}, {"team": "Arizona Cardinals", "abbr": "ARI", "prev": 32, "meta": "1–0 • W 26–14 at LAC", "note": "From No. 32 to a road win over the Chargers. Arizona earned a real jump without pretending one game erases every preseason question."}, {"team": "Tampa Bay Buccaneers", "abbr": "TB", "prev": 22, "meta": "0–1 • L 27–33 at CIN", "note": "Four lost fumbles were fatal, but Tampa still stayed within one score. The Bucs are better than the record, if they stop beating themselves."}, {"team": "Washington Commanders", "abbr": "WAS", "prev": 23, "meta": "0–1 • L 22–24 at PHI", "note": "Washington went into Philadelphia and nearly stole it. A loss, but not the kind that makes us lower the long-term ceiling much."}, {"team": "New England Patriots", "abbr": "NE", "prev": 12, "meta": "0–1 • L 10–13 at SEA", "note": "New England had a chance on ring night and let it slip. The defense traveled, but the offense needs more before this looks like another Super Bowl-level team."}, {"team": "Green Bay Packers", "abbr": "GB", "prev": 21, "meta": "0–1 • L 22–39 at MIN", "note": "Giving up 39 to Minnesota is a rough way to start a division race. The Packers still have upside, but Week 1 exposed real defensive problems."}, {"team": "New Orleans Saints", "abbr": "NO", "prev": 28, "meta": "0–1 • L 30–31 OT at DET", "note": "Tyler Shough threw for 410 yards and New Orleans nearly stole one in Detroit. The Saints move up even in defeat because that offense showed life."}, {"team": "Los Angeles Chargers", "abbr": "LAC", "prev": 17, "meta": "0–1 • L 14–26 vs ARI", "note": "A home loss to the preseason No. 32 team is a bad opener. The Chargers have too much talent to panic, but they have to earn their way back up."}, {"team": "Dallas Cowboys", "abbr": "DAL", "prev": 16, "meta": "0–1 • L 20–28 at NYG", "note": "Another slow start and a division loss. Dallas has enough talent to recover, but right now the Cowboys look more middle-of-the-pack than contender."}, {"team": "New York Jets", "abbr": "NYJ", "prev": 30, "meta": "1–0 • W 23–10 at TEN", "note": "The Jets controlled Tennessee and their young defense showed teeth. It is only one win, but the floor already looks higher than expected."}, {"team": "Carolina Panthers", "abbr": "CAR", "prev": 14, "meta": "0–1 • L 37–59 vs CHI", "note": "Bryce Young made plays, but giving up 59 points destroys the preseason sleeper hype for now. Carolina has to prove it can stop somebody."}, {"team": "Atlanta Falcons", "abbr": "ATL", "prev": 24, "meta": "0–1 • L 13–20 at PIT", "note": "Bijan produced, but the passing game and turnovers held the offense back. Atlanta needs more than one great weapon to climb."}, {"team": "Indianapolis Colts", "abbr": "IND", "prev": 19, "meta": "0–1 • L 23–41 vs BAL", "note": "Jonathan Taylor ran well, but Baltimore controlled the game. Indianapolis already looks like a team that will live or die with quarterback play."}, {"team": "Miami Dolphins", "abbr": "MIA", "prev": 25, "meta": "0–1 • L 13–27 at LV", "note": "The new quarterback chapter opened with a flat road performance. Miami has speed, but the offense did not look connected."}, {"team": "Tennessee Titans", "abbr": "TEN", "prev": 29, "meta": "0–1 • L 10–23 vs NYJ", "note": "The development season looked exactly like a development season. Tennessee needs more offensive answers around its young core."}, {"team": "Cleveland Browns", "abbr": "CLE", "prev": 31, "meta": "0–1 • L 10–34 at JAX", "note": "Jacksonville dominated them, the offense never found rhythm and the quarterback conversation is already getting louder. Bottom of the board for now."}];
  const logoCodes = {
    ARI:'ari',ATL:'atl',BAL:'bal',BUF:'buf',CAR:'car',CHI:'chi',CIN:'cin',CLE:'cle',
    DAL:'dal',DEN:'den',DET:'det',GB:'gb',HOU:'hou',IND:'ind',JAX:'jax',KC:'kc',
    LV:'lv',LAC:'lac',LAR:'lar',MIA:'mia',MIN:'min',NE:'ne',NO:'no',NYG:'nyg',
    NYJ:'nyj',PHI:'phi',PIT:'pit',SEA:'sea',SF:'sf',TB:'tb',TEN:'ten',WAS:'wsh'
  };

  const escPR = (v='') => String(v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function movePR(team, rank) {
    const delta = team.prev - rank;
    if(delta > 0) return {text:`↑ ${delta}`, cls:'up'};
    if(delta < 0) return {text:`↓ ${Math.abs(delta)}`, cls:'down'};
    return {text:'—', cls:''};
  }

  function badgePR(team) {
    const code = logoCodes[team.abbr] || team.abbr.toLowerCase();
    return `<span class="pr-badge" aria-label="${escPR(team.team)} logo"><span class="pr-badge-fallback">${escPR(team.abbr)}</span><img src="https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'"></span>`;
  }

  function applyWeek1PowerRankings() {
    const section = document.querySelector('#power-rankings.fourdk-power-rankings.nfl');
    if(!section) return false;
    if(section.dataset.week1Final === 'true') return true;

    const deck = section.querySelector('.pr-deck');
    if(deck) deck.textContent = 'Week 1 is complete. Kansas City takes over No. 1 after dominating Denver, while San Francisco, Baltimore and Chicago make major early statements. One week matters — but roster strength and championship ceiling still keep us from overreacting.';

    const stampStrong = section.querySelector('.pr-stamp strong');
    const stampDate = section.querySelector('.pr-stamp span');
    if(stampStrong) stampStrong.textContent = 'POST-WEEK 1';
    if(stampDate) stampDate.textContent = 'UPDATED SEPTEMBER 14, 2026';

    const top3 = section.querySelector('.pr-top3');
    if(top3) {
      top3.innerHTML = week1Rankings.slice(0,3).map((t,i) =>
        `<article class="pr-podium" data-rank="${i+1}"><small>#${i+1} • ${escPR(t.abbr)}</small><b>${escPR(t.team)}</b><span>${escPR(t.note)}</span></article>`
      ).join('');
    }

    const board = section.querySelector('[data-pr-board]');
    if(board) {
      board.classList.remove('expanded');
      board.innerHTML = week1Rankings.map((t,i) => {
        const rank = i + 1;
        const move = movePR(t, rank);
        return `<article class="pr-row ${i>=10?'pr-extra':''}">
          <div class="pr-rank">${rank}</div>
          <div class="pr-team">${badgePR(t)}<span><b>${escPR(t.team)}</b><small>NFL POWER BOARD</small></span></div>
          <div class="pr-meta">${escPR(t.meta)}</div>
          <div class="pr-note">${escPR(t.note)}</div>
          <div class="pr-move ${move.cls}">${move.text}</div>
        </article>`;
      }).join('');
    }

    const toggle = section.querySelector('[data-pr-toggle]');
    if(toggle) toggle.textContent = 'SHOW ALL 32 TEAMS ↓';

    const bottom = section.querySelector('.pr-note-bottom');
    if(bottom) bottom.textContent = '4DK power rankings are opinion-based. Week 1 results now count, but matchup quality, injuries, roster strength, form and championship ceiling still matter. Movement shown versus the preseason baseline.';

    section.dataset.week1Final = 'true';
    return true;
  }

  function queuePowerRefresh() {
    if(applyWeek1PowerRankings()) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if(applyWeek1PowerRankings() || tries >= 30) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', queuePowerRefresh, {once:true});
  else queuePowerRefresh();
})();
