# NOORIVA — Drink Your Glow

A cinematic, no-scroll, liquid-celestial Next.js commerce experience for NOORIVA —
Pakistan's first halal beauty elixir. Built with Next.js 14, React Three Fiber (WebGL),
Framer Motion, Zustand and Tailwind CSS.

## The experience

Instead of scrolling, the site is a **full-screen scene system**. Seven "scenes"
(Home, Flavours, Inside, Rituals, Society, Play, Voices) are navigated with the
mouse-wheel, touch swipe, arrow keys, or the floating dock. Every transition plays a
**liquid-iris wipe** — staggered flavor-colored blades, a giant chapter numeral, a
flash — while the 3D jelly orb pulses and the flavor droplet splashes. Each scene has
its own animated aurora color field. Reduced-motion users get a calm cross-fade.

## Features

- Cinematic no-scroll scene navigation (wheel / swipe / keyboard / dock)
- Liquid-iris scene transition veil + WebAudio chimes
- React Three Fiber 3D: breathing jelly orb, flavor droplets, glow dust
- Flavor "injection" splash on every flavor / scene change
- 6 flavours, cart, bag drawer, checkout, COD + WhatsApp handoff
- Order API with pluggable persistence (Supabase -> Google Sheets -> local file)
- Gamification: glow score, ritual streak, daily check-in (persisted)
- 5 mini-games + spin wheel + scratch card + memory match + glow rush
- NOORIX shopping assistant
- English / Urdu / Arabic with full RTL flipping (persisted)
- Zustand store with localStorage persistence
- PWA manifest, OG/Twitter link-preview images, robots + sitemap

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

## Order persistence (optional, zero hard dependency)

The `/api/orders` route stores every order to a local `data/orders.json` by default.
To wire a real backend, set either of these environment variables — no code changes:

```
SUPABASE_URL=...          # + SUPABASE_KEY=...   -> inserts into `orders` table
GOOGLE_SHEETS_WEBHOOK=... # Google Apps Script URL that appends rows
```

## Deploy (Netlify)

The repo includes a `netlify.toml`. Push and Netlify auto-detects Next.js:
build command `npm run build`, publish directory `.next`.

## Structure

```
app/            routes, global css, api/orders, manifest, og images
components/     SceneStage (engine), Sections, Playground, overlays
components/three/  WebGL scene, jelly orb, droplets, dust, injection
components/ui/  TopBar, MobileNav, Noorix, dock, toggles
components/commerce/  BagDrawer, CheckoutOverlay
lib/            store (zustand), i18n, data, scenes, sound
```