/**
 * ═══════════════════════════════════════════════════════════
 * Noorix Subscription Plans — Data Model & Feature Gating
 *
 * 8 Tiers:
 *   Lite     — Free       — 5/day, 6 features
 *   Glow     — Rs4,999    — 25/day, all 49 features
 *   Pro      — Rs7,999    — unlimited, history, reports, priority
 *   Max      — Rs9,999    — family (3), discounts, consultations
 *   Elite    — Rs12,999   — medical imaging, skin age, conflicts
 *   Premium  — Rs15,999   — family (5), dermatologist, custom AI
 *   Ultimate — Rs17,999   — unlimited family, weekly derm, formulations
 *   Supreme  — Rs19,999   — concierge, daily derm, VIP events
 *
 * ═══════════════════════════════════════════════════════════
 */

/* ═══════════════════════════════════════════════════════════
 * All 49 Noorix Features — unlocked at Glow tier and above
 * Cross-checked against:
 *   - NoorixChat.jsx FEATURES array (49 entries)
 *   - app/api/noorix/chat/route.js VALID_TYPES (49 entries)
 *   - lib/i18n.js noorix.feature.* labels (49 entries × 3 languages)
 *   - lib/noorix-ai.js FEATURE_MODEL_MAP (49 entries)
 * ═══════════════════════════════════════════════════════════ */
const ALL_FEATURES = [
  // ═══ MERGED FEATURES (6) ═══
  'skinIntelligence',
  'ingredientIntelligence',
  'glowJournal',
  'treatmentRoutine',
  'progressStreaks',
  'wellnessToolkit',

  // ═══ KEPT FEATURES (12) ═══
  'mealPhoto',
  'supplement',
  'sleep',
  'fitness',
  'hydration',
  'symptom',
  'hair',
  'sun',
  'freeChat',
  'voiceOutput',
  'medicalImage',
  'healthRisk',

  // ═══ NEW FEATURES (11) ═══
  'glowScore',
  'glowRitualFinder',
  'weatherGlow',
  'culturalAdapt',
  'beforeAfter',
  'multilingualVoice',
  'labReport',
  'voiceConversation',
  'liveIngredientResearch',
  'multiAngleVideo',
  'refillReminder',

  // ═══ BRAND NEW FEATURES (20) ═══
  'aiDietChart',
  'workoutVisualizer',
  'drugInteractionChecker',
  'liveVoiceTranslator',
  'geneticReportReader',
  'hormoneCycleWellness',
  'yogaPostureCorrector',
  'aiRecipeGenerator',
  'sleepStoryGenerator',
  'hydrationGamification',
  'aiMakeupMatch',
  'wellnessReportPdf',
  'fastingRamadanTracker',
  'mentalWellnessCompanion',
  'allergyDetective',
  'moodMusicRecommender',
  'skincareRoutineCard',
  'recoveryScore',
  'pregnancyWellness',
  'moodJournal',
];

/* ═══════════════════════════════════════════════════════════
 * Lite Tier — Free features (6 out of 49)
 * ═══════════════════════════════════════════════════════════ */
const LITE_FEATURES = [
  'skinIntelligence',
  'mealPhoto',
  'freeChat',
  'glowScore',
  'hydration',
  'moodJournal',
];

/* ═══════════════════════════════════════════════════════════
 * Plan Definitions — 8 Tiers
 * ═══════════════════════════════════════════════════════════ */
