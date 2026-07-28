"use client";

import { useState } from "react";
import { adminOverrideMatchScore } from "@/actions/match-actions";
import { AlertCircle, CheckCircle2, ExternalLink, Swords } from "lucide-react";

interface AdminDisputeClientProps {
  initialDisputes: any[];
}

export default function AdminDisputeClient({ initialDisputes }: AdminDisputeClientProps) {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolve = async (matchId: string, homeScore: number, awayScore: number, winnerId: string) => {
    setLoadingId(matchId);
    const res = await adminOverrideMatchScore(matchId, homeScore, awayScore, winnerId);
    setLoadingId(null);

    if (res.success) {
      setDisputes((prev) => prev.filter((d) => d.id !== matchId));
    }
  };

  if (disputes.length === 0) {
    return (
      <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-200">Dispute Queue is Empty</h3>
        <p className="text-xs text-slate-400 mt-1">All match scores have been verified and settled!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {disputes.map((match) => (
        <div key={match.id} className="glass-panel p-6 rounded-2xl border border-red-500/30 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-cyan-400 font-bold block">{match.tournament.title}</span>
              <span className="text-[11px] text-slate-400">Match #{match.matchNumber} - Round {match.round}</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
              DISPUTED
            </span>
          </div>

          {/* Submissions comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {match.submissions.map((sub: any) => (
              <div key={sub.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Submitted by: {sub.submittedBy.ign || sub.submittedBy.username}</span>
                  <span className="font-mono text-cyan-400 font-bold">{sub.homeScore} - {sub.awayScore}</span>
                </div>
                {sub.proofUrl && (
                  <a
                    href={sub.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                  >
                    View Proof Screenshot <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Admin Override Action */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-end">
            <button
              onClick={() => handleResolve(match.id, 3, 0, match.homePlayerId)}
              disabled={loadingId === match.id}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
            >
              Award Win to Home ({match.homePlayer?.ign || "Home"})
            </button>
            <button
              onClick={() => handleResolve(match.id, 0, 3, match.awayPlayerId)}
              disabled={loadingId === match.id}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold"
            >
              Award Win to Away ({match.awayPlayer?.ign || "Away"})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
