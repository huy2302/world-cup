"use client";

export interface RegisteredPlayer {
  name: string;
  avatar?: string;
  clubLogo?: string;
}

interface RightSidebarProps {
  registeredPlayers?: RegisteredPlayer[];
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

export default function RightSidebar({ registeredPlayers = DEFAULT_PLAYERS }: RightSidebarProps) {
  const count = registeredPlayers.length;

  return (
    <aside className="w-full xl:w-[320px] flex flex-col gap-4 select-none shrink-0">
      
      {/* Card 1: TOURNAMENT INFO */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-4.5 flex flex-col gap-3 shadow-lg">
        <h3 className="text-[11px] font-black text-white uppercase tracking-wider border-b border-[#1D263B] pb-2.5">
          TOURNAMENT INFO
        </h3>

        <div className="flex flex-col gap-2.5 text-xs font-medium">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Tournament Type</span>
            <span className="font-bold text-white">Single Elimination</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Participants</span>
            <span className="font-bold text-[#00f0ff] font-mono">{count} / 16</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Current Stage</span>
            <span className="font-bold text-amber-400">Round of 16 (Registration)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Prize Pool</span>
            <span className="font-extrabold text-white font-mono">100.000 FC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Organizer</span>
            <span className="font-bold text-white">FC Online Esports</span>
          </div>
        </div>
      </div>

      {/* Card 2: REGISTERED PLAYERS (12/16) */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-4.5 flex flex-col gap-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#1D263B] pb-2.5">
          <h3 className="text-[11px] font-black text-white uppercase tracking-wider">
            REGISTERED PLAYERS <span className="text-cyan-400 font-mono">({count}/16)</span>
          </h3>
        </div>

        {/* Player List */}
        <div className="flex flex-col gap-2 my-0.5 max-h-64 overflow-y-auto pr-1">
          {registeredPlayers.map((player, idx) => (
            <div key={`${player.name}-${idx}`} className="flex items-center justify-between py-0.5">
              <div className="flex items-center gap-2.5">
                <img
                  src={player.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={player.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#232D44]"
                />
                <span className="text-xs font-bold text-slate-200">
                  {player.name}
                </span>
              </div>
              {player.clubLogo && (
                <img src={player.clubLogo} alt="Team" className="w-4 h-3 object-cover rounded-sm border border-black/40" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <button className="w-full text-center text-xs font-extrabold text-[#A855F7] hover:text-white transition pt-2 border-t border-[#1D263B]">
          View All Players ({count})
        </button>
      </div>

      {/* Card 3: TOURNAMENT PROGRESS */}
      <div className="bg-[#0F1322] border border-[#1D263B] rounded-2xl p-4.5 flex flex-col gap-3 shadow-lg">
        <h3 className="text-[11px] font-black text-white uppercase tracking-wider border-b border-[#1D263B] pb-2.5">
          TOURNAMENT PROGRESS
        </h3>

        <div className="flex items-center justify-between gap-4 pt-1">
          
          {/* Circular Donut Progress Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                className="text-[#161D2F]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Purple Progress Arc (0%) */}
              <path
                className="text-[#7C3AED]"
                strokeDasharray="0, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center leading-none text-center">
              <span className="text-sm font-black text-white font-mono">0%</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">COMPLETED</span>
            </div>
          </div>

          {/* Right Stats Breakdown */}
          <div className="flex flex-col gap-2 flex-1 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Matches Played</span>
              <span className="font-extrabold text-white font-mono">0 / 15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Matches Completed</span>
              <span className="font-extrabold text-white font-mono">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Remaining</span>
              <span className="font-extrabold text-white font-mono">15</span>
            </div>
          </div>

        </div>
      </div>

    </aside>
  );
}
