'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Camera, Salad, Pill, Moon, Sun, Dumbbell, ScanLine, BookOpen, GlassWater, Stethoscope, Scissors, Beaker, CloudSun, Heart, MessageCircle, Sparkles } from 'lucide-react';

var TUTORIAL_STEPS = [
  {
    icon: Sparkles,
    color: '#a78bfa',
    title: 'Welcome to Noorix',
    subtitle: 'Your AI Health & Beauty Companion',
    description: 'Noorix is your personal AI-powered wellness assistant. It analyzes your skin, nutrition, sleep, stress, and more — all from your phone. No typing required, just tap, snap, or speak.',
    tip: 'Noorix uses advanced AI to give you personalized health guidance. It never stores your data.',
  },
  {
    icon: Camera,
    color: '#ff8fb2',
    title: 'Skin Photo Analysis',
    subtitle: 'AI Dermatology Triage',
    description: 'Upload a photo of any skin concern — acne, dark spots, rashes, or irritation. Noorix performs differential triage, detects emergency red flags, and gives you a personalized holistic coaching plan.',
    tip: 'Works best with clear, well-lit photos. Tap the area tags to tell Noorix where the issue is.',
  },
  {
    icon: Salad,
    color: '#5eead4',
    title: 'Meal Nutrition Scan',
    subtitle: 'Snap Your Food, Know Your Glow',
    description: 'Photograph any meal and Noorix breaks down every macro and micronutrient. It rates each nutrient for skin health impact and suggests improvements to maximize your glow from within.',
    tip: 'Include the full plate in the photo. Noorix identifies ingredients automatically.',
  },
  {
    icon: Pill,
    color: '#a78bfa',
    title: 'Supplement Advisor',
    subtitle: 'Your Personalized Stack',
    description: 'Tell Noorix your health goals — glowing skin, stronger hair, better energy — and receive a personalized supplement stack with exact dosages, timing, and interaction warnings.',
    tip: 'Select multiple concerns for a comprehensive recommendation. Noorix knows NOORIVA products too.',
  },
  {
    icon: Moon,
    color: '#6366f1',
    title: 'Sleep Coach',
    subtitle: 'Rest Better, Glow Better',
    description: 'Log your sleep patterns and Noorix analyzes how rest affects your skin. Get circadian rhythm fixes, bedtime routines, and the perfect NOORIVA flavor for nighttime recovery.',
    tip: 'Use the counter to log hours and the emoji cards for quality. Noorix connects sleep to skin health.',
  },
  {
    icon: Sun,
    color: '#f59e0b',
    title: 'Stress & Mood Tracker',
    subtitle: 'Mind-Skin Connection',
    description: 'Quick emoji-based mood check-in that correlates your emotional state with skin flare-ups. Noorix provides coping strategies, stress-fighting nutrition, and calming rituals.',
    tip: 'Check in daily for the best pattern detection. Noorix learns your stress-skin connection over time.',
  },
  {
    icon: Dumbbell,
    color: '#ef4444',
    title: 'Fitness & Skin',
    subtitle: 'Workout-Smart Skincare',
    description: 'Tell Noorix your workout type and intensity. Receive pre and post-exercise skincare protocols, sweat-acne prevention tips, and the ideal NOORIVA timing for recovery.',
    tip: 'Select your workout type and frequency. Noorix customizes advice for your specific exercise.',
  },
  {
    icon: ScanLine,
    color: '#22d3ee',
    title: 'Product Scanner',
    subtitle: 'Decode Any Product',
    description: 'Photograph any product label and Noorix decodes every ingredient for your specific skin type. Get safety ratings, benefit analysis, and a clear verdict on whether to use it.',
    tip: 'Focus the camera on the ingredients list. Noorix reads and analyzes each ingredient.',
  },
  {
    icon: Stethoscope,
    color: '#10b981',
    title: 'Medical Imaging',
    subtitle: 'Advanced AI Analysis',
    description: 'Upload medical images for clinical-grade AI analysis. Noorix identifies conditions, assesses severity, and tells you exactly when to see a doctor. Emergency red-flag detection included.',
    tip: 'For skin lesions, rashes, or wounds. Noorix never replaces a doctor but helps you understand urgency.',
  },
  {
    icon: Heart,
    color: '#ec4899',
    title: 'Treatment Plans',
    subtitle: 'Your Personalized Roadmap',
    description: 'Get a complete treatment plan with phases, timelines, product recommendations, and lifestyle changes. Noorix architects your journey from current state to your glow goals.',
    tip: 'Be specific about your condition and what you have tried. The more detail, the better the plan.',
  },
  {
    icon: MessageCircle,
    color: '#1A1410',
    title: 'Free Chat',
    subtitle: 'Ask Anything',
    description: 'Have a free-form conversation with Noorix about anything — skin concerns, nutrition questions, product recommendations, or just chat about your wellness journey. Multi-turn memory included.',
    tip: 'Noorix remembers your conversation context. Ask follow-up questions for deeper guidance.',
  },
  {
    icon: Sparkles,
    color: '#f59e0b',
    title: 'Voice Input',
    subtitle: 'Speak, Do Not Type',
    description: 'Tap the microphone button and speak your question. Noorix converts your speech to text and responds. Perfect for hands-free use while cooking, exercising, or relaxing.',
    tip: 'Works best in quiet environments. Speak clearly and Noorix will understand you.',
  },
  {
    icon: Moon,
    color: '#1e293b',
    title: 'Dark Mode',
    subtitle: 'Night-Friendly Theme',
    description: 'Switch to a beautiful dark theme for nighttime use. Easier on the eyes, better for sleep, and the Noorix orb looks stunning against the dark background.',
    tip: 'Toggle from the feature grid. Your preference is saved automatically.',
  },
  {
    icon: Sparkles,
    color: '#a78bfa',
    title: 'Your Glow Journey',
    subtitle: 'Track, Improve, Glow',
    description: 'Every interaction with Noorix earns you glow points. Track your ritual streaks, unlock achievements, and watch your wellness score grow. Consistency is the secret to radiant skin.',
    tip: 'Check in daily to maintain your streak. Your glow score appears on the Noorix landing page.',
  },
];

