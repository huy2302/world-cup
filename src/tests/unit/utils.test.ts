import { describe, it, expect } from "vitest";
import { formatSquadValue, formatDate } from "@/lib/utils";

describe("Utils Helper Unit Tests", () => {
  it("should format squad value in Trillions, Billions, and Millions of BP", () => {
    expect(formatSquadValue(1_250_000_000_000)).toBe("1.3T BP");
    expect(formatSquadValue(950_000_000_000)).toBe("950.0B BP");
    expect(formatSquadValue(500_000_000)).toBe("500.0M BP");
    expect(formatSquadValue(500000)).toBe("500,000 BP");
  });

  it("should format date correctly", () => {
    const testDate = new Date("2026-07-28T12:00:00Z");
    const formatted = formatDate(testDate);
    expect(formatted).toContain("2026");
  });
});
