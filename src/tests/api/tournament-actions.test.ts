import { describe, it, expect } from "vitest";
import { db } from "@/lib/db";

describe("Tournament Integration Tests", () => {
  it("should retrieve seeded tournaments from database", async () => {
    const tournaments = await db.tournament.findMany({
      include: { registrations: true },
    });

    expect(tournaments.length).toBeGreaterThan(0);
    const active = tournaments.find((t) => t.status === "IN_PROGRESS");
    expect(active).toBeDefined();
    expect(active?.registrations.length).toBe(8);
  });

  it("should retrieve football players with complete attributes", async () => {
    const players = await db.footballPlayer.findMany();
    expect(players.length).toBe(12);

    const ronaldo = players.find((p) => p.name === "Cristiano Ronaldo");
    expect(ronaldo).toBeDefined();
    expect(ronaldo?.season).toBe("ICON");
    expect(ronaldo?.overall).toBe(118);
    expect(ronaldo?.salary).toBe(28);
    expect(ronaldo?.traits).toContain("Finesse Shot");
  });
});
