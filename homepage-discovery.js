/* 4DK homepage discovery rail. Additive: never removes existing editorial content. */
(function(){
  function init(){
    if(document.getElementById('fourdk-discovery-rail'))return;
    var links=Array.from(document.querySelectorAll('a[href]'));
    var nightcaps=links.map(function(a){var h=a.getAttribute('href')||'';var m=h.match(/(?:^|\/)nba-nightcap-(20\d{2}-\d{2}-\d{2})\.html(?:[?#].*)?$/);return m?{date:m[1],href:h}:null}).filter(Boolean).sort(function(a,b){return b.date.localeCompare(a.date)});
    var items=[];
    if(nightcaps.length)items.push({label:'Latest linked Nightcap · '+nightcaps[0].date,href:nightcaps[0].href});
    items.push({label:'All NBA Nightcaps',href:'nba-nightcap-archive.html'});
    items.push({label:'NBA Rankings HQ',href:'nba-rankings-hq.html'});
    items.push({label:'NFL Weekly HQ',href:'nfl.html'});
    items.push({label:'Album Files',href:'album-files.html'});
    items.push({label:'All Stories',href:'stories.html'});
    var rail=document.createElement('nav');rail.id='fourdk-discovery-rail';rail.setAttribute('aria-label','4DK quick story navigation');
    var heading=document.createElement('strong');heading.textContent='EXPLORE 4DK';rail.appendChild(heading);
    items.forEach(function(item){var a=document.createElement('a');a.href=item.href;a.textContent=item.label;rail.appendChild(a)});
    /* Use the existing authoritative feed; keep linked HTML as an offline fallback. */
    fetch('nightcap-latest.json',{cache:'no-store'}).then(function(response){if(!response.ok)throw Error('feed');return response.json()}).then(function(data){
      if(!data||typeof data.url!=='string'||!/^nba-nightcap-20\\d{2}-\\d{2}-\\d{2}\\.html$/.test(data.url))return;
      var link=rail.querySelector('a[href^="nba-nightcap-20"]');
      if(!link){link=document.createElement('a');rail.insertBefore(link,rail.children[1]||null);}
      link.href=data.url;
      link.textContent='Latest Nightcap · '+(typeof data.shortDate==='string'?data.shortDate:data.url.slice(13,23));
    }).catch(function(){/* Existing linked Nightcap remains available. */});
    var target=document.querySelector('main')||document.querySelector('#fourdk-front-hub')||document.body;
    target.insertBefore(rail,target.firstChild);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
