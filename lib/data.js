// lib/data.js
// Animation-safe content replacement for NOORIVA — NOORISH GOLD.
// This file preserves the exact export names and object shapes expected by:
// components/Sections.jsx, lib/store.js, lib/i18n.js, SceneStage, Checkout, Quiz, AI chat references.
// Urdu/Arabic currently mirror English fallback until translated.

import { SKUS } from "./noorishGold.js";

const L = (text) => ({ en: text, ur: text, ar: text });

export const WHATSAPP_NUMBER = "923210550303";
export const PRICE = 2450;
export const FREE_DELIVERY_THRESHOLD = 5000;
export const STANDARD_DELIVERY = 250;

export const NOORISH_GOLD_INFO = {
  id: "noorish-gold",
  name: "NOORISH GOLD",
  status: "FINALIZED // PRODUCTION-READY",
  usageRatio: "The Signature Botanical Heart",
  dosePerPouch: "The Soul of Every Ritual",
  physical: L("Deep amber liquid, fully water-soluble, zero sediment, thermally stable."),
  brand: L("The proprietary signature botanical heart inside every NOORIVA pouch."),
  finish: L("A distinct NOORIVA undertone anchored by precious saffron, sea buckthorn, and date essence."),
};

const LEGACY_ID_MAP = {
  "rose-halo": "aurora-rose",
  "mango-blaze": "sunrise-solstice",
  "saffron-mist": "golden-zenith",
  "berry-bloom": "berry-nebula",
  "coco-glow": "celestial-mint",
  "cherry-veil": "violet-eclipse",
};

export const flavors = SKUS.map((sku) => ({
  id: LEGACY_ID_MAP[sku.slug] || sku.slug,
  slug: sku.slug,
  name: sku.name,
  slogan: sku.slogan,
  illustrationStyle: sku.illustrationStyle,
  color: sku.color,
  colorB: sku.colorB,
  notes: L(sku.notes),
  tags: L(`${sku.slogan} · Noorish Gold`),
  ingredients: sku.ingredients,
  allIngredients: sku.allIngredients,
}));

export const ingredients = [
  {
    id: "saffron",
    value: "✦ 01",
    title: L("Pure Kashmiri Saffron"),
    desc: L("Signature botanical luminescence anchor, hand-harvested threads delivering warm honey-spice aroma and radiant light reflection."),
  },
  {
    id: "sea-buckthorn",
    value: "✦ 02",
    title: L("Clarified Sea Buckthorn"),
    desc: L("Golden hydrolipid shield providing omega-7 cellular nourishment and crisp berry brightness with zero sediment."),
  },
  {
    id: "date-essence",
    value: "✦ 03",
    title: L("Cold-Filtered Date Essence"),
    desc: L("Prebiotic foundation providing deep caramel sweetness, silky mouthfeel, and zero refined sugar without glycemic spike."),
  },
];

export const trust = [
  {
    id: "production",
    icon: "✅",
    title: L("Finalized Production Base"),
    desc: L("NOORISH GOLD is a completed signature hero complex ready for pilot batches, supplier specs, and retail label copy."),
  },
  {
    id: "soluble",
    icon: "💧",
    title: L("Fully Water-Soluble"),
    desc: L("Deep amber liquid architecture with zero sediment, no gritty sludge, and no oil-slick separation."),
  },
  {
    id: "stability",
    icon: "🧪",
    title: L("Thermally Stable"),
    desc: L("Designed for controlled integration below 70°C and compatibility with hot-fill processes at 80–85°C."),
  },
  {
    id: "flavor",
    icon: "🌸",
    title: L("Perfume-Grade NOORIVA Undertone"),
    desc: L("Rose hydrosol, date syrup, amla, hibiscus, saffron, and mastic create a layered aroma and lingering finish."),
  },
  {
    id: "pakistan",
    icon: "🇵🇰",
    title: L("Built for Pakistan"),
    desc: L("Premium beauty-drink positioning for Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta."),
  },
  {
    id: "halal-ready",
    icon: "🕌",
    title: L("Halal-Compliant Positioning"),
    desc: L("Food-grade inputs and production-minded formulation designed around halal-compliant sourcing and documentation."),
  },
];

