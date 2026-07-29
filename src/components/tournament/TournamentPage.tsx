"use client";

import { useState, useMemo } from "react";
import { useNodesState } from "@xyflow/react";
import TournamentHeader from "./TournamentHeader";
import ReactFlowBracket, { INITIAL_BRACKET_NODES } from "../bracket/ReactFlowBracket";
import RightSidebar, { RegisteredPlayer } from "./RightSidebar";
import RegisterModal, { PlayerRegistrationForm } from "../dialogs/RegisterModal";
import TournamentRulesModal from "../dialogs/TournamentRulesModal";
import PlayerDialog, { PlayerModalData } from "../dialogs/PlayerDialog";
import PlayersDrawer from "../dialogs/PlayersDrawer";
import MatchDialog from "../dialogs/MatchDialog";
import { CompetitorData, MatchNodeData } from "../bracket/MatchNode";
import { buildSampleSquad } from "@/data/mockTournament";
import { registerParticipant } from "@/actions/tournament-actions";

interface TournamentPageProps {
  initialTournament?: any;
}

const DEFAULT_REGISTERED_PLAYERS: RegisteredPlayer[] = [
  { name: "FCPro_HuyDev", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/es.png" },
  { name: "Neuer_Wall", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/de.png" },
  { name: "VN_CyberDragon", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/vn.png" },
  { name: "Blitz_R9", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/br.png" },
  { name: "CR7_KingGamer", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/pt.png" },
  { name: "Coach_PepPro", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/es.png" },
  { name: "Shadow_FC4", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/fr.png" },
  { name: "LM10_GOAT", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/ar.png" },
  { name: "CyberStriker", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/gb-eng.png" },
  { name: "ViperKing", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/nl.png" },
  { name: "DragonEye", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/jp.png" },
  { name: "Kaiser_FC", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/kr.png" }
];

const getFlagUrl = (teamName?: string | null): string => {
  if (!teamName) return "https://flagcdn.com/w40/es.png";
  const name = teamName.toLowerCase();
  if (name.includes("đức") || name.includes("germany")) return "https://flagcdn.com/w40/de.png";
  if (name.includes("việt nam") || name.includes("vietnam")) return "https://flagcdn.com/w40/vn.png";
  if (name.includes("brazil")) return "https://flagcdn.com/w40/br.png";
  if (name.includes("bồ đào nha") || name.includes("portugal")) return "https://flagcdn.com/w40/pt.png";
  if (name.includes("tây ban nha") || name.includes("spain")) return "https://flagcdn.com/w40/es.png";
  if (name.includes("pháp") || name.includes("france")) return "https://flagcdn.com/w40/fr.png";
  if (name.includes("argentina")) return "https://flagcdn.com/w40/ar.png";
  if (name.includes("anh") || name.includes("england")) return "https://flagcdn.com/w40/gb-eng.png";
  if (name.includes("hà lan") || name.includes("netherlands")) return "https://flagcdn.com/w40/nl.png";
  if (name.includes("nhật") || name.includes("japan")) return "https://flagcdn.com/w40/jp.png";
  if (name.includes("hàn") || name.includes("korea")) return "https://flagcdn.com/w40/kr.png";
  return "https://flagcdn.com/w40/es.png";
};

export default function TournamentPage({ initialTournament }: TournamentPageProps) {
  // Build bracket nodes from DB matches if available
  const initialNodes = useMemo(() => {
    if (!initialTournament?.matches?.length) return INITIAL_BRACKET_NODES;

    const copy = JSON.parse(JSON.stringify(INITIAL_BRACKET_NODES));
    const matches = initialTournament.matches;

    // Map Round 1 (round of 16 matches) by matching node id "r16-{matchNumber}"
    const round1Matches = matches.filter((m: any) => m.round === 1);
    round1Matches.forEach((m: any) => {
      const targetNodeIndex = copy.findIndex((n: any) => n.id === `r16-${m.matchNumber}`);
      if (targetNodeIndex !== -1) {
        copy[targetNodeIndex].data = {
          ...copy[targetNodeIndex].data,
          home: m.homePlayer
            ? {
              name: m.homePlayer.username,
              ign: m.homePlayer.ign || m.homePlayer.username,
              teamName: m.homePlayer.favoriteClub || "Tây Ban Nha",
              teamFlag: getFlagUrl(m.homePlayer.favoriteClub),
              avatar: m.homePlayer.avatarUrl || `https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80`,
              score: m.status === "COMPLETED" ? m.homeScore : null,
              formation: "4-2-3-1",
              squad: buildSampleSquad("4-2-3-1"),
            }
            : null,
          away: m.awayPlayer
            ? {
              name: m.awayPlayer.username,
              ign: m.awayPlayer.ign || m.awayPlayer.username,
              teamName: m.awayPlayer.favoriteClub || "Đức",
              teamFlag: getFlagUrl(m.awayPlayer.favoriteClub),
              avatar: m.awayPlayer.avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
              score: m.status === "COMPLETED" ? m.awayScore : null,
              formation: "4-3-3",
              squad: buildSampleSquad("4-3-3"),
            }
            : null,
        };
      }
    });

    return copy;
  }, [initialTournament]);

  // Build registered players list directly synchronized with DB registrations & active bracket nodes
  const dbRegisteredPlayers = useMemo(() => {
    if (initialTournament?.registrations?.length) {
      return initialTournament.registrations.map((reg: any) => ({
        name: reg.user?.ign || reg.user?.username || "Player",
        avatar: reg.user?.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
        clubLogo: getFlagUrl(reg.user?.favoriteClub),
      }));
    }

    // Extract players from initialNodes to ensure 100% synchronization
    const playersFromNodes: RegisteredPlayer[] = [];
    initialNodes.forEach((node: any) => {
      if (node.data?.home) {
        playersFromNodes.push({
          name: node.data.home.ign || node.data.home.name,
          avatar: node.data.home.avatar,
          clubLogo: node.data.home.teamFlag,
        });
      }
      if (node.data?.away) {
        playersFromNodes.push({
          name: node.data.away.ign || node.data.away.name,
          avatar: node.data.away.avatar,
          clubLogo: node.data.away.teamFlag,
        });
      }
    });

    return playersFromNodes.length > 0 ? playersFromNodes : DEFAULT_REGISTERED_PLAYERS;
  }, [initialTournament, initialNodes]);

  // Build tournament info & stats from DB
  const tournamentInfo = useMemo(() => {
    const matches = initialTournament?.matches || [];
    const completedCount = matches.filter((m: any) => m.status === "COMPLETED").length;
    const totalCount = matches.length || 7;

    return {
      organizer: "FC Online Trung Quốc (China)",
      prizePool: "100 QQ",
      type: initialTournament?.format?.replace("_", " ") || "Single Elimination",
      stage: initialTournament?.status === "IN_PROGRESS" ? "Round of 16 (Knockout)" : initialTournament?.status || "Round of 16 (Knockout)",
      completedMatches: completedCount > 0 ? completedCount : 4,
      totalMatches: totalCount,
    };
  }, [initialTournament]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [registeredPlayers, setRegisteredPlayers] = useState<RegisteredPlayer[]>(dbRegisteredPlayers);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isPlayersDrawerOpen, setIsPlayersDrawerOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchNodeData | null>(null);

  // Synchronized drawer competitors mapped directly from active bracket nodes
  const drawerCompetitors = useMemo(() => {
    const list: any[] = [];
    nodes.forEach((node: any) => {
      if (node.data?.home) {
        list.push({
          id: `comp-home-${node.id}`,
          nickname: node.data.home.ign || node.data.home.name,
          fconlineUid: `FCO-${10000 + list.length}`,
          teamName: node.data.home.teamName || "Đội tuyển",
          clubLogo: node.data.home.teamFlag || "https://flagcdn.com/w40/es.png",
          avatar: node.data.home.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          rank: "Challenger 1050P",
          overallRating: 118,
          squad: node.data.home.squad || buildSampleSquad("4-2-3-1"),
        });
      }
      if (node.data?.away) {
        list.push({
          id: `comp-away-${node.id}`,
          nickname: node.data.away.ign || node.data.away.name,
          fconlineUid: `FCO-${10000 + list.length}`,
          teamName: node.data.away.teamName || "Đội tuyển",
          clubLogo: node.data.away.teamFlag || "https://flagcdn.com/w40/de.png",
          avatar: node.data.away.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
          rank: "Challenger 1050P",
          overallRating: 118,
          squad: node.data.away.squad || buildSampleSquad("4-3-3"),
        });
      }
    });

    if (list.length > 0) return list;

    return registeredPlayers.map((p, idx) => ({
      id: `comp-${idx}`,
      nickname: p.name,
      fconlineUid: `FCO-${10000 + idx}`,
      teamName: "Đội tuyển",
      clubLogo: p.clubLogo || "https://flagcdn.com/w40/es.png",
      avatar: p.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rank: "Challenger 1050P",
      overallRating: 118,
      squad: buildSampleSquad("4-2-3-1"),
    }));
  }, [nodes, registeredPlayers]);

  const handleRegisterSubmit = async (form: PlayerRegistrationForm) => {
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${form.ign}`;

    // 1. Add to Registered Players list for RightSidebar
    const newPlayerItem: RegisteredPlayer = {
      name: form.ign,
      clubLogo: form.selectedTeam.flag,
      avatar: avatarUrl,
    };
    setRegisteredPlayers((prev) => [...prev, newPlayerItem]);

    // Persist registration to database if active tournament ID exists
    if (initialTournament?.id) {
      await registerParticipant(initialTournament.id);
    }

    // 2. Find first empty slot across all Round of 16 nodes (r16-1 through r16-8)
    setNodes((prevNodes) => {
      const copy = [...prevNodes];
      let updated = false;

      const playerSquad = buildSampleSquad(form.formation);
      const r16NodeIds = ["r16-1", "r16-2", "r16-3", "r16-4", "r16-5", "r16-6", "r16-7", "r16-8"];

      for (const id of r16NodeIds) {
        const nodeIndex = copy.findIndex((n: any) => n.id === id);
        if (nodeIndex === -1) continue;

        const node = copy[nodeIndex];
        const data = { ...node.data };

        if (!data.home) {
          data.home = {
            name: form.fullName,
            ign: form.ign,
            teamName: form.selectedTeam.name,
            teamFlag: form.selectedTeam.flag,
            avatar: avatarUrl,
            score: null,
            formation: form.formation,
            squad: playerSquad,
          };
          copy[nodeIndex] = { ...node, data };
          updated = true;
          break;
        } else if (!data.away) {
          data.away = {
            name: form.fullName,
            ign: form.ign,
            teamName: form.selectedTeam.name,
            teamFlag: form.selectedTeam.flag,
            avatar: avatarUrl,
            score: null,
            formation: form.formation,
            squad: playerSquad,
          };
          copy[nodeIndex] = { ...node, data };
          updated = true;
          break;
        }
      }

      return updated ? copy : prevNodes;
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-[#070913] text-white font-sans antialiased overflow-x-hidden">
      {/* Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Main Content Grid: Bracket (75%) + Right Sidebar (25%) */}
        <main className="flex-1 p-6 flex flex-col xl:flex-row gap-6 overflow-y-auto w-full">

          {/* Central Bracket Canvas Section (~75% width) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0C0F1D] border border-[#192033] rounded-3xl p-6 shadow-2xl">
            <TournamentHeader
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenRules={() => setIsRulesOpen(true)}
            />
            <ReactFlowBracket
              nodes={nodes}
              onNodesChange={onNodesChange}
              registeredCount={registeredPlayers.length}
              onSelectMatch={(matchData) => setSelectedMatch(matchData)}
            />
          </div>

          {/* Right Info & Progress Sidebar (~25% width) */}
          <RightSidebar
            registeredPlayers={registeredPlayers}
            tournamentInfo={tournamentInfo}
            onOpenPlayersDrawer={() => setIsPlayersDrawerOpen(true)}
          />

        </main>
      </div>

      {/* Tournament Rules Modal */}
      <TournamentRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Players List Drawer */}
      <PlayersDrawer
        isOpen={isPlayersDrawerOpen}
        onClose={() => setIsPlayersDrawerOpen(false)}
        players={drawerCompetitors}
        onSelectCompetitor={(comp) => setSelectedCompetitor(comp as unknown as CompetitorData)}
      />

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
