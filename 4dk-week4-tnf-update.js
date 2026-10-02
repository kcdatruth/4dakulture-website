(() => {
  const articleUrl='nfl-thursday-recap-week4-steelers-browns.html';
  const key=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');

  try{
    if(typeof siteSearchIndex!=='undefined' && !siteSearchIndex.some(i=>i.url===articleUrl)){
      siteSearchIndex.push({
        title:'Cleveland Is 3–1. Now What?',
        type:'NFL • Week 4 TNF Recap',
        url:articleUrl,
        desc:'Watson, Cleveland’s defense, Aaron Rodgers at 42 and the Browns’ young core after a 27–24 win.',
        terms:'browns steelers cleveland pittsburgh deshaun watson aaron rodgers week 4 thursday night football tnf judkins denzel boston kc concepcion fannin schwesinger mason graham'
      });
    }
  }catch(e){}

  // Home and NFL are now handled directly by 4dk-home-current.js,
  // 4dk-week4-current.js and 4dk-redzone-week4-current.js.
  // Keep this compatibility file focused on the Thursday Recaps archive.
  if(key==='nfl-thursday-recaps'){
    const grid=document.querySelector('.tnr-grid');
    if(grid && !grid.querySelector(`a[href="${articleUrl}"]`)){
      grid.querySelectorAll('.tnr-card.latest').forEach(card=>card.classList.remove('latest'));
      const card=document.createElement('a');
      card.className='tnr-card latest';
      card.href=articleUrl;
      card.innerHTML=`
        <small>Week 4 • October 1, 2026</small>
        <h3>Cleveland Is 3–1. Now What?</h3>
        <div class="tnr-score">CLE 27 • PIT 24</div>
        <p>Watson played well, Cleveland sacked Rodgers five times, and the Browns’ young core turned a 3–1 start into a real playoff conversation.</p>
        <b>Read the full Thursday recap →</b>`;
      grid.prepend(card);
      [...grid.querySelectorAll('.tnr-coming')].forEach(el=>{
        if(el.textContent.includes('Week 4'))el.remove();
      });
    }
  }
})();