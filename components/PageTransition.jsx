'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const BLADE_COUNT = 6;
const COVER_MS = 520;
const REVEAL_MS = 520;
const TOTAL_MS = COVER_MS + REVEAL_MS + 80;

const ROUTE_PALETTES = {
  '/story': ['#C79A44', '#E7D3A8', '#e05297', '#ff8fb2', '#a78bfa', '#f5e7c6'],
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
  '/api-hub': ['#06b6d4', '#8b5cf6', '#f97316', '#22d3ee', '#a78bfa', '#fbbf24'],

  // ≡ƒî┐ Nature / Organic / Skin-food themed pages
  '/club': ['#f472b6', '#ff8fb2', '#fbcfe8', '#c084fc', '#fff1f2', '#7c3aed'],
  '/weather': ['#67e8f9', '#22d3ee', '#86efac', '#fef08a', '#38bdf8', '#0ea5e9'],
  '/quiz': ['#ff8fb2', '#a78bfa', '#ffd7a1', '#f472b6', '#67e8f9', '#ffffff'],
  '/ritual-of-the-day': ['#f59e0b', '#fbbf24', '#E7D3A8', '#C79A44', '#fff7ed', '#d97706'],
  '/ambassador': ['#7c3aed', '#f472b6', '#ff8fb2', '#4ade80', '#e879f9', '#1e1b4b'],
  '/ingredients': ['#5eead4', '#0ea5e9', '#a7f3d0', '#99f6e4', '#14b8a6', '#e0f2fe'],
  '/shipping': ['#fbbf24', '#f59e0b', '#E7D3A8', '#C79A44', '#fff7ed', '#d97706'],
  '/refund': ['#5eead4', '#67e8f9', '#ff8fb2', '#a78bfa', '#f472b6', '#ffffff'],
  '/privacy': ['#a78bfa', '#22d3ee', '#c4b5fd', '#67e8f9', '#e2e8f0', '#5eead4'],
  '/terms': ['#E7D3A8', '#C79A44', '#8E6B3F', '#F3E9D8', '#D9B7A8', '#4A2C1A'],
};

const ROUTE_NAMES = {
  '/story': 'Our Origin',
  '/': 'NOORIVA',
  '/noorish-gold': 'NOORISH GOLD',
  '/glow-drinks': 'Glow Drinks',
  '/energy-drinks': 'Energy Drinks',
  '/fresh-drinks': 'Fresh Drinks',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/account': 'Account',
  '/noorix': 'Noorix AI',
  '/noorix/chat': 'Noorix AI',
  '/api-hub': 'API Hub',
  '/club': 'Club',
  '/weather': 'Weather Glow',
  '/quiz': 'Find Your Ritual',
  '/ritual-of-the-day': 'Ritual of the Day',
  '/ambassador': 'Ambassador Hub',
  '/ingredients': 'Botanicals',
  '/shipping': 'Shipping & Delivery',
  '/refund': 'Refund Policy',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
};

const ROUTE_TAGLINES = {
  '/story': 'The light came home.',
  '/': "Nature's glow, bottled.",
  '/noorish-gold': 'Skin food, straight from nature.',
  '/glow-drinks': 'Radiance you can drink.',
  '/energy-drinks': 'Botanical energy, naturally.',
  '/fresh-drinks': "Fresh from earth's garden.",
  '/login': 'Welcome back, glow seeker.',
  '/signup': 'Join the natural glow ritual.',
  '/account': 'Your natural glow dashboard.',
  '/noorix': "Nature's glow companion.",
  '/noorix/chat': 'Talk to your glow guide.',
  '/api-hub': 'Live nature & wellness data.',
  '/club': 'Everyone blooms here.',
  '/weather': 'Your skin, tuned to the sky.',
  '/quiz': 'Find your natural ritual.',
  '/ritual-of-the-day': "Today's golden ritual.",
  '/ambassador': 'Grow with NOORIVA.',
  '/ingredients': "Inside nature's golden heart.",
  '/shipping': 'Nationwide, with Cash on Delivery.',
  '/refund': 'Seven days, no awkward questions.',
  '/privacy': 'Your glow journey stays yours.',
  '/terms': 'The plain-English version.',
};

function getPalette(path) {
  if (ROUTE_PALETTES[path]) return ROUTE_PALETTES[path];
  if (path.startsWith('/drinks/')) return ROUTE_PALETTES['/glow-drinks'];
  if (path.startsWith('/glow-drinks/')) return ROUTE_PALETTES['/glow-drinks'];
  if (path.startsWith('/ingredients/')) return ROUTE_PALETTES['/ingredients'];
  return ROUTE_PALETTES['/'];
}