export const NOORIX_PLANS = {
  /* ───────────────────────────────────────────────
   * 1. LITE — Free
   * ─────────────────────────────────────────────── */
  lite: {
    id: 'lite',
    name: 'Noorix Lite',
    tagline: 'Start your glow journey',
    price: 0,
    priceDisplay: 'Free',
    period: '',
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #94a3b8, #cbd5e1)',
    dailyLimit: 5,
    features: LITE_FEATURES,
    featureCount: LITE_FEATURES.length,
    highlights: [
      '5 AI analyses per day',
      'Skin photo triage',
      'Meal nutrition scan',
      'Free chat with Noorix',
      'Glow Score tracking',
      'Mood Journal',
    ],
    cta: 'Current Plan',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 2. GLOW — Rs4,999/month
   * ─────────────────────────────────────────────── */
  glow: {
    id: 'glow',
    name: 'Noorix Glow',
    tagline: 'Your daily wellness companion',
    price: 4999,
    priceDisplay: 'Rs 4,999',
    period: '/month',
    color: '#ff8fb2',
    gradient: 'linear-gradient(135deg, #ff8fb2, #ffd7a1)',
    dailyLimit: 25,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      '25 AI analyses per day',
      'All 49 features unlocked',
      'Conversation history saved',
      'Standard response speed',
    ],
    cta: 'Start Glowing',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 3. PRO — Rs7,999/month
   * ─────────────────────────────────────────────── */
  pro: {
    id: 'pro',
    name: 'Noorix Pro',
    tagline: 'For the dedicated glow seeker',
    price: 7999,
    priceDisplay: 'Rs 7,999',
    period: '/month',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Unlimited AI analyses',
      'All 49 features',
      'Persistent conversation history',
      'Priority response speed',
      'Monthly wellness report',
      'Skin pattern analytics',
    ],
    cta: 'Go Pro',
    popular: true,
  },

  /* ───────────────────────────────────────────────
   * 4. MAX — Rs9,999/month
   * ─────────────────────────────────────────────── */
  max: {
    id: 'max',
    name: 'Noorix Max',
    tagline: 'The ultimate glow experience',
    price: 9999,
    priceDisplay: 'Rs 9,999',
    period: '/month',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Everything in Pro',
      'Family sharing (up to 3 members)',
      '10% off all NOORIVA products',
      'Early access to new features',
      'Priority WhatsApp support',
      'Quarterly wellness consultation',
    ],
    cta: 'Unlock Max',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 5. ELITE — Rs12,999/month
   * ─────────────────────────────────────────────── */
  elite: {
    id: 'elite',
    name: 'Noorix Elite',
    tagline: 'For the wellness obsessed',
    price: 12999,
    priceDisplay: 'Rs 12,999',
    period: '/month',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Everything in Max',
      'Medical image analysis',
      'Skin age detection',
      'Ingredient conflict checker',
      'Priority AI speed',
      'Biweekly wellness consultation',
    ],
    cta: 'Go Elite',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 6. PREMIUM — Rs15,999/month
   * ─────────────────────────────────────────────── */
  premium: {
    id: 'premium',
    name: 'Noorix Premium',
    tagline: 'Complete wellness suite',
    price: 15999,
    priceDisplay: 'Rs 15,999',
    period: '/month',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #f97316)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Everything in Elite',
      'Family sharing (up to 5 members)',
      '15% off all NOORIVA products',
      'Monthly dermatologist consult',
      'Custom AI training on your data',
      'White-glove WhatsApp support',
    ],
    cta: 'Go Premium',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 7. ULTIMATE — Rs17,999/month
   * ─────────────────────────────────────────────── */
  ultimate: {
    id: 'ultimate',
    name: 'Noorix Ultimate',
    tagline: 'The complete glow ecosystem',
    price: 17999,
    priceDisplay: 'Rs 17,999',
    period: '/month',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Everything in Premium',
      'Unlimited family members',
      '20% off all NOORIVA products',
      'Weekly dermatologist consult',
      'Personalized supplement formulation',
      'Early access to new AI models',
    ],
    cta: 'Go Ultimate',
    popular: false,
  },

  /* ───────────────────────────────────────────────
   * 8. SUPREME — Rs19,999/month
   * ─────────────────────────────────────────────── */
  supreme: {
    id: 'supreme',
    name: 'Noorix Supreme',
    tagline: 'The pinnacle of glow',
    price: 19999,
    priceDisplay: 'Rs 19,999',
    period: '/month',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24, #f43f5e)',
    dailyLimit: -1,
    features: ALL_FEATURES,
    featureCount: ALL_FEATURES.length,
    highlights: [
      'Everything in Ultimate',
      'Dedicated wellness concierge',
      '25% off all NOORIVA products',
      'Daily dermatologist availability',
      'Bespoke NOORIVA formulations',
      'VIP event invitations',
    ],
    cta: 'Go Supreme',
    popular: false,
  },
};

/* ═══════════════════════════════════════════════════════════
 * Plan Order — for UI display & carousel
 * ═══════════════════════════════════════════════════════════ */
export const PLAN_ORDER = [
  'lite',
  'glow',
  'pro',
  'max',
  'elite',
  'premium',
  'ultimate',
  'supreme',
];

/* ═══════════════════════════════════════════════════════════
 * Helper Functions
 * ═══════════════════════════════════════════════════════════ */

/**
 * Check if a feature is allowed for a given plan.
 * @param {string} featureId — The feature ID (e.g. 'skinIntelligence')
 * @param {string} planId — The plan ID (e.g. 'lite', 'glow', 'pro')
 * @returns {boolean}
 */
export function isFeatureAllowed(featureId, planId) {
  const plan = NOORIX_PLANS[planId] || NOORIX_PLANS.lite;
  return plan.features.includes(featureId);
}

/**
 * Check daily limit for a plan.
 * @param {string} planId — The plan ID
 * @param {number} usedToday — Number of uses today
 * @returns {{ allowed: boolean, remaining: number, limit: number }}
 */
export function checkDailyLimit(planId, usedToday) {
  const plan = NOORIX_PLANS[planId] || NOORIX_PLANS.lite;
  if (plan.dailyLimit === -1) {
    return { allowed: true, remaining: -1, limit: -1 };
  }
  const remaining = Math.max(0, plan.dailyLimit - usedToday);
  return { allowed: remaining > 0, remaining, limit: plan.dailyLimit };
}

/**
 * Get the plan object that a feature belongs to (for upgrade prompts).
 * Iterates through PLAN_ORDER and returns the first plan that includes the feature.
 * @param {string} featureId — The feature ID
 * @returns {object} The plan object
 */
export function getRequiredPlan(featureId) {
  for (let i = 0; i < PLAN_ORDER.length; i++) {
    const planId = PLAN_ORDER[i];
    const plan = NOORIX_PLANS[planId];
    if (plan && plan.features.includes(featureId)) {
      return plan;
    }
  }
  return NOORIX_PLANS.glow;
}

/**
 * Get a plan object by ID.
 * @param {string} planId
 * @returns {object} The plan object
 */
export function getPlan(planId) {
  return NOORIX_PLANS[planId] || NOORIX_PLANS.lite;
}

/**
 * Get all feature IDs for a plan.
 * @param {string} planId
 * @returns {string[]} Array of feature IDs
 */
export function getPlanFeatures(planId) {
  const plan = getPlan(planId);
  return plan.features;
}

/**
 * Get the number of features for a plan.
 * @param {string} planId
 * @returns {number}
 */
export function getFeatureCount(planId) {
  const plan = getPlan(planId);
  return plan.featureCount || plan.features.length;
}

/**
 * Get all plans in order.
 * @returns {object[]} Array of plan objects
 */
export function getAllPlans() {
  return PLAN_ORDER.map(function(planId) {
    return NOORIX_PLANS[planId];
  });
}
