"use client";

import { FootballPlayer } from "@/types/tournament";
import { X, Star, Shield, Zap, Flame, Award, Dumbbell, MoveRight } from "lucide-react";

interface PlayerCardDialogProps {
  player: FootballPlayer | null;
  onClose: () => void;
}

export default function PlayerCardDialog({ player, onClose }: PlayerCardDialogProps) {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Outer Modal Container */}
      <div className="relative w-full max-w-2xl cyber-glass rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl p-6 text-slate-100 flex flex-col gap-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Card Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800/80 pb-6">
          {/* Large Card Avatar Badge */}
          <div className="relative w-36 h-52 shrink-0 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            <img src={player.portrait} alt={player.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-xs font-black text-amber-400 border border-amber-400/50">
              +{player.cardLevel}
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 py-1 rounded text-center text-xs font-black text-cyan-300 border border-cyan-500/40 uppercase">
              {player.season}
            </div>
          </div>

          {/* Player Info Summary */}
          <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase tracking-widest">
                {player.position}
              </span>
              <span className="text-2xl font-black text-amber-400 tracking-tight">
                {player.overall} OVR
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {player.name}
            </h2>

            {/* Club & Country */}
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <img src={player.clubLogo} alt={player.club} className="w-4 h-4 object-contain" />
                <span>{player.club}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <img src={player.nationalityFlag} alt={player.nationality} className="w-4 h-2.5 object-cover rounded-sm" />
                <span>{player.nationality}</span>
              </div>
            </div>

            {/* Physical & Foot Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Height / Weight</span>
                <span className="text-xs font-extrabold text-white">{player.height} • {player.weight}</span>
              </div>

              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Preferred Foot</span>
                <span className="text-xs font-extrabold text-cyan-300">{player.preferredFoot} (WF: {player.weakFoot}/5)</span>
              </div>

              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Skill Moves</span>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-0.5">
                  {Array.from({ length: player.skillMoves }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Work Rate</span>
                <span className="text-xs font-extrabold text-purple-300">{player.workRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attributes & Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attributes Breakdown */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4" /> Core Attributes
            </h3>

            <div className="space-y-2.5">
              {Object.entries(player.attributes).map(([attrKey, val]) => (
                <div key={attrKey} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="uppercase text-slate-400">{attrKey}</span>
                    <span className="text-amber-400 font-extrabold">{val}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (val / 130) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traits Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4" /> Special Traits
            </h3>

            <div className="flex flex-wrap gap-2">
              {player.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
