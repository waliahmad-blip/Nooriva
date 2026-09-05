"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, GlassWater, MessageCircle, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { id: "chat", label: "Chat", icon: MessageCircle, href: "/noorix/chat", color: "from-pink-500 to-rose-500" },
  { id: "hub", label: "API Hub", icon: Zap, href: "/api-hub", color: "from-violet-500 to-purple-500" },
  { id: "quiz", label: "Quiz", icon: Sparkles, href: "/account?quiz=1", color: "from-amber-500 to-orange-500" },
  { id: "water", label: "Water +1", icon: GlassWater, action: "water", color: "from-cyan-500 to-blue-500" },
];

export default function QuickActionFab() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handle = (a) => {
    setOpen(false);
    if (a.action === "water") {
      const today = new Date().toDateString();
      const key = "noorix-water-" + today;
      const current = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, String(current + 1));
      window.dispatchEvent(new Event("noorix-water-updated"));
    } else if (a.href) {
      router.push(a.href);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-16 right-0 flex flex-col gap-3"
            >
              {ACTIONS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.button
                    key={a.id}
                    variants={{
                      open: { opacity: 1, y: 0, scale: 1 },
                      closed: { opacity: 0, y: 20, scale: 0.5 },
                    }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => handle(a)}
                    className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${a.color} px-4 py-3 text-xs font-bold text-white shadow-lg`}
                  >
                    <Icon size={16} />
                    {a.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white shadow-2xl shadow-pink-500/30"
        aria-label="Quick actions"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }}>
          {open ? <X size={22} /> : <Plus size={22} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
