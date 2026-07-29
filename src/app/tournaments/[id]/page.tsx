import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { serializeData } from "@/lib/utils";
import { notFound } from "next/navigation";
import TournamentDetailClient from "./TournamentDetailClient";

export const dynamic = "force-dynamic";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let session = null;
  let tournament = null;

  try {
    session = await getSession();
    tournament = await db.tournament.findUnique({
      where: { id },
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
    console.error("Database error in TournamentDetailPage:", error);
  }

  if (!tournament) {
    notFound();
  }

  const isRegistered = session
    ? tournament.registrations.some((r) => r.userId === session.id)
    : false;

  const userRegistration = session
    ? tournament.registrations.find((r) => r.userId === session.id)
    : null;

  return (
    <TournamentDetailClient
      tournament={serializeData(tournament)}
      session={session}
      isRegistered={isRegistered}
      userRegistration={userRegistration ? serializeData(userRegistration) : null}
    />
  );
}
