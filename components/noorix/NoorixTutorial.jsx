'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, ChevronLeft, Camera, Salad, Pill, Moon, Sun, Dumbbell,
  ScanLine, BookOpen, GlassWater, Stethoscope, Scissors, Beaker, CloudSun,
  Heart, MessageCircle, Sparkles, Mic, Zap, Star, Shield, Activity
} from 'lucide-react';

var STEPS = [
  {
    id: 'welcome',
    icon: Sparkles,
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1030 50%, #0a0a1a 100%)',
    title: 'Welcome to Noorix',
    subtitle: 'Your AI Health & Beauty Intelligence',
    description: 'Noorix is a revolutionary AI-powered wellness assistant built into NOORIVA. It analyzes your skin, nutrition, sleep, stress, and more — all from your phone. 30 features, 3 AI models, zero data stored.',
    features: [],
    tip: 'Noorix uses advanced AI to give you personalized health guidance. Your data never leaves your device.',
  },
  {
    id: 'skinPhoto',
    icon: Camera,
    color: '#ff8fb2',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2a1020 50%, #1a0a10 100%)',
    title: 'Skin Photo Analysis',
    subtitle: 'AI Dermatology Triage',
    description: 'Upload a photo of any skin concern — acne, dark spots, rashes, or irritation. Noorix performs differential triage with 2-5 possible conditions ranked by likelihood, detects emergency red flags, and gives personalized holistic coaching.',
    features: ['Differential triage with confidence levels', 'Emergency red-flag detection', 'Personalized lifestyle & nutrition coaching', 'NOORIVA product recommendations'],
    tip: 'Works best with clear, well-lit photos. Tap the area tags to tell Noorix where the issue is.',
  },
  {
    id: 'mealPhoto',
    icon: Salad,
    color: '#5eead4',
    bg: 'linear-gradient(135deg, #0a1a15 0%, #102a20 50%, #0a1a15 100%)',
    title: 'Meal Nutrition Scan',
    subtitle: 'Snap Your Food, Know Your Glow',
    description: 'Photograph any meal and Noorix breaks down every macro and micronutrient. It rates each nutrient for skin health impact and suggests improvements to maximize your glow from within.',
    features: ['Full macro breakdown (calories, protein, carbs, fat)', 'Skin nutrient scoring (1-10)', 'Ingredient identification', 'Glow optimization suggestions'],
    tip: 'Include the full plate in the photo. Noorix identifies ingredients automatically.',
  },
  {
    id: 'supplement',
    icon: Pill,
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1030 50%, #0a0a1a 100%)',
    title: 'Supplement Advisor',
    subtitle: 'Your Personalized Stack',
    description: 'Tell Noorix your health goals — glowing skin, stronger hair, better energy — and receive a personalized supplement stack with exact dosages, timing, and interaction warnings.',
    features: ['Personalized supplement stack', 'Exact dosage & timing', 'Interaction warnings', 'NOORIVA flavor recommendation'],
    tip: 'Select multiple concerns for a comprehensive recommendation. Noorix knows all NOORIVA products.',
  },
  {
    id: 'sleep',
    icon: Moon,
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #101030 50%, #0a0a1a 100%)',
    title: 'Sleep Coach',
    subtitle: 'Rest Better, Glow Better',
    description: 'Log your sleep patterns and Noorix analyzes how rest affects your skin. Get circadian rhythm fixes, bedtime routines, and the perfect NOORIVA flavor for nighttime recovery.',
    features: ['Sleep quality analysis', 'Circadian rhythm fixes', 'Custom bedtime routine', 'Skin-sleep correlation'],
    tip: 'Use the counter to log hours and the emoji cards for quality. Noorix connects sleep to skin health.',
  },
  {
    id: 'stress',
    icon: Sun,
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #1a150a 0%, #2a2010 50%, #1a150a 100%)',
    title: 'Stress & Mood Tracker',
    subtitle: 'Mind-Skin Connection',
    description: 'Quick emoji-based mood check-in that correlates your emotional state with skin flare-ups. Noorix provides coping strategies, stress-fighting nutrition, and calming rituals.',
    features: ['Emoji mood selector', 'Stress-skin correlation', 'Coping strategies', 'Calming NOORIVA rituals'],
    tip: 'Check in daily for the best pattern detection. Noorix learns your stress-skin connection over time.',
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #1a0a0a 0%, #2a1010 50%, #1a0a0a 100%)',
    title: 'Fitness & Skin',
    subtitle: 'Workout-Smart Skincare',
    description: 'Tell Noorix your workout type and intensity. Receive pre and post-exercise skincare protocols, sweat-acne prevention tips, and the ideal NOORIVA timing for recovery.',
    features: ['Pre-workout skincare protocol', 'Post-workout recovery tips', 'Sweat-acne prevention', 'Hydration strategy'],
    tip: 'Select your workout type and frequency. Noorix customizes advice for your specific exercise.',
  },
  {
    id: 'product',
    icon: ScanLine,
    color: '#22d3ee',
    bg: 'linear-gradient(135deg, #0a1a1a 0%, #102a2a 50%, #0a1a1a 100%)',
    title: 'Product Scanner',
    subtitle: 'Decode Any Product',
    description: 'Photograph any product label and Noorix decodes every ingredient for your specific skin type. Get safety ratings, benefit analysis, and a clear verdict on whether to use it.',
    features: ['Full ingredient decode', 'Safety ratings per ingredient', 'Skin type matching', 'Clear use/don\'t use verdict'],
    tip: 'Focus the camera on the ingredients list. Noorix reads and analyzes each ingredient.',
  },
  {
    id: 'diary',
    icon: BookOpen,
    color: '#d946ef',
    bg: 'linear-gradient(135deg, #1a0a1a 0%, #2a102a 50%, #1a0a1a 100%)',
    title: 'Skin Diary',
    subtitle: 'Pattern Recognition',
    description: 'Daily skin observations become powerful data. Noorix identifies patterns linking breakouts to diet, stress, sleep, and hormones — and tells you exactly what triggers your flare-ups.',
    features: ['Daily skin logging', 'Pattern detection over time', 'Trigger identification', 'Lifestyle correlation'],
    tip: 'Log daily for at least 2 weeks for meaningful pattern detection.',
  },
  {
    id: 'hydration',
    icon: GlassWater,
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg, #0a1520 0%, #102030 50%, #0a1520 100%)',
    title: 'Hydration Tracker',
    subtitle: 'Glow From Within',
    description: 'Track your daily water intake with a simple tap counter. Noorix correlates hydration with skin elasticity, recommends water-rich foods, and builds a timed drinking schedule.',
    features: ['Tap counter for water glasses', 'Skin elasticity correlation', 'Water-rich food suggestions', 'Timed drinking schedule'],
    tip: 'Aim for 8 glasses. Noorix will tell you if your skin needs more.',
  },
  {
    id: 'symptom',
    icon: Stethoscope,
    color: '#10b981',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #102a18 50%, #0a1a10 100%)',
    title: 'Symptom Check',
    subtitle: 'Body Triage',
    description: 'Point to any body region and describe symptoms. Noorix provides emergency red-flag detection, possible causes ranked by likelihood, self-care guidance, and urgency-level doctor recommendations.',
    features: ['Body region selector', 'Emergency red-flag detection', 'Self-care guidance', 'Urgency-level doctor advice'],
    tip: 'For emergencies, Noorix will immediately flag and urge you to seek care.',
  },
  {
    id: 'hair',
    icon: Scissors,
    color: '#f97316',
    bg: 'linear-gradient(135deg, #1a100a 0%, #2a1810 50%, #1a100a 100%)',
    title: 'Hair Health',
    subtitle: 'Scalp Analytics',
    description: 'Upload a hair or scalp photo for AI analysis. Noorix assesses strand health, scalp condition, hair loss patterns, and dandruff severity — then recommends targeted nutrition and care routines.',
    features: ['Scalp condition assessment', 'Hair loss pattern analysis', 'Growth nutrition recommendations', 'Targeted care routines'],
    tip: 'For best results, photograph your scalp in good lighting.',
  },
  {
    id: 'ingredient',
    icon: Beaker,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #15102a 50%, #0a0a1a 100%)',
    title: 'Ingredient Decoder',
    subtitle: 'Chemical Intelligence',
    description: 'Snap any ingredient list — skincare, haircare, food, or supplements. Noorix identifies harmful chemicals, flags allergens, checks halal status, and rates overall safety.',
    features: ['Harmful chemical detection', 'Allergen flagging', 'Halal status verification', 'Overall safety rating'],
    tip: 'Works on any product — skincare, haircare, food, or supplements.',
  },
  {
    id: 'sun',
    icon: CloudSun,
    color: '#fbbf24',
    bg: 'linear-gradient(135deg, #1a1a0a 0%, #2a2a10 50%, #1a1a0a 100%)',
    title: 'UV Protection',
    subtitle: 'Sun Shield',
    description: 'Get real-time UV protection advice based on your skin tone, activity, and exposure level. Noorix recommends SPF strength, application timing, and after-sun recovery protocols.',
    features: ['UV risk assessment', 'SPF recommendation', 'Application timing', 'After-sun recovery'],
    tip: 'Check before outdoor activities. Noorix customizes advice for your skin tone.',
  },
  {
    id: 'routine',
    icon: Heart,
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2a1020 50%, #1a0a10 100%)',
    title: 'Routine Builder',
    subtitle: 'Ritual Architect',
    description: 'Share your skin goal and current products. Noorix architects a complete AM and PM skincare ritual with step-by-step instructions, ingredient pairing rules, and a results timeline.',
    features: ['AM routine design', 'PM routine design', 'Ingredient pairing rules', 'Results timeline'],
    tip: 'Be specific about your current products for the best routine optimization.',
  },
  {
    id: 'freeChat',
    icon: MessageCircle,
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1030 50%, #0a0a1a 100%)',
    title: 'Chat with Noorix',
    subtitle: 'Open Conversation',
    description: 'Have a free-form conversation with Noorix about anything — skin concerns, nutrition questions, product recommendations, or just chat about your wellness journey. Multi-turn memory included.',
    features: ['Ask anything about health & beauty', 'Multi-turn conversation memory', 'NOORIVA product knowledge', 'Urdu & English support'],
    tip: 'Noorix remembers your conversation context. Ask follow-up questions for deeper guidance.',
  },
  {
    id: 'voiceOutput',
    icon: Mic,
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg, #0a1520 0%, #102030 50%, #0a1520 100%)',
    title: 'Voice Input',
    subtitle: 'Speak, Don\'t Type',
    description: 'Tap the microphone button and speak your question. Noorix converts your speech to text and responds. Perfect for hands-free use while cooking, exercising, or relaxing.',
    features: ['Speech-to-text conversion', 'Hands-free operation', 'Works in quiet environments', 'Multi-language support'],
    tip: 'Works best in quiet environments. Speak clearly for best results.',
  },
  {
    id: 'progressPhotos',
    icon: Camera,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #15102a 50%, #0a0a1a 100%)',
    title: 'Progress Photos',
    subtitle: 'Visual Tracking',
    description: 'Upload before and after photos to visually track your skin transformation. Noorix analyzes improvements and identifies what treatments are working.',
    features: ['Before/after comparison', 'Improvement analysis', 'Treatment effectiveness', 'Visual progress timeline'],
    tip: 'Take photos in the same lighting for accurate comparison.',
  },
  {
    id: 'streaks',
    icon: Zap,
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #1a150a 0%, #2a2010 50%, #1a150a 100%)',
    title: 'Streaks & Badges',
    subtitle: 'Gamified Wellness',
    description: 'Track your glow streaks, earn badges, and unlock achievements. Consistency is the secret to radiant skin — let Noorix keep you motivated with daily rewards.',
    features: ['Daily streak tracking', 'Achievement badges', 'Progress milestones', 'Glow score system'],
    tip: 'Check in daily to maintain your streak. Your glow score appears on the landing page.',
  },
  {
    id: 'wellnessCalendar',
    icon: BookOpen,
    color: '#10b981',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #102a18 50%, #0a1a10 100%)',
    title: 'Wellness Calendar',
    subtitle: 'Monthly Overview',
    description: 'See your entire wellness journey in a calendar view. Track check-ins, mood patterns, skin observations, and ritual completions by date.',
    features: ['Monthly calendar view', 'Daily wellness logs', 'Pattern visualization', 'Progress tracking'],
    tip: 'View your calendar monthly to spot seasonal patterns.',
  },
  {
    id: 'exportReport',
    icon: Star,
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #101030 50%, #0a0a1a 100%)',
    title: 'Export Report',
    subtitle: 'PDF Wellness Report',
    description: 'Generate a comprehensive wellness report from all your Noorix data. Download as PDF to share with your dermatologist or keep for personal records.',
    features: ['PDF report generation', 'Shareable with doctors', 'Complete data summary', 'Progress charts'],
    tip: 'Generate monthly reports to track long-term progress.',
  },
  {
    id: 'chatSearch',
    icon: ScanLine,
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2a1020 50%, #1a0a10 100%)',
    title: 'Chat History',
    subtitle: 'Smart Search',
    description: 'Search through all your past Noorix conversations. Find that supplement recommendation, skin advice, or nutrition tip from weeks ago.',
    features: ['Full-text search', 'Conversation history', 'Instant results', 'Bookmark important advice'],
    tip: 'Use keywords to find specific advice from past conversations.',
  },
  {
    id: 'quickActions',
    icon: Zap,
    color: '#f97316',
    bg: 'linear-gradient(135deg, #1a100a 0%, #2a1810 50%, #1a100a 100%)',
    title: 'Quick Actions',
    subtitle: 'Speed Tools',
    description: 'One-tap shortcuts for common tasks: quick skin check, water log, mood check-in, supplement reminder, and daily ritual completion.',
    features: ['One-tap skin check', 'Quick water log', 'Instant mood check-in', 'Daily ritual tracker'],
    tip: 'Use quick actions for your daily routine — no typing needed.',
  },
  {
    id: 'moodJournal',
    icon: Heart,
    color: '#d946ef',
    bg: 'linear-gradient(135deg, #1a0a1a 0%, #2a102a 50%, #1a0a1a 100%)',
    title: 'Mood Journal',
    subtitle: 'Emotional Wellness',
    description: 'Daily mood logging with emoji-based check-ins. Noorix correlates your emotional patterns with skin health and suggests coping strategies.',
    features: ['Emoji mood tracking', 'Pattern correlation', 'Wellness insights', 'Coping strategies'],
    tip: 'Check in daily for the best pattern detection.',
  },
  {
    id: 'darkMode',
    icon: Moon,
    color: '#1e293b',
    bg: 'linear-gradient(135deg, #0a0a0f 0%, #151520 50%, #0a0a0f 100%)',
    title: 'Dark Mode',
    subtitle: 'Night-Friendly Theme',
    description: 'Switch to a beautiful dark theme for nighttime use. Easier on the eyes, better for sleep, and the Noorix orb looks stunning against the dark background.',
    features: ['Dark theme toggle', 'Sleep-friendly colors', 'Eye comfort', 'Persistent preference'],
    tip: 'Toggle from the feature grid. Your preference is saved automatically.',
  },
  {
    id: 'medicalImage',
    icon: Stethoscope,
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #1a0a0a 0%, #2a1010 50%, #1a0a0a 100%)',
    title: 'Medical Imaging',
    subtitle: 'Advanced AI Analysis',
    description: 'Upload medical images for clinical-grade AI analysis powered by MedSigLip. Noorix identifies conditions, assesses severity, and tells you exactly when to see a doctor.',
    features: ['Clinical-grade analysis', 'Condition identification', 'Severity assessment', 'Emergency red-flag detection'],
    tip: 'For skin lesions, rashes, or wounds. Noorix never replaces a doctor.',
  },
  {
    id: 'skinClassification',
    icon: ScanLine,
    color: '#f97316',
    bg: 'linear-gradient(135deg, #1a100a 0%, #2a1810 50%, #1a100a 100%)',
    title: 'Skin Classifier',
    subtitle: 'AI Classification',
    description: 'AI classifies skin conditions from photos using medical imaging models. Identifies acne types, pigmentation patterns, and skin texture analysis.',
    features: ['Acne type classification', 'Pigmentation analysis', 'Texture scoring', 'Skin type detection'],
    tip: 'Upload clear, well-lit photos for accurate classification.',
  },
  {
    id: 'treatmentPlan',
    icon: Heart,
    color: '#10b981',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #102a18 50%, #0a1a10 100%)',
    title: 'Treatment Plan',
    subtitle: 'Personalized Roadmap',
    description: 'Get a complete treatment plan with phases, timelines, product recommendations, and lifestyle changes. Noorix architects your journey from current state to your glow goals.',
    features: ['Multi-phase treatment plan', 'Product recommendations', 'Lifestyle changes', 'Results timeline'],
    tip: 'Be specific about your condition and what you\'ve tried for the best plan.',
  },
  {
    id: 'healthRisk',
    icon: Shield,
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #1a0a0a 0%, #2a1010 50%, #1a0a0a 100%)',
    title: 'Health Risk Assessment',
    subtitle: 'Prevention Intelligence',
    description: 'Comprehensive health risk assessment based on your lifestyle, family history, and current symptoms. Identifies potential risks before they become problems.',
    features: ['Risk scoring (1-10)', 'Prevention tips', 'Early detection alerts', 'Lifestyle recommendations'],
    tip: 'Be honest about your lifestyle for accurate risk assessment.',
  },
  {
    id: 'skinAge',
    icon: Sparkles,
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2a1020 50%, #1a0a10 100%)',
    title: 'Skin Age Detector',
    subtitle: 'Age Intelligence',
    description: 'Upload a selfie and Noorix predicts your skin age versus your actual age. Discover how your skin truly ages and get a personalized rejuvenation plan.',
    features: ['Skin age prediction', 'Age comparison', 'Rejuvenation plan', 'Progress tracking'],
    tip: 'Use natural lighting and no filters for accurate age detection.',
  },
  {
    id: 'ingredientConflict',
    icon: Beaker,
    color: '#f97316',
    bg: 'linear-gradient(135deg, #1a100a 0%, #2a1810 50%, #1a100a 100%)',
    title: 'Ingredient Conflicts',
    subtitle: 'Safety Intelligence',
    description: 'Paste or photograph your current skincare products. Noorix checks every ingredient combination for conflicts, redundancies, and dangerous interactions.',
    features: ['Conflict detection', 'Ingredient synergy', 'Safe combinations', 'Redundancy alerts'],
    tip: 'Upload all products you currently use for comprehensive conflict checking.',
  },
];

