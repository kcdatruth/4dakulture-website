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
  const current = Array.from(document.querySelectorAll('main a[href], #fourdk-fresh-headlines a')).map(link => ({
    title: link.hasAttribute('data-nightcap-link') ? document.querySelector('#night-title').textContent : link.textContent.trim(),
    type: 'Front page', url: link.getAttribute('href'), desc: '', terms: ''
  }));
  return [...current, ...siteSearchIndex]
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

    return;
  }
  const hits=search4DK(q);
  siteSearchResults.replaceChildren();
  if (!hits.length) siteSearchResults.textContent = 'No 4DK result for ' + q + ' yet.';
  for (const item of hits) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = item.url;
    const label = document.createElement('span');
    label.className = 'result-type';
    label.textContent = item.type;
    const name = document.createElement('strong');
    name.textContent = item.title;
    link.append(label, name);
    siteSearchResults.append(link);
  }
  siteSearchResults.hidden=false;

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

  }
});
siteSearchInput?.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    siteSearchResults.hidden=true;

    siteSearchInput.blur();
  }
});

const menuButton = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileNav');
function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}
menuButton.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  }
});
function published(item) {
  return item && typeof item.title === 'string' && item.title.trim()
    && /^\d{4}-\d{2}-\d{2}$/.test(item.date)
    && /^[a-z0-9][a-z0-9-]*\.html$/.test(item.url);
}
function newest(items) {
  return (Array.isArray(items) ? items : []).filter(published).sort((a,b) => b.date.localeCompare(a.date));
}
function updateLink(link, item, prefix = '') {
  link.href = item.url;
  link.textContent = prefix + item.title;
}
async function readFeed(path, render) {
  try {
    const response = await fetch(path, {cache:'no-store'});
    if (response.ok) render(await response.json());
  } catch { /* Retain the last published HTML edition. */ }
}
readFeed('/nfl-weekly-index.json', data => {
  const articles = newest(data.articles).filter(item => item.week === data.current_week);
  if (!articles.length) return;
  updateLink(document.querySelector('[data-headline-nfl]'), articles[0], 'NFL · ');
  const links = articles.map(item => {
    const link = document.createElement('a');
    updateLink(link, item);
    return link;
  });
  const list = document.querySelector('[data-nfl-list]');
  list.replaceChildren(...links);
  const featured = articles[0];
  const summary = document.createElement('p');
  summary.className = 'nfl-feature-summary';
  summary.textContent = featured.summary || '';
  if (featured.summary) links[0].after(summary);
});
readFeed('/4dk-culture-headlines.json', data => {
  for (const category of ['music','tv']) {
    const [story] = newest(data[category]);
    if (story) updateLink(document.querySelector('[data-' + category + ']'), story);
  }
});

// Keep links into former front-page modules usable from bookmarks and other desks.
function resolveLegacySection() {
  const fragment = location.hash.slice(1);
  if (fragment && /^[\w-]+$/.test(fragment) && !document.getElementById(fragment)) {
    location.replace('homepage-classic.html#' + fragment);
  }
}
resolveLegacySection();
window.addEventListener('hashchange', resolveLegacySection);
