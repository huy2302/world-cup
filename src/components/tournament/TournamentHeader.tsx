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

      {/* Bottom Row: Sub-Tabs & Zoom Controls */}
      <div className="flex items-center justify-between pt-1">
        
        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-6">
          {subTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 text-xs font-black uppercase tracking-wider transition ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] shadow-[0_0_8px_#7c3aed]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Zoom Control Toolbar Pill */}
        <div className="bg-[#0F1322] border border-[#1D263B] p-1 rounded-xl flex items-center gap-0.5">
          <button
            onClick={onResetZoom}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D263B] transition"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D263B] transition"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomIn}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D263B] transition"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onResetZoom}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D263B] transition"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
