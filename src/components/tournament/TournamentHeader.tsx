"use client";

import { useState, useEffect } from "react";
import { Trophy, FileText, Dices, Users, MessageSquare } from "lucide-react";

interface TournamentHeaderProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onOpenRegister?: () => void;
  onOpenRules?: () => void;
  onOpenDraw?: () => void;
}

export default function TournamentHeader({ onOpenRegister, onOpenRules, onOpenDraw }: TournamentHeaderProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-08-03T19:00:00+07:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTwoDigits = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col gap-3.5 pb-2 border-b border-[#161D2F] mb-3 select-none">
      {/* Top Row: Title & Register CTA Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              Deadline: 19:00 • 03/08/2026 (GMT+7)
            </span>
          </div>
        </div>

        {/* Right CTA Buttons & Registration Countdown */}
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="flex flex-col items-end leading-tight mr-1">
            <span className="text-[11px] text-slate-400 font-medium">
              Registration closes in
            </span>
            <span className="text-sm font-black text-white font-mono mt-0.5">
              {!mounted ? (
                "04d : 20h : 19m"
              ) : timeLeft.isExpired ? (
                <span className="text-red-400">Closed</span>
              ) : (
                `${formatTwoDigits(timeLeft.days)}d : ${formatTwoDigits(timeLeft.hours)}h : ${formatTwoDigits(timeLeft.minutes)}m : ${formatTwoDigits(timeLeft.seconds)}s`
              )}
            </span>
          </div>

          {/* Group Facebook Link Button */}
          <a
            href="https://www.facebook.com/groups/911390207964785"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900/80 hover:bg-blue-800 text-white border border-blue-500/50 hover:border-blue-400 px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-blue-950/40"
          >
            <Users className="w-4 h-4 text-blue-300" />
            <span>Group FB</span>
          </a>

          {/* Discord Server Link Button */}
          <a
            href="https://discord.gg/7uxP3fTED"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5865F2]/80 hover:bg-[#4752C4] text-white border border-[#5865F2]/50 hover:border-indigo-400 px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-indigo-950/40"
          >
            <MessageSquare className="w-4 h-4 text-indigo-200" />
            <span>Discord</span>
          </a>

          {/* Tournament Rules Button */}
          <button
            onClick={onOpenRules}
            className="bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-cyan-950/40"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Thể thức giải đấu</span>
          </button>

          {/* Admin Draw Button */}
          <button
            onClick={onOpenDraw}
            className="bg-[#1A1230] hover:bg-purple-900/80 text-amber-300 border border-amber-500/40 hover:border-amber-400 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-950/40"
          >
            <Dices className="w-4 h-4 text-amber-400" />
            <span>Quay giải (Admin)</span>
          </button>

          {/* Register Button */}
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
