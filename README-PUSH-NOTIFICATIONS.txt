4 DA KULTURE — PUSH NOTIFICATIONS UPDATE

Upload ALL files in this ZIP to the ROOT of the GitHub repo.
Overwrite the existing app-nav.css, app-nav.js, pwa-install.js, and service-worker.js.

New files:
- 4dk-push.js
- OneSignalSDKWorker.js

Recommended commit message:
Add 4DK push notifications

After GitHub Pages redeploys:
1. Fully close the installed 4 Da Kulture app.
2. Reopen it.
3. Tap More > Notifications (or use the Turn on 4DK Alerts card).
4. Tap Allow on the Android/Chrome notification permission prompt.
5. In OneSignal, confirm the device appears under Audience > Subscriptions.

OneSignal App ID used:
e4716854-a60a-40ef-8bec-6b3049315cb7

The existing 4DK PWA stays on root scope (/).
OneSignal uses OneSignalSDKWorker.js with the narrower /push/onesignal/ scope so the workers do not compete.
