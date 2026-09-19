'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, Shield, Star, Gem, Diamond } from 'lucide-react';
import { NOORIX_PLANS } from '@/lib/noorix-plans';

var PLAN_ICONS = {
  lite: Sparkles,
  glow: Zap,
  pro: Crown,
  max: Shield,
  elite: Star,
  premium: Gem,
  ultimate: Diamond,
  supreme: Crown
};

export function PlanIcon({ planId, size = 20, color }) {
  var Icon = PLAN_ICONS[planId] || Sparkles;
  return <Icon size={size} style={{ color: color }} />;
}

export default function PlanCard({
  planId,
  isCurrent,
  billingCycle,
  onSelect,
  index = 0,
}) {
  var plan = NOORIX_PLANS[planId];
  if (!plan) return null;

  var isPopular = plan.popular;

  var priceDisplay = plan.priceDisplay;
  var period = plan.period;
  var original = null;

  if (plan.price > 0 && billingCycle === 'annual') {
    var discounted = Math.round(plan.price * 0.8);
    priceDisplay = 'Rs ' + discounted.toLocaleString();
    period = '/mo billed annually';
    original = plan.priceDisplay + '/mo';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={
        'relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ' +
        (isPopular
          ? 'bg-gradient-to-b from-white to-pink-50/40 border-2 border-pink-400/50 shadow-xl shadow-pink-500/10 ring-2 ring-pink-400/20'
          : 'bg-white/90 border border-ink/10 shadow-md hover:shadow-xl hover:-translate-y-1')
      }
    >
      {/* Badges */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}
      {isCurrent && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap"
          style={{ background: plan.color }}
        >
          Current Active Plan
        </div>
      )}

      <div>
        {/* Top Icon & Tier Label */}
        <div className="flex items-center justify-between mb-4 mt-1">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
            style={{ background: plan.gradient }}
          >
            <PlanIcon planId={planId} size={22} color="white" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink/40">
            {planId}
          </span>
        </div>

        <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
        <p className="text-xs text-ink/60 mt-1 mb-4 min-h-[32px]">{plan.tagline}</p>

        {/* Pricing */}
        <div className="mb-5 pb-4 border-b border-ink/10">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {priceDisplay}
            </span>
            {period && (
              <span className="text-xs font-semibold text-ink/50">
                {period}
              </span>
            )}
          </div>
          {original && (
            <p className="text-[11px] text-ink/40 line-through mt-0.5">
              Regular: {original}
            </p>
          )}
          <p className="text-[11px] font-bold text-pink-600 mt-1">
            {plan.dailyLimit === -1 ? 'Unlimited daily queries' : plan.dailyLimit + ' queries/day'} • {plan.featureCount || plan.features.length} features
          </p>
        </div>

        {/* Highlights List */}
        <ul className="space-y-2.5 mb-6 text-xs text-ink/80">
          {plan.highlights.map(function(h, i) {
            return (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <Check size={14} className="shrink-0 mt-0.5" style={{ color: plan.color }} />
                <span>{h}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Button CTA */}
      <button
        type="button"
        onClick={() => onSelect(planId)}
        disabled={isCurrent}
        className={
          'w-full rounded-2xl py-3 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ' +
          (isCurrent
            ? 'bg-ink/5 text-ink/30 cursor-default'
            : isPopular
            ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg hover:shadow-pink-500/25 hover:brightness-105'
            : 'bg-ink text-white hover:bg-ink/90 shadow-sm')
        }
      >
        {isCurrent ? 'Current Plan' : (plan.price === 0 ? 'Switch to Free' : 'Select ' + plan.name)}
      </button>
    </motion.div>
  );
}
