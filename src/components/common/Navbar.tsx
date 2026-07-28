"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Shield, LogIn, LogOut, PlusCircle, AlertCircle, Shirt } from "lucide-react";
import { logoutUser } from "@/actions/auth-actions";
import { formatSquadValue } from "@/lib/utils";

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    role: "ADMIN" | "PLAYER";
    ign: string;
    squadValue?: bigint | number;
    eloRating?: number;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/90 px-4 lg:px-8 py-3 bg-white/85">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-slate-900">FC ONLINE</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-200">PRO</span>
            </div>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase block font-medium">Tournament Manager</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <Link
            href="/tournaments"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              pathname.startsWith("/tournaments")
                ? "bg-white text-sky-700 border border-slate-200 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Trophy className="w-4 h-4 text-sky-600" />
            Tournaments
          </Link>
          <Link
            href="/squad"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              pathname === "/squad"
                ? "bg-white text-sky-700 border border-slate-200 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Shirt className="w-4 h-4 text-emerald-600" />
            FC Squad Builder
          </Link>
          <Link
            href="/leaderboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              pathname === "/leaderboard"
                ? "bg-white text-sky-700 border border-slate-200 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Shield className="w-4 h-4 text-amber-600" />
            Leaderboard
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                pathname.startsWith("/admin")
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm"
                  : "text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Action / Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "ADMIN" && (
                <Link
                  href="/tournaments/create"
                  className="cyber-button px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sky-500/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  New Tourney
                </Link>
              )}

              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900 flex items-center justify-end gap-1.5">
                  {user.ign || user.username}
                  {user.role === "ADMIN" && (
                    <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-200">ADMIN</span>
                  )}
                </span>
                <span className="text-[11px] text-sky-600 font-mono font-bold">
                  {user.squadValue ? formatSquadValue(user.squadValue) : "Coach"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 transition"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
              <Link
                href="/register"
                className="cyber-button px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
