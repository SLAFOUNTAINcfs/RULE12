'use strict';
(()=>{
const MODEL_VERSION='roll-play-distance-v1';
const CLUBS=['Driver','3-Wood','5-Wood','H1 / 2-Iron','3-Iron','4-Iron','5-Iron','6-Iron','7-Iron','8-Iron','9-Iron','PW','GW','SW','LW'];
const RARITIES=['Common','Rare','Epic','Legendary'];
const AGES=[
[1,'Age 10','age-10','junior-prodigy','Junior Prodigy','A developing young golfer building speed, control, and confidence.'],
[2,'Ages 18-29','18-29','rising-competitor','Rising Competitor','A powerful young golfer entering the competitive prime of the game.'],
[3,'Ages 30-44','30-44','prime-player','Prime Player','A golfer combining physical ability, experience, and course strategy.'],
[4,'Ages 45-59','45-59','veteran-shotmaker','Veteran Shotmaker','An experienced golfer who balances distance with control and decision-making.'],
[5,'Ages 60-74','60-74','senior-strategist','Senior Strategist','A seasoned golfer relying on reliable contact, course management, and touch.'],
[6,'Ages 75+','75-plus','timeless-technician','Timeless Technician','A veteran golfer using technique, accuracy, and creativity to navigate the course.']];
const ANCHORS={Female:{'Age 10':[115,140,165,190],'Ages 18-29':[145,180,220,255],'Ages 30-44':[140,175,215,250],'Ages 45-59':[130,160,195,225],'Ages 60-74':[115,145,175,200],'Ages 75+':[100,125,150,170]},Male:{'Age 10':[140,170,200,230],'Ages 18-29':[181,215,244,305],'Ages 30-44':[180,215,245,305],'Ages 45-59':[175,205,235,278],'Ages 60-74':[160,190,220,255],'Ages 75+':[145,170,195,220]}};
const RATIOS={Male:[1,.885,.825,.780,.745,.710,.675,.640,.605,.560,.515,.470,.420,.370,.320],Female:[1,.895,.845,.795,.755,.715,.675,.635,.595,.550,.505,.460,.410,.360,.310]};
const GAPS={slow:[7,7,4,4,4,4,4,4,4,4,4,5,5,5],moderate:[10,10,6,6,6,6,6,6,7,7,7,8,8,8],fast:[14,14,8,8,8,8,8,8,9,9,9,10,10,10],elite:[18,18,10,10,10,10,10,10,11,11,11,12,12,12]};
const PERF={Common:'Developing Golfer',Rare:'Established Golfer',Epic:'Low-Handicap Golfer'};
const SOURCES=['Arccos 2026 amateur driving distance','TrackMan 2023 tour club-gap shape','PGA TOUR 2026 driver benchmark','PGA TOUR Champions 2026 driver benchmark'];
function band(d){return d<150?'slow':d<210?'moderate':d<270?'fast':'elite'}
function elite(die){return die===1?'Elite Junior':die<4?'Tour Benchmark':die===4?'Elite Veteran':die===5?'Elite Senior':'Elite Age-Group Golfer'}
function buildClubs(gender,driver){const ratios=RATIOS[gender],gaps=GAPS[band(driver)],clubs={Driver:driver};for(let i=1;i<CLUBS.length;i++)clubs[CLUBS[i]]=Math.max(1,Math.min(Math.round(driver*ratios[i]),clubs[CLUBS[i-1]]-gaps[i-1]));return clubs}
function makeProfile(gender,age,rarity,rarityIndex){const [die,label,slug,archetypeId,archetypeName,archetypeSummary]=age;const driver=ANCHORS[gender][label][rarityIndex],clubs=buildClubs(gender,driver),performanceLabel=rarity==='Legendary'?elite(die):PERF[rarity];const id=`${gender.toLowerCase()}-${slug}-${rarity.toLowerCase()}`;return{id,gender,coinResult:gender==='Female'?'Heads':'Tails',dieRoll:die,ageGroup:label,archetypeId,archetypeName,archetypeSummary,rarity,rarityTitle:performanceLabel,performanceLabel,characterDisplayName:`${rarity} ${archetypeName}`,teeYardage:Math.round((clubs['7-Iron']*38)/50)*50,distanceType:'total',distanceBasis:'Modeled total-distance gameplay profile',distanceModelVersion:MODEL_VERSION,sourceCategories:SOURCES,clubs,distanceBand:band(driver),svg:`svg/${id}.svg`}}
const profiles=[];for(const gender of ['Female','Male'])for(const age of AGES)RARITIES.forEach((rarity,index)=>profiles.push(makeProfile(gender,age,rarity,index)));
for(const p of profiles){for(let i=1;i<CLUBS.length;i++)if(p.clubs[CLUBS[i-1]]<=p.clubs[CLUBS[i]])throw new Error(`${p.id}: invalid club ladder`)}
window.ROLL_PLAY_RESULTS={game:'Roll Play Golf',subtitle:'A Golf RPG',tagline:'Roll a golfer role. Choose a rarity. Play as that character.',distanceType:'total',distanceModelVersion:MODEL_VERSION,version:5,profiles};
})();
