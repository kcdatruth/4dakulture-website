/* 4 Da Kulture NBA live player stats: display only; preserves editorial content. */
(async () => {
  'use strict';
  const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const fmt = p => `${p.games} GP · ${Number(p.ppg).toFixed(1)} PPG · ${Number(p.rpg).toFixed(1)} RPG · ${Number(p.apg).toFixed(1)} APG · ${Number(p.fg_pct).toFixed(1)}% FG · ${p.fg3_pct == null ? '—' : Number(p.fg3_pct).toFixed(1) + '%'} 3PT`;
  try {
    const response = await fetch('/data/4dk-player-stats-2026-27.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Stats unavailable');
    const data = await response.json();
    if (data.status !== 'verified' || data.matched !== 50 || !data.players) throw new Error('Stats not verified');
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
    document.documentElement.dataset.fourdkStatsUpdated = data.checked_utc || 'verified';
  } catch (error) {
    console.warn('4DK stats refresh unavailable; keeping last published snapshots.', error);
  }
})();
