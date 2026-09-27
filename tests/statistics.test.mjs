import {test} from 'node:test';
import assert from 'node:assert/strict';
import {matchStatistics,teamHistory} from '../platform/statistics.mjs';
test('Only completed scores count towards goals and average',()=>{
 const match=(status,a,b)=>({status,home:{score:a},away:{score:b}});
 assert.deepEqual(matchStatistics([match('finished',2,1),match('live',4,3),match('scheduled',null,null)]),{total:3,finished:1,live:1,scheduled:1,goals:3,average:'3.00'});
});
test('Latest five tournaments are selected only from country participation',()=>{
 const list=Array.from({length:8},(_,i)=>({endDate:`202${i}-01-01`,matches:[{home:{code:i===7?'FRA':'TUR'},away:{code:'GER'}}]}));
 const result=teamHistory(list,'TUR');assert.equal(result.length,5);assert.equal(result[0].endDate,'2026-01-01');assert.equal(result[4].endDate,'2022-01-01');
});
import fs from 'node:fs';
test('All 48 country pages have five participation archives',()=>{
 const history=JSON.parse(fs.readFileSync(new URL('../platform/team-history.json',import.meta.url)));
 const teams=JSON.parse(fs.readFileSync(new URL('../platform/teams.json',import.meta.url)));
 const legacy=JSON.parse(fs.readFileSync(new URL('../turnuvalar/arsiv/2026-dunya-kupasi/data/matches.json',import.meta.url)));
 for(const team of teams)assert.equal(teamHistory([{endDate:'2026-07-19',matches:legacy.matches},...history.tournaments],team.code).length,5,team.code);
});
