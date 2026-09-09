'use client';

import GemstoneFluidPouch from '@/components/three/GemstoneFluidPouch';

export default function DrinkPouchStage({ drink }) {
  return (
    <div className="relative flex items-center justify-center lg:col-span-5">
      <div className="relative w-full rounded-[2.5rem] border border-white/50 bg-gradient-to-b from-white/40 to-white/10 p-4 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-ink/50 uppercase">
            3D POUCH SIMULATOR
          </span>
        </div>
        <GemstoneFluidPouch
          colorA={drink.frameColour}
          colorB={drink.backgroundColour}
          frameColor="#ffffff"
        />
        <div className="mt-2 text-center text-[10px] font-mono tracking-wider text-ink/40">
          ✦ TILT CURSOR TO CATCH SPECULAR LIGHT REFLECTION ✦
        </div>
      </div>
    </div>
  );
}