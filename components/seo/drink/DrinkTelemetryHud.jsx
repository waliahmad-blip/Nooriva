'use client';

import { motion } from 'framer-motion';

export default function DrinkTelemetryHud() {
  return (
    <section className="section-shell mb-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-6 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Photonic Crocin
            </span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="mt-3 text-2xl font-black text-ink">Ultra-Pure</div>
          <p className="mt-1 text-xs font-semibold text-cyan-600">
            Kashmiri Saffron Bioactive Core
          </p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-ink/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-6 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Bio-Vitamin C
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="mt-3 text-2xl font-black text-ink">Max Bioactive</div>
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            Clarified Amla & Whole Citrus
          </p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-ink/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-6 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Barrier Support
            </span>
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          </div>
          <div className="mt-3 text-2xl font-black text-ink">Omega-7 Shield</div>
          <p className="mt-1 text-xs font-semibold text-purple-600">
            Clarified Sea Buckthorn Hydrolipid
          </p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-ink/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-6 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Glycemic Index
            </span>
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
          </div>
          <div className="mt-3 text-2xl font-black text-ink">0.0 GI</div>
          <p className="mt-1 text-xs font-semibold text-pink-600">
            Rare Allulose & Monk Fruit Base
          </p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-ink/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}