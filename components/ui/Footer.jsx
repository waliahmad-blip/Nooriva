'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  ChevronUp,
  Send,
  Phone,
  Mail,
  Truck,
  CreditCard,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

const shopLinks = [
  { label: 'NOORISH GOLD', href: '/noorish-gold' },
  { label: 'Energy Drinks', href: '/energy-drinks' },
  { label: 'Glow Drinks', href: '/glow-drinks' },
  { label: 'Fresh Drinks', href: '/fresh-drinks' },
];

const exploreLinks = [
  { label: 'Meet Noorix', href: '/noorix/chat' },
  { label: 'NOORIVA Club', href: '/club' },
  { label: 'Our Origin', href: '/story' },
  { label: 'Botanicals', href: '/ingredients' },
  { label: 'Weather Glow', href: '/weather' },
  { label: 'Glow Quiz', href: '/quiz' },
  { label: 'Ritual of the Day', href: '/ritual-of-the-day' },
  { label: 'Ambassador Hub', href: '/ambassador' },
  { label: 'My Dashboard', href: '/account' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Shipping & Delivery', href: '/shipping' },
  { label: 'Refund Policy', href: '/refund' },
];

const paymentMethods = ['Cash on Delivery', 'JazzCash', 'EasyPaisa', 'Bank Transfer'];

const trustBadges = [
  { icon: Truck, label: 'Free delivery over ₨5,000' },
  { icon: ShieldCheck, label: 'Halal-compliant' },
  { icon: RotateCcw, label: '7-day easy returns' },
  { icon: CreditCard, label: 'Secure checkout' },
];

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 2500);
  }

  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-40 md:bottom-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-2 rounded-t-2xl bg-ink/90 px-6 py-2 text-white shadow-lg backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#22d3ee]" />
          <span className="text-xs font-bold uppercase tracking-wider">NOORIVA</span>
          <ChevronUp
            size={14}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <footer className="border-t border-ink/10 bg-cream/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand + socials */}
              <div>
                <Link href="/" className="flex items-center gap-2">
                  <Sparkles size={20} className="text-[#22d3ee]" />
                  <span className="text-lg font-bold text-ink">NOORIVA</span>
                </Link>
                <p className="mt-3 max-w-xs text-xs leading-relaxed text-ink/50">
                  Botanical skin-food rituals — nature&apos;s glow, bottled.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="https://instagram.com/nooriva" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-ink/50 transition hover:text-ink"><Instagram size={18} /></a>
                  <a href="https://tiktok.com/@nooriva" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-ink/50 transition hover:text-ink"><Youtube size={18} /></a>
                  <a href="https://facebook.com/nooriva" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-ink/50 transition hover:text-ink"><Facebook size={18} /></a>
                  <a href="https://wa.me/923210550303" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-ink/50 transition hover:text-ink"><Send size={18} /></a>
                </div>
              </div>

              {/* Shop */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/60">Shop</h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  {shopLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-[44px] items-center hover:text-ink">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explore */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/60">Explore</h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  {exploreLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-[44px] items-center hover:text-ink">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support + newsletter */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/60">Support</h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-[44px] items-center hover:text-ink">{link.label}</Link>
                    </li>
                  ))}
                  <li className="flex items-center gap-2"><Phone size={14} /> +92 321 0550303</li>
                  <li className="flex items-center gap-2"><Mail size={14} /> hello@nooriva.ai</li>
                </ul>

                <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for glow drops"
                    className="min-h-[44px] flex-1 rounded-xl border border-ink/10 bg-white/70 px-3 text-xs text-ink outline-none placeholder:text-ink/40 focus:border-ink/30"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] rounded-xl bg-ink px-4 text-xs font-bold text-cream transition hover:opacity-90"
                  >
                    {subscribed ? '✓' : 'Join'}
                  </button>
                </form>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {trustBadges.map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/50 px-3 py-1.5 text-[11px] font-semibold text-ink/70">
                  <badge.icon size={13} className="text-[#22d3ee]" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Payment methods */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {paymentMethods.map((method) => (
                <span key={method} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-1 text-[11px] font-bold text-ink/60">
                  {method}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-ink/5 pt-4 text-center text-xs text-ink/40">
              © {new Date().getFullYear()} NOORIVA. Drink your natural glow.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
