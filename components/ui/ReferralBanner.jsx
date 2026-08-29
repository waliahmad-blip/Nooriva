'use client';

import { motion } from 'framer-motion';
import { Gift, ChevronRight } from 'lucide-react';

export default function ReferralBanner() {
  function openWhatsApp() {
    var text = encodeURIComponent('Hi NOORIVA! I want to refer a friend for the Rs500 referral program.');
    window.open('https://wa.me/923210550303?text=' + text, '_blank');
  }

  return (
    <section className="section-shell py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        onClick={openWhatsApp}
        className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 cursor-pointer group"
        style={{ background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)' }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'noorix-shimmer 3s ease-in-out infinite' }} />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Gift size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Give Rs500, Get Rs500</h3>
              <p className="text-white/80 text-sm mt-1">Refer a friend and you both get Rs500 off your next order</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
            Refer Now
            <ChevronRight size={18} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
