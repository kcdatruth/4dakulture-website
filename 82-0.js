const PLAYERS = {
  PG: [
    {name:"Magic Johnson",peak:"1987",era:"Lakers",s:9.2,p:10.0,d:8.0,sp:6.8,fit:9.2,role:"Oversized engine • transition killer"},
    {name:"Stephen Curry",peak:"2016",era:"Warriors",s:9.8,p:9.2,d:6.7,sp:10.0,fit:10.0,role:"Gravity machine • off-ball nightmare"},
    {name:"Chris Paul",peak:"2008",era:"Hornets",s:8.5,p:9.8,d:9.0,sp:8.6,fit:9.7,role:"Floor general • point-of-attack pest"},
    {name:"Oscar Robertson",peak:"1962",era:"Royals",s:9.3,p:9.6,d:7.6,sp:7.3,fit:8.9,role:"Big creator • pressure everywhere"},
    {name:"Steve Nash",peak:"2006",era:"Suns",s:8.7,p:9.9,d:6.1,sp:9.4,fit:9.6,role:"Tempo master • elite shooting creator"},
    {name:"Jason Kidd",peak:"2002",era:"Nets",s:7.6,p:9.4,d:9.1,sp:7.7,fit:9.4,role:"Two-way organizer • rebound-and-run"},
    {name:"Isiah Thomas",peak:"1990",era:"Pistons",s:9.0,p:9.4,d:8.1,sp:7.8,fit:8.9,role:"Big-game creator • downhill guard"},
    {name:"Russell Westbrook",peak:"2017",era:"Thunder",s:9.1,p:8.8,d:7.5,sp:6.6,fit:7.8,role:"Relentless rim pressure • chaos engine"},
    {name:"John Stockton",peak:"1990",era:"Jazz",s:7.9,p:9.8,d:8.7,sp:8.5,fit:9.6,role:"Precision passer • low-maintenance star"},
    {name:"Gary Payton",peak:"1996",era:"SuperSonics",s:8.5,p:8.6,d:9.8,sp:7.8,fit:9.2,role:"Lockdown guard • bully-ball creator"}
  ],
  SG: [
    {name:"Michael Jordan",peak:"1991",era:"Bulls",s:10.0,p:8.6,d:9.8,sp:8.1,fit:9.6,role:"Ultimate closer • elite two-way pressure"},
    {name:"Kobe Bryant",peak:"2006",era:"Lakers",s:9.8,p:8.1,d:9.0,sp:8.3,fit:8.9,role:"Three-level killer • difficult-shot maker"},
    {name:"Dwyane Wade",peak:"2009",era:"Heat",s:9.4,p:8.4,d:8.9,sp:7.1,fit:8.7,role:"Rim pressure • help-defense playmaker"},
    {name:"James Harden",peak:"2019",era:"Rockets",s:9.8,p:9.3,d:6.8,sp:9.2,fit:8.3,role:"Isolation engine • elite shot creation"},
    {name:"Allen Iverson",peak:"2001",era:"76ers",s:9.7,p:8.0,d:6.7,sp:7.7,fit:8.0,role:"Volume scorer • nonstop pressure"},
    {name:"Clyde Drexler",peak:"1992",era:"Blazers",s:9.1,p:8.0,d:8.1,sp:7.8,fit:9.0,role:"Transition wing • secondary creator"},
    {name:"Jerry West",peak:"1970",era:"Lakers",s:9.6,p:8.9,d:8.6,sp:8.8,fit:9.5,role:"Complete combo guard • clutch shotmaker"},
    {name:"Ray Allen",peak:"2001",era:"Bucks",s:9.0,p:7.2,d:7.3,sp:9.8,fit:9.8,role:"Elite movement shooter • scalable scorer"},
    {name:"Reggie Miller",peak:"2000",era:"Pacers",s:8.9,p:6.9,d:6.8,sp:9.7,fit:9.6,role:"Off-ball weapon • late-game shotmaker"},
    {name:"George Gervin",peak:"1980",era:"Spurs",s:9.7,p:6.9,d:6.8,sp:8.2,fit:8.4,role:"Silky scorer • midrange mismatch"}
  ],
  SF: [
    {name:"LeBron James",peak:"2013",era:"Heat",s:9.8,p:9.7,d:9.0,sp:8.1,fit:9.4,role:"Point forward • transition force"},
    {name:"Larry Bird",peak:"1986",era:"Celtics",s:9.5,p:9.2,d:8.3,sp:9.5,fit:9.9,role:"Connector superstar • elite shooting/playmaking"},
    {name:"Kevin Durant",peak:"2014",era:"Thunder",s:10.0,p:8.2,d:8.3,sp:9.7,fit:9.8,role:"Plug-and-play scorer • impossible matchup"},
    {name:"Kawhi Leonard",peak:"2017",era:"Spurs",s:9.2,p:7.7,d:9.9,sp:9.0,fit:9.8,role:"Elite stopper • efficient isolation scorer"},
    {name:"Julius Erving",peak:"1981",era:"76ers",s:9.4,p:7.8,d:8.4,sp:7.4,fit:8.9,role:"Open-floor terror • athletic two-way wing"},
    {name:"Scottie Pippen",peak:"1994",era:"Bulls",s:8.2,p:8.7,d:9.8,sp:7.7,fit:9.8,role:"Point forward • all-time wing defender"},
    {name:"Elgin Baylor",peak:"1962",era:"Lakers",s:9.6,p:7.7,d:7.8,sp:7.4,fit:8.5,role:"Explosive scorer • rebounding wing"},
    {name:"Dominique Wilkins",peak:"1986",era:"Hawks",s:9.6,p:6.9,d:7.0,sp:7.5,fit:8.2,role:"Power scorer • transition finisher"},
    {name:"Paul Pierce",peak:"2002",era:"Celtics",s:9.0,p:7.8,d:7.8,sp:8.9,fit:9.0,role:"Half-court scorer • clutch wing"},
    {name:"Carmelo Anthony",peak:"2013",era:"Knicks",s:9.6,p:6.8,d:6.5,sp:8.6,fit:8.0,role:"Isolation bucket • mismatch hunter"}
  ],
  PF: [
    {name:"Tim Duncan",peak:"2003",era:"Spurs",s:9.2,p:8.1,d:10.0,sp:7.2,fit:9.8,role:"Defensive anchor • low-post hub"},
    {name:"Kevin Garnett",peak:"2004",era:"Timberwolves",s:9.0,p:8.4,d:9.9,sp:7.7,fit:9.9,role:"Switch defender • playmaking big"},
    {name:"Dirk Nowitzki",peak:"2007",era:"Mavericks",s:9.7,p:7.5,d:6.9,sp:9.8,fit:9.7,role:"Floor-stretching superstar • mismatch scorer"},
    {name:"Giannis Antetokounmpo",peak:"2020",era:"Bucks",s:9.7,p:8.5,d:9.5,sp:6.9,fit:9.0,role:"Rim destroyer • roaming defender"},
    {name:"Charles Barkley",peak:"1993",era:"Suns",s:9.6,p:8.0,d:7.5,sp:7.2,fit:8.6,role:"Transition monster • efficient power scorer"},
    {name:"Karl Malone",peak:"1997",era:"Jazz",s:9.5,p:7.7,d:8.6,sp:7.6,fit:9.0,role:"Pick-and-roll finisher • physical scorer"},
    {name:"Anthony Davis",peak:"2020",era:"Lakers",s:9.0,p:7.5,d:9.8,sp:7.5,fit:9.8,role:"Switchable rim protector • lob threat"},
    {name:"Kevin McHale",peak:"1987",era:"Celtics",s:9.1,p:6.8,d:9.2,sp:7.2,fit:9.1,role:"Post technician • elite interior defender"},
    {name:"Chris Webber",peak:"2001",era:"Kings",s:8.9,p:8.6,d:7.8,sp:7.6,fit:9.0,role:"Passing big • face-up creator"},
    {name:"Pau Gasol",peak:"2010",era:"Lakers",s:8.8,p:8.3,d:8.1,sp:7.9,fit:9.5,role:"Skilled connector • interior scorer"}
  ],
  C: [
    {name:"Kareem Abdul-Jabbar",peak:"1971",era:"Bucks",s:9.9,p:7.8,d:9.4,sp:7.0,fit:9.4,role:"Skyhook machine • elite rim protector"},
    {name:"Shaquille O'Neal",peak:"2000",era:"Lakers",s:10.0,p:7.4,d:9.0,sp:4.8,fit:8.8,role:"Paint destroyer • gravity at the rim"},
    {name:"Hakeem Olajuwon",peak:"1994",era:"Rockets",s:9.5,p:7.6,d:10.0,sp:7.3,fit:9.7,role:"Two-way center • switchable defensive anchor"},
    {name:"Wilt Chamberlain",peak:"1967",era:"76ers",s:10.0,p:8.2,d:9.3,sp:5.8,fit:8.9,role:"Interior force • rebounding machine"},
    {name:"Bill Russell",peak:"1965",era:"Celtics",s:7.8,p:8.1,d:10.0,sp:5.1,fit:9.6,role:"Defensive genius • transition connector"},
    {name:"Nikola Jokic",peak:"2024",era:"Nuggets",s:9.7,p:10.0,d:7.5,sp:9.1,fit:9.8,role:"Offensive hub • elite passing/shooting big"},
    {name:"David Robinson",peak:"1995",era:"Spurs",s:9.3,p:7.3,d:9.8,sp:6.8,fit:9.5,role:"Mobile rim protector • transition big"},
    {name:"Moses Malone",peak:"1983",era:"76ers",s:9.5,p:6.3,d:8.8,sp:5.4,fit:8.7,role:"Offensive-glass monster • paint scorer"},
    {name:"Patrick Ewing",peak:"1990",era:"Knicks",s:9.1,p:6.8,d:9.2,sp:7.1,fit:9.1,role:"Two-way anchor • face-up big"},
    {name:"Dwight Howard",peak:"2011",era:"Magic",s:8.6,p:6.3,d:9.8,sp:4.9,fit:9.0,role:"Rim protector • vertical spacer"}
  ]
};

