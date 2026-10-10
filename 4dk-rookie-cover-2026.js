/* 4 Da Kulture | 2026 Rookie Class — responsive epic artwork integration.
 * Desktop keeps the approved wide graphic; phones display the new taller cover.
 * Other articles, rankings, navigation and archives remain unchanged.
 */
(() => {
  'use strict';
  if (window.__fourdkRookieCover2026) return;
  window.__fourdkRookieCover2026 = true;

  const route = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const DESKTOP = '4DK_New_Class_Real_Photos_Cover_Corrected.jpg';
  const MOBILE = '4DK_Rookie_Class_Mobile_Epic.png';
  const WIDE = '4DK_Rookie_Class_Authentic_Photos_Wide.jpg';
  const alt = '4 Da Kulture 2026–27 rookie class cover featuring AJ Dybantsa, Darryn Peterson, Cameron Boozer, Caleb Wilson, Keaton Wagler, Darius Acuff Jr., Yaxel Lendeborg and Kingston Flemings';

  function showArticleCover() {
    const existing = document.querySelector('.rookie-feature-graphic figure img');
    if (!existing) return;
    const parent = existing.parentElement;
    if (!parent || !parent.matches('picture[data-fourdk-rookie-picture]')) {
      const picture = document.createElement('picture');
      picture.setAttribute('data-fourdk-rookie-picture', '');
      const source = document.createElement('source');
      source.media = '(max-width: 700px)';
      source.srcset = MOBILE;
      picture.appendChild(source);
      existing.parentNode.insertBefore(picture, existing);
      picture.appendChild(existing);
    }
    existing.src = DESKTOP;
    existing.alt = alt;
    existing.decoding = 'async';
    existing.setAttribute('data-fourdk-rookie-cover', 'epic-responsive-2026');
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
      /* Preserve the original article layout; show the whole artwork at every size. */
      .rookie-feature-graphic picture[data-fourdk-rookie-picture]{display:block;width:100%}
      .rookie-feature-graphic figure picture[data-fourdk-rookie-picture] img{
        display:block;width:100%;height:auto;aspect-ratio:auto!important;
        object-fit:contain!important;max-width:100%;
      }
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
    if (route === 'nba-rookie-class-2026.html') {
      addStyles();
      showArticleCover();
    } else if (route === 'nba.html') {
      addStyles();
      showNBAFeature();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
})();
