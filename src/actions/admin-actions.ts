"use server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getDisputedMatches() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const disputes = await db.match.findMany({
    where: { status: "DISPUTED" },
    include: {
      tournament: true,
      homePlayer: true,
      awayPlayer: true,
      submissions: {
        include: { submittedBy: true },
      },
    },
    orderBy: { completedAt: "desc" },
  });

  return { success: true, disputes };
}

export async function getAllUsers() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const users = await db.user.findMany({
    orderBy: { eloRating: "desc" },
  });

  return { success: true, users };
}
