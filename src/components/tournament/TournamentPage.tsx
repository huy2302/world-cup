"use client";

import { useState } from "react";
import { useNodesState } from "@xyflow/react";
import TournamentHeader from "./TournamentHeader";
import ReactFlowBracket, { INITIAL_BRACKET_NODES } from "../bracket/ReactFlowBracket";
import RightSidebar, { RegisteredPlayer } from "./RightSidebar";
import RegisterModal, { PlayerRegistrationForm } from "../dialogs/RegisterModal";
import PlayerDialog, { PlayerModalData } from "../dialogs/PlayerDialog";
import MatchDialog from "../dialogs/MatchDialog";
import { CompetitorData, MatchNodeData } from "../bracket/MatchNode";
import { buildSampleSquad } from "@/data/mockTournament";

const INITIAL_REGISTERED_PLAYERS: RegisteredPlayer[] = [
  { name: "FCPro_HuyDev", clubLogo: "https://flagcdn.com/w40/es.png" },
  { name: "Neuer_Wall", clubLogo: "https://flagcdn.com/w40/de.png" },
  { name: "VN_CyberDragon", clubLogo: "https://flagcdn.com/w40/vn.png" },
  { name: "Blitz_R9", clubLogo: "https://flagcdn.com/w40/br.png" },
  { name: "CR7_KingGamer", clubLogo: "https://flagcdn.com/w40/pt.png" },
  { name: "Coach_PepPro", clubLogo: "https://flagcdn.com/w40/es.png" },
  { name: "Shadow_FC4", clubLogo: "https://flagcdn.com/w40/fr.png" },
  { name: "LM10_GOAT", clubLogo: "https://flagcdn.com/w40/ar.png" },
  { name: "CyberStriker", clubLogo: "https://flagcdn.com/w40/gb-eng.png" },
  { name: "ViperKing", clubLogo: "https://flagcdn.com/w40/nl.png" },
  { name: "DragonEye", clubLogo: "https://flagcdn.com/w40/jp.png" },
  { name: "Kaiser_FC", clubLogo: "https://flagcdn.com/w40/kr.png" }
];

export default function TournamentPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_BRACKET_NODES);
  const [registeredPlayers, setRegisteredPlayers] = useState<RegisteredPlayer[]>(INITIAL_REGISTERED_PLAYERS);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchNodeData | null>(null);

  const handleRegisterSubmit = (form: PlayerRegistrationForm) => {
    // 1. Add to Registered Players list for RightSidebar
    const newPlayerItem: RegisteredPlayer = {
      name: form.ign,
      clubLogo: form.selectedTeam.flag,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${form.ign}`
    };
    setRegisteredPlayers((prev) => [...prev, newPlayerItem]);

    // 2. Find first empty slot in Round of 16 (nodes r16-1 through r16-8)
    setNodes((prevNodes) => {
      const copy = [...prevNodes];
      let updated = false;

      const playerSquad = buildSampleSquad(form.formation);

      for (let i = 0; i < 8; i++) {
        const node = copy[i];
        if (!node) continue;

        const data = { ...node.data };
        if (!data.home) {
          data.home = {
            name: form.fullName,
            ign: form.ign,
            teamName: form.selectedTeam.name,
            teamFlag: form.selectedTeam.flag,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${form.ign}`,
            score: null,
            formation: form.formation,
            squad: playerSquad,
          };
          copy[i] = { ...node, data };
          updated = true;
          break;
        } else if (!data.away) {
          data.away = {
            name: form.fullName,
            ign: form.ign,
            teamName: form.selectedTeam.name,
            teamFlag: form.selectedTeam.flag,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${form.ign}`,
            score: null,
            formation: form.formation,
            squad: playerSquad,
          };
          copy[i] = { ...node, data };
          updated = true;
          break;
        }
      }

      return updated ? copy : prevNodes;
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-[#070913] text-white font-sans antialiased overflow-x-hidden">
      {/* 2. Main Workspace Content Area (Offset by 220px for sidebar) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Main Content Grid: Bracket (75%) + Right Sidebar (25%) */}
        <main className="flex-1 p-6 flex flex-col xl:flex-row gap-6 overflow-y-auto w-full">

          {/* Central Bracket Canvas Section (~75% width) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0C0F1D] border border-[#192033] rounded-3xl p-6 shadow-2xl">
            <TournamentHeader onOpenRegister={() => setIsRegisterOpen(true)} />
            <ReactFlowBracket
              nodes={nodes}
              onNodesChange={onNodesChange}
              registeredCount={registeredPlayers.length}
              onSelectMatch={(matchData) => setSelectedMatch(matchData)}
            />
          </div>

          {/* Right Info & Progress Sidebar (~25% width) */}
          <RightSidebar registeredPlayers={registeredPlayers} />

        </main>
      </div>

      {/* Player Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={handleRegisterSubmit}
      />

      {/* Match Details Modal (Clicking any node) */}
      {selectedMatch && (
        <MatchDialog
          matchData={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onOpenRegister={() => {
            setSelectedMatch(null);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {/* Player Details & Lineup Pitch Modal */}
      {selectedCompetitor && (
        <PlayerDialog
          competitor={selectedCompetitor as PlayerModalData}
          onClose={() => setSelectedCompetitor(null)}
        />
      )}

    </div>
  );
}
