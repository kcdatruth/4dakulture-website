#!/usr/bin/env node
// 4DK staging homepage preservation/link audit. Read-only, no external packages.
// Run from repository root: node scripts/qa_phase1_homepage.mjs
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
const root = process.cwd();
const page = 'staging/phase1-homepage-concept.html';
const errors = [];
const warn = [];
const html = readFileSync(resolve(root,page),'utf8');
const links = [...html.matchAll(/\bhref=["']([^"'#]+)(?:#[^"']*)?["']/g)].map(m=>m[1]);
const local = [...new Set(links.filter(s=>!s.startsWith('https:')&&!s.startsWith('http:')&&!s.startsWith('mailto:')))];
for(const link of local){
 const target=resolve(root,dirname(page),decodeURIComponent(link.split('?')[0]));
 if(!target.startsWith(root+sep)) { errors.push('Link escapes repository: '+link);continue; }
 if(!existsSync(target)) errors.push('Missing link target: '+link);
}
const latest=JSON.parse(readFileSync(resolve(root,'nightcap-latest.json'),'utf8'));
const expected=/^nba-nightcap-20\d{2}-\d{2}-\d{2}\.html$/;
if(!expected.test(latest.url)) errors.push('Unexpected Nightcap URL: '+latest.url);
else if(!existsSync(resolve(root,latest.url))) errors.push('Missing latest Nightcap: '+latest.url);
if(!html.includes('data-feed-headline')||!html.includes('data-feed-link')) errors.push('Missing dynamic Nightcap placeholders');
if(!html.includes('noindex,nofollow')) warn.push('Staging page lacks noindex directive');
if(!html.includes('STAGING CONCEPT ONLY')) warn.push('Staging-only notice missing');
if(!html.includes('href="../index.html"')) errors.push('Original homepage link missing');
console.log('4DK Phase 1 homepage QA');
console.log('Distinct local links:',local.length);
console.log('Latest Nightcap:',latest.url);
for(const item of warn) console.warn('WARN:',item);
for(const item of errors) console.error('FAIL:',item);
console.log(errors.length?'FAILED':'PASSED');
process.exitCode=errors.length?1:0;
