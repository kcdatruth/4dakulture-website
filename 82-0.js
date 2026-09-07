const PLAYERS = {"PG": [{"name": "Magic Johnson", "era": "1980s • Lakers", "s": 9.2, "p": 10.0, "d": 8.0, "sp": 6.8}, {"name": "Stephen Curry", "era": "2010s • Warriors", "s": 9.8, "p": 9.2, "d": 6.7, "sp": 10.0}, {"name": "Chris Paul", "era": "2000s–10s", "s": 8.5, "p": 9.8, "d": 9.0, "sp": 8.6}, {"name": "Oscar Robertson", "era": "1960s • Royals", "s": 9.3, "p": 9.6, "d": 7.6, "sp": 7.3}, {"name": "Steve Nash", "era": "2000s • Suns", "s": 8.7, "p": 9.9, "d": 6.1, "sp": 9.4}, {"name": "Jason Kidd", "era": "1990s–00s", "s": 7.6, "p": 9.4, "d": 9.1, "sp": 7.7}, {"name": "Isiah Thomas", "era": "1980s • Pistons", "s": 9.0, "p": 9.4, "d": 8.1, "sp": 7.8}, {"name": "Russell Westbrook", "era": "2010s • Thunder", "s": 9.1, "p": 8.8, "d": 7.5, "sp": 6.6}, {"name": "John Stockton", "era": "1990s • Jazz", "s": 7.9, "p": 9.8, "d": 8.7, "sp": 8.5}, {"name": "Gary Payton", "era": "1990s • Sonics", "s": 8.5, "p": 8.6, "d": 9.8, "sp": 7.8}], "SG": [{"name": "Michael Jordan", "era": "1990s • Bulls", "s": 10.0, "p": 8.6, "d": 9.8, "sp": 8.1}, {"name": "Kobe Bryant", "era": "2000s • Lakers", "s": 9.8, "p": 8.1, "d": 9.0, "sp": 8.3}, {"name": "Dwyane Wade", "era": "2000s • Heat", "s": 9.4, "p": 8.4, "d": 8.9, "sp": 7.1}, {"name": "James Harden", "era": "2010s • Rockets", "s": 9.8, "p": 9.3, "d": 6.8, "sp": 9.2}, {"name": "Allen Iverson", "era": "2000s • 76ers", "s": 9.7, "p": 8.0, "d": 6.7, "sp": 7.7}, {"name": "Clyde Drexler", "era": "1990s • Blazers", "s": 9.1, "p": 8.0, "d": 8.1, "sp": 7.8}, {"name": "Jerry West", "era": "1960s • Lakers", "s": 9.6, "p": 8.9, "d": 8.6, "sp": 8.8}, {"name": "Ray Allen", "era": "2000s • Sonics", "s": 9.0, "p": 7.2, "d": 7.3, "sp": 9.8}, {"name": "Reggie Miller", "era": "1990s • Pacers", "s": 8.9, "p": 6.9, "d": 6.8, "sp": 9.7}, {"name": "George Gervin", "era": "1970s–80s • Spurs", "s": 9.7, "p": 6.9, "d": 6.8, "sp": 8.2}], "SF": [{"name": "LeBron James", "era": "2000s–20s", "s": 9.8, "p": 9.7, "d": 9.0, "sp": 8.1}, {"name": "Larry Bird", "era": "1980s • Celtics", "s": 9.5, "p": 9.2, "d": 8.3, "sp": 9.5}, {"name": "Kevin Durant", "era": "2010s • Thunder/Warriors", "s": 10.0, "p": 8.2, "d": 8.3, "sp": 9.7}, {"name": "Kawhi Leonard", "era": "2010s • Spurs/Raptors", "s": 9.2, "p": 7.7, "d": 9.9, "sp": 9.0}, {"name": "Julius Erving", "era": "1970s–80s • 76ers", "s": 9.4, "p": 7.8, "d": 8.4, "sp": 7.4}, {"name": "Scottie Pippen", "era": "1990s • Bulls", "s": 8.2, "p": 8.7, "d": 9.8, "sp": 7.7}, {"name": "Elgin Baylor", "era": "1960s • Lakers", "s": 9.6, "p": 7.7, "d": 7.8, "sp": 7.4}, {"name": "Dominique Wilkins", "era": "1980s • Hawks", "s": 9.6, "p": 6.9, "d": 7.0, "sp": 7.5}, {"name": "Paul Pierce", "era": "2000s • Celtics", "s": 9.0, "p": 7.8, "d": 7.8, "sp": 8.9}, {"name": "Carmelo Anthony", "era": "2000s–10s", "s": 9.6, "p": 6.8, "d": 6.5, "sp": 8.6}], "PF": [{"name": "Tim Duncan", "era": "2000s • Spurs", "s": 9.2, "p": 8.1, "d": 10.0, "sp": 7.2}, {"name": "Kevin Garnett", "era": "2000s • Wolves/Celtics", "s": 9.0, "p": 8.4, "d": 9.9, "sp": 7.7}, {"name": "Dirk Nowitzki", "era": "2000s • Mavericks", "s": 9.7, "p": 7.5, "d": 6.9, "sp": 9.8}, {"name": "Giannis Antetokounmpo", "era": "2010s–20s", "s": 9.7, "p": 8.5, "d": 9.5, "sp": 6.9}, {"name": "Charles Barkley", "era": "1980s–90s", "s": 9.6, "p": 8.0, "d": 7.5, "sp": 7.2}, {"name": "Karl Malone", "era": "1990s • Jazz", "s": 9.5, "p": 7.7, "d": 8.6, "sp": 7.6}, {"name": "Anthony Davis", "era": "2010s–20s", "s": 9.0, "p": 7.5, "d": 9.8, "sp": 7.5}, {"name": "Kevin McHale", "era": "1980s • Celtics", "s": 9.1, "p": 6.8, "d": 9.2, "sp": 7.2}, {"name": "Chris Webber", "era": "2000s • Kings", "s": 8.9, "p": 8.6, "d": 7.8, "sp": 7.6}, {"name": "Pau Gasol", "era": "2000s • Lakers", "s": 8.8, "p": 8.3, "d": 8.1, "sp": 7.9}], "C": [{"name": "Kareem Abdul-Jabbar", "era": "1970s–80s • Lakers", "s": 9.9, "p": 7.8, "d": 9.4, "sp": 7.0}, {"name": "Shaquille O'Neal", "era": "1990s–00s • Lakers", "s": 10.0, "p": 7.4, "d": 9.0, "sp": 4.8}, {"name": "Hakeem Olajuwon", "era": "1990s • Rockets", "s": 9.5, "p": 7.6, "d": 10.0, "sp": 7.3}, {"name": "Wilt Chamberlain", "era": "1960s • Warriors/76ers", "s": 10.0, "p": 8.2, "d": 9.3, "sp": 5.8}, {"name": "Bill Russell", "era": "1960s • Celtics", "s": 7.8, "p": 8.1, "d": 10.0, "sp": 5.1}, {"name": "Nikola Jokic", "era": "2020s • Nuggets", "s": 9.7, "p": 10.0, "d": 7.5, "sp": 9.1}, {"name": "David Robinson", "era": "1990s • Spurs", "s": 9.3, "p": 7.3, "d": 9.8, "sp": 6.8}, {"name": "Moses Malone", "era": "1970s–80s • 76ers", "s": 9.5, "p": 6.3, "d": 8.8, "sp": 5.4}, {"name": "Patrick Ewing", "era": "1990s • Knicks", "s": 9.1, "p": 6.8, "d": 9.2, "sp": 7.1}, {"name": "Dwight Howard", "era": "2000s–10s • Magic", "s": 8.6, "p": 6.3, "d": 9.8, "sp": 4.9}]};

