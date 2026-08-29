"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Volume2, VolumeX } from "lucide-react";
import { useStore } from "@/lib/store";
import { playPop } from "@/lib/sound";
import LanguageToggle from "./LanguageToggle";

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const openBag = useStore((s) => s.openBag);
  const cart = useStore((s) => s.cart);
  const soundOn = useStore((s) => s.soundOn);
  const toggleSound = () => {
    const turningOn = !useStore.getState().soundOn;
    useStore.getState().toggleSound();
    if (turningOn) playPop();
  };

  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="section-shell mt-4 flex items-center justify-between">
        <div className="glass pointer-events-auto rounded-full bg-white/60 px-5 py-3 backdrop-blur-xl flex items-center gap-3" style={{ animation: 'topbar-glow 4s ease-in-out infinite' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-40 blur-lg" style={{ background: 'radial-gradient(circle, rgba(255,143,178,0.5), rgba(167,139,250,0.3), transparent)', animation: 'logo-breathe 3s ease-in-out infinite' }} />
            <img
              src="/brand/nooriva-logo.jpeg"
              alt="NOORIVA"
              className="relative z-10 h-14 w-14 rounded-full object-cover"
              style={{ boxShadow: '0 0 20px rgba(255,143,178,0.4), 0 0 40px rgba(167,139,250,0.2)' }}
              onError={function(e) {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <span className="relative z-10 h-14 w-14 items-center justify-center hidden display-heading holo-text text-2xl" style={{ display: 'none' }}>N</span>
          </div>
          <span className="text-lg font-bold tracking-[0.25em] text-ink display-heading">NOORIVA</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="glass rounded-full bg-white/60 p-2.5 text-ink backdrop-blur-xl transition hover:bg-white"
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          <LanguageToggle />

          <button
            onClick={openBag}
            className="relative rounded-full bg-ink p-2.5 text-cream shadow-lg transition hover:scale-105"
            aria-label="Open Bag"
          >
            <ShoppingBag size={17} />
            {mounted && count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-noor-rose text-[10px] font-bold text-white ring-2 ring-cream">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
