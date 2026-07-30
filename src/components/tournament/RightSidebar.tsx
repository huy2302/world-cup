"use client";

import { Users, ExternalLink, Share2, Trophy, LayoutGrid, MessageSquare } from "lucide-react";

export interface RegisteredPlayer {
  name: string;
  avatar?: string;
  clubLogo?: string;
}

export interface TournamentInfo {
  type?: string;
  organizer?: string;
  prizePool?: string;
  stage?: string;
  totalMatches?: number;
  completedMatches?: number;
}

interface RightSidebarProps {
  registeredPlayers?: RegisteredPlayer[];
  tournamentInfo?: TournamentInfo;
  onOpenPlayersDrawer?: () => void;
  onOpenGroupSelect?: () => void;
}

const DEFAULT_PLAYERS: RegisteredPlayer[] = [
  {
    name: "FCPro_HuyDev",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/es.png"
  },
  {
    name: "Neuer_Wall",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/de.png"
  },
  {
    name: "VN_CyberDragon",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/vn.png"
  },
  {
    name: "Blitz_R9",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/br.png"
  },
  {
    name: "CR7_KingGamer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/pt.png"
  },
  {
    name: "Coach_PepPro",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/es.png"
  },
  {
    name: "Shadow_FC4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/fr.png"
  },
  {
    name: "LM10_GOAT",
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/ar.png"
  },
  {
    name: "CyberStriker",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/gb-eng.png"
  },
  {
    name: "ViperKing",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/nl.png"
  },
  {
    name: "DragonEye",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/jp.png"
  },
  {
    name: "Kaiser_FC",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80",
    clubLogo: "https://flagcdn.com/w40/kr.png"
  }
];

