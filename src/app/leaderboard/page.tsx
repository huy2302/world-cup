import { db } from "@/lib/db";
import { Shield } from "lucide-react";
import { formatSquadValue } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  let players: any[] = [];
  let dbError = false;

  try {
    players = await db.user.findMany({
      where: { role: "PLAYER" },
      orderBy: { eloRating: "desc" },
    });
  } catch (error) {
    console.error("Database query error in LeaderboardPage:", error);
    dbError = true;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-600" />
            FC Online ELO Leaderboard
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Global competitive coach rankings based on tournament wins and ELO calculation
          </p>
        </div>
      </div>

      {dbError ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm font-bold text-red-600">Database Connection Error</p>
          <p className="text-xs text-slate-500 mt-1">Unable to fetch leaderboard records. Please ensure your PostgreSQL connection is active.</p>
        </div>
      ) : (
        /* Leaderboard Table */
        <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-600">
                  <th className="p-4 pl-6">Rank</th>
                  <th className="p-4">Coach Name (IGN)</th>
                  <th className="p-4">Favorite Club</th>
                  <th className="p-4 text-right">Squad Value (BP)</th>
                  <th className="p-4 text-center">W / L</th>
                  <th className="p-4 text-center">Win Rate</th>
                  <th className="p-4 pr-6 text-right">ELO Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {players.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                      No registered players found.
                    </td>
                  </tr>
                ) : (
                  players.map((player, idx) => {
                    const totalGames = player.totalWins + player.totalLosses;
                    const winRate = totalGames > 0 ? Math.round((player.totalWins / totalGames) * 100) : 0;

                    return (
                      <tr key={player.id} className="hover:bg-sky-50/50 transition-colors">
                        <td className="p-4 pl-6">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono ${
                              idx === 0
                                ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                                : idx === 1
                                ? "bg-slate-200 text-slate-800 border border-slate-300"
                                : idx === 2
                                ? "bg-amber-200 text-amber-950 border border-amber-400"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{idx + 1}
                          </span>
                        </td>
                        <td className="p-4 font-extrabold text-slate-900">
                          <div className="flex items-center gap-2">
                            {player.ign || player.username}
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 font-medium">{player.favoriteClub || "FC Online"}</td>
                        <td className="p-4 text-right font-mono font-extrabold text-sky-700">
                          {formatSquadValue(player.squadValue)}
                        </td>
                        <td className="p-4 text-center font-mono text-slate-700 font-medium">
                          <span className="text-emerald-700 font-bold">{player.totalWins}W</span> -{" "}
                          <span className="text-red-600 font-bold">{player.totalLosses}L</span>
                        </td>
                        <td className="p-4 text-center font-mono font-black text-slate-900">
                          {winRate}%
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <span className="px-3 py-1 rounded-lg bg-sky-100 border border-sky-300 text-sky-900 font-mono font-black text-sm">
                            {player.eloRating}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
