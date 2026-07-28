"use client";

import { Trophy, UserPlus } from "lucide-react";

interface RegisterButtonProps {
  onClick: () => void;
  className?: string;
}

export default function RegisterButton({ onClick, className = "" }: RegisterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cyber-button px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] ${className}`}
    >
      <UserPlus className="w-4 h-4" />
      <span>REGISTER TOURNAMENT</span>
    </button>
  );
}
