"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { playGlassPing } from "@/lib/sound";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/noorix/chat")) {
    return null;
  }

  const scrollToTop = () => {
    playGlassPing();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Circular Ring math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {/* 1. Viewport Top Laser Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left pointer-events-none"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #22d3ee, #ff8fb2, #a78bfa)",
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)",
        }}
      />

      {/* 2. Floating Circular Progress Ring & Jump Button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
          >
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of sanctuary"
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xl backdrop-blur-xl border border-ink/10 transition-all hover:bg-white focus:outline-none"
            >
              {/* Circular SVG Laser Progress Ring */}
              <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 52 52">
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  className="stroke-ink/10"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  stroke="url(#laserScrollGrad)"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-150 ease-out"
                />
                <defs>
                  <linearGradient id="laserScrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#ff8fb2" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>

              <ArrowUp
                size={18}
                className="relative z-10 text-ink/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-600"
              />

              {/* Live Percent Badge on Hover */}
              <span className="absolute -top-7 rounded-full bg-ink/90 px-2 py-0.5 text-[9px] font-mono font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {scrollPercent}%
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
