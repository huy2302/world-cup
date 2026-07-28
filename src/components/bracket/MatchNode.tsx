"use client";

import { Handle, Position } from "@xyflow/react";
import { Crown, UserX } from "lucide-react";

export interface CompetitorData {
  name: string;
  ign?: string;
  avatar?: string;
  teamName?: string;
  teamFlag?: string;
  score?: number | null;
  isWinner?: boolean;
}

export interface MatchNodeData {
  home?: CompetitorData | null;
  away?: CompetitorData | null;
  isGrandFinal?: boolean;
  isBronzeFinal?: boolean;
}

export default function MatchNode({ data }: { data: MatchNodeData }) {
  const { home, away, isGrandFinal, isBronzeFinal } = data;

  const renderRow = (player?: CompetitorData | null) => {
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

    return (
      <div className={`flex items-center justify-between p-2 rounded-lg transition ${
        player.isWinner ? "bg-[#1C1F33] border border-[#7C3AED]/60" : "bg-[#0A0E1A]"
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Clean Player Avatar */}
          <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
            {player.avatar ? (
              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-300">
                {(player.ign || player.name).substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* IGN + National Flag */}
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-xs font-bold truncate ${player.isWinner ? "text-white font-extrabold" : "text-slate-200"}`}>
              {player.ign || player.name}
            </span>
            {player.teamFlag && (
              <img
                src={player.teamFlag}
                alt={player.teamName || "Flag"}
                className="w-4 h-3 object-cover rounded-sm shrink-0 border border-black/60 shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Score Badge */}
        <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-black ${
          player.isWinner
            ? "bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.7)]"
            : "bg-[#151B2C] text-slate-400"
        }`}>
          {player.score !== undefined && player.score !== null ? player.score : "-"}
        </span>
      </div>
    );
  };

  return (
    <div className={`relative w-[240px] rounded-xl p-2.5 select-none font-sans transition-all duration-300 ${
      isGrandFinal
        ? "grand-final-node shadow-[0_0_20px_rgba(124,58,237,0.5)] border-2 border-purple-500"
        : isBronzeFinal
        ? "bg-[#16120D] border border-amber-800/60 shadow-lg"
        : "bg-[#131827] border border-[#1F2638] hover:border-[#7C3AED]/70 shadow-xl"
    }`}>
      
      {/* Handles for both Left and Right flow directions */}
      <Handle type="target" position={Position.Left} id="target-left" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Right} id="source-right" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="target" position={Position.Right} id="target-right" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Left} id="source-left" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />

      {/* Floating Crown Icon for Grand Final */}
      {isGrandFinal && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Crown className="w-5 h-5 fill-purple-400 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] animate-bounce" />
        </div>
      )}

      {/* Bronze Label for Bronze Final */}
      {isBronzeFinal && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-amber-900/60 text-[9px] font-extrabold text-amber-300 border border-amber-700/50 uppercase tracking-widest">
          Bronze Final
        </div>
      )}

      {/* Home Competitor Row */}
      <div className="mb-1.5">
        {renderRow(home)}
      </div>

      {/* Away Competitor Row */}
      <div>
        {renderRow(away)}
      </div>

    </div>
  );
}
