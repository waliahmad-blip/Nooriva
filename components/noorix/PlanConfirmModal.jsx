'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PlanIcon } from './PlanCard';

export default function PlanConfirmModal({
  confirming,
  selectedPlan,
  selected,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {confirming && selectedPlan && (
        <motion.div
          key="confirm-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: 'rgba(26, 20, 16, 0.6)' }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-[2rem] p-6 sm:p-8 max-w-sm w-full text-center bg-white shadow-2xl border border-ink/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md"
              style={{ background: selectedPlan.gradient }}
            >
              <PlanIcon planId={selected} size={28} color="white" />
            </div>

            <h3 className="text-xl font-bold mb-1 text-ink">{selectedPlan.name}</h3>
            <p className="text-2xl font-bold display-heading mb-1 text-pink-600">
              {selectedPlan.priceDisplay}{selectedPlan.period}
            </p>
            <p className="text-xs text-ink/50 mb-6">{selectedPlan.tagline}</p>

            <div className="space-y-3">
              {selectedPlan.price > 0 && (
                <p className="text-xs text-ink/60 bg-pink-500/5 p-2.5 rounded-xl border border-pink-500/10">
                  Switching your tier immediately unlocks {selectedPlan.featureCount || selectedPlan.features.length} AI wellness features and syncs across your dashboard.
                </p>
              )}
              <button
                type="button"
                onClick={onConfirm}
                className="w-full rounded-2xl bg-ink py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-ink/90 active:scale-95 transition-all"
              >
                {selectedPlan.price > 0 ? 'Activate ' + selectedPlan.name : 'Switch to Free Tier'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full rounded-2xl border border-ink/15 py-3 text-xs sm:text-sm font-bold text-ink hover:bg-ink/5 active:scale-95 transition-all"
              >
                Keep Current Plan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
