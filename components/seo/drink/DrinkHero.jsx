'use client';

import { Sparkles, ShoppingBag, Star, Plus, Minus } from 'lucide-react';
import { useStore } from '@/lib/store';
import { playPop } from '@/lib/sound';
import { COMMERCE } from '@/lib/noorishGold';
import DrinkPouchStage from './DrinkPouchStage';

export default function DrinkHero({ drink, qty, setQty }) {
  const addToCart = useStore((s) => s.addToCart);

  const handleAdd = () => {
    playPop();
    for (let i = 0; i < qty; i++) addToCart(drink.slug || drink.id);
  };

  const text = encodeURIComponent(`Hi NOORIVA! I want to order ${qty}x pouch(es) of ${drink.name}.`);
  const whatsappUrl = `https://wa.me/${COMMERCE.whatsappNumber}?text=${text}`;

  return (
    <section className="section-shell relative mb-16">
      <div
        className="glass relative z-10 overflow-hidden rounded-[2.5rem] border p-8 shadow-2xl backdrop-blur-2xl md:p-12"
        style={{
          borderColor: `${drink.frameColour}33`,
          background: `linear-gradient(135deg, ${drink.backgroundColour}15, #ffffffef 55%, ${drink.frameColour}10)`,
        }}
      >
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                borderColor: `${drink.frameColour}44`,
                color: drink.frameColour,
                backgroundColor: `${drink.backgroundColour}33`,
              }}
            >
              <Sparkles size={13} className="text-cyan-400 animate-pulse" />
              <span>150ml Bio-Luminescent Jelly Ritual</span>
            </div>

            <h1 className="display-heading text-6xl leading-none md:text-8xl" style={{ color: drink.frameColour }}>
              {drink.name}
            </h1>

            <p className="mt-4 text-2xl font-bold leading-tight md:text-4xl" style={{ color: drink.frameColour }}>
              &ldquo;{drink.slogan}&rdquo;
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink/70">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="font-bold text-ink">4.9 / 5.0</span>
              <span className="text-ink/40">·</span>
              <span className="text-ink/60">128+ Reviews across Pakistan</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                In Stock · COD Available
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
              {drink.notes}. Built on the signature <span className="font-bold text-ink">NOORISH GOLD</span> golden core inside every 150ml pouch for multi-dimensional radiance and hydration.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-ink/10 bg-white/80 p-1 backdrop-blur shadow-sm">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="tap-target flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${drink.frameColour}, #22d3ee)`,
                  boxShadow: `0 10px 30px -5px ${drink.frameColour}60`,
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Bag · ₨ {(COMMERCE.pricePKR * qty).toLocaleString()}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/10 bg-white/75 px-5 py-3 text-xs font-bold text-ink/80 hover:bg-white hover:scale-105 transition"
              >
                WhatsApp Order
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Format', value: '150ml Jelly Pouch' },
                { label: 'Sugar', value: '100% Zero Added' },
                { label: 'Halal', value: 'Certified Purity' },
                { label: 'Delivery', value: 'Nationwide COD' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-ink/10 bg-white/70 p-3 text-center shadow-sm backdrop-blur">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/40">{item.label}</div>
                  <div className="mt-1 text-xs font-bold text-ink/80">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <DrinkPouchStage drink={drink} />
        </div>
      </div>
    </section>
  );
}