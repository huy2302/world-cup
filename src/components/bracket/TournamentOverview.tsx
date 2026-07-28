"use client";

import { Trophy, Clock, Shield } from "lucide-react";

interface TournamentOverviewProps {
  totalPlayers?: number;
  maxPlayers?: number;
  totalMatches?: number;
  completedMatches?: number;
  currentStage?: string;
  nextMatchTitle?: string;
  nextMatchTime?: string;
}

export default function TournamentOverview({
  totalPlayers = 16,
  maxPlayers = 16,
  totalMatches = 15,
  completedMatches = 15,
  currentStage = "Semi Finals",
  nextMatchTitle = "NovaX vs TheLegend",
  nextMatchTime = "May 28, 19:00",
}: TournamentOverviewProps) {
  const percent = Math.min(100, Math.round((completedMatches / totalMatches) * 100));

  return (
    <div className="w-80 bg-[#0c121e]/90 backdrop-blur-md p-6 rounded-3xl border border-[#1c273c] shadow-2xl flex flex-col justify-between relative overflow-hidden shrink-0 h-fit space-y-6">
      {/* 3D Metallic Glowing Trophy Graphic Watermark */}
      <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none filter drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]">
        <Trophy className="w-64 h-64 text-blue-500" />
      </div>

      <div className="space-y-6 relative z-10">
        <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">
          TOURNAMENT OVERVIEW
        </h4>

        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Total Players</span>
            <span className="font-mono font-black text-white">{totalPlayers} <span className="text-slate-500 font-normal">/{maxPlayers}</span></span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Matches Played</span>
            <span className="font-mono font-black text-white">{completedMatches} <span className="text-slate-500 font-normal">/{totalMatches}</span></span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Completed</span>
              <span className="font-mono font-black text-purple-400">{percent}%</span>
            </div>
            <div className="w-full bg-[#182336] h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Stage */}
        <div className="pt-4 border-t border-[#1c273c] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-medium">Current Stage</span>
            <span className="text-sm font-black text-white">{currentStage}</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Shield className="w-4 h-4" />
          </div>
        </div>

        {/* Next Match Box */}
        <div className="bg-[#121926] p-3.5 rounded-2xl border border-[#1c273c] space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Next Match</span>
          <span className="text-xs font-black text-white block">{nextMatchTitle}</span>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono pt-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{nextMatchTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
