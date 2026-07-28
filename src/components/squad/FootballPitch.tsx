"use client";

import { useState } from "react";
import FootballCard from "./FootballCard";
import PlayerInfoDialog from "./PlayerInfoDialog";
import { FootballPlayerDetail } from "./PlayerDetailModal";

export interface SquadPlayerItem {
  id: string;
  pitchPosition: string;
  cardLevel: number;
  footballPlayer: FootballPlayerDetail;
}

interface FootballPitchProps {
  formation?: string;
  players: SquadPlayerItem[];
}

export default function FootballPitch({ formation = "4-2-3-1", players }: FootballPitchProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<FootballPlayerDetail | null>(null);

  // Formations coordinate lookup maps (percentage top, left)
  const formationCoords: Record<string, Record<string, { top: string; left: string }>> = {
    "4-2-3-1": {
      ST: { top: "12%", left: "50%" },
      LW: { top: "25%", left: "20%" },
      CAM: { top: "28%", left: "50%" },
      RW: { top: "25%", left: "80%" },
      CM: { top: "45%", left: "50%" },
      LDM: { top: "48%", left: "32%" },
      RDM: { top: "48%", left: "68%" },
      LB: { top: "72%", left: "18%" },
      LCB: { top: "75%", left: "38%" },
      RCB: { top: "75%", left: "62%" },
      RB: { top: "72%", left: "82%" },
      GK: { top: "90%", left: "50%" },
    },
    "4-3-3": {
      LW: { top: "15%", left: "22%" },
      ST: { top: "12%", left: "50%" },
      RW: { top: "15%", left: "78%" },
      LCM: { top: "38%", left: "30%" },
      CM: { top: "42%", left: "50%" },
      RCM: { top: "38%", left: "70%" },
      LB: { top: "72%", left: "18%" },
      LCB: { top: "75%", left: "38%" },
      RCB: { top: "75%", left: "62%" },
      RB: { top: "72%", left: "82%" },
      GK: { top: "90%", left: "50%" },
    },
  };

  const currentMap = formationCoords[formation] || formationCoords["4-2-3-1"];

  // Separate starters and bench
  const starterPositions = Object.keys(currentMap);
  const starters = players.slice(0, 11);
  const benchPlayers = players.length > 11 ? players.slice(11) : players.slice(0, 7);

  return (
    <div className="space-y-4">
      {/* 2D/3D Perspective Grass Pitch Canvas */}
      <div className="relative w-full h-[520px] bg-gradient-to-b from-emerald-900 via-emerald-850 to-emerald-950 rounded-3xl border-2 border-emerald-500/40 overflow-hidden shadow-2xl p-4 perspective-1000">
        {/* Pitch Stripes & Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_40px]"></div>
          <div className="absolute inset-4 border-2 border-white rounded-2xl"></div>
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-4 left-1/2 w-72 h-32 border-2 border-white border-t-0 -translate-x-1/2"></div>
          <div className="absolute bottom-4 left-1/2 w-72 h-32 border-2 border-white border-b-0 -translate-x-1/2"></div>
        </div>

        {/* 11 Players on Pitch */}
        {starters.map((item, idx) => {
          const posKey = item.pitchPosition || starterPositions[idx] || "ST";
          const coords = currentMap[posKey] || { top: "50%", left: "50%" };
          const p = item.footballPlayer;

          return (
            <div
              key={item.id || idx}
              style={{ top: coords.top, left: coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <FootballCard
                name={p.name}
                position={posKey}
                overall={p.overall}
                season={p.season}
                cardLevel={item.cardLevel || p.cardLevel}
                portrait={p.portrait}
                isSelected={selectedPlayer?.name === p.name}
                onClick={() => setSelectedPlayer(p)}
              />
            </div>
          );
        })}
      </div>

      {/* Substitutes Bench Bar (Image 2 Bottom Row) */}
      <div className="bg-[#141b27]/90 p-4 rounded-2xl border border-[#202a3d] space-y-2">
        <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
          Substitutes Bench
        </span>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {benchPlayers.map((item, idx) => {
            const p = item.footballPlayer;
            return (
              <FootballCard
                key={`bench-${item.id || idx}`}
                name={p.name}
                position={item.pitchPosition || "SUB"}
                overall={p.overall}
                season={p.season}
                cardLevel={item.cardLevel || p.cardLevel}
                portrait={p.portrait}
                onClick={() => setSelectedPlayer(p)}
              />
            );
          })}
        </div>
      </div>

      {/* Football Player Attribute Popup */}
      <PlayerInfoDialog player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </div>
  );
}
