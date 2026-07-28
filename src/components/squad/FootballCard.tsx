"use client";

import { FootballPlayer } from "@/types/tournament";
import { Sparkles, Shield, Flag } from "lucide-react";

interface FootballCardProps {
  player: FootballPlayer;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function FootballCard({ player, size = "md", onClick }: FootballCardProps) {
  const getSeasonStyle = (season: string) => {
    switch (season) {
      case "ICON":
        return "bg-gradient-to-b from-sky-400 via-blue-700 to-slate-900 border-sky-400 text-sky-200";
      case "24TOTS":
        return "bg-gradient-to-b from-purple-500 via-indigo-800 to-slate-950 border-purple-400 text-purple-200";
      case "World Legend":
        return "bg-gradient-to-b from-amber-400 via-yellow-700 to-slate-950 border-amber-300 text-amber-100";
      default:
        return "bg-gradient-to-b from-cyan-500 via-blue-900 to-slate-950 border-cyan-400 text-cyan-200";
    }
  };

  const isGoldLevel = player.cardLevel >= 8;
  const isSilverLevel = player.cardLevel >= 5 && player.cardLevel < 8;

  // Dimensions based on size
  const cardDimensions = {
    sm: "w-24 h-36 text-[10px]",
    md: "w-28 h-44 sm:w-32 sm:h-48 text-xs",
    lg: "w-40 h-60 sm:w-48 sm:h-72 text-sm"
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105 select-none ${cardDimensions}`}
    >
      {/* Glow aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-md opacity-30 group-hover:opacity-80 transition duration-500"></div>

      {/* Card Outer Shell */}
      <div className={`relative w-full h-full rounded-xl p-1.5 flex flex-col justify-between overflow-hidden border shadow-xl fco-card-sheen ${getSeasonStyle(player.season)}`}>

        {/* Top Header Row: OVR, Position, Season, Card Level */}
        <div className="flex items-start justify-between z-10">
          <div className="flex flex-col items-center leading-none">
            <span className="font-black text-white text-base sm:text-lg tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {player.overall}
            </span>
            <span className="font-bold text-[10px] sm:text-xs text-cyan-300 uppercase tracking-widest mt-0.5">
              {player.position}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            {/* Season Tag */}
            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-black/60 border border-white/20 text-white backdrop-blur">
              {player.season}
            </span>
            
            {/* Card Level (+5 / +8) */}
            <span className={`px-1.5 py-0.2 rounded font-black text-[9px] border shadow-sm ${
              isGoldLevel 
                ? "bg-gradient-to-r from-amber-300 to-yellow-500 text-black border-amber-200" 
                : isSilverLevel
                ? "bg-gradient-to-r from-slate-200 to-slate-400 text-black border-slate-100"
                : "bg-slate-800 text-white border-slate-700"
            }`}>
              +{player.cardLevel}
            </span>
          </div>
        </div>

        {/* Player Portrait & Club/Nation Badges */}
        <div className="relative flex-1 my-1 flex items-center justify-center">
          <img
            src={player.portrait}
            alt={player.name}
            className="w-full h-full object-cover object-top rounded border border-white/10 group-hover:scale-110 transition-transform duration-500"
          />

          {/* Club & Flag Badges floating bottom right */}
          <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/70 px-1 py-0.5 rounded border border-white/20 backdrop-blur">
            <img src={player.nationalityFlag} alt={player.nationality} className="w-3 h-2 object-cover rounded-sm" />
            <img src={player.clubLogo} alt={player.club} className="w-3 h-3 object-contain" />
          </div>
        </div>

        {/* Bottom Banner: Player Name */}
        <div className="z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-2 pb-0.5 px-1 rounded-b-lg text-center">
          <h4 className="font-extrabold text-white truncate tracking-tight text-[11px] sm:text-xs drop-shadow">
            {player.shortName}
          </h4>
        </div>
      </div>
    </div>
  );
}
