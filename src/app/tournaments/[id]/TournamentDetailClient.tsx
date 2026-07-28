"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Calendar,
  Award,
  Play,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ArrowLeft,
  GripVertical,
  Shield,
  Swords,
  Shirt,
} from "lucide-react";
import InteractiveBracket from "@/components/tournament/InteractiveBracket";
import PlayerSquadModal from "@/components/squad/PlayerSquadModal";
import {
  registerParticipant,
  checkInParticipant,
  startTournament,
  updateTournamentStatus,
  deleteTournament,
  reorderSeeds,
} from "@/actions/tournament-actions";
import { formatDate, formatSquadValue } from "@/lib/utils";

interface TournamentDetailClientProps {
  tournament: any;
  session: any;
  isRegistered: boolean;
  userRegistration: any;
}

export default function TournamentDetailClient({
  tournament,
  session,
  isRegistered,
  userRegistration,
}: TournamentDetailClientProps) {
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [participants, setParticipants] = useState(tournament.registrations || []);

  const [inspectUser, setInspectUser] = useState<{
    id: string;
    ign: string;
    club?: string;
    squadValue?: bigint | number;
  } | null>(null);

  const isAdmin = session?.role === "ADMIN";

  const handleRegister = async () => {
    setIsActionLoading(true);
    setActionError("");
    const res = await registerParticipant(tournament.id);
    setIsActionLoading(false);
    if (res.error) setActionError(res.error);
    else window.location.reload();
  };

  const handleCheckIn = async () => {
    setIsActionLoading(true);
    setActionError("");
    const res = await checkInParticipant(tournament.id);
    setIsActionLoading(false);
    if (res.error) setActionError(res.error);
    else window.location.reload();
  };

  const handleStartTournament = async () => {
    if (!confirm("Are you sure you want to start the tournament and generate the bracket?")) return;
    setIsActionLoading(true);
    setActionError("");
    const res = await startTournament(tournament.id);
    setIsActionLoading(false);
    if (res.error) setActionError(res.error);
    else window.location.reload();
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsActionLoading(true);
    setActionError("");
    const res = await updateTournamentStatus(tournament.id, newStatus);
    setIsActionLoading(false);
    if (res.error) setActionError(res.error);
    else window.location.reload();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tournament? This action cannot be undone.")) return;
    setIsActionLoading(true);
    const res = await deleteTournament(tournament.id);
    if (res.error) setActionError(res.error);
    else window.location.href = "/tournaments";
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!isAdmin) return;
    const sourceIndexStr = e.dataTransfer.getData("text/plain");
    if (!sourceIndexStr) return;
    const sourceIndex = parseInt(sourceIndexStr, 10);
    if (sourceIndex === targetIndex) return;

    const updated = [...participants];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setParticipants(updated);

    const userIdsInOrder = updated.map((r: any) => r.userId);
    await reorderSeeds(tournament.id, userIdsInOrder);
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-10">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-600 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tournaments
      </Link>

      {/* TOP SECTION: TOURNAMENT INFO */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 relative overflow-hidden bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-300">
                {tournament.format.replace("_", " ")}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                STATUS: {tournament.status}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">{tournament.title}</h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-medium">
              {tournament.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Prize Pool: <strong className="text-slate-900">{tournament.prizePool}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Start Date: <strong className="text-slate-900">{formatDate(tournament.startDate)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Players: <strong className="text-slate-900">{participants.length}/{tournament.maxPlayers}</strong></span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {!session ? (
              <Link
                href="/login"
                className="cyber-button px-5 py-3 rounded-xl text-xs font-bold text-center"
              >
                Log In to Register
              </Link>
            ) : (
              <>
                {!isRegistered && (tournament.status === "REGISTRATION_OPEN" || tournament.status === "DRAFT") && (
                  <button
                    onClick={handleRegister}
                    disabled={isActionLoading}
                    className="cyber-button px-6 py-3 rounded-xl text-xs font-bold"
                  >
                    {isActionLoading ? "Registering..." : "Register Now"}
                  </button>
                )}

                {isRegistered && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-black flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Registered
                    </span>
                    {!userRegistration?.isCheckedIn && (tournament.status === "CHECK_IN" || tournament.status === "REGISTRATION_OPEN") && (
                      <button
                        onClick={handleCheckIn}
                        disabled={isActionLoading}
                        className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black"
                      >
                        Check-In
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Error Alert */}
        {actionError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {actionError}
          </div>
        )}

        {/* Admin Bar */}
        {isAdmin && (
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 px-6 sm:px-8">
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-600" /> Admin Controls:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleStartTournament}
                disabled={isActionLoading || tournament.status === "IN_PROGRESS"}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5" /> Start &amp; Generate Bracket
              </button>
              <select
                value={tournament.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-white text-xs text-slate-900 p-1.5 rounded-lg border border-slate-300 outline-none font-bold"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
                <option value="CHECK_IN">CHECK_IN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                title="Delete Tournament"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* MIDDLE SECTION: INTERACTIVE BRACKET */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <Swords className="w-5 h-5 text-sky-600" />
            Interactive Tournament Bracket
          </h2>
        </div>

        <InteractiveBracket
          tournamentId={tournament.id}
          format={tournament.format}
          status={tournament.status}
          matches={tournament.matches}
          isAdmin={isAdmin}
          currentUserId={session?.id}
        />
      </section>

      {/* BOTTOM SECTION: PLAYERS LIST */}
      <section className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-600" />
              Tournament Players ({participants.length}/{tournament.maxPlayers})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Click any coach below to inspect their FC Online squad formation &amp; 11-player pitch lineup
            </p>
          </div>
          {isAdmin && (
            <span className="text-[11px] text-amber-700 italic font-medium">
              * Drag and drop players to re-order seed numbers
            </span>
          )}
        </div>

        {/* Players Roster Cards */}
        <div className="divide-y divide-slate-100">
          {participants.map((reg: any, index: number) => (
            <div
              key={reg.id}
              draggable={isAdmin}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={allowDrop}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() =>
                setInspectUser({
                  id: reg.user.id,
                  ign: reg.user.ign || reg.user.username,
                  club: reg.user.favoriteClub,
                  squadValue: reg.user.squadValue,
                })
              }
              className="py-3.5 px-4 flex items-center justify-between text-xs rounded-2xl hover:bg-sky-50 border border-transparent hover:border-sky-200 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                {isAdmin && <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 text-sky-700 font-black font-mono flex items-center justify-center shrink-0">
                  #{index + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-900 text-sm group-hover:text-sky-700 flex items-center gap-2 transition-colors">
                    {reg.user.ign || reg.user.username}
                    <Shirt className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[11px] text-slate-500">{reg.user.favoriteClub || "FC Online Coach"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-sky-700 font-extrabold hidden sm:inline">
                  {formatSquadValue(reg.user.squadValue)}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-emerald-800 font-mono font-bold text-xs">
                  {reg.user.eloRating} ELO
                </span>
                <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform hidden sm:inline">
                  View Squad &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SQUAD INSPECTION MODAL */}
      {inspectUser && (
        <PlayerSquadModal
          userId={inspectUser.id}
          userIgn={inspectUser.ign}
          userClub={inspectUser.club}
          userSquadValue={inspectUser.squadValue}
          onClose={() => setInspectUser(null)}
        />
      )}
    </div>
  );
}