export const rituals = [
  {
    id: "rose-halo-ritual",
    time: "Morning",
    icon: "🌅",
    flavor: "aurora-rose",
    title: L("Wake Up Luminous"),
    desc: L("ROSE HALO brings rose and lychee over the NOORISH GOLD base for a bright, perfume-like morning ritual."),
  },
  {
    id: "peach-dusk-ritual",
    time: "Evening",
    icon: "🌙",
    flavor: "peach-dusk",
    title: L("Sleep Beautiful"),
    desc: L("PEACH DUSK blends peach and chamomile into a soft, calming glow ritual."),
  },
  {
    id: "mango-blaze-ritual",
    time: "Energy",
    icon: "🥭",
    flavor: "sunrise-solstice",
    title: L("Burn Bright"),
    desc: L("MANGO BLAZE layers mango and ginger over date-caramel warmth for a clean, vibrant lift."),
  },
  {
    id: "saffron-mist-ritual",
    time: "Repair",
    icon: "🟡",
    flavor: "golden-zenith",
    title: L("Repair in Gold"),
    desc: L("SAFFRON MIST adds saffron and vanilla to the gold base for a luxurious, radiance-focused moment."),
  },
  {
    id: "berry-bloom-ritual",
    time: "3 PM",
    icon: "🍷",
    flavor: "berry-nebula",
    title: L("3 PM, Still Glowing"),
    desc: L("BERRY BLOOM combines pomegranate and berry with hibiscus-style brightness."),
  },
  {
    id: "coco-glow-ritual",
    time: "Reset",
    icon: "🥥",
    flavor: "celestial-mint",
    title: L("Reset Your Light"),
    desc: L("COCO GLOW pairs coconut and moringa for a fresh, green reset ritual."),
  },
  {
    id: "cherry-veil-ritual",
    time: "Night",
    icon: "🍒",
    flavor: "violet-eclipse",
    title: L("Drift Into Glow"),
    desc: L("CHERRY VEIL layers black cherry and rose over the signature NOORIVA undertone."),
  },
  {
    id: "passion-luxe-ritual",
    time: "Luxe",
    icon: "🌺",
    flavor: "passion-luxe",
    title: L("Age in Reverse"),
    desc: L("PASSION LUXE gives papaya and passionfruit a bright, tropical, premium finish."),
  },
  {
    id: "acai-dew-ritual",
    time: "Clarity",
    icon: "🫐",
    flavor: "acai-dew",
    title: L("Pure Clarity"),
    desc: L("ACAI DEW blends acai and blueberry into a fresh, clear, antioxidant-style ritual."),
  },
  {
    id: "pearl-sheen-ritual",
    time: "Sheen",
    icon: "🐉",
    flavor: "pearl-sheen",
    title: L("Glow Unfiltered"),
    desc: L("PEARL SHEEN uses dragon fruit and hibiscus for a pale, luminous, unfiltered glow moment."),
  },
  {
    id: "aloe-tide-ritual",
    time: "Barrier",
    icon: "🍋",
    flavor: "aloe-tide",
    title: L("Barrier of Light"),
    desc: L("ALOE TIDE layers yuzu and aloe into a cooling hydration ritual."),
  },
  {
    id: "bamboo-silk-ritual",
    time: "Reflect",
    icon: "🎋",
    flavor: "bamboo-silk",
    title: L("Reflect Your Light"),
    desc: L("BAMBOO SILK pairs pearl and bamboo for a smooth, refined, mirror-glow ritual."),
  },
];

export const tiers = [
  {
    id: "tier-curious",
    name: L("NOORIVA Single"),
    price: 2450,
    pouches: 1,
    servings: 15,
    save: 0,
    mostLoved: false,
    features: [
      L("Any one of the 12 NOORISH GOLD rituals"),
      L("Ritual guide included"),
      L("Standard delivery"),
    ],
  },
  {
    id: "tier-devoted",
    name: L("NOORISH Gold Trio"),
    price: 6750,
    pouches: 3,
    servings: 45,
    save: 600,
    mostLoved: true,
    features: [
      L("Mix any 3 NOORISH GOLD rituals"),
      L("Free delivery"),
      L("Glow tracker journal"),
    ],
  },
  {
    id: "tier-luminous",
    name: L("NOORISH Gold Six"),
    price: 12850,
    pouches: 6,
    servings: 90,
    save: 1850,
    mostLoved: false,
    features: [
      L("Mix any 6 NOORISH GOLD rituals"),
      L("Free delivery"),
      L("Early access to seasonal NOORISH Gold releases"),
    ],
  },
];

export const makers = [
  {
    icon: "🧪",
    name: "Signature Base Lab",
    role: L("Allulose, glycerin, date syrup, rose hydrosol, saffron, and mastic gum architecture"),
  },
  {
    icon: "🌸",
    name: "Flavor Architecture",
    role: L("Perfume-grade rose identity with fruit, botanical, and bright amla-hibiscus layers"),
  },
  {
    icon: "🔒",
    name: "Stability Systems",
    role: L("Zero-sediment dispersion, color stability, pH buffering, and hot-fill compatibility"),
  },
  {
    icon: "🕌",
    name: "Halal & Sourcing",
    role: L("Food-grade inputs, halal-compliant positioning, and supplier specification control"),
  },
];

