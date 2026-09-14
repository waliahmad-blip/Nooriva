"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Volume2, VolumeX, User, Sparkles, Users, CloudSun, Crown, Leaf, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { playPop } from "@/lib/sound";
import LanguageToggle from "./LanguageToggle";
import AnimatedLogo from "./AnimatedLogo";

export default function TopBar() {
  const pathname = usePathname();
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
      <div className="section-shell mt-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo + Brand - Clickable to Home */}
        <Link
          href="/"
          onClick={playPop}
          className="pointer-events-auto flex min-w-0 flex-1 items-center overflow-hidden p-0 bg-transparent border-0 transition hover:scale-105 sm:flex-none"
          aria-label="NOORIVA Home"
        >
          <AnimatedLogo size="small" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-6 rounded-full bg-white/70 px-6 py-2.5 backdrop-blur-xl border border-ink/10 text-xs font-bold tracking-wider uppercase text-ink/75 shadow-sm">
          <Link
            href="/noorish-gold"
            onClick={playPop}
            className={`transition hover:text-ink hover:scale-105 ${
              pathname === "/noorish-gold" ? "text-ink font-extrabold underline underline-offset-4 decoration-amber-400 decoration-2" : ""
            }`}
          >
            NOORISH GOLD
          </Link>
          <Link
            href="/story"
            onClick={playPop}
            className={`transition hover:text-ink hover:scale-105 ${
              pathname === "/story" ? "text-ink font-extrabold underline underline-offset-4 decoration-pink-400 decoration-2" : ""
            }`}
          >
            Our Origin
          </Link>
          <Link
            href="/club"
            onClick={playPop}
            className={`transition hover:text-ink hover:scale-105 ${
              pathname === "/club" ? "text-ink font-extrabold underline underline-offset-4 decoration-purple-400 decoration-2" : ""
            }`}
          >
            Club
          </Link>
          <Link
            href="/ingredients"
            onClick={playPop}
            className={`transition hover:text-ink hover:scale-105 ${
              pathname === "/ingredients" ? "text-ink font-extrabold underline underline-offset-4 decoration-emerald-400 decoration-2" : ""
            }`}
          >
            Botanicals
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="pointer-events-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            className="tap-target flex items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-white/60 p-2 sm:px-3.5 sm:py-2 text-xs font-semibold text-ink/70 backdrop-blur-md transition hover:bg-white hover:scale-105"
            style={{ minWidth: "38px", minHeight: "38px" }}
            aria-label="Search drinks and tools (Ctrl+K)"
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block rounded bg-ink/5 px-1.5 py-0.5 text-[9px] font-mono text-ink/40">⌘K</kbd>
          </button>

          {/* Noorix AI Link */}
          <Link
            href="/noorix/chat"
            onClick={playPop}
            className={`tap-target relative flex items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold text-white shadow-lg transition hover:scale-105 ${
              pathname?.startsWith("/noorix") ? "ring-2 ring-white ring-offset-2" : ""
            }`}
            style={{
              minHeight: "38px",
              background: "linear-gradient(135deg, #ff8fb2, #a78bfa)",
            }}
            aria-label="Open Noorix AI"
          >
            <Sparkles size={15} />
            <span className="hidden sm:inline">Noorix AI</span>
          </Link>

          {/* Sound toggle - desktop/tablet */}
          <button
            onClick={toggleSound}
            className="tap-target hidden items-center justify-center rounded-full bg-white/60 p-2 sm:flex sm:p-2.5 text-ink backdrop-blur-xl transition hover:bg-white hover:scale-105"
            style={{ minWidth: "38px", minHeight: "38px" }}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <LanguageToggle />

          {/* Account / Login Link */}
          <Link
            href="/account"
            onClick={playPop}
            className={`tap-target flex items-center justify-center rounded-full bg-white/60 p-2.5 text-ink backdrop-blur-xl transition hover:bg-white hover:scale-105 ${
              pathname === "/account" ? "ring-2 ring-ink/20" : ""
            }`}
            style={{ minWidth: "38px", minHeight: "38px" }}
            aria-label="My Account"
          >
            <User size={16} />
          </Link>

          {/* Bag Button */}
          <button
            onClick={openBag}
            className="tap-target relative flex items-center justify-center rounded-full bg-ink p-2 sm:p-2.5 text-cream shadow-lg transition hover:scale-105"
            style={{ minWidth: "38px", minHeight: "38px" }}
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={17} />
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
