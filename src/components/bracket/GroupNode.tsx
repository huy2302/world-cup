"use client";

import { Handle, Position } from "@xyflow/react";
import { Trophy, Crown, Sparkles, CheckCircle2 } from "lucide-react";
import { sortGroupTeams } from "@/lib/group-utils";
import { GroupTeam } from "@/types/tournament";

export type { GroupTeam };

export interface GroupNodeData {
  id: string;
  groupName: string;
  teams: GroupTeam[];
  isHighlighted?: boolean;
  onSelectGroup?: (groupData: GroupNodeData) => void;
}

export default function GroupNode({ data }: { data: GroupNodeData }) {
  const { groupName, teams, isHighlighted, onSelectGroup } = data;
  const rawMatches = (data as any).matches || [];

  // Sort teams by Points -> Most Goals Scored -> Head-to-Head -> Fewest Goals Conceded -> GD
  const sortedTeams = sortGroupTeams(teams || [], rawMatches);

  return (
    <div
      onClick={() => onSelectGroup?.(data)}
      title="Click để xem chi tiết lịch thi đấu vòng bảng"
      className={`relative w-[280px] rounded-xl p-3 select-none font-sans cursor-pointer transition-all duration-300 group bg-[#0D111F] border shadow-2xl ${
        isHighlighted
          ? "border-amber-400 scale-105 shadow-[0_0_35px_rgba(251,191,36,0.9)] ring-2 ring-amber-400/80 animate-pulse bg-purple-950/80"
          : "border-[#1E2638] hover:scale-105 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
      }`}
    >
      {/* Handles for flow connections */}
      <Handle type="target" position={Position.Left} id="target-left" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Right} id="source-right" className="!bg-[#7C3AED] !w-2.5 !h-2.5 !border-0" />
      <Handle type="target" position={Position.Right} id="target-right" className="!bg-[#6D28D9] !w-2.5 !h-2.5 !border-0" />
      <Handle type="source" position={Position.Left} id="source-left" className="!bg-[#7C3AED] !w-2.5 !h-2.5 !border-0" />

      {/* Group Header Badge */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A2234]">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-black tracking-wider text-white uppercase">
            {groupName}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-purple-950/80 text-purple-300 border border-purple-800/50 uppercase tracking-tight flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Top 1 Vào Bán Kết
        </span>
      </div>

      {/* Mini Table Header */}
      <div className="grid grid-cols-12 gap-1 text-[9px] font-bold text-slate-400 px-1 mb-1 uppercase tracking-wider text-center">
        <span className="col-span-1">#</span>
        <span className="col-span-6 text-left pl-1">Đội Tuyển</span>
        <span className="col-span-2">P</span>
        <span className="col-span-1">GD</span>
        <span className="col-span-2 text-purple-300">PTS</span>
      </div>

      {/* Team Rows (3 teams) */}
      <div className="space-y-1.5">
        {sortedTeams.map((team, index) => {
          const isTop1 = index === 0;
          return (
            <div
              key={team.id || index}
              className={`grid grid-cols-12 gap-1 items-center px-1.5 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                isTop1
                  ? "bg-gradient-to-r from-purple-950/70 via-[#18192D] to-purple-900/40 border border-purple-500/60 shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  : "bg-[#070A14] border border-[#161B2E] text-slate-300 hover:bg-[#111728]"
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center justify-center font-extrabold text-[11px]">
                {isTop1 ? (
                  <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                ) : (
                  <span className="text-slate-500">{index + 1}</span>
                )}
              </div>

              {/* Team Flag + IGN */}
              <div className="col-span-6 flex items-center gap-1.5 min-w-0 pl-1">
                {team.teamFlag && (
                  <img
                    src={team.teamFlag}
                    alt={team.teamName || "Flag"}
                    className="w-4 h-3 object-cover rounded-sm shrink-0 border border-black/60 shadow-sm"
                  />
                )}
                <span
                  className={`text-[11px] font-bold truncate ${
                    isTop1 ? "text-white font-extrabold" : "text-slate-200"
                  }`}
                >
                  {team.ign || team.name}
                </span>
              </div>

              {/* Played */}
              <div className="col-span-2 text-center text-[10px] font-mono text-slate-400">
                {team.played}
              </div>

              {/* Goal Difference */}
              <div className="col-span-1 text-center text-[10px] font-mono text-slate-400">
                {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
              </div>

              {/* Points */}
              <div className="col-span-2 text-center font-mono text-xs font-black text-white">
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    isTop1
                      ? "bg-purple-600 text-white font-extrabold shadow-[0_0_8px_rgba(147,51,234,0.7)]"
                      : "bg-[#161C2E] text-slate-300"
                  }`}
                >
                  {team.points}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Qualified Notice */}
      <div className="mt-2 pt-1.5 border-t border-[#181F30] flex items-center justify-between text-[10px] text-purple-300 font-medium">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3 h-3" />
          {sortedTeams[0]?.ign || sortedTeams[0]?.name}
        </span>
        <span className="text-purple-400 font-extrabold tracking-wider uppercase text-[9px]">
          ▶ VÀO BÁN KẾT
        </span>
      </div>
    </div>
  );
}
