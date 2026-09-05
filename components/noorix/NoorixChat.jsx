'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { Home, MicOff, ShoppingCart } from 'lucide-react';
import {
  Sparkles, LogOut, Send, ShoppingBag, ArrowRight, User, Zap, Star, Crown, Loader2,
  Heart, Calendar, Sun, Moon, Search, Lock, GlassWater, MessageCircle, ScanLine,
  Dumbbell, Pill, Bed, Beaker, Stethoscope, Camera, Mic, Check, Trophy, Copy, X,
  ArrowLeft, Share2, Volume2, Shield, ChevronRight, FileText, Activity, Brain, Wind,
  Languages, Dna, Flower2, ChefHat, Brush, Smile, Music, Palette, Baby, RefreshCw,
  Scissors, CloudSun, BookOpen, Salad, Clock, AlertTriangle, Target, Coffee, Footprints,
  Eye, Leaf, Droplets, Thermometer, Apple, Globe
} from 'lucide-react';

import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { isFeatureAllowed, checkDailyLimit, getRequiredPlan } from '@/lib/noorix-plans';
import NoorixOrb from './NoorixOrb';
import NoorixPlans from './NoorixPlans';
import NoorixFeatureCard from './NoorixFeatureCard';
import LanguageToggle from '../ui/LanguageToggle';

/* ══════════════════════════════════════════════════════════════
   FEATURE REGISTRY — 14 AI-Powered Health & Beauty Features
   ══════════════════════════════════════════════════════════════ */

const FEATURES = [
  // ═══ MERGED FEATURES (6) ═══
  {
    id: 'skinIntelligence',
    icon: Camera,
    needsImage: true,
    color: '#ff8fb2',
    tagline: 'Skin Intelligence',
    description: 'Upload a photo of any skin concern. Noorix performs differential triage, classifies the condition, predicts your skin age, and builds a personalized coaching plan — all in one analysis.',
    highlights: ['Differential triage', 'Condition classification', 'Skin age prediction', 'Rejuvenation plan'],
  },
  {
    id: 'ingredientIntelligence',
    icon: ScanLine,
    needsImage: true,
    color: '#22d3ee',
    tagline: 'Ingredient Intelligence',
    description: 'Photograph any product label. Noorix decodes every ingredient, checks for harmful chemicals, flags allergens, verifies halal status, and checks for conflicts across your entire routine.',
    highlights: ['Full ingredient decode', 'Halal verification', 'Conflict detection', 'Safety verdict'],
  },
  {
    id: 'glowJournal',
    icon: BookOpen,
    needsImage: false,
    color: '#d946ef',
    tagline: 'Glow Journal',
    description: 'Daily mood check-ins and skin observations become powerful data. Noorix identifies patterns linking breakouts to stress, diet, sleep, and hormones — and tells you exactly what triggers your flare-ups.',
    highlights: ['Mood-skin correlation', 'Pattern detection', 'Trigger identification', 'Coping strategies'],
  },
  {
    id: 'treatmentRoutine',
    icon: Heart,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Ritual Architect',
    description: 'Share your skin goal and current products. Noorix architects a complete treatment plan with AM/PM rituals, step-by-step instructions, ingredient pairing rules, and a results timeline.',
    highlights: ['Personalized treatment', 'AM/PM ritual design', 'Ingredient pairing', 'Results timeline'],
  },
  {
    id: 'progressStreaks',
    icon: Sparkles,
    needsImage: true,
    color: '#8b5cf6',
    tagline: 'Progress & Streaks',
    description: 'Upload before and after photos to visually track your skin transformation. Noorix analyzes improvements, tracks your daily glow streaks, and unlocks achievement badges for consistency.',
    highlights: ['Before/after comparison', 'Visual tracking', 'Daily streaks', 'Achievement badges'],
  },
  {
    id: 'wellnessToolkit',
    icon: Zap,
    needsImage: false,
    color: '#6366f1',
    tagline: 'Wellness Toolkit',
    description: 'Monthly calendar overview, PDF report generation, full-text conversation search, one-tap quick actions, and dark mode — everything you need to manage your glow journey in one place.',
    highlights: ['Monthly calendar', 'PDF reports', 'Smart search', 'Quick actions', 'Dark mode'],
  },

  // ═══ KEPT FEATURES (12) ═══
  {
    id: 'mealPhoto',
    icon: Salad,
    needsImage: true,
    color: '#5eead4',
    tagline: 'Nutrition Intelligence',
    description: 'Snap any meal for instant macro and micronutrient breakdown. Noorix rates each nutrient for skin health impact and suggests improvements to maximize your glow from within.',
    highlights: ['Macro breakdown', 'Skin nutrient score', 'Glow optimization'],
  },
  {
    id: 'supplement',
    icon: Pill,
    needsImage: false,
    color: '#a78bfa',
    tagline: 'Stack Builder',
    description: 'Tell Noorix your health goals — glowing skin, stronger hair, better energy — and receive a personalized supplement stack with dosages, timing, and interaction warnings.',
    highlights: ['Personalized stack', 'Dosage & timing', 'Interaction alerts'],
  },
  {
    id: 'sleep',
    icon: Moon,
    needsImage: false,
    color: '#6366f1',
    tagline: 'Sleep Optimization',
    description: 'Log your sleep patterns and Noorix analyzes how rest affects your skin. Get circadian rhythm fixes, bedtime routines, and the perfect NOORIVA flavor for nighttime recovery.',
    highlights: ['Circadian analysis', 'Bedtime routine', 'Skin-sleep link'],
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    needsImage: false,
    color: '#ef4444',
    tagline: 'Athletic Dermatology',
    description: 'Tell Noorix your workout type and intensity. Receive pre and post-exercise skincare protocols, sweat-acne prevention, hydration strategies, and the ideal NOORIVA timing for recovery.',
    highlights: ['Pre/post skincare', 'Sweat-acne prevention', 'Recovery protocol'],
  },
  {
    id: 'hydration',
    icon: GlassWater,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Glow Hydration',
    description: 'Track your daily water intake with a simple tap counter. Noorix correlates hydration with skin elasticity, recommends water-rich foods, and builds a timed drinking schedule for maximum glow.',
    highlights: ['Tap counter', 'Skin elasticity link', 'Drinking schedule'],
  },
  {
    id: 'symptom',
    icon: Stethoscope,
    needsImage: false,
    color: '#10b981',
    tagline: 'Body Triage',
    description: 'Point to any body region and describe symptoms. Noorix provides emergency red-flag detection, possible causes ranked by likelihood, self-care guidance, and urgency-level doctor recommendations.',
    highlights: ['Body region selector', 'Emergency detection', 'Urgency triage'],
  },
  {
    id: 'hair',
    icon: Scissors,
    needsImage: true,
    color: '#f97316',
    tagline: 'Scalp Analytics',
    description: 'Upload a hair or scalp photo for analysis. Noorix assesses strand health, scalp condition, hair loss patterns, and dandruff severity — then recommends targeted nutrition and care routines.',
    highlights: ['Scalp assessment', 'Loss pattern analysis', 'Growth nutrition'],
  },
  {
    id: 'sun',
    icon: CloudSun,
    needsImage: false,
    color: '#fbbf24',
    tagline: 'UV Shield',
    description: 'Get real-time UV protection advice based on your skin tone, activity, and exposure level. Noorix recommends SPF strength, application timing, protective clothing, and after-sun recovery protocols.',
    highlights: ['UV risk assessment', 'SPF recommendation', 'After-sun care'],
  },
  {
    id: 'freeChat',
    icon: MessageCircle,
    needsImage: false,
    color: '#a78bfa',
    tagline: 'Ask Noorix',
    description: 'Have a free-form conversation with Noorix about anything — skin concerns, nutrition questions, product recommendations, wellness advice, or just chat about your glow journey. Ask anything, anytime.',
    highlights: ['Ask anything', 'Multi-turn memory', 'Personalized advice'],
    featured: true,
  },
  {
    id: 'voiceOutput',
    icon: Volume2,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Voice Output',
    description: 'Noorix speaks responses aloud. Listen to health advice, nutrition tips, and wellness coaching hands-free while you cook, exercise, or relax.',
    highlights: ['Text-to-speech', 'Hands-free listening', 'Multi-language'],
  },
  {
    id: 'medicalImage',
    icon: Stethoscope,
    needsImage: true,
    color: '#ef4444',
    tagline: 'Medical Imaging',
    description: 'Advanced medical image analysis. Upload skin lesions, rashes, wounds, or any medical image for identification and triage guidance with clinical precision.',
    highlights: ['Medical-grade analysis', 'Condition identification', 'Severity assessment'],
  },
  {
    id: 'healthRisk',
    icon: Shield,
    needsImage: false,
    color: '#dc2626',
    tagline: 'Risk Assessment',
    description: 'Comprehensive health risk assessment based on your lifestyle, family history, and current symptoms. Identifies potential risks before they become problems.',
    highlights: ['Risk scoring', 'Prevention tips', 'Early detection'],
  },

  // ═══ NEW FEATURES (11) ═══
  {
    id: 'glowScore',
    icon: Sparkles,
    needsImage: false,
    color: '#fbbf24',
    tagline: 'Daily Glow Score',
    description: 'Your personalized 0-100 glow score, calculated from all your Noorix interactions — sleep, hydration, mood, nutrition, and skincare. Track your radiance trend over time.',
    highlights: ['0-100 daily score', 'Trend tracking', 'Factor breakdown', 'Improvement tips'],
  },
  {
    id: 'glowRitualFinder',
    icon: Heart,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Ritual Finder',
    description: 'Answer 3 quick questions — no typing. Noorix matches you to your perfect NOORISH GOLD ritual based on your goals, taste, and lifestyle. Discover your glow match.',
    highlights: ['3-question match', 'Personality-based', 'NOORISH GOLD pairing', 'Taste profile'],
  },
  {
    id: 'weatherGlow',
    icon: CloudSun,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Weather Glow',
    description: 'Real-time Pakistan weather data — UV index, humidity, pollution, and temperature — personalized to your city. Noorix gives daily skin advice based on actual conditions.',
    highlights: ['Live weather API', 'UV index advice', 'Humidity impact', 'Pollution protection'],
  },
  {
    id: 'culturalAdapt',
    icon: Moon,
    needsImage: false,
    color: '#6366f1',
    tagline: 'Cultural Adapt',
    description: 'Ramadan fasting, monsoon humidity, wedding season stress, winter dryness — Noorix adjusts your glow routine for Pakistani cultural and seasonal contexts.',
    highlights: ['Ramadan guidance', 'Monsoon skincare', 'Wedding season', 'Seasonal adaptation'],
  },
  {
    id: 'beforeAfter',
    icon: Camera,
    needsImage: true,
    color: '#8b5cf6',
    tagline: 'Visual Diff',
    description: 'Upload two photos — Day 1 and today. Noorix analyzes the visual difference, generates a glow improvement chart, and creates a shareable before/after card.',
    highlights: ['Visual comparison', 'Improvement chart', 'Shareable card', 'Progress metrics'],
  },
  {
    id: 'multilingualVoice',
    icon: Volume2,
    needsImage: false,
    color: '#a78bfa',
    tagline: 'Multilingual Voice',
    description: 'Noorix speaks to you in Urdu, Arabic, or English with a natural, beautiful voice. Every response can be heard aloud — perfect for hands-free wellness guidance.',
    highlights: ['Urdu voice', 'Arabic voice', 'English voice', 'Natural synthesis'],
  },
  {
    id: 'labReport',
    icon: Beaker,
    needsImage: true,
    color: '#10b981',
    tagline: 'Lab Report Analysis',
    description: 'Upload blood test or lab report as PDF or photo. Noorix extracts values, explains what they mean, and correlates results with your skin, hair, and overall glow.',
    highlights: ['PDF upload', 'Value extraction', 'Health correlation', 'Doctor-ready summary'],
  },
  {
    id: 'voiceConversation',
    icon: MessageCircle,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Voice Conversation',
    description: 'Full bidirectional voice chat. Speak to Noorix in Urdu, Arabic, or English — she speaks back. No typing at all. True hands-free glow guidance for cooking, driving, or exercising.',
    highlights: ['Voice input', 'Voice output', 'Urdu/Arabic/English', 'Hands-free'],
  },
  {
    id: 'liveIngredientResearch',
    icon: ScanLine,
    needsImage: true,
    color: '#22d3ee',
    tagline: 'Live Ingredient Research',
    description: 'When analyzing ingredients, Noorix searches in real-time for the latest safety studies, product recalls, and research. Always up-to-date — never relying on outdated training data.',
    highlights: ['Real-time search', 'Safety recalls', 'Latest research', 'Verified sources'],
  },
  {
    id: 'multiAngleVideo',
    icon: Camera,
    needsImage: true,
    color: '#ff8fb2',
    tagline: 'Multi-Angle Video',
    description: 'Upload a 5-10 second video instead of a single photo. Noorix analyzes multiple angles, lighting conditions, and expressions for far more accurate skin assessment.',
    highlights: ['Video upload', 'Multi-angle analysis', 'Lighting assessment', 'Expression tracking'],
  },
  {

    id: 'refillReminder',
    icon: Pill,
    needsImage: false,
    color: '#f97316',
    tagline: 'Smart Refill',
    description: 'Noorix tracks your NOORISH GOLD usage patterns and sends smart refill reminders. Based on your actual consumption rate — never run out of your glow ritual.',
    highlights: ['Usage tracking', 'Smart timing', 'Auto-reminder', 'One-tap reorder'],
  },
    {
    id: 'moodJournal',
    icon: Smile,
    needsImage: false,
    color: '#f472b6',
    tagline: 'Mood Journal',
    description: 'Quick mood entry and sentiment analysis. Noorix tracks your emotional patterns, identifies triggers, and provides personalized encouragement.',
    highlights: ['Mood tracking', 'Sentiment analysis', 'Trigger identification', 'Gratitude prompts'],
  },

    // ═══ BRAND NEW FEATURES (20) ═══
  {
    id: 'aiDietChart',
    icon: ChefHat,
    needsImage: false,
    color: '#f59e0b',
    tagline: 'AI Diet Chart',
    description: 'Get a beautifully crafted visual diet chart as a downloadable image. Personalized macros, meal timing, and Pakistani cuisine options for maximum glow.',
    highlights: ['Visual chart', 'Personalized macros', 'Pakistani cuisine', 'Downloadable'],
  },
  {
    id: 'workoutVisualizer',
    icon: Dumbbell,
    needsImage: false,
    color: '#ef4444',
    tagline: 'Workout Visualizer',
    description: 'Creates visual workout plan cards with exercise diagrams, sets/reps, and rest timers. Perfect for sharing to Instagram.',
    highlights: ['Visual plan', 'Exercise diagrams', 'Sets & reps', 'Shareable'],
  },
  {
    id: 'drugInteractionChecker',
    icon: Shield,
    needsImage: false,
    color: '#dc2626',
    tagline: 'Drug Interaction',
    description: 'Real-time interaction checker between your medications and supplements. Uses Google Search for the latest medical databases.',
    highlights: ['Real-time data', 'Google Search', 'Medication safety', 'Supplement alerts'],
  },
  {
    id: 'liveVoiceTranslator',
    icon: Languages,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Voice Translator',
    description: 'Real-time voice translation. Speak in Urdu, Noorix responds in English or vice versa. Perfect for multilingual Pakistani users.',
    highlights: ['Real-time', 'Urdu ↔ English', 'Voice input', 'Live translation'],
  },
  {
    id: 'geneticReportReader',
    icon: Dna,
    needsImage: false,
    color: '#7c3aed',
    tagline: 'Genetic Reader',
    description: 'Upload your genetic test PDF (23andMe etc). Noorix analyzes genetic predispositions and creates personalized wellness recommendations.',
    highlights: ['PDF upload', 'Genetic analysis', 'Predisposition check', 'Personalized plan'],
  },
  {
    id: 'hormoneCycleWellness',
    icon: Flower2,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Hormone Cycle',
    description: 'Female-specific feature. Tracks hormonal phases and adjusts skincare, nutrition, and exercise recommendations based on cycle stage.',
    highlights: ['Cycle tracking', 'Phase-based recs', 'Skincare adjust', 'Nutrition timing'],
  },
  {
    id: 'yogaPostureCorrector',
    icon: Activity,
    needsImage: true,
    color: '#5eead4',
    tagline: 'Posture AI',
    description: 'Upload video of yoga pose or posture. Noorix analyzes alignment, identifies issues, and suggests corrections with visual guides.',
    highlights: ['Video upload', 'Alignment analysis', 'Correction guides', 'Real-time feedback'],
  },
  {
    id: 'aiRecipeGenerator',
    icon: ChefHat,
    needsImage: false,
    color: '#f97316',
    tagline: 'Recipe AI',
    description: 'Generates healthy Pakistani recipes based on your health goals, allergies, and available ingredients. Includes visual recipe cards.',
    highlights: ['Pakistani cuisine', 'Allergy-aware', 'Visual cards', 'Goal-based'],
  },
  {
    id: 'sleepStoryGenerator',
    icon: Bed,
    needsImage: false,
    color: '#6366f1',
    tagline: 'Sleep Stories',
    description: 'Generates personalized bedtime stories with Nooriva branding. Uses calming language, Urdu poetry, and ambient sound suggestions.',
    highlights: ['Personalized stories', 'Urdu poetry', 'Calming language', 'Ambient sounds'],
  },
  {
    id: 'hydrationGamification',
    icon: GlassWater,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Hydration Game',
    description: 'Turns hydration tracking into a game. Daily challenges, streaks, badges, and social sharing. Visual progress cards.',
    highlights: ['Gamified', 'Daily challenges', 'Badges', 'Social sharing'],
  },
  {
    id: 'aiMakeupMatch',
    icon: Brush,
    needsImage: true,
    color: '#ff8fb2',
    tagline: 'Makeup Match',
    description: 'Upload selfie. Noorix matches foundation shade, lipstick color, and blush to your exact skin tone using computer vision.',
    highlights: ['Selfie upload', 'Shade matching', 'Color analysis', 'Product recs'],
  },
  {
    id: 'wellnessReportPdf',
    icon: FileText,
    needsImage: false,
    color: '#8b5cf6',
    tagline: 'Wellness Report',
    description: 'Generates comprehensive monthly wellness reports (PDF) with charts, trends, recommendations, and Nooriva product suggestions.',
    highlights: ['Monthly PDF', 'Charts & trends', 'Recommendations', 'Product suggestions'],
  },
  {
    id: 'fastingRamadanTracker',
    icon: Calendar,
    needsImage: false,
    color: '#10b981',
    tagline: 'Ramadan Tracker',
    description: 'Intermittent fasting tracker with Ramadan mode. Adjusts hydration, nutrition, and skincare recommendations for fasting periods.',
    highlights: ['Ramadan mode', 'Fasting tracker', 'Hydration adjust', 'Skincare for fasting'],
  },
  {
    id: 'mentalWellnessCompanion',
    icon: Brain,
    needsImage: false,
    color: '#a78bfa',
    tagline: 'Mental Wellness',
    description: 'AI-powered mental health support. Mood tracking, CBT exercises, breathing techniques, and crisis resource detection.',
    highlights: ['Mood tracking', 'CBT exercises', 'Breathing techniques', 'Crisis detection'],
  },
  {
    id: 'allergyDetective',
    icon: Shield,
    needsImage: false,
    color: '#dc2626',
    tagline: 'Allergy AI',
    description: 'Cross-references your allergies against product ingredients, restaurant menus, and environment. Real-time alerts via Google Search.',
    highlights: ['Allergy check', 'Google Search', 'Real-time alerts', 'Menu scanning'],
  },
  {
    id: 'moodMusicRecommender',
    icon: Music,
    needsImage: false,
    color: '#f472b6',
    tagline: 'Mood Music',
    description: 'Recommends music playlists based on mood, energy level, and time of day. Integrates with your wellness data.',
    highlights: ['Mood-based', 'Energy matching', 'Time-aware', 'Playlist recs'],
  },
  {
    id: 'skincareRoutineCard',
    icon: Palette,
    needsImage: false,
    color: '#ff8fb2',
    tagline: 'Routine Card',
    description: 'Creates beautiful visual morning/night routine cards with product images, order, and timing. Shareable to Instagram Stories.',
    highlights: ['Visual routine', 'AM/PM cards', 'Product order', 'Instagram-ready'],
  },
  {
    id: 'recoveryScore',
    icon: Activity,
    needsImage: false,
    color: '#5eead4',
    tagline: 'Recovery Score',
    description: 'Daily recovery score (0-100) combining sleep, hydration, nutrition, stress, and exercise data. Tells you to push hard or rest.',
    highlights: ['Daily score', 'Multi-factor', 'Push or rest', 'Trend tracking'],
  },
  {
    id: 'pregnancyWellness',
    icon: Baby,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Pregnancy Guide',
    description: 'Trimester-specific nutrition, skincare (pregnancy-safe products), exercise, and symptom guidance. Halal & culturally adapted.',
    highlights: ['Trimester-specific', 'Pregnancy-safe', 'Halal adapted', 'Symptom guide'],
  },

];
const FEATURE_MAP = Object.fromEntries(FEATURES.map((f) => [f.id, f]));

