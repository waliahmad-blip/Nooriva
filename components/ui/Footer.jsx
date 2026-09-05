"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Instagram, Facebook, Twitter, ChevronUp } from "lucide-react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger tab */}
      <div className="flex justify-center">
        <div className="cursor-pointer rounded-t-2xl bg-ink/90 px-6 py-2 text-white shadow-lg backdrop-blur-md flex items-center gap-2">
          <Sparkles size={14} className="text-[#C79A44]" />
          <span className="text-xs font-bold uppercase tracking-wider">NOORIVA</span>
          <ChevronUp size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Full footer panel */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <footer className="border-t border-ink/10 bg-cream-50/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2">
                  <Sparkles size={20} className="text-[#C79A44]" />
                  <span className="text-lg font-bold text-ink">NOORIVA</span>
                </Link>
                <p className="mt-3 text-xs text-ink/50 leading-relaxed">
                  Drink your glow. Twelve radiant rituals crafted for Pakistan.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">Shop</h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  <li><Link href="/noorish-gold" className="hover:text-ink transition-colors">NOORISH GOLD</Link></li>
                  <li><Link href="/energy-drinks" className="hover:text-ink transition-colors">Energy Drinks</Link></li>
                  <li><Link href="/glow-drinks" className="hover:text-ink transition-colors">Glow Drinks</Link></li>
                  <li><Link href="/fresh-drinks" className="hover:text-ink transition-colors">Fresh Drinks</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">Noorix</h4>
                <ul className="space-y-2 text-sm text-ink/70">
                  <li><Link href="/noorix" className="hover:text-ink transition-colors">Meet Noorix</Link></li>
                  <li><Link href="/noorix/chat" className="hover:text-ink transition-colors">Chat Console</Link></li>
                  <li><Link href="/account" className="hover:text-ink transition-colors">My Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">Connect</h4>
                <div className="flex gap-3">
                  <a href="#" aria-label="Instagram" className="text-ink/50 hover:text-ink transition-colors"><Instagram size={18} /></a>
                  <a href="#" aria-label="Facebook" className="text-ink/50 hover:text-ink transition-colors"><Facebook size={18} /></a>
                  <a href="#" aria-label="Twitter" className="text-ink/50 hover:text-ink transition-colors"><Twitter size={18} /></a>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-ink/5 pt-4 text-center text-xs text-ink/40">
              © {new Date().getFullYear()} NOORIVA. All rights reserved. Drink your glow.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
