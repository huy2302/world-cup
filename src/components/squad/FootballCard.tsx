"use client";

import { motion } from "framer-motion";

export interface FootballCardProps {
  name: string;
  position: string;
  overall: number;
  season: string;
  cardLevel: number; // +1 ~ +8
  portrait: string;
  club?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FootballCard({
  name,
  position,
  overall,
  season,
  cardLevel,
  portrait,
  isSelected,
  onClick,
}: FootballCardProps) {
  const isGold = cardLevel >= 8;

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`w-16 h-24 sm:w-20 sm:h-28 rounded-xl p-1 cursor-pointer relative flex flex-col justify-between border shadow-2xl transition-all duration-200 ${
        isSelected
          ? "border-[#00f0ff] ring-2 ring-[#00f0ff] shadow-[0_0_15px_#00f0ff]"
          : "border-amber-400/80 hover:border-amber-300"
      } bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 text-slate-950 group`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col leading-none">
          <span className="text-xs sm:text-sm font-black text-slate-950 font-mono tracking-tighter drop-shadow-xs">
            {overall}
          </span>
          <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-950">
            {position}
          </span>
        </div>

        {/* Season Badge */}
        <span className="px-1 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase bg-slate-950 text-amber-300 shadow-xs">
          {season}
        </span>
      </div>

      {/* Portrait Center */}
      <div className="relative flex-1 flex items-center justify-center my-0.5">
        <img
          src={portrait}
          alt={name}
          className="w-full h-11 sm:h-14 object-cover object-top rounded-md filter drop-shadow-md group-hover:brightness-110 transition"
        />
        {/* Card Level Badge */}
        <div className="absolute -bottom-1 -right-0.5">
          <span className="px-1 py-0.2 rounded text-[8px] font-mono font-black bg-slate-950 text-amber-300 border border-amber-400 shadow-xs">
            +{cardLevel}
          </span>
        </div>
      </div>

      {/* Footer Name Banner */}
      <div className="bg-slate-950/90 py-0.5 px-0.5 rounded text-center border border-amber-300/30 z-10">
        <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-200 truncate block">
          {name.split(" ").pop()}
        </span>
      </div>
    </motion.div>
  );
}
