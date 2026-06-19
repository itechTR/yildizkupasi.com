import fs from 'node:fs/promises';

const provider = process.env.SCORE_PROVIDER || 'none';
const out = new URL('../data/matches.json', import.meta.url);

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

function normalizeFootballData(payload) {
  const items = payload.matches || [];
  return items.map((m, i) => ({
    id: String(m.id || i + 1),
    n: i + 1,
    stage: (m.stage || '').toLowerCase().includes('group') ? 'group' : 'knockout',
    group: m.group || null,
    date: m.utcDate,
    status: m.status === 'FINISHED' ? 'finished' : (m.status === 'IN_PLAY' || m.status === 'PAUSED' ? 'live' : 'scheduled'),
    time: m.minute ? `${m.minute}'` : '',
    home: { code: m.homeTeam?.tla || m.homeTeam?.shortName || 'TBD', score: m.score?.fullTime?.home ?? m.score?.regularTime?.home ?? null, pen: null },
    away: { code: m.awayTeam?.tla || m.awayTeam?.shortName || 'TBD', score: m.score?.fullTime?.away ?? m.score?.regularTime?.away ?? null, pen: null }
  }));
}

async function main() {
  if (provider === 'none') {
    console.log('SCORE_PROVIDER=none. Existing data kept. Configure a licensed provider to enable automatic updates.');
    return;
  }

  let matches;
  if (provider === 'football-data') {
    const token = process.env.FOOTBALL_DATA_TOKEN;
    if (!token) throw new Error('FOOTBALL_DATA_TOKEN is missing');
    const url = process.env.FOOTBALL_DATA_URL || 'https://api.football-data.org/v4/competitions/WC/matches';
    const payload = await fetchJson(url, { 'X-Auth-Token': token });
    matches = normalizeFootballData(payload);
  } else if (provider === 'custom') {
    const url = process.env.CUSTOM_SCORE_URL;
    if (!url) throw new Error('CUSTOM_SCORE_URL is missing');
    const payload = await fetchJson(url);
    matches = payload.matches || payload;
  } else {
    throw new Error(`Unknown SCORE_PROVIDER: ${provider}`);
  }

  if (!Array.isArray(matches) || matches.length === 0) throw new Error('No matches returned by provider');
  const data = { matches, generatedAt: new Date().toISOString(), provider };
  await fs.writeFile(out, JSON.stringify(data, null, 2));
  console.log(`Updated ${matches.length} matches from ${provider}`);
}

main().catch(err => { console.error(err); process.exit(1); });
