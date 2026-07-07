const T = {
  tr: {
    'nav.matches': 'Maçlar',
    'nav.groups': 'Gruplar',
    'nav.intelligence': 'Şampiyonluk Radarı',
    'nav.turkiye': 'Türkiye Merkezi',
    'nav.briefing': 'Günlük Not',
    'hero.eyebrow': 'Bağımsız Dünya Kupası Analiz Merkezi',
    'hero.title': 'Yıldız Kupası AI',
    'hero.lead': 'Skorları izler, grupları hesaplar, olasılıkları yorumlar ve turnuvayı hikâyeye dönüştürür.',
    'hero.cta': 'Türkiye paneline bak',
    'hero.cta2': 'Bugünün notunu oku',
    'today.eyebrow': 'Bugün Ne Oldu?',
    'today.title': 'AI Turnuva Özeti',
    'insight.eyebrow': 'Sinyaller',
    'insight.title': 'Turnuva Radarı',
    'matches.eyebrow': 'Match Center',
    'matches.title': 'Maçlar',
    'groups.eyebrow': 'Puan Durumu',
    'groups.title': 'Gruplar',
    'intel.eyebrow': 'AI Analiz',
    'intel.title': 'Şampiyonluk Radarı',
    'tr.eyebrow': 'Türkiye Merkezi',
    'tr.title': 'Türkiye’nin Turnuva Panosu',
    'brief.eyebrow': 'Günlük Bülten',
    'brief.title': 'Yıldız Kupası Notu',
    'footer.copy': 'Bağımsız futbol bilgi ve analiz platformudur. FIFA®, FIFA World Cup® veya resmi organizatörlerle bağlantılı değildir. Tüm marka ve ticari işaretler sahiplerine aittir.'
  },
  en: {
    'nav.matches': 'Matches',
    'nav.groups': 'Groups',
    'nav.intelligence': 'Tournament Intelligence',
    'nav.turkiye': 'Türkiye Hub',
    'nav.briefing': 'Daily Brief',
    'hero.eyebrow': 'Independent World Cup Intelligence Center',
    'hero.title': 'Yıldız Kupası AI',
    'hero.lead': 'Tracks scores, calculates standings, interprets probabilities and turns the tournament into a story.',
    'hero.cta': 'Track matches',
    'hero.cta2': 'Read today’s brief',
    'today.eyebrow': 'What Happened Today?',
    'today.title': 'AI Tournament Summary',
    'insight.eyebrow': 'Signals',
    'insight.title': 'Tournament Radar',
    'matches.eyebrow': 'Match Center',
    'matches.title': 'Matches',
    'groups.eyebrow': 'Standings',
    'groups.title': 'Groups',
    'intel.eyebrow': 'AI Analysis',
    'intel.title': 'Champion Radar',
    'tr.eyebrow': 'Türkiye Hub',
    'tr.title': 'Türkiye Tournament Board',
    'brief.eyebrow': 'Daily Brief',
    'brief.title': 'Yıldız Kupası Note',
    'footer.copy': 'An independent football information and analysis platform. Not affiliated with FIFA®, FIFA World Cup® or any official tournament organizer. All trademarks belong to their respective owners.'
  }
};

const teamNames = {
  MEX: 'Meksika', RSA: 'Güney Afrika', CZE: 'Çekya', KOR: 'Güney Kore',
  CAN: 'Kanada', QAT: 'Katar', SUI: 'İsviçre', BIH: 'Bosna Hersek',
  BRA: 'Brezilya', HAI: 'Haiti', MAR: 'Fas', SCO: 'İskoçya',
  AUS: 'Avustralya', PAR: 'Paraguay', USA: 'ABD', TUR: 'Türkiye',
  GER: 'Almanya', CIV: 'Fildişi Sahili', ECU: 'Ekvador', CUW: 'Curaçao',
  NED: 'Hollanda', JPN: 'Japonya', TUN: 'Tunus', SWE: 'İsveç',
  BEL: 'Belçika', EGY: 'Mısır', IRN: 'İran', NZL: 'Yeni Zelanda',
  ESP: 'İspanya', URU: 'Uruguay', KSA: 'Suudi Arabistan', CPV: 'Cape Verde',
  FRA: 'Fransa', SEN: 'Senegal', NOR: 'Norveç', IRQ: 'Irak',
  ARG: 'Arjantin', ALG: 'Cezayir', AUT: 'Avusturya', JOR: 'Ürdün',
  ENG: 'İngiltere', CRO: 'Hırvatistan', GHA: 'Gana', PAN: 'Panama',
  POR: 'Portekiz', UZB: 'Özbekistan', COL: 'Kolombiya', COD: 'DR Kongo', HTI: 'Haiti', DZA: 'Cezayir'
};

const groupMap = {
  A: ['MEX', 'RSA', 'CZE', 'KOR'],
  B: ['CAN', 'QAT', 'SUI', 'BIH'],
  C: ['BRA', 'HAI', 'MAR', 'SCO'],
  D: ['AUS', 'PAR', 'TUR', 'USA'],
  E: ['GER', 'CIV', 'ECU', 'CUW'],
  F: ['NED', 'JPN', 'TUN', 'SWE'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'URU', 'KSA', 'CPV'],
  I: ['FRA', 'SEN', 'NOR', 'IRQ'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'UZB', 'COL', 'COD'],
  L: ['ENG', 'CRO', 'GHA', 'PAN']
};

const AUTO_QUALIFY_LIMIT = 2;
const BEST_THIRD_QUALIFY_LIMIT = 8;
const GROUP_COUNT = 12;

// FIFA 2026 Round of 32 slot yapısı: ilk iki takım doğrudan, en iyi 8 üçüncü takım slot havuzlarına göre yerleşir.
const ROUND_OF_32_TEMPLATE = [
  { no: 73, home: { type: 'runner', group: 'A' }, away: { type: 'runner', group: 'B' } },
  { no: 74, home: { type: 'winner', group: 'E' }, away: { type: 'third', groups: ['A', 'B', 'C', 'D', 'F'] } },
  { no: 75, home: { type: 'winner', group: 'F' }, away: { type: 'runner', group: 'C' } },
  { no: 76, home: { type: 'winner', group: 'C' }, away: { type: 'runner', group: 'F' } },
  { no: 77, home: { type: 'winner', group: 'I' }, away: { type: 'third', groups: ['C', 'D', 'F', 'G', 'H'] } },
  { no: 78, home: { type: 'runner', group: 'E' }, away: { type: 'runner', group: 'I' } },
  { no: 79, home: { type: 'winner', group: 'A' }, away: { type: 'third', groups: ['C', 'E', 'F', 'H', 'I'] } },
  { no: 80, home: { type: 'winner', group: 'L' }, away: { type: 'third', groups: ['E', 'H', 'I', 'J', 'K'] } },
  { no: 81, home: { type: 'winner', group: 'D' }, away: { type: 'third', groups: ['B', 'E', 'F', 'I', 'J'] } },
  { no: 82, home: { type: 'winner', group: 'G' }, away: { type: 'third', groups: ['A', 'E', 'H', 'I', 'J'] } },
  { no: 83, home: { type: 'runner', group: 'K' }, away: { type: 'runner', group: 'L' } },
  { no: 84, home: { type: 'winner', group: 'H' }, away: { type: 'runner', group: 'J' } },
  { no: 85, home: { type: 'winner', group: 'B' }, away: { type: 'third', groups: ['E', 'F', 'G', 'I', 'J'] } },
  { no: 86, home: { type: 'winner', group: 'J' }, away: { type: 'runner', group: 'H' } },
  { no: 87, home: { type: 'winner', group: 'K' }, away: { type: 'third', groups: ['D', 'E', 'I', 'J', 'L'] } },
  { no: 88, home: { type: 'runner', group: 'D' }, away: { type: 'runner', group: 'G' } }
];

let lang = 'tr';
localStorage.setItem('yk_lang', 'tr');
let focus = localStorage.getItem('yk_focus') || 'TUR';
let allMatches = [];
let probs = [];
let briefingData = null;
let turkiyeData = null;
let intelligenceData = null;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function t(k) {
  return T[lang]?.[k] || T.tr[k] || k;
}

function name(code) {
  return teamNames[code] || code || '-';
}

function safeText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value;
}

function safeHTML(selector, value) {
  const el = $(selector);
  if (el) el.innerHTML = value;
}

function applyLang() {
  document.documentElement.lang = lang;

  $$('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  safeText('#langBtn', lang === 'tr' ? 'EN' : 'TR');

  const search = $('#search');
  if (search) {
    search.placeholder = lang === 'tr'
      ? 'Takım, grup veya aşama ara'
      : 'Search team, group or stage';
  }

  renderAll();
}

async function fetchJson(path, fallback) {
  const response = await fetch(path, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`${path} okunamadı. HTTP ${response.status}`);
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error(`${path} geçerli JSON değil`);
  }
}

