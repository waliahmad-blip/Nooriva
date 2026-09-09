"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { playGlassPing, playPop } from "@/lib/sound";

export default function BackToHome({
  label = "ORBIT ORIGIN // 00 · NOORIVA",
  className = "",
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    mouseX.set(x * 0.35);
    mouseY.set(y * 0.35);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    playGlassPing();
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: mouseX, y: mouseY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <Link
        href="/"
        onClick={playPop}
        className="group relative inline-flex items-center gap-2.5 rounded-full p-[1.5px] transition-all duration-300 focus:outline-none"
        aria-label="Return to orbit origin NOORIVA home"
      >
        {/* Orbiting Laser Ring Gradient (#22d3ee to #ff5e99) */}
        <span
          className="absolute inset-0 rounded-full opacity-80 blur-[1px] transition-all duration-300 group-hover:opacity-100 group-hover:blur-[2px] animate-pulse"
          style={{ background: 'linear-gradient(135deg, #22d3ee, #ff5e99)' }}
        />

        {/* Capsule Core Body */}
        <span className="relative flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-ink backdrop-blur-xl transition-all duration-300 group-hover:bg-white group-hover:text-cyan-600 shadow-sm">
          <motion.span
            animate={{ x: hovered ? -3 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center text-cyan-500"
          >
            <ArrowLeft size={14} />
          </motion.span>
          <Sparkles size={12} className="text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">[ (✦) ← {label} ]</span>
          <span className="sm:hidden font-bold">NOORIVA</span>
        </span>
      </Link>
    </motion.div>
  );
}
