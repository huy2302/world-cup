"use client";

import { useState } from "react";
import { X, Trophy, Save, Plus, Minus, CheckCircle2, ShieldAlert } from "lucide-react";

export interface ScoreUpdateTarget {
  matchId: string;
  title: string;
  homeName: string;
  homeFlag?: string;
  homeTeamName?: string;
  homeScore?: number | null;
  awayName: string;
  awayFlag?: string;
  awayTeamName?: string;
  awayScore?: number | null;
  status?: string;
}

interface UpdateScoreModalProps {
  matchInfo: ScoreUpdateTarget;
  isOpen: boolean;
  onClose: () => void;
  onSave: (matchId: string, homeScore: number, awayScore: number, status: string) => void;
}

export default function UpdateScoreModal({
  matchInfo,
  isOpen,
  onClose,
  onSave
}: UpdateScoreModalProps) {
  const [homeScore, setHomeScore] = useState<number>(matchInfo.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(matchInfo.awayScore ?? 0);
  const [status, setStatus] = useState<string>(matchInfo.status || "COMPLETED");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(matchInfo.matchId, homeScore, awayScore, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0D111F] border-2 border-purple-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.4)] text-white flex flex-col gap-6">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1F273D] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400 flex items-center justify-center text-amber-300">
              <Trophy className="w-5 h-5 fill-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                ADMIN PANEL • QUẢN LÝ TỈ SỐ
              </span>
              <h3 className="text-lg font-black text-white">{matchInfo.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#182035] text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Score Update Hero Card */}
        <div className="bg-[#070914] border border-[#1B2338] rounded-2xl p-5 flex items-center justify-between gap-4 shadow-inner">

          {/* HOME TEAM */}
          <div className="flex flex-col items-center gap-2 flex-1 text-center min-w-0">
            {matchInfo.homeFlag && (
              <img
                src={matchInfo.homeFlag}
                alt=""
                className="w-10 h-7 object-cover rounded border border-black/60 shadow"
              />
            )}
            <span className="text-xs font-black text-white truncate max-w-[120px]">
              {matchInfo.homeName}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold truncate">
              {matchInfo.homeTeamName || "Đội tuyển"}
            </span>

            {/* Score Control Inputs */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setHomeScore((prev) => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#232E47] hover:border-purple-400 text-white font-bold flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={0}
                value={homeScore}
                onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-12 h-10 rounded-xl bg-[#0F1424] border-2 border-purple-500/60 text-center font-mono font-black text-lg text-amber-300 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setHomeScore((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#232E47] hover:border-purple-400 text-white font-bold flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* VS & STATUS BADGE */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 px-2">
            <span className="text-xs font-black text-purple-400 tracking-widest">VS</span>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-black uppercase border border-purple-800">
              Cập nhật
            </span>
          </div>

          {/* AWAY TEAM */}
          <div className="flex flex-col items-center gap-2 flex-1 text-center min-w-0">
            {matchInfo.awayFlag && (
              <img
                src={matchInfo.awayFlag}
                alt=""
                className="w-10 h-7 object-cover rounded border border-black/60 shadow"
              />
            )}
            <span className="text-xs font-black text-white truncate max-w-[120px]">
              {matchInfo.awayName}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold truncate">
              {matchInfo.awayTeamName || "Đội tuyển"}
            </span>

            {/* Score Control Inputs */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setAwayScore((prev) => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#232E47] hover:border-purple-400 text-white font-bold flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={0}
                value={awayScore}
                onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-12 h-10 rounded-xl bg-[#0F1424] border-2 border-purple-500/60 text-center font-mono font-black text-lg text-amber-300 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setAwayScore((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#232E47] hover:border-purple-400 text-white font-bold flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Status Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            Trạng thái trận đấu:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStatus("COMPLETED")}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 border transition cursor-pointer ${
                status === "COMPLETED"
                  ? "bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-[#101524] text-slate-400 border-[#1F273D] hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã xong (Chốt kết quả)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus("IN_PROGRESS")}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 border transition cursor-pointer ${
                status === "IN_PROGRESS"
                  ? "bg-amber-950/90 text-amber-300 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-[#101524] text-slate-400 border-[#1F273D] hover:text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Đang diễn ra</span>
            </button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#1F273D] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#141A2B] text-slate-400 hover:text-white font-bold text-xs transition cursor-pointer"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="purple-glow-btn text-white px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>LƯU KẾT QUẢ TRẬN ĐẤU</span>
          </button>
        </div>

      </div>
    </div>
  );
}
