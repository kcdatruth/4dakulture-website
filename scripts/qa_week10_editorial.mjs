import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = path => readFileSync(path, 'utf8');
const integrated = read('nfl-week10-2026-integrated-edition-review.html');
const rookie = read('nfl-week10-2026-rookie-stats-audit.html');
const hq = read('nfl-week10-2026-editorial-review-hq.html');
const checks = [
  ['integrated review remains noindex', /name="robots"[^>]*content="[^"]*noindex/i.test(integrated)],
  ['editorial HQ remains noindex', /name="robots"[^>]*content="[^"]*noindex/i.test(hq)],
  ['rookie audit remains noindex', /name="robots"[^>]*content="[^"]*noindex/i.test(rookie)],
  ['integrated Delane total reconciled to 27', integrated.includes("Delane's 27 combined tackles")],
  ['rookie audit Delane card reconciled to 27', /<h2>Mansoor Delane<\/h2><p class="stat">27 combined tackles/.test(rookie)],
  ['integrated review does not retain 26-tackle Delane claim', !integrated.includes("Delane's 26 tackles")],
  ['rookie audit does not retain provisional 26-tackle card', !/<h2>Mansoor Delane<\/h2><p class="stat">26 tackles/.test(rookie)],
  ['HQ accurately records passed mobile QA', hq.includes('Mobile browser QA · passed')],
  ['HQ still blocks premature publication', hq.includes('Keep PR #41 unmerged')],
  ['rookie audit explicitly documents Rodriguez tackle discrepancy', rookie.includes('79/78')],
  ['integrated edition retains full Rookie Watch top ten', ['David Bailey','Sonny Styles','Arvell Reese','Denzel Boston','Jacob Rodriguez','Carnell Tate','Mansoor Delane','Germie Bernard','Caleb Downs','KC Concepcion'].every(name => integrated.includes(name))],
];
for (const [name, ok] of checks) console.log((ok ? 'PASS' : 'FAIL') + ' ' + name);
assert.ok(checks.every(([, ok]) => ok), 'Week 10 editorial consistency QA failed');
