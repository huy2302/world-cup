"use server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { tournamentSchema, TournamentInput } from "@/lib/zod-schemas";
import {
  generateSingleEliminationMatches,
  generateDoubleEliminationMatches,
  generateGroupStageMatches,
  generateRoundRobinMatches,
  generateSwissMatches,
} from "@/lib/bracket-engine";
import { revalidatePath } from "next/cache";

export async function createTournament(input: TournamentInput) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const parse = tournamentSchema.safeParse(input);
  if (!parse.success) {
    return { error: parse.error.issues[0].message };
  }

  const data = parse.data;

  const tournament = await db.tournament.create({
    data: {
      title: data.title,
      description: data.description,
      format: data.format,
      maxPlayers: data.maxPlayers,
      prizePool: data.prizePool,
      rules: data.rules,
      bannerUrl: data.bannerUrl || null,
      startDate: new Date(data.startDate),
      checkInMinutes: data.checkInMinutes,
      status: "DRAFT",
    },
  });

  revalidatePath("/");
  revalidatePath("/tournaments");

  return { success: true, tournamentId: tournament.id };
}

export async function updateTournament(id: string, input: Partial<TournamentInput>) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const tournament = await db.tournament.update({
    where: { id },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.format && { format: input.format }),
      ...(input.maxPlayers && { maxPlayers: input.maxPlayers }),
      ...(input.prizePool && { prizePool: input.prizePool }),
      ...(input.rules && { rules: input.rules }),
      ...(input.startDate && { startDate: new Date(input.startDate) }),
      ...(input.checkInMinutes && { checkInMinutes: input.checkInMinutes }),
    },
  });

  revalidatePath(`/tournaments/${id}`);
  return { success: true, tournament };
}

export async function deleteTournament(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  await db.tournament.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/tournaments");

  return { success: true };
}

