/* 4 DA KULTURE · INTERACTIVE EXPERIENCES. Source-linked. No invented sports statistics. */
(() => {
  'use strict';
  const page = document.body?.dataset.fxPage;
  const $ = s => document.querySelector(s);
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const absLocal = href => {
    if (!href || /^(?:javascript|data|mailto):/i.test(href)) return null;
    try { const u = new URL(href,location.href); return u.origin === location.origin && /\.html$/i.test(u.pathname) ? u.pathname.split('/').pop() : null; } catch (_) { return null; }
  };
  async function retrieve(url,format='text') {
    const r = await fetch(url,{cache:'no-cache'});
    if (!r.ok) throw new Error('The published source is temporarily unavailable ('+r.status+').');
    return format==='json'?r.json():new DOMParser().parseFromString(await r.text(),'text/html');
  }
  const paragraph = s => s?'<p>'+esc(s)+'</p>':'';
  const link = (href,label='READ ORIGINAL →') => `<a class="fx-btn secondary" href="${esc(href)}">${esc(label)}</a>`;

  if(page==='4dk-nightcap-explorer'){
    let reports=[];
    const output=$('#fx-night-results'),status=$('#fx-night-status');
    function paint(){const q=$('#fx-night-search').value.trim().toLowerCase(),t=$('#fx-night-type').value;
      const selected=reports.filter(r=>{
        const label=String(r.label||'').toLowerCase();const isPreseason=label.includes('preseason');
        return (t==='all'||(t==='preseason'&&isPreseason)||(t==='regular'&&!isPreseason)) && [r.title,r.deck,r.player,r.rookie,r.game,r.date].join(' ').toLowerCase().includes(q);
      });
      status.textContent=`${selected.length} matching published report${selected.length===1?'':'s'} · ${reports.length} editions in the 4DK archive index`;
      output.innerHTML=selected.length?selected.map(r=>`<article class="fx-entry"><span class="fx-kicker">${esc(r.label||'PUBLISHED NIGHTCAP')} · ${esc(r.date||'')}</span><h3>${esc(r.title||'NBA Nightcap')}</h3>${paragraph(r.deck)}<p class="fx-aside">PLAYER: ${esc(r.player||'See full story')}<br>ROOKIE: ${esc(r.rookie||'See full story')}<br>GAME: ${esc(r.game||'See full story')}</p><div class="fx-ctas">${link(r.href,'READ COMPLETE NIGHTCAP →')}</div></article>`).join(''):`<div class="fx-empty">No published editions match this filter yet. Nothing has been invented to fill that gap. <a style="color:var(--fx-gold)" href="nba-nightcap.html">Go to the original Nightcap Desk →</a></div>`;
    }
    $('#fx-night-search').addEventListener('input',paint);$('#fx-night-type').addEventListener('change',paint);
    retrieve('nba-nightcap-index.json','json').then(data=>{
      if(!Array.isArray(data))throw new Error('No published archive index');
      reports=data.filter(r=>r&&absLocal(r.href)).sort((a,b)=>String(b.date_iso||'').localeCompare(String(a.date_iso||'')));paint();
    }).catch(()=>{status.textContent='The Nightcap archive index could not be loaded right now.';output.innerHTML=`<div class="fx-empty">The original reports are still available at the <a style="color:var(--fx-gold)" href="nba-nightcap.html">NBA Nightcap Desk →</a>. This explorer won't generate replacement game results.</div>`;});
  }

  if(page==='4dk-nfl-command-center'){
    const teams=['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','New York Giants','New York Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers','Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders'];
    const shortNames={'San Francisco 49ers':['niners','49ers','san francisco'],'Tampa Bay Buccaneers':['buccaneers','bucs','tampa'],'New England Patriots':['patriots','new england'],'Los Angeles Rams':['rams','la rams'],'Los Angeles Chargers':['chargers'],'Las Vegas Raiders':['raiders'],'Washington Commanders':['commanders','washington'],'New York Jets':['jets'],'New York Giants':['giants']};
    teams.forEach(name=>{$('#fx-nfl-team').appendChild(new Option(name,name))});
    const fallback=[['Week 6 Gameday Report','nfl-week6-sunday-kickoff-oct18-2026.html','preview'],['MVP Watch · Week 6','nfl-mvp-watch-week6-2026.html','rank'],['Rookie Watch · Week 6','nfl-rookie-watch-week6-2026.html','rank'],['Power Rankings · entering Week 6','nfl-power-rankings-week5-2026.html','rank'],['Sunday Recap Archive','nfl-sunday-recaps.html','recap'],['NFL Season Archive','nfl-season-archive-2026.html','recap']].map(([title,href,type])=>({title,href,type}));
    let entries=fallback.slice();
    function classify(v){return /power|mvp|rookie|rank|watch|standings/i.test(v)?'rank':/recap|review|final|postgame|archive/i.test(v)?'recap':'preview';}
    function paint(){
      const selectedTeam=$('#fx-nfl-team').value,q=$('#fx-nfl-search').value.toLowerCase(),type=$('#fx-nfl-type').value;
      const selected=entries.filter(e=>{
        const search=(e.title+' '+e.href).toLowerCase();
        const matchTeam=!selectedTeam||[selectedTeam.toLowerCase(),...(shortNames[selectedTeam]||[]),selectedTeam.split(' ').at(-1).toLowerCase()].some(x=>search.includes(x));
        return (type==='all'||e.type===type)&&matchTeam&&search.includes(q);
      }).slice(0,54);
      $('#fx-nfl-status').textContent=`${selected.length} matching published links · ${entries.length} discovered from the NFL Desk and established boards`;
      $('#fx-nfl-results').innerHTML=selected.length?selected.map(e=>`<article class="fx-entry"><span class="fx-kicker">${e.type==='rank'?'RANKINGS & WATCH':e.type==='recap'?'RECAP / ARCHIVE':'GAME / PREVIEW'}</span><h3>${esc(e.title)}</h3><div class="fx-ctas">${link(e.href,'READ THE 4DK STORY →')}</div></article>`).join(''):'<div class="fx-empty">No individually linked 4DK NFL headline matched this filter. Try All teams or browse the complete archive. This does not mean the team lacks coverage.</div>';
    }
    ['#fx-nfl-team','#fx-nfl-search','#fx-nfl-type'].forEach(id=>$(id).addEventListener(id.includes('search')?'input':'change',paint));
    paint();
    retrieve('nfl.html').then(doc=>{
      const collected=new Map(entries.map(e=>[e.href,e]));
      [...doc.querySelectorAll('main a[href]')].forEach(a=>{
        const href=absLocal(a.getAttribute('href'));if(!href||!/^nfl[-.]/.test(href)||href==='nfl.html')return;
        const title=(a.innerText||a.textContent||'').replace(/\s+/g,' ').trim();
        if(title.length<9)return;
        if(!collected.has(href))collected.set(href,{href,title:title.slice(0,170),type:classify(href+' '+title)});
      });
      entries=[...collected.values()];paint();
    }).catch(()=>{paint();$('#fx-nfl-status').textContent+=' · The current NFL page could not be refreshed; showing linked weekly entry points.'});
  }

  if(page==='4dk-king-files-timeline'){
    const cards=[...document.querySelectorAll('#fx-king-timeline .fx-era')];
    document.querySelectorAll('[data-king-filter]').forEach(button=>button.addEventListener('click',()=>{
      const filter=button.dataset.kingFilter;
      document.querySelectorAll('[data-king-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      let shown=0;
      cards.forEach(card=>{const published=card.classList.contains('published');const visible=filter==='all'||filter==='published'&&published||filter==='roadmap'&&!published;card.hidden=!visible; if(visible)shown++});
      document.querySelector('#fx-king-status').textContent=`${shown} eras shown · 1 published feature · 7 future chapters`;
    }));
  }

  if(page==='4dk-album-files-library'){
    const albums=[
      {name:'The Diary',artist:'Scarface',href:'album-files-the-diary.html',vol:'one',cover:'south-scarface-the-diary.jpg'},
      {name:'Doggystyle',artist:'Snoop Doggy Dogg',href:'album-files-doggystyle.html',vol:'one',cover:'doggystyle.jpg'},
      {name:'Tha Carter II',artist:'Lil Wayne',href:'album-files-tha-carter-ii.html',vol:'one',cover:'4dk-tha-carter-ii-original-cover.jpg'},
      {name:'Late Registration',artist:'Kanye West',href:'album-files-late-registration.html',vol:'one',cover:'4dk-late-registration-original-cover.jpg'},
      {name:'Get Rich or Die Tryin’',artist:'50 Cent',href:'album-files-get-rich-or-die-tryin.html',vol:'one',cover:'https://coverartarchive.org/release/3914ae8e-3b64-3a5b-bc37-9ff5dddf367d/front-500'},
      {name:'All Eyez on Me',artist:'2Pac',href:'album-files-all-eyez-on-me.html',vol:'two',cover:'https://coverartarchive.org/release/b8d2916e-c077-430b-8535-069dc6891360/front-500'},
      {name:'Thug Motivation 101',artist:'Jeezy',href:'album-files-tm101.html',vol:'two',cover:'4dk-tm101-original-cover.jpg'},
      {name:'Take Care',artist:'Drake',href:'album-files-take-care.html',vol:'two',cover:'4dk-take-care-original-cover.jpg'},
      {name:'To Pimp a Butterfly',artist:'Kendrick Lamar',href:'album-files-to-pimp-a-butterfly.html',vol:'two',cover:'https://storage.googleapis.com/pr-newsroom-wp/1/2024/02/Kendrick-Lamar-TPAB-EX-00602547311009-Cvr-1024x1024.jpg'},
      {name:'Only Built 4 Cuban Linx…',artist:'Raekwon',href:'album-files-only-built-4-cuban-linx.html',vol:'two',cover:'east-08-cuban-linx.jpg'}
    ];
    let volume='all',q='',covers={};
    const output=$('#fx-album-results'),detail=$('#fx-album-detail');
    function render(){const items=albums.filter(a=>(volume==='all'||a.vol===volume)&&(`${a.name} ${a.artist} ${a.href}`).toLowerCase().includes(q));
      $('#fx-album-status').textContent=`${items.length} completed issues shown · ${albums.length} published issue links preserved`;
      output.innerHTML=items.map((a)=>`<article class="fx-album"><div>${a.cover||covers[a.href]?`<img src="${esc(covers[a.href]||a.cover)}" alt="Original cover for ${esc(a.name)}" loading="lazy" onerror="this.style.display='none'">`:`<div style="width:100%;aspect-ratio:1;background:linear-gradient(135deg,#563640,#222);display:grid;place-items:center;color:#eac38b;font-weight:900;text-align:center;font-size:10px">ORIGINAL<br>ARTWORK</div>`}</div><div><small class="fx-label">VOLUME ${a.vol==='one'?'I':'II'} · PUBLISHED</small><h3>${esc(a.name)}</h3><p>${esc(a.artist)}</p><div class="fx-ctas"><button type="button" class="fx-btn" data-album="${esc(a.href)}">EXPLORE TRACKS →</button><a class="fx-btn ghost" href="${esc(a.href)}">FULL REVIEW ↗</a></div></div></article>`).join('')||'<div class="fx-empty">No completed album file matches this search.</div>';
      output.querySelectorAll('[data-album]').forEach(b=>b.addEventListener('click',()=>expand(b.dataset.album)));
    }
    $('#fx-album-search').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
    document.querySelectorAll('[data-volume]').forEach(b=>b.addEventListener('click',()=>{volume=b.dataset.volume;document.querySelectorAll('[data-volume]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()}));
    async function expand(href){const album=albums.find(a=>a.href===href);if(!album)return;
      detail.innerHTML=`<div class="fx-note" role="status">Loading the original <strong>${esc(album.name)}</strong> track analysis…</div>`; detail.scrollIntoView({behavior:'smooth',block:'start'});
      try{
        const doc=await retrieve(href);
        const candidates=[...doc.querySelectorAll('.tracks .track,.track-list .track,.tracks article.track')];
        const unique=new Set(),tracks=candidates.map(el=>{
          const name=(el.querySelector('h3,h4,.track-title,.track-head h3,.track-head h4')?.textContent||'').trim().replace(/\s+/g,' ');
          const score=(el.querySelector('.track-score,.track-grade')?.textContent||'').trim().replace(/\s+/g,' ');
          const blurb=(el.querySelector('.track-body p,.track-copy p,p')?.textContent||'').trim().replace(/\s+/g,' ');
          return {name,score,blurb};
        }).filter(x=>x.name&&!unique.has(x.name)&&(unique.add(x.name),true));
        if(!tracks.length){detail.innerHTML=`<div class="fx-entry"><span class="fx-kicker">${esc(album.artist)} · ${esc(album.name)}</span><h3>OPEN THE ORIGINAL TRACK-BY-TRACK</h3><p>This issue uses a different review layout, so we're linking to the complete article instead of making up track scores or extracts.</p>${link(href,'READ THE FULL ORIGINAL REVIEW →')}</div>`;return;}
        detail.innerHTML=`<div class="fx-title"><div><span class="fx-kicker">ORIGINAL ALBUM FILE · ${esc(album.artist)}</span><h2>${esc(album.name)} · TRACKS</h2></div><p>${tracks.length} track sections found in the existing long-form review. Expand each track to read an excerpt from the original analysis.</p></div><div class="fx-collection">${tracks.map((t,i)=>`<details class="fx-album-track"><summary>${String(i+1).padStart(2,'0')} · ${esc(t.name)}${t.score?' · '+esc(t.score):''}</summary>${paragraph(t.blurb||'Read the complete source article for this track’s full write-up.')}</details>`).join('')}</div><div class="fx-ctas">${link(href,'READ THE COMPLETE TRACK-BY-TRACK →')}</div>`;
      }catch(_){detail.innerHTML=`<div class="fx-entry"><h3>Original issue temporarily unavailable</h3><p>The published review has not been changed. Try opening it directly.</p>${link(href)}</div>`}
    }
    render();
    retrieve('album-files.html').then(doc=>{
      for(const a of albums){const original=doc.querySelector(`a[href="${a.href}"] img`);if(original) covers[a.href]=original.getAttribute('src');}
      render();
    }).catch(()=>{});
  }
})();
