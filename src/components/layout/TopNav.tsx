"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { logoutUser } from "@/actions/auth-actions";

interface TopNavProps {
  tournamentTitle?: string;
  tournamentStatus?: string;
  currentRound?: string;
  user?: {
    id: string;
    username: string;
    role: "ADMIN" | "PLAYER";
    ign: string;
    avatarUrl?: string | null;
  } | null;
  onSearchPlayer?: (query: string) => void;
}

export default function TopNav({
  tournamentTitle = "FC Online World Championship 2024",
  user,
  onSearchPlayer,
}: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchPlayer?.(e.target.value);
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <header className="bg-[#060911] border-b border-[#161f30] px-6 py-3.5 z-40">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-6">
        {/* Left Tournament Title & Status */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-extrabold text-base text-white tracking-tight">
                {tournamentTitle}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                Live
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
              May 20 – Jun 30, 2024
            </span>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="hidden md:flex items-center gap-8">
          <button className="relative py-2 text-xs font-black text-white tracking-widest uppercase">
            <span>BRACKET</span>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_#8b5cf6]"></span>
          </button>
          <Link href="/leaderboard" className="text-xs font-bold text-slate-400 hover:text-white transition tracking-widest uppercase">
            PLAYERS
          </Link>
          <Link href="/tournaments" className="text-xs font-bold text-slate-400 hover:text-white transition tracking-widest uppercase">
            MATCHES
          </Link>
          <Link href="/leaderboard" className="text-xs font-bold text-slate-400 hover:text-white transition tracking-widest uppercase">
            STANDINGS
          </Link>
          <Link href="/leaderboard" className="text-xs font-bold text-slate-400 hover:text-white transition tracking-widest uppercase">
            STATS
          </Link>
        </div>

        {/* Right Search & Profile */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search bar with ⌘K badge */}
          <div className="w-64 lg:w-72 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#121926] text-xs text-white placeholder-slate-400 pl-9 pr-8 py-2 rounded-xl border border-[#1d2638] focus:border-purple-500 outline-none transition"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-[#1a2334] px-1.5 py-0.5 rounded border border-[#27344c]">
              ⌘K
            </span>
          </div>

          {/* Bell Notification */}
          <button className="relative w-9 h-9 rounded-xl bg-[#121926] border border-[#1d2638] flex items-center justify-center text-slate-300 hover:text-white transition">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-mono text-[9px] font-bold flex items-center justify-center border border-[#060911]">
              3
            </span>
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleLogout}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.ign} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-purple-400">
                    {(user.ign || user.username).substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight hidden sm:flex">
                <span className="text-xs font-bold text-white">
                  {user.ign || user.username}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {user.role === "ADMIN" ? "Legendary" : "Pro Coach"}
                </span>
              </div>
            </div>
          ) : (
            <Link href="/login" className="cyber-button px-4 py-2 rounded-xl text-xs font-bold">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
