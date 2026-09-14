"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Home, ShoppingBag, Sparkles, Moon, Crown, Gamepad2, MessageCircle, User, Bot } from "lucide-react";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { SCENES } from "@/lib/scenes";

const ICONS = {
  home: Home,
  flavours: ShoppingBag,
  inside: Sparkles,
  rituals: Moon,
  society: Crown,
  play: Gamepad2,
  voices: MessageCircle,
};

export default function MobileNav() {
  const activeScene = useStore((s) => s.activeScene);
  const setActiveScene = useStore((s) => s.setActiveScene);
  const t = useT();
  const activeBtnRef = useRef(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeScene]);

  return (
    <nav
      className="fixed bottom-3 inset-x-2 z-30 flex justify-center md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Scene navigation"
    >
      <div className="glass flex items-center gap-0.5 overflow-x-auto no-scrollbar scroll-smooth rounded-full bg-white/90 px-1.5 py-1 shadow-lg backdrop-blur-xl max-w-full">
        {/* All Scene buttons kept intact */}
        {SCENES.map((scene) => {
          const Icon = ICONS[scene.id];
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              ref={isActive ? activeBtnRef : null}
              onClick={() => setActiveScene(scene.id)}
              aria-pressed={isActive}
              aria-label={t(`scene.${scene.id}`)}
              className={`tap-target shrink-0 relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 transition-all ${
                isActive ? "text-ink scale-105 font-bold" : "text-ink/60 hover:text-ink/80"
              }`}
              style={{ minWidth: "40px", minHeight: "42px" }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[1]})`,
                  }}
                />
              )}
              <Icon size={17} className="relative z-10" />
              <span className="relative z-10 text-[8px] font-bold leading-none">
                {t(`scene.${scene.id}`)}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="h-6 w-px shrink-0 bg-ink/10 mx-0.5" />

        {/* Noorix AI Link */}
        <Link
          href="/noorix/chat"
          className="tap-target shrink-0 relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 transition-all hover:scale-105"
          style={{ minWidth: "40px", minHeight: "42px" }}
          aria-label="Noorix AI"
        >
          <span
            className="absolute inset-0 rounded-full opacity-25"
            style={{
              background: "linear-gradient(135deg, #ff8fb2, #a78bfa)",
            }}
          />
          <Bot size={17} className="relative z-10 text-ink" />
          <span className="relative z-10 text-[8px] font-bold leading-none text-ink">Noorix AI</span>
        </Link>

        {/* Account Link */}
        <Link
          href="/account"
          className="tap-target shrink-0 relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 transition-all hover:scale-105"
          style={{ minWidth: "40px", minHeight: "42px" }}
          aria-label="My Account"
        >
          <span
            className="absolute inset-0 rounded-full opacity-25"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
            }}
          />
          <User size={17} className="relative z-10 text-ink" />
          <span className="relative z-10 text-[8px] font-bold leading-none text-ink">Account</span>
        </Link>
      </div>
    </nav>
  );
}
