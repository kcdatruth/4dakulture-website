(() => {
  const path=(location.pathname || '/').toLowerCase();
  const onNFL=path.endsWith('/nfl.html') || path.endsWith('/nfl');
  if(!onNFL || window.__fourdkWeek2RankingsLoaded) return;
  window.__fourdkWeek2RankingsLoaded=true;

  const MVP = [
    {
      rank:1,name:'Josh Allen',meta:'QB • BUF • 2–0 • 582 PASS YDS • 9 TOTAL TD • 0 INT',
      note:'The Week 1 leader stays on top and widened the gap. Five total touchdowns against Detroit gave Allen nine through two games, with zero interceptions and Buffalo at 2–0.',
      move:'HOLD • EARLY LEADER',cls:'hot'
    },
    {
      rank:2,name:'Patrick Mahomes',meta:'QB • KC • 2–0 • 566 PASS YDS • 6 TOTAL TD • 1 INT',
      note:'Mahomes followed the Denver statement with 382 yards and three touchdowns in the overtime win over Indianapolis. Kansas City is 2–0 and the offense has already shown two different ways to win.',
      move:'▲ 6 • PRIME-TIME PUSH',cls:'hot'
    },
    {
      rank:3,name:'Kenneth Walker III',meta:'RB • KC • 2–0 • 290 RUSH YDS • 369 SCRIMMAGE YDS',
      note:'The league’s early scrimmage-yard leader has changed Kansas City’s offense immediately. Back-to-back 175-plus total-yard games put a non-quarterback squarely in the MVP conversation.',
      move:'▲ 7 • MONSTER START',cls:'hot'
    },
    {
      rank:4,name:'Brock Purdy',meta:'QB • SF • 2–0 • 492 PASS YDS • 6 TOTAL TD • 1 INT',
      note:'Purdy was nearly flawless against Miami: 20-of-22, 287 yards, two passing touchdowns and a rushing score. San Francisco is 2–0 and Purdy has been one of the league’s cleanest quarterbacks.',
      move:'HOLD • SURGICAL',cls:'hot'
    },
    {
      rank:5,name:'Kirk Cousins',meta:'QB • LV • 2–0 • 413 PASS YDS • 6 TD • 3 INT',
      note:'Six touchdown passes in two games and the Raiders are 2–0. Cousins is the first Raiders quarterback since Ken Stabler in 1976 to throw at least three touchdowns in each of the first two games.',
      move:'▲ NEW • VEGAS 2–0',cls:'up'
    },
    {
      rank:6,name:'Joe Burrow',meta:'QB • CIN • 2–0 • 461 PASS YDS • 3 TD • 1 INT',
      note:'The numbers are not explosive yet, but Cincinnati is 2–0 and Burrow was efficient in Houston with two touchdowns and no picks. Winning keeps him moving up.',
      move:'▲ 4 • WINNING',cls:'up'
    },
    {
      rank:7,name:'Jalen Hurts',meta:'QB • PHI • 2–0 • 467 PASS YDS • 5 TD • 2 INT',
      note:'Two interceptions hurt the Week 2 grade, but Hurts still led the late 65-yard winning drive and threw the game-winning touchdown with nine seconds left. Philadelphia is 2–0.',
      move:'▲ NEW • CLUTCH',cls:'up'
    },
    {
      rank:8,name:'Dak Prescott',meta:'QB • DAL • 1–1 • WEEK 2: 279 PASS YDS • 4 TD',
      note:'Dallas needed an answer and Prescott gave it one. Four touchdown passes in a 37–20 win, plus a new Cowboys career record for passing touchdowns, puts him onto the board.',
      move:'▲ NEW • BIG RESPONSE',cls:'up'
    },
    {
      rank:9,name:'Jahmyr Gibbs',meta:'RB • DET • 1–1 • 208 RUSH YDS • 3 TOTAL TD',
      note:'Gibbs remains one of the league’s most dangerous backs, but Detroit’s loss in Buffalo costs him ground. He still produced 113 scrimmage yards and a receiving touchdown in Week 2.',
      move:'▼ 4 • STILL LIVE',cls:''
    },
    {
      rank:10,name:'Lamar Jackson',meta:'QB • BAL • 1–1 • 559 PASS YDS • 3 TOTAL TD • 1 INT',
      note:'The Week 1 explosion keeps Lamar in the ten, but Baltimore’s home loss to New Orleans was a step back. He threw for 235 yards, one touchdown and the late interception that helped close the game.',
      move:'▼ 8 • NEEDS RESPONSE',cls:'down'
    }
  ];

  const ROOKIES = [
    {
      rank:1,name:'Josiah Trotter',team:'TB',pos:'LB',
      stats:'24 TOTAL TKL • 1 SACK • 38-YD PICK-SIX',
      note:'Trotter stays No. 1 after another double-digit tackle game. Tampa is 0–2, but the rookie linebacker has been around the football constantly and still owns the loudest defensive rookie splash of the season.',
      tag:'🔥 HOLD • EARLY LEADER',tagClass:'hot'
    },
    {
      rank:2,name:'Denzel Boston',team:'CLE',pos:'WR',
      stats:'7 REC • 154 YDS • 2 TD',
      note:'Boston has scored in both NFL games. His 55-yard touchdown in Tampa flipped Cleveland’s Week 2 comeback, and 95 receiving yards gave the Browns the explosive element they were missing.',
      tag:'▲ 5 • BREAKOUT',tagClass:'up'
    },
    {
      rank:3,name:'David Bailey',team:'NYJ',pos:'EDGE',
      stats:'7 TKL • 2 SACK • 1 FF',
      note:'Two games, two sacks. Bailey added a forced fumble against Green Bay and already looks like the disruptive edge presence New York drafted near the top of the first round.',
      tag:'▲ 3 • DROY PUSH',tagClass:'hot'
    },
    {
      rank:4,name:'Caleb Downs',team:'DAL',pos:'S',
      stats:'2 FF • 1 SACK • 1 PBU • 2 STARTS',
      note:'Downs forced another fumble in Week 2 and helped Dallas get its first win. The rookie safety is already affecting games as a tackler, blitzer and turnover creator.',
      tag:'HOLD • IMPACT',tagClass:'hot'
    },
    {
      rank:5,name:'Dillon Thieneman',team:'CHI',pos:'S',
      stats:'17 TKL • 2 PBU',
      note:'Chicago’s offense stalled, but Thieneman keeps producing. Seven more tackles and another pass breakup give him 17 tackles and two passes defensed through two starts.',
      tag:'▼ 3 • STEADY',tagClass:''
    },
    {
      rank:6,name:'Treydan Stukes',team:'LV',pos:'S',
      stats:'10 TKL • 1 INT • RAIDERS 2–0',
      note:'Stukes has started both games for a 2–0 team and already owns an interception. He left the Chargers win with a concussion, so availability is the next thing to watch.',
      tag:'▼ 1 • STARTER',tagClass:''
    },
    {
      rank:7,name:'Mansoor Delane',team:'KC',pos:'CB',
      stats:'1 INT • 1 PBU • KC 2–0',
      note:'The Week 1 interception still carries weight, but the shoulder injury limited his Week 2 role. He remains on the board because the opening-night impact was real and Kansas City is 2–0.',
      tag:'▼ 3 • HEALTH WATCH',tagClass:'down'
    },
    {
      rank:8,name:'Antonio Williams',team:'WAS',pos:'WR',
      stats:'7 REC • 88 YDS • 1 TD',
      note:'Washington is 0–2, but Williams has carved out a real offensive role. He followed a 64-yard touchdown debut with three more catches in Dallas.',
      tag:'▲ NEW • ROLE GROWING',tagClass:'up'
    },
    {
      rank:9,name:'Kenyon Sadiq',team:'NYJ',pos:'TE',
      stats:'5 REC • 38 YDS • 1 RUSH TD',
      note:'The box score is modest, but the Jets are already using Sadiq in multiple ways. He has five catches through two games and scored on a designed three-yard run in his debut.',
      tag:'▼ 1 • ROLE WATCH',tagClass:''
    },
    {
      rank:10,name:'Jeremiyah Love',team:'ARI',pos:'RB',
      stats:'95 SCRIMMAGE YDS • 1 TD',
      note:'Arizona got blown out in Seattle, but Love continues to earn work. He has 70 rushing yards, 25 receiving yards and a touchdown through his first two NFL games.',
      tag:'HOLD • DEVELOPMENT',tagClass:''
    }
  ];

  const POWER = [
    {team:'Kansas City Chiefs',abbr:'KC',prev:1,meta:'2–0 • W 33–30 OT vs IND',note:'Mahomes threw for 382 and three scores, Walker topped 175 scrimmage again and Kansas City survived a real overtime test. Still No. 1.'},
    {team:'Buffalo Bills',abbr:'BUF',prev:2,meta:'2–0 • W 41–31 vs DET',note:'Josh Allen accounted for five touchdowns and Buffalo scored on five of its first six drives. The Bills look every bit like an AFC heavyweight.'},
    {team:'San Francisco 49ers',abbr:'SF',prev:3,meta:'2–0 • W 35–13 vs MIA',note:'Purdy went 20-of-22 and the 49ers scored touchdowns on their first five drives. Two weeks, two convincing wins.'},
    {team:'Philadelphia Eagles',abbr:'PHI',prev:6,meta:'2–0 • W 24–20 at TEN',note:'It was messy, but Hurts delivered the winning touchdown with nine seconds left. Philadelphia keeps finding ways to finish games.'},
    {team:'Seattle Seahawks',abbr:'SEA',prev:9,meta:'2–0 • W 31–7 vs ARI',note:'Seattle followed an ugly opener with a blowout. Drew Lock threw three touchdowns and the defense held Arizona to 151 total yards.'},
    {team:'Cincinnati Bengals',abbr:'CIN',prev:8,meta:'2–0 • W 20–6 at HOU',note:'Cincinnati has not hit full offensive gear yet, but the defense kept Houston out of the end zone and Burrow handled the road game cleanly.'},
    {team:'Minnesota Vikings',abbr:'MIN',prev:12,meta:'2–0 • W 9–3 at CHI',note:'Two very different wins in two weeks. Minnesota proved it can win a rock fight after the Week 1 offensive explosion.'},
    {team:'Las Vegas Raiders',abbr:'LV',prev:16,meta:'2–0 • W 26–14 at LAC',note:'The preseason six-win baseline already looks low. Cousins has six touchdown passes and Vegas has opened 2–0 with two convincing division-level performances.'},
    {team:'Baltimore Ravens',abbr:'BAL',prev:4,meta:'1–1 • L 17–24 vs NO',note:'Week 1 looked like a machine. Week 2 ended with a fourth-quarter collapse at home. Still dangerous, but the automatic contender label takes a hit.'},
    {team:'Detroit Lions',abbr:'DET',prev:7,meta:'1–1 • L 31–41 at BUF',note:'Goff and the offense fought back, but Detroit spent too much of Thursday chasing Buffalo. The ceiling remains high; the defense needs an answer.'},
    {team:'Denver Broncos',abbr:'DEN',prev:13,meta:'1–1 • W 20–13 vs JAX',note:'Denver responded to the Kansas City loss with two fourth-quarter touchdowns. A needed reset for a team with too much talent to stay down.'},
    {team:'Green Bay Packers',abbr:'GB',prev:22,meta:'1–1 • W 20–17 OT at NYJ',note:'Green Bay erased a fourth-quarter deficit and won on the road in overtime. The Week 1 defensive disaster looks less defining after the response.'},
    {team:'Dallas Cowboys',abbr:'DAL',prev:25,meta:'1–1 • W 37–20 vs WAS',note:'Dak threw four touchdowns, Lamb went over 150 yards and Dallas finally looked like the offense expected coming into the year.'},
    {team:'Jacksonville Jaguars',abbr:'JAX',prev:10,meta:'1–1 • L 13–20 at DEN',note:'The Week 1 blowout win was followed by a fourth-quarter collapse in Denver. Jacksonville stays in the middle until the offense proves it can travel consistently.'},
    {team:'New England Patriots',abbr:'NE',prev:21,meta:'1–1 • W 20–3 at PIT',note:'Holding Pittsburgh to three points on the road is a major defensive response. New England gets back onto the positive side of the board.'},
    {team:'New Orleans Saints',abbr:'NO',prev:23,meta:'1–1 • W 24–17 at BAL',note:'One of the best wins of Week 2. Tyler Shough stayed composed and New Orleans scored 15 fourth-quarter points to steal one in Baltimore.'},
    {team:'New York Giants',abbr:'NYG',prev:15,meta:'1–0 • MNF at LAR',note:'The Giants stay near their Week 1 slot until Monday night. Jaxson Dart, Nabers and Harbaugh get a national-stage test at SoFi.'},
    {team:'Los Angeles Rams',abbr:'LAR',prev:14,meta:'0–1 • MNF vs NYG',note:'The Rams cannot move much before they play. Monday is the response test after the 27–7 Week 1 loss and the Garrett injury.'},
    {team:'Carolina Panthers',abbr:'CAR',prev:27,meta:'1–1 • W 34–3 vs ATL',note:'No team flipped its Week 1 narrative harder. Bryce Young threw three touchdowns and Carolina forced five turnovers in a 31-point win.'},
    {team:'Chicago Bears',abbr:'CHI',prev:5,meta:'1–1 • L 3–9 vs MIN',note:'The 59-point opener was followed by three points at home. Caleb Williams’ hamstring injury adds another reason for the sharp correction.'},
    {team:'Cleveland Browns',abbr:'CLE',prev:32,meta:'1–1 • W 23–19 at TB',note:'From the bottom of the board to a road comeback. Denzel Boston supplied the explosive play and Cleveland’s defense finished the job after the long delay.'},
    {team:'New York Jets',abbr:'NYJ',prev:26,meta:'1–1 • L 17–20 OT vs GB',note:'The Jets led late and pushed Green Bay to overtime. The loss hurts, but the young defense and David Bailey keep the floor higher than expected.'},
    {team:'Arizona Cardinals',abbr:'ARI',prev:18,meta:'1–1 • L 7–31 at SEA',note:'The Week 1 road win bought credibility. The Week 2 blowout loss gave a lot of it back. Arizona needs a quick reset.'},
    {team:'Pittsburgh Steelers',abbr:'PIT',prev:17,meta:'1–1 • L 3–20 vs NE',note:'The defensive formula only works if the offense can function. Three points at home sends Pittsburgh sliding.'},
    {team:'Indianapolis Colts',abbr:'IND',prev:29,meta:'0–2 • L 30–33 OT at KC',note:'The record is 0–2, but Indianapolis went toe-to-toe with Kansas City in Arrowhead and Daniel Jones looked comfortable doing it. A loss that actually raises the evaluation.'},
    {team:'Tampa Bay Buccaneers',abbr:'TB',prev:19,meta:'0–2 • L 19–23 vs CLE',note:'Tampa has been competitive twice, but 0–2 is 0–2. The Bucs let a home lead disappear after the weather delay.'},
    {team:'Houston Texans',abbr:'HOU',prev:11,meta:'0–2 • L 6–20 vs CIN',note:'Stroud threw for 353 yards and Houston still never reached the end zone. That is a major warning sign for a team that entered the year with playoff expectations.'},
    {team:'Los Angeles Chargers',abbr:'LAC',prev:24,meta:'0–2 • L 14–26 vs LV',note:'Two losses, three turnovers in Week 2 and too many self-inflicted mistakes. The talent is better than this slot; the football has not been.'},
    {team:'Washington Commanders',abbr:'WAS',prev:20,meta:'0–2 • L 20–37 at DAL',note:'The record and the Jayden Daniels elbow injury both hurt. Washington now has to stabilize the season without knowing how quickly its quarterback can return.'},
    {team:'Miami Dolphins',abbr:'MIA',prev:30,meta:'0–2 • L 13–35 at SF',note:'San Francisco separated from Miami quickly and the offense still looks disconnected. The Dolphins are searching for answers on both sides.'},
    {team:'Atlanta Falcons',abbr:'ATL',prev:28,meta:'0–2 • L 3–34 at CAR',note:'Five turnovers and three points against a team that gave up 59 last week is the roughest result on the board. Atlanta drops near the bottom.'},
    {team:'Tennessee Titans',abbr:'TEN',prev:31,meta:'0–2 • L 20–24 vs PHI',note:'Tennessee nearly stole one and Cam Ward showed flashes, but this is still a development team learning how to close games.'}
  ];

  const logoCodes={
    ARI:'ari',ATL:'atl',BAL:'bal',BUF:'buf',CAR:'car',CHI:'chi',CIN:'cin',CLE:'cle',
    DAL:'dal',DEN:'den',DET:'det',GB:'gb',HOU:'hou',IND:'ind',JAX:'jax',KC:'kc',
    LV:'lv',LAC:'lac',LAR:'lar',MIA:'mia',MIN:'min',NE:'ne',NO:'no',NYG:'nyg',
    NYJ:'nyj',PHI:'phi',PIT:'pit',SEA:'sea',SF:'sf',TB:'tb',TEN:'ten',WAS:'wsh'
  };

  function esc(value=''){
    return String(value).replace(/[&<>"']/g,ch=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[ch]));
  }

  function addStyles(){
    if(document.getElementById('fourdk-week2-rankings-styles')) return;
    const style=document.createElement('style');
    style.id='fourdk-week2-rankings-styles';
    style.textContent=`
      #mvp-watch .mvp-photo,
      #rookie-watch .rookie-photo{position:relative;overflow:hidden}
      #mvp-watch .mvp-photo .w2-initials,
      #rookie-watch .rookie-photo .w2-initials{
        position:absolute;inset:0;display:grid;place-items:center;
        color:rgba(255,255,255,.4);
        font:1000 24px/1 Arial Black,Impact,sans-serif;
        letter-spacing:-.05em
      }
      #mvp-watch .mvp-photo img,
      #rookie-watch .rookie-photo img{position:relative;z-index:2}
      .fourdk-power-rankings .w2-mnf-pending{
        display:inline-block;margin-left:8px;padding:5px 7px;
        border:1px solid rgba(255,255,255,.15);color:#e8bd63;
        font-size:8px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase
      }
    `;
    document.head.appendChild(style);
  }

  function initials(name){
    return name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  }

  function captureImages(selector,cardClass){
    const found={};
    document.querySelectorAll(`${selector} ${cardClass}`).forEach(card=>{
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
    if(copy) copy.textContent='Post-Sunday Week 2 snapshot. Two games are enough to reward real production, but team record, sustainability and the preseason baseline still matter. Giants–Rams on Monday can still shape the final Week 2 picture.';

    const stamp=root.querySelector('.mvp-stamp');
    if(stamp) stamp.innerHTML='WEEK 2 • POST-SUNDAY<br>SEPT. 21, 2026';

    const grid=root.querySelector('.mvp-grid');
    if(grid){
      grid.innerHTML=MVP.map(p=>{
        const img=images[p.name] || '';
        return `<article class="mvp-card">
          <div class="mvp-rank">${p.rank}</div>
          <div class="mvp-photo"><span class="w2-initials">${initials(p.name)}</span>${img ? `<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div>
            <h3>${esc(p.name)}</h3>
            <div class="mvp-meta">${esc(p.meta)}</div>
            <div class="mvp-note">${esc(p.note)}</div>
            <span class="mvp-move ${p.cls}">${esc(p.move)}</span>
          </div>
        </article>`;
      }).join('');
    }

    const hm=root.querySelector('.mvp-hm-list');
    if(hm) hm.innerHTML=[
      'Bryce Young','Derrick Henry','Tyler Shough','Drew Lock','DeVonta Smith','Jared Goff'
    ].map(name=>`<span>${name}</span>`).join('');

    const foot=root.querySelector('.mvp-foot');
    if(foot) foot.textContent='Week 2 through Sunday: Allen holds No. 1, Mahomes surges after the overtime classic, and Kenneth Walker’s historic two-game start pushes a running back into the Top 3. Giants–Rams can still affect the final Tuesday board.';

    root.dataset.week2PostSunday='true';
    return true;
  }

  function updateRookies(){
    const root=document.querySelector('#rookie-watch');
    if(!root) return false;

    const images=captureImages('#rookie-watch','.rookie-card');
    const copy=root.querySelector('.rookie-head p');
    if(copy) copy.textContent='Post-Sunday Week 2 rookie board. Production, role, winning impact, health and sustainable opportunity all matter. Monday Night Football is still pending.';

    const stamp=root.querySelector('.rookie-stamp');
    if(stamp) stamp.innerHTML='WEEK 2 • POST-SUNDAY<br>SEPT. 21, 2026';

    const grid=root.querySelector('.rookie-grid');
    if(grid){
      grid.innerHTML=ROOKIES.map(p=>{
        const img=images[p.name] || '';
        return `<article class="rookie-card">
          <div class="rookie-rank">${p.rank}</div>
          <div class="rookie-photo"><span class="w2-initials">${initials(p.name)}</span>${img ? `<img src="${img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div>
            <h3>${esc(p.name)}</h3>
            <div class="rookie-meta">${esc(p.pos)} • ${esc(p.team)} • ${esc(p.stats)}</div>
            <div class="rookie-note">${esc(p.note)}</div>
            <span class="rookie-tag ${p.tagClass}">${esc(p.tag)}</span>
          </div>
        </article>`;
      }).join('');
    }

    const hm=root.querySelector('.rookie-hm-list');
    if(hm) hm.innerHTML=[
      'Sonny Styles • WAS',
      'Jacob Rodriguez • MIA',
      'KC Concepcion • CLE',
      'Mike Washington Jr. • LV',
      'Emmett Johnson • KC',
      'Peter Woods • KC'
    ].map(name=>`<span>${name}</span>`).join('');

    const foot=root.querySelector('.rookie-foot');
    if(foot) foot.textContent='Trotter keeps the top spot, Denzel Boston makes the biggest offensive jump and David Bailey now has a sack in each of his first two games. Monday night remains part of the final Week 2 evaluation.';

    root.dataset.week2PostSunday='true';
    return true;
  }

  function moveText(prev,rank){
    const diff=prev-rank;
    if(diff>0) return `▲ ${diff}`;
    if(diff<0) return `▼ ${Math.abs(diff)}`;
    return 'HOLD';
  }

  function badge(team){
    const code=logoCodes[team.abbr] || team.abbr.toLowerCase();
    return `<span class="pr-badge" aria-label="${esc(team.team)} logo">
      <span class="pr-badge-fallback">${esc(team.abbr)}</span>
      <img src="https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'">
    </span>`;
  }

  function updatePower(){
    const section=document.querySelector('#fourdkPowerRankings');
    if(!section) return false;

    const deck=section.querySelector('.pr-deck');
    if(deck) deck.textContent='4DK’s post-Sunday Week 2 board. Results now carry more weight, but two weeks do not erase roster quality or preseason expectations. Giants–Rams is still pending Monday night.';

    const stampStrong=section.querySelector('.pr-stamp strong');
    const stampDate=section.querySelector('.pr-stamp span');
    if(stampStrong) stampStrong.textContent='WEEK 2 • POST-SUNDAY';
    if(stampDate) stampDate.textContent='UPDATED SEPTEMBER 21, 2026 • MNF PENDING';

    const top3=section.querySelector('.pr-top3');
    if(top3){
      top3.innerHTML=POWER.slice(0,3).map((t,i)=>
        `<article class="pr-podium" data-rank="${i+1}">
          <small>#${i+1} • ${esc(t.abbr)}</small>
          <b>${esc(t.team)}</b>
          <span>${esc(t.note)}</span>
        </article>`
      ).join('');
    }

    const board=section.querySelector('[data-pr-board]');
    if(board){
      board.classList.remove('expanded');
      board.innerHTML=POWER.map((t,i)=>{
        const rank=i+1;
        const movement=moveText(t.prev,rank);
        const moveClass=movement.startsWith('▲') ? 'up' : movement.startsWith('▼') ? 'down' : '';
        const pending=(t.abbr==='NYG' || t.abbr==='LAR') ? '<span class="w2-mnf-pending">MNF</span>' : '';
        return `<article class="pr-row ${i>=10?'pr-extra':''}">
          <div class="pr-rank">${rank}</div>
          <div class="pr-team">${badge(t)}<span><b>${esc(t.team)}</b><small>NFL POWER BOARD ${pending}</small></span></div>
          <div class="pr-meta">${esc(t.meta)}</div>
          <div class="pr-note">${esc(t.note)}</div>
          <div class="pr-move ${moveClass}">${movement}</div>
        </article>`;
      }).join('');
    }

    const toggle=section.querySelector('[data-pr-toggle]');
    if(toggle) toggle.textContent='SHOW ALL 32 TEAMS ↓';

    const bottom=section.querySelector('.pr-note-bottom');
    if(bottom) bottom.textContent='This is the 4DK post-Sunday Week 2 snapshot. Giants–Rams has not been played yet, so those two teams stay close to their Week 1 positions until Monday night.';

    section.dataset.week2PostSunday='true';
    return true;
  }

  function updateCurrentNote(){
    const note=document.querySelector('#week2-current .w2-note');
    if(!note) return false;
    note.textContent='MVP Watch, Rookie Watch and Power Rankings are now refreshed through Sunday of Week 2. Giants–Rams on Monday night can still move the final Week 2 board.';
    return true;
  }

  function apply(){
    addStyles();
    updateMVP();
    updateRookies();
    updatePower();
    updateCurrentNote();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }

  // Existing 4DK scripts update Week 1 boards dynamically.
  // Safe repeat passes make the newer Week 2 layer win without deleting those scripts.
  [250,600,1100,1800,2800,4200,6000].forEach(ms=>setTimeout(apply,ms));
})();
