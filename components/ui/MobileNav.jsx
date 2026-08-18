"use client";

import { Home, ShoppingBag, Sparkles, Moon, Crown, Gamepad2, MessageCircle } from "lucide-react";
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
    <nav className="fixed bottom-3 inset-x-3 z-30 md:hidden">
      <div className="glass flex items-center justify-between rounded-full bg-white/80 px-2 py-2">
        {SCENES.map((scene) => {
          const Icon = ICONS[scene.id];
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              aria-pressed={isActive}
              className={`relative flex flex-col items-center gap-0.5 rounded-full px-1.5 py-1 transition ${
                isActive ? "text-ink" : "text-ink/50"
              }`}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[1]})`,
                  }}
                />
              )}
              <Icon size={17} className="relative" />
              <span className="relative text-[8px] font-bold">
                {t(`scene.${scene.id}`)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}