(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkWeek3SundayLoaded) return;
  window.__fourdkWeek3SundayLoaded=true;

  const MVP=[{"rank":1,"name":"Brock Purdy","meta":"QB • SF • 3–0 • 789 PASS YDS • 10 TOTAL TD • 1 INT","note":"Purdy takes over No. 1 after another explosive win: 297 yards and four touchdowns against Arizona. San Francisco is 3–0 and his efficiency has been elite for three straight weeks.","move":"▲ 3 • NEW LEADER","cls":"hot"},{"rank":2,"name":"Josh Allen","meta":"QB • BUF • 3–0 • 786 PASS YDS • 11 TOTAL TD • 2 INT","note":"Allen finally had a rough passing day, throwing two interceptions against the Chargers, but he still ran for two touchdowns and Buffalo stayed unbeaten. The total production keeps him right on Purdy’s heels.","move":"▼ 1 • STILL ELITE","cls":"hot"},{"rank":3,"name":"Patrick Mahomes","meta":"QB • KC • 3–0 • 812 PASS YDS • 8 TOTAL TD • 2 INT","note":"Mahomes went 20-of-24 for 246 yards and two scores in Miami. Kansas City is 3–0, he leads this group in passing yards, and the offense keeps finding different ways to win.","move":"▼ 1 • 3–0","cls":"hot"},{"rank":4,"name":"Kirk Cousins","meta":"QB • LV • 3–0 • 661 PASS YDS • 9 TD • 3 INT","note":"Three games, three wins, three touchdown passes in every game. Cousins has given Las Vegas immediate stability and the Raiders have become one of the early-season stories.","move":"▲ 1 • VEGAS 3–0","cls":"hot"},{"rank":5,"name":"Jared Goff","meta":"QB • DET • 2–1 • 802 PASS YDS • 8 TD • 0 INT","note":"Goff has quietly been surgical: 802 passing yards, eight touchdowns and no interceptions through three games. Detroit has scored 30-plus in every game.","move":"▲ NEW • ZERO PICKS","cls":"up"},{"rank":6,"name":"Jahmyr Gibbs","meta":"RB • DET • 2–1 • 463 SCRIMMAGE YDS • 6 TOTAL TD","note":"Gibbs was the engine against the Jets with 164 scrimmage yards and three touchdowns. His rushing and receiving impact has made him one of the league’s most valuable non-quarterbacks.","move":"▲ 4 • TAKEOVER GAME","cls":"hot"},{"rank":7,"name":"Kenneth Walker III","meta":"RB • KC • 3–0 • 442 SCRIMMAGE YDS • 4 TOTAL TD","note":"The Week 3 yardage was quieter, but Walker scored twice and Kansas City moved to 3–0. His first three weeks have completely changed the balance of the Chiefs offense.","move":"▼ 4 • STILL PRODUCING","cls":""},{"rank":8,"name":"Jaxon Smith-Njigba","meta":"WR • SEA • 2–1 • 27 REC • 405 YDS • 6 TD","note":"JSN has opened the season with 120-plus receiving yards and a touchdown in all three games. Even in Seattle’s first loss, he went 10 for 128 with two scores.","move":"▲ NEW • HISTORIC START","cls":"hot"},{"rank":9,"name":"Lamar Jackson","meta":"QB • BAL • 2–1 • 745 PASS YDS • 124 RUSH YDS • 5 TOTAL TD","note":"Lamar was efficient in Rio: 15-of-20, two passing touchdowns, no turnovers and 50 rushing yards. Baltimore is back above .500 after the Week 2 stumble.","move":"▲ NEW • CLEAN RESPONSE","cls":"up"},{"rank":10,"name":"Bijan Robinson","meta":"RB • ATL • 1–2 • 467 SCRIMMAGE YDS • 3 TOTAL TD","note":"Atlanta’s record keeps him at the bottom of the ten, but 194 rushing yards and two touchdowns at Lambeau was too dominant to ignore. Bijan remains one of the league’s biggest workload weapons.","move":"▲ NEW • LAMBEAU TAKEOVER","cls":"up"}];
  const ROOKIES=[{"rank":1,"name":"Hezekiah Masses","team":"LV","pos":"CB","stats":"3 INT • 18.2 PASSER RATING ALLOWED • LV 3–0","note":"Masses takes over the rookie board. He added another interception in New Orleans, is tied for the league lead with three picks and has been one of the biggest reasons the Raiders are 3–0.","tag":"▲ 2 • NEW ROOKIE LEADER","tagClass":"hot"},{"rank":2,"name":"Denzel Boston","team":"CLE","pos":"WR","stats":"2 TD • KEY WEEK 3 2-PT CATCH • CLE 2–1","note":"Boston did not need another huge box score to matter. Cleveland went to him on the critical two-point conversion late against Carolina, reinforcing how quickly he has become a trusted target.","tag":"HOLD • TRUSTED TARGET","tagClass":"hot"},{"rank":3,"name":"Kenyon Sadiq","team":"NYJ","pos":"TE","stats":"12 REC • 143 YDS • 2 TOTAL TD","note":"The biggest offensive rookie jump of Week 3. Sadiq caught seven passes for 105 yards and his first receiving touchdown against Detroit after already scoring on the ground in Week 1.","tag":"▲ 6 • BREAKOUT","tagClass":"hot"},{"rank":4,"name":"David Bailey","team":"NYJ","pos":"EDGE","stats":"2 SACK • 1 FF THROUGH WEEK 2","note":"Bailey remains near the top because the early disruption is real. Two sacks and a forced fumble in his first two games established a strong DROY baseline even as the Jets slipped to 1–2.","tag":"HOLD • DROY TRACK","tagClass":""},{"rank":5,"name":"Caleb Downs","team":"DAL","pos":"S","stats":"17 TKL • 2 FF • 1 SACK THROUGH WEEK 2","note":"Dallas lost a close one to Baltimore, but Downs’ first two weeks already showed the all-around role: tackling, pressure and forced turnovers. He stays firmly in the top five.","tag":"HOLD • ALL-AROUND IMPACT","tagClass":""},{"rank":6,"name":"Josiah Trotter","team":"TB","pos":"LB","stats":"24 TKL • 1 SACK • PICK-SIX THROUGH WEEK 2","note":"Trotter falls from No. 1 only because a shoulder injury kept him out of Week 3. His first two games were still strong enough to keep him comfortably inside the top ten.","tag":"▼ 5 • INJURY DROP","tagClass":"down"},{"rank":7,"name":"Jeremiyah Love","team":"ARI","pos":"RB","stats":"WEEK 3: 100 SCRIMMAGE YDS • REC TD","note":"Love finally flashed the offensive ceiling Arizona drafted. He produced his first 100-scrimmage-yard game and his first receiving touchdown against San Francisco.","tag":"▲ NEW • BREAKTHROUGH","tagClass":"up"},{"rank":8,"name":"Dillon Thieneman","team":"CHI","pos":"S","stats":"17 TKL • 2 PBU • MNF PENDING","note":"Thieneman has been steady through two games and now gets a national-stage chance against Philadelphia tonight. His Week 3 grade is still incomplete.","tag":"▼ 2 • PLAYS TONIGHT","tagClass":""},{"rank":9,"name":"Jacob Rodriguez","team":"MIA","pos":"LB","stats":"WEEK 3 • FIRST CAREER INT","note":"Rodriguez earns his first Top 10 appearance after intercepting Patrick Mahomes in Miami. The Dolphins are 0–3, but creating a turnover against Kansas City gets him on the board.","tag":"▲ NEW • PICKED MAHOMES","tagClass":"up"},{"rank":10,"name":"Treydan Stukes","team":"LV","pos":"S","stats":"10 TKL • 1 INT THROUGH WEEK 2 • LV 3–0","note":"The Raiders’ rookie secondary keeps earning attention. Stukes already owns an interception and has started on an unbeaten defense, though Masses has become the bigger headline.","tag":"▼ 3 • WINNING ROLE","tagClass":""}];
  const POWER=[{"team":"San Francisco 49ers","abbr":"SF","prev":3,"meta":"3–0 • W 36–30 vs ARI","note":"Purdy threw four touchdowns, San Francisco stayed unbeaten and the offense has now shown three different winning scripts. New No. 1."},{"team":"Kansas City Chiefs","abbr":"KC","prev":1,"meta":"3–0 • W 24–10 at MIA","note":"Not spectacular, just controlled. Mahomes completed 20 of 24, Walker scored twice and Kansas City never let Miami take over the game."},{"team":"Buffalo Bills","abbr":"BUF","prev":2,"meta":"3–0 • W 24–16 vs LAC","note":"Allen threw two picks but ran for two scores and Buffalo still handled business. The unbeaten record and two strong opening weeks keep the Bills in the top three."},{"team":"Philadelphia Eagles","abbr":"PHI","prev":4,"meta":"2–0 • MNF at CHI TONIGHT","note":"Philadelphia holds its Week 2 slot for now. The Eagles have not played their Week 3 game yet, so tonight can move them up or down immediately."},{"team":"Minnesota Vikings","abbr":"MIN","prev":7,"meta":"3–0 • W 23–16 at TB","note":"Three wins, three different scripts. Minnesota’s defense controlled Tampa Bay and the Vikings keep stacking victories despite early quarterback turbulence."},{"team":"Las Vegas Raiders","abbr":"LV","prev":8,"meta":"3–0 • W 35–27 at NO","note":"Cousins has thrown three touchdowns in every game and the Raiders are 3–0. This is no longer just a fun start — Vegas belongs near the top of the board."},{"team":"Baltimore Ravens","abbr":"BAL","prev":10,"meta":"2–1 • W 34–31 vs DAL","note":"Baltimore answered the Week 2 collapse with a composed win in Rio. Lamar was efficient and the Ravens survived a late Dallas push."},{"team":"Detroit Lions","abbr":"DET","prev":11,"meta":"2–1 • W 31–24 vs NYJ","note":"Detroit has scored at least 30 points in all three games. Goff has eight touchdowns with no picks and Gibbs just authored a takeover performance."},{"team":"Jacksonville Jaguars","abbr":"JAX","prev":17,"meta":"2–1 • W 35–6 vs NE","note":"The biggest statement among the middle tier. Jacksonville bounced back from Denver by crushing New England and re-establishing its early-season ceiling."},{"team":"Denver Broncos","abbr":"DEN","prev":12,"meta":"2–1 • W 30–26 vs LAR","note":"A Sunday night win over the Rams gives Denver a second straight victory and a legitimate top-ten résumé through three weeks."},{"team":"Seattle Seahawks","abbr":"SEA","prev":5,"meta":"2–1 • L 31–33 at WAS","note":"Seattle outgained Washington and JSN was dominant again, but three turnovers and late mistakes finally caught up with the Seahawks."},{"team":"Pittsburgh Steelers","abbr":"PIT","prev":24,"meta":"2–1 • W 30–27 vs CIN","note":"The offense finally came alive. Rodgers threw three touchdowns and Pittsburgh won a physical AFC North game after the Week 2 dud."},{"team":"Cleveland Browns","abbr":"CLE","prev":19,"meta":"2–1 • W 21–18 vs CAR","note":"Back-to-back comeback wins have completely changed Cleveland’s season. The defense and late-game execution are carrying real weight now."},{"team":"Cincinnati Bengals","abbr":"CIN","prev":6,"meta":"2–1 • L 27–30 at PIT","note":"Cincinnati remains dangerous, but the unbeaten start is gone after losing a divisional game in Pittsburgh. The offense still has another gear to find."},{"team":"Los Angeles Rams","abbr":"LAR","prev":9,"meta":"1–2 • L 26–30 at DEN","note":"The Rams followed the Giants blowout with a road loss in Denver. The Week 2 response still matters, but 1–2 forces them back toward the middle."},{"team":"New York Giants","abbr":"NYG","prev":20,"meta":"2–1 • W 12–7 vs TEN","note":"It was ugly and conservative, but New York is 2–1. The defense did enough while the offense adjusted to life without Jaxson Dart."},{"team":"Atlanta Falcons","abbr":"ATL","prev":32,"meta":"1–2 • W 35–14 at GB","note":"No team made a louder one-week correction. Penix returned, Bijan ran for 194 and Atlanta dominated Lambeau from start to finish."},{"team":"Washington Commanders","abbr":"WAS","prev":29,"meta":"1–2 • W 33–31 vs SEA","note":"Washington finally broke through by beating a 2–0 Seattle team. The win does not erase the first two weeks, but it stops the slide."},{"team":"Indianapolis Colts","abbr":"IND","prev":25,"meta":"1–2 • W 19–17 vs HOU","note":"The Colts finally turned competitive football into a win. Daniel Jones made enough plays late and Indianapolis avoided an 0–3 hole."},{"team":"Green Bay Packers","abbr":"GB","prev":13,"meta":"1–2 • L 14–35 vs ATL","note":"The overtime win in New York was followed by a rough home loss. Getting outrushed and controlled at Lambeau sends Green Bay down the board."},{"team":"Dallas Cowboys","abbr":"DAL","prev":14,"meta":"1–2 • L 31–34 vs BAL","note":"Dallas fought back in Rio but could not finish it. The offense is dangerous enough to climb quickly, but the record now sits below .500."},{"team":"Carolina Panthers","abbr":"CAR","prev":18,"meta":"1–2 • L 18–21 at CLE","note":"Carolina nearly followed the Atlanta blowout with another win, but Cleveland owned the decisive late moments. Still more competitive than the opening week suggested."},{"team":"New Orleans Saints","abbr":"NO","prev":16,"meta":"1–2 • L 27–35 vs LV","note":"New Orleans kept fighting, but the defense could not slow Cousins and the Raiders. The Baltimore upset remains impressive, but consistency is missing."},{"team":"New York Jets","abbr":"NYJ","prev":21,"meta":"1–2 • L 24–31 at DET","note":"The Jets competed and Sadiq broke out, but another close loss leaves them 1–2. The young pieces are more encouraging than the record."},{"team":"Arizona Cardinals","abbr":"ARI","prev":23,"meta":"1–2 • L 30–36 at SF","note":"Arizona showed real second-half fight against the new No. 1 team, but it was another loss. Jeremiyah Love’s breakout is a positive."},{"team":"New England Patriots","abbr":"NE","prev":15,"meta":"1–2 • L 6–35 at JAX","note":"The Week 2 defensive masterpiece disappeared in Jacksonville. A 29-point loss sends New England sharply backward."},{"team":"Chicago Bears","abbr":"CHI","prev":22,"meta":"1–1 • MNF vs PHI TONIGHT","note":"Chicago stays provisional until Monday night. The Week 1 explosion and Week 2 offensive crash still make this one of the hardest teams to place."},{"team":"Tampa Bay Buccaneers","abbr":"TB","prev":26,"meta":"0–3 • L 16–23 vs MIN","note":"Tampa competed with unbeaten Minnesota but remains winless, and Baker Mayfield left with a thumb injury. The urgency is already high."},{"team":"Los Angeles Chargers","abbr":"LAC","prev":28,"meta":"0–3 • L 16–24 at BUF","note":"The Chargers played Buffalo tough for a half but again unraveled with mistakes. Talent is not translating into wins."},{"team":"Houston Texans","abbr":"HOU","prev":27,"meta":"0–3 • L 17–19 at IND","note":"The defense keeps giving Houston chances. The offense keeps wasting them. An 0–3 start is now impossible to dismiss."},{"team":"Miami Dolphins","abbr":"MIA","prev":30,"meta":"0–3 • L 10–24 vs KC","note":"Miami was more competitive than the first two weeks, but the Dolphins still have not won and the offense remains inconsistent."},{"team":"Tennessee Titans","abbr":"TEN","prev":31,"meta":"0–3 • L 7–12 at NYG","note":"Tennessee had chances late but could not finish drives. The developmental flashes are there; the wins are not."}];

  const STANDINGS={
    afc:[
      ['AFC EAST',[['Buffalo Bills','3–0',1],['New York Jets','1–2',0],['New England Patriots','1–2',0],['Miami Dolphins','0–3',0]]],
      ['AFC NORTH',[['Pittsburgh Steelers','2–1',1],['Baltimore Ravens','2–1',0],['Cleveland Browns','2–1',0],['Cincinnati Bengals','2–1',0]]],
      ['AFC SOUTH',[['Jacksonville Jaguars','2–1',1],['Indianapolis Colts','1–2',0],['Tennessee Titans','0–3',0],['Houston Texans','0–3',0]]],
      ['AFC WEST',[['Kansas City Chiefs','3–0',1],['Las Vegas Raiders','3–0',0],['Denver Broncos','2–1',0],['Los Angeles Chargers','0–3',0]]]
    ],
    nfc:[
      ['NFC EAST',[['Philadelphia Eagles','2–0',1],['New York Giants','2–1',0],['Dallas Cowboys','1–2',0],['Washington Commanders','1–2',0]]],
      ['NFC NORTH',[['Minnesota Vikings','3–0',1],['Detroit Lions','2–1',0],['Chicago Bears','1–1',0],['Green Bay Packers','1–2',0]]],
      ['NFC SOUTH',[['Carolina Panthers','1–2',1],['New Orleans Saints','1–2',0],['Atlanta Falcons','1–2',0],['Tampa Bay Buccaneers','0–3',0]]],
      ['NFC WEST',[['San Francisco 49ers','3–0',1],['Seattle Seahawks','2–1',0],['Los Angeles Rams','1–2',0],['Arizona Cardinals','1–2',0]]]
    ]
  };

  const logoCodes={ARI:'ari',ATL:'atl',BAL:'bal',BUF:'buf',CAR:'car',CHI:'chi',CIN:'cin',CLE:'cle',DAL:'dal',DEN:'den',DET:'det',GB:'gb',HOU:'hou',IND:'ind',JAX:'jax',KC:'kc',LV:'lv',LAC:'lac',LAR:'lar',MIA:'mia',MIN:'min',NE:'ne',NO:'no',NYG:'nyg',NYJ:'nyj',PHI:'phi',PIT:'pit',SEA:'sea',SF:'sf',TB:'tb',TEN:'ten',WAS:'wsh'};
  const esc=(v='')=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const initials=name=>name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();

  function addStyles(){
    if(document.getElementById('fourdk-week3-sunday-refresh-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week3-sunday-refresh-styles';
    style.textContent=`
      #mvp-watch .mvp-photo,#rookie-watch .rookie-photo{position:relative;overflow:hidden}
      .w3s-initials{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.35);font:1000 24px/1 Arial Black,Impact,sans-serif}
      #mvp-watch .mvp-photo img,#rookie-watch .rookie-photo img{position:relative;z-index:2}
      .fourdk-mnf-week2-final{padding:34px 0;background:#080a09;color:#fff;border-top:1px solid #29302a;border-bottom:1px solid #29302a}
      .mnf2-card{display:grid;grid-template-columns:.78fr 1.22fr;border:1px solid #323933;background:linear-gradient(145deg,#111711,#090c0a);color:inherit!important;text-decoration:none!important;overflow:hidden}
      .mnf2-score{min-height:250px;padding:25px;display:flex;flex-direction:column;justify-content:space-between;background:#0d110e;border-right:1px solid #323933}
      .mnf2-score small,.mnf2-copy>span{color:#ffd150;font-size:9px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
      .mnf2-final strong{display:block;font:1000 clamp(56px,8vw,86px)/.86 Arial Black,Impact,sans-serif;letter-spacing:-.07em}
      .mnf2-final span{color:#8f9891;font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .mnf2-copy{padding:28px;display:flex;flex-direction:column;justify-content:center}
      .mnf2-copy h2{margin:8px 0 12px;font:1000 clamp(38px,6vw,66px)/.87 Arial Black,Impact,sans-serif;text-transform:uppercase;letter-spacing:-.05em}
      .mnf2-copy h2 em{font-style:normal;color:#ffd150}
      .mnf2-copy p{margin:0;color:#b5bcb6;font:14px/1.55 Georgia,serif}
      .mnf2-tags{display:flex;gap:6px;flex-wrap:wrap;margin:16px 0}
      .mnf2-tags i{font-style:normal;border:1px solid #3b443d;padding:7px 8px;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .mnf2-copy b{font-size:9px;letter-spacing:.1em;text-transform:uppercase}
      .fourdk-dart-feature{padding:34px 0;background:linear-gradient(135deg,#0b2446,#090d12 62%);color:#fff;border-bottom:1px solid #2c3b49}
      .fourdk-dart-card{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:20px;align-items:stretch;color:#fff!important;text-decoration:none!important;border:1px solid #35506b;background:rgba(4,10,16,.55);overflow:hidden}
      .fourdk-dart-side{position:relative;min-height:220px;padding:24px;background:linear-gradient(145deg,#102c55,#0a1119)}
      .fourdk-dart-side:after{content:'6';position:absolute;right:-4px;bottom:-36px;font:1000 190px/.8 Arial Black,Impact,sans-serif;color:#fff;opacity:.08}
      .fourdk-dart-side small{position:relative;z-index:2;color:#a9bfdc;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-dart-side strong{position:relative;z-index:2;display:block;margin-top:16px;font:1000 clamp(38px,5vw,67px)/.82 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-dart-copy{padding:26px}
      .fourdk-dart-copy>span{color:#ff6d79;font-size:8px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}
      .fourdk-dart-copy h2{margin:8px 0 10px;font:1000 clamp(30px,4vw,48px)/.9 Arial Black,Impact,sans-serif;text-transform:uppercase}
      .fourdk-dart-copy h2 em{font-style:normal;color:#83a9e5}
      .fourdk-dart-copy p{margin:0;color:#c7d0d8;font:15px/1.55 Georgia,serif}
      .fourdk-dart-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:15px}
      .fourdk-dart-tags i{font-style:normal;padding:7px 9px;border:1px solid #3a5065;color:#aebdca;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
      .fourdk-dart-copy b{display:block;margin-top:18px;color:#fff;font-size:10px;letter-spacing:.1em}
      @media(max-width:760px){.mnf2-card,.fourdk-dart-card{grid-template-columns:1fr}.mnf2-score{min-height:200px;border-right:0;border-bottom:1px solid #323933}.fourdk-dart-side{min-height:180px}}
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
    if(copy) copy.textContent='Week 3 Sunday snapshot. Fifteen games are complete; Eagles–Bears is still pending tonight, so this board gets one more refresh after Monday Night Football.';
    const stamp=root.querySelector('.mvp-stamp');
    if(stamp) stamp.innerHTML='WEEK 3 • THROUGH SUNDAY<br>SEPT. 28, 2026';
    const grid=root.querySelector('.mvp-grid');
    if(grid) grid.innerHTML=MVP.map(p=>{
      const img=images[p.name]||'';
      return `<article class="mvp-card"><div class="mvp-rank">${p.rank}</div><div class="mvp-photo"><span class="w3s-initials">${initials(p.name)}</span>${img?`<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`:''}</div><div><h3>${esc(p.name)}</h3><div class="mvp-meta">${esc(p.meta)}</div><div class="mvp-note">${esc(p.note)}</div><span class="mvp-move ${p.cls}">${esc(p.move)}</span></div></article>`;
    }).join('');
    const hm=root.querySelector('.mvp-hm-list');
    if(hm) hm.innerHTML=['Jalen Hurts • PHI (MNF)','Sam Darnold • SEA','Aaron Rodgers • PIT','Joe Burrow • CIN','Matthew Stafford • LAR','Drake London • ATL'].map(n=>`<span>${n}</span>`).join('');
    const foot=root.querySelector('.mvp-foot');
    if(foot) foot.textContent='Through Sunday: Purdy takes No. 1 after a four-touchdown day, Allen stays right behind him, Mahomes remains Top 3 and Cousins/Goff force their way into the heart of the race. Hurts is still pending Monday night.';
    root.dataset.week3Sunday='true';
    return true;
  }

  function updateRookies(){
    const root=document.querySelector('#rookie-watch');
    if(!root) return false;
    const images=captureImages('#rookie-watch','.rookie-card');
    const copy=root.querySelector('.rookie-head p');
    if(copy) copy.textContent='Week 3 rookie board through Sunday. Production, role, winning impact, health and sustainable opportunity all matter; Dillon Thieneman still has Monday Night Football tonight.';
    const stamp=root.querySelector('.rookie-stamp');
    if(stamp) stamp.innerHTML='WEEK 3 • THROUGH SUNDAY<br>SEPT. 28, 2026';
    const grid=root.querySelector('.rookie-grid');
    if(grid) grid.innerHTML=ROOKIES.map(p=>{
      const img=images[p.name]||'';
      return `<article class="rookie-card"><div class="rookie-rank">${p.rank}</div><div class="rookie-photo"><span class="w3s-initials">${initials(p.name)}</span>${img?`<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`:''}</div><div><h3>${esc(p.name)}</h3><div class="rookie-meta">${esc(p.pos)} • ${esc(p.team)} • ${esc(p.stats)}</div><div class="rookie-note">${esc(p.note)}</div><span class="rookie-tag ${p.tagClass}">${esc(p.tag)}</span></div></article>`;
    }).join('');
    const hm=root.querySelector('.rookie-hm-list');
    if(hm) hm.innerHTML=['Antonio Williams • WAS','Mansoor Delane • KC','KC Concepcion • CLE','Mike Washington Jr. • LV','Emmett Johnson • KC','Chris Bell • MIA'].map(n=>`<span>${n}</span>`).join('');
    const foot=root.querySelector('.rookie-foot');
    if(foot) foot.textContent='Masses takes over No. 1 with three interceptions, Sadiq makes the biggest offensive jump after 105 yards and a touchdown, and Trotter slides only because a shoulder injury kept him out of Week 3.';
    root.dataset.week3Sunday='true';
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
    if(deck) deck.textContent='4DK’s Week 3 board through Sunday Night Football. Philadelphia and Chicago still play tonight, so both are held provisionally until the post-MNF refresh.';
    const s1=section.querySelector('.pr-stamp strong');
    const s2=section.querySelector('.pr-stamp span');
    if(s1) s1.textContent='WEEK 3 • THROUGH SUNDAY';
    if(s2) s2.textContent='UPDATED SEPTEMBER 28, 2026';
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
    if(bottom) bottom.textContent='Sunday reset: San Francisco takes No. 1, Vegas and Minnesota stay unbeaten, Jacksonville makes a major jump, and Atlanta rockets out of the cellar. Philadelphia–Chicago can still reshape the board tonight.';
    section.dataset.week3Sunday='true';
    return true;
  }

  function updateStandings(){
    const section=document.querySelector('.w3standings,#standings.w3standings');
    if(!section) return false;
    const conf=(name,divs)=>`
      <div class="w3conf">
        <div class="w3conf-title"><b>${name}</b><span>WEEK 3 • THROUGH SUNDAY</span></div>
        ${divs.map(([d,teams])=>`
          <div class="w3div">
            <h3>${d}</h3>
            ${teams.map(([team,rec,lead])=>`<div class="w3team${lead?' leader':''}"><strong>${team}</strong><b>${rec}</b></div>`).join('')}
          </div>`).join('')}
      </div>`;
    section.innerHTML=`
      <div class="shell">
        <div class="w3standings-head">
          <div><small>4DK NFL • CURRENT STANDINGS</small><h2>WHERE EVERYBODY STANDS.</h2></div>
          <p>Standings through Sunday Night Football of Week 3. Philadelphia and Chicago have played only two games; their Week 3 matchup closes the slate tonight.</p>
        </div>
        <div class="w3standings-confs">${conf('AFC',STANDINGS.afc)}${conf('NFC',STANDINGS.nfc)}</div>
        <div class="w3standings-note">◆ Division leader shown in the current official order. Snapshot: September 28, 2026, after Sunday Night Football and before Eagles–Bears on Monday night.</div>
      </div>`;
    section.dataset.week3Sunday='true';
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
    section.innerHTML=`<div class="shell"><a class="mnf2-card" href="nfl-mnf-recap-week2-rams-giants.html"><div class="mnf2-score"><small>4DK NFL • MONDAY NIGHT FOOTBALL • WEEK 2</small><div class="mnf2-final"><strong>28–6</strong><span>RAMS OVER GIANTS • FINAL</span></div></div><div class="mnf2-copy"><span>THE RESPONSE GAME</span><h2>THE RAMS<br><em>ANSWERED.</em></h2><p>Stafford throws four touchdowns, Davante Adams goes for 195 yards, Aaron Donald completes his comeback after 32 months away and Jaxson Dart exits with a left-knee injury. Follow-up reporting says season-ending surgery is expected; his ACL is intact, while the MCL, PCL and meniscus reportedly sustained damage.</p><div class="mnf2-tags"><i>Stafford: 327 • 4 TD</i><i>Adams: 195 • 2 TD</i><i>Donald Returns</i><i>Dart: Surgery Expected</i><i>ACL Intact</i></div><b>READ THE FULL 4DK MNF BREAKDOWN →</b></div></a></div>`;
    anchor.after(section);
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
    section.innerHTML=`<div class="shell"><a class="fourdk-dart-card" href="jaxson-dart-season-ending-injury-giants-qb-future.html"><div class="fourdk-dart-side"><small>4DK NFL • GIANTS QB EMERGENCY</small><strong>DART'S<br>SEASON<br>CHANGES.</strong></div><div class="fourdk-dart-copy"><span>SEPT. 23 • BREAKING ANALYSIS</span><h2>NOW WHAT FOR<br><em>THE GIANTS?</em></h2><p>Reports say Jaxson Dart is expected to undergo season-ending knee surgery. Jameis Winston gets the first shot, but if New York still believes this is a playoff roster, the front office should be working the quarterback market immediately.</p><div class="fourdk-dart-tags"><i>Giants 2–1</i><i>Winston Next Up</i><i>QB Market Watch</i><i>Dart ACL Intact</i></div><b>READ THE FULL 4DK FEATURE →</b></div></a></div>`;
    anchor.after(section);
    return true;
  }

  function updateLabels(){
    const boardFoot=document.querySelector('.nfl-v2-board-foot');
    if(boardFoot) boardFoot.textContent='WEEK 3 RANKINGS UPDATED THROUGH SUNDAY • FRESH POST-MNF UPDATE AFTER EAGLES–BEARS.';
    const note=document.querySelector('#week2-current .w2-note');
    if(note) note.textContent='Week 3 rankings are updated through Sunday Night Football. Eagles–Bears is still pending, so the standings, MVP Watch, Rookie Watch and Power Rankings get one final Week 3 refresh after Monday night.';
  }

  function apply(){
    addStyles();
    updateMVP();
    updateRookies();
    updatePower();
    updateStandings();
    addMNFRecap();
    addDartFeature();
    updateLabels();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [250,600,1100,1800,2800,4200,6000,7600,8400,9200,10500,12000].forEach(ms=>setTimeout(apply,ms));
})();
