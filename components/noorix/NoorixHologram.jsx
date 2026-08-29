'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * NoorixHologram — A living, breathing holographic AI assistant
 * 
 * - Scan lines effect
 * - Flickering transparency
 * - Floating particles
 * - Breathing pulse
 * - Appears on first open with greeting
 */

export default function NoorixHologram({ isVisible, onDismiss }) {
  var greetingState = useState('');
  var greeting = greetingState[0];
  var setGreeting = greetingState[1];

  var stepState = useState(0);
  var step = stepState[0];
  var setStep = stepState[1];

  var greetings = [
    'Initializing Noorix...',
    'Loading health modules...',
    'Connecting to wellness engine...',
    'Ready to glow.',
  ];

  useEffect(function() {
    if (!isVisible) { setStep(0); setGreeting(''); return; }
    var timers = [];
    greetings.forEach(function(g, i) {
      timers.push(setTimeout(function() { setGreeting(g); setStep(i + 1); }, i * 800));
    });
    timers.push(setTimeout(function() { if (onDismiss) onDismiss(); }, greetings.length * 800 + 1500));
    return function() { timers.forEach(clearTimeout); };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hologram"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(167,139,250,0.1) 0%, transparent 70%)' }}
        >
          {/* Holographic base ring */}
          <div className="relative">
            {/* Outer glow */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ width: 280, height: 280, left: -60, top: -60, background: 'radial-gradient(circle, rgba(167,139,250,0.3), rgba(255,143,178,0.2), transparent)', filter: 'blur(30px)' }}
            />

            {/* Scan lines */}
            <div className="absolute inset-0 overflow-hidden rounded-full" style={{ width: 160, height: 160 }}>
              {Array.from({ length: 20 }).map(function(_, i) {
                return (
                  <div
                    key={i}
                    className="absolute w-full h-px"
                    style={{
                      top: i * 8,
                      background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)',
                      animation: 'hologram-scan 2s ease-in-out infinite',
                      animationDelay: i * 0.1 + 's',
                    }}
                  />
                );
              })}
            </div>

            {/* Holographic orb */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotateY: [0, 360],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
              className="relative"
              style={{ width: 160, height: 160, perspective: 600 }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255,143,178,0.6), rgba(167,139,250,0.6), rgba(103,232,249,0.6), rgba(255,215,161,0.6), rgba(255,143,178,0.6))',
                  animation: 'hologram-flicker 4s ease-in-out infinite',
                  boxShadow: '0 0 60px rgba(167,139,250,0.5), 0 0 120px rgba(255,143,178,0.3), inset 0 0 40px rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              />
              {/* Inner light */}
              <div
                className="absolute rounded-full"
                style={{ top: '15%', left: '20%', width: '35%', height: '30%', background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)', filter: 'blur(6px)' }}
              />
            </motion.div>

            {/* Floating particles */}
            {Array.from({ length: 12 }).map(function(_, i) {
              var angle = (i / 12) * Math.PI * 2;
              var radius = 100 + Math.random() * 40;
              return (
                <motion.div
                  key={i}
                  animate={{
                    x: [Math.cos(angle) * radius, Math.cos(angle + 0.5) * radius, Math.cos(angle) * radius],
                    y: [Math.sin(angle) * radius, Math.sin(angle + 0.5) * radius, Math.sin(angle) * radius],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute rounded-full"
                  style={{
                    width: 3 + Math.random() * 4,
                    height: 3 + Math.random() * 4,
                    left: 80,
                    top: 80,
                    background: ['#ff8fb2', '#a78bfa', '#67e8f9', '#ffd7a1'][i % 4],
                    boxShadow: '0 0 8px ' + ['#ff8fb2', '#a78bfa', '#67e8f9', '#ffd7a1'][i % 4],
                  }}
                />
              );
            })}

            {/* Greeting text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
            >
              <motion.p
                key={greeting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium"
                style={{ color: '#a78bfa', textShadow: '0 0 20px rgba(167,139,250,0.5)' }}
              >
                {greeting}
              </motion.p>
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {greetings.map(function(_, i) {
                  return (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: step > i ? 16 : 4,
                        background: step > i ? 'linear-gradient(90deg, #ff8fb2, #a78bfa)' : 'rgba(167,139,250,0.3)',
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          <style jsx>{'\n            @keyframes hologram-scan {\n              0%, 100% { opacity: 0.3; }\n              50% { opacity: 0.8; }\n            }\n            @keyframes hologram-flicker {\n              0%, 100% { opacity: 0.85; }\n              25% { opacity: 0.95; }\n              50% { opacity: 0.8; }\n              75% { opacity: 0.9; }\n            }\n          '}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
