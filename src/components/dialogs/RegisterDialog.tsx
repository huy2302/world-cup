"use client";

import { useState } from "react";
import { Competitor, FootballPlayer, FormationType } from "@/types/tournament";
import { MASTER_FOOTBALL_PLAYERS, buildSampleSquad } from "@/data/mockTournament";
import { X, Shield, Trophy, CheckCircle, Sparkles, User, Layers } from "lucide-react";

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newCompetitor: Competitor) => void;
}

const CLUB_OPTIONS = [
  { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { name: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { name: "FC Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { name: "FC Bayern München", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { name: "AC Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg" },
  { name: "Liverpool FC", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" }
];

const FORMATION_OPTIONS: FormationType[] = ["4-2-3-1", "4-3-3", "4-1-2-1-2", "3-5-2", "5-2-1-2"];

export default function RegisterDialog({ isOpen, onClose, onRegister }: RegisterDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [nickname, setNickname] = useState("");
  const [fconlineUid, setFconlineUid] = useState("");
  const [teamName, setTeamName] = useState("");
  const [selectedClubIndex, setSelectedClubIndex] = useState(0);
  const [selectedFormation, setSelectedFormation] = useState<FormationType>("4-2-3-1");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !teamName.trim()) return;

    const club = CLUB_OPTIONS[selectedClubIndex];
    const squad = buildSampleSquad(selectedFormation);

    const newCompetitor: Competitor = {
      id: `c-user-${Date.now()}`,
      nickname: nickname.trim(),
      fconlineUid: fconlineUid.trim() || `FCO-${Math.floor(10000 + Math.random() * 90000)}`,
      teamName: teamName.trim(),
      clubLogo: club.logo,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rank: "Challenger 1050P",
      overallRating: 122,
      squad
    };

    onRegister(newCompetitor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      {/* Modal Card Box */}
      <div className="relative w-full max-w-2xl cyber-glass rounded-3xl border border-cyan-500/40 shadow-2xl p-6 sm:p-8 text-slate-100 flex flex-col gap-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">TOURNAMENT REGISTRATION</h2>
              <span className="text-xs text-slate-400">FC Online Champions Cup 2026</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Step 1: Competitor Profile Info */}
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">
                  Player Nickname (IGN) <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CyberStriker_99"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-[#0d1322] border border-[#1c273e] focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">
                  FC Online UID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. FCO-10293"
                  value={fconlineUid}
                  onChange={(e) => setFconlineUid(e.target.value)}
                  className="w-full bg-[#0d1322] border border-[#1c273e] focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">
                  Team Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Predators XI"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-[#0d1322] border border-[#1c273e] focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
                />
              </div>

              {/* Club Emblem Selection */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2 uppercase">
                  Select Favorite Club Crest
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {CLUB_OPTIONS.map((club, idx) => (
                    <div
                      key={club.name}
                      onClick={() => setSelectedClubIndex(idx)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition ${
                        selectedClubIndex === idx
                          ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                          : "bg-[#0d1322] border-[#1c273e] hover:border-slate-600"
                      }`}
                    >
                      <img src={club.logo} alt={club.name} className="w-7 h-7 object-contain mb-1" />
                      <span className="text-[9px] font-bold text-center text-slate-300 truncate w-full">
                        {club.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!nickname || !teamName}
                onClick={() => setStep(2)}
                className="mt-2 cyber-button py-3 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50"
              >
                NEXT: TACTICAL FORMATION →
              </button>
            </div>
          )}

          {/* Step 2: Tactical Formation & XI Preview */}
          {step === 2 && (
            <div className="flex flex-col gap-5 animate-fadeIn">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2 uppercase flex items-center justify-between">
                  <span>Select Tactical Formation</span>
                  <span className="text-cyan-400 font-mono text-[11px]">{selectedFormation}</span>
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {FORMATION_OPTIONS.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormation(fmt)}
                      className={`py-2 px-3 rounded-xl border text-xs font-black tracking-wider transition ${
                        selectedFormation === fmt
                          ? "bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                          : "bg-[#0d1322] border-[#1c273e] text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Starting XI Quick Preview Stars */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2 uppercase">
                  Default Starting XI Roster
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-[#080d1a] border border-[#162035] rounded-xl">
                  {MASTER_FOOTBALL_PLAYERS.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 p-1.5 rounded bg-slate-900 border border-slate-800">
                      <img src={p.portrait} alt={p.name} className="w-7 h-7 rounded object-cover" />
                      <div className="flex flex-col text-left leading-tight truncate">
                        <span className="text-[11px] font-bold text-white truncate">{p.shortName}</span>
                        <span className="text-[9px] text-amber-400 font-bold">{p.overall} OVR • {p.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white"
                >
                  ← BACK
                </button>
                <button
                  type="submit"
                  className="w-2/3 cyber-button py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> CONFIRM REGISTRATION
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