export default function NoorixTutorial({ isOpen, onClose }) {
  var stepState = useState(0);
  var step = stepState[0];
  var setStep = stepState[1];

  useEffect(function() {
    if (isOpen) setStep(0);
  }, [isOpen]);

  var current = TUTORIAL_STEPS[step];
  var Icon = current.icon;

  function next() {
    if (step < TUTORIAL_STEPS.length - 1) setStep(step + 1);
    else if (onClose) onClose();
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="tutorial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center p-4"
          style={{ background: 'rgba(250, 247, 242, 0.97)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg"
          >
            {/* Close */}
            <div className="flex justify-end mb-4">
              <button onClick={onClose} className="rounded-full bg-ink/5 p-2.5 hover:bg-ink/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Card */}
            <div className="glass rounded-[2rem] p-8 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: current.color }} />

              {/* Icon */}
              <motion.div
                key={step}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl mb-6" style={{ background: current.color + '18' }}>
                  <Icon size={36} style={{ color: current.color }} />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                key={'content-' + step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: current.color }}>
                  {current.subtitle}
                </p>
                <h3 className="text-2xl font-bold display-heading mb-4">{current.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-4">{current.description}</p>

                {/* Tip */}
                <div className="glass rounded-xl p-3 text-left mb-6">
                  <p className="text-[10px] font-semibold text-ink/40 uppercase tracking-wider mb-1">Pro Tip</p>
                  <p className="text-xs text-ink/60">{current.tip}</p>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between relative z-10">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="flex items-center gap-1 text-sm text-ink/40 hover:text-ink/70 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {/* Progress */}
                <div className="flex items-center gap-1">
                  {TUTORIAL_STEPS.map(function(_, i) {
                    return (
                      <div
                        key={i}
                        className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                        onClick={function() { setStep(i); }}
                        style={{
                          width: i === step ? 20 : 6,
                          background: i === step ? current.color : i < step ? current.color + '60' : 'rgba(26,20,16,0.1)',
                        }}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={next}
                  className="flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: current.color }}
                >
                  {step === TUTORIAL_STEPS.length - 1 ? 'Start Glowing' : 'Next'} <ChevronRight size={16} />
                </button>
              </div>

              {/* Step counter */}
              <p className="text-[10px] text-ink/30 mt-4 relative z-10">
                {step + 1} of {TUTORIAL_STEPS.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
