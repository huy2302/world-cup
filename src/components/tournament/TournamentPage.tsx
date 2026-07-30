"use client";

import { useState, useMemo } from "react";
import { useNodesState } from "@xyflow/react";
import { Sparkles } from "lucide-react";
import TournamentHeader from "./TournamentHeader";
import ReactFlowBracket, { INITIAL_BRACKET_NODES } from "../bracket/ReactFlowBracket";
import RightSidebar, { RegisteredPlayer } from "./RightSidebar";
import RegisterModal, { PlayerRegistrationForm, NationalTeam, WORLD_CUP_TEAMS } from "../dialogs/RegisterModal";
import TournamentRulesModal from "../dialogs/TournamentRulesModal";
import PlayerDialog, { PlayerModalData } from "../dialogs/PlayerDialog";
import PlayersDrawer from "../dialogs/PlayersDrawer";
import MatchDialog from "../dialogs/MatchDialog";
import GroupDialog from "../dialogs/GroupDialog";
import AdminPasswordModal from "../dialogs/AdminPasswordModal";
import DrawModal from "../dialogs/DrawModal";
import UpdateScoreModal, { ScoreUpdateTarget } from "../dialogs/UpdateScoreModal";
import { sortGroupTeams, formatGroupTeamToCompetitor } from "@/lib/group-utils";
import { GroupNodeData } from "../bracket/GroupNode";
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
  { name: "LM10_GOAT", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/ar.png" },
  { name: "Shadow_FC4", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/fr.png" },
  { name: "CyberStriker", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/gb-eng.png" },
  { name: "ViperKing", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/nl.png" },
  { name: "DragonEye", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/jp.png" },
  { name: "Kaiser_FC", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80", clubLogo: "https://flagcdn.com/w40/kr.png" }
];

const getFlagUrl = (teamName?: string | null): string => {
  if (!teamName) return "https://flagcdn.com/w40/es.png";
  const found = WORLD_CUP_TEAMS.find((t) => t.name.toLowerCase() === teamName.toLowerCase());
  return found ? found.flag : "https://flagcdn.com/w40/es.png";
};

const SAMPLE_UNASSIGNED_PLAYERS = [
  { name: "FCPro_HuyDev", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80" },
  { name: "Neuer_Wall", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" },
  { name: "VN_CyberDragon", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80" },
  { name: "Blitz_R9", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80" },
  { name: "CR7_KingGamer", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
  { name: "Coach_PepPro", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
  { name: "LM10_GOAT", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80" },
  { name: "Shadow_FC4", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "CyberStriker", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { name: "ViperKing", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
  { name: "DragonEye", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
  { name: "Kaiser_FC", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80" }
];

export default function TournamentPage({ initialTournament }: TournamentPageProps) {
  const initialNodes = useMemo(() => {
    return INITIAL_BRACKET_NODES;
  }, [initialTournament]);

  // Build registered players list directly synchronized
  const dbRegisteredPlayers = useMemo(() => {
    return SAMPLE_UNASSIGNED_PLAYERS.map(p => ({
      name: p.name,
      avatar: p.avatar,
      clubLogo: ""
    }));
  }, [initialTournament]);

  // Build tournament info & stats from DB
  const tournamentInfo = useMemo(() => {
    return {
      organizer: "FC Online Trung Quốc (China)",
      prizePool: "100 QQ",
      type: "4 Bảng (12 Đội) • Top 1 Vào Bán Kết",
      stage: "Vòng Bảng -> Bán Kết -> Chung Kết",
      completedMatches: 0,
      totalMatches: 16,
    };
  }, [initialTournament]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [registeredPlayers, setRegisteredPlayers] = useState<RegisteredPlayer[]>(dbRegisteredPlayers);
  const [unassignedPlayers, setUnassignedPlayers] = useState<{ name: string; avatar?: string }[]>(SAMPLE_UNASSIGNED_PLAYERS);
  const [assignedTeams, setAssignedTeams] = useState<string[]>([]);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isPlayersDrawerOpen, setIsPlayersDrawerOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchNodeData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupNodeData | null>(null);

  // Admin Draw states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [animatingDrawInfo, setAnimatingDrawInfo] = useState<{ player: string; team: NationalTeam } | null>(null);

  // Synchronized drawer competitors mapped directly from active bracket nodes
  const drawerCompetitors = useMemo(() => {
    const list: any[] = [];
    nodes.forEach((node: any) => {
      if (node.type === "groupNode" && node.data?.teams) {
        node.data.teams.forEach((t: any) => {
          list.push({
            id: `comp-${t.id}`,
            nickname: t.ign || t.name,
            fconlineUid: `FCO-${10000 + list.length}`,
            teamName: t.teamName || "Đội tuyển",
            clubLogo: t.teamFlag || "https://flagcdn.com/w40/es.png",
            avatar: t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            rank: "Challenger 1050P",
            overallRating: 118,
            squad: buildSampleSquad("4-2-3-1"),
          });
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

    // Add to unassigned players waiting list for admin draw
    setUnassignedPlayers((prev) => [
      ...prev,
      { name: form.ign, avatar: avatarUrl }
    ]);

    if (initialTournament?.id) {
      await registerParticipant(initialTournament.id);
    }
  };

  // Admin Score Update states
  const [pendingScoreUpdateMatch, setPendingScoreUpdateMatch] = useState<ScoreUpdateTarget | null>(null);
  const [activeScoreUpdateMatch, setActiveScoreUpdateMatch] = useState<ScoreUpdateTarget | null>(null);

  const handleOpenDraw = () => {
    setPendingScoreUpdateMatch(null);
    if (!isAdminUnlocked) {
      setIsAdminPassModalOpen(true);
    } else {
      setIsDrawModalOpen(true);
    }
  };

  const handleTriggerUpdateScore = (matchTarget: ScoreUpdateTarget) => {
    if (!isAdminUnlocked) {
      setPendingScoreUpdateMatch(matchTarget);
      setIsAdminPassModalOpen(true);
    } else {
      setActiveScoreUpdateMatch(matchTarget);
    }
  };

  const handleAdminPassSuccess = () => {
    setIsAdminUnlocked(true);
    setIsAdminPassModalOpen(false);
    if (pendingScoreUpdateMatch) {
      setActiveScoreUpdateMatch(pendingScoreUpdateMatch);
      setPendingScoreUpdateMatch(null);
    } else {
      setIsDrawModalOpen(true);
    }
  };

  // Perform Score Update & Recalculate Group Standings / Bracket Nodes
  const handleSaveMatchScore = (matchId: string, homeScore: number, awayScore: number, status: string) => {
    let updatedGroupData: GroupNodeData | null = null;
    let updatedMatchData: MatchNodeData | null = null;

    setNodes((prevNodes) => {
      // Step 1: Update target node
      const nodesAfterUpdate = prevNodes.map((n) => {
        // 1. Knockout match node
        if (n.id === matchId && n.type === "matchNode") {
          const newData = {
            ...n.data,
            status,
            home: (n.data as any).home ? { ...(n.data as any).home, score: homeScore } : null,
            away: (n.data as any).away ? { ...(n.data as any).away, score: awayScore } : null,
          };
          updatedMatchData = newData as MatchNodeData;
          return {
            ...n,
            data: newData
          };
        }

        // 2. Group node match update
        if (n.type === "groupNode") {
          const isTargetGroup = matchId.startsWith(n.id);
          const existingMatches = (n.data as any).matches || [];
          const updatedMatches = [...existingMatches];

          if (isTargetGroup) {
            const matchIndex = updatedMatches.findIndex((m) => m.id === matchId);
            if (matchIndex >= 0) {
              updatedMatches[matchIndex] = { ...updatedMatches[matchIndex], homeScore, awayScore, status };
            } else {
              updatedMatches.push({ id: matchId, homeScore, awayScore, status });
            }

            const groupTeams = [...((n.data as any).teams || [])];
            // Reset stats before recalculating
            groupTeams.forEach((t) => {
              t.played = 0;
              t.won = 0;
              t.drawn = 0;
              t.lost = 0;
              t.goalsFor = 0;
              t.goalsAgainst = 0;
              t.goalDifference = 0;
              t.points = 0;
            });

            // Recalculate based on completed matches in this group
            updatedMatches.forEach((m) => {
              if (m.homeScore !== null && m.homeScore !== undefined && m.awayScore !== null && m.awayScore !== undefined) {
                const matchPairs = [
                  [groupTeams[0], groupTeams[1]],
                  [groupTeams[1], groupTeams[2]],
                  [groupTeams[0], groupTeams[2]]
                ];
                const matchIdxStr = m.id.slice(-1);
                const pairIndex = parseInt(matchIdxStr, 10) - 1;
                const pair = matchPairs[pairIndex >= 0 && pairIndex < 3 ? pairIndex : 0];

                if (pair && pair[0] && pair[1]) {
                  const t1 = pair[0];
                  const t2 = pair[1];
                  const s1 = m.homeScore;
                  const s2 = m.awayScore;

                  t1.played += 1;
                  t2.played += 1;
                  t1.goalsFor += s1;
                  t1.goalsAgainst += s2;
                  t2.goalsFor += s2;
                  t2.goalsAgainst += s1;

                  if (s1 > s2) {
                    t1.won += 1;
                    t1.points += 3;
                    t2.lost += 1;
                  } else if (s2 > s1) {
                    t2.won += 1;
                    t2.points += 3;
                    t1.lost += 1;
                  } else {
                    t1.drawn += 1;
                    t2.drawn += 1;
                    t1.points += 1;
                    t2.points += 1;
                  }

                  t1.goalDifference = t1.goalsFor - t1.goalsAgainst;
                  t2.goalDifference = t2.goalsFor - t2.goalsAgainst;
                }
              }
            });

            const newData = {
              ...n.data,
              teams: groupTeams,
              matches: updatedMatches
            };
            updatedGroupData = newData as unknown as GroupNodeData;

            return {
              ...n,
              data: newData
            };
          }
        }

        return n;
      });

      // Step 2: Auto-advance Top 1 of Groups A, B, C, D into Semi-Finals (SF1: Top A vs Top B, SF2: Top C vs Top D)
      const groupANode = nodesAfterUpdate.find((n) => n.id === "group-a");
      const groupBNode = nodesAfterUpdate.find((n) => n.id === "group-b");
      const groupCNode = nodesAfterUpdate.find((n) => n.id === "group-c");
      const groupDNode = nodesAfterUpdate.find((n) => n.id === "group-d");

      const topA = (groupANode?.data as any)?.teams ? sortGroupTeams((groupANode?.data as any).teams, (groupANode?.data as any).matches)[0] : null;
      const topB = (groupBNode?.data as any)?.teams ? sortGroupTeams((groupBNode?.data as any).teams, (groupBNode?.data as any).matches)[0] : null;
      const topC = (groupCNode?.data as any)?.teams ? sortGroupTeams((groupCNode?.data as any).teams, (groupCNode?.data as any).matches)[0] : null;
      const topD = (groupDNode?.data as any)?.teams ? sortGroupTeams((groupDNode?.data as any).teams, (groupDNode?.data as any).matches)[0] : null;

      const isGroupAComplete = ((groupANode?.data as any)?.matches || []).filter((m: any) => m.homeScore !== null && m.awayScore !== null).length >= 1;
      const isGroupBComplete = ((groupBNode?.data as any)?.matches || []).filter((m: any) => m.homeScore !== null && m.awayScore !== null).length >= 1;
      const isGroupCComplete = ((groupCNode?.data as any)?.matches || []).filter((m: any) => m.homeScore !== null && m.awayScore !== null).length >= 1;
      const isGroupDComplete = ((groupDNode?.data as any)?.matches || []).filter((m: any) => m.homeScore !== null && m.awayScore !== null).length >= 1;

      return nodesAfterUpdate.map((n) => {
        // Semi-Final 1 (Nhất A vs Nhất B)
        if (n.id === "sf-1" && n.type === "matchNode") {
          const currentHome = (n.data as any).home;
          const currentAway = (n.data as any).away;
          const newHome = isGroupAComplete && topA ? formatGroupTeamToCompetitor(topA) : currentHome;
          const newAway = isGroupBComplete && topB ? formatGroupTeamToCompetitor(topB) : currentAway;
          return {
            ...n,
            data: {
              ...n.data,
              home: newHome ? { ...newHome, score: currentHome?.score ?? null } : null,
              away: newAway ? { ...newAway, score: currentAway?.score ?? null } : null,
            }
          };
        }

        // Semi-Final 2 (Nhất C vs Nhất D)
        if (n.id === "sf-2" && n.type === "matchNode") {
          const currentHome = (n.data as any).home;
          const currentAway = (n.data as any).away;
          const newHome = isGroupCComplete && topC ? formatGroupTeamToCompetitor(topC) : currentHome;
          const newAway = isGroupDComplete && topD ? formatGroupTeamToCompetitor(topD) : currentAway;
          return {
            ...n,
            data: {
              ...n.data,
              home: newHome ? { ...newHome, score: currentHome?.score ?? null } : null,
              away: newAway ? { ...newAway, score: currentAway?.score ?? null } : null,
            }
          };
        }

        return n;
      });
    });

    if (updatedGroupData) {
      setSelectedGroup(updatedGroupData);
    }
    if (updatedMatchData) {
      setSelectedMatch(updatedMatchData);
    }

    setActiveScoreUpdateMatch(null);
  };

  // Perform single random draw (bốc thăm 1 người)
  const handleDrawOne = async (player: { name: string }, team: NationalTeam) => {
    // 1. Temporarily hide DrawModal to show full main canvas animation
    setIsDrawModalOpen(false);
    setAnimatingDrawInfo({ player: player.name, team });

    const groupNodeIds = ["group-a", "group-b", "group-c", "group-d"];

    // 2. Play glowing light animation flickering across group nodes on ReactFlow Canvas
    let flickers = 0;
    const maxFlickers = 12;

    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        const activeNodeId = groupNodeIds[flickers % groupNodeIds.length];

        setNodes((prevNodes) =>
          prevNodes.map((n) => {
            if (n.type === "groupNode") {
              return {
                ...n,
                data: {
                  ...n.data,
                  isHighlighted: n.id === activeNodeId
                }
              };
            }
            return n;
          })
        );

        flickers++;
        if (flickers >= maxFlickers) {
          clearInterval(interval);
          resolve();
        }
      }, 140);
    });

    // 3. Find group with available slots (< 3 teams), otherwise pick random
    let targetGroupId = groupNodeIds[0];
    const availableGroups = nodes.filter((n) => {
      if (n.type !== "groupNode") return false;
      const t = (n.data as any).teams || [];
      return t.length < 3;
    });

    if (availableGroups.length > 0) {
      const randomAvail = availableGroups[Math.floor(Math.random() * availableGroups.length)];
      targetGroupId = randomAvail.id;
    } else {
      targetGroupId = groupNodeIds[Math.floor(Math.random() * groupNodeIds.length)];
    }

    // 4. Highlight target group node and insert player
    setNodes((prevNodes) => {
      return prevNodes.map((n) => {
        if (n.id === targetGroupId && n.type === "groupNode") {
          const currentTeams = [...((n.data as any).teams || [])];
          const newTeamEntry = {
            id: `t-draw-${Date.now()}`,
            name: player.name,
            ign: player.name,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${player.name}`,
            teamName: team.name,
            teamFlag: team.flag,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0
          };

          return {
            ...n,
            data: {
              ...n.data,
              teams: [...currentTeams, newTeamEntry],
              isHighlighted: true
            }
          };
        }
        return {
          ...n,
          data: {
            ...n.data,
            isHighlighted: false
          }
        };
      });
    });

    // Update unassigned and assigned teams states
    setUnassignedPlayers((prev) => prev.filter((p) => p.name !== player.name));
    setAssignedTeams((prev) => [...prev, team.name]);
    setRegisteredPlayers((prev) => [
      ...prev,
      { name: player.name, clubLogo: team.flag, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${player.name}` }
    ]);

    // Keep settled node highlighted and banner visible for 1.8 seconds, then re-open DrawModal
    await new Promise((r) => setTimeout(r, 1800));

    setAnimatingDrawInfo(null);
    setNodes((prevNodes) =>
      prevNodes.map((n) => ({
        ...n,
        data: { ...n.data, isHighlighted: false }
      }))
    );

    // Re-open DrawModal so Admin can draw the next player!
    setIsDrawModalOpen(true);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#070913] text-white font-sans antialiased overflow-x-hidden">
      {/* Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Grid: Bracket (75%) + Right Sidebar (25%) */}
        <main className="flex-1 p-6 flex flex-col xl:flex-row gap-6 w-full">
          {/* Central Bracket Canvas Section (~75% width) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0C0F1D] border border-[#192033] rounded-3xl p-6 shadow-2xl">
            <TournamentHeader
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenRules={() => setIsRulesOpen(true)}
              onOpenDraw={handleOpenDraw}
            />
            <ReactFlowBracket
              nodes={nodes}
              onNodesChange={onNodesChange}
              registeredCount={registeredPlayers.length}
              onSelectMatch={(matchData) => setSelectedMatch(matchData)}
              onSelectGroup={(groupData) => setSelectedGroup(groupData)}
            />
          </div>

          {/* Right Info & Progress Sidebar (~25% width) */}
          <RightSidebar
            registeredPlayers={registeredPlayers}
            tournamentInfo={tournamentInfo}
            onOpenPlayersDrawer={() => setIsPlayersDrawerOpen(true)}
            onOpenGroupSelect={() => {
              const firstGroup = nodes.find((n) => n.type === "groupNode");
              if (firstGroup) {
                setSelectedGroup(firstGroup.data as unknown as GroupNodeData);
              }
            }}
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

      {/* Admin Password Authentication Modal (Pass: 2323) */}
      <AdminPasswordModal
        isOpen={isAdminPassModalOpen}
        onClose={() => setIsAdminPassModalOpen(false)}
        onSuccess={handleAdminPassSuccess}
      />

      {/* Admin Draw Modal */}
      <DrawModal
        isOpen={isDrawModalOpen}
        onClose={() => setIsDrawModalOpen(false)}
        registeredPlayers={unassignedPlayers}
        assignedTeams={assignedTeams}
        onDrawOne={handleDrawOne}
        onDrawAll={async () => {}}
        onResetDraw={() => {
          setNodes(INITIAL_BRACKET_NODES);
          setUnassignedPlayers(SAMPLE_UNASSIGNED_PLAYERS);
          setAssignedTeams([]);
          setRegisteredPlayers(SAMPLE_UNASSIGNED_PLAYERS.map(p => ({ name: p.name, avatar: p.avatar, clubLogo: "" })));
        }}
      />

      {/* Group Stage Details Modal (Clicking any group node) */}
      {selectedGroup && (
        <GroupDialog
          groupData={selectedGroup}
          onClose={() => setSelectedGroup(null)}
          onOpenUpdateScore={handleTriggerUpdateScore}
        />
      )}

      {/* Match Details Modal (Clicking any match node) */}
      {selectedMatch && (
        <MatchDialog
          matchData={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onOpenRegister={() => {
            setSelectedMatch(null);
            setIsRegisterOpen(true);
          }}
          onOpenUpdateScore={handleTriggerUpdateScore}
        />
      )}

      {/* Admin Score Update Modal */}
      {activeScoreUpdateMatch && (
        <UpdateScoreModal
          matchInfo={activeScoreUpdateMatch}
          isOpen={!!activeScoreUpdateMatch}
          onClose={() => setActiveScoreUpdateMatch(null)}
          onSave={handleSaveMatchScore}
        />
      )}

      {/* Player Details & Lineup Pitch Modal */}
      {selectedCompetitor && (
        <PlayerDialog
          competitor={selectedCompetitor as PlayerModalData}
          onClose={() => setSelectedCompetitor(null)}
        />
      )}

      {/* Floating Live Animation Banner during Tree Node Draw */}
      {animatingDrawInfo && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl bg-[#0E1324]/95 border-2 border-amber-400 text-white shadow-[0_0_40px_rgba(251,191,36,0.9)] backdrop-blur-md flex items-center gap-4 animate-bounce select-none pointer-events-none">
          <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400 flex items-center justify-center text-amber-300 font-extrabold text-xl shadow-inner shrink-0">
            ⚽
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> BỐC THĂM VỊ TRÍ BẢNG ĐẤU DÀNH CHO:
            </span>
            <span className="text-sm font-extrabold text-white flex items-center gap-2 mt-0.5">
              <strong className="text-purple-300 text-base">{animatingDrawInfo.player}</strong>
              <span className="text-slate-400 text-xs">nhận</span>
              <img
                src={animatingDrawInfo.team.flag}
                alt={animatingDrawInfo.team.name}
                className="w-5 h-3.5 rounded-sm object-cover border border-black/60 shadow"
              />
              <span className="text-amber-300 font-black text-base">{animatingDrawInfo.team.name}</span>
              {animatingDrawInfo.team.tier && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  animatingDrawInfo.team.tier === "S" ? "bg-red-950 text-red-400 border border-red-500/50" :
                  animatingDrawInfo.team.tier === "A" ? "bg-amber-950 text-amber-400 border border-amber-500/50" :
                  animatingDrawInfo.team.tier === "B" ? "bg-yellow-950 text-yellow-300 border border-yellow-500/50" :
                  "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                }`}>
                  {animatingDrawInfo.team.tier === "S" && "🔴 Tier S"}
                  {animatingDrawInfo.team.tier === "A" && "🟠 Tier A"}
                  {animatingDrawInfo.team.tier === "B" && "🟡 Tier B"}
                  {animatingDrawInfo.team.tier === "C" && "🟢 Tier C"}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