const POSITIONS = [["PG","POINT GUARD"],["SG","SHOOTING GUARD"],["SF","SMALL FORWARD"],["PF","POWER FORWARD"],["C","CENTER"]];
let round=0, picks={}, choices=[];
const optionsEl=document.getElementById("playerOptions");
const progressEl=document.getElementById("progressText");
const roundPosEl=document.getElementById("roundPosition");
const verdictEl=document.getElementById("verdict");

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function initials(name){return name.split(/\s+/).map(x=>x[0]).join("").slice(0,3).toUpperCase();}
function average(key){const vals=Object.values(picks).map(p=>p[key]);return vals.reduce((a,b)=>a+b,0)/vals.length;}

function drawRound(){
  if(round>=POSITIONS.length)return finishGame();
  const [pos,label]=POSITIONS[round];
  choices=shuffle(PLAYERS[pos]).slice(0,3);
  roundPosEl.textContent=label;
  progressEl.textContent=`Pick your ${label.toLowerCase()}. Prime versions only.`;
  document.querySelectorAll(".lineup-slot").forEach(s=>s.classList.remove("active"));
  document.querySelector(`.lineup-slot[data-position="${pos}"]`)?.classList.add("active");
  optionsEl.innerHTML=choices.map((p,i)=>`
    <button class="player-card" type="button" data-index="${i}" data-initials="${initials(p.name)}">
      <span class="player-pos">${pos} • OPTION ${i+1}</span>
      <span class="prime-pill">PRIME ${p.peak}</span>
      <h3>${p.name}</h3>
      <div class="player-era">${p.peak} • ${p.era}</div>
      <div class="player-role">${p.role}</div>
      <div class="player-ratings">
        <div><span>SCORING</span><b>${p.s.toFixed(1)}</b></div>
        <div><span>PLAY</span><b>${p.p.toFixed(1)}</b></div>
        <div><span>DEF</span><b>${p.d.toFixed(1)}</b></div>
        <div><span>SPACE</span><b>${p.sp.toFixed(1)}</b></div>
        <div class="fit"><span>FIT</span><b>${p.fit.toFixed(1)}</b></div>
      </div>
    </button>`).join("");
  optionsEl.querySelectorAll(".player-card").forEach(btn=>btn.addEventListener("click",()=>pick(Number(btn.dataset.index))));
}

