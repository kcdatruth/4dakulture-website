/* OPTIONAL NBA PAGE LAUNCHER
   Add this script to nba.html after script.js:
   <script src="4dk-my-career-launcher.js"></script>
*/
(() => {
  if(!/(^|\/)nba(?:\.html)?$/.test(location.pathname.replace(/\/+$/,''))) return;
  if(document.querySelector('#mycareer-launch')) return;

  const style=document.createElement('style');
  style.textContent=`
    #mycareer-launch{padding:38px 0;background:#07090d;border-top:1px solid #292f39;border-bottom:1px solid #292f39}
    #mycareer-launch .mcl-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:0;border:1px solid #353d49;background:linear-gradient(140deg,#151b25,#080b10);overflow:hidden;text-decoration:none!important;color:#fff!important}
    #mycareer-launch .mcl-copy{padding:32px}
    #mycareer-launch small{color:#ff5261;font-size:9px;font-weight:1000;letter-spacing:.15em}
    #mycareer-launch h2{margin:10px 0;color:#fff;font:1000 clamp(52px,7vw,88px)/.82 Impact,Arial Black,sans-serif;letter-spacing:-.035em}
    #mycareer-launch h2 em{display:block;color:#e93142;font-style:normal}
    #mycareer-launch p{max-width:650px;color:#aeb5c0;font:15px/1.55 Georgia,serif}
    #mycareer-launch b{display:inline-block;margin-top:13px;background:#e93142;padding:10px 13px;font-size:9px;letter-spacing:.1em}
    #mycareer-launch .mcl-board{padding:28px;border-left:1px solid #303744;background:radial-gradient(circle at center,rgba(233,49,66,.18),transparent 60%)}
    #mycareer-launch .mcl-board span{display:block;padding:10px 0;border-bottom:1px solid #2b3340;color:#8e99a8;font-size:9px;font-weight:1000;letter-spacing:.08em}
    #mycareer-launch .mcl-board span:first-child{color:#fff}
    @media(max-width:720px){#mycareer-launch .mcl-inner{grid-template-columns:1fr}#mycareer-launch .mcl-board{border-left:0;border-top:1px solid #303744}}
  `;
  document.head.appendChild(style);

  const sec=document.createElement('section');
  sec.id='mycareer-launch';
  sec.innerHTML=`<div class="shell"><a class="mcl-inner" href="4dk-my-career.html">
    <div class="mcl-copy"><small>4DK INTERACTIVE • PLAYABLE BETA</small><h2>4DK <em>MY CAREER</em></h2><p>Create a senior. Choose any real high school. Play full games, key moments or sim. Build recruiting stars, earn real college offers and choose where your story goes next.</p><b>START YOUR CAREER →</b></div>
    <div class="mcl-board"><span>01 • SENIOR YEAR — LIVE NOW</span><span>02 • REAL HIGH SCHOOLS</span><span>03 • 1★ → 5★ RECRUITING</span><span>04 • REAL COLLEGE OFFERS</span><span>05 • COLLEGE / NIL / DRAFT — NEXT</span></div>
  </a></div>`;

  const pulse=document.querySelector('.nba-pulse');
  const legacy=document.querySelector('#legacy-ranking');
  if(pulse) pulse.after(sec);
  else if(legacy) legacy.before(sec);
  else document.querySelector('main')?.prepend(sec);
})();