/* Category mapping so the filter pills actually work */
const FEATURE_CATEGORY_MAP = {
  skinIntelligence: 'skin',
  ingredientIntelligence: 'skin',
  glowJournal: 'skin',
  treatmentRoutine: 'skin',
  progressStreaks: 'skin',
  wellnessToolkit: 'skin',
  mealPhoto: 'nutrition',
  supplement: 'nutrition',
  sleep: 'sleep',
  fitness: 'fitness',
  hydration: 'nutrition',
  symptom: 'skin',
  hair: 'skin',
  sun: 'skin',
  freeChat: 'skin',
  voiceOutput: 'skin',
  medicalImage: 'skin',
  healthRisk: 'skin',
  glowScore: 'skin',
  glowRitualFinder: 'skin',
  weatherGlow: 'skin',
  culturalAdapt: 'skin',
  beforeAfter: 'skin',
  multilingualVoice: 'skin',
  labReport: 'skin',
  voiceConversation: 'skin',
  liveIngredientResearch: 'skin',
  multiAngleVideo: 'skin',
  refillReminder: 'nutrition',
  moodJournal: 'sleep',
  aiDietChart: 'nutrition',
  workoutVisualizer: 'fitness',
  drugInteractionChecker: 'skin',
  liveVoiceTranslator: 'skin',
  geneticReportReader: 'skin',
  hormoneCycleWellness: 'skin',
  yogaPostureCorrector: 'fitness',
  aiRecipeGenerator: 'nutrition',
  sleepStoryGenerator: 'sleep',
  hydrationGamification: 'nutrition',
  aiMakeupMatch: 'skin',
  wellnessReportPdf: 'skin',
  fastingRamadanTracker: 'nutrition',
  mentalWellnessCompanion: 'sleep',
  allergyDetective: 'nutrition',
  moodMusicRecommender: 'skin',
  skincareRoutineCard: 'skin',
  recoveryScore: 'fitness',
  pregnancyWellness: 'skin',
  apiHub: 'hub',
};

/* ══════════════════════════════════════════════════════════════
   SUGGESTED PROMPTS — Pre-written, one-tap engagement per feature
   ══════════════════════════════════════════════════════════════ */

const SUGGESTED_PROMPTS = {
  skinIntelligence: [
    'Analyze my skin for acne',
    'Check for dark spots',
    'Predict my skin age',
    'Is this redness serious?',
  ],
  ingredientIntelligence: [
    'Decode this product label',
    'Check for harmful chemicals',
    'Verify halal status',
    'Find ingredient conflicts',
  ],
  glowJournal: [
    'Log my mood today',
    'Track my skin patterns',
    'Find my breakout triggers',
    'Suggest coping strategies',
  ],
  treatmentRoutine: [
    'Build my AM/PM routine',
    'Treat my acne',
    'Reduce dark spots',
    'Create anti-aging plan',
  ],
  progressStreaks: [
    'Compare my before/after',
    'Track my glow streak',
    'Show my achievements',
    'Analyze my progress',
  ],
  wellnessToolkit: [
    'Show my monthly calendar',
    'Generate PDF report',
    'Search my past chats',
    'Quick actions',
  ],
  mealPhoto: [
    'Analyze this meal',
    'Check macros',
    'Rate skin nutrients',
    'Suggest healthier option',
  ],
  supplement: [
    'Build my supplement stack',
    'Improve hair growth',
    'Boost my energy',
    'Check interactions',
  ],
  sleep: [
    'Analyze my sleep',
    'Fix my circadian rhythm',
    'Create bedtime routine',
    'Link sleep to skin',
  ],
  fitness: [
    'Protect my skin during workouts',
    'Prevent sweat acne',
    'Post-workout skincare',
    'Hydration for exercise',
  ],
  hydration: [
    'Track my water intake',
    'Improve skin elasticity',
    'Build drinking schedule',
    'Check dehydration signs',
  ],
  symptom: [
    'Check my symptoms',
    'Is this an emergency?',
    'Find possible causes',
    'When to see a doctor',
  ],
  hair: [
    'Analyze my scalp',
    'Check hair loss pattern',
    'Treat dandruff',
    'Boost hair growth',
  ],
  sun: [
    'Check UV protection',
    'Recommend SPF',
    'After-sun care',
    'Protect my skin tone',
  ],
  freeChat: [
    'How can I glow today?',
    'Recommend a NOORISH GOLD ritual',
    'What should I eat for glowing skin?',
    'Help me sleep better',
  ],
  voiceOutput: [
    'Speak my wellness advice',
    'Read my routine aloud',
    'Voice my nutrition tips',
  ],
  medicalImage: [
    'Analyze this medical image',
    'Identify this skin lesion',
    'Assess severity',
  ],
  healthRisk: [
    'Assess my health risks',
    'Check my lifestyle factors',
    'Prevent future issues',
  ],
  glowScore: [
    'Calculate my glow score',
    'Show my trend',
    'Break down my factors',
    'How to improve?',
  ],
  glowRitualFinder: [
    'Find my perfect ritual',
    'Match my taste profile',
    'Discover NOORISH GOLD pairing',
  ],
  weatherGlow: [
    'Check today\'s UV index',
    'Protect from pollution',
    'Humidity skincare advice',
  ],
  culturalAdapt: [
    'Ramadan skincare guidance',
    'Monsoon humidity tips',
    'Wedding season glow',
    'Winter dryness care',
  ],
  beforeAfter: [
    'Compare my progress photos',
    'Generate improvement chart',
    'Create shareable card',
  ],
  multilingualVoice: [
    'Speak in Urdu',
    'Speak in Arabic',
    'Speak in English',
  ],
  labReport: [
    'Analyze my blood test',
    'Explain my lab values',
    'Correlate with skin health',
  ],
  voiceConversation: [
    'Start voice chat',
    'Speak in Urdu',
    'Hands-free guidance',
  ],
  liveIngredientResearch: [
    'Search latest safety studies',
    'Check product recalls',
    'Verify ingredient research',
  ],
  multiAngleVideo: [
    'Analyze my video',
    'Multi-angle skin assessment',
    'Check lighting conditions',
  ],
  refillReminder: [
    'Track my NOORISH GOLD usage',
    'Set smart refill reminder',
    'Reorder my ritual',
  ],
  moodJournal: [
    'Log my mood',
    'Analyze my emotions',
    'Find my triggers',
    'Gratitude prompt',
  ],
  aiDietChart: [
    'Create my diet chart',
    'Personalize my macros',
    'Pakistani meal plan',
  ],
  workoutVisualizer: [
    'Create workout plan',
    'Show exercise diagrams',
    'Share to Instagram',
  ],
  drugInteractionChecker: [
    'Check my medications',
    'Supplement interactions',
    'Safety alerts',
  ],
  liveVoiceTranslator: [
    'Translate Urdu to English',
    'Translate English to Urdu',
    'Live voice translation',
  ],
  geneticReportReader: [
    'Analyze my genetic report',
    'Check predispositions',
    'Personalized wellness plan',
  ],
  hormoneCycleWellness: [
    'Track my cycle',
    'Phase-based skincare',
    'Nutrition timing',
  ],
  yogaPostureCorrector: [
    'Analyze my yoga pose',
    'Correct my posture',
    'Alignment feedback',
  ],
  aiRecipeGenerator: [
    'Generate healthy recipe',
    'Pakistani cuisine',
    'Allergy-aware recipe',
  ],
  sleepStoryGenerator: [
    'Tell me a bedtime story',
    'Urdu poetry sleep story',
    'Calming ambient sounds',
  ],
  hydrationGamification: [
    'Start hydration challenge',
    'Show my badges',
    'Daily water game',
  ],
  aiMakeupMatch: [
    'Match my foundation shade',
    'Find lipstick color',
    'Analyze my skin tone',
  ],
  wellnessReportPdf: [
    'Generate monthly report',
    'Show my trends',
    'Product suggestions',
  ],
  fastingRamadanTracker: [
    'Track my fast',
    'Ramadan hydration',
    'Skincare while fasting',
  ],
  mentalWellnessCompanion: [
    'Track my mood',
    'CBT exercise',
    'Breathing technique',
    'Crisis resources',
  ],
  allergyDetective: [
    'Check my allergies',
    'Scan product ingredients',
    'Real-time alerts',
  ],
  moodMusicRecommender: [
    'Recommend music for my mood',
    'Match my energy',
    'Time-aware playlist',
  ],
  skincareRoutineCard: [
    'Create AM/PM card',
    'Visual routine',
    'Instagram-ready card',
  ],
  recoveryScore: [
    'Calculate recovery score',
    'Should I rest or push?',
    'Show my trend',
  ],
  pregnancyWellness: [
    'Trimester nutrition',
    'Pregnancy-safe skincare',
    'Exercise guidance',
  ],
};