function pick(i){
  const [pos]=POSITIONS[round];
  const player=choices[i];
  picks[pos]=player;
  const slot=document.querySelector(`.lineup-slot[data-position="${pos}"]`);
  slot.classList.add("filled");slot.classList.remove("active");
  slot.querySelector("strong").textContent=player.name;
  slot.querySelector("small").textContent=`${player.peak} • ${player.era}`;
  round++;drawRound();
}

function getIdentity(m){
  const options=[
    [m.s,"NUCLEAR OFFENSE"],[m.d,"CLAMP CITY"],[m.p,"BALL-MOVEMENT MACHINE"],[m.sp,"FIVE-OUT NIGHTMARE"],[m.fit,"PERFECTLY BUILT"]
  ].sort((a,b)=>b[0]-a[0]);
  return options[0][1];
}
function getWarning(m){
  if(m.sp<7.4)return "Can the floor stay open?";
  if(m.d<8.2)return "Who gets the toughest stop?";
  if(m.p<8.1)return "Who organizes the offense?";
  if(m.fit<8.7)return "Too many stars needing the same spots?";
  if(m.s<9.0)return "Enough late-clock shot creation?";
  return "Health. That's about it.";
}
function projectedRecord(score){const wins=Math.max(60,Math.min(82,Math.round(20+score*.65)));return `${wins}-${82-wins}`;}

