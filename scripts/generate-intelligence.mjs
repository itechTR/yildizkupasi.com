import fs from "fs/promises";

const MATCHES_FILE = "data/matches.json";

const teamNames = {
  MEX:"Meksika", RSA:"Güney Afrika", CZE:"Çekya", KOR:"Güney Kore",
  CAN:"Kanada", QAT:"Katar", SUI:"İsviçre", BIH:"Bosna Hersek",
  BRA:"Brezilya", HAI:"Haiti", MAR:"Fas", SCO:"İskoçya",
  AUS:"Avustralya", PAR:"Paraguay", USA:"ABD", TUR:"Türkiye",
  GER:"Almanya", CIV:"Fildişi Sahili", ECU:"Ekvador", CUW:"Curaçao",
  NED:"Hollanda", JPN:"Japonya", TUN:"Tunus", SWE:"İsveç",
  BEL:"Belçika", EGY:"Mısır", IRN:"İran", NZL:"Yeni Zelanda",
  ESP:"İspanya", URU:"Uruguay", KSA:"Suudi Arabistan", CPV:"Cape Verde",
  FRA:"Fransa", SEN:"Senegal", NOR:"Norveç", IRQ:"Irak",
  ARG:"Arjantin", ALG:"Cezayir", AUT:"Avusturya", JOR:"Ürdün",
  ENG:"İngiltere", CRO:"Hırvatistan", GHA:"Gana", PAN:"Panama",
  POR:"Portekiz", UZB:"Özbekistan", COL:"Kolombiya", COD:"DR Kongo"
};

const groupMap = {
  A:["MEX","RSA","CZE","KOR"],
  B:["CAN","QAT","SUI","BIH"],
  C:["BRA","HAI","MAR","SCO"],
  D:["AUS","PAR","TUR","USA"],
  E:["GER","CIV","ECU","CUW"],
  F:["NED","JPN","TUN","SWE"],
  G:["BEL","EGY","IRN","NZL"],
  H:["ESP","URU","KSA","CPV"],
  I:["FRA","SEN","NOR","IRQ"],
  J:["ARG","ALG","AUT","JOR"],
  K:["POR","UZB","COL","COD"],
  L:["ENG","CRO","GHA","PAN"]
};

function name(code) {
  return teamNames[code] || code || "-";
}

function calcStandings(matches) {
  const standings = {};

  for (const [group, teams] of Object.entries(groupMap)) {
    standings[group] = teams.map(code => ({
      code, team: name(code),
      played: 0, won: 0, draw: 0, lost: 0,
      gf: 0, ga: 0, gd: 0, points: 0
    }));
  }

  const get = (group, code) => standings[group]?.find(t => t.code === code);

  matches
    .filter(m => m.stage === "group" && m.status === "finished")
    .forEach(m => {
      const h = get(m.group, m.home.code);
      const a = get(m.group, m.away.code);

      if (!h || !a) return;
      if (m.home.score == null || m.away.score == null) return;

      h.played++;
      a.played++;

      h.gf += m.home.score;
      h.ga += m.away.score;
      a.gf += m.away.score;
      a.ga += m.home.score;

      h.gd = h.gf - h.ga;
      a.gd = a.gf - a.ga;

      if (m.home.score > m.away.score) {
        h.won++;
        a.lost++;
        h.points += 3;
      } else if (m.home.score < m.away.score) {
        a.won++;
        h.lost++;
        a.points += 3;
      } else {
        h.draw++;
        a.draw++;
        h.points++;
        a.points++;
      }
    });

  for (const group of Object.keys(standings)) {
    standings[group].sort((a, b) =>
      b.points - a.points ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      a.team.localeCompare(b.team, "tr")
    );
  }

  return standings;
}

function resultLine(m) {
  return `${name(m.home.code)} ${m.home.score}-${m.away.score} ${name(m.away.code)}`;
}

function fixtureLine(m) {
  return `${name(m.home.code)} - ${name(m.away.code)}`;
}

function generateBriefing(matches, standings) {
  const finished = matches.filter(m => m.status === "finished");
  const live = matches.filter(m => ["live", "in_play"].includes(m.status));
  const upcoming = matches.filter(m => m.status !== "finished").slice(0, 5);
  const latest = finished.slice(-5);

  const biggestWins = finished
    .map(m => ({
      match: m,
      diff: Math.abs((m.home.score ?? 0) - (m.away.score ?? 0)),
      goals: (m.home.score ?? 0) + (m.away.score ?? 0)
    }))
    .sort((a, b) => b.diff - a.diff || b.goals - a.goals)
    .slice(0, 3);

  return {
    updatedAt: new Date().toISOString(),
    title: "Yıldız Kupası Günlük Notu",
    summary: [
      `Turnuvada şu ana kadar ${finished.length} maç tamamlandı.`,
      live.length
        ? `Şu anda ${live.length} canlı maç görünüyor.`
        : "Şu anda canlı maç görünmüyor.",
      upcoming.length
        ? `Sıradaki dikkat çeken maçlar: ${upcoming.map(fixtureLine).join(", ")}.`
        : "Yaklaşan maç görünmüyor."
    ],
    latestResults: latest.map(m => ({
      id: m.id,
      text: resultLine(m),
      group: m.group,
      stage: m.stage
    })),
    biggestSignals: biggestWins.map(x => ({
      id: x.match.id,
      text: resultLine(x.match),
      signal: x.diff >= 3 ? "Farklı galibiyet" : "Dikkat çeken sonuç"
    })),
    editorialNote:
      "Yıldız Kupası, ham skoru değil skorun turnuva içindeki anlamını izler. Grup dengesi, momentum ve kritik eşikler bu notta özetlenir."
  };
}

