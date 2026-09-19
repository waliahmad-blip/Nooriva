import NoorixPlans from "@/components/noorix/NoorixPlans";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Membership Plans & Tiers | Noorix AI — NOORIVA",
  description: "Explore all 8 Noorix AI intelligence tiers. Unlock daily photo skin scans, certified dermatologist consultations, and bespoke longevity wellness routines.",
};

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-ink">
      {/* Subpage Breadcrumb / Header navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-ink/70 backdrop-blur-md transition-all hover:bg-white hover:text-ink hover:shadow-sm"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/noorix/chat"
              className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-1.5 text-xs font-bold text-pink-600 transition-all hover:bg-pink-500/20"
            >
              <MessageCircle size={13} /> Chat with Noorix
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink transition-all hover:bg-white"
            >
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Plans in full page mode */}
      <NoorixPlans isPage={true} />
    </main>
  );
}
