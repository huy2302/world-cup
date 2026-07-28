"use client";

import { Zap, User as UserIcon } from "lucide-react";
import FootballPitch from "./FootballPitch";
import { buildSampleSquad } from "@/data/mockTournament";

interface SquadFormationProps {
  squad?: any;
}

export default function SquadFormation({ squad }: SquadFormationProps) {
  const sample = buildSampleSquad("4-2-3-1");

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d1424]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-black text-xs border border-cyan-500/40">
              {squad?.formation || "4-2-3-1"}
            </span>
            <h3 className="text-lg font-extrabold text-white">{squad?.club || "FC Online"} Team Roster</h3>
          </div>
        </div>
      </div>

      <FootballPitch squad={sample} />
    </div>
  );
}
