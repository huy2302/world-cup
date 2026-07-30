"use client";

import { useState } from "react";
import { X, Swords, Trophy, User, Gamepad2, Flag, LayoutGrid, Sparkles, Cpu, UserPlus, Layers, Edit2 } from "lucide-react";
import { MatchNodeData } from "../bracket/MatchNode";
import FootballPitch from "../squad/FootballPitch";
import PlayerCardDialog from "./PlayerCardDialog";
import { FootballPlayer } from "@/types/tournament";
import { buildSampleSquad } from "@/data/mockTournament";

interface MatchDialogProps {
  matchData: MatchNodeData | null;
  onClose: () => void;
  onOpenRegister?: () => void;
  onOpenUpdateScore?: (match: any) => void;
}

export default function MatchDialog({ matchData, onClose, onOpenRegister, onOpenUpdateScore }: MatchDialogProps) {
  const [selectedCard, setSelectedCard] = useState<FootballPlayer | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "pitches" | "comparison">("all");

  if (!matchData) return null;

  const { home, away, isGrandFinal, isBronzeFinal, roundName } = matchData;

  const title = roundName || (isGrandFinal ? "TRẬN CHUNG KẾT (GRAND FINAL)" : isBronzeFinal ? "TRẬN TRANH HẠNG BA" : "VÒNG THI ĐẤU KNOCKOUT");

  const homeSquad = home?.squad || (home?.formation ? buildSampleSquad(home.formation) : buildSampleSquad("4-2-3-1"));
  const awaySquad = away?.squad || (away?.formation ? buildSampleSquad(away.formation) : buildSampleSquad("4-3-3"));

  const hasEmptySlot = !home || !away;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      {/* Modal Container with Pinned Header & Footer */}
      <div className="relative w-full max-w-7xl xl:max-w-[1380px] h-[92vh] max-h-[920px] bg-[#0C0F1D] border border-purple-500/40 rounded-3xl text-white flex flex-col shadow-[0_0_50px_rgba(124,58,237,0.35)] overflow-hidden">

        {/* 1. PINNED TOP HEADER */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-[#1F263B] bg-[#0C0F1D] shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
              {isGrandFinal ? <Trophy className="w-5 h-5 text-amber-400 fill-amber-400" /> : <Swords className="w-5 h-5 text-purple-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider">
                  MATCH DETAILS
                </span>
                {isGrandFinal && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider">
                    CHUNG KẾT
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5 uppercase">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#161D2F] border border-[#232D44] hover:border-purple-400 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. SCROLLABLE BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">

          {/* VIEW SWITCHER BUTTON BAR */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-[#080B16] p-2 rounded-2xl border border-[#161D2E]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-2 hidden sm:inline">
                Chế độ hiển thị:
              </span>
              <button
                onClick={() => setViewMode("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 cursor-pointer ${viewMode === "all"
                  ? "bg-purple-600/30 text-purple-200 border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-[#121727] text-slate-400 hover:text-white border border-[#1E273C]"
                  }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Tất cả thông tin
              </button>

              <button
                onClick={() => setViewMode("pitches")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 cursor-pointer ${viewMode === "pitches"
                  ? "bg-cyan-600/30 text-cyan-200 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  : "bg-[#121727] text-slate-400 hover:text-white border border-[#1E273C]"
                  }`}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Đội hình 2D
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
              FC Online World Cup Champions Cup 2026
            </span>
          </div>

          {/* VS HERO ARENA BANNER */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-[#070913] p-4 sm:p-5 rounded-2xl border border-[#192033] shadow-inner relative overflow-hidden shrink-0">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* HOME PLAYER (Col 1 to 5) */}
            <div className="md:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-3 bg-[#0F1424] p-4 rounded-xl border border-cyan-500/30">
              {home ? (
                <div className="flex items-center gap-4 w-full">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <img src={home.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${home.ign}`} alt={home.name} className="w-full h-full object-cover" />
                    {home.teamFlag && (
                      <img src={home.teamFlag} alt={home.teamName} className="absolute bottom-1 right-1 w-5 h-3.5 object-cover rounded-sm border border-black" />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">HOME PLAYER</span>
                    <h3 className="text-base sm:text-lg font-black text-white truncate">{home.ign || home.name}</h3>
                    <span className="text-xs text-slate-400 font-semibold truncate flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" /> {home.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-extrabold border border-slate-700">
                        {home.teamName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-black border border-purple-500/40">
                        {home.formation || "4-2-3-1"}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-center justify-center bg-[#070913] px-3.5 py-2.5 rounded-xl border border-cyan-500/40 font-mono text-xl font-black text-cyan-300 min-w-[54px]">
                    {home.score !== null && home.score !== undefined ? home.score : "-"}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 text-slate-500 w-full justify-center">
                  <span className="text-sm font-medium italic">Vị trí trống (Chờ ĐK)</span>
                </div>
              )}
            </div>

            {/* VS BADGE (Col 6) */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 via-purple-600 to-amber-500 flex items-center justify-center font-black text-white text-base sm:text-lg shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-pulse">
                VS
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">BO3 Match</span>
            </div>

            {/* AWAY PLAYER (Col 7 to 11) */}
            <div className="md:col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right gap-3 bg-[#0F1424] p-4 rounded-xl border border-purple-500/30">
              {away ? (
                <div className="flex items-center gap-4 w-full flex-row-reverse">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <img src={away.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${away.ign}`} alt={away.name} className="w-full h-full object-cover" />
                    {away.teamFlag && (
                      <img src={away.teamFlag} alt={away.teamName} className="absolute bottom-1 right-1 w-5 h-3.5 object-cover rounded-sm border border-black" />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1 items-end">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">AWAY PLAYER</span>
                    <h3 className="text-base sm:text-lg font-black text-white truncate">{away.ign || away.name}</h3>
                    <span className="text-xs text-slate-400 font-semibold truncate flex items-center gap-1">
                      {away.name} <User className="w-3 h-3 text-slate-500" />
                    </span>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap justify-end">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-black border border-purple-500/40">
                        {away.formation || "4-3-3"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-extrabold border border-slate-700">
                        {away.teamName}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-center justify-center bg-[#070913] px-3.5 py-2.5 rounded-xl border border-purple-500/40 font-mono text-xl font-black text-purple-300 min-w-[54px]">
                    {away.score !== null && away.score !== undefined ? away.score : "-"}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 text-slate-500 w-full justify-center">
                  <span className="text-sm font-medium italic">Vị trí trống (Chờ ĐK)</span>
                </div>
              )}
            </div>
          </div>

          {/* COMPARISON TABLE (Shown in 'all' or 'comparison' mode) */}
          {(viewMode === "all" || viewMode === "comparison") && (
            <div className="flex flex-col gap-4 bg-[#090C16] p-4 sm:p-5 rounded-2xl border border-[#1A2135]">
              <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> BẢNG SO SÁNH THÔNG TIN VẬN ĐỘNG VIÊN
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1D263B] text-slate-400 text-[11px] font-black uppercase">
                      <th className="py-2.5 px-3">Thông tin</th>
                      <th className="py-2.5 px-3 text-cyan-300">{home?.ign || home?.name || "Vị trí trống"} (HOME)</th>
                      <th className="py-2.5 px-3 text-purple-300">{away?.ign || away?.name || "Vị trí trống"} (AWAY)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161D2F] font-semibold text-slate-200">
                    <tr>
                      <td className="py-3 px-3 text-slate-400 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-purple-400" /> Họ & Tên thật</td>
                      <td className="py-3 px-3 font-bold text-white">{home?.name || "-"}</td>
                      <td className="py-3 px-3 font-bold text-white">{away?.name || "-"}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-slate-400 flex items-center gap-1.5"><Gamepad2 className="w-3.5 h-3.5 text-cyan-400" /> Tên Ingame (IGN)</td>
                      <td className="py-3 px-3 text-cyan-300 font-extrabold">{home?.ign || "-"}</td>
                      <td className="py-3 px-3 text-purple-300 font-extrabold">{away?.ign || "-"}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-slate-400 flex items-center gap-1.5"><Flag className="w-3.5 h-3.5 text-amber-400" /> Đội tuyển đăng ký</td>
                      <td className="py-3 px-3">
                        {home?.teamName ? (
                          <span className="flex items-center gap-1.5">
                            {home.teamFlag && <img src={home.teamFlag} alt={home.teamName} className="w-4 h-3 object-cover rounded-sm" />}
                            {home.teamName}
                          </span>
                        ) : "-"}
                      </td>
                      <td className="py-3 px-3">
                        {away?.teamName ? (
                          <span className="flex items-center gap-1.5">
                            {away.teamFlag && <img src={away.teamFlag} alt={away.teamName} className="w-4 h-3 object-cover rounded-sm" />}
                            {away.teamName}
                          </span>
                        ) : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-slate-400 flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5 text-emerald-400" /> Đội hình thi đấu</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{home?.formation || "4-2-3-1"}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{away?.formation || "4-3-3"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TACTICAL SQUAD PITCHES (Shown in 'all' or 'pitches' mode) */}
          {(viewMode === "all" || viewMode === "pitches") && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#1F263B] pb-2">
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> ĐỘI HÌNH THI ĐẤU CHIẾN THUẬT CÁC VẬN ĐỘNG VIÊN
                </h3>
                <span className="text-[11px] text-slate-400 hidden sm:inline">Click vào thẻ cầu thủ để xem chi tiết FC Online</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* HOME PLAYER SQUAD PITCH */}
                <div className="flex flex-col gap-2 bg-[#090C16] p-3 sm:p-4 rounded-2xl border border-cyan-500/30">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-wider truncate">
                      HOME: {home ? (home.ign || home.name) : "Vị trí trống"} ({home?.formation || "4-2-3-1"})
                    </span>
                    {home?.teamName && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                        {home.teamName}
                      </span>
                    )}
                  </div>
                  {home ? (
                    <FootballPitch squad={homeSquad} compact={true} onSelectPlayer={(player) => setSelectedCard(player)} />
                  ) : (
                    <div className="h-[380px] flex items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs italic">
                      Chưa có VĐV đăng ký vị trí này
                    </div>
                  )}
                </div>

                {/* AWAY PLAYER SQUAD PITCH */}
                <div className="flex flex-col gap-2 bg-[#090C16] p-3 sm:p-4 rounded-2xl border border-purple-500/30">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-black text-purple-400 uppercase tracking-wider truncate">
                      AWAY: {away ? (away.ign || away.name) : "Vị trí trống"} ({away?.formation || "4-3-3"})
                    </span>
                    {away?.teamName && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                        {away.teamName}
                      </span>
                    )}
                  </div>
                  {away ? (
                    <FootballPitch squad={awaySquad} compact={true} onSelectPlayer={(player) => setSelectedCard(player)} />
                  ) : (
                    <div className="h-[380px] flex items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs italic">
                      Chưa có VĐV đăng ký vị trí này
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3. PINNED BOTTOM FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:px-6 sm:py-4 border-t border-[#1F263B] bg-[#0C0F1D] shrink-0 z-20">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {hasEmptySlot && onOpenRegister ? (
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto purple-glow-btn text-white px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                <UserPlus className="w-4 h-4" /> ĐĂNG KÝ VÀO VỊ TRÍ TRỐNG NÀY
              </button>
            ) : (
              <div className="text-xs text-slate-400 italic hidden sm:block">
                Trận đấu nằm trong khuôn khổ FC Online World Cup Champions Cup 2026.
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {onOpenUpdateScore && home && away && (
              <button
                onClick={() => {
                  onClose();
                  onOpenUpdateScore({
                    matchId: matchData.id,
                    title: title,
                    homeName: home.ign || home.name,
                    homeFlag: home.teamFlag,
                    homeTeamName: home.teamName,
                    homeScore: home.score,
                    awayName: away.ign || away.name,
                    awayFlag: away.teamFlag,
                    awayTeamName: away.teamName,
                    awayScore: away.score,
                    status: (matchData as any).status || "COMPLETED"
                  });
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-950/40"
              >
                <Edit2 className="w-4 h-4 text-amber-400" />
                <span>Cập Nhật Tỉ Số (Admin)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#232A3D] bg-[#131827] hover:bg-[#1C243B] text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          </div>
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
