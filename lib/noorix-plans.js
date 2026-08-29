/**
 * Noorix Subscription Plans — Data Model & Feature Gating
 *
 * Tiers:
 *   Lite  — Free     — 5/day, 3 features
 *   Glow  — Rs4,999  — 25/day, all 15 features
 *   Pro   — Rs7,999  — unlimited, history, reports
 *   Max   — Rs9,999  — family, discounts, consultations
 */

export const NOORIX_PLANS = {
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
    features: ['skinPhoto', 'mealPhoto', 'freeChat'],
    highlights: [
      '5 AI analyses per day',
      'Skin photo triage',
      'Meal nutrition scan',
      'Free chat with Noorix',
    ],
    cta: 'Current Plan',
    popular: false,
  },
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
    ],
    highlights: [
      '25 AI analyses per day',
      'All 15 features unlocked',
      'Conversation history saved',
      'Standard response speed',
    ],
    cta: 'Start Glowing',
    popular: false,
  },
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
    ],
    highlights: [
      'Unlimited AI analyses',
      'All 15 features',
      'Persistent conversation history',
      'Priority response speed',
      'Monthly wellness report',
      'Skin pattern analytics',
    ],
    cta: 'Go Pro',
    popular: true,
  },
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
    ],
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
      'medicalImage', 'skinClassification', 'treatmentPlan',
      'healthRisk', 'skinAge', 'ingredientConflict',
      'voiceOutput', 'progressPhotos', 'streaks', 'wellnessCalendar',
      'exportReport', 'chatSearch', 'quickActions', 'moodJournal', 'darkMode',
    ],
    highlights: [
      'Everything in Max',
      'All 31 features unlocked',
      'Medical image analysis',
      'Skin age detection',
      'Ingredient conflict checker',
      'Priority AI speed',
    ],
    cta: 'Go Elite',
    popular: false,
  },
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
      'medicalImage', 'skinClassification', 'treatmentPlan',
      'healthRisk', 'skinAge', 'ingredientConflict',
      'voiceOutput', 'progressPhotos', 'streaks', 'wellnessCalendar',
      'exportReport', 'chatSearch', 'quickActions', 'moodJournal', 'darkMode',
    ],
    highlights: [
      'Everything in Elite',
      'Family sharing (up to 5)',
      '15% off all NOORIVA products',
      'Monthly dermatologist consult',
      'Custom AI training on your data',
      'White-glove WhatsApp support',
    ],
    cta: 'Go Premium',
    popular: false,
  },
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
      'medicalImage', 'skinClassification', 'treatmentPlan',
      'healthRisk', 'skinAge', 'ingredientConflict',
      'voiceOutput', 'progressPhotos', 'streaks', 'wellnessCalendar',
      'exportReport', 'chatSearch', 'quickActions', 'moodJournal', 'darkMode',
    ],
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
    features: [
      'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
      'fitness', 'product', 'diary', 'hydration', 'symptom',
      'hair', 'ingredient', 'sun', 'routine', 'freeChat',
      'medicalImage', 'skinClassification', 'treatmentPlan',
      'healthRisk', 'skinAge', 'ingredientConflict',
      'voiceOutput', 'progressPhotos', 'streaks', 'wellnessCalendar',
      'exportReport', 'chatSearch', 'quickActions', 'moodJournal', 'darkMode',
    ],
    highlights: [
      'Everything in Ultimate',
      'Dedicated wellness concierge',
      '25% off all NOORIVA products',
      'Daily dermatologist availability',
      'Bespoke NOORIVA formulations',
      'VIP event invitations',
      'Lifetime membership option',
    ],
    cta: 'Go Supreme',
    popular: false,
  },
};

export const PLAN_ORDER = ['lite', 'glow', 'pro', 'max', 'elite', 'premium', 'ultimate', 'supreme'];

export function isFeatureAllowed(planId, featureId) {
  var plan = NOORIX_PLANS[planId] || NOORIX_PLANS.lite;
  return plan.features.includes(featureId);
}

export function checkDailyLimit(planId, usedToday) {
  var plan = NOORIX_PLANS[planId] || NOORIX_PLANS.lite;
  if (plan.dailyLimit === -1) {
    return { allowed: true, remaining: -1, limit: -1 };
  }
  var remaining = Math.max(0, plan.dailyLimit - usedToday);
  return { allowed: remaining > 0, remaining: remaining, limit: plan.dailyLimit };
}

export function getRequiredPlan(featureId) {
  for (var i = 0; i < PLAN_ORDER.length; i++) {
    var plan = NOORIX_PLANS[PLAN_ORDER[i]];
    if (plan.features.includes(featureId)) return plan;
  }
  return NOORIX_PLANS.glow;
}
