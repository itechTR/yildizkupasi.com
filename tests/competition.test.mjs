import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {competitionMatches,roundOf,groupTable} from '../platform/competition.mjs';
const feed=JSON.parse(fs.readFileSync('platform/current.json'));
const tournament=JSON.parse(fs.readFileSync('platform/catalog.json')).tournaments.find(t=>t.scoreProvider);
test('All league fixtures map to a matchweek and A1 week two includes Turkey',()=>{
 const all=competitionMatches(feed.matches,tournament);
 assert.ok(all.length>=156);
 assert.ok(all.every(m=>roundOf(m,tournament)>0));
 const selected=competitionMatches(all,tournament,{league:'A',group:'A1',round:'2'});
 assert.equal(selected.length,2);
 assert.ok(selected.some(m=>m.home.code==='TUR'&&m.away.code==='ITA'));
});
test('Standings ignore scheduled default scores',()=>{
 const matches=[{status:'finished',home:{code:'A',name:'A',score:2},away:{code:'B',name:'B',score:1}},{status:'scheduled',home:{code:'A',name:'A',score:0},away:{code:'B',name:'B',score:0}}];
 const rows=groupTable(matches);assert.equal(rows[0].points,3);assert.equal(rows[0].played,1);assert.equal(rows[1].points,0);
});
test('Official ranking has unique countries, numeric points and publication metadata',()=>{
 const r=JSON.parse(fs.readFileSync('platform/rankings.json'));
 assert.ok(r.rows.length>=200);assert.equal(new Set(r.rows.map(x=>x.code)).size,r.rows.length);
 assert.ok(r.rows.every(x=>Number.isFinite(x.points)&&x.rank>0));assert.ok(Date.parse(r.publicationDate)<=Date.parse(r.checkedAt));
});
