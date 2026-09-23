(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkWeek2FinalLoaded) return;
  window.__fourdkWeek2FinalLoaded=true;

  const MVP=[
    {rank:1,name:'Josh Allen',meta:'QB • BUF • 2–0 • 582 PASS YDS • 9 TOTAL TD • 0 INT',note:'Allen closes Week 2 where he started it: No. 1. Five total touchdowns against Detroit gave him nine through two games, zero interceptions and a 2–0 record.',move:'HOLD • WEEK 2 LEADER',cls:'hot'},
    {rank:2,name:'Patrick Mahomes',meta:'QB • KC • 2–0 • 566 PASS YDS • 6 TOTAL TD • 1 INT',note:'Mahomes followed the Denver statement with 382 yards and three touchdowns in the overtime win over Indianapolis. Kansas City is 2–0 and the offense has already shown two different ways to win.',move:'▲ 6 • PRIME-TIME PUSH',cls:'hot'},
    {rank:3,name:'Kenneth Walker III',meta:'RB • KC • 2–0 • 290 RUSH YDS • 369 SCRIMMAGE YDS',note:'Back-to-back 175-plus scrimmage-yard games changed Kansas City’s offensive identity immediately. The league’s early scrimmage-yard leader has forced a running back into the MVP conversation.',move:'▲ 7 • MONSTER START',cls:'hot'},
    {rank:4,name:'Brock Purdy',meta:'QB • SF • 2–0 • 492 PASS YDS • 6 TOTAL TD • 1 INT',note:'Purdy was nearly flawless against Miami: 20-of-22, 287 yards, two passing touchdowns and a rushing score. San Francisco is 2–0 and Purdy has been surgical.',move:'HOLD • SURGICAL',cls:'hot'},
    {rank:5,name:'Kirk Cousins',meta:'QB • LV • 2–0 • 413 PASS YDS • 6 TD • 3 INT',note:'Six touchdown passes in two games and the Raiders are 2–0. Cousins has stabilized the position immediately and Vegas already looks better than its preseason baseline.',move:'▲ NEW • VEGAS 2–0',cls:'up'},
    {rank:6,name:'Matthew Stafford',meta:'QB • LAR • 1–1 • 482 PASS YDS • 4 TD • 2 INT',note:'This is the bounce-back that changes the conversation. Stafford threw for 327 yards and four touchdowns against New York, looked like the reigning MVP again and pulled the Rams back to .500.',move:'▲ NEW • MONDAY STATEMENT',cls:'up'},
    {rank:7,name:'Joe Burrow',meta:'QB • CIN • 2–0 • 461 PASS YDS • 3 TD • 1 INT',note:'The numbers are not explosive yet, but Cincinnati is 2–0 and Burrow was efficient in Houston with two touchdowns and no picks. Winning keeps him in the race.',move:'▲ 3 • WINNING',cls:'up'},
    {rank:8,name:'Jalen Hurts',meta:'QB • PHI • 2–0 • 467 PASS YDS • 5 TD • 2 INT',note:'Two interceptions hurt the Week 2 grade, but Hurts still led the late winning drive and threw the game-winning touchdown with nine seconds left. Philadelphia is 2–0.',move:'▲ NEW • CLUTCH',cls:'up'},
    {rank:9,name:'Dak Prescott',meta:'QB • DAL • 1–1 • WEEK 2: 279 PASS YDS • 4 TD',note:'Dallas needed an answer and Prescott gave it one. Four touchdown passes in a 37–20 win, plus a new Cowboys career record for passing touchdowns, puts him on the board.',move:'▲ NEW • BIG RESPONSE',cls:'up'},
    {rank:10,name:'Jahmyr Gibbs',meta:'RB • DET • 1–1 • 208 RUSH YDS • 3 TOTAL TD',note:'Gibbs remains one of the league’s most dangerous backs, but Detroit’s loss in Buffalo costs him ground. He still produced 113 scrimmage yards and a receiving touchdown in Week 2.',move:'▼ 5 • STILL LIVE',cls:''}
  ];

  const ROOKIES=[
    {rank:1,name:'Josiah Trotter',team:'TB',pos:'LB',stats:'24 TOTAL TKL • 1 SACK • 38-YD PICK-SIX',note:'Trotter keeps the top spot. Tampa is 0–2, but 24 tackles through two games plus a Week 1 pick-six and sack gives him the strongest total rookie résumé so far.',tag:'🔥 HOLD • EARLY LEADER',tagClass:'hot'},
    {rank:2,name:'Denzel Boston',team:'CLE',pos:'WR',stats:'7 REC • 154 YDS • 2 TD',note:'Boston has scored in both NFL games. His 55-yard touchdown in Tampa flipped Cleveland’s Week 2 comeback, and 95 receiving yards gave the Browns the explosive element they needed.',tag:'▲ 5 • BREAKOUT',tagClass:'up'},
    {rank:3,name:'Hezekiah Masses',team:'LV',pos:'CB',stats:'5 TKL • 3 PBU • 2 INT',note:'The biggest rookie jump of Week 2. In his first NFL start, Masses intercepted Justin Herbert twice and helped seal a division road win for a Raiders team that moved to 2–0.',tag:'▲ NEW • TWO-PICK GAME',tagClass:'hot'},
    {rank:4,name:'David Bailey',team:'NYJ',pos:'EDGE',stats:'7 TKL • 2 SACK • 1 FF',note:'Two games, two sacks. Bailey added a forced fumble against Green Bay and already looks like the disruptive edge presence New York drafted near the top of the first round.',tag:'▲ 2 • DROY PUSH',tagClass:'hot'},
    {rank:5,name:'Caleb Downs',team:'DAL',pos:'S',stats:'17 TKL • 2 FF • 1 SACK • 1 PBU',note:'Downs forced another fumble in Week 2 and helped Dallas get its first win. The rookie safety is already affecting games as a tackler, blitzer and turnover creator.',tag:'▼ 1 • IMPACT',tagClass:'hot'},
    {rank:6,name:'Dillon Thieneman',team:'CHI',pos:'S',stats:'17 TKL • 2 PBU',note:'Chicago’s offense stalled, but Thieneman keeps producing. Seven more tackles and another pass breakup gave him 17 tackles and two passes defensed through two starts.',tag:'▼ 3 • STEADY',tagClass:''},
    {rank:7,name:'Treydan Stukes',team:'LV',pos:'S',stats:'10 TKL • 1 INT • RAIDERS 2–0',note:'Stukes has started both games for a 2–0 team and already owns an interception. He left the Chargers win with a concussion, so health is the next thing to watch.',tag:'▼ 1 • STARTER',tagClass:''},
    {rank:8,name:'Antonio Williams',team:'WAS',pos:'WR',stats:'7 REC • 88 YDS • 1 TD',note:'Washington is 0–2, but Williams has carved out a real offensive role. He followed a 64-yard touchdown debut with three more catches in Dallas.',tag:'▲ NEW • ROLE GROWING',tagClass:'up'},
    {rank:9,name:'Kenyon Sadiq',team:'NYJ',pos:'TE',stats:'5 REC • 38 YDS • 1 RUSH TD',note:'The box score is modest, but the Jets are already using Sadiq in multiple ways. He has five catches through two games and scored on a designed run in his debut.',tag:'▼ 1 • ROLE WATCH',tagClass:''},
    {rank:10,name:'Mansoor Delane',team:'KC',pos:'CB',stats:'1 INT • 1 PBU • KC 2–0',note:'The Week 1 interception keeps Delane in the ten, but a shoulder injury kept him from playing defensive snaps in Week 2. Availability now becomes part of the evaluation.',tag:'▼ 6 • HEALTH WATCH',tagClass:'down'}
  ];

  const POWER=[
    {team:'Kansas City Chiefs',abbr:'KC',prev:1,meta:'2–0 • W 33–30 OT vs IND',note:'Mahomes threw for 382 and three scores, Walker topped 175 scrimmage again and Kansas City survived a real overtime test. Still No. 1.'},
    {team:'Buffalo Bills',abbr:'BUF',prev:2,meta:'2–0 • W 41–31 vs DET',note:'Josh Allen accounted for five touchdowns and Buffalo scored on five of its first six drives. The Bills look every bit like an AFC heavyweight.'},
    {team:'San Francisco 49ers',abbr:'SF',prev:3,meta:'2–0 • W 35–13 vs MIA',note:'Purdy went 20-of-22 and the 49ers scored touchdowns on their first five drives. Two weeks, two convincing wins.'},
    {team:'Philadelphia Eagles',abbr:'PHI',prev:6,meta:'2–0 • W 24–20 at TEN',note:'It was messy, but Hurts delivered the winning touchdown with nine seconds left. Philadelphia keeps finding ways to finish games.'},
    {team:'Seattle Seahawks',abbr:'SEA',prev:9,meta:'2–0 • W 31–7 vs ARI',note:'Seattle followed an ugly opener with a blowout. Drew Lock threw three touchdowns and the defense held Arizona to 151 total yards.'},
    {team:'Cincinnati Bengals',abbr:'CIN',prev:8,meta:'2–0 • W 20–6 at HOU',note:'Cincinnati has not hit full offensive gear yet, but the defense kept Houston out of the end zone and Burrow handled the road game cleanly.'},
    {team:'Minnesota Vikings',abbr:'MIN',prev:12,meta:'2–0 • W 9–3 at CHI',note:'Two very different wins in two weeks. Minnesota proved it can win a rock fight after the Week 1 offensive explosion.'},
    {team:'Las Vegas Raiders',abbr:'LV',prev:16,meta:'2–0 • W 26–14 at LAC',note:'The preseason six-win baseline already looks low. Cousins has six touchdown passes and Vegas has opened 2–0 with two convincing wins.'},
    {team:'Los Angeles Rams',abbr:'LAR',prev:14,meta:'1–1 • W 28–6 vs NYG',note:'That is the response the Rams needed. Stafford threw four touchdowns, Adams went for 195 yards and Los Angeles outgained New York 481–182 without Puka Nacua.'},
    {team:'Baltimore Ravens',abbr:'BAL',prev:4,meta:'1–1 • L 17–24 vs NO',note:'Week 1 looked like a machine. Week 2 ended with a fourth-quarter collapse at home. Still dangerous, but the automatic contender label takes a hit.'},
    {team:'Detroit Lions',abbr:'DET',prev:7,meta:'1–1 • L 31–41 at BUF',note:'Goff and the offense fought back, but Detroit spent too much of Thursday chasing Buffalo. The ceiling remains high; the defense needs an answer.'},
    {team:'Denver Broncos',abbr:'DEN',prev:13,meta:'1–1 • W 20–13 vs JAX',note:'Denver responded to the Kansas City loss with two fourth-quarter touchdowns. A needed reset for a team with too much talent to stay down.'},
    {team:'Green Bay Packers',abbr:'GB',prev:22,meta:'1–1 • W 20–17 OT at NYJ',note:'Green Bay erased a fourth-quarter deficit and won on the road in overtime. The Week 1 defensive disaster looks less defining after the response.'},
    {team:'Dallas Cowboys',abbr:'DAL',prev:25,meta:'1–1 • W 37–20 vs WAS',note:'Dak threw four touchdowns, Lamb went over 150 yards and Dallas finally looked like the offense expected coming into the year.'},
    {team:'New England Patriots',abbr:'NE',prev:21,meta:'1–1 • W 20–3 at PIT',note:'Holding Pittsburgh to three points on the road is a major defensive response. New England gets back onto the positive side of the board.'},
    {team:'New Orleans Saints',abbr:'NO',prev:23,meta:'1–1 • W 24–17 at BAL',note:'One of the best wins of Week 2. Tyler Shough stayed composed and New Orleans scored 15 fourth-quarter points to steal one in Baltimore.'},
    {team:'Jacksonville Jaguars',abbr:'JAX',prev:10,meta:'1–1 • L 13–20 at DEN',note:'The Week 1 blowout win was followed by a fourth-quarter collapse in Denver. Jacksonville stays in the middle until the offense proves it can travel.'},
    {team:'Carolina Panthers',abbr:'CAR',prev:27,meta:'1–1 • W 34–3 vs ATL',note:'No team flipped its Week 1 narrative harder. Bryce Young threw three touchdowns and Carolina forced five turnovers in a 31-point win.'},
    {team:'Cleveland Browns',abbr:'CLE',prev:32,meta:'1–1 • W 23–19 at TB',note:'From the bottom of the board to a road comeback. Denzel Boston supplied the explosive play and Cleveland’s defense finished the job.'},
    {team:'New York Giants',abbr:'NYG',prev:15,meta:'1–1 • L 6–28 at LAR',note:'Week 1 excitement crashed into a rough Monday. New York managed 182 yards, Jaxson Dart left with a knee injury and the offense never found a second gear.'},
    {team:'New York Jets',abbr:'NYJ',prev:26,meta:'1–1 • L 17–20 OT vs GB',note:'The Jets led late and pushed Green Bay to overtime. The loss hurts, but the young defense and David Bailey keep the floor higher than expected.'},
    {team:'Chicago Bears',abbr:'CHI',prev:5,meta:'1–1 • L 3–9 vs MIN',note:'The 59-point opener was followed by three points at home. Caleb Williams’ hamstring injury adds another reason for the sharp correction.'},
    {team:'Arizona Cardinals',abbr:'ARI',prev:18,meta:'1–1 • L 7–31 at SEA',note:'The Week 1 road win bought credibility. The Week 2 blowout loss gave a lot of it back. Arizona needs a quick reset.'},
    {team:'Pittsburgh Steelers',abbr:'PIT',prev:17,meta:'1–1 • L 3–20 vs NE',note:'The defensive formula only works if the offense can function. Three points at home sends Pittsburgh sliding.'},
    {team:'Indianapolis Colts',abbr:'IND',prev:29,meta:'0–2 • L 30–33 OT at KC',note:'The record is 0–2, but Indianapolis went toe-to-toe with Kansas City in Arrowhead and Daniel Jones looked comfortable doing it.'},
    {team:'Tampa Bay Buccaneers',abbr:'TB',prev:19,meta:'0–2 • L 19–23 vs CLE',note:'Tampa has been competitive twice, but 0–2 is 0–2. The Bucs let a home lead disappear after the weather delay.'},
    {team:'Houston Texans',abbr:'HOU',prev:11,meta:'0–2 • L 6–20 vs CIN',note:'Stroud threw for 353 yards and Houston still never reached the end zone. That is a major warning sign for a team with playoff expectations.'},
    {team:'Los Angeles Chargers',abbr:'LAC',prev:24,meta:'0–2 • L 14–26 vs LV',note:'Two losses, three turnovers in Week 2 and too many self-inflicted mistakes. The talent is better than this slot; the football has not been.'},
    {team:'Washington Commanders',abbr:'WAS',prev:20,meta:'0–2 • L 20–37 at DAL',note:'The record and the Jayden Daniels elbow injury both hurt. Washington now has to stabilize the season without knowing how quickly its quarterback can return.'},
    {team:'Miami Dolphins',abbr:'MIA',prev:30,meta:'0–2 • L 13–35 at SF',note:'San Francisco separated from Miami quickly and the offense still looks disconnected. The Dolphins are searching for answers on both sides.'},
    {team:'Tennessee Titans',abbr:'TEN',prev:31,meta:'0–2 • L 20–24 vs PHI',note:'Tennessee nearly stole one and Cam Ward showed flashes, but this is still a development team learning how to close games.'},
    {team:'Atlanta Falcons',abbr:'ATL',prev:28,meta:'0–2 • L 3–34 at CAR',note:'Five turnovers and three points against a team that gave up 59 last week is the roughest result on the board. Atlanta lands at No. 32.'}
  ];

  const logoCodes={ARI:'ari',ATL:'atl',BAL:'bal',BUF:'buf',CAR:'car',CHI:'chi',CIN:'cin',CLE:'cle',DAL:'dal',DEN:'den',DET:'det',GB:'gb',HOU:'hou',IND:'ind',JAX:'jax',KC:'kc',LV:'lv',LAC:'lac',LAR:'lar',MIA:'mia',MIN:'min',NE:'ne',NO:'no',NYG:'nyg',NYJ:'nyj',PHI:'phi',PIT:'pit',SEA:'sea',SF:'sf',TB:'tb',TEN:'ten',WAS:'wsh'};

  const esc=(v='')=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const initials=name=>name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();

  function addStyles(){
    if(document.getElementById('fourdk-week2-final-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week2-final-styles';
    style.textContent=`
      #mvp-watch .mvp-photo,#rookie-watch .rookie-photo{position:relative;overflow:hidden}
      .w2-initials{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.35);font:1000 24px/1 Arial Black,Impact,sans-serif}
      #mvp-watch .mvp-photo img,#rookie-watch .rookie-photo img{position:relative;z-index:2}
      .fourdk-mnf-week2-final{padding:34px 0;background:#080a09;color:#fff;border-top:1px solid #29302a;border-bottom:1px solid #29302a}
      .fourdk-dart-feature{padding:34px 0;background:linear-gradient(135deg,#0b2446,#090d12 62%);color:#fff;border-bottom:1px solid #2c3b49}
      .fourdk-dart-card{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:20px;align-items:stretch;color:#fff!important;text-decoration:none!important;border:1px solid #35506b;background:rgba(4,10,16,.55);overflow:hidden}
      .fourdk-dart-side{position:relative;min-height:245px;padding:24px;background:radial-gradient(circle at 82% 18%,rgba(74,128,216,.34),transparent 16rem),linear-gradient(145deg,#102c55,#0a1119)}
      .fourdk-dart-side:after{content:'6';position:absolute;right:-4px;bottom:-36px;font:1000 190px/.8 Arial Black,Impact,sans-serif;color:#fff;opacity:.08}
      .fourdk-dart-side small{position:relative;z-index:2;color:#a9bfdc;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-dart-side strong{position:relative;z-index:2;display:block;margin-top:16px;font:1000 clamp(38px,5vw,67px)/.82 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-dart-copy{padding:26px}
      .fourdk-dart-copy>span{color:#ff6d79;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-dart-copy h2{margin:8px 0 10px;font:1000 clamp(30px,4vw,48px)/.9 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-dart-copy h2 em{font-style:normal;color:#83a9e5}
      .fourdk-dart-copy p{margin:0;color:#c7d0d8;font:15px/1.55 Georgia,'Times New Roman',serif}
      .fourdk-dart-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:15px}
      .fourdk-dart-tags i{font-style:normal;padding:7px 9px;border:1px solid #3a5065;color:#aebdca;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .fourdk-dart-copy b{display:block;margin-top:18px;color:#fff;font-size:10px;letter-spacing:.1em}
      @media(max-width:760px){.fourdk-dart-card{grid-template-columns:1fr}.fourdk-dart-side{min-height:190px}.fourdk-dart-copy{padding:21px}}

      .mnf2-card{display:grid;grid-template-columns:.78fr 1.22fr;border:1px solid #323933;background:linear-gradient(145deg,#111711,#090c0a);color:inherit!important;text-decoration:none!important;overflow:hidden}
      .mnf2-score{min-height:290px;padding:25px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(circle at 80% 15%,rgba(0,93,161,.24),transparent 15rem),radial-gradient(circle at 20% 82%,rgba(255,209,0,.16),transparent 15rem),#0d110e;border-right:1px solid #323933}
      .mnf2-score small,.mnf2-copy>span{color:#ffd150;font-size:9px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .mnf2-final strong{display:block;font:1000 clamp(56px,8vw,86px)/.86 Arial Black,Impact,sans-serif;letter-spacing:-.07em}
      .mnf2-final span{color:#8f9891;font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .mnf2-copy{padding:28px;display:flex;flex-direction:column;justify-content:center}
      .mnf2-copy h2{margin:8px 0 12px;font:1000 clamp(38px,6vw,66px)/.87 Arial Black,Impact,sans-serif;text-transform:uppercase;letter-spacing:-.05em}
      .mnf2-copy h2 em{font-style:normal;color:#ffd150}
      .mnf2-copy p{margin:0;color:#b5bcb6;font:14px/1.55 Georgia,serif}
      .mnf2-tags{display:flex;gap:6px;flex-wrap:wrap;margin:16px 0}.mnf2-tags i{font-style:normal;border:1px solid #3b443d;padding:7px 8px;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .mnf2-copy b{font-size:9px;letter-spacing:.1em;text-transform:uppercase}
      @media(max-width:760px){.mnf2-card{grid-template-columns:1fr}.mnf2-score{min-height:210px;border-right:0;border-bottom:1px solid #323933}}
    `;
    document.head.appendChild(style);
  }

  function captureImages(rootSel,cardSel){
    const found={};
    document.querySelectorAll(`${rootSel} ${cardSel}`).forEach(card=>{
      const name=card.querySelector('h3')?.textContent?.trim();
      const src=card.querySelector('img')?.getAttribute('src');
      if(name && src) found[name]=src;
    });
    return found;
  }

  function updateMVP(){
    const root=document.querySelector('#mvp-watch');
    if(!root) return false;
    const images=captureImages('#mvp-watch','.mvp-card');
    const copy=root.querySelector('.mvp-head p');
    if(copy) copy.textContent='Final Week 2 MVP snapshot after Monday Night Football. Two games are enough to reward real production, but team record, sustainability and the preseason baseline still matter.';
    const stamp=root.querySelector('.mvp-stamp');
    if(stamp) stamp.innerHTML='WEEK 2 • FINAL<br>SEPT. 21, 2026';
    const grid=root.querySelector('.mvp-grid');
    if(grid) grid.innerHTML=MVP.map(p=>{
      const img=images[p.name]||'';
      return `<article class="mvp-card"><div class="mvp-rank">${p.rank}</div><div class="mvp-photo"><span class="w2-initials">${initials(p.name)}</span>${img?`<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`:''}</div><div><h3>${esc(p.name)}</h3><div class="mvp-meta">${esc(p.meta)}</div><div class="mvp-note">${esc(p.note)}</div><span class="mvp-move ${p.cls}">${esc(p.move)}</span></div></article>`;
    }).join('');
    const hm=root.querySelector('.mvp-hm-list');
    if(hm) hm.innerHTML=['Lamar Jackson','Bryce Young','Derrick Henry','Tyler Shough','Drew Lock','DeVonta Smith'].map(n=>`<span>${n}</span>`).join('');
    const foot=root.querySelector('.mvp-foot');
    if(foot) foot.textContent='Week 2 is complete: Allen holds No. 1, Mahomes surges, Kenneth Walker stays in the Top 3 and Matthew Stafford enters after a four-touchdown Monday night response.';
    root.dataset.week2Final='true';
    return true;
  }

  function updateRookies(){
    const root=document.querySelector('#rookie-watch');
    if(!root) return false;
    const images=captureImages('#rookie-watch','.rookie-card');
    const copy=root.querySelector('.rookie-head p');
    if(copy) copy.textContent='Final Week 2 rookie board. Production, role, winning impact, health and sustainable opportunity all matter.';
    const stamp=root.querySelector('.rookie-stamp');
    if(stamp) stamp.innerHTML='WEEK 2 • FINAL<br>SEPT. 21, 2026';
    const grid=root.querySelector('.rookie-grid');
    if(grid) grid.innerHTML=ROOKIES.map(p=>{
      const img=images[p.name]||'';
      return `<article class="rookie-card"><div class="rookie-rank">${p.rank}</div><div class="rookie-photo"><span class="w2-initials">${initials(p.name)}</span>${img?`<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`:''}</div><div><h3>${esc(p.name)}</h3><div class="rookie-meta">${esc(p.pos)} • ${esc(p.team)} • ${esc(p.stats)}</div><div class="rookie-note">${esc(p.note)}</div><span class="rookie-tag ${p.tagClass}">${esc(p.tag)}</span></div></article>`;
    }).join('');
    const hm=root.querySelector('.rookie-hm-list');
    if(hm) hm.innerHTML=['Sonny Styles • WAS','Jacob Rodriguez • MIA','KC Concepcion • CLE','Mike Washington Jr. • LV','Emmett Johnson • KC','Jeremiyah Love • ARI'].map(n=>`<span>${n}</span>`).join('');
    const foot=root.querySelector('.rookie-foot');
    if(foot) foot.textContent='Trotter keeps the top spot, Denzel Boston remains the top offensive rookie and Hezekiah Masses crashes the Top 3 after intercepting Justin Herbert twice in his first NFL start.';
    root.dataset.week2Final='true';
    return true;
  }

  function moveText(prev,rank){
    const d=prev-rank;
    if(d>0) return {text:`↑ ${d}`,cls:'up'};
    if(d<0) return {text:`↓ ${Math.abs(d)}`,cls:'down'};
    return {text:'—',cls:''};
  }

  function badge(team){
    const code=logoCodes[team.abbr]||team.abbr.toLowerCase();
    return `<span class="pr-badge" aria-label="${esc(team.team)} logo"><span class="pr-badge-fallback">${esc(team.abbr)}</span><img src="https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'"></span>`;
  }

  function updatePower(){
    const section=document.querySelector('#power-rankings.fourdk-power-rankings.nfl') || document.querySelector('#fourdkPowerRankings');
    if(!section) return false;
    const deck=section.querySelector('.pr-deck');
    if(deck) deck.textContent='4DK’s final Week 2 board after Monday Night Football. Results carry more weight now, but two weeks still do not erase roster quality, injuries or preseason expectations.';
    const s1=section.querySelector('.pr-stamp strong');
    const s2=section.querySelector('.pr-stamp span');
    if(s1) s1.textContent='WEEK 2 • FINAL';
    if(s2) s2.textContent='UPDATED SEPTEMBER 21, 2026';
    const top3=section.querySelector('.pr-top3');
    if(top3) top3.innerHTML=POWER.slice(0,3).map((t,i)=>`<article class="pr-podium" data-rank="${i+1}"><small>#${i+1} • ${esc(t.abbr)}</small><b>${esc(t.team)}</b><span>${esc(t.note)}</span></article>`).join('');
    const board=section.querySelector('[data-pr-board]');
    if(board){
      board.classList.remove('expanded');
      board.innerHTML=POWER.map((t,i)=>{
        const rank=i+1,m=moveText(t.prev,rank);
        return `<article class="pr-row ${i>=10?'pr-extra':''}"><div class="pr-rank">${rank}</div><div class="pr-team">${badge(t)}<span><b>${esc(t.team)}</b><small>NFL POWER BOARD</small></span></div><div class="pr-meta">${esc(t.meta)}</div><div class="pr-note">${esc(t.note)}</div><div class="pr-move ${m.cls}">${m.text}</div></article>`;
      }).join('');
    }
    const toggle=section.querySelector('[data-pr-toggle]');
    if(toggle) toggle.textContent='SHOW ALL 32 TEAMS ↓';
    const bottom=section.querySelector('.pr-note-bottom');
    if(bottom) bottom.textContent='Final Week 2 board: the Rams make the biggest Monday-night jump after a 28–6 response win; the Giants fall after the offense was held to 182 yards and Jaxson Dart exited early.';
    section.dataset.week2Final='true';
    return true;
  }

  function addMNFRecap(){
    if(document.querySelector('[data-mnf-week2-final]')) return true;
    const anchor=document.querySelector('#rookie-watch')||document.querySelector('#mvp-watch')||document.querySelector('#scoreboard');
    if(!anchor) return false;
    const section=document.createElement('section');
    section.className='fourdk-mnf-week2-final';
    section.id='mnf-week2-final';
    section.dataset.mnfWeek2Final='';
    section.innerHTML=`<div class="shell"><a class="mnf2-card" href="nfl-mnf-recap-week2-rams-giants.html"><div class="mnf2-score"><small>4DK NFL • MONDAY NIGHT FOOTBALL • WEEK 2</small><div class="mnf2-final"><strong>28–6</strong><span>RAMS OVER GIANTS • FINAL</span></div></div><div class="mnf2-copy"><span>THE RESPONSE GAME</span><h2>THE RAMS<br><em>ANSWERED.</em></h2><p>Stafford throws four touchdowns, Davante Adams goes for 195 yards, Aaron Donald completes his comeback after 32 months away and Jaxson Dart exits with a left-knee injury. Follow-up reporting now says season-ending surgery is expected; his ACL is intact, while the MCL, PCL and meniscus reportedly sustained damage.</p><div class="mnf2-tags"><i>Stafford: 327 • 4 TD</i><i>Adams: 195 • 2 TD</i><i>Donald Returns</i><i>Dart: Surgery Expected</i><i>ACL Intact</i></div><b>READ THE FULL 4DK MNF BREAKDOWN →</b></div></a></div>`;
    anchor.after(section);
    const nav=document.querySelector('.nfl-v2-nav');
    if(nav && !nav.querySelector('a[href="#mnf-week2-final"]')){const a=document.createElement('a');a.href='#mnf-week2-final';a.textContent='MNF Week 2';nav.appendChild(a);}
    return true;
  }


  function addDartFeature(){
    if(document.querySelector('[data-dart-season-feature]')) return true;
    const anchor=document.querySelector('#mnf-week2-final')||document.querySelector('#rookie-watch')||document.querySelector('#mvp-watch')||document.querySelector('#scoreboard');
    if(!anchor) return false;
    const section=document.createElement('section');
    section.className='fourdk-dart-feature';
    section.id='dart-season-feature';
    section.dataset.dartSeasonFeature='';
    section.innerHTML=`<div class="shell"><a class="fourdk-dart-card" href="jaxson-dart-season-ending-injury-giants-qb-future.html"><div class="fourdk-dart-side"><small>4DK NFL • GIANTS QB EMERGENCY</small><strong>DART'S<br>SEASON<br>CHANGES.</strong></div><div class="fourdk-dart-copy"><span>SEPT. 23 • BREAKING ANALYSIS</span><h2>NOW WHAT FOR<br><em>THE GIANTS?</em></h2><p>Reports say Jaxson Dart is expected to undergo season-ending knee surgery. Jameis Winston gets the first shot, but if New York still believes this is a playoff roster, the front office should be working the quarterback market immediately.</p><div class="fourdk-dart-tags"><i>Giants 1–1</i><i>Winston Next Up</i><i>QB Market Watch</i><i>Dart ACL Intact</i></div><b>READ THE FULL 4DK FEATURE →</b></div></a></div>`;
    anchor.after(section);
    const nav=document.querySelector('.nfl-v2-nav');
    if(nav && !nav.querySelector('a[href="#dart-season-feature"]')){const a=document.createElement('a');a.href='#dart-season-feature';a.textContent='Dart Injury';nav.appendChild(a);}
    return true;
  }

  function updateCurrentNote(){
    const note=document.querySelector('#week2-current .w2-note');
    if(note) note.textContent='Week 2 is complete. MVP Watch, Rookie Watch and all 32 Power Rankings are final. The newest Giants story: reports say Jaxson Dart is expected to undergo season-ending knee surgery.';
  }

  function apply(){addStyles();updateMVP();updateRookies();updatePower();addMNFRecap();addDartFeature();updateCurrentNote();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [250,600,1100,1800,2800,4200,6000,7600].forEach(ms=>setTimeout(apply,ms));
})();