export default function RightSidebar({
  registeredPlayers = DEFAULT_PLAYERS,
  tournamentInfo,
  onOpenPlayersDrawer,
  onOpenGroupSelect
}: RightSidebarProps) {
  const count = registeredPlayers.length;

  const organizer = tournamentInfo?.organizer || "FC Online Trung Quốc (China)";
  const prizePool = tournamentInfo?.prizePool || "100 QQ";
  const type = tournamentInfo?.type || "4 Bảng (12 Đội) • Top 1 Vào Bán Kết";
  const stage = tournamentInfo?.stage || "Vòng Bảng -> Bán Kết -> Chung Kết";

  const completedMatches = tournamentInfo?.completedMatches ?? 0;
  const totalMatches = tournamentInfo?.totalMatches ?? 16;
  const remainingMatches = Math.max(0, totalMatches - completedMatches);
  const progressPercent = totalMatches > 0 ? Math.round((completedMatches / totalMatches) * 100) : 0;

  return (
    <aside className="w-full xl:w-[340px] flex flex-col gap-4 select-none shrink-0 max-h-[calc(100vh-100px)] overflow-y-auto pr-1 text-slate-200 custom-scrollbar sticky top-4">

      {/* TOP CARD 1: CỘNG ĐỒNG FACEBOOK & DISCORD (NỔI BẬT HÀNG ĐẦU) */}
      <div className="bg-gradient-to-r from-blue-950/90 via-[#101B3B] to-indigo-950/90 border-2 border-indigo-500/60 rounded-2xl p-4 flex flex-col gap-3 shadow-[0_0_25px_rgba(99,102,241,0.4)]">
        <div className="flex items-center justify-between border-b border-indigo-500/40 pb-2">
          <h3 className="text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>KÊNH CỘNG ĐỒNG CHÍNH THỨC</span>
          </h3>
        </div>

        <p className="text-[11px] text-indigo-100 font-medium leading-relaxed">
          Tham gia kênh Facebook & Discord FC Online Trung Quốc để giao hữu, nhận thông báo trận đấu & cập nhật kết quả!
        </p>

        <div className="flex flex-col gap-2 pt-1">
          {/* Facebook Group Link */}
          <a
            href="https://www.facebook.com/groups/911390207964785"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-between transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-white" />
              <span>Group Facebook FC Online</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
          </a>

          {/* Discord Server Link */}
          <a
            href="https://discord.gg/7uxP3fTED"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-extrabold text-xs flex items-center justify-between transition-all shadow-md shadow-[#5865F2]/40 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Server Discord FC Online</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
          </a>
        </div>
      </div>

      {/* Card 2: TOURNAMENT INFO */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-5 flex flex-col gap-3.5 shadow-lg">
        <h3 className="text-[11px] font-black text-white uppercase tracking-wider border-b border-[#1D263B] pb-3 flex items-center justify-between">
          <span>THÔNG TIN GIẢI ĐẤU</span>
          <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-950 text-purple-300 border border-purple-800">
            12 ĐỘI
          </span>
        </h3>

        <div className="flex flex-col gap-2.5 text-xs font-medium">
          <div className="flex justify-between items-center py-1.5 px-2.5 rounded-xl bg-[#070913]/60 border border-[#161D2F]">
            <span className="text-slate-400 text-[11px]">Thể thức</span>
            <span className="font-bold text-white text-[11px] text-right truncate max-w-[170px]">{type}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 px-2.5 rounded-xl bg-[#070913]/60 border border-[#161D2F]">
            <span className="text-slate-400 text-[11px]">Số VĐV đăng ký</span>
            <span className="font-bold text-[#00f0ff] font-mono text-[11px]">{count} / 12 Đội</span>
          </div>
          <div className="flex justify-between items-center py-1.5 px-2.5 rounded-xl bg-[#070913]/60 border border-[#161D2F]">
            <span className="text-slate-400 text-[11px]">Giai đoạn</span>
            <span className="font-bold text-amber-400 text-[11px]">{stage}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 px-2.5 rounded-xl bg-[#070913]/60 border border-[#161D2F]">
            <span className="text-slate-400 text-[11px]">Giải thưởng</span>
            <span className="font-extrabold text-white font-mono text-[11px]">{prizePool}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 px-2.5 rounded-xl bg-[#070913]/60 border border-[#161D2F]">
            <span className="text-slate-400 text-[11px]">Ban Tổ Chức</span>
            <span className="font-bold text-white text-[11px]">{organizer}</span>
          </div>
        </div>
      </div>

      {/* Card 3: REGISTERED PLAYERS */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-5 flex flex-col gap-3.5 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#1D263B] pb-3">
          <h3 className="text-[11px] font-black text-white uppercase tracking-wider">
            DANH SÁCH VĐV ĐĂNG KÝ <span className="text-cyan-400 font-mono">({count})</span>
          </h3>
        </div>

        {/* Player List */}
        <div className="flex flex-col gap-2 my-0.5 max-h-60 overflow-y-auto pr-1">
          {registeredPlayers.map((player, idx) => (
            <div key={`${player.name}-${idx}`} className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#070913]/40 border border-[#141A2D] hover:bg-[#161D2F]/70 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={player.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={player.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#232D44] shrink-0"
                />
                <span className="text-xs font-bold text-slate-200 truncate">
                  {player.name}
                </span>
              </div>
              {player.clubLogo ? (
                <img src={player.clubLogo} alt="Team" className="w-5 h-3.5 object-cover rounded-sm border border-black/50 shrink-0" />
              ) : (
                <span className="text-[10px] italic text-slate-500 font-medium">Chưa bốc</span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <button
          onClick={onOpenPlayersDrawer}
          className="w-full text-center text-xs font-extrabold text-[#A855F7] hover:text-white transition pt-2 border-t border-[#1D263B] cursor-pointer"
        >
          Xem Toàn Bộ VĐV ({count}) ▶
        </button>
      </div>

      {/* Card 4: TOURNAMENT PROGRESS */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-5 flex flex-col gap-3.5 shadow-lg mb-4">
        <h3 className="text-[11px] font-black text-white uppercase tracking-wider border-b border-[#1D263B] pb-3">
          TIẾN ĐỘ GIẢI ĐẤU
        </h3>

        <div className="flex items-center justify-between gap-4 pt-1">
          {/* Circular Donut Progress Ring */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#161D2F]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#7C3AED]"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center leading-none text-center">
              <span className="text-xs font-black text-white font-mono">{progressPercent}%</span>
              <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">ĐÃ ĐẤU</span>
            </div>
          </div>

          {/* Right Stats Breakdown */}
          <div className="flex flex-col gap-2 flex-1 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Tổng số trận</span>
              <span className="font-extrabold text-white font-mono">{totalMatches}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Đã hoàn thành</span>
              <span className="font-extrabold text-emerald-400 font-mono">{completedMatches}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Còn lại</span>
              <span className="font-extrabold text-amber-400 font-mono">{remainingMatches}</span>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
