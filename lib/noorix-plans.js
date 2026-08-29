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
};

export const PLAN_ORDER = ['lite', 'glow', 'pro', 'max'];

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
