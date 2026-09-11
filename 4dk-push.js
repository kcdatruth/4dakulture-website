(() => {
  if (window.__FOURDK_PUSH_BOOTSTRAPPED__) return;
  window.__FOURDK_PUSH_BOOTSTRAPPED__ = true;

  const APP_ID = 'e4716854-a60a-40ef-8bec-6b3049315cb7';
  const SDK_URL = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
  const EVENT = 'fourdk:push-status';

  let sdk = null;
  let ready = false;
  let supported = false;

  const isStandalone = () =>
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://');

  const nativePermission = () =>
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission;

  function snapshot() {
    let optedIn = false;
    let subscriptionId = null;
    try {
      optedIn = Boolean(sdk?.User?.PushSubscription?.optedIn);
      subscriptionId = sdk?.User?.PushSubscription?.id || null;
    } catch (_) {}
    return {
      ready,
      supported,
      permission: nativePermission(),
      optedIn,
      subscriptionId
    };
  }

  function emit() {
    const detail = snapshot();
    window.dispatchEvent(new CustomEvent(EVENT, { detail }));
    return detail;
  }

  function toast(message) {
    let el = document.getElementById('fourdkPushToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fourdkPushToast';
      Object.assign(el.style, {
        position: 'fixed', left: '16px', right: '16px',
        bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))',
        zIndex: '2147483640', maxWidth: '520px', margin: '0 auto',
        padding: '12px 14px', borderRadius: '14px',
        background: '#171719', color: '#fff', border: '1px solid rgba(255,255,255,.14)',
        boxShadow: '0 16px 44px rgba(0,0,0,.35)',
        font: '800 12px/1.35 Arial,Helvetica,sans-serif',
        opacity: '0', transform: 'translateY(8px)', transition: 'all .18s ease'
      });
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    clearTimeout(el.__fourdkTimer);
    el.__fourdkTimer = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    }, 3200);
  }

  async function request() {
    if (!ready || !sdk) {
      toast('4DK alerts are still loading. Try again in a second.');
      return emit();
    }
    if (!supported) {
      toast('Push notifications are not supported in this browser.');
      return emit();
    }
    if (nativePermission() === 'denied') {
      toast('Notifications are blocked. Allow 4 Da Kulture notifications in your browser/app settings.');
      return emit();
    }

    try {
      if (!sdk.Notifications.permission) {
        await sdk.Notifications.requestPermission();
      }
      if (sdk.Notifications.permission && !sdk.User.PushSubscription.optedIn) {
        await sdk.User.PushSubscription.optIn();
      }
      const state = emit();
      toast(state.optedIn ? '4DK alerts are ON 🔔' : 'Notification permission was not enabled.');
      return state;
    } catch (error) {
      console.warn('4DK push permission request failed:', error);
      toast('Could not turn on alerts yet. Please try again.');
      return emit();
    }
  }

  async function turnOff() {
    if (!ready || !sdk) return emit();
    try {
      await sdk.User.PushSubscription.optOut();
      toast('4DK alerts are OFF.');
    } catch (error) {
      console.warn('4DK push opt-out failed:', error);
    }
    return emit();
  }

  window.FourDKPush = { request, turnOff, status: snapshot };

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async function(OneSignal) {
    sdk = OneSignal;
    try {
      await OneSignal.init({
        appId: APP_ID,
        serviceWorkerPath: 'OneSignalSDKWorker.js',
        serviceWorkerParam: { scope: '/push/onesignal/' },
        autoResubscribe: true,
        notifyButton: { enable: false },
        welcomeNotification: { disable: true }
      });

      supported = Boolean(OneSignal.Notifications.isPushSupported());
      ready = true;

      const handleChange = () => emit();
      OneSignal.Notifications.addEventListener('permissionChange', handleChange);
      OneSignal.User.PushSubscription.addEventListener('change', handleChange);
      emit();

      // A small, non-native pre-prompt shown only in the installed app.
      // It never opens the browser permission dialog without a user tap.
      if (isStandalone() && nativePermission() === 'default') {
        const key = 'fourdk-push-nudge-dismissed-at';
        const last = Number(localStorage.getItem(key) || 0);
        const week = 7 * 24 * 60 * 60 * 1000;
        if (!last || Date.now() - last > week) {
          setTimeout(() => showNudge(key), 1800);
        }
      }
    } catch (error) {
      ready = false;
      console.warn('4DK OneSignal initialization failed:', error);
      emit();
    }
  });

  function showNudge(storageKey) {
    if (document.getElementById('fourdkPushNudge') || nativePermission() !== 'default') return;
    const card = document.createElement('section');
    card.id = 'fourdkPushNudge';
    card.setAttribute('aria-label', 'Turn on 4 Da Kulture alerts');
    card.innerHTML = `
      <div class="fourdk-push-nudge-copy">
        <strong>TURN ON 4DK ALERTS 🔔</strong>
        <span>Get new stories, rankings and podcast drops.</span>
      </div>
      <div class="fourdk-push-nudge-actions">
        <button type="button" data-fourdk-push-later>Not now</button>
        <button type="button" data-fourdk-push-on>Turn on</button>
      </div>`;
    Object.assign(card.style, {
      position: 'fixed', left: '12px', right: '12px',
      bottom: 'calc(78px + env(safe-area-inset-bottom, 0px))',
      zIndex: '2147483200', maxWidth: '560px', margin: '0 auto',
      padding: '13px', borderRadius: '18px', background: '#151516', color: '#fff',
      border: '1px solid rgba(255,255,255,.13)', boxShadow: '0 22px 55px rgba(0,0,0,.42)',
      fontFamily: 'Arial,Helvetica,sans-serif'
    });
    const style = document.createElement('style');
    style.textContent = `
      #fourdkPushNudge .fourdk-push-nudge-copy{display:flex;flex-direction:column;gap:3px}
      #fourdkPushNudge strong{font-size:12px;letter-spacing:.035em}
      #fourdkPushNudge span{font-size:10px;color:#a2a2a8;font-weight:700}
      #fourdkPushNudge .fourdk-push-nudge-actions{display:flex;gap:7px;margin-top:10px}
      #fourdkPushNudge button{flex:1;min-height:38px;border-radius:11px;border:1px solid #343438;background:#222225;color:#fff;font:900 10px Arial;letter-spacing:.03em}
      #fourdkPushNudge button[data-fourdk-push-on]{background:#e8452e;border-color:#e8452e}
    `;
    card.appendChild(style);
    document.body.appendChild(card);

    card.querySelector('[data-fourdk-push-on]')?.addEventListener('click', async () => {
      card.remove();
      await request();
    });
    card.querySelector('[data-fourdk-push-later]')?.addEventListener('click', () => {
      localStorage.setItem(storageKey, String(Date.now()));
      card.remove();
    });
  }

  if (!document.querySelector('script[data-fourdk-onesignal-sdk]')) {
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.defer = true;
    script.dataset.fourdkOnesignalSdk = '1';
    document.head.appendChild(script);
  }
})();
