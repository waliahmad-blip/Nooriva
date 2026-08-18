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