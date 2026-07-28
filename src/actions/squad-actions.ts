"use server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getUserSquad(userId: string) {
  const squad = await db.squad.findUnique({
    where: { userId },
    include: {
      squadPlayers: {
        include: {
          footballPlayer: true,
        },
      },
    },
  });

  return squad;
}

export async function getAllFootballPlayers() {
  const players = await db.footballPlayer.findMany({
    orderBy: { overall: "desc" },
  });
  return players;
}

export async function updateSquadFormation(squadId: string, formation: string, manager: string) {
  const session = await getSession();
  if (!session) return { error: "Not logged in" };

  await db.squad.update({
    where: { id: squadId },
    data: { formation, manager },
  });

  revalidatePath("/squad");
  return { success: true };
}
