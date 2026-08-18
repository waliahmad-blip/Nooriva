import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // Language
      language: "en",
      setLanguage: (language) => set({ language }),

      // Scene navigation (no-scroll cinematic system)
      activeScene: "home",
      setActiveScene: (scene) => {
        if (scene === get().activeScene) return;
        set({ activeScene: scene });
      },

      // Flavor selection
      selectedFlavor: "aurora-rose",
      setSelectedFlavor: (selectedFlavor) => set({ selectedFlavor }),

      // Sound
      soundOn: false,
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

      // UI overlays
      bagOpen: false,
      checkoutOpen: false,
      noorixOpen: false,

      openBag: () => set({ bagOpen: true, checkoutOpen: false }),
      closeBag: () => set({ bagOpen: false }),
      openCheckout: () => set({ bagOpen: false, checkoutOpen: true }),
      closeCheckout: () => set({ checkoutOpen: false }),
      toggleNoorix: () => set((s) => ({ noorixOpen: !s.noorixOpen })),
      closeNoorix: () => set({ noorixOpen: false }),

      // Cart
      cart: {},
      addToCart: (id, qty = 1) =>
        set((state) => ({
          cart: { ...state.cart, [id]: (state.cart[id] || 0) + qty },
          bagOpen: true,
        })),
      setQty: (id, qty) =>
        set((state) => {
          const cart = { ...state.cart };
          if (qty <= 0) delete cart[id];
          else cart[id] = qty;
          return { cart };
        }),
      removeItem: (id) =>
        set((state) => {
          const cart = { ...state.cart };
          delete cart[id];
          return { cart };
        }),
      clearCart: () => set({ cart: {} }),

      // Gamification
      glowScore: 0,
      ritualStreak: 0,
      lastCheckIn: null,
      addGlow: (points) => set((state) => ({ glowScore: state.glowScore + points })),
      checkIn: () =>
        set((state) => {
          const today = new Date().toDateString();
          if (state.lastCheckIn === today) return state;
          return {
            ritualStreak: state.ritualStreak + 1,
            lastCheckIn: today,
            glowScore: state.glowScore + 10,
          };
        }),

      // Jelly pulse (flavor injection impact - scene transitions + flavor changes)
      lastPulse: 0,
      pulseJelly: () => set({ lastPulse: Date.now() }),
    }),
    {
      name: "nooriva-store",
      partialize: (s) => ({
        language: s.language,
        activeScene: s.activeScene,
        selectedFlavor: s.selectedFlavor,
        cart: s.cart,
        glowScore: s.glowScore,
        ritualStreak: s.ritualStreak,
        lastCheckIn: s.lastCheckIn,
      }),
    }
  )
);