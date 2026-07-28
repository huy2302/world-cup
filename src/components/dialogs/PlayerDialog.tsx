"use client";

import { useState } from "react";
import { Competitor, FootballPlayer } from "@/types/tournament";
import { X, Trophy, Shield, Cpu, Activity, Sparkles } from "lucide-react";
import FootballPitch from "../squad/FootballPitch";
import PlayerCardDialog from "./PlayerCardDialog";

interface PlayerDialogProps {
  competitor: Competitor | null;
  onClose: () => void;
}

export default function PlayerDialog({ competitor, onClose }: PlayerDialogProps) {
  const [selectedCard, setSelectedCard] = useState<FootballPlayer | null>(null);

  if (!competitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      {/* Modal Dialog Card Container */}
      <div className="relative w-full max-w-5xl cyber-glass rounded-3xl border border-cyan-500/40 shadow-2xl p-4 sm:p-8 text-slate-100 flex flex-col gap-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Competitor Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4">
            {/* Avatar & Club Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <img src={competitor.avatar} alt={competitor.nickname} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 p-1 bg-black/80 rounded-tl border-t border-l border-white/20">
                <img src={competitor.clubLogo} alt="Club" className="w-4 h-4 object-contain" />
              </div>
            </div>

            {/* IGN & Team Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {competitor.nickname}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase">
                  {competitor.rank}
                </span>
              </div>
              
              <span className="text-xs font-bold text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                {competitor.teamName}
              </span>

              {competitor.fconlineUid && (
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  UID: {competitor.fconlineUid}
                </span>
              )}
            </div>
          </div>

          {/* Key Squad Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Overall Rating */}
            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-amber-500/40 text-center flex flex-col">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Squad OVR</span>
              <span className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                {competitor.overallRating}
              </span>
            </div>

            {/* Tactical Formation */}
            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-cyan-500/40 text-center flex flex-col">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Formation</span>
              <span className="text-lg font-black text-cyan-300">
                {competitor.squad.formation}
              </span>
            </div>

            {/* Team Value */}
            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700 text-center flex flex-col">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Team Value</span>
              <span className="text-sm font-bold text-slate-200 mt-0.5">
                {competitor.squad.teamValue}
              </span>
            </div>
          </div>
        </div>

        {/* 2D Tactical Pitch Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Tactical Lineup Pitch (Click card for detail)
            </h3>
            <span className="text-[11px] text-slate-400">
              Chemistry: <strong className="text-emerald-400">100%</strong>
            </span>
          </div>

          <FootballPitch
            squad={competitor.squad}
            onSelectPlayer={(player) => setSelectedCard(player)}
          />
        </div>
      </div>

      {/* FC Online Player Card Detail Overlay */}
      {selectedCard && (
        <PlayerCardDialog
          player={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
