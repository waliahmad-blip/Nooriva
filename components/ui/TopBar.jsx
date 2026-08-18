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
        <div className="glass pointer-events-auto rounded-full bg-white/60 px-5 py-2.5 backdrop-blur-xl">
          <span className="text-base font-bold tracking-[0.2em] text-ink">NOORIVA</span>
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
