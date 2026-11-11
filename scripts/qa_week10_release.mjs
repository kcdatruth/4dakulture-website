import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {chromium} from 'playwright';
const d=JSON.parse(readFileSync('data/nfl-rankings-current.json','utf8'));
assert.equal(d.edition,'2026 Week 10');
assert.equal(d.teams.length,32);assert.equal(d.mvp.length,10);assert.equal(d.rookies.length,10);
assert.deepEqual(d,JSON.parse(readFileSync('data/nfl-rankings-2026-week10.json','utf8')));
for(const key of ['teams','mvp','rookies'])assert.deepEqual(d[key].map(x=>x.rank),Array.from({length:d[key].length},(_,i)=>i+1));
for(const t of d.teams){assert.equal(t.pf-t.pa,t.diff);assert.ok(t.next_game.opponent);assert.equal(Object.keys(t.stat_leaders).filter(k=>['passing','rushing','receiving','sacks'].includes(k)).length,4);}
const weekly=JSON.parse(readFileSync('nfl-weekly-index.json','utf8'));assert.equal(weekly.current_week,10);assert.equal(weekly.articles.filter(a=>a.week===9).length,4);
for(const p of ['nfl-power-rankings-week8-2026.html','nfl-mvp-watch-week8-2026.html','nfl-rookie-watch-week8-2026.html','nfl-sunday-recap-week9-2026.html','nfl-week10-injury-report-2026.html'])assert.ok(existsSync(p),p);
const root=process.cwd();
const server=http.createServer((req,res)=>{let p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',p.endsWith('.json')?'application/json':'text/html; charset=utf-8');res.end(readFileSync(p));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});mkdirSync('qa-artifacts/week10-release',{recursive:true});
const report=[];
try{
 for(const width of [360,390,768,1280]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const name of ['nfl-rankings-hq.html','nfl-power-rankings.html','nfl-mvp-watch.html','nfl-rookie-watch.html','nfl-weekly-hq.html']){
   const errors=[];page.on('pageerror',error=>errors.push(String(error)));await page.goto(base+'/'+name);await page.waitForLoadState('networkidle');
   const result=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,teams:document.querySelectorAll('.entry').length,players:document.querySelectorAll('.award').length,text:document.body.innerText}));
   assert.ok(result.scroll<=width+1,`${name} overflow at ${width}`);assert.equal(errors.length,0,errors.join('\n'));
   if(name==='nfl-rankings-hq.html'){assert.equal(result.teams,32);assert.equal(result.players,20);assert.ok(result.text.includes('2027')||result.text.includes('2,027'));}
   if(name==='nfl-power-rankings.html')assert.equal(result.teams,32);
   if(name.includes('watch'))assert.equal(result.players,10);
   if(name==='nfl-weekly-hq.html'){assert.ok(await page.locator('#archive #week-9').count());assert.equal(await page.locator('#current .card').count(),2);}
   await page.screenshot({path:`qa-artifacts/week10-release/${name}-${width}.png`});
   report.push({name,width,scroll:result.scroll,teams:result.teams,players:result.players});
  }
  if(width===390){await page.goto(base+'/nfl-rankings-hq.html#team-buf');await page.screenshot({path:'qa-artifacts/week10-release/buffalo-390.png'});}
  await page.close();
 }
 const page=await browser.newPage();await page.goto(base+'/nfl-rankings-hq.html');
 const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 for(const href of links){if(href.startsWith('#')){assert.equal(await page.locator(href).count(),1,href);continue;}if(/^https?:/.test(href))continue;const p=href.split('#')[0];assert.ok(existsSync(p),`Missing local link ${p}`);}
 for(const p of ['index.html','nfl.html'])assert.ok(readFileSync(p,'utf8').includes('id="fourdk-week10-rankings-live"'));
 writeFileSync('qa-artifacts/week10-release/results.json',JSON.stringify(report,null,2));console.log('PASS: 32 teams, 20 players, 128 leader categories, 20 viewport checks, Week 9 archive, and release links');
}finally{await browser.close();server.close();}
