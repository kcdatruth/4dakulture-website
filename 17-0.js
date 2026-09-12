const PLAYERS = {"QB":[{"name":"Tom Brady","peak":"2007","team":"Patriots","a":9.7,"b":9.8,"c":9.8,"d":10.0,"fit":9.9,"role":"Vertical surgeon • late-game killer"},{"name":"Patrick Mahomes","peak":"2018","team":"Chiefs","a":10.0,"b":9.5,"c":10.0,"d":9.7,"fit":9.8,"role":"Off-script genius • explosive creator"},{"name":"Peyton Manning","peak":"2013","team":"Broncos","a":9.5,"b":10.0,"c":10.0,"d":9.5,"fit":9.8,"role":"Pre-snap master • record-setting engine"},{"name":"Dan Marino","peak":"1984","team":"Dolphins","a":10.0,"b":9.7,"c":9.6,"d":9.2,"fit":9.6,"role":"Quick-release cannon • era-breaking passer"},{"name":"Joe Montana","peak":"1989","team":"49ers","a":9.1,"b":9.8,"c":9.6,"d":10.0,"fit":9.9,"role":"Timing master • championship closer"},{"name":"Steve Young","peak":"1994","team":"49ers","a":9.3,"b":9.7,"c":9.9,"d":9.5,"fit":9.9,"role":"Efficient dual threat • movement passer"},{"name":"Aaron Rodgers","peak":"2011","team":"Packers","a":9.9,"b":9.8,"c":9.7,"d":9.4,"fit":9.8,"role":"Precision bomber • mistake-free creation"},{"name":"Drew Brees","peak":"2009","team":"Saints","a":9.0,"b":9.9,"c":9.5,"d":9.4,"fit":9.8,"role":"Pocket distributor • timing machine"},{"name":"Kurt Warner","peak":"1999","team":"Rams","a":9.5,"b":9.7,"c":9.7,"d":9.3,"fit":9.7,"role":"Greatest Show trigger man • fearless passer"},{"name":"Lamar Jackson","peak":"2019","team":"Ravens","a":8.8,"b":8.9,"c":10.0,"d":9.0,"fit":9.3,"role":"Unmatched rushing gravity • big-play creator"},{"name":"Josh Allen","peak":"2020","team":"Bills","a":10.0,"b":9.2,"c":9.8,"d":9.0,"fit":9.3,"role":"Power arm • power runner • chaos creator"},{"name":"Cam Newton","peak":"2015","team":"Panthers","a":9.2,"b":8.8,"c":9.8,"d":9.2,"fit":9.0,"role":"Goal-line weapon • deep-ball force"},{"name":"Brett Favre","peak":"1996","team":"Packers","a":9.7,"b":9.1,"c":9.4,"d":9.1,"fit":9.0,"role":"Gunslinger • aggressive playmaker"},{"name":"Warren Moon","peak":"1991","team":"Oilers","a":9.6,"b":9.4,"c":9.3,"d":8.9,"fit":9.2,"role":"Run-and-shoot maestro • deep passer"},{"name":"Randall Cunningham","peak":"1998","team":"Vikings","a":9.6,"b":9.2,"c":9.6,"d":9.0,"fit":9.4,"role":"Vertical athlete • explosive playmaker"},{"name":"Matt Ryan","peak":"2016","team":"Falcons","a":9.1,"b":9.7,"c":9.5,"d":8.9,"fit":9.5,"role":"Play-action surgeon • MVP distributor"},{"name":"Daunte Culpepper","peak":"2004","team":"Vikings","a":9.6,"b":9.2,"c":9.5,"d":8.8,"fit":9.0,"role":"Big-arm dual threat • downfield pressure"},{"name":"Joe Burrow","peak":"2021","team":"Bengals","a":9.2,"b":9.7,"c":9.4,"d":9.6,"fit":9.6,"role":"Pocket assassin • fearless closer"}],"RB":[{"name":"Barry Sanders","peak":"1997","team":"Lions","a":10.0,"b":8.7,"c":10.0,"d":8.4,"fit":9.5,"role":"Open-field glitch • home-run runner"},{"name":"Walter Payton","peak":"1977","team":"Bears","a":9.9,"b":9.2,"c":9.4,"d":9.6,"fit":9.8,"role":"Complete back • violent balance"},{"name":"LaDainian Tomlinson","peak":"2006","team":"Chargers","a":10.0,"b":9.5,"c":9.5,"d":9.3,"fit":10.0,"role":"Touchdown machine • complete weapon"},{"name":"Marshall Faulk","peak":"2000","team":"Rams","a":9.7,"b":10.0,"c":9.6,"d":8.5,"fit":10.0,"role":"Receiver in a RB body • space creator"},{"name":"Emmitt Smith","peak":"1995","team":"Cowboys","a":9.8,"b":8.5,"c":8.9,"d":9.7,"fit":9.7,"role":"Chain mover • red-zone finisher"},{"name":"Eric Dickerson","peak":"1984","team":"Rams","a":10.0,"b":7.7,"c":9.6,"d":9.2,"fit":9.3,"role":"Long-stride burner • workhorse engine"},{"name":"Adrian Peterson","peak":"2012","team":"Vikings","a":10.0,"b":7.2,"c":9.7,"d":9.8,"fit":9.0,"role":"Power-speed freak • tackle breaker"},{"name":"Terrell Davis","peak":"1998","team":"Broncos","a":9.8,"b":8.0,"c":9.1,"d":9.6,"fit":9.7,"role":"One-cut killer • postseason hammer"},{"name":"Priest Holmes","peak":"2003","team":"Chiefs","a":9.7,"b":9.2,"c":9.1,"d":9.0,"fit":9.8,"role":"Goal-line machine • screen-game weapon"},{"name":"Shaun Alexander","peak":"2005","team":"Seahawks","a":9.7,"b":7.7,"c":8.9,"d":9.5,"fit":9.4,"role":"Patient runner • touchdown finisher"},{"name":"Chris Johnson","peak":"2009","team":"Titans","a":9.7,"b":8.2,"c":10.0,"d":7.4,"fit":9.1,"role":"2K speed • one-cut home-run threat"},{"name":"Derrick Henry","peak":"2020","team":"Titans","a":9.9,"b":7.2,"c":9.3,"d":10.0,"fit":9.2,"role":"Fourth-quarter avalanche • breakaway power"},{"name":"Christian McCaffrey","peak":"2019","team":"Panthers","a":9.3,"b":10.0,"c":9.3,"d":8.3,"fit":10.0,"role":"Positionless weapon • route-running back"},{"name":"Earl Campbell","peak":"1980","team":"Oilers","a":9.9,"b":6.8,"c":9.0,"d":10.0,"fit":8.9,"role":"Punishing runner • tackle-breaking force"},{"name":"Jamal Lewis","peak":"2003","team":"Ravens","a":9.8,"b":6.9,"c":8.8,"d":9.9,"fit":8.9,"role":"2K bruiser • downhill punishment"},{"name":"Edgerrin James","peak":"2000","team":"Colts","a":9.5,"b":9.2,"c":9.1,"d":8.8,"fit":9.7,"role":"Balanced runner • passing-game fit"},{"name":"Todd Gurley","peak":"2017","team":"Rams","a":9.6,"b":9.4,"c":9.4,"d":9.0,"fit":9.8,"role":"Outside-zone star • receiving threat"},{"name":"Saquon Barkley","peak":"2024","team":"Eagles","a":9.8,"b":8.8,"c":9.8,"d":9.2,"fit":9.6,"role":"Explosive workhorse • big-play runner"}],"WR":[{"name":"Jerry Rice","peak":"1995","team":"49ers","a":10.0,"b":10.0,"c":9.3,"d":9.7,"fit":10.0,"role":"Route perfection • unstoppable production"},{"name":"Randy Moss","peak":"2007","team":"Patriots","a":9.5,"b":9.7,"c":10.0,"d":9.3,"fit":9.9,"role":"Ultimate vertical gravity • red-zone terror"},{"name":"Calvin Johnson","peak":"2012","team":"Lions","a":9.7,"b":10.0,"c":9.8,"d":9.6,"fit":9.8,"role":"Coverage-proof target • size-speed freak"},{"name":"Antonio Brown","peak":"2015","team":"Steelers","a":9.9,"b":9.9,"c":9.4,"d":9.7,"fit":9.8,"role":"Route technician • volume monster"},{"name":"Marvin Harrison","peak":"2002","team":"Colts","a":9.9,"b":9.9,"c":9.2,"d":9.1,"fit":9.9,"role":"Precision separator • timing-game king"},{"name":"Terrell Owens","peak":"2007","team":"Cowboys","a":9.3,"b":9.3,"c":9.5,"d":9.8,"fit":9.2,"role":"Power receiver • run-after-catch destroyer"},{"name":"Cris Carter","peak":"1995","team":"Vikings","a":9.6,"b":10.0,"c":8.4,"d":8.8,"fit":9.7,"role":"Hands specialist • red-zone technician"},{"name":"Larry Fitzgerald","peak":"2008","team":"Cardinals","a":9.5,"b":10.0,"c":8.9,"d":9.2,"fit":9.9,"role":"Big-game target • contested-catch master"},{"name":"Cooper Kupp","peak":"2021","team":"Rams","a":9.9,"b":9.9,"c":8.8,"d":9.6,"fit":10.0,"role":"Triple-crown separator • slot/outside chess piece"},{"name":"Justin Jefferson","peak":"2022","team":"Vikings","a":9.7,"b":9.8,"c":9.4,"d":9.5,"fit":9.9,"role":"Elite separator • boundary/slot weapon"},{"name":"Tyreek Hill","peak":"2020","team":"Chiefs","a":9.3,"b":9.3,"c":10.0,"d":9.8,"fit":9.9,"role":"Field-tilting speed • motion nightmare"},{"name":"Andre Johnson","peak":"2008","team":"Texans","a":9.5,"b":9.7,"c":9.2,"d":9.4,"fit":9.7,"role":"Physical separator • volume alpha"},{"name":"Steve Smith Sr.","peak":"2005","team":"Panthers","a":9.6,"b":9.5,"c":9.5,"d":9.8,"fit":9.7,"role":"Triple-crown firecracker • YAC bully"},{"name":"Torry Holt","peak":"2003","team":"Rams","a":9.7,"b":9.8,"c":9.4,"d":9.3,"fit":9.9,"role":"Smooth route runner • vertical precision"},{"name":"Davante Adams","peak":"2020","team":"Packers","a":10.0,"b":9.8,"c":8.9,"d":9.1,"fit":9.9,"role":"Release-package master • red-zone weapon"},{"name":"DeAndre Hopkins","peak":"2018","team":"Texans","a":9.6,"b":10.0,"c":8.8,"d":9.0,"fit":9.7,"role":"Contested-catch king • boundary alpha"},{"name":"Michael Irvin","peak":"1995","team":"Cowboys","a":9.5,"b":9.7,"c":8.9,"d":9.2,"fit":9.8,"role":"Physical chain mover • postseason target"},{"name":"Ja'Marr Chase","peak":"2024","team":"Bengals","a":9.6,"b":9.7,"c":9.7,"d":9.8,"fit":9.8,"role":"Explosive alpha • YAC and vertical threat"}],"TE":[{"name":"Rob Gronkowski","peak":"2011","team":"Patriots","a":10.0,"b":9.7,"c":10.0,"d":9.8,"fit":10.0,"role":"Mismatch monster • dominant blocker"},{"name":"Travis Kelce","peak":"2020","team":"Chiefs","a":10.0,"b":8.2,"c":10.0,"d":9.8,"fit":10.0,"role":"Coverage decoder • route-running TE"},{"name":"Tony Gonzalez","peak":"2004","team":"Chiefs","a":9.8,"b":8.1,"c":9.7,"d":9.9,"fit":9.9,"role":"Volume receiving TE • chain mover"},{"name":"Antonio Gates","peak":"2005","team":"Chargers","a":9.8,"b":7.4,"c":9.8,"d":9.8,"fit":9.8,"role":"Red-zone mismatch • basketball body control"},{"name":"Kellen Winslow","peak":"1980","team":"Chargers","a":9.8,"b":7.6,"c":9.8,"d":9.7,"fit":9.8,"role":"Era-bending receiving weapon"},{"name":"Shannon Sharpe","peak":"1997","team":"Broncos","a":9.4,"b":8.0,"c":9.5,"d":9.5,"fit":9.8,"role":"Vertical TE • after-catch threat"},{"name":"George Kittle","peak":"2023","team":"49ers","a":9.5,"b":9.7,"c":9.5,"d":9.4,"fit":10.0,"role":"YAC monster • elite edge blocker"},{"name":"Jimmy Graham","peak":"2011","team":"Saints","a":9.7,"b":6.8,"c":9.8,"d":9.6,"fit":9.4,"role":"Red-zone skyscraper • seam threat"},{"name":"Ozzie Newsome","peak":"1984","team":"Browns","a":9.5,"b":8.2,"c":9.4,"d":9.6,"fit":9.8,"role":"Smooth receiving TE • reliable separator"},{"name":"Jason Witten","peak":"2012","team":"Cowboys","a":9.3,"b":8.9,"c":9.0,"d":9.8,"fit":9.9,"role":"Third-down machine • complete technician"},{"name":"Mark Andrews","peak":"2021","team":"Ravens","a":9.5,"b":7.6,"c":9.4,"d":9.7,"fit":9.7,"role":"Middle-field weapon • chain mover"},{"name":"Greg Olsen","peak":"2015","team":"Panthers","a":9.4,"b":7.8,"c":9.3,"d":9.6,"fit":9.8,"role":"Reliable seam weapon • route technician"},{"name":"Vernon Davis","peak":"2009","team":"49ers","a":9.1,"b":8.0,"c":9.7,"d":9.3,"fit":9.6,"role":"Speed TE • vertical mismatch"},{"name":"Dallas Clark","peak":"2009","team":"Colts","a":9.4,"b":7.2,"c":9.3,"d":9.6,"fit":9.8,"role":"Slot TE • timing-game weapon"},{"name":"Zach Ertz","peak":"2018","team":"Eagles","a":9.3,"b":7.7,"c":9.2,"d":9.7,"fit":9.8,"role":"Volume target • option-route specialist"},{"name":"Todd Christensen","peak":"1983","team":"Raiders","a":9.5,"b":7.7,"c":9.3,"d":9.7,"fit":9.6,"role":"Volume receiving TE • middle-field threat"},{"name":"Mike Ditka","peak":"1961","team":"Bears","a":9.3,"b":9.2,"c":9.4,"d":9.4,"fit":9.6,"role":"Old-school complete TE • violent after catch"},{"name":"Brock Bowers","peak":"2024","team":"Raiders","a":9.4,"b":7.8,"c":9.5,"d":9.6,"fit":9.7,"role":"Modern YAC weapon • alignment flexibility"}],"OL":[{"name":"Anthony Muñoz","peak":"1988","team":"Bengals","a":10.0,"b":9.8,"c":9.6,"d":10.0,"fit":10.0,"role":"Prototype left tackle • complete technician"},{"name":"Jonathan Ogden","peak":"2003","team":"Ravens","a":9.9,"b":9.8,"c":10.0,"d":9.8,"fit":10.0,"role":"Massive blindside eraser • road grader"},{"name":"Walter Jones","peak":"2005","team":"Seahawks","a":10.0,"b":9.7,"c":9.6,"d":10.0,"fit":10.0,"role":"Island tackle • elite movement blocker"},{"name":"Larry Allen","peak":"1995","team":"Cowboys","a":9.7,"b":10.0,"c":10.0,"d":9.5,"fit":9.9,"role":"Generational power • inside/out versatility"},{"name":"Joe Thomas","peak":"2010","team":"Browns","a":10.0,"b":9.5,"c":9.3,"d":10.0,"fit":10.0,"role":"Technician • one-on-one pass protector"},{"name":"Trent Williams","peak":"2021","team":"49ers","a":9.9,"b":10.0,"c":10.0,"d":9.8,"fit":10.0,"role":"Space blocker • elite pass protector"},{"name":"John Hannah","peak":"1981","team":"Patriots","a":9.7,"b":10.0,"c":10.0,"d":9.8,"fit":9.9,"role":"Dominant guard • movement and power"},{"name":"Bruce Matthews","peak":"1992","team":"Oilers","a":9.8,"b":9.7,"c":9.7,"d":10.0,"fit":10.0,"role":"Position-flex legend • clean technician"},{"name":"Orlando Pace","peak":"2001","team":"Rams","a":9.8,"b":9.8,"c":9.9,"d":9.7,"fit":9.9,"role":"Blindside wall • open-field mauler"},{"name":"Willie Roaf","peak":"2004","team":"Chiefs","a":9.8,"b":9.9,"c":9.8,"d":9.7,"fit":9.9,"role":"Power tackle • elite run-game fit"},{"name":"Dwight Stephenson","peak":"1984","team":"Dolphins","a":9.8,"b":9.8,"c":9.6,"d":10.0,"fit":10.0,"role":"Elite center • movement and recognition"},{"name":"Mike Webster","peak":"1978","team":"Steelers","a":9.5,"b":9.8,"c":9.8,"d":9.8,"fit":9.9,"role":"Anchor center • toughness and leverage"},{"name":"Dermontti Dawson","peak":"1995","team":"Steelers","a":9.8,"b":9.9,"c":9.7,"d":10.0,"fit":10.0,"role":"Athletic center • reach-block master"},{"name":"Jason Kelce","peak":"2022","team":"Eagles","a":9.6,"b":10.0,"c":9.4,"d":10.0,"fit":10.0,"role":"Pulling center • elite processing"},{"name":"Zack Martin","peak":"2016","team":"Cowboys","a":9.8,"b":9.9,"c":9.7,"d":9.9,"fit":10.0,"role":"Complete guard • no weak phase"},{"name":"Tyron Smith","peak":"2016","team":"Cowboys","a":9.9,"b":9.7,"c":9.8,"d":9.8,"fit":9.9,"role":"Power tackle • elite blindside athlete"},{"name":"Gene Upshaw","peak":"1974","team":"Raiders","a":9.6,"b":9.9,"c":9.9,"d":9.7,"fit":9.9,"role":"Pulling guard • power and mobility"},{"name":"Art Shell","peak":"1977","team":"Raiders","a":9.8,"b":9.8,"c":9.8,"d":9.7,"fit":9.9,"role":"Massive tackle • championship protector"}],"PR":[{"name":"Lawrence Taylor","peak":"1986","team":"Giants","a":10.0,"b":9.7,"c":10.0,"d":10.0,"fit":10.0,"role":"Game-wrecking edge • offense-altering force"},{"name":"Reggie White","peak":"1987","team":"Eagles","a":10.0,"b":10.0,"c":10.0,"d":9.9,"fit":10.0,"role":"Power rusher • dominant run defender"},{"name":"Aaron Donald","peak":"2018","team":"Rams","a":10.0,"b":9.9,"c":10.0,"d":10.0,"fit":10.0,"role":"Interior chaos • instant pressure"},{"name":"J.J. Watt","peak":"2012","team":"Texans","a":10.0,"b":10.0,"c":9.9,"d":10.0,"fit":10.0,"role":"Every-down destroyer • splash-play machine"},{"name":"Bruce Smith","peak":"1990","team":"Bills","a":10.0,"b":9.8,"c":9.9,"d":9.8,"fit":10.0,"role":"Edge technician • relentless pressure"},{"name":"Deacon Jones","peak":"1967","team":"Rams","a":10.0,"b":9.3,"c":9.8,"d":9.8,"fit":9.8,"role":"Fearsome edge rusher • pocket collapse"},{"name":"Michael Strahan","peak":"2001","team":"Giants","a":10.0,"b":9.5,"c":9.8,"d":9.7,"fit":9.9,"role":"Sack-record edge • power and leverage"},{"name":"DeMarcus Ware","peak":"2008","team":"Cowboys","a":9.9,"b":9.2,"c":9.7,"d":9.8,"fit":9.8,"role":"Speed-to-power edge • every-snap threat"},{"name":"T.J. Watt","peak":"2021","team":"Steelers","a":10.0,"b":9.3,"c":9.6,"d":10.0,"fit":9.9,"role":"Strip-sack machine • relentless motor"},{"name":"Khalil Mack","peak":"2016","team":"Raiders","a":9.8,"b":9.7,"c":9.8,"d":9.8,"fit":9.9,"role":"Complete edge • run/pass dominance"},{"name":"Jason Taylor","peak":"2006","team":"Dolphins","a":9.8,"b":9.1,"c":9.3,"d":9.8,"fit":9.8,"role":"Speed rusher • turnover creator"},{"name":"Jared Allen","peak":"2011","team":"Vikings","a":10.0,"b":8.9,"c":9.3,"d":9.9,"fit":9.7,"role":"High-motor sack artist • edge finisher"},{"name":"James Harrison","peak":"2008","team":"Steelers","a":9.6,"b":9.8,"c":9.8,"d":10.0,"fit":9.8,"role":"Power edge • violent run defender"},{"name":"Justin Houston","peak":"2014","team":"Chiefs","a":9.9,"b":9.0,"c":9.3,"d":9.8,"fit":9.6,"role":"Speed rusher • strip-sack threat"},{"name":"Nick Bosa","peak":"2022","team":"49ers","a":9.9,"b":9.3,"c":9.5,"d":9.8,"fit":9.9,"role":"Technical edge • down-to-down pressure"},{"name":"Myles Garrett","peak":"2023","team":"Browns","a":10.0,"b":9.5,"c":9.9,"d":9.7,"fit":9.9,"role":"Rare athlete • alignment-flex destroyer"},{"name":"Derrick Thomas","peak":"1990","team":"Chiefs","a":10.0,"b":8.5,"c":9.2,"d":9.9,"fit":9.5,"role":"Explosive edge • pure sack pressure"},{"name":"Mark Gastineau","peak":"1984","team":"Jets","a":10.0,"b":8.5,"c":9.3,"d":9.7,"fit":9.4,"role":"Sack specialist • upfield explosion"}],"LB":[{"name":"Ray Lewis","peak":"2000","team":"Ravens","a":10.0,"b":9.3,"c":9.2,"d":10.0,"fit":10.0,"role":"Middle-of-field dictator • tone setter"},{"name":"Derrick Brooks","peak":"2002","team":"Buccaneers","a":9.6,"b":10.0,"c":8.5,"d":10.0,"fit":10.0,"role":"Coverage eraser • sideline-to-sideline speed"},{"name":"Brian Urlacher","peak":"2005","team":"Bears","a":9.7,"b":9.6,"c":9.2,"d":9.9,"fit":9.9,"role":"Range linebacker • middle-field athlete"},{"name":"Patrick Willis","peak":"2009","team":"49ers","a":9.9,"b":9.4,"c":9.2,"d":9.9,"fit":10.0,"role":"Sideline-to-sideline hammer"},{"name":"Luke Kuechly","peak":"2013","team":"Panthers","a":9.8,"b":9.9,"c":8.8,"d":10.0,"fit":10.0,"role":"Coverage brain • instant diagnosis"},{"name":"Junior Seau","peak":"1994","team":"Chargers","a":9.7,"b":9.3,"c":9.4,"d":9.9,"fit":9.9,"role":"Range and violence • blitz weapon"},{"name":"Mike Singletary","peak":"1985","team":"Bears","a":10.0,"b":9.0,"c":8.8,"d":10.0,"fit":9.9,"role":"Run-game commander • instinct monster"},{"name":"Dick Butkus","peak":"1969","team":"Bears","a":10.0,"b":8.7,"c":8.8,"d":10.0,"fit":9.7,"role":"Old-school destroyer • turnover force"},{"name":"Jack Lambert","peak":"1976","team":"Steelers","a":9.9,"b":9.2,"c":8.8,"d":9.9,"fit":9.9,"role":"Steel Curtain heartbeat • range and violence"},{"name":"Bobby Wagner","peak":"2014","team":"Seahawks","a":9.8,"b":9.7,"c":8.9,"d":9.9,"fit":10.0,"role":"Complete Mike • coverage and tackling"},{"name":"Fred Warner","peak":"2023","team":"49ers","a":9.5,"b":10.0,"c":8.6,"d":9.9,"fit":10.0,"role":"Modern coverage LB • communication hub"},{"name":"Zach Thomas","peak":"2002","team":"Dolphins","a":9.8,"b":9.3,"c":8.6,"d":9.9,"fit":9.8,"role":"Instinctive tackling machine"},{"name":"Lavonte David","peak":"2020","team":"Buccaneers","a":9.6,"b":9.7,"c":9.0,"d":9.8,"fit":9.9,"role":"Coverage linebacker • run-game knife"},{"name":"NaVorro Bowman","peak":"2013","team":"49ers","a":9.9,"b":9.5,"c":9.0,"d":9.9,"fit":9.9,"role":"Downhill enforcer • coverage range"},{"name":"Willie Lanier","peak":"1970","team":"Chiefs","a":9.9,"b":9.1,"c":8.8,"d":9.8,"fit":9.8,"role":"Middle linebacker anchor • physical leader"},{"name":"Sam Mills","peak":"1996","team":"Panthers","a":9.5,"b":9.2,"c":8.7,"d":9.8,"fit":9.8,"role":"Undersized instinct king • leader"},{"name":"London Fletcher","peak":"2011","team":"Washington","a":9.5,"b":9.2,"c":8.8,"d":9.7,"fit":9.8,"role":"Durable field general • tackling machine"},{"name":"Chuck Bednarik","peak":"1953","team":"Eagles","a":10.0,"b":8.4,"c":8.5,"d":10.0,"fit":9.5,"role":"Ironman linebacker • physical tone setter"}],"CB":[{"name":"Deion Sanders","peak":"1994","team":"49ers","a":10.0,"b":9.7,"c":10.0,"d":10.0,"fit":10.0,"role":"Shutdown island • pick-six threat"},{"name":"Darrelle Revis","peak":"2009","team":"Jets","a":10.0,"b":9.9,"c":9.3,"d":9.7,"fit":10.0,"role":"Travel corner • erase WR1"},{"name":"Champ Bailey","peak":"2006","team":"Broncos","a":10.0,"b":9.8,"c":9.8,"d":9.8,"fit":10.0,"role":"Complete cover corner • ballhawk"},{"name":"Rod Woodson","peak":"1993","team":"Steelers","a":9.8,"b":9.7,"c":9.7,"d":9.9,"fit":10.0,"role":"Physical cover man • return threat"},{"name":"Charles Woodson","peak":"2009","team":"Packers","a":9.6,"b":9.8,"c":10.0,"d":9.5,"fit":10.0,"role":"Ballhawk • slot/outside versatility"},{"name":"Mel Blount","peak":"1975","team":"Steelers","a":10.0,"b":9.5,"c":9.5,"d":9.3,"fit":9.9,"role":"Press monster • rule-changing physicality"},{"name":"Richard Sherman","peak":"2013","team":"Seahawks","a":9.7,"b":10.0,"c":9.9,"d":9.1,"fit":9.9,"role":"Zone master • ball production"},{"name":"Jalen Ramsey","peak":"2017","team":"Jaguars","a":9.9,"b":9.4,"c":9.2,"d":9.7,"fit":10.0,"role":"Press-man bully • matchup corner"},{"name":"Stephon Gilmore","peak":"2019","team":"Patriots","a":9.9,"b":9.6,"c":9.5,"d":9.5,"fit":10.0,"role":"DPOY cover man • matchup eraser"},{"name":"Aeneas Williams","peak":"1994","team":"Cardinals","a":9.7,"b":9.6,"c":9.9,"d":9.3,"fit":9.9,"role":"Ballhawk • technician"},{"name":"Mike Haynes","peak":"1984","team":"Raiders","a":9.8,"b":9.7,"c":9.6,"d":9.7,"fit":10.0,"role":"Smooth cover corner • length and speed"},{"name":"Lester Hayes","peak":"1980","team":"Raiders","a":9.9,"b":9.6,"c":10.0,"d":9.2,"fit":9.8,"role":"Interception machine • press coverage"},{"name":"Ty Law","peak":"2003","team":"Patriots","a":9.8,"b":9.6,"c":9.8,"d":9.3,"fit":10.0,"role":"Physical man corner • postseason ballhawk"},{"name":"Darrell Green","peak":"1991","team":"Washington","a":9.8,"b":9.5,"c":9.3,"d":10.0,"fit":9.9,"role":"Recovery-speed legend • man-cover ace"},{"name":"Nnamdi Asomugha","peak":"2008","team":"Raiders","a":9.9,"b":9.5,"c":9.1,"d":9.6,"fit":9.8,"role":"Boundary eraser • long press corner"},{"name":"Ronde Barber","peak":"2001","team":"Buccaneers","a":9.3,"b":9.9,"c":9.8,"d":9.2,"fit":10.0,"role":"Slot/zone weapon • blitzing corner"},{"name":"Asante Samuel","peak":"2006","team":"Patriots","a":9.3,"b":9.5,"c":10.0,"d":9.1,"fit":9.7,"role":"Route-jumping ballhawk"},{"name":"Patrick Peterson","peak":"2015","team":"Cardinals","a":9.7,"b":9.4,"c":9.2,"d":9.8,"fit":9.9,"role":"Travel corner • elite athlete"}],"S":[{"name":"Ed Reed","peak":"2004","team":"Ravens","a":10.0,"b":9.2,"c":10.0,"d":10.0,"fit":10.0,"role":"Center-field genius • takeaway machine"},{"name":"Ronnie Lott","peak":"1986","team":"49ers","a":9.7,"b":10.0,"c":9.7,"d":10.0,"fit":10.0,"role":"Tone setter • complete safety"},{"name":"Troy Polamalu","peak":"2010","team":"Steelers","a":9.7,"b":9.8,"c":9.8,"d":10.0,"fit":10.0,"role":"Chaos safety • instinctive playmaker"},{"name":"Brian Dawkins","peak":"2002","team":"Eagles","a":9.6,"b":9.8,"c":9.7,"d":9.9,"fit":10.0,"role":"Blitz/coverage weapon • emotional leader"},{"name":"Earl Thomas","peak":"2013","team":"Seahawks","a":9.9,"b":9.1,"c":10.0,"d":9.8,"fit":10.0,"role":"Single-high eraser • elite range"},{"name":"Kenny Easley","peak":"1984","team":"Seahawks","a":9.8,"b":9.8,"c":9.7,"d":9.9,"fit":10.0,"role":"DPOY safety • all-around destroyer"},{"name":"Steve Atwater","peak":"1991","team":"Broncos","a":9.3,"b":10.0,"c":9.2,"d":9.8,"fit":9.8,"role":"Box enforcer • deep-middle toughness"},{"name":"Kam Chancellor","peak":"2014","team":"Seahawks","a":9.2,"b":10.0,"c":9.0,"d":9.7,"fit":9.8,"role":"Box hammer • matchup weapon"},{"name":"John Lynch","peak":"1999","team":"Buccaneers","a":9.2,"b":9.9,"c":9.0,"d":9.8,"fit":9.8,"role":"Physical strong safety • tone setter"},{"name":"Rodney Harrison","peak":"2003","team":"Patriots","a":9.4,"b":9.9,"c":9.1,"d":9.8,"fit":9.9,"role":"Box/slot enforcer • big-game playmaker"},{"name":"Sean Taylor","peak":"2007","team":"Washington","a":9.6,"b":9.8,"c":9.8,"d":9.5,"fit":9.9,"role":"Range and violence • rare athlete"},{"name":"Bob Sanders","peak":"2007","team":"Colts","a":9.2,"b":10.0,"c":9.3,"d":10.0,"fit":9.8,"role":"DPOY missile • run-game eraser"},{"name":"Eric Berry","peak":"2016","team":"Chiefs","a":9.7,"b":9.3,"c":9.6,"d":9.7,"fit":10.0,"role":"Coverage safety • matchup eraser"},{"name":"Derwin James","peak":"2018","team":"Chargers","a":9.6,"b":9.6,"c":9.5,"d":9.7,"fit":10.0,"role":"Positionless safety • blitz/cover weapon"},{"name":"LeRoy Butler","peak":"1996","team":"Packers","a":9.5,"b":9.7,"c":9.5,"d":9.8,"fit":10.0,"role":"Versatile safety • creator from everywhere"},{"name":"Minkah Fitzpatrick","peak":"2022","team":"Steelers","a":9.8,"b":9.1,"c":9.8,"d":9.6,"fit":10.0,"role":"Center-field ballhawk • range"},{"name":"Paul Krause","peak":"1969","team":"Vikings","a":9.7,"b":9.0,"c":9.8,"d":9.7,"fit":9.8,"role":"Deep safety • interception magnet"},{"name":"Darren Woodson","peak":"1996","team":"Cowboys","a":9.4,"b":9.7,"c":9.3,"d":9.8,"fit":9.9,"role":"Big nickel prototype • complete safety"}]};
const LABELS = {"QB":["ARM","ACCURACY","PLAYMAKING","CLUTCH"],"RB":["RUN","RECEIVE","BURST","POWER"],"WR":["ROUTES","HANDS","SPEED","YAC"],"TE":["RECEIVE","BLOCK","MISMATCH","HANDS"],"OL":["PASS PRO","RUN BLOCK","POWER","TECHNIQUE"],"PR":["PASS RUSH","RUN D","POWER","MOTOR"],"LB":["RUN D","COVERAGE","BLITZ","INSTINCT"],"CB":["MAN","ZONE","BALL","SPEED"],"S":["COVERAGE","TACKLE","RANGE","INSTINCT"]};
const POSITIONS = [["QB","QUARTERBACK","QB"],["RB","RUNNING BACK","RB"],["WR1","WIDE RECEIVER 1","WR"],["WR2","WIDE RECEIVER 2","WR"],["TE","TIGHT END","TE"],["OL","OFFENSIVE LINE ANCHOR","OL"],["PR","PASS RUSHER","PR"],["LB","LINEBACKER","LB"],["CB","CORNERBACK","CB"],["S","SAFETY","S"]];

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

