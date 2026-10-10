/* 4 Da Kulture | 2026 Rookie Class — authentic artwork integration.
   This file changes the featured image only; all article text, original pages,
   rankings, Nightcap feeds and archives remain in place. */
(() => {
  'use strict';
  if (window.__fourdkRookieCover2026) return;
  window.__fourdkRookieCover2026 = true;

  const route = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const PORTRAIT = '4DK_New_Class_Real_Photos_Cover_Corrected.jpg';
  const WIDE = '4DK_Rookie_Class_Authentic_Photos_Wide.jpg';
  const alt = '4 Da Kulture 2026–27 rookie class cover featuring AJ Dybantsa, Darryn Peterson, Cameron Boozer, Caleb Wilson, Keaton Wagler, Darius Acuff Jr., Yaxel Lendeborg and Kingston Flemings';

  function showArticleCover() {
    const existing = document.querySelector('.rookie-feature-graphic figure img');
    if (!existing) return;
    existing.src = PORTRAIT;
    existing.alt = alt;
    existing.decoding = 'async';
    existing.dataset.fourdkRookieCover = 'authentic-2026-v1';
  }

  function showNBAFeature() {
    const existing = document.querySelector('#rookie-class-feature .season-feature-board');
    if (!existing || existing.querySelector('img[data-fourdk-rookie-photo]')) return;
    existing.classList.add('dk-rookie-board-with-photo');
    const cover = document.createElement('img');
    cover.src = WIDE;
    cover.alt = alt;
    cover.loading = 'lazy';
    cover.decoding = 'async';
    cover.setAttribute('data-fourdk-rookie-photo', '');
    existing.prepend(cover);
  }

  function addStyles() {
    if (document.getElementById('fourdk-rookie-cover-2026-styles')) return;
    const style = document.createElement('style');
    style.id = 'fourdk-rookie-cover-2026-styles';
    style.textContent = `
      #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo {
        background:#080a0d!important;
        padding:12px!important;
        min-height:330px;
        overflow:hidden;
        border-left:1px solid #3c3230;
      }
      #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo:before {display:none!important}
      #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo > :not(img) {display:none!important}
      #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo img[data-fourdk-rookie-photo] {
        display:block;
        width:100%;
        height:100%;
        max-height:340px;
        object-fit:contain;
        object-position:center;
        border:1px solid #463833;
      }
      .rookie-feature-graphic figure img[data-fourdk-rookie-cover] {
        width:100%;height:auto;display:block;
      }
      @media (max-width:700px) {
        #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo {
          min-height:210px;
          padding:8px!important;
          border-left:0;
        }
        #rookie-class-feature .season-feature-board.dk-rookie-board-with-photo img[data-fourdk-rookie-photo] {
          max-height:none;
          aspect-ratio:16/9;
        }
      }`;
    document.head.appendChild(style);
  }

  function apply() {
    if (route === 'nba-rookie-class-2026.html') showArticleCover();
    else if (route === 'nba.html') {addStyles();showNBAFeature();}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
})();
