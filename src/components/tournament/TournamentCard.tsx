"use client";

import Link from "next/link";
import { Trophy, Users, Calendar, Award, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface TournamentCardProps {
  id: string;
  title: string;
  description: string;
  format: "SINGLE_ELIMINATION" | "DOUBLE_ELIMINATION" | "GROUP_STAGE" | "ROUND_ROBIN" | "SWISS" | string;
  status: "DRAFT" | "REGISTRATION_OPEN" | "CHECK_IN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | string;
  maxPlayers: number;
  registeredCount: number;
  prizePool: string;
  startDate: Date | string;
  bannerUrl?: string | null;
}

export default function TournamentCard({
  id,
  title,
  description,
  format,
  status,
  maxPlayers,
  registeredCount,
  prizePool,
  startDate,
  bannerUrl,
}: TournamentCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE
          </span>
        );
      case "REGISTRATION_OPEN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-300">
            Open Registration
          </span>
        );
      case "CHECK_IN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
            Check-In Phase
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">
            Finished
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            Draft
          </span>
        );
    }
  };

  const getFormatLabel = () => {
    switch (format) {
      case "SINGLE_ELIMINATION":
        return "Single Elimination";
      case "DOUBLE_ELIMINATION":
        return "Double Elimination";
      case "GROUP_STAGE":
        return "Group Stage + Knockout";
      case "ROUND_ROBIN":
        return "Round Robin";
      case "SWISS":
        return "Swiss System";
      default:
        return format;
    }
  };

  const percent = Math.min(100, Math.round((registeredCount / maxPlayers) * 100));

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group bg-white border-slate-200">
      {/* Banner / Header Image */}
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-sky-50 to-emerald-50 flex items-center justify-center p-6 relative">
            <Trophy className="w-16 h-16 text-sky-500/20 group-hover:scale-110 group-hover:text-sky-500/30 transition-all" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {getStatusBadge()}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-xs">
            {getFormatLabel()}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {/* Prize & Dates */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Prize Pool</span>
                <span className="font-extrabold text-slate-900 truncate">{prizePool}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Start Date</span>
                <span className="font-extrabold text-slate-900 truncate">{formatDate(startDate)}</span>
              </div>
            </div>
          </div>

          {/* Participant Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-bold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                Participants
              </span>
              <span className="text-slate-900 font-black">
                {registeredCount} / {maxPlayers}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-sky-500 to-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 pt-0">
        <Link
          href={`/tournaments/${id}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-800 hover:text-sky-700 text-xs font-black flex items-center justify-center gap-2 transition-all group/btn"
        >
          View Tournament Bracket
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
