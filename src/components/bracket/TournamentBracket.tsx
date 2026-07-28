"use client";

import { useState, useRef, useEffect } from "react";
import { Competitor, Match, TournamentSize } from "@/types/tournament";
import MatchCard from "./MatchCard";
import { ZoomIn, ZoomOut, Maximize2, Move, Flame, Trophy, Play } from "lucide-react";

interface TournamentBracketProps {
  matches: Match[];
  tournamentSize: TournamentSize;
  onSelectPlayer: (competitor: Competitor) => void;
  onSimulateMatch: (matchId: string) => void;
}

export default function TournamentBracket({
  matches,
  tournamentSize,
  onSelectPlayer,
  onSimulateMatch,
}: TournamentBracketProps) {
  // Zoom & Pan Canvas State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Group matches by round index (1..N)
  const totalRounds = Math.log2(tournamentSize);
  const roundsMap: Record<number, Match[]> = {};

  for (let r = 1; r <= totalRounds; r++) {
    roundsMap[r] = matches.filter((m) => m.round === r);
  }

  // Pan Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if target is canvas background, not interactive match cards
    if ((e.target as HTMLElement).closest(".cyber-card") || (e.target as HTMLElement).closest("button")) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(1.8, z + 0.15));
  const handleZoomOut = () => setZoom((z) => Math.max(0.4, z - 0.15));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-[#050811] rounded-3xl border border-[#141d30] overflow-hidden shadow-2xl flex flex-col">
      
      {/* Top Floating Controls Bar: Zoom & Canvas Guide */}
      <div className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Left Indicator */}
        <div className="pointer-events-auto bg-[#0a101f]/90 backdrop-blur border border-[#1b2742] px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-xs font-black text-white uppercase tracking-wider">
            {tournamentSize}-PLAYER SINGLE ELIMINATION BRACKET
          </span>
        </div>

        {/* Right Zoom Control Toolbar */}
        <div className="pointer-events-auto bg-[#0a101f]/90 backdrop-blur border border-[#1b2742] p-1.5 rounded-2xl flex items-center gap-1 shadow-xl">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono font-bold text-cyan-400 px-2">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 transition"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Drag & Zoom Viewport Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full overflow-auto p-12 flex items-center justify-start cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          userSelect: "none",
          touchAction: "none"
        }}
      >
        {/* Transform Canvas Layer */}
        <div
          className="relative transition-transform duration-75 origin-top-left flex items-start gap-16 lg:gap-24 my-auto min-w-max p-8"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          {/* Loop Round Columns */}
          {Array.from({ length: totalRounds }).map((_, rIdx) => {
            const roundNumber = rIdx + 1;
            const roundMatches = roundsMap[roundNumber] || [];
            const roundTitle = roundMatches[0]?.roundName || `Round ${roundNumber}`;

            return (
              <div key={roundNumber} className="flex flex-col gap-6 items-center">
                {/* Round Header Label */}
                <div className="bg-[#0b1222] border border-[#1d2b48] px-5 py-2 rounded-2xl shadow-lg mb-4 text-center min-w-[200px]">
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
                    {roundTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {roundMatches.length} {roundMatches.length === 1 ? "Match" : "Matches"}
                  </span>
                </div>

                {/* Vertical Column of Match Nodes with Gap Spacing */}
                <div
                  className="flex flex-col justify-around h-full gap-8 lg:gap-12"
                >
                  {roundMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onSelectPlayer={onSelectPlayer}
                      onSimulateMatch={onSimulateMatch}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
