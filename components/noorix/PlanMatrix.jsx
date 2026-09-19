'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

var ROWS = [
  ['Daily AI Scans', '5/day', '25/day', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['All 54 Features', '9 Core', 'All 54', 'All 54', 'All 54', 'All 54', 'All 54', 'All 54', 'All 54'],
  ['Engine Speed', 'Standard', 'Fast', 'Priority', 'Priority', 'Dedicated', 'Dedicated', 'VIP Node', 'VIP Node'],
  ['Family Accounts', '—', '—', '—', '3 Users', '3 Users', '5 Users', 'Unlimited', 'Unlimited'],
  ['Bio-Age & Clinical', '—', '—', '—', '—', 'Included', 'Included', 'Included', 'Included'],
  ['Dermatologist', '—', '—', '—', 'Monthly', '1-on-1', 'Quarterly', 'Bi-Weekly', 'Daily VIP'],
  ['Product Discount', '—', '—', '5% Off', '10% Off', '15% Off', '20% Off', '20% Off', '25% Off'],
  ['Bespoke Blends', '—', '—', '—', '—', '—', 'Custom AI', 'Lab Custom', 'Concierge'],
];

var FAQS = [
  { q: 'Can I switch or cancel my plan at any time?', a: 'Yes. Upgrade, downgrade, or cancel whenever you like from your account dashboard with zero cancellation fees.' },
  { q: 'How does the Annual Glow Pass discount work?', a: 'Choosing Annual billing saves 20% off standard monthly rates with 12 months uninterrupted priority AI access.' },
  { q: 'What is included in dermatologist consultations?', a: 'Plans from Max and above include reviews by certified wellness and skin specialists who analyze your Noorix scans.' },
  { q: 'How does Family Sharing work?', a: 'Max, Premium, and Ultimate allow you to link separate family profiles under one primary subscription with private scans.' },
];

export default function PlanMatrix() {
  var [showMatrix, setShowMatrix] = useState(false);
  var [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-8 mt-12">
      <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 backdrop-blur-xl shadow-lg">
        <button
          type="button"
          onClick={() => setShowMatrix(!showMatrix)}
          className="w-full flex items-center justify-between text-left focus:outline-none"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <Sparkles size={18} className="text-pink-500" />
              Full Tier Feature Comparison Matrix
            </h2>
            <p className="text-xs text-ink/50 mt-0.5">
              Compare AI capabilities, clinical features, and concierge benefits across all 8 tiers
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink/70">
            {showMatrix ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        <AnimatePresence>
          {showMatrix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-x-auto mt-6 pt-6 border-t border-ink/10"
            >
              <table className="w-full min-w-[650px] text-xs">
                <thead>
                  <tr className="border-b border-ink/10 text-ink/50 font-bold uppercase tracking-wider text-[10px]">
                    <th className="text-left py-2.5 px-3">Feature</th>
                    <th className="text-center py-2.5 px-1.5">Lite</th>
                    <th className="text-center py-2.5 px-1.5">Glow</th>
                    <th className="text-center py-2.5 px-1.5">Pro</th>
                    <th className="text-center py-2.5 px-1.5">Max</th>
                    <th className="text-center py-2.5 px-1.5">Elite</th>
                    <th className="text-center py-2.5 px-1.5">Prem</th>
                    <th className="text-center py-2.5 px-1.5">Ult</th>
                    <th className="text-center py-2.5 px-1.5 font-bold text-pink-600">Supreme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {ROWS.map(function(row, idx) {
                    return (
                      <tr key={idx} className="hover:bg-ink/[0.02]">
                        <td className="py-2.5 px-3 font-semibold text-ink">{row[0]}</td>
                        {row.slice(1).map((val, i) => (
                          <td key={i} className={`text-center py-2.5 px-1.5 ${i === 7 ? 'font-bold text-pink-600' : 'text-ink/70'}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-3xl border border-ink/10 bg-white/60 p-6 backdrop-blur-xl">
        <h2 className="text-lg sm:text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <HelpCircle size={18} className="text-violet-500" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map(function(faq, idx) {
            var isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl border border-ink/5 bg-white p-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-ink"
                >
                  <span>{faq.q}</span>
                  <span className="text-ink/40 ml-2">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-ink/70 leading-relaxed border-t border-ink/5 pt-2.5">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
