(()=>{const p=(location.pathname||'').toLowerCase();if(!p.endsWith('/nfl.html')&&!p.endsWith('/nfl'))return;
const team={'San Francisco 49ers':'SF','Buffalo Bills':'BUF','Kansas City Chiefs':'KC','Minnesota Vikings':'MIN','Las Vegas Raiders':'LV','Denver Broncos':'DEN','Jacksonville Jaguars':'JAX','Baltimore Ravens':'BAL','Detroit Lions':'DET','Seattle Seahawks':'SEA','Los Angeles Rams':'LA','Pittsburgh Steelers':'PIT','Chicago Bears':'CHI','Philadelphia Eagles':'PHI','Cincinnati Bengals':'CIN','Dallas Cowboys':'DAL','New York Giants':'NYG','Cleveland Browns':'CLE','Atlanta Falcons':'ATL','Washington Commanders':'WAS','New Orleans Saints':'NO','Carolina Panthers':'CAR','Green Bay Packers':'GB','Indianapolis Colts':'IND','New York Jets':'NYJ','Arizona Cardinals':'ARI','New England Patriots':'NE','Houston Texans':'HOU','Los Angeles Chargers':'LAC','Tampa Bay Buccaneers':'TB','Tennessee Titans':'TEN','Miami Dolphins':'MIA'};
const pic={
'Brock Purdy':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/xs2fyj1sqdgwvt9ihbri',
'Josh Allen':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/mjwbioajzldkq1vzoz2d',
'Patrick Mahomes':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/wdckwtob1lybvkmxnf7p',
'Kirk Cousins':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/za7cynvpwlsro1tsaijk',
'Jared Goff':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/kaicbot8qhzrvddilbtp',
'Trevor Lawrence':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/k9uzdernqkx7oquy7dkg',
'Lamar Jackson':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/eno6s5qzl9grbfbfwhoa',
'Jahmyr Gibbs':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/cursejnmmp1i9hnxihkj',
'Kenneth Walker III':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/vk6nruaqdewdglofcwwg',
'Dak Prescott':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/yvscmqq1qki8zfsemmcd',
'Jeremiyah Love':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/b12gtjsylmql5v7iyyla',
'Kenyon Sadiq':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/mnswulwto4yqkgmugoiq',
'Hezekiah Masses':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/ba2rfnspviherhdlsxml',
'Jaishawn Barham':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/h35ij5cb5g5a8av170ca',
'Genesis Smith':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/xaausvzp0c7hyqgiqdbr',
'Antonio Williams':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/noywrsgaqoqlv64c12yw',
'Denzel Boston':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/ybkny6eh5eegq3bqmony',
'Jadarian Price':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/toy90i08oumgbdlvctja',
'Arvell Reese':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/tvhqfy34evkal6zpu9to',
'Caleb Downs':'https://static.www.nfl.com/image/upload/t_player_profile_landscape/f_auto/league/nkj0yjytmlcbciqjus0w'};
function css(){if(document.getElementById('w4officialvisualcss'))return;let s=document.createElement('style');s.id='w4officialvisualcss';s.textContent=`
#w4rank .w4row>div:nth-child(2),#w4mvp .w4row>div:nth-child(2),#w4rook .w4row>div:nth-child(2){padding-left:0!important;display:block!important;position:relative!important;min-height:0!important}
.w4officialimg{display:none!important}
#w4rank .w4row.has-official-team>div:nth-child(2){display:grid!important;grid-template-columns:48px minmax(0,1fr)!important;grid-template-areas:"logo name" "logo meta"!important;column-gap:12px!important;align-items:center!important}
#w4rank .has-official-team .w4officialimg{display:block!important;grid-area:logo!important;width:42px!important;height:42px!important;object-fit:contain!important}
#w4rank .has-official-team h3{grid-area:name!important;align-self:end!important}#w4rank .has-official-team small{grid-area:meta!important;align-self:start!important}
#w4mvp .has-official-player>div:nth-child(2),#w4rook .has-official-player>div:nth-child(2){padding-left:84px!important;min-height:72px!important}
#w4mvp .has-official-player .w4officialimg,#w4rook .has-official-player .w4officialimg{display:block!important;position:absolute!important;left:0!important;top:0!important;width:68px!important;height:68px!important;object-fit:cover!important;object-position:center top!important;border-radius:12px!important;border:1px solid #3a413b!important;background:#171c18!important}
@media(max-width:520px){#w4rank .has-official-team>div:nth-child(2){grid-template-columns:42px minmax(0,1fr)!important;column-gap:9px!important}#w4rank .has-official-team .w4officialimg{width:36px!important;height:36px!important}#w4mvp .has-official-player>div:nth-child(2),#w4rook .has-official-player>div:nth-child(2){padding-left:72px!important}.has-official-player .w4officialimg{width:58px!important;height:58px!important}}
`;document.head.appendChild(s)}
function load(card,src,klass,alt){if(!card||card.dataset.officialTry)return;card.dataset.officialTry='1';let im=new Image();im.onload=()=>{if(im.naturalWidth<20)return;im.className='w4officialimg';im.alt=alt;im.loading='lazy';card.children[1].prepend(im);card.classList.add(klass)};im.onerror=()=>{delete card.dataset.officialTry;card.classList.remove(klass)};im.src=src}
function run(){css();document.querySelectorAll('#w4rank .w4row').forEach(c=>{let n=c.children[1]?.querySelector('h3')?.textContent.trim(),a=team[n];if(a)load(c,`https://static.www.nfl.com/t_q-best/league/api/clubs/logos/${a}`,'has-official-team',n+' logo')});document.querySelectorAll('#w4mvp .w4row,#w4rook .w4row').forEach(c=>{let n=c.children[1]?.querySelector('h3')?.textContent.trim();if(pic[n])load(c,pic[n],'has-official-player',n)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();[300,900,1800,3500,6500].forEach(t=>setTimeout(run,t));
})();