'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Crown, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { NOORIX_PLANS, PLAN_ORDER } from '@/lib/noorix-plans';
import PlanCard, { PlanIcon } from './PlanCard';
import PlanMatrix from './PlanMatrix';
import PlanConfirmModal from './PlanConfirmModal';

export default function NoorixPlans({ isOpen = true, onClose, isPage = false }) {
  var noorixPlan = useStore(function(s) { return s.noorixPlan; });
  var setNoorixPlan = useStore(function(s) { return s.setNoorixPlan; });

  var [billingCycle, setBillingCycle] = useState('monthly');
  var [tab, setTab] = useState('all');
  var [selected, setSelected] = useState(null);
  var [confirming, setConfirming] = useState(false);
  var [activatedMessage, setActivatedMessage] = useState(null);

  var filteredPlanIds = useMemo(function() {
    if (tab === 'core') return ['lite', 'glow', 'pro', 'max'];
    if (tab === 'vip') return ['elite', 'premium', 'ultimate', 'supreme'];
    return PLAN_ORDER;
  }, [tab]);

  function handleSelect(planId) {
    if (planId === noorixPlan) return;
    setSelected(planId);
    setConfirming(true);
  }

  function handleConfirm() {
    if (!selected) return;
    setNoorixPlan(selected);
    var planObj = NOORIX_PLANS[selected];
    setActivatedMessage('Activated ' + (planObj ? planObj.name : selected.toUpperCase()) + '!');
    setTimeout(function() { setActivatedMessage(null); }, 4000);
    setConfirming(false);
    setSelected(null);
    if (onClose && !isPage) onClose();
  }

  function handleCancel() {
    setConfirming(false);
    setSelected(null);
  }

  var selectedPlan = selected ? NOORIX_PLANS[selected] : null;

  var content = (
    <div className={'w-full ' + (isPage ? 'max-w-7xl mx-auto px-4 sm:px-6 py-8' : 'max-w-5xl max-h-[85vh] overflow-y-auto relative')}>
      {!isPage && onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors z-20"
          aria-label="Close plans"
        >
          <X size={18} />
        </button>
      )}

      <AnimatePresence>
        {activatedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-2xl"
          >
            <CheckCircle2 size={18} />
            {activatedMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full opacity-25"
              style={{ background: 'conic-gradient(from 0deg, #ff8fb2, #a78bfa, #22d3ee, #ff8fb2)', filter: 'blur(10px)' }}
            />
            <div className="relative bg-white shadow-md rounded-full p-4 border border-ink/5">
              <Sparkles size={32} className="text-pink-500" />
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-pink-600">
          <Crown size={12} /> NOORIX INTELLIGENCE TIERS
        </span>
        <h1 className="display-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-3 text-ink">
          Elevate Your Daily Glow
        </h1>
        <p className="text-sm sm:text-base text-ink/60 max-w-xl mx-auto">
          From intelligent daily habit tracking to 24/7 dedicated dermatologist concierge, unlock your personalized longevity formula.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={'text-xs sm:text-sm font-semibold ' + (billingCycle === 'monthly' ? 'text-ink' : 'text-ink/40')}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={function() { setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly'); }}
            aria-label="Toggle billing cycle"
            className="relative h-7 w-14 rounded-full bg-ink/15 p-1 transition-colors focus:outline-none"
          >
            <motion.div
              animate={{ x: billingCycle === 'annual' ? 26 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="h-5 w-5 rounded-full bg-ink shadow-sm"
            />
          </button>
          <span className={'text-xs sm:text-sm font-semibold flex items-center gap-1.5 ' + (billingCycle === 'annual' ? 'text-ink' : 'text-ink/40')}>
            Annual Pass
            <span className="rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Save 20%
            </span>
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All 8 Tiers' },
            { id: 'core', label: 'Core Wellness (Lite - Max)' },
            { id: 'vip', label: 'VIP Concierge (Elite - Supreme)' },
          ].map(function(t) {
            var active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={function() { setTab(t.id); }}
                className={
                  'rounded-full px-4 py-1.5 text-xs font-bold transition-all ' +
                  (active
                    ? 'bg-ink text-white shadow-md'
                    : 'bg-white/80 border border-ink/10 text-ink/70 hover:bg-white')
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlanIds.map(function(planId, idx) {
          return (
            <PlanCard
              key={planId}
              planId={planId}
              isCurrent={noorixPlan === planId}
              billingCycle={billingCycle}
              onSelect={handleSelect}
              index={idx}
            />
          );
        })}
      </div>

      <PlanMatrix />

      <div className="text-center mt-10 space-y-1">
        <p className="text-xs text-ink/40">
          All memberships include WhatsApp support · Cancel anytime · Instant plan sync
        </p>
        <p className="text-xs font-mono text-ink/30">
          Powered by Noorix AI · NOORIVA — Drink Your Glow
        </p>
      </div>
    </div>
  );
  return (
    <>
      {isPage ? (
        <div className="relative min-h-screen bg-[#faf7f2] text-ink pt-20 pb-28">
          {content}
        </div>
      ) : (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="plans-modal-overlay"
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
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-5xl"
              >
                {content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <PlanConfirmModal
        confirming={confirming}
        selectedPlan={selectedPlan}
        selected={selected}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
