"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, Check } from "lucide-react";

const QUESTIONS = [
  {
    key: "goal",
    title: "What do you want most from your glow?",
    options: [
      { value: "radiance", label: "Radiant skin", emoji: "✨", ritual: "ROSE HALO" },
      { value: "energy", label: "Daily energy", emoji: "⚡", ritual: "MANGO BLAZE" },
      { value: "calm", label: "Calm & sleep", emoji: "🌙", ritual: "PEACH DUSK" },
      { value: "lush", label: "Strong hair", emoji: "🌿", ritual: "COCO GLOW" },
    ],
  },
  {
    key: "taste",
    title: "Which flavor world calls you?",
    options: [
      { value: "rose", label: "Rose & Saffron", emoji: "🌹" },
      { value: "berry", label: "Berry & Pomegranate", emoji: "🍓" },
      { value: "passion", label: "Passion & Papaya", emoji: "🥭" },
      { value: "citrus", label: "Yuzu & Aloe", emoji: "🍋" },
    ],
  },
  {
    key: "time",
    title: "How much time for your ritual?",
    options: [
      { value: "quick", label: "2 minutes", emoji: "⏱️" },
      { value: "medium", label: "5 minutes", emoji: "🕐" },
      { value: "slow", label: "15+ minutes", emoji: "🧖" },
    ],
  },
];

export default function GlowQuiz() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("noorix-quiz-done");
    if (!completed) {
      const t = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const select = (q, opt) => {
    const next = { ...answers, [q.key]: opt.value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("noorix-quiz-done", "true");
      localStorage.setItem("noorix-quiz-answers", JSON.stringify(next));
      setDone(true);
    }
  };

  const close = () => {
    setShow(false);
    localStorage.setItem("noorix-quiz-done", "true");
  };

  if (!show) return null;

  const q = QUESTIONS[step];
  const goalOption = QUESTIONS[0].options.find((o) => o.value === answers.goal);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#121218] p-8 shadow-2xl"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 rounded-full p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Close quiz"
            >
              <X size={18} />
            </button>

            {done ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-3xl"
                >
                  {goalOption?.emoji ?? "💫"}
                </motion.div>
                <h2 className="mt-5 text-2xl font-extrabold text-white">Your glow is ready</h2>
                <p className="mt-2 text-sm text-white/60">
                  Based on your answers, we recommend{" "}
                  <span className="font-bold text-pink-400">{goalOption?.ritual ?? "a NOORISH GOLD ritual"}</span>.
                </p>
                <button
                  onClick={() => setShow(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <Check size={16} /> Start my dashboard
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        i <= step ? "bg-pink-500" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-300">
                    Step {step + 1} of {QUESTIONS.length}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">{q.title}</h2>
                <div className="mt-5 grid gap-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => select(q, opt)}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-pink-400/40 hover:bg-white/10"
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="flex-1 text-sm font-semibold text-white">{opt.label}</span>
                      <ArrowRight size={16} className="text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-pink-400" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
