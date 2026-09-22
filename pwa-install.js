(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(err => {
        console.warn('4DK service worker registration failed:', err);
      });
    });
  }

  let deferredPrompt = null;

  function alreadyStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.startsWith('android-app://');
  }

  function isHomePage() {
    const path=(location.pathname || '/').toLowerCase();
    return path==='/' || path.endsWith('/index.html');
  }

  function isNFLPage() {
    const path=(location.pathname || '/').toLowerCase();
    return path.endsWith('/nfl.html') || path.endsWith('/nfl');
  }

  // The service worker injects these on all HTML pages. Loading them here too
  // guarantees the home screen gets the app nav immediately after an update.
  function ensureAppNav() {
    if (!alreadyStandalone()) return;
    if (!document.querySelector('link[data-fourdk-appnav]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/app-nav.css';
      link.dataset.fourdkAppnav = '1';
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[data-fourdk-appnav]')) {
      const script = document.createElement('script');
      script.src = '/app-nav.js';
      script.defer = true;
      script.dataset.fourdkAppnav = '1';
      document.head.appendChild(script);
    }
  }

  function ensureSiteEnhance() {
    if (document.querySelector('script[data-fourdk-site-enhance]')) return;
    const script = document.createElement('script');
    script.src = '/4dk-site-enhance.js';
    script.defer = true;
    script.dataset.fourdkSiteEnhance = '1';
    document.head.appendChild(script);
  }

  // Current NFL Week 2 rankings layer — add-only.
  function ensureWeek2Rankings() {
    if (!isNFLPage()) return;
    if (document.querySelector('script[data-fourdk-week2-rankings]')) return;
    const script = document.createElement('script');
    script.src = '/4dk-week2-rankings.js';
    script.defer = true;
    script.dataset.fourdkWeek2Rankings = '1';
    document.head.appendChild(script);
  }

  // Current 4DK Red Zone layer — add-only.
  function ensureRedZoneCurrent() {
    if (!isNFLPage()) return;
    if (document.querySelector('script[data-fourdk-redzone-current]')) return;
    const script = document.createElement('script');
    script.src = '/4dk-redzone-week2-final.js';
    script.defer = true;
    script.dataset.fourdkRedzoneCurrent = '1';
    document.head.appendChild(script);
  }

  function ensureWeek3Framework() {
    if (!isNFLPage() || document.querySelector('script[data-fourdk-week3-framework]')) return;
    const script=document.createElement('script');
    script.src='/4dk-week3-framework.js';
    script.defer=true;
    script.dataset.fourdkWeek3Framework='1';
    document.head.appendChild(script);
  }

  // Homepage-only current-story layer.
  function ensureAI2001Video() {
    const path=(location.pathname || '/').toLowerCase();
    if (!path.endsWith('/the-answer-files-004-it-was-his-time.html')) return;
    if (document.querySelector('script[data-fourdk-ai-2001-video]')) return;
    const script = document.createElement('script');
    script.src = '/4dk-ai-2001-video.js';
    script.defer = true;
    script.dataset.fourdkAi2001Video = '1';
    document.head.appendChild(script);
  }

  function ensureHomeCurrent() {
    if (!isHomePage() || document.querySelector('script[data-fourdk-home-current]')) return;
    const script = document.createElement('script');
    script.src = '/4dk-home-current.js';
    script.defer = true;
    script.dataset.fourdkHomeCurrent = '1';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ensureAppNav();
      ensureSiteEnhance();
      ensureHomeCurrent();
      ensureWeek2Rankings();
      ensureRedZoneCurrent();
      ensureWeek3Framework();
      ensureAI2001Video();
    }, { once:true });
  } else {
    ensureAppNav();
    ensureSiteEnhance();
    ensureHomeCurrent();
    ensureWeek2Rankings();
    ensureRedZoneCurrent();
    ensureWeek3Framework();
    ensureAI2001Video();
  }

  function makeInstallButton() {
    if (alreadyStandalone() || document.getElementById('fourdkInstallApp')) return;
    const button = document.createElement('button');
    button.id = 'fourdkInstallApp';
    button.type = 'button';
    button.textContent = 'INSTALL 4DK APP';
    button.setAttribute('aria-label', 'Install 4 Da Kulture app');
    Object.assign(button.style, {
      position:'fixed', right:'16px', bottom:'18px', zIndex:'9999',
      border:'1px solid rgba(255,255,255,.18)', borderRadius:'999px',
      padding:'12px 16px', background:'#111', color:'#fff',
      boxShadow:'0 10px 30px rgba(0,0,0,.28)', fontWeight:'900',
      fontSize:'12px', letterSpacing:'.05em', cursor:'pointer'
    });
    button.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      button.remove();
    });
    document.body.appendChild(button);
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    makeInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    document.getElementById('fourdkInstallApp')?.remove();
  });
})();

// 4DK push notifications: initialize OneSignal on the installed app/home page.
(() => {
  if (document.querySelector('script[data-fourdk-push]')) return;
  const script = document.createElement('script');
  script.src = '/4dk-push.js';
  script.defer = true;
  script.dataset.fourdkPush = '1';
  document.head.appendChild(script);
})();