/* 4DK Top 50 — additive Head-to-Head launch buttons, October 18, 2026 */
(()=>{'use strict';
 const start=()=>{
   const cards=[...document.querySelectorAll('section.rank-entry[id^="rank-"]')];
   if(!cards.length)return;
   const style=document.createElement('style');style.textContent=`
   .fourdk-compare-entry{clear:both;margin:18px 0 20px;padding:15px;background:linear-gradient(112deg,#2e1b23,#491e28);border:1px solid #b58d72;border-left:5px solid #e3bc78;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
   .fourdk-compare-entry span{font:900 11px/1.4 Arial,sans-serif;color:#efd8af;letter-spacing:.07em}
   .fourdk-compare-entry a{display:inline-block;padding:12px 15px;background:#dba968;color:#21161a;text-decoration:none;font:900 12px/1.3 Arial,sans-serif;letter-spacing:.04em}
   @media(max-width:700px){.fourdk-compare-entry{align-items:stretch}.fourdk-compare-entry a{width:100%;text-align:center}}
   `;document.head.appendChild(style);
   cards.forEach(section=>{
     const rank=Number(section.id.slice(5)),name=section.querySelector('h2')?.textContent?.trim();
     if(!Number.isInteger(rank)||rank<1||rank>50||!name||section.querySelector('.fourdk-compare-entry'))return;
     const box=document.createElement('div');box.className='fourdk-compare-entry';
     const label=document.createElement('span');label.textContent='4DK HEAD-TO-HEAD • WHO YOU GOT?';
     const link=document.createElement('a');const other=rank===1?2:1;
     link.href=`nba-rankings-hq.html?compare=${rank}-${other}`;link.textContent=`COMPARE ${name.toUpperCase()} →`;
     box.append(label,link);
     const article=section.querySelector('.entry-copy')||section;
     const before=article.querySelector('.entry-analysis');if(before)before.before(box);else article.appendChild(box);
   });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
