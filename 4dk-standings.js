(function(){
  "use strict";
  var hosts=document.querySelectorAll("[data-4dk-standings]");
  hosts.forEach(function(host){
    var league=host.getAttribute("data-4dk-standings");
    if(!/^(nba|nfl)$/.test(league))return;
    var url="data/4dk-"+league+"-standings-2026.json";
    fetch(url,{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Standings unavailable");return r.json()}).then(function(data){
      var expected=league==="nba"?30:32;
      if(!Array.isArray(data.teams)||data.teams.length!==expected||data.status!=="verified")throw Error("Standings incomplete");
      var title=document.createElement("div");title.className="fourdk-standings-heading";
      title.textContent=(league==="nba"?"NBA":"NFL")+" STANDINGS · "+data.season;
      var date=document.createElement("p");date.className="fourdk-standings-date";
      date.textContent="Last verified: "+data.updated_utc+" · Official results feed: ESPN";
      var table=document.createElement("table");table.className="fourdk-standings-table";
      var head=document.createElement("thead");head.innerHTML="<tr><th>TEAM</th><th>W</th><th>L</th>"+(league==="nfl"?"<th>T</th>":"")+"<th>PCT</th></tr>";table.appendChild(head);
      var body=document.createElement("tbody");
      data.teams.forEach(function(t){
        var tr=document.createElement("tr"),name=document.createElement("td");name.textContent=t.name;
        tr.appendChild(name);
        [t.wins,t.losses].concat(league==="nfl"?[t.ties]:[]).concat([t.pct.toFixed(3).replace(/^0/,"")]).forEach(function(value){
          var td=document.createElement("td");td.textContent=String(value);tr.appendChild(td);
        });body.appendChild(tr);
      });table.appendChild(body);
      host.replaceChildren(title,date,table);
    }).catch(function(){host.textContent="Standings temporarily unavailable. Previous rankings and coverage remain accessible."});
  });
})();
