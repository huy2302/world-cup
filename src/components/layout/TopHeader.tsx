"use client";

import { useState } from "react";
import { Search, Bell, LogIn } from "lucide-react";

export default function TopHeader() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navTabs = ["Dashboard", "Tournaments", "Players", "Matches", "Squads", "Statistics", "Settings"];

  return (
    <header className="w-full h-16 bg-[#070913] border-b border-[#161D2F] px-6 flex items-center justify-between z-30 shrink-0 select-none">
      
      {/* Left Top Sub-Nav Links */}
      <nav className="flex items-center gap-7">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-5 text-xs font-bold transition-all ${
                isActive ? "text-white font-extrabold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] shadow-[0_0_10px_#7c3aed]"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Search, Bell, Sign In */}
      <div className="flex items-center gap-3.5">
        
        {/* Search Bar */}
        <div className="relative w-52">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search player..."
            className="w-full bg-[#0F1322] text-xs text-white placeholder-slate-400 pl-8 pr-12 py-1.5 rounded-xl border border-[#1D263B] focus:border-[#7C3AED] outline-none transition"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-[#161D2F] px-1.5 py-0.5 rounded border border-[#232D44]">
            Ctrl K
          </span>
        </div>

        {/* Notification Bell */}
        <button className="relative w-8 h-8 rounded-xl bg-[#0F1322] border border-[#1D263B] flex items-center justify-center text-slate-300 hover:text-white transition">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#7C3AED] text-white font-mono text-[9px] font-bold flex items-center justify-center border border-[#070913]">
            1
          </span>
        </button>

        {/* Sign In Primary CTA Button */}
        <button className="purple-glow-btn text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition">
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>

      </div>
    </header>
  );
}
