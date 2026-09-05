"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function BackToHome({ label = "Back to Home", className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink/80 backdrop-blur-md transition-all hover:bg-white hover:border-ink/20 hover:scale-105 ${className}`}
    >
      <Home size={16} />
      {label}
    </Link>
  );
}
