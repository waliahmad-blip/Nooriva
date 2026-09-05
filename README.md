# NOORIVA — NOORISH GOLD · Drink Your Glow

NOORIVA is a cinematic, production-minded commerce experience for Pakistan's premium NOORISH GOLD glow drink rituals.

Built with:

- Next.js 14 App Router
- React 18
- React Three Fiber / Three.js
- Framer Motion
- Zustand
- Tailwind CSS
- PWA manifest
- Open Graph / Twitter cards
- robots + sitemap
- WhatsApp/COD order flow

## Core Content Architecture

All public content data is kept animation-safe in:

- `lib/data.js`: compatible exports used by existing `Sections.jsx`, store, quiz, commerce
- `lib/noorishGold.js`: complete NOORISH GOLD hero-complex data
- `lib/seoLandingPages.js`: Pakistan search-intent landing page configs
- `lib/i18n.js`: English, Urdu, and Arabic UI strings

## Routes

- `/` — cinematic homepage
- `/noorish-gold` — NOORISH GOLD signature hero complex
- `/drinks/[slug]` — 12 individual glow drink SEO pages
- `/energy-drinks` — energy drink Pakistan landing page
- `/glow-drinks` — glow drink Pakistan landing page
- `/fresh-drinks` — fresh drink Pakistan landing page

## NOORISH GOLD Signature Hero Complex

NOORISH GOLD is the finalized, production-ready signature hero complex added at `12% w/w` to every finished pouch:

- Dose: `18g per 150ml pouch`
- Physical state: deep amber liquid
- Fully water-soluble
- Zero sediment
- Thermally stable
- Hot-fill compatible
- Rose hydrosol anchor
- Filtered date syrup depth
- Clarified amla, sea buckthorn, hibiscus
- Saffron and mastic luxury finish

## The 12 Rituals

1. `ROSE HALO` — Rose + Lychee — Wake Up Luminous
2. `PEACH DUSK` — Peach + Chamomile — Sleep Beautiful
3. `MANGO BLAZE` — Mango + Ginger — Burn Bright
4. `SAFFRON MIST` — Saffron + Vanilla — Repair in Gold
5. `BERRY BLOOM` — Pomegranate + Berry — 3 PM, Still Glowing
6. `COCO GLOW` — Coconut + Moringa — Reset Your Light
7. `CHERRY VEIL` — Black Cherry + Rose — Drift Into Glow
8. `PASSION LUXE` — Papaya + Passionfruit — Age in Reverse
9. `ACAI DEW` — Acai + Blueberry — Pure Clarity
10. `PEARL SHEEN` — Dragon Fruit + Hibiscus — Glow Unfiltered
11. `ALOE TIDE` — Yuzu + Aloe — Barrier of Light
12. `BAMBOO SILK` — Pearl + Bamboo — Reflect Your Light

## Pending Scope / Upcoming Work

The following items are tracked for future work:

- Full mobile accessibility audit and fixes across all pages
- Worldclass redesign of the NOORIVA AI / Noorix experience
- Google Cloud / Vertex AI model routing using Google Cloud credits
- Model capability testing before frontend integration
- Image/vision, translation, reasoning, embeddings, and medical model routing
- Nooriva AI interactive selected-only flow, without free-text typing as primary input
- SEO expansion: blog clusters, store locator, local schema, Search Console verification
- Cross-verify every file, page, route, asset, and critical content replacement

## Local Development

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start:

```bash
npm run start
```

## Important Production Notes

- Do not remove or replace animation components unless explicitly requested.
- Existing scene navigation, page transitions, and WebGL behavior should remain stable.
- New content should be data-driven and production-grade.
- Keep order data free of old product names in fresh installs.
- Use the current domain only when confirmed as live.
