import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { serializeData } from "@/lib/utils";
import SquadViewer from "@/components/squad/SquadViewer";
import { Shield, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default async function SquadPage() {
  const session = await getSession();

  let userId = session?.id;

  // Fallback to first user in database for guest preview
  if (!userId) {
    const firstUser = await db.user.findFirst({ where: { role: "PLAYER" } });
    userId = firstUser?.id;
  }

  if (!userId) {
    return (
      <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
        <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-300">No Squad Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          <Link href="/register" className="text-cyan-400 hover:underline font-bold">Register a Coach Profile</Link> to build your FC Online Squad!
        </p>
      </div>
    );
  }

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

  if (!squad) {
    return (
      <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
        <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-300">Squad Being Built...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-cyan-400" />
            FC Online Squad Builder &amp; Roster Inspection
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Click any football player card on the tactical pitch to open the detailed player attribute popup
          </p>
        </div>
      </div>

      {/* Tactical Field Viewer & Popup */}
      <SquadViewer squad={serializeData(squad)} />
    </div>
  );
}
