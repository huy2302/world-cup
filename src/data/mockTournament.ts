import { Competitor, FootballPlayer, Match, Tournament, TournamentSize, FormationType } from "@/types/tournament";

export const MASTER_FOOTBALL_PLAYERS: FootballPlayer[] = [
  {
    id: "p-cr7",
    name: "Cristiano Ronaldo",
    shortName: "C. Ronaldo",
    portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    overall: 122,
    position: "ST",
    club: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    nationality: "Portugal",
    nationalityFlag: "https://flagcdn.com/w40/pt.png",
    season: "ICON",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 5,
    skillMoves: 5,
    height: "187 cm",
    weight: "83 kg",
    workRate: "High/Med",
    traits: ["Finesse Shot", "Speed Dribbler", "Power Header", "Outside Foot Shot", "Flair"],
    attributes: { pace: 124, shooting: 126, passing: 115, dribbling: 122, defending: 55, physical: 120 }
  },
  {
    id: "p-messi",
    name: "Lionel Messi",
    shortName: "L. Messi",
    portrait: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80",
    overall: 121,
    position: "RW",
    club: "FC Barcelona",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    nationality: "Argentina",
    nationalityFlag: "https://flagcdn.com/w40/ar.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Left",
    weakFoot: 4,
    skillMoves: 5,
    height: "170 cm",
    weight: "72 kg",
    workRate: "High/Low",
    traits: ["Finesse Shot", "Playmaker", "Technical Dribbler", "Chip Shot", "Long Shooter"],
    attributes: { pace: 120, shooting: 124, passing: 125, dribbling: 127, defending: 50, physical: 105 }
  },
  {
    id: "p-mbappe",
    name: "Kylian Mbappé",
    shortName: "K. Mbappé",
    portrait: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
    overall: 120,
    position: "LW",
    club: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    nationality: "France",
    nationalityFlag: "https://flagcdn.com/w40/fr.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 4,
    skillMoves: 5,
    height: "178 cm",
    weight: "73 kg",
    workRate: "High/Low",
    traits: ["Speed Dribbler", "Outside Foot Shot", "Rapid", "Chip Shot"],
    attributes: { pace: 128, shooting: 121, passing: 112, dribbling: 123, defending: 48, physical: 110 }
  },
  {
    id: "p-haaland",
    name: "Erling Haaland",
    shortName: "E. Haaland",
    portrait: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
    overall: 119,
    position: "ST",
    club: "Manchester City",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    nationality: "Norway",
    nationalityFlag: "https://flagcdn.com/w40/no.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Left",
    weakFoot: 4,
    skillMoves: 4,
    height: "194 cm",
    weight: "88 kg",
    workRate: "High/Med",
    traits: ["Power Header", "Acrobatic Clearance", "Long Shooter", "Strength"],
    attributes: { pace: 123, shooting: 125, passing: 102, dribbling: 114, defending: 55, physical: 125 }
  },
  {
    id: "p-gullit",
    name: "Ruud Gullit",
    shortName: "R. Gullit",
    portrait: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
    overall: 123,
    position: "CAM",
    club: "AC Milan",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg",
    nationality: "Netherlands",
    nationalityFlag: "https://flagcdn.com/w40/nl.png",
    season: "ICON",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 5,
    skillMoves: 5,
    height: "191 cm",
    weight: "88 kg",
    workRate: "High/High",
    traits: ["Power Header", "Long Shooter", "Playmaker", "Leadership", "Outside Foot Shot"],
    attributes: { pace: 121, shooting: 122, passing: 121, dribbling: 120, defending: 115, physical: 124 }
  },
  {
    id: "p-zidane",
    name: "Zinedine Zidane",
    shortName: "Z. Zidane",
    portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    overall: 122,
    position: "CAM",
    club: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    nationality: "France",
    nationalityFlag: "https://flagcdn.com/w40/fr.png",
    season: "ICON",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 5,
    skillMoves: 5,
    height: "185 cm",
    weight: "77 kg",
    workRate: "Med/Med",
    traits: ["Flair", "Playmaker", "Long Passer", "Finesse Shot"],
    attributes: { pace: 114, shooting: 120, passing: 126, dribbling: 124, defending: 85, physical: 114 }
  },
  {
    id: "p-vvd",
    name: "Virgil van Dijk",
    shortName: "V. van Dijk",
    portrait: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
    overall: 119,
    position: "CB",
    club: "Liverpool",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    nationality: "Netherlands",
    nationalityFlag: "https://flagcdn.com/w40/nl.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 4,
    skillMoves: 3,
    height: "195 cm",
    weight: "92 kg",
    workRate: "Med/High",
    traits: ["Power Header", "Leadership", "Long Passer", "Dives Into Tackles"],
    attributes: { pace: 116, shooting: 72, passing: 105, dribbling: 104, defending: 126, physical: 124 }
  },
  {
    id: "p-maldini",
    name: "Paolo Maldini",
    shortName: "P. Maldini",
    portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    overall: 121,
    position: "CB",
    club: "AC Milan",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg",
    nationality: "Italy",
    nationalityFlag: "https://flagcdn.com/w40/it.png",
    season: "ICON",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 4,
    skillMoves: 3,
    height: "186 cm",
    weight: "77 kg",
    workRate: "Med/High",
    traits: ["Tactical Leader", "Slide Tackler", "Acrobatic Clearance"],
    attributes: { pace: 118, shooting: 68, passing: 104, dribbling: 110, defending: 128, physical: 118 }
  },
  {
    id: "p-courtois",
    name: "Thibaut Courtois",
    shortName: "T. Courtois",
    portrait: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80",
    overall: 118,
    position: "GK",
    club: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    nationality: "Belgium",
    nationalityFlag: "https://flagcdn.com/w40/be.png",
    season: "CC",
    cardLevel: 8,
    preferredFoot: "Left",
    weakFoot: 3,
    skillMoves: 1,
    height: "200 cm",
    weight: "96 kg",
    workRate: "Med/Med",
    traits: ["GK Long Throw", "Comes For Crosses", "GK One On One"],
    attributes: { pace: 115, shooting: 40, passing: 98, dribbling: 100, defending: 122, physical: 116 }
  },
  {
    id: "p-son",
    name: "Son Heung-Min",
    shortName: "Son H. M.",
    portrait: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
    overall: 118,
    position: "ST",
    club: "Tottenham Hotspur",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    nationality: "South Korea",
    nationalityFlag: "https://flagcdn.com/w40/kr.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 5,
    skillMoves: 5,
    height: "183 cm",
    weight: "78 kg",
    workRate: "High/High",
    traits: ["Finesse Shot", "Speed Dribbler", "Long Shooter", "Outside Foot Shot"],
    attributes: { pace: 123, shooting: 124, passing: 114, dribbling: 120, defending: 60, physical: 108 }
  },
  {
    id: "p-kdb",
    name: "Kevin De Bruyne",
    shortName: "K. De Bruyne",
    portrait: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
    overall: 120,
    position: "CM",
    club: "Manchester City",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    nationality: "Belgium",
    nationalityFlag: "https://flagcdn.com/w40/be.png",
    season: "24TOTS",
    cardLevel: 8,
    preferredFoot: "Right",
    weakFoot: 5,
    skillMoves: 4,
    height: "181 cm",
    weight: "75 kg",
    workRate: "High/High",
    traits: ["Playmaker", "Long Passer", "Finesse Shot", "Long Shooter", "Early Crosser"],
    attributes: { pace: 112, shooting: 122, passing: 128, dribbling: 121, defending: 90, physical: 112 }
  },
  {
    id: "p-roberto-carlos",
    name: "Roberto Carlos",
    shortName: "R. Carlos",
    portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    overall: 119,
    position: "LB",
    club: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    nationality: "Brazil",
    nationalityFlag: "https://flagcdn.com/w40/br.png",
    season: "ICON",
    cardLevel: 8,
    preferredFoot: "Left",
    weakFoot: 3,
    skillMoves: 4,
    height: "168 cm",
    weight: "70 kg",
    workRate: "High/High",
    traits: ["Free Kick Specialist", "Long Shooter", "Early Crosser", "Speed Dribbler"],
    attributes: { pace: 126, shooting: 115, passing: 114, dribbling: 117, defending: 114, physical: 120 }
  }
];

