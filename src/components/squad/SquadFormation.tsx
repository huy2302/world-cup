"use client";

import { Zap, User as UserIcon } from "lucide-react";
import FootballPitch, { SquadPlayerItem } from "./FootballPitch";

interface SquadFormationProps {
  squad: {
    id: string;
    club: string;
    formation: string;
    manager: string;
    totalSalary: number;
    maxSalary: number;
    squadPlayers: SquadPlayerItem[];
  };
}

export default function SquadFormation({ squad }: SquadFormationProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800 font-black text-xs border border-sky-200">
              {squad.formation}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">{squad.club} Team Roster</h3>
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
            Manager: <span className="text-slate-900 font-bold">{squad.manager}</span>
          </p>
        </div>

        {/* Salary Limit */}
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
          <Zap className="w-4 h-4 text-amber-500" />
          <div>
            <span className="text-[9px] text-slate-500 uppercase block font-bold">Salary Limit</span>
            <span className="text-xs font-black font-mono text-slate-900">
              <span className={squad.totalSalary > squad.maxSalary ? "text-red-600" : "text-emerald-700"}>
                {squad.totalSalary}
              </span>{" "}
              / {squad.maxSalary} BP
            </span>
          </div>
        </div>
      </div>

      {/* Football Field Pitch */}
      <FootballPitch formation={squad.formation} players={squad.squadPlayers} />
    </div>
  );
}
