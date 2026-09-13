import { SITE_URL, abs } from "@/lib/site";
// lib/noorishGold.js
// Production content data for NOORIVA — NOORISH GOLD golden botanical heart.
// This file is intentionally independent from the old lib/data.js structure.

export const BRAND = {
  name: "NOORIVA",
  tagline: "Drink Your Glow",
  collection: "NOORISH GOLD",
  market: "Pakistan",
};

export const COMMERCE = {
  currency: "PKR",
  pricePKR: 2450,
  freeDeliveryThresholdPKR: 5000,
  standardDeliveryPKR: 250,
  whatsappNumber: "923210550303",
  checkoutEnabled: true,
};

export const SEO = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NOORISH GOLD by NOORIVA | Signature Hero Complex | Drink Your Glow",
    template: "%s | NOORIVA NOORISH GOLD",
  },
  description:
    "NOORISH GOLD is NOORIVA's production-ready golden botanical heart: a deep amber, fully water-soluble, thermally stable base added at the golden botanical heart to every finished pouch. Perfume-grade rose architecture, zero-sugar body, premium radiance positioning, and a distinct NOORIVA undertone.",
  keywords: [
    // Brand & tagline
    "NOORIVA", "NOORISH GOLD", "Noorish", "Drink Your Glow", "drink your glow Pakistan", "NOORIVA Pakistan",
    "NOORIVA official", "NOORIVA website", "NOORIVA online", "NOORIVA order", "NOORIVA drink",
    // Product categories
    "energy drink Pakistan", "best energy drink in Pakistan", "premium energy drink Pakistan", "natural energy drink Pakistan", "healthy energy drink Pakistan", "halal energy drink Pakistan", "sugar free energy drink Pakistan",
    "glow drink Pakistan", "beauty drink Pakistan", "skin glow drink Pakistan", "radiance drink Pakistan", "glow skin drink Pakistan", "collagen drink Pakistan", "beauty from within drink Pakistan",
    "fresh drink Pakistan", "fresh fruit drink Pakistan", "premium fresh drink Pakistan", "natural fresh drink Pakistan", "healthy fresh drink Pakistan", "fruit juice Pakistan",
    // Ingredients & functional positioning
    "rose drink Pakistan", "saffron drink Pakistan", "mastic drink Pakistan", "amla drink Pakistan", "hibiscus drink Pakistan", "date syrup drink Pakistan", "sea buckthorn drink Pakistan",
    "lychee drink Pakistan", "chamomile drink Pakistan", "ginger drink Pakistan", "vanilla drink Pakistan", "pomegranate drink Pakistan", "berry drink Pakistan", "coconut drink Pakistan",
    "moringa drink Pakistan", "black cherry drink Pakistan", "papaya drink Pakistan", "passionfruit drink Pakistan", "acai drink Pakistan", "blueberry drink Pakistan", "dragon fruit drink Pakistan",
    "yuzu drink Pakistan", "aloe drink Pakistan", "pearl drink Pakistan", "bamboo drink Pakistan",
    // SKU names
    "ROSE HALO", "SAFFRON MIST", "MANGO BLAZE", "BERRY BLOOM", "COCO GLOW", "CHERRY VEIL", "PASSION LUXE", "ACAI DEW", "PEARL SHEEN", "ALOE TIDE", "BAMBOO SILK", "PEACH DUSK",
    // Cities
    "energy drink Karachi", "energy drink Lahore", "energy drink Islamabad", "energy drink Rawalpindi", "energy drink Faisalabad", "energy drink Multan", "energy drink Peshawar", "energy drink Quetta", "energy drink Hyderabad Pakistan", "energy drink Gujranwala", "energy drink Sialkot",
    "glow drink Karachi", "glow drink Lahore", "glow drink Islamabad", "glow drink Rawalpindi", "glow drink Faisalabad", "glow drink Multan", "glow drink Peshawar", "glow drink Quetta",
    "fresh drink Karachi", "fresh drink Lahore", "fresh drink Islamabad", "fresh drink Rawalpindi",
    // Wellness / beauty
    "wellness drink Pakistan", "luxury drink Pakistan", "premium beverage Pakistan", "healthy drink Pakistan", "antioxidant drink Pakistan", "hydration drink Pakistan", "beauty from within Pakistan", "anti aging drink Pakistan", "vitamin drink Pakistan", "immunity drink Pakistan",
    // Halal / lifestyle
    "halal drink Pakistan", "halal beverage Pakistan", "halal energy drink", "halal glow drink", "Pakistan beverage brand", "Pakistani drink brand", "Pakistani wellness brand", "Muslim friendly drink Pakistan",
    // Packaging / occasions
    "150ml pouch drink Pakistan", "pouch drink Pakistan", "single serve drink Pakistan", "on the go drink Pakistan", "travel drink Pakistan", "office drink Pakistan", "gym drink Pakistan", "post workout drink Pakistan", "morning drink Pakistan", "night drink Pakistan", "ramadan drink Pakistan", "eid drink Pakistan",
    // Long tail
    "best healthy drink in Pakistan", "best glow drink in Pakistan", "best fresh drink in Pakistan", "natural beauty drink Pakistan", "vitamin drink Pakistan", "herbal drink Pakistan", "organic drink Pakistan", "no preservatives drink Pakistan", "low calorie drink Pakistan", "zero sugar drink Pakistan", "diabetic friendly drink Pakistan",
  ],
  authors: [{ name: "NOORIVA", url: SITE_URL }],
  creator: "NOORIVA",
  publisher: "NOORIVA",
  applicationName: "NOORIVA",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["en_US", "ur_PK", "ar_AE"],
    url: abs("/"),
    siteName: "NOORIVA",
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description:
      "Explore the production-ready NOORISH GOLD hero complex used at the golden botanical heart in every NOORIVA pouch: rose architecture, allulose body, date syrup depth, clarified amla, sea buckthorn, hibiscus, saffron, and mastic.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NOORISH GOLD by NOORIVA — premium glow drinks in Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description: "Production-ready golden botanical heart for premium energy, glow, and fresh drink rituals in Pakistan.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: abs("/"),
    languages: {
      "en-PK": abs("/"),
      "ur-PK": abs("/"),
      "ar-PK": abs("/"),
    },
  },
  category: "beverage",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "NOORIVA" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const NOORISH_GOLD = {
  id: "noorish-gold",
  status: "FINALIZED // PRODUCTION-READY",
  usageRatio: "the golden botanical heart",
  pouchDose: "the heart of every ritual",
  physicalState: "Deep amber liquid",
  solubility: "Fully water-soluble",
  sediment: "Zero sediment",
  thermalStability: "Thermally stable",
};

export const HERO = {
  kicker: "THE FLAWLESS SIGNATURE HERO COMPLEX",
  title: "NOORISH GOLD",
  subtitle: "The gold architecture inside every NOORIVA pouch.",
  description:
    "A golden botanical heart — saffron, rose, and nature’s own glow. Every ritual is built on the same warm, organic-led base, giving NOORIVA its unmistakable aroma, body, and radiance.",
  badges: [
    "BOTANICAL",
    "ORGANIC-LED",
    "SKIN FOOD",
    "NATURE-FIRST",
    "GOLDEN HEART",
  ],
  primaryCta: {
    label: "Explore the Gold Base",
    href: "#noorish-gold",
  },
  secondaryCta: {
    label: "Order on WhatsApp",
    href: `https://wa.me/${COMMERCE.whatsappNumber}?text=${encodeURIComponent("Hi NOORIVA! I want to order NOORISH GOLD.")}`,
  },
};

export const PILLARS = [
  {
    title: "Perfume-Grade Aroma",
    description:
      "Rose hydrosol and rose petal extract create the unmistakable floral anchor that defines the NOORIVA brand identity across all SKUs.",
  },
  {
    title: "Luxurious Zero-Sugar Body",
    description:
      "Liquid allulose and glycerin deliver a honey-like, dessert-like mouthfeel without stickiness, crystallization risk, or glycemic spike.",
  },
  {
    title: "Deep Caramel Date Foundation",
    description:
      "Filtered date syrup adds natural sweetness, prebiotic depth, and a smooth caramel backbone while remaining fully soluble and sediment-free.",
  },
  {
    title: "Radiance-Focused Botanicals",
    description:
      "Clarified amla, sea buckthorn, and hibiscus create a bright antioxidant-style layer while preventing harsh tannins and color drift.",
  },
  {
    title: "The NOORIVA Undertone",
    description:
      "Trace saffron and food-grade mastic create a luxury honey-spice, resinous finish that lingers on the palate for minutes.",
  },
  {
    title: "Hot-Fill Stable",
    description:
      "Formulated to integrate at ≤70°C, remain compatible with hot-fill 80–85°C processes, and support shelf-stable pouch production.",
  },
];

// Trade-Secret Botanical Anchors — Only 3 public botanical anchors highlighted; exact percentages and proprietary ratios shielded
export const INGREDIENT_MATRIX = [
  {
    name: "Pure Kashmiri Saffron Essence",
    role: "Signature Luminescence",
    foodTechPurpose: "Bioactive crocin amplifies light perception and elevates natural skin radiance.",
    flavorRole: "Warm floral honey-spice top-note and luxury finish.",
  },
  {
    name: "Clarified Sea Buckthorn Concentrate",
    role: "Cellular Hydrolipid Shield",
    foodTechPurpose: "Omega-7 fatty acids nourish the skin lipid barrier and enhance inner radiance.",
    flavorRole: "Vibrant berry-citrus brightness and deep tartness.",
  },
  {
    name: "Cold-Filtered Date Essence",
    role: "Prebiotic Foundation",
    foodTechPurpose: "Prebiotic depth and smooth mouthfeel; zero added sugar, fully water-soluble.",
    flavorRole: "Warm caramel sweetness and rounded depth.",
  },
];

