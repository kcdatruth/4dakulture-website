(function(){
"use strict";
var conferences={
 nba:{East:"ATL BOS BKN CHA CHI CLE DET IND MIA MIL NY ORL PHI TOR WSH",West:"DAL DEN GS HOU LAC LAL MEM MIN NO OKC PHX POR SAC SA UTA"},
 nfl:{AFC:"BAL BUF CIN CLE DEN HOU IND JAX KC LAC LV MIA NE NYJ PIT TEN",NFC:"ARI ATL CAR CHI DAL DET GB LAR MIN NO NYG PHI SEA SF TB WSH"}
};
var divisions={
 nba:{"Atlantic":"BOS BKN NY PHI TOR","Central":"CHI CLE DET IND MIL","Southeast":"ATL CHA MIA ORL WSH","Northwest":"DEN MIN OKC POR UTA","Pacific":"GS LAC LAL PHX SAC","Southwest":"DAL HOU MEM NO SA"},
 nfl:{"AFC East":"BUF MIA NE NYJ","AFC North":"BAL CIN CLE PIT","AFC South":"HOU IND JAX TEN","AFC West":"DEN KC LAC LV","NFC East":"DAL NYG PHI WSH","NFC North":"CHI DET GB MIN","NFC South":"ATL CAR NO TB","NFC West":"ARI LAR SEA SF"}
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
  var date=document.createElement("p");date.className="fourdk-standings-date";
  var timestamp=Date.parse(String(data.updated_utc||"").replace(" UTC","Z").replace(" ","T"));
  var friendly=Number.isFinite(timestamp)?new Intl.DateTimeFormat("en-US",{timeZone:"America/Los_Angeles",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}).format(new Date(timestamp)):data.updated_utc;
  date.textContent="Updated "+friendly+" · ESPN standings · Independent of 4DK Power Rankings";
  var tabs=document.createElement("div");tabs.className="fourdk-standings-tabs";tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label","Select conference");
  var mode=document.createElement("div");mode.className="fourdk-standings-modes";
  var confButton=document.createElement("button"),divButton=document.createElement("button"),raceButton=document.createElement("button");
  confButton.textContent="CONFERENCE";divButton.textContent="DIVISIONS";raceButton.textContent=league==="nba"?"NBA CUP":"PLAYOFF RACE";
  [confButton,divButton,raceButton].forEach(function(b){b.type="button";b.className="fourdk-standings-mode";mode.appendChild(b)});
  var divisionSelect=document.createElement("select");divisionSelect.className="fourdk-standings-division-select";divisionSelect.setAttribute("aria-label","Select division");
  Object.keys(divisions[league]).forEach(function(name){var opt=document.createElement("option");opt.value=name;opt.textContent=name;divisionSelect.appendChild(opt)});
  divisionSelect.hidden=true;
  var table=document.createElement("table");table.className="fourdk-standings-table";
  var head=document.createElement("thead");head.innerHTML="<tr><th>TEAM</th><th>W</th><th>L</th>"+(league==="nfl"?"<th>T</th>":"")+"<th>PCT</th></tr>";table.appendChild(head);
  var body=document.createElement("tbody");table.appendChild(body);
  var buttons=[],view="conference";
  var cupPanel=league==="nba"?document.createElement("div"):null;if(cupPanel){cupPanel.setAttribute("data-4dk-nba-cup","");cupPanel.hidden=true;}
  var racePanel=document.createElement("div");racePanel.className="fourdk-playoff-race";
  var raceNote=document.createElement("p");raceNote.className="fourdk-playoff-note";
  var raceList=document.createElement("div");raceList.className="fourdk-playoff-grid";
  if(league==="nfl"){
    raceNote.textContent="PROJECTED PLAYOFF RACE · Record-based snapshot only. Division leaders and wild-card places are provisional; official NFL tiebreakers and clinching scenarios are not applied.";
    racePanel.appendChild(raceNote);racePanel.appendChild(raceList);
    function pctOrder(a,b){return b.pct-a.pct||b.wins-a.wins||a.name.localeCompare(b.name)}
    ["AFC","NFC"].forEach(function(conf){
      var leaders=Object.keys(divisions.nfl).filter(function(d){return d.indexOf(conf+" ")===0}).map(function(d){
        return classified.filter(function(x){var ab=(aliases.nfl[x.team.abbreviation]||x.team.abbreviation||"").toUpperCase();return divisions.nfl[d].split(" ").indexOf(ab)>=0}).map(function(x){return x.team}).sort(pctOrder)[0];
      }).sort(pctOrder);
      var leaderIds=leaders.map(function(t){return t.id});
      var wild=classified.filter(function(x){return x.group===conf&&leaderIds.indexOf(x.team.id)<0}).map(function(x){return x.team}).sort(pctOrder);
      var card=document.createElement("section");card.className="fourdk-playoff-card";
      var title=document.createElement("h3");title.textContent=conf+" PLAYOFF PICTURE";card.appendChild(title);
      function line(team,index,label){
        var el=document.createElement("div");el.className="fourdk-playoff-row";
        var seed=document.createElement("span");seed.textContent=String(index);seed.className="fourdk-playoff-seed";
        var name=document.createElement("span");name.textContent=team.name;
        var record=document.createElement("span");record.textContent=team.wins+"-"+team.losses+(team.ties?"-"+team.ties:"");
        var tag=document.createElement("small");tag.textContent=label;
        el.appendChild(seed);el.appendChild(name);el.appendChild(record);el.appendChild(tag);card.appendChild(el);
      }
      leaders.forEach(function(t,i){line(t,i+1,"DIV")});
      wild.slice(0,3).forEach(function(t,i){line(t,i+5,"WC")});
      var bubble=document.createElement("p");bubble.className="fourdk-playoff-bubble";
      bubble.textContent="IN THE HUNT (by record): "+wild.slice(3,6).map(function(t){return t.abbreviation+" "+t.wins+"-"+t.losses+(t.ties?"-"+t.ties:"")}).join(" · ");
      card.appendChild(bubble);raceList.appendChild(card);
    });
  }
  function show(name){
   body.replaceChildren();
   classified.filter(function(item){
    if(view==="conference")return item.group===name;
    var abbr=(aliases[league][item.team.abbreviation]||item.team.abbreviation||"").toUpperCase();
    return divisions[league][name].split(" ").indexOf(abbr)>=0;
   }).sort(function(a,b){return b.team.pct-a.team.pct||b.team.wins-a.team.wins||a.team.name.localeCompare(b.team.name)}).forEach(function(item){
    var t=item.team,tr=document.createElement("tr"),label=document.createElement("td");label.textContent=t.name;tr.appendChild(label);
    [t.wins,t.losses].concat(league==="nfl"?[t.ties]:[]).concat([t.pct.toFixed(3).replace(/^0/,"")]).forEach(function(v){var td=document.createElement("td");td.textContent=String(v);tr.appendChild(td)});
    body.appendChild(tr);
   });
   if(league==="nba"){
     var selected=classified.filter(function(item){
       var abbr=(aliases[league][item.team.abbreviation]||item.team.abbreviation||"").toUpperCase();
       return view==="conference"?item.group===name:divisions[league][name].split(" ").indexOf(abbr)>=0;
     });
     var leader=selected.reduce(function(best,x){return !best||x.team.wins-x.team.losses>best.team.wins-best.team.losses?x:best},null);
     Array.from(body.rows).forEach(function(tr){var item=selected.find(function(x){return x.team.name===tr.cells[0].textContent});if(!item)return;
       var gb=((leader.team.wins-item.team.wins)+(item.team.losses-leader.team.losses))/2;
       var td=document.createElement("td");td.textContent=gb===0?"—":String(gb);tr.appendChild(td);
     });
   }
   buttons.forEach(function(b){var active=b.textContent===name;b.setAttribute("aria-selected",String(active));b.classList.toggle("active",active)});
  }
  names.forEach(function(name){var b=document.createElement("button");b.type="button";b.className="fourdk-standings-tab";b.textContent=name;b.setAttribute("role","tab");b.addEventListener("click",function(){show(name)});tabs.appendChild(b);buttons.push(b)});
  function setMode(next){
    view=next;tabs.hidden=view!=="conference";divisionSelect.hidden=view!=="division";table.hidden=view==="playoffs"||view==="cup";racePanel.hidden=view!=="playoffs";if(cupPanel)cupPanel.hidden=view!=="cup";
    confButton.classList.toggle("active",view==="conference");divButton.classList.toggle("active",view==="division");raceButton.classList.toggle("active",view==="playoffs"||view==="cup");
    if(view!=="playoffs"&&view!=="cup")show(view==="conference"?names[0]:divisionSelect.value);
  }
  confButton.addEventListener("click",function(){setMode("conference")});
  divButton.addEventListener("click",function(){setMode("division")});
  raceButton.addEventListener("click",function(){setMode(league==="nba"?"cup":"playoffs")});
  divisionSelect.addEventListener("change",function(){show(divisionSelect.value)});
  if(league==="nba"){var gbth=document.createElement("th");gbth.textContent="GB";head.rows[0].appendChild(gbth)}
  host.replaceChildren(heading,date,mode,tabs,divisionSelect,table,racePanel);if(cupPanel){host.appendChild(cupPanel);var s=document.createElement("script");s.src="4dk-nba-cup.js?v=1";document.head.appendChild(s)}setMode("conference");
 }).catch(function(){host.textContent="Standings temporarily unavailable. Original 4DK coverage remains accessible."});
});
})();