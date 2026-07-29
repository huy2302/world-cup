import { db } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import TournamentPage from "@/components/tournament/TournamentPage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let tournament = null;

  try {
    tournament = await db.tournament.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        registrations: {
          orderBy: { seedNumber: "asc" },
          include: { user: true },
        },
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
  } catch (error) {
    console.error("Error fetching homepage tournament:", error);
  }

  return <TournamentPage initialTournament={serializeData(tournament)} />;
}
