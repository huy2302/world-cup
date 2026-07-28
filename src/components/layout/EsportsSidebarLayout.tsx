"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Swords,
  Shirt,
  BarChart3,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function EsportsSidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Tournaments", href: "/tournaments", icon: Trophy },
    { label: "Players", href: "/leaderboard", icon: Users },
    { label: "Matches", href: "/", icon: Swords },
    { label: "Squads", href: "/squad", icon: Shirt },
    { label: "Statistics", href: "/leaderboard", icon: BarChart3 },
    { label: "Settings", href: "/admin", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#060911] text-slate-100 font-sans selection:bg-[#00f0ff] selection:text-slate-950">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0c1017] border-r border-[#192233] flex flex-col justify-between p-4 shrink-0 hidden lg:flex z-30">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 px-2 py-1 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#060911] rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#00f0ff]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-wider text-white uppercase leading-none">
                FC ONLINE
              </span>
              <span className="font-bold text-[10px] tracking-widest text-slate-400 uppercase">
                TOURNAMENT
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#182338] text-white border border-[#2b3a59] shadow-md shadow-cyan-500/5 text-[#00f0ff]"
                      : "text-slate-400 hover:text-white hover:bg-[#121926]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#00f0ff]" : "text-slate-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Theme Switcher */}
        <div className="pt-4 border-t border-[#192233]">
          <div className="bg-[#121926] p-1 rounded-xl flex items-center justify-between border border-[#192233]">
            <button className="p-2 rounded-lg text-slate-500 hover:text-white transition">
              <Sun className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-[#182338] text-[#00f0ff] shadow-xs">
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
