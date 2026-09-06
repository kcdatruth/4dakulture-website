const menuBtn=document.getElementById('menuBtn');const mobileNav=document.getElementById('mobileNav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));

// 4DK team-specific article styling.
// This keeps the regular site look everywhere else and loads team colors only
// on the selected single-team NBA features.
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