function finishGame(){
  optionsEl.innerHTML="";
  document.querySelector(".round-head").style.display="none";
  progressEl.textContent="Starting five complete. 4DK is checking the fit.";

  const m={s:average("s"),p:average("p"),d:average("d"),sp:average("sp"),fit:average("fit")};
  let raw=(m.s*.28+m.p*.18+m.d*.24+m.sp*.14+m.fit*.16)*10;
  if(m.s>=9.2&&m.d>=8.9)raw+=2;
  if(m.p>=8.7&&m.sp>=8.3)raw+=1.5;
  if(m.fit>=9.4)raw+=1.5;
  if(m.sp<7.3)raw-=2.5;
  if(m.fit<8.3)raw-=2;
  const score=Math.max(70,Math.min(100,Math.round(raw)));

  let title,copy;
  if(score>=95){title="82–0 THREAT";copy="This is the kind of five where the talent is obvious and the fit actually makes sense. Elite creation, real defense, enough spacing and almost nowhere to hide.";}
  else if(score>=91){title="75+ WIN MONSTER";copy="This team is flattening most of the league. The perfect season is probably asking too much, but the regular-season floor is ridiculous.";}
  else if(score>=87){title="TITLE FAVORITE";copy="Loaded with greatness and built to win four playoff rounds. There is still one pressure point keeping the 82–0 talk from getting out of control.";}
  else if(score>=82){title="CONTENDER";copy="The names are nasty, but the lineup has enough overlap or fit questions that somebody is making this team uncomfortable.";}
  else{title="SOMEBODY BEATING Y’ALL 😂";copy="Hall of Fame names do not automatically make a perfect lineup. The talent is real, but the fit leaves too much on the table.";}

  document.getElementById("verdictTitle").textContent=title;
  document.getElementById("verdictCopy").textContent=copy;
  document.getElementById("teamScore").textContent=score;
  document.getElementById("metricScoring").textContent=m.s.toFixed(1);
  document.getElementById("metricPassing").textContent=m.p.toFixed(1);
  document.getElementById("metricDefense").textContent=m.d.toFixed(1);
  document.getElementById("metricSpacing").textContent=m.sp.toFixed(1);
  document.getElementById("metricFit").textContent=m.fit.toFixed(1);
  document.getElementById("projectedRecord").textContent=projectedRecord(score);
  document.getElementById("teamIdentity").textContent=getIdentity(m);
  document.getElementById("teamWarning").textContent=getWarning(m);
  verdictEl.hidden=false;
  verdictEl.scrollIntoView({behavior:"smooth",block:"start"});
}

function reset(){
  round=0;picks={};choices=[];verdictEl.hidden=true;
  document.querySelector(".round-head").style.display="";
  document.querySelectorAll(".lineup-slot").forEach(s=>{s.classList.remove("filled","active");s.querySelector("strong").textContent="—";s.querySelector("small").textContent="";});
  drawRound();
}

async function shareTeam(){
  const lineup=POSITIONS.map(([pos])=>`${pos}: ${picks[pos].peak} ${picks[pos].name}`).join("\n");
  const text=`My 4DK 82–0 Challenge team:\n${lineup}\nProjected record: ${document.getElementById("projectedRecord").textContent}\nVerdict: ${document.getElementById("verdictTitle").textContent} (${document.getElementById("teamScore").textContent}/100)\n4dakulturemedia.com/82-0.html`;
  try{
    if(navigator.share){await navigator.share({title:"My 4DK 82–0 Team",text});return;}
    await navigator.clipboard.writeText(text);
    const btn=document.getElementById("shareTeam");const old=btn.textContent;btn.textContent="COPIED ✓";setTimeout(()=>btn.textContent=old,1600);
  }catch(e){
    try{await navigator.clipboard.writeText(text);}catch(_e){}
  }
}

document.getElementById("resetGame")?.addEventListener("click",reset);
document.getElementById("shareTeam")?.addEventListener("click",shareTeam);
drawRound();