async function load() {
  try {
    safeText('#liveState', lang === 'tr' ? 'Veri yükleniyor' : 'Loading data');
    safeText('#updatedAt', lang === 'tr' ? 'Bekleniyor' : 'Waiting');

    const [m, p, briefing, turkiye, intelligence] = await Promise.all([
      fetchJson('data/matches.json', { matches: [] }),
      fetchJson('data/probs.json', { teams: [] }).catch(() => ({ teams: [] })),
      fetchJson('data/briefing.json', null).catch(() => null),
      fetchJson('data/turkiye.json', null).catch(() => null),
      fetchJson('data/intelligence.json', null).catch(() => null)
    ]);

    allMatches = Array.isArray(m) ? m : (m.matches || []);
    probs = normalizeProbabilities(p);

    briefingData = briefing;
    turkiyeData = turkiye;
    intelligenceData = intelligence;

    if (!Array.isArray(allMatches)) {
      throw new Error('matches.json içinde maç listesi bulunamadı');
    }

    initControls();

    safeText('#liveState', lang === 'tr' ? 'Veri yüklendi' : 'Data loaded');
    safeText('#updatedAt', new Date().toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US'));

    renderAll();

  } catch (e) {
    console.error('Yıldız Kupası veri/render hatası:', e);

    safeText('#liveState', lang === 'tr' ? 'Veri alınamadı' : 'Data unavailable');
    safeText('#updatedAt', e.message || (lang === 'tr' ? 'Bilinmeyen hata' : 'Unknown error'));
  }
}

function normalizeProbabilities(p) {
  if (Array.isArray(p)) return p;

  if (Array.isArray(p.teams)) return p.teams;
  if (Array.isArray(p.probs)) return p.probs;

  return [];
}

function initControls() {
  ensureMatchupsNav();
  const teams = [...new Set(Object.values(groupMap).flat())]
    .sort((a, b) => name(a).localeCompare(name(b), 'tr'));

  const teamFocus = $('#teamFocus');
  if (teamFocus) {
    teamFocus.innerHTML = teams
      .map(c => `<option value="${c}" ${c === focus ? 'selected' : ''}>${name(c)}</option>`)
      .join('');
  }

  const stageFilter = $('#stageFilter');
  if (stageFilter) {
    stageFilter.innerHTML = `
      <option value="all">${lang === 'tr' ? 'Tüm aşamalar' : 'All stages'}</option>
      <option value="group">${lang === 'tr' ? 'Grup' : 'Group'}</option>
      <option value="knockout">${lang === 'tr' ? 'Eleme' : 'Knockout'}</option>
    `;
  }
}


function isTurkiyeEliminated() {
  const statusText = [
    turkiyeData?.tournamentStatus,
    turkiyeData?.qualificationSignal,
    turkiyeData?.analysis
  ].join(' ').toLocaleLowerCase('tr-TR');

  const position = Number(turkiyeData?.position || 0);

  const played = Array.isArray(turkiyeData?.playedMatches)
    ? turkiyeData.playedMatches
    : [];

  const upcoming = Array.isArray(turkiyeData?.upcomingMatches)
    ? turkiyeData.upcomingMatches
    : [];

  return (
    statusText.includes('eliminated') ||
    statusText.includes('veda') ||
    statusText.includes('elendi') ||
    (position >= 4 && played.length >= 3 && upcoming.length === 0)
  );
}

function renderAll() {
  if (!allMatches.length) return;

  initControls();
  ensureBracketStyles();
  initFinalRoadControls();

  const turkeyEliminated = isTurkiyeEliminated();
  const hideQualificationPanel = focus === 'TUR' && turkeyEliminated;

  if ($('#stats')) renderStats();
  if ($('#finalRoadBoard')) renderFinalRoad();
  if ($('#aiSummary')) renderSummary();
  if ($('#radar')) renderRadar();
  if ($('#matchList')) renderMatches();

  const intelligencePanel = $('#intelligence');
  if (intelligencePanel) {
    intelligencePanel.style.display = hideQualificationPanel ? 'none' : '';
  }

  if ($('#probabilities') && !hideQualificationPanel) {
    renderProbabilities();
  }

  ensureMatchupsPanel();

  if ($('#possibleMatchups')) {
    renderMatchupsProjection();
  }

  if ($('#turkiyeCenter')) {
    renderTurkiye();
  }

  if ($('#dailyBrief')) {
    renderBrief();
  }
}

function renderStats() {
  const played = allMatches.filter(m => m.status === 'finished').length;
  const live = allMatches.filter(m => m.status === 'in_play' || m.status === 'live').length;

  safeHTML('#stats', [
    ['104', lang === 'tr' ? 'Maç' : 'Matches'],
    ['48', lang === 'tr' ? 'Takım' : 'Teams'],
    [played, lang === 'tr' ? 'Tamamlanan' : 'Finished'],
    [live, lang === 'tr' ? 'Canlı' : 'Live']
  ].map(x => `
    <div class="stat">
      <strong>${x[0]}</strong>
      <span>${x[1]}</span>
    </div>
  `).join(''));
}

function renderSummary() {
  if (briefingData) {
    let html = '';

    if (briefingData.summary?.length) {
      html += briefingData.summary
        .map(line => `<p>${line}</p>`)
        .join('');
    }

    if (briefingData.latestResults?.length) {
      html += `<p><strong>Son sonuçlar:</strong> ${
        briefingData.latestResults.map(x => x.text).join(', ')
      }.</p>`;
    }

    if (briefingData.biggestSignals?.length) {
      html += `<p><strong>Turnuva sinyali:</strong> ${
        briefingData.biggestSignals.map(x => `${x.signal}: ${x.text}`).join(' | ')
      }</p>`;
    }

    if (briefingData.editorialNote) {
      html += `<p>${briefingData.editorialNote}</p>`;
    }

    safeHTML('#aiSummary', html);
    return;
  }

  const last = allMatches.filter(m => m.status === 'finished').slice(-3);
  const next = allMatches.filter(m => m.status !== 'finished').slice(0, 3);

  let html = '';

  if (last.length) {
    html += `<p><strong>${lang === 'tr' ? 'Son tablo' : 'Latest picture'}:</strong> ${
      last.map(m => `${name(m.home.code)} ${m.home.score}-${m.away.score} ${name(m.away.code)}`).join(', ')
    }.</p>`;
  }

  html += `<p><strong>${lang === 'tr' ? 'Sıradaki maçlar' : 'Next matches'}:</strong> ${
    next.map(m => `${name(m.home.code)} - ${name(m.away.code)}`).join(', ') || '-'
  }.</p>`;

  safeHTML('#aiSummary', html);
}

function renderRadar() {
  if (intelligenceData?.radar?.length) {
    safeHTML('#radar', intelligenceData.radar.map(item => `
      <div class="signal">
        <b>${item.title}</b>
        <span>${item.text}</span>
      </div>
    `).join(''));
    return;
  }

  const standings = calcStandings();
  const focusGroup = Object.entries(groupMap).find(([g, arr]) => arr.includes(focus))?.[0];
  const table = standings[focusGroup] || [];
  const pos = table.findIndex(x => x.code === focus) + 1;
  const live = allMatches.find(m => ['in_play', 'live'].includes(m.status));

  safeHTML('#radar', [
    [
      lang === 'tr' ? 'Odak takım' : 'Focus team',
      `${name(focus)} ${focusGroup ? focusGroup + ' Grubu' : ''} ${pos ? `• ${pos}. sıra` : ''}`
    ],
    [
      lang === 'tr' ? 'Canlı takip' : 'Live watch',
      live
        ? `${name(live.home.code)} - ${name(live.away.code)} (${live.time || ''})`
        : (lang === 'tr' ? 'Şu an canlı maç görünmüyor' : 'No live match visible')
    ]
  ].map(([b, s]) => `
    <div class="signal">
      <b>${b}</b>
      <span>${s}</span>
    </div>
  `).join(''));
}

function filteredMatches() {
  const search = $('#search');
  const stageFilter = $('#stageFilter');

  const q = search ? search.value.toLowerCase() : '';
  const st = stageFilter ? stageFilter.value : 'all';

  return allMatches.filter(m => {
    const text = [
      m.stage,
      m.group,
      name(m.home?.code),
      name(m.away?.code),
      m.home?.code,
      m.away?.code
    ].join(' ').toLowerCase();

    const stageOk =
      st === 'all' ||
      (st === 'knockout' ? m.stage !== 'group' : m.stage === st);

    return text.includes(q) && stageOk;
  }).slice(0, 80);
}

function renderMatches() {
  const rows = filteredMatches();

  safeHTML('#matchList', rows.map(m => {
    const cls = m.status === 'finished'
      ? 'finished'
      : (['in_play', 'live'].includes(m.status) ? 'live' : '');

    const d = new Date(m.date);

    return `
      <article class="match ${cls}">
        <div class="match-head">
          <span>${m.stage === 'group' ? (lang === 'tr' ? 'Grup ' : 'Group ') + m.group : m.stage}</span>
          <span>${d.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
        <div class="teams">
          <div class="team-row">
            <span>${name(m.home?.code)}</span>
            <span class="score">${m.home?.score ?? '-'}</span>
          </div>
          <div class="team-row">
            <span>${name(m.away?.code)}</span>
            <span class="score">${m.away?.score ?? '-'}</span>
          </div>
        </div>
        <div class="ai-note">${matchNote(m)}</div>
      </article>
    `;
  }).join(''));
}

function matchNote(m) {
  if (m.status === 'finished') {
    return lang === 'tr'
      ? 'Maç tamamlandı. Sonuç grup/eleme dengelerini otomatik etkiler.'
      : 'Finished. Result updates group/knockout balance automatically.';
  }

  if (['in_play', 'live'].includes(m.status)) {
    return lang === 'tr'
      ? 'Canlı maç. Veri akışı güncellendikçe skor ve zaman yenilenir.'
      : 'Live match. Score and clock refresh as data updates.';
  }

  return lang === 'tr'
    ? 'Planlanan maç. Başlama saatleri yerel saate göre gösterilir.'
    : 'Scheduled match. Kick-off is shown in local time.';
}

function calcStandings() {
  const s = {};

  for (const [g, teams] of Object.entries(groupMap)) {
    s[g] = teams.map(code => ({
      code,
      p: 0,
      w: 0,
      d: 0,
      l: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0
    }));
  }

  const get = (g, c) => s[g]?.find(x => x.code === c);

  allMatches
    .filter(m =>
      m.stage === 'group' &&
      m.status === 'finished' &&
      m.home?.score != null &&
      m.away?.score != null
    )
    .forEach(m => {
      const h = get(m.group, m.home.code);
      const a = get(m.group, m.away.code);

      if (!h || !a) return;

      h.p++;
      a.p++;

      h.gf += m.home.score;
      h.ga += m.away.score;
      a.gf += m.away.score;
      a.ga += m.home.score;

      h.gd = h.gf - h.ga;
      a.gd = a.gf - a.ga;

      if (m.home.score > m.away.score) {
        h.w++;
        a.l++;
        h.pts += 3;
      } else if (m.home.score < m.away.score) {
        a.w++;
        h.l++;
        a.pts += 3;
      } else {
        h.d++;
        a.d++;
        h.pts++;
        a.pts++;
      }
    });

  for (const g in s) {
    s[g].sort((a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      name(a.code).localeCompare(name(b.code), 'tr')
    );
  }

  return s;
}

function renderGroups() {
  const s = calcStandings();

  safeHTML('#groupTables', Object.entries(s).map(([g, rows]) => `
    <div class="group">
      <h3>${g} ${lang === 'tr' ? 'Grubu' : 'Group'}</h3>
      <table>
        <thead>
          <tr>
            <th>${lang === 'tr' ? 'Takım' : 'Team'}</th>
            <th>O</th>
            <th>G</th>
            <th>B</th>
            <th>M</th>
            <th>AV</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr class="${r.code === focus ? 'focus' : ''}">
              <td>${name(r.code)}</td>
              <td>${r.p}</td>
              <td>${r.w}</td>
              <td>${r.d}</td>
              <td>${r.l}</td>
              <td>${r.gd}</td>
              <td><b>${r.pts}</b></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join(''));
}


function getEliminatedTeamCodes() {
  const eliminated = new Set();

  allMatches
    .filter(match => match.stage !== 'group' && match.status === 'finished')
    .forEach(match => {
      const winner = match.winner || null;
      const home = match.home?.code;
      const away = match.away?.code;

      if (home && winner && home !== winner) eliminated.add(home);
      if (away && winner && away !== winner) eliminated.add(away);
    });

  if (isTurkiyeEliminated()) eliminated.add('TUR');

  return eliminated;
}

function getChampionshipRadarRows() {
  const eliminated = getEliminatedTeamCodes();
  const knockoutTeams = new Set();

  allMatches
    .filter(match => match.stage !== 'group')
    .forEach(match => {
      if (match.home?.code) knockoutTeams.add(match.home.code);
      if (match.away?.code) knockoutTeams.add(match.away.code);
      if (match.winner) knockoutTeams.add(match.winner);
    });

  const preferredOrder = ['FRA', 'ESP', 'BEL', 'ENG', 'MAR', 'NOR', 'ARG', 'COL', 'SUI', 'EGY', 'POR', 'BRA', 'USA', 'MEX'];
  const pctMap = {
    FRA: 24,
    ESP: 22,
    BEL: 19,
    ENG: 17,
    MAR: 15,
    NOR: 12,
    ARG: 11,
    COL: 9,
    SUI: 8,
    EGY: 7,
    POR: 5,
    BRA: 5,
    USA: 4,
    MEX: 4
  };

  let rows = preferredOrder
    .filter(code => knockoutTeams.has(code) && !eliminated.has(code))
    .map(code => ({ code, pct: pctMap[code] || 5, eliminated: false }));

  if (!rows.length) {
    rows = probs
      .map(p => ({
        code: p.team || p.code,
        pct: Math.round((p.champion || p.title || p.prob || 0) * 100),
        eliminated: false
      }))
      .filter(row => row.code && !eliminated.has(row.code))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 8);
  }

  if (!rows.some(row => row.code === 'TUR')) {
    rows.push({ code: 'TUR', pct: 0, eliminated: true });
  }

  return rows.slice(0, 9);
}

function renderProbabilities() {
  const rows = getChampionshipRadarRows();

  safeHTML('#probabilities', `
    <div class="prob-group-title">
      Şampiyonluk Radarı
    </div>

    <div class="ai-note" style="margin-bottom:16px">
      Grup aşaması ve üst tur olasılıkları kapatıldı. Radar artık yalnızca finale yürüyen takımları ve elenen takımların durumunu gösterir.
    </div>

    ${rows.map(row => row.eliminated ? `
      <div class="prob eliminated-row ${row.code === focus ? 'focus-prob' : ''}">
        <strong>${name(row.code)}</strong>
        <div class="eliminated-line">Turnuva dışı</div>
        <b class="eliminated-badge">Elendi</b>
      </div>
    ` : `
      <div class="prob ${row.code === focus ? 'focus-prob' : ''}">
        <strong>${name(row.code)}</strong>
        <div class="bar">
          <span style="width:${Math.max(2, row.pct)}%"></span>
        </div>
        <b>%${row.pct}</b>
      </div>
    `).join('')}
  `);
}


function ensureMatchupsNav() {
  const nav = $('.nav');
  if (!nav || nav.querySelector('a[href="#matchups"]')) return;

  const link = document.createElement('a');
  link.href = '#matchups';
  link.textContent = 'Eleme Ağacı';

  const intelligenceLink = nav.querySelector('a[href="#intelligence"]');
  if (intelligenceLink) {
    intelligenceLink.insertAdjacentElement('afterend', link);
  } else {
    nav.appendChild(link);
  }
}

function ensureMatchupsPanel() {
  if ($('#matchups')) return;

  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.id = 'matchups';
  panel.innerHTML = `
    <div class="section-head">
      <p class="eyebrow">ELEME AĞACI</p>
      <h2 id="matchupsTitle">Finale Giden Eleme Rotası</h2>
    </div>
    <div id="possibleMatchups"></div>
  `;

  const finalRoad = $('#finalRoad');
  const intelligence = $('#intelligence');

  if (finalRoad?.parentNode) {
    finalRoad.insertAdjacentElement('afterend', panel);
  } else if (intelligence?.parentNode) {
    intelligence.insertAdjacentElement('afterend', panel);
  } else {
    document.querySelector('main')?.appendChild(panel);
  }
}

function renderMatchupsProjection() {
  const standings = calcStandings();
  const thirdRanking = buildThirdPlaceRanking(standings);
  const projectedRows = buildRoundOf32Projection(standings, thirdRanking);

  const matchupsTitle = $('#matchupsTitle');
  if (matchupsTitle) {
    matchupsTitle.textContent = 'Finale Giden Yol';
  }

  safeHTML('#possibleMatchups', `
    ${renderEliminationBracket(projectedRows)}
  `);
}

function buildPostTurkeyPathProjection(projectedRows, thirdRanking) {
  const qualifyingThirds = thirdRanking
    .filter(team => team.qualifiesAsThird)
    .map(team => `${name(team.code)} (${team.group})`);

  const thirdText = qualifyingThirds.length
    ? `Geçici en iyi üçüncüler hattında öne çıkan takımlar: ${qualifyingThirds.join(', ')}.`
    : 'En iyi üçüncüler tablosu grup sonuçları netleştikçe şekillenecek.';

  const likelyBigRoutes = projectedRows
    .slice(0, 6)
    .map(row => `Maç ${row.no}`)
    .join(', ');

  return `Türkiye grup aşamasında turnuvaya veda etti. Yıldız Kupası artık Türkiye ihtimalinden çok Son 32 yolunu, favorilerin olası rakiplerini ve eleme turu senaryolarını izlemeli. İlk projeksiyon slotları ${likelyBigRoutes} üzerinden şekilleniyor. ${thirdText}`;
}
function asNumberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getMatchNo(match) {
  const direct = asNumberOrNull(
    match?.no ??
    match?.matchNo ??
    match?.match_no ??
    match?.matchNumber ??
    match?.match_number ??
    match?.fixtureNo ??
    match?.fixture_no
  );

  if (direct !== null) return direct;

  const text = String(match?.id ?? match?.code ?? match?.name ?? match?.title ?? '');
  const found = text.match(/(?:M|Maç|Match)\s*(\d+)/i);
  return found ? Number(found[1]) : null;
}

function getTeamCodeFromSide(side) {
  return side?.code ?? side?.team ?? side?.teamCode ?? side?.countryCode ?? side?.id ?? null;
}

function getSideScore(side) {
  return asNumberOrNull(side?.score ?? side?.goals ?? side?.goal ?? side?.fullTimeScore ?? side?.regularScore);
}

function getSidePenalty(side) {
  return asNumberOrNull(
    side?.penalty ??
    side?.penalties ??
    side?.penaltyScore ??
    side?.shootout ??
    side?.shootoutScore
  );
}

function getTopLevelPenalty(match, side) {
  const prefix = side === 'home' ? 'home' : 'away';
  const altPrefix = side === 'home' ? 'Home' : 'Away';

  return asNumberOrNull(
    match?.[`${prefix}Penalty`] ??
    match?.[`${prefix}_penalty`] ??
    match?.[`${prefix}Penalties`] ??
    match?.[`${prefix}_penalties`] ??
    match?.[`penalty${altPrefix}`] ??
    match?.[`penalties${altPrefix}`] ??
    match?.penalties?.[prefix] ??
    match?.penaltyScore?.[prefix] ??
    match?.shootout?.[prefix]
  );
}

function isFinishedMatch(match) {
  const status = String(match?.status ?? match?.matchStatus ?? match?.match_status ?? '').toLowerCase();
  return ['finished', 'ft', 'ms', 'completed', 'played', 'aet', 'pen'].some(x => status.includes(x));
}

function sameCode(a, b) {
  return a && b && String(a).toUpperCase() === String(b).toUpperCase();
}

function findKnockoutMatchForRow(row) {
  const rowNo = Number(row.no);

  const byNo = allMatches.find(match => {
    if (String(match?.stage || '').toLowerCase() === 'group') return false;
    return getMatchNo(match) === rowNo;
  });

  if (byNo) return byNo;

  const homeCodes = row.homeCodes || [];
  const awayCodes = row.awayCodes || [];

  return allMatches.find(match => {
    if (String(match?.stage || '').toLowerCase() === 'group') return false;

    const homeCode = getTeamCodeFromSide(match.home);
    const awayCode = getTeamCodeFromSide(match.away);

    const direct = homeCodes.some(code => sameCode(code, homeCode)) && awayCodes.some(code => sameCode(code, awayCode));
    const reversed = homeCodes.some(code => sameCode(code, awayCode)) && awayCodes.some(code => sameCode(code, homeCode));

    return direct || reversed;
  });
}

function formatBracketScore(score, penalty) {
  if (score === null || score === undefined) return '–';
  return penalty === null || penalty === undefined ? String(score) : `${score} (${penalty})`;
}

function getKnockoutResult(row) {
  const match = findKnockoutMatchForRow(row);
  if (!match) return null;

  const homeCode = getTeamCodeFromSide(match.home);
  const awayCode = getTeamCodeFromSide(match.away);
  const homeScore = getSideScore(match.home);
  const awayScore = getSideScore(match.away);
  const homePenalty = getSidePenalty(match.home) ?? getTopLevelPenalty(match, 'home');
  const awayPenalty = getSidePenalty(match.away) ?? getTopLevelPenalty(match, 'away');

  if (homeScore === null || awayScore === null) return null;

  let winnerCode = null;

  if (homeScore > awayScore) {
    winnerCode = homeCode;
  } else if (awayScore > homeScore) {
    winnerCode = awayCode;
  } else if (homePenalty !== null && awayPenalty !== null) {
    winnerCode = homePenalty > awayPenalty ? homeCode : awayCode;
  } else if (match.winner || match.winnerCode || match.winner_code) {
    winnerCode = match.winner?.code ?? match.winnerCode ?? match.winner_code;
  }

  return {
    match,
    homeCode,
    awayCode,
    home: name(homeCode),
    away: name(awayCode),
    homeScore,
    awayScore,
    homePenalty,
    awayPenalty,
    homeDisplayScore: formatBracketScore(homeScore, homePenalty),
    awayDisplayScore: formatBracketScore(awayScore, awayPenalty),
    winnerCode,
    winnerLabel: winnerCode ? name(winnerCode) : null,
    finished: isFinishedMatch(match)
  };
}

function buildWinnerPlaceholder(match, fallback) {
  return match?.winnerLabel || fallback;
}
const BRACKET_ADVANCEMENT = {
  89: [73, 76],
  90: [75, 78],
  91: [74, 77],
  92: [79, 80],
  93: [84, 83],
  94: [82, 81],
  95: [87, 86],
  96: [85, 88],
  97: [89, 90],
  98: [93, 94],
  99: [91, 92],
  100: [95, 96],
  101: [97, 98],
  102: [99, 100],
  104: [101, 102],
  103: [101, 102]
};

function getMatchByNo(no) {
  const n = Number(no);
  return allMatches.find(match => Number(match?.n ?? match?.no ?? match?.matchNumber) === n) || null;
}

function isRealCode(code) {
  return Boolean(code && code !== 'TBD' && code !== '-' && code !== 'Bekleniyor');
}

function getMatchStatusLabel(match) {
  if (!match) return 'Bekliyor';
  const status = String(match.status || '').toLowerCase();
  if (status === 'finished' || status === 'ft' || status === 'ms') return 'Tamamlandı';
  if (status === 'live' || status === 'in_play') return 'Canlı';
  return 'Planlandı';
}

function getResolvedWinnerCode(matchNo) {
  const match = getMatchByNo(matchNo);
  if (!match) return null;

  if (isRealCode(match.winner)) return match.winner;

  const homeScore = asNumberOrNull(match.home?.score);
  const awayScore = asNumberOrNull(match.away?.score);
  const homePen = asNumberOrNull(match.home?.pen ?? match.home?.penalty ?? match.home?.penalties);
  const awayPen = asNumberOrNull(match.away?.pen ?? match.away?.penalty ?? match.away?.penalties);

  if (homeScore === null || awayScore === null) return null;
  if (homeScore > awayScore) return match.home?.code;
  if (awayScore > homeScore) return match.away?.code;
  if (homePen !== null && awayPen !== null) return homePen > awayPen ? match.home?.code : match.away?.code;

  return null;
}

function getResolvedSide(matchNo, sideIndex) {
  const match = getMatchByNo(matchNo);
  const sideKey = sideIndex === 0 ? 'home' : 'away';
  const code = match?.[sideKey]?.code;

  if (isRealCode(code)) {
    return { code, label: name(code), sourceMatchNo: null };
  }

  const sourceNo = BRACKET_ADVANCEMENT[Number(matchNo)]?.[sideIndex];
  if (sourceNo) {
    const winnerCode = getResolvedWinnerCode(sourceNo);
    if (isRealCode(winnerCode)) {
      return { code: winnerCode, label: name(winnerCode), sourceMatchNo: sourceNo };
    }
    return { code: null, label: `M${sourceNo} galibi`, sourceMatchNo: sourceNo };
  }

  return { code: null, label: 'Bekleniyor', sourceMatchNo: null };
}

function getDisplayScore(match, sideKey) {
  if (!match) return null;
  const score = asNumberOrNull(match?.[sideKey]?.score);
  const pen = asNumberOrNull(match?.[sideKey]?.pen ?? match?.[sideKey]?.penalty ?? match?.[sideKey]?.penalties);
  if (score === null) return null;
  return pen === null ? String(score) : `${score} (${pen})`;
}

function buildBracketMatchFromNo(matchNo, titlePrefix) {
  const match = getMatchByNo(matchNo);
  const home = getResolvedSide(matchNo, 0);
  const away = getResolvedSide(matchNo, 1);
  const winnerCode = getResolvedWinnerCode(matchNo);
  const homeScore = getDisplayScore(match, 'home');
  const awayScore = getDisplayScore(match, 'away');
  const completed = Boolean(winnerCode && homeScore !== null && awayScore !== null);

  return {
    no: Number(matchNo),
    title: `${titlePrefix || 'Maç'} ${matchNo}`,
    top: home.label,
    bottom: away.label,
    topCode: home.code,
    bottomCode: away.code,
    topScore: homeScore,
    bottomScore: awayScore,
    winnerCode,
    winnerLabel: winnerCode ? name(winnerCode) : null,
    meta: getMatchStatusLabel(match),
    focus: home.code === focus || away.code === focus,
    completed,
    placeholder: !completed,
    date: match?.date || null
  };
}

function renderEliminationBracket(projectedRows) {
  const r32 = Array.from({ length: 16 }, (_, index) => buildBracketMatchFromNo(73 + index, 'Maç'));
  const r16 = Array.from({ length: 8 }, (_, index) => buildBracketMatchFromNo(89 + index, 'Maç'));
  const qf = Array.from({ length: 4 }, (_, index) => buildBracketMatchFromNo(97 + index, 'Maç'));
  const sf = Array.from({ length: 2 }, (_, index) => buildBracketMatchFromNo(101 + index, 'Maç'));
  const final = [buildBracketMatchFromNo(104, 'Maç')];

  return `
    <div class="bracket-note">
      Finale giden yol doğrudan <strong>data/matches.json</strong> üzerinden çizilir. Sonuç girildikçe kazananlar sonraki tura otomatik taşınır.
    </div>
    <div class="yk-bracket-scroll">
      <div class="yk-bracket-board">
        ${renderBracketStage('Son 32', r32, 'round32')}
        ${renderBracketStage('Son 16', r16, 'round16')}
        ${renderBracketStage('Çeyrek Final', qf, 'quarter')}
        ${renderBracketStage('Yarı Final', sf, 'semi')}
        ${renderBracketStage('Final', final, 'final')}
      </div>
    </div>
  `;
}

function renderBracketStage(title, matches, className) {
  return `
    <div class="yk-bracket-stage ${className}">
      <div class="yk-bracket-stage-title">${title}</div>
      <div class="yk-bracket-stage-body">
        ${matches.map(match => renderBracketMatch(match)).join('')}
      </div>
    </div>
  `;
}

function renderBracketMatch(match) {
  const topWinner = match.winnerCode && match.topCode === match.winnerCode;
  const bottomWinner = match.winnerCode && match.bottomCode === match.winnerCode;

  return `
    <article class="yk-bracket-match ${match.focus ? 'focus' : ''} ${match.placeholder ? 'placeholder' : ''} ${match.completed ? 'completed' : ''}">
      <div class="yk-bracket-match-head">
        <span>${match.title}</span>
        <small>${match.meta}</small>
      </div>
      <div class="yk-bracket-team ${topWinner ? 'winner' : ''}">
        <span>${match.top}</span>
        <b>${match.topScore ?? '–'}</b>
      </div>
      <div class="yk-bracket-team ${bottomWinner ? 'winner' : ''}">
        <span>${match.bottom}</span>
        <b>${match.bottomScore ?? '–'}</b>
      </div>
    </article>
  `;
}

function compactBracketLabel(label) {
  if (!label) return 'Belirsiz';

  return label
    .replace(' · ', ' / ')
    .replace(' Grubu lideri', ' lideri')
    .replace(' Grubu ikincisi', ' ikincisi')
    .replace('En iyi üçüncü havuzu:', '3. havuzu:');
}

function ensureBracketStyles() {
  const old = document.getElementById('yk-bracket-style');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'yk-bracket-style';
  style.textContent = `
    .bracket-note {
      margin: 12px 0 14px;
      color: var(--muted);
      font-weight: 750;
      line-height: 1.45;
    }

    .yk-bracket-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      padding: 12px 2px 24px;
      scrollbar-color: rgba(38, 217, 201, .45) rgba(13, 34, 58, .55);
    }

    .yk-bracket-board {
      --card-h: 150px;
      --step-y: 166px;
      --col-gap: 36px;
      min-width: 1580px;
      display: grid;
      grid-template-columns: 360px 320px 300px 280px 250px;
      gap: var(--col-gap);
      align-items: start;
    }

    .yk-bracket-stage {
      min-width: 0;
    }

    .yk-bracket-stage-title {
      color: var(--gold);
      font-size: 13px;
      font-weight: 950;
      letter-spacing: .16em;
      text-transform: uppercase;
      margin: 0 0 16px;
    }

    .yk-bracket-stage-body {
      position: relative;
      min-height: calc(var(--step-y) * 16);
    }

    .yk-bracket-match {
      position: absolute;
      left: 0;
      right: 0;
      min-height: var(--card-h);
      border: 1px solid rgba(70, 143, 208, .42);
      border-radius: 18px;
      background:
        radial-gradient(circle at right bottom, rgba(38, 217, 201, .10), transparent 36%),
        linear-gradient(180deg, rgba(18, 41, 70, .92), rgba(11, 27, 48, .92));
      box-shadow: 0 16px 32px rgba(0, 0, 0, .18);
      padding: 14px 16px;
    }

    .round32 .yk-bracket-match:nth-child(1) { top: calc(var(--step-y) * 0); }
    .round32 .yk-bracket-match:nth-child(2) { top: calc(var(--step-y) * 1); }
    .round32 .yk-bracket-match:nth-child(3) { top: calc(var(--step-y) * 2); }
    .round32 .yk-bracket-match:nth-child(4) { top: calc(var(--step-y) * 3); }
    .round32 .yk-bracket-match:nth-child(5) { top: calc(var(--step-y) * 4); }
    .round32 .yk-bracket-match:nth-child(6) { top: calc(var(--step-y) * 5); }
    .round32 .yk-bracket-match:nth-child(7) { top: calc(var(--step-y) * 6); }
    .round32 .yk-bracket-match:nth-child(8) { top: calc(var(--step-y) * 7); }
    .round32 .yk-bracket-match:nth-child(9) { top: calc(var(--step-y) * 8); }
    .round32 .yk-bracket-match:nth-child(10) { top: calc(var(--step-y) * 9); }
    .round32 .yk-bracket-match:nth-child(11) { top: calc(var(--step-y) * 10); }
    .round32 .yk-bracket-match:nth-child(12) { top: calc(var(--step-y) * 11); }
    .round32 .yk-bracket-match:nth-child(13) { top: calc(var(--step-y) * 12); }
    .round32 .yk-bracket-match:nth-child(14) { top: calc(var(--step-y) * 13); }
    .round32 .yk-bracket-match:nth-child(15) { top: calc(var(--step-y) * 14); }
    .round32 .yk-bracket-match:nth-child(16) { top: calc(var(--step-y) * 15); }

    .round16 .yk-bracket-match:nth-child(1) { top: calc(var(--step-y) * .5); }
    .round16 .yk-bracket-match:nth-child(2) { top: calc(var(--step-y) * 2.5); }
    .round16 .yk-bracket-match:nth-child(3) { top: calc(var(--step-y) * 4.5); }
    .round16 .yk-bracket-match:nth-child(4) { top: calc(var(--step-y) * 6.5); }
    .round16 .yk-bracket-match:nth-child(5) { top: calc(var(--step-y) * 8.5); }
    .round16 .yk-bracket-match:nth-child(6) { top: calc(var(--step-y) * 10.5); }
    .round16 .yk-bracket-match:nth-child(7) { top: calc(var(--step-y) * 12.5); }
    .round16 .yk-bracket-match:nth-child(8) { top: calc(var(--step-y) * 14.5); }

    .quarter .yk-bracket-match:nth-child(1) { top: calc(var(--step-y) * 1.5); }
    .quarter .yk-bracket-match:nth-child(2) { top: calc(var(--step-y) * 5.5); }
    .quarter .yk-bracket-match:nth-child(3) { top: calc(var(--step-y) * 9.5); }
    .quarter .yk-bracket-match:nth-child(4) { top: calc(var(--step-y) * 13.5); }

    .semi .yk-bracket-match:nth-child(1) { top: calc(var(--step-y) * 3.5); }
    .semi .yk-bracket-match:nth-child(2) { top: calc(var(--step-y) * 11.5); }

    .final .yk-bracket-match:nth-child(1) { top: calc(var(--step-y) * 7.5); }

    .yk-bracket-match::after {
      content: "";
      position: absolute;
      top: 50%;
      right: calc(var(--col-gap) * -1 - 1px);
      width: var(--col-gap);
      height: 1px;
      background: rgba(38, 217, 201, .38);
    }

    .yk-bracket-stage.final .yk-bracket-match::after {
      display: none;
    }

    .yk-bracket-match.focus {
      border-color: rgba(42, 230, 166, .76);
      box-shadow: 0 0 0 1px rgba(42, 230, 166, .15) inset, 0 18px 36px rgba(0, 0, 0, .24);
    }

    .yk-bracket-match.placeholder {
      opacity: .86;
      border-style: dashed;
    }

    .yk-bracket-match.completed {
      opacity: 1;
    }

    .yk-bracket-match-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: var(--gold);
      font-weight: 950;
      font-size: 12px;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .yk-bracket-match-head small {
      color: var(--muted);
      letter-spacing: 0;
      text-transform: none;
      font-size: 12px;
    }

    .yk-bracket-team {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      min-height: 40px;
      color: var(--text);
      font-weight: 900;
      font-size: 15px;
      border-top: 1px solid rgba(255, 255, 255, .06);
      padding-top: 8px;
      margin-top: 8px;
    }

    .yk-bracket-team span {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .yk-bracket-team b {
      color: var(--gold);
      font-size: 22px;
      min-width: 32px;
      text-align: right;
    }

    .yk-bracket-team.winner span {
      color: var(--gold);
    }

    @media (max-width: 760px) {
      .yk-bracket-board {
        --card-h: 142px;
        --step-y: 158px;
        --col-gap: 28px;
        min-width: 1280px;
        grid-template-columns: 300px 270px 250px 230px 220px;
      }

      .yk-bracket-match {
        padding: 12px;
      }

      .yk-bracket-team {
        font-size: 13px;
      }
    }
  `;

  document.head.appendChild(style);
}

function buildRoundOf32Projection(standings, thirdRanking) {
  return ROUND_OF_32_TEMPLATE.map(slot => {
    const home = resolveSlotSide(slot.home, standings, thirdRanking);
    const away = resolveSlotSide(slot.away, standings, thirdRanking);
    const hasThirdPool = slot.home.type === 'third' || slot.away.type === 'third';
    const involvesFocus = home.codes.includes(focus) || away.codes.includes(focus);

    return {
  no: slot.no,
  home: home.label,
  away: away.label,
  homeCodes: home.codes,
  awayCodes: away.codes,
  homeRule: slot.home,
  awayRule: slot.away,
      certainty: hasThirdPool ? 'Üçüncülük havuzu' : 'Projeksiyon',
      note: hasThirdPool
        ? 'Üçüncü takım slotu, FIFA kombinasyon tablosuna ve hangi grupların üçüncüsünün çıktığına bağlıdır.'
        : 'Mevcut grup sıralamasına göre doğrudan eşleşme projeksiyonu.',
      involvesFocus
    };
  });
}

function resolveSlotSide(rule, standings, thirdRanking) {
  if (rule.type === 'winner') {
    const team = standings[rule.group]?.[0];
    return {
      label: team ? `${name(team.code)} · ${rule.group} Grubu lideri` : `${rule.group} Grubu lideri`,
      codes: team ? [team.code] : []
    };
  }

  if (rule.type === 'runner') {
    const team = standings[rule.group]?.[1];
    return {
      label: team ? `${name(team.code)} · ${rule.group} Grubu ikincisi` : `${rule.group} Grubu ikincisi`,
      codes: team ? [team.code] : []
    };
  }

  if (rule.type === 'third') {
    const candidates = thirdRanking.filter(team => rule.groups.includes(team.group) && team.qualifiesAsThird);

    if (candidates.length) {
      return {
        label: candidates.map(team => `${name(team.code)} (${team.group})`).join(' / '),
        codes: candidates.map(team => team.code)
      };
    }

    return {
      label: `En iyi üçüncü havuzu: ${rule.groups.join('/')}`,
      codes: []
    };
  }

  return { label: 'Belirsiz', codes: [] };
}

function buildTurkiyePathProjection(standings, thirdRanking, rows) {
  const group = getGroupOfTeam('TUR') || 'D';
  const table = standings[group] || [];
  const position = table.findIndex(team => team.code === 'TUR') + 1;
  const turkiyeThird = thirdRanking.find(team => team.code === 'TUR');
  const turkiyeRows = rows.filter(row => row.involvesFocus);

  const turkiyeFinishedMatches = allMatches.filter(match =>
    match.status === 'finished' &&
    (match.home?.code === 'TUR' || match.away?.code === 'TUR')
  );

  const turkiyeUpcomingMatches = allMatches.filter(match =>
    match.status !== 'finished' &&
    (match.home?.code === 'TUR' || match.away?.code === 'TUR')
  );

  const isEliminated =
    String(turkiyeData?.tournamentStatus || '').toLowerCase() === 'eliminated' ||
    String(turkiyeData?.qualificationSignal || '').toLocaleLowerCase('tr-TR').includes('veda') ||
    String(turkiyeData?.analysis || '').toLocaleLowerCase('tr-TR').includes('veda etti') ||
    (position >= 4 && turkiyeFinishedMatches.length >= 3 && turkiyeUpcomingMatches.length === 0);

  if (isEliminated) {
    return 'Türkiye grup aşamasında turnuvaya veda etti. Olası eşleşmeler bölümü artık Son 32 yolu, favorilerin rotası ve kesinleşen eleme senaryoları için takip edilmeli.';
  }

  if (!position) {
    return 'Türkiye için grup verisi henüz oluşmadı.';
  }

  if (position <= 2) {
    const slotText = turkiyeRows.length
      ? `Olası slot: ${turkiyeRows.map(row => `Maç ${row.no}`).join(', ')}.`
      : 'Resmi slot, grup sıralaması kesinleştiğinde netleşecek.';

    return `Türkiye şu an D Grubu'nda ${position}. sırada ve doğrudan üst tur hattında. ${slotText}`;
  }

  if (position === 3) {
    if (turkiyeThird?.qualifiesAsThird) {
      const slotText = turkiyeRows.length
        ? `Türkiye’nin göründüğü olası slotlar: ${turkiyeRows.map(row => `Maç ${row.no}`).join(', ')}.`
        : 'Üçüncü takım kombinasyonu henüz kesinleşmedi.';

      return `Türkiye şu an en iyi üçüncüler sıralamasında ${turkiyeThird.thirdPlaceRank}/${GROUP_COUNT}. sırada. ${slotText}`;
    }

    return `Türkiye şu an 3. sırada ama geçici en iyi üçüncüler listesinde ilk ${BEST_THIRD_QUALIFY_LIMIT} dışında görünüyor. Diğer grup sonuçları belirleyici olur.`;
  }

  return 'Türkiye şu an 4. sırada ve olası Son 32 eşleşme hattının dışında. Son maç sonucu ve grup dengeleri belirleyici olacak.';
}

function buildThirdPlaceRanking(standings) {
  return Object.entries(standings)
    .map(([group, table]) => {
      const third = [...table].sort(sortStanding)[2];
      if (!third) return null;
      return { ...third, group };
    })
    .filter(Boolean)
    .sort(sortStanding)
    .map((team, index) => ({
      ...team,
      thirdPlaceRank: index + 1,
      qualifiesAsThird: index + 1 <= BEST_THIRD_QUALIFY_LIMIT
    }));
}

function sortStanding(a, b) {
  return (
    b.pts - a.pts ||
    b.gd - a.gd ||
    b.gf - a.gf ||
    name(a.code).localeCompare(name(b.code), 'tr')
  );
}

function getGroupOfTeam(code) {
  return Object.entries(groupMap).find(([, teams]) => teams.includes(code))?.[0] || null;
}

function normalizePercentageValue(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) return null;

  return n > 0 && n <= 1
    ? Math.round(n * 100)
    : Math.round(n);
}

function getQualificationProbabilityForTeam(code) {
  const group = getGroupOfTeam(code);
  const groupRows = group ? intelligenceData?.groupQualification?.[group] : null;
  const intelligenceRow = Array.isArray(groupRows)
    ? groupRows.find(row => (row.code || row.team) === code)
    : null;

  const intelligenceProbability = normalizePercentageValue(
    intelligenceRow?.probability ?? intelligenceRow?.prob
  );

  if (intelligenceProbability !== null) {
    return intelligenceProbability;
  }

  if (code === 'TUR') {
    return normalizePercentageValue(turkiyeData?.qualificationProbability);
  }

  return null;
}

function getTurkiyeEliminationState(standing, played, upcoming) {
  const position = Number(turkiyeData?.position || 0);
  const playedCount = Array.isArray(played) ? played.length : 0;
  const upcomingCount = Array.isArray(upcoming) ? upcoming.length : 0;

  const statusText = [
    turkiyeData?.tournamentStatus,
    turkiyeData?.qualificationSignal,
    turkiyeData?.analysis
  ].join(' ').toLocaleLowerCase('tr-TR');

  const backendSaysEliminated =
    statusText.includes('eliminated') ||
    statusText.includes('veda') ||
    statusText.includes('elendi');

  const groupCompletedAndFourth =
    position >= 4 &&
    playedCount >= 3 &&
    upcomingCount === 0;

  return backendSaysEliminated || groupCompletedAndFourth;
}

function updateTurkiyeSectionState(isEliminated) {
  const turkiyeSection = $('#turkiye');
  if (turkiyeSection) {
    turkiyeSection.classList.toggle('eliminated', isEliminated);
  }

  const sectionTitle = $('#turkiye h2');
  if (sectionTitle) {
    sectionTitle.textContent = isEliminated
      ? 'Türkiye’nin Turnuva Karnesi'
      : 'Türkiye’nin Turnuva Panosu';
  }

  const sectionEyebrow = $('#turkiye .eyebrow');
  if (sectionEyebrow) {
    sectionEyebrow.textContent = isEliminated
      ? 'TÜRKİYE KARNESİ'
      : 'TÜRKİYE MERKEZİ';
  }

  const navTurkiye = document.querySelector('.nav a[href="#turkiye"]');
  if (navTurkiye) {
    navTurkiye.textContent = isEliminated
      ? 'Türkiye Karnesi'
      : 'Türkiye Merkezi';
  }
}

function renderTurkiye() {
  if (turkiyeData) {
    const standing = turkiyeData.standing || {};
    const upcoming = turkiyeData.upcomingMatches || [];
    const played = turkiyeData.playedMatches || [];

    const isEliminated = getTurkiyeEliminationState(standing, played, upcoming);
    updateTurkiyeSectionState(isEliminated);

    const turkiyeQualificationProbability = isEliminated
      ? null
      : getQualificationProbabilityForTeam('TUR');

    const turkiyeQualificationLabel = isEliminated
      ? 'Elendi'
      : turkiyeQualificationProbability !== null
        ? `%${turkiyeQualificationProbability}`
        : '-';

    const qualificationLabel = isEliminated
      ? 'Turnuva durumu'
      : 'Üst tur ihtimali';

    const signalText = isEliminated
      ? 'Turnuvaya veda etti'
      : turkiyeData.qualificationSignal || '-';

    const signalSubText = isEliminated
      ? 'Grup aşaması tamamlandı'
      : 'Üst tur sinyali';

    const analysisText = isEliminated
      ? `Türkiye D Grubu'nu ${turkiyeData.position || '-'}. sırada tamamladı ve turnuvaya veda etti. Yıldız Kupası artık Son 32 yolu, olası eşleşmeler, favoriler ve günlük turnuva notlarıyla devam ediyor.`
      : turkiyeData.analysis || '';

    safeHTML('#turkiyeCenter', `
      <div class="turkey-cards">
        <div class="stat">
          <strong>${turkiyeData.position || '-'}</strong>
          <span>D Grubu sıra</span>
        </div>
        <div class="stat">
          <strong>${standing.points ?? 0}</strong>
          <span>Puan</span>
        </div>
        <div class="stat">
          <strong>${standing.gd ?? 0}</strong>
          <span>Averaj</span>
        </div>
        <div class="stat">
          <strong class="status-word">${signalText}</strong>
          <span>${signalSubText}</span>
        </div>
      </div>

      <div class="stat qualification-prob">
        <strong>${turkiyeQualificationLabel}</strong>
        <span>${qualificationLabel}</span>
      </div>

      <div class="ai-note" style="margin-top:16px">
        ${analysisText}
      </div>

      <h3 style="margin-top:22px">Türkiye maçları</h3>

      <div class="match-list" style="margin-top:16px">
        ${[...played, ...upcoming].map(m => `
          <article class="match">
            <div class="match-head">
              <span>${m.result ? m.result.toUpperCase() : 'Sıradaki maç'}</span>
              <span>${m.date ? new Date(m.date).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</span>
            </div>
            <div class="teams">
              <div class="team-row">
                <span>${m.text}</span>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `);

    return;
  }

  updateTurkiyeSectionState(false);

  const matches = allMatches.filter(m =>
    m.home?.code === 'TUR' || m.away?.code === 'TUR'
  );

  safeHTML('#turkiyeCenter', `
    <div class="match-list">
      ${matches.map(m => `
        <article class="match">
          <div class="match-head">
            <span>${m.group ? m.group + ' Grubu' : m.stage}</span>
            <span>${new Date(m.date).toLocaleDateString('tr-TR')}</span>
          </div>
          <div class="teams">
            <div class="team-row">
              <span>${name(m.home?.code)}</span>
              <span class="score">${m.home?.score ?? '-'}</span>
            </div>
            <div class="team-row">
              <span>${name(m.away?.code)}</span>
              <span class="score">${m.away?.score ?? '-'}</span>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `);
}

function renderBrief() {
  const finished = allMatches.filter(m => m.status === 'finished').length;
  const live = allMatches.filter(m => ['in_play', 'live'].includes(m.status)).length;

  safeHTML('#dailyBrief', `
    <p><strong>${new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { dateStyle: 'full' })}</strong></p>
    <p>${
      lang === 'tr'
        ? `Turnuvada şu ana kadar ${finished} maç tamamlandı, ${live} maç canlı izleme durumunda görünüyor.`
        : `So far, ${finished} matches are finished and ${live} match(es) appear live.`
    }</p>
    <p>${
      lang === 'tr'
        ? 'Yıldız Kupası’nın farkı ham skor göstermek değil; skorun turnuva bağlamını, grup etkisini ve hikâyesini sade biçimde anlatmaktır.'
        : 'Yıldız Kupası is not just about raw scores; it explains tournament context, group impact and the story behind the numbers.'
    }</p>
  `);
}



/* ================================
   V2 Final-focused modular dashboard
   ================================ */

const ROUND_LABELS = {
  r32: 'Son 32',
  r16: 'Son 16',
  qf: 'Çeyrek Final',
  sf: 'Yarı Final',
  third: 'Üçüncülük',
  final: 'Final'
};

const ROUND_RANGES = [
  { id: 'r32', label: 'Son 32', min: 73, max: 88 },
  { id: 'r16', label: 'Son 16', min: 89, max: 96 },
  { id: 'qf', label: 'Çeyrek Final', min: 97, max: 100 },
  { id: 'sf', label: 'Yarı Final', min: 101, max: 102 },
  { id: 'third', label: 'Üçüncülük', min: 103, max: 103 },
  { id: 'final', label: 'Final', min: 104, max: 104 }
];

function getRoundIdForMatchNo(no) {
  const n = Number(no);
  return ROUND_RANGES.find(r => n >= r.min && n <= r.max)?.id || 'other';
}

function formatMatchDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
}

function hasRealTeam(code) {
  return code && code !== 'TBD' && code !== '-';
}

function sideDisplay(match, sideName) {
  const side = match?.[sideName] || {};
  const code = side.code;
  return hasRealTeam(code) ? name(code) : 'Bekleniyor';
}

function sideScoreDisplay(match, sideName) {
  const side = match?.[sideName] || {};
  const score = side.score;
  const pen = side.pen ?? side.penalty ?? side.penalties;
  if (score === null || score === undefined) return '–';
  return pen === null || pen === undefined ? String(score) : `${score} (${pen})`;
}

function getMatchWinnerCode(match) {
  if (!match) return null;
  if (match.winner) return match.winner;
  const hs = match.home?.score;
  const as = match.away?.score;
  const hp = match.home?.pen ?? match.home?.penalty ?? match.home?.penalties;
  const ap = match.away?.pen ?? match.away?.penalty ?? match.away?.penalties;
  if (hs === null || hs === undefined || as === null || as === undefined) return null;
  if (hs > as) return match.home?.code;
  if (as > hs) return match.away?.code;
  if (hp !== null && hp !== undefined && ap !== null && ap !== undefined) {
    return hp > ap ? match.home?.code : match.away?.code;
  }
  return null;
}

function getKnockoutMatches() {
  return allMatches
    .filter(match => match.stage !== 'group' && Number(match.n || match.no || match.matchNumber) >= 73)
    .sort((a, b) => Number(a.n || a.no || 0) - Number(b.n || b.no || 0));
}

function getRoundMatches(roundId) {
  return getKnockoutMatches().filter(match => getRoundIdForMatchNo(match.n || match.no || match.matchNumber) === roundId);
}

function getSurvivors() {
  const losers = new Set();
  const winners = new Set();

  getKnockoutMatches().forEach(match => {
    const winner = getMatchWinnerCode(match);
    const home = match.home?.code;
    const away = match.away?.code;
    if (!winner) return;
    winners.add(winner);
    if (home && home !== winner && home !== 'TBD') losers.add(home);
    if (away && away !== winner && away !== 'TBD') losers.add(away);
  });

  const scheduledTeams = new Set();
  getKnockoutMatches().forEach(match => {
    if (match.status === 'finished') return;
    [match.home?.code, match.away?.code].filter(hasRealTeam).forEach(code => scheduledTeams.add(code));
  });

  const codes = new Set([...scheduledTeams, ...[...winners].filter(code => !losers.has(code))]);
  return [...codes].filter(hasRealTeam).sort((a, b) => name(a).localeCompare(name(b), 'tr'));
}

function getNextImportantMatches() {
  const now = Date.now();
  const upcoming = getKnockoutMatches()
    .filter(match => match.status !== 'finished')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const live = upcoming.filter(match => ['in_play', 'live'].includes(match.status));
  return [...live, ...upcoming.filter(match => !live.includes(match))].slice(0, 4);
}

function getChampionRadar() {
  const survivors = getSurvivors();
  const brandWeight = {
    FRA: 96, ESP: 94, ENG: 91, ARG: 90, BEL: 88, POR: 87, BRA: 86, MAR: 84,
    NOR: 80, COL: 78, SUI: 76, EGY: 73, USA: 72, MEX: 70, CAN: 68, PAR: 67
  };

  return survivors
    .map(code => {
      const next = getKnockoutMatches().find(match =>
        match.status !== 'finished' && [match.home?.code, match.away?.code].includes(code)
      );
      const base = brandWeight[code] ?? 62;
      const routePenalty = next ? Math.min(10, Math.max(0, Number(next.n || 100) - 96)) : 6;
      return {
        code,
        name: name(code),
        score: Math.max(35, Math.min(99, base - routePenalty)),
        next: next ? `M${next.n} · ${sideDisplay(next, 'home')} - ${sideDisplay(next, 'away')}` : 'Rakip bekleniyor'
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function renderFinalRoad() {
  const root = $('#finalRoadBoard');
  if (!root) return;

  const roundSelect = $('#roundFocus');
  const selectedRound = roundSelect ? roundSelect.value : 'all';
  const visibleRounds = ROUND_RANGES
    .filter(round => ['r16', 'qf', 'sf', 'final'].includes(round.id))
    .filter(round => selectedRound === 'all' || round.id === selectedRound);

  const nextMatches = getNextImportantMatches();
  const radar = getChampionRadar();
  const survivors = getSurvivors();
  const finalMatch = getRoundMatches('final')[0];

  root.innerHTML = `
    <div class="final-road-layout">
      <aside class="final-road-summary">
        <div class="final-podium-card">
          <span class="mini-label">Final hedefi</span>
          <strong>${finalMatch ? formatMatchDate(finalMatch.date) : 'Takvim bekleniyor'}</strong>
          <p>Merkez artık finale kalan rota, çeyrek final baskısı ve şampiyonluk sinyalleri üzerinden çalışır.</p>
        </div>

        <div class="final-mini-stats">
          <div><strong>${survivors.length}</strong><span>Kalan takım</span></div>
          <div><strong>${getKnockoutMatches().filter(m => m.status === 'finished').length}</strong><span>Eleme sonucu</span></div>
          <div><strong>${nextMatches.length}</strong><span>Sıradaki maç</span></div>
        </div>

        <div class="champion-radar-card">
          <div class="mini-label">Şampiyonluk radarı</div>
          ${radar.map(team => `
            <button class="radar-team" type="button" data-focus-team="${team.code}">
              <span>${team.name}</span>
              <i style="width:${team.score}%"></i>
              <b>${team.score}</b>
            </button>
          `).join('') || '<p class="muted-text">Radar için kalan takım verisi bekleniyor.</p>'}
        </div>
      </aside>

      <section class="final-road-main">
        <div class="next-match-strip">
          ${nextMatches.map(match => renderFinalRoadMatchCard(match, true)).join('') || '<div class="empty-state">Sıradaki maç verisi bekleniyor.</div>'}
        </div>

        <div class="round-stack">
          ${visibleRounds.map(round => renderFinalRoadRound(round)).join('')}
        </div>
      </section>
    </div>

    <div id="matchDrawer" class="match-drawer" hidden></div>
  `;

  root.querySelectorAll('[data-match-no]').forEach(btn => {
    btn.addEventListener('click', () => openMatchDrawer(Number(btn.dataset.matchNo)));
  });

  root.querySelectorAll('[data-focus-team]').forEach(btn => {
    btn.addEventListener('click', () => {
      focus = btn.dataset.focusTeam;
      localStorage.setItem('yk_focus', focus);
      const teamFocus = $('#teamFocus');
      if (teamFocus) teamFocus.value = focus;
      renderAll();
    });
  });
}

function renderFinalRoadRound(round) {
  const matches = getRoundMatches(round.id);
  return `
    <article class="final-round-module" data-round="${round.id}">
      <div class="module-head">
        <div>
          <span class="mini-label">${round.label}</span>
          <h3>${round.label === 'Final' ? 'Kupa maçı' : `${round.label} hattı`}</h3>
        </div>
        <small>${matches.length} maç</small>
      </div>
      <div class="module-match-grid">
        ${matches.map(match => renderFinalRoadMatchCard(match)).join('') || '<div class="empty-state">Bu tur için maç verisi bekleniyor.</div>'}
      </div>
    </article>
  `;
}

function renderFinalRoadMatchCard(match, compact = false) {
  const winner = getMatchWinnerCode(match);
  const round = ROUND_LABELS[getRoundIdForMatchNo(match.n)] || 'Eleme';
  const isFocus = [match.home?.code, match.away?.code].includes(focus);
  const statusLabel = match.status === 'finished'
    ? 'Tamamlandı'
    : ['live', 'in_play'].includes(match.status)
      ? 'Canlı'
      : 'Planlandı';

  return `
    <button class="final-match-card ${compact ? 'compact' : ''} ${isFocus ? 'focus' : ''}" type="button" data-match-no="${match.n}">
      <span class="final-match-meta">M${match.n} · ${round} · ${statusLabel}</span>
      <strong>${formatMatchDate(match.date)}</strong>
      <div class="final-team-row ${winner === match.home?.code ? 'winner' : ''}">
        <span>${sideDisplay(match, 'home')}</span>
        <b>${sideScoreDisplay(match, 'home')}</b>
      </div>
      <div class="final-team-row ${winner === match.away?.code ? 'winner' : ''}">
        <span>${sideDisplay(match, 'away')}</span>
        <b>${sideScoreDisplay(match, 'away')}</b>
      </div>
    </button>
  `;
}

function openMatchDrawer(matchNo) {
  const drawer = $('#matchDrawer');
  if (!drawer) return;
  const match = getKnockoutMatches().find(m => Number(m.n) === Number(matchNo));
  if (!match) return;

  const winner = getMatchWinnerCode(match);
  const nextMatch = getKnockoutMatches().find(m =>
    m.status !== 'finished' && winner && [m.home?.code, m.away?.code].includes(winner)
  );

  drawer.hidden = false;
  drawer.innerHTML = `
    <div class="drawer-card">
      <button class="drawer-close" type="button" aria-label="Kapat">×</button>
      <span class="mini-label">Maç ${match.n}</span>
      <h3>${sideDisplay(match, 'home')} - ${sideDisplay(match, 'away')}</h3>
      <p>${formatMatchDate(match.date)} · ${ROUND_LABELS[getRoundIdForMatchNo(match.n)] || 'Eleme'}</p>
      <div class="drawer-score">
        <strong>${sideDisplay(match, 'home')} <b>${sideScoreDisplay(match, 'home')}</b></strong>
        <strong>${sideDisplay(match, 'away')} <b>${sideScoreDisplay(match, 'away')}</b></strong>
      </div>
      <div class="ai-note">
        ${winner ? `${name(winner)} tur atlayan takım olarak görünüyor.` : 'Bu maç için kazanan henüz netleşmedi.'}
        ${nextMatch ? ` Sıradaki rota: M${nextMatch.n}, ${sideDisplay(nextMatch, 'home')} - ${sideDisplay(nextMatch, 'away')}.` : ''}
      </div>
    </div>
  `;

  drawer.querySelector('.drawer-close')?.addEventListener('click', () => {
    drawer.hidden = true;
    drawer.innerHTML = '';
  });
}

function initFinalRoadControls() {
  const roundFocus = $('#roundFocus');
  if (roundFocus && !roundFocus.dataset.bound) {
    roundFocus.dataset.bound = '1';
    roundFocus.addEventListener('change', renderFinalRoad);
  }

  const scenarioBtn = $('#scenarioBtn');
  if (scenarioBtn && !scenarioBtn.dataset.bound) {
    scenarioBtn.dataset.bound = '1';
    scenarioBtn.addEventListener('click', () => {
      const panel = $('#finalRoadBoard');
      if (!panel) return;
      panel.classList.toggle('scenario-mode');
    });
  }
}

const langBtn = $('#langBtn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    lang = lang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('yk_lang', lang);
    applyLang();
  });
}

const themeBtn = $('#themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem(
      'yk_theme',
      document.body.classList.contains('light') ? 'light' : 'dark'
    );
  });
}

const teamFocus = $('#teamFocus');
if (teamFocus) {
  teamFocus.addEventListener('change', e => {
    focus = e.target.value;
    localStorage.setItem('yk_focus', focus);
    renderAll();
  });
}

const search = $('#search');
if (search) {
  search.addEventListener('input', renderMatches);
}

const stageFilter = $('#stageFilter');
if (stageFilter) {
  stageFilter.addEventListener('change', renderMatches);
}

if (localStorage.getItem('yk_theme') === 'light') {
  document.body.classList.add('light');
}

applyLang();
load();