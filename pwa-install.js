(() => {
  if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/service-worker.js').catch(err=>console.warn('4DK service worker registration failed:',err)));
  let deferredPrompt=null;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true||document.referrer.startsWith('android-app://');
  const path=()=>((location.pathname||'/').toLowerCase());
  const isHome=()=>path()==='/'||path().endsWith('/index.html');
  const isNFL=()=>path().endsWith('/nfl.html')||path().endsWith('/nfl');
  function addScript(src,key){if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.defer=true;s.setAttribute(`data-${key}`,'1');document.head.appendChild(s)}
  function appNav(){if(!standalone())return;if(!document.querySelector('link[data-fourdk-appnav]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/app-nav.css';l.dataset.fourdkAppnav='1';document.head.appendChild(l)}addScript('/app-nav.js','fourdk-appnav')}
  function boot(){appNav();addScript('/4dk-site-enhance.js','fourdk-site-enhance');if(isHome())addScript('/4dk-home-current.js','fourdk-home-current');if(isNFL())addScript('/4dk-week4-current.js','fourdk-week4-current');if(path().endsWith('/the-answer-files-004-it-was-his-time.html'))addScript('/4dk-ai-2001-video.js','fourdk-ai-2001-video')}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  function installButton(){if(standalone()||document.getElementById('fourdkInstallApp'))return;const b=document.createElement('button');b.id='fourdkInstallApp';b.type='button';b.textContent='INSTALL 4DK APP';Object.assign(b.style,{position:'fixed',right:'16px',bottom:'18px',zIndex:'9999',border:'1px solid rgba(255,255,255,.18)',borderRadius:'999px',padding:'12px 16px',background:'#111',color:'#fff',fontWeight:'900',fontSize:'12px'});b.onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;b.remove()};document.body.appendChild(b)}
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installButton()});window.addEventListener('appinstalled',()=>{deferredPrompt=null;document.getElementById('fourdkInstallApp')?.remove()});
})();
(()=>{if(document.querySelector('script[data-fourdk-push]'))return;const s=document.createElement('script');s.src='/4dk-push.js';s.defer=true;s.dataset.fourdkPush='1';document.head.appendChild(s)})();
