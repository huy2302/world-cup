"use client";

import { Competitor, Match } from "@/types/tournament";
import MatchCard from "./MatchCard";

interface BracketNodeProps {
  match: Match;
  onSelectPlayer: (competitor: Competitor) => void;
  onSimulateMatch?: (matchId: string) => void;
}

export default function BracketNode({ match, onSelectPlayer, onSimulateMatch }: BracketNodeProps) {
  return (
    <div className="relative flex items-center">
      <MatchCard
        match={match}
        onSelectPlayer={onSelectPlayer}
        onSimulateMatch={onSimulateMatch}
      />
    </div>
  );
}
