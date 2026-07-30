"use client";

import { Trophy, Sparkles, Crown, X, Flag, Award, Zap } from "lucide-react";
import { CompetitorData } from "../bracket/MatchNode";

interface ChampionCelebrationModalProps {
  champion: CompetitorData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChampionCelebrationModal({ champion, isOpen, onClose }: ChampionCelebrationModalProps) {
  if (!isOpen || !champion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      {/* Background Golden Glow & Particle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/20 via-yellow-500/30 to-purple-600/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative w-full max-w-lg bg-[#0E1222] border-2 border-amber-400 rounded-3xl shadow-[0_0_80px_rgba(251,191,36,0.8)] overflow-hidden text-center p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#1B2236] text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Crown Badge */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-[0_0_40px_rgba(245,158,11,0.9)] animate-bounce">
            <div className="w-full h-full rounded-[22px] bg-[#0A0D1A] flex items-center justify-center">
              <Trophy className="w-12 h-12 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-950 font-black shadow-lg">
            <Crown className="w-5 h-5 fill-amber-950" />
          </div>
        </div>

        {/* Title & Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>XIN CHÚC MỪNG QUÁN QUÂN WORLD CUP</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight uppercase">
            {champion.ign || champion.name}
          </h2>
        </div>

        {/* Champion Card Frame */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181F35] to-[#0F1426] border border-amber-500/40 shadow-inner flex items-center justify-center gap-5">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-900 shadow-lg shrink-0">
            {champion.avatar ? (
              <img src={champion.avatar} alt={champion.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-amber-950/80 flex items-center justify-center text-amber-300 font-extrabold text-xl">
                {(champion.ign || champion.name).substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* National Team Info */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              {champion.teamFlag && (
                <img
                  src={champion.teamFlag}
                  alt=""
                  className="w-6 h-4 rounded-sm object-cover border border-black/60 shadow"
                />
              )}
              <span className="text-base font-extrabold text-white">
                {champion.teamName || "Đội tuyển Quốc gia"}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Vô địch Giải đấu
              </span>
              <span className="flex items-center gap-1 text-purple-300 font-mono">
                <Zap className="w-3.5 h-3.5 text-purple-400" /> OVR 118
              </span>
            </div>
          </div>
        </div>

        {/* Celebration Description */}
        <p className="text-xs text-slate-400 leading-relaxed italic">
          VĐV <strong className="text-white">{champion.ign || champion.name}</strong> đã xuất sắc vượt qua tất cả các đối thủ để lên ngôi Vô Địch giải đấu <strong>FC Online World Cup</strong>!
        </p>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(251,191,36,0.6)] cursor-pointer flex items-center justify-center gap-2"
        >
          <Trophy className="w-5 h-5 fill-amber-950" />
          <span>VINH DẠNH VÀ XEM SƠ ĐỒ THI ĐẤU</span>
        </button>
      </div>
    </div>
  );
}
