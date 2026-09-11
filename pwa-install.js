(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(err => {
        console.warn('4DK service worker registration failed:', err);
      });
    });
  }

  let deferredPrompt = null;

  function alreadyStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
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