export async function updateTournamentStatus(id: string, status: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  await db.tournament.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/tournaments/${id}`);
  return { success: true };
}

export async function registerParticipant(tournamentId: string) {
  const session = await getSession();
  if (!session) {
    return { error: "Please log in to register for tournaments." };
  }

  const tournament = await db.tournament.findUnique({
    where: { id: tournamentId },
    include: { registrations: true },
  });

  if (!tournament) return { error: "Tournament not found" };

  if (tournament.status !== "REGISTRATION_OPEN" && tournament.status !== "DRAFT") {
    return { error: "Registration is not open for this tournament." };
  }

  if (tournament.registrations.length >= tournament.maxPlayers) {
    return { error: "Tournament is full." };
  }

  const existing = await db.registration.findUnique({
    where: {
      tournamentId_userId: { tournamentId, userId: session.id },
    },
  });

  if (existing) {
    return { error: "You are already registered." };
  }

  const nextSeed = tournament.registrations.length + 1;

  await db.registration.create({
    data: {
      tournamentId,
      userId: session.id,
      seedNumber: nextSeed,
      isCheckedIn: false,
    },
  });

  revalidatePath(`/tournaments/${tournamentId}`);
  return { success: true };
}

export async function checkInParticipant(tournamentId: string) {
  const session = await getSession();
  if (!session) return { error: "Not logged in" };

  await db.registration.update({
    where: {
      tournamentId_userId: { tournamentId, userId: session.id },
    },
    data: { isCheckedIn: true },
  });

  revalidatePath(`/tournaments/${tournamentId}`);
  return { success: true };
}

export async function reorderSeeds(tournamentId: string, userIdsInOrder: string[]) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  for (let i = 0; i < userIdsInOrder.length; i++) {
    await db.registration.update({
      where: {
        tournamentId_userId: { tournamentId, userId: userIdsInOrder[i] },
      },
      data: { seedNumber: i + 1 },
    });
  }

  revalidatePath(`/tournaments/${tournamentId}`);
  return { success: true };
}

export async function startTournament(tournamentId: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const tournament = await db.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      registrations: {
        orderBy: { seedNumber: "asc" },
        include: { user: true },
      },
    },
  });

  if (!tournament) return { error: "Tournament not found" };

  const participantUserIds = tournament.registrations.map((r) => r.userId);
  if (participantUserIds.length < 2) {
    return { error: "At least 2 participants required to generate bracket." };
  }

  // Clear existing matches
  await db.match.deleteMany({ where: { tournamentId } });

  // Generate matches based on format
  let generatedMatches = [];
  switch (tournament.format) {
    case "SINGLE_ELIMINATION":
      generatedMatches = generateSingleEliminationMatches(tournamentId, participantUserIds);
      break;
    case "DOUBLE_ELIMINATION":
      generatedMatches = generateDoubleEliminationMatches(tournamentId, participantUserIds);
      break;
    case "GROUP_STAGE":
      generatedMatches = generateGroupStageMatches(tournamentId, participantUserIds);
      break;
    case "ROUND_ROBIN":
      generatedMatches = generateRoundRobinMatches(tournamentId, participantUserIds);
      break;
    case "SWISS":
      generatedMatches = generateSwissMatches(tournamentId, participantUserIds);
      break;
    default:
      generatedMatches = generateSingleEliminationMatches(tournamentId, participantUserIds);
  }

  // Insert generated matches into database
  for (const m of generatedMatches) {
    await db.match.create({
      data: {
        tournamentId: m.tournamentId,
        round: m.round,
        matchNumber: m.matchNumber,
        bracketType: m.bracketType,
        groupName: m.groupName || null,
        homePlayerId: m.homePlayerId || null,
        awayPlayerId: m.awayPlayerId || null,
        status: m.status,
      },
    });
  }

  // Update status to IN_PROGRESS
  await db.tournament.update({
    where: { id: tournamentId },
    data: { status: "IN_PROGRESS" },
  });

  revalidatePath(`/tournaments/${tournamentId}`);
  return { success: true, count: generatedMatches.length };
}

export async function saveBracketStateToDB(bracketDataJson: string) {
  try {
    const tournament = await db.tournament.findFirst();
    if (tournament) {
      await db.tournament.update({
        where: { id: tournament.id },
        data: { bracketData: bracketDataJson }
      });
      return { success: true };
    }
    await db.tournament.create({
      data: {
        title: "FC Online World Cup 2026",
        description: "Giải đấu World Cup 30 đội tuyển hàng đầu",
        format: "GROUP_STAGE",
        rules: "Luật thi đấu chính thức",
        startDate: new Date(),
        bracketData: bracketDataJson
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save bracket state:", error);
    return { error: error?.message || "Failed to save to database" };
  }
}

export async function loadBracketStateFromDB() {
  try {
    const tournament = await db.tournament.findFirst({
      orderBy: { createdAt: "desc" }
    });
    if (tournament && tournament.bracketData) {
      return { success: true, bracketData: tournament.bracketData };
    }
    return { success: false };
  } catch (error: any) {
    console.error("Failed to load bracket state:", error);
    return { error: error?.message };
  }
}

export async function resetAllTournamentDataInDB() {
  try {
    await db.tournament.updateMany({
      data: {
        bracketData: null
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to reset DB tournament data:", error);
    return { error: error?.message };
  }
}

export async function updateMatchScoreInDB(payload: {
  matchId: string;
  homeScore: number;
  awayScore: number;
}) {
  try {
    const tournament = await db.tournament.findFirst({
      orderBy: { createdAt: "desc" }
    });
    if (!tournament) return { error: "No active tournament found" };

    const roundNum = payload.matchId.startsWith("sf") ? 2 : payload.matchId.startsWith("gf") ? 3 : 1;
    const bracketKind = payload.matchId.startsWith("group") ? "GROUP_STAGE" : "WINNERS";
    const groupNameStr = payload.matchId.startsWith("group-a")
      ? "BẢNG A"
      : payload.matchId.startsWith("group-b")
      ? "BẢNG B"
      : payload.matchId.startsWith("group-c")
      ? "BẢNG C"
      : payload.matchId.startsWith("group-d")
      ? "BẢNG D"
      : null;

    await db.match.upsert({
      where: {
        id: payload.matchId
      },
      update: {
        homeScore: payload.homeScore,
        awayScore: payload.awayScore,
        status: "COMPLETED",
        completedAt: new Date()
      },
      create: {
        id: payload.matchId,
        tournamentId: tournament.id,
        round: roundNum,
        matchNumber: 1,
        bracketType: bracketKind,
        groupName: groupNameStr,
        homeScore: payload.homeScore,
        awayScore: payload.awayScore,
        status: "COMPLETED",
        completedAt: new Date()
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update match score in DB:", error);
    return { error: error?.message };
  }
}

export async function updateUserDrawnTeamInDB(payload: {
  ign: string;
  teamName: string;
  teamFlag: string;
}) {
  try {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { ign: payload.ign },
          { username: payload.ign }
        ]
      }
    });

    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: {
          favoriteClub: payload.teamName
        }
      });
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update user drawn team in DB:", error);
    return { error: error?.message };
  }
}

export async function registerPlayerToDB(form: {
  ign: string;
  discordTag?: string;
  favoriteClub?: string;
  squadValue?: string;
}) {
  try {
    // Check maximum 12 slots limit
    const count = await db.user.count();
    const existingUser = await db.user.findUnique({ where: { username: form.ign } });
    if (count >= 12 && !existingUser) {
      return { error: "Giải đấu đã đủ 12/12 VĐV đăng ký. Đã khóa cổng đăng ký!" };
    }

    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(form.ign)}`;
    const email = `${form.ign.toLowerCase().replace(/[^a-z0-9]/g, "")}@fconline.com`;
    const username = form.ign;

    // Create or update User in Neon DB
    const user = await db.user.upsert({
      where: { username },
      update: {
        ign: form.ign,
        discordTag: form.discordTag || null,
        favoriteClub: form.favoriteClub || "",
        avatarUrl
      },
      create: {
        email,
        username,
        passwordHash: "registered_player",
        ign: form.ign,
        discordTag: form.discordTag || null,
        favoriteClub: form.favoriteClub || "",
        avatarUrl
      }
    });

    return {
      success: true,
      player: {
        id: user.id,
        name: form.ign,
        avatar: avatarUrl,
        clubLogo: ""
      }
    };
  } catch (error: any) {
    console.error("Failed to register player to DB:", error);
    return { error: error?.message || "Lỗi khi lưu thông tin người chơi vào Database" };
  }
}

