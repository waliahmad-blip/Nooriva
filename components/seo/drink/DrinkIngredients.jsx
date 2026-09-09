'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  Leaf,
  Sparkle,
  Droplet,
  ShieldCheck,
  Heart,
  CheckCircle2,
} from 'lucide-react';

export default function DrinkIngredients({ drink }) {
  const ing = drink?.ingredients || {};
  const allIngredients = drink?.allIngredients || [];

  const layers = [
    {
      num: '01',
      title: 'Botanical Fruit Body',
      icon: Leaf,
      color: 'cyan',
      items: ing.fruitBody,
      desc: 'Clarified whole-fruit essences and cold-pressed purees.',
    },
    {
      num: '02',
      title: 'Active Cellular Nutrients',
      icon: Sparkle,
      color: 'purple',
      items: ing.cellularActives,
      desc: 'Bio-available co-factors, amino chelates, and collagen peptides.',
    },
    {
      num: '03',
      title: 'Aromatherapy Waters',
      icon: Droplet,
      color: 'rose',
      items: ing.aromatherapyWaters,
      desc: 'Steam-distilled Arq-e-Gulab, kewra waters, and crushed spices.',
    },
    {
      num: '04 · Proprietary',
      title: 'NOORISH GOLD Core',
      icon: ShieldCheck,
      color: 'cyan',
      secret:
        ing.secretCore ||
        'NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)',
      desc: 'Our signature golden botanical heart that binds every ritual.',
    },
    {
      num: '05',
      title: 'Zero-Sugar Sweetness & Buffer',
      icon: Heart,
      color: 'teal',
      items: ing.baseMatrix,
      desc: 'Non-glycemic rare sugars and electrolyte citrate mineral buffers.',
      span: true,
    },
  ].filter((l) => l.items?.length || l.secret);

  return (
    <section className="section-shell mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-10 max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600">
          <Layers size={13} />
          Master Formulation Blueprint
        </div>
        <h2
          className="mt-3 display-heading text-4xl md:text-5xl"
          style={{ color: drink.frameColour }}
        >
          Categorized Botanical Architecture
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/60 md:text-base">
          Every ingredient is sourced with pharmaceutical purity and zero refined sugars.
          Proprietary ratios remain shielded as trade-secret intellectual property.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className={`glass rounded-[2rem] border border-ink/10 bg-white/80 p-6 backdrop-blur-md shadow-sm ${
                layer.span ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 text-cyan-600">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                    Layer {layer.num}
                  </span>
                  <h3 className="font-bold text-ink">{layer.title}</h3>
                </div>
              </div>
              <p className="mt-2 text-xs text-ink/60">{layer.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {layer.items?.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-900"
                  >
                    <CheckCircle2 size={12} className="text-cyan-600" />
                    {item}
                  </span>
                ))}
                {layer.secret && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3.5 py-1.5 text-xs font-bold text-cyan-900">
                    ✦ {layer.secret}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {allIngredients.length > 0 && (
        <div className="mt-8 rounded-[2rem] border border-ink/10 bg-white/60 p-6 backdrop-blur">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
            Full Ingredient Master Roster (Zero Quantities / Doses Disclosed)
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {allIngredients.map((ingItem, i) => (
              <span
                key={i}
                className="rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-ink/75"
              >
                {ingItem}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}