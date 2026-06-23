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
    'nav.turkiye': 'Turkey Hub',
    'nav.briefing': 'Daily Brief',

    'hero.eyebrow': 'Independent World Cup Intelligence Center',
    'hero.title': 'Yıldız Kupası AI',
    'hero.lead': 'Tracks scores, calculates standings, interprets probabilities and turns the tournament into a story.',
    'hero.cta': 'View Turkey hub',
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

    'tr.eyebrow': 'Turkey Hub',
    'tr.title': 'Turkey Tournament Board',

    'brief.eyebrow': 'Daily Brief',
    'brief.title': 'Yıldız Kupası Note',

    'footer.copy': 'An independent football information and analysis platform. Not affiliated with FIFA®, FIFA World Cup® or any official tournament organizer. All trademarks belong to their respective owners.'
  }
};

const teamNames = {
  MEX: 'Meksika',
  RSA: 'Güney Afrika',
  CZE: 'Çekya',
  KOR: 'Güney Kore',

  CAN: 'Kanada',
  QAT: 'Katar',
  SUI: 'İsviçre',
  BIH: 'Bosna Hersek',

  BRA: 'Brezilya',
  HAI: 'Haiti',
  HTI: 'Haiti',
  MAR: 'Fas',
  SCO: 'İskoçya',

  AUS: 'Avustralya',
  PAR: 'Paraguay',
  USA: 'ABD',
  TUR: 'Türkiye',

  GER: 'Almanya',
  CIV: 'Fildişi Sahili',
  ECU: 'Ekvador',
  CUW: 'Curaçao',

  NED: 'Hollanda',
  JPN: 'Japonya',
  TUN: 'Tunus',
  SWE: 'İsveç',

  BEL: 'Belçika',
  EGY: 'Mısır',
  IRN: 'İran',
  NZL: 'Yeni Zelanda',

  ESP: 'İspanya',
  URU: 'Uruguay',
  KSA: 'Suudi Arabistan',
  CPV: 'Cape Verde',

  FRA: 'Fransa',
  SEN: 'Senegal',
  NOR: 'Norveç',
  IRQ: 'Irak',

  ARG: 'Arjantin',
  ALG: 'Cezayir',
  DZA: 'Cezayir',
  AUT: 'Avusturya',
  JOR: 'Ürdün',

  ENG: 'İngiltere',
  CRO: 'Hırvatistan',
  GHA: 'Gana',
  PAN: 'Panama',

  POR: 'Portekiz',
  UZB: 'Özbekistan',
  COL: 'Kolombiya',
  COD: 'DR Kongo'
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

// EN butonu geçici olarak gizli.
// Daha önce tarayıcıda EN seçilmişse, kullanıcı İngilizce arayüzde mahsur kalmasın diye TR’ye zorluyoruz.
let lang = 'tr';
localStorage.setItem('yk_lang', 'tr');

let focus = localStorage.getItem('yk_focus') || 'TUR';
let allMatches = [];
let probs = [];
let briefingData = null;
let turkiyeData = null;
let intelligenceData = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function t(key) {
  return T[lang]?.[key] || T.tr[key] || key;
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

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function pick(value, fallback = '') {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] || value.tr || value.en || fallback;
  }

  return value ?? fallback;
}

function formatDateTime(value) {
  if (!value) return '';

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';

  return `${d.toLocaleString('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })} · Yerel saat`;
}

function scoreText(score) {
  return score === null || score === undefined ? '-' : score;
}