const POSITIONS = [
  ["PG","POINT GUARD"],
  ["SG","SHOOTING GUARD"],
  ["SF","SMALL FORWARD"],
  ["PF","POWER FORWARD"],
  ["C","CENTER"]
];

let round = 0;
let picks = {};
let choices = [];

const optionsEl = document.getElementById("playerOptions");
const progressEl = document.getElementById("progressText");
const roundPosEl = document.getElementById("roundPosition");
const verdictEl = document.getElementById("verdict");

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function initials(name){
  return name.split(/\s+/).map(x=>x[0]).join("").slice(0,3).toUpperCase();
}

function drawRound(){
  if(round >= POSITIONS.length) return finishGame();
  const [pos,label]=POSITIONS[round];
  choices=shuffle(PLAYERS[pos]).slice(0,3);
  roundPosEl.textContent=label;
  progressEl.textContent=`Pick your ${label.toLowerCase()}.`;
  document.querySelectorAll(".lineup-slot").forEach(s=>s.classList.remove("active"));
  document.querySelector(`.lineup-slot[data-position="${pos}"]`)?.classList.add("active");
  optionsEl.innerHTML=choices.map((p,i)=>`
    <button class="player-card" type="button" data-index="${i}" data-initials="${initials(p.name)}">
      <span class="player-pos">${pos} • OPTION ${i+1}</span>
      <h3>${p.name}</h3>
      <div class="player-era">${p.era}</div>
      <div class="player-ratings">
        <div><span>SCORING</span><b>${p.s.toFixed(1)}</b></div>
        <div><span>PASSING</span><b>${p.p.toFixed(1)}</b></div>
        <div><span>DEFENSE</span><b>${p.d.toFixed(1)}</b></div>
        <div><span>SPACING</span><b>${p.sp.toFixed(1)}</b></div>
      </div>
    </button>
  `).join("");
  optionsEl.querySelectorAll(".player-card").forEach(btn=>btn.addEventListener("click",()=>pick(Number(btn.dataset.index))));
}

