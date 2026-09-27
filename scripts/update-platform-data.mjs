import fs from 'node:fs/promises';
import {validateFeed} from '../platform/model.mjs';
import {fetchScores} from '../platform/score-provider.mjs';
const catalog=JSON.parse(await fs.readFile('platform/catalog.json','utf8'));
const endpoint=process.env.PLATFORM_FEED_URL;
let data;
if(endpoint){
 if(new URL(endpoint).protocol!=='https:')throw Error('HTTPS feed required');
 const response=await fetch(endpoint,{signal:AbortSignal.timeout(30000),headers:process.env.PLATFORM_FEED_TOKEN?{Authorization:`Bearer ${process.env.PLATFORM_FEED_TOKEN}`}:{}});
 if(!response.ok)throw Error(`Platform feed HTTP ${response.status}`);
 data=validateFeed(await response.json());
}else data=await fetchScores(catalog.tournaments,{includeSchedule:true});
const known=new Set(catalog.tournaments.map(t=>t.id));
for(const m of data.matches)if(!known.has(m.tournamentId))throw Error('Unknown tournament');
const previous=validateFeed(JSON.parse(await fs.readFile('platform/current.json','utf8')));
// Keep historical results while refreshing the rolling current-score window.
const retained=new Map(previous.matches.filter(m=>m.status==='finished').map(m=>[m.id,m]));
for(const m of data.matches)retained.set(m.id,m);
data.matches=[...retained.values()];
await fs.writeFile('platform/current.json.tmp',JSON.stringify(data,null,2)+'\n');
await fs.rename('platform/current.json.tmp','platform/current.json');
console.log(`Score service updated: ${data.matches.length} matches (${data.source})`);