function initials(name){return name.split(/\s+/).map(x=>x[0]).join("").slice(0,3).toUpperCase();}
function average(values){return values.reduce((a,b)=>a+b,0)/values.length;}
function cardAverage(p){return average([p.a,p.b,p.c,p.d]);}
function pickedNames(){return new Set(Object.values(picks).map(p=>p.name));}

function drawChoices(pool){
  const already=pickedNames();
  return shuffle(PLAYERS[pool].filter(p=>!already.has(p.name))).slice(0,3);
}

function drawRound(){
  if(round>=POSITIONS.length) return finishGame();
  const [slot,label,pool]=POSITIONS[round];
  choices=drawChoices(pool);
  const labels=LABELS[pool];

  roundPosEl.textContent=label;
  progressEl.textContent=`Pick your ${label.toLowerCase()}. Prime versions only.`;
  document.querySelectorAll(".roster-slot").forEach(s=>s.classList.remove("active"));
  document.querySelector(`.roster-slot[data-position="${slot}"]`)?.classList.add("active");

  optionsEl.innerHTML=choices.map((p,i)=>`
    <button class="player-card" type="button" data-index="${i}" data-initials="${initials(p.name)}">
      <span class="player-pos">${slot} • OPTION ${i+1}</span>
      <span class="prime-pill">PRIME ${p.peak}</span>
      <h3>${p.name}</h3>
      <div class="player-era">${p.peak} • ${p.team}</div>
      <div class="player-role">${p.role}</div>
      <div class="player-ratings">
        <div><span>${labels[0]}</span><b>${p.a.toFixed(1)}</b></div>
        <div><span>${labels[1]}</span><b>${p.b.toFixed(1)}</b></div>
        <div><span>${labels[2]}</span><b>${p.c.toFixed(1)}</b></div>
        <div><span>${labels[3]}</span><b>${p.d.toFixed(1)}</b></div>
        <div class="fit"><span>FIT</span><b>${p.fit.toFixed(1)}</b></div>
      </div>
    </button>`).join("");

  optionsEl.querySelectorAll(".player-card").forEach(btn=>btn.addEventListener("click",()=>pick(Number(btn.dataset.index))));
}

