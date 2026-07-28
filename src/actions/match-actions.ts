"use server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { matchScoreSchema, MatchScoreInput } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function submitMatchScore(input: MatchScoreInput) {
  const session = await getSession();
  if (!session) return { error: "Not logged in" };

  const parse = matchScoreSchema.safeParse(input);
  if (!parse.success) {
    return { error: parse.error.issues[0].message };
  }

  const { matchId, homeScore, awayScore, proofUrl, notes } = parse.data;

  const match = await db.match.findUnique({
    where: { id: matchId },
    include: { submissions: true },
  });

  if (!match) return { error: "Match not found" };

  if (match.homePlayerId !== session.id && match.awayPlayerId !== session.id && session.role !== "ADMIN") {
    return { error: "You are not a participant in this match." };
  }

  // Record submission
  await db.matchSubmission.create({
    data: {
      matchId,
      submittedById: session.id,
      homeScore,
      awayScore,
      proofUrl: proofUrl || null,
      notes: notes || null,
    },
  });

  // Check if scores match or auto-accept if submitted by Admin
  if (session.role === "ADMIN") {
    const winnerId = homeScore > awayScore ? match.homePlayerId : match.awayPlayerId;
    await completeMatchAndAdvance(matchId, homeScore, awayScore, winnerId);
  } else {
    // Check if opponent already submitted
    const otherSubmission = match.submissions.find((s) => s.submittedById !== session.id);
    if (otherSubmission) {
      if (otherSubmission.homeScore === homeScore && otherSubmission.awayScore === awayScore) {
        // Both agree!
        const winnerId = homeScore > awayScore ? match.homePlayerId : match.awayPlayerId;
        await completeMatchAndAdvance(matchId, homeScore, awayScore, winnerId);
      } else {
        // Scores conflict -> Disputed state!
        await db.match.update({
          where: { id: matchId },
          data: { status: "DISPUTED" },
        });
      }
    } else {
      // First submission -> Mark as SUBMITTED
      await db.match.update({
        where: { id: matchId },
        data: { status: "SUBMITTED", homeScore, awayScore },
      });
    }
  }

  revalidatePath(`/matches/${matchId}`);
  revalidatePath(`/tournaments/${match.tournamentId}`);
  return { success: true };
}

export async function adminOverrideMatchScore(
  matchId: string,
  homeScore: number,
  awayScore: number,
  winnerId?: string | null
) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const match = await db.match.findUnique({ where: { id: matchId } });
  if (!match) return { error: "Match not found" };

  const finalWinnerId =
    winnerId || (homeScore > awayScore ? match.homePlayerId : match.awayPlayerId);

  await completeMatchAndAdvance(matchId, homeScore, awayScore, finalWinnerId);

  revalidatePath(`/matches/${matchId}`);
  revalidatePath(`/tournaments/${match.tournamentId}`);
  return { success: true };
}

/**
 * Marks match as COMPLETED and advances the winner to the next round match slot in Single/Double Elimination!
 */
async function completeMatchAndAdvance(
  matchId: string,
  homeScore: number,
  awayScore: number,
  winnerId?: string | null
) {
  const match = await db.match.findUnique({
    where: { id: matchId },
    include: { tournament: true },
  });
  if (!match) return;

  // 1. Update current match status
  await db.match.update({
    where: { id: matchId },
    data: {
      homeScore,
      awayScore,
      winnerId,
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  // 2. Update player ELO and Win/Loss stats
  if (winnerId && match.homePlayerId && match.awayPlayerId) {
    const loserId = winnerId === match.homePlayerId ? match.awayPlayerId : match.homePlayerId;
    await db.user.update({
      where: { id: winnerId },
      data: { totalWins: { increment: 1 }, eloRating: { increment: 25 } },
    });
    await db.user.update({
      where: { id: loserId },
      data: { totalLosses: { increment: 1 }, eloRating: { decrement: 15 } },
    });
  }

  // 3. Single Elimination & Winners Bracket Auto-Advancement
  if (match.bracketType === "WINNERS" && winnerId) {
    const nextRound = match.round + 1;
    const nextMatchNumberInRound = Math.ceil(match.matchNumber / 2);

    // Find next round match in same tournament
    const nextMatch = await db.match.findFirst({
      where: {
        tournamentId: match.tournamentId,
        round: nextRound,
        bracketType: "WINNERS",
      },
      orderBy: { matchNumber: "asc" },
      skip: nextMatchNumberInRound - 1,
    });

    if (nextMatch) {
      // Slot winner into home or away slot of next match
      const isHome = match.matchNumber % 2 !== 0;
      await db.match.update({
        where: { id: nextMatch.id },
        data: {
          ...(isHome ? { homePlayerId: winnerId } : { awayPlayerId: winnerId }),
        },
      });

      // Check if both home and away players are now filled
      const updatedNext = await db.match.findUnique({ where: { id: nextMatch.id } });
      if (updatedNext?.homePlayerId && updatedNext?.awayPlayerId) {
        await db.match.update({
          where: { id: nextMatch.id },
          data: { status: "READY" },
        });
      }
    } else {
      // Final round completed! Mark tournament as COMPLETED
      await db.tournament.update({
        where: { id: match.tournamentId },
        data: { status: "COMPLETED" },
      });
    }
  }
}
