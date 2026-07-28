"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Gamepad2,
  Shirt,
  BarChart3,
  Settings,
  Sun,
  Moon,
  Disc as Discord,
  Youtube,
  Facebook,
  Instagram
} from "lucide-react";

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Tournaments", icon: Trophy },
    { name: "Players", icon: Users },
    { name: "Matches", icon: Gamepad2 },
    { name: "Squads", icon: Shirt },
    { name: "Statistics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-[220px] h-screen bg-[#0A0D18] border-r border-[#161D2F] flex flex-col justify-between p-3.5 shrink-0 fixed left-0 top-0 z-50 select-none shadow-2xl">
      
      {/* Top Section: Logo & Theme Switch */}
      <div className="flex flex-col gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white font-black text-xs shadow-[0_0_12px_rgba(124,58,237,0.6)]">
            <Trophy className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white font-sans">
            FC ONLINE
          </span>
        </div>

        {/* Theme Switcher Toggle Pill */}
        <div className="bg-[#121727] border border-[#1E273D] p-1 rounded-xl flex items-center justify-between mx-0.5">
          <button
            onClick={() => setTheme("light")}
            className={`w-1/2 py-1 rounded-lg flex items-center justify-center transition ${
              theme === "light" ? "bg-[#7C3AED] text-white" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`w-1/2 py-1 rounded-lg flex items-center justify-center transition ${
              theme === "dark" ? "bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Moon className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition duration-150 ${
                  isActive
                    ? "bg-[#201636] text-white border border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#121727]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#8B5CF6]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Promo Card & Social Icons */}
      <div className="flex flex-col gap-3 pb-2">
        
        {/* FC Online Champions Cup Promo Card */}
        <div className="relative rounded-2xl p-3.5 bg-gradient-to-b from-[#13192B] to-[#0A0D18] border border-[#202940] overflow-hidden text-center flex flex-col items-center gap-2 group shadow-lg">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Title */}
          <div className="flex flex-col items-center leading-tight z-10">
            <span className="font-black text-[10px] tracking-wider text-white uppercase">
              FC ONLINE
            </span>
            <span className="font-black text-xs text-[#A855F7] tracking-tight uppercase mt-0.5">
              CHAMPIONS CUP 2026
            </span>
          </div>

          {/* 3D Trophy Graphic */}
          <div className="relative w-16 h-18 my-0.5 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#7C3AED]/30 rounded-full blur-md"></div>
            <Trophy className="w-12 h-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] relative z-10" />
          </div>

          {/* Caption */}
          <p className="text-[10px] text-slate-400 leading-snug font-medium z-10 px-0.5">
            The biggest FC Online tournament of the year. Are you ready?
          </p>
        </div>

        {/* Social Icons Bar */}
        <div className="flex items-center justify-around text-slate-500 px-1 py-1">
          <button className="hover:text-purple-400 transition"><Discord className="w-3.5 h-3.5" /></button>
          <button className="hover:text-purple-400 transition"><Youtube className="w-3.5 h-3.5" /></button>
          <button className="hover:text-purple-400 transition"><Facebook className="w-3.5 h-3.5" /></button>
          <button className="hover:text-purple-400 transition"><Instagram className="w-3.5 h-3.5" /></button>
        </div>

      </div>
    </aside>
  );
}
