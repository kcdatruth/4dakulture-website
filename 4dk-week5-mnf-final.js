/* 4DK OCT 12 MONDAY FINAL: additive home headline/ticker; never deletes archived articles. */
(() => {
 'use strict';
 const pathname=location.pathname.replace(/\/+$/,'').split('/').pop();
 const home=!pathname||pathname==='index.html';
 const nfl=pathname==='nfl.html'||pathname==='nfl';
 if ((!home&&!nfl)||window.__fourdkMNFFinal20261012) return;
 window.__fourdkMNFFinal20261012=true;
 const article='nfl-mnf-recap-week5-bills-rams.html';
 const stamp='4dk-mnf-final-oct12';
 function css(){
   if(document.getElementById(stamp+'-css'))return;
   const el=document.createElement('style');el.id=stamp+'-css';
   el.textContent=`
     .dk-mnf-final{background:linear-gradient(125deg,#311b16,#0c1410 62%);border:1px solid #735338;border-left:6px solid #e6af5d;margin:18px 0 28px;padding:24px;color:#f9f3e7;box-shadow:0 10px 30px rgba(0,0,0,.13)}
     .dk-mnf-final .dk-mnf-kicker{display:block;color:#edba71;font:900 11px Arial,sans-serif;letter-spacing:.17em;text-transform:uppercase}
     .dk-mnf-final h2{font:1000 clamp(29px,4vw,49px)/.98 Impact,'Arial Black',sans-serif;text-transform:uppercase;margin:13px 0;color:#fff}
     .dk-mnf-final .dk-mnf-game{display:flex;align-items:center;gap:12px;margin:12px 0;font:900 clamp(14px,2vw,22px) Arial,sans-serif;color:#f7c67a}
     .dk-mnf-final .dk-mnf-game img{width:42px;height:42px;object-fit:contain}
     .dk-mnf-final p{color:#d0cec6;line-height:1.6;max-width:850px;margin:13px 0}
     .dk-mnf-final a{display:inline-block;background:#e1b66d;color:#1b1711!important;text-decoration:none;padding:12px 17px;font:900 11px Arial,sans-serif;letter-spacing:.04em;margin-top:9px}
     .dk-mnf-final .dk-mnf-second{background:transparent;color:#f0c67c!important;border:1px solid #957c51;margin-left:6px}
     @media(max-width:600px){.dk-mnf-final{padding:18px}.dk-mnf-final .dk-mnf-game img{width:30px;height:30px}.dk-mnf-final .dk-mnf-second{margin-left:0}}
   `;document.head.appendChild(el);
 }
 const markup=`<span class="dk-mnf-kicker">4 DA KULTURE • NFL WEEK 5 • MONDAY NIGHT FINAL • OCT 12</span>
   <h2>ALLEN GETS THE LAST WORD.<br>THE RAMS RUN OUT OF MISTAKES.</h2>
   <div class="dk-mnf-game"><img alt="Buffalo Bills" src="https://a.espncdn.com/i/teamlogos/nfl/500/buf.png"><strong>BILLS 37 — RAMS 34 (OT)</strong><img alt="Los Angeles Rams" src="https://a.espncdn.com/i/teamlogos/nfl/500/lar.png"></div>
   <p>Allen delivers 331 total yards and a clutch overtime finish. Stafford throws for 383 and Puka catches 17, but Rousseau blocks a winning Rams kick before Bass seals it. Buffalo moves to 4–1; L.A. falls to 2–3.</p>
   <a href="${article}">READ THE FULL MONDAY NIGHT BREAKDOWN →</a><a class="dk-mnf-second" href="nfl-monday-recaps.html">MONDAY RECAP ARCHIVE →</a>`;
 function homeApply(){
   const lead=document.querySelector('.home-v2-lead');
   if(!lead)return;
   let banner=document.getElementById('dk-mnf-home-final');
   if(!banner){banner=document.createElement('section');banner.className='dk-mnf-final shell';banner.id='dk-mnf-home-final';banner.setAttribute('aria-label','Monday Night Football final');banner.innerHTML=markup;lead.insertAdjacentElement('afterend',banner)}
   const hero=document.querySelector('.home-v2-primary');
   if(hero&&(hero.dataset.mnfFinal!==stamp || !hero.querySelector('a[href="'+article+'"]'))){
     hero.dataset.mnfFinal=stamp;
     hero.innerHTML=`<span class="home-v2-lead-kicker">NFL • WEEK 5 • MONDAY FINAL</span><h1>ALLEN WINS THE NIGHT.<br><em>THE RAMS FALL TO 2–3.</em></h1><p>Buffalo 37, Los Angeles 34 in overtime. Puka’s 17-catch clinic and Stafford’s late heroics weren’t enough after a blocked kick flipped the finish.</p><div class="home-v2-primary-meta"><span>BUF 4–1 • LAR 2–3</span><span>ALLEN: 331 TOTAL YARDS</span><span>PUKA: 17 CATCHES</span></div><div class="home-v2-primary-actions"><a class="home-v2-button" href="${article}">READ THE FULL RECAP →</a><a class="home-v2-button alt" href="nfl-sunday-recap-week5.html">SUNDAY’S 13 GAMES →</a></div>`;
   }
   const track=document.querySelector('.ticker-track');
   if(track&&!track.querySelector('[data-dk-mnf-final]')){
     const item=document.createElement('span');item.dataset.dkMnfFinal='1';item.innerHTML='<span class="dot">●</span> MONDAY FINAL: BILLS 37, RAMS 34 (OT) — ALLEN 331 TOTAL YARDS';
     track.prepend(item);
   }
 }
 function nflApply(){
   const nav=document.querySelector('.nfl-v2-nav');if(!nav)return;
   if(!nav.querySelector('a[href="nfl-monday-recaps.html"]')){const a=document.createElement('a');a.href='nfl-monday-recaps.html';a.textContent='MNF RECAPS';nav.append(a)}
   const cur=document.getElementById('dk5current');if(!cur)return;
   const act=cur.querySelector('.dk5actions');
   if(act&&!act.querySelector('a[href="'+article+'"]')){const a=document.createElement('a');a.href=article;a.textContent='MNF FINAL • BILLS 37–34 →';act.prepend(a)}
 }
 let pending=false;
 function apply(){css();if(home)homeApply();if(nfl)nflApply()}
 function schedule(){if(pending)return;pending=true;setTimeout(()=>{pending=false;apply()},200)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
 [350,900,1800,3500,6500].forEach(t=>setTimeout(apply,t));
 // Older additive modules can replace their own homepage lead on a delayed refresh.
 // Observe only for changes; do not remove older sections or mutate unrelated pages.
 const observer=new MutationObserver(mutations=>{
   if(mutations.some(m=>m.target.closest?.('.home-v2-lead,.ticker-track,.nfl-v2-nav,#dk5current')||m.target.matches?.('.home-v2-lead,.ticker-track,.nfl-v2-nav,#dk5current')))schedule();
 });
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>observer.observe(document.body,{subtree:true,childList:true}),{once:true});
 else observer.observe(document.body,{subtree:true,childList:true});
})();
