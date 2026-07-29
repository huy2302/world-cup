"use client";

import { useState } from "react";
import { Trophy, Maximize2, Minus, Plus, RotateCcw } from "lucide-react";

interface TournamentHeaderProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onOpenRegister?: () => void;
}

export default function TournamentHeader({ onZoomIn, onZoomOut, onResetZoom, onOpenRegister }: TournamentHeaderProps) {
  const [activeTab, setActiveTab] = useState("BRACKET");
  const subTabs = ["BRACKET", "PLAYERS", "MATCHES", "STANDINGS", "STATS"];

  return (
    <div className="flex flex-col gap-3.5 pb-2 border-b border-[#161D2F] mb-3 select-none">

      {/* Top Row: Title & Register CTA Button */}
      <div className="flex items-center justify-between">

        {/* Title & Live Status Tag */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            FC Online Champions Cup 2026 - Season 1
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#7C3AED]/20 text-[#A855F7] border border-[#7C3AED]/40 uppercase tracking-wider">
              Live
            </span>
            <span className="text-xs text-slate-400 font-medium">
              May 20 – Jun 30, 2024
            </span>
          </div>
        </div>

        {/* Right CTA Button & Registration Countdown */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end leading-tight">
            <span className="text-[11px] text-slate-400 font-medium">
              Registration closes in
            </span>
            <span className="text-sm font-black text-white font-mono mt-0.5">
              03d : 12h : 45m
            </span>
          </div>

          <button
            onClick={onOpenRegister}
            className="purple-glow-btn text-white px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Trophy className="w-4 h-4 fill-white" />
            <span>Register Now</span>
          </button>
        </div>

      </div>

    </div>
  );
}
