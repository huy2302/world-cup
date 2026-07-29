"use client";

import { useState } from "react";
import { FootballPlayer, TacticalSquad, FormationType } from "@/types/tournament";
import { X, Shield, Cpu, Sparkles, User, Gamepad2, Flag, LayoutGrid } from "lucide-react";
import FootballPitch from "../squad/FootballPitch";
import PlayerCardDialog from "./PlayerCardDialog";
import { buildSampleSquad } from "@/data/mockTournament";

export interface PlayerModalData {
  name: string; // Tên người chơi
  ign?: string; // Tên Ingame
  avatar?: string;
  teamName?: string; // Đội tuyển đăng ký
  teamFlag?: string;
  clubLogo?: string;
  formation?: FormationType;
  squad?: TacticalSquad;
  rank?: string;
  fconlineUid?: string;
  overallRating?: number;
}

interface PlayerDialogProps {
  competitor: PlayerModalData | null;
  onClose: () => void;
}

export default function PlayerDialog({ competitor, onClose }: PlayerDialogProps) {
  const [selectedCard, setSelectedCard] = useState<FootballPlayer | null>(null);

  if (!competitor) return null;

  const playerName = competitor.name || competitor.ign || "Người chơi";
  const ignName = competitor.ign || competitor.name || "N/A";
  const teamName = competitor.teamName || "Đội tuyển tự do";
  const flag = competitor.teamFlag || competitor.clubLogo || "https://flagcdn.com/w40/vn.png";
  const formation = competitor.formation || competitor.squad?.formation || "4-2-3-1";
  const squad = competitor.squad || buildSampleSquad(formation);
  const avatar = competitor.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${ignName}`;
  const ovr = competitor.overallRating || 120;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      {/* Modal Dialog Card Container */}
      <div className="relative w-full max-w-5xl cyber-glass rounded-3xl border border-cyan-500/40 shadow-2xl p-4 sm:p-8 text-slate-100 flex flex-col gap-6 my-auto max-h-[95vh] overflow-y-auto">
        
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
            {/* Avatar & Club/National Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <img src={avatar} alt={ignName} className="w-full h-full object-cover" />
              {flag && (
                <div className="absolute bottom-0 right-0 p-1 bg-black/80 rounded-tl border-t border-l border-white/20">
                  <img src={flag} alt="Team Flag" className="w-4 h-3 object-cover rounded-sm" />
                </div>
              )}
            </div>

            {/* IGN & Team Details */}
            <div className="flex flex-col gap-1 text-left">
              {/* Tên Người Chơi */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Họ & Tên:</span>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {playerName}
                </h2>
              </div>

              {/* Tên Ingame */}
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">IGN:</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black">
                  {ignName}
                </span>
              </div>
              
              {/* Đội tuyển đăng ký */}
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Đội tuyển đăng ký:</span>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  {flag && <img src={flag} alt={teamName} className="w-4 h-3 object-cover rounded-sm" />}
                  {teamName}
                </span>
              </div>
            </div>
          </div>

          {/* Key Squad Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Đội hình thi đấu */}
            <div className="bg-slate-900/90 px-4 py-2.5 rounded-xl border border-purple-500/40 text-center flex flex-col min-w-[120px]">
              <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <LayoutGrid className="w-3 h-3" /> Đội hình
              </span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5">
                {formation}
              </span>
            </div>

            {/* Overall Rating */}
            <div className="bg-slate-900/90 px-4 py-2.5 rounded-xl border border-amber-500/40 text-center flex flex-col min-w-[110px]">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Squad OVR</span>
              <span className="text-base sm:text-lg font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                {ovr}
              </span>
            </div>
          </div>
        </div>

        {/* 2D Tactical Pitch Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" /> ĐỘI HÌNH THI ĐẤU CHIẾN THUẬT ({formation})
            </h3>
            <span className="text-[11px] text-slate-400">
              Click vào thẻ cầu thủ để xem chỉ số chi tiết
            </span>
          </div>

          <FootballPitch
            squad={squad}
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
