"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Volume2, VolumeX, User, Sparkles, Users, CloudSun, Crown, Leaf } from "lucide-react";
import { useStore } from "@/lib/store";
import { playPop } from "@/lib/sound";
import LanguageToggle from "./LanguageToggle";
import AnimatedLogo from "./AnimatedLogo";

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const openBag = useStore((s) => s.openBag);
  const cart = useStore((s) => s.cart);
  const soundOn = useStore((s) => s.soundOn);

  const toggleSound = () => {
    const turningOn = !useStore.getState().soundOn;
    useStore.getState().toggleSound();
    if (turningOn) playPop();
  };

  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="section-shell mt-3 flex items-center justify-between">
        {/* Logo + Brand - Clickable to Home */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-white/50 px-3 py-2 backdrop-blur-xl transition hover:scale-105 md:gap-3 md:px-4 md:py-2.5"
          style={{ animation: "topbar-glow 4s ease-in-out infinite" }}
          aria-label="NOORIVA Home"
        >
          <AnimatedLogo size="small" />
          
        </Link>

        {/* Action buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Noorix AI Link */}
          <Link
            href="/noorix"
            className="tap-target relative flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105"
            style={{
              minWidth: "44px",
              minHeight: "44px",
              background: "linear-gradient(135deg, #ff8fb2, #a78bfa)",
            }}
            aria-label="Open Noorix AI"
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">Noorix AI</span>
          </Link>
          <Link href="/club" className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white" aria-label="NOORIVA Club">
            <Users size={16} />
            <span className="hidden lg:inline">Club</span>
          </Link>
          <Link href="/weather" className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white" aria-label="Weather Glow">
            <CloudSun size={16} />
            <span className="hidden lg:inline">Weather</span>
          </Link>
          <Link href="/quiz" className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white" aria-label="Glow Quiz">
            <Sparkles size={16} />
            <span className="hidden lg:inline">Quiz</span>
          </Link>
          <Link href="/ambassador" className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white" aria-label="Ambassador Hub">
            <Crown size={16} />
            <span className="hidden lg:inline">Ambassador</span>
          </Link>
          <Link href="/ingredients" className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white" aria-label="Ingredients Story">
            <Leaf size={16} />
            <span className="hidden lg:inline">Story</span>
          </Link>
          <button
            onClick={toggleSound}
            className="tap-target flex items-center justify-center rounded-full bg-white/60 p-2.5 text-ink backdrop-blur-xl transition hover:bg-white hover:scale-105"
            style={{ minWidth: "44px", minHeight: "44px" }}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <LanguageToggle />

          {/* Account / Login Link */}
          <Link
            href="/account"
            className="tap-target hidden items-center justify-center rounded-full bg-white/60 p-2.5 text-ink backdrop-blur-xl transition hover:bg-white hover:scale-105 md:flex"
            style={{ minWidth: "44px", minHeight: "44px" }}
            aria-label="My Account"
          >
            <User size={18} />
          </Link>

          {/* Bag Button */}
          <button
            onClick={openBag}
            className="tap-target relative flex items-center justify-center rounded-full bg-ink p-2.5 text-cream shadow-lg transition hover:scale-105"
            style={{ minWidth: "44px", minHeight: "44px" }}
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={18} />
            {mounted && count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-noor-rose text-[10px] font-bold text-white ring-2 ring-cream">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
