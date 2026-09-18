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
  let courtEngine = null;

  function ensureStateCompatibility(){
    if(!state)return;
    state.settings = state.settings || {};
    if(!state.settings.controlMode)state.settings.controlMode='Joystick';
    if(!state.settings.camera)state.settings.camera='Top-Down';
    if(!state.settings.mode)state.settings.mode='Full Game';
    if(!state.settings.quarter)state.settings.quarter=8;
    if(!state.settings.difficulty)state.settings.difficulty='All-Star';
  }
  ensureStateCompatibility();

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
    stopCourtEngine();
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
      settings:{difficulty:selectedDifficulty,quarter:selectedQuarter,mode:selectedMode,controlMode:'Joystick',camera:'Top-Down'},
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
      resetDecisionCourt();
      simulateToKeyMoments();
    }else{
      addPbp(`Tip-off. ${state.player.name}'s senior season continues against ${opp.name}.`);
      showScreen('gameScreen');
      startCourtEngine();
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

  function resetDecisionCourt(){
    stopCourtEngine();
    document.querySelector('.mc-game-shell')?.classList.remove('realtime-active');
    const court=document.querySelector('.court');
    if(court) court.innerHTML='<div class="court-center"><span>4DK</span></div><div id="courtStatus" class="court-status">TIP-OFF</div>';
    const panel=document.querySelector('.mc-court-panel');
    panel?.querySelector('.mc-engine-toolbar')?.remove();
    const decisionCard=$('actionButtons')?.closest('.mc-card');
    decisionCard?.classList.remove('mc-engine-card');
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
    if(game?.over)return;
    stopCourtEngine();
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
    stopCourtEngine();
    const remaining=(game.quarter<=4?((4-game.quarter)*state.settings.quarter*60+game.clock):game.clock)/60;
    simulateMinutes(Math.max(.5,remaining));
    if(game.userScore===game.oppScore)game.userScore+=rnd(1,5);
    finishGame();
  }


  /* =============================================================
     REAL-TIME 5-ON-5 COURT ENGINE
     Full Game mode only. Key Moments + Sim keep the V1 engine.
     ============================================================= */
  function startCourtEngine(){
    ensureStateCompatibility();
    stopCourtEngine();
    const shell=document.querySelector('.mc-game-shell');
    const court=document.querySelector('.court');
    const panel=document.querySelector('.mc-court-panel');
    const decisionCard=$('actionButtons')?.closest('.mc-card');
    if(!court||!panel||!decisionCard)return;

    shell?.classList.add('realtime-active');
    decisionCard.classList.add('mc-engine-card');
    court.innerHTML=`<div class="mc-realtime-wrap ${state.settings.camera==='Angled'?'camera-angled':''}" id="realtimeWrap">
      <div class="mc-realtime-stage" id="realtimeStage">
        <canvas id="courtCanvas" width="940" height="500" aria-label="Playable 5 on 5 basketball court"></canvas>
        <div class="mc-engine-status" id="engineStatus">TIP-OFF</div>
      </div>
      <div class="mc-control-hud" id="controlHud"></div>
      <div class="mc-shot-meter" id="shotMeter"><div class="mc-shot-meter-fill" id="shotMeterFill"></div><div class="mc-shot-meter-mark"></div></div>
    </div>`;

    panel.querySelector('.mc-engine-toolbar')?.remove();
    const toolbar=document.createElement('div');
    toolbar.className='mc-engine-toolbar';
    toolbar.innerHTML=`
      <div class="mc-engine-toolbar-group"><span>MOVE</span>
        <button type="button" class="mc-engine-tool" data-control="Joystick">JOYSTICK</button>
        <button type="button" class="mc-engine-tool" data-control="Tap">TAP</button>
      </div>
      <div class="mc-engine-toolbar-group"><span>VIEW</span>
        <button type="button" class="mc-engine-tool" data-camera="Top-Down">TOP DOWN</button>
        <button type="button" class="mc-engine-tool" data-camera="Angled">ANGLED</button>
      </div>
      <div class="mc-engine-toolbar-group"><span>SHOT</span><b class="mc-shot-clock" id="engineShotClock">30</b><button type="button" class="mc-engine-tool" id="engineFullscreen">FULLSCREEN</button></div>`;
    court.after(toolbar);

    $('decisionLabel').textContent='REAL-TIME 5-ON-5';
    $('decisionTitle').textContent='CONTROL YOUR PLAYER.';
    $('actionButtons').innerHTML='<div class="mc-engine-mini" id="engineMini"></div><p class="mc-engine-help">The live action buttons now float on the court. Joystick: drag the left stick. Tap: tap open court to move. On desktop, WASD / arrow keys also work.</p>';

    const canvas=$('courtCanvas'),ctx=canvas.getContext('2d');
    const wrap=$('realtimeWrap'),stage=$('realtimeStage'),hud=$('controlHud');
    const W=940,H=500;
    const teamNames=['PG','SG','SF','PF','C'];
    const userIndex=Math.max(0,Math.min(4, {'PG':0,'SG':1,'SF':2,'PF':3,'C':4,'Point Forward':2}[state.player.position] ?? 0));
    const players=[];
    const userTeam='home',oppTeam='away';
    const key={up:false,down:false,left:false,right:false};
    const joy={active:false,dx:0,dy:0,pointer:null};
    let tapTarget=null;
    let raf=0,last=performance.now(),running=true,pausedUntil=0;
    let shotClock=30,shotCharge=0,charging=false,driveHeld=false,contestFlash=0;
    let ball={holder:null,x:W/2,y:H/2,flight:null};
    let possession=userTeam;
    let inboundDelay=.7;
    let lastUserPassAt=-999;
    let gameElapsedReal=0;
    const timeScale=3.25;
    const events=[];

    function attackRightFor(team){
      const homeRight=game.quarter<=2;
      return team===userTeam?homeRight:!homeRight;
    }
    function basket(team){return attackRightFor(team)?{x:W-52,y:H/2}:{x:52,y:H/2}}
    function ownBasket(team){return attackRightFor(team)?{x:52,y:H/2}:{x:W-52,y:H/2}}
    function teamAttr(team,keyName){
      if(team===userTeam)return state.player.attrs[keyName]||70;
      return clamp(game.opponent.strength + (keyName==='Defense'?2:0),55,96);
    }
    function formation(team,role,transition=false){
      const right=attackRightFor(team),bx=right?W-52:52;
      const sign=right?1:-1;
      const map=[
        {dx:-310,y:250},{dx:-235,y:110},{dx:-235,y:390},{dx:-115,y:145},{dx:-95,y:355}
      ];
      const m=map[role];
      return {x:clamp(bx + sign*m.dx,70,W-70),y:m.y};
    }
    function newPlayer(team,i){
      const start=formation(team,i);
      const jitter=(team===userTeam?-1:1)*12;
      return {id:`${team}-${i}`,team,role:i,label:teamNames[i],x:start.x,y:clamp(start.y+jitter,35,H-35),vx:0,vy:0,r:14,
        hasBall:false,target:null,actionCooldown:0,shootCooldown:0,screening:false,screenTimer:0,defend:null,cutTimer:0};
    }
    for(let i=0;i<5;i++)players.push(newPlayer(userTeam,i));
    for(let i=0;i<5;i++)players.push(newPlayer(oppTeam,i));
    const user=players[userIndex]; user.label=state.player.position==='Point Forward'?'PFWD':state.player.position;
    players.filter(p=>p.team===userTeam).forEach((p,i)=>p.defend=players.find(q=>q.team===oppTeam&&q.role===i));
    players.filter(p=>p.team===oppTeam).forEach((p,i)=>p.defend=players.find(q=>q.team===userTeam&&q.role===i));

    function giveBall(p){players.forEach(x=>x.hasBall=false);p.hasBall=true;ball.holder=p;ball.flight=null;ball.x=p.x;ball.y=p.y;}
    function tip(){
      possession=chance(.55)?userTeam:oppTeam;
      const pg=players.find(p=>p.team===possession&&p.role===0);
      giveBall(pg);shotClock=30;inboundDelay=.5;
      enginePbp(`${possession===userTeam?shortSchool(state.player.school):shortSchool(game.opponent.name)} controls the tip.`);
    }
    tip();

    function enginePbp(text){addPbp(text);renderPbp();}
    function renderPbp(){
      if(!$('playByPlay'))return;
      $('playByPlay').innerHTML=game.pbp.slice().reverse().map(x=>`<div class="pbp-line">${x}</div>`).join('');
    }
    function scoreboard(){
      $('userScore').textContent=game.userScore;$('oppScore').textContent=game.oppScore;
      $('quarterText').textContent=game.quarter>4?'OT':`Q${game.quarter}`;$('clockText').textContent=timeText(game.clock);
      $('staminaText').textContent=Math.round(game.stamina);$('engineShotClock').textContent=Math.max(0,Math.ceil(shotClock));
      const s=game.stats;
      $('liveStatLine').innerHTML=[['PTS',s.pts],['REB',s.reb],['AST',s.ast],['STL',s.stl],['BLK',s.blk]].map(([k,v])=>`<div><b>${v}</b><span>${k}</span></div>`).join('');
      $('engineMini').innerHTML=`<div><span>POSSESSION</span><b>${possession===userTeam?'4DK':'OPP'}</b></div><div><span>USER</span><b>${user.hasBall?'BALL':'OFF BALL'}</b></div><div><span>CONTROL</span><b>${state.settings.controlMode}</b></div>`;
      $('engineStatus').textContent = pausedUntil>performance.now()?'DEAD BALL':(possession===userTeam?'OFFENSE':'DEFENSE');
    }

    function setupControls(){
      toolbar.querySelectorAll('[data-control]').forEach(b=>{b.classList.toggle('active',b.dataset.control===state.settings.controlMode);b.onclick=()=>{state.settings.controlMode=b.dataset.control;save();setupControls();}});
      toolbar.querySelectorAll('[data-camera]').forEach(b=>{b.classList.toggle('active',b.dataset.camera===state.settings.camera);b.onclick=()=>{state.settings.camera=b.dataset.camera;wrap.classList.toggle('camera-angled',state.settings.camera==='Angled');save();}});
      $('engineFullscreen').onclick=()=>{if(!document.fullscreenElement)wrap.requestFullscreen?.();else document.exitFullscreen?.();};
      hud.innerHTML='';
      if(state.settings.controlMode==='Joystick'){
        const j=document.createElement('div');j.className='mc-joystick';j.innerHTML='<div class="mc-joystick-knob"></div>';hud.appendChild(j);
        const knob=j.firstElementChild;
        const moveJoy=e=>{
          const r=j.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
          let dx=e.clientX-cx,dy=e.clientY-cy;const max=r.width*.34,d=Math.hypot(dx,dy)||1;
          if(d>max){dx*=max/d;dy*=max/d}
          joy.dx=dx/max;joy.dy=dy/max;knob.style.transform=`translate(${dx}px,${dy}px)`;
        };
        j.onpointerdown=e=>{joy.active=true;joy.pointer=e.pointerId;j.setPointerCapture?.(e.pointerId);moveJoy(e);};
        j.onpointermove=e=>{if(joy.active&&e.pointerId===joy.pointer)moveJoy(e)};
        const end=e=>{if(!joy.active)return;joy.active=false;joy.dx=joy.dy=0;knob.style.transform='translate(0,0)';};
        j.onpointerup=end;j.onpointercancel=end;
      }else{
        const hint=document.createElement('div');hint.className='mc-tap-hint';hint.textContent='TAP COURT TO MOVE';hud.appendChild(hint);
      }
      const pad=document.createElement('div');
      pad.className='mc-action-pad';
      pad.id='engineHudActions';
      hud.appendChild(pad);
      renderActionButtons();
    }

    function renderActionButtons(){
      const box=$('engineHudActions');if(!box)return;
      const offense=possession===userTeam;
      let buttons=[];
      if(offense&&user.hasBall){
        buttons=[['shoot','HOLD SHOOT','Release near the green window','primary'],['pass','PASS','Find the best open teammate',''],['drive','DRIVE','Attack the basket',''],['screen','CALL SCREEN','Bring a teammate up','']];
      }else if(offense){
        buttons=[['call','CALL FOR BALL','Ask the handler for it','primary'],['cut','CUT','Make a hard basket cut',''],['spot','SPOT UP','Relocate to open space',''],['setscreen','SET SCREEN','Screen for the ball handler','']];
      }else{
        buttons=[['steal','STEAL','Reach or jump the lane','defense'],['contest','CONTEST','Hands up / challenge shot','defense'],['switch','SWITCH','Trade defensive assignments','defense'],['rebound','CRASH GLASS','Attack the defensive board','defense']];
      }
      box.dataset.side=offense?'offense':'defense';
      box.innerHTML=buttons.map((x,i)=>`<button type="button" class="mc-hud-action ${x[3]} ${i===0?'main':''}" data-engine-action="${x[0]}" aria-label="${x[1]}"><strong>${x[1]}</strong><small>${x[2]}</small></button>`).join('');
      box.querySelectorAll('[data-engine-action]').forEach(b=>{
        const a=b.dataset.engineAction;
        if(a==='shoot'){
          b.onpointerdown=e=>{e.preventDefault();if(user.hasBall&&!charging){charging=true;shotCharge=0;$('shotMeter').classList.add('active');}};
          const release=e=>{e.preventDefault();if(charging){charging=false;releaseUserShot();}};
          b.onpointerup=release;b.onpointercancel=release;b.onpointerleave=e=>{if(charging&&e.buttons===0)release(e)};
        }else if(a==='drive'){
          b.onpointerdown=e=>{driveHeld=true;tapTarget=basket(userTeam)};b.onpointerup=()=>{driveHeld=false};b.onpointercancel=()=>{driveHeld=false};b.onpointerleave=e=>{if(e.buttons===0)driveHeld=false};
        }else b.onclick=()=>userAction(a);
      });
    }

    function userAction(a){
      if(performance.now()<pausedUntil||game.over)return;
      if(a==='pass'&&user.hasBall){passFrom(user,true);}
      else if(a==='screen'&&user.hasBall){const tm=nearest(players.filter(p=>p.team===userTeam&&p!==user),user);tm.screening=true;tm.screenTimer=2.4;tm.target={x:user.x+(attackRightFor(userTeam)?-28:28),y:user.y+36};enginePbp('Screen coming up.');}
      else if(a==='call'&&!user.hasBall&&possession===userTeam){const h=ball.holder;if(h&&h.team===userTeam){const open=nearestDefenderDistance(user)>52;if(open||chance(.52)){passTo(h,user,false);enginePbp(`${state.player.name} calls for it and gets the ball.`)}else enginePbp('Call for ball denied — defender is sitting on the passing lane.');}}
      else if(a==='cut'){user.cutTimer=1.7;tapTarget={x:basket(userTeam).x+(attackRightFor(userTeam)?-55:55),y:H/2+rnd(-70,70)};}
      else if(a==='spot'){const f=formation(userTeam,user.role);tapTarget={x:f.x,y: user.role%2?95:405};}
      else if(a==='setscreen'){user.screening=true;user.screenTimer=2.5;const h=ball.holder;if(h){tapTarget={x:h.x+(attackRightFor(userTeam)?-24:24),y:h.y+32};}}
      else if(a==='steal'){attemptUserSteal();}
      else if(a==='contest'){contestFlash=1.0;game.stamina=clamp(game.stamina-.8,15,100);}
      else if(a==='switch'){switchAssignment();}
      else if(a==='rebound'){tapTarget={...basket(oppTeam)};}
    }

    function passFrom(from,userInitiated=false){
      const mates=players.filter(p=>p.team===from.team&&p!==from);
      let target=mates.sort((a,b)=>openScore(b)-openScore(a))[0];
      if(userInitiated&&target){lastUserPassAt=gameElapsedReal;}
      passTo(from,target,userInitiated);
    }
    function passTo(from,to,userInitiated=false){
      if(!from||!to||!from.hasBall)return;
      from.hasBall=false;ball.holder=null;ball.flight={type:'pass',fromX:from.x,fromY:from.y,to,progress:0,speed:3.2,byUser:userInitiated};
    }
    function openScore(p){return nearestDefenderDistance(p)+Math.min(120,dist(p,basket(p.team))*.08)}
    function nearest(list,p){return list.reduce((best,x)=>!best||dist(x,p)<dist(best,p)?x:best,null)}
    function nearestDefenderDistance(p){const d=players.filter(x=>x.team!==p.team);return Math.min(...d.map(x=>dist(x,p)));}
    function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}

    function attemptUserSteal(){
      if(possession===userTeam||user.actionCooldown>0)return;
      user.actionCooldown=1.0;game.stamina=clamp(game.stamina-1.4,15,100);
      const h=ball.holder;if(!h)return;const d=dist(user,h);
      const p=.05+(state.player.attrs.Defense-55)/330 + (d<34?.11:0) + diff()/3;
      if(d<55&&chance(p)){game.stats.stl++;enginePbp(`${state.player.name} rips it loose — steal!`);changePossession(userTeam,user);}
      else if(d<45&&chance(.24)){enginePbp('Reach-in gamble misses. The offense turns the corner.');user.target={x:user.x-(attackRightFor(oppTeam)?20:-20),y:user.y};}
    }
    function switchAssignment(){
      const mate=nearest(players.filter(p=>p.team===userTeam&&p!==user),user);if(!mate)return;
      const d=user.defend;user.defend=mate.defend;mate.defend=d;enginePbp('Defensive switch called.');
    }

    function releaseUserShot(){
      $('shotMeter').classList.remove('active');
      if(!user.hasBall||ball.flight)return;
      const meter=Math.min(1,shotCharge);const green=Math.max(0,1-Math.abs(meter-.74)/.25);
      shotCharge=0;attemptShot(user,green,true);
    }

    function attemptShot(shooter,meter=.55,isUser=false){
      if(!shooter.hasBall||ball.flight||shooter.shootCooldown>0)return;
      const b=basket(shooter.team),d=dist(shooter,b),defD=nearestDefenderDistance(shooter);
      const isThree=d>245;const close=d<120;
      let rating=shooter.team===userTeam?(close?state.player.attrs.Finishing:state.player.attrs.Shooting):game.opponent.strength;
      if(shooter!==user&&shooter.team===userTeam)rating=clamp(overall(state.player.attrs)-3+shooter.role*1.5,58,90);
      let make=.31+(rating-70)/230 +(isThree?-.055:close?.12:0)+(defD>80?.08:defD<35?-.13:0)+(meter-.5)*.17;
      if(shooter.team===userTeam)make+=diff(); else make-=diff()/1.8;
      if(shooter.team===oppTeam && contestFlash>0 && dist(user,shooter)<82)make-=.10 + state.player.attrs.Defense/850;
      if(isUser)make-=fatiguePenalty()*.55;
      make=clamp(make,.12,.78);
      shooter.hasBall=false;ball.holder=null;shooter.shootCooldown=1.2;
      renderActionButtons();
      const made=chance(make);const points=isThree?3:2;
      if(isUser){game.stats.fga++;if(isThree)game.stats.tpa++;game.stamina=clamp(game.stamina-(close?1.2:.75),15,100);}
      ball.flight={type:'shot',shooter,startX:shooter.x,startY:shooter.y,toX:b.x,toY:b.y,progress:0,speed:1.6,made,points,isThree,isUser};
    }

    function resolveShot(f){
      const shooter=f.shooter,team=shooter.team;
      if(f.made){
        if(team===userTeam)game.userScore+=f.points;else game.oppScore+=f.points;
        if(f.isUser){game.stats.fgm++;game.stats.pts+=f.points;if(f.isThree)game.stats.tpm++;enginePbp(`${state.player.name} knocks down ${f.isThree?'the three':'the jumper'}.`);}
        else{
          if(team===userTeam && gameElapsedReal-lastUserPassAt<3.8){game.stats.ast++;enginePbp(`${shooter.label} scores off the feed — assist for ${state.player.name}.`)}
          else enginePbp(`${team===userTeam?'Teammate':'Opponent'} scores ${f.points}.`);
        }
        deadBallThenInbound(team===userTeam?oppTeam:userTeam);
      }else{
        if(f.isUser)enginePbp(`${state.player.name}'s shot is off.`);else enginePbp(`${team===userTeam?'Teammate':'Opponent'} misses.`);
        resolveRebound();
      }
    }

    function resolveRebound(){
      const bpos={x:ball.x,y:ball.y};
      const candidates=players.slice().sort((a,b)=>{
        const ar=(a.team===userTeam?(a===user?state.player.attrs.Rebounding:overall(state.player.attrs)-4):game.opponent.strength);
        const br=(b.team===userTeam?(b===user?state.player.attrs.Rebounding:overall(state.player.attrs)-4):game.opponent.strength);
        return (dist(a,bpos)-ar*.7)-(dist(b,bpos)-br*.7);
      });
      const rebounder=candidates[0];
      if(rebounder===user){game.stats.reb++;enginePbp(`${state.player.name} grabs the rebound.`)}
      changePossession(rebounder.team,rebounder,false);
    }

    function deadBallThenInbound(nextTeam){
      possession=nextTeam;shotClock=30;pausedUntil=performance.now()+650;
      players.forEach(p=>{p.hasBall=false;p.target=null});ball.holder=null;ball.flight=null;
      setTimeout(()=>{
        if(!running||game.over)return;
        const b=ownBasket(nextTeam);const pg=players.find(p=>p.team===nextTeam&&p.role===0);
        pg.x=clamp(b.x+(attackRightFor(nextTeam)?40:-40),45,W-45);pg.y=H/2;giveBall(pg);renderActionButtons();
      },650);
    }
    function changePossession(team,holder=null,resetClock=true){
      possession=team;if(resetClock!==false)shotClock=30;
      const h=holder||players.find(p=>p.team===team&&p.role===0);giveBall(h);renderActionButtons();
    }

    function playerMove(p,tx,ty,speed,dt){
      const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);if(d<1){p.vx=p.vy=0;return}
      const step=Math.min(d,speed*dt);p.vx=dx/d*speed;p.vy=dy/d*speed;p.x+=dx/d*step;p.y+=dy/d*step;p.x=clamp(p.x,24,W-24);p.y=clamp(p.y,24,H-24);
    }

    function updateUser(dt){
      let mx=(key.right?1:0)-(key.left?1:0),my=(key.down?1:0)-(key.up?1:0);
      if(state.settings.controlMode==='Joystick'&&joy.active){mx=joy.dx;my=joy.dy;}
      const mag=Math.hypot(mx,my);
      let moving=false;
      const baseSpeed=125 + state.player.attrs.Athleticism*.58;
      const speed=baseSpeed*(driveHeld?1.24:1)*(game.stamina<35?.86:1);
      if(mag>.08){user.x+=mx/mag*speed*dt;user.y+=my/mag*speed*dt;tapTarget=null;moving=true;}
      else if(tapTarget){const d=dist(user,tapTarget);if(d<9)tapTarget=null;else{playerMove(user,tapTarget.x,tapTarget.y,speed,dt);moving=true;}}
      user.x=clamp(user.x,24,W-24);user.y=clamp(user.y,24,H-24);
      if(moving)game.stamina=clamp(game.stamina-dt*(driveHeld?1.42:.46),15,100);else game.stamina=clamp(game.stamina+dt*.34,15,100);
      if(user.cutTimer>0)user.cutTimer-=dt;if(user.screenTimer>0)user.screenTimer-=dt;else user.screening=false;
      if(user.actionCooldown>0)user.actionCooldown-=dt;if(user.shootCooldown>0)user.shootCooldown-=dt;
      if(user.hasBall){ball.x=user.x+(attackRightFor(userTeam)?9:-9);ball.y=user.y+8;}
    }

    function updateAI(p,dt){
      if(p===user)return;
      if(p.actionCooldown>0)p.actionCooldown-=dt;if(p.shootCooldown>0)p.shootCooldown-=dt;
      if(p.screenTimer>0)p.screenTimer-=dt;else p.screening=false;
      const isOffense=p.team===possession;
      const h=ball.holder;
      const speed=104 + (p.team===oppTeam?game.opponent.strength*.42:overall(state.player.attrs)*.38);
      if(isOffense){
        if(p.hasBall){
          const b=basket(p.team),d=dist(p,b),def=nearestDefenderDistance(p);
          if(inboundDelay>0)return;
          if(p.shootCooldown<=0 && ((d<135&&chance(.011))||(d<280&&def>52&&chance(.0065)))){attemptShot(p,.58,false);return;}
          if(chance(.006) && def<42){passFrom(p,false);return;}
          const laneY=H/2 + (p.role-2)*27;const tx=b.x+(attackRightFor(p.team)?-125:125);
          playerMove(p,tx,laneY,speed,dt);
        }else{
          let t=p.target||formation(p.team,p.role);
          if(p.screening&&h){t=p.target||{x:h.x+(attackRightFor(p.team)?-26:26),y:h.y+35};}
          // transition until offense reaches frontcourt
          if(h){const mid=W/2;const hFront=attackRightFor(p.team)?h.x>mid:h.x<mid;if(!hFront){const ahead=attackRightFor(p.team)?110:-110;t={x:clamp(h.x+ahead,50,W-50),y:formation(p.team,p.role).y};}}
          playerMove(p,t.x,t.y,speed*.93,dt);
        }
      }else{
        const assignment=p.defend||nearest(players.filter(x=>x.team!==p.team),p);
        if(assignment){
          const protect=basket(possession);const dx=protect.x-assignment.x,dy=protect.y-assignment.y,d=Math.hypot(dx,dy)||1;
          const gap=assignment.hasBall?30:42;const tx=assignment.x+dx/d*gap,ty=assignment.y+dy/d*gap;
          playerMove(p,tx,ty,speed*1.02,dt);
          if(assignment.hasBall&&dist(p,assignment)<27&&chance(.0015+(p.team===oppTeam?game.opponent.strength:state.player.attrs.Defense)/70000)){
            if(assignment===user){game.stats.tov++;enginePbp('Ball gets poked free — turnover.');}
            changePossession(p.team,p);
          }
        }
      }
    }

    function updateBall(dt){
      if(ball.holder){ball.x=ball.holder.x+(attackRightFor(ball.holder.team)?9:-9);ball.y=ball.holder.y+7;return}
      const f=ball.flight;if(!f)return;
      f.progress+=dt*f.speed;
      const t=clamp(f.progress,0,1);
      if(f.type==='pass'){
        ball.x=f.fromX+(f.to.x-f.fromX)*t;ball.y=f.fromY+(f.to.y-f.fromY)*t - Math.sin(t*Math.PI)*18;
        if(t>=1){
          // passing lane interception check
          const defender=nearest(players.filter(p=>p.team!==f.to.team),f.to);
          if(defender&&dist(defender,f.to)<25&&chance(.10+(defender.team===oppTeam?game.opponent.strength:state.player.attrs.Defense)/520)){
            if(f.byUser){game.stats.tov++;enginePbp('Passing lane jumped — turnover.');}
            changePossession(defender.team,defender);
          }else{giveBall(f.to);renderActionButtons();}
        }
      }else if(f.type==='shot'){
        const sx=f.startX,sy=f.startY;ball.x=sx+(f.toX-sx)*t;ball.y=sy+(f.toY-sy)*t-Math.sin(t*Math.PI)*100;
        if(t>=1){ball.flight=null;ball.x=f.toX;ball.y=f.toY;resolveShot(f);}
      }
    }

    function updateClock(dt){
      if(performance.now()<pausedUntil)return;
      inboundDelay=Math.max(0,inboundDelay-dt);
      const gdt=dt*timeScale;game.clock-=gdt;shotClock-=gdt;gameElapsedReal+=dt;
      if(shotClock<=0){enginePbp('Shot clock violation.');changePossession(possession===userTeam?oppTeam:userTeam);shotClock=30;}
      if(game.clock<=0){
        if(game.quarter<4){
          game.quarter++;game.clock=state.settings.quarter*60;game.stamina=clamp(game.stamina+17,20,100);shotClock=30;pausedUntil=performance.now()+900;
          enginePbp(`Quarter ${game.quarter} begins.`);resetForQuarter();
        }else if(game.quarter===4){
          if(game.userScore===game.oppScore){game.quarter=5;game.clock=120;shotClock=30;enginePbp('OVERTIME — two-minute extra period.');resetForQuarter();}
          else{finishGame();return;}
        }else{
          if(game.userScore===game.oppScore){game.clock=120;shotClock=30;enginePbp('Another overtime period.');resetForQuarter();}
          else{finishGame();return;}
        }
      }
    }

    function resetForQuarter(){
      possession=chance(.5)?userTeam:oppTeam;players.forEach(p=>{const f=formation(p.team,p.role);p.x=f.x;p.y=f.y;p.target=null;p.hasBall=false;});giveBall(players.find(p=>p.team===possession&&p.role===0));renderActionButtons();
    }

    function maybeAIEvents(dt){
      if(performance.now()<pausedUntil||ball.flight)return;
      // user team's AI ball handler can look for the user's movement/cuts
      const h=ball.holder;
      if(h&&h.team===userTeam&&h!==user&&chance(.0038) && nearestDefenderDistance(user)>42){passTo(h,user,false);}
      // opponent uses passes to avoid static possessions
      if(h&&h.team===oppTeam&&chance(.0045)){passFrom(h,false);}
      // teammate pass cycles
      if(h&&h.team===userTeam&&h!==user&&chance(.004)){passFrom(h,false);}
    }

    function drawCourt(){
      const c=ctx;c.clearRect(0,0,W,H);
      // hardwood stripes
      c.fillStyle='#b88250';c.fillRect(0,0,W,H);
      for(let x=0;x<W;x+=47){c.fillStyle=(x/47)%2?'rgba(255,255,255,.035)':'rgba(70,35,15,.035)';c.fillRect(x,0,47,H)}
      c.strokeStyle='rgba(255,255,255,.82)';c.lineWidth=3;c.strokeRect(18,18,W-36,H-36);
      c.beginPath();c.moveTo(W/2,18);c.lineTo(W/2,H-18);c.stroke();
      c.beginPath();c.arc(W/2,H/2,62,0,Math.PI*2);c.stroke();
      c.fillStyle='rgba(130,20,30,.10)';c.fillRect(18,H/2-92,170,184);c.fillRect(W-188,H/2-92,170,184);
      c.strokeRect(18,H/2-92,170,184);c.strokeRect(W-188,H/2-92,170,184);
      c.beginPath();c.arc(188,H/2,62,-Math.PI/2,Math.PI/2);c.stroke();c.beginPath();c.arc(W-188,H/2,62,Math.PI/2,Math.PI*1.5);c.stroke();
      // three point arcs + baseline segments
      c.beginPath();c.arc(52,H/2,238,-1.16,1.16);c.stroke();c.beginPath();c.arc(W-52,H/2,238,Math.PI-1.16,Math.PI+1.16);c.stroke();
      // rims/backboards
      [52,W-52].forEach(x=>{c.strokeStyle='#f4f4ef';c.lineWidth=5;c.beginPath();c.moveTo(x+(x<W/2?-9:9),H/2-40);c.lineTo(x+(x<W/2?-9:9),H/2+40);c.stroke();c.strokeStyle='#d4453d';c.lineWidth=4;c.beginPath();c.arc(x,H/2,10,0,Math.PI*2);c.stroke();});
      c.fillStyle='rgba(255,255,255,.26)';c.font='900 54px Impact,Arial';c.textAlign='center';c.fillText('4DK',W/2,H/2+18);
    }

    function screenPoint(p){
      if(state.settings.camera!=='Angled')return{x:p.x,y:p.y};
      // visual perspective only; canvas CSS supplies the heavy angle. Subtle size-depth shift here.
      return{x:p.x,y:p.y};
    }
    function drawPlayers(){
      const sorted=players.slice().sort((a,b)=>a.y-b.y);
      sorted.forEach(p=>{
        const q=screenPoint(p),home=p.team===userTeam;
        ctx.beginPath();ctx.fillStyle=home?'#e93142':'#e7e9ed';ctx.strokeStyle=p===user?'#ffd96f':home?'#77151d':'#596473';ctx.lineWidth=p===user?5:3;ctx.arc(q.x,q.y,p.r,0,Math.PI*2);ctx.fill();ctx.stroke();
        if(p.screening){ctx.strokeStyle='rgba(255,217,111,.65)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,p.r+6,0,Math.PI*2);ctx.stroke();}
        ctx.fillStyle=home?'#fff':'#111';ctx.font='900 8px Arial';ctx.textAlign='center';ctx.fillText(p===user?String(state.player.number):String(p.role+1),q.x,q.y+3);
        if(p===user){ctx.fillStyle='#ffd96f';ctx.beginPath();ctx.moveTo(q.x,q.y-28);ctx.lineTo(q.x-7,q.y-39);ctx.lineTo(q.x+7,q.y-39);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.font='900 9px Arial';ctx.fillText(state.player.name.split(' ')[0].toUpperCase(),q.x,q.y+29);}
      });
      if(ball){ctx.beginPath();ctx.fillStyle='#df7d2f';ctx.strokeStyle='#44210c';ctx.lineWidth=2;ctx.arc(ball.x,ball.y,7,0,Math.PI*2);ctx.fill();ctx.stroke();}
      if(contestFlash>0){ctx.strokeStyle='rgba(120,190,255,.7)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(user.x,user.y,28+contestFlash*8,0,Math.PI*2);ctx.stroke();}
      if(tapTarget&&state.settings.controlMode==='Tap'){ctx.strokeStyle='rgba(255,217,111,.85)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(tapTarget.x,tapTarget.y,13,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(tapTarget.x-7,tapTarget.y);ctx.lineTo(tapTarget.x+7,tapTarget.y);ctx.moveTo(tapTarget.x,tapTarget.y-7);ctx.lineTo(tapTarget.x,tapTarget.y+7);ctx.stroke();}
    }
    function draw(){drawCourt();drawPlayers();}

    function loop(now){
      if(!running)return;let dt=Math.min(.035,(now-last)/1000||.016);last=now;
      if(!game.over){
        updateClock(dt);if(game.over)return;
        updateUser(dt);players.forEach(p=>updateAI(p,dt));updateBall(dt);maybeAIEvents(dt);
        if(charging){shotCharge+=dt*1.05;if(shotCharge>1.08)shotCharge=.12;$('shotMeterFill').style.width=`${clamp(shotCharge,0,1)*100}%`;}
        contestFlash=Math.max(0,contestFlash-dt*1.7);
        scoreboard();draw();
      }
      raf=requestAnimationFrame(loop);
    }

    function courtPointer(e){
      if(state.settings.controlMode!=='Tap')return;
      if(e.target.closest?.('.mc-joystick'))return;
      const r=canvas.getBoundingClientRect();
      let x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;
      // CSS angled view means visual y is compressed; approximate inverse toward center.
      if(state.settings.camera==='Angled')y=H/2+(y-H/2)/.82;
      tapTarget={x:clamp(x,25,W-25),y:clamp(y,25,H-25)};
    }
    canvas.addEventListener('pointerdown',courtPointer);
    const kd=e=>{if(['ArrowUp','w','W'].includes(e.key))key.up=true;if(['ArrowDown','s','S'].includes(e.key))key.down=true;if(['ArrowLeft','a','A'].includes(e.key))key.left=true;if(['ArrowRight','d','D'].includes(e.key))key.right=true;};
    const ku=e=>{if(['ArrowUp','w','W'].includes(e.key))key.up=false;if(['ArrowDown','s','S'].includes(e.key))key.down=false;if(['ArrowLeft','a','A'].includes(e.key))key.left=false;if(['ArrowRight','d','D'].includes(e.key))key.right=false;};
    window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);

    setupControls();scoreboard();renderPbp();renderActionButtons();
    raf=requestAnimationFrame(loop);
    courtEngine={
      stop(){running=false;cancelAnimationFrame(raf);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);driveHeld=false;charging=false;},
      sync(){scoreboard();draw();}
    };
  }

  function stopCourtEngine(){
    if(courtEngine){try{courtEngine.stop()}catch(e){}courtEngine=null;}
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
    ensureStateCompatibility();
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
  ensureStateCompatibility();
  fillBodyOptions();
  updateArchetypes();
  $('continueCareerBtn').disabled=!state;
  if(state && state.career?.committed){
    $('continueCareerBtn').textContent='VIEW COMMITMENT';
  }
})();
