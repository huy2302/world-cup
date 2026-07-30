"use client";

import { useState } from "react";
import { X, Trophy, User, Gamepad2, Check, Sparkles, LayoutGrid, Dices } from "lucide-react";
import { FormationType } from "@/types/tournament";

export interface NationalTeam {
  id: string;
  name: string;
  code: string;
  flag: string;
  tier: "S" | "A" | "B" | "C";
}

export const WORLD_CUP_TEAMS: NationalTeam[] = [
  // 🔴 Tier S (6 đội)
  { id: "fra", name: "Pháp", code: "FRA", flag: "https://flagcdn.com/w40/fr.png", tier: "S" },
  { id: "esp", name: "Tây Ban Nha", code: "ESP", flag: "https://flagcdn.com/w40/es.png", tier: "S" },
  { id: "arg", name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w40/ar.png", tier: "S" },
  { id: "bra", name: "Brazil", code: "BRA", flag: "https://flagcdn.com/w40/br.png", tier: "S" },
  { id: "por", name: "Bồ Đào Nha", code: "POR", flag: "https://flagcdn.com/w40/pt.png", tier: "S" },
  { id: "eng", name: "Anh", code: "ENG", flag: "https://flagcdn.com/w40/gb-eng.png", tier: "S" },

  // 🟠 Tier A (10 đội)
  { id: "ger", name: "Đức", code: "GER", flag: "https://flagcdn.com/w40/de.png", tier: "A" },
  { id: "ned", name: "Hà Lan", code: "NED", flag: "https://flagcdn.com/w40/nl.png", tier: "A" },
  { id: "bel", name: "Bỉ", code: "BEL", flag: "https://flagcdn.com/w40/be.png", tier: "A" },
  { id: "uru", name: "Uruguay", code: "URU", flag: "https://flagcdn.com/w40/uy.png", tier: "A" },
  { id: "col", name: "Colombia", code: "COL", flag: "https://flagcdn.com/w40/co.png", tier: "A" },
  { id: "cro", name: "Croatia", code: "CRO", flag: "https://flagcdn.com/w40/hr.png", tier: "A" },
  { id: "nor", name: "Na Uy", code: "NOR", flag: "https://flagcdn.com/w40/no.png", tier: "A" },
  { id: "mar", name: "Morocco", code: "MAR", flag: "https://flagcdn.com/w40/ma.png", tier: "A" },
  { id: "jpn", name: "Nhật Bản", code: "JPN", flag: "https://flagcdn.com/w40/jp.png", tier: "A" },
  { id: "sen", name: "Senegal", code: "SEN", flag: "https://flagcdn.com/w40/sn.png", tier: "A" },

  // 🟡 Tier B (8 đội)
  { id: "tur", name: "Thổ Nhĩ Kỳ", code: "TUR", flag: "https://flagcdn.com/w40/tr.png", tier: "B" },
  { id: "swe", name: "Thụy Điển", code: "SWE", flag: "https://flagcdn.com/w40/se.png", tier: "B" },
  { id: "sui", name: "Thụy Sĩ", code: "SUI", flag: "https://flagcdn.com/w40/ch.png", tier: "B" },
  { id: "aut", name: "Áo", code: "AUT", flag: "https://flagcdn.com/w40/at.png", tier: "B" },
  { id: "ecu", name: "Ecuador", code: "ECU", flag: "https://flagcdn.com/w40/ec.png", tier: "B" },
  { id: "usa", name: "Mỹ", code: "USA", flag: "https://flagcdn.com/w40/us.png", tier: "B" },
  { id: "mex", name: "Mexico", code: "MEX", flag: "https://flagcdn.com/w40/mx.png", tier: "B" },
  { id: "cze", name: "CH Séc", code: "CZE", flag: "https://flagcdn.com/w40/cz.png", tier: "B" },

  // 🟢 Tier C (6 đội)
  { id: "civ", name: "Bờ Biển Ngà", code: "CIV", flag: "https://flagcdn.com/w40/ci.png", tier: "C" },
  { id: "gha", name: "Ghana", code: "GHA", flag: "https://flagcdn.com/w40/gh.png", tier: "C" },
  { id: "egy", name: "Ai Cập", code: "EGY", flag: "https://flagcdn.com/w40/eg.png", tier: "C" },
  { id: "par", name: "Paraguay", code: "PAR", flag: "https://flagcdn.com/w40/py.png", tier: "C" },
  { id: "can", name: "Canada", code: "CAN", flag: "https://flagcdn.com/w40/ca.png", tier: "C" },
  { id: "kor", name: "Hàn Quốc", code: "KOR", flag: "https://flagcdn.com/w40/kr.png", tier: "C" },
];

export const AVAILABLE_FORMATIONS: { id: FormationType; label: string; desc: string }[] = [
  { id: "4-2-3-1", label: "4-2-3-1", desc: "Cân bằng & Kiểm soát" },
  { id: "4-3-3", label: "4-3-3", desc: "Tấn công 3 tiền đạo" },
  { id: "4-1-2-1-2", label: "4-1-2-1-2", desc: "Tấn công trung lộ" },
  { id: "3-5-2", label: "3-5-2", desc: "Kiểm soát tuyến giữa" },
  { id: "5-2-1-2", label: "5-2-1-2", desc: "Phòng ngự phản công" },
];

export interface PlayerRegistrationForm {
  fullName: string;
  ign: string;
  formation: FormationType;
  selectedTeam?: NationalTeam;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PlayerRegistrationForm) => void;
  registeredCount?: number;
}

