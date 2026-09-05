"use client";
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

  return (
    <nav
      className="fixed bottom-3 inset-x-3 z-30 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Scene navigation"
    >
      <div className="glass flex items-center justify-between rounded-full bg-white/85 px-1.5 py-1.5">
        {/* All Scene buttons kept intact */}
        {SCENES.map((scene) => {
          const Icon = ICONS[scene.id];
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              aria-pressed={isActive}
              aria-label={t(`scene.${scene.id}`)}
              className={`tap-target relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 transition-all ${
                isActive ? "text-ink scale-105" : "text-ink/50 hover:text-ink/70"
              }`}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[1]})`,
                  }}
                />
              )}
              <Icon size={18} className="relative" />
              <span className="relative text-[8px] font-bold leading-none">
                {t(`scene.${scene.id}`)}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="h-8 w-px bg-ink/10 mx-0.5" />

        {/* Noorix AI Link */}
        <Link
          href="/noorix"
          className="tap-target relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 transition-all hover:scale-105"
          style={{ minWidth: "44px", minHeight: "44px" }}
          aria-label="Noorix AI"
        >
          <span
            className="absolute inset-0 rounded-full opacity-25"
            style={{
              background: "linear-gradient(135deg, #ff8fb2, #a78bfa)",
            }}
          />
          <Bot size={18} className="relative text-ink" />
          <span className="relative text-[8px] font-bold leading-none text-ink">AI</span>
        </Link>

        {/* Account Link (No useSession to avoid hydration errors) */}
        <Link
          href="/account"
          className="tap-target relative flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 transition-all hover:scale-105"
          style={{ minWidth: "44px", minHeight: "44px" }}
          aria-label="My Account"
        >
          <span
            className="absolute inset-0 rounded-full opacity-25"
            style={{
              background: "linear-gradient(135deg, #E7D3A8, #C79A44)",
            }}
          />
          <User size={18} className="relative text-ink" />
          <span className="relative text-[8px] font-bold leading-none text-ink">Me</span>
        </Link>
      </div>
    </nav>
  );
}