export async function loadRegisteredPlayersFromDB() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "asc" }
    });

    // Helper map team name to flag
    const getFlagUrl = (teamName?: string | null): string => {
      if (!teamName) return "";
      const flagsMap: Record<string, string> = {
        "Tây Ban Nha": "https://flagcdn.com/w40/es.png",
        "Đức": "https://flagcdn.com/w40/de.png",
        "Việt Nam": "https://flagcdn.com/w40/vn.png",
        "Brazil": "https://flagcdn.com/w40/br.png",
        "Bồ Đào Nha": "https://flagcdn.com/w40/pt.png",
        "Pháp": "https://flagcdn.com/w40/fr.png",
        "Argentina": "https://flagcdn.com/w40/ar.png",
        "Anh": "https://flagcdn.com/w40/gb-eng.png",
        "Hà Lan": "https://flagcdn.com/w40/nl.png",
        "Nhật Bản": "https://flagcdn.com/w40/jp.png",
        "Hàn Quốc": "https://flagcdn.com/w40/kr.png",
        "Ý": "https://flagcdn.com/w40/it.png"
      };
      return flagsMap[teamName] || "";
    };

    return {
      success: true,
      players: users.map((u) => ({
        name: u.ign || u.username,
        avatar: u.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.username)}`,
        clubLogo: getFlagUrl(u.favoriteClub)
      }))
    };
  } catch (error: any) {
    console.error("Failed to load registered players:", error);
    return { error: error?.message, players: [] };
  }
}
