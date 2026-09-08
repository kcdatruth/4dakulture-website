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
