"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Shirt, X, Loader2, User as UserIcon } from "lucide-react";
import SquadViewer from "./SquadViewer";
import { getUserSquad } from "@/actions/squad-actions";

interface PlayerSquadModalProps {
  userId: string | null;
  userIgn: string | null;
  userClub?: string | null;
  userSquadValue?: bigint | number | null;
  onClose: () => void;
}

export default function PlayerSquadModal({
  userId,
  userIgn,
  userClub,
  userSquadValue,
  onClose,
}: PlayerSquadModalProps) {
  const [squad, setSquad] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserSquad(userId)
        .then((data) => {
          setSquad(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [userId]);

  if (!userId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl border border-cyan-500/30 overflow-hidden flex flex-col shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Shirt className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {userIgn || "Coach"} FC Online Squad
                </h3>
                <p className="text-xs text-slate-400">
                  Tactical field view &amp; roster lineup for {userClub || "FC Online"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs font-semibold">Loading FC Online Squad &amp; Pitch Layout...</span>
              </div>
            ) : squad ? (
              <SquadViewer squad={JSON.parse(JSON.stringify(squad))} />
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs">
                No squad registered for this coach yet.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
