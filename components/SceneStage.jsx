'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  Sparkles,
  Moon,
  Crown,
  Gamepad2,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { SCENES, sceneIndex } from '@/lib/scenes';
import { playTransition } from '@/lib/sound';

const ICONS = {
  home: Home,
  flavours: ShoppingBag,
  inside: Sparkles,
  rituals: Moon,
  society: Crown,
  play: Gamepad2,
  voices: MessageCircle,
};

const BLADE_COUNT = 4;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* ── Liquid-iris transition veil: staggered flavor blades + chapter title ── */
function TransitionVeil({ phase, scene }) {
  if (phase === 'idle' || !scene) return null;
  const colors = scene.colors;

  return (
    <div
      className="veil-root"
      aria-hidden="true"
      style={{ pointerEvents: phase === 'idle' ? 'none' : 'all' }}
    >
      {Array.from({ length: BLADE_COUNT }).map((_, i) => {
        const c0 = colors[i % colors.length];
        const c1 = colors[(i + 1) % colors.length];
        const enterFrom = i % 2 === 0 ? '-105%' : '105%';
        const exitTo = i % 2 === 0 ? '105%' : '-105%';
        return (
          <motion.div
            key={`${scene.id}-${i}`}
            className="veil-blade"
            initial={{ x: phase === 'cover' ? enterFrom : '0%' }}
            animate={{ x: '0%' }}
            exit={{ x: exitTo }}
            transition={{
              duration: phase === 'cover' ? 0.32 : 0.36,
              delay: i * (phase === 'cover' ? 0.035 : 0.025),
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              left: `${i * (100 / BLADE_COUNT)}vw`,
              width: `${100 / BLADE_COUNT + 1}vw`,
              background: `linear-gradient(${i % 2 === 0 ? 168 : 192}deg, ${c0}, ${c1})`,
              willChange: 'transform',
            }}
          />
        );
      })}

      <motion.div
        className="veil-title"
        initial={{ opacity: 0, scale: 1.15, y: 15 }}
        animate={phase === 'cover' ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.28 }}
      >
        <span className="veil-numeral">{scene.numeral}</span>
        <span className="veil-label">{scene.label}</span>
      </motion.div>

      <motion.div
        className="veil-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'cover' ? [0, 0.5, 0] : 0 }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}

/* ── Aurora color field behind each scene (rendered behind the 3D canvas) ── */
export function AuroraField({ scene }) {
  return (
    <div className="aurora-field" aria-hidden="true">
      {scene.aurora.map((color, i) => (
        <div
          key={i}
          className={`aurora-blob aurora-blob-${i}`}
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 68%)` }}
        />
      ))}
    </div>
  );
}

/* ── Desktop dock navigation ── */
function SceneDock({ active, onGo }) {
  const t = useT();
  return (
    <motion.nav
      initial={{ y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 26 }}
      className="scene-dock hidden md:flex"
      aria-label="Scene navigation"
    >
      {SCENES.map((scene) => {
        const Icon = ICONS[scene.id];
        const isActive = active === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => onGo(scene.id)}
            aria-pressed={isActive}
            aria-label={t(`scene.${scene.id}`)}
            className="scene-dock-btn"
          >
            {isActive && (
              <motion.span
                layoutId="dock-glow"
                className="scene-dock-active"
                style={{
                  background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[2] || scene.colors[1]})`,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon size={17} className="relative z-10" />
            <span className="scene-dock-label relative z-10">
              {t(`scene.${scene.id}`)}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}

/* ── The stage: full-screen scenes, no page scroll ── */
export default function SceneStage({ children }) {
  const activeScene = useStore((s) => s.activeScene);
  const setActiveScene = useStore((s) => s.setActiveScene);
  const pulseJelly = useStore((s) => s.pulseJelly);
  const soundOn = useStore((s) => s.soundOn);
  const reduced = useReducedMotion();
  const t = useT();

  // Always hydrate on "home" first; the sync effect below cinematically
  // transitions to any persisted scene after mount (no SSR mismatch).
  const [displayed, setDisplayed] = useState('home');
  const [veil, setVeil] = useState({ phase: 'idle', scene: null });
  const lockRef = useRef(false);
  const scrollerRef = useRef(null);
  const wheelCooldown = useRef(0);
  const timersRef = useRef([]); // production: track timers, clear on unmount

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout); // no setState after unmount
  }, []);

  const displayedIndex = sceneIndex(displayed);

  const overlayOpen = () => {
    const s = useStore.getState();
    return s.bagOpen || s.checkoutOpen || s.noorixOpen;
  };

  const goTo = useCallback(
    (id) => {
      if (lockRef.current || overlayOpen()) return;
      const target = SCENES.find((sc) => sc.id === id);
      if (!target || id === displayed) return;

      setActiveScene(id);

      // haptic tick (Android / capable devices) — delightful, silent elsewhere
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(12); } catch { }
      }

      if (reduced) {
        setDisplayed(id);
        return;
      }

      lockRef.current = true;
      if (soundOn) playTransition();
      pulseJelly();
      setVeil({ phase: 'cover', scene: { ...target, label: '' } });

      timersRef.current.push(
        setTimeout(() => {
          setDisplayed(id);
          if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
          setVeil({ phase: 'reveal', scene: { ...target, label: '' } });
        }, 180)
      );

      timersRef.current.push(
        setTimeout(() => {
          setVeil({ phase: 'idle', scene: null });
          lockRef.current = false;
        }, 360)
      );
    },
    [displayed, reduced, soundOn, setActiveScene, pulseJelly]
  );

  const step = useCallback(
    (dir) => {
      const next = sceneIndex(displayed) + dir;
      if (next < 0 || next >= SCENES.length) return;
      goTo(SCENES[next].id);
    },
    [displayed, goTo]
  );

  // Sync if activeScene changes from elsewhere (nav clicks, ritual buttons)
  useEffect(() => {
    if (activeScene !== displayed && !lockRef.current) {
      goTo(activeScene);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScene]);

  // Label for veil title
  const veilWithLabel =
    veil.phase !== 'idle' && veil.scene
      ? { ...veil, scene: { ...veil.scene, label: t(`scene.${veil.scene.id}`) } }
      : veil;

  /* Touch swipe at edges */
  useEffect(() => {
    let startY = 0;
    let startX = 0;
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (lockRef.current || overlayOpen()) return;
      const dy = startY - e.changedTouches[0].clientY;
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dy) < 80 || Math.abs(dx) > Math.abs(dy)) return;
      const el = scrollerRef.current;
      if (!el) return;
      const atTop = el.scrollTop <= 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (dy > 0 && atBottom) step(1);
      else if (dy < 0 && atTop) step(-1);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [step]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (lockRef.current || overlayOpen()) return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(SCENES[0].id); }
      else if (e.key === 'End') { e.preventDefault(); goTo(SCENES[SCENES.length - 1].id); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, goTo]);

  return (
    <div className="scene-stage">
      <div ref={scrollerRef} className="scene-scroller" key={displayed}>
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children[displayedIndex]}
        </motion.div>
      </div>

      <AnimatePresence>
        {veil.phase !== 'idle' && (
          <TransitionVeil key={veil.scene?.id + veil.phase} phase={veil.phase} scene={veilWithLabel.scene} />
        )}
      </AnimatePresence>

      <div className="hidden md:block">
        <SceneDock active={displayed} onGo={goTo} />
      </div>
    </div>
  );
}
