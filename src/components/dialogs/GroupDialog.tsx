"use client";

import { X, Trophy, Swords, Calendar, Crown, CheckCircle2, Edit2 } from "lucide-react";
import { GroupNodeData } from "../bracket/GroupNode";
import { sortGroupTeams } from "@/lib/group-utils";

interface GroupDialogProps {
  groupData: GroupNodeData;
  onClose: () => void;
  onOpenUpdateScore?: (match: any) => void;
}

export default function GroupDialog({ groupData, onClose, onOpenUpdateScore }: GroupDialogProps) {
  const { id: groupNodeId, groupName, teams } = groupData;
  const rawMatches = (groupData as any).matches || [];
  const teamList = teams || [];

  const sortedTeams = sortGroupTeams(teamList, rawMatches);

  const fixtures = [
    {
      id: `${groupNodeId || "group-a"}-m1`,
      home: teamList[0] || null,
      away: teamList[1] || null,
      homeScore: rawMatches[0]?.homeScore ?? null,
      awayScore: rawMatches[0]?.awayScore ?? null,
      status: rawMatches[0]?.status || "SCHEDULED",
      time: "Trận 1 • Vòng Bảng"
    },
    {
      id: `${groupNodeId || "group-a"}-m2`,
      home: teamList[1] || null,
      away: teamList[2] || null,
      homeScore: rawMatches[1]?.homeScore ?? null,
      awayScore: rawMatches[1]?.awayScore ?? null,
      status: rawMatches[1]?.status || "SCHEDULED",
      time: "Trận 2 • Vòng Bảng"
    },
    {
      id: `${groupNodeId || "group-a"}-m3`,
      home: teamList[0] || null,
      away: teamList[2] || null,
      homeScore: rawMatches[2]?.homeScore ?? null,
      awayScore: rawMatches[2]?.awayScore ?? null,
      status: rawMatches[2]?.status || "SCHEDULED",
      time: "Trận 3 • Vòng Bảng"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0D111F] border border-[#1F273D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141A2D] border-b border-[#1F273D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/50 flex items-center justify-center text-purple-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                {groupName} - THỂ THỨC VÒNG BẢNG
              </h3>
              <p className="text-xs text-purple-300">
                12 đội • 4 Bảng • Đá vòng tròn tính điểm • Top 1 vào Bán kết
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1D253A] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Bảng Xếp Hạng Chi Tiết */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" /> Bảng Xếp Hạng Hiện Tại
            </h4>
            <div className="overflow-hidden rounded-xl border border-[#1F273D] bg-[#080B15]">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#121829] text-[11px] font-extrabold uppercase text-slate-400 border-b border-[#1F273D]">
                  <tr>
                    <th className="px-3 py-2.5 text-center">#</th>
                    <th className="px-3 py-2.5">Đội Tuyển / HLV</th>
                    <th className="px-3 py-2.5 text-center">Trận</th>
                    <th className="px-3 py-2.5 text-center">T-H-T</th>
                    <th className="px-3 py-2.5 text-center">BT/BB</th>
                    <th className="px-3 py-2.5 text-center">HS</th>
                    <th className="px-3 py-2.5 text-center text-purple-300">Điểm</th>
                    <th className="px-3 py-2.5 text-center">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182033]">
                  {sortedTeams.length > 0 ? (
                    sortedTeams.map((t, idx) => {
                      const isTop1 = idx === 0;
                      return (
                        <tr
                          key={t.id || idx}
                          className={
                            isTop1
                              ? "bg-purple-950/30 text-white font-bold"
                              : "hover:bg-[#0F1524]"
                          }
                        >
                          <td className="px-3 py-3 text-center font-extrabold">
                            {isTop1 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs">
                                1
                              </span>
                            ) : (
                              idx + 1
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              {t.teamFlag && (
                                <img
                                  src={t.teamFlag}
                                  alt={t.teamName || "Flag"}
                                  className="w-5 h-3.5 object-cover rounded-sm border border-black/50"
                                />
                              )}
                              <div>
                                <div className="font-extrabold">{t.ign || t.name}</div>
                                <div className="text-[10px] text-slate-400">{t.teamName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center font-mono">{t.played}</td>
                          <td className="px-3 py-3 text-center font-mono">
                            {t.won}-{t.drawn}-{t.lost}
                          </td>
                          <td className="px-3 py-3 text-center font-mono">
                            {t.goalsFor}/{t.goalsAgainst}
                          </td>
                          <td className="px-3 py-3 text-center font-mono">
                            {t.goalDifference > 0 ? `+${t.goalDifference}` : t.goalDifference}
                          </td>
                          <td className="px-3 py-3 text-center font-mono font-black text-sm text-purple-300">
                            {t.points}
                          </td>
                          <td className="px-3 py-3 text-center">
                            {isTop1 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-[10px] font-bold border border-emerald-700/50">
                                <CheckCircle2 className="w-3 h-3" /> VÀO BÁN KẾT
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500">Bị Loại</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-xs text-slate-400 font-semibold italic bg-[#090D18]">
                        Bảng đấu chưa có đội tuyển nào (Đang chờ Admin quay bốc thăm)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lịch Sử Các Trận Đấu Trong Bảng */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-purple-400" /> Các Trận Đấu Nội Bộ ({groupName})
            </h4>
            <div className="space-y-2.5">
              {fixtures.map((m) => {
                const hasPlayed = m.homeScore !== null && m.homeScore !== undefined && m.awayScore !== null && m.awayScore !== undefined;

                return (
                  <div
                    key={m.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#090D1A] border border-[#1A2235]"
                  >
                    {/* Left: Time & Stage Label */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 shrink-0 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{m.time}</span>
                    </div>

                    {/* Center: Home Player vs Away Player Arena */}
                    <div className="flex items-center justify-center gap-3 flex-1 min-w-0">
                      {/* Home Player */}
                      <div className="flex items-center gap-2 justify-end flex-1 min-w-0 text-right">
                        <span className="text-xs font-bold text-white truncate">
                          {m.home ? (m.home.ign || m.home.name) : "Chưa bốc"}
                        </span>
                        {m.home?.teamFlag && (
                          <img src={m.home.teamFlag} alt="" className="w-4 h-3 rounded-sm shrink-0 border border-black/50" />
                        )}
                      </div>

                      {/* Score Badge */}
                      <div className={`px-3 py-1 rounded-lg border font-mono font-black text-xs min-w-[56px] text-center whitespace-nowrap shrink-0 ${
                        hasPlayed
                          ? "bg-purple-950/80 border-purple-500/60 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                          : "bg-[#141A2B] border-[#222B42] text-slate-400"
                      }`}>
                        {hasPlayed ? `${m.homeScore} - ${m.awayScore}` : "- : -"}
                      </div>

                      {/* Away Player */}
                      <div className="flex items-center gap-2 justify-start flex-1 min-w-0 text-left">
                        {m.away?.teamFlag && (
                          <img src={m.away.teamFlag} alt="" className="w-4 h-3 rounded-sm shrink-0 border border-black/50" />
                        )}
                        <span className="text-xs font-bold text-white truncate">
                          {m.away ? (m.away.ign || m.away.name) : "Chưa bốc"}
                        </span>
                      </div>
                    </div>

                    {/* Right: Admin Update Score Button */}
                    {onOpenUpdateScore && (
                      <button
                        onClick={() =>
                          onOpenUpdateScore({
                            matchId: m.id,
                            title: `${m.time} • ${groupName}`,
                            homeName: m.home ? (m.home.ign || m.home.name) : "VĐV 1",
                            homeFlag: m.home?.teamFlag,
                            homeTeamName: m.home?.teamName,
                            homeScore: m.homeScore,
                            awayName: m.away ? (m.away.ign || m.away.name) : "VĐV 2",
                            awayFlag: m.away?.teamFlag,
                            awayTeamName: m.away?.teamName,
                            awayScore: m.awayScore,
                            status: m.status
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
                        title="Cập nhật tỉ số Admin"
                      >
                        <Edit2 className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>SỬA TỈ SỐ</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#101524] border-t border-[#1F273D] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