export default function RegisterModal({ isOpen, onClose, onSubmit, registeredCount = 0 }: RegisterModalProps) {
  const [fullName, setFullName] = useState("");
  const [ign, setIgn] = useState("");
  const [formation, setFormation] = useState<FormationType>("4-2-3-1");

  if (!isOpen) return null;

  const isLocked = registeredCount >= 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (!fullName.trim() || !ign.trim()) return;

    onSubmit({
      fullName: fullName.trim(),
      ign: ign.trim(),
      formation,
    });

    setFullName("");
    setIgn("");
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0D111E] border border-[#1F263B] rounded-3xl p-6 shadow-2xl text-white flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F263B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-purple-400">
              <Trophy className="w-5 h-5 fill-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">ĐĂNG KÝ THAM GIA GIẢI ĐẤU</h2>
              <span className="text-xs text-slate-400">FC Online World Cup Champions Cup 2026 ({registeredCount}/12 Slot)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161D2F] border border-[#232D44] hover:border-purple-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner about Slot Limit */}
        {isLocked ? (
          <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/60 flex items-center gap-3 text-xs text-amber-200">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white">Đã đủ 12/12 Slot:</strong> Cổng đăng ký đã đạt đủ số lượng VĐV tối đa và chính thức đóng lại!
            </span>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center gap-3 text-xs text-purple-200">
            <Dices className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
            <span>
              <strong className="text-white">Bốc thăm Đội tuyển:</strong> Đội tuyển đại diện của bạn sẽ được Admin bốc thăm ngẫu nhiên (không trùng lặp) trong buổi quay giải!
            </span>
          </div>
        )}

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
              disabled={isLocked}
              placeholder="Nhập tên thật của bạn (VD: Nguyễn Văn A)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#131827] border border-[#232A3D] focus:border-[#7C3AED] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition disabled:opacity-50"
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
              disabled={isLocked}
              placeholder="Nhập tên Ingame FC Online (VD: FCPro_HuyDev)"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full bg-[#131827] border border-[#232A3D] focus:border-[#7C3AED] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition font-bold disabled:opacity-50"
            />
          </div>

          {/* 3. Chọn Đội Hình Thi Đấu (Sơ Đồ Chiến Thuật) */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-purple-400" /> Chọn Sơ Đồ Chiến Thuật <span className="text-purple-400">*</span>
              </span>
              <span className="text-[11px] font-bold text-purple-300">
                {formation}
              </span>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {AVAILABLE_FORMATIONS.map((fmt) => {
                const isSelected = formation === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() => setFormation(fmt.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center disabled:opacity-50 ${
                      isSelected
                        ? "bg-[#251A3E] border-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-[#121727] border-[#1E263A] text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    <span className="text-xs font-black tracking-tight">{fmt.label}</span>
                    <span className="text-[9px] text-slate-400 leading-tight line-clamp-1">{fmt.desc}</span>
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
              disabled={isLocked || !fullName.trim() || !ign.trim()}
              className="w-2/3 purple-glow-btn text-white py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" /> {isLocked ? "ĐÃ KHÓA THAM GIA (ĐỦ 12 SLOT)" : "XÁC NHẬN ĐĂNG KÝ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
