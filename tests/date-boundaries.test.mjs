import test from 'node:test';import assert from 'node:assert/strict';
import {dayKey,filterMatches,previewMatches,matchStatus} from '../platform/model.mjs';
const fixture=(id,kickoff,code='GER')=>({id,kickoff,status:'scheduled',home:{code,name:code},away:{code:'ITA',name:'İtalya'}});
test('Istanbul midnight changes today and tomorrow without using the feed date',()=>{
 const list=[fixture('old','2026-09-26T18:45:00Z'),fixture('today','2026-09-27T13:00:00Z'),fixture('turkey','2026-09-28T18:45:00Z','TUR')];
 const now=new Date('2026-09-27T07:00:00Z');assert.equal(dayKey(now),'2026-09-27');assert.deepEqual(filterMatches(list,'today',now).map(m=>m.id),['today']);assert.deepEqual(filterMatches(list,'tomorrow',now).map(m=>m.id),['turkey']);assert.equal(dayKey('2026-09-26T21:00:00Z'),'2026-09-27');
});
test('Turkey is included even after the first five fixtures',()=>{const list=Array.from({length:8},(_,i)=>fixture(String(i),'2026-09-28T18:45:00Z',i===7?'TUR':'GER'));assert.equal(previewMatches(list)[0].home.code,'TUR');assert.equal(previewMatches(list).length,5);assert.equal(list[0].id,'0');});
test('A past scheduled game is not presented as a confirmed future fixture',()=>{assert.equal(matchStatus(fixture('a','2026-09-26T12:00Z'),new Date('2026-09-27T12:00Z')),'Başlama durumu bekleniyor');});
