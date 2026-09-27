const TEAM_NAMES = {
  MEX:'Meksika',RSA:'Güney Afrika',CZE:'Çekya',KOR:'Güney Kore',CAN:'Kanada',QAT:'Katar',SUI:'İsviçre',BIH:'Bosna Hersek',BRA:'Brezilya',HAI:'Haiti',MAR:'Fas',SCO:'İskoçya',AUS:'Avustralya',PAR:'Paraguay',USA:'ABD',TUR:'Türkiye',GER:'Almanya',CIV:'Fildişi Sahili',ECU:'Ekvador',CUW:'Curaçao',NED:'Hollanda',JPN:'Japonya',TUN:'Tunus',SWE:'İsveç',BEL:'Belçika',EGY:'Mısır',IRN:'İran',NZL:'Yeni Zelanda',ESP:'İspanya',URU:'Uruguay',KSA:'Suudi Arabistan',CPV:'Cape Verde',FRA:'Fransa',SEN:'Senegal',NOR:'Norveç',IRQ:'Irak',ARG:'Arjantin',ALG:'Cezayir',AUT:'Avusturya',JOR:'Ürdün',ENG:'İngiltere',CRO:'Hırvatistan',GHA:'Gana',PAN:'Panama',POR:'Portekiz',UZB:'Özbekistan',COL:'Kolombiya',COD:'DR Kongo',DZA:'Cezayir'
};
const FLAGS = {ESP:'🇪🇸',ARG:'🇦🇷',FRA:'🇫🇷',ENG:'🏴',MAR:'🇲🇦',BEL:'🇧🇪',NOR:'🇳🇴',SUI:'🇨🇭',CAN:'🇨🇦',PAR:'🇵🇾',BRA:'🇧🇷',MEX:'🇲🇽',USA:'🇺🇸',POR:'🇵🇹',COL:'🇨🇴',EGY:'🇪🇬'};
const ROUND_BY_NO = n => n<=88?'r32':n<=96?'r16':n<=100?'qf':n<=102?'sf':n===103?'third':'final';
const ROUND_LABEL = {r32:'Son 32',r16:'Son 16',qf:'Çeyrek Final',sf:'Yarı Final',third:'Üçüncülük',final:'Final'};
const ROUND_ORDER = ['r32','r16','qf','sf','third','final'];
const $ = s => document.querySelector(s);
let matches=[];
let activeRound='all';

