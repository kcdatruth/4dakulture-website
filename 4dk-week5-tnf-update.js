(() => {
  const ARTICLE='nfl-thursday-recap-week5-buccaneers-cowboys.html';
  const path=(location.pathname||'/').toLowerCase();
  const isHome=path==='/'||path.endsWith('/index.html');
  const isNFL=path.endsWith('/nfl.html')||path.endsWith('/nfl');
  if(!isHome&&!isNFL) return;
  if(window.__fourdkWeek5TNFCurrent) return;
  window.__fourdkWeek5TNFCurrent=true;

  function home(){
    if(!isHome) return;
    const shelf=document.querySelector('.fourdk-current-shelf-grid');
    if(shelf && !shelf.querySelector('[data-week5-tnf]')){
      const card=document.createElement('a');
      card.className='fourdk-current-shelf-card';
      card.href=ARTICLE;
      card.dataset.week5Tnf='1';
      card.innerHTML='<small>TNF FINAL • WEEK 5</small><b>Dallas Let One Get Away</b><span>Tampa 24, Dallas 16 • Jalon Daniels’ first win • Bucky 165 rushing yards.</span>';
      shelf.prepend(card);
      const head=document.querySelector('.fourdk-current-shelf-head small');
      if(head) head.textContent='WEEK 5 • TNF FINAL';
    }
  }

  function nfl(){
    if(!isNFL) return;
    const board=document.querySelector('.nfl-v2-board');
    if(board){
      const top=board.querySelector('.nfl-v2-board-top strong');
      if(top) top.textContent='WEEK 5';
      if(!board.querySelector('[data-week5-tnf]')){
        const row=document.createElement('a');
        row.className='nfl-v2-board-row live';
        row.href=ARTICLE;
        row.dataset.week5Tnf='1';
        row.innerHTML='<div><small>TNF FINAL</small><b>TB 24 • DAL 16</b></div><span>RECAP →</span>';
        const first=board.querySelector('.nfl-v2-board-row');
        first?first.before(row):board.appendChild(row);
      }
    }
    const nav=document.querySelector('.nfl-v2-nav');
    if(nav&&!nav.querySelector('a[href="nfl-thursday-recaps.html"]')){
      const a=document.createElement('a');
      a.href='nfl-thursday-recaps.html';
      a.textContent='Thursday Recaps';
      nav.appendChild(a);
    }
    const ticker=document.querySelector('.nfl-revamp-ticker .nfl-ticker-track');
    if(ticker&&!ticker.querySelector('[data-week5-tnf-ticker]')){
      const s=document.createElement('span');
      s.dataset.week5TnfTicker='1';
      s.innerHTML='<b>●</b> TNF FINAL: TAMPA BAY 24 • DALLAS 16';
      ticker.prepend(s);
    }
  }

  function apply(){home();nfl()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [150,500,1000,1800,3500,6500].forEach(ms=>setTimeout(apply,ms));
})();