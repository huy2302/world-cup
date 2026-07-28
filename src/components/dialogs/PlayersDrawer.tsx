"use client";

import { useState } from "react";
import { Competitor } from "@/types/tournament";
import { X, Search, Shield, Trophy, Users, Eye, Sparkles } from "lucide-react";

interface PlayersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  players: Competitor[];
  onSelectCompetitor: (competitor: Competitor) => void;
}

export default function PlayersDrawer({ isOpen, onClose, players, onSelectCompetitor }: PlayersDrawerProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = players.filter((p) =>
    p.nickname.toLowerCase().includes(query.toLowerCase()) ||
    p.teamName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md h-full bg-[#080d19] border-l border-slate-800 p-6 flex flex-col gap-6 shadow-2xl animate-slideLeft">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white tracking-tight uppercase">
              REGISTERED PLAYERS ({players.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search competitor or team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1b253b] focus:border-cyan-400 text-xs text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl outline-none transition"
          />
        </div>

        {/* Player Roster List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((player, idx) => (
            <div
              key={player.id}
              onClick={() => {
                onSelectCompetitor(player);
                onClose();
              }}
              className="group bg-[#0d1424] hover:bg-[#121c32] border border-[#1b253b] hover:border-cyan-400 p-3 rounded-2xl flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400 w-5 text-center">
                  #{idx + 1}
                </span>

                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-700 group-hover:border-cyan-400 shrink-0">
                  <img src={player.avatar} alt={player.nickname} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-white group-hover:text-cyan-300 transition">
                    {player.nickname}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3 text-cyan-500" />
                    {player.teamName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-black text-amber-400 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3 fill-amber-400" />
                    {player.overallRating}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400">
                    {player.squad.formation}
                  </span>
                </div>

                <div className="w-7 h-7 rounded-lg bg-slate-900 group-hover:bg-cyan-500 text-slate-400 group-hover:text-black flex items-center justify-center transition">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
