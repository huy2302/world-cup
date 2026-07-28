import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { serializeData } from "@/lib/utils";
import { notFound } from "next/navigation";
import TournamentDetailClient from "./TournamentDetailClient";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  const tournament = await db.tournament.findUnique({
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
