(function(){"use strict";
var host=document.querySelector('[data-4dk-nba-cup]');if(!host)return;
var groups={
"East A":[["Detroit Pistons",1,0,16],["Orlando Magic",1,0,7],["Toronto Raptors",1,1,7],["Milwaukee Bucks",0,1,-14],["Brooklyn Nets",0,1,-16]],
"East B":[["Cleveland Cavaliers",1,0,24],["Miami Heat",1,0,20],["Philadelphia 76ers",1,1,-19],["New York Knicks",0,1,-5],["Indiana Pacers",0,1,-20]],
"East C":[["Boston Celtics",2,0,53],["Atlanta Hawks",1,0,7],["Washington Wizards",1,1,9],["Chicago Bulls",0,1,-14],["Charlotte Hornets",0,2,-55]],
"West A":[["Dallas Mavericks",2,0,17],["Denver Nuggets",1,0,7],["Houston Rockets",0,1,-5],["Phoenix Suns",0,1,-7],["Utah Jazz",0,1,-12]],
"West B":[["Minnesota Timberwolves",2,0,32],["Oklahoma City Thunder",1,0,31],["New Orleans Pelicans",0,1,-6],["LA Clippers",0,1,-26],["Memphis Grizzlies",0,1,-31]],
"West C":[["Golden State Warriors",1,0,17],["San Antonio Spurs",1,0,15],["Los Angeles Lakers",1,1,-11],["Portland Trail Blazers",0,1,-6],["Sacramento Kings",0,1,-15]]
};
var header=document.createElement("p");header.className="fourdk-cup-note";header.textContent="2026 NBA CUP · GROUP PLAY ONLY · Snapshot after Nov. 6 Cup games (Nov. 7). This table does not update automatically; check the official NBA Cup standings for current results.";
var link=document.createElement("a");link.href="https://www.nba.com/nba-cup/2026/standings";link.target="_blank";link.rel="noopener noreferrer";link.textContent="VIEW CURRENT OFFICIAL NBA CUP STANDINGS ↗";link.className="fourdk-cup-official";
var tabs=document.createElement("div");tabs.className="fourdk-cup-groups";var table=document.createElement("table");table.className="fourdk-standings-table";var title=document.createElement("h3");title.className="fourdk-cup-group-title";
function show(key){title.textContent=key.replace(" "," · GROUP ");table.replaceChildren();var head=document.createElement("thead");head.innerHTML="<tr><th>TEAM</th><th>W</th><th>L</th><th>DIFF</th></tr>";table.appendChild(head);var body=document.createElement("tbody");groups[key].forEach(function(t){var tr=document.createElement("tr");[t[0],t[1],t[2],(t[3]>0?"+":"")+t[3]].forEach(function(v){var td=document.createElement("td");td.textContent=String(v);tr.appendChild(td)});body.appendChild(tr)});table.appendChild(body);Array.from(tabs.children).forEach(function(b){b.classList.toggle("active",b.dataset.group===key);b.setAttribute("aria-pressed",String(b.dataset.group===key))})}
Object.keys(groups).forEach(function(key){var b=document.createElement("button");b.type="button";b.textContent=key;b.dataset.group=key;b.addEventListener("click",function(){show(key)});tabs.appendChild(b)});
var footer=document.createElement("p");footer.className="fourdk-cup-note";footer.textContent="Cup group records are separate from overall NBA standings. Group winners and one wild card from each conference advance; point differential is a group-stage tiebreaker.";
host.replaceChildren(header,link,tabs,title,table,footer);show("East A");
})();