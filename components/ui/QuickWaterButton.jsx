"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Plus, RotateCcw } from "lucide-react";

function getTodayKey() {
  return "noorix-water-" + new Date().toDateString();
}

export default function QuickWaterButton() {
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  const load = () => setCount(parseInt(localStorage.getItem(getTodayKey()) || "0", 10));

  useEffect(() => {
    load();
    const update = () => load();
    window.addEventListener("noorix-water-updated", update);
    return () => window.removeEventListener("noorix-water-updated", update);
  }, []);

  const addWater = () => {
    const next = count + 1;
    localStorage.setItem(getTodayKey(), String(next));
    setCount(next);
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const resetWater = () => {
    localStorage.setItem(getTodayKey(), "0");
    setCount(0);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <motion.div
        animate={pulse ? { scale: [1, 1.15, 1] } : {}}
        className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-[#0a0a0f]/90 px-4 py-2.5 shadow-xl backdrop-blur-md"
      >
        <Droplets size={18} className="text-cyan-400" />
        <span className="text-sm font-bold text-white">{count}</span>
        <span className="text-xs text-white/40">glasses</span>
        <button
          onClick={addWater}
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-black transition hover:bg-cyan-300"
          aria-label="Add glass of water"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={resetWater}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/50 transition hover:bg-white/10"
          aria-label="Reset water count"
        >
          <RotateCcw size={12} />
        </button>
      </motion.div>
    </div>
  );
}
