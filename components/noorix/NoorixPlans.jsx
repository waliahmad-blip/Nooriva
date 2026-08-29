'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Crown, Zap, Shield } from 'lucide-react';
import { useStore } from '@/lib/store';
import { NOORIX_PLANS, PLAN_ORDER } from '@/lib/noorix-plans';

var PLAN_ICONS = { lite: Sparkles, glow: Zap, pro: Crown, max: Shield };

function PlanIcon({ planId, size, color }) {
  var Icon = PLAN_ICONS[planId] || Sparkles;
  return <Icon size={size} style={{ color: color }} />;
}

export default function NoorixPlans({ isOpen, onClose }) {
  var noorixPlan = useStore(function(s) { return s.noorixPlan; });
  var setNoorixPlan = useStore(function(s) { return s.setNoorixPlan; });
  var [selected, setSelected] = useState(null);
  var [confirming, setConfirming] = useState(false);

  function handleSelect(planId) {
    if (planId === noorixPlan) return;
    setSelected(planId);
    setConfirming(true);
  }

  function handleConfirm() {
    if (!selected) return;
    setNoorixPlan(selected);
    setConfirming(false);
    setSelected(null);
    if (onClose) onClose();
  }

  function handleCancel() {
    setConfirming(false);
    setSelected(null);
  }

  var selectedPlan = selected ? NOORIX_PLANS[selected] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="plans-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(250, 247, 242, 0.95)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors z-10"
              aria-label="Close plans"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ background: 'conic-gradient(from 0deg, #ff8fb2, #a78bfa, #67e8f9, #ff8fb2)', filter: 'blur(8px)' }}
                  />
                  <div className="relative bg-cream rounded-full p-4">
                    <Sparkles size={32} className="text-ink" />
                  </div>
                </div>
              </div>
              <h2 className="display-heading text-3xl md:text-4xl mb-2">Choose Your Glow Plan</h2>
              <p className="text-sm text-ink/50 max-w-md mx-auto">
                Unlock the full power of Noorix — your AI health, beauty, and wellness companion
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PLAN_ORDER.map(function(planId, i) {
                var plan = NOORIX_PLANS[planId];
                var isCurrent = noorixPlan === planId;
                var isPopular = plan.popular;

                return (
                  <motion.div
                    key={planId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={
                      'relative glass rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 ' +
                      (isPopular ? 'ring-2 ring-ink/20 shadow-lg' : '') +
                      (isCurrent ? 'ring-2 ring-ink/40' : '')
                    }
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-[10px] font-bold text-cream uppercase tracking-wider whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    {isCurrent && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                        style={{ background: plan.color, color: 'white' }}
                      >
                        Current Plan
                      </div>
                    )}

                    {/* Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: plan.color + '20' }}>
                        <PlanIcon planId={planId} size={20} color={plan.color} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{plan.name}</h3>
                        <p className="text-[10px] text-ink/40">{plan.tagline}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-bold display-heading">{plan.priceDisplay}</span>
                      {plan.period && <span className="text-sm text-ink/40">{plan.period}</span>}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2.5 mb-6">
                      {plan.highlights.map(function(h, hi) {
                        return (
                          <li key={hi} className="flex items-start gap-2 text-sm text-ink/70">
                            <Check size={15} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                            <span>{h}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={function() { handleSelect(planId); }}
                      disabled={isCurrent}
                      className={
                        'w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 ' +
                        (isCurrent
                          ? 'bg-ink/5 text-ink/30 cursor-default'
                          : isPopular
                          ? 'bg-ink text-cream hover:shadow-lg hover:-translate-y-0.5'
                          : 'border-2 border-ink/15 text-ink hover:bg-ink hover:text-cream')
                      }
                    >
                      {isCurrent ? 'Current Plan' : plan.cta}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 space-y-1">
              <p className="text-xs text-ink/35">All plans include WhatsApp support · Cancel anytime · No contracts</p>
              <p className="text-xs text-ink/35">Powered by Noorix AI · NOORIVA — Drink Your Glow</p>
            </div>
          </motion.div>

          {/* Confirmation Modal */}
          <AnimatePresence>
            {confirming && selectedPlan && (
              <motion.div
                key="confirm-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                style={{ background: 'rgba(26, 20, 16, 0.5)' }}
                onClick={handleCancel}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass rounded-[2rem] p-8 max-w-sm w-full text-center"
                  onClick={function(e) { e.stopPropagation(); }}
                >
                  <div
                    className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: selectedPlan.gradient }}
                  >
                    <PlanIcon planId={selected} size={28} color="white" />
                  </div>

                  <h3 className="text-xl font-bold mb-1">{selectedPlan.name}</h3>
                  <p className="text-2xl font-bold display-heading mb-1">
                    {selectedPlan.priceDisplay}{selectedPlan.period}
                  </p>
                  <p className="text-xs text-ink/50 mb-6">{selectedPlan.tagline}</p>

                  <div className="space-y-3">
                    {selectedPlan.price > 0 && (
                      <p className="text-sm text-ink/60">
                        Payment integration coming soon. For now, you can preview this plan.
                      </p>
                    )}
                    <button
                      onClick={handleConfirm}
                      className="btn-primary w-full !py-3"
                    >
                      {selectedPlan.price > 0 ? 'Preview ' + selectedPlan.name : 'Switch to Free Plan'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary w-full !py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
