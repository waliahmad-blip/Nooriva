'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const BLADE_COUNT = 6;
const COVER_MS = 520;
const REVEAL_MS = 520;
const TOTAL_MS = COVER_MS + REVEAL_MS + 80;

const ROUTE_PALETTES = {
  '/': ['#ff8fb2', '#ffd7a1', '#a78bfa', '#67e8f9', '#5eead4', '#fbbf24'],
  '/noorish-gold': ['#E7D3A8', '#C79A44', '#8E6B3F', '#F3E9D8', '#D9B7A8', '#4A2C1A'],
  '/glow-drinks': ['#ff8fb2', '#f472b6', '#d946ef', '#a78bfa', '#ffd7a1', '#ffffff'],
  '/energy-drinks': ['#fbbf24', '#f97316', '#ef4444', '#E8A33D', '#F0725F', '#6A2F15'],
  '/fresh-drinks': ['#5eead4', '#22d3ee', '#10b981', '#9ADCD8', '#557A5C', '#135B63'],
  '/login': ['#ff5e99', '#a78bfa', '#22d3ee', '#050509', '#1A1410', '#ffffff'],
  '/signup': ['#ff5e99', '#a78bfa', '#22d3ee', '#050509', '#1A1410', '#ffffff'],
  '/account': ['#5eead4', '#67e8f9', '#a78bfa', '#ff8fb2', '#ffd7a1', '#fbbf24'],
  '/noorix': ['#ff5e99', '#a78bfa', '#22d3ee', '#5eead4', '#fbbf24', '#f472b6'],
  '/noorix/chat': ['#ff5e99', '#a78bfa', '#22d3ee', '#5eead4', '#fbbf24', '#f472b6'],
};

const ROUTE_NAMES = {
  '/': 'Home',
  '/noorish-gold': 'NOORISH GOLD',
  '/glow-drinks': 'Glow Drinks',
  '/energy-drinks': 'Energy Drinks',
  '/fresh-drinks': 'Fresh Drinks',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/account': 'Account',
  '/noorix': 'Noorix',
  '/noorix/chat': 'Noorix Chat',
};

function getPalette(path) {
  if (ROUTE_PALETTES[path]) return ROUTE_PALETTES[path];
  if (path.startsWith('/drinks/')) return ROUTE_PALETTES['/glow-drinks'];
  return ROUTE_PALETTES['/'];
}

function getRouteName(path) {
  if (ROUTE_NAMES[path]) return ROUTE_NAMES[path];
  if (path.startsWith('/drinks/')) {
    const slug = path.replace('/drinks/', '');
    return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return path.replace('/', '').replace(/-/g, ' ');
}

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [transition, setTransition] = useState(null);
  const timerRef = useRef(null);
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname === lastPathRef.current && !transition) return;
    lastPathRef.current = pathname;

    if (timerRef.current) clearTimeout(timerRef.current);

    setTransition({
      target: pathname,
      palette: getPalette(pathname),
      name: getRouteName(pathname),
    });

    timerRef.current = setTimeout(() => {
      setTransition(null);
      timerRef.current = null;
    }, TOTAL_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <>
      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      {transition && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: 'all' }}
        >
          <style>{`
            @keyframes bladeEnterLeft {
              from { transform: translateX(-118%); }
              to { transform: translateX(0%); }
            }
            @keyframes bladeExitRight {
              from { transform: translateX(0%); }
              to { transform: translateX(118%); }
            }
            @keyframes bladeEnterRight {
              from { transform: translateX(118%); }
              to { transform: translateX(0%); }
            }
            @keyframes bladeExitLeft {
              from { transform: translateX(0%); }
              to { transform: translateX(-118%); }
            }
            @keyframes titlePulse {
              0% { opacity: 0; transform: scale(1.4); filter: blur(14px); }
              30% { opacity: 1; transform: scale(1); filter: blur(0px); }
              70% { opacity: 1; transform: scale(1); filter: blur(0px); }
              100% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
            }
          `}</style>

          {Array.from({ length: BLADE_COUNT }).map((_, i) => {
            const palette = transition.palette;
            const c0 = palette[i % palette.length];
            const c1 = palette[(i + 1) % palette.length];
            const fromLeft = i % 2 === 0;

            return (
              <div
                key={i}
                className="fixed top-0 h-full"
                style={{
                  left: `${i * (100 / BLADE_COUNT)}vw`,
                  width: `${100 / BLADE_COUNT + 1.5}vw`,
                  background: `linear-gradient(${fromLeft ? 168 : 192}deg, ${c0}, ${c1})`,
                  animation: fromLeft
                    ? `bladeEnterLeft ${COVER_MS}ms forwards, bladeExitRight ${REVEAL_MS}ms ${COVER_MS}ms forwards`
                    : `bladeEnterRight ${COVER_MS}ms forwards, bladeExitLeft ${REVEAL_MS}ms ${COVER_MS}ms forwards`,
                  willChange: 'transform',
                }}
              />
            );
          })}

          <div
            className="fixed inset-0 flex items-center justify-center text-center"
            style={{
              animation: `titlePulse ${TOTAL_MS - 80}ms forwards`,
              willChange: 'opacity, transform, filter',
            }}
          >
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                NOORIVA
              </span>
              <span className="mt-2 block text-4xl font-bold text-white md:text-6xl">
                {transition.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
