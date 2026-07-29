import { getDisputedMatches } from "@/actions/admin-actions";
import { getSession } from "@/lib/auth";
import { serializeData } from "@/lib/utils";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AdminDisputeClient from "./AdminDisputeClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let session = null;
  try {
    session = await getSession();
  } catch {
    session = null;
  }

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  let disputes: any[] = [];
  try {
    const res = await getDisputedMatches();
    disputes = res?.disputes || [];
  } catch {
    disputes = [];
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 rounded-2xl border border-[#1D263B] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <AlertCircle className="w-6 h-6 text-red-400" />
            Admin Dispute Resolution Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review player match score submissions, inspect screenshot proofs, and settle tournament disputes
          </p>
        </div>
      </div>

      <AdminDisputeClient initialDisputes={serializeData(disputes)} />
    </div>
  );
}