function pick(i){
  const [slot]=POSITIONS[round];
  const player=choices[i];
  if(!player) return;
  picks[slot]=player;

  const slotEl=document.querySelector(`.roster-slot[data-position="${slot}"]`);
  slotEl.classList.add("filled");
  slotEl.classList.remove("active");
  slotEl.querySelector("strong").textContent=player.name;
  slotEl.querySelector("small").textContent=`${player.peak} • ${player.team}`;

  round++;
  drawRound();
}

function calculateMetrics(){
  const offenseSlots=["QB","RB","WR1","WR2","TE","OL"];
  const offense=average(offenseSlots.map(k=>cardAverage(picks[k])));

  const explosive=average([
    picks.QB.c,
    picks.RB.c,
    picks.WR1.c,picks.WR1.d,
    picks.WR2.c,picks.WR2.d,
    picks.TE.c
  ]);

  const protection=average([picks.OL.a,picks.OL.d,picks.QB.b,picks.QB.d]);

  const front=average([
    picks.PR.a,picks.PR.b,picks.PR.c,picks.PR.d,
    picks.LB.a,picks.LB.c,picks.LB.d
  ]);

  const coverage=average([
    picks.LB.b,
    picks.CB.a,picks.CB.b,picks.CB.c,picks.CB.d,
    picks.S.a,picks.S.c,picks.S.d
  ]);

  const fit=average(Object.values(picks).map(p=>p.fit));
  return {offense,explosive,protection,front,coverage,fit};
}

