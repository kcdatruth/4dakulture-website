#!/usr/bin/env node
// Read-only regression guard for additive homepage integration candidate.
import {readFileSync,existsSync} from 'node:fs';
const path='staging/phase1-production-integration-candidate.html';
const html=readFileSync(path,'utf8');
const errors=[];
for(const token of ['<main id="main">','<footer class="footer">','id="fourdk-phase1-feature-rail"','id="fourdk-fresh-headlines"','href="nba.html"','href="nfl.html"','href="magazine.html"','href="nba-nightcap-2026-11-22.html"','href="nba-nightcap-archive.html"','src="home-frontpage-v2.js"','src="scores.js"','src="nightcap-latest.js"','href="styles.css"','href="scores.css"','href="home-frontpage-v2.css"','href="4dk-magazine-identity.css"']) {
 if(!html.includes(token)) errors.push('Missing original module or integration marker: '+token);
}
if(html.length<100000) errors.push('Unexpected homepage truncation');
if((html.match(/id="fourdk-phase1-feature-rail"/g)||[]).length!==1) errors.push('Feature rail not unique');
if(!html.includes('name="viewport"')&&!html.includes('name="viewport"/>')) errors.push('Missing mobile viewport');
for(const file of ['nba-nightcap-2026-11-22.html','nba-nightcap-2026-11-21.html','nba-nightcap-archive.html']) if(!existsSync(file)) errors.push('Missing editorial target: '+file);
console.log('4DK production integration candidate regression QA',errors.length?'FAILED':'PASSED');
for(const e of errors)console.error('FAIL:',e);
process.exitCode=errors.length?1:0;