export function buildSampleSquad(formation: FormationType = "4-2-3-1"): any {
  const starters = [
    { slotPosition: "ST", player: MASTER_FOOTBALL_PLAYERS[0] },
    { slotPosition: "LAM", player: MASTER_FOOTBALL_PLAYERS[2] },
    { slotPosition: "CAM", player: MASTER_FOOTBALL_PLAYERS[4] },
    { slotPosition: "RAM", player: MASTER_FOOTBALL_PLAYERS[1] },
    { slotPosition: "LCDM", player: MASTER_FOOTBALL_PLAYERS[5] },
    { slotPosition: "RCDM", player: MASTER_FOOTBALL_PLAYERS[10] },
    { slotPosition: "LB", player: MASTER_FOOTBALL_PLAYERS[11] },
    { slotPosition: "LCB", player: MASTER_FOOTBALL_PLAYERS[7] },
    { slotPosition: "RCB", player: MASTER_FOOTBALL_PLAYERS[6] },
    { slotPosition: "RB", player: MASTER_FOOTBALL_PLAYERS[3] },
    { slotPosition: "GK", player: MASTER_FOOTBALL_PLAYERS[8] },
  ];

  return {
    formation,
    teamValue: "185,000,000,000 BP",
    chemistry: 100,
    startingXI: starters,
    substitutes: [MASTER_FOOTBALL_PLAYERS[9], MASTER_FOOTBALL_PLAYERS[3]]
  };
}

export const SEED_COMPETITORS: Competitor[] = [
  {
    id: "c-1",
    nickname: "Sub-Zero",
    fconlineUid: "FCO-99201",
    teamName: "Galacticos Esports",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80",
    rank: "Super Champions #1",
    overallRating: 124,
    squad: buildSampleSquad("4-2-3-1")
  },
  {
    id: "c-2",
    nickname: "ViperKing",
    fconlineUid: "FCO-88102",
    teamName: "Blue Moon Gaming",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    rank: "Super Champions #3",
    overallRating: 122,
    squad: buildSampleSquad("4-3-3")
  },
  {
    id: "c-3",
    nickname: "DragonEye",
    fconlineUid: "FCO-77409",
    teamName: "Catalan Kings",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80",
    rank: "Challenger 1000P",
    overallRating: 121,
    squad: buildSampleSquad("4-1-2-1-2")
  },
  {
    id: "c-4",
    nickname: "Kaiser_FC",
    fconlineUid: "FCO-66304",
    teamName: "Bavaria Titans",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
    rank: "Challenger 950P",
    overallRating: 120,
    squad: buildSampleSquad("3-5-2")
  },
  {
    id: "c-5",
    nickname: "ShadowTactician",
    fconlineUid: "FCO-55401",
    teamName: "Red Devils Esports",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rank: "Challenger 900P",
    overallRating: 119,
    squad: buildSampleSquad("5-2-1-2")
  },
  {
    id: "c-6",
    nickname: "PhantomStrike",
    fconlineUid: "FCO-44109",
    teamName: "Rossoneri Legends",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    rank: "Champions #24",
    overallRating: 119,
    squad: buildSampleSquad("4-2-3-1")
  },
  {
    id: "c-7",
    nickname: "NeonBlade",
    fconlineUid: "FCO-33201",
    teamName: "Kopite Warriors",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rank: "Champions #45",
    overallRating: 118,
    squad: buildSampleSquad("4-3-3")
  },
  {
    id: "c-8",
    nickname: "ApexPredator",
    fconlineUid: "FCO-22108",
    teamName: "Chelsea Blues",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/cc/Chelsea_FC.svg",
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=300&q=80",
    rank: "Champions #88",
    overallRating: 118,
    squad: buildSampleSquad("4-2-3-1")
  }
];

