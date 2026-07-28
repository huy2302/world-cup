"use client";

import { useState } from "react";
import { Search, Trophy, Users, Play, RotateCcw, ChevronDown, Flame } from "lucide-react";
import RegisterButton from "../common/RegisterButton";
import { TournamentSize } from "@/types/tournament";

interface TopNavProps {
  tournamentTitle?: string;
  tournamentStatus?: string;
  currentRound?: string;
  tournamentSize: TournamentSize;
  onSelectSize: (size: TournamentSize) => void;
  onOpenRegister: () => void;
  onOpenPlayersDrawer: () => void;
  onSimulateNextRound?: () => void;
  onSearchPlayer?: (query: string) => void;
}

export default function TopNav({
  tournamentTitle = "FC ONLINE WORLD CHAMPIONS CUP 2026",
  tournamentStatus = "LIVE - FINALS",
  currentRound = "ROUND OF 16",
  tournamentSize,
  onSelectSize,
  onOpenRegister,
  onOpenPlayersDrawer,
  onSimulateNextRound,
  onSearchPlayer,
}: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchPlayer?.(e.target.value);
  };

  return (
    <header className="bg-[#050811]/90 backdrop-blur-md border-b border-[#141c2e] sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-2xl">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Tournament Title */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            <div className="w-full h-full bg-[#070b16] rounded-[14px] flex items-center justify-center text-cyan-300">
              <Trophy className="w-5 h-5 fill-cyan-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm lg:text-base text-white tracking-tight">
                {tournamentTitle}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
                {tournamentStatus}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Official FC Online Esports Championship • {currentRound}
            </span>
          </div>
        </div>

        {/* Center Controls: Bracket Size Toggle & Spectator Simulator */}
        <div className="hidden lg:flex items-center gap-4 bg-[#0d1424] border border-[#1b253b] p-1.5 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            BRACKET SIZE:
          </span>
          <div className="flex items-center gap-1">
            {([8, 16, 32, 64] as TournamentSize[]).map((size) => (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  tournamentSize === size
                    ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {size}P
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          {/* Advance Match Simulator Button */}
          <button
            onClick={onSimulateNextRound}
            className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5"
            title="Simulate scores & advance match winner up the bracket live!"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate Match</span>
          </button>
        </div>

        {/* Right Section: Search, Players Drawer, Register Primary CTA, User Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Search Player */}
          <div className="w-44 lg:w-60 relative hidden sm:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-[#0d1424] text-xs text-white placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-[#1b253b] focus:border-cyan-400 outline-none transition"
            />
          </div>

          {/* Registered Players Drawer Toggle Button */}
          <button
            onClick={onOpenPlayersDrawer}
            className="p-2.5 rounded-xl bg-[#0d1424] border border-[#1b253b] hover:border-cyan-400 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">ROSTER</span>
          </button>

          {/* Register Tournament Button (Primary CTA) */}
          <RegisterButton onClick={onOpenRegister} />

          {/* Spectator Profile Badge */}
          <div className="flex items-center gap-2.5 bg-[#0d1424] border border-[#1b253b] px-3 py-1.5 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#070b16] rounded-full flex items-center justify-center text-[10px] font-black text-cyan-300">
                PRO
              </div>
            </div>
            <div className="flex flex-col text-left leading-none hidden xl:flex">
              <span className="text-xs font-black text-white">Spectator</span>
              <span className="text-[9px] text-cyan-400 font-bold mt-0.5">FC Online VIP</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
