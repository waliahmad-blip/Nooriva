'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { flavors } from '@/lib/data';

const QUESTIONS = [
  {
    q: 'What time of day do you need the most energy?',
    options: [
      { label: 'Morning sunrise', value: 'morning' },
      { label: 'Afternoon slump', value: 'afternoon' },
      { label: 'Evening wind-down', value: 'evening' },
      { label: 'All day glow', value: 'allday' },
    ],
  },
  {
    q: 'What flavor profile do you love?',
    options: [
      { label: 'Floral & sweet', value: 'floral' },
      { label: 'Tropical & tangy', value: 'tropical' },
      { label: 'Rich & warm', value: 'rich' },
      { label: 'Fresh & cool', value: 'fresh' },
      { label: 'Berry & bold', value: 'berry' },
    ],
  },
  {
    q: 'What is your biggest beauty goal?',
    options: [
      { label: 'Glowing skin', value: 'glow' },
      { label: 'Stronger hair', value: 'hair' },
      { label: 'More energy', value: 'energy' },
      { label: 'Better sleep', value: 'sleep' },
      { label: 'Anti-aging', value: 'antiaging' },
    ],
  },
];

const RESULTS = {
  'morning-floral-glow': 'aurora-rose',
  'morning-tropical-energy': 'sunrise-solstice',
  'morning-rich-antiaging': 'golden-zenith',
  'afternoon-berry-glow': 'berry-nebula',
  'afternoon-fresh-energy': 'celestial-mint',
  'evening-floral-sleep': 'violet-eclipse',
  'evening-berry-sleep': 'berry-nebula',
  'allday-tropical-glow': 'sunrise-solstice',
  'allday-fresh-hair': 'celestial-mint',
  default: 'aurora-rose',
};

export default function FlavorQuiz({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const addToCart = useStore((s) => s.addToCart);
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);

  const select = (option) => {
    const newAnswers = answers.concat([option.value]);
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const key = newAnswers.join('-');
      const flavorId = RESULTS[key] || RESULTS.default;
      setResult(flavors.find((f) => f.id === flavorId) || flavors[0]);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const question = QUESTIONS[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] flex items-center justify-center p-4"
          style={{ background: 'rgba(250, 247, 242, 0.97)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="flex justify-end mb-4">
              <button onClick={onClose} className="rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors" aria-label="Close quiz">
                <X size={18} />
              </button>
            </div>
            <div className="glass rounded-[2rem] p-8 text-center">
              {!result ? (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="text-3xl mb-4">✨</div>
                  <p className="text-xs text-ink/40 font-medium mb-2">Question {step + 1} of {QUESTIONS.length}</p>
                  <h3 className="text-xl font-bold display-heading mb-6">{question.q}</h3>
                  <div className="space-y-2">
                    {question.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => select(opt)}
                        className="w-full rounded-xl border border-ink/10 bg-white/60 px-4 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-cream transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-xs text-ink/40 font-medium mb-2">Your perfect match</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="h-12 w-12 rounded-full" style={{ background: result.color, boxShadow: `0 8px 24px ${result.color}44` }} />
                    <h3 className="text-2xl font-bold display-heading">{result.name}</h3>
                  </div>
                  <p className="text-sm text-ink/60 mb-6">This flavor matches your energy, taste, and beauty goals perfectly.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { addToCart(result.id); onClose(); }}
                      className="btn-primary flex-1 !py-3"
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => { setSelectedFlavor(result.id); reset(); onClose(); }}
                      className="btn-secondary flex-1 !py-3"
                    >
                      Explore
                    </button>
                  </div>
                  <button onClick={reset} className="mt-4 text-xs text-ink/40 hover:text-ink/70 transition-colors">
                    Retake quiz
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
