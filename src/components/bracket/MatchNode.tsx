"use client";

import { Handle, Position } from "@xyflow/react";
import { Crown, UserX } from "lucide-react";

import { FormationType, TacticalSquad } from "@/types/tournament";

export interface CompetitorData {
  name: string;
  ign?: string;
  avatar?: string;
  teamName?: string;
  teamFlag?: string;
  score?: number | null;
  isWinner?: boolean;
  formation?: FormationType;
  squad?: TacticalSquad;
}

export interface MatchNodeData {
  id?: string;
  roundName?: string;
  home?: CompetitorData | null;
  away?: CompetitorData | null;
  isGrandFinal?: boolean;
  isBronzeFinal?: boolean;
  onSelectCompetitor?: (competitor: CompetitorData) => void;
  onSelectMatch?: (matchData: MatchNodeData) => void;
}

export default function MatchNode({ data }: { data: MatchNodeData }) {
  const { home, away, isGrandFinal, isBronzeFinal, onSelectCompetitor, onSelectMatch } = data;

  const isHomeWinner = home?.score !== null && home?.score !== undefined && away?.score !== null && away?.score !== undefined && home.score > away.score;
  const isAwayWinner = home?.score !== null && home?.score !== undefined && away?.score !== null && away?.score !== undefined && away.score > home.score;

  const hasGrandFinalChampion = isGrandFinal && (isHomeWinner || isAwayWinner);

  const renderRow = (player?: CompetitorData | null, isWinner?: boolean) => {
    if (!player || !player.name) {
      return (
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#0A0E1A]/60 border border-dashed border-[#1E273D] text-slate-500">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full border border-dashed border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-600 shrink-0">
              <UserX className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium italic text-slate-500 truncate">
              Vị trí trống (Chờ ĐK)
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold text-slate-600">
            -
          </span>
        </div>
      );
    }

    const isChampion = isGrandFinal && isWinner;

    return (
      <div
        className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
          isChampion
            ? "bg-gradient-to-r from-amber-950 via-yellow-900/90 to-amber-950 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse"
            : isWinner
            ? "bg-[#1C1F33] border border-[#7C3AED]/60"
            : "bg-[#0A0E1A] border border-transparent group-hover:bg-[#161D2F]"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Clean Player Avatar */}
          <div className={`w-7 h-7 rounded-full overflow-hidden border shrink-0 bg-slate-900 transition-colors ${
            isChampion ? "border-amber-300 ring-2 ring-amber-400/80" : "border-slate-700"
          }`}>
            {player.avatar ? (
              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-300">
                {(player.ign || player.name).substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* IGN + National Flag + Champion Crown */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`text-xs font-bold truncate transition-colors ${
              isChampion
                ? "text-amber-300 font-black text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                : isWinner
                ? "text-white font-extrabold"
                : "text-slate-200"
            }`}>
              {player.ign || player.name}
            </span>
            {player.teamFlag && (
              <img
                src={player.teamFlag}
                alt={player.teamName || "Flag"}
                className="w-4 h-3 object-cover rounded-sm shrink-0 border border-black/60 shadow-sm"
              />
            )}
            {isChampion && (
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-black text-[9px] uppercase tracking-tighter shrink-0 flex items-center gap-0.5 shadow">
                <Crown className="w-3 h-3 fill-amber-950" /> VÔ ĐỊCH
              </span>
            )}
          </div>
        </div>

        {/* Score Badge */}
        <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-black ${
          isChampion
            ? "bg-amber-400 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.9)] font-extrabold"
            : isWinner
            ? "bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.7)]"
            : "bg-[#151B2C] text-slate-400 group-hover:text-white"
        }`}>
          {player.score !== undefined && player.score !== null ? player.score : "-"}
        </span>
      </div>
    );
  };

  return (
    <div
      onClick={() => onSelectMatch?.(data)}
      title="Click để xem thông tin cặp đấu"
      className={`relative w-[240px] rounded-xl p-2.5 select-none font-sans cursor-pointer transition-all duration-300 hover:scale-105 group ${
        hasGrandFinalChampion
          ? "bg-[#120F06] border-2 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.9)] ring-2 ring-amber-400/60"
          : isGrandFinal
          ? "grand-final-node shadow-[0_0_20px_rgba(124,58,237,0.5)] border-2 border-purple-500 hover:border-purple-400"
          : isBronzeFinal
          ? "bg-[#16120D] border border-amber-800/60 shadow-lg"
          : "bg-[#131827] border border-[#1F2638] shadow-xl hover:border-purple-400"
      }`}
    >
      {/* Handles for both Left and Right flow directions */}
      <Handle type="target" position={Position.Left} id="target-left" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Right} id="source-right" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="target" position={Position.Right} id="target-right" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Left} id="source-left" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />

      {/* Floating Crown Icon for Grand Final */}
      {isGrandFinal && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Crown className={`w-5 h-5 animate-bounce ${
            hasGrandFinalChampion
              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,1)] scale-125"
              : "fill-purple-400 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]"
          }`} />
        </div>
      )}

      {/* Round Name */}
      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center mb-2 flex items-center justify-center gap-1">
        <span className={hasGrandFinalChampion ? "text-amber-300 font-extrabold" : isGrandFinal ? "text-purple-300 font-bold" : ""}>
          {data.roundName || "VÒNG THI ĐẤU"}
        </span>
      </div>

      {/* Competitor Rows */}
      <div className="space-y-1.5">
        {renderRow(home, isHomeWinner)}
        {renderRow(away, isAwayWinner)}
      </div>
    </div>
  );
}
