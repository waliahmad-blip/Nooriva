// Tiny WebAudio chimes - no audio files needed.
let ctx = null;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freqFrom, freqTo, duration, volume, type = "sine") {
  const c = ensureCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqFrom, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freqTo, c.currentTime + duration);
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, c.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.05);
}

export function playTransition() {
  tone(320, 780, 0.34, 0.08, "sine");
  setTimeout(() => tone(660, 990, 0.22, 0.05, "triangle"), 140);
}

export function playPop() {
  tone(520, 880, 0.12, 0.07, "triangle");
}

export function playAddBag() {
  tone(440, 880, 0.15, 0.09, "sine");
  setTimeout(() => tone(880, 1320, 0.18, 0.06, "triangle"), 80);
}

export function playChime() {
  tone(587.33, 880, 0.25, 0.04, "sine");
}

export function playGlowChord() {
  tone(523.25, 659.25, 0.35, 0.06, "sine");
  setTimeout(() => tone(659.25, 783.99, 0.35, 0.05, "sine"), 100);
  setTimeout(() => tone(783.99, 1046.5, 0.45, 0.07, "triangle"), 200);
}

export function playGlassPing() {
  tone(1046.5, 2093.0, 0.18, 0.05, "sine");
  setTimeout(() => tone(2093.0, 3136.0, 0.12, 0.03, "sine"), 40);
}