(() => {
  'use strict';

  const STORAGE = '4dk-mycareer-v1';
  const $ = id => document.getElementById(id);
  const screens = [...document.querySelectorAll('.mc-screen')];
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const rnd = (min,max) => Math.floor(Math.random()*(max-min+1))+min;
  const chance = p => Math.random() < clamp(p,0.03,.97);
  const fmt1 = n => Number.isFinite(n) ? n.toFixed(1) : '0.0';

  const ATTRS = ['Finishing','Shooting','Playmaking','Defense','Rebounding','Athleticism'];
  const archetypes = {
    PG:[
      ['Floor General',{Finishing:68,Shooting:72,Playmaking:82,Defense:67,Rebounding:48,Athleticism:72}],
      ['Shot Creator',{Finishing:75,Shooting:81,Playmaking:73,Defense:57,Rebounding:45,Athleticism:75}],
      ['Two-Way Guard',{Finishing:70,Shooting:70,Playmaking:72,Defense:80,Rebounding:52,Athleticism:78}],
      ['Slashing Playmaker',{Finishing:82,Shooting:63,Playmaking:79,Defense:62,Rebounding:51,Athleticism:84}]
    ],
    SG:[
      ['Three-Level Scorer',{Finishing:76,Shooting:82,Playmaking:67,Defense:63,Rebounding:50,Athleticism:75}],
      ['Two-Way Scorer',{Finishing:75,Shooting:75,Playmaking:64,Defense:80,Rebounding:56,Athleticism:78}],
      ['Slashing Guard',{Finishing:84,Shooting:65,Playmaking:69,Defense:67,Rebounding:55,Athleticism:85}],
      ['3-and-D Guard',{Finishing:66,Shooting:79,Playmaking:60,Defense:82,Rebounding:53,Athleticism:75}]
    ],
    SF:[
      ['Two-Way Wing',{Finishing:75,Shooting:74,Playmaking:66,Defense:81,Rebounding:65,Athleticism:78}],
      ['Scoring Wing',{Finishing:80,Shooting:81,Playmaking:66,Defense:62,Rebounding:60,Athleticism:77}],
      ['3-and-D Wing',{Finishing:68,Shooting:80,Playmaking:59,Defense:83,Rebounding:63,Athleticism:74}],
      ['Slashing Wing',{Finishing:85,Shooting:64,Playmaking:65,Defense:70,Rebounding:65,Athleticism:87}]
    ],
    PF:[
      ['Stretch Four',{Finishing:73,Shooting:80,Playmaking:58,Defense:69,Rebounding:75,Athleticism:68}],
      ['Two-Way Forward',{Finishing:76,Shooting:69,Playmaking:60,Defense:82,Rebounding:78,Athleticism:74}],
      ['Interior Finisher',{Finishing:86,Shooting:55,Playmaking:57,Defense:72,Rebounding:82,Athleticism:79}],
      ['Face-Up Four',{Finishing:80,Shooting:76,Playmaking:65,Defense:68,Rebounding:72,Athleticism:75}]
    ],
    C:[
      ['Rim Protector',{Finishing:74,Shooting:48,Playmaking:52,Defense:87,Rebounding:86,Athleticism:70}],
      ['Post Scorer',{Finishing:88,Shooting:65,Playmaking:59,Defense:67,Rebounding:80,Athleticism:66}],
      ['Glass Cleaner',{Finishing:78,Shooting:47,Playmaking:49,Defense:78,Rebounding:91,Athleticism:72}],
      ['Stretch Five',{Finishing:70,Shooting:80,Playmaking:58,Defense:73,Rebounding:78,Athleticism:64}]
    ],
    'Point Forward':[
      ['Playmaking Forward',{Finishing:78,Shooting:70,Playmaking:84,Defense:71,Rebounding:67,Athleticism:78}],
      ['Two-Way Point Forward',{Finishing:75,Shooting:67,Playmaking:79,Defense:84,Rebounding:71,Athleticism:79}],
      ['Jumbo Shot Creator',{Finishing:81,Shooting:79,Playmaking:77,Defense:62,Rebounding:63,Athleticism:76}],
      ['Slashing Point Forward',{Finishing:87,Shooting:62,Playmaking:80,Defense:68,Rebounding:69,Athleticism:86}],
      ['Point Forward / Post Hybrid',{Finishing:84,Shooting:69,Playmaking:78,Defense:71,Rebounding:75,Athleticism:73}]
    ]
  };

  const opponents = [
    {name:'Sierra Canyon School',city:'Chatsworth, CA',strength:88,tag:'NATIONAL SPOTLIGHT'},
    {name:'Mater Dei High School',city:'Santa Ana, CA',strength:86,tag:'STATEMENT GAME'},
    {name:'Harvard-Westlake School',city:'Los Angeles, CA',strength:87,tag:'TOUGH TEST'},
    {name:'Long Beach Poly High School',city:'Long Beach, CA',strength:80,tag:'ROAD TEST'},
    {name:'Centennial High School (Corona)',city:'Corona, CA',strength:89,tag:'RANKED MATCHUP'},
    {name:'Bishop Gorman High School',city:'Las Vegas, NV',strength:85,tag:'SHOWCASE'},
    {name:'Duncanville High School',city:'Duncanville, TX',strength:90,tag:'NATIONAL SHOWCASE'},
    {name:'Oak Hill Academy',city:'Mouth of Wilson, VA',strength:91,tag:'ELITE SHOWCASE'},
    {name:'Montverde Academy',city:'Montverde, FL',strength:95,tag:'NATIONAL POWERHOUSE'},
    {name:'IMG Academy',city:'Bradenton, FL',strength:93,tag:'NATIONAL POWERHOUSE'}
  ];

  const colleges = [
    {name:'UNLV',min:18,tier:'LOCAL OFFER',fit:'Immediate opportunity'},
    {name:'Nevada',min:20,tier:'MW OFFER',fit:'Development + role'},
    {name:'San Diego State',min:24,tier:'WEST COAST OFFER',fit:'Defense + winning'},
    {name:'Fresno State',min:22,tier:'WEST COAST OFFER',fit:'Early minutes'},
    {name:'USC',min:34,tier:'HIGH-MAJOR',fit:'LA exposure'},
    {name:'Oregon',min:36,tier:'HIGH-MAJOR',fit:'Athletic system'},
    {name:'Arizona',min:38,tier:'HIGH-MAJOR',fit:'NBA development'},
    {name:'Texas',min:41,tier:'HIGH-MAJOR',fit:'Big-stage role'},
    {name:'Gonzaga',min:45,tier:'NATIONAL',fit:'Skill development'},
    {name:'UCLA',min:48,tier:'NATIONAL',fit:'West Coast legacy'},
    {name:'Michigan State',min:50,tier:'NATIONAL',fit:'Toughness + structure'},
    {name:'UConn',min:53,tier:'NATIONAL',fit:'Winning culture'},
    {name:'Kansas',min:61,tier:'BLUE BLOOD',fit:'National spotlight'},
    {name:'Kentucky',min:63,tier:'BLUE BLOOD',fit:'Pro pipeline'},
    {name:'North Carolina',min:65,tier:'BLUE BLOOD',fit:'Tradition + freedom'},
    {name:'Duke',min:68,tier:'BLUE BLOOD',fit:'Maximum exposure'}
  ];

  const difficultyMods = {
    'Rookie':.12,'Pro':.06,'All-Star':0,'Superstar':-.06,'Hall of Fame':-.11
  };

  let state = load() || null;
  let game = null;
  let selectedDifficulty = 'All-Star';
  let selectedQuarter = 8;
  let selectedMode = 'Full Game';

  function freshStats(){
    return {pts:0,reb:0,ast:0,stl:0,blk:0,tov:0,fgm:0,fga:0,tpm:0,tpa:0,ftm:0,fta:0,fouls:0};
  }

  function showScreen(id){
    screens.forEach(s=>s.classList.toggle('active',s.id===id));
    window.scrollTo({top:0,behavior:'instant'});
  }

  function save(){
    if(state) localStorage.setItem(STORAGE,JSON.stringify(state));
  }
  function load(){
    try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch{return null}
  }
  function resetCareer(){
    if(!confirm('Reset your 4DK MY CAREER save and start over?')) return;
    localStorage.removeItem(STORAGE); state=null; game=null;
    $('continueCareerBtn').disabled=true;
    showScreen('welcomeScreen');
  }

  function fillBodyOptions(){
    const heights=[];
    for(let f=5;f<=7;f++){
      const max=f===7?2:11;
      const start=f===5?8:0;
      for(let i=start;i<=max;i++) heights.push(`${f}'${i}"`);
    }
    $('height').innerHTML=heights.map(h=>`<option>${h}</option>`).join('');
    $('height').value="6'4\"";
    const weights=[]; for(let w=150;w<=300;w+=5)weights.push(w);
    $('weight').innerHTML=weights.map(w=>`<option value="${w}">${w} lbs</option>`).join('');
    $('weight').value='195';
    const wings=[]; for(let i=0;i<=10;i++)wings.push(i===0?'Neutral':`+${i}"`);
    $('wingspan').innerHTML=wings.map(w=>`<option>${w}</option>`).join('');
    $('wingspan').value='+3"';
  }

  function updateArchetypes(){
    const pos=$('position').value;
    $('archetype').innerHTML=archetypes[pos].map(([name])=>`<option>${name}</option>`).join('');
    previewBuild();
  }

  function baseAttrs(){
    const pos=$('position').value;
    const archetype=$('archetype').value;
    return {...(archetypes[pos].find(a=>a[0]===archetype)?.[1] || archetypes[pos][0][1])};
  }

  function previewBuild(){
    const attrs=baseAttrs();
    $('buildPreview').innerHTML=ATTRS.map(a=>`<div><b>${attrs[a]}</b><span>${a.toUpperCase()}</span></div>`).join('');
  }

  function overall(attrs){
    return Math.round(ATTRS.reduce((sum,a)=>sum+(attrs[a]||0),0)/ATTRS.length);
  }

  function buildSchedule(school){
    let pool=opponents.filter(o=>!school.toLowerCase().includes(o.name.toLowerCase().split(' ')[0]));
    while(pool.length<8) pool=[...pool,...opponents];
    return pool.slice(0,8).map((o,i)=>({
      ...o,index:i,played:false,result:null,userScore:null,oppScore:null,stats:null
    }));
  }

  function createCareer(){
    const attrs=baseAttrs();
    state={
      version:1,
      player:{
        name:$('playerName').value.trim(),
        number:Number($('jersey').value||0),
        hand:$('hand').value,
        position:$('position').value,
        height:$('height').value,
        weight:Number($('weight').value),
        wingspan:$('wingspan').value,
        archetype:$('archetype').value,
        school:$('school').value.trim(),
        city:$('schoolCity').value.trim(),
        state:$('schoolState').value.trim().toUpperCase(),
        class:'Senior',
        attrs
      },
      settings:{difficulty:selectedDifficulty,quarter:selectedQuarter,mode:selectedMode},
      career:{
        gameIndex:0,wins:0,losses:0,kp:0,hype:22,stars:2,
        nationalRank:420,stateRank:88,offers:[],committed:null,
        totals:freshStats(),gameLog:[]
      },
      schedule:buildSchedule($('school').value.trim())
    };
    save();
    renderHub();
    showScreen('hubScreen');
  }

  function updateRecruiting(){
    const h=state.career.hype;
    state.career.stars=h>=68?5:h>=48?4:h>=32?3:h>=15?2:1;
    state.career.nationalRank=Math.max(1,Math.round(545-h*7.6));
    state.career.stateRank=Math.max(1,Math.round(112-h*1.55));
    const before=new Set(state.career.offers);
    colleges.filter(c=>h>=c.min).forEach(c=>{
      if(!state.career.offers.includes(c.name))state.career.offers.push(c.name);
    });
    return state.career.offers.filter(x=>!before.has(x));
  }

  function shortSchool(s){
    if(!s)return 'SCHOOL';
    return s.replace(/High School|School|Academy/gi,'').trim().split(/\s+/).slice(0,3).join(' ').toUpperCase();
  }

  function renderHub(){
    if(!state)return;
    const p=state.player,c=state.career;
    $('hubName').textContent=p.name.toUpperCase();
    $('hubSchool').textContent=`#${p.number} • ${p.position} • ${p.school}${p.city?` • ${p.city}`:''}${p.state?`, ${p.state}`:''}`;
    $('hubOvr').textContent=overall(p.attrs);
    $('recordText').textContent=`${c.wins}–${c.losses}`;
    $('kpText').textContent=`${c.kp} KP`;
    $('upgradeKP').textContent=`${c.kp} KP`;
    $('starDisplay').textContent='★'.repeat(c.stars)+'☆'.repeat(5-c.stars);
    $('prospectLabel').textContent=`${c.stars}-STAR PROSPECT`;
    $('nationalRank').textContent=`#${c.nationalRank}`;
    $('stateRank').textContent=`#${c.stateRank}`;
    $('hypeText').textContent=c.hype;

    const next=state.schedule[c.gameIndex];
    if(next){
      $('nextGameNo').textContent=`GAME ${c.gameIndex+1} OF ${state.schedule.length}`;
      $('nextOpponent').textContent=next.name.toUpperCase();
      $('nextGameTag').textContent=`${next.city} • ${next.tag}`;
      $('oppStrength').textContent=next.strength;
      $('playNextBtn').textContent='PLAY NEXT GAME →';
      $('playNextBtn').disabled=false;
    }else{
      $('nextGameNo').textContent='REGULAR SEASON COMPLETE';
      $('nextOpponent').textContent='COMMITMENT DAY';
      $('nextGameTag').textContent='Your senior resume is complete.';
      $('oppStrength').textContent='—';
      $('playNextBtn').textContent='GO TO COMMITMENT DAY →';
      $('playNextBtn').disabled=false;
    }

    document.querySelectorAll('[data-game-mode]').forEach(b=>b.classList.toggle('selected',b.dataset.gameMode===state.settings.mode));

    $('scheduleList').innerHTML=state.schedule.map((g,i)=>{
      const cls=g.played?(g.result==='W'?'win':'loss'):(i===c.gameIndex?'current':'');
      return `<div class="schedule-row ${cls}">
        <span>${String(i+1).padStart(2,'0')}</span>
        <div><strong>${g.name}</strong><small>${g.city} • ${g.tag}</small></div>
        <b>${g.played?`${g.result} ${g.userScore}–${g.oppScore}`:(i===c.gameIndex?'NEXT':'UPCOMING')}</b>
      </div>`;
    }).join('');

    const offerObjs=c.offers.map(n=>colleges.find(x=>x.name===n)).filter(Boolean);
    $('offerMini').innerHTML=offerObjs.length?offerObjs.slice(-4).reverse().map(o=>`<span>${o.name} • ${o.tier}</span>`).join(''):'<span>No offers yet. Go hoop.</span>';
    $('offerList').innerHTML=offerObjs.length?offerObjs.map(o=>`<article class="offer-card"><small>${o.tier}</small><strong>${o.name}</strong><span>${o.fit}</span></article>`).join(''):'<p class="mc-help">No offers yet. Your first games will start moving the board.</p>';
    $('recruitingStatus').textContent=c.stars>=4?'NATIONAL RECRUIT':c.stars===3?'RISING PROSPECT':'BUILD YOUR NAME';

    $('playerProfile').innerHTML=`
      <div class="player-badge"><span>4DK MY CAREER</span><strong>${p.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</strong><div><b>#${p.number} • ${p.position}</b><span>${p.archetype.toUpperCase()}</span></div></div>
      <div class="profile-info">
        <div><span>SCHOOL</span><b>${p.school}</b></div><div><span>CLASS</span><b>SENIOR</b></div>
        <div><span>HEIGHT</span><b>${p.height}</b></div><div><span>WEIGHT</span><b>${p.weight} LBS</b></div>
        <div><span>WINGSPAN</span><b>${p.wingspan}</b></div><div><span>HAND</span><b>${p.hand}</b></div>
        <div><span>ARCHETYPE</span><b>${p.archetype}</b></div><div><span>DIFFICULTY</span><b>${state.settings.difficulty}</b></div>
      </div>`;

    $('attributeList').innerHTML=ATTRS.map(a=>{
      const val=p.attrs[a],cost=upgradeCost(val);
      return `<div class="attr-row"><div class="attr-top"><span>${a.toUpperCase()}</span><b>${val}</b></div><div class="attr-bar"><div class="attr-fill" style="width:${val}%"></div></div><button class="attr-up" data-attr="${a}" ${c.kp<cost||val>=99?'disabled':''}>+1 • ${val>=99?'MAX':cost+' KP'}</button></div>`;
    }).join('');
    document.querySelectorAll('.attr-up').forEach(b=>b.addEventListener('click',()=>upgrade(b.dataset.attr)));

    renderStats();
    save();
  }

  function upgradeCost(val){ return Math.round(45 + Math.max(0,val-60)*3.4); }
  function upgrade(attr){
    const val=state.player.attrs[attr], cost=upgradeCost(val);
    if(val>=99||state.career.kp<cost)return;
    state.career.kp-=cost; state.player.attrs[attr]++;
    save(); renderHub();
  }

  function renderStats(){
    const c=state.career,t=c.totals,gp=c.gameLog.length||1;
    const items=[
      ['PPG',t.pts/gp],['RPG',t.reb/gp],['APG',t.ast/gp],['SPG',t.stl/gp],['BPG',t.blk/gp],['TOV',t.tov/gp]
    ];
    $('seasonStats').innerHTML=items.map(([k,v])=>`<div><b>${c.gameLog.length?fmt1(v):'0.0'}</b><span>${k}</span></div>`).join('');
    $('gamesPlayedText').textContent=`${c.gameLog.length} GP`;
    $('gameLog').innerHTML=c.gameLog.length?c.gameLog.slice().reverse().map(l=>`<div class="log-row"><span>${l.result} ${l.userScore}–${l.oppScore}</span><strong>vs ${l.opponent}</strong><b>${l.stats.pts} PTS • ${l.stats.reb} REB • ${l.stats.ast} AST</b></div>`).join(''):'<p class="mc-help">No games played yet.</p>';
  }

  function initGame(mode){
    const opp=state.schedule[state.career.gameIndex];
    game={
      mode,opponent:opp,quarter:1,clock:state.settings.quarter*60,
      userScore:0,oppScore:0,possession:'offense',stamina:100,
      stats:freshStats(),over:false,keyMomentsStarted:false,pbp:[]
    };
    $('userSchoolShort').textContent=shortSchool(state.player.school);
    $('oppSchoolShort').textContent=shortSchool(opp.name);
    $('gamePlayerPos').textContent=state.player.position;
    $('gamePlayerName').textContent=state.player.name.toUpperCase();
    $('modeText').textContent=mode.toUpperCase();

    if(mode==='Sim'){
      simulateToEnd();
      return;
    }
    if(mode==='Key Moments'){
      simulateToKeyMoments();
    }else{
      addPbp(`Tip-off. ${state.player.name}'s senior season continues against ${opp.name}.`);
      renderGame();
      showScreen('gameScreen');
    }
  }

  function timeText(sec){
    sec=Math.max(0,Math.round(sec));
    return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;
  }

  function offenseActions(){
    const pos=state.player.position;
    const actions=[
      ['attack','ATTACK THE RIM','Finish through traffic.'],
      ['three','PULL THE THREE','Trust the jumper.'],
      ['screen','CALL FOR A SCREEN','Create a matchup or driving lane.'],
      ['pass','CREATE FOR A TEAMMATE','Make the right read.']
    ];
    if(['SF','PF','C','Point Forward'].includes(pos))actions.splice(2,0,['post','GO TO THE POST','Use size and touch.']);
    if(['PG','SG','SF','Point Forward'].includes(pos))actions.splice(2,0,['mid','PULL-UP MIDRANGE','Get to your spot.']);
    return actions;
  }
  function defenseActions(){
    return [
      ['contain','STAY SOLID','Keep the ball in front.'],
      ['pressure','APPLY PRESSURE','Make the ball handler uncomfortable.'],
      ['gamble','JUMP THE PASSING LANE','Big steal chance. Big risk.'],
      ['help','HELP AT THE RIM','Rotate and contest.'],
      ['glass','CRASH THE GLASS','Finish the possession.']
    ];
  }

  function renderGame(){
    $('userScore').textContent=game.userScore;
    $('oppScore').textContent=game.oppScore;
    $('quarterText').textContent=`Q${game.quarter}`;
    $('clockText').textContent=timeText(game.clock);
    $('staminaText').textContent=Math.round(game.stamina);
    $('courtStatus').textContent=game.possession==='offense'?'YOUR POSSESSION':'DEFENSIVE POSSESSION';

    const s=game.stats;
    $('liveStatLine').innerHTML=[
      ['PTS',s.pts],['REB',s.reb],['AST',s.ast],['STL',s.stl],['BLK',s.blk]
    ].map(([k,v])=>`<div><b>${v}</b><span>${k}</span></div>`).join('');

    const offense=game.possession==='offense';
    $('decisionLabel').textContent=offense?'OFFENSIVE POSSESSION':'DEFENSIVE POSSESSION';
    $('decisionTitle').textContent=offense?'MAKE YOUR READ.':'GET A STOP.';
    const actions=offense?offenseActions():defenseActions();
    $('actionButtons').innerHTML=actions.map(a=>`<button data-action="${a[0]}" type="button">${a[1]}<small>${a[2]}</small></button>`).join('');
    document.querySelectorAll('#actionButtons button').forEach(b=>b.addEventListener('click',()=>resolveAction(b.dataset.action)));
    $('playByPlay').innerHTML=game.pbp.slice().reverse().map((x,i)=>`<div class="pbp-line">${x}</div>`).join('');
  }

  function addPbp(text){
    game.pbp.push(`<b>${timeText(game.clock)} Q${game.quarter}</b> • ${text}`);
    if(game.pbp.length>40)game.pbp.shift();
  }

  function fatiguePenalty(){ return (100-game.stamina)/310; }
  function oppFactor(){ return (game.opponent.strength-80)/190; }
  function diff(){ return difficultyMods[state.settings.difficulty]||0; }

  function resolveAction(action){
    if(!game||game.over)return;
    const a=state.player.attrs,s=game.stats;
    let elapsed=rnd(17,31);
    let text='', made=false, points=0;

    if(game.possession==='offense'){
      if(action==='attack'){
        s.fga++; const p=.22+a.Finishing/135+diff()-oppFactor()-fatiguePenalty();
        if(chance(p)){made=true;points=2;s.fgm++;s.pts+=2;game.userScore+=2;text='Strong take to the rim — bucket.'}
        else if(chance(.18+a.Finishing/500)){s.fta+=2;const makes=(chance(.72)?1:0)+(chance(.72)?1:0);s.ftm+=makes;s.pts+=makes;game.userScore+=makes;text=`Fouled at the rim — ${makes}/2 at the line.`}
        else{text='Drive cut off — tough finish misses.'}
        game.stamina-=3.2;
      }else if(action==='three'){
        s.fga++;s.tpa++; const p=.06+a.Shooting/150+diff()-oppFactor()-fatiguePenalty();
        if(chance(p)){made=true;points=3;s.fgm++;s.tpm++;s.pts+=3;game.userScore+=3;text='Three ball — cash.'}
        else text='Three is up — no good.';
        game.stamina-=2;
      }else if(action==='mid'){
        s.fga++; const p=.11+a.Shooting/145+diff()-oppFactor()-fatiguePenalty();
        if(chance(p)){made=true;points=2;s.fgm++;s.pts+=2;game.userScore+=2;text='Gets to the elbow and knocks down the pull-up.'}
        else text='Pull-up is contested and misses.';
        game.stamina-=2.1;
      }else if(action==='post'){
        s.fga++; const p=.12+(a.Finishing*.62+a.Rebounding*.15+a.Athleticism*.23)/145+diff()-oppFactor()-fatiguePenalty();
        if(chance(p)){made=true;points=2;s.fgm++;s.pts+=2;game.userScore+=2;text='Backs him down and scores inside.'}
        else text='Post touch — defense holds up.';
        game.stamina-=2.8;
      }else if(action==='screen'){
        const create=(a.Playmaking+a.Athleticism)/200+diff()/2-oppFactor()/2;
        if(chance(create)){
          if(chance(.52)){s.ast++;game.userScore+=2;text='Uses the screen, draws two and hits the roller — assist.'}
          else{s.fga++;s.fgm++;s.pts+=2;game.userScore+=2;text='Turns the corner off the screen and finishes.'}
        }else{s.tov++;text='Defense blows up the action — turnover.'}
        game.stamina-=2.3;
      }else if(action==='pass'){
        const create=.24+a.Playmaking/130+diff()/2-oppFactor()/2;
        if(chance(create)){s.ast++;game.userScore+=chance(.27)?3:2;text='Reads the help and creates an open bucket — assist.'}
        else if(chance(.17)){s.tov++;text='Pass gets jumped — turnover.'}
        else{text='Good read, teammate misses the look.'}
        game.stamina-=1.3;
      }

      // teammate/opponent small background scoring for pacing
      if(chance(.20)){game.userScore+=2; addPbp('Teammate cleans up a broken possession for two.');}
      game.possession='defense';
    }else{
      const baseOpp=.43+oppFactor()-diff()/2;
      if(action==='contain'){
        if(chance(.11+a.Defense/330)){s.stl++;text='Stays square, pokes it loose — steal.'}
        else if(chance(baseOpp-a.Defense/390)){game.oppScore+=2;text='Good defense, but they finish over the contest.'}
        else{text='Containment wins — forced miss.'}
        game.stamina-=1.6;
      }else if(action==='pressure'){
        if(chance(.13+a.Defense/290)){s.stl++;text='Pressure forces the mistake — steal.'}
        else if(chance(baseOpp+.05-a.Defense/430)){game.oppScore+=chance(.17)?3:2;text='Pressure gets beat and they punish it.'}
        else{text='Ball pressure disrupts the possession.'}
        game.stamina-=2.5;
      }else if(action==='gamble'){
        if(chance(.04+a.Defense/235)){s.stl++;text='Jumps the lane — clean steal.'}
        else{game.oppScore+=chance(.28)?3:2;text='Gamble misses. Defense is exposed.'}
        game.stamina-=2.2;
      }else if(action==='help'){
        if(chance(.05+a.Defense/360+a.Athleticism/520)){s.blk++;text='Rotates over — rejected at the rim.'}
        else if(chance(baseOpp-a.Defense/410)){game.oppScore+=2;text='Help arrives late — two points.'}
        else{text='Strong rotation forces the miss.'}
        game.stamina-=2.4;
      }else if(action==='glass'){
        if(chance(.13+a.Rebounding/170)){s.reb++;text='Secures the defensive board.'}
        else if(chance(baseOpp+.02)){game.oppScore+=2;text='Could not finish the possession — second-chance bucket.'}
        else{text='Shot misses and a teammate clears it.'}
        game.stamina-=2;
      }
      if(chance(.18)){game.oppScore+=2;addPbp('Opponent gets two on the next action.');}
      game.possession='offense';
    }

    addPbp(text);
    advanceClock(elapsed);
    game.stamina=clamp(game.stamina+.5,18,100);
    if(!game.over)renderGame();
  }

  function advanceClock(sec){
    game.clock-=sec;
    if(game.clock<=0){
      if(game.quarter<4){
        game.quarter++;
        game.clock=state.settings.quarter*60;
        game.stamina=clamp(game.stamina+10,20,100);
        addPbp(`Quarter ${game.quarter} begins.`);
      }else{
        if(game.userScore===game.oppScore){
          game.clock=120; game.quarter=5; addPbp('OVERTIME — two-minute extra period.');
        }else finishGame();
      }
    }
    if(game.quarter===5 && game.clock<=0){
      if(game.userScore===game.oppScore){game.clock=120;addPbp('Another overtime period.');}
      else finishGame();
    }
  }

  function simulatePossession(userOffense=true){
    const a=state.player.attrs,s=game.stats,scale=state.settings.quarter/8;
    if(userOffense){
      const usage=.28;
      if(chance(usage)){
        const three=chance(a.Shooting/(a.Shooting+a.Finishing+30));
        s.fga++;
        if(three)s.tpa++;
        const p=(three?.28:.43)+((three?a.Shooting:a.Finishing)-70)/260+diff()-oppFactor();
        if(chance(p)){
          s.fgm++; if(three)s.tpm++;
          const pts=three?3:2;s.pts+=pts;game.userScore+=pts;
        }else if(!three&&chance(.13)){s.fta+=2;const m=(chance(.74)?1:0)+(chance(.74)?1:0);s.ftm+=m;s.pts+=m;game.userScore+=m}
      }else{
        if(chance(.30+a.Playmaking/330)){s.ast++;game.userScore+=chance(.28)?3:2;}
        else if(chance(.39))game.userScore+=2;
      }
      if(chance(.035+a.Rebounding/800))s.reb++;
      if(chance(.04))s.tov++;
    }else{
      if(chance(.045+a.Defense/780))s.stl++;
      if(chance(.015+a.Defense/1200+a.Athleticism/1800))s.blk++;
      if(chance(.10+a.Rebounding/300))s.reb++;
      const oppP=.41+oppFactor()-diff()/2-a.Defense/900;
      if(chance(oppP))game.oppScore+=chance(.26)?3:2;
    }
  }

  function simulateMinutes(minutes){
    const possessions=Math.max(2,Math.round(minutes*2.15));
    for(let i=0;i<possessions;i++){
      simulatePossession(i%2===0);
    }
  }

  function simulateToKeyMoments(){
    const totalMinutes=state.settings.quarter*4;
    const playable=3;
    simulateMinutes(totalMinutes-playable);
    game.quarter=4;
    game.clock=playable*60;
    game.possession=chance(.5)?'offense':'defense';
    game.stamina=rnd(60,82);
    // keep it reasonably competitive so key moments matter
    const gap=game.userScore-game.oppScore;
    if(Math.abs(gap)>12){
      if(gap>0)game.oppScore=game.userScore-rnd(3,9);
      else game.userScore=game.oppScore-rnd(3,9);
    }
    addPbp(`Key Moments activated with ${timeText(game.clock)} left in the 4th.`);
    renderGame();
    showScreen('gameScreen');
  }

  function simulateToEnd(){
    const totalMinutes=state.settings.quarter*4;
    simulateMinutes(totalMinutes);
    if(game.userScore===game.oppScore)game.userScore+=rnd(1,6);
    finishGame();
  }

  function performanceScore(){
    const s=game.stats;
    const eff=s.pts+s.reb*1.15+s.ast*1.4+s.stl*2.1+s.blk*2-s.tov*1.5;
    const efficiency=s.fga? s.fgm/s.fga : .45;
    return eff + (efficiency-.42)*18 + (game.userScore>game.oppScore?7:0);
  }

  function gradeFromScore(x){
    if(x>=52)return 'A+';
    if(x>=42)return 'A';
    if(x>=34)return 'A-';
    if(x>=28)return 'B+';
    if(x>=21)return 'B';
    if(x>=15)return 'B-';
    if(x>=10)return 'C+';
    if(x>=5)return 'C';
    return 'D';
  }

  function finishGame(){
    if(game.over)return;
    game.over=true;
    const c=state.career,s=game.stats,opp=state.schedule[c.gameIndex];
    const won=game.userScore>game.oppScore;
    if(won)c.wins++;else c.losses++;
    const perf=performanceScore();
    const kp=Math.max(55,Math.round(75+perf*2.5+(won?30:0)));
    const hypeChange=clamp(Math.round((perf-12)/7)+(won?2:0)+(opp.strength>=88?1:0),-4,9);
    const oldHype=c.hype;
    c.kp+=kp;
    c.hype=clamp(c.hype+hypeChange,5,80);

    Object.keys(c.totals).forEach(k=>c.totals[k]=(c.totals[k]||0)+(s[k]||0));
    opp.played=true;opp.result=won?'W':'L';opp.userScore=game.userScore;opp.oppScore=game.oppScore;opp.stats={...s};
    c.gameLog.push({opponent:opp.name,result:opp.result,userScore:game.userScore,oppScore:game.oppScore,stats:{...s}});
    c.gameIndex++;
    const newOffers=updateRecruiting();
    save();

    $('postHeadline').textContent=won?'STATEMENT MADE.':'BACK TO WORK.';
    $('postGrade').textContent=gradeFromScore(perf);
    $('postUserSchool').textContent=shortSchool(state.player.school);
    $('postOppSchool').textContent=shortSchool(opp.name);
    $('postUserScore').textContent=game.userScore;
    $('postOppScore').textContent=game.oppScore;
    $('postStatLine').innerHTML=[
      ['PTS',s.pts],['REB',s.reb],['AST',s.ast],['STL',s.stl],['BLK',s.blk],['FG',`${s.fgm}/${s.fga}`],['3PT',`${s.tpm}/${s.tpa}`]
    ].map(([k,v])=>`<div><b>${v}</b><span>${k}</span></div>`).join('');
    $('postRecruiting').textContent=hypeChange>3?'STOCK UP 🔥':hypeChange>0?'STOCK RISING':hypeChange===0?'STOCK HELD':'STOCK DOWN';
    $('postRecruitingDetail').textContent=`Hype ${oldHype} → ${c.hype}. You are now a ${c.stars}-star prospect, #${c.nationalRank} nationally and #${c.stateRank} in-state.`;
    $('postKP').textContent=`+${kp} KP`;
    $('postRewardDetail').textContent='Spend Kulture Points on your attributes before the next game.';
    $('newOffers').innerHTML=newOffers.length?newOffers.map(n=>`<div><span>NEW OFFER</span> • ${n}</div>`).join(''):'';
    $('returnHubBtn').textContent=c.gameIndex>=state.schedule.length?'GO TO COMMITMENT DAY →':'CONTINUE SENIOR YEAR →';
    showScreen('postgameScreen');
  }

  function simRest(){
    if(!game||game.over)return;
    const remaining=(game.quarter<=4?((4-game.quarter)*state.settings.quarter*60+game.clock):game.clock)/60;
    simulateMinutes(Math.max(.5,remaining));
    if(game.userScore===game.oppScore)game.userScore+=rnd(1,5);
    finishGame();
  }

  function showCommitment(){
    const offers=state.career.offers.map(n=>colleges.find(c=>c.name===n)).filter(Boolean);
    const fallback=colleges.slice(0,4);
    const list=offers.length?offers:fallback;
    $('commitIntro').textContent=`${state.player.name}, ${state.career.stars}-star ${state.player.position} from ${state.player.school}. Senior year: ${state.career.wins}–${state.career.losses}. Choose where Chapter 2 begins.`;
    $('commitOffers').innerHTML=list.map(o=>`<button class="commit-btn" data-college="${o.name}" type="button"><small>${o.tier}</small><strong>${o.name}</strong><span>${o.fit}</span></button>`).join('');
    document.querySelectorAll('.commit-btn').forEach(b=>b.addEventListener('click',()=>commit(b.dataset.college)));
    $('committedResult').innerHTML=state.career.committed?`<h3>COMMITTED: ${state.career.committed}</h3><p>College gameplay is the next 4DK MY CAREER chapter.</p>`:'';
    showScreen('commitmentScreen');
  }

  function commit(college){
    state.career.committed=college; save();
    $('commitOffers').style.display='none';
    $('committedResult').innerHTML=`<h3>${state.player.name.toUpperCase()} IS HEADED TO ${college.toUpperCase()}.</h3><p>Senior year is complete. Your save is locked for the upcoming College Chapter: 1–4 years, NIL, transfer portal, Stay-or-Go decisions, agents, Draft Combine and the NBA Draft.</p><a class="mc-primary" style="display:inline-block;text-decoration:none;margin-top:10px" href="nba.html">BACK TO 4DK NBA</a>`;
  }

  // Events
  $('newCareerBtn').addEventListener('click',()=>{fillBodyOptions();updateArchetypes();showScreen('builderScreen')});
  $('continueCareerBtn').addEventListener('click',()=>{
    state=load();
    if(!state)return;
    if(state.career.committed||state.career.gameIndex>=state.schedule.length)showCommitment();
    else{renderHub();showScreen('hubScreen')}
  });
  $('resetCareerTop').addEventListener('click',resetCareer);
  $('position').addEventListener('change',updateArchetypes);
  $('archetype').addEventListener('change',previewBuild);

  $('playerForm').addEventListener('submit',e=>{
    e.preventDefault();
    if(!$('playerName').value.trim()||!$('school').value.trim())return;
    showScreen('settingsScreen');
  });

  document.querySelectorAll('#difficultyChoices button').forEach(b=>b.addEventListener('click',()=>{
    selectedDifficulty=b.dataset.value;
    document.querySelectorAll('#difficultyChoices button').forEach(x=>x.classList.toggle('selected',x===b));
  }));
  document.querySelectorAll('#quarterChoices button').forEach(b=>b.addEventListener('click',()=>{
    selectedQuarter=Number(b.dataset.value);
    document.querySelectorAll('#quarterChoices button').forEach(x=>x.classList.toggle('selected',x===b));
  }));
  document.querySelectorAll('#modeChoices button').forEach(b=>b.addEventListener('click',()=>{
    selectedMode=b.dataset.value;
    document.querySelectorAll('#modeChoices button').forEach(x=>x.classList.toggle('selected',x===b));
  }));
  $('finishSetupBtn').addEventListener('click',createCareer);

  document.querySelectorAll('.mc-tabs button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.mc-tabs button').forEach(x=>x.classList.toggle('active',x===b));
    document.querySelectorAll('.mc-tab').forEach(t=>t.classList.toggle('active',t.id===b.dataset.tab));
  }));

  document.querySelectorAll('[data-game-mode]').forEach(b=>b.addEventListener('click',()=>{
    if(!state)return;
    state.settings.mode=b.dataset.gameMode;
    save(); renderHub();
  }));

  $('playNextBtn').addEventListener('click',()=>{
    if(!state)return;
    if(state.career.gameIndex>=state.schedule.length){showCommitment();return}
    initGame(state.settings.mode);
  });
  $('simRestBtn').addEventListener('click',simRest);
  $('returnHubBtn').addEventListener('click',()=>{
    if(state.career.gameIndex>=state.schedule.length)showCommitment();
    else{renderHub();showScreen('hubScreen')}
  });

  // Boot
  fillBodyOptions();
  updateArchetypes();
  $('continueCareerBtn').disabled=!state;
  if(state && state.career?.committed){
    $('continueCareerBtn').textContent='VIEW COMMITMENT';
  }
})();