function projectedRecord(score){
  if(score>=96) return "17-0";
  if(score>=93) return "16-1";
  if(score>=90) return "15-2";
  if(score>=87) return "14-3";
  if(score>=84) return "13-4";
  if(score>=81) return "12-5";
  return "11-6";
}

function identity(m){
  const choices=[
    [m.offense,"SCOREBOARD BREAKERS"],
    [m.explosive,"BIG-PLAY MACHINE"],
    [m.protection,"CLEAN-POCKET EMPIRE"],
    [m.front,"PASS-RUSH HELL"],
    [m.coverage,"NO-FLY ZONE"],
    [m.fit,"BUILT WITH NO WEAK LINK"]
  ].sort((a,b)=>b[0]-a[0]);
  return choices[0][1];
}

function warning(m){
  if(m.protection<9.0) return "Can the offense stay clean for 17 weeks?";
  if(m.coverage<9.0) return "Can the secondary survive elite passing teams?";
  if(m.front<9.0) return "Who closes games when you need pressure?";
  if(m.explosive<9.0) return "Enough instant-strike offense?";
  if(m.fit<9.35) return "Can all these stars play their roles?";
  return "The schedule. That's about it.";
}

function finishGame(){
  optionsEl.innerHTML="";
  document.querySelector(".round-head").style.display="none";
  progressEl.textContent="Roster complete. 4DK is checking both sides of the ball.";

  const m=calculateMetrics();
  let raw=(m.offense*.24+m.explosive*.12+m.protection*.14+m.front*.16+m.coverage*.18+m.fit*.16)*10;

  if(m.offense>=9.45&&m.coverage>=9.35) raw+=1.5;
  if(m.protection>=9.5&&m.explosive>=9.45) raw+=1;
  if(m.front>=9.5&&m.coverage>=9.5) raw+=1;
  if(m.fit>=9.7) raw+=1.5;
  if(m.protection<8.7) raw-=2;
  if(m.coverage<8.7) raw-=2;
  if(m.fit<9.0) raw-=1.5;

  const score=Math.max(76,Math.min(100,Math.round(raw)));

  let title,copy;
  if(score>=96){
    title="17–0 THREAT";
    copy="This roster has championship-level answers everywhere. Elite quarterback play, explosive skill talent, protection, pressure, coverage and almost no obvious fit problem. Perfect-season talk is officially on the table.";
  }else if(score>=93){
    title="16–1 MONSTER";
    copy="This team is ridiculous. One bad Sunday might happen, but the weekly matchup advantage is overwhelming on both sides of the ball.";
  }else if(score>=90){
    title="15-WIN POWERHOUSE";
    copy="Super Bowl favorite from Day 1. The roster is loaded, but one pressure point keeps the undefeated conversation from feeling automatic.";
  }else if(score>=86){
    title="SUPER BOWL FAVORITE";
    copy="Too much talent to ignore. This team can win it all, but 17–0 requires a cleaner answer to its weakest unit.";
  }else{
    title="SOMEBODY GETTING Y'ALL 😂";
    copy="The names are legendary, but the perfect-season test exposes the roster construction. Great players do not automatically make a flawless team.";
  }

  document.getElementById("verdictTitle").textContent=title;
  document.getElementById("verdictCopy").textContent=copy;
  document.getElementById("teamScore").textContent=score;
  document.getElementById("projectedRecord").textContent=projectedRecord(score);
  document.getElementById("teamIdentity").textContent=identity(m);
  document.getElementById("teamWarning").textContent=warning(m);

  document.getElementById("metricOffense").textContent=m.offense.toFixed(1);
  document.getElementById("metricExplosive").textContent=m.explosive.toFixed(1);
  document.getElementById("metricProtection").textContent=m.protection.toFixed(1);
  document.getElementById("metricFront").textContent=m.front.toFixed(1);
  document.getElementById("metricCoverage").textContent=m.coverage.toFixed(1);
  document.getElementById("metricFit").textContent=m.fit.toFixed(1);

  verdictEl.hidden=false;
  verdictEl.scrollIntoView({behavior:"smooth",block:"start"});
}

