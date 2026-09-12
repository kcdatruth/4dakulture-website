(() => {
  const page = location.pathname.split('/').pop().toLowerCase();
  const league = (page === 'nba.html' || page === 'nba') ? 'nba' :
                 (page === 'nfl.html' || page === 'nfl') ? 'nfl' : null;
  if(!league || document.getElementById('fourdkPowerRankings')) return;

  /* ==========================================================
     4DK WEEKLY POWER RANKINGS — EDIT ZONE
     For weekly updates, only this data block needs to change.
     prev = previous week's rank. null = preseason/new baseline.
     ========================================================== */
  const BOARDS = {
    nba: {
      label: 'PRESEASON BASELINE',
      updated: 'SEPTEMBER 11, 2026',
      total: 30,
      subhead: "Built from Kcdatruth's 2026–27 preview: OKC over Philly in the Finals, the Knicks defending the crown, and the new power centers in Minnesota, San Antonio and Miami.",
      teams: [
        {team:'Oklahoma City Thunder', abbr:'OKC', prev:null, meta:'4DK Finals pick: OKC in 7', note:'Still the team to beat. The deepest roster on the board gets the preseason No. 1.'},
        {team:'Philadelphia 76ers', abbr:'PHI', prev:null, meta:'4DK East champion pick', note:'LeBron, Jaylen Brown and Maxey make this a win-now team with Finals expectations.'},
        {team:'New York Knicks', abbr:'NYK', prev:null, meta:'Defending champions', note:'The crown matters. Until somebody knocks them off, New York stays near the top.'},
        {team:'Minnesota Timberwolves', abbr:'MIN', prev:null, meta:'Ant + LaMelo era', note:'Anthony Edwards has more creation beside him and the ceiling is championship-level.'},
        {team:'San Antonio Spurs', abbr:'SAS', prev:null, meta:'Wemby leap incoming', note:'A deeper roster around Wembanyama makes San Antonio one of the league’s biggest risers.'},
        {team:'Miami Heat', abbr:'MIA', prev:null, meta:'The Giannis effect', note:'Adding Giannis changes the floor and ceiling immediately. Miami is back in the title picture.'},
        {team:'Denver Nuggets', abbr:'DEN', prev:null, meta:'Jokic still sets the standard', note:'The West is deeper, but a Jokic-led team still deserves contender respect every week.'},
        {team:'Los Angeles Lakers', abbr:'LAL', prev:null, meta:'Luka leads the new era', note:'Luka is the 4DK MVP pick and the Lakers enter the year with real title expectations.'},
        {team:'Cleveland Cavaliers', abbr:'CLE', prev:null, meta:'Still a problem in the East', note:'High-end talent and continuity keep Cleveland firmly in the upper tier.'},
        {team:'Boston Celtics', abbr:'BOS', prev:null, meta:'Retool and reload', note:'The roster changed, but Boston still has enough star power to stay dangerous.'},
        {team:'Houston Rockets', abbr:'HOU', prev:null, meta:'KD era begins', note:'Kevin Durant raises the ceiling of a roster that was already built to compete now.'},
        {team:'Toronto Raptors', abbr:'TOR', prev:null, meta:'Kawhi returns north', note:'Kawhi gives a young core a proven closer and pushes Toronto into the playoff-threat tier.'},
        {team:'Indiana Pacers', abbr:'IND', prev:null, meta:'Still built to run', note:'Indiana’s pace, guard play and continuity make them dangerous even in a reshaped East.'},
        {team:'Detroit Pistons', abbr:'DET', prev:null, meta:'Next step season', note:'The young core is ready for more responsibility and a real playoff push.'},
        {team:'Orlando Magic', abbr:'ORL', prev:null, meta:'Defense travels', note:'Orlando has the size and defensive identity to give better teams problems all year.'},
        {team:'Golden State Warriors', abbr:'GSW', prev:null, meta:'Veteran pressure', note:'The ceiling is still high when the stars are healthy, but the margin for error is smaller.'},
        {team:'Phoenix Suns', abbr:'PHX', prev:null, meta:'Prove-it year', note:'There is still enough scoring talent to climb quickly if the pieces finally fit.'},
        {team:'Dallas Mavericks', abbr:'DAL', prev:null, meta:'New chapter', note:'A changing roster leaves Dallas with upside, but more questions than the top West teams.'},
        {team:'Sacramento Kings', abbr:'SAC', prev:null, meta:'Play-in pressure', note:'Sacramento can score with people, but needs consistency to move into the West’s upper half.'},
        {team:'Memphis Grizzlies', abbr:'MEM', prev:null, meta:'Bounce-back watch', note:'There is enough talent here to move fast once the season gives us a clearer picture.'},
        {team:'LA Clippers', abbr:'LAC', prev:null, meta:'Franchise reset', note:'The Kawhi exit and offseason fallout leave the Clippers with more uncertainty than answers.'},
        {team:'New Orleans Pelicans', abbr:'NOP', prev:null, meta:'Health decides everything', note:'Talent is not the issue. Availability and week-to-week consistency are.'},
        {team:'Atlanta Hawks', abbr:'ATL', prev:null, meta:'Middle of the East', note:'Atlanta has enough offense to hang around, but needs a bigger two-way jump to rise.'},
        {team:'Chicago Bulls', abbr:'CHI', prev:null, meta:'Direction season', note:'The Bulls enter the year needing young players to establish a clearer long-term identity.'},
        {team:'Portland Trail Blazers', abbr:'POR', prev:null, meta:'Young core watch', note:'Development matters more than record right now, but the talent base is getting interesting.'},
        {team:'Utah Jazz', abbr:'UTA', prev:null, meta:'Darryn Peterson era', note:'The rookie spotlight is bright, but Utah is still building the roster around its future.'},
        {team:'Charlotte Hornets', abbr:'CHA', prev:null, meta:'Development first', note:'There are pieces to like, but proving they can hold up over 82 games comes first.'},
        {team:'Brooklyn Nets', abbr:'BKN', prev:null, meta:'Rebuild mode', note:'This season is more about discovering keepers than chasing the top of the East.'},
        {team:'Milwaukee Bucks', abbr:'MIL', prev:null, meta:'Post-Giannis rebuild', note:'The championship era is over and Milwaukee is beginning a very different chapter.'},
        {team:'Washington Wizards', abbr:'WAS', prev:null, meta:'Long-term build', note:'The priority is development, reps and figuring out which young pieces belong long term.'}
      ]
    },

    nfl: {
      label: 'PRESEASON BASELINE',
      updated: 'SEPTEMBER 11, 2026',
      total: 32,
      subhead: "Built from Kcdatruth's AFC and NFC season projections. Projected record is shown here as the preseason baseline; weekly results can move teams above or below that expectation.",
      teams: [
        {team:'Los Angeles Rams', abbr:'LAR', prev:null, meta:'Projected 14–3', note:'The biggest win-now roster in football. Your NFC No. 1 and the preseason team to beat.'},
        {team:'Denver Broncos', abbr:'DEN', prev:null, meta:'Projected 13–4', note:'Your AFC top regular-season team: Bo Nix, added speed and an elite defense.'},
        {team:'Detroit Lions', abbr:'DET', prev:null, meta:'Projected 13–4', note:'Still elite, still loaded and still capable of winning the NFC if the core stays healthy.'},
        {team:'Kansas City Chiefs', abbr:'KC', prev:null, meta:'Projected 12–5', note:'A revenge season with a healthy Mahomes is enough to keep Kansas City near the top.'},
        {team:'Buffalo Bills', abbr:'BUF', prev:null, meta:'Projected 12–5', note:'Josh Allen keeps the Super Bowl window wide open even through a new coaching chapter.'},
        {team:'Seattle Seahawks', abbr:'SEA', prev:null, meta:'Projected 12–5', note:'The defending champs lost pieces, not their identity. Another deep run is in play.'},
        {team:'San Francisco 49ers', abbr:'SF', prev:null, meta:'Projected 12–5', note:'Your read is simple: if the 49ers stay healthy, they can beat anybody.'},
        {team:'Chicago Bears', abbr:'CHI', prev:null, meta:'Projected 12–5', note:'A Caleb Williams superstar leap plus a winning defense makes Chicago a real NFC threat.'},
        {team:'Philadelphia Eagles', abbr:'PHI', prev:null, meta:'Projected 11–6', note:'Hurts, Barkley and a loaded defense keep Philadelphia in the title conversation.'},
        {team:'Cincinnati Bengals', abbr:'CIN', prev:null, meta:'Projected 11–6', note:'Burrow, Chase and Higgins give Cincinnati one of the league’s highest offensive ceilings.'},
        {team:'Houston Texans', abbr:'HOU', prev:null, meta:'Projected 11–6', note:'Houston remains your AFC South winner and has enough high-end talent to make a run.'},
        {team:'New England Patriots', abbr:'NE', prev:null, meta:'Projected 11–6', note:'Coming off a Super Bowl appearance, New England still profiles as a serious AFC threat.'},
        {team:'Baltimore Ravens', abbr:'BAL', prev:null, meta:'Projected 10–7', note:'Lamar keeps the floor high. If the defense stabilizes, Baltimore can outperform this slot.'},
        {team:'Carolina Panthers', abbr:'CAR', prev:null, meta:'Projected 10–7', note:'Your sleeper NFC South winner. Bryce Young’s next step could make this ranking look low.'},
        {team:'Jacksonville Jaguars', abbr:'JAX', prev:null, meta:'Projected 10–7', note:'Your first AFC team out of the playoffs — close enough to jump quickly with a hot start.'},
        {team:'Dallas Cowboys', abbr:'DAL', prev:null, meta:'Projected 10–7', note:'The passing-game talent is real; the defense decides whether Dallas climbs into contender territory.'},
        {team:'Los Angeles Chargers', abbr:'LAC', prev:null, meta:'Projected 9–8', note:'Too talented to dismiss, but you want Herbert and company to prove they belong with the elite.'},
        {team:'Pittsburgh Steelers', abbr:'PIT', prev:null, meta:'Projected 9–8', note:'The defense keeps the floor respectable, but the offensive ceiling remains the question.'},
        {team:'Indianapolis Colts', abbr:'IND', prev:null, meta:'Projected 9–8', note:'Jonathan Taylor gives Indy a foundation; quarterback play will determine everything else.'},
        {team:'New York Giants', abbr:'NYG', prev:null, meta:'Projected 9–8', note:'Jaxson Dart plus John Harbaugh gives New York legitimate surprise-team potential.'},
        {team:'Green Bay Packers', abbr:'GB', prev:null, meta:'Projected 9–8', note:'The ceiling is higher than this rank, but your preview flagged availability as the big concern.'},
        {team:'Tampa Bay Buccaneers', abbr:'TB', prev:null, meta:'Projected 9–8', note:'Still dangerous and well coached, but sitting just behind Carolina in your NFC South call.'},
        {team:'Washington Commanders', abbr:'WAS', prev:null, meta:'Projected 8–9', note:'A response season for Jayden Daniels. Washington can rise fast if the bounce-back is real.'},
        {team:'Atlanta Falcons', abbr:'ATL', prev:null, meta:'Projected 8–9', note:'Bijan gives them a floor, but the quarterback situation determines the ceiling.'},
        {team:'Miami Dolphins', abbr:'MIA', prev:null, meta:'Projected 8–9', note:'A new quarterback chapter makes Miami one of the harder teams to trust before the games settle in.'},
        {team:'Minnesota Vikings', abbr:'MIN', prev:null, meta:'Projected 7–10', note:'There is talent around Kyler Murray, but your loaded NFC North keeps the projection modest.'},
        {team:'Las Vegas Raiders', abbr:'LV', prev:null, meta:'Projected 6–11', note:'Cousins is the bridge and Mendoza is the future. The ranking can rise if the timeline accelerates.'},
        {team:'New Orleans Saints', abbr:'NO', prev:null, meta:'Projected 6–11', note:'A transition year centered on Tyler Shough and identifying the pieces for the next core.'},
        {team:'Tennessee Titans', abbr:'TEN', prev:null, meta:'Projected 5–12', note:'The record matters less than Cam Ward’s development in the first year of a new direction.'},
        {team:'New York Jets', abbr:'NYJ', prev:null, meta:'Projected 5–12', note:'Another development year, with the quarterback plan likely to evolve as the season goes.'},
        {team:'Cleveland Browns', abbr:'CLE', prev:null, meta:'Projected 4–13', note:'Your preview expects a quarterback transition and a season focused more on the future.'},
        {team:'Arizona Cardinals', abbr:'ARI', prev:null, meta:'Projected 4–13', note:'A development season around young talent leaves Arizona at the bottom of the preseason board.'}
      ]
    }
  };

  const board = BOARDS[league];
  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  const style = document.createElement('style');
  style.id = 'fourdkPowerRankingsStyles';
  style.textContent = `
    .fourdk-power-rankings{
      --pr-accent:${league === 'nba' ? '#ef6130' : '#d52b35'};
      --pr-accent2:${league === 'nba' ? '#f0a62a' : '#3d79b8'};
      background:#080a0d;color:#fff;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);
      position:relative;overflow:hidden
    }
    .fourdk-power-rankings:before{
      content:'POWER';position:absolute;right:-24px;top:-30px;color:#fff;opacity:.025;
      font:1000 clamp(110px,22vw,300px)/.8 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;
      letter-spacing:-.06em;pointer-events:none
    }
    .pr-shell{max-width:1180px;margin:0 auto;padding:48px 20px;position:relative;z-index:1}
    .pr-top{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:end;margin-bottom:24px}
    .pr-kicker{font-size:10px;font-weight:1000;letter-spacing:.18em;text-transform:uppercase;color:var(--pr-accent)}
    .pr-title{margin:8px 0 10px;font:1000 clamp(40px,7vw,78px)/.88 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;letter-spacing:-.035em;text-transform:uppercase}
    .pr-deck{max-width:760px;margin:0;color:#b8c0c8;font-size:14px;line-height:1.55}
    .pr-stamp{text-align:right;border-left:3px solid var(--pr-accent);padding-left:18px;text-transform:uppercase}
    .pr-stamp strong{display:block;font-size:13px;letter-spacing:.1em}
    .pr-stamp span{display:block;margin-top:5px;color:#929ca5;font-size:10px;letter-spacing:.1em}
    .pr-top3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}
    .pr-podium{background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.11);padding:18px;min-height:150px;position:relative;overflow:hidden}
    .pr-podium:after{content:attr(data-rank);position:absolute;right:-2px;bottom:-18px;font:1000 96px/1 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;color:#fff;opacity:.045}
    .pr-podium small{display:block;color:var(--pr-accent);font-size:9px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
    .pr-podium b{display:block;margin-top:9px;font-size:20px;line-height:1.05}
    .pr-podium span{display:block;margin-top:7px;color:#a9b1b8;font-size:11px}
    .pr-board{border-top:3px solid var(--pr-accent);background:#0d1115}
    .pr-row{display:grid;grid-template-columns:62px minmax(190px,.9fr) 150px 1.5fr 74px;gap:16px;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.075)}
    .pr-row:hover{background:rgba(255,255,255,.025)}
    .pr-rank{font:1000 31px/1 Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;color:#fff}
    .pr-team{display:flex;align-items:center;gap:12px;min-width:0}
    .pr-badge{width:42px;height:42px;display:grid;place-items:center;flex:0 0 42px;border-radius:50%;background:#161d24;border:1px solid rgba(255,255,255,.14);font-size:10px;font-weight:1000;letter-spacing:.04em;color:#fff}
    .pr-team b{display:block;font-size:14px;line-height:1.15}
    .pr-team small{display:block;margin-top:4px;color:#7f8a94;font-size:9px;text-transform:uppercase;letter-spacing:.08em}
    .pr-meta{font-size:10px;font-weight:900;color:var(--pr-accent2);text-transform:uppercase;letter-spacing:.06em}
    .pr-note{color:#aeb7bf;font-size:12px;line-height:1.4}
    .pr-move{justify-self:end;min-width:56px;text-align:center;border:1px solid rgba(255,255,255,.12);padding:6px 7px;font-size:9px;font-weight:1000;letter-spacing:.08em;color:#8f9aa4}
    .pr-move.up{color:#6dd39e;border-color:rgba(109,211,158,.25)}
    .pr-move.down{color:#ff7e7e;border-color:rgba(255,126,126,.25)}
    .pr-extra{display:none}
    .pr-board.expanded .pr-extra{display:grid}
    .pr-actions{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-top:18px}
    .pr-toggle{border:1px solid var(--pr-accent);background:var(--pr-accent);color:#fff;padding:12px 16px;font-size:10px;font-weight:1000;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
    .pr-note-bottom{margin:0;color:#818b94;font-size:10px;line-height:1.45;max-width:720px}
    @media(max-width:820px){
      .pr-top{grid-template-columns:1fr}.pr-stamp{text-align:left}.pr-top3{grid-template-columns:1fr}
      .pr-podium{min-height:auto}.pr-row{grid-template-columns:46px 1fr 62px;gap:10px}
      .pr-meta{grid-column:2}.pr-note{grid-column:2 / 4}.pr-move{grid-column:3;grid-row:1 / 3;align-self:center}
      .pr-rank{font-size:26px}.pr-actions{align-items:flex-start;flex-direction:column}.pr-toggle{width:100%}
    }
  `;
  document.head.appendChild(style);

  function movement(team, rank){
    if(team.prev == null) return {text:'BASE', cls:''};
    const delta = team.prev - rank;
    if(delta > 0) return {text:`↑ ${delta}`, cls:'up'};
    if(delta < 0) return {text:`↓ ${Math.abs(delta)}`, cls:'down'};
    return {text:'—', cls:''};
  }

  const section = document.createElement('section');
  section.className = `fourdk-power-rankings ${league}`;
  section.id = 'power-rankings';
  section.innerHTML = `
    <div class="pr-shell">
      <div class="pr-top">
        <div>
          <div class="pr-kicker">4DK ${league.toUpperCase()} • WEEKLY BOARD</div>
          <h2 class="pr-title">4DK POWER<br>RANKINGS.</h2>
          <p class="pr-deck">${esc(board.subhead)}</p>
        </div>
        <div class="pr-stamp"><strong>${esc(board.label)}</strong><span>UPDATED ${esc(board.updated)}</span></div>
      </div>

      <div class="pr-top3">
        ${board.teams.slice(0,3).map((t,i)=>`<article class="pr-podium" data-rank="${i+1}"><small>#${i+1} • ${esc(t.abbr)}</small><b>${esc(t.team)}</b><span>${esc(t.note)}</span></article>`).join('')}
      </div>

      <div class="pr-board" data-pr-board>
        ${board.teams.map((t,i)=>{
          const rank=i+1, move=movement(t,rank);
          return `<article class="pr-row ${i>=10?'pr-extra':''}">
            <div class="pr-rank">${rank}</div>
            <div class="pr-team"><span class="pr-badge">${esc(t.abbr)}</span><span><b>${esc(t.team)}</b><small>${league.toUpperCase()} POWER BOARD</small></span></div>
            <div class="pr-meta">${esc(t.meta)}</div>
            <div class="pr-note">${esc(t.note)}</div>
            <div class="pr-move ${move.cls}">${move.text}</div>
          </article>`;
        }).join('')}
      </div>

      <div class="pr-actions">
        <button class="pr-toggle" type="button" data-pr-toggle>SHOW ALL ${board.total} TEAMS ↓</button>
        <p class="pr-note-bottom">4DK power rankings are opinion-based. Record matters, but form, injuries, matchup quality, roster strength and championship ceiling matter too. Weekly movement begins after the first full slate.</p>
      </div>
    </div>`;

  if(league === 'nba'){
    const target = document.querySelector('.nba-season-feature') || document.querySelector('.nba-pulse');
    if(target) target.after(section);
    else document.querySelector('main')?.prepend(section);

    const nav = document.querySelector('.nba-hero-nav');
    if(nav && !nav.querySelector('a[href="#power-rankings"]')){
      const a=document.createElement('a'); a.href='#power-rankings'; a.textContent='Power Rankings'; nav.appendChild(a);
    }
  }else{
    const target = document.querySelector('#scoreboard') || document.querySelector('.nfl-v2-hero');
    if(target) target.after(section);
    else document.querySelector('main')?.prepend(section);

    const nav = document.querySelector('.nfl-v2-nav');
    if(nav && !nav.querySelector('a[href="#power-rankings"]')){
      const a=document.createElement('a'); a.href='#power-rankings'; a.textContent='Power Rankings';
      const scores=nav.querySelector('a[href="#scoreboard"]');
      scores?.after(a) || nav.appendChild(a);
    }
  }

  const boardEl = section.querySelector('[data-pr-board]');
  const toggle = section.querySelector('[data-pr-toggle]');
  toggle?.addEventListener('click',()=>{
    const expanded=boardEl.classList.toggle('expanded');
    toggle.textContent=expanded ? 'SHOW TOP 10 ↑' : `SHOW ALL ${board.total} TEAMS ↓`;
  });
})();
