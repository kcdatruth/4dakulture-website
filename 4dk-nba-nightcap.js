(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['nba.html','nba'].includes(page) || window.__fourdkNBANightcapHome) return;
  window.__fourdkNBANightcapHome=true;

  const css=()=>{
    if(document.getElementById('fourdk-nba-nightcap-home-css'))return;
    const s=document.createElement('style');s.id='fourdk-nba-nightcap-home-css';s.textContent=`
      .nba-nightcap-band{position:relative;overflow:hidden;padding:30px 0;background:radial-gradient(circle at 82% 16%,rgba(238,73,55,.18),transparent 22rem),linear-gradient(145deg,#111419,#080a0d);color:#f5f0e8;border-top:1px solid #2e3439;border-bottom:1px solid #2e3439}
      .nba-nightcap-band:after{content:'NIGHTCAP';position:absolute;right:-18px;bottom:-36px;font:1000 clamp(72px,14vw,170px)/.8 Impact,Arial Black,sans-serif;letter-spacing:-.07em;color:#fff;opacity:.025;pointer-events:none}
      .nba-nightcap-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:center}
      .nba-nightcap-copy small{color:#ef5a43;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .nba-nightcap-copy h2{margin:7px 0 10px;font:1000 clamp(36px,5vw,64px)/.88 Impact,Arial Black,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
      .nba-nightcap-copy p{margin:0;color:#a9b0b4;font:14px/1.55 Georgia,serif}
      .nba-nightcap-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
      .nba-nightcap-actions a{padding:10px 12px;border:1px solid #3d444a;color:#fff!important;text-decoration:none!important;font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}
      .nba-nightcap-actions a:first-child{background:#ee4937;border-color:#ee4937}
      .nba-nightcap-board{display:grid;gap:7px}.nba-nightcap-board div{padding:12px;border:1px solid #30363b;background:#101419}.nba-nightcap-board small{display:block;color:#d8b45d;font-size:7px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}.nba-nightcap-board b{display:block;margin-top:5px;font:700 15px/1.08 Georgia,serif}
      @media(max-width:760px){.nba-nightcap-inner{grid-template-columns:1fr}}
    `;document.head.appendChild(s);
  };

  async function latest(){
    try{
      const r=await fetch('nba-nightcap-index.json',{cache:'no-store'});
      if(!r.ok)throw Error(r.status);
      const items=await r.json();
      return Array.isArray(items)&&items.length?items[0]:null;
    }catch(e){console.warn('4DK Nightcap latest',e);return null}
  }

  async function install(){
    css();
    const item=await latest(); if(!item)return;

    const nav=document.querySelector('.nba-hero-nav');
    if(nav&&!nav.querySelector('a[href="nba-nightcap.html"]')){
      const a=document.createElement('a');a.href='nba-nightcap.html';a.textContent='Nightcap';
      const right=nav.querySelector('a[href="#nba-now"]');right?right.after(a):nav.appendChild(a);
    }

    const grid=document.querySelector('.nba-now-grid');
    if(grid&&!grid.querySelector('[data-nightcap-card]')){
      const a=document.createElement('a');
      a.className='nba-now-card red';a.href=item.href;a.dataset.nightcapCard='1';
      a.innerHTML=`<small>${item.label}</small><b>${item.title}</b><p>${item.player} • ${item.game}</p>`;
      const first=grid.firstElementChild;first?first.after(a):grid.appendChild(a);
    }

    if(!document.querySelector('.nba-nightcap-band')){
      const sec=document.createElement('section');sec.className='nba-nightcap-band';
      sec.innerHTML=`<div class="shell nba-nightcap-inner"><div class="nba-nightcap-copy"><small>4DK NBA • NIGHTLY DESK</small><h2>NBA NIGHTCAP.</h2><p>${item.deck}</p><div class="nba-nightcap-actions"><a href="${item.href}">READ THE LATEST NIGHTCAP →</a><a href="nba-nightcap.html">OPEN NIGHTCAP ARCHIVE →</a></div></div><div class="nba-nightcap-board"><div><small>PLAYER OF THE NIGHT</small><b>${item.player}</b></div><div><small>ROOKIE SPOTLIGHT</small><b>${item.rookie}</b></div><div><small>GAME OF THE NIGHT</small><b>${item.game}</b></div></div></div>`;
      const now=document.getElementById('nba-now'); now?now.after(sec):document.querySelector('.nba-pulse')?.before(sec);
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  [400,1000,2200].forEach(ms=>setTimeout(install,ms));
})();