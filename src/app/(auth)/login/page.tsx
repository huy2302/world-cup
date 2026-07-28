"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/zod-schemas";
import { loginUser } from "@/actions/auth-actions";
import Link from "next/link";
import { Trophy, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage("");

    const res = await loginUser(data);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      window.location.href = "/tournaments";
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl bg-white">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Coach &amp; Admin Login</h2>
          <p className="text-xs text-slate-500 font-medium">Access your FC Online tournament portal</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Username or Email</label>
            <input
              {...register("username")}
              type="text"
              placeholder="e.g. pro_huy or admin@fconline.gg"
              className="w-full bg-slate-50 text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition font-medium"
            />
            {errors.username && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.username.message}</p>}
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cyber-button py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2 shadow-sky-500/20"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-600 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-sky-600 hover:underline font-extrabold">
            Register Coach Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
