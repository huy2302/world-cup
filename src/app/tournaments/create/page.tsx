"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tournamentSchema, TournamentInput } from "@/lib/zod-schemas";
import { createTournament } from "@/actions/tournament-actions";
import { Trophy, PlusCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateTournamentPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentInput>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      format: "SINGLE_ELIMINATION",
      maxPlayers: 16,
      prizePool: "$500 + 5,000 FC Points",
      checkInMinutes: 30,
      startDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    },
  });

  const onSubmit = async (data: TournamentInput) => {
    setIsLoading(true);
    setErrorMessage("");

    const res = await createTournament(data);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else if (res.tournamentId) {
      window.location.href = `/tournaments/${res.tournamentId}`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tournaments
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create FC Online Tournament</h2>
            <p className="text-xs text-slate-400">Setup brackets, formats, prize pool, and player limits</p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Tournament Title</label>
            <input
              {...register("title")}
              type="text"
              placeholder="e.g. FC Online Championship - Season 2"
              className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
            />
            {errors.title && <p className="text-red-400 text-[11px] mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Provide an overview of the tournament..."
              className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none resize-none"
            />
            {errors.description && <p className="text-red-400 text-[11px] mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Tournament Format</label>
              <select
                {...register("format")}
                className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
              >
                <option value="SINGLE_ELIMINATION">Single Elimination</option>
                <option value="DOUBLE_ELIMINATION">Double Elimination</option>
                <option value="GROUP_STAGE">Group Stage + Knockout</option>
                <option value="ROUND_ROBIN">Round Robin League</option>
                <option value="SWISS">Swiss System</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Max Participants</label>
              <select
                {...register("maxPlayers", { valueAsNumber: true })}
                className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
              >
                <option value={4}>4 Players</option>
                <option value={8}>8 Players</option>
                <option value={16}>16 Players</option>
                <option value={32}>32 Players</option>
                <option value={64}>64 Players</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Prize Pool Details</label>
              <input
                {...register("prizePool")}
                type="text"
                placeholder="$500 + 5,000 FC Points"
                className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Start Date & Time</label>
              <input
                {...register("startDate")}
                type="datetime-local"
                className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Tournament Rules & Salary Cap</label>
            <textarea
              {...register("rules")}
              rows={3}
              placeholder="e.g. 1v1 BO1, Salary limit 260 BP. No ICON duplicates."
              className="w-full bg-slate-900 text-sm text-white p-3 rounded-xl border border-slate-800 focus:border-cyan-400 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cyber-button py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4"
          >
            <Trophy className="w-4 h-4" />
            {isLoading ? "Publishing Tournament..." : "Publish Tournament"}
          </button>
        </form>
      </div>
    </div>
  );
}