export const testimonials = [
  {
    icon: "✨",
    name: "Glow Note 01",
    city: L("Karachi"),
    tier: L("ROSE HALO"),
    text: L("Wake Up Luminous: rose hydrosol, date caramel, lychee lift, and a saffron-mastic finish."),
  },
  {
    icon: "🥭",
    name: "Glow Note 02",
    city: L("Lahore"),
    tier: L("MANGO BLAZE"),
    text: L("Burn Bright: mango and ginger sit on the same gold base for a warm, clean, very NOORIVA ritual."),
  },
  {
    icon: "🍷",
    name: "Glow Note 03",
    city: L("Islamabad"),
    tier: L("BERRY BLOOM"),
    text: L("3 PM, Still Glowing: pomegranate, berry, hibiscus tartness, and a long luxurious finish."),
  },
  {
    icon: "🍒",
    name: "Glow Note 04",
    city: L("Karachi"),
    tier: L("CHERRY VEIL"),
    text: L("Drift Into Glow: black cherry, rose, midnight color, and a calm amber undertone."),
  },
];

export const faqs = [
  {
    id: "noorish-gold",
    q: L("What is NOORISH GOLD?"),
    a: L("NOORISH GOLD is NOORIVA's proprietary trade-secret botanical heart. Anchored by precious saffron, sea buckthorn, and date essence, it gives every finished pouch our unmistakable aroma, zero-sugar body, and radiant finish."),
  },
  {
    id: "shared-base",
    q: L("Is the same base used across all 12 SKUs?"),
    a: L("Yes. Every NOORIVA ritual shares the same NOORISH GOLD base, while each SKU adds its own fruit, botanical, and flavor layer on top."),
  },
  {
    id: "taste",
    q: L("What does NOORISH GOLD taste like?"),
    a: L("It has a luxurious allulose-glycerin body, filtered date caramel depth, a strong rose hydrosol anchor, bright amla and sea buckthorn tartness, and a lingering saffron-mastic luxury finish."),
  },
  {
    id: "stability",
    q: L("Is it production-stable?"),
    a: L("Yes. It is designed as a deep amber, fully water-soluble liquid with zero sediment, zero oil slick, and thermally stable behavior during controlled hot-fill processing."),
  },
  {
    id: "medical-claim",
    q: L("Is NOORISH GOLD a medical treatment?"),
    a: L("No. It is a premium beverage architecture for taste, aroma, stability, and brand identity. It should not be presented as a diagnosis, treatment, or cure for any condition."),
  },
  {
    id: "order",
    q: L("How do I order in Pakistan?"),
    a: L("Use the Add to Bag buttons, proceed through checkout, or contact NOORIVA directly on WhatsApp to order single pouches, trios, or six-pouch Noorish Gold collections."),
  },
  {
    id: "halal",
    q: L("Is NOORIVA halal-compliant?"),
    a: L("NOORIVA is positioned as a halal-compliant Pakistani brand. Food-grade sourcing, documentation, and supplier specifications are designed to support halal positioning and retail compliance."),
  },
];

export const cities = [
  { id: "karachi", name: L("Karachi"), eta: L("2–3 working days") },
  { id: "lahore", name: L("Lahore"), eta: L("2–3 working days") },
  { id: "islamabad", name: L("Islamabad"), eta: L("2–4 working days") },
  { id: "rawalpindi", name: L("Rawalpindi"), eta: L("2–4 working days") },
  { id: "faisalabad", name: L("Faisalabad"), eta: L("3–4 working days") },
  { id: "multan", name: L("Multan"), eta: L("3–5 working days") },
  { id: "peshawar", name: L("Peshawar"), eta: L("3–5 working days") },
  { id: "quetta", name: L("Quetta"), eta: L("3–5 working days") },
  { id: "sialkot", name: L("Sialkot"), eta: L("3–5 working days") },
  { id: "gujranwala", name: L("Gujranwala"), eta: L("3–5 working days") },
  { id: "other", name: L("Other city"), eta: L("4–6 working days") },
];

export function getProduct(id, language = "en") {
  const flavor = flavors.find((item) => item.id === id || item.slug === id);

  if (flavor) {
    return {
      id: flavor.slug || flavor.id,
      name: flavor.name,
      color: flavor.color,
      price: PRICE,
      meta: flavor.notes?.[language] || flavor.notes?.en || "",
    };
  }

  const tier = tiers.find((item) => item.id === id);

  if (tier) {
    return {
      id,
      name: tier.name?.[language] || tier.name?.en || tier.id,
      color: "#22d3ee",
      price: tier.price,
      meta: `${tier.pouches} pouches`,
    };
  }

  return { id, name: id, color: "#999", price: PRICE, meta: "" };
}
