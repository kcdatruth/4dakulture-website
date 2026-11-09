(function(){
"use strict";
var conferences={
 nba:{East:"ATL BOS BKN CHA CHI CLE DET IND MIA MIL NY ORL PHI TOR WSH",West:"DAL DEN GS HOU LAC LAL MEM MIN NO OKC PHX POR SAC SA UTA"},
 nfl:{AFC:"BAL BUF CIN CLE DEN HOU IND JAX KC LAC LV MIA NE NYJ PIT TEN",NFC:"ARI ATL CAR CHI DAL DET GB LAR MIN NO NYG PHI SEA SF TB WSH"}
};
var aliases={nba:{NYK:"NY",GSW:"GS",NOP:"NO",SAS:"SA",UTAH:"UTA",UTA:"UTA",WAS:"WSH"},nfl:{WSH:"WSH",JAC:"JAX",LA:"LAR"}};
function conference(league,team){
 var abbr=(aliases[league][team.abbreviation]||team.abbreviation||"").toUpperCase();
 var sets=conferences[league];
 return Object.keys(sets).find(function(k){return sets[k].split(" ").indexOf(abbr)>=0})||null;
}
document.querySelectorAll("[data-4dk-standings]").forEach(function(host){
 var league=host.getAttribute("data-4dk-standings");if(!conferences[league])return;
 fetch("data/4dk-"+league+"-standings-2026.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Unavailable");return r.json()}).then(function(data){
  if(data.status!=="verified"||!Array.isArray(data.teams)||data.teams.length!==(league==="nba"?30:32))throw Error("Incomplete");
  var groups=conferences[league], names=Object.keys(groups), classified=data.teams.map(function(t){return {team:t,group:conference(league,t)}});
  if(classified.some(function(t){return !t.group})||names.some(function(n){return classified.filter(function(t){return t.group===n}).length!==(league==="nba"?15:16)}))throw Error("Conference validation failed");
  var heading=document.createElement("h2");heading.className="fourdk-standings-heading";heading.textContent=(league==="nba"?"NBA":"NFL")+" STANDINGS · "+data.season;
  var date=document.createElement("p");date.className="fourdk-standings-date";date.textContent="Verified "+data.updated_utc+" · ESPN records · Separate from 4DK Power Rankings";
  var tabs=document.createElement("div");tabs.className="fourdk-standings-tabs";tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label","Select conference");
  var table=document.createElement("table");table.className="fourdk-standings-table";
  var head=document.createElement("thead");head.innerHTML="<tr><th>TEAM</th><th>W</th><th>L</th>"+(league==="nfl"?"<th>T</th>":"")+"<th>PCT</th></tr>";table.appendChild(head);
  var body=document.createElement("tbody");table.appendChild(body);
  var buttons=[];
  function show(name){
   body.replaceChildren();
   classified.filter(function(item){return item.group===name}).sort(function(a,b){return b.team.pct-a.team.pct||b.team.wins-a.team.wins||a.team.name.localeCompare(b.team.name)}).forEach(function(item){
    var t=item.team,tr=document.createElement("tr"),label=document.createElement("td");label.textContent=t.name;tr.appendChild(label);
    [t.wins,t.losses].concat(league==="nfl"?[t.ties]:[]).concat([t.pct.toFixed(3).replace(/^0/,"")]).forEach(function(v){var td=document.createElement("td");td.textContent=String(v);tr.appendChild(td)});
    body.appendChild(tr);
   });
   buttons.forEach(function(b){var active=b.textContent===name;b.setAttribute("aria-selected",String(active));b.classList.toggle("active",active)});
  }
  names.forEach(function(name){var b=document.createElement("button");b.type="button";b.className="fourdk-standings-tab";b.textContent=name;b.setAttribute("role","tab");b.addEventListener("click",function(){show(name)});tabs.appendChild(b);buttons.push(b)});
  host.replaceChildren(heading,date,tabs,table);show(names[0]);
 }).catch(function(){host.textContent="Standings temporarily unavailable. Original 4DK coverage remains accessible."});
});
})();