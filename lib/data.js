// lib/data.js
// Animation-safe content replacement for NOORIVA — NOORISH GOLD.
// This file preserves the exact export names and object shapes expected by:
// components/Sections.jsx, lib/store.js, lib/i18n.js, SceneStage, Checkout, Quiz, AI chat references.
// Urdu/Arabic currently mirror English fallback until translated.

const L = (text) => ({ en: text, ur: text, ar: text });

export const WHATSAPP_NUMBER = "923210550303";
export const PRICE = 2450;
export const FREE_DELIVERY_THRESHOLD = 5000;
export const STANDARD_DELIVERY = 250;

export const NOORISH_GOLD_INFO = {
  id: "noorish-gold",
  name: "NOORISH GOLD",
  status: "FINALIZED // PRODUCTION-READY",
  usageRatio: "12% w/w",
  dosePerPouch: "18g per 150ml pouch",
  physical: L("Deep amber liquid, fully water-soluble, zero sediment, thermally stable."),
  brand: L("The signature gold architecture inside every NOORIVA pouch."),
  finish: L("A distinct NOORIVA undertone created by rose hydrosol, date syrup, saffron, and mastic gum."),
};

export const flavors = [
  {
    id: "aurora-rose",
    name: "ROSE HALO",
    color: "#D5A3AE",
    colorB: "#4A2C1A",
    notes: L("Rose + Lychee"),
    tags: L("Wake Up Luminous · Noorish Gold"),
  },
  {
    id: "peach-dusk",
    name: "PEACH DUSK",
    color: "#D6C7C8",
    colorB: "#363636",
    notes: L("Peach + Chamomile"),
    tags: L("Sleep Beautiful · Noorish Gold"),
  },
  {
    id: "sunrise-solstice",
    name: "MANGO BLAZE",
    color: "#E8A33D",
    colorB: "#6A2F15",
    notes: L("Mango + Ginger"),
    tags: L("Burn Bright · Noorish Gold"),
  },
  {
    id: "golden-zenith",
    name: "SAFFRON MIST",
    color: "#E7D3A8",
    colorB: "#6F4A2E",
    notes: L("Saffron + Vanilla"),
    tags: L("Repair in Gold · Noorish Gold"),
  },
  {
    id: "berry-nebula",
    name: "BERRY BLOOM",
    color: "#5C2338",
    colorB: "#F3D39B",
    notes: L("Pomegranate + Berry"),
    tags: L("3 PM, Still Glowing · Noorish Gold"),
  },
  {
    id: "celestial-mint",
    name: "COCO GLOW",
    color: "#557A5C",
    colorB: "#7A8B5D",
    notes: L("Coconut + Moringa"),
    tags: L("Reset Your Light · Noorish Gold"),
  },
  {
    id: "violet-eclipse",
    name: "CHERRY VEIL",
    color: "#35243F",
    colorB: "#C2C6CA",
    notes: L("Black Cherry + Rose"),
    tags: L("Drift Into Glow · Noorish Gold"),
  },
  {
    id: "passion-luxe",
    name: "PASSION LUXE",
    color: "#F0725F",
    colorB: "#C26A43",
    notes: L("Papaya + Passionfruit"),
    tags: L("Age in Reverse · Noorish Gold"),
  },
  {
    id: "acai-dew",
    name: "ACAI DEW",
    color: "#4247C9",
    colorB: "#A69BD6",
    notes: L("Acai + Blueberry"),
    tags: L("Pure Clarity · Noorish Gold"),
  },
  {
    id: "pearl-sheen",
    name: "PEARL SHEEN",
    color: "#F3E9D8",
    colorB: "#D9B7A8",
    notes: L("Dragon Fruit + Hibiscus"),
    tags: L("Glow Unfiltered · Noorish Gold"),
  },
  {
    id: "aloe-tide",
    name: "ALOE TIDE",
    color: "#9ADCD8",
    colorB: "#135B63",
    notes: L("Yuzu + Aloe"),
    tags: L("Barrier of Light · Noorish Gold"),
  },
  {
    id: "bamboo-silk",
    name: "BAMBOO SILK",
    color: "#DCC8A8",
    colorB: "#8E6B3F",
    notes: L("Pearl + Bamboo"),
    tags: L("Reflect Your Light · Noorish Gold"),
  },
];

export const ingredients = [
  {
    id: "allulose-glycerin",
    value: "35.0%",
    title: L("Liquid Allulose / Glycerin Base"),
    desc: L("Zero-glycemic heavy body; provides luxurious mouthfeel that mimics honey without stickiness or crystallization risk."),
  },
  {
    id: "rose-hydrosol",
    value: "30.0%",
    title: L("Rose Hydrosol"),
    desc: L("Steam-distilled floral anchor providing the unmistakable, calming NOORIVA aroma across all SKUs."),
  },
  {
    id: "date-syrup",
    value: "20.0%",
    title: L("Filtered Date Syrup"),
    desc: L("Deep caramel sweetness and natural prebiotic depth; fully soluble to prevent gritty sediment or sludge."),
  },
  {
    id: "amla",
    value: "6.0%",
    title: L("Clarified Amla Extract"),
    desc: L("Decolorized amla brightens the profile while removing harsh, mouth-drying tannins."),
  },
  {
    id: "sea-buckthorn",
    value: "4.0%",
    title: L("Sea Buckthorn Concentrate"),
    desc: L("Omega-7 positioning for skin-barrier radiance, dose-balanced to avoid fermented or cheesy off-notes."),
  },
  {
    id: "hibiscus",
    value: "4.0%",
    title: L("Decolorized Hibiscus Extract"),
    desc: L("Anthocyanin-style tartness and polyphenol depth without muddying SKU colors or causing pH drift."),
  },
  {
    id: "rose-petal",
    value: "0.80%",
    title: L("Rose Petal Extract"),
    desc: L("Deepens the floral mid-palate for a perfume-like finish that lingers on the tongue."),
  },
  {
    id: "saffron",
    value: "0.15%",
    title: L("Saffron Extract"),
    desc: L("The gold in Noorish Gold: subtle honey-spice aroma that naturally amplifies sweet perception."),
  },
  {
    id: "mastic",
    value: "0.05%",
    title: L("Water-Dispersible Mastic Gum"),
    desc: L("Replaces frankincense with an ancient resinous depth that remains soluble and avoids oil-slick separation."),
  },
  {
    id: "citrate",
    value: "0.20%",
    title: L("Citric / Sodium Citrate Buffer"),
    desc: L("Ensures the final taste reads sparkling rather than aggressively sour or astringent."),
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
    a: L("NOORISH GOLD is NOORIVA's finalized, production-ready signature hero complex. It is added at 12% w/w to every finished pouch, which means 18g per 150ml pouch."),
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
  { id: "faisalabad", name: L("Faisalabad"), eta: L("3–4 working days") },
  { id: "multan", name: L("Multan"), eta: L("3–5 working days") },
  { id: "other", name: L("Other city"), eta: L("4–6 working days") },
];

export function getProduct(id, language = "en") {
  const flavor = flavors.find((item) => item.id === id);

  if (flavor) {
    return {
      id,
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
      color: "#d9a441",
      price: tier.price,
      meta: `${tier.pouches} pouches`,
    };
  }

  return { id, name: id, color: "#999", price: 0, meta: "" };
}
