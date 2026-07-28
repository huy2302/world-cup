"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Zap, X } from "lucide-react";
import { FootballPlayerDetail } from "./PlayerDetailModal";

interface PlayerInfoDialogProps {
  player: FootballPlayerDetail | null;
  onClose: () => void;
}

export default function PlayerInfoDialog({ player, onClose }: PlayerInfoDialogProps) {
  if (!player) return null;

  const traitsList = player.traits ? player.traits.split(",").map((t) => t.trim()) : [];

  // Simulated Attribute Ratings
  const attributes = [
    { label: "Pace", value: Math.min(130, player.overall + 2), color: "from-[#00f0ff] to-blue-500" },
    { label: "Shooting", value: Math.min(130, player.overall + 5), color: "from-purple-500 to-pink-500" },
    { label: "Passing", value: Math.min(130, player.overall - 3), color: "from-[#00f0ff] to-cyan-400" },
    { label: "Dribbling", value: Math.min(130, player.overall + 1), color: "from-amber-400 to-orange-500" },
    { label: "Defending", value: Math.max(60, player.overall - 35), color: "from-slate-500 to-slate-400" },
    { label: "Physical", value: Math.min(130, player.overall + 1), color: "from-purple-600 to-indigo-600" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#101622] w-full max-w-2xl rounded-3xl border border-[#202a3d] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1b2333] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT: Authentic FC Online FUT Card graphic */}
          <div className="p-8 bg-gradient-to-b from-[#141c2b] to-[#0c1017] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#202a3d] md:w-64 shrink-0">
            <div className="w-48 h-72 rounded-2xl p-3 relative flex flex-col justify-between border-2 border-amber-400/90 shadow-[0_0_30px_rgba(245,158,11,0.25)] bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 text-slate-950">
              {/* OVR & Position */}
              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-black text-slate-950 font-mono tracking-tighter drop-shadow">
                    {player.overall}
                  </span>
                  <span className="text-xs font-black uppercase text-amber-950">
                    {player.position}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-black uppercase bg-slate-950 text-amber-300">
                  {player.season}
                </span>
              </div>

              {/* Portrait */}
              <div className="relative flex-1 flex items-center justify-center my-1">
                <img
                  src={player.portrait}
                  alt={player.name}
                  className="w-full h-40 object-cover object-top rounded-lg filter drop-shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded text-xs font-mono font-black bg-slate-950 text-amber-300 border border-amber-400">
                  +{player.cardLevel}
                </span>
              </div>

              {/* Name Banner */}
              <div className="bg-slate-950/90 py-1 px-2 rounded text-center border border-amber-300/40 z-10">
                <span className="text-xs font-black text-amber-200 uppercase truncate block">
                  {player.name}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Specifications & Attributes Progress Bars */}
          <div className="p-6 flex-1 space-y-6 max-h-[75vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-[#00f0ff] font-extrabold text-xs border border-cyan-500/30">
                  {player.position}
                </span>
                <span className="text-xs text-slate-400 font-medium">{player.club} • {player.nationality}</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mt-1">{player.name}</h3>
            </div>

            {/* Physical Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#141b27] p-2.5 rounded-xl border border-[#202a3d] flex justify-between">
                <span className="text-slate-400">Height:</span>
                <span className="font-bold text-white font-mono">{player.height}</span>
              </div>
              <div className="bg-[#141b27] p-2.5 rounded-xl border border-[#202a3d] flex justify-between">
                <span className="text-slate-400">Weight:</span>
                <span className="font-bold text-white font-mono">{player.weight}</span>
              </div>
              <div className="bg-[#141b27] p-2.5 rounded-xl border border-[#202a3d] flex justify-between">
                <span className="text-slate-400">Foot:</span>
                <span className="font-bold text-white">{player.preferredFoot}</span>
              </div>
              <div className="bg-[#141b27] p-2.5 rounded-xl border border-[#202a3d] flex justify-between">
                <span className="text-slate-400">Weak Foot:</span>
                <span className="font-bold text-amber-400">★★★★★</span>
              </div>
            </div>

            {/* Attributes Progress Bars (Image 3 Right Bottom) */}
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Attributes
              </span>

              <div className="space-y-2">
                {attributes.map((attr) => (
                  <div key={attr.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">{attr.label}</span>
                      <span className="text-white font-mono">{attr.value}</span>
                    </div>
                    <div className="w-full bg-[#1b2333] h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full bg-gradient-to-r ${attr.color} rounded-full`}
                        style={{ width: `${Math.min(100, (attr.value / 130) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
