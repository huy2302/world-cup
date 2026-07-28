"use client";

import { Sparkles } from "lucide-react";

interface TournamentStatsProps {
  totalMatches?: number;
  completedMatches?: number;
  totalPlayers?: number;
}

export default function TournamentStats({
  totalMatches = 15,
  completedMatches = 12,
  totalPlayers = 16,
}: TournamentStatsProps) {
  const percent = Math.min(100, Math.round((completedMatches / totalMatches) * 100));
  const remaining = totalMatches - completedMatches;

  return (
    <div className="bg-[#141b27]/90 backdrop-blur-md p-5 rounded-2xl border border-[#202a3d] w-64 shadow-2xl relative overflow-hidden">
      {/* Background Diamond/Star Watermark */}
      <Sparkles className="absolute -bottom-4 -right-4 w-28 h-28 text-cyan-500/10 pointer-events-none" />

      <h4 className="text-sm font-black text-white tracking-wide mb-4">
        Tournament Statistics
      </h4>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-slate-400">
          <span className="font-medium">Matches Played:</span>
          <span className="font-mono font-black text-white">{completedMatches} / {totalMatches}</span>
        </div>

        <div className="flex justify-between items-center text-slate-400">
          <span className="font-medium">Players Active:</span>
          <span className="font-mono font-black text-white">{totalPlayers}</span>
        </div>

        <div className="flex justify-between items-center text-slate-400">
          <span className="font-medium">Completed:</span>
          <span className="font-mono font-black text-cyan-400">{percent}%</span>
        </div>

        <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-[#202a3d]">
          <span className="font-medium">Remaining:</span>
          <span className="font-mono font-black text-white">{remaining} Matches</span>
        </div>
      </div>
    </div>
  );
}
