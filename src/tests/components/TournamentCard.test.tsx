import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TournamentCard from "@/components/tournament/TournamentCard";

describe("TournamentCard Component Tests", () => {
  it("should render tournament title, status, format, prize pool and participant count", () => {
    render(
      <TournamentCard
        id="t1"
        title="FC Online World Masters"
        description="Premier championship event"
        format="SINGLE_ELIMINATION"
        status="IN_PROGRESS"
        maxPlayers={16}
        registeredCount={12}
        prizePool="$1,000"
        startDate={new Date()}
      />
    );

    expect(screen.getByText("FC Online World Masters")).toBeInTheDocument();
    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText("Single Elimination")).toBeInTheDocument();
    expect(screen.getByText("$1,000")).toBeInTheDocument();
    expect(screen.getByText("12 / 16")).toBeInTheDocument();
  });
});
