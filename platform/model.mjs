export const ZONE = 'Europe/Istanbul';
export const LIVE_TTL = 5 * 60 * 1000;
export const dayKey = date => new Intl.DateTimeFormat('en-CA',{timeZone:ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(date));
export function stateOf(t, now = new Date()) {
  if (t.status === 'cancelled') return 'cancelled';
  if (t.status === 'completed') return 'archived';
  const day=dayKey(now);
  if(t.endDate && day>t.endDate) return 'archived';
  if(t.startDate && day>=t.startDate && t.endDate) return 'active';
  return 'upcoming';
}
export function fresh(m, now=new Date()) {
  const age=+now-Date.parse(m.updatedAt);
  return Number.isFinite(age) && age>=-60000 && age<=LIVE_TTL;
}
export function chooseHero(tournaments,matches,now=new Date()) {
  const live=matches.filter(m=>m.status==='live' && m.important && fresh(m,now)).sort((a,b)=>(b.priority||0)-(a.priority||0))[0];
  if(live) return {type:'live',item:live};
  const active=tournaments.filter(t=>t.major && stateOf(t,now)==='active').sort((a,b)=>b.priority-a.priority)[0];
  if(active) return {type:'active',item:active};
  const upcoming=tournaments.filter(t=>t.major && stateOf(t,now)==='upcoming').sort((a,b)=>(a.startDate||'9999').localeCompare(b.startDate||'9999'))[0];
  return upcoming?{type:'upcoming',item:upcoming}:{type:'fallback'};
}
export function filterMatches(matches, tab, now=new Date()) {
  const target=dayKey(new Date(+now+(tab==='tomorrow'?86400000:tab==='yesterday'?-86400000:0)));
  return matches.filter(m=>tab==='live'?m.status==='live'&&fresh(m,now):dayKey(m.kickoff)===target).sort((a,b)=>Date.parse(a.kickoff)-Date.parse(b.kickoff));
}
export function validateFeed(d) {
  if(!d || d.schemaVersion!==1 || !Array.isArray(d.matches)) throw new Error('Geçersiz maç verisi');
  const ids=new Set();
  for(const m of d.matches){
    if(!m.id || ids.has(m.id) || !m.tournamentId || !Number.isFinite(Date.parse(m.kickoff)) || !['scheduled','live','finished','postponed','cancelled'].includes(m.status) || !m.home?.name || !m.away?.name) throw new Error('Geçersiz maç kaydı');
    ids.add(m.id);
    for(const s of [m.home.score,m.away.score]) if(s!==null && s!==undefined && (!Number.isInteger(s)||s<0)) throw new Error('Geçersiz skor');
    if(m.status==='finished' && (!Number.isInteger(m.home.score)||!Number.isInteger(m.away.score))) throw new Error('Eksik sonuç');
    if(m.status==='live' && !Number.isFinite(Date.parse(m.updatedAt))) throw new Error('Güncelleme zamanı eksik');
  }
  return d;
}
export function previewMatches(matches,limit=5){return [...matches].sort((a,b)=>Number(b.home.code==='TUR'||b.away.code==='TUR')-Number(a.home.code==='TUR'||a.away.code==='TUR')||a.kickoff.localeCompare(b.kickoff)).slice(0,limit);}
export function matchStatus(m,now=new Date()){
 if(m.status==='live')return fresh(m,now)?'Canlı':'Son alınan skor · güncelleme bekleniyor';
 if(m.status==='scheduled'&&Date.parse(m.kickoff)<+now)return 'Başlama durumu bekleniyor';
 return {finished:'Tamamlandı',scheduled:'Planlandı',postponed:'Ertelendi',cancelled:'İptal edildi'}[m.status]||'Durum bekleniyor';
}
