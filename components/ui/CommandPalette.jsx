"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Sparkles, Home, MessageCircle, User, Zap, ChefHat, Moon,
  CloudSun, ScanLine, Heart, Pill, Bed, Dumbbell, GlassWater, Stethoscope,
  Languages, Shield, ClipboardList
} from "lucide-react";
import { useRouter } from "next/navigation";

const NAV_ACTIONS = [
  { id: "home", name: "Home", group: "Navigate", icon: Home, href: "/" },
  { id: "account", name: "Personal Dashboard", group: "Navigate", icon: User, href: "/account" },
  { id: "chat", name: "Noorix Chat", group: "Navigate", icon: MessageCircle, href: "/noorix/chat" },
  { id: "hub", name: "AI API Hub", group: "Navigate", icon: Zap, href: "/api-hub" },
];

const FEATURES_QUICK = [
  { id: "skinIntelligence", name: "Skin Scan", group: "Skin", icon: ScanLine },
  { id: "ingredientIntelligence", name: "Ingredient Decoder", group: "Skin", icon: ClipboardList },
  { id: "glowJournal", name: "Glow Journal", group: "Skin", icon: Heart },
  { id: "treatmentRoutine", name: "Treatment Plan", group: "Skin", icon: Sparkles },
  { id: "progressStreaks", name: "Streaks", group: "Skin", icon: Zap },
  { id: "mealPhoto", name: "Meal Analyzer", group: "Nutrition", icon: ChefHat },
  { id: "supplement", name: "Supplement Guide", group: "Nutrition", icon: Pill },
  { id: "sleep", name: "Sleep Optimizer", group: "Sleep", icon: Bed },
  { id: "fitness", name: "Workout AI", group: "Fitness", icon: Dumbbell },
  { id: "hydration", name: "Hydration", group: "Nutrition", icon: GlassWater },
  { id: "symptom", name: "Symptom Checker", group: "Health", icon: Stethoscope },
  { id: "sun", name: "UV Protection", group: "Skin", icon: CloudSun },
  { id: "freeChat", name: "Free Chat", group: "Chat", icon: MessageCircle },
  { id: "glowScore", name: "Glow Score", group: "Skin", icon: Sparkles },
  { id: "healthRisk", name: "Health Risk AI", group: "Health", icon: Shield },
  { id: "medicalImage", name: "Medical Imaging", group: "Health", icon: ScanLine },
  { id: "weatherGlow", name: "Weather Glow", group: "Skin", icon: CloudSun },
  { id: "culturalAdapt", name: "Cultural Adapt", group: "Skin", icon: Moon },
  { id: "glowRitualFinder", name: "Ritual Finder", group: "Skin", icon: Heart },
  { id: "multilingualVoice", name: "Multilingual Voice", group: "Chat", icon: Languages },
];

const ALL_ACTIONS = [...NAV_ACTIONS, ...FEATURES_QUICK];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const filtered = ALL_ACTIONS.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.group.toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPalette]);

  const runAction = (action) => {
    setOpen(false);
    if (action.href) {
      router.push(action.href);
    } else if (action.id) {
      router.push(`/noorix/chat?feature=${action.id}`);
    }
  };

  useEffect(() => setActive(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#121218]/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % filtered.length); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + filtered.length) % filtered.length); }
                  if (e.key === "Enter" && filtered[active]) runAction(filtered[active]);
                }}
                placeholder="Search Noorix features or pages..."
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
              <kbd className="rounded-lg bg-white/10 px-2 py-1 text-[10px] font-bold text-white/40">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-white/40">No results for "{query}"</p>
              ) : (
                filtered.map((action, i) => {
                  const Icon = action.icon || Sparkles;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => runAction(action)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                      }`}
                    >
                      <Icon size={16} className={i === active ? "text-pink-400" : "text-white/40"} />
                      <span className="flex-1">{action.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-white/30">{action.group}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-2.5 text-[11px] text-white/30">
              ↑↓ navigate · Enter launch · Esc close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
