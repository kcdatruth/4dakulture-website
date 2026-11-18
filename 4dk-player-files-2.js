/* 4DK Player Files 2.0 — progressive enhancement, no editorial rewrites. */
(async()=>{'use strict';
const root=document.querySelector('[data-4dk-profile-id]');if(!root)return;
const id=root.dataset['4dkProfileId'];
const safe=(v)=>String(v??'');
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=safe(txt);return n};
try{
 const [pRes,sRes]=await Promise.all([fetch('data/4dk-player-files.json',{cache:'no-store'}),fetch('data/4dk-player-stats-2026-27.json',{cache:'no-store'})]);
 if(!pRes.ok)throw Error('Player identity unavailable');
 const catalog=await pRes.json(),p=catalog.players.find(x=>x.id===id);
 if(!p)throw Error('Player not found');
 const section=el('section','pf2-panel');section.setAttribute('aria-label','4DK Player Files 2.0');
 section.append(el('div','pf2-eyebrow','4DK PLAYER FILES 2.0'));
 section.append(el('h2','pf2-title','PLAYER HEADQUARTERS'));
 const meta=el('p','pf2-meta',p.team+' · Original published Top 50: #'+p.originalTop50Rank);section.append(meta);
 const status=el('p','pf2-status','2026–27 statistics currently unavailable or unverified');section.append(status);
 if(sRes.ok){const stats=await sRes.json();if(stats.status==='verified'&&stats.season===catalog.season&&stats.players){
 const normalize=s=>safe(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const match=Object.entries(stats.players).find(([name])=>normalize(name)===normalize(p.name));
 const s=match&&match[1];
 if(s&&Number.isFinite(s.games)&&s.games>0){
 status.textContent='2026–27 season averages · '+s.games+' games · dataset checked '+safe(stats.checked_utc||'date unavailable');
 const grid=el('div','pf2-grid');
 for(const [key,label] of [['ppg','PPG'],['rpg','RPG'],['apg','APG'],['spg','SPG'],['bpg','BPG'],['fg_pct','FG%'],['fg3_pct','3PT%'],['ft_pct','FT%']]){
 const cell=el('div','pf2-stat'),value=el('strong','',Number.isFinite(s[key])?s[key].toFixed(1):'—');
 cell.append(value,el('span','',label));grid.append(cell);
 }section.append(grid);
 }
 }}
 const nav=el('div','pf2-links');
 for(const [label,url] of [['NBA TOP 50','top-50-nba-players-2026-27.html'],['PLAYER DIRECTORY','4dk-nba-player-directory.html'],['NIGHTCAP ARCHIVE','nba-nightcap-archive.html']]){const a=el('a','',label);a.href=url;nav.append(a)}section.append(nav);
 try{const cr=await fetch('data/4dk-player-coverage.json',{cache:'no-store'});if(cr.ok){const index=await cr.json();const articles=index.coverage&&index.coverage[id];if(Array.isArray(articles)&&articles.length){const related=el('div','pf2-related');related.append(el('h3','','RELATED 4DK COVERAGE'));for(const [label,url] of articles){if(typeof url!=='string'||!url.endsWith('.html')||url.includes('/')||url.includes('..'))continue;const a=el('a','',label);a.href=url;related.append(a)}section.append(related)}}}catch(e){/* Related stories are optional. */}
 root.prepend(section);
}catch(e){/* Preserve original profile if data cannot load. */}
})();