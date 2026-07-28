"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Award, Zap, Ruler, Weight, Footprints, Flame, X } from "lucide-react";

export interface FootballPlayerDetail {
  id: string;
  name: string;
  position: string;
  overall: number;
  season: string;
  cardLevel: number;
  nationality: string;
  club: string;
  portrait: string;
  salary: number;
  traits: string;
  preferredFoot: string;
  weakFoot: number;
  skillMoves: number;
  height: string;
  weight: string;
}

interface PlayerDetailModalProps {
  player: FootballPlayerDetail | null;
  onClose: () => void;
}

export default function PlayerDetailModal({ player, onClose }: PlayerDetailModalProps) {
  if (!player) return null;

  const traitsList = player.traits ? player.traits.split(",").map((t) => t.trim()) : [];

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "ICON":
        return "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 text-slate-950 font-black border-amber-300/60";
      case "24TS":
        return "bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black border-cyan-400/60";
      case "23UCL":
        return "bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-black border-blue-400/60";
      default:
        return "bg-slate-800 text-cyan-400 font-bold border-slate-700";
    }
  };

  const getCardLevelBadge = (level: number) => {
    const isGold = level >= 8;
    const isSilver = level >= 5 && level < 8;
    return (
      <span
        className={`px-2.5 py-0.5 rounded text-xs font-mono font-extrabold shadow-md border ${
          isGold
            ? "bg-gradient-to-br from-amber-300 to-yellow-600 text-slate-950 border-amber-200"
            : isSilver
            ? "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 border-white"
            : "bg-gradient-to-br from-amber-700 to-amber-900 text-amber-200 border-amber-600"
        }`}
      >
        +{level}
      </span>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-lg rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl relative"
        >
          {/* Header Banner & Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Player Card Header */}
          <div className="relative p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
            <div className="flex items-start gap-6">
              {/* Portrait Image Container */}
              <div className="relative w-28 h-36 rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-xl shrink-0">
                <img
                  src={player.portrait}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase shadow ${getSeasonColor(player.season)}`}>
                    {player.season}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  {getCardLevelBadge(player.cardLevel)}
                </div>
              </div>

              {/* Player Info & Main Attributes */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-extrabold text-xs border border-cyan-500/30">
                    {player.position}
                  </span>
                  <span className="text-2xl font-black text-white font-mono">{player.overall}</span>
                </div>

                <h2 className="text-2xl font-black text-white tracking-tight">{player.name}</h2>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                  <span className="font-semibold text-slate-200">{player.club}</span>
                  <span>•</span>
                  <span>{player.nationality}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  Salary: {player.salary} BP
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Physical Specs & Footing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-center">
                <Ruler className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Height</span>
                <span className="font-bold text-white font-mono">{player.height}</span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-center">
                <Weight className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Weight</span>
                <span className="font-bold text-white font-mono">{player.weight}</span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-center">
                <Footprints className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Footing</span>
                <span className="font-bold text-white truncate block">{player.preferredFoot}</span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-center">
                <Star className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Skill Moves</span>
                <div className="flex justify-center gap-0.5 text-amber-400 font-bold">
                  {Array.from({ length: player.skillMoves }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Traits & Capabilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-400" />
                Special Traits &amp; Skills
              </h4>

              <div className="flex flex-wrap gap-2">
                {traitsList.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Info Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>FC ONLINE DATA ENGINE</span>
              <span>SEASON ID: {player.season}-{player.overall}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