function getRouteName(path) {
  if (ROUTE_NAMES[path]) return ROUTE_NAMES[path];
  if (path.startsWith('/drinks/')) {
    const slug = path.replace('/drinks/', '');
    return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
  // City and botanical detail pages — title-case the slug rather than dumping
  // the raw path. (Kept dependency-free on purpose: this file is in the root
  // layout, so anything imported here ships in EVERY route bundle.)
  if (path.startsWith('/glow-drinks/')) {
    const label = path.replace('/glow-drinks/', '').replace(/-/g, ' ');
    return `Glow Drinks · ${label.replace(/\b\w/g, (c) => c.toUpperCase())}`;
  }

  if (path.startsWith('/ingredients/')) {
    const label = path.replace('/ingredients/', '').replace(/-/g, ' ');
    return label.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Fallback: title-case the last segment rather than dumping the raw slug.
  const lastSegment = path.split('/').filter(Boolean).pop() || 'NOORIVA';
  return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getTagline(path) {
  if (ROUTE_TAGLINES[path]) return ROUTE_TAGLINES[path];
  if (path.startsWith('/glow-drinks/')) return 'Radiance you can drink.';
  if (path.startsWith('/ingredients/')) return "Inside nature's golden heart.";
  return "Nature's glow, inside and out.";
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
      tagline: getTagline(pathname),
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
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

      {transition && (
        <div
          aria-hidden="true"
          className="route-veil fixed inset-0 z-[9999] pointer-events-none"
        >
          <style>{`
            @keyframes bladeEnterLeft {
              from { transform: translate3d(-118%, 0, 0); }
              to { transform: translate3d(0%, 0, 0); }
            }
            @keyframes bladeExitRight {
              from { transform: translate3d(0%, 0, 0); }
              to { transform: translate3d(118%, 0, 0); }
            }
            @keyframes bladeEnterRight {
              from { transform: translate3d(118%, 0, 0); }
              to { transform: translate3d(0%, 0, 0); }
            }
            @keyframes bladeExitLeft {
              from { transform: translate3d(0%, 0, 0); }
              to { transform: translate3d(-118%, 0, 0); }
            }
            @keyframes titlePulse {
              0% { opacity: 0; transform: scale(1.4); filter: blur(14px); }
              30% { opacity: 1; transform: scale(1); filter: blur(0px); }
              70% { opacity: 1; transform: scale(1); filter: blur(0px); }
              100% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
            }
            @keyframes taglinePulse {
              0% { opacity: 0; transform: translateY(10px); }
              30% { opacity: 1; transform: translateY(0); }
              70% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-6px); }
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
                aria-hidden="true"
                className="route-veil-blade fixed top-0 h-full"
                style={{
                  left: `${i * (100 / BLADE_COUNT)}vw`,
                  width: `${100 / BLADE_COUNT + 1.5}vw`,
                  background: `linear-gradient(${fromLeft ? 168 : 192}deg, ${c0}, ${c1})`,
                  animation: fromLeft
                    ? `bladeEnterLeft ${COVER_MS}ms cubic-bezier(0.77, 0, 0.175, 1) forwards, bladeExitRight ${REVEAL_MS}ms cubic-bezier(0.77, 0, 0.175, 1) ${COVER_MS}ms forwards`
                    : `bladeEnterRight ${COVER_MS}ms cubic-bezier(0.77, 0, 0.175, 1) forwards, bladeExitLeft ${REVEAL_MS}ms cubic-bezier(0.77, 0, 0.175, 1) ${COVER_MS}ms forwards`,
                  willChange: 'transform',
                }}
              />
            );
          })}

          <div
            className="route-veil-title fixed inset-0 flex flex-col items-center justify-center text-center"
            style={{
              animation: `titlePulse ${TOTAL_MS - 80}ms forwards`,
              willChange: 'opacity, transform, filter',
            }}
          >
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              NOORIVA
            </span>
            <span className="mt-2 block text-4xl font-bold text-white md:text-6xl">
              {transition.name}
            </span>
            <span
              className="route-veil-tagline mt-3 block max-w-md text-sm italic text-white/75 md:text-base"
              style={{
                animation: `taglinePulse ${TOTAL_MS - 120}ms 140ms both`,
              }}
            >
              {transition.tagline}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
