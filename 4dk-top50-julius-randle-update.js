
(function(){
  const page = (location.pathname || '').toLowerCase();
  if (!page.includes('top-50-nba-players-2026-27')) return;

  const normalize = (s) => (s || '').replace(/\s+/g,' ').trim();
  const lower = (s) => normalize(s).toLowerCase();

  const JULIUS = {
    rank: 42,
    name: 'Julius Randle',
    team: 'Brooklyn Nets',
    position: 'PF',
    statLine: '79 G • 21.1 PPG • 6.7 RPG • 5.0 APG • 48.1 FG%',
    summary:
      'Randle remains a physical matchup problem who can score through contact, rebound and create for teammates from the frontcourt. He played 79 games last season and gave Minnesota 21 points and five assists a night before moving to Brooklyn, so durability and volume production are not the concern. The concern is whether the decision-making and efficiency stay steady when a playoff defense loads up on him. In Brooklyn, his ability to create offense should be featured heavily, but that also means the shot selection and late-game reads will stay under the microscope.'
  };

  function scoreCard(el){
    const txt = lower(el.innerText || '');
    let score = 0;
    if (/2026.?27 team/.test(txt)) score += 3;
    if (/2025.?26 regular season/.test(txt)) score += 3;
    if (/position/.test(txt)) score += 2;
    if (el.querySelector('h1,h2,h3,h4')) score += 2;
    if (/(ppg|rpg|apg|fg%)/.test(txt)) score += 1;
    return score;
  }

  function isNestedCandidate(el){
    return Array.from(el.children).some(child => scoreCard(child) >= 7);
  }

  function findCandidateCards(){
    const pool = Array.from(document.querySelectorAll('article, section, .player-card, .rank-card, .snapshot-card, .ranking-card, div'));
    const raw = pool.filter(el => scoreCard(el) >= 7);
    const deduped = raw.filter(el => !isNestedCandidate(el));
    // keep reasonable-size containers only
    return deduped.filter(el => (el.innerText || '').trim().length > 120);
  }

  function findRankElement(card){
    const nodes = Array.from(card.querySelectorAll('*'));
    let best = null;
    for (const el of nodes){
      const t = normalize(el.textContent);
      if (/^\d{1,2}$/.test(t)){
        const n = Number(t);
        if (n >= 1 && n <= 50){
          best = el;
          break;
        }
      }
    }
    return best;
  }

  function getRank(card){
    const rankEl = findRankElement(card);
    if (!rankEl) return null;
    const n = Number(normalize(rankEl.textContent));
    return Number.isFinite(n) ? n : null;
  }

  function findHeading(card){
    return card.querySelector('h1,h2,h3,h4') || null;
  }

  function findSummaryTarget(card){
    // longest paragraph usually holds the summary
    const paras = Array.from(card.querySelectorAll('p')).filter(p => normalize(p.innerText).length > 80);
    if (paras.length){
      paras.sort((a,b) => normalize(b.innerText).length - normalize(a.innerText).length);
      return paras[0];
    }
    return null;
  }

  function setTeamPositionStats(card){
    const textNodes = Array.from(card.querySelectorAll('*')).filter(el => el.children.length === 0);
    // Replace team
    let teamDone = false, posDone = false, statDone = false;
    for (const el of textNodes){
      const t = lower(el.textContent);
      if (!teamDone && /brooklyn nets/.test(t)) teamDone = true;
      if (!teamDone && /2026.?27 team/.test(t) && el.parentElement){
        // next leaf under same card
        const siblingLeaves = Array.from(el.parentElement.querySelectorAll('*')).filter(x => x.children.length === 0);
        const idx = siblingLeaves.indexOf(el);
        if (idx >= 0 && siblingLeaves[idx+1]){
          siblingLeaves[idx+1].textContent = JULIUS.team;
          teamDone = true;
        }
      }
      if (!posDone && /^pf$/i.test(normalize(el.textContent))) posDone = true;
      if (!posDone && /position/.test(t) && el.parentElement){
        const siblingLeaves = Array.from(el.parentElement.querySelectorAll('*')).filter(x => x.children.length === 0);
        const idx = siblingLeaves.indexOf(el);
        if (idx >= 0 && siblingLeaves[idx+1]){
          siblingLeaves[idx+1].textContent = JULIUS.position;
          posDone = true;
        }
      }
      if (!statDone && /(ppg|rpg|apg|fg%)/.test(t)){
        el.textContent = JULIUS.statLine;
        statDone = true;
      }
    }
  }

  function overwriteCardWithJulius(card){
    // rank
    const rankEl = findRankElement(card);
    if (rankEl) rankEl.textContent = String(JULIUS.rank);

    // heading
    const heading = findHeading(card);
    if (heading) heading.textContent = JULIUS.name;

    // team / position / stats
    setTeamPositionStats(card);

    // summary
    const summaryEl = findSummaryTarget(card);
    if (summaryEl) summaryEl.textContent = JULIUS.summary;

    // replace any stray Brandon/Jaren/Julius text in the cloned template
    const all = Array.from(card.querySelectorAll('*'));
    for (const el of all){
      const txt = normalize(el.textContent);
      if (txt === 'Brandon Ingram' || txt === 'Jaren Jackson Jr.') el.textContent = JULIUS.name;
    }
  }

  function shiftRanks(cards){
    // increment every original card from #42 downward
    for (const card of cards){
      const rankEl = findRankElement(card);
      const rank = rankEl ? Number(normalize(rankEl.textContent)) : null;
      if (rankEl && Number.isFinite(rank) && rank >= 42){
        rankEl.textContent = String(rank + 1);
      }
    }
  }

  function fixHonorableMentions(){
    const allEls = Array.from(document.querySelectorAll('article, section, div, li'));
    let replaced = false;

    for (const el of allEls){
      const txt = lower(el.innerText || '');
      if (txt.includes('brandon ingram')){
        // swap headline/name text where possible
        const heading = el.querySelector('h1,h2,h3,h4,strong,b');
        if (heading && lower(heading.textContent).includes('brandon ingram')){
          heading.textContent = 'Jaren Jackson Jr.';
        } else {
          el.innerHTML = el.innerHTML.replace(/Brandon Ingram/g, 'Jaren Jackson Jr.');
        }

        // refresh the blurb if this looks like an HM card
        const p = el.querySelector('p');
        if (p){
          p.textContent = 'Jaren Jackson Jr. stays in the conversation because his two-way value still matters when healthy. He gives you rim protection, switchability, spacing, scoring versatility and impact on both ends, which is enough to keep him in the honorable mentions mix even if he just misses the main 50.';
        }

        // try to add/update a simple team tag if one exists
        const small = el.querySelector('small');
        if (small && !/memphis/i.test(small.textContent)) {
          small.textContent = 'Memphis Grizzlies • PF/C';
        }

        replaced = true;
        break;
      }
    }

    // fallback: if Brandon Ingram text is not found, append a simple HM note
    if (!replaced){
      const hmAnchor = Array.from(document.querySelectorAll('h1,h2,h3,h4,strong,b,section,div')).find(el => /honorable mentions?/i.test(el.textContent || ''));
      if (hmAnchor){
        const note = document.createElement('div');
        note.style.marginTop = '18px';
        note.style.padding = '16px';
        note.style.border = '1px solid rgba(0,0,0,.12)';
        note.style.background = 'rgba(0,0,0,.03)';
        note.innerHTML = '<strong>NEW HONORABLE MENTION:</strong> Jaren Jackson Jr. replaces Brandon Ingram.';
        hmAnchor.parentElement.appendChild(note);
      }
    }
  }

  function run(){
    const cards = findCandidateCards()
      .map(card => ({card, rank: getRank(card)}))
      .filter(x => Number.isFinite(x.rank))
      .sort((a,b) => a.rank - b.rank);

    if (!cards.length) return;

    const rank42 = cards.find(x => x.rank === 42);
    if (!rank42) return;

    // Avoid double-run
    const existingHeading = findHeading(rank42.card);
    if (existingHeading && lower(existingHeading.textContent) === lower(JULIUS.name)) {
      fixHonorableMentions();
      return;
    }

    // Shift existing 42-50 to 43-51
    shiftRanks(cards.map(x => x.card));

    // Insert Julius at 42 by cloning the old 42 card layout
    const clone = rank42.card.cloneNode(true);
    overwriteCardWithJulius(clone);
    rank42.card.parentNode.insertBefore(clone, rank42.card);

    // If we now have 51 ranked cards, drop the last one
    const updated = findCandidateCards()
      .map(card => ({card, rank: getRank(card)}))
      .filter(x => Number.isFinite(x.rank))
      .sort((a,b) => a.rank - b.rank);

    if (updated.length > 50){
      // remove highest rank
      const last = updated[updated.length - 1];
      if (last && last.card && last.card.parentNode) last.card.parentNode.removeChild(last.card);
    } else {
      // If count stayed 50 because the heuristic missed one card, still remove any visible 51
      updated.forEach(({card}) => {
        const r = getRank(card);
        if (r === 51 && card.parentNode) card.parentNode.removeChild(card);
      });
    }

    fixHonorableMentions();

    // subtle console confirmation
    console.log('4DK update applied: Julius Randle added at #42, Jaren Jackson Jr. added to HM, Brandon Ingram removed.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