export const FLAVOR_ARCHITECTURE = [
  {
    layer: "Base / Body",
    description:
      "Luxurious honey-like sweetness without stickiness or glycemic spike from the non-glycemic rare matrix.",
  },
  {
    layer: "Depth",
    description:
      "Deep caramel notes from filtered date essence, rounded by smooth mineral buffering that prevents dryness.",
  },
  {
    layer: "Floral Core",
    description:
      "Unmistakable pure floral anchor, deepened in the mid-palate for a layered sensory bouquet.",
  },
  {
    layer: "Brightness / Tartness",
    description:
      "Clarified sea buckthorn provides vibrant berry-tartness without tannin astringency or off-notes.",
  },
  {
    layer: "Luxury Finish",
    description:
      'Pure Kashmiri saffron creates a lingering "NOORIVA undertone" that remains on the palate for minutes.',
  },
];

export const INGREDIENT_MATRIX_NOTE = {
  title: "Proprietary Trade Secret Shield",
  notice:
    "NOORISH GOLD is shielded as NOORIVA's proprietary trade secret. Only 3 public botanical anchors are highlighted (Kashmiri Saffron, Sea Buckthorn, and Date Essence), with zero formula ratios revealed anywhere.",
  standard: "ISO-22000 & Halal Certified Botanical Processing",
  anchors: [
    "Kashmiri Saffron",
    "Sea Buckthorn",
    "Date Essence",
  ],
};

export const FUNCTIONAL_LAYERING_PER_POUCH = [
  {
    layer: "Cellular Fruit Body",
    purpose:
      "Clarified whole botanical juices and purees providing active phytonutrients, natural organic acids, and vibrant jewel pigments.",
    purity: "Clarified · Cold-Extracted · Zero Refined Sugar",
  },
  {
    layer: "Active Cellular Nutrients",
    purpose:
      "Bio-fermented hyaluronic acid, marine/hydrolyzed collagen peptides, zinc bisglycinate, pharmaceutical-grade L-theanine, and cellular co-factors.",
    purity: "Clinical Grade · High Bioavailability",
  },
  {
    layer: "Aromatherapy & Exotic Waters",
    purpose:
      "Steam-distilled Arq-e-Gulab, kewra blossom water, crushed green cardamom, and Madagascar vanilla delivering perfume-grade sensory elevation.",
    purity: "Steam-Distilled · Zero Synthetics",
  },
  {
    layer: "NOORIVA Secret Core (NOORISH GOLD)",
    purpose:
      "Proprietary golden botanical heart featuring Kashmiri saffron, clarified sea buckthorn, and date essence that unites all 12 rituals.",
    purity: "Trade Secret Shielded · Deep Amber Soluble Base",
  },
  {
    layer: "Sweetness & Mineral Matrix",
    purpose:
      "Rare plant sugar allulose, monk fruit extract, pure Reb-M stevia, and electrolyte citrate buffers for glycemic-neutral, silky mouthfeel.",
    purity: "Zero Glycemic Impact · Tri-Gel Firming Network",
  },
];

export const MANUFACTURING_PROTOCOL = {
  method: "Aseptic Botanical Compounding & Low-Thermal Infusion",
  temperature:
    "Delicate low-thermal phase integration (<65°C) preserving volatile aromatics and heat-sensitive antioxidants.",
  filtration:
    "Sub-micron botanical clarification preventing sediment, syneresis, and phase separation.",
  packaging:
    "Multi-barrier UV-shielded squeezable gemstone pouch with hermetic tamper-evident seal.",
  qaStandard: "100% Halal Certified, cGMP Compliant, Zero Artificial Preservatives.",
};

export const STABILITY_AND_SHELF_LIFE = {
  shelfLife: "12 Months Ambient Shelf Stability",
  sedimentation: "Zero Sedimentation & Zero Phase Separation",
  thermalProfile:
    "Tested from 4°C to 45°C ambient stability without rheological degradation.",
  syneresisControl:
    "Tri-gel hydrocolloid network locks cellular hydration and prevents water leaching.",
  storage:
    "Store in a cool, dry sanctuary away from direct sunlight; best served chilled.",
};

export const COMMERCIAL_NOTES = [
  "All ingredients are GRAS/EFSA food-grade approved; no novel food petitions are required for this formula profile.",
  "Frankincense was removed to eliminate regulatory complexity and resin solubility issues.",
  "Date fiber was replaced with cold-filtered date essence to prevent gritty texture complaints and production filtration bottlenecks.",
  "High-potency botanicals are anchored by Kashmiri saffron and Chios mastic gum.",
  "The formula supports premium retail positioning with measurable sensory depth and luxury brand recognition.",
];

