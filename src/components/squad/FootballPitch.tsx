"use client";

import { FootballPlayer, FormationType, TacticalSquad } from "@/types/tournament";
import FootballCard from "./FootballCard";

interface FootballPitchProps {
  squad: TacticalSquad;
  onSelectPlayer?: (player: FootballPlayer) => void;
}

// 2D Tactical Field Coordinates (%) for each formation
const FORMATION_COORDINATES: Record<FormationType, { slotPosition: string; top: number; left: number }[]> = {
  "4-2-3-1": [
    { slotPosition: "ST", top: 12, left: 50 },
    { slotPosition: "LAM", top: 28, left: 20 },
    { slotPosition: "CAM", top: 28, left: 50 },
    { slotPosition: "RAM", top: 28, left: 80 },
    { slotPosition: "LCDM", top: 48, left: 35 },
    { slotPosition: "RCDM", top: 48, left: 65 },
    { slotPosition: "LB", top: 68, left: 15 },
    { slotPosition: "LCB", top: 72, left: 38 },
    { slotPosition: "RCB", top: 72, left: 62 },
    { slotPosition: "RB", top: 68, left: 85 },
    { slotPosition: "GK", top: 88, left: 50 },
  ],
  "4-3-3": [
    { slotPosition: "LW", top: 15, left: 20 },
    { slotPosition: "ST", top: 12, left: 50 },
    { slotPosition: "RW", top: 15, left: 80 },
    { slotPosition: "LCM", top: 40, left: 28 },
    { slotPosition: "CM", top: 44, left: 50 },
    { slotPosition: "RCM", top: 40, left: 72 },
    { slotPosition: "LB", top: 68, left: 15 },
    { slotPosition: "LCB", top: 72, left: 38 },
    { slotPosition: "RCB", top: 72, left: 62 },
    { slotPosition: "RB", top: 68, left: 85 },
    { slotPosition: "GK", top: 88, left: 50 },
  ],
  "4-1-2-1-2": [
    { slotPosition: "LST", top: 12, left: 35 },
    { slotPosition: "RST", top: 12, left: 65 },
    { slotPosition: "CAM", top: 28, left: 50 },
    { slotPosition: "LM", top: 42, left: 20 },
    { slotPosition: "RM", top: 42, left: 80 },
    { slotPosition: "CDM", top: 54, left: 50 },
    { slotPosition: "LB", top: 68, left: 15 },
    { slotPosition: "LCB", top: 72, left: 38 },
    { slotPosition: "RCB", top: 72, left: 62 },
    { slotPosition: "RB", top: 68, left: 85 },
    { slotPosition: "GK", top: 88, left: 50 },
  ],
  "3-5-2": [
    { slotPosition: "LST", top: 12, left: 35 },
    { slotPosition: "RST", top: 12, left: 65 },
    { slotPosition: "CAM", top: 28, left: 50 },
    { slotPosition: "LM", top: 45, left: 15 },
    { slotPosition: "LCDM", top: 48, left: 38 },
    { slotPosition: "RCDM", top: 48, left: 62 },
    { slotPosition: "RM", top: 45, left: 85 },
    { slotPosition: "LCB", top: 72, left: 25 },
    { slotPosition: "CB", top: 74, left: 50 },
    { slotPosition: "RCB", top: 72, left: 75 },
    { slotPosition: "GK", top: 88, left: 50 },
  ],
  "5-2-1-2": [
    { slotPosition: "LST", top: 12, left: 35 },
    { slotPosition: "RST", top: 12, left: 65 },
    { slotPosition: "CAM", top: 28, left: 50 },
    { slotPosition: "LCM", top: 45, left: 38 },
    { slotPosition: "RCM", top: 45, left: 62 },
    { slotPosition: "LWB", top: 65, left: 12 },
    { slotPosition: "LCB", top: 72, left: 30 },
    { slotPosition: "CB", top: 74, left: 50 },
    { slotPosition: "RCB", top: 72, left: 70 },
    { slotPosition: "RWB", top: 65, left: 88 },
    { slotPosition: "GK", top: 88, left: 50 },
  ]
};

export default function FootballPitch({ squad, onSelectPlayer }: FootballPitchProps) {
  const coords = FORMATION_COORDINATES[squad.formation] || FORMATION_COORDINATES["4-2-3-1"];

  return (
    <div className="relative w-full max-w-4xl h-[560px] sm:h-[640px] mx-auto pitch-bg rounded-3xl border-2 border-emerald-500/40 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
      {/* 2D Pitch Line Markings (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" stroke="#00f0ff" strokeWidth="2" fill="none">
        {/* Outer Boundary */}
        <rect x="2%" y="2%" width="96%" height="96%" rx="16" />
        
        {/* Center Line & Circle */}
        <line x1="2%" y1="50%" x2="98%" y2="50%" strokeDasharray="6 4" />
        <circle cx="50%" cy="50%" r="70" />
        <circle cx="50%" cy="50%" r="4" fill="#00f0ff" />

        {/* Top Penalty Box (Opponent) */}
        <rect x="25%" y="2%" width="50%" height="18%" />
        <rect x="36%" y="2%" width="28%" height="7%" />
        <circle cx="50%" cy="13%" r="3" fill="#00f0ff" />

        {/* Bottom Penalty Box (Home) */}
        <rect x="25%" y="80%" width="50%" height="18%" />
        <rect x="36%" y="91%" width="28%" height="7%" />
        <circle cx="50%" cy="87%" r="3" fill="#00f0ff" />
      </svg>

      {/* Render 11 Players on Pitch Coordinates */}
      {coords.map((c, index) => {
        const item = squad.startingXI[index] || squad.startingXI[0];
        const player = item?.player;

        if (!player) return null;

        return (
          <div
            key={`${player.id}-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ top: `${c.top}%`, left: `${c.left}%` }}
          >
            <FootballCard
              player={player}
              size="sm"
              onClick={() => onSelectPlayer?.(player)}
            />
          </div>
        );
      })}

      {/* Substitutes Bench Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-20 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-xl px-4 py-2 flex items-center justify-between">
        <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider">
          Substitutes Bench ({squad.substitutes.length})
        </span>

        <div className="flex items-center gap-3">
          {squad.substitutes.map((subPlayer) => (
            <div
              key={subPlayer.id}
              onClick={() => onSelectPlayer?.(subPlayer)}
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 px-2.5 py-1 rounded-lg cursor-pointer transition"
            >
              <img src={subPlayer.portrait} alt={subPlayer.name} className="w-6 h-6 rounded object-cover" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] font-bold text-white">{subPlayer.shortName}</span>
                <span className="text-[9px] text-amber-400 font-extrabold">{subPlayer.overall} {subPlayer.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
