"use client";

import { FootballPlayer, FormationType, TacticalSquad } from "@/types/tournament";

interface FootballPitchProps {
  squad: TacticalSquad;
  onSelectPlayer?: (player: FootballPlayer) => void;
  compact?: boolean;
  heightClass?: string;
}

// 2D Tactical Field Coordinates (%) for each formation - Optimized spacing to prevent overlap
const FORMATION_COORDINATES: Record<FormationType, { slotPosition: string; top: number; left: number }[]> = {
  "4-2-3-1": [
    { slotPosition: "ST", top: 9, left: 50 },
    { slotPosition: "LAM", top: 25, left: 20 },
    { slotPosition: "CAM", top: 25, left: 50 },
    { slotPosition: "RAM", top: 25, left: 80 },
    { slotPosition: "LCDM", top: 44, left: 34 },
    { slotPosition: "RCDM", top: 44, left: 66 },
    { slotPosition: "LB", top: 65, left: 15 },
    { slotPosition: "LCB", top: 68, left: 38 },
    { slotPosition: "RCB", top: 68, left: 62 },
    { slotPosition: "RB", top: 65, left: 85 },
    { slotPosition: "GK", top: 85, left: 50 },
  ],
  "4-3-3": [
    { slotPosition: "LW", top: 11, left: 20 },
    { slotPosition: "ST", top: 9, left: 50 },
    { slotPosition: "RW", top: 11, left: 80 },
    { slotPosition: "LCM", top: 38, left: 26 },
    { slotPosition: "CM", top: 42, left: 50 },
    { slotPosition: "RCM", top: 38, left: 74 },
    { slotPosition: "LB", top: 65, left: 15 },
    { slotPosition: "LCB", top: 68, left: 38 },
    { slotPosition: "RCB", top: 68, left: 62 },
    { slotPosition: "RB", top: 65, left: 85 },
    { slotPosition: "GK", top: 85, left: 50 },
  ],
  "4-1-2-1-2": [
    { slotPosition: "LST", top: 9, left: 35 },
    { slotPosition: "RST", top: 9, left: 65 },
    { slotPosition: "CAM", top: 25, left: 50 },
    { slotPosition: "LM", top: 42, left: 20 },
    { slotPosition: "RM", top: 42, left: 80 },
    { slotPosition: "CDM", top: 52, left: 50 },
    { slotPosition: "LB", top: 65, left: 15 },
    { slotPosition: "LCB", top: 68, left: 38 },
    { slotPosition: "RCB", top: 68, left: 62 },
    { slotPosition: "RB", top: 65, left: 85 },
    { slotPosition: "GK", top: 85, left: 50 },
  ],
  "3-5-2": [
    { slotPosition: "LST", top: 9, left: 35 },
    { slotPosition: "RST", top: 9, left: 65 },
    { slotPosition: "CAM", top: 25, left: 50 },
    { slotPosition: "LM", top: 42, left: 15 },
    { slotPosition: "LCDM", top: 46, left: 36 },
    { slotPosition: "RCDM", top: 46, left: 64 },
    { slotPosition: "RM", top: 42, left: 85 },
    { slotPosition: "LCB", top: 68, left: 25 },
    { slotPosition: "CB", top: 70, left: 50 },
    { slotPosition: "RCB", top: 68, left: 75 },
    { slotPosition: "GK", top: 85, left: 50 },
  ],
  "5-2-1-2": [
    { slotPosition: "LST", top: 9, left: 35 },
    { slotPosition: "RST", top: 9, left: 65 },
    { slotPosition: "CAM", top: 25, left: 50 },
    { slotPosition: "LCM", top: 42, left: 36 },
    { slotPosition: "RCM", top: 42, left: 64 },
    { slotPosition: "LWB", top: 60, left: 12 },
    { slotPosition: "LCB", top: 68, left: 30 },
    { slotPosition: "CB", top: 70, left: 50 },
    { slotPosition: "RCB", top: 68, left: 70 },
    { slotPosition: "RWB", top: 60, left: 88 },
    { slotPosition: "GK", top: 85, left: 50 },
  ]
};

