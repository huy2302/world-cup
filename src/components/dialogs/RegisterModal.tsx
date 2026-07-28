"use client";

import { useState } from "react";
import { X, Trophy, User, Gamepad2, Flag, Check, Sparkles } from "lucide-react";

export interface NationalTeam {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export const WORLD_CUP_TEAMS: NationalTeam[] = [
  { id: "fra", name: "Pháp", code: "FRA", flag: "https://flagcdn.com/w40/fr.png" },
  { id: "arg", name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w40/ar.png" },
  { id: "bra", name: "Brazil", code: "BRA", flag: "https://flagcdn.com/w40/br.png" },
  { id: "por", name: "Bồ Đào Nha", code: "POR", flag: "https://flagcdn.com/w40/pt.png" },
  { id: "eng", name: "Anh", code: "ENG", flag: "https://flagcdn.com/w40/gb-eng.png" },
  { id: "esp", name: "Tây Ban Nha", code: "ESP", flag: "https://flagcdn.com/w40/es.png" },
  { id: "ger", name: "Đức", code: "GER", flag: "https://flagcdn.com/w40/de.png" },
  { id: "ned", name: "Hà Lan", code: "NED", flag: "https://flagcdn.com/w40/nl.png" },
  { id: "jpn", name: "Nhật Bản", code: "JPN", flag: "https://flagcdn.com/w40/jp.png" },
  { id: "kor", name: "Hàn Quốc", code: "KOR", flag: "https://flagcdn.com/w40/kr.png" },
  { id: "vnm", name: "Việt Nam", code: "VIE", flag: "https://flagcdn.com/w40/vn.png" },
  { id: "bel", name: "Bỉ", code: "BEL", flag: "https://flagcdn.com/w40/be.png" },
  { id: "cro", name: "Croatia", code: "CRO", flag: "https://flagcdn.com/w40/hr.png" },
  { id: "uru", name: "Uruguay", code: "URU", flag: "https://flagcdn.com/w40/uy.png" },
  { id: "mar", name: "Ma-rốc", code: "MAR", flag: "https://flagcdn.com/w40/ma.png" },
  { id: "usa", name: "Mỹ", code: "USA", flag: "https://flagcdn.com/w40/us.png" },
];

export interface PlayerRegistrationForm {
  fullName: string;
  ign: string;
  selectedTeam: NationalTeam;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PlayerRegistrationForm) => void;
}

export default function RegisterModal({ isOpen, onClose, onSubmit }: RegisterModalProps) {
  const [fullName, setFullName] = useState("");
  const [ign, setIgn] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<NationalTeam>(WORLD_CUP_TEAMS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !ign.trim()) return;

    onSubmit({
      fullName: fullName.trim(),
      ign: ign.trim(),
      selectedTeam,
    });

    setFullName("");
    setIgn("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-lg bg-[#0D111E] border border-[#1F263B] rounded-3xl p-6 shadow-2xl text-white flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F263B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-purple-400">
              <Trophy className="w-5 h-5 fill-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">ĐĂNG KÝ THAM GIA GIẢI ĐẤU</h2>
              <span className="text-xs text-slate-400">FC Online World Cup Champions Cup 2026</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161D2F] border border-[#232D44] hover:border-purple-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* 1. Tên Người Chơi */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" /> Tên Người Chơi (Họ & Tên) <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tên thật của bạn (VD: Nguyễn Văn A)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#131827] border border-[#232A3D] focus:border-[#7C3AED] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          {/* 2. Tên Ingame (IGN) */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" /> Tên Ingame (IGN / Nickname) <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tên Ingame FC Online (VD: FCPro_HuyDev)"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full bg-[#131827] border border-[#232A3D] focus:border-[#7C3AED] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition font-bold"
            />
          </div>

          {/* 3. Chọn Đội Tuyển World Cup */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-purple-400" /> Chọn Đội Tuyển World Cup
              </span>
              <span className="text-[11px] font-bold text-purple-300">
                Đã chọn: {selectedTeam.name} ({selectedTeam.code})
              </span>
            </label>

            {/* Grid of National Teams */}
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 bg-[#090C16] border border-[#1A2135] rounded-xl">
              {WORLD_CUP_TEAMS.map((team) => {
                const isSelected = selectedTeam.id === team.id;

                return (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => setSelectedTeam(team)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                      isSelected
                        ? "bg-[#251A3E] border-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-[#121727] border-[#1E263A] text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    <img src={team.flag} alt={team.name} className="w-6 h-4 object-cover rounded-sm border border-black/40" />
                    <span className="text-[10px] font-bold truncate w-full text-center">
                      {team.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-[#232A3D] bg-[#131827] text-xs font-bold text-slate-400 hover:text-white transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!fullName.trim() || !ign.trim()}
              className="w-2/3 purple-glow-btn text-white py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> XÁC NHẬN ĐĂNG KÝ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
