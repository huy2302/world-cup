"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Swords, Shield, AlertCircle, CheckCircle2, Clock, Upload, Edit3, ArrowRight } from "lucide-react";
import { submitMatchScore, adminOverrideMatchScore } from "@/actions/match-actions";

export interface MatchData {
  id: string;
  round: number;
  matchNumber: number;
  bracketType: string;
  groupName?: string | null;
  homePlayerId?: string | null;
  awayPlayerId?: string | null;
  homeScore: number;
  awayScore: number;
  status: string;
  homePlayer?: { id: string; username: string; ign: string; avatarUrl?: string | null } | null;
  awayPlayer?: { id: string; username: string; ign: string; avatarUrl?: string | null } | null;
  winner?: { id: string; username: string; ign: string } | null;
}

export interface InteractiveBracketProps {
  tournamentId: string;
  format: string;
  status: string;
  matches: MatchData[];
  isAdmin?: boolean;
  currentUserId?: string | null;
}

export default function InteractiveBracket({
  tournamentId,
  format,
  status,
  matches,
  isAdmin = false,
  currentUserId,
}: InteractiveBracketProps) {
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [homeScoreInput, setHomeScoreInput] = useState<number>(0);
  const [awayScoreInput, setAwayScoreInput] = useState<number>(0);
  const [proofUrlInput, setProofUrlInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Group matches by round for Single / Double elimination
  const winnersMatches = matches.filter((m) => m.bracketType === "WINNERS");
  const rounds = Array.from(new Set(winnersMatches.map((m) => m.round))).sort((a, b) => a - b);

  const openScoreModal = (match: MatchData) => {
    setSelectedMatch(match);
    setHomeScoreInput(match.homeScore || 0);
    setAwayScoreInput(match.awayScore || 0);
    setErrorMessage("");
  };

  const handleScoreSubmit = async () => {
    if (!selectedMatch) return;
    setIsSubmitting(true);
    setErrorMessage("");

    let res;
    if (isAdmin) {
      res = await adminOverrideMatchScore(
        selectedMatch.id,
        homeScoreInput,
        awayScoreInput
      );
    } else {
      res = await submitMatchScore({
        matchId: selectedMatch.id,
        homeScore: homeScoreInput,
        awayScore: awayScoreInput,
        proofUrl: proofUrlInput,
      });
    }

    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSelectedMatch(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Format Header */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Tournament Bracket View</h3>
            <p className="text-xs text-slate-400">
              {format === "SINGLE_ELIMINATION" && "Single Elimination Knockout Tree"}
              {format === "DOUBLE_ELIMINATION" && "Upper & Lower Bracket Tree"}
              {format === "GROUP_STAGE" && "Group Stage Standings & Fixtures"}
              {format === "ROUND_ROBIN" && "Round Robin League Table"}
            </p>
          </div>
        </div>
        {isAdmin && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" />
            Admin Score Override Mode
          </span>
        )}
      </div>

      {/* Bracket Canvas / Tree */}
      {matches.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-300">Matches Not Generated Yet</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            The bracket will automatically generate once registration closes and the tournament is launched by the Admin.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-6 pt-2">
          <div className="flex gap-8 min-w-[700px] justify-center items-stretch">
            {rounds.map((rIndex) => {
              const roundMatches = winnersMatches.filter((m) => m.round === rIndex);
              const roundTitle =
                rIndex === rounds.length
                  ? "FINAL"
                  : rIndex === rounds.length - 1
                  ? "SEMI-FINALS"
                  : rIndex === rounds.length - 2
                  ? "QUARTER-FINALS"
                  : `ROUND ${rIndex}`;

              return (
                <div key={rIndex} className="flex-1 flex flex-col justify-around gap-6">
                  {/* Round Header */}
                  <div className="text-center pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
                      {roundTitle}
                    </span>
                  </div>

                  {/* Match Cards in Round */}
                  <div className="flex flex-col justify-around flex-1 gap-6">
                    {roundMatches.map((match) => {
                      const isCompleted = match.status === "COMPLETED";
                      const isDisputed = match.status === "DISPUTED";
                      const isParticipant =
                        currentUserId &&
                        (match.homePlayerId === currentUserId || match.awayPlayerId === currentUserId);

                      return (
                        <motion.div
                          key={match.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => (isAdmin || isParticipant) && openScoreModal(match)}
                          className={`glass-card p-3.5 rounded-xl border relative cursor-pointer group hover:border-cyan-400/50 transition-all ${
                            isCompleted
                              ? "border-slate-800 bg-slate-900/80"
                              : isDisputed
                              ? "border-red-500/50 bg-red-950/20"
                              : isParticipant
                              ? "border-cyan-500/50 bg-cyan-950/20"
                              : "border-slate-800/80"
                          }`}
                        >
                          {/* Status Badge */}
                          <div className="flex justify-between items-center text-[10px] mb-2 text-slate-400 font-mono">
                            <span>Match #{match.matchNumber}</span>
                            {isCompleted && (
                              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                            {isDisputed && (
                              <span className="text-red-400 flex items-center gap-1 font-semibold">
                                <AlertCircle className="w-3 h-3" /> Dispute
                              </span>
                            )}
                            {match.status === "READY" && (
                              <span className="text-cyan-400 font-semibold">Ready</span>
                            )}
                          </div>

                          {/* Home Player Slot */}
                          <div
                            className={`flex items-center justify-between p-2 rounded-lg mb-1.5 transition-colors ${
                              match.winner?.id === match.homePlayer?.id && isCompleted
                                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold"
                                : "bg-slate-950/60 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                              <span className="text-xs truncate font-semibold">
                                {match.homePlayer?.ign || match.homePlayer?.username || "TBD"}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900">
                              {match.homeScore}
                            </span>
                          </div>

                          {/* Away Player Slot */}
                          <div
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                              match.winner?.id === match.awayPlayer?.id && isCompleted
                                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold"
                                : "bg-slate-950/60 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                              <span className="text-xs truncate font-semibold">
                                {match.awayPlayer?.ign || match.awayPlayer?.username || "TBD"}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900">
                              {match.awayScore}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Score Modal Dialog */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-md p-6 rounded-2xl border border-cyan-500/30 space-y-5"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Swords className="w-5 h-5 text-cyan-400" />
                  {isAdmin ? "Admin Score Override" : "Submit Match Result"}
                </h3>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="text-slate-400 hover:text-white text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </div>
              )}

              {/* Match Opponents Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-cyan-400 font-bold block mb-1">
                    {selectedMatch.homePlayer?.ign || "Home Player"}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={homeScoreInput}
                    onChange={(e) => setHomeScoreInput(parseInt(e.target.value) || 0)}
                    className="w-20 text-center text-2xl font-bold bg-slate-950 text-white p-2 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-emerald-400 font-bold block mb-1">
                    {selectedMatch.awayPlayer?.ign || "Away Player"}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={awayScoreInput}
                    onChange={(e) => setAwayScoreInput(parseInt(e.target.value) || 0)}
                    className="w-20 text-center text-2xl font-bold bg-slate-950 text-white p-2 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              {!isAdmin && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Proof Screenshot URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://imgur.com/your-proof.png"
                    value={proofUrlInput}
                    onChange={(e) => setProofUrlInput(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScoreSubmit}
                  disabled={isSubmitting}
                  className="flex-1 cyber-button py-2.5 rounded-xl text-xs font-bold"
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
