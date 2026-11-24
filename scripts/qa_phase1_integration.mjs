#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const html = readFileSync('index.html','utf8');
const read = path => JSON.parse(readFileSync(path,'utf8'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
const order = ['fourdk-fresh-headlines','data-score-ticker','siteSearch','aria-label="Explore 4DK"','dk-latest-nightcap','fourdk-phase1-feature-rail','class="desks"'];
let position = -1;
for (const marker of order) {
  const next = html.indexOf(marker);
  assert(next > position, marker);
  position = next;
}
const targets = new Set();
for (const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (href.startsWith('https://')) continue;
  if (href.startsWith('#')) {assert(ids.includes(href.slice(1)),href);continue;}
  targets.add(href.replace(/^\//,'').split('#')[0]);
}
const {url, previousUrl, archiveUrl} = read('nightcap-latest.json');
for (const path of [url,previousUrl,archiveUrl]) targets.add(path);
for (const {url} of read('nfl-weekly-index.json').articles.filter(a=>a.week === read('nfl-weekly-index.json').current_week)) targets.add(url);
for (const rows of ['music','tv'].map(key=>read('4dk-culture-headlines.json')[key])) for (const {url} of rows) targets.add(url);
for (const path of targets) assert(existsSync(path),path);
const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
assert.equal(imageTags.length,2,'Only the approved 4DK footer logo and original culture cover may appear');
assert(imageTags.some(tag=>/src="4dk-footer-logo\.png"/.test(tag)),'Footer uses original repository logo');
assert(imageTags.some(tag=>/src="the-drop-episode-8-hercules\.jpg"/.test(tag)),'Culture rail uses existing published 4DK cover');
assert(!/<picture\b/i.test(html),'Front page otherwise uses original CSS illustration');
assert(!/url\s*\(/i.test(readFileSync('phase1-home.css','utf8')),'Check artwork rights before introducing external assets');
console.log('Verified module order, unique IDs, feed destinations, original CSS art and',targets.size,'local targets.');