function name(code){ return TEAM_NAMES[code] || code || 'Belirsiz'; }
function localDate(value){
  if(!value) return '-';
  const d=new Date(value);
  return Number.isNaN(d.getTime())?'-':d.toLocaleString('tr-TR',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
}
function scoreText(side){
  if(side?.score==null) return '–';
  if(side?.pen!=null) return `${side.score} (${side.pen})`;
  return String(side.score);
}
function isFinished(m){ return String(m.status).toLowerCase()==='finished'; }
function winnerCode(m){
  if(m.winner) return m.winner;
  if(!isFinished(m)) return null;
  const hs=Number(m.home?.score), as=Number(m.away?.score);
  if(hs>as) return m.home?.code;
  if(as>hs) return m.away?.code;
  const hp=m.home?.pen, ap=m.away?.pen;
  if(hp!=null&&ap!=null) return Number(hp)>Number(ap)?m.home?.code:m.away?.code;
  return null;
}
function stageMatches(round){ return matches.filter(m=>ROUND_BY_NO(Number(m.n))===round).sort((a,b)=>a.n-b.n); }
function latestRelevantRound(){
  for(const r of ['final','third','sf','qf','r16','r32']){
    const list=stageMatches(r);
    if(list.some(m=>!isFinished(m))) return r;
  }
  return 'final';
}
function matchCard(m, compact=false){
  const win=winnerCode(m);
  return `<article class="match-card ${isFinished(m)?'finished':'scheduled'} ${compact?'compact':''}">
    <div class="match-meta"><span>M${m.n} · ${ROUND_LABEL[ROUND_BY_NO(m.n)]}</span><span>${isFinished(m)?'Tamamlandı':'Planlandı'}</span></div>
    <time>${localDate(m.date)}</time>
    <div class="team ${win===m.home?.code?'winner':''}"><span>${name(m.home?.code)}</span><b>${scoreText(m.home)}</b></div>
    <div class="team ${win===m.away?.code?'winner':''}"><span>${name(m.away?.code)}</span><b>${scoreText(m.away)}</b></div>
  </article>`;
}
function isFutureUnfinishedMatch(match) {
  if (isFinished(match)) return false;

  const matchTime = new Date(match?.date).getTime();

  return (
    Number.isFinite(matchTime) &&
    matchTime >= Date.now()
  );
}

function renderStats() {
  const knockoutMatches = matches.filter(
    match => Number(match.n) >= 73
  );

  const finishedMatches = knockoutMatches.filter(isFinished);

  const remainingMatches = knockoutMatches.filter(
    isFutureUnfinishedMatch
  );

  const finalMatch = stageMatches('final')[0];

  const finalists = new Set();

  if (finalMatch?.home?.code) {
    finalists.add(finalMatch.home.code);
  }

  if (finalMatch?.away?.code) {
    finalists.add(finalMatch.away.code);
  }

  $('#stats').innerHTML = [
    [knockoutMatches.length, 'Eleme maçı'],
    [finishedMatches.length, 'Tamamlanan'],
    [remainingMatches.length, 'Kalan maç'],
    [finalists.size || '-', 'Finalist']
  ].map(([value, label]) => `
    <div class="stat">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join('');
}
function renderHero(){
  const final=stageMatches('final')[0];
  const champ=final && isFinished(final) ? winnerCode(final) : null;
  if(champ){
    $('#heroTitle').textContent='Şampiyon Belli Oldu';
    $('#heroLead').textContent=`${name(champ)} kupanın sahibi oldu.`;
    const el=$('#championHero'); el.hidden=false;
    el.innerHTML=`<span class="champion-flag">${FLAGS[champ]||'🏆'}</span><div><small>2026 ŞAMPİYONU</small><strong>${name(champ)}</strong></div>`;
    launchConfetti();
  }
}
function renderTabs(){
  const rounds=['all','r16','qf','sf','third','final'];
  $('#roundTabs').innerHTML=rounds.map(r=>`<button type="button" data-round="${r}" class="${activeRound===r?'active':''}">${r==='all'?'Genel Bakış':ROUND_LABEL[r]}</button>`).join('');
  $('#roundTabs').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{activeRound=b.dataset.round;renderFinalCenter();renderTabs();}));
}
function renderFinalCenter(){
  const final=stageMatches('final')[0];
  const third=stageMatches('third')[0];
  const now=Date.now();
  const next=matches
    .filter(m=>Number(m.n)>=89&&!isFinished(m)&&new Date(m.date).getTime()>=now)
    .sort((a,b)=>new Date(a.date)-new Date(b.date));
  if(activeRound!=='all'){
    const list=stageMatches(activeRound);
    $('#finalCenter').innerHTML=`<div class="round-panel"><div class="round-title"><span>${ROUND_LABEL[activeRound]}</span><b>${list.length} maç</b></div><div class="match-grid">${list.map(m=>matchCard(m)).join('')}</div></div>`;
    return;
  }
  const finalists=[final?.home?.code,final?.away?.code].filter(Boolean);
  $('#finalCenter').innerHTML=`
    <div class="final-layout">
      <aside class="final-summary">
        <p class="eyebrow">KUPA MAÇI</p>
        <strong class="final-date">${localDate(final?.date)}</strong>
        <p>${finalists.length===2?`${name(finalists[0])} ile ${name(finalists[1])} şampiyonluk için karşılaşacak.`:'Final eşleşmesi bekleniyor.'}</p>
        <div class="finalists">${finalists.map(c=>`<span>${FLAGS[c]||'⚽'} ${name(c)}</span>`).join('')}</div>
      </aside>
      <div class="featured-matches">${final?matchCard(final):''}${third?matchCard(third):''}</div>
    </div>
    ${next.length?`<div class="next-strip"><div><small>SIRADAKİ MAÇ</small><strong>${name(next[0].home?.code)} – ${name(next[0].away?.code)}</strong></div><time>${localDate(next[0].date)}</time></div>`:''}`;
}
function renderBracket(){
  const rounds=['r16','qf','sf','final'];
  $('#bracketBoard').innerHTML=rounds.map(r=>`<section class="bracket-column"><h3>${ROUND_LABEL[r]}</h3>${stageMatches(r).map(m=>matchCard(m,true)).join('')}</section>`).join('');
}
function renderMatchFilter(){
  const options=['all',...ROUND_ORDER];
  $('#matchFilter').innerHTML=options.map(r=>`<option value="${r}">${r==='all'?'Tüm eleme maçları':ROUND_LABEL[r]}</option>`).join('');
  $('#matchFilter').addEventListener('change',renderMatches);
}
function renderMatches(){
  const filter=$('#matchFilter')?.value||'all';
  const list=matches.filter(m=>Number(m.n)>=73&&(filter==='all'||ROUND_BY_NO(m.n)===filter)).sort((a,b)=>a.n-b.n);
  $('#matchList').innerHTML=list.map(m=>matchCard(m)).join('');
}
function launchConfetti(){
  if(sessionStorage.getItem('yk_confetti_v3')) return;
  sessionStorage.setItem('yk_confetti_v3','1');
  const layer=$('#confettiLayer');
  for(let i=0;i<90;i++){
    const p=document.createElement('i');
    p.style.left=`${Math.random()*100}%`; p.style.animationDelay=`${Math.random()*1.5}s`; p.style.animationDuration=`${2.5+Math.random()*2}s`; p.style.setProperty('--r',`${Math.random()*720-360}deg`);
    layer.appendChild(p);
  }
  setTimeout(()=>layer.replaceChildren(),6000);
}
async function load(){
  try{
    const res=await fetch('data/matches.json',{cache:'no-store'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    matches=(Array.isArray(data)?data:data.matches||[]).sort((a,b)=>Number(a.n)-Number(b.n));
    if(!matches.length) throw new Error('Maç listesi boş');
    $('#dataState').textContent='Veri yüklendi';
    $('#updatedAt').textContent=data.updatedAt?localDate(data.updatedAt):'Güncellendi';
    activeRound='all';
    renderHero(); renderStats(); renderTabs(); renderFinalCenter(); renderBracket(); renderMatchFilter(); renderMatches();
  }catch(err){
    console.error(err); $('#dataState').textContent='Veri alınamadı'; $('#updatedAt').textContent=err.message;
  }
}
$('#themeBtn').addEventListener('click',()=>document.body.classList.toggle('light'));
load();
