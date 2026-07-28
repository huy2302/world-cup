import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { serializeData } from "@/lib/utils";
import TopNav from "@/components/layout/TopNav";
import TournamentBracket from "@/components/bracket/TournamentBracket";

export default async function HomePage() {
  const session = await getSession();

  // Find active live tournament (or fallback to latest)
  const activeTournament = await db.tournament.findFirst({
    where: { status: "IN_PROGRESS" },
    include: {
      matches: {
        orderBy: [{ round: "asc" }, { matchNumber: "asc" }],
        include: {
          homePlayer: true,
          awayPlayer: true,
          winner: true,
        },
      },
    },
  });

  const tournament = activeTournament || (await db.tournament.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      matches: {
        orderBy: [{ round: "asc" }, { matchNumber: "asc" }],
        include: {
          homePlayer: true,
          awayPlayer: true,
          winner: true,
        },
      },
    },
  }));

  const matches = tournament?.matches || [];
  const winnersMatches = matches.filter((m) => m.bracketType === "WINNERS");
  const totalRounds = Array.from(new Set(winnersMatches.map((m) => m.round))).length;
  const currentRoundLabel = totalRounds > 0 ? `ROUND 2 OF ${totalRounds}` : "ROUND OF 16";

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <TopNav
        tournamentTitle={tournament?.title || "FC Online Champions Cup 2026"}
        tournamentStatus={tournament?.status || "IN_PROGRESS"}
        currentRound={currentRoundLabel}
        user={session}
      />

      {/* Main Content: Full-Screen Esports Interactive Bracket */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto p-4 lg:p-6 flex flex-col">
        <TournamentBracket
          tournamentTitle={tournament?.title}
          format={tournament?.format}
          matches={serializeData(matches)}
          isAdmin={session?.role === "ADMIN"}
        />
      </main>
    </div>
  );
}
