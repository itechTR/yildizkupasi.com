import fs from "fs/promises";

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
const API = "https://api.football-data.org/v4";
const COMPETITION = "WC";

if (!TOKEN) {
  throw new Error("FOOTBALL_DATA_TOKEN secret bulunamadı.");
}

const teamCodeFix = {
  "Türkiye": "TUR",
  "Turkey": "TUR",
  "Korea Republic": "KOR",
  "Czech Republic": "CZE",
  "Czechia": "CZE",
  "United States": "USA",
  "South Africa": "RSA",
  "Bosnia and Herzegovina": "BIH",
  "Saudi Arabia": "KSA",
  "Côte d'Ivoire": "CIV",
  "Ivory Coast": "CIV",
  "Curacao": "CUW",
  "Curaçao": "CUW",
  "Cape Verde": "CPV",
  "DR Congo": "COD"
};

function codeOf(team) {
  if (!team) return "TBD";
  if (team.tla) return team.tla;
  if (team.shortName && teamCodeFix[team.shortName]) return teamCodeFix[team.shortName];
  if (team.name && teamCodeFix[team.name]) return teamCodeFix[team.name];
  return (team.shortName || team.name || "TBD").slice(0, 3).toUpperCase();
}

function statusOf(status) {
  const s = String(status || "").toUpperCase();

  if (["FINISHED", "AWARDED"].includes(s)) return "finished";
  if (["IN_PLAY", "PAUSED", "LIVE"].includes(s)) return "live";
  if (["TIMED", "SCHEDULED"].includes(s)) return "scheduled";
  if (["POSTPONED", "CANCELLED", "SUSPENDED"].includes(s)) return "postponed";

  return "scheduled";
}

function getScore(match, side) {
  const fullTime = match.score?.fullTime?.[side];
  const regular = match.score?.regularTime?.[side];

  if (fullTime !== null && fullTime !== undefined) return fullTime;
  if (regular !== null && regular !== undefined) return regular;

  return null;
}

function groupOf(match) {
  const group = match.group || match.stage || "";
  const found = String(group).match(/[A-L]$/);
  return found ? found[0] : "";
}

function mapMatch(match, index) {
  const homeCode = codeOf(match.homeTeam);
  const awayCode = codeOf(match.awayTeam);

  const homeScore = getScore(match, "home");
  const awayScore = getScore(match, "away");

  let winner = null;
  if (homeScore !== null && awayScore !== null) {
    if (homeScore > awayScore) winner = homeCode;
    if (awayScore > homeScore) winner = awayCode;
  }

  return {
    id: String(match.id),
    n: index + 1,
    stage: String(match.stage || "").toLowerCase().includes("group") ? "group" : "knockout",
    group: groupOf(match),
    date: match.utcDate,
    status: statusOf(match.status),
    time: match.minute ? `${match.minute}'` : null,
    home: {
      code: homeCode,
      score: homeScore,
      pen: match.score?.penalties?.home ?? null
    },
    away: {
      code: awayCode,
      score: awayScore,
      pen: match.score?.penalties?.away ?? null
    },
    winner,
    source: "football-data.org",
    lastUpdated: new Date().toISOString()
  };
}

async function apiGet(path) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      "X-Auth-Token": TOKEN
    }
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Football-Data API hata: ${res.status} ${text}`);
  }

  return JSON.parse(text);
}

async function main() {
  const data = await apiGet(`/competitions/${COMPETITION}/matches`);

  const matches = (data.matches || [])
    .map(mapMatch)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  await fs.mkdir("data", { recursive: true });

  await fs.writeFile(
    "data/matches.json",
    JSON.stringify({
      updatedAt: new Date().toISOString(),
      source: "football-data.org",
      competition: COMPETITION,
      matches
    }, null, 2)
  );

  await fs.writeFile(
    "data/meta.json",
    JSON.stringify({
      updatedAt: new Date().toISOString(),
      source: "football-data.org",
      competition: COMPETITION,
      totalMatches: matches.length,
      finished: matches.filter(m => m.status === "finished").length,
      live: matches.filter(m => m.status === "live").length,
      scheduled: matches.filter(m => m.status === "scheduled").length
    }, null, 2)
  );

  console.log(`Yıldız Kupası data güncellendi: ${matches.length} maç`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});