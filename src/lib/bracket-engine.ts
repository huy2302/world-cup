export interface GeneratedMatch {
  tournamentId: string;
  round: number;
  matchNumber: number;
  bracketType: "WINNERS" | "LOSERS" | "GRAND_FINAL" | "GROUP" | "ROUND_ROBIN";
  groupName?: string;
  homePlayerId?: string | null;
  awayPlayerId?: string | null;
  status: "SCHEDULED" | "READY" | "IN_PROGRESS" | "SUBMITTED" | "DISPUTED" | "COMPLETED";
}

/**
 * Single Elimination Generator
 * Generates initial round 1 matches for N participants (padded to power of 2 with BYEs)
 */
export function generateSingleEliminationMatches(
  tournamentId: string,
  participantUserIds: string[]
): GeneratedMatch[] {
  const count = participantUserIds.length;
  // Next power of 2
  let targetSize = 2;
  while (targetSize < count) targetSize *= 2;

  const matches: GeneratedMatch[] = [];
  const rounds = Math.log2(targetSize);

  // Round 1
  let matchNumberCounter = 1;
  const r1MatchesCount = targetSize / 2;

  for (let i = 0; i < r1MatchesCount; i++) {
    const homePlayerId = participantUserIds[i] || null;
    const awayPlayerId = participantUserIds[targetSize - 1 - i] || null;
    const status = homePlayerId && awayPlayerId ? "READY" : "SCHEDULED";

    matches.push({
      tournamentId,
      round: 1,
      matchNumber: matchNumberCounter++,
      bracketType: "WINNERS",
      homePlayerId,
      awayPlayerId,
      status,
    });
  }

  // Future Rounds (Round 2 up to Finals)
  let prevRoundCount = r1MatchesCount;
  for (let r = 2; r <= rounds; r++) {
    const currentRoundMatches = prevRoundCount / 2;
    for (let i = 0; i < currentRoundMatches; i++) {
      matches.push({
        tournamentId,
        round: r,
        matchNumber: matchNumberCounter++,
        bracketType: "WINNERS",
        homePlayerId: null,
        awayPlayerId: null,
        status: "SCHEDULED",
      });
    }
    prevRoundCount = currentRoundMatches;
  }

  return matches;
}

/**
 * Double Elimination Generator
 * Generates Winners Bracket + Losers Bracket + Grand Finals
 */
export function generateDoubleEliminationMatches(
  tournamentId: string,
  participantUserIds: string[]
): GeneratedMatch[] {
  const matches: GeneratedMatch[] = [];

  // Winners Bracket (Single Elimination tree)
  const winnersMatches = generateSingleEliminationMatches(tournamentId, participantUserIds);
  matches.push(...winnersMatches);

  let matchNumberCounter = matches.length + 1;
  const count = participantUserIds.length;
  let targetSize = 2;
  while (targetSize < count) targetSize *= 2;
  const totalWBRounds = Math.log2(targetSize);

  // Losers Bracket Rounds (2 * (WBRounds - 1))
  const totalLBRounds = 2 * (totalWBRounds - 1);
  let lbMatchesInRound = Math.floor(targetSize / 4);

  for (let r = 1; r <= totalLBRounds; r++) {
    for (let i = 0; i < Math.max(1, lbMatchesInRound); i++) {
      matches.push({
        tournamentId,
        round: r,
        matchNumber: matchNumberCounter++,
        bracketType: "LOSERS",
        homePlayerId: null,
        awayPlayerId: null,
        status: "SCHEDULED",
      });
    }
    if (r % 2 === 0 && lbMatchesInRound > 1) {
      lbMatchesInRound = Math.floor(lbMatchesInRound / 2);
    }
  }

  // Grand Finals
  matches.push({
    tournamentId,
    round: totalWBRounds + 1,
    matchNumber: matchNumberCounter++,
    bracketType: "GRAND_FINAL",
    homePlayerId: null,
    awayPlayerId: null,
    status: "SCHEDULED",
  });

  return matches;
}

/**
 * Group Stage Generator
 * Splits participants into groups of 4 and generates intra-group round robin fixtures
 */
export function generateGroupStageMatches(
  tournamentId: string,
  participantUserIds: string[]
): GeneratedMatch[] {
  const matches: GeneratedMatch[] = [];
  const groupSize = 4;
  const groupCount = Math.ceil(participantUserIds.length / groupSize);

  let matchNumberCounter = 1;

  for (let g = 0; g < groupCount; g++) {
    const groupName = `Group ${String.fromCharCode(65 + g)}`;
    const groupMembers = participantUserIds.slice(g * groupSize, (g + 1) * groupSize);

    // Intra-group round-robin fixtures
    for (let i = 0; i < groupMembers.length; i++) {
      for (let j = i + 1; j < groupMembers.length; j++) {
        matches.push({
          tournamentId,
          round: 1,
          matchNumber: matchNumberCounter++,
          bracketType: "GROUP",
          groupName,
          homePlayerId: groupMembers[i],
          awayPlayerId: groupMembers[j],
          status: "READY",
        });
      }
    }
  }

  return matches;
}

/**
 * Round Robin Generator
 * Generates all vs all matches using Berger algorithm
 */
export function generateRoundRobinMatches(
  tournamentId: string,
  participantUserIds: string[]
): GeneratedMatch[] {
  const matches: GeneratedMatch[] = [];
  const players = [...participantUserIds];
  if (players.length % 2 !== 0) {
    players.push("BYE");
  }

  const n = players.length;
  const rounds = n - 1;
  const half = n / 2;

  let matchNumberCounter = 1;

  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < half; i++) {
      const home = players[i];
      const away = players[n - 1 - i];

      if (home !== "BYE" && away !== "BYE") {
        matches.push({
          tournamentId,
          round: r + 1,
          matchNumber: matchNumberCounter++,
          bracketType: "ROUND_ROBIN",
          homePlayerId: home,
          awayPlayerId: away,
          status: "READY",
        });
      }
    }
    // Rotate players for next round (keep first fixed)
    players.splice(1, 0, players.pop()!);
  }

  return matches;
}

/**
 * Swiss System Initial Generator (Round 1)
 */
export function generateSwissMatches(
  tournamentId: string,
  participantUserIds: string[]
): GeneratedMatch[] {
  return generateSingleEliminationMatches(tournamentId, participantUserIds).filter(
    (m) => m.round === 1
  );
}
