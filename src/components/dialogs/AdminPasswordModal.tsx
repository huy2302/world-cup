"use client";

import { useState } from "react";
import { X, Lock, ShieldCheck, AlertCircle } from "lucide-react";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminPasswordModal({ isOpen, onClose, onSuccess }: AdminPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2323") {
      setError(false);
      setPassword("");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#0D111E] border border-[#1F263B] rounded-3xl p-6 shadow-2xl text-white flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F263B] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">XÁC THỰC ADMIN</h3>
              <p className="text-[11px] text-slate-400">Nhập mật khẩu để mở khóa Quay giải</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#161D2F] border border-[#232D44] hover:border-purple-400 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider block mb-1.5">
              Mật Khẩu Admin (PIN)
            </label>
            <input
              type="password"
              autoFocus
              required
              placeholder="Nhập 4 số PIN..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className={`w-full bg-[#131827] border rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-center tracking-widest text-white placeholder-slate-600 outline-none transition ${
                error
                  ? "border-red-500/80 focus:border-red-500 bg-red-950/20"
                  : "border-[#232A3D] focus:border-purple-500"
              }`}
            />
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-red-400 animate-shake">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Mật khẩu không đúng! (Gợi ý: 2323)</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-[#232A3D] bg-[#131827] text-xs font-bold text-slate-400 hover:text-white transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 purple-glow-btn text-white py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4" /> MỞ KHÓA QUAY GIẢI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
