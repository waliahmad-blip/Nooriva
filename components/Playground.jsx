"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { flavors, ingredients } from "@/lib/data";

/* ══════════════════════════════════════════
   TRILINGUAL GAME STRINGS
══════════════════════════════════════════ */
const STRINGS = {
  en: {
    quizTab: "✨ Glow Quiz", arcadeTab: "🎮 Arcade", myGlowTab: "🌟 My Glow",
    quizHead: "Three tiny questions. One perfect flavour ritual.",
    startQuiz: "Start the Quiz", retake: "Retake", celebrate: "🎉 Celebrate", addToBag: "Add to Bag",
    q1: "What does your skin crave most?", q2: "Pick your moment", q3: "Pick a vibe",
    q1a: "Bright glow", q1b: "Deep hydration", q1c: "Night repair",
    q2a: "Morning", q2b: "Golden hour", q2c: "Girls night",
    q3a: "Floral", q3b: "Fruity", q3c: "Fresh",
    memoryTitle: "🃏 Flavour Memory", memorySub: "Find all six flavour pairs. Sharpen that glow brain.",
    moves: "Moves", newGame: "New Game", memoryDone: "All pairs found! +30 glow ✨",
    rushTitle: "⚡ Glow Rush", rushSub: "Tap the drops! 20 seconds. How fast is your glow?",
    score: "Score", best: "Best", start: "Start",
    wheelTitle: "🎡 Daily Glow Wheel", wheelSub: "One spin a day. Win treats, discounts and free pouches.",
    spin: "Spin the Wheel", lucky: "Feeling lucky?",
    alreadySpun: "Come back tomorrow for another spin! ✨",
    redeem: "Send us a screenshot on WhatsApp to claim your prize ✨",
    archTitle: "🔮 Flavour Archetype", archSub: "Three questions. Which celestial being are you?",
    archQ: "Which one calls to you?",
    activesTitle: "🧪 Know Your Actives", activesSub: "Tap each ingredient to reveal what it does for your glow.",
    tapAbove: "Tap an ingredient above ☝️",
    glowScoreTitle: "🌟 Your Glow Score", glowScoreSub: "Take the quiz, play games and check in daily to raise your glow.",
    streakTitle: "🔥 Ritual Streak", streakSub: "One check-in a day keeps the dull skin away.",
    dayStreak: "day streak", checkIn: "Check In Today ✨", checkedIn: "Checked in — see you tomorrow! 🌙",
  },
  ur: {
    quizTab: "✨ گلو کوئز", arcadeTab: "🎮 آرکیڈ", myGlowTab: "🌟 میرا گلو",
    quizHead: "تین چھوٹے سوالات۔ ایک بہترین ذائقہ رسم۔",
    startQuiz: "کوئز شروع کریں", retake: "دوبارہ", celebrate: "🎉 جشن", addToBag: "بیگ میں ڈالیں",
    q1: "آپ کی جلد کو سب سے زیادہ کیا چاہیے؟", q2: "اپنا لمحہ چنیں", q3: "اپنا انداز چنیں",
    q1a: "روشن گلو", q1b: "گہری ہائیڈریشن", q1c: "رات کی مرمت",
    q2a: "صبح", q2b: "سنہری ساعت", q2c: "گرلز نائٹ",
    q3a: "گلابی", q3b: "پھلوں والا", q3c: "تازہ",
    memoryTitle: "🃏 فلیور میموری", memorySub: "چھ ذائقوں کے جوڑے تلاش کریں۔ اپنے گلو دماغ کو تیز کریں۔",
    moves: "چالیں", newGame: "نیا گیم", memoryDone: "تمام جوڑے مل گئے! +30 گلو ✨",
    rushTitle: "⚡ گلو رش", rushSub: "قطروں کو تھپتھپائیں! 20 سیکنڈ۔ آپ کتنی تیزی سے چمک سکتے ہیں؟",
    score: "اسکور", best: "بہترین", start: "شروع",
    wheelTitle: "🎡 ڈیلی گلو وہیل", wheelSub: "دن میں ایک اسپن۔ تحفے، ڈسکاؤنٹ اور مفت پاؤچ جیتیں۔",
    spin: "وہیل گھمائیں", lucky: "قسمت آزمانا چاہتے ہیں؟",
    alreadySpun: "کل دوبارہ آئیں! ✨",
    redeem: "انعام حاصل کرنے کے لیے واٹس ایپ پر اسکرین شاٹ بھیجیں ✨",
    archTitle: "🔮 فلیور آرکی ٹائپ", archSub: "تین سوالات۔ آپ کون سی آسمانی ہستی ہیں؟",
    archQ: "کون سا آپ کو بلا رہا ہے؟",
    activesTitle: "🧪 اپنے ایکٹیوز جانیں", activesSub: "ہر جز پر ٹیپ کریں اور جانیں وہ آپ کے گلو کے لیے کیا کرتا ہے۔",
    tapAbove: "اوپر کسی جز پر ٹیپ کریں ☝️",
    glowScoreTitle: "🌟 آپ کا گلو اسکور", glowScoreSub: "کوئز دیں، گیمز کھیلیں اور روزانہ چیک اِن کریں۔",
    streakTitle: "🔥 رسم اسٹریک", streakSub: "دن میں ایک چیک اِن بے رونق جلد کو دور رکھتا ہے۔",
    dayStreak: "دن کا اسٹریک", checkIn: "آج چیک اِن کریں ✨", checkedIn: "چیک اِن ہو گیا — کل ملیں گے! 🌙",
  },
  ar: {
    quizTab: "✨ اختبار الإشراق", arcadeTab: "🎮 الأركيد", myGlowTab: "🌟 إشراقتي",
    quizHead: "ثلاثة أسئلة صغيرة. طقس نكهة مثالي واحد.",
    startQuiz: "ابدأ الاختبار", retake: "إعادة", celebrate: "🎉 احتفل", addToBag: "أضف إلى الحقيبة",
    q1: "ماذا تشتهي بشرتك أكثر؟", q2: "اختر لحظتك", q3: "اختر أسلوبك",
    q1a: "إشراق مشرق", q1b: "ترطيب عميق", q1c: "ترميم ليلي",
    q2a: "الصباح", q2b: "الساعة الذهبية", q2c: "ليلة البنات",
    q3a: "زهري", q3b: "فاكهي", q3c: "منعش",
    memoryTitle: "🃏 ذاكرة النكهات", memorySub: "اعثر على أزواج النكهات الست. درّب عقل إشراقتك.",
    moves: "الحركات", newGame: "لعبة جديدة", memoryDone: "وجدت كل الأزواج! +30 إشراق ✨",
    rushTitle: "⚡ اندفاع الإشراق", rushSub: "انقر على القطرات! 20 ثانية. ما مدى سرعة إشراقك؟",
    score: "النقاط", best: "الأفضل", start: "ابدأ",
    wheelTitle: "🎡 عجلة الإشراق اليومية", wheelSub: "دورة واحدة يوميًا. اربح مكافآت وخصومات وأكياس مجانية.",
    spin: "أدر العجلة", lucky: "تشعر بالحظ؟",
    alreadySpun: "عد غدًا لدورة أخرى! ✨",
    redeem: "للحصول على جائزتك أرسل لقطة شاشة عبر واتساب ✨",
    archTitle: "🔮 نموذج النكهة", archSub: "ثلاثة أسئلة. أي كائن سماوي أنت؟",
    archQ: "أيها يناديك؟",
    activesTitle: "🧪 اعرف مكوّناتك", activesSub: "انقر على كل مكوّن لتعرف ما يفعله لإشراقتك.",
    tapAbove: "انقر على مكوّن بالأعلى ☝️",
    glowScoreTitle: "🌟 نقاط إشراقتك", glowScoreSub: "خذ الاختبار، العب الألعاب، وسجّل يوميًا لرفع إشراقتك.",
    streakTitle: "🔥 سلسلة الطقوس", streakSub: "تسجيل واحد يوميًا يبقي البشرة الباهتة بعيدة.",
    dayStreak: "أيام متتالية", checkIn: "سجّل اليوم ✨", checkedIn: "تم التسجيل — نراك غدًا! 🌙",
  },
};

