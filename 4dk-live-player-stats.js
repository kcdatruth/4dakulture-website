/* 4 Da Kulture NBA live player stats: display only; preserves editorial content. */
(async () => {
  'use strict';
  const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const percent = value => value == null ? '—' : Number(value).toFixed(1) + '%';
  const fmt = p => `${p.games} GP · ${Number(p.ppg).toFixed(1)} PPG · ${Number(p.rpg).toFixed(1)} RPG · ${Number(p.apg).toFixed(1)} APG · ${percent(p.fg_pct)} FG · ${percent(p.fg3_pct)} 3PT`;
  try {
    const response = await fetch('/data/4dk-player-stats-2026-27.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Stats unavailable');
    const data = await response.json();
    if (data.status !== 'verified' || data.matched < 50 || !data.players) throw new Error('Stats not verified');
    const players = new Map(Object.entries(data.players).map(([name, value]) => [normalize(name), value]));
    document.querySelectorAll('.rank-entry[id^="rank-"]').forEach(card => {
      const name = card.querySelector('h2')?.textContent?.trim();
      const target = card.querySelector('.entry-stats strong');
      const stats = players.get(normalize(name));
      if (target && stats) target.textContent = fmt(stats);
    });
    document.querySelectorAll('#playerGrid .card').forEach(card => {
      const name = card.querySelector('.card-top .name')?.textContent?.trim();
      const target = card.querySelector('.current-snapshot strong');
      const stats = players.get(normalize(name));
      if (target && stats) target.textContent = fmt(stats);
    });
    document.querySelectorAll('.hm-profile').forEach(card => {
      const name = card.querySelector('.hm-heading h3')?.textContent?.trim();
      const stats = players.get(normalize(name));
      const line = card.querySelector('.hm-statline');
      if (!line) return;
      const small = line.querySelector('small');
      const strong = line.querySelector('strong');
      if (stats) {
        if (small) small.textContent = `2026–27 CURRENT SEASON · ${stats.games} GP`;
        if (strong) strong.textContent = `${Number(stats.ppg).toFixed(1)} PPG · ${Number(stats.rpg).toFixed(1)} RPG · ${Number(stats.apg).toFixed(1)} APG · ${percent(stats.fg_pct)} FG · ${percent(stats.fg3_pct)} 3PT`;
      } else if (Array.isArray(data.unmatched) && data.unmatched.some(n => normalize(n) === normalize(name))) {
        if (small) small.textContent = '2026–27 CURRENT SEASON';
        if (strong) strong.textContent = 'No verified 2026–27 games recorded';
      }
    });
    document.documentElement.dataset.fourdkStatsUpdated = data.checked_utc || 'verified';
  } catch (error) {
    console.warn('4DK stats refresh unavailable; keeping last published snapshots.', error);
  }
})();
