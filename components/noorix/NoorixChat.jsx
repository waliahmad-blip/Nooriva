'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowLeft, Send, Camera, Sparkles,
  Sun, Moon, Dumbbell, ScanLine,
  BookOpen, GlassWater, Stethoscope, Salad,
  Pill, Scissors, Beaker, CloudSun, Heart,
  MessageCircle, Mic, MicOff, Share2, ShoppingCart, Volume2, Zap, Shield, ChevronRight, ChevronRight,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { isFeatureAllowed, checkDailyLimit, getRequiredPlan } from '@/lib/noorix-plans';
import NoorixOrb from './NoorixOrb';
import NoorixPlans from './NoorixPlans';
import NoorixHologram from './NoorixHologram';
import NoorixTutorial from './NoorixTutorial';

/* ══════════════════════════════════════════════════════════════
   FEATURE REGISTRY — 14 AI-Powered Health & Beauty Features
   ══════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    id: 'skinPhoto',
    icon: Camera,
    needsImage: true,
    color: '#ff8fb2',
    tagline: 'AI Dermatology',
    description: 'Upload a photo of any skin concern — acne, dark spots, rashes, or irritation. Noorix performs differential triage with emergency red-flag detection and personalized holistic coaching.',
    highlights: ['Differential triage', 'Red-flag alerts', 'Holistic coaching'],
  },
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
    id: 'stress',
    icon: Sun,
    needsImage: false,
    color: '#f59e0b',
    tagline: 'Mood Intelligence',
    description: 'Quick emoji-based mood check-in that correlates your emotional state with skin flare-ups. Noorix provides coping strategies, stress-fighting nutrition, and calming rituals.',
    highlights: ['Mood-skin correlation', 'Coping strategies', 'Calming rituals'],
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
    id: 'product',
    icon: ScanLine,
    needsImage: true,
    color: '#22d3ee',
    tagline: 'Ingredient Intelligence',
    description: 'Photograph any product label and Noorix decodes every ingredient for your specific skin type. Get safety ratings, benefit analysis, and a clear verdict on whether to use it.',
    highlights: ['Full ingredient decode', 'Skin type matching', 'Safety verdict'],
  },
  {
    id: 'diary',
    icon: BookOpen,
    needsImage: false,
    color: '#d946ef',
    tagline: 'Pattern Recognition',
    description: 'Daily skin observations become powerful data. Noorix identifies patterns linking breakouts to diet, stress, sleep, and hormones — and tells you exactly what triggers your flare-ups.',
    highlights: ['Pattern detection', 'Trigger identification', 'Lifestyle correlation'],
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
    description: 'Upload a hair or scalp photo for AI analysis. Noorix assesses strand health, scalp condition, hair loss patterns, and dandruff severity — then recommends targeted nutrition and care routines.',
    highlights: ['Scalp assessment', 'Loss pattern analysis', 'Growth nutrition'],
  },
  {
    id: 'ingredient',
    icon: Beaker,
    needsImage: true,
    color: '#8b5cf6',
    tagline: 'Chemical Decoder',
    description: 'Snap any ingredient list — skincare, haircare, food, or supplements. Noorix identifies harmful chemicals, flags allergens, checks halal status, and rates overall safety for your body.',
    highlights: ['Harmful chemical flags', 'Allergen detection', 'Halal verification'],
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
    id: 'routine',
    icon: Heart,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Ritual Architect',
    description: 'Share your skin goal and current products. Noorix architects a complete AM and PM skincare ritual with step-by-step instructions, ingredient pairing rules, and a results timeline.',
    highlights: ['AM/PM ritual design', 'Ingredient pairing', 'Results timeline'],
  },
  {
    id: 'freeChat',
    icon: MessageCircle,
    needsImage: false,
    color: '#1A1410',
    tagline: 'Open Conversation',
    description: 'Have a free-form conversation with Noorix about anything — skin concerns, nutrition questions, product recommendations, wellness advice, or just chat about your glow journey. Ask anything, anytime.',
    highlights: ['Ask anything', 'Multi-turn memory', 'Personalized advice'],
  },
  {
    id: 'voiceOutput',
    icon: Volume2,
    needsImage: false,
    color: '#0ea5e9',
    tagline: 'Voice Assistant',
    description: 'Noorix speaks responses aloud. Listen to health advice, nutrition tips, and wellness coaching hands-free while you cook, exercise, or relax.',
    highlights: ['Text-to-speech', 'Hands-free listening', 'Multi-language'],
  },
  {
    id: 'progressPhotos',
    icon: Camera,
    needsImage: true,
    color: '#8b5cf6',
    tagline: 'Progress Tracker',
    description: 'Upload before and after photos to visually track your skin transformation. Noorix analyzes improvements and identifies what is working.',
    highlights: ['Before/after comparison', 'Visual tracking', 'AI analysis'],
  },
  {
    id: 'streaks',
    icon: Sparkles,
    needsImage: false,
    color: '#f59e0b',
    tagline: 'Gamification',
    description: 'Track your glow streaks, earn badges, and unlock achievements. Consistency is the secret to radiant skin — let Noorix keep you motivated.',
    highlights: ['Daily streaks', 'Achievement badges', 'Progress milestones'],
  },
  {
    id: 'wellnessCalendar',
    icon: BookOpen,
    needsImage: false,
    color: '#10b981',
    tagline: 'Monthly View',
    description: 'See your entire wellness journey in a calendar view. Track check-ins, mood patterns, skin observations, and ritual completions by date.',
    highlights: ['Monthly overview', 'Pattern visualization', 'Daily logs'],
  },
  {
    id: 'exportReport',
    icon: BookOpen,
    needsImage: false,
    color: '#6366f1',
    tagline: 'PDF Reports',
    description: 'Generate a comprehensive wellness report from all your Noorix data. Download as PDF to share with your dermatologist or keep for records.',
    highlights: ['PDF generation', 'Shareable reports', 'Complete history'],
  },
  {
    id: 'chatSearch',
    icon: ScanLine,
    needsImage: false,
    color: '#ec4899',
    tagline: 'Smart Search',
    description: 'Search through all your past Noorix conversations. Find that supplement recommendation, skin advice, or nutrition tip from weeks ago.',
    highlights: ['Full-text search', 'Conversation history', 'Instant results'],
  },
  {
    id: 'quickActions',
    icon: Zap,
    needsImage: false,
    color: '#f97316',
    tagline: 'Speed Tools',
    description: 'One-tap shortcuts for common tasks: quick skin check, water log, mood check-in, supplement reminder, and daily ritual completion.',
    highlights: ['One-tap actions', 'Common tasks', 'Speed optimized'],
  },
  {
    id: 'moodJournal',
    icon: Heart,
    needsImage: false,
    color: '#d946ef',
    tagline: 'Emotional Wellness',
    description: 'Daily mood logging with emoji-based check-ins. Noorix correlates your emotional patterns with skin health and suggests coping strategies.',
    highlights: ['Emoji mood tracking', 'Pattern correlation', 'Wellness insights'],
  },
  {
    id: 'darkMode',
    icon: Moon,
    needsImage: false,
    color: '#1e293b',
    tagline: 'Night Mode',
    description: 'Switch to a beautiful dark theme for nighttime use. Easier on the eyes, better for sleep, and looks stunning with the Noorix orb.',
    highlights: ['Dark theme', 'Sleep friendly', 'Eye comfort'],
  },
  {
    id: 'medicalImage',
    icon: Stethoscope,
    needsImage: true,
    color: '#ef4444',
    tagline: 'Medical AI',
    description: 'Advanced medical image analysis powered by MedSigLip. Upload skin lesions, rashes, wounds, or any medical image for AI-powered identification and triage guidance.',
    highlights: ['Medical-grade analysis', 'Condition identification', 'Severity assessment'],
  },
  {
    id: 'skinClassification',
    icon: ScanLine,
    needsImage: true,
    color: '#f97316',
    tagline: 'Skin Classifier',
    description: 'AI classifies skin conditions from photos using medical imaging models. Identifies acne types, pigmentation patterns, and skin texture analysis.',
    highlights: ['Acne classification', 'Pigmentation analysis', 'Texture scoring'],
  },
  {
    id: 'treatmentPlan',
    icon: Heart,
    needsImage: false,
    color: '#10b981',
    tagline: 'Treatment AI',
    description: 'Get a personalized treatment plan based on your skin analysis. Includes product recommendations, lifestyle changes, and a timeline for expected results.',
    highlights: ['Personalized plan', 'Product timeline', 'Progress milestones'],
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
  {
    id: 'skinAge',
    icon: Sparkles,
    needsImage: true,
    color: '#ec4899',
    tagline: 'Age Detector',
    description: 'Upload a selfie and Noorix predicts your skin age versus your actual age. Discover how your skin truly ages and get a personalized rejuvenation plan to turn back the clock.',
    highlights: ['Skin age prediction', 'Rejuvenation plan', 'Before/after tracking'],
  },
  {
    id: 'ingredientConflict',
    icon: Beaker,
    needsImage: true,
    color: '#f97316',
    tagline: 'Conflict Checker',
    description: 'Paste or photograph your current skincare products. Noorix checks every ingredient combination for conflicts, redundancies, and dangerous interactions. Never mix the wrong products again.',
    highlights: ['Conflict detection', 'Ingredient synergy', 'Safe combinations'],
  },
];

const FEATURE_MAP = Object.fromEntries(FEATURES.map((f) => [f.id, f]));

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
      { key: 'current', label: 'Currently taking anything?', type: 'tags', options: ['Nothing', 'Collagen', 'Biotin', 'Multivitamin', 'Vitamin D', 'Iron', 'Probiotics', 'Other'] },
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

/* ── Markdown-lite renderer ── */
function renderMarkdown(text) {
  if (!text) return null;
  var lines = text.split('\n');
  var elements = [];
  var listItems = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={'list-' + elements.length} className="mt-1 space-y-1 pl-1">
          {listItems.map(function(item, i) {
            return (
              <li key={i} className="text-sm text-ink/70 flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
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
        <p key={i} className="text-sm text-ink/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  flushList();
  return elements;
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>')
    .replace(/_(.+?)_/g, '<em class="text-ink/50">$1</em>');
}

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE FORM COMPONENTS — Zero Typing Required
   ══════════════════════════════════════════════════════════════ */

function TapCardsField({ field, value, onChange }) {
  var isMulti = field.multi;
  var selected = isMulti ? (value || []) : [value].filter(Boolean);

  function toggle(val) {
    if (isMulti) {
      var next = selected.includes(val) ? selected.filter(function(v) { return v !== val; }) : selected.concat([val]);
      onChange(next);
    } else {
      onChange(selected[0] === val ? '' : val);
    }
  }

  return (
    <div>
      <label className="block text-xs font-medium text-ink/60 mb-2">{field.label}</label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {field.options.map(function(opt) {
          var isSelected = selected.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.95 }}
              onClick={function() { toggle(opt.value); }}
              className={
                'rounded-xl border p-3 text-left transition-all duration-200 ' +
                (isSelected
                  ? 'border-ink bg-ink text-cream shadow-md'
                  : 'border-ink/10 bg-white/60 hover:border-ink/20 hover:bg-white/80')
              }
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.desc && (
                <span className={'block text-[10px] mt-0.5 ' + (isSelected ? 'text-cream/70' : 'text-ink/40')}>
                  {opt.desc}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function TagsField({ field, value, onChange }) {
  var isMulti = field.multi;
  var selected = isMulti ? (value || []) : [value].filter(Boolean);

  function toggle(val) {
    if (isMulti) {
      var next = selected.includes(val) ? selected.filter(function(v) { return v !== val; }) : selected.concat([val]);
      onChange(next);
    } else {
      onChange(selected[0] === val ? '' : val);
    }
  }

  return (
    <div>
      <label className="block text-xs font-medium text-ink/60 mb-2">{field.label}</label>
      <div className="flex flex-wrap gap-1.5">
        {field.options.map(function(opt) {
          var isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={function() { toggle(opt); }}
              className={
                'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ' +
                (isSelected
                  ? 'bg-ink text-cream shadow-sm'
                  : 'bg-white/60 border border-ink/10 text-ink/60 hover:border-ink/20 hover:bg-white')
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CounterField({ field, value, onChange }) {
  var current = value != null ? value : (field.defaultValue || 0);
  return (
    <div>
      <label className="block text-xs font-medium text-ink/60 mb-2">{field.label}</label>
      <div className="flex items-center gap-4">
        <button
          onClick={function() { onChange(Math.max(field.min || 0, current - 1)); }}
          className="h-10 w-10 rounded-full bg-white/60 border border-ink/10 text-ink font-bold text-lg hover:bg-white transition-colors flex items-center justify-center"
        >
          −
        </button>
        <span className="text-3xl font-bold w-16 text-center display-heading">{current}</span>
        <button
          onClick={function() { onChange(Math.min(field.max || 20, current + 1)); }}
          className="h-10 w-10 rounded-full bg-white/60 border border-ink/10 text-ink font-bold text-lg hover:bg-white transition-colors flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN NOORIX CHAT COMPONENT
   ══════════════════════════════════════════════════════════════ */

export default function NoorixChat() {
  var t = useT();
  var noorixOpen = useStore(function(s) { return s.noorixOpen; });
  var noorixFeature = useStore(function(s) { return s.noorixFeature; });
  var noorixMessages = useStore(function(s) { return s.noorixMessages; });
  var toggleNoorix = useStore(function(s) { return s.toggleNoorix; });
  var closeNoorix = useStore(function(s) { return s.closeNoorix; });
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
  var addToCart = useStore(function(s) { return s.addToCart; });
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

  var hologramState = useState(false);
  var showHologram = hologramState[0];
  var setShowHologram = hologramState[1];

  var tutorialState = useState(false);
  var showTutorial = tutorialState[0];
  var setShowTutorial = tutorialState[1];

  var hasSeenHologram = typeof window !== 'undefined' && localStorage.getItem('noorix-hologram-seen');

  var messagesEndRef = useRef(null);
  var inputRef = useRef(null);
  var fileRef = useRef(null);

  var feature = noorixFeature ? FEATURE_MAP[noorixFeature] : null;
  var messages = noorixFeature ? (noorixMessages[noorixFeature] || []) : [];
  var contextConfig = noorixFeature ? CONTEXT_CONFIGS[noorixFeature] : null;

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
    var effectivePlan = getEffectivePlan();
    // Check plan access
    if (!isFeatureAllowed(effectivePlan, featureId)) {
      var required = getRequiredPlan(featureId);
      setBlocked({ type: 'feature', featureId: featureId, required: required });
      return;
    }
    // Check daily limit
    var today = new Date().toDateString();
    var usedToday = (noorixDailyDate === today) ? noorixDailyUsed : 0;
    var limit = checkDailyLimit(effectivePlan, usedToday);
    if (!limit.allowed) {
      setBlocked({ type: 'limit', remaining: 0, limit: limit.limit });
      return;
    }
    setBlocked(null);
    setNoorixFeature(featureId);
  }, [setNoorixFeature, noorixPlan, noorixDailyUsed, noorixDailyDate]);

  var handleImageSelect = useCallback(function(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (validTypes.indexOf(file.type) === -1 || file.size > 20 * 1024 * 1024) return;
    fileToDataURL(file).then(function(preview) {
      setImage({ file: file, preview: preview });
      if (fileRef.current) fileRef.current.value = '';
    });
  }, []);

  var sendMessage = useCallback(function() {
    if (sending || !noorixFeature || !feature) return;
    var hasInput = input.trim().length > 0;
    var hasImage = !!image;
    var hasContext = Object.keys(contextValues).length > 0;
    if (!hasInput && !hasImage && !hasContext) return;

    var summary = buildContextSummary(noorixFeature, contextValues);
    var messageText = input.trim() || summary || ('Analyze my ' + t('noorix.feature.' + noorixFeature).toLowerCase());

    var userMsg = { role: 'user', content: messageText, image: image ? image.preview : null, timestamp: Date.now() };
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
      console.error('[Noorix] send error:', err);
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

  return (
    <div>
      {/* ═══ Floating Button ═══ */}
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
        <style jsx>{'\n          @keyframes noorix-btn-spin { to { transform: rotate(360deg); } }\n          @keyframes noorix-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }\n        '}</style>
      </div>

      {/* ═══ Full-Screen Overlay ═══ */}
      <AnimatePresence>
        {noorixOpen && !hasSeenHologram && (
          <NoorixHologram isVisible={noorixOpen && !hasSeenHologram} onDismiss={function() { setShowHologram(false); localStorage.setItem('noorix-hologram-seen', 'true'); }} />
        )}
        {showTutorial && (
          <NoorixTutorial isOpen={showTutorial} onClose={function() { setShowTutorial(false); }} />
        )}
        {noorixOpen && (
          <motion.div
            key="noorix-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: 'rgba(250, 247, 242, 0.97)' }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink/5">
              <div className="flex items-center gap-3">
                {noorixFeature ? (
                  <button onClick={backNoorix} className="rounded-full bg-ink/5 p-2 hover:bg-ink/10 transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-ink/60" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold display-heading">
                    {feature ? t('noorix.feature.' + feature.id) : 'Noorix'}
                  </h2>
                  <p className="text-[11px] text-ink/40">
                    {feature ? t('noorix.feature.' + feature.id + 'Desc') : t('noorix.sub')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Usage counter */}
                {noorixPlan !== 'lite' || true ? (
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
                    {/* Animated shimmer */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        animation: 'noorix-shimmer 2s ease-in-out infinite',
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-1.5">
                      {noorixPlan === 'lite' ? '⚡' : noorixPlan === 'glow' ? '✨' : noorixPlan === 'pro' ? '👑' : '💎'}
                    {getEffectivePlan() === 'lite' ? 'Free' : getEffectivePlan() === 'glow' ? 'Glow' : getEffectivePlan() === 'pro' ? 'Pro' : 'Max'}
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
                ) : null}
                <button onClick={closeNoorix} className="rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {!noorixFeature ? (
                  /* ═══════════════════════════════════════
                     LANDING — Feature Grid
                     ═══════════════════════════════════════ */
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full overflow-y-auto no-scrollbar"
                  >
                    <div className="mx-auto max-w-3xl px-5 py-8">
                      {/* Orb + Greeting */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center mb-10"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <NoorixOrb size={160} />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-5 text-2xl md:text-3xl font-bold display-heading text-center"
                        >
                          {t('noorix.greeting')}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-2 text-sm text-ink/50 text-center max-w-md"
                        >
                          Choose a feature to begin your personalized experience. Tap, snap, or select — no typing required.
                        </motion.p>

                        {/* Introduction stats */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="mt-6 flex flex-wrap justify-center gap-4"
                        >
                          {[
                            { num: '15', label: 'AI Features', color: '#ff8fb2' },
                            { num: '24/7', label: 'Always Available', color: '#a78bfa' },
                            { num: '100%', label: 'Privacy First', color: '#67e8f9' },
                            { num: '0', label: 'Data Stored', color: '#5eead4' },
                          ].map(function(stat, i) {
                            return (
                              <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="flex flex-col items-center px-4 py-2"
                              >
                                <span className="text-2xl font-bold display-heading" style={{ color: stat.color }}>{stat.num}</span>
                                <span className="text-[10px] text-ink/40 font-medium uppercase tracking-wider">{stat.label}</span>
                              </motion.div>
                            );
                          })}
                        </motion.div>

                        {/* How it works */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="mt-6 flex flex-wrap justify-center gap-6"
                        >
                          {[
                            { icon: '🌸', title: 'Snap', desc: 'Upload a photo of skin, meal, or product' },
                            { icon: '🔮', title: 'Analyze', desc: 'AI processes and identifies patterns' },
                            { icon: '💫', title: 'Glow', desc: 'Get personalized recommendations' },
                          ].map(function(step, i) {
                            return (
                              <div key={step.title} className="flex items-center gap-3 text-left">
                                <div className="text-2xl">{step.icon}</div>
                                <div>
                                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                                  <p className="text-[11px] text-ink/45 max-w-[140px]">{step.desc}</p>
                                </div>
                                {i < 2 && <span className="text-ink/20 text-lg ml-2 hidden sm:block">→</span>}
                              </div>
                            );
                          })}
                        </motion.div>

                        {/* Glow Score + Trial Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="mt-6 flex flex-wrap justify-center gap-3"
                        >
                          <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
                            <div className="text-2xl">✨</div>
                            <div>
                              <p className="text-xs text-ink/40 font-medium">Your Glow Score</p>
                              <p className="text-xl font-bold display-heading holo-text">{glowScore}</p>
                            </div>
                          </div>
                          <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
                            <div className="text-2xl">🔥</div>
                            <div>
                              <p className="text-xs text-ink/40 font-medium">Ritual Streak</p>
                              <p className="text-xl font-bold display-heading">{ritualStreak} days</p>
                            </div>
                          </div>
                          {noorixPlan === 'lite' && trial && trial.end > Date.now() && (
                            <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3 ring-2 ring-purple-400/30">
                              <div className="text-2xl">🎁</div>
                              <div>
                                <p className="text-xs text-purple-500 font-medium">Free Pro Trial</p>
                                <p className="text-sm font-bold text-purple-600">
                                  {Math.ceil((trial.end - Date.now()) / (1000 * 60 * 60 * 24))} days left
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>

                      {/* Tutorial Button */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex justify-center mb-6"
                      >
                        <button
                          onClick={function() { setShowTutorial(true); }}
                          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium glass hover:-translate-y-0.5 transition-all"
                        >
                          <Sparkles size={16} className="text-purple-500" />
                          Take the Noorix Tour
                          <ChevronRight size={14} className="text-ink/40" />
                        </button>
                      </motion.div>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map(function(f, i) {
                          var Icon = f.icon;
                          return (
                            <motion.button
                              key={f.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.04 }}
                              onClick={function() { openChat(f.id); }}
                              className="group glass rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                            >
                              {/* Icon + Tagline */}
                              <div className="flex items-start justify-between mb-3">
                                <div
                                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                  style={{ background: f.color + '18' }}
                                >
                                  <Icon size={22} style={{ color: f.color }} />
                                </div>
                                <span
                                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                  style={{ color: f.color, background: f.color + '15' }}
                                >
                                  {f.tagline}
                                </span>
                              </div>

                              {/* Title */}
                              <h4 className="text-base font-bold text-ink leading-tight mb-1.5">
                                {t('noorix.feature.' + f.id)}
                              </h4>

                              {/* Description */}
                              <p className="text-xs text-ink/55 leading-relaxed mb-3">
                                {f.description}
                              </p>

                              {/* Highlights */}
                              <div className="flex flex-wrap gap-1">
                                {f.highlights.map(function(h) {
                                  return (
                                    <span
                                      key={h}
                                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                                      style={{ borderColor: f.color + '30', color: f.color, background: f.color + '08' }}
                                    >
                                      {h}
                                    </span>
                                  );
                                })}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Upgrade Banner */}
                      {noorixPlan === 'lite' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-8 relative overflow-hidden rounded-2xl p-6 cursor-pointer group"
                          onClick={function() { setPlansOpen(true); }}
                          style={{
                            background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)',
                          }}
                        >
                          {/* Animated shimmer */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                              animation: 'noorix-shimmer 3s ease-in-out infinite',
                            }}
                          />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-bold text-lg">Unlock All {FEATURES.length} Features</h4>
                              <p className="text-white/80 text-sm mt-1">Upgrade to Noorix Glow for unlimited AI-powered wellness</p>
                            </div>
                            <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                              From Rs4,999/mo
                              <span className="text-lg">→</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Pro upsell for Glow users */}
                      {noorixPlan === 'glow' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-8 relative overflow-hidden rounded-2xl p-6 cursor-pointer group"
                          onClick={function() { setPlansOpen(true); }}
                          style={{
                            background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                              animation: 'noorix-shimmer 3s ease-in-out infinite',
                            }}
                          />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-bold text-lg">Go Pro — Unlimited Everything</h4>
                              <p className="text-white/80 text-sm mt-1">Remove daily limits, get priority speed and wellness reports</p>
                            </div>
                            <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                              Rs7,999/mo
                              <span className="text-lg">→</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* ═══════════════════════════════════════
                     CHAT VIEW
                     ═══════════════════════════════════════ */
                  <motion.div
                    key={'chat-' + noorixFeature}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    {/* Context form */}
                    {showContext && messages.length === 0 && contextConfig && contextConfig.fields && contextConfig.fields.length > 0 && (
                      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
                        <div className="mx-auto max-w-xl space-y-5">
                          {/* Intro */}
                          <div className="flex items-center gap-3 mb-2">
                            <NoorixOrb size={36} />
                            <div>
                              <p className="text-sm font-medium text-ink">{t('noorix.feature.' + feature.id)}</p>
                              <p className="text-xs text-ink/50">{contextConfig.intro}</p>
                            </div>
                          </div>

                          {/* Dynamic fields */}
                          {contextConfig.fields.map(function(field) {
                            if (field.type === 'tapCards') {
                              return <TapCardsField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} />;
                            }
                            if (field.type === 'tags') {
                              return <TagsField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} />;
                            }
                            if (field.type === 'counter') {
                              return <CounterField key={field.key} field={field} value={contextValues[field.key]} onChange={function(v) { setContextValue(field.key, v); }} />;
                            }
                            return null;
                          })}

                          {/* Image upload for photo features */}
                          {feature.needsImage && (
                            <div>
                              <label className="block text-xs font-medium text-ink/60 mb-2">Upload photo</label>
                              <button
                                onClick={function() { if (fileRef.current) fileRef.current.click(); }}
                                className="w-full rounded-2xl border-2 border-dashed border-ink/10 p-4 text-center text-sm text-ink/50 hover:border-ink/20 hover:bg-white/50 transition-colors"
                              >
                                <Camera size={20} className="mx-auto mb-1 text-ink/40" />
                                {image ? 'Photo selected — tap to change' : 'Tap to upload a photo'}
                              </button>
                              {image && (
                                <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden">
                                  <img src={image.preview} alt="" className="w-full h-full object-cover" />
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

                          {/* Analyze button */}
                          <button onClick={sendMessage} disabled={sending} className="btn-primary w-full !py-3 text-sm">
                            {sending ? t('noorix.thinking') : 'Analyze'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    {(!showContext || messages.length > 0 || (contextConfig && contextConfig.fields && contextConfig.fields.length === 0)) && (
                      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
                        <div className="mx-auto max-w-xl space-y-4">
                          {/* Welcome message */}
                          {messages.length === 0 && !showContext && (
                            <div className="flex items-start gap-3">
                              <NoorixOrb size={32} className="shrink-0 mt-1" />
                              <div className="glass rounded-2xl rounded-tl-md p-4 max-w-[80%]">
                                <p className="text-sm text-ink/80">
                                  {feature && feature.needsImage
                                    ? 'Upload a photo and I will analyze it. You can also type a question below.'
                                    : 'Tell me more — tap selections below or type your question.'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Message list */}
                          {messages.map(function(msg, i) {
                            if (msg.role === 'user') {
                              return (
                                <div key={i} className="flex justify-end">
                                  <div className="max-w-[80%] space-y-2">
                                    {msg.image && (
                                      <div className="rounded-2xl overflow-hidden w-48 h-48 ml-auto">
                                        <img src={msg.image} alt="" className="w-full h-full object-cover" />
                                      </div>
                                    )}
                                    {msg.content && (
                                      <div className="bg-ink text-cream rounded-2xl rounded-tr-md px-4 py-3 text-sm">
                                        {msg.content}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div key={i} className="flex justify-start">
                                <div className="max-w-[85%] flex items-start gap-2.5">
                                  <NoorixOrb size={28} className="shrink-0 mt-1" />
                                  <div className="space-y-2">
                                    <div className="glass rounded-2xl rounded-tl-md p-4">{renderMarkdown(msg.content)}</div>
                                    {msg.raw && msg.raw.triage && msg.raw.triage.length > 0 && (
                                      <div className="glass rounded-xl p-3 space-y-1.5">
                                        <p className="text-[10px] font-semibold text-ink/50 uppercase tracking-wider">Triage Results</p>
                                        {msg.raw.triage.map(function(t, ti) {
                                          var icon = t.likelihood === 'high' ? '🔴' : t.likelihood === 'moderate' ? '🟡' : '🟢';
                                          return (
                                            <div key={ti} className="flex items-start gap-2 text-xs text-ink/70">
                                              <span>{icon}</span>
                                              <span><strong>{t.condition}</strong> ({t.likelihood}) — {t.description}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                    {msg.raw && msg.raw.macros && (
                                      <div className="glass rounded-xl p-3">
                                        <p className="text-[10px] font-semibold text-ink/50 uppercase tracking-wider mb-2">Nutrition</p>
                                        <div className="grid grid-cols-4 gap-2 text-center">
                                          {['calories','protein','carbs','fat'].map(function(key) {
                                            return (
                                              <div key={key}>
                                                <p className="text-sm font-bold text-ink">{msg.raw.macros[key] || '—'}</p>
                                                <p className="text-[9px] text-ink/40 capitalize">{key}</p>
                                              </div>
                                            );
                                          })}
                                        </div>
                                        {msg.raw.overallSkinScore && (
                                          <div className="mt-2 pt-2 border-t border-ink/5 text-center">
                                            <p className="text-xs text-ink/50">Skin Score</p>
                                            <p className="text-lg font-bold holo-text">{msg.raw.overallSkinScore}/10</p>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-1.5 pl-1">
                                      <button onClick={function() { shareResult(msg); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink/70 transition-colors"><Share2 size={11} /> Share</button>
                                      <button onClick={function() { window.open('mailto:?subject=' + encodeURIComponent('Noorix Analysis') + '&body=' + encodeURIComponent(msg.content || '')); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink/70 transition-colors">✉️ Email</button>
                                      <button onClick={function() { var b = new Blob([msg.content || ''], {type:'text/plain'}); var u = URL.createObjectURL(b); var a = document.createElement('a'); a.href = u; a.download = 'noorix-analysis.txt'; a.click(); URL.revokeObjectURL(u); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink/70 transition-colors">📥 Download</button>
                                      <button onClick={function() { if (navigator.clipboard) navigator.clipboard.writeText(msg.content || ''); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink/70 transition-colors">📋 Copy</button>
                                      <button onClick={function() { var w = window.open('', '_blank'); w.document.write('<html><head><title>Noorix</title><style>body{font-family:Space Grotesk,sans-serif;padding:40px;max-width:700px;margin:auto;line-height:1.6;color:#1A1410;}strong{color:#1A1410;}</style></head><body><h1>Noorix Analysis</h1><p>' + (msg.content||'').replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>') + '</p></body></html>'); w.document.close(); w.print(); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-ink/5 text-ink/50 hover:bg-ink/10 hover:text-ink/70 transition-colors">🖨️ Print</button>
                                      {msg.raw && msg.raw.actions && msg.raw.actions.map(function(action, ai) {
                                        if (action.type === 'addProduct' && action.payload) {
                                          return (<button key={ai} onClick={function() { addToCart(action.payload); }} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"><ShoppingCart size={11} /> {action.label || 'Add to Bag'}</button>);
                                        }
                                        return null;
                                      })}
                                    </div>
                                    {msg.raw && msg.raw.disclaimer && (
                                      <p className="text-[10px] text-ink/30 pl-1 italic">{msg.raw.disclaimer}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Thinking indicator */}
                          {sending && (
                            <div className="flex items-start gap-2.5">
                              <NoorixOrb size={28} className="shrink-0 mt-1" />
                              <div className="glass rounded-2xl rounded-tl-md px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="h-2 w-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="h-2 w-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>
                            </div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>
                      </div>
                    )}

                    {/* Input bar */}
                    {(!showContext || messages.length > 0 || (contextConfig && contextConfig.fields && contextConfig.fields.length === 0)) && (
                      <div className="border-t border-ink/5 bg-cream/80 backdrop-blur-xl px-4 py-3">
                        <div className="mx-auto max-w-xl flex items-end gap-2">
                          {feature && feature.needsImage && (
                            <button
                              onClick={function() { if (fileRef.current) fileRef.current.click(); }}
                              className="shrink-0 rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors"
                              aria-label="Upload image"
                            >
                              <Camera size={18} className="text-ink/50" />
                            </button>
                          )}
                          {image && (
                            <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden">
                              <img src={image.preview} alt="" className="w-full h-full object-cover" />
                              <button
                                onClick={function() { setImage(null); }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                          {/* Voice button */}
                          <button
                            onClick={toggleVoice}
                            className={'shrink-0 rounded-full p-2.5 transition-all ' + (isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-ink/5 text-ink/50 hover:bg-ink/10')}
                            aria-label={isListening ? 'Stop listening' : 'Voice input'}
                          >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                          </button>

                          <div className="flex-1 relative">
                            <input
                              ref={inputRef}
                              type="text"
                              value={input}
                              onChange={function(e) { setInput(e.target.value); }}
                              onKeyDown={handleKeyDown}
                              placeholder={isListening ? 'Listening...' : t('noorix.inputPlaceholder')}
                              disabled={sending}
                              className={'field !rounded-full !py-2.5 !pr-4 text-sm ' + (isListening ? '!border-red-400 !bg-red-50' : '')}
                            />
                          </div>
                          <button
                            onClick={sendMessage}
                            disabled={sending || (!input.trim() && !image)}
                            className="shrink-0 rounded-full bg-ink p-2.5 text-cream disabled:opacity-30 hover:scale-105 transition-all"
                            aria-label={t('noorix.send')}
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Hidden file input */}
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
      {/* Blocked overlay */}
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
              className="glass rounded-[2rem] p-8 max-w-sm w-full text-center"
              onClick={function(e) { e.stopPropagation(); }}
            >
              <div className="text-4xl mb-4">
                {blocked.type === 'limit' ? '⏰' : '🔒'}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {blocked.type === 'limit' ? 'Daily Limit Reached' : 'Upgrade Required'}
              </h3>
              <p className="text-sm text-ink/60 mb-6">
                {blocked.type === 'limit'
                  ? 'You have used all your free analyses for today. Upgrade for more.'
                  : 'This feature requires the ' + (blocked.required ? blocked.required.name : 'Glow') + ' plan.'}
              </p>
              <button
                onClick={function() { setBlocked(null); setPlansOpen(true); }}
                className="btn-primary w-full !py-3 mb-2"
              >
                View Plans
              </button>
              <button
                onClick={function() { setBlocked(null); }}
                className="btn-secondary w-full !py-3"
              >
                Maybe Later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plans modal */}
      <NoorixPlans isOpen={plansOpen} onClose={function() { setPlansOpen(false); }} />
    </div>
  );
}