const EMOJIS = ["🍓", "🫐", "🥭", "🍯", "🍇", "🍃"];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function usePT() {
  const language = useStore((s) => s.language);
  return (key) => STRINGS[language]?.[key] || STRINGS.en[key] || key;
}

/* ══════════════════════════════════════════
   1. GLOW QUIZ
══════════════════════════════════════════ */
function GlowQuiz({ pt }) {
  const addToCart = useStore((s) => s.addToCart);
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);
  const addGlow = useStore((s) => s.addGlow);
  const language = useStore((s) => s.language);
  const L = (obj) => obj[language] || obj.en;

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [burst, setBurst] = useState(false);

  const QUESTIONS = [
    {
      q: pt("q1"),
      opts: [
        { label: pt("q1a"), flavor: "aurora-rose" },
        { label: pt("q1b"), flavor: "celestial-mint" },
        { label: pt("q1c"), flavor: "violet-eclipse" },
      ],
    },
    {
      q: pt("q2"),
      opts: [
        { label: pt("q2a"), flavor: "sunrise-solstice" },
        { label: pt("q2b"), flavor: "golden-zenith" },
        { label: pt("q2c"), flavor: "berry-nebula" },
      ],
    },
    {
      q: pt("q3"),
      opts: [
        { label: pt("q3a"), flavor: "aurora-rose" },
        { label: pt("q3b"), flavor: "berry-nebula" },
        { label: pt("q3c"), flavor: "celestial-mint" },
      ],
    },
  ];

  const pick = (flavorId) => {
    const next = [...answers, flavorId];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const counts = {};
      next.forEach((f) => (counts[f] = (counts[f] || 0) + 1));
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      const flavor = flavors.find((f) => f.id === winner);
      setResult(flavor);
      setSelectedFlavor(flavor.id);
      addGlow(15);
    }
  };

  const reset = () => {
    setStarted(false);
    setStep(0);
    setAnswers([]);
    setResult(null);
    setBurst(false);
  };

  const celebrate = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 2500);
  };

  if (!started) {
    return (
      <div className="rounded-[1.8rem] bg-white/80 p-8 text-center shadow-sm">
        <div className="text-5xl">✨</div>
        <p className="mt-4 text-lg font-semibold">{pt("quizHead")}</p>
        <button onClick={() => setStarted(true)} className="btn-primary mx-auto mt-6">
          {pt("startQuiz")}
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="rounded-[1.8rem] bg-white/80 p-8 text-center shadow-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto h-20 w-20 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${result.color}, ${result.colorB})`,
            boxShadow: `0 14px 40px ${result.color}66`,
          }}
        />
        <h4 className="display-heading mt-4 text-3xl">{result.name}</h4>
        <p className="mt-1 text-sm text-ink/55">{L(result.notes)}</p>

        {burst && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-3xl"
          >
            🎉 ✨ 🎊 ✨ 🎉
          </motion.div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => addToCart(result.id)} className="btn-primary !py-2.5 text-xs">
            {pt("addToBag")}
          </button>
          <button onClick={celebrate} className="btn-secondary !py-2.5 text-xs">
            {pt("celebrate")}
          </button>
          <button onClick={reset} className="btn-secondary !py-2.5 text-xs">
            {pt("retake")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink/45">{step + 1} / {QUESTIONS.length}</p>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-ink" : "bg-ink/15"}`}
            />
          ))}
        </div>
      </div>

      <h4 className="mt-3 text-lg font-semibold">{QUESTIONS[step].q}</h4>

      <div className="mt-4 grid gap-2">
        {QUESTIONS[step].opts.map((o) => (
          <motion.button
            key={o.label}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => pick(o.flavor)}
            className="rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-left text-sm font-medium transition hover:border-ink/30 hover:bg-white"
          >
            {o.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   2. FLAVOUR MEMORY
══════════════════════════════════════════ */
function FlavourMemory({ pt }) {
  const addGlow = useStore((s) => s.addGlow);
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);

  const newGame = () => {
    const deck = shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({
      id: i,
      emoji,
      flipped: false,
      matched: false,
    }));
    setCards(deck);
    setFirst(null);
    setLock(false);
    setMoves(0);
    setMatched(0);
  };

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flip = (id) => {
    if (lock) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const flipped = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(flipped);

    if (first === null) {
      setFirst(id);
      return;
    }

    setMoves((m) => m + 1);
    const firstCard = flipped.find((c) => c.id === first);

    if (firstCard.emoji === card.emoji) {
      setCards((prev) =>
        prev.map((c) => (c.id === first || c.id === id ? { ...c, matched: true } : c))
      );
      setFirst(null);
      const newMatched = matched + 1;
      setMatched(newMatched);
      if (newMatched === EMOJIS.length) addGlow(30);
    } else {
      setLock(true);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.id === first || c.id === id ? { ...c, flipped: false } : c))
        );
        setFirst(null);
        setLock(false);
      }, 800);
    }
  };

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold">{pt("memoryTitle")}</h4>
          <p className="mt-1 text-xs text-ink/50">{pt("memorySub")}</p>
        </div>
        <button onClick={newGame} className="btn-secondary !px-4 !py-2 text-xs">
          {pt("newGame")}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {cards.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => flip(c.id)}
            className={`flex aspect-square items-center justify-center rounded-xl text-2xl transition ${
              c.matched
                ? "bg-noor-gold/30"
                : c.flipped
                ? "bg-white shadow"
                : "bg-ink/80 text-cream/60"
            }`}
          >
            {c.flipped || c.matched ? c.emoji : "✦"}
          </motion.button>
        ))}
      </div>

      <p className="mt-3 text-xs text-ink/55">
        {pt("moves")}: {moves} · {matched}/{EMOJIS.length}
      </p>

      {matched === EMOJIS.length && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm font-semibold text-ink"
        >
          {pt("memoryDone")}
        </motion.p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   3. GLOW RUSH (formerly Jelly Rush)
══════════════════════════════════════════ */
function GlowRush({ pt }) {
  const addGlow = useStore((s) => s.addGlow);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [targets, setTargets] = useState([]);
  const scoreRef = useRef(0);

  // Timer
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [playing]);

  // Spawn drops
  useEffect(() => {
    if (!playing) return;
    const spawn = setInterval(() => {
      setTargets((prev) => [
        ...prev.slice(-4),
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 8,
          y: Math.random() * 62 + 12,
        },
      ]);
    }, 600);
    return () => clearInterval(spawn);
  }, [playing]);

  // End of round
  useEffect(() => {
    if (playing && timeLeft === 0) {
      setPlaying(false);
      setTargets([]);
      setBest((b) => Math.max(b, scoreRef.current));
      addGlow(scoreRef.current);
    }
  }, [playing, timeLeft, addGlow]);

  const start = () => {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(20);
    setTargets([]);
    setPlaying(true);
  };

  const tap = (id) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    scoreRef.current += 1;
    setScore(scoreRef.current);
  };

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold">{pt("rushTitle")}</h4>
          <p className="mt-1 text-xs text-ink/50">{pt("rushSub")}</p>
        </div>
        {!playing && (
          <button onClick={start} className="btn-primary !px-5 !py-2 text-xs">
            {pt("start")}
          </button>
        )}
      </div>

      <div className="relative mt-4 h-48 overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-noor-rose/10 via-noor-violet/10 to-noor-mint/10">
        {playing ? (
          targets.map((t) => (
            <motion.button
              key={t.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => tap(t.id)}
              className="absolute text-3xl transition-transform active:scale-50"
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
              💧
            </motion.button>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-5xl opacity-60">💧</div>
        )}
      </div>

      <p className="mt-3 text-xs text-ink/55">
        {pt("score")}: {score}
        {playing && ` · ${timeLeft}s`} · {pt("best")}: {best}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   4. DAILY GLOW WHEEL
══════════════════════════════════════════ */
const PRIZES = [
  { en: "Free pouch 💧", color: "#ff8fb2" },
  { en: "10% off 💸", color: "#ffd7a1" },
  { en: "+20 Glow ✨", color: "#a78bfa" },
  { en: "Free delivery 🚚", color: "#67e8f9" },
  { en: "+10 Glow 🌟", color: "#f5c76a" },
  { en: "Surprise gift 🎁", color: "#f472b6" },
  { en: "15% off 💫", color: "#5eead4" },
  { en: "+30 Glow 🔥", color: "#fb7185" },
];

function GlowWheel({ pt }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [canSpin, setCanSpin] = useState(true);

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      if (localStorage.getItem("nooriva_wheel_day") === today) setCanSpin(false);
    } catch (e) {}
  }, []);

  const spin = () => {
    if (!canSpin || spinning) return;
    setSpinning(true);
    setResult(null);
    const winIndex = Math.floor(Math.random() * PRIZES.length);
    const seg = 360 / PRIZES.length;
    const target = rotation + 360 * 5 + (360 - (winIndex * seg + seg / 2));
    setRotation(target);
    setTimeout(() => {
      setSpinning(false);
      setResult(PRIZES[winIndex]);
      setCanSpin(false);
      try {
        localStorage.setItem("nooriva_wheel_day", new Date().toDateString());
      } catch (e) {}
    }, 4200);
  };

  const seg = 360 / PRIZES.length;
  const gradient = PRIZES.map((p, i) => `${p.color} ${i * seg}deg ${(i + 1) * seg}deg`).join(", ");

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 text-center shadow-sm">
      <h4 className="font-bold">{pt("wheelTitle")}</h4>
      <p className="mt-1 text-xs text-ink/50">{pt("wheelSub")}</p>

      <div className="relative mx-auto mt-5 h-44 w-44">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-xl">🔻</div>
        <div
          className="h-full w-full rounded-full border-4 border-white shadow-lg transition-transform duration-[4000ms] ease-out"
          style={{ background: `conic-gradient(${gradient})`, transform: `rotate(${rotation}deg)` }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-10 w-10 rounded-full bg-white shadow" />
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mt-4 text-lg font-bold" style={{ color: result.color }}>
            🎉 {result.en}
          </p>
          <p className="mt-1 text-xs text-ink/50">{pt("redeem")}</p>
        </motion.div>
      )}

      {!canSpin && !result && (
        <p className="mt-4 text-xs text-ink/50">{pt("alreadySpun")}</p>
      )}

      <button
        onClick={spin}
        disabled={!canSpin || spinning}
        className="btn-primary mx-auto mt-4 !py-2.5 text-xs disabled:opacity-40"
      >
        {spinning ? pt("lucky") : pt("spin")}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   5. FLAVOUR ARCHETYPE
══════════════════════════════════════════ */
const ARCHETYPES = {
  dawn: {
    emoji: "🌅",
    name: { en: "The Radiant Dawn", ur: "چمکتی صبح", ar: "الفجر المشرق" },
    desc: { en: "You rise, you glow, you lead.", ur: "آپ ابھرتی ہیں، چمکتی ہیں، رہنمائی کرتی ہیں۔", ar: "تشرقين، تتوهجين، تقودين." },
  },
  night: {
    emoji: "🌙",
    name: { en: "The Midnight Muse", ur: "پراسرار رات", ar: "ملهمة منتصف الليل" },
    desc: { en: "Mysterious, calm, deeply restorative.", ur: "پراسرار، پرسکون، گہری بحالی۔", ar: "غامضة، هادئة، مرمّمة بعمق." },
  },
  gold: {
    emoji: "🌇",
    name: { en: "The Golden Hour", ur: "سنہری ساعت", ar: "الساعة الذهبية" },
    desc: { en: "Warm, generous, magnetic.", ur: "گرم، فیاض، مقناطیسی۔", ar: "دافئة، كريمة، جذابة." },
  },
  comet: {
    emoji: "☄️",
    name: { en: "The Berry Comet", ur: "بیری دم دار ستارہ", ar: "مذنّب التوت" },
    desc: { en: "Playful, bold, impossible to ignore.", ur: "شرارتی، بولڈ، نظر انداز کرنا ناممکن۔", ar: "مرحة، جريئة، يستحيل تجاهلها." },
  },
};

function FlavourArchetype({ pt }) {
  const addGlow = useStore((s) => s.addGlow);
  const language = useStore((s) => s.language);
  const L = (obj) => obj[language] || obj.en;

  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState([]);
  const [result, setResult] = useState(null);

  const QUESTIONS = [
    ["dawn", "night", "gold", "comet"],
    ["gold", "comet", "dawn", "night"],
    ["comet", "dawn", "night", "gold"],
  ];

  const pick = (key) => {
    const next = [...picks, key];
    setPicks(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const counts = {};
      next.forEach((k) => (counts[k] = (counts[k] || 0) + 1));
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(ARCHETYPES[winner]);
      addGlow(10);
    }
  };

  const reset = () => {
    setStep(0);
    setPicks([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="rounded-[1.8rem] bg-white/80 p-8 text-center shadow-sm">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="text-6xl"
        >
          {result.emoji}
        </motion.div>
        <h4 className="display-heading mt-3 text-3xl">{L(result.name)}</h4>
        <p className="mt-2 text-sm text-ink/60">{L(result.desc)}</p>
        <button onClick={reset} className="btn-secondary mx-auto mt-5 !py-2 text-xs">
          {pt("retake")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 shadow-sm">
      <h4 className="font-bold">{pt("archTitle")}</h4>
      <p className="mt-1 text-xs text-ink/50">{pt("archSub")}</p>

      <p className="mt-4 text-sm font-medium text-ink/75">
        {step + 1}/{QUESTIONS.length} — {pt("archQ")}
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {QUESTIONS[step].map((key) => (
          <motion.button
            key={key}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => pick(key)}
            className="rounded-xl border border-ink/10 bg-white/70 py-4 text-3xl transition hover:border-ink/30 hover:bg-white"
          >
            {ARCHETYPES[key].emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   6. KNOW YOUR ACTIVES
══════════════════════════════════════════ */
function KnowYourActives({ pt }) {
  const language = useStore((s) => s.language);
  const L = (obj) => obj[language] || obj.en;
  const [active, setActive] = useState(null);

  return (
    <div className="rounded-[1.8rem] bg-white/80 p-6 shadow-sm">
      <h4 className="font-bold">{pt("activesTitle")}</h4>
      <p className="mt-1 text-xs text-ink/50">{pt("activesSub")}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {ingredients.map((ing) => (
          <button
            key={ing.id}
            onClick={() => setActive(ing)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              active?.id === ing.id
                ? "border-ink bg-ink text-cream"
                : "border-ink/10 bg-white/70 text-ink/70 hover:border-ink/30"
            }`}
          >
            {ing.value} · {L(ing.title)}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-[1.2rem] bg-white/70 p-4 text-sm">
        {active ? (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-bold">
              {L(active.title)} — {active.value}
            </p>
            <p className="mt-1 leading-relaxed text-ink/60">{L(active.desc)}</p>
          </motion.div>
        ) : (
          <p className="text-ink/45">{pt("tapAbove")}</p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   7. MY GLOW (Score + Streak)
══════════════════════════════════════════ */
function MyGlow({ pt }) {
  const glowScore = useStore((s) => s.glowScore);
  const ritualStreak = useStore((s) => s.ritualStreak);
  const lastCheckIn = useStore((s) => s.lastCheckIn);
  const checkIn = useStore((s) => s.checkIn);

  const checkedToday = lastCheckIn === new Date().toDateString();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.8rem] bg-white/80 p-8 text-center shadow-sm">
        <h4 className="font-bold">{pt("glowScoreTitle")}</h4>
        <div className="holo-text display-heading mt-4 text-7xl">{glowScore}</div>
        <p className="mt-3 text-xs leading-relaxed text-ink/50">{pt("glowScoreSub")}</p>
      </div>

      <div className="rounded-[1.8rem] bg-white/80 p-8 text-center shadow-sm">
        <h4 className="font-bold">{pt("streakTitle")}</h4>
        <div className="mt-4 text-6xl">🔥 {ritualStreak}</div>
        <p className="mt-2 text-xs text-ink/50">{pt("dayStreak")}</p>
        <p className="mt-2 text-xs text-ink/50">{pt("streakSub")}</p>
        <button
          onClick={checkIn}
          disabled={checkedToday}
          className="btn-primary mx-auto mt-5 !py-2.5 text-xs disabled:opacity-40"
        >
          {checkedToday ? pt("checkedIn") : pt("checkIn")}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PLAYGROUND
══════════════════════════════════════════ */
export default function Playground() {
  const t = useT();
  const pt = usePT();
  const [tab, setTab] = useState("quiz");

  const tabs = [
    { id: "quiz", label: pt("quizTab") },
    { id: "arcade", label: pt("arcadeTab") },
    { id: "myGlow", label: pt("myGlowTab") },
  ];

  return (
    <div>
      <h2 className="display-heading text-center text-3xl md:text-4xl">
        {t("playground.title")}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-xs text-ink/55 md:text-sm">
        {t("playground.sub")}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              tab === tb.id
                ? "bg-ink text-cream shadow-lg"
                : "bg-white/70 text-ink/60 hover:bg-white"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {tab === "quiz" && (
            <div className="mx-auto max-w-xl">
              <GlowQuiz pt={pt} />
            </div>
          )}

          {tab === "arcade" && (
            <div className="grid gap-4 md:grid-cols-2">
              <FlavourMemory pt={pt} />
              <GlowRush pt={pt} />
              <GlowWheel pt={pt} />
              <FlavourArchetype pt={pt} />
              <div className="md:col-span-2">
                <KnowYourActives pt={pt} />
              </div>
            </div>
          )}

          {tab === "myGlow" && <MyGlow pt={pt} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