function reset(){
  round=0;picks={};choices=[];verdictEl.hidden=true;
  document.querySelector(".round-head").style.display="";
  document.querySelectorAll(".roster-slot").forEach(s=>{
    s.classList.remove("filled","active");
    s.querySelector("strong").textContent="—";
    s.querySelector("small").textContent="";
  });
  drawRound();
}

async function shareTeam(){
  const lineup=POSITIONS.map(([slot,label])=>`${slot}: ${picks[slot].peak} ${picks[slot].name}`).join("\n");
  const text=`My 4DK 17–0 Challenge roster:\n${lineup}\nProjected record: ${document.getElementById("projectedRecord").textContent}\nVerdict: ${document.getElementById("verdictTitle").textContent} (${document.getElementById("teamScore").textContent}/100)\n4dakulturemedia.com/17-0.html`;
  try{
    if(navigator.share){await navigator.share({title:"My 4DK 17–0 Team",text});return;}
    await navigator.clipboard.writeText(text);
    const btn=document.getElementById("shareTeam");
    const old=btn.textContent;btn.textContent="COPIED ✓";
    setTimeout(()=>btn.textContent=old,1600);
  }catch(e){
    try{await navigator.clipboard.writeText(text);}catch(_e){}
  }
}

document.getElementById("resetGame")?.addEventListener("click",reset);
document.getElementById("shareTeam")?.addEventListener("click",shareTeam);
drawRound();
