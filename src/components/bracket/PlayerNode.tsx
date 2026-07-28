"use client";

import { motion } from "framer-motion";

interface PlayerNodeProps {
  seed?: number;
  player?: {
    id: string;
    username: string;
    ign: string;
    favoriteClub?: string | null;
    avatarUrl?: string | null;
  } | null;
  score: number;
  isWinner: boolean;
  onClick?: () => void;
}

export default function PlayerNode({ seed = 1, player, score, isWinner, onClick }: PlayerNodeProps) {
  // Emblem shield graphics lookup
  const getEmblem = (name?: string | null) => {
    const key = (name || "NovaX").toLowerCase();
    if (key.includes("nova") || key.includes("huy")) return "https://api.iconify.design/game-icons:shield-impact.svg?color=%23a855f7";
    if (key.includes("dark")) return "https://api.iconify.design/game-icons:evil-book.svg?color=%2364748b";
    if (key.includes("phoenix")) return "https://api.iconify.design/game-icons:fire-shield.svg?color=%23f97316";
    if (key.includes("frost")) return "https://api.iconify.design/game-icons:snowflake-1.svg?color=%2338bdf8";
    if (key.includes("storm") || key.includes("elite")) return "https://api.iconify.design/game-icons:lightning-shield.svg?color=%23eab308";
    if (key.includes("beast")) return "https://api.iconify.design/game-icons:bear-head.svg?color=%2322c55e";
    if (key.includes("legend") || key.includes("messi")) return "https://api.iconify.design/game-icons:crown-coin.svg?color=%23eab308";
    if (key.includes("night")) return "https://api.iconify.design/game-icons:crescent-blade.svg?color=%23818cf8";
    if (key.includes("galaxy")) return "https://api.iconify.design/game-icons:galaxy.svg?color=%23a855f7";
    if (key.includes("sky") || key.includes("blue")) return "https://api.iconify.design/game-icons:winged-emblem.svg?color=%2306b6d4";
    return "https://api.iconify.design/game-icons:shield-impact.svg?color=%23a855f7";
  };

  const emblem = getEmblem(player?.ign || player?.username);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-between p-1.5 px-2.5 rounded-lg cursor-pointer transition-all ${
        isWinner
          ? "bg-[#182236] text-white font-black"
          : "bg-transparent text-slate-300 hover:bg-[#121926]"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Seed Number */}
        <span className="text-[11px] font-mono text-slate-500 font-bold w-4 text-right shrink-0">
          {seed}
        </span>

        {/* Emblem Shield */}
        <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0">
          <img src={emblem} alt="Emblem" className="w-4 h-4 object-contain" />
        </div>

        {/* Player Nickname */}
        <span className="text-xs font-bold truncate text-white tracking-tight">
          {player?.ign || player?.username || "TBD"}
        </span>
      </div>

      {/* Score */}
      <span className="text-xs font-mono font-black text-emerald-400 pl-2 shrink-0">
        {score}
      </span>
    </motion.div>
  );
}
