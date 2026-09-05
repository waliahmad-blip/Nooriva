'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function NoorixFloatingButton() {
  const t = useT();
  const noorixOpen = useStore((s) => s.noorixOpen);
  const toggleNoorix = useStore((s) => s.toggleNoorix);

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <motion.button
        onClick={toggleNoorix}
        className="tap-target relative flex items-center justify-center rounded-full shadow-xl transition-all"
        style={{
          minWidth: '56px',
          minHeight: '56px',
          background: 'linear-gradient(135deg, #E7D3A8, #C79A44, #8E6B3F)',
          boxShadow: '0 8px 32px rgba(199,154,68,0.4)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Noorix"
      >
        {/* Pulsing aura */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(231,211,168,0.4), transparent 70%)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          {noorixOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
