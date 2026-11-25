import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const json = file => JSON.parse(readFileSync(file, 'utf8'));
const current = json('data/nfl-rankings-current.json');
const year = Number(current.as_of.slice(0, 4));
const week = Number(current.edition.match(/Week (\d+)/i)[1]);
const dated = `nfl-rankings-week${week}-${year}.html`;
const archive = `nfl-rankings-week${week - 1}-${year}.html`;
assert.deepEqual(current, json(`data/nfl-rankings-${year}-week${week}.json`));
assert.equal(readFileSync(dated, 'utf8'), readFileSync('nfl-rankings-hq.html', 'utf8'));
const last = json(`data/nfl-rankings-${year}-week${week - 1}.json`);
const boards = [
  ['teams', 'power32', 32, 'nfl-power-rankings.html'],
  ['mvp', 'mvp', 10, 'nfl-mvp-watch.html'],
  ['rookies', 'rookies', 10, 'nfl-rookie-watch.html']
];
for (const [key, , count] of boards) {
  assert.equal(current[key].length, count);
  current[key].forEach((row, i) => {
    const previous = last[key].find(p => key === 'teams' ? p.code === row.code : p.name === row.name);
    assert.equal(row.rank, i + 1);
    assert.equal(row.previous_rank, previous?.rank ?? null);
    assert.equal(row.movement, previous ? previous.rank - row.rank : null);
    assert.ok(row.analysis.length && row.analysis.every(p => p.trim()));
    if (key === 'teams') {
      assert.equal(row.pf - row.pa, row.diff);
      assert.ok(row.next_game.opponent && row.next_game.time);
      for (const stat of ['passing','rushing','receiving','sacks']) assert.ok(row.stat_leaders[stat].player);
    } else assert.ok(row.stats);
  });
}
assert.equal(Object.keys(current.standings).length, 8);
for (const conf of ['AFC','NFC']) assert.equal(new Set(current.playoff_snapshot[conf]).size, 7);
assert.ok(existsSync(archive));
assert.ok(readFileSync('nfl.html','utf8').includes('href="nfl-rankings-hq.html"'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({width, height: 850});
    for (const [file, relevant] of [[dated, boards], ['nfl-rankings-hq.html', boards], ...boards.map(b => [b[3], [b]])]) {
      await page.goto(pathToFileURL(path.resolve(file)).href, {waitUntil:'domcontentloaded'});
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), file);
      for (const [key, id, count] of relevant) {
        const cards = page.locator(`#${id} article[data-rank]`);
        assert.equal(await cards.count(), count);
        assert.deepEqual(await cards.locator('h3').allTextContents(), current[key].map(x => x.name));
        assert.equal(await cards.locator('img[alt]').count(), count);
        assert.equal(await cards.locator('.move').count(), count);
      }
      const targets = await page.locator('a[href]').evaluateAll(links => links.map(a => a.getAttribute('href')));
      for (const href of targets) {
        if (href.startsWith('#')) assert.equal(await page.locator(href).count(), 1, href);
        else if (!/^https?:/.test(href)) assert.ok(existsSync(href.split('#')[0]), href);
      }
      assert.ok(targets.includes(archive), file);
    }
  }
} finally { await browser.close(); }
console.log('Current NFL rankings, movement, archives, links and 20 viewport renders passed.');
