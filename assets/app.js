const T = {
  tr: {
    'nav.matches': 'Maçlar',
    'nav.groups': 'Gruplar',
    'nav.intelligence': 'Turnuva Zekâsı',
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
    'intel.title': 'Üst Tur Olasılıkları',
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
    'intel.title': 'Qualification Probabilities',
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

function renderAll() {
  if (!allMatches.length) return;

  initControls();

  if ($('#stats')) renderStats();
  if ($('#aiSummary')) renderSummary();
  if ($('#radar')) renderRadar();
  if ($('#matchList')) renderMatches();
  if ($('#groupTables')) renderGroups();
  if ($('#probabilities')) renderProbabilities();
  ensureMatchupsPanel();
  if ($('#possibleMatchups')) renderMatchupsProjection();
  if ($('#turkiyeCenter')) renderTurkiye();
  if ($('#dailyBrief')) renderBrief();
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

function renderProbabilities() {
  if (intelligenceData?.groupQualification) {
    const focusGroup =
      Object.entries(groupMap).find(([g, arr]) => arr.includes(focus))?.[0] || "D";

    const rows = intelligenceData.groupQualification[focusGroup] || [];

    safeHTML('#probabilities', `
      <div class="prob-group-title">
        ${focusGroup} Grubu Üst Tur Olasılıkları
      </div>

      <div class="ai-note" style="margin-bottom:16px">
        Format: Her grubun ilk 2 takımı doğrudan Son 32’ye çıkar. En iyi 8 üçüncü takım da üst tura kalır.
      </div>

      ${rows.map(x => `
        <div class="prob ${x.code === focus ? 'focus-prob' : ''}">
          <strong>${name(x.code)}</strong>
          <div class="bar">
            <span style="width:${Math.max(2, x.probability)}%"></span>
          </div>
          <b>%${x.probability}</b>
        </div>
      `).join('')}
    `);

    return;
  }

  let list = probs
    .map(p => ({
      code: p.team || p.code,
      pct: Math.round((p.champion || p.title || p.prob || 0) * 100)
    }))
    .filter(x => x.code)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 12);

  if (!list.length) {
    list = ['BRA', 'FRA', 'ARG', 'ENG', 'ESP', 'POR', 'GER', 'NED']
      .map((c, i) => ({
        code: c,
        pct: [18, 16, 14, 12, 10, 8, 7, 6][i]
      }));
  }

  safeHTML('#probabilities', list.map(x => `
    <div class="prob">
      <strong>${name(x.code)}</strong>
      <div class="bar">
        <span style="width:${Math.max(2, x.pct)}%"></span>
      </div>
      <b>%${x.pct}</b>
    </div>
  `).join(''));
}


function ensureMatchupsNav() {
  const nav = $('.nav');
  if (!nav || nav.querySelector('a[href="#matchups"]')) return;

  const link = document.createElement('a');
  link.href = '#matchups';
  link.textContent = 'Olası Eşleşmeler';

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
      <p class="eyebrow">OLASI EŞLEŞMELER</p>
      <h2>Son 32 Projeksiyonu</h2>
    </div>
    <div id="possibleMatchups"></div>
  `;

  const intelligence = $('#intelligence');
  const briefing = $('#briefing');

  if (intelligence?.parentNode) {
    intelligence.insertAdjacentElement('afterend', panel);
  } else if (briefing?.parentNode) {
    briefing.insertAdjacentElement('beforebegin', panel);
  } else {
    document.querySelector('main')?.appendChild(panel);
  }
}

function renderMatchupsProjection() {
  const standings = calcStandings();
  const thirdRanking = buildThirdPlaceRanking(standings);
  const projectedRows = buildRoundOf32Projection(standings, thirdRanking);
  const turkiyePath = buildTurkiyePathProjection(standings, thirdRanking, projectedRows);

  safeHTML('#possibleMatchups', `
    <div class="ai-note" style="margin-bottom:18px">
      Bu bölüm mevcut grup tablolarına göre otomatik projeksiyon üretir. Grup maçları tamamlanmadan kesin eşleşme olarak görülmemelidir. Üçüncü takım slotları, hangi 8 grubun üçüncüsünün üst tura çıktığına göre değişir.
    </div>

    <div class="two-col" style="margin-bottom:22px">
      <article class="signal">
        <b>Türkiye’nin olası yolu</b>
        <span>${turkiyePath}</span>
      </article>
      <article class="signal">
        <b>Format notu</b>
        <span>İlk 2 takım doğrudan Son 32’ye çıkar. En iyi 8 üçüncü takım da eleme turuna kalır.</span>
      </article>
    </div>

    <h3 style="margin-top:12px">Geçici Son 32 slotları</h3>
    <div class="match-list" style="margin-top:16px">
      ${projectedRows.map(row => `
        <article class="match ${row.involvesFocus ? 'focus-prob' : ''}">
          <div class="match-head">
            <span>Maç ${row.no}</span>
            <span>${row.certainty}</span>
          </div>
          <div class="teams">
            <div class="team-row">
              <span>${row.home}</span>
            </div>
            <div class="team-row">
              <span>${row.away}</span>
            </div>
          </div>
          <div class="ai-note">${row.note}</div>
        </article>
      `).join('')}
    </div>

    <h3 style="margin-top:22px">Geçici en iyi üçüncüler</h3>
    <div class="radar" style="margin-top:14px">
      ${thirdRanking.map(team => `
        <div class="signal ${team.qualifiesAsThird ? '' : 'dimmed'} ${team.code === focus ? 'focus-prob' : ''}">
          <b>${team.thirdPlaceRank}. ${name(team.code)}</b>
          <span>${team.group} Grubu · ${team.pts} puan · AV ${team.gd} · ${team.qualifiesAsThird ? 'üst tur hattında' : 'dışarıda'}</span>
        </div>
      `).join('')}
    </div>
  `);
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

function renderTurkiye() {
  if (turkiyeData) {
    const standing = turkiyeData.standing || {};
    const upcoming = turkiyeData.upcomingMatches || [];
    const played = turkiyeData.playedMatches || [];

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
          <strong>${turkiyeData.qualificationSignal || '-'}</strong>
          <span>Üst tur sinyali</span>
        </div>
      </div>
    <div class="stat qualification-prob">
        <strong>%${turkiyeData.qualificationProbability ?? '-'}</strong>
        <span>Üst tur ihtimali</span>
      </div>
      <div class="ai-note" style="margin-top:16px">
        ${turkiyeData.analysis || ''}
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