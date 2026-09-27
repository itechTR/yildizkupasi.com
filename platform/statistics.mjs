export function matchStatistics(matches){
 const finished=matches.filter(m=>m.status==='finished'&&Number.isFinite(m.home.score)&&Number.isFinite(m.away.score));
 const goals=finished.reduce((n,m)=>n+m.home.score+m.away.score,0);
 return {total:matches.length,finished:finished.length,live:matches.filter(m=>m.status==='live').length,scheduled:matches.filter(m=>m.status==='scheduled').length,goals,average:finished.length?(goals/finished.length).toFixed(2):'—'};
}
export function teamHistory(tournaments,code){return tournaments.map(t=>({...t,matches:t.matches.filter(m=>m.home.code===code||m.away.code===code)})).filter(t=>t.matches.length).sort((a,b)=>b.endDate.localeCompare(a.endDate)).slice(0,5);}
