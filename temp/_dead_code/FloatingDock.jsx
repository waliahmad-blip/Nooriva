"use client";

import { motion } from "framer-motion";
import { Home, ShoppingBag, Moon, Gamepad2 } from "lucide-react";

export default function FloatingDock({ activeScene, setActiveScene }) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "shop", icon: ShoppingBag, label: "Shop" },
    { id: "rituals", icon: Moon, label: "Rituals" },
    { id: "play", icon: Gamepad2, label: "Play" },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 24 }}
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2"
      aria-label="Primary navigation"
    >
      <div className="glass flex items-center gap-1 rounded-full bg-white/60 p-1.5 shadow-2xl md:gap-2 md:p-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeScene === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScene(item.id)}
              aria-pressed={isActive}
              className="relative flex flex-col items-center justify-center rounded-full px-3 py-2 transition hover:bg-white/50 md:px-4"
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                className={`relative z-10 ${isActive ? "text-cream" : "text-ink"}`}
              />
              <span
                className={`relative z-10 mt-0.5 text-[8px] font-bold tracking-wider md:text-[9px] ${
                  isActive ? "text-cream" : "text-ink/60"
                }`}
              >
                {item.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
