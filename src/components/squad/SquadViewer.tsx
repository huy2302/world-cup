"use client";

import { useState } from "react";
import { Shield, Zap, User as UserIcon, Settings, ChevronRight } from "lucide-react";
import PlayerDetailModal, { FootballPlayerDetail } from "./PlayerDetailModal";

interface SquadViewerProps {
  squad: {
    id: string;
    club: string;
    formation: string;
    manager: string;
    totalSalary: number;
    maxSalary: number;
    squadPlayers: Array<{
      id: string;
      pitchPosition: string;
      cardLevel: number;
      footballPlayer: FootballPlayerDetail;
    }>;
  };
}

export default function SquadViewer({ squad }: SquadViewerProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<FootballPlayerDetail | null>(null);

  // Position coordinates map on 2D tactical pitch (percentage top, left)
  const positionCoords: Record<string, { top: string; left: string }> = {
    ST: { top: "12%", left: "50%" },
    LW: { top: "24%", left: "20%" },
    CAM: { top: "28%", left: "50%" },
    RW: { top: "24%", left: "80%" },
    CM: { top: "45%", left: "50%" },
    LDM: { top: "48%", left: "32%" },
    RDM: { top: "48%", left: "68%" },
    LB: { top: "72%", left: "18%" },
    LCB: { top: "75%", left: "38%" },
    RCB: { top: "75%", left: "62%" },
    RB: { top: "72%", left: "82%" },
    GK: { top: "90%", left: "50%" },
  };

  return (
    <div className="space-y-6">
      {/* Squad Header Info */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">
              {squad.formation}
            </span>
            <h2 className="text-xl font-bold text-white">{squad.club} Squad</h2>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5 text-slate-500" />
            Manager: <span className="text-slate-200 font-semibold">{squad.manager}</span>
          </p>
        </div>

        {/* Salary Cap Counter */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <Zap className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Salary Limit</span>
            <span className="text-sm font-extrabold font-mono text-white">
              <span className={squad.totalSalary > squad.maxSalary ? "text-red-400" : "text-emerald-400"}>
                {squad.totalSalary}
              </span>{" "}
              / {squad.maxSalary} BP
            </span>
          </div>
        </div>
      </div>

      {/* FC Online Tactical Field Pitch */}
      <div className="relative w-full h-[580px] bg-emerald-950/40 rounded-3xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl p-4">
        {/* Pitch Lines Background */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          {/* Outer Border Line */}
          <div className="absolute inset-4 border-2 border-emerald-400 rounded-2xl"></div>
          {/* Halfway Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-emerald-400 -translate-y-1/2"></div>
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          {/* Top Penalty Box */}
          <div className="absolute top-4 left-1/2 w-72 h-32 border-2 border-emerald-400 border-t-0 -translate-x-1/2"></div>
          {/* Bottom Penalty Box */}
          <div className="absolute bottom-4 left-1/2 w-72 h-32 border-2 border-emerald-400 border-b-0 -translate-x-1/2"></div>
        </div>

        {/* Players on Pitch */}
        {squad.squadPlayers.map((item) => {
          const coords = positionCoords[item.pitchPosition] || { top: "50%", left: "50%" };
          const p = item.footballPlayer;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ top: coords.top, left: coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            >
              {/* FC Online Player Card Slot */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-slate-950/90 border border-cyan-400/40 group-hover:border-cyan-400 group-hover:scale-110 shadow-lg shadow-black/50 transition-all p-1 relative flex flex-col justify-between overflow-hidden">
                  {/* Season Tag */}
                  <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-black bg-amber-400 text-slate-950">
                    {p.season}
                  </span>

                  {/* Player Image */}
                  <img
                    src={p.portrait}
                    alt={p.name}
                    className="w-full h-12 sm:h-14 object-cover rounded-t-lg mt-2"
                  />

                  {/* Rating & Position */}
                  <div className="bg-slate-900/90 p-0.5 text-center flex items-center justify-between text-[10px] font-mono px-1">
                    <span className="text-cyan-400 font-bold">{item.pitchPosition}</span>
                    <span className="text-white font-extrabold">{p.overall}</span>
                  </div>
                </div>

                {/* Player Name Pill */}
                <div className="mt-1 bg-slate-950/90 px-2 py-0.5 rounded-full border border-slate-800 text-[10px] font-bold text-white truncate max-w-[90px] text-center shadow group-hover:text-cyan-400 transition-colors">
                  {p.name.split(" ").pop()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Player Detail Modal Popup */}
      <PlayerDetailModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  );
}
