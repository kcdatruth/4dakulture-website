/* 4DK NFL centralized article display — update nfl-articles.json to publish a new edition. */
(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const archive=location.pathname.split('/').pop()==='nfl-thursday-recaps.html';
fetch('nfl-articles.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('feed unavailable');return r.json()}).then(data=>{
 const items=(data.articles||[]).filter(a=>a.url&&a.title&&/^nfl-[a-z0-9-]+\.html$/.test(a.url)).sort((a,b)=>b.date.localeCompare(a.date));
 const tnf=items.filter(a=>a.type==='TNF');if(!tnf.length)return;
 if(archive){const grid=document.querySelector('.tnr-grid');if(!grid)return;
 grid.innerHTML=tnf.map((a,i)=>'<a class="tnr-card '+(i===0?'latest':'')+'" href="'+esc(a.url)+'"><small>Week '+esc(a.week)+' · '+esc(a.date)+'</small><h3>'+esc(a.title)+'</h3>'+(a.score?'<div class="tnr-score">'+esc(a.score)+'</div>':'')+'<p>'+esc(a.summary)+'</p><b>Read the full Thursday recap →</b></a>').join('');
 }else{if(document.getElementById('fourdk-nfl-feed-feature'))return;const a=tnf[0],section=document.createElement('section');section.id='fourdk-nfl-feed-feature';
 section.innerHTML='<div class="fourdk-feed-wrap"><span class="fourdk-feed-label">LATEST · 4DK THURSDAY NIGHT FOOTBALL · WEEK '+esc(a.week)+'</span><h2>'+esc(a.title)+'</h2><p>'+esc(a.summary)+'</p><a href="'+esc(a.url)+'">READ THE COMPLETE 4DK TNF RECAP →</a><a class="fourdk-feed-archive" href="nfl-thursday-recaps.html">ALL THURSDAY RECAPS →</a></div>';
 const target=document.querySelector('#fourdk-nfl-week8-lead, #fourdk-week8-lead, #fourdk-nfl-rankings-hq, main');if(target){if(target.tagName==='MAIN')target.prepend(section);else target.insertAdjacentElement('beforebegin',section)}
 const msg=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='No games scheduled in tracked leagues today');if(msg)msg.textContent='LATEST FINAL · '+(a.score||'WEEK '+a.week+' TNF')+' · FULL 4DK RECAP';
 }
}).catch(e=>console.warn('4DK NFL feed:',e.message));})();