export function generateBracket(size: TournamentSize): Match[] {
  const matches: Match[] = [];
  const competitors: Competitor[] = [];

  // Generate synthetic competitors if size > seed length
  for (let i = 0; i < size; i++) {
    if (i < SEED_COMPETITORS.length) {
      competitors.push(SEED_COMPETITORS[i]);
    } else {
      const baseSeed = SEED_COMPETITORS[i % SEED_COMPETITORS.length];
      competitors.push({
        ...baseSeed,
        id: `c-${i + 1}`,
        nickname: `${baseSeed.nickname}_${i + 1}`,
        teamName: `${baseSeed.teamName} Squad ${Math.floor(i / 8) + 1}`,
        overallRating: Math.max(110, baseSeed.overallRating - (i % 5))
      });
    }
  }

  // Calculate rounds needed: 8 -> 3 rounds, 16 -> 4 rounds, 32 -> 5 rounds, 64 -> 6 rounds
  const totalRounds = Math.log2(size);
  let matchIdCounter = 1;

  for (let r = 1; r <= totalRounds; r++) {
    const numMatchesInRound = size / Math.pow(2, r);
    let roundName = `Round ${r}`;
    if (numMatchesInRound === 1) roundName = "Grand Final";
    else if (numMatchesInRound === 2) roundName = "Semi-Finals";
    else if (numMatchesInRound === 4) roundName = "Quarter-Finals";
    else if (numMatchesInRound === 8) roundName = "Round of 16";
    else if (numMatchesInRound === 16) roundName = "Round of 32";
    else if (numMatchesInRound === 32) roundName = "Round of 64";

    for (let m = 0; m < numMatchesInRound; m++) {
      let homePlayer: Competitor | null = null;
      let awayPlayer: Competitor | null = null;
      let status: "UPCOMING" | "LIVE" | "FINISHED" = "UPCOMING";
      let homeScore: number | null = null;
      let awayScore: number | null = null;
      let winnerId: string | null = null;

      if (r === 1) {
        homePlayer = competitors[m * 2];
        awayPlayer = competitors[m * 2 + 1];

        // Simulate some completed and live matches in Round 1
        if (m === 0) {
          status = "FINISHED";
          homeScore = 3;
          awayScore = 1;
          winnerId = homePlayer.id;
        } else if (m === 1) {
          status = "FINISHED";
          homeScore = 2;
          awayScore = 4;
          winnerId = awayPlayer.id;
        } else if (m === 2) {
          status = "LIVE";
          homeScore = 2;
          awayScore = 2;
        } else {
          status = "UPCOMING";
        }
      } else if (r === 2 && m === 0) {
        // Carry winners into round 2 for realistic appearance
        const prev1 = matches.find((x) => x.round === 1 && x.matchNumber === 1);
        const prev2 = matches.find((x) => x.round === 1 && x.matchNumber === 2);
        if (prev1 && prev1.winnerId) homePlayer = competitors.find((c) => c.id === prev1.winnerId) || null;
        if (prev2 && prev2.winnerId) awayPlayer = competitors.find((c) => c.id === prev2.winnerId) || null;
        status = "UPCOMING";
      }

      matches.push({
        id: `m-r${r}-${m + 1}`,
        matchNumber: matchIdCounter++,
        round: r,
        roundName,
        bracketType: "WINNERS",
        homePlayer,
        awayPlayer,
        homeScore,
        awayScore,
        winnerId,
        status,
        scheduledTime: r === 1 ? "20:00 LIVE" : `Round ${r}`,
        liveMinute: status === "LIVE" ? "78'" : undefined
      });
    }
  }

  return matches;
}

export const INITIAL_TOURNAMENT: Tournament = {
  id: "tourney-2026-fconline",
  title: "FC ONLINE WORLD CHAMPIONS CUP 2026",
  subtitle: "Official Global Esports Championship • $250,000 Prize Pool",
  status: "IN_PROGRESS",
  currentRound: "ROUND 16",
  size: 16,
  prizePool: "$250,000 USD",
  startDate: "July 28, 2026",
  matches: generateBracket(16),
  registeredPlayers: SEED_COMPETITORS
};
