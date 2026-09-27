import {dayKey,validateFeed} from './model.mjs';
export const translations={'Türkiye':'Türkiye','France':'Fransa','Georgia':'Gürcistan','Northern Ireland':'Kuzey İrlanda','Armenia':'Ermenistan','Latvia':'Letonya','Italy':'İtalya','Belgium':'Belçika','Hungary':'Macaristan','Ukraine':'Ukrayna','Poland':'Polonya','Bosnia-Herzegovina':'Bosna Hersek','Sweden':'İsveç','Romania':'Romanya','Montenegro':'Karadağ','Cyprus':'Kıbrıs','Andorra':'Andorra','Malta':'Malta','Netherlands':'Hollanda','Germany':'Almanya','Serbia':'Sırbistan','Greece':'Yunanistan','Norway':'Norveç','Denmark':'Danimarka','Portugal':'Portekiz','Wales':'Galler','Austria':'Avusturya','Israel':'İsrail','Kosovo':'Kosova','Republic of Ireland':'İrlanda','Liechtenstein':'Lihtenştayn','Lithuania':'Litvanya','Slovenia':'Slovenya','Scotland':'İskoçya','San Marino':'San Marino','Finland':'Finlandiya','Faroe Islands':'Faroe Adaları','Kazakhstan':'Kazakistan','Bulgaria':'Bulgaristan','Luxembourg':'Lüksemburg','Iceland':'İzlanda','Estonia':'Estonya','Czechia':'Çekya','Croatia':'Hırvatistan','England':'İngiltere','Spain':'İspanya','North Macedonia':'Kuzey Makedonya','Switzerland':'İsviçre','Albania':'Arnavutluk','Belarus':'Belarus','Slovakia':'Slovakya','Moldova':'Moldova','Azerbaijan':'Azerbaycan','Gibraltar':'Cebelitarık'};
export function normalizeScoreboard(payload,tournament,observedAt){
 if(!Array.isArray(payload?.events))throw Error('Invalid scoreboard response');
 return payload.events.map(event=>{
  const c=event.competitions?.[0];
  const home=c?.competitors?.find(s=>s.homeAway==='home'),away=c?.competitors?.find(s=>s.homeAway==='away');
  if(!home||!away||!event.id||!Number.isFinite(Date.parse(event.date)))throw Error('Invalid scoreboard event');
  const type=(c.status||event.status)?.type;
  let status;
  if(/CANCEL/i.test(type?.name))status='cancelled';
  else if(/POSTPON|SUSPEND|DELAY|ABANDON/i.test(type?.name))status='postponed';
  else if(type?.completed===true)status='finished';
  else if(type?.state==='in')status='live';
  else if(type?.state==='pre')status='scheduled';
  else throw Error('Unknown scoreboard status');
  const side=s=>({code:s.team.abbreviation,name:translations[s.team.displayName]||s.team.displayName,pen:s.shootoutScore!=null?Number(s.shootoutScore):null,winner:s.winner===true,score:['finished','live'].includes(status)&&/^\d+$/.test(String(s.score))?Number(s.score):null});
  return {id:'espn-'+event.id,tournamentId:tournament.id,kickoff:event.date,stage:event.season?.slug||'unknown',group:c.group?.name||null,status,updatedAt:observedAt,source:'ESPN',important:status==='live',priority:[home.team.abbreviation,away.team.abbreviation].includes('TUR')?100:50,home:side(home),away:side(away)};
 }).filter(m=>{const day=dayKey(m.kickoff);return day>=tournament.startDate&&day<=tournament.endDate;});
}
export async function fetchScores(tournaments,{now=new Date(),fetcher=fetch,includeSchedule=false}={}){
 const dates=[-2,-1,0,1].map(offset=>dayKey(new Date(+now+offset*86400000)).replaceAll('-',''));
 if(includeSchedule)for(let i=0;i<3;i++){const d=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+i,1));dates.push(d.toISOString().slice(0,7).replace('-',''));}
 const enabled=tournaments.filter(t=>t.scoreProvider?.name==='espn'&&t.startDate<=dayKey(new Date(+now+86400000))&&t.endDate>=dayKey(new Date(+now-2*86400000)));
 if(!enabled.length)return validateFeed({schemaVersion:1,source:'ESPN',updatedAt:now.toISOString(),matches:[]});
 const batches=await Promise.all(enabled.flatMap(t=>dates.map(async date=>{
  if(!/^[a-z0-9.]+$/.test(t.scoreProvider.league))throw Error('Invalid competition');
  const url=`https://site.api.espn.com/apis/site/v2/sports/soccer/${t.scoreProvider.league}/scoreboard?dates=${date}&limit=200`;
  const response=await fetcher(url,{signal:AbortSignal.timeout(12000),cache:'no-store'});
  if(!response.ok)throw Error(`Scoreboard HTTP ${response.status}`);
  // A successful read is an observation, not a fabricated provider event timestamp.
  const observedAt=new Date().toISOString();
  return normalizeScoreboard(await response.json(),t,observedAt);
 })));
 const matches=[...new Map(batches.flat().map(m=>[m.id,m])).values()];
 return validateFeed({schemaVersion:1,source:'ESPN',updatedAt:new Date().toISOString(),matches});
}
