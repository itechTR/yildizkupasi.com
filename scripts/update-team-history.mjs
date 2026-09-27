import {readFile,writeFile} from 'node:fs/promises';
import {normalizeScoreboard} from '../platform/score-provider.mjs';
const definitions=[
 ['fifa.world','Dünya Kupası',[2022,2018,2014,2010,2006,2002,1998]],
 ['uefa.euro','Avrupa Şampiyonası',[2024,2021,2016,2012,2008,2004,2000,1996]],
 ['conmebol.america','Copa América',[2024,2021,2019,2016,2015,2011,2007,2004]],
 ['concacaf.gold','CONCACAF Altın Kupa',[2025,2023,2021,2019,2017,2015,2013,2011]],
 ['caf.nations','Afrika Uluslar Kupası',[2026,2024,2022,2019,2017,2015,2013,2012]],
 ['afc.asian.cup','Asya Kupası',[2024,2019,2015,2011,2007,2004]],
 ['uefa.nations','UEFA Uluslar Ligi',[2025,2023,2021,2019]],
 ['fifa.confederations','Konfederasyonlar Kupası',[2017,2013,2009,2005]],
 ['concacaf.nations.league','CONCACAF Uluslar Ligi',[2025,2024,2023,2021]],
 ['fifa.worldq.ofc','Dünya Kupası Okyanusya Elemeleri',[2025,2022]]
];
const selected=process.argv.slice(2);
const tournaments=selected.length?JSON.parse(await readFile('platform/team-history.json','utf8')).tournaments.filter(t=>!selected.some(x=>t.id.startsWith(x+'-'))):[];
for(const [league,name,years] of definitions){
 if(selected.length&&!selected.includes(league))continue;
 for(const year of years){
  let startDate=['uefa.nations','concacaf.nations.league','fifa.worldq.ofc'].includes(league)?`${year-1}-01-01`:league==='caf.nations'&&year===2026?'2025-12-01':`${year}-01-01`;
  let endDate=`${year}-12-31`;
  if(league==='concacaf.nations.league'){startDate=year===2021?'2019-07-01':year===2023?'2022-01-01':`${year-1}-07-01`;endDate=`${year}-07-01`;}

  const url=`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${startDate.replaceAll('-','')}-${endDate.replaceAll('-','')}&limit=1000`;
  try{
   const months=[];for(let d=new Date(startDate+'T00:00:00Z');d<=new Date(endDate+'T00:00:00Z');d.setUTCMonth(d.getUTCMonth()+1))months.push(d.toISOString().slice(0,7).replace('-',''));
   const events=[];
   for(let i=0;i<months.length;i+=3){const parts=await Promise.all(months.slice(i,i+3).map(async month=>{const response=await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${month}&limit=200`,{signal:AbortSignal.timeout(15000)});if(!response.ok)return [];return (await response.json()).events||[];}));events.push(...parts.flat());}
   const r={json:async()=>({events:[...new Map(events.map(e=>[e.id,e])).values()]})};
   const t={id:`${league}-${year}`,name:`${name} ${league==='uefa.euro'&&year===2021?'2020':year}`,startDate,endDate,source:url};
   if(league==='uefa.nations')t.name=`${name} ${year-1}/${String(year).slice(-2)}`;
   if(league==='caf.nations'&&year===2026)t.name='Afrika Uluslar Kupası 2025';
   const matches=normalizeScoreboard(await r.json(),t,new Date().toISOString()).filter(m=>m.status==='finished');
   if(matches.length){t.endDate=matches.map(m=>m.kickoff.slice(0,10)).sort().at(-1);t.matches=matches;tournaments.push(t);}
   console.log(league,year,matches.length);
  }catch(e){console.error(league,year,e.message);}
 }
}
if(!tournaments.length)throw Error('No archive records received; previous file preserved');
await writeFile('platform/team-history.json',JSON.stringify({source:'ESPN',updatedAt:new Date().toISOString(),tournaments}));