export default function NoorixTutorial({ isOpen, onClose }) {
  var [step, setStep] = useState(0);
  var current = STEPS[step];
  var Icon = current.icon;

  useEffect(function() {
    if (isOpen) setStep(0);
  }, [isOpen]);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else if (onClose) onClose();
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function goTo(i) { setStep(i); }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="tutorial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            key={current.bg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{ background: current.bg }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map(function(_, i) {
              return (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -window.innerHeight],
                    x: [0, (Math.random() - 0.5) * 100],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 8,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: 2 + Math.random() * 3,
                    height: 2 + Math.random() * 3,
                    left: Math.random() * 100 + '%',
                    bottom: -10,
                    background: current.color,
                  }}
                />
              );
            })}
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: current.color + '20' }}>
                  <Icon size={16} style={{ color: current.color }} />
                </div>
                <span className="text-white/60 text-sm font-mono">{current.subtitle}</span>
              </div>
              <button onClick={onClose} className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-2xl w-full text-center"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-8"
                  >
                    <div
                      className="inline-flex h-24 w-24 items-center justify-center rounded-3xl"
                      style={{
                        background: current.color + '15',
                        boxShadow: '0 0 60px ' + current.color + '20',
                      }}
                    >
                      <Icon size={48} style={{ color: current.color }} />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {current.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl mx-auto"
                  >
                    {current.description}
                  </motion.p>

                  {/* Features list */}
                  {current.features.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto"
                    >
                      {current.features.map(function(feat, i) {
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-2 text-left"
                          >
                            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: current.color }} />
                            <span className="text-white/70 text-sm">{feat}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Tip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-block rounded-xl px-4 py-2 text-xs text-white/50"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span style={{ color: current.color }}>Pro tip:</span> {current.tip}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="px-6 py-6">
              <div className="max-w-2xl mx-auto">
                {/* Progress bar */}
                <div className="flex items-center gap-1 mb-4 overflow-x-auto no-scrollbar pb-2">
                  {STEPS.map(function(s, i) {
                    return (
                      <button
                        key={s.id}
                        onClick={function() { goTo(i); }}
                        className="h-1 rounded-full transition-all duration-300 shrink-0"
                        style={{
                          width: i === step ? 24 : 8,
                          background: i === step ? s.color : i < step ? s.color + '60' : 'rgba(255,255,255,0.1)',
                          boxShadow: i === step ? '0 0 8px ' + s.color + '60' : 'none',
                        }}
                        title={s.title}
                      />
                    );
                  })}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="flex items-center gap-1 text-sm text-white/40 hover:text-white/70 disabled:opacity-20 transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <span className="text-xs text-white/30 font-mono">
                    {step + 1} / {STEPS.length}
                  </span>

                  <button
                    onClick={next}
                    className="flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: current.color }}
                  >
                    {step === STEPS.length - 1 ? 'Start Glowing' : 'Next'} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