function pick(i){
  const [pos]=POSITIONS[round];
  const player=choices[i];
  picks[pos]=player;
  const slot=document.querySelector(`.lineup-slot[data-position="${pos}"]`);
  slot.classList.add("filled");
  slot.classList.remove("active");
  slot.querySelector("strong").textContent=player.name;
  round++;
  drawRound();
}

function average(key){
  const vals=Object.values(picks).map(p=>p[key]);
  return vals.reduce((a,b)=>a+b,0)/vals.length;
}

function finishGame(){
  optionsEl.innerHTML="";
  document.querySelector(".round-head").style.display="none";
  progressEl.textContent="Starting five complete.";

  const scoring=average("s");
  const passing=average("p");
  const defense=average("d");
  const spacing=average("sp");

  let raw=(scoring*.34 + passing*.22 + defense*.28 + spacing*.16)*10;
  if(scoring>=9 && defense>=8.8) raw+=2;
  if(passing>=8.6 && spacing>=8.2) raw+=2;
  const score=Math.min(99,Math.round(raw));

  let title,copy;
  if(score>=92){
    title="82–0 THREAT";
    copy="Yeah...this is disgusting. Elite creation, enough defense and enough fit to make the undefeated conversation at least worth arguing about.";
  }else if(score>=88){
    title="70-WIN MONSTER";
    copy="Nobody wants to see this team in a seven-game series. 82–0 might be asking too much, but this is an all-time regular-season machine.";
  }else if(score>=83){
    title="TITLE FAVORITE";
    copy="Loaded with greatness, but somebody on the schedule is catching y’all slipping. Still built to run through the playoffs.";
  }else{
    title="SOMEBODY BEATING Y’ALL 😂";
    copy="The names are crazy, but the fit has holes. Too much overlap, not enough defense or not enough spacing to seriously talk 82–0.";
  }

  document.getElementById("verdictTitle").textContent=title;
  document.getElementById("verdictCopy").textContent=copy;
  document.getElementById("teamScore").textContent=score;
  document.getElementById("metricScoring").textContent=scoring.toFixed(1);
  document.getElementById("metricPassing").textContent=passing.toFixed(1);
  document.getElementById("metricDefense").textContent=defense.toFixed(1);
  document.getElementById("metricSpacing").textContent=spacing.toFixed(1);
  verdictEl.hidden=false;
  verdictEl.scrollIntoView({behavior:"smooth",block:"start"});
}

function reset(){
  round=0;picks={};choices=[];
  verdictEl.hidden=true;
  document.querySelector(".round-head").style.display="";
  document.querySelectorAll(".lineup-slot").forEach(s=>{
    s.classList.remove("filled","active");
    s.querySelector("strong").textContent="—";
  });
  drawRound();
  window.scrollTo({top:document.querySelector(".challenge-game").offsetTop-60,behavior:"smooth"});
}

document.getElementById("resetGame").addEventListener("click",reset);

document.getElementById("shareTeam").addEventListener("click",async()=>{
  const lineup=POSITIONS.map(([pos])=>`${pos}: ${picks[pos].name}`).join("\n");
  const text=`My 4DK 82–0 Challenge team:\n${lineup}\nVerdict: ${document.getElementById("verdictTitle").textContent} (${document.getElementById("teamScore").textContent}/100)\n4dakulturemedia.com/82-0.html`;
  try{
    await navigator.clipboard.writeText(text);
    const b=document.getElementById("shareTeam");
    const old=b.textContent;b.textContent="Copied 💯";
    setTimeout(()=>b.textContent=old,1600);
  }catch(e){
    window.prompt("Copy your team:",text);
  }
});

drawRound();
