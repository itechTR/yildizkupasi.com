import fs from 'node:fs/promises';
const file='platform/rankings.json',source='https://inside.fifa.com/fifa-rankings/world-ranking/men';
const previous=await fs.readFile(file,'utf8').then(JSON.parse).catch(()=>null);
if(previous&&Date.now()-Date.parse(previous.checkedAt)<86400000&&!process.argv.includes('--force'))process.exit(0);
try{
 const html=await fetch(source,{signal:AbortSignal.timeout(20000)}).then(r=>{if(!r.ok)throw Error(r.status);return r.text();});
 const data=JSON.parse(html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1]||'{}').props?.pageProps?.pageData?.ranking;
 const latest=data?.allAvailableDates?.filter(d=>Date.parse(d.date)<=Date.now()).sort((a,b)=>b.date.localeCompare(a.date))[0];
 if(!latest)throw Error('Official ranking publication not found');
 const url=`https://api.fifa.com/api/v3/fifarankings/rankings/rankingsbyschedule?rankingScheduleId=${encodeURIComponent(latest.id)}&count=300`;
 const payload=await fetch(url,{signal:AbortSignal.timeout(20000)}).then(r=>{if(!r.ok)throw Error(r.status);return r.json();});
 const rows=payload.Results?.filter(r=>Number.isInteger(r.Rank)&&r.Rank>0).map(r=>({code:r.IdCountry,name:r.TeamName?.[0]?.Description,rank:r.Rank,previousRank:r.PrevRank,points:r.TotalPoints,movement:r.RankingMovement,confederation:r.ConfederationName}));
 if(!rows||rows.length<150||new Set(rows.map(r=>r.code)).size!==rows.length||rows.some(r=>!r.name||!Number.isFinite(r.points)))throw Error('Invalid ranking rows');
 const result={source,provider:'FIFA',publicationDate:latest.date,nextUpdateDate:data.nextUpdateDate,checkedAt:new Date().toISOString(),scheduleId:latest.id,rows:rows.sort((a,b)=>a.rank-b.rank)};
 await fs.writeFile(file+'.tmp',JSON.stringify(result,null,2));await fs.rename(file+'.tmp',file);console.log(`Official FIFA ranking: ${rows.length} teams, ${latest.date}`);
}catch(error){console.error('Ranking update failed; previous verified list retained:',error.message);if(!previous)process.exitCode=1;}
