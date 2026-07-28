"use client";

import { Competitor, Match } from "@/types/tournament";
import { Trophy, Flame, Play, Clock, Sparkles } from "lucide-react";

interface MatchCardProps {
  match: Match;
  onSelectPlayer: (competitor: Competitor) => void;
  onSimulateMatch?: (matchId: string) => void;
}

export default function MatchCard({ match, onSelectPlayer, onSimulateMatch }: MatchCardProps) {
  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";

  const renderSide = (competitor: Competitor | null, score: number | null, isWinner: boolean) => {
    if (!competitor) {
      return (
        <div className="flex items-center justify-between p-2.5 bg-[#090e1a]/60 text-slate-500 rounded-lg">
          <span className="text-xs font-mono italic">TBD</span>
          <span className="text-xs font-mono font-bold text-slate-600">-</span>
        </div>
      );
    }

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelectPlayer(competitor);
        }}
        className={`group/competitor flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
          isWinner
            ? "bg-gradient-to-r from-[#0d1c30] to-[#072436] border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            : "bg-[#090e1a]/90 hover:bg-[#11192e] border-slate-800/80 hover:border-cyan-500/50 text-slate-200"
        }`}
      >
        {/* Left Competitor Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Competitor Avatar */}
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 group-hover/competitor:border-cyan-400 shrink-0">
            <img src={competitor.avatar} alt={competitor.nickname} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 p-0.5 bg-black/80">
              <img src={competitor.clubLogo} alt="Club" className="w-2.5 h-2.5 object-contain" />
            </div>
          </div>

          <div className="flex flex-col min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-black truncate ${isWinner ? "text-cyan-300" : "text-white"}`}>
                {competitor.nickname}
              </span>
              {isWinner && <Trophy className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate">
              {competitor.teamName}
            </span>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black border ${
            isWinner
              ? "bg-cyan-500 text-black border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
              : isFinished
              ? "bg-slate-900 text-slate-300 border-slate-800"
              : "bg-slate-950 text-slate-500 border-slate-900"
          }`}>
            {score !== null ? score : "-"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-72 sm:w-80 p-3 rounded-2xl transition-all duration-300 select-none ${
        isLive
          ? "cyber-card-live"
          : isFinished
          ? "cyber-card-winner"
          : "cyber-panel"
      }`}
    >
      {/* Node Top Status Bar */}
      <div className="flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            M#{match.matchNumber} • {match.roundName}
          </span>
        </div>

        {/* Match Status Badge */}
        {isLive && (
          <div className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
            LIVE {match.liveMinute || ""}
          </div>
        )}

        {isFinished && (
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
            FINISHED
          </span>
        )}

        {!isLive && !isFinished && (
          <button
            onClick={() => onSimulateMatch?.(match.id)}
            className="text-[9px] font-bold text-amber-400 hover:text-white bg-amber-500/10 hover:bg-amber-500/30 px-2 py-0.5 rounded-full border border-amber-500/30 transition flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5 fill-current" /> SIM
          </button>
        )}
      </div>

      {/* Competitors List */}
      <div className="flex flex-col gap-1.5">
        {renderSide(
          match.homePlayer,
          match.homeScore,
          match.winnerId !== null && match.winnerId === match.homePlayer?.id
        )}

        {renderSide(
          match.awayPlayer,
          match.awayScore,
          match.winnerId !== null && match.winnerId === match.awayPlayer?.id
        )}
      </div>
    </div>
  );
}
