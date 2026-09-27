import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../platform/'+p,import.meta.url),'utf8'));
const catalog=read('catalog.json');
test('four complete historical tournaments with correct final penalty scores',()=>{
 const finals={'2024-avrupa-sampiyonasi':[51,2,1,null,null],'2022-dunya-kupasi':[64,3,3,4,2],'2021-copa-america':[28,1,0,null,null],'2020-avrupa-sampiyonasi':[51,1,1,3,2]};
 for(const [id,[count,h,a,hp,ap]] of Object.entries(finals)){
  const d=read('archive/'+id+'.json');const final=d.matches.find(m=>m.stage==='final');assert.equal(d.matches.length,count);assert.equal(new Set(d.matches.map(m=>m.id)).size,count);assert.equal(final.home.score,h);assert.equal(final.away.score,a);assert.equal(final.home.pen,hp);assert.equal(final.away.pen,ap);
 }
});
test('every current and historical team has a local valid flag image',()=>{
 const codes=read('flag-codes.json');const teams=read('teams.json');const matches=[...read('current.json').matches,...catalog.tournaments.filter(t=>t.archiveData).flatMap(t=>read('archive/'+t.id+'.json').matches)];
 for(const side of [...teams,...matches.flatMap(m=>[m.home,m.away])]){
  assert.ok(codes[side.code],side.code);const b=fs.readFileSync(new URL('../platform/flags/'+codes[side.code]+'.png',import.meta.url));assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 }
});
