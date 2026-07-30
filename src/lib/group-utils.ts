import { GroupTeam } from "@/types/tournament";
import { CompetitorData } from "@/components/bracket/MatchNode";
import { buildSampleSquad } from "@/data/mockTournament";

/**
 * Custom Tiebreaker Rule sorting:
 * 1. Points (Điểm số)
 * 2. Most Goals Scored (Số bàn thắng ghi được nhiều hơn)
 * 3. Head-to-Head (Lịch sử đối đầu)
 * 4. Fewest Goals Conceded (Số bàn thua ít hơn)
 * 5. Overall Goal Difference (Hiệu số bàn thắng)
 */
export function sortGroupTeams(teams: GroupTeam[] = [], matches: any[] = []): GroupTeam[] {
  return [...teams].sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;

    // 2. Most Goals Scored (goalsFor)
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

    // 3. Head-to-Head (Lịch sử đối đầu)
    if (matches && matches.length > 0) {
      const h2hMatch = matches.find((m) => {
        if (m.homeScore === null || m.homeScore === undefined) return false;
        if (m.awayScore === null || m.awayScore === undefined) return false;
        const pA = a.ign || a.name;
        const pB = b.ign || b.name;
        const hName = m.home?.ign || m.home?.name || m.homeName;
        const aName = m.away?.ign || m.away?.name || m.awayName;
        return (hName === pA && aName === pB) || (hName === pB && aName === pA);
      });

      if (h2hMatch && h2hMatch.homeScore !== null && h2hMatch.awayScore !== null) {
        const pA = a.ign || a.name;
        const hName = h2hMatch.home?.ign || h2hMatch.home?.name || h2hMatch.homeName;
        const isAHome = hName === pA;
        const aScore = isAHome ? h2hMatch.homeScore : h2hMatch.awayScore;
        const bScore = isAHome ? h2hMatch.awayScore : h2hMatch.homeScore;
        if (aScore !== bScore) {
          return bScore - aScore; // Higher score in direct match wins
        }
      }
    }

    // 4. Fewest Goals Conceded (goalsAgainst - fewer is better)
    if (a.goalsAgainst !== b.goalsAgainst) return a.goalsAgainst - b.goalsAgainst;

    // 5. Goal Difference (goalDifference)
    return b.goalDifference - a.goalDifference;
  });
}

/**
 * Format GroupTeam object to CompetitorData for bracket MatchNode
 */
export function formatGroupTeamToCompetitor(t: GroupTeam): CompetitorData {
  return {
    name: t.name,
    ign: t.ign || t.name,
    avatar: t.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${t.name}`,
    teamName: t.teamName,
    teamFlag: t.teamFlag,
    formation: "4-2-3-1",
    score: null,
    squad: buildSampleSquad("4-2-3-1")
  };
}