export default function FootballPitch({ squad, onSelectPlayer, compact = true, heightClass }: FootballPitchProps) {
  const coords = FORMATION_COORDINATES[squad.formation] || FORMATION_COORDINATES["4-2-3-1"];

  const containerHeight = heightClass || (compact ? "h-[420px] sm:h-[460px]" : "h-[500px] sm:h-[560px]");

  const getPositionColor = (pos: string) => {
    if (["ST", "CF", "LW", "RW", "LST", "RST"].includes(pos)) return "text-amber-400 border-amber-500/40 bg-amber-950/80";
    if (["CAM", "CM", "LM", "RM", "LCM", "RCM", "LAM", "RAM"].includes(pos)) return "text-cyan-300 border-cyan-500/40 bg-cyan-950/80";
    if (["CDM", "LCDM", "RCDM"].includes(pos)) return "text-purple-300 border-purple-500/40 bg-purple-950/80";
    if (["GK"].includes(pos)) return "text-yellow-300 border-yellow-500/40 bg-yellow-950/80";
    return "text-emerald-300 border-emerald-500/40 bg-emerald-950/80";
  };

  return (
    <div className={`relative w-full max-w-4xl ${containerHeight} mx-auto pitch-bg rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl flex flex-col justify-between p-3 select-none`}>
      {/* 2D Pitch Line Markings (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" stroke="#00f0ff" strokeWidth="1.5" fill="none">
        {/* Outer Boundary */}
        <rect x="2%" y="2%" width="96%" height="96%" rx="16" />
        
        {/* Center Line & Circle */}
        <line x1="2%" y1="50%" x2="98%" y2="50%" strokeDasharray="5 3" />
        <circle cx="50%" cy="50%" r="60" />
        <circle cx="50%" cy="50%" r="3" fill="#00f0ff" />

        {/* Top Penalty Box (Opponent) */}
        <rect x="26%" y="2%" width="48%" height="16%" />
        <rect x="36%" y="2%" width="28%" height="6%" />
        <circle cx="50%" cy="12%" r="2.5" fill="#00f0ff" />

        {/* Bottom Penalty Box (Home) */}
        <rect x="26%" y="82%" width="48%" height="16%" />
        <rect x="36%" y="92%" width="28%" height="6%" />
        <circle cx="50%" cy="88%" r="2.5" fill="#00f0ff" />
      </svg>

      {/* Render 11 Players on Pitch Coordinates - Clean Minimal Chip (No bulky card background!) */}
      {coords.map((c, index) => {
        const item = squad.startingXI[index] || squad.startingXI[0];
        const player = item?.player;

        if (!player) return null;

        return (
          <div
            key={`${player.id}-${index}`}
            onClick={() => onSelectPlayer?.(player)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-115 cursor-pointer z-10 group flex flex-col items-center"
            style={{ top: `${c.top}%`, left: `${c.left}%` }}
          >
            {/* Top Pill Badge: OVR + Position + Level */}
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] font-black leading-none shadow-md backdrop-blur-md ${getPositionColor(player.position)}`}>
              <span className="text-white font-black">{player.overall}</span>
              <span>{player.position}</span>
              <span className="px-1 py-0.2 rounded bg-black/60 text-[8px] text-amber-300 font-extrabold border border-amber-400/40">
                +{player.cardLevel}
              </span>
            </div>

            {/* Compact Player Portrait Avatar */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-cyan-400/80 bg-slate-900 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-all my-0.5 shadow-lg">
              <img src={player.portrait} alt={player.name} className="w-full h-full object-cover object-top" />
            </div>

            {/* Bottom Player Name Label (Clean minimal text pill - No heavy card background!) */}
            <div className="bg-black/85 backdrop-blur border border-slate-700/80 group-hover:border-cyan-400 px-1.5 py-0.5 rounded-md text-[9.5px] font-extrabold text-slate-100 group-hover:text-cyan-300 max-w-[85px] truncate text-center shadow-md transition-colors">
              {player.shortName}
            </div>
          </div>
        );
      })}

      {/* Substitutes Bench Bar */}
      <div className="absolute bottom-2 left-3 right-3 z-20 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">
          Substitutes Bench ({squad.substitutes.length})
        </span>

        <div className="flex items-center gap-2">
          {squad.substitutes.map((subPlayer) => (
            <div
              key={subPlayer.id}
              onClick={() => onSelectPlayer?.(subPlayer)}
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 px-2 py-0.5 rounded-lg cursor-pointer transition"
            >
              <img src={subPlayer.portrait} alt={subPlayer.name} className="w-5 h-5 rounded-full object-cover" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] font-bold text-white truncate max-w-[55px]">{subPlayer.shortName}</span>
                <span className="text-[8px] text-amber-400 font-black">{subPlayer.overall} {subPlayer.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
