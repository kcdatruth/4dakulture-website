(()=>{const P=(location.pathname||'').toLowerCase();if(!P.endsWith('/nfl.html')&&!P.endsWith('/nfl'))return;
const teamAbbr={
'San Francisco 49ers':'sf','Buffalo Bills':'buf','Kansas City Chiefs':'kc','Minnesota Vikings':'min','Las Vegas Raiders':'lv','Denver Broncos':'den','Jacksonville Jaguars':'jax','Baltimore Ravens':'bal','Detroit Lions':'det','Seattle Seahawks':'sea','Los Angeles Rams':'lar','Pittsburgh Steelers':'pit','Chicago Bears':'chi','Philadelphia Eagles':'phi','Cincinnati Bengals':'cin','Dallas Cowboys':'dal','New York Giants':'nyg','Cleveland Browns':'cle','Atlanta Falcons':'atl','Washington Commanders':'wsh','New Orleans Saints':'no','Carolina Panthers':'car','Green Bay Packers':'gb','Indianapolis Colts':'ind','New York Jets':'nyj','Arizona Cardinals':'ari','New England Patriots':'ne','Houston Texans':'hou','Los Angeles Chargers':'lac','Tampa Bay Buccaneers':'tb','Tennessee Titans':'ten','Miami Dolphins':'mia'};
const playerImg={
'Brock Purdy':'https://a.espncdn.com/i/headshots/nfl/players/full/4361741.png',
'Josh Allen':'https://a.espncdn.com/i/headshots/nfl/players/full/3918298.png',
'Patrick Mahomes':'https://a.espncdn.com/i/headshots/nfl/players/full/3139477.png',
'Kirk Cousins':'https://a.espncdn.com/i/headshots/nfl/players/full/14880.png',
'Jared Goff':'https://a.espncdn.com/i/headshots/nfl/players/full/3046779.png',
'Trevor Lawrence':'https://a.espncdn.com/i/headshots/nfl/players/full/4360310.png',
'Lamar Jackson':'https://a.espncdn.com/i/headshots/nfl/players/full/3916387.png',
'Jahmyr Gibbs':'https://a.espncdn.com/i/headshots/nfl/players/full/4429795.png',
'Kenneth Walker III':'https://a.espncdn.com/i/headshots/nfl/players/full/4567048.png',
'Dak Prescott':'https://a.espncdn.com/i/headshots/nfl/players/full/2577417.png',
'Jeremiyah Love':'https://a.espncdn.com/i/headshots/college-football/players/full/4870808.png',
'Kenyon Sadiq':'https://a.espncdn.com/i/headshots/college-football/players/full/5083315.png',
'Hezekiah Masses':'https://a.espncdn.com/i/headshots/college-football/players/full/4917354.png',
'Jaishawn Barham':'https://a.espncdn.com/i/headshots/college-football/players/full/4685266.png',
'Genesis Smith':'https://a.espncdn.com/i/headshots/college-football/players/full/4950551.png',
'Antonio Williams':'https://a.espncdn.com/i/headshots/college-football/players/full/5081432.png',
'Denzel Boston':'https://a.espncdn.com/i/headshots/college-football/players/full/4832800.png',
'Jadarian Price':'https://a.espncdn.com/i/headshots/college-football/players/full/4685512.png',
'Arvell Reese':'https://a.espncdn.com/i/headshots/college-football/players/full/4950400.png',
'Caleb Downs':'https://a.espncdn.com/i/headshots/college-football/players/full/4870706.png'};
function css(){if(document.getElementById('w4visualcss'))return;const s=document.createElement('style');s.id='w4visualcss';s.textContent=`
#w4rank .w4row>div:nth-child(2){display:grid;grid-template-columns:46px 1fr;grid-template-areas:"logo name" "logo meta";column-gap:12px;align-items:center}
#w4rank .w4teamlogo{grid-area:logo;width:42px;height:42px;object-fit:contain;background:#171c18;border:1px solid #343b35;border-radius:50%;padding:5px}
#w4rank .w4row h3{grid-area:name;align-self:end}#w4rank .w4row small{grid-area:meta;align-self:start}
#w4mvp .w4row>div:nth-child(2),#w4rook .w4row>div:nth-child(2){position:relative;padding-left:86px;min-height:78px}
.w4playerpic{position:absolute;left:0;top:0;width:70px;height:70px;object-fit:cover;object-position:center top;border-radius:12px;border:1px solid #3a413b;background:#171c18}
@media(max-width:520px){#w4rank .w4row>div:nth-child(2){grid-template-columns:38px 1fr;column-gap:9px}.w4teamlogo{width:36px!important;height:36px!important}.w4playerpic{width:62px;height:62px}.w4row>div:nth-child(2){padding-left:74px!important}}
`;document.head.appendChild(s)}
function add(){
 css();
 document.querySelectorAll('#w4rank .w4row').forEach(card=>{const box=card.children[1],h=box?.querySelector('h3');if(!box||!h||box.querySelector('.w4teamlogo'))return;const ab=teamAbbr[h.textContent.trim()];if(!ab)return;const img=document.createElement('img');img.className='w4teamlogo';img.alt=h.textContent.trim()+' logo';img.loading='lazy';img.src=`https://a.espncdn.com/i/teamlogos/nfl/500/${ab}.png`;box.prepend(img)});
 ['#w4mvp .w4row','#w4rook .w4row'].forEach(sel=>document.querySelectorAll(sel).forEach(card=>{const box=card.children[1],h=box?.querySelector('h3');if(!box||!h||box.querySelector('.w4playerpic'))return;const src=playerImg[h.textContent.trim()];if(!src)return;const img=document.createElement('img');img.className='w4playerpic';img.alt=h.textContent.trim();img.loading='lazy';img.src=src;img.onerror=()=>img.remove();box.prepend(img)}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();
[250,700,1400,2600,4500,7000,10500].forEach(t=>setTimeout(add,t));
let lock=false;new MutationObserver(()=>{if(lock)return;lock=true;setTimeout(()=>{add();lock=false},100)}).observe(document.documentElement,{childList:true,subtree:true});
})();