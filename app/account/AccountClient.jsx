"use client";

import Link from "next/link";
import React, {
  useState, useRef, useEffect, useMemo, useCallback,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles, LogOut, Send, User, Zap, Crown, Loader2,
  Search, Lock, GlassWater, MessageCircle,
  Camera, Mic, Check, Trophy, Copy, X, Sun, Moon, Heart,
  Activity, Brain, Wind, Dumbbell, Bed, Shield, Star,
  FileText, ChefHat, Calendar, Smile, RefreshCw, Baby,
  ArrowRight, CloudSun,
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackToHome from "@/components/ui/BackToHome";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS (unchanged)
   ═══════════════════════════════════════════════════════════ */

const TIER_LEVELS = ["lite", "glow", "pro", "max", "elite", "premium", "ultimate", "supreme"];

const ALL_FEATURES = [
  { id: "skinIntelligence", name: "Skin Scan", icon: Sparkles, tier: "lite", desc: "AI photo analysis for skin concerns." },
  { id: "ingredientIntelligence", name: "Ingredient Decoder", icon: FileText, tier: "glow", desc: "Decode skincare and product labels." },
  { id: "glowJournal", name: "Glow Journal", icon: Heart, tier: "glow", desc: "Track your daily wellness journey." },
  { id: "treatmentRoutine", name: "Treatment Plan", icon: Shield, tier: "glow", desc: "Personalized AM/PM routines." },
  { id: "progressStreaks", name: "Streaks", icon: Zap, tier: "lite", desc: "Build consistency with streaks." },
  { id: "wellnessToolkit", name: "Wellness Toolkit", icon: Activity, tier: "glow", desc: "A complete health suite." },
  { id: "mealPhoto", name: "Meal Analyzer", icon: Camera, tier: "lite", desc: "Snap a photo for macros." },
  { id: "supplement", name: "Supplement Guide", icon: Star, tier: "glow", desc: "Smart supplement stacking." },
  { id: "sleep", name: "Sleep Optimizer", icon: Bed, tier: "glow", desc: "Analyze and improve rest." },
  { id: "fitness", name: "Workout AI", icon: Dumbbell, tier: "glow", desc: "Skin-aware fitness." },
  { id: "hydration", name: "Hydration", icon: GlassWater, tier: "lite", desc: "Smart water tracking." },
  { id: "symptom", name: "Symptom Checker", icon: Activity, tier: "glow", desc: "Understand body signals." },
  { id: "hair", name: "Hair Care", icon: Wind, tier: "glow", desc: "Scalp and strand analysis." },
  { id: "sun", name: "UV Protection", icon: Sun, tier: "lite", desc: "Daily SPF guidance." },
  { id: "freeChat", name: "Free Chat", icon: MessageCircle, tier: "lite", desc: "Ask Noorix anything." },
  { id: "glowScore", name: "Glow Score", icon: Star, tier: "lite", desc: "Daily radiance metric." },
  { id: "recoveryScore", name: "Recovery", icon: RefreshCw, tier: "glow", desc: "Optimize rest." },
  { id: "breathwork", name: "Breathwork", icon: Wind, tier: "glow", desc: "Breathing exercises." },
  { id: "meditation", name: "Meditation", icon: Brain, tier: "glow", desc: "Mindfulness." },
  { id: "moodCard", name: "Mood Tracker", icon: Smile, tier: "glow", desc: "Emotional wellness." },
  { id: "routineCard", name: "Routine Card", icon: Calendar, tier: "glow", desc: "AM/PM cards." },
  { id: "recipeCard", name: "Recipe Generator", icon: ChefHat, tier: "glow", desc: "Healthy recipes." },
  { id: "streakBadge", name: "Streak Badge", icon: Trophy, tier: "glow", desc: "Achievement system." },
  { id: "familyPlan", name: "Family Wellness", icon: Baby, tier: "max", desc: "Multi-user profiles." },
];

const QUICK_PROMPTS = ["Analyze my skin", "Plan my diet", "Recommend drinks", "Check my glow score"];

const ACHIEVEMENTS = [
  { id: 1, name: "First Glow", icon: Sparkles, earned: true, desc: "Completed first skin scan" },
  { id: 2, name: "7-Day Streak", icon: Zap, earned: true, desc: "7 days active" },
  { id: 3, name: "Ritual Master", icon: Trophy, earned: false, desc: "Complete 30 rituals" },
  { id: 4, name: "Glow Guru", icon: Crown, earned: false, desc: "Reach Supreme tier" },
];

/* ═══════════════════════════════════════════════════════════
   NOORIX ORB + AURORA (unchanged)
   ═══════════════════════════════════════════════════════════ */

function NoorixOrb({ size = 64 }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: size, height: size }}
      animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <motion.div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,143,178,0.45), rgba(167,139,250,0.2), transparent 70%)", filter: "blur(18px)" }}
        animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-[6px] rounded-full noorix-orb-spin" style={{ background: "conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #ff8fb2)" }} />
      <div className="absolute inset-[9px] rounded-full bg-[#0a0a0f] flex items-center justify-center">
        <Sparkles size={size * 0.32} className="text-white" />
      </div>
      <motion.div className="absolute inset-0 rounded-full border border-[#a78bfa]/50"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    </motion.div>
  );
}

function AuroraCloud({ isDark }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute -top-40 -left-40 h-[75vw] max-h-[550px] w-[75vw] max-w-[550px] rounded-full"
        style={{ background: isDark ? "radial-gradient(circle, rgba(255,94,153,0.3), transparent 70%)" : "radial-gradient(circle, rgba(231,211,168,0.35), transparent 70%)", filter: "blur(100px)" }}
        animate={prefersReducedMotion ? {} : { x: [0, 80, -40, 0], y: [0, 50, 80, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -bottom-40 -right-40 h-[80vw] max-h-[600px] w-[80vw] max-w-[600px] rounded-full"
        style={{ background: isDark ? "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)" : "radial-gradient(circle, rgba(199,154,68,0.3), transparent 70%)", filter: "blur(110px)" }}
        animate={prefersReducedMotion ? {} : { x: [0, -70, 40, 0], y: [0, -60, -90, 0], scale: [1, 1.15, 0.95, 1] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-1/3 left-1/2 h-[60vw] max-h-[450px] w-[60vw] max-w-[450px] rounded-full"
        style={{ background: isDark ? "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)" : "radial-gradient(circle, rgba(94,234,212,0.2), transparent 70%)", filter: "blur(90px)" }}
        animate={prefersReducedMotion ? {} : { x: [0, 40, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT (with weather + time greeting)
   ═══════════════════════════════════════════════════════════ */

export default function AccountClient({ session }) {
  const router = useRouter();
  const name = session?.user?.name || session?.user?.email || "Glow Seeker";
  const provider = session?.provider || "Email";
  const userPlan = (session?.user?.plan || "lite").toLowerCase();
  const userTierIndex = TIER_LEVELS.indexOf(userPlan) >= 0 ? TIER_LEVELS.indexOf(userPlan) : 0;

  const glowScore = 84;
  const streak = 12;

  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  // Time-based greeting
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Weather widget
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  useEffect(() => {
    fetch("/api/noorix/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() => {})
      .finally(() => setWeatherLoading(false));
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("noorix-theme");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("noorix-theme", next); } catch {}
      return next;
    });
  }, []);

  const [profilePic, setProfilePic] = useState(null);
  const [showPicModal, setShowPicModal] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (session?.user?.image) setProfilePic(session.user.image);
  }, [session]);

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "initial-msg",
      role: "ai",
      content: `Welcome back, ${name.split(" ")[0]}. I am Noorix. Your ${userPlan.toUpperCase()} features are synced. How can I optimize your glow routine today?`,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [checklist, setChecklist] = useState([
    { id: 1, label: "Morning Hydration", icon: GlassWater, done: true },
    { id: 2, label: "Skincare Routine", icon: Sparkles, done: false },
    { id: 3, label: "Exercise", icon: Dumbbell, done: false },
    { id: 4, label: "Sleep 7+ Hours", icon: Bed, done: false },
  ]);

  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const referralCode = `NOORIX-${(name || "GLOW").substring(0, 4).toUpperCase()}2026`;

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const handlePicUpload = useCallback((event) => {
    setUploadError(null);
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Please upload a valid image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError("Image size must be under 5MB."); return; }
    const reader = new FileReader();
    reader.onload = (loadEvent) => { setProfilePic(loadEvent.target?.result); setShowPicModal(false); };
    reader.readAsDataURL(file);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try { localStorage.setItem("noorix-favorites", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleChecklist = useCallback((id) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }, []);

  const handleSendChat = useCallback(async (event, customMessage) => {
    if (event) event.preventDefault();
    const message = (customMessage ?? chatInput).trim();
    if (!message || isTyping) return;
    setChatInput("");
    setIsTyping(true);
    setChatMessages((prev) => [...prev, { id: `${Date.now()}-user`, role: "user", content: message, timestamp: new Date() }]);
    try {
      const res = await fetch("/api/noorix/freechat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, { role: "user", content: message }] }),
      });
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      const responseText = data.message || data.content || data.response || data.text || data.reply || "I have processed your request.";
      setChatMessages((prev) => [...prev, { id: `${Date.now()}-ai`, role: "ai", content: responseText, timestamp: new Date() }]);
    } catch {
      setChatMessages((prev) => [...prev, { id: `${Date.now()}-error`, role: "ai", content: "I apologize. My neural pathways experienced a brief interruption. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  }, [chatInput, chatMessages, isTyping]);

  const copyReferral = useCallback(() => {
    const value = referralCode;
    const fallback = () => {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(fallback);
    } else {
      fallback();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [referralCode]);

  const filteredFeatures = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_FEATURES;
    return ALL_FEATURES.filter((feature) => feature.name.toLowerCase().includes(query) || feature.desc.toLowerCase().includes(query));
  }, [searchQuery]);

  const completedWellness = checklist.filter((item) => item.done).length;
  const wellnessProgress = Math.round((completedWellness / checklist.length) * 100);

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-300 p-4 md:p-8 pt-24 ${isDark ? "bg-[#0a0a0f] text-white" : "bg-[#f8f6f0] text-gray-900"}`}>
      <AuroraCloud isDark={isDark} />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border backdrop-blur-xl shadow-xl ${isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200"}`}>
          <div className="flex items-center gap-4">
            <BackToHome className="!px-3 !py-2" />
            <NoorixOrb size={48} />
            <button type="button" onClick={() => setShowPicModal(true)} aria-label="Change profile picture" className="relative group focus:outline-none">
              {profilePic ? (
                <img src={profilePic} alt={`${name}'s profile`} className="h-14 w-14 rounded-2xl object-cover shadow-lg transition-transform group-hover:scale-105" />
              ) : (
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg transition-transform group-hover:scale-105 ${isDark ? "bg-gradient-to-br from-[#ff8fb2] to-[#a78bfa]" : "bg-gradient-to-br from-[#E7D3A8] to-[#C79A44]"}`}>
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-transform group-hover:scale-110 ${isDark ? "bg-white/20 border-white/20 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
                <Camera size={13} />
              </span>
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{name}</h1>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md ${isDark ? "bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa]" : "bg-gradient-to-r from-[#E7D3A8] to-[#C79A44]"}`}>
                  <Crown size={10} /> {userPlan}
                </span>
              </div>
              <p className={`mt-1 text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>
                {greeting}, {name.split(" ")[0]} • Connected via {provider}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button type="button" onClick={toggleTheme} className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={theme} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 6, opacity: 0 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
                  {isDark ? (<><Sun size={14} className="text-yellow-400" /> Light Mode</>) : (<><Moon size={14} className="text-indigo-500" /> Dark Mode</>)}
                </motion.div>
              </AnimatePresence>
            </button>
            <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </motion.header>

        {/* API Hub CTA */}
        <div className="mb-6 flex justify-center">
          <Link href="/api-hub" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-violet-500/40">
            <RefreshCw size={16} className="transition-transform group-hover:rotate-180" />
            Open NOORIX API Hub
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-6 lg:col-span-1">
            {/* Weather widget */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-2xl border p-5 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <div className="flex items-center gap-2 mb-3">
                <CloudSun size={18} className="text-amber-400" />
                <h3 className="text-sm font-bold">Live Weather</h3>
              </div>
              {weatherLoading ? (
                <div className="flex justify-center py-4"><Loader2 size={20} className="animate-spin text-white/50" /></div>
              ) : weather ? (
                <div className="text-center">
                  <p className="text-4xl font-extrabold">{weather.temperature}°C</p>
                  <p className="mt-1 text-xs text-white/50">{weather.city} · UV {weather.uvIndex ?? "—"} · Wind {weather.windspeed} km/h</p>
                  <p className="mt-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">{weather.advice}</p>
                </div>
              ) : (
                <p className="text-center text-xs text-red-400">Weather unavailable</p>
              )}
            </motion.div>

            {/* Noorix orb card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`flex flex-col items-center rounded-2xl border p-6 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <NoorixOrb size={80} />
              <p className="mt-3 text-sm font-bold">Noorix Online</p>
              <p className={`text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>{glowScore} Glow Score • {streak} Day Streak</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.03 }} className={`rounded-2xl border p-4 text-center backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <Star size={24} className={`mx-auto mb-2 ${isDark ? "text-[#ff8fb2]" : "text-[#C79A44]"}`} />
                <p className="text-2xl font-bold">{glowScore}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-gray-500"}`}>Glow Score</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className={`rounded-2xl border p-4 text-center backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <Zap size={24} className={`mx-auto mb-2 ${isDark ? "text-cyan-400" : "text-amber-500"}`} />
                <p className="text-2xl font-bold">{streak}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-gray-500"}`}>Day Streak</p>
              </motion.div>
            </div>

            {/* Daily Wellness */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className={`rounded-2xl border p-5 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold"><Check size={14} className="text-green-500" /> Daily Wellness</h3>
                <span className={`text-xs font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>{wellnessProgress}%</span>
              </div>
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-black/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500" animate={{ width: `${wellnessProgress}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <button key={item.id} type="button" onClick={() => toggleChecklist(item.id)} className={`flex w-full items-center gap-3 rounded-xl p-2.5 transition-all ${item.done ? (isDark ? "bg-white/5" : "bg-gray-50") : "hover:bg-black/5 dark:hover:bg-white/5"}`}>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${item.done ? "border-transparent bg-gradient-to-r from-green-400 to-emerald-500 text-white" : (isDark ? "border-white/30" : "border-gray-300")}`}>
                      {item.done && <Check size={12} />}
                    </span>
                    <item.icon size={14} className={isDark ? "text-white/60" : "text-gray-500"} />
                    <span className={`text-xs font-medium ${item.done ? "line-through opacity-50" : ""}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Achievements */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className={`rounded-2xl border p-5 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold"><Trophy size={14} className="text-yellow-500" /> Achievements</h3>
              <div className="grid grid-cols-4 gap-2">
                {ACHIEVEMENTS.map((achievement) => (
                  <motion.div key={achievement.id} whileHover={{ scale: 1.05 }} className={`flex flex-col items-center rounded-xl p-2 transition-all ${achievement.earned ? "" : "opacity-30 grayscale"}`} title={achievement.desc}>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${achievement.earned ? "bg-yellow-400/20 text-yellow-500" : (isDark ? "bg-white/5 text-white/40" : "bg-gray-100 text-gray-400")}`}>
                      <achievement.icon size={18} />
                    </span>
                    <span className="mt-1.5 text-center text-[9px] font-bold leading-tight">{achievement.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Referral */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className={`rounded-2xl border p-5 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className="text-sm font-bold">Share &amp; Earn</h3>
              <p className={`mb-3 text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>Invite friends and unlock 1 free month of Glow.</p>
              <div className="flex gap-2">
                <div className={`flex flex-1 items-center rounded-xl border px-3 py-2 font-mono text-xs font-bold ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-800"}`}>{referralCode}</div>
                <button type="button" onClick={copyReferral} className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-transform active:scale-95 ${isDark ? "bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa]" : "bg-gradient-to-r from-[#E7D3A8] to-[#C79A44]"}`}>
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 lg:col-span-2">
            {/* Command Center */}
            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`flex h-[480px] flex-col overflow-hidden rounded-3xl border shadow-2xl ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
              <div className={`flex items-center justify-between border-b p-4 ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <NoorixOrb size={28} />
                  <div>
                    <h3 className="text-sm font-bold">Noorix Command Center</h3>
                    <p className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Online • {userPlan.toUpperCase()} Tier Active</p>
                  </div>
                </div>
              </div>
              <div className={`flex gap-2 overflow-x-auto border-b px-4 py-2 ${isDark ? "border-white/5 bg-black/20" : "border-gray-100 bg-gray-50/50"}`}>
                {QUICK_PROMPTS.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => handleSendChat(undefined, prompt)} disabled={isTyping} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${isDark ? "border-white/10 bg-white/5 text-white/90 hover:bg-white/10" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"}`}>{prompt}</button>
                ))}
              </div>
              <div ref={chatScrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
                {chatMessages.map((message) => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "ai" && <NoorixOrb size={24} />}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${message.role === "user" ? (isDark ? "bg-gradient-to-br from-[#ff8fb2] to-[#a78bfa] text-white rounded-br-none" : "bg-gradient-to-br from-[#E7D3A8] to-[#C79A44] text-white rounded-br-none") : (isDark ? "bg-white/10 border border-white/5 text-white rounded-bl-none" : "bg-white border border-gray-200 text-gray-900 rounded-bl-none")}`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center border ${isDark ? "bg-white/10 border-white/10" : "bg-gray-100 border-gray-300"}`}>
                        <User size={14} className={isDark ? "text-white/60" : "text-gray-600"} />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start gap-3">
                    <NoorixOrb size={24} />
                    <div className={`rounded-2xl border px-4 py-3 ${isDark ? "bg-white/10 border-white/5" : "bg-white border-gray-200"}`}>
                      <div className="flex h-4 items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-current opacity-60" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendChat} className={`border-t p-3 ${isDark ? "border-white/10 bg-black/40" : "border-gray-200 bg-white"}`}>
                <div className="relative flex items-center">
                  <input type="text" value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask Noorix about your routines..." aria-label="Message Noorix" className={`w-full rounded-xl border py-2.5 pl-4 pr-24 text-sm outline-none transition-colors ${isDark ? "border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/30" : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-gray-400"}`} />
                  <button type="button" aria-label="Voice input" className={`absolute right-11 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isDark ? "text-white/60 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"}`}><Mic size={14} /></button>
                  <button type="submit" disabled={!chatInput.trim() || isTyping} aria-label="Send message" className={`absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-white transition-transform active:scale-95 disabled:opacity-40 ${isDark ? "bg-gradient-to-br from-[#ff8fb2] to-[#a78bfa]" : "bg-gradient-to-br from-[#E7D3A8] to-[#C79A44]"}`}>
                    {isTyping ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </div>
              </form>
            </motion.section>

            {/* AI Arsenal */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-6 shadow-xl ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold">My AI Arsenal</h2>
                  <p className={`mt-0.5 text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>Features unlocked by your {userPlan.toUpperCase()} subscription.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`} />
                  <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search features..." aria-label="Search features" className={`w-full rounded-xl border py-2 pl-9 pr-3 text-xs outline-none transition-colors ${isDark ? "border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/30" : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-gray-400"}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {filteredFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  const isLocked = TIER_LEVELS.indexOf(feature.tier) > userTierIndex;
                  const isFav = Array.isArray(favorites) ? favorites.includes(feature.id) : false;
                  return (
                    <motion.div key={feature.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(index * 0.02, 0.3) }} whileHover={{ scale: 1.03 }} className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${isLocked ? (isDark ? "border-white/5 bg-white/5 opacity-60" : "border-gray-200 bg-gray-50 opacity-60") : (isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-gray-200 bg-white shadow-sm hover:border-gray-300")}`}>
{!isLocked && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(feature.id); }}
                          className={`absolute top-3 right-3 z-20 p-1.5 rounded-full transition-all ${isFav ? "bg-pink-500/20 text-pink-400" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                          aria-label={isFav ? "Unpin feature" : "Pin feature"}
                        >
                          <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                        </button>
                      )}
                      {isLocked && (
                        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-2 text-center backdrop-blur-[2px] ${isDark ? "bg-black/60 text-white" : "bg-white/80 text-gray-900"}`}>
                          <Lock size={14} className="mb-1 text-amber-500" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Unlock in {feature.tier}</span>
                        </div>
                      )}
                      <Icon size={22} className={isLocked ? (isDark ? "text-white/40" : "text-gray-400") : (isDark ? "text-[#a78bfa]" : "text-[#C79A44]")} />
                      <h4 className="mt-3 text-sm font-bold">{feature.name}</h4>
                      <p className={`mt-1 line-clamp-2 text-[11px] ${isDark ? "text-white/60" : "text-gray-500"}`}>{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <style>{`
        .noorix-orb-spin { animation: noorixOrbSpin 8s linear infinite; }
        @keyframes noorixOrbSpin { to { transform: rotate(360deg); } }
      `}</style>

      <ScrollToTop />

      {/* Profile Picture Modal */}
      <AnimatePresence>
        {showPicModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="profile-pic-modal-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setShowPicModal(false)}>
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(event) => event.stopPropagation()} className={`w-full max-w-sm rounded-3xl border p-6 shadow-2xl ${isDark ? "border-white/10 bg-[#121218] text-white" : "border-gray-200 bg-white text-gray-900"}`}>
              <div className="mb-4 flex items-center justify-between">
                <h3 id="profile-pic-modal-title" className="text-base font-bold">Change Profile Picture</h3>
                <button type="button" onClick={() => setShowPicModal(false)} aria-label="Close modal" className={`rounded-full p-1.5 transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}><X size={16} /></button>
              </div>
              {uploadError && <div className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-xs text-red-400">{uploadError}</div>}
              <button type="button" onClick={() => fileInputRef.current?.click()} className={`flex h-40 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors ${isDark ? "border-white/20 bg-white/5 hover:border-white/40" : "border-gray-300 bg-gray-50 hover:border-gray-400"}`}>
                <Camera size={32} className={isDark ? "text-white/40" : "text-gray-400"} />
                <p className="mt-2 text-xs font-semibold">Click to upload image</p>
                <p className={`mt-0.5 text-[10px] ${isDark ? "text-white/40" : "text-gray-400"}`}>PNG, JPG up to 5MB</p>
              </button>
              <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp" onChange={handlePicUpload} className="hidden" aria-hidden="true" />
              {profilePic && (
                <button type="button" onClick={() => { setProfilePic(null); setShowPicModal(false); }} className="mt-4 w-full rounded-xl bg-red-500/10 py-2.5 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/20">Remove Current Picture</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