/* ══════════════════════════════════════════════════════════════
   CONTEXT FORM CONFIGS — Interactive, Pre-filled, Zero Typing
   ══════════════════════════════════════════════════════════════ */

const CONTEXT_CONFIGS = {
  freeChat: {
    intro: 'Ask me anything about health, beauty, skin, nutrition, or wellness. I am here to help you glow.',
    fields: [],
  },
  voiceOutput: {
    intro: 'I will speak my responses aloud. Tell me what you need.',
    fields: [],
  },
  onboarding: {
    intro: 'Welcome to Noorix! Let me show you around.',
    fields: [],
  },
  progressPhotos: {
    intro: 'Upload photos to track your skin progress over time.',
    fields: [
      { key: 'timeframe', label: 'When was the first photo taken?', type: 'tags', options: ['1 week ago', '2 weeks ago', '1 month ago', '3 months ago', '6 months ago'] },
      { key: 'concern', label: 'What are you tracking?', type: 'tags', options: ['Acne clearing', 'Dark spots fading', 'Glow improvement', 'Wrinkle reduction', 'Overall health'] },
    ],
  },
  streaks: {
    intro: 'View your glow streaks and achievements.',
    fields: [],
  },
  wellnessCalendar: {
    intro: 'Your monthly wellness overview.',
    fields: [],
  },
  exportReport: {
    intro: 'Generate a PDF wellness report from your data.',
    fields: [
      { key: 'period', label: 'Report period?', type: 'tags', options: ['Last 7 days', 'Last 30 days', 'Last 3 months', 'All time'] },
    ],
  },
  chatSearch: {
    intro: 'Search through your past Noorix conversations.',
    fields: [
      { key: 'query', label: 'What are you looking for?', type: 'tags', options: ['Skin advice', 'Nutrition tips', 'Sleep analysis', 'Product recommendations', 'Supplement stack'] },
    ],
  },
  quickActions: {
    intro: 'Quick actions for common tasks.',
    fields: [],
  },
  moodJournal: {
    intro: 'Log your mood and track patterns over time.',
    fields: [
      { key: 'mood', label: 'How are you feeling?', type: 'tapCards', options: [
        { value: 'amazing', label: 'Amazing', desc: 'On top of the world' },
        { value: 'good', label: 'Good', desc: 'Positive and steady' },
        { value: 'okay', label: 'Okay', desc: 'Neutral day' },
        { value: 'low', label: 'Low', desc: 'Feeling down' },
        { value: 'stressed', label: 'Stressed', desc: 'Overwhelmed' },
      ]},
      { key: 'energy', label: 'Energy level?', type: 'tags', options: ['High energy', 'Normal', 'Low energy', 'Exhausted'] },
      { key: 'gratitude', label: 'One thing you are grateful for?', type: 'tags', options: ['Health', 'Family', 'Work', 'Friends', 'Nature', 'Food', 'Sleep', 'Freedom'] },
    ],
  },
  darkMode: {
    intro: 'Toggle dark mode for the Noorix interface.',
    fields: [],
  },
  medicalImage: {
    intro: 'Upload a medical image for advanced AI analysis.',
    fields: [
      { key: 'bodyPart', label: 'Body part shown?', type: 'tapCards', options: [
        { value: 'face', label: 'Face', desc: 'Forehead, cheeks, chin' },
        { value: 'arm', label: 'Arm', desc: 'Upper or lower arm' },
        { value: 'leg', label: 'Leg', desc: 'Thigh, shin, foot' },
        { value: 'torso', label: 'Torso', desc: 'Chest, back, stomach' },
        { value: 'hand', label: 'Hand', desc: 'Palm, fingers, nails' },
        { value: 'scalp', label: 'Scalp', desc: 'Hair line, crown' },
        { value: 'other', label: 'Other', desc: 'Other body part' },
      ]},
      { key: 'duration', label: 'How long has this been present?', type: 'tags', options: ['Just appeared', 'Few days', '1 week', '2-4 weeks', 'Months', 'Years'] },
      { key: 'pain', label: 'Is it painful?', type: 'tags', options: ['No pain', 'Mild', 'Moderate', 'Severe', 'Itchy', 'Burning'] },
    ],
  },
  skinClassification: {
    intro: 'Upload a skin photo for AI classification.',
    fields: [
      { key: 'area', label: 'Skin area?', type: 'tags', options: ['Face', 'Forehead', 'Cheeks', 'Chin', 'Neck', 'Chest', 'Back', 'Arms', 'Legs'] },
      { key: 'skinType', label: 'Your skin type?', type: 'tapCards', options: [
        { value: 'oily', label: 'Oily', desc: 'Shiny, large pores' },
        { value: 'dry', label: 'Dry', desc: 'Tight, flaky' },
        { value: 'sensitive', label: 'Sensitive', desc: 'Reacts easily' },
        { value: 'combination', label: 'Combination', desc: 'Mixed' },
        { value: 'normal', label: 'Normal', desc: 'Balanced' },
      ]},
    ],
  },
  treatmentPlan: {
    intro: 'I will create a personalized treatment plan for you.',
    fields: [
      { key: 'condition', label: 'What condition?', type: 'tags', options: ['Acne', 'Dark spots', 'Wrinkles', 'Dryness', 'Oiliness', 'Rosacea', 'Eczema', 'Hyperpigmentation', 'Scarring'] },
      { key: 'severity', label: 'How severe?', type: 'tapCards', options: [
        { value: 'mild', label: 'Mild', desc: 'Barely noticeable' },
        { value: 'moderate', label: 'Moderate', desc: 'Clearly visible' },
        { value: 'severe', label: 'Severe', desc: 'Significant impact' },
      ]},
      { key: 'tried', label: 'What have you tried?', type: 'tags', multi: true, options: ['Nothing', 'OTC products', 'Prescription', 'Natural remedies', 'Professional treatment', 'NOORIVA'] },
    ],
  },
  healthRisk: {
    intro: 'Let me assess your health risks based on your lifestyle.',
    fields: [
      { key: 'age', label: 'Your age range?', type: 'tags', options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
      { key: 'familyHistory', label: 'Family history of?', type: 'tags', multi: true, options: ['Diabetes', 'Heart disease', 'Cancer', 'Skin conditions', 'Autoimmune', 'None', 'Unknown'] },
      { key: 'lifestyle', label: 'Lifestyle factors?', type: 'tags', multi: true, options: ['Smoking', 'Alcohol', 'Sedentary', 'Stressed', 'Poor sleep', 'Poor diet', 'Active', 'Healthy diet'] },
    ],
  },
  skinAge: {
    intro: 'Upload a selfie and I will analyze your skin age.',
    fields: [
      { key: 'actualAge', label: 'Your actual age?', type: 'tags', options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] },
      { key: 'concerns', label: 'Main aging concerns?', type: 'tags', multi: true, options: ['Fine lines', 'Wrinkles', 'Sagging', 'Dark spots', 'Dullness', 'Large pores', 'Uneven texture'] },
    ],
  },
  ingredientConflict: {
    intro: 'Upload product labels and I will check for ingredient conflicts.',
    fields: [
      { key: 'products', label: 'How many products to check?', type: 'tags', options: ['2 products', '3 products', '4+ products', 'Full routine'] },
      { key: 'skinType', label: 'Your skin type?', type: 'tapCards', options: [
        { value: 'oily', label: 'Oily', desc: 'Shiny, large pores' },
        { value: 'dry', label: 'Dry', desc: 'Tight, flaky' },
        { value: 'sensitive', label: 'Sensitive', desc: 'Reacts easily' },
        { value: 'combination', label: 'Combination', desc: 'Mixed' },
        { value: 'normal', label: 'Normal', desc: 'Balanced' },
      ]},
    ],
  },

  skinPhoto: {
    intro: 'Tap what you see — I will analyze the rest from your photo.',
    fields: [
      { key: 'issue', label: 'What is the issue?', type: 'tapCards', options: [
        { value: 'acne', label: 'Acne', desc: 'Pimples, breakouts, cystic' },
        { value: 'darkspots', label: 'Dark Spots', desc: 'Hyperpigmentation, melasma' },
        { value: 'dryness', label: 'Dryness', desc: 'Flaky, tight, cracked skin' },
        { value: 'redness', label: 'Redness', desc: 'Irritation, rosacea, flushing' },
        { value: 'wrinkles', label: 'Fine Lines', desc: 'Aging, loss of elasticity' },
        { value: 'rash', label: 'Rash', desc: 'Unknown bumps, hives' },
        { value: 'other', label: 'Something Else', desc: 'Other concern' },
      ]},
      { key: 'area', label: 'Where on the body?', type: 'tags', options: ['Face', 'Forehead', 'Cheeks', 'Chin', 'Neck', 'Arms', 'Legs', 'Back', 'Chest', 'Hands'] },
      { key: 'duration', label: 'How long have you had this?', type: 'tags', options: ['Just started', 'Few days', '1 week', '2-4 weeks', '1-3 months', 'Months+', 'Years'] },
    ],
  },
  mealPhoto: {
    intro: 'Snap your meal — I will break down every nutrient for your skin.',
    fields: [
      { key: 'mealType', label: 'Which meal is this?', type: 'tapCards', options: [
        { value: 'breakfast', label: 'Breakfast', desc: 'Morning fuel' },
        { value: 'lunch', label: 'Lunch', desc: 'Midday refuel' },
        { value: 'dinner', label: 'Dinner', desc: 'Evening nourishment' },
        { value: 'snack', label: 'Snack', desc: 'Quick bite' },
      ]},
      { key: 'diet', label: 'Any dietary preference?', type: 'tags', options: ['No restrictions', 'Vegetarian', 'Vegan', 'Halal', 'Keto', 'Low-carb', 'Gluten-free'] },
    ],
  },
  supplement: {
    intro: 'Tell me your goals — I will build your perfect supplement stack.',
    fields: [
      { key: 'concerns', label: 'What do you want to improve?', type: 'tapCards', multi: true, options: [
        { value: 'glow', label: 'Glowing Skin', desc: 'Radiance and brightness' },
        { value: 'hair', label: 'Hair Growth', desc: 'Thicker, stronger hair' },
        { value: 'nails', label: 'Stronger Nails', desc: 'Less breakage' },
        { value: 'energy', label: 'Energy', desc: 'Less fatigue' },
        { value: 'immunity', label: 'Immunity', desc: 'Stay healthy' },
        { value: 'antiaging', label: 'Anti-Aging', desc: 'Youthful skin' },
        { value: 'gut', label: 'Gut Health', desc: 'Digestion and bloating' },
        { value: 'sleep', label: 'Better Sleep', desc: 'Rest and recovery' },
      ]},
      { key: 'age', label: 'Your age range?', type: 'tags', options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
      { key: 'current', label: 'Current glow routine?', type: 'tags', options: ['Nothing', 'NOORISH GOLD', 'ROSE HALO', 'SAFFRON MIST', 'MANGO BLAZE', 'BERRY BLOOM', 'COCO GLOW', 'ACAI DEW', 'PEARL SHEEN', 'ALOE TIDE', 'Other'] },
    ],
  },
  sleep: {
    intro: 'Let us fix your sleep — your skin will thank you.',
    fields: [
      { key: 'hours', label: 'Hours of sleep last night?', type: 'counter', min: 0, max: 14, defaultValue: 6 },
      { key: 'quality', label: 'How was your sleep quality?', type: 'tapCards', options: [
        { value: 'terrible', label: 'Terrible', desc: 'Barely slept' },
        { value: 'poor', label: 'Poor', desc: 'Tossed and turned' },
        { value: 'okay', label: 'Okay', desc: 'It was fine' },
        { value: 'good', label: 'Good', desc: 'Slept well' },
        { value: 'great', label: 'Amazing', desc: 'Deep and refreshing' },
      ]},
      { key: 'issues', label: 'Any sleep issues?', type: 'tags', multi: true, options: ['Cannot fall asleep', 'Wake up at night', 'Wake up tired', 'Snoring', 'Anxiety at night', 'Phone before bed', 'Irregular schedule', 'None'] },
    ],
  },
  stress: {
    intro: 'Quick mood check — I will connect it to your skin health.',
    fields: [
      { key: 'mood', label: 'How are you feeling right now?', type: 'tapCards', options: [
        { value: 'great', label: 'Great', desc: 'Feeling wonderful' },
        { value: 'good', label: 'Good', desc: 'Pretty positive' },
        { value: 'okay', label: 'Okay', desc: 'Neutral day' },
        { value: 'low', label: 'Low', desc: 'Feeling down' },
        { value: 'stressed', label: 'Stressed', desc: 'Overwhelmed' },
        { value: 'anxious', label: 'Anxious', desc: 'Worried or nervous' },
      ]},
      { key: 'stressors', label: 'What is stressing you?', type: 'tags', multi: true, options: ['Work', 'Family', 'Health', 'Money', 'Relationships', 'Sleep', 'Deadlines', 'Social media', 'Nothing specific'] },
      { key: 'coping', label: 'How do you usually cope?', type: 'tags', multi: true, options: ['Exercise', 'Meditation', 'Food', 'Netflix', 'Talking to someone', 'Walking', 'Music', 'Nothing yet'] },
    ],
  },
  fitness: {
    intro: 'Tell me your workout — I will protect your skin from exercise damage.',
    fields: [
      { key: 'workout', label: 'What type of workout?', type: 'tapCards', options: [
        { value: 'gym', label: 'Gym', desc: 'Weights and machines' },
        { value: 'running', label: 'Running', desc: 'Cardio and jogging' },
        { value: 'yoga', label: 'Yoga', desc: 'Flexibility and calm' },
        { value: 'cycling', label: 'Cycling', desc: 'Indoor or outdoor' },
        { value: 'swimming', label: 'Swimming', desc: 'Pool or open water' },
        { value: 'sports', label: 'Sports', desc: 'Team or solo' },
        { value: 'walking', label: 'Walking', desc: 'Light movement' },
        { value: 'hiit', label: 'HIIT', desc: 'High intensity intervals' },
      ]},
      { key: 'frequency', label: 'How often do you exercise?', type: 'tags', options: ['Daily', '5x per week', '3-4x per week', '1-2x per week', 'Weekends only', 'Rarely'] },
      { key: 'intensity', label: 'Your typical intensity?', type: 'tags', options: ['Light', 'Moderate', 'Intense', 'Extreme'] },
      { key: 'skinIssue', label: 'Any skin issues from exercise?', type: 'tags', multi: true, options: ['Sweat acne', 'Chafing', 'Dryness', 'Redness', 'Backne', 'Sunburn', 'None'] },
    ],
  },
  product: {
    intro: 'Snap the ingredient label — I will decode it for your skin type.',
    fields: [
      { key: 'skinType', label: 'Your skin type?', type: 'tapCards', options: [
        { value: 'oily', label: 'Oily', desc: 'Shiny, large pores' },
        { value: 'dry', label: 'Dry', desc: 'Tight, flaky' },
        { value: 'sensitive', label: 'Sensitive', desc: 'Reacts easily' },
        { value: 'combination', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
        { value: 'normal', label: 'Normal', desc: 'Balanced' },
      ]},
      { key: 'productType', label: 'What type of product?', type: 'tags', options: ['Cleanser', 'Moisturizer', 'Serum', 'Sunscreen', 'Mask', 'Toner', 'Foundation', 'Other'] },
    ],
  },
  diary: {
    intro: 'Log your skin today — I will spot patterns over time.',
    fields: [
      { key: 'skinToday', label: 'How does your skin look today?', type: 'tapCards', options: [
        { value: 'glowing', label: 'Glowing', desc: 'Looking great' },
        { value: 'clear', label: 'Clear', desc: 'No issues' },
        { value: 'dry', label: 'Dry', desc: 'Needs moisture' },
        { value: 'oily', label: 'Oily', desc: 'Extra shine' },
        { value: 'breakout', label: 'Breakout', desc: 'New pimples' },
        { value: 'dull', label: 'Dull', desc: 'Lacks radiance' },
        { value: 'irritated', label: 'Irritated', desc: 'Red or itchy' },
      ]},
      { key: 'observations', label: 'Notice anything specific?', type: 'tags', multi: true, options: ['New pimples', 'Dry patches', 'Dark circles', 'Redness', 'Smaller pores', 'More glow', 'Fine lines', 'Uneven tone', 'Swelling'] },
      { key: 'lifestyle', label: 'Recent lifestyle factors?', type: 'tags', multi: true, options: ['Ate well', 'Ate junk food', 'Drank enough water', 'Too much coffee', 'Slept well', 'Slept badly', 'Stressed', 'Relaxed', 'Exercised', 'Stayed indoors'] },
    ],
  },
  hydration: {
    intro: 'Track your water — your skin is thirsty for hydration.',
    fields: [
      { key: 'glasses', label: 'Glasses of water today?', type: 'counter', min: 0, max: 20, defaultValue: 4 },
      { key: 'skinHydration', label: 'How does your skin feel?', type: 'tapCards', options: [
        { value: 'plump', label: 'Plump', desc: 'Well hydrated' },
        { value: 'normal', label: 'Normal', desc: 'Balanced' },
        { value: 'tight', label: 'Tight', desc: 'Slightly dry' },
        { value: 'flaky', label: 'Flaky', desc: 'Very dry' },
        { value: 'oily', label: 'Oily', desc: 'Overproducing oil' },
      ]},
      { key: 'symptoms', label: 'Any dehydration signs?', type: 'tags', multi: true, options: ['Dry lips', 'Dark urine', 'Headache', 'Fatigue', 'Dull skin', 'Dry eyes', 'None'] },
    ],
  },
  symptom: {
    intro: 'Point to where it hurts — I will guide you through triage.',
    fields: [
      { key: 'bodyRegion', label: 'Where is the issue?', type: 'tapCards', options: [
        { value: 'head', label: 'Head', desc: 'Headache, scalp issues' },
        { value: 'face', label: 'Face', desc: 'Skin, eyes, nose' },
        { value: 'chest', label: 'Chest', desc: 'Breathing, heart area' },
        { value: 'stomach', label: 'Stomach', desc: 'Digestion, gut pain' },
        { value: 'back', label: 'Back', desc: 'Spine, muscles' },
        { value: 'joints', label: 'Joints', desc: 'Knees, elbows, wrists' },
        { value: 'skin', label: 'Skin', desc: 'Rash, bumps, patches' },
        { value: 'general', label: 'General', desc: 'Full body symptoms' },
      ]},
      { key: 'symptoms', label: 'What do you feel?', type: 'tags', multi: true, options: ['Pain', 'Itching', 'Burning', 'Swelling', 'Numbness', 'Tingling', 'Stiffness', 'Nausea', 'Dizziness', 'Fatigue', 'Fever'] },
      { key: 'duration', label: 'How long has this lasted?', type: 'tags', options: ['Just now', 'Few hours', 'Today', 'Few days', '1 week plus', 'Weeks', 'Months', 'Comes and goes'] },
    ],
  },
  hair: {
    intro: 'Upload a hair photo — I will analyze scalp and strand health.',
    fields: [
      { key: 'concern', label: 'What is your hair concern?', type: 'tapCards', options: [
        { value: 'thinning', label: 'Thinning', desc: 'Less volume and density' },
        { value: 'falling', label: 'Hair Fall', desc: 'Excessive shedding' },
        { value: 'dry', label: 'Dry and Brittle', desc: 'Breaks easily' },
        { value: 'oily', label: 'Oily Scalp', desc: 'Greasy roots' },
        { value: 'dandruff', label: 'Dandruff', desc: 'Flaky, itchy scalp' },
        { value: 'slow', label: 'Slow Growth', desc: 'Hair wont grow' },
        { value: 'damage', label: 'Damage', desc: 'Heat or color damage' },
      ]},
      { key: 'hairType', label: 'Your hair type?', type: 'tags', options: ['Straight', 'Wavy', 'Curly', 'Coily', 'Fine', 'Thick', 'Colored', 'Natural'] },
    ],
  },
  ingredient: {
    intro: 'Snap any ingredient list — I will decode every chemical for you.',
    fields: [
      { key: 'productType', label: 'What kind of product?', type: 'tapCards', options: [
        { value: 'skincare', label: 'Skincare', desc: 'Face and body products' },
        { value: 'haircare', label: 'Haircare', desc: 'Shampoo and conditioner' },
        { value: 'food', label: 'Food or Drink', desc: 'Supplement or consumable' },
        { value: 'makeup', label: 'Makeup', desc: 'Cosmetics and beauty' },
      ]},
      { key: 'priority', label: 'What matters most to you?', type: 'tags', options: ['Safety first', 'Maximum effectiveness', 'Natural only', 'Halal check', 'Allergen check', 'Best value'] },
    ],
  },
  sun: {
    intro: 'Let me protect your skin from UV damage today.',
    fields: [
      { key: 'exposure', label: 'How much sun exposure today?', type: 'tapCards', options: [
        { value: 'none', label: 'Indoors', desc: 'Mostly inside all day' },
        { value: 'little', label: 'Little', desc: 'Quick errands only' },
        { value: 'moderate', label: 'Moderate', desc: 'A few hours outside' },
        { value: 'high', label: 'High', desc: 'Outdoor all day' },
        { value: 'extreme', label: 'Extreme', desc: 'Beach, pool, or mountains' },
      ]},
      { key: 'skinTone', label: 'Your skin tone?', type: 'tapCards', options: [
        { value: 'fair', label: 'Fair', desc: 'Burns very easily' },
        { value: 'light', label: 'Light', desc: 'Burns then tans' },
        { value: 'medium', label: 'Medium', desc: 'Tans well' },
        { value: 'olive', label: 'Olive', desc: 'Rarely burns' },
        { value: 'dark', label: 'Dark', desc: 'Very rarely burns' },
      ]},
      { key: 'activity', label: 'What will you be doing?', type: 'tags', options: ['Working indoors', 'Commuting', 'Walking outside', 'Beach or pool', 'Sports', 'Hiking', 'Driving', 'Farming'] },
    ],
  },
  freeChat: {
    intro: 'Ask me anything about health, beauty, skin, nutrition, or wellness. I am here to help you glow.',
    fields: [],
  },
  routine: {
    intro: 'I will architect your perfect AM and PM skincare ritual.',
    fields: [
      { key: 'skinGoal', label: 'Your number one skin goal?', type: 'tapCards', options: [
        { value: 'glow', label: 'Glow', desc: 'Radiant, luminous skin' },
        { value: 'clear', label: 'Clear Skin', desc: 'No acne or blemishes' },
        { value: 'antiaging', label: 'Anti-Aging', desc: 'Youthful, firm look' },
        { value: 'hydrate', label: 'Hydration', desc: 'Deep moisture boost' },
        { value: 'tone', label: 'Even Tone', desc: 'Fix discoloration' },
        { value: 'protect', label: 'Protection', desc: 'Prevent future damage' },
      ]},
      { key: 'currentRoutine', label: 'What do you currently use?', type: 'tags', multi: true, options: ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Mask', 'Eye cream', 'Nothing at all'] },
      { key: 'timeAvailable', label: 'How much time for skincare?', type: 'tags', options: ['2 minutes', '5 minutes', '10 minutes', '15 plus minutes', 'I have all day'] },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════ */

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildContextSummary(featureId, contextValues) {
  const config = CONTEXT_CONFIGS[featureId];
  if (!config) return '';
  const parts = [];
  for (const field of config.fields) {
    const val = contextValues[field.key];
    if (val !== undefined && val !== null && val !== '') {
      const label = field.label.replace(/[?!]/g, '').trim();
      parts.push(label + ': ' + (Array.isArray(val) ? val.join(', ') : val));
    }
  }
  return parts.join(' | ');
}

function formatAIContent(result) {
  if (!result) return 'No response received.';
  const sections = [];

  if (result.redFlag) {
    sections.push('URGENT: ' + (result.redFlagDetail || 'Seek medical attention immediately.'));
  }
  if (result.message) sections.push(result.message);

  if (result.triage && result.triage.length) {
    sections.push('\nPossible conditions:');
    for (const t of result.triage) {
      var icon = t.likelihood === 'high' ? '🔴' : t.likelihood === 'moderate' ? '🟡' : '🟢';
      sections.push(icon + ' **' + t.condition + '** (' + t.likelihood + ') — ' + t.description);
    }
  }
  if (result.macros) {
    var m = result.macros;
    sections.push('\nNutrition: ' + m.calories + ' cal | ' + m.protein + ' protein | ' + m.carbs + ' carbs | ' + m.fat + ' fat');
    if (result.overallSkinScore) sections.push('Skin Score: ' + result.overallSkinScore + '/10 — ' + result.overallSkinScoreLabel);
  }
  if (result.stack && result.stack.length) {
    sections.push('\nRecommended Stack:');
    for (var si = 0; si < result.stack.length; si++) {
      var s = result.stack[si];
      sections.push('• **' + s.name + '** ' + s.dosage + ' (' + s.timing + ') — ' + s.why + ' [' + s.priority + ']');
    }
  }
  if (result.circadianFixes && result.circadianFixes.length) {
    sections.push('\nCircadian Fixes:');
    for (var ci = 0; ci < result.circadianFixes.length; ci++) {
      var cf = result.circadianFixes[ci];
      sections.push('• ' + cf.fix + ' (' + cf.when + ') — ' + cf.why);
    }
  }
  if (result.copingStrategies && result.copingStrategies.length) {
    sections.push('\nCoping Strategies:');
    for (var csi = 0; csi < result.copingStrategies.length; csi++) {
      var cs = result.copingStrategies[csi];
      sections.push('• ' + cs.strategy + ' (' + cs.type + ', ' + cs.duration + ')');
    }
  }
  if (result.skinImpacts && result.skinImpacts.length) {
    sections.push('\nSkin Impacts:');
    for (var sii = 0; sii < result.skinImpacts.length; sii++) {
      var si2 = result.skinImpacts[sii];
      sections.push('• ' + si2.impact + ' — ' + si2.prevention);
    }
  }
  if (result.ingredients && result.ingredients.length) {
    sections.push('\nIngredients:');
    for (var ii = 0; ii < result.ingredients.length; ii++) {
      var ing = result.ingredients[ii];
      var r = ing.rating === 'beneficial' ? '✅' : ing.rating === 'caution' ? '⚠️' : ing.rating === 'avoid' ? '❌' : '➖';
      sections.push(r + ' **' + ing.name + '** — ' + ing.role + ' (' + ing.notes + ')');
    }
    if (result.overallRating) sections.push('\nOverall: ' + result.overallRating + '/10 — ' + result.overallLabel);
  }
  if (result.patterns && result.patterns.length) {
    sections.push('\nPatterns Found:');
    for (var pi = 0; pi < result.patterns.length; pi++) {
      var p = result.patterns[pi];
      sections.push('• ' + p.pattern + ' (' + p.confidence + ') — triggers: ' + (p.triggers ? p.triggers.join(', ') : ''));
    }
  }
  if (result.intakeAnalysis) {
    var a = result.intakeAnalysis;
    sections.push('\nIntake: ' + a.current + ' | Recommended: ' + a.recommended + ' | Deficit: ' + a.deficit);
  }
  if (result.possibleCauses && result.possibleCauses.length) {
    sections.push('\nPossible Causes:');
    for (var pci = 0; pci < result.possibleCauses.length; pci++) {
      var pc = result.possibleCauses[pci];
      var pci2 = pc.likelihood === 'high' ? '🔴' : pc.likelihood === 'moderate' ? '🟡' : '🟢';
      sections.push(pci2 + ' **' + pc.cause + '** (' + pc.likelihood + ') — ' + pc.description);
    }
  }

  var coachingLists = [
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'suggestions', label: 'Suggestions' },
    { key: 'selfCare', label: 'Self Care' },
    { key: 'preWorkoutSkin', label: 'Pre-Workout Skincare' },
    { key: 'postWorkoutSkin', label: 'Post-Workout Skincare' },
    { key: 'tips', label: 'Tips' },
    { key: 'recommendations', label: 'Recommendations' },
    { key: 'morningRoutine', label: 'Morning Routine' },
    { key: 'eveningRoutine', label: 'Evening Routine' },
  ];
  for (var cli = 0; cli < coachingLists.length; cli++) {
    var cl = coachingLists[cli];
    if (result[cl.key] && result[cl.key].length) {
      sections.push('\n' + cl.label + ':');
      for (var clj = 0; clj < result[cl.key].length; clj++) {
        sections.push('• ' + result[cl.key][clj]);
      }
    }
  }

  var singleFields = [
    { key: 'skinImpact', label: 'Skin Impact' },
    { key: 'skinCorrelation', label: 'Skin Correlation' },
    { key: 'hydrationAdvice', label: 'Hydration Advice' },
    { key: 'bedtimeRoutine', label: 'Bedtime Routine' },
    { key: 'noorivaTip', label: 'Nooriva Tip' },
    { key: 'verdict', label: 'Verdict' },
    { key: 'whenToSeeDoctor', label: 'When to See a Doctor' },
    { key: 'nextCheckIn', label: 'Next Check-in' },
    { key: 'sunscreenAdvice', label: 'Sunscreen Advice' },
    { key: 'uvIndex', label: 'UV Level' },
  ];
  for (var sfi = 0; sfi < singleFields.length; sfi++) {
    var sf = singleFields[sfi];
    var val = result[sf.key];
    if (val && typeof val === 'string') {
      sections.push('\n' + sf.label + ': ' + val);
    } else if (val && typeof val === 'object') {
      sections.push('\n' + sf.label + ': ' + (val.flavor ? val.flavor + ' — ' + val.reason : JSON.stringify(val)));
    }
  }

  if (result.whenToSeeDoctor && typeof result.whenToSeeDoctor === 'object') {
    var d = result.whenToSeeDoctor;
    sections.push('\nDoctor: ' + (d.urgency ? d.urgency.replace('_', ' ') : '') + ' — ' + d.reason + (d.specialist ? ' (' + d.specialist + ')' : ''));
  }
  if (result.interactions && result.interactions.length) {
    sections.push('\nInteractions:');
    for (var iwi = 0; iwi < result.interactions.length; iwi++) {
      sections.push('• ' + result.interactions[iwi]);
    }
  }
  if (result.disclaimer) sections.push('\n' + result.disclaimer);

  return sections.join('\n');
}

function renderMarkdown(text) {
  if (!text) return null;
  var lines = text.split('\n');
  var elements = [];
  var listItems = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={'list-' + elements.length} className="mt-1 space-y-1 pl-1">
          {listItems?.map(function(item, i) {
            return (
              <li key={i} className="text-sm text-noorix-text flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            );
          })}
        </ul>
      );
      listItems = [];
    }
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) { flushList(); continue; }
    if (line.indexOf('• ') === 0 || line.indexOf('- ') === 0) {
      listItems.push(line.slice(2));
      continue;
    }
    flushList();
    if (line.indexOf('URGENT') === 0 || line.indexOf('🔴') === 0) {
      elements.push(
        <div key={i} className="mt-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-700">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </div>
      );
    } else {
      elements.push(
        <p key={i} className="text-sm text-noorix-text leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  flushList();
  return elements;
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-noorix-text">$1</strong>')
    .replace(/_(.+?)_/g, '<em class="text-noorix-muted">$1</em>');
}

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE FORM COMPONENTS — Zero Typing Required
   ══════════════════════════════════════════════════════════════ */

function TapCardsField({ field, value, onChange, accent = '#ff8fb2' }) {
  const isMulti = field.multi;
  const selected = isMulti ? (value || []) : [value].filter(Boolean);

  function toggle(val) {
    if (isMulti) {
      const next = selected.includes(val)
        ? selected.filter((v) => v !== val)
        : selected.concat([val]);
      onChange(next);
    } else {
      onChange(selected[0] === val ? '' : val);
    }
  }

  return (
    <div>
      <label className="noorix-field-label">{field.label}</label>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {field.options?.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggle(opt.value)}
              style={isSelected ? { '--field-accent': accent } : undefined}
              className={`noorix-tap-card ${isSelected ? 'is-selected' : ''}`}
            >
              <span className="noorix-tap-radio">
                {isSelected ? <Check size={10} strokeWidth={3} /> : null}
              </span>
              <span className="noorix-tap-label">{opt.label}</span>
              {opt.desc && <span className="noorix-tap-desc">{opt.desc}</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function TagsField({ field, value, onChange, accent = '#ff8fb2' }) {
  const isMulti = field.multi;
  const selected = isMulti ? (value || []) : [value].filter(Boolean);

  function toggle(val) {
    if (isMulti) {
      const next = selected.includes(val)
        ? selected.filter((v) => v !== val)
        : selected.concat([val]);
      onChange(next);
    } else {
      onChange(selected[0] === val ? '' : val);
    }
  }

  return (
    <div>
      <label className="noorix-field-label">{field.label}</label>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              style={isSelected ? { '--tag-accent': accent } : undefined}
              className={`noorix-tag ${isSelected ? 'is-selected' : ''}`}
            >
              {isSelected && <Check size={11} strokeWidth={3} />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CounterField({ field, value, onChange }) {
  const current = value != null ? value : field.defaultValue || 0;

  return (
    <div>
      <label className="noorix-field-label">{field.label}</label>
      <div className="noorix-counter-shell">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.max(field.min || 0, current - 1))}
          className="noorix-counter-btn"
          aria-label="Decrease"
        >
          −
        </motion.button>

        <div className="noorix-counter-value">
          <span>{current}</span>
          {field.unit ? <small>{field.unit}</small> : null}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.min(field.max || 20, current + 1))}
          className="noorix-counter-btn"
          aria-label="Increase"
        >
          +
        </motion.button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN NOORIX CHAT COMPONENT
   ══════════════════════════════════════════════════════════════ */

export default function NoorixChat() {
  const { data: session } = useSession();
  var t = useT();
  var noorixOpen = useStore(function(s) { return s.noorixOpen; });
  var setNoorixOpen = useStore(function(s) { return s.setNoorixOpen; });
  const [filter, setFilter] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(function() {
    useStore.setState({ noorixOpen: true });
  }, []);

  var noorixFeature = useStore(function(s) { return s.noorixFeature; });
  var noorixMessages = useStore(function(s) { return s.noorixMessages; });
  var toggleNoorix = useStore(function(s) { return s.toggleNoorix; });
  var closeNoorix = useStore(function(s) { return s.closeNoorix; });
  var handleCloseNoorix = function() {
    closeNoorix();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  var setNoorixFeature = useStore(function(s) { return s.setNoorixFeature; });
  var backNoorix = useStore(function(s) { return s.backNoorix; });
  var addNoorixMessage = useStore(function(s) { return s.addNoorixMessage; });
  var addToCart = useStore(function(s) { return s.addToCart; });

  var inputState = useState('');
  var input = inputState[0];
  var setInput = inputState[1];

  var imageState = useState(null);
  var image = imageState[0];
  var setImage = imageState[1];

  var sendingState = useState(false);
  var sending = sendingState[0];
  var setSending = sendingState[1];

  var contextState = useState({});
  var contextValues = contextState[0];
  var setContextValues = contextState[1];

  var showContextState = useState(true);
  var showContext = showContextState[0];
  var setShowContext = showContextState[1];

  var plansOpenState = useState(false);
  var plansOpen = plansOpenState[0];
  var setPlansOpen = plansOpenState[1];

  var blockedState = useState(null);
  var blocked = blockedState[0];
  var setBlocked = blockedState[1];

  var noorixPlan = useStore(function(s) { return s.noorixPlan; });
  var noorixDailyUsed = useStore(function(s) { return s.noorixDailyUsed; });
  var noorixDailyDate = useStore(function(s) { return s.noorixDailyDate; });
  var useNoorixCredit = useStore(function(s) { return s.useNoorixCredit; });
  var glowScore = useStore(function(s) { return s.glowScore; });
  var ritualStreak = useStore(function(s) { return s.ritualStreak; });

  var voiceState = useState(false);
  var isListening = voiceState[0];
  var setIsListening = voiceState[1];

  var trialState = useState(function() {
    if (typeof window === 'undefined') return null;
    var stored = localStorage.getItem('noorix-trial');
    if (stored) return JSON.parse(stored);
    var trial = { start: Date.now(), end: Date.now() + 7 * 24 * 60 * 60 * 1000, plan: 'pro' };
    localStorage.setItem('noorix-trial', JSON.stringify(trial));
    return trial;
  });
  var trial = trialState[0];

  useEffect(function() {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const featureId = params.get('feature');
    if (featureId && FEATURE_MAP[featureId] && !noorixFeature) {
      setNoorixFeature(featureId);
      useStore.setState({ noorixOpen: true });
    }
  }, [noorixFeature, setNoorixFeature]);

  var messagesEndRef = useRef(null);
  var inputRef = useRef(null);
  var fileRef = useRef(null);

  var feature = noorixFeature ? FEATURE_MAP[noorixFeature] : null;
  var messages = noorixFeature ? (noorixMessages[noorixFeature] || []) : [];
  var contextConfig = noorixFeature ? (CONTEXT_CONFIGS[noorixFeature] || { intro: feature?.description || "Describe what you need help with.", fields: [{ key: "query", label: "What do you need?", type: "tags", options: feature?.highlights || ["General advice"] }] }) : null;
  var suggestedPrompts = noorixFeature ? (SUGGESTED_PROMPTS[noorixFeature] || ((feature?.highlights || []).map(function(h){return "Help me with " + h.toLowerCase();}))) : [];

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, sending]);

  useEffect(function() {
    if (noorixFeature && inputRef.current && !showContext) {
      inputRef.current.focus();
    }
  }, [noorixFeature, showContext]);

  useEffect(function() {
    setInput('');
    setImage(null);
    setContextValues({});
    setShowContext(true);
    setSending(false);
  }, [noorixFeature]);

  var openChat = useCallback(function(featureId) {
    setBlocked(null);
    setNoorixFeature(featureId);
  }, [setNoorixFeature]);

  var sendMessage = useCallback(function(customText) {
    if (sending || !noorixFeature || !feature) return;
    var messageText = (customText || input.trim());
    var hasImage = !!image;
    var hasContext = Object.keys(contextValues).length > 0;
    if (!messageText && !hasImage && !hasContext) return;

    var summary = buildContextSummary(noorixFeature, contextValues);
    var finalText = messageText || summary || ('Analyze my ' + t('noorix.feature.' + noorixFeature).toLowerCase());

    var userMsg = { role: 'user', content: finalText, image: image ? image.preview : null, timestamp: Date.now() };
    addNoorixMessage(noorixFeature, userMsg);
    setInput('');
    setImage(null);
    setContextValues({});
    setShowContext(false);
    setSending(true);
    useNoorixCredit();

    var allMessages = messages.concat([userMsg]).map(function(m) {
      return { role: m.role, content: m.content, image: m.image || undefined };
    });
    var data = {};
    var contextKeys = Object.keys(contextValues);
    for (var ci = 0; ci < contextKeys.length; ci++) {
      var k = contextKeys[ci];
      var v = contextValues[k];
      if (v !== undefined && v !== null && v !== '') {
        data[k] = Array.isArray(v) ? v.join(', ') : v;
      }
    }

    var apiEndpoint = noorixFeature === 'freeChat' ? '/api/noorix/freechat' : '/api/noorix/chat';
    var requestBody = noorixFeature === 'freeChat'
      ? JSON.stringify({ messages: allMessages })
      : JSON.stringify({ type: noorixFeature, messages: allMessages, data: data });

    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    })
    .then(function(response) {
      return response.text().then(function(text) {
        if (!text || text.trim() === '') {
          throw new Error('Server returned empty response. Check that API keys are set in .env.local');
        }
        var json;
        try { json = JSON.parse(text); } catch(e) {
          throw new Error('Server returned invalid response. Check API keys in .env.local');
        }
        if (!response.ok) throw new Error(json.error || 'Request failed (' + response.status + ')');
        return json;
      });
    })
    .then(function(json) {
      var content = noorixFeature === 'freeChat' ? json.message : formatAIContent(json.result);
      addNoorixMessage(noorixFeature, {
        role: 'assistant',
        content: content,
        raw: noorixFeature === 'freeChat' ? null : json.result,
        timestamp: Date.now(),
      });
    })
    .catch(function(err) {
      if (process.env.NODE_ENV === 'development') console.error('[Noorix] send error:', err);
      addNoorixMessage(noorixFeature, {
        role: 'assistant',
        content: 'Sorry, something went wrong: ' + err.message + '. Please try again.',
        raw: null,
        timestamp: Date.now(),
      });
    })
    .finally(function() {
      setSending(false);
    });
  }, [sending, noorixFeature, feature, input, image, contextValues, messages, addNoorixMessage, t]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function toggleVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser. Try Chrome.');
      return;
    }
    if (isListening) {
      var existing = window._noorixRecognition;
      if (existing) existing.stop();
      setIsListening(false);
      return;
    }
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
      var transcript = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onend = function() { setIsListening(false); };
    recognition.onerror = function() { setIsListening(false); };
    window._noorixRecognition = recognition;
    recognition.start();
    setIsListening(true);
  }

  function shareResult(msg) {
    var text = 'Noorix AI Analysis:\n\n' + (msg.content || '').slice(0, 500) + '\n\n— Powered by NOORIVA';
    if (navigator.share) {
      navigator.share({ title: 'Noorix Analysis', text: text }).catch(function() {});
    } else {
      var url = 'https://wa.me/?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    }
  }

  function getEffectivePlan() {
    if (noorixPlan !== 'lite') return noorixPlan;
    if (trial && trial.end > Date.now()) return trial.plan;
    return 'lite';
  }

  function handleAction(action) {
    if (action.type === 'addProduct' && action.payload) {
      addToCart(action.payload);
    } else if (action.type === 'openWhatsApp') {
      window.open('https://wa.me/923210550303?text=' + encodeURIComponent('Hi NOORIVA! I need help with...'), '_blank');
    }
  }

  function setContextValue(key, val) {
    setContextValues(function(prev) {
      var next = {};
      var keys = Object.keys(prev);
      for (var i = 0; i < keys.length; i++) { next[keys[i]] = prev[keys[i]]; }
      next[key] = val;
      return next;
    });
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please choose an image under 5MB.');
      event.target.value = '';
      return;
    }

    fileToDataURL(file)
      .then((dataUrl) => {
        setImage({ preview: dataUrl, file });
      })
      .catch(() => {
        alert('Could not read that image. Try another one.');
      });

    event.target.value = '';
  }

  function handleSuggestedPrompt(prompt) {
    sendMessage(prompt);
  }

  return (
    <div
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="fixed inset-0 z-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-cream-50 text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,143,178,0.22) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(167,139,250,0.18) 0%, transparent 45%),
            radial-gradient(circle at 50% 80%, rgba(103,232,249,0.15) 0%, transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(94,234,212,0.12) 0%, transparent 45%)
          `,
          backgroundSize: '180% 180%',
          animation: 'noorixChatAurora 16s ease-in-out infinite alternate',
        }}
      />

      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/70 border border-ink/10 backdrop-blur-xl hover:bg-white transition-all duration-300 group shadow-sm"
      >
        <Home size={16} className="text-ink/60 group-hover:text-ink transition-colors" />
        <span className="text-sm font-semibold text-ink/90 group-hover:text-ink transition-colors">Home</span>
      </Link>

      <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
        <motion.button
          onClick={toggleNoorix}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl overflow-hidden"
          aria-label="Open Noorix"
          style={{ background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)' }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: 'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #ff8fb2)', animation: 'noorix-btn-spin 4s linear infinite' }}
          />
          {noorixOpen
            ? <X size={22} className="relative z-10 text-white" strokeWidth={2.5} />
            : <div className="relative z-10 w-7 h-7 rounded-full" style={{ background: 'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #ff8fb2)', animation: 'noorix-btn-spin 4s linear infinite', boxShadow: '0 0 12px rgba(167,139,250,0.6)' }} />
          }
        </motion.button>
        <style>{`
          @keyframes noorix-btn-spin { to { transform: rotate(360deg); } }
          @keyframes noorix-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          @keyframes quantum-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
          @keyframes quantum-glow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          @keyframes quantum-crack { 0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } 100% { clip-path: polygon(0 0, 45% 0, 50% 50%, 0 100%); } }
        `}</style>
      </div>

      <AnimatePresence>
        {noorixOpen && (
          <motion.div
            key="noorix-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: 'transparent' }}
          >
            <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-ink/10 bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {noorixFeature ? (
                  <button onClick={backNoorix} className="rounded-full bg-noorix-surface p-2 hover:bg-noorix-surface-raised transition-colors">
                    <ArrowLeft size={18} className="text-white" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-white/60" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold display-heading text-ink">
                    {feature ? t('noorix.feature.' + feature.id) : 'Noorix'}
                  </h2>
                  <p className="text-[11px] text-ink/50">
                    {feature ? t('noorix.feature.' + feature.id + 'Desc') : t('noorix.sub')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={function() { setPlansOpen(true); }}
                  className="relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
                  style={{
                    background: noorixPlan === 'lite'
                      ? 'linear-gradient(135deg, #94a3b8, #cbd5e1)'
                      : noorixPlan === 'glow'
                      ? 'linear-gradient(135deg, #ff8fb2, #ffd7a1)'
                      : noorixPlan === 'pro'
                      ? 'linear-gradient(135deg, #a78bfa, #67e8f9)'
                      : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                    color: 'white',
                    boxShadow: noorixPlan === 'lite'
                      ? '0 4px 15px rgba(148,163,184,0.4)'
                      : noorixPlan === 'glow'
                      ? '0 4px 15px rgba(255,143,178,0.4)'
                      : noorixPlan === 'pro'
                      ? '0 4px 15px rgba(167,139,250,0.4)'
                      : '0 4px 15px rgba(245,158,11,0.4)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'noorix-shimmer 2s ease-in-out infinite',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-1.5">
                    {noorixPlan === 'lite' ? '⚡' : noorixPlan === 'glow' ? '✨' : noorixPlan === 'pro' ? '👑' : '💎'}
                    {(() => {
                      var planMap = { lite: 'Free', glow: 'Glow', pro: 'Pro', max: 'Max', elite: 'Elite', premium: 'Premium', ultimate: 'Ultimate', supreme: 'Supreme' };
                      return planMap[getEffectivePlan()] || 'Free';
                    })()}
                    {getEffectivePlan() === 'lite' && (() => {
                      var today = new Date().toDateString();
                      var used = (noorixDailyDate === today) ? noorixDailyUsed : 0;
                      return ' · ' + used + '/5';
                    })()}
                    {getEffectivePlan() === 'glow' && (() => {
                      var today = new Date().toDateString();
                      var used = (noorixDailyDate === today) ? noorixDailyUsed : 0;
                      return ' · ' + used + '/25';
                    })()}
                    {getEffectivePlan() === 'lite' && ' · Upgrade'}
                  </span>
                </button>
                <div className="rounded-full bg-noorix-surface p-0.5 backdrop-blur-md"><LanguageToggle /></div>
                <button onClick={handleCloseNoorix} className="rounded-full bg-noorix-surface p-2.5 hover:bg-noorix-surface-raised transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {!noorixFeature ? (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full overflow-y-auto no-scrollbar"
                  >
                    <div className="noorix-landing-root mx-auto max-w-6xl px-4 sm:px-6 py-6 md:py-10 relative">
                      <div className="noorix-aurora" aria-hidden="true" />
                      <div className="noorix-aurora noorix-aurora--alt" aria-hidden="true" />

                      <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="noorix-hero"
                      >
                        <div className="noorix-hero-badge">
                          <Sparkles size={13} />
                          <span>NOORIX · PERSONAL GLOW INTELLIGENCE</span>
                        </div>

                        <motion.div
                          initial={{ scale: 0.75, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="noorix-orb-hero"
                        >
                          <NoorixOrb size={58} />
                        </motion.div>

                        <motion.h3
                          suppressHydrationWarning
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                          className="noorix-greeting display-heading"
                        >
                          {(() => {
                            const hour = new Date().getHours();
                            const userName = session?.user?.name || session?.user?.email || 'Glow Seeker';
                            const firstName = userName.split(' ')[0];

                            if (hour >= 5 && hour < 12) {
                              return `Good morning, ${firstName}. Let's start your day with a glow check.`;
                            }
                            if (hour >= 12 && hour < 17) {
                              return `Good afternoon, ${firstName}. Ready for your afternoon glow?`;
                            }
                            if (hour >= 17 && hour < 21) {
                              return `Good evening, ${firstName}. Let's wind down and optimize your recovery.`;
                            }
                            return `Burning the midnight oil, ${firstName}? Let me help you prepare for rest.`;
                          })()}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.42 }}
                          className="noorix-hero-sub"
                        >
                          Choose a feature below to begin your personalized experience. Tap, snap, or select — no typing required.
                        </motion.p>

                        {/* Quick action prompts on landing */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6 flex flex-wrap justify-center gap-2"
                        >
                          {['Analyze my skin', 'Plan my diet', 'Recommend a ritual', 'Check my glow score'].map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => {
                                openChat('freeChat');
                                setTimeout(() => sendMessage(prompt), 100);
                              }}
                              className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-xs font-semibold text-ink/80 backdrop-blur-md transition-all hover:bg-white hover:border-ink/20 hover:scale-105"
                            >
                              {prompt}
                            </button>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.56 }}
                          className="noorix-stats"
                        >
                          {[
                            { num: String(FEATURES.length), label: 'AI Features', color: '#ff8fb2' },
                            { num: '24/7', label: 'Always Available', color: '#a78bfa' },
                            { num: '100%', label: 'Privacy First', color: '#67e8f9' },
                            { num: '0', label: 'Data Stored', color: '#5eead4' },
                          ].map((stat, i) => (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.64 + i * 0.08 }}
                              className="noorix-stat-card"
                            >
                              <span className="noorix-stat-num" style={{ color: stat.color }}>
                                {stat.num}
                              </span>
                              <span className="noorix-stat-label">{stat.label}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.78 }}
                          className="noorix-steps"
                        >
                          {[
                            { icon: '🌸', title: 'Snap', desc: 'Upload a photo of skin, meal, or product' },
                            { icon: '🔮', title: 'Analyze', desc: 'AI processes and identifies patterns' },
                            { icon: '💫', title: 'Glow', desc: 'Get personalized recommendations' },
                          ].map((step, i) => (
                            <div key={step.title} className="noorix-step">
                              <div className="noorix-step-icon">{step.icon}</div>
                              <div>
                                <p className="noorix-step-title">{step.title}</p>
                                <p className="noorix-step-desc">{step.desc}</p>
                              </div>
                              {i < 2 && <span className="noorix-step-arrow">→</span>}
                            </div>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.92 }}
                          className="noorix-metrics"
                        >
                          <div className="noorix-metric-card">
                            <div className="noorix-metric-icon">✨</div>
                            <div>
                              <p className="noorix-metric-label">Your Glow Score</p>
                              <p className="noorix-metric-value holo-text">{glowScore}</p>
                            </div>
                          </div>

                          <div className="noorix-metric-card">
                            <div className="noorix-metric-icon">🔥</div>
                            <div>
                              <p className="noorix-metric-label">Ritual Streak</p>
                              <p className="noorix-metric-value">{ritualStreak} days</p>
                            </div>
                          </div>

                          {noorixPlan === 'lite' && trial && trial.end > Date.now() && (
                            <div className="noorix-metric-card noorix-trial-card">
                              <div className="noorix-metric-icon">🎁</div>
                              <div>
                                <p className="noorix-metric-label">Free Pro Trial</p>
                                <p className="noorix-metric-value">
                                  {Math.ceil((trial.end - Date.now()) / (1000 * 60 * 60 * 24))} days left
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>

                      <div className="noorix-filter-shell">
                        {['all', 'skin', 'nutrition', 'fitness', 'sleep', 'hub'].map((category) => {
                          const active = filter === category;
                          const count =
                            category === 'all'
                              ? FEATURES.length
                              : FEATURES.filter((f) => (FEATURE_CATEGORY_MAP[f.id] || 'skin') === category).length;

                          return (
                            <motion.button
                              key={category}
                              type="button"
                              whileTap={{ scale: 0.94 }}
                              onClick={() => setFilter(category)}
                              className={`noorix-filter-pill ${active ? 'is-active' : ''}`}
                              style={active ? { '--pill-accent': '#ff8fb2' } : undefined}
                            >
                              <span>{category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}</span>
                              <span className="noorix-filter-count">{count}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="noorix-grid">
                        {FEATURES.map((f, i) => {
                          const category = FEATURE_CATEGORY_MAP[f.id] || 'skin';
                          if (filter !== 'all' && category !== filter) return null;

                          return (
                            <NoorixFeatureCard
                              key={f.id}
                              feature={f}
                              index={i}
                              title={t('noorix.feature.' + f.id)}
                              onClick={() => (f.id === 'apiHub' ? (window.location.href = '/api-hub') : openChat(f.id))}
                            />
                          );
                        })}
                      </div>

                      {noorixPlan === 'lite' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="noorix-upgrade-banner noorix-upgrade-banner--glow"
                          onClick={() => setPlansOpen(true)}
                        >
                          <div className="noorix-upgrade-copy">
                            <h4>Unlock All {FEATURES.length} Features</h4>
                            <p>Upgrade to Noorix Glow for unlimited AI-powered wellness</p>
                          </div>
                          <div className="noorix-upgrade-cta">
                            From Rs4,999/mo
                            <span>→</span>
                          </div>
                        </motion.div>
                      )}

                      {noorixPlan === 'glow' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="noorix-upgrade-banner noorix-upgrade-banner--pro"
                          onClick={() => setPlansOpen(true)}
                        >
                          <div className="noorix-upgrade-copy">
                            <h4>Go Pro — Unlimited Everything</h4>
                            <p>Remove daily limits, get priority speed and wellness reports</p>
                          </div>
                          <div className="noorix-upgrade-cta">
                            Rs7,999/mo
                            <span>→</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={'chat-' + noorixFeature}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col relative"
                  >
                    <button
  onClick={backNoorix}
  className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-ink shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-105"
>
  <ArrowLeft size={16} />
  Back to Features
</button>
<div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(167,139,250,0.03) 0%, transparent 30%, rgba(255,143,178,0.02) 100%)' }} />

                    {showContext && messages.length === 0 && contextConfig && contextConfig.fields && contextConfig.fields.length > 0 && (
                      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
                        <div className="mx-auto max-w-xl space-y-5">
                          <div className="flex items-center gap-3 mb-2">
                            <NoorixOrb size={36} />
                            <div>
                              <p className="text-sm font-medium text-noorix-text">{t('noorix.feature.' + feature.id)}</p>
                              <p className="text-xs text-noorix-muted">{contextConfig.intro}</p>
                            </div>
                          </div>

                          {/* Suggested prompts for this feature */}
                          {suggestedPrompts.length > 0 && (
                            <div>
                              <p className="noorix-field-label">Try one of these</p>
                              <div className="flex flex-wrap gap-2">
                                {suggestedPrompts.slice(0, 4).map((prompt) => (
                                  <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => handleSuggestedPrompt(prompt)}
                                    className="noorix-tag"
                                  >
                                    {prompt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {contextConfig?.fields?.map(function(field) {
                            if (field.type === 'tapCards') {
                              return <TapCardsField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} accent={feature.color} />;
                            }
                            if (field.type === 'tags') {
                              return <TagsField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} accent={feature.color} />;
                            }
                            if (field.type === 'counter') {
                              return <CounterField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} />;
                            }
                            return null;
                          })}

                          {feature.needsImage && (
                            <div>
                              <label className="block text-xs font-medium text-noorix-muted mb-2">Upload photo</label>
                              <button
                                onClick={function() { if (fileRef.current) fileRef.current.click(); }}
                                className="w-full rounded-2xl border-2 border-dashed border-noorix-border p-4 text-center text-sm text-noorix-muted hover:border-white/30 hover:bg-noorix-surface/50 transition-colors"
                              >
                                <Camera size={20} className="mx-auto mb-1 text-noorix-muted" />
                                {image ? 'Photo selected — tap to change' : 'Tap to upload a photo'}
                              </button>
                              {image && (
                                <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden">
                                  <img src={image.preview} alt="Selected photo preview for Noorix AI analysis" className="w-full h-full object-cover" />
                                  <button
                                    onClick={function() { setImage(null); }}
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          <button
                            onClick={() => sendMessage()}
                            disabled={sending}
                            className="w-full rounded-full !py-3 text-sm font-bold text-black disabled:opacity-50 transition-all hover:brightness-110"
                            style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.colorB})` }}
                          >
                            {sending ? t('noorix.thinking') : 'Analyze'}
                          </button>
                        </div>
                      </div>
                    )}

                    {(!showContext || messages.length > 0 || !contextConfig || (contextConfig.fields && contextConfig.fields.length === 0)) && (
                      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
                        <div className="mx-auto max-w-xl space-y-4">
                          {messages.length === 0 && !showContext && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-start gap-3">
                              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                                <NoorixOrb size={36} className="shrink-0 mt-1" />
                              </motion.div>
                              <div className="rounded-2xl border border-noorix-border bg-noorix-surface rounded-tl-md p-4 max-w-[80%]">
                                <p className="text-sm text-noorix-text">
                                  {feature && feature.needsImage
                                    ? 'Upload a photo and I will analyze it. You can also type a question below.'
                                    : 'Tell me more — tap selections below or type your question.'}
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {/* Suggested prompts in chat empty state */}
                          {messages.length === 0 && suggestedPrompts.length > 0 && (
                            <div className="flex flex-wrap gap-2 pl-10">
                              {suggestedPrompts.slice(0, 4).map((prompt) => (
                                <button
                                  key={prompt}
                                  type="button"
                                  onClick={() => handleSuggestedPrompt(prompt)}
                                  className="noorix-tag"
                                >
                                  {prompt}
                                </button>
                              ))}
                            </div>
                          )}

                          {messages?.map((msg, i) => {
                            if (msg.role === 'user') {
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="noorix-msg-row noorix-msg-row--user"
                                >
                                  <div className="noorix-msg-user-wrap">
                                    {msg.image && (
                                      <div className="noorix-msg-image">
                                        <img src={msg.image} alt="Sent to Noorix" />
                                      </div>
                                    )}
                                    {msg.content && <div className="noorix-msg-user">{msg.content}</div>}
                                  </div>
                                </motion.div>
                              );
                            }

                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="noorix-msg-row noorix-msg-row--assistant"
                              >
                                <div className="noorix-msg-assistant-wrap">
                                  <NoorixOrb size={28} className="shrink-0 mt-1" />

                                  <div className="noorix-msg-assistant">
                                    <div className="noorix-msg-body">{renderMarkdown(msg.content)}</div>

                                    {msg.raw?.triage?.length > 0 && (
                                      <div className="noorix-data-card">
                                        <p className="noorix-data-title">Triage Results</p>
                                        {msg.raw.triage.map((t, ti) => {
                                          const icon = t.likelihood === 'high' ? '🔴' : t.likelihood === 'moderate' ? '🟡' : '🟢';
                                          return (
                                            <div key={ti} className="noorix-data-row">
                                              <span>{icon}</span>
                                              <span>
                                                <strong>{t.condition}</strong> ({t.likelihood}) — {t.description}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {msg.raw?.macros && (
                                      <div className="noorix-data-card">
                                        <p className="noorix-data-title">Nutrition</p>
                                        <div className="noorix-macro-grid">
                                          {['calories', 'protein', 'carbs', 'fat'].map((key) => (
                                            <div key={key}>
                                              <p>{msg.raw.macros[key] || '—'}</p>
                                              <span>{key}</span>
                                            </div>
                                          ))}
                                        </div>
                                        {msg.raw.overallSkinScore && (
                                          <div className="noorix-skin-score">
                                            <p>Skin Score</p>
                                            <span className="holo-text">{msg.raw.overallSkinScore}/10</span>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    <div className="noorix-msg-actions">
                                      <button type="button" onClick={() => shareResult(msg)} className="noorix-action-chip">
                                        <Share2 size={11} />
                                        Share
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          window.open(
                                            'mailto:?subject=' +
                                              encodeURIComponent('Noorix Analysis') +
                                              '&body=' +
                                              encodeURIComponent(msg.content || '')
                                          )
                                        }
                                        className="noorix-action-chip"
                                      >
                                        ✉️ Email
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const blob = new Blob([msg.content || ''], { type: 'text/plain' });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement('a');
                                          a.href = url;
                                          a.download = 'noorix-analysis.txt';
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}
                                        className="noorix-action-chip"
                                      >
                                        📥 Download
                                      </button>

                                      {msg.raw?.actions?.map((action, ai) => {
                                        if (action.type === 'addProduct' && action.payload) {
                                          return (
                                            <button
                                              key={ai}
                                              type="button"
                                              onClick={() => addToCart(action.payload)}
                                              className="noorix-action-chip noorix-action-chip--accent"
                                            >
                                              <ShoppingCart size={11} />
                                              {action.label || 'Add to Bag'}
                                            </button>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>

                                    {msg.raw?.disclaimer && (
                                      <p className="noorix-disclaimer">{msg.raw.disclaimer}</p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}

                          {sending && (
                            <div className="flex items-start gap-2.5">
                              <NoorixOrb size={28} className="shrink-0 mt-1" />
                              <div className="rounded-2xl border border-noorix-border bg-noorix-surface rounded-tl-md px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>
                            </div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>
                      </div>
                    )}

                    {(!showContext ||
                      messages.length > 0 ||
                      (contextConfig && contextConfig.fields && contextConfig.fields.length === 0)) && (
                      <div className="noorix-composer">
                        <div className="noorix-composer-inner">
                          {feature && feature.needsImage && (
                            <button
                              type="button"
                              onClick={() => {
                                if (fileRef.current) fileRef.current.click();
                              }}
                              className="noorix-composer-btn"
                              aria-label="Upload image"
                            >
                              <Camera size={18} />
                            </button>
                          )}

                          {image && (
                            <div className="noorix-composer-preview">
                              <img src={image.preview} alt="Selected" />
                              <button type="button" onClick={() => setImage(null)}>
                                ✕
                              </button>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={toggleVoice}
                            className={`noorix-composer-btn ${isListening ? 'is-recording' : ''}`}
                            aria-label={isListening ? 'Stop listening' : 'Voice input'}
                          >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                          </button>

                          <div className="noorix-composer-field">
                            <input
                              ref={inputRef}
                              type="text"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder={isListening ? 'Listening...' : t('noorix.inputPlaceholder')}
                              disabled={sending}
                            />
                            {isListening && <span className="noorix-composer-status">Listening...</span>}
                          </div>

                          <button
                            type="button"
                            onClick={() => sendMessage()}
                            disabled={sending || (!input.trim() && !image)}
                            className="noorix-send-btn"
                            aria-label={t('noorix.send')}
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </div>
                    )}

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {blocked && (
          <motion.div
            key="blocked-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex items-center justify-center p-4"
            style={{ background: 'rgba(250, 247, 242, 0.95)' }}
            onClick={function() { setBlocked(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-[2rem] border border-ink/10 bg-white/90 p-8 max-w-sm w-full text-center shadow-aura"
              onClick={function(e) { e.stopPropagation(); }}
            >
              <div className="text-4xl mb-4">
                {blocked.type === 'limit' ? '⏰' : '🔓'}
              </div>
              <h3 className="text-xl font-bold mb-2 text-ink">
                {blocked.type === 'limit' ? 'Daily Limit Reached' : 'Feature Unlocked'}
              </h3>
              <p className="text-sm text-ink/60 mb-6">
                {blocked.type === 'limit'
                  ? 'You have used all your free analyses for today. Upgrade for more.'
                  : 'All features are available. Enjoy your glow journey.'}
              </p>
              <button
                onClick={function() { setBlocked(null); }}
                className="w-full rounded-full !py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa] hover:brightness-110 transition-all"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Noorix Liquid-Glass Design System */}
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .noorix-landing-root { min-height: 100%; }
        .noorix-aurora { position: absolute; top: 4%; right: 8%; width: 260px; height: 260px; border-radius: 50%; filter: blur(70px); opacity: 0.35; background: radial-gradient(circle, #ff8fb2 0%, transparent 70%); animation: noorix-aurora-drift 14s ease-in-out infinite alternate; pointer-events: none; }
        .noorix-aurora--alt { top: auto; right: auto; bottom: 10%; left: 5%; background: radial-gradient(circle, #a78bfa 0%, transparent 70%); animation-delay: -7s; opacity: 0.28; }

        .noorix-hero { position: relative; max-width: 720px; margin: 0 auto 36px; text-align: center; border-radius: 34px; padding: 28px 22px 26px; background: linear-gradient(165deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.5)); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: 0 30px 80px rgba(26, 20, 16, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); }
        .noorix-hero-badge { display: inline-flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #ff8fb2; background: rgba(255, 143, 178, 0.1); padding: 7px 12px; border-radius: 999px; }
        .noorix-orb-hero { display: flex; justify-content: center; margin: 20px 0 4px; }
        .noorix-greeting { font-size: clamp(24px, 5vw, 34px); line-height: 1.16; letter-spacing: -0.03em; color: #1a1410; margin-top: 14px; }
        .noorix-hero-sub { max-width: 520px; margin: 10px auto 0; font-size: 14px; line-height: 1.6; color: rgba(26, 20, 16, 0.55); }

        .noorix-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 26px; }
        .noorix-stat-card { min-width: 108px; padding: 12px 14px; border-radius: 22px; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(26, 20, 16, 0.07); box-shadow: 0 10px 30px rgba(26, 20, 16, 0.04); }
        .noorix-stat-num { display: block; font-size: 26px; font-weight: 850; letter-spacing: -0.04em; }
        .noorix-stat-label { display: block; margin-top: 2px; font-size: 10px; font-weight: 750; letter-spacing: 0.11em; text-transform: uppercase; color: rgba(26, 20, 16, 0.4); }

        .noorix-steps { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 24px; }
        .noorix-step { display: flex; align-items: center; gap: 10px; }
        .noorix-step-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 14px; font-size: 18px; background: rgba(26, 20, 16, 0.05); }
        .noorix-step-title { font-size: 13px; font-weight: 800; color: #1a1410; }
        .noorix-step-desc { font-size: 11px; color: rgba(26, 20, 16, 0.48); max-width: 150px; }
        .noorix-step-arrow { margin-left: 8px; color: rgba(26, 20, 16, 0.2); font-size: 18px; }

        .noorix-metrics { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 24px; }
        .noorix-metric-card { min-width: 160px; display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 22px; background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(26, 20, 16, 0.07); text-align: left; }
        .noorix-trial-card { border: 1px solid rgba(167, 139, 250, 0.22); background: rgba(167, 139, 250, 0.09); }
        .noorix-metric-icon { font-size: 22px; }
        .noorix-metric-label { font-size: 10px; font-weight: 750; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(26, 20, 16, 0.42); }
        .noorix-metric-value { font-size: 22px; font-weight: 850; letter-spacing: -0.03em; color: #1a1410; }

        .noorix-filter-shell { position: relative; z-index: 5; display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 22px; justify-content: center; }
        .noorix-filter-pill { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 999px; border: 1px solid rgba(26, 20, 16, 0.1); background: rgba(255, 255, 255, 0.58); color: rgba(26, 20, 16, 0.56); font-size: 12px; font-weight: 750; transition: all 0.3s ease; cursor: pointer; }
        .noorix-filter-pill:hover { background: rgba(255, 255, 255, 0.85); color: #1a1410; transform: translateY(-1px); }
        .noorix-filter-pill.is-active { color: #1a1410; background: #ffffff; border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 16px 36px rgba(26, 20, 16, 0.12); }
        .noorix-filter-count { min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: rgba(26, 20, 16, 0.07); font-size: 10px; font-weight: 850; }
        .noorix-filter-pill.is-active .noorix-filter-count { background: var(--pill-accent); color: #1a1410; }

        .noorix-grid { position: relative; z-index: 5; display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 640px) { .noorix-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .noorix-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        .noorix-upgrade-banner { position: relative; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-top: 26px; padding: 20px 22px; border-radius: 26px; overflow: hidden; cursor: pointer; color: #fff; }
        .noorix-upgrade-banner--glow { background: linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9); }
        .noorix-upgrade-banner--pro { background: linear-gradient(135deg, #a78bfa, #67e8f9); }
        .noorix-upgrade-banner h4 { margin: 0 0 4px; font-size: 17px; font-weight: 850; letter-spacing: -0.02em; }
        .noorix-upgrade-banner p { margin: 0; font-size: 12px; opacity: 0.78; }
        .noorix-upgrade-cta { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 850; transition: transform 0.3s ease; }
        .noorix-upgrade-banner:hover .noorix-upgrade-cta { transform: translateX(4px); }

        .noorix-field-label { display: block; margin-bottom: 9px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26, 20, 16, 0.48); }
        .noorix-tap-card { position: relative; border-radius: 18px; border: 1px solid rgba(26, 20, 16, 0.08); background: rgba(255, 255, 255, 0.68); padding: 14px; text-align: left; color: rgba(26, 20, 16, 0.58); transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
        .noorix-tap-card:hover { border-color: rgba(26, 20, 16, 0.16); background: rgba(255, 255, 255, 0.9); }
        .noorix-tap-card.is-selected { border-color: var(--field-accent); background: linear-gradient(135deg, color-mix(in srgb, var(--field-accent) 16%, transparent), rgba(255, 255, 255, 0.85)); color: #1a1410; box-shadow: 0 14px 30px color-mix(in srgb, var(--field-accent) 16%, transparent); }
        .noorix-tap-radio { position: absolute; top: 10px; right: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 999px; border: 1.5px solid rgba(26, 20, 16, 0.2); color: #fff; }
        .noorix-tap-card.is-selected .noorix-tap-radio { border-color: var(--field-accent); background: var(--field-accent); }
        .noorix-tap-label { display: block; font-size: 14px; font-weight: 800; }
        .noorix-tap-desc { display: block; margin-top: 4px; font-size: 11px; color: rgba(26, 20, 16, 0.48); }

        .noorix-tag { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(26, 20, 16, 0.09); background: rgba(255, 255, 255, 0.64); color: rgba(26, 20, 16, 0.6); font-size: 11px; font-weight: 700; transition: all 0.25s ease; cursor: pointer; }
        .noorix-tag:hover { border-color: rgba(26, 20, 16, 0.16); color: #1a1410; }
        .noorix-tag.is-selected { background: var(--tag-accent); border-color: var(--tag-accent); color: #1a1410; box-shadow: 0 10px 24px color-mix(in srgb, var(--tag-accent) 22%, transparent); }

        .noorix-counter-shell { display: flex; align-items: center; gap: 16px; }
        .noorix-counter-btn { width: 44px; height: 44px; border-radius: 16px; border: 1px solid rgba(26, 20, 16, 0.09); background: rgba(255, 255, 255, 0.62); color: #1a1410; font-size: 20px; font-weight: 800; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s ease; }
        .noorix-counter-btn:hover { background: #fff; transform: translateY(-1px); }
        .noorix-counter-value { display: flex; align-items: baseline; gap: 6px; }
        .noorix-counter-value span { font-size: 42px; font-weight: 850; letter-spacing: -0.06em; color: #1a1410; }
        .noorix-counter-value small { font-size: 12px; color: rgba(26, 20, 16, 0.4); }

        .noorix-msg-row { display: flex; width: 100%; }
        .noorix-msg-row--user { justify-content: flex-end; }
        .noorix-msg-row--assistant { justify-content: flex-start; }
        .noorix-msg-user-wrap { max-width: 80%; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .noorix-msg-user { padding: 12px 16px; border-radius: 20px 20px 6px 20px; background: linear-gradient(135deg, #1a1410, #3d332b); color: #fff; font-size: 13.5px; line-height: 1.55; }
        .noorix-msg-image { width: 150px; height: 150px; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 36px rgba(26, 20, 16, 0.18); }
        .noorix-msg-image img { width: 100%; height: 100%; object-fit: cover; }
        .noorix-msg-assistant-wrap { max-width: 85%; display: flex; align-items: flex-start; gap: 10px; }
        .noorix-msg-assistant { flex: 1; min-width: 0; border-radius: 22px 22px 22px 6px; background: linear-gradient(165deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.66)); border: 1px solid rgba(26, 20, 16, 0.08); padding: 14px 16px; box-shadow: 0 18px 44px rgba(26, 20, 16, 0.1); }
        .noorix-msg-body { font-size: 13.5px; line-height: 1.58; color: rgba(26, 20, 16, 0.8); }

        .noorix-data-card { margin-top: 12px; padding: 12px; border-radius: 16px; background: rgba(26, 20, 16, 0.04); border: 1px solid rgba(26, 20, 16, 0.06); }
        .noorix-data-title { font-size: 10px; font-weight: 850; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(26, 20, 16, 0.4); margin-bottom: 8px; }
        .noorix-data-row { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: rgba(26, 20, 16, 0.72); }
        .noorix-macro-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center; }
        .noorix-macro-grid p { font-size: 16px; font-weight: 850; color: #1a1410; }
        .noorix-macro-grid span { font-size: 9px; color: rgba(26, 20, 16, 0.42); text-transform: capitalize; }
        .noorix-skin-score { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(26, 20, 16, 0.07); text-align: center; }
        .noorix-skin-score p { font-size: 10px; color: rgba(26, 20, 16, 0.42); }
        .noorix-skin-score span { font-size: 24px; font-weight: 850; }

        .noorix-msg-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .noorix-action-chip { display: inline-flex; align-items: center; gap: 5px; padding: 6px 9px; border-radius: 999px; background: rgba(26, 20, 16, 0.05); border: 1px solid rgba(26, 20, 16, 0.06); color: rgba(26, 20, 16, 0.58); font-size: 10px; font-weight: 750; transition: all 0.25s ease; cursor: pointer; }
        .noorix-action-chip:hover { background: rgba(26, 20, 16, 0.09); color: #1a1410; }
        .noorix-action-chip--accent { background: rgba(255, 143, 178, 0.12); border-color: rgba(255, 143, 178, 0.2); color: #d6336c; }
        .noorix-action-chip--accent:hover { background: rgba(255, 143, 178, 0.2); color: #a61e4d; }
        .noorix-disclaimer { margin-top: 10px; font-size: 10px; font-style: italic; color: rgba(26, 20, 16, 0.34); }

        .noorix-composer { border-top: 1px solid rgba(26, 20, 16, 0.07); background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); padding: 12px 16px; }
        .noorix-composer-inner { max-width: 640px; margin: 0 auto; display: flex; align-items: flex-end; gap: 8px; }
        .noorix-composer-btn { flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 14px; border: 1px solid rgba(26, 20, 16, 0.08); background: rgba(255, 255, 255, 0.7); color: rgba(26, 20, 16, 0.56); cursor: pointer; transition: all 0.25s ease; }
        .noorix-composer-btn:hover { background: #fff; color: #1a1410; transform: translateY(-1px); }
        .noorix-composer-btn.is-recording { background: #ef4444; border-color: #ef4444; color: #fff; animation: noorix-pulse 1.2s ease infinite; }
        .noorix-composer-preview { position: relative; flex-shrink: 0; width: 44px; height: 44px; border-radius: 14px; overflow: hidden; }
        .noorix-composer-preview img { width: 100%; height: 100%; object-fit: cover; }
        .noorix-composer-preview button { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.48); color: #fff; font-size: 12px; border: none; cursor: pointer; }
        .noorix-composer-field { position: relative; flex: 1; }
        .noorix-composer-field input { width: 100%; height: 44px; padding: 0 16px; border-radius: 16px; border: 1px solid rgba(26, 20, 16, 0.09); background: rgba(255, 255, 255, 0.78); color: #1a1410; font-size: 13px; outline: none; transition: all 0.25s ease; }
        .noorix-composer-field input::placeholder { color: rgba(26, 20, 16, 0.32); }
        .noorix-composer-field input:focus { border-color: rgba(255, 143, 178, 0.65); background: #fff; box-shadow: 0 0 0 4px rgba(255, 143, 178, 0.1); }
        .noorix-composer-field input:disabled { opacity: 0.55; }
        .noorix-composer-status { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 10px; font-weight: 800; color: #ef4444; pointer-events: none; }
        .noorix-send-btn { flex-shrink: 0; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: none; background: #1a1410; color: #fff; cursor: pointer; transition: all 0.25s ease; }
        .noorix-send-btn:hover:not(:disabled) { background: #ff8fb2; transform: translateY(-2px) scale(1.04); box-shadow: 0 14px 30px rgba(255, 143, 178, 0.28); }
        .noorix-send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        @keyframes noorix-aurora-drift { 0% { transform: translate3d(0, 0, 0) scale(1); } 100% { transform: translate3d(-40px, 35px, 0) scale(1.15); } }
        @keyframes noorix-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); } }
      `}</style>

      <NoorixPlans isOpen={plansOpen} onClose={function() { setPlansOpen(false); }} />
    </div>
  );
}