function applyLang() {
  document.documentElement.lang = lang;

  $$('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  safeText('#langBtn', lang === 'tr' ? 'EN' : 'TR');

  const search = $('#search');
  if (search) {
    search.placeholder = 'Takım, grup veya aşama ara';
  }

  renderAll();
}

async function fetchJson(path, fallback) {
  const response = await fetch(path, { cache: 'no-store' });

  if (!response.ok) {
    if (fallback !== undefined) return fallback;
    throw new Error(`${path} okunamadı. HTTP ${response.status}`);
  }

  try {
    return await response.json();
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error(`${path} geçerli JSON değil`);
  }
}

async function load() {
  try {
    safeText('#liveState', 'Veri yükleniyor');
    safeText('#updatedAt', 'Bekleniyor');

    const [m, p, briefing, turkiye, intelligence] = await Promise.all([
      fetchJson('data/matches.json', { matches: [] }),
      fetchJson('data/probs.json', { teams: [] }),
      fetchJson('data/briefing.json', null),
      fetchJson('data/turkiye.json', null),
      fetchJson('data/intelligence.json', null)
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

    safeText('#liveState', 'Veri yüklendi');
    safeText('#updatedAt', new Date().toLocaleString('tr-TR'));

    renderAll();
  } catch (error) {
    console.error('Yıldız Kupası veri/render hatası:', error);

    safeText('#liveState', 'Veri alınamadı');
    safeText('#updatedAt', error.message || 'Bilinmeyen hata');
  }
}

function normalizeProbabilities(payload) {
  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload?.teams)) return payload.teams;
  if (Array.isArray(payload?.probs)) return payload.probs;

  return [];
}

function initControls() {
  const teams = [...new Set(Object.values(groupMap).flat())]
    .sort((a, b) => name(a).localeCompare(name(b), 'tr'));

  const teamFocus = $('#teamFocus');
  if (teamFocus) {
    teamFocus.innerHTML = teams
      .map(code => `<option value="${code}" ${code === focus ? 'selected' : ''}>${escapeHTML(name(code))}</option>`)
      .join('');
  }

  const stageFilter = $('#stageFilter');
  if (stageFilter) {
    const currentValue = stageFilter.value || 'all';

    stageFilter.innerHTML = `
      <option value="all">Tüm aşamalar</option>
      <option value="group">Grup</option>
      <option value="knockout">Eleme</option>
    `;

    stageFilter.value = currentValue;
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
  if ($('#turkiyeCenter')) renderTurkiye();
  if ($('#dailyBrief')) renderBrief();
}

function renderStats() {
  const played = allMatches.filter(match => match.status === 'finished').length;
  const live = allMatches.filter(match => match.status === 'in_play' || match.status === 'live').length;

  safeHTML('#stats', [
    ['104', 'Maç'],
    ['48', 'Takım'],
    [played, 'Tamamlanan'],
    [live, 'Canlı']
  ].map(([value, label]) => `
    <div class="stat">
      <strong>${escapeHTML(value)}</strong>
      <span>${escapeHTML(label)}</span>
    </div>
  `).join(''));
}

function renderSummary() {
  if (briefingData) {
    let html = '';

    const summary = pick(briefingData.summary, briefingData.summary);
    if (Array.isArray(summary) && summary.length) {
      html += summary
        .map(line => `<p>${escapeHTML(line)}</p>`)
        .join('');
    }

    if (briefingData.latestResults?.length) {
      html += `<p><strong>Son sonuçlar:</strong> ${
        briefingData.latestResults.map(item => escapeHTML(pick(item.text))).join(', ')
      }.</p>`;
    }

    if (briefingData.biggestSignals?.length) {
      html += `<p><strong>Turnuva sinyali:</strong> ${
        briefingData.biggestSignals
          .map(item => `${escapeHTML(pick(item.signal))}: ${escapeHTML(pick(item.text))}`)
          .join(' | ')
      }</p>`;
    }

    if (briefingData.editorialNote) {
      html += `<p>${escapeHTML(pick(briefingData.editorialNote))}</p>`;
    }

    safeHTML('#aiSummary', html);
    return;
  }

  const last = allMatches
    .filter(match =>
      match.status === 'finished' &&
      match.home?.score != null &&
      match.away?.score != null
    )
    .slice(-3);

  const next = allMatches
    .filter(match => match.status !== 'finished')
    .slice(0, 3);

  let html = '';

  if (last.length) {
    html += `<p><strong>Son tablo:</strong> ${
      last.map(match => `${escapeHTML(name(match.home.code))} ${scoreText(match.home.score)}-${scoreText(match.away.score)} ${escapeHTML(name(match.away.code))}`).join(', ')
    }.</p>`;
  }

  html += `<p><strong>Sıradaki maçlar:</strong> ${
    next.map(match => `${escapeHTML(name(match.home.code))} - ${escapeHTML(name(match.away.code))}`).join(', ') || '-'
  }.</p>`;

  safeHTML('#aiSummary', html);
}

function renderRadar() {
  if (intelligenceData?.radar?.length) {
    safeHTML('#radar', intelligenceData.radar.map(item => `
      <div class="signal">
        <b>${escapeHTML(pick(item.title))}</b>
        <span>${escapeHTML(pick(item.text))}</span>
      </div>
    `).join(''));
    return;
  }

  const standings = calcStandings();
  const focusGroup = getGroupOfTeam(focus);
  const table = standings[focusGroup] || [];
  const position = table.findIndex(row => row.code === focus) + 1;
  const live = allMatches.find(match => ['in_play', 'live'].includes(match.status));

  safeHTML('#radar', [
    [
      'Odak takım',
      `${name(focus)} ${focusGroup ? focusGroup + ' Grubu' : ''} ${position ? `• ${position}. sıra` : ''}`
    ],
    [
      'Canlı takip',
      live
        ? `${name(live.home.code)} - ${name(live.away.code)} (${live.time || ''})`
        : 'Şu an canlı maç görünmüyor'
    ],
    [
      'Turnuva formatı',
      'İlk 2 takım doğrudan çıkar. En iyi 8 üçüncü takım da Son 32’ye kalır.'
    ]
  ].map(([title, text]) => `
    <div class="signal">
      <b>${escapeHTML(title)}</b>
      <span>${escapeHTML(text)}</span>
    </div>
  `).join(''));
}

function filteredMatches() {
  const search = $('#search');
  const stageFilter = $('#stageFilter');

  const query = search ? search.value.toLowerCase() : '';
  const stage = stageFilter ? stageFilter.value : 'all';

  return allMatches.filter(match => {
    const text = [
      match.stage,
      match.group,
      name(match.home?.code),
      name(match.away?.code),
      match.home?.code,
      match.away?.code
    ].join(' ').toLowerCase();

    const stageOk =
      stage === 'all' ||
      (stage === 'knockout' ? match.stage !== 'group' : match.stage === stage);

    return text.includes(query) && stageOk;
  }).slice(0, 80);
}

function renderMatches() {
  const rows = filteredMatches();

  safeHTML('#matchList', rows.map(match => {
    const cls = match.status === 'finished'
      ? 'finished'
      : (['in_play', 'live'].includes(match.status) ? 'live' : '');

    return `
      <article class="match ${cls}">
        <div class="match-head">
          <span>${escapeHTML(match.stage === 'group' ? `Grup ${match.group}` : stageLabel(match.stage))}</span>
          <span>${escapeHTML(formatDateTime(match.date))}</span>
        </div>

        <div class="teams">
          <div class="team-row">
            <span>${escapeHTML(name(match.home?.code))}</span>
            <span class="score">${escapeHTML(scoreText(match.home?.score))}</span>
          </div>

          <div class="team-row">
            <span>${escapeHTML(name(match.away?.code))}</span>
            <span class="score">${escapeHTML(scoreText(match.away?.score))}</span>
          </div>
        </div>

        <div class="ai-note">${escapeHTML(matchNote(match))}</div>
      </article>
    `;
  }).join(''));
}

function stageLabel(stage) {
  if (!stage) return '-';

  const labels = {
    group: 'Grup',
    knockout: 'Eleme',
    round_of_32: 'Son 32',
    roundOf32: 'Son 32',
    round_32: 'Son 32',
    last_32: 'Son 32',
    round_of_16: 'Son 16',
    quarter_final: 'Çeyrek Final',
    semi_final: 'Yarı Final',
    final: 'Final'
  };

  return labels[stage] || stage;
}

function matchNote(match) {
  if (match.status === 'finished') {
    if (match.home?.score == null || match.away?.score == null) {
      return 'Maç tamamlandı görünüyor ancak skor verisi henüz eksik. Veri kaynağı güncellendiğinde yenilenecek.';
    }

    return 'Maç tamamlandı. Sonuç grup/eleme dengelerini otomatik etkiler.';
  }

  if (['in_play', 'live'].includes(match.status)) {
    return 'Canlı maç. Veri akışı güncellendikçe skor ve zaman yenilenir.';
  }

  return 'Planlanan maç. Başlama saatleri yerel saate göre gösterilir.';
}

function calcStandings() {
  const standings = {};

  for (const [group, teams] of Object.entries(groupMap)) {
    standings[group] = teams.map(code => ({
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

  const get = (group, code) => standings[group]?.find(row => row.code === code);

  allMatches
    .filter(match =>
      match.stage === 'group' &&
      match.status === 'finished' &&
      match.home?.score != null &&
      match.away?.score != null
    )
    .forEach(match => {
      const home = get(match.group, match.home.code);
      const away = get(match.group, match.away.code);

      if (!home || !away) return;

      home.p++;
      away.p++;

      home.gf += Number(match.home.score);
      home.ga += Number(match.away.score);

      away.gf += Number(match.away.score);
      away.ga += Number(match.home.score);

      home.gd = home.gf - home.ga;
      away.gd = away.gf - away.ga;

      if (match.home.score > match.away.score) {
        home.w++;
        away.l++;
        home.pts += 3;
      } else if (match.home.score < match.away.score) {
        away.w++;
        home.l++;
        away.pts += 3;
      } else {
        home.d++;
        away.d++;
        home.pts++;
        away.pts++;
      }
    });

  for (const group in standings) {
    standings[group].sort(sortStanding);
  }

  return standings;
}

function sortStanding(a, b) {
  return (
    b.pts - a.pts ||
    b.gd - a.gd ||
    b.gf - a.gf ||
    name(a.code).localeCompare(name(b.code), 'tr')
  );
}

function renderGroups() {
  const standings = calcStandings();

  safeHTML('#groupTables', Object.entries(standings).map(([group, rows]) => `
    <div class="group">
      <h3>${group} Grubu</h3>

      <table>
        <thead>
          <tr>
            <th>Takım</th>
            <th>O</th>
            <th>G</th>
            <th>B</th>
            <th>M</th>
            <th>AV</th>
            <th>P</th>
          </tr>
        </thead>

        <tbody>
          ${rows.map((row, index) => {
            const qualifyClass =
              index < AUTO_QUALIFY_LIMIT
                ? 'direct-qualify'
                : index === 2
                  ? 'third-race'
                  : '';

            return `
              <tr class="${row.code === focus ? 'focus' : ''} ${qualifyClass}">
                <td>${escapeHTML(name(row.code))}</td>
                <td>${row.p}</td>
                <td>${row.w}</td>
                <td>${row.d}</td>
                <td>${row.l}</td>
                <td>${row.gd}</td>
                <td><b>${row.pts}</b></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `).join(''));
}

function renderProbabilities() {
  if (intelligenceData?.groupQualification) {
    const focusGroup = getGroupOfTeam(focus) || 'D';
    const rows = intelligenceData.groupQualification[focusGroup] || [];

    safeHTML('#probabilities', `
      <div class="prob-group-title">
        ${escapeHTML(focusGroup)} Grubu Üst Tur Olasılıkları
      </div>

      <div class="ai-note" style="margin-bottom:16px">
        Format: Her grubun ilk 2 takımı doğrudan Son 32’ye çıkar. En iyi 8 üçüncü takım da üst tura kalır.
      </div>

      ${rows.map(item => `
        <div class="prob ${item.code === focus ? 'focus-prob' : ''}">
          <strong>${escapeHTML(name(item.code))}</strong>
          <div class="bar">
            <span style="width:${Math.max(2, Number(item.probability || 0))}%"></span>
          </div>
          <b>%${escapeHTML(item.probability ?? 0)}</b>
        </div>
      `).join('')}

      ${renderThirdPlaceMiniRanking(focusGroup)}
    `);

    return;
  }

  let list = probs
    .map(item => ({
      code: item.team || item.code,
      pct: Math.round((item.champion || item.title || item.prob || 0) * 100)
    }))
    .filter(item => item.code)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 12);

  if (!list.length) {
    list = ['BRA', 'FRA', 'ARG', 'ENG', 'ESP', 'POR', 'GER', 'NED']
      .map((code, index) => ({
        code,
        pct: [18, 16, 14, 12, 10, 8, 7, 6][index]
      }));
  }

  safeHTML('#probabilities', `
    <div class="ai-note" style="margin-bottom:16px">
      Format: Her grubun ilk 2 takımı doğrudan Son 32’ye çıkar. En iyi 8 üçüncü takım da üst tura kalır.
    </div>

    ${list.map(item => `
      <div class="prob">
        <strong>${escapeHTML(name(item.code))}</strong>
        <div class="bar">
          <span style="width:${Math.max(2, item.pct)}%"></span>
        </div>
        <b>%${item.pct}</b>
      </div>
    `).join('')}
  `);
}

function renderThirdPlaceMiniRanking(focusGroup) {
  const ranking = buildThirdPlaceRanking(calcStandings());
  if (!ranking.length) return '';

  const top = ranking.slice(0, BEST_THIRD_QUALIFY_LIMIT);
  const focusThird = ranking.find(item => item.code === focus);

  let extra = '';

  if (focusThird && !top.some(item => item.code === focus)) {
    extra = `
      <div class="signal" style="margin-top:10px">
        <b>${escapeHTML(name(focusThird.code))}</b>
        <span>Geçici en iyi üçüncüler sırası: ${focusThird.thirdPlaceRank}/${GROUP_COUNT}</span>
      </div>
    `;
  }

  return `
    <div class="ai-note" style="margin-top:18px">
      Geçici en iyi üçüncüler listesi, oynanan maçlara göre hesaplanır. Gruplar tamamlanmadan kesin sonuç değildir.
    </div>

    <div class="radar" style="margin-top:12px">
      ${top.map(item => `
        <div class="signal ${item.group === focusGroup ? 'focus-prob' : ''}">
          <b>${item.thirdPlaceRank}. ${escapeHTML(name(item.code))}</b>
          <span>${item.group} Grubu · ${item.pts} puan · AV ${item.gd}</span>
        </div>
      `).join('')}
      ${extra}
    </div>
  `;
}

function renderTurkiye() {
  const view = buildTurkiyeView();

  if (!view) {
    renderTurkiyeFallback();
    return;
  }

  const sectionTitle = $('#turkiye h2');
  if (sectionTitle) sectionTitle.textContent = view.panelTitle;

  safeHTML('#turkiyeCenter', `
    <div class="turkey-cards">
      <div class="stat">
        <strong>${escapeHTML(view.position || '-')}</strong>
        <span>D Grubu sıra</span>
      </div>

      <div class="stat">
        <strong>${escapeHTML(view.points)}</strong>
        <span>Puan</span>
      </div>

      <div class="stat">
        <strong>${escapeHTML(view.gd)}</strong>
        <span>Averaj</span>
      </div>

      <div class="stat">
        <strong class="status-word">${escapeHTML(view.signal)}</strong>
        <span>${escapeHTML(view.signalSub)}</span>
      </div>
    </div>

    <div class="stat qualification-prob">
      <strong>${escapeHTML(view.probabilityText)}</strong>
      <span>${escapeHTML(view.probabilityLabel)}</span>
    </div>

    ${view.thirdPlaceNote ? `
      <div class="signal" style="margin-top:16px">
        <b>Üçüncülük hesabı</b>
        <span>${escapeHTML(view.thirdPlaceNote)}</span>
      </div>
    ` : ''}

    <div class="ai-note" style="margin-top:16px">
      ${escapeHTML(view.analysis)}
    </div>

    <h3 style="margin-top:22px">Türkiye maçları</h3>

    <div class="match-list" style="margin-top:16px">
      ${view.matches.map(match => `
        <article class="match ${escapeHTML(match.className)}">
          <div class="match-head">
            <span>${escapeHTML(match.label)}</span>
            <span>${escapeHTML(match.dateText)}</span>
          </div>

          <div class="teams">
            <div class="team-row">
              <span>${escapeHTML(match.text)}</span>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `);
}

function buildTurkiyeView() {
  const standings = calcStandings();
  const group = 'D';
  const table = standings[group] || [];
  const row = table.find(item => item.code === 'TUR') || null;
  const position = table.findIndex(item => item.code === 'TUR') + 1;

  const turkiyeMatches = allMatches.filter(match =>
    match.home?.code === 'TUR' || match.away?.code === 'TUR'
  );

  if (!row && !turkiyeData) return null;

  const backendStanding = turkiyeData?.standing || {};
  const points = row?.pts ?? backendStanding.points ?? backendStanding.pts ?? 0;
  const gd = row?.gd ?? backendStanding.gd ?? 0;

  const allMatchesFinished =
    turkiyeMatches.length > 0 &&
    turkiyeMatches.every(match => match.status === 'finished');

  const thirdPlaceRanking = buildThirdPlaceRanking(standings);
  const thirdInfo = position === 3
    ? thirdPlaceRanking.find(item => item.code === 'TUR') || null
    : null;

  let tournamentStatus = turkiyeData?.tournamentStatus || 'active';
  let signal = turkiyeData?.qualificationSignal || 'Durum izleniyor';
  let signalSub = 'Üst tur sinyali';
  let qualificationProbability = Number(turkiyeData?.qualificationProbability ?? NaN);

  if (position === 1 || position === 2) {
    signal = 'Doğrudan üst tur hattında';
    signalSub = position === 1 ? 'Grup liderliği' : 'İlk 2 içinde';
    if (Number.isNaN(qualificationProbability)) qualificationProbability = position === 1 ? 90 : 78;
  } else if (position === 3) {
    signal = 'En iyi üçüncüler yarışında';
    signalSub = 'Kıyaslı üst tur hattı';

    if (Number.isNaN(qualificationProbability)) {
      if (thirdInfo?.thirdPlaceRank <= 4) qualificationProbability = 68;
      else if (thirdInfo?.thirdPlaceRank <= 8) qualificationProbability = 52;
      else if (thirdInfo?.thirdPlaceRank <= 10) qualificationProbability = 28;
      else qualificationProbability = 12;
    }
  } else if (position >= 4) {
    signal = 'Elenme hattında';
    signalSub = 'İlk 3 dışında';
    if (Number.isNaN(qualificationProbability)) qualificationProbability = 8;
  }

  if (allMatchesFinished) {
    if (position > 0 && position <= AUTO_QUALIFY_LIMIT) {
      tournamentStatus = 'advanced_auto';
      signal = 'Doğrudan üst tura çıktı';
      signalSub = 'Son 32';
      qualificationProbability = 100;
    } else if (position === 3) {
      if (thirdInfo?.qualifiesAsThird) {
        tournamentStatus = 'advanced_best_third';
        signal = 'En iyi üçüncülerden çıktı';
        signalSub = 'Son 32';
        qualificationProbability = 100;
      } else {
        tournamentStatus = 'third_place_wait';
        signal = 'En iyi üçüncüler bekleniyor';
        signalSub = 'Diğer gruplara bağlı';
        qualificationProbability = Number.isNaN(qualificationProbability) ? 35 : qualificationProbability;
      }
    } else {
      tournamentStatus = 'eliminated';
      signal = 'Turnuvaya veda etti';
      signalSub = 'Grup aşaması';
      qualificationProbability = 0;
    }
  }

  qualificationProbability = Math.max(0, Math.min(100, Number.isNaN(qualificationProbability) ? 25 : qualificationProbability));

  const panelTitle = tournamentStatus === 'eliminated'
    ? 'Türkiye’nin Turnuva Karnesi'
    : tournamentStatus === 'advanced_auto' || tournamentStatus === 'advanced_best_third'
      ? 'Türkiye Üst Turda'
      : 'Türkiye’nin Turnuva Panosu';

  const probabilityText =
    tournamentStatus === 'eliminated'
      ? 'Elendi'
      : tournamentStatus === 'advanced_auto' || tournamentStatus === 'advanced_best_third'
        ? 'Üst tur'
        : `%${qualificationProbability}`;

  const probabilityLabel =
    tournamentStatus === 'eliminated'
      ? 'Turnuva durumu'
      : tournamentStatus === 'advanced_auto'
        ? 'Doğrudan çıktı'
        : tournamentStatus === 'advanced_best_third'
          ? 'En iyi üçüncü'
          : position === 3
            ? 'En iyi üçüncüler ihtimali'
            : 'Üst tur ihtimali';

  const thirdPlaceNote =
    position === 3
      ? thirdInfo
        ? `Türkiye geçici en iyi üçüncüler sıralamasında ${thirdInfo.thirdPlaceRank}/${GROUP_COUNT}. sırada. En iyi ${BEST_THIRD_QUALIFY_LIMIT} üçüncü takım Son 32’ye kalır.`
        : `Türkiye 3. sırada. İlk iki takım doğrudan çıkar; üçüncüler arasında en iyi ${BEST_THIRD_QUALIFY_LIMIT} takım Son 32’ye kalır.`
      : '';

  const analysis = buildTurkiyeAnalysis({
    position,
    tournamentStatus,
    thirdInfo,
    qualificationProbability
  });

  const matches = turkiyeMatches.map(toTurkiyeMatchCard);

  return {
    panelTitle,
    position,
    points,
    gd,
    signal,
    signalSub,
    probabilityText,
    probabilityLabel,
    thirdPlaceNote,
    analysis,
    matches
  };
}

function buildTurkiyeAnalysis({ position, tournamentStatus, thirdInfo, qualificationProbability }) {
  if (tournamentStatus === 'advanced_auto') {
    return `Türkiye D Grubu'nu ${position}. sırada tamamladı ve doğrudan Son 32’ye çıktı.`;
  }

  if (tournamentStatus === 'advanced_best_third') {
    return `Türkiye D Grubu'nu 3. sırada tamamladı ve en iyi üçüncüler arasından Son 32’ye çıktı.`;
  }

  if (tournamentStatus === 'third_place_wait') {
    return 'Türkiye D Grubu’nu 3. sırada tamamladı. Üst tur durumu, diğer gruplardaki üçüncülerin puan ve averaj tablosuna göre netleşecek.';
  }

  if (tournamentStatus === 'eliminated') {
    return `Türkiye D Grubu'nu ${position}. sırada tamamladı ve turnuvaya veda etti. Yıldız Kupası, kalan maçlarda turnuva zekâsı, favoriler ve günlük notlarla devam ediyor.`;
  }

  if (position === 1 || position === 2) {
    return `Türkiye D Grubu'nda şu an ${position}. sırada. İlk iki sıra doğrudan Son 32 anlamına geliyor.`;
  }

  if (position === 3) {
    const rankText = thirdInfo
      ? ` Geçici en iyi üçüncüler sırası: ${thirdInfo.thirdPlaceRank}/${GROUP_COUNT}.`
      : '';

    return `Türkiye D Grubu'nda şu an 3. sırada. İlk iki takım doğrudan Son 32’ye çıkar; üçüncülükte ise en iyi ${BEST_THIRD_QUALIFY_LIMIT} üçüncü takım arasına girmek gerekiyor.${rankText} Güncel üst tur ihtimali yaklaşık %${qualificationProbability}.`;
  }

  if (position >= 4) {
    return `Türkiye D Grubu'nda şu an ${position}. sırada. Üst tur için ilk ikiye yükselmesi ya da en azından 3. sıraya çıkıp en iyi üçüncüler yarışına girmesi gerekiyor.`;
  }

  return 'Türkiye için grup verisi henüz oluşmadı.';
}

function buildThirdPlaceRanking(standings) {
  return Object.entries(standings)
    .map(([group, table]) => {
      const sorted = [...table].sort(sortStanding);
      const third = sorted[2];

      if (!third) return null;

      return {
        ...third,
        group
      };
    })
    .filter(Boolean)
    .sort(sortStanding)
    .map((team, index) => ({
      ...team,
      thirdPlaceRank: index + 1,
      qualifiesAsThird: index + 1 <= BEST_THIRD_QUALIFY_LIMIT
    }));
}

function toTurkiyeMatchCard(match) {
  const home = name(match.home?.code);
  const away = name(match.away?.code);
  const hasScore = match.home?.score != null && match.away?.score != null;

  let text = `${home} - ${away}`;
  if (hasScore) {
    text = `${home} ${match.home.score}-${match.away.score} ${away}`;
  }

  let label = 'Sıradaki maç';
  let className = '';

  if (match.status === 'finished') {
    className = 'finished';

    if (hasScore) {
      if (match.home.score === match.away.score) {
        label = 'Beraberlik';
      } else {
        const turkiyeWon =
          (match.home.code === 'TUR' && match.home.score > match.away.score) ||
          (match.away.code === 'TUR' && match.away.score > match.home.score);

        label = turkiyeWon ? 'Galibiyet' : 'Mağlubiyet';
      }
    } else {
      label = 'Maç tamamlandı';
    }
  } else if (['in_play', 'live'].includes(match.status)) {
    label = 'Canlı';
    className = 'live';
  }

  return {
    text,
    label,
    className,
    dateText: formatDateTime(match.date)
  };
}

function renderTurkiyeFallback() {
  const matches = allMatches.filter(match =>
    match.home?.code === 'TUR' || match.away?.code === 'TUR'
  );

  safeHTML('#turkiyeCenter', `
    <div class="match-list">
      ${matches.map(match => `
        <article class="match">
          <div class="match-head">
            <span>${escapeHTML(match.group ? match.group + ' Grubu' : stageLabel(match.stage))}</span>
            <span>${escapeHTML(formatDateTime(match.date))}</span>
          </div>

          <div class="teams">
            <div class="team-row">
              <span>${escapeHTML(name(match.home?.code))}</span>
              <span class="score">${escapeHTML(scoreText(match.home?.score))}</span>
            </div>

            <div class="team-row">
              <span>${escapeHTML(name(match.away?.code))}</span>
              <span class="score">${escapeHTML(scoreText(match.away?.score))}</span>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `);
}

function renderBrief() {
  const finished = allMatches.filter(match => match.status === 'finished').length;
  const live = allMatches.filter(match => ['in_play', 'live'].includes(match.status)).length;

  safeHTML('#dailyBrief', `
    <p><strong>${escapeHTML(new Date().toLocaleDateString('tr-TR', { dateStyle: 'full' }))}</strong></p>

    <p>Turnuvada şu ana kadar ${finished} maç tamamlandı, ${live} maç canlı izleme durumunda görünüyor.</p>

    <p>Yıldız Kupası’nın farkı ham skor göstermek değil; skorun turnuva bağlamını, grup etkisini ve hikâyesini sade biçimde anlatmaktır.</p>

    <p><strong>Format notu:</strong> Grup aşamasında ilk iki takım doğrudan Son 32’ye çıkar. En iyi 8 üçüncü takım da üst tura kalır.</p>
  `);
}

function getGroupOfTeam(code) {
  return Object.entries(groupMap).find(([, teams]) => teams.includes(code))?.[0] || null;
}

const langBtn = $('#langBtn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    // EN şimdilik kapalı. Buton tekrar görünür hale getirilirse burası kullanılabilir.
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
  teamFocus.addEventListener('change', event => {
    focus = event.target.value;
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