import Link from "next/link";
import { Trophy, PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import TournamentCard from "@/components/tournament/TournamentCard";
import { getSession } from "@/lib/auth";

export default async function TournamentsPage() {
  const session = await getSession();
  const tournaments = await db.tournament.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      registrations: true,
    },
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-sky-600" />
            FC Online Tournaments
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Browse active single &amp; double elimination brackets, group stages, and round-robin leagues
          </p>
        </div>

        {session?.role === "ADMIN" && (
          <Link
            href="/tournaments/create"
            className="cyber-button px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sky-500/20 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Create Tournament
          </Link>
        )}
      </div>

      {/* Tournaments Grid */}
      {tournaments.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl border border-slate-200 bg-white">
          <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-slate-800">No Tournaments Created Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
            As an Administrator, click &quot;Create Tournament&quot; above to launch your first tournament!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((t) => (
            <TournamentCard
              key={t.id}
              id={t.id}
              title={t.title}
              description={t.description}
              format={t.format}
              status={t.status}
              maxPlayers={t.maxPlayers}
              registeredCount={t.registrations.length}
              prizePool={t.prizePool}
              startDate={t.startDate}
              bannerUrl={t.bannerUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
