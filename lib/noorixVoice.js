"use client";

let voices = [];

function loadVoices() {
  voices = window.speechSynthesis?.getVoices?.() || [];
}

if (typeof window !== "undefined") {
  loadVoices();
  window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
}

function pickFemaleVoice() {
  if (!voices.length) loadVoices();
  const preferred = [
    "Jenny", "Aria", "Zira", "Samantha", "Google UK English Female",
    "Google US English", "Female", "Fem"
  ];
  for (const token of preferred) {
    const found = voices.find((v) =>
      v.name.toLowerCase().includes(token.toLowerCase())
    );
    if (found) return found;
  }
  return voices.find((v) => /^en/i.test(v.lang)) || voices[0] || null;
}

export function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const clean = (text || "").replace(/[*_#`]/g, "").trim();
  if (!clean) return;
  const u = new SpeechSynthesisUtterance(clean);
  u.voice = pickFemaleVoice();
  u.lang = u.voice?.lang || "en-US";
  u.rate = 1.03;
  u.pitch = 1.1;
  u.volume = 1;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
