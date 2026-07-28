import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlayerDetailModal, { FootballPlayerDetail } from "@/components/squad/PlayerDetailModal";

const samplePlayer: FootballPlayerDetail = {
  id: "p1",
  name: "Cristiano Ronaldo",
  position: "ST",
  overall: 118,
  season: "ICON",
  cardLevel: 5,
  nationality: "Portugal",
  club: "Real Madrid",
  portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300",
  salary: 28,
  traits: "Finesse Shot, Power Header, Speed Dribbler",
  preferredFoot: "Right / Left 5-5",
  weakFoot: 5,
  skillMoves: 5,
  height: "187 cm",
  weight: "83 kg",
};

describe("PlayerDetailModal Component Tests", () => {
  it("should render player portrait, overall, season badge, traits, and physical attributes", () => {
    const handleClose = vi.fn();
    render(<PlayerDetailModal player={samplePlayer} onClose={handleClose} />);

    expect(screen.getByText("Cristiano Ronaldo")).toBeInTheDocument();
    expect(screen.getByText("118")).toBeInTheDocument();
    expect(screen.getByText("ICON")).toBeInTheDocument();
    expect(screen.getByText("+5")).toBeInTheDocument();
    expect(screen.getByText("Salary: 28 BP")).toBeInTheDocument();
    expect(screen.getByText("187 cm")).toBeInTheDocument();
    expect(screen.getByText("83 kg")).toBeInTheDocument();
    expect(screen.getByText("Finesse Shot")).toBeInTheDocument();
    expect(screen.getByText("Power Header")).toBeInTheDocument();
  });
});
