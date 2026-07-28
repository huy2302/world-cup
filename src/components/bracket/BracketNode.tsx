"use client";

import { motion } from "framer-motion";
import PlayerNode from "./PlayerNode";

export interface MatchNodeData {
  id: string;
  round: number;
  matchNumber: number;
  bracketType: string;
  homeScore: number;
  awayScore: number;
  status: string;
  homePlayer?: any;
  awayPlayer?: any;
  winner?: any;
}

interface BracketNodeProps {
  match: MatchNodeData;
  onSelectPlayer?: (player: any) => void;
}

export default function BracketNode({ match, onSelectPlayer }: BracketNodeProps) {
  const isCompleted = match.status === "COMPLETED";
  const hasWinner = isCompleted && match.winner;
  const isGrandFinal = match.round === 4;

  const homeSeed = match.matchNumber * 2 - 1;
  const awaySeed = match.matchNumber * 2;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={`w-52 sm:w-56 p-1.5 rounded-xl transition-all relative flex flex-col gap-1 ${
        hasWinner || isGrandFinal
          ? "bg-[#101726]/95 border-2 border-purple-500/90 shadow-[0_0_20px_rgba(139,92,246,0.45)]"
          : "bg-[#101726]/90 border border-[#1e2a3f] hover:border-slate-700"
      }`}
    >
      {/* Home Player */}
      <PlayerNode
        seed={homeSeed}
        player={match.homePlayer}
        score={match.homeScore}
        isWinner={match.winner?.id === match.homePlayer?.id && isCompleted}
        onClick={() => match.homePlayer && onSelectPlayer?.(match.homePlayer)}
      />

      {/* Away Player */}
      <PlayerNode
        seed={awaySeed}
        player={match.awayPlayer}
        score={match.awayScore}
        isWinner={match.winner?.id === match.awayPlayer?.id && isCompleted}
        onClick={() => match.awayPlayer && onSelectPlayer?.(match.awayPlayer)}
      />
    </motion.div>
  );
}