export const FINAL_VERDICT = {
  title: "The Trade Secret Verdict",
  description:
    "This is the definitive, production-ready NOORISH GOLD botanical heart. It delivers natural aroma, smooth zero-sugar sweetness, explicit radiance positioning, and ambient stability without compromising clarity, taste, or regulatory compliance. Every NOORIVA ritual shares this secret core, ensuring instant brand recognition while allowing each active fruit layer to shine through its own jewel-toned profile.",
  status: "Proprietary Trade Secret Protected // Production-Ready",
};

export const SKUS = [
  {
    id: "rose-halo",
    slug: "rose-halo",
    name: "ROSE HALO",
    slogan: "Wake Up Luminous",
    illustrationStyle: "Rose + Lychee",
    notes: "Clarified Shahtoot mulberry with steam-distilled Arq-e-Gulab, cardamom, and pure Vitamin C.",
    backgroundColour: "#ff8fb2",
    frameColour: "#a78bfa",
    textColour: "#ffffff",
    color: "#ff8fb2",
    colorB: "#a78bfa",
    tags: ["rose", "lychee", "mulberry", "vitamin c", "glow drink", "Pakistan"],
    ingredients: {
      fruitBody: ["Clarified Shahtoot (Mulberry) Fruit Extract", "Fresh Lime Juice"],
      cellularActives: ["Pure Vitamin C (Ascorbic Acid)", "Niacinamide (Vitamin B3)", "Zinc Bisglycinate", "Rosemary Leaf Extract"],
      aromatherapyWaters: ["Steam-Distilled Arq-e-Gulab (Pure Rose Water)", "Green Cardamom Essence", "Kewra Blossom Water", "Ceylon Cinnamon Extract"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Allulose", "Glycine", "Potassium & Sodium Buffer"],
    },
    allIngredients: [
      "Clarified Shahtoot (Mulberry) Fruit Extract", "Fresh Lime Juice",
      "Pure Vitamin C (Ascorbic Acid)", "Niacinamide (Vitamin B3)", "Zinc Bisglycinate", "Rosemary Leaf Extract",
      "Steam-Distilled Arq-e-Gulab (Pure Rose Water)", "Green Cardamom Essence", "Kewra Blossom Water", "Ceylon Cinnamon Extract",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Allulose", "Glycine", "Potassium & Sodium Buffer"
    ],
  },
  {
    id: "peach-dusk",
    slug: "peach-dusk",
    name: "PEACH DUSK",
    slogan: "Sleep Beautiful",
    illustrationStyle: "Peach + Chamomile",
    notes: "Sun-ripened fig and peach blossom with L-Theanine, Glycine, and Magnesium.",
    backgroundColour: "#f472b6",
    frameColour: "#22d3ee",
    textColour: "#ffffff",
    color: "#f472b6",
    colorB: "#22d3ee",
    tags: ["peach", "chamomile", "fig", "sleep drink", "Pakistan"],
    ingredients: {
      fruitBody: ["Sun-Ripened Fig (Anjeer) Extract", "Peach Blossom Essence", "Fresh Lime"],
      cellularActives: ["L-Theanine", "Glycine", "Magnesium Bisglycinate Chelate", "Chamomile Flower Extract"],
      aromatherapyWaters: ["Nutmeg Essence", "Ceylon Cinnamon", "Arq-e-Gulab (Rose Water)", "Kewra Blossom Water", "Green Cardamom"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Tri-Gel Matrix", "Himalayan Mineral Salt"],
    },
    allIngredients: [
      "Sun-Ripened Fig (Anjeer) Extract", "Peach Blossom Essence", "Fresh Lime",
      "L-Theanine", "Glycine", "Magnesium Bisglycinate Chelate", "Chamomile Flower Extract",
      "Nutmeg Essence", "Ceylon Cinnamon", "Arq-e-Gulab (Rose Water)", "Kewra Blossom Water", "Green Cardamom",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Tri-Gel Matrix", "Himalayan Mineral Salt"
    ],
  },
  {
    id: "mango-blaze",
    slug: "mango-blaze",
    name: "MANGO BLAZE",
    slogan: "Burn Bright",
    illustrationStyle: "Mango + Ginger",
    notes: "Chaunsa mango puree and fresh ginger with collagen peptides and hyaluronic acid.",
    backgroundColour: "#f97316",
    frameColour: "#22d3ee",
    textColour: "#ffffff",
    color: "#f97316",
    colorB: "#22d3ee",
    tags: ["mango", "ginger", "chaunsa", "energy drink", "Pakistan"],
    ingredients: {
      fruitBody: ["Chaunsa Mango Puree", "Fresh Lime Juice"],
      cellularActives: ["Hydrolyzed Collagen Peptides", "Low-Molecular Hyaluronic Acid", "Vitamin C"],
      aromatherapyWaters: ["Fresh Ginger Root Extract", "Green Cardamom", "Kewra Blossom Water"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Allulose", "Stevia Reb-M", "Monk Fruit", "Pectin Buffer"],
    },
    allIngredients: [
      "Chaunsa Mango Puree", "Fresh Lime Juice",
      "Hydrolyzed Collagen Peptides", "Low-Molecular Hyaluronic Acid", "Vitamin C",
      "Fresh Ginger Root Extract", "Green Cardamom", "Kewra Blossom Water",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Allulose", "Stevia Reb-M", "Monk Fruit", "Pectin Buffer"
    ],
  },
  {
    id: "saffron-mist",
    slug: "saffron-mist",
    name: "SAFFRON MIST",
    slogan: "Repair in Gold",
    illustrationStyle: "Saffron + Vanilla",
    notes: "Clarified falsa berry with Kashmiri saffron, reduced glutathione, and Madagascar vanilla.",
    backgroundColour: "#a78bfa",
    frameColour: "#22d3ee",
    textColour: "#ffffff",
    color: "#a78bfa",
    colorB: "#22d3ee",
    tags: ["saffron", "vanilla", "falsa", "glutathione", "luxury ritual", "Pakistan"],
    ingredients: {
      fruitBody: ["Clarified Falsa Berry Extract", "Fresh Lime Juice"],
      cellularActives: ["Pure Kashmiri Saffron Extract", "Pharmaceutical-Grade Reduced Glutathione", "Vitamin C"],
      aromatherapyWaters: ["Natural Madagascar Vanilla Bean", "Himalayan Pink Mineral Salt Crystals"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Glycine", "Allulose", "Stevia Reb-M", "Monk Fruit"],
    },
    allIngredients: [
      "Clarified Falsa Berry Extract", "Fresh Lime Juice",
      "Pure Kashmiri Saffron Extract", "Pharmaceutical-Grade Reduced Glutathione", "Vitamin C",
      "Natural Madagascar Vanilla Bean", "Himalayan Pink Mineral Salt Crystals",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Glycine", "Allulose", "Stevia Reb-M", "Monk Fruit"
    ],
  },
  {
    id: "berry-bloom",
    slug: "berry-bloom",
    name: "BERRY BLOOM",
    slogan: "3 PM, Still Glowing",
    illustrationStyle: "Pomegranate + Berry",
    notes: "Clarified pomegranate and wild berry with collagen peptides, bamboo silica, and cinnamon.",
    backgroundColour: "#ec4899",
    frameColour: "#5eead4",
    textColour: "#ffffff",
    color: "#ec4899",
    colorB: "#5eead4",
    tags: ["berry", "pomegranate", "collagen", "silica", "fresh drink", "Pakistan"],
    ingredients: {
      fruitBody: ["Clarified Pomegranate Extract", "Wild Forest Berry Essence"],
      cellularActives: ["Hydrolyzed Collagen Peptides", "Vitamin C", "Bamboo Silica Extract"],
      aromatherapyWaters: ["Ceylon Cinnamon Extract", "Vanilla Bean Rounding", "Himalayan Pink Salt"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Allulose", "Tri-Gel Hydrocolloid"],
    },
    allIngredients: [
      "Clarified Pomegranate Extract", "Wild Forest Berry Essence",
      "Hydrolyzed Collagen Peptides", "Vitamin C", "Bamboo Silica Extract",
      "Ceylon Cinnamon Extract", "Vanilla Bean Rounding", "Himalayan Pink Salt",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Allulose", "Tri-Gel Hydrocolloid"
    ],
  },
  {
    id: "coco-glow",
    slug: "coco-glow",
    name: "COCO GLOW",
    slogan: "Reset Your Light",
    illustrationStyle: "Coconut + Moringa",
    notes: "Cold-pressed coconut water and moringa with hyaluronic acid and full B-vitamin complex.",
    backgroundColour: "#5eead4",
    frameColour: "#a78bfa",
    textColour: "#ffffff",
    color: "#5eead4",
    colorB: "#a78bfa",
    tags: ["coconut", "moringa", "b-vitamins", "hyaluronic acid", "hydration", "Pakistan"],
    ingredients: {
      fruitBody: ["Pure Coconut Water Extract", "Moringa Oleifera Leaf Extract", "Fresh Lime"],
      cellularActives: ["Fermentation-Derived Hyaluronic Acid", "Biotin (Vitamin B7)", "Vitamin C", "Niacinamide (Vitamin B3)", "Vitamin B5 (Panthenol)", "Vitamin B6 (Pyridoxine)"],
      aromatherapyWaters: ["Clear Cold-Pressed Coconut Essence"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Allulose", "Monk Fruit", "Stevia", "Potassium & Magnesium Citrate"],
    },
    allIngredients: [
      "Pure Coconut Water Extract", "Moringa Oleifera Leaf Extract", "Fresh Lime",
      "Fermentation-Derived Hyaluronic Acid", "Biotin (Vitamin B7)", "Vitamin C", "Niacinamide (Vitamin B3)", "Vitamin B5 (Panthenol)", "Vitamin B6 (Pyridoxine)",
      "Clear Cold-Pressed Coconut Essence",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Allulose", "Monk Fruit", "Stevia", "Potassium & Magnesium Citrate"
    ],
  },
  {
    id: "cherry-veil",
    slug: "cherry-veil",
    name: "CHERRY VEIL",
    slogan: "Drift Into Glow",
    illustrationStyle: "Black Cherry + Rose",
    notes: "Black cherry and clarified pomegranate with collagen peptides, L-Theanine, and chamomile.",
    backgroundColour: "#7c3aed",
    frameColour: "#ff8fb2",
    textColour: "#ffffff",
    color: "#7c3aed",
    colorB: "#ff8fb2",
    tags: ["black cherry", "rose", "collagen", "sleep", "night ritual", "Pakistan"],
    ingredients: {
      fruitBody: ["Black Cherry Extract", "Clarified Pomegranate Extract"],
      cellularActives: ["Hydrolyzed Collagen Peptides", "L-Theanine", "Glycine", "Magnesium Bisglycinate Chelate", "Chamomile Extract"],
      aromatherapyWaters: ["Steam-Distilled Rose Water", "Natural Vanilla Bean", "Encapsulated Ceylon Cinnamon"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Glycine", "Stevia Reb-M", "Monk Fruit", "Tri-Gel Matrix"],
    },
    allIngredients: [
      "Black Cherry Extract", "Clarified Pomegranate Extract",
      "Hydrolyzed Collagen Peptides", "L-Theanine", "Glycine", "Magnesium Bisglycinate Chelate", "Chamomile Extract",
      "Steam-Distilled Rose Water", "Natural Vanilla Bean", "Encapsulated Ceylon Cinnamon",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Glycine", "Stevia Reb-M", "Monk Fruit", "Tri-Gel Matrix"
    ],
  },
  {
    id: "passion-luxe",
    slug: "passion-luxe",
    name: "PASSION LUXE",
    slogan: "Age in Reverse",
    illustrationStyle: "Papaya + Passionfruit",
    notes: "Papaya, golden passionfruit, and watermelon with L-Citrulline, Tremella snow mushroom, and khus.",
    backgroundColour: "#f97316",
    frameColour: "#22d3ee",
    textColour: "#ffffff",
    color: "#f97316",
    colorB: "#22d3ee",
    tags: ["papaya", "passionfruit", "citrulline", "tremella", "energy drink", "Pakistan"],
    ingredients: {
      fruitBody: ["Papaya Puree", "Golden Passionfruit Extract", "Clarified Watermelon Essence", "Fresh Lime Juice"],
      cellularActives: ["L-Citrulline", "Potassium & Magnesium Citrate", "Vitamin C", "Tremella Snow Mushroom Extract"],
      aromatherapyWaters: ["Khus (Vetiver) Root Extract", "Natural Vanilla", "Warm Ginger Extract"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Allulose", "Sodium Citrate"],
    },
    allIngredients: [
      "Papaya Puree", "Golden Passionfruit Extract", "Clarified Watermelon Essence", "Fresh Lime Juice",
      "L-Citrulline", "Potassium & Magnesium Citrate", "Vitamin C", "Tremella Snow Mushroom Extract",
      "Khus (Vetiver) Root Extract", "Natural Vanilla", "Warm Ginger Extract",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Allulose", "Sodium Citrate"
    ],
  },
  {
    id: "acai-dew",
    slug: "acai-dew",
    name: "ACAI DEW",
    slogan: "Pure Clarity",
    illustrationStyle: "Acai + Blueberry",
    notes: "Acai, blueberry, and green apple with Zinc Bisglycinate, Niacinamide, and roasted fennel.",
    backgroundColour: "#6366f1",
    frameColour: "#5eead4",
    textColour: "#ffffff",
    color: "#6366f1",
    colorB: "#5eead4",
    tags: ["acai", "blueberry", "zinc", "niacinamide", "clarity", "Pakistan"],
    ingredients: {
      fruitBody: ["Acai Berry Extract", "Wild Blueberry Essence", "Crisp Green Apple Extract", "Fresh Lime Juice"],
      cellularActives: ["Zinc Bisglycinate", "Niacinamide (Vitamin B3)", "Vitamin B5 (Panthenol)", "L-Theanine"],
      aromatherapyWaters: ["Roasted Fennel Seed Extract", "Lemongrass Herbal Extract"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Erythritol", "Potassium Buffer"],
    },
    allIngredients: [
      "Acai Berry Extract", "Wild Blueberry Essence", "Crisp Green Apple Extract", "Fresh Lime Juice",
      "Zinc Bisglycinate", "Niacinamide (Vitamin B3)", "Vitamin B5 (Panthenol)", "L-Theanine",
      "Roasted Fennel Seed Extract", "Lemongrass Herbal Extract",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Erythritol", "Potassium Buffer"
    ],
  },
  {
    id: "pearl-sheen",
    slug: "pearl-sheen",
    name: "PEARL SHEEN",
    slogan: "Glow Unfiltered",
    illustrationStyle: "Dragon Fruit + Hibiscus",
    notes: "Dragon fruit, hibiscus, and pear with bamboo silica, low-MW hyaluronic acid, and biotin.",
    backgroundColour: "#ec4899",
    frameColour: "#22d3ee",
    textColour: "#ffffff",
    color: "#ec4899",
    colorB: "#22d3ee",
    tags: ["dragon fruit", "hibiscus", "pear", "biotin", "silica", "Pakistan"],
    ingredients: {
      fruitBody: ["Dragon Fruit Extract", "Decolorized Hibiscus", "Crisp Pear Extract", "Fresh Lime"],
      cellularActives: ["Bamboo Silica Extract", "Low-Molecular-Weight Hyaluronic Acid", "Biotin (Vitamin B7)", "Vitamin B5", "Vitamin C"],
      aromatherapyWaters: ["Lemongrass Extract", "Ginger Root", "Kewra Blossom Water"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Allulose"],
    },
    allIngredients: [
      "Dragon Fruit Extract", "Decolorized Hibiscus", "Crisp Pear Extract", "Fresh Lime",
      "Bamboo Silica Extract", "Low-Molecular-Weight Hyaluronic Acid", "Biotin (Vitamin B7)", "Vitamin B5", "Vitamin C",
      "Lemongrass Extract", "Ginger Root", "Kewra Blossom Water",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Allulose"
    ],
  },
  {
    id: "aloe-tide",
    slug: "aloe-tide",
    name: "ALOE TIDE",
    slogan: "Barrier of Light",
    illustrationStyle: "Yuzu + Aloe",
    notes: "Yuzu citrus, organic aloe vera, and de-oiled kinnow with water-dispersible phytoceramides.",
    backgroundColour: "#06b6d4",
    frameColour: "#5eead4",
    textColour: "#ffffff",
    color: "#06b6d4",
    colorB: "#5eead4",
    tags: ["yuzu", "aloe", "ceramides", "kinnow", "barrier repair", "Pakistan"],
    ingredients: {
      fruitBody: ["Yuzu Citrus Concentrate", "Organic Aloe Vera Inner Leaf", "De-oiled Kinnow Citrus", "Fresh Lime"],
      cellularActives: ["Hyaluronic Acid", "100% Water-Dispersible Phytoceramides", "Vitamin B5 (Panthenol)"],
      aromatherapyWaters: ["Bhuna Jeera (Roasted Cumin) Extract", "Warm Ginger Root"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Allulose", "Citrate Buffer"],
    },
    allIngredients: [
      "Yuzu Citrus Concentrate", "Organic Aloe Vera Inner Leaf", "De-oiled Kinnow Citrus", "Fresh Lime",
      "Hyaluronic Acid", "100% Water-Dispersible Phytoceramides", "Vitamin B5 (Panthenol)",
      "Bhuna Jeera (Roasted Cumin) Extract", "Warm Ginger Root",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Allulose", "Citrate Buffer"
    ],
  },
  {
    id: "bamboo-silk",
    slug: "bamboo-silk",
    name: "BAMBOO SILK",
    slogan: "Reflect Your Light",
    illustrationStyle: "Pearl + Bamboo",
    notes: "Clarified white guava puree with bamboo pearl silica, zinc bisglycinate, and fresh mint.",
    backgroundColour: "#0ea5e9",
    frameColour: "#a78bfa",
    textColour: "#ffffff",
    color: "#0ea5e9",
    colorB: "#a78bfa",
    tags: ["guava", "bamboo", "pearl", "zinc", "lycopene", "mint", "Pakistan"],
    ingredients: {
      fruitBody: ["Clarified White Guava Puree", "Fresh Lime"],
      cellularActives: ["Bamboo Pearl Silica", "Zinc Bisglycinate", "Niacinamide (Vitamin B3)", "Tomato Lycopene Extract", "Vitamin B5"],
      aromatherapyWaters: ["Pudina (Fresh Mint) Extract", "Steam-Distilled Rose Water"],
      secretCore: "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      baseMatrix: ["Stevia Reb-M", "Monk Fruit", "Erythritol", "Tri-Gel Firming Buffer"],
    },
    allIngredients: [
      "Clarified White Guava Puree", "Fresh Lime",
      "Bamboo Pearl Silica", "Zinc Bisglycinate", "Niacinamide (Vitamin B3)", "Tomato Lycopene Extract", "Vitamin B5",
      "Pudina (Fresh Mint) Extract", "Steam-Distilled Rose Water",
      "NOORIVA Secret Complex (featuring Saffron, Sea Buckthorn & Date Essence)",
      "Stevia Reb-M", "Monk Fruit", "Erythritol", "Tri-Gel Firming Buffer"
    ],
  },
];

export const SKU_IDS = SKUS.map((sku) => sku.id);
export const SKU_SLUGS = SKUS.map((sku) => sku.slug);

export function getNoorishSku(id) {
  return SKUS.find((sku) => sku.id === id) || null;
}

export function getNoorishSkuBySlug(slug) {
  return SKUS.find((sku) => sku.slug === slug) || null;
}

export const FAQS = [
  {
    question: "What is NOORISH GOLD?",
    answer:
      "NOORISH GOLD is NOORIVA's nature-led golden botanical heart. It is added at the golden botanical heart to every finished pouch, meaning the heart of every ritual, and gives each SKU the same premium NOORIVA aroma, body, and finish.",
  },
  {
    question: "Why is it called NOORISH GOLD?",
    answer:
      "The name reflects its deep amber color and the luxury saffron and rose architecture inside the formula. Saffron provides the 'gold' note, while the rose hydrosol base gives the drink its recognizable NOORIVA identity.",
  },
  {
    question: "Is NOORISH GOLD fully water-soluble?",
    answer:
      "Yes. It is formulated as a deep amber glow with zero sediment. gentle botanical extracts, kind by design prevent gritty sludge, oil slicks, or separation.",
  },
  {
    question: "Is NOORISH GOLD thermally stable?",
    answer:
      "Yes. The formula is designed to be blended gently to protect nature's delicate notes and remains compatible with a kind, botanical process that keeps every note alive.",
  },
  {
    question: "What does NOORISH GOLD taste like?",
    answer:
      "NOORISH GOLD has a layered flavor architecture: a silky botanical body, soft golden sweetness, a clear rose floral soul, bright sunlight and seaside freshness, and a a lingering saffron-gold finish.",
  },
  {
    question: "Can each SKU still taste different?",
    answer:
      "Yes. Every SKU shares the NOORISH GOLD base, but individual fruit or botanical layers create distinct profiles. ROSE HALO feels floral, MANGO BLAZE feels bright, BERRY BLOOM feels bold, and SAFFRON MIST feels golden and refined.",
  },
  {
    question: "Is NOORISH GOLD a medical or skincare treatment?",
    answer:
      "No. NOORISH GOLD is a food ingredient and sensory architecture for beverages. It supports premium positioning, taste, stability, and brand identity, but it should not be presented as a diagnosis, treatment, or cure for any condition.",
  },
  {
    question: "Where is NOORIVA available?",
    answer:
      "NOORIVA is positioned for Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and nationwide online ordering.",
  },
];

export const CTA_COPY = {
  hero: {
    primary: "Explore the Gold Base",
    secondary: "Order on WhatsApp",
  },
  collection: {
    title: "12 NOORIVA Rituals, One NOORISH GOLD Signature Base",
    description:
      "Each jewel-toned SKU shares the same production-ready gold architecture while expressing its own rose, fruit, botanical, or luxury profile.",
  },
  manufacturing: {
    title: "Production-Ready, Not Experimental",
    description:
      "NOORISH GOLD is designed for real pilot batches, supplier specification sheets, pouch manufacturing, and retail label copy.",
  },
  stability: {
    title: "Stable by Design",
    description:
      "Zero syneresis, zero sediment, no oil slick, hot-fill compatible, and color-stable for 12-month ambient storage positioning.",
  },
  trust: {
    title: "Built for Premium Retail",
    description:
      "GRAS/EFSA-style ingredient framing, clarified botanical inputs, controlled dosing, and a luxury sensory architecture that supports premium pricing.",
  },
};

export const NOORISH_GOLD_CONTENT = {
  brand: BRAND,
  commerce: COMMERCE,
  seo: SEO,
  hero: HERO,
  pillars: PILLARS,
  ingredientMatrix: INGREDIENT_MATRIX,
  ingredientMatrixNote: INGREDIENT_MATRIX_NOTE,
  flavorArchitecture: FLAVOR_ARCHITECTURE,
  functionalLayering: FUNCTIONAL_LAYERING_PER_POUCH,
  manufacturingProtocol: MANUFACTURING_PROTOCOL,
  stability: STABILITY_AND_SHELF_LIFE,
  commercialNotes: COMMERCIAL_NOTES,
  finalVerdict: FINAL_VERDICT,
  skus: SKUS,
  faqs: FAQS,
  ctaCopy: CTA_COPY,
};

export default NOORISH_GOLD_CONTENT;
