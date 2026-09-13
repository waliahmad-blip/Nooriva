'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackToHome from '@/components/ui/BackToHome';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ShoppingBag, ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { playPop } from '@/lib/sound';
import { BRAND, COMMERCE, SKUS, FLAVOR_ARCHITECTURE } from '@/lib/noorishGold';
import DrinkHero from './drink/DrinkHero';
import DrinkTelemetryHud from './drink/DrinkTelemetryHud';
import DrinkIngredients from './drink/DrinkIngredients';

function SkuCard({ sku, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
      <Link href={`/drinks/${sku.slug}`} className="group block h-full">
        <div className="glass h-full rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl" style={{ borderTop: `4px solid ${sku.frameColour}` }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(135deg, ${sku.frameColour}, #22d3ee)` }} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">{sku.illustrationStyle}</div>
              <h3 className="text-lg font-bold" style={{ color: sku.frameColour }}>{sku.name}</h3>
            </div>
          </div>
          <p className="mt-2 text-xs font-semibold italic text-ink/70">&ldquo;{sku.slogan}&rdquo;</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-cyan-600">Explore <ArrowRight size={14} /></div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DrinkShowcase({ drink }) {
  const [qty, setQty] = useState(1);
  const addToCart = useStore((s) => s.addToCart);

  const handleMobileAdd = () => {
    playPop();
    for (let i = 0; i < qty; i++) addToCart(drink.slug || drink.id);
  };

  const [openFaq, setOpenFaq] = useState(null);

  const productFaqs = [
    {
      q: `What are the benefits of ${drink.name}?`,
      a: `${drink.name} is a 150ml squeezable beauty jelly pouch that supports cellular radiance, stress equilibrium, and deep skin hydration with zero added sugar.`,
    },
    {
      q: `Is ${drink.name} Halal and sugar-free in Pakistan?`,
      a: `Yes. ${drink.name} is 100% Halal certified, formulated with zero refined sugars (sweetened with non-glycemic rare allulose and monk fruit), and contains no artificial dyes.`,
    },
    {
      q: `How does delivery and Cash on Delivery work in Pakistan?`,
      a: `NOORIVA provides nationwide Cash on Delivery (COD) across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala in 2–4 business days. Flat ₨ 250 shipping, with free delivery on orders over ₨ 5,000.`,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip pb-36">
      <BackToHome className="fixed top-20 left-4 sm:left-6 z-30" />
      <nav className="section-shell mt-24 mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link href="/glow-drinks" className="hover:text-ink">Glow Drinks</Link>
        <span>/</span>
        <span className="text-ink font-bold">{drink.name}</span>
      </nav>

      <DrinkHero drink={drink} qty={qty} setQty={setQty} />
      <DrinkTelemetryHud />
      <DrinkIngredients drink={drink} />

      <section className="section-shell mb-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl" style={{ color: drink.frameColour }}>Sensory Aroma & Palate Architecture</h2>
          <p className="mt-3 text-sm text-ink/60">Perfume-grade formulation delivering clean top-notes and a lasting botanical finish.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FLAVOR_ARCHITECTURE.map((layer) => (
            <div key={layer.layer} className="glass rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-ink/40">{layer.layer}</div>
              <p className="mt-3 text-sm text-ink/70">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product FAQ Accordion matching Schema.org FAQPage */}
      <section className="section-shell mb-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 mb-3">
            <HelpCircle size={13} />
            Frequently Asked Questions
          </div>
          <h2 className="display-heading text-3xl md:text-4xl text-ink">
            Everything About {drink.name}
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Formulation, delivery, and authenticity verified for Pakistan.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {productFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass overflow-hidden rounded-2xl border border-ink/10 bg-white/80 backdrop-blur-md transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-ink"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-cyan-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-ink/5 p-5 pt-3 text-xs md:text-sm leading-relaxed text-ink/75">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-shell mb-24">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Explore All 12 Rituals</h2>
          <p className="mt-2 text-sm text-ink/60">One golden secret core. Twelve jewel-toned radiance expressions.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SKUS.map((sku, index) => (<SkuCard key={sku.id} sku={sku} index={index} />))}
        </div>
      </section>

      <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-xl border-t border-ink/10 flex items-center justify-between gap-3 md:hidden shadow-2xl">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-ink truncate">{drink.name}</p>
          <p className="text-[11px] font-semibold text-cyan-600">₨ {(COMMERCE.pricePKR * qty).toLocaleString()} · {qty}x Pouch</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleMobileAdd} className="tap-target rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-lg flex items-center gap-1.5" style={{ background: `linear-gradient(135deg, ${drink.frameColour}, #22d3ee)` }}>
            <ShoppingBag size={14} /> Add to Bag
          </button>
        </div>
      </div>
    </main>
  );
}
