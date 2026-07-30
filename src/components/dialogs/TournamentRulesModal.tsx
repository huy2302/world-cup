"use client";

import { useEffect } from "react";
import {
  X,
  Trophy,
  Calendar,
  Users,
  Shuffle,
  Shield,
  Zap,
  Swords,
  Scale,
  Award,
  FileCheck,
  ChevronRight,
} from "lucide-react";

interface TournamentRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TournamentRulesModal({ isOpen, onClose }: TournamentRulesModalProps) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0d1322] rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] p-6 sm:p-8 text-slate-100 flex flex-col gap-6 my-auto max-h-[88vh] overflow-y-auto custom-scrollbar transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-[#0d1322]/95 backdrop-blur z-10 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                THỂ THỨC GIẢI ĐẤU
              </h2>
              <span className="text-xs font-bold text-cyan-400">
                🏆 FC Online Trung Quốc - World Cup Draft Tournament
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer shrink-0"
            title="Đóng (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Content Sections */}
        <div className="flex flex-col gap-6 text-xs text-slate-300">
          {/* Section 1: Thời gian */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Thời gian</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Khai mạc:</strong> 19:30 - Thứ Hai (03/08/2026)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Giải đấu diễn ra trong <strong>2 ngày liên tiếp</strong>.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Số lượng */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Số lượng</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>12 người chơi</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>12 đội tuyển quốc gia</strong>
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Hình thức */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Shuffle className="w-4 h-4 text-purple-400" />
              <span>Hình thức</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>BTC random người chơi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>BTC random đội tuyển quốc gia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>
                  Sau khi nhận đội tuyển, người chơi chỉ được build đội hình bằng các cầu thủ <strong>thuộc đội tuyển quốc gia đó</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span className="text-red-400 font-semibold">
                  Không được sử dụng cầu thủ của quốc gia khác.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: Quy định đội hình */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Quy định đội hình</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mùa thẻ sử dụng:</strong> PTG</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Mức thẻ cho phép:</strong> +8 → +10
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Giá trị đội hình tối đa:</strong> 200 tỷ BP (Tổng giá trị đội hình không được vượt quá 200 tỷ BP).
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5: Chiến thuật */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-yellow-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Chiến thuật</span>
            </div>
            <p className="pt-1 font-medium leading-relaxed text-slate-200">
              Người chơi được tự do lựa chọn chiến thuật. Có thể sử dụng:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {[
                "Xe buýt 2 tầng",
                "Full công",
                "Gegenpress",
                "Phản công",
                "Tạt cánh đánh đầu",
                "Mọi lối chơi khác",
              ].map((style) => (
                <div
                  key={style}
                  className="px-2.5 py-1.5 rounded-xl bg-[#080d1a] border border-slate-800 text-center font-bold text-[11px] text-yellow-300"
                >
                  {style}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-1 font-medium">
              * Không giới hạn sơ đồ chiến thuật.
            </p>
          </div>

          {/* Section 6: Thể thức thi đấu */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sky-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Swords className="w-4 h-4 text-sky-400" />
              <span>Thể thức thi đấu</span>
            </div>
            
            <div className="flex flex-col gap-2 pt-1">
              <span className="font-extrabold text-cyan-300 text-xs uppercase tracking-wider">Vòng bảng:</span>
              <ul className="space-y-1.5 font-medium leading-relaxed text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>12 người chơi được chia thành <strong>4 bảng</strong> (Mỗi bảng 3 người chơi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>Thi đấu vòng tròn, mỗi người chơi thi đấu <strong>2 trận</strong> tại vòng bảng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Nhất mỗi bảng</strong> giành quyền đi tiếp (Tổng cộng 4 người chơi vào vòng knock-out).</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
              <span className="font-extrabold text-amber-300 text-xs uppercase tracking-wider">Xếp hạng vòng bảng:</span>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-200 bg-[#080d1a] p-2.5 rounded-xl border border-slate-800">
                <span>Thắng: <strong className="text-emerald-400">3 điểm</strong></span>
                <span>Hòa: <strong className="text-amber-400">1 điểm</strong></span>
                <span>Thua: <strong className="text-rose-400">0 điểm</strong></span>
              </div>
              <p className="text-[11px] text-slate-300 font-semibold pt-1">
                Thứ tự ưu tiên xét khi các người chơi bằng điểm:
              </p>
              <ol className="list-decimal list-inside space-y-1 font-semibold text-cyan-300 pl-1 text-[11px]">
                <li><strong>Hiệu số bàn thắng</strong></li>
                <li><strong>Thành tích đối đầu</strong></li>
                <li><strong>Số bàn thua</strong></li>
              </ol>
            </div>
          </div>

          {/* Section 7: Vòng loại trực tiếp */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Swords className="w-4 h-4 text-rose-400" />
              <span>Vòng loại trực tiếp</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Bán kết:</strong> 4 người chơi → 2 trận</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Chung kết:</strong> 2 người chơi → 1 trận</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>BTC sẽ bốc thăm ngẫu nhiên cặp đấu bán kết. Người thắng tiến vào chung kết, người thua bị loại.</span>
              </li>
            </ul>
          </div>

          {/* Section 8: Luật thi đấu */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Luật thi đấu</span>
            </div>
            <ul className="space-y-1.5 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Vòng bảng có thể có kết quả hòa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Các trận bán kết và chung kết không có kết quả hòa.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>
                  Nếu hòa sau thời gian chính thức ở vòng loại trực tiếp: <strong>Đá hiệp phụ</strong>. Nếu vẫn hòa: Phân định bằng <strong>sút luân lưu (Penalty)</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>Mỗi trận đấu loại trực tiếp bắt buộc phải xác định một đội thắng.</span>
              </li>
            </ul>
          </div>

          {/* Section 9: Giải thưởng */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm border-b border-amber-500/30 pb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Giải thưởng</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-900/40 border border-amber-500/50 mt-1">
              <span className="font-extrabold text-sm text-amber-200 flex items-center gap-2">
                🥇 Vô địch
              </span>
              <span className="font-black font-mono text-base text-amber-400">
                100 QQ
              </span>
            </div>
          </div>

          {/* Section 10: Quy định & Tôn trọng */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm border-b border-slate-800 pb-2">
              <FileCheck className="w-4 h-4 text-rose-400" />
              <span>Quy định &amp; Tôn trọng</span>
            </div>
            <ul className="space-y-2 pt-1 font-medium leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Không được đổi đội tuyển sau khi random.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Không được sử dụng cầu thủ ngoài quốc tịch đã nhận.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Chỉ được sử dụng <strong>mùa thẻ PTG</strong>, mức thẻ <strong>+8 đến +10</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Giá trị đội hình không được vượt quá <strong>200 tỷ BP</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Thi đấu đúng lịch BTC thông báo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Không sử dụng bug hoặc exploit của game.</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-300 font-bold">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Thi đấu với tinh thần fair-play và tôn trọng đối thủ.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-3 border-t border-slate-800 flex justify-end sticky bottom-0 bg-[#0d1322]/95 backdrop-blur">
          <button
            onClick={onClose}
            className="cyber-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Đã hiểu &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