function generateTurkiye(matches, standings) {
  const group = "D";
  const table = standings[group] || [];
  const turkiye = table.find(t => t.code === "TUR") || null;

  const turkiyeMatches = matches.filter(
    m => m.home.code === "TUR" || m.away.code === "TUR"
  );

  const played = turkiyeMatches.filter(m => m.status === "finished");
  const upcoming = turkiyeMatches.filter(m => m.status !== "finished");

  const position = table.findIndex(t => t.code === "TUR") + 1;

  let qualificationSignal = "Belirsiz";
  if (position === 1) qualificationSignal = "Güçlü avantaj";
  else if (position === 2) qualificationSignal = "Üst tur hattında";
  else if (position === 3) qualificationSignal = "Kritik eşikte";
  else if (position >= 4) qualificationSignal = "Baskı altında";

  let qualificationProbability = 25;

  if (position === 1) qualificationProbability = 82;
  else if (position === 2) qualificationProbability = 68;
  else if (position === 3) qualificationProbability = 42;
  else if (position >= 4) qualificationProbability = 18;

  if (turkiye?.points >= 4) qualificationProbability += 8;
  if (turkiye?.gd > 0) qualificationProbability += 6;
  if (turkiye?.gd < 0) qualificationProbability -= 6;
  if (upcoming.length === 0 && position > 2) qualificationProbability -= 15;

  qualificationProbability = Math.max(3, Math.min(95, qualificationProbability));

  return {
    updatedAt: new Date().toISOString(),
    team: "TUR",
    teamName: "Türkiye",
    group,
    position,
    qualificationSignal,
    qualificationProbability,
    standing: turkiye,
    playedMatches: played.map(m => ({
      id: m.id,
      text: resultLine(m),
      result:
        m.winner === "TUR"
          ? "win"
          : m.winner === null
            ? "draw"
            : "loss"
    })),
    upcomingMatches: upcoming.map(m => ({
      id: m.id,
      text: fixtureLine(m),
      date: m.date,
      opponent: m.home.code === "TUR" ? m.away.code : m.home.code
    })),
    analysis:
      position > 0
        ? `Türkiye D Grubu'nda şu an ${position}. sırada. Kalan maçlar üst tur ihtimalini belirleyecek.`
        : "Türkiye için grup verisi henüz oluşmadı."
  };
}

function generateIntelligence(matches, standings) {
  const finished = matches.filter(m => m.status === "finished");
  const live = matches.filter(m => ["live", "in_play"].includes(m.status));
  const upcoming = matches.filter(m => m.status !== "finished").slice(0, 8);

  const groupLeaders = Object.entries(standings).map(([group, rows]) => ({
    group,
    leader: rows[0]?.code,
    leaderName: name(rows[0]?.code),
    points: rows[0]?.points ?? 0
  }));

  const highScoring = finished
    .filter(m => ((m.home.score ?? 0) + (m.away.score ?? 0)) >= 4)
    .slice(-5)
    .map(m => ({
      id: m.id,
      text: resultLine(m),
      goals: (m.home.score ?? 0) + (m.away.score ?? 0)
    }));

  return {
    updatedAt: new Date().toISOString(),
    liveCount: live.length,
    finishedCount: finished.length,
    scheduledCount: matches.filter(m => m.status !== "finished").length,
    radar: [
      {
        title: "Grup liderleri",
        text: groupLeaders
          .filter(x => x.leader)
          .map(x => `${x.group}: ${x.leaderName}`)
          .join(", ")
      },
      {
        title: "Gol sinyali",
        text: highScoring.length
          ? `Son yüksek skorlu maçlar: ${highScoring.map(x => x.text).join(", ")}.`
          : "Henüz belirgin yüksek skorlu seri oluşmadı."
      },
      {
        title: "Yaklaşan kritik maçlar",
        text: upcoming.length
          ? upcoming.map(fixtureLine).join(", ")
          : "Yaklaşan maç görünmüyor."
      }
    ],
    groupLeaders,
    highScoringMatches: highScoring,
    upcomingFocus: upcoming.map(m => ({
      id: m.id,
      text: fixtureLine(m),
      date: m.date,
      group: m.group,
      stage: m.stage
    }))
  };
}

async function main() {
  const raw = await fs.readFile(MATCHES_FILE, "utf8");
  const payload = JSON.parse(raw);
  const matches = Array.isArray(payload) ? payload : payload.matches || [];

  const standings = calcStandings(matches);
  const briefing = generateBriefing(matches, standings);
  const turkiye = generateTurkiye(matches, standings);
  const intelligence = generateIntelligence(matches, standings);

  await fs.mkdir("data", { recursive: true });

  await fs.writeFile("data/briefing.json", JSON.stringify(briefing, null, 2));
  await fs.writeFile("data/turkiye.json", JSON.stringify(turkiye, null, 2));
  await fs.writeFile("data/intelligence.json", JSON.stringify(intelligence, null, 2));

  console.log("Faz 2 intelligence dosyaları üretildi:");
  console.log("- data/briefing.json");
  console.log("- data/turkiye.json");
  console.log("- data/intelligence.json");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});