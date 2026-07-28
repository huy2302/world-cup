"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/zod-schemas";
import { registerUser } from "@/actions/auth-actions";
import Link from "next/link";
import { UserPlus, Trophy, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      squadValue: 1000000000000,
      favoriteClub: "Real Madrid",
      role: "PLAYER",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setErrorMessage("");

    const res = await registerUser(data);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      window.location.href = "/tournaments";
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl bg-white">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Create FC Online Profile</h2>
          <p className="text-xs text-slate-500 font-medium">Join competitive tournaments &amp; climb ELO rankings</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Username</label>
              <input
                {...register("username")}
                type="text"
                placeholder="e.g. pro_huy"
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
              />
              {errors.username && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.username.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="huy@fconline.gg"
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
              />
              {errors.email && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
            />
            {errors.password && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">FC Online Coach Name (IGN)</label>
              <input
                {...register("ign")}
                type="text"
                placeholder="e.g. FCPro_HuyDev"
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
              />
              {errors.ign && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.ign.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Squad Value (BP)</label>
              <input
                {...register("squadValue", { valueAsNumber: true })}
                type="number"
                placeholder="1000000000000"
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none font-mono text-xs font-bold"
              />
              {errors.squadValue && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.squadValue.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Favorite Football Club</label>
              <input
                {...register("favoriteClub")}
                type="text"
                placeholder="e.g. Real Madrid, Man City"
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Account Role</label>
              <select
                {...register("role")}
                className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none font-bold"
              >
                <option value="PLAYER">Tournament Player</option>
                <option value="ADMIN">Tournament Administrator</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cyber-button py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4 shadow-sky-500/20"
          >
            <UserPlus className="w-4 h-4" />
            {isLoading ? "Creating Account..." : "Register Coach Account"}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-600 font-medium">
          Already registered?{" "}
          <Link href="/login" className="text-sky-600 hover:underline font-extrabold">
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
