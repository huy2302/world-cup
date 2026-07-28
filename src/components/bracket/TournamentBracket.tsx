"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Maximize2, RotateCcw } from "lucide-react";
import BracketNode, { MatchNodeData } from "./BracketNode";
import PlayerDialog from "../squad/PlayerDialog";
import TournamentOverview from "./TournamentOverview";

interface TournamentBracketProps {
  tournamentTitle?: string;
  format?: string;
  matches: MatchNodeData[];
  isAdmin?: boolean;
}

export default function TournamentBracket({
  tournamentTitle,
  format = "SINGLE_ELIMINATION",
  matches,
}: TournamentBracketProps) {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoomScale(1);

  // Group matches by round
  const winnersMatches = matches.filter((m) => m.bracketType === "WINNERS" || m.bracketType === "SINGLE");
  const rounds = Array.from(new Set(winnersMatches.map((m) => m.round))).sort((a, b) => a - b);

  const completedCount = matches.filter((m) => m.status === "COMPLETED").length;
  const totalMatchesCount = matches.length || 15;

  const getRoundInfo = (rIndex: number, totalRounds: number, matchCount: number) => {
    if (rIndex === totalRounds) return { title: "GRAND FINAL", date: "May 30" };
    if (rIndex === totalRounds - 1) return { title: "SEMI FINALS", date: "May 28 – May 29" };
    if (rIndex === totalRounds - 2) return { title: "QUARTER FINALS", date: "May 24 – May 27" };
    return { title: `ROUND OF ${matchCount * 2}`, date: "May 20 – May 23" };
  };

  const handleSelectPlayer = (player: any) => {
    setSelectedUser(player);
    setIsPlayerDialogOpen(true);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full h-[calc(100vh-100px)] min-h-[640px] p-6">
      {/* Center Canvas Bracket Container */}
      <div className="relative flex-1 rounded-3xl border border-[#161f30] overflow-hidden flex flex-col justify-between bg-[#060911]">
        {/* Zoom Controls Overlay (Bottom Right of Bracket Canvas) */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-1.5 bg-[#121926]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#1d2638] shadow-2xl">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2334] transition"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2334] transition"
            title="Fullscreen / Reset"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2334] transition"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2334] transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Pan / Drag Canvas Window */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-auto cursor-grab active:cursor-grabbing p-12 flex justify-center items-center select-none"
        >
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.05}
            animate={{ scale: zoomScale }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex gap-16 items-stretch justify-center py-6 min-w-max"
          >
            {rounds.map((rIndex) => {
              const roundMatches = winnersMatches.filter((m) => m.round === rIndex);
              const info = getRoundInfo(rIndex, rounds.length, roundMatches.length);

              return (
                <div key={rIndex} className="flex flex-col justify-between items-center gap-6">
                  {/* Round Header & Date */}
                  <div className="text-center">
                    <span className="text-xs font-black tracking-widest text-slate-300 uppercase block">
                      {info.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      {info.date}
                    </span>
                  </div>

                  {/* Match Cards Container */}
                  <div className="flex flex-col justify-around flex-1 gap-10">
                    {roundMatches.map((match) => (
                      <BracketNode
                        key={match.id}
                        match={match}
                        onSelectPlayer={handleSelectPlayer}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Right Sidebar Tournament Overview */}
      <div className="hidden xl:block">
        <TournamentOverview
          totalMatches={totalMatchesCount}
          completedMatches={completedCount}
          totalPlayers={16}
        />
      </div>

      {/* Large Player Profile & Tactical Pitch Dialog */}
      <PlayerDialog
        user={selectedUser}
        isOpen={isPlayerDialogOpen}
        onClose={() => setIsPlayerDialogOpen(false)}
      />
    </div>
  );
}
