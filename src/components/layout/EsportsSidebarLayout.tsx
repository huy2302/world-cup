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
      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
