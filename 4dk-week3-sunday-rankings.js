(()=>{
const $=(s,r=document)=>r.querySelector(s);

const rookies=[
['Jeremiyah Love','ARI • RB','Week 3: 90 rushing yards plus five catches for 19 yards and a receiving touchdown. He remains our offensive rookie headliner through three weeks.'],
['Kenyon Sadiq','NYJ • TE','Breakout Week 3: seven catches, 105 yards and his first career receiving touchdown.'],
['Hezekiah Masses','LV • CB','Three interceptions through three games, including another pick in the Raiders’ Week 3 win.'],
['Jaishawn Barham','DAL • LB','Seven tackles and two tackles for loss against Baltimore, including a fourth-and-goal stop on Derrick Henry.'],
['Genesis Smith','LAC • S','Two interceptions of Josh Allen in Week 3 put the fourth-round safety directly on our board.'],
['Antonio Williams','WAS • WR','The Week 1 Rookie of the Week remains part of Washington’s young receiving core after three games.'],
['Denzel Boston','CLE • WR','The young Browns target remains one of the rookie pass-catchers we are tracking as Cleveland reaches 2–1.'],
['Jadarian Price','SEA • RB','Still part of the early offensive rookie conversation as Seattle exits Week 3 at 2–1.'],
['Arvell Reese','NYG • LB','A major piece of the Giants’ young defensive core as New York starts 2–1.'],
['Caleb Downs','DAL • S','His fourth-down stop on Derrick Henry helped create a short-field touchdown opportunity against Baltimore.']
];

const ranks=[
['San Francisco 49ers','SF','3–0'],['Buffalo Bills','BUF','3–0'],['Kansas City Chiefs','KC','3–0'],
['Minnesota Vikings','MIN','3–0'],['Las Vegas Raiders','LV','3–0'],['Denver Broncos','DEN','2–1'],
['Jacksonville Jaguars','JAX','2–1'],['Baltimore Ravens','BAL','2–1'],['Detroit Lions','DET','2–1'],
['Seattle Seahawks','SEA','2–1'],['Los Angeles Rams','LAR','1–2'],['Pittsburgh Steelers','PIT','2–1'],
['Chicago Bears','CHI','2–1'],['Philadelphia Eagles','PHI','2–1'],['Cincinnati Bengals','CIN','2–1'],
['Dallas Cowboys','DAL','1–2'],['New York Giants','NYG','2–1'],['Cleveland Browns','CLE','2–1'],
['Atlanta Falcons','ATL','1–2'],['Washington Commanders','WAS','1–2'],['New Orleans Saints','NO','1–2'],
['Carolina Panthers','CAR','1–2'],['Green Bay Packers','GB','1–2'],['Indianapolis Colts','IND','1–2'],
['New York Jets','NYJ','1–2'],['Arizona Cardinals','ARI','1–2'],['New England Patriots','NE','1–2'],
['Houston Texans','HOU','0–3'],['Los Angeles Chargers','LAC','0–3'],['Tampa Bay Buccaneers','TB','0–3'],
['Tennessee Titans','TEN','0–3'],['Miami Dolphins','MIA','0–3']
];

function finalStandings(){
 const old=$('.w3standings'); if(!old)return;
 old.querySelectorAll('.w3team').forEach(row=>{
   const n=row.querySelector('strong')?.textContent.trim(), b=row.querySelector('b');
   if(n==='Philadelphia Eagles'&&b)b.textContent='2–1';
   if(n==='Chicago Bears'&&b)b.textContent='2–1';
 });
 old.querySelectorAll('.w3conf-title span').forEach(x=>x.textContent='WEEK 3 FINAL');
 const p=$('.w3standings-head p',old); if(p)p.textContent='Week 3 is complete. Chicago and Philadelphia both leave Monday night at 2–1.';
 const note=$('.w3standings-note',old); if(note)note.textContent='◆ Week 3 final standings • Updated after Bears 27, Eagles 7.';
}
function finalMVP(){
 const w=$('#mvp-watch,.mvp-watch'); if(!w)return;
 const head=$('.mvp-head',w);
 if(head)head.innerHTML=`<div><span class="mvp-kicker">4DK WEEKLY NFL FEATURE</span><h2>TOP 10 MVP WATCH</h2><p>Week 3 is complete. Team results, individual production and early-season impact shape our board as the league turns to Week 4.</p></div><div class="mvp-stamp">WEEK 3<br>FINAL</div>`;
 const foot=$('.mvp-foot',w); if(foot)foot.textContent='4DK Week 3 final MVP Watch • Updated September 29, 2026.';
}
function finalRookies(){
 let s=$('.w3rookies');
 const w=$('#mvp-watch,.mvp-watch'); if(!w)return;
 if(!s){s=document.createElement('section');s.className='w3rookies';s.id='rookie-watch';w.insertAdjacentElement('afterend',s)}
 s.innerHTML=`<div class="shell"><div class="head"><div><small>4DK NFL • WEEK 3 FINAL</small><h2>ROOKIE WATCH</h2></div><p>Our final Week 3 board weighs production, role and early impact through the complete slate.</p></div><div class="w3rookiegrid">${rookies.map((x,i)=>`<article class="w3rookie"><div class="rank">${i+1}</div><div><b>${x[0]}</b><span>${x[1]}</span><em>${x[2]}</em></div></article>`).join('')}</div><p style="margin-top:14px;font-size:10px;color:#747a74">4DK Week 3 final • Updated September 29, 2026.</p></div>`;
}
function finalPower(){
 const section=$('#power-rankings.fourdk-power-rankings.nfl,#power-rankings'); if(!section)return;
 const deck=$('.pr-deck',section); if(deck)deck.textContent='Week 3 is complete. San Francisco holds No. 1, Denver climbs into our top six, and Chicago moves ahead of Philadelphia after Monday night.';
 const a=$('.pr-stamp strong',section),b=$('.pr-stamp span',section);
 if(a)a.textContent='WEEK 3 • FINAL'; if(b)b.textContent='UPDATED SEPTEMBER 29, 2026';
 const board=$('[data-pr-board],.pr-board',section);
 if(board){
   const existing=[...board.children];
   if(existing.length>=32){
     ranks.forEach((r,i)=>{
       const row=existing[i]; if(!row)return;
       const rank=row.querySelector('.pr-rank'); if(rank)rank.textContent=String(i+1);
       const name=row.querySelector('.pr-team-name,.pr-team strong,.pr-name'); if(name)name.textContent=r[0];
       const rec=row.querySelector('.pr-record,.pr-rec'); if(rec)rec.textContent=r[2];
     });
   }
 }
}
function finalWeekCards(){
 document.querySelectorAll('.fourdk-this-week').forEach(sec=>{
   const h=sec.querySelector('h2'); if(h)h.textContent='WEEK 3 IS IN THE BOOKS.';
   sec.querySelectorAll('.fourdk-week-card').forEach(card=>{
     if(card.classList.contains('monday')){card.href='nfl-mnf-recap-week3-bears-eagles.html';card.querySelector('small')&&(card.querySelector('small').textContent='MONDAY • FINAL');card.querySelector('strong')&&(card.querySelector('strong').textContent='Bears 27, Eagles 7');}
     if(card.classList.contains('tuesday')){card.querySelector('small')&&(card.querySelector('small').textContent='TUESDAY • FINAL');}
     if(card.classList.contains('mvp')){card.querySelector('small')&&(card.querySelector('small').textContent='TUESDAY • FINAL');}
   });
 });
}
function run(){finalStandings();finalMVP();finalRookies();finalPower();finalWeekCards()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[150,500,1200,2500,5000,8000].forEach(t=>setTimeout(run,t));
})();