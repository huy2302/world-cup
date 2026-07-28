"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Shield, User as UserIcon } from "lucide-react";
import FootballPitch from "./FootballPitch";
import { getUserSquad } from "@/actions/squad-actions";

interface PlayerDialogProps {
  user: {
    id: string;
    username: string;
    ign: string;
    favoriteClub?: string | null;
    eloRating?: number;
    squadValue?: bigint | number;
    avatarUrl?: string | null;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayerDialog({ user, isOpen, onClose }: PlayerDialogProps) {
  const [squad, setSquad] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id && isOpen) {
      setLoading(true);
      getUserSquad(user.id)
        .then((data) => {
          setSquad(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.id, isOpen]);

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0e131d] w-full max-w-6xl max-h-[92vh] rounded-3xl border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#141b27] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Bar (Image 2 Top Header) */}
          <div className="p-6 bg-[#141b27]/80 border-b border-[#202a3d] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-400 shadow-md shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.ign} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-cyan-400">
                    {(user.ign || user.username).substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{user.ign || user.username}</h3>
                <span className="text-xs text-cyan-400 font-bold">{user.favoriteClub || "Liverpool"}</span>
              </div>
            </div>

            {/* Right Specs Pill Header */}
            <div className="flex items-center gap-6 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Overall Rating</span>
                <span className="text-xl font-black text-white">94</span>
              </div>
              <div className="h-6 w-px bg-slate-800"></div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Preferred Formation</span>
                <span className="text-xl font-black text-cyan-400">{squad?.formation || "4-2-3-1"}</span>
              </div>
              <div className="h-6 w-px bg-slate-800"></div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans uppercase">Seed</span>
                <span className="text-xl font-black text-amber-400">#2</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-6">
            {/* Center Pitch & Bench */}
            <div className="flex-1">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-bold">Loading Squad Roster...</span>
                </div>
              ) : squad ? (
                <FootballPitch formation={squad.formation} players={squad.squadPlayers} />
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">No tactical squad found.</div>
              )}
            </div>

            {/* Right Side Team Info Panel (Image 2 Right Sidebar) */}
            <div className="w-full lg:w-72 bg-[#141b27] p-5 rounded-2xl border border-[#202a3d] space-y-4 shrink-0 h-fit">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Formation:</span>
                  <span className="font-bold text-white font-mono">{squad?.formation || "4-2-3-1"}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Salary Cap:</span>
                  <span className="font-bold text-cyan-400 font-mono">250M / 250M</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Average Overall:</span>
                  <span className="font-bold text-white font-mono">91.5</span>
                </div>

                <div className="space-y-1 py-1.5 border-b border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Team Chemistry:</span>
                    <span className="font-bold text-emerald-400 font-mono">100/100</span>
                  </div>
                  <div className="w-full bg-[#1c2536] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-full"></div>
                  </div>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Preferred Foot:</span>
                  <span className="font-bold text-white">Right</span>
                </div>

                <div className="space-y-0.5 py-1.5 border-b border-slate-800">
                  <span className="text-slate-400 block">Manager:</span>
                  <span className="font-black text-white uppercase block">JÜRGEN KLOPP (GER)</span>
                </div>

                <div className="space-y-0.5 py-1.5">
                  <span className="text-slate-400 block">Primary Club:</span>
                  <span className="font-black text-cyan-400 uppercase block">{user.favoriteClub || "LIVERPOOL"}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
