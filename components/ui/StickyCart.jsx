'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { flavors, PRICE } from '@/lib/data';

export default function StickyCart() {
  const [visible, setVisible] = useState(false);
  const cart = useStore((s) => s.cart);
  const openBag = useStore((s) => s.openBag);
  const selectedFlavor = useStore((s) => s.selectedFlavor);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const flavor = flavors.find((f) => f.id === selectedFlavor) || flavors[0];

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-20 md:hidden"
        >
          <div className="glass mx-3 mb-3 rounded-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full" style={{ background: flavor.color }} />
              <div>
                <p className="text-sm font-semibold text-ink">{flavor.name}</p>
                <p className="text-xs text-ink/50">₨ {PRICE.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={openBag}
              className="btn-primary !py-2.5 !px-5 text-sm flex items-center gap-2"
              aria-label={count > 0 ? `View bag, ${count} items` : 'Add to bag'}
            >
              <ShoppingBag size={16} />
              {count > 0 ? `View Bag (${count})` : 'Add to Bag'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
