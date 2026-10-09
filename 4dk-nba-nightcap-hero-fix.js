(() => {
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['nba.html','nba'].includes(page) || window.__fourdkNBANightcapHeroFix) return;
  window.__fourdkNBANightcapHeroFix=true;

  function install(){
    if(document.getElementById('nba-nightcap-hero-fix-css')) return;

    const s=document.createElement('style');
    s.id='nba-nightcap-hero-fix-css';
    s.textContent=`
      .nba-hero-feature.nba-nightly-lead{
        display:flex!important;
        flex-direction:column!important;
        justify-content:flex-end!important;
        gap:0!important;
        min-height:430px!important;
        padding:28px!important;
      }

      .nba-hero-feature.nba-nightly-lead .nba-feature-label,
      .nba-hero-feature.nba-nightly-lead .nba-feature-big,
      .nba-hero-feature.nba-nightly-lead .nba-feature-deck,
      .nba-hero-feature.nba-nightly-lead .nba-feature-read{
        position:static!important;
        left:auto!important;
        right:auto!important;
        top:auto!important;
        bottom:auto!important;
        transform:none!important;
        max-width:none;
      }

      .nba-hero-feature.nba-nightly-lead .nba-feature-label{
        align-self:flex-start!important;
        display:inline-flex!important;
        width:auto!important;
        max-width:100%!important;
        margin:0 0 18px!important;
        padding:8px 10px!important;
        background:#ee4937!important;
        color:#fff!important;
        font-size:8px!important;
        line-height:1.2!important;
        letter-spacing:.12em!important;
        white-space:normal!important;
      }

      .nba-hero-feature.nba-nightly-lead .nba-feature-big{
        display:block!important;
        margin:0 0 18px!important;
        font-family:Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif!important;
        font-size:clamp(38px,5vw,66px)!important;
        line-height:.91!important;
        letter-spacing:-.025em!important;
        color:#fff!important;
        text-wrap:balance;
      }

      .nba-hero-feature.nba-nightly-lead .nba-feature-deck{
        display:block!important;
        margin:0 0 18px!important;
        max-width:650px!important;
        color:#c8cdd1!important;
        font:15px/1.45 Georgia,serif!important;
      }

      .nba-hero-feature.nba-nightly-lead .nba-feature-read{
        display:inline-flex!important;
        align-self:flex-start!important;
        margin:0!important;
        color:#ff9c76!important;
        font-size:8px!important;
        line-height:1.3!important;
        font-weight:1000!important;
        letter-spacing:.11em!important;
      }

      @media(max-width:700px){
        .nba-hero-feature.nba-nightly-lead{
          min-height:auto!important;
          padding:26px 22px 28px!important;
        }
        .nba-hero-feature.nba-nightly-lead .nba-feature-label{
          margin-bottom:16px!important;
        }
        .nba-hero-feature.nba-nightly-lead .nba-feature-big{
          font-size:clamp(34px,10.5vw,50px)!important;
          line-height:.92!important;
          margin-bottom:16px!important;
        }
        .nba-hero-feature.nba-nightly-lead .nba-feature-deck{
          font-size:14px!important;
          line-height:1.5!important;
          margin-bottom:17px!important;
        }
      }
    `;
    document.head.appendChild(s);
  }

  function apply(){
    install();
    const feature=document.querySelector('.nba-hero-feature.nba-nightly-lead');
    if(feature){
      feature.setAttribute('aria-label','Open the latest 4DK NBA Nightcap');
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }
  [100,350,800,1500,2800,5000].forEach(ms=>setTimeout(apply,ms));
})();