import { describe, it, expect } from "vitest";
import {
  generateSingleEliminationMatches,
  generateDoubleEliminationMatches,
  generateGroupStageMatches,
  generateRoundRobinMatches,
} from "@/lib/bracket-engine";

describe("Bracket Engine - Unit Tests", () => {
  const tournamentId = "test-tournament-123";

  it("should generate 7 matches for 8 players in Single Elimination", () => {
    const players = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
    const matches = generateSingleEliminationMatches(tournamentId, players);

    // 8 players -> 4 QF + 2 SF + 1 Final = 7 matches
    expect(matches.length).toBe(7);
    expect(matches.filter((m) => m.round === 1).length).toBe(4);
    expect(matches.filter((m) => m.round === 2).length).toBe(2);
    expect(matches.filter((m) => m.round === 3).length).toBe(1);
    expect(matches[0].status).toBe("READY");
  });

  it("should generate Double Elimination matches with Winners, Losers, and Grand Final", () => {
    const players = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
    const matches = generateDoubleEliminationMatches(tournamentId, players);

    const winnersMatches = matches.filter((m) => m.bracketType === "WINNERS");
    const losersMatches = matches.filter((m) => m.bracketType === "LOSERS");
    const grandFinal = matches.filter((m) => m.bracketType === "GRAND_FINAL");

    expect(winnersMatches.length).toBe(7);
    expect(losersMatches.length).toBeGreaterThan(0);
    expect(grandFinal.length).toBe(1);
  });

  it("should generate 6 intra-group matches for a 4-player Group Stage", () => {
    const players = ["p1", "p2", "p3", "p4"];
    const matches = generateGroupStageMatches(tournamentId, players);

    // 4 players in 1 group -> (4 * 3) / 2 = 6 matches
    expect(matches.length).toBe(6);
    expect(matches[0].groupName).toBe("Group A");
    expect(matches[0].status).toBe("READY");
  });

  it("should generate Round Robin fixtures using Berger algorithm", () => {
    const players = ["p1", "p2", "p3", "p4"];
    const matches = generateRoundRobinMatches(tournamentId, players);

    // 4 players -> 3 rounds, 2 matches per round = 6 matches
    expect(matches.length).toBe(6);
  });
});
