'use client';

import { motion } from 'framer-motion';
import {
  Camera, Moon, Pill, Dumbbell, Salad, Sun,
  ScanLine, BookOpen, GlassWater, Stethoscope,
  Sparkles, ChevronRight,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import NoorixOrb from './NoorixOrb';

const PREVIEW_FEATURES = [
  { id: 'skinPhoto', icon: Camera, color: '#ff8fb2' },
  { id: 'mealPhoto', icon: Salad, color: '#5eead4' },
  { id: 'supplement', icon: Pill, color: '#a78bfa' },
  { id: 'sleep', icon: Moon, color: '#6366f1' },
  { id: 'stress', icon: Sun, color: '#f59e0b' },
  { id: 'fitness', icon: Dumbbell, color: '#ef4444' },
  { id: 'product', icon: ScanLine, color: '#22d3ee' },
  { id: 'diary', icon: BookOpen, color: '#d946ef' },
  { id: 'hydration', icon: GlassWater, color: '#0ea5e9' },
  { id: 'symptom', icon: Stethoscope, color: '#10b981' },
];

export default function NoorixEntrance() {
  const t = useT();
  const toggleNoorix = useStore((s) => s.toggleNoorix);

  return (
    <section className="section-shell py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 cursor-pointer group"
        onClick={toggleNoorix}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleNoorix()}
        aria-label="Open Noorix AI assistant"
      >
        {/* Background glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)' }}
        />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Orb + Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <NoorixOrb size={80} />
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img
                  src="/noorix/logo.svg"
                  alt="Noorix"
                  className="h-10 w-auto"
                  onError={(e) => {
                    // Fallback to text if logo not found
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <span
                  className="display-heading holo-text text-4xl hidden"
                  style={{ display: 'none' }}
                >
                  Noorix
                </span>
              </div>
              <p className="text-sm text-ink/50 mt-1">AI-Powered Health & Beauty</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="display-heading text-2xl md:text-3xl mb-2">
              Your Personal Glow Intelligence
            </h3>
            <p className="text-sm text-ink/60 max-w-lg leading-relaxed mb-6">
              14 AI-powered features — from skin analysis to nutrition coaching,
              sleep optimization to supplement guidance. Just tap, snap, or select.
              No typing required.
            </p>

            {/* Feature icons preview */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {PREVIEW_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: `${f.color}15`,
                      color: f.color,
                      border: `1px solid ${f.color}30`,
                    }}
                  >
                    <Icon size={13} />
                    {t(`noorix.feature.${f.id}`)}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="btn-primary !py-3 !px-6 text-sm group-hover:shadow-lg transition-shadow">
                <Sparkles size={16} />
                Try Noorix Free
              </span>
              <span className="text-xs text-ink/40 flex items-center gap-1">
                No account needed
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
