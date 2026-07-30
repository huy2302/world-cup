"use client";

import { useState } from "react";
import { X, Dices, Sparkles, CheckCircle2, Trophy, RefreshCw, Play } from "lucide-react";
import { WORLD_CUP_TEAMS, NationalTeam } from "./RegisterModal";

interface DrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredPlayers: { name: string; avatar?: string; clubLogo?: string }[];
  assignedTeams: string[]; // List of team names already assigned
  onDrawOne: (player: { name: string }, team: NationalTeam) => Promise<void>;
  onDrawAll: () => Promise<void>;
  onResetDraw?: () => void;
}

export default function DrawModal({
  isOpen,
  onClose,
  registeredPlayers,
  assignedTeams,
  onDrawOne,
  onResetDraw
}: DrawModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpinTeam, setCurrentSpinTeam] = useState<NationalTeam | null>(null);
  const [lastDrawnResult, setLastDrawnResult] = useState<{
    player: string;
    team: NationalTeam;
  } | null>(null);

  if (!isOpen) return null;

  // Available national teams that haven't been assigned yet
  const availableTeams = WORLD_CUP_TEAMS.filter(
    (t) => !assignedTeams.includes(t.name)
  );

  const handleSpinNext = async () => {
    if (isSpinning || availableTeams.length === 0 || registeredPlayers.length === 0) return;

    setIsSpinning(true);
    setLastDrawnResult(null);

    // Pick player to draw
    const playerToDraw = registeredPlayers[0];

    // Pick random unique team
    const randomTeamIndex = Math.floor(Math.random() * availableTeams.length);
    const chosenTeam = availableTeams[randomTeamIndex];

    // Carousel flicker effect for 1.2 seconds inside the modal
    const interval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * WORLD_CUP_TEAMS.length);
      setCurrentSpinTeam(WORLD_CUP_TEAMS[tempIndex]);
    }, 80);

    setTimeout(async () => {
      clearInterval(interval);
      setCurrentSpinTeam(chosenTeam);
      setIsSpinning(false);

      setLastDrawnResult({
        player: playerToDraw.name,
        team: chosenTeam
      });

      // Keep modal open for 1.6s so viewers can clearly see the drawn team result
      await new Promise((r) => setTimeout(r, 1600));

      // After 1.6s, temporarily hide modal and run tree node animation on main canvas
      await onDrawOne(playerToDraw, chosenTeam);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0D111F] border border-[#1F263B] rounded-3xl p-6 shadow-2xl text-white flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F263B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/50 flex items-center justify-center text-amber-400">
              <Dices className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
                BỐC THĂM ĐỘI TUYỂN & BẢNG ĐẤU <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <span className="text-xs text-purple-300">
                Mỗi người chơi nhận 1 Đội tuyển ngẫu nhiên (Không trùng lặp)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161D2F] border border-[#232D44] hover:border-purple-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Wheel Display Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161328] via-[#0E1222] to-[#0A0D18] border border-purple-500/40 p-6 flex flex-col items-center justify-center text-center shadow-inner">
          <div className="absolute top-2 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Admin Random Wheel
          </div>

          {currentSpinTeam ? (
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <img
                src={currentSpinTeam.flag}
                alt={currentSpinTeam.name}
                className="w-20 h-14 object-cover rounded-lg border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              />
              <div className="text-xl font-black tracking-wider text-amber-300 flex items-center gap-2">
                <span>{currentSpinTeam.name} ({currentSpinTeam.code})</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider ${
                currentSpinTeam.tier === "S" ? "bg-red-950/90 text-red-400 border border-red-500/60" :
                currentSpinTeam.tier === "A" ? "bg-amber-950/90 text-amber-400 border border-amber-500/60" :
                currentSpinTeam.tier === "B" ? "bg-yellow-950/90 text-yellow-300 border border-yellow-500/60" :
                "bg-emerald-950/90 text-emerald-300 border border-emerald-500/60"
              }`}>
                {currentSpinTeam.tier === "S" && "🔴 Tier S"}
                {currentSpinTeam.tier === "A" && "🟠 Tier A"}
                {currentSpinTeam.tier === "B" && "🟡 Tier B"}
                {currentSpinTeam.tier === "C" && "🟢 Tier C"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400 py-4">
              <Trophy className="w-12 h-12 text-purple-400/50 mb-1" />
              <p className="text-xs font-bold">
                Sẵn sàng bốc thăm cho người chơi tiếp theo!
              </p>
            </div>
          )}

          {/* Last Result Alert */}
          {lastDrawnResult && (
            <div className="mt-4 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Đã chốt: <strong className="text-white">{lastDrawnResult.player}</strong> nhận{" "}
                <strong className="text-amber-300">{lastDrawnResult.team.name}</strong> ({lastDrawnResult.team.tier ? `Tier ${lastDrawnResult.team.tier}` : ""}) và đã được xếp vào Bảng đấu!
              </span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#121829] border border-[#1F273D] flex items-center justify-between">
            <span className="text-slate-400 font-medium">Người chưa bốc:</span>
            <span className="font-mono font-black text-amber-400 text-sm">
              {registeredPlayers.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#121829] border border-[#1F273D] flex items-center justify-between">
            <span className="text-slate-400 font-medium">Đội tuyển còn lại:</span>
            <span className="font-mono font-black text-purple-300 text-sm">
              {availableTeams.length} / {WORLD_CUP_TEAMS.length}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {onResetDraw && (
            <button
              type="button"
              onClick={() => {
                setLastDrawnResult(null);
                setCurrentSpinTeam(null);
                onResetDraw();
              }}
              className="py-3 px-4 rounded-xl border border-red-500/40 bg-red-950/30 text-red-300 hover:bg-red-900/50 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Reset Bốc Thăm
            </button>
          )}

          <button
            type="button"
            disabled={isSpinning || registeredPlayers.length === 0}
            onClick={handleSpinNext}
            className="flex-1 purple-glow-btn text-white py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg"
          >
            {isSpinning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>ĐANG QUAY BỐC THĂM...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>QUAY 1 NGƯỜI TIẾP THEO</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

