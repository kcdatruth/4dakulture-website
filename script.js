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
