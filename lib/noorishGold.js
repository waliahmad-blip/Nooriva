// lib/noorishGold.js
// Production content data for NOORIVA — NOORISH GOLD signature hero complex.
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
  metadataBase: new URL("https://nooriva.co"),
  title: {
    default: "NOORISH GOLD by NOORIVA | Signature Hero Complex | Drink Your Glow",
    template: "%s | NOORIVA NOORISH GOLD",
  },
  description:
    "NOORISH GOLD is NOORIVA's production-ready signature hero complex: a deep amber, fully water-soluble, thermally stable base added at 12% w/w to every finished pouch. Perfume-grade rose architecture, zero-sugar body, premium radiance positioning, and a distinct NOORIVA undertone.",
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
  authors: [{ name: "NOORIVA", url: "https://nooriva.co" }],
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
    url: "https://nooriva.co/",
    siteName: "NOORIVA",
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description:
      "Explore the production-ready NOORISH GOLD hero complex used at 12% w/w in every NOORIVA pouch: rose architecture, allulose body, date syrup depth, clarified amla, sea buckthorn, hibiscus, saffron, and mastic.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NOORISH GOLD by NOORIVA — premium glow drinks in Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description: "Production-ready signature hero complex for premium energy, glow, and fresh drink rituals in Pakistan.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://nooriva.co/",
    languages: {
      "en-PK": "https://nooriva.co/",
      "ur-PK": "https://nooriva.co/",
      "ar-PK": "https://nooriva.co/",
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
  usageRatio: "12% w/w",
  pouchDose: "18g per 150ml pouch",
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
    "Added at 12% w/w to every finished pouch — 18g per 150ml — this deep amber, fully water-soluble, zero-sediment, thermally stable complex gives NOORIVA its perfume-grade aroma, luxurious body, and signature NOORIVA undertone.",
  badges: [
    "FINALIZED",
    "PRODUCTION-READY",
    "12% w/w",
    "ZERO SEDIMENT",
    "HOT-FILL COMPATIBLE",
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

export const INGREDIENT_MATRIX = [
  {
    name: "Liquid Allulose / Glycerin Base",
    percent: 35.0,
    foodTechPurpose:
      "Zero-glycemic heavy body; provides luxurious mouthfeel that mimics honey without stickiness or crystallization risk.",
    flavorRole: "Honey-like sweetness with a smooth, clean finish.",
  },
  {
    name: "Rose Hydrosol (Steam-Distilled)",
    percent: 30.0,
    foodTechPurpose:
      "Primary floral anchor; provides the unmistakable, calming aroma that defines the NOORIVA brand identity across all SKUs.",
    flavorRole: "Perfume-grade floral top note and brand signature.",
  },
  {
    name: "Filtered Date Syrup (Cold-Pressed, Clarified)",
    percent: 20.0,
    foodTechPurpose:
      "Deep caramel sweetness and natural prebiotic depth; fully soluble to prevent gritty sediment or sludge at pouch bottom.",
    flavorRole: "Warm caramel, dried fruit, and rounded sweetness.",
  },
  {
    name: "Clarified Amla Extract (Decolorized)",
    percent: 6.0,
    foodTechPurpose:
      "Vitamin C powerhouse and Ayurvedic radiance anchor; clarified to remove harsh, mouth-drying tannins while retaining bright tartness.",
    flavorRole: "Clean tartness and brightening acidity.",
  },
  {
    name: "Sea Buckthorn Juice Concentrate (Clarified)",
    percent: 4.0,
    foodTechPurpose:
      "Omega-7 fatty acids for skin barrier and luminescence positioning; reduced dose prevents the fermented or cheesy off-note at high concentrations.",
    flavorRole: "Tropical berry brightness and subtle tart depth.",
  },
  {
    name: "Hibiscus Extract (Water-Soluble, Decolorized)",
    percent: 4.0,
    foodTechPurpose:
      "Anthocyanin antioxidant shield; adds tartness and polyphenol depth without muddying SKU colors or causing pH drift.",
    flavorRole: "Tart, cranberry-like, polyphenolic lift.",
  },
  {
    name: "Rose Petal Extract",
    percent: 0.8,
    foodTechPurpose:
      "Skin-soothing polyphenols; deepens the floral mid-palate for a perfume-like finish that lingers on the tongue.",
    flavorRole: "Layered floral bouquet and mid-palate depth.",
  },
  {
    name: "Saffron Extract (Aqueous)",
    percent: 0.15,
    foodTechPurpose:
      'The "Gold" in Noorish Gold; provides luxury signaling and a subtle honey-spice aroma that naturally amplifies sweet perception.',
    flavorRole: "Honeyed, slightly metallic-floral luxury note.",
  },
  {
    name: "Mastic Gum Extract (Water-Dispersible, Food Grade)",
    percent: 0.05,
    foodTechPurpose:
      "Replaces frankincense; provides an ancient resinous depth that is 100% water-soluble, GRAS-compliant, and zero oil-slick separation.",
    flavorRole: "Soft resinous, clean, lingering finish.",
  },
  {
    name: "Citric / Sodium Citrate Buffer",
    percent: 0.2,
    foodTechPurpose:
      'Ensures the final taste profile reads "sparkling" rather than aggressively sour or astringent.',
    flavorRole: "Smooth tartness with reduced astringency.",
  },
];

export const INGREDIENT_MATRIX_NOTE =
  "Percentages sum to approximately 100.2% due to standard rounding in food labeling; functionally treated as exactly 100% w/w premix.";

export const FLAVOR_ARCHITECTURE = [
  {
    layer: "Base / Body",
    description:
      "Luxurious honey-like sweetness without stickiness or glycemic spike from the allulose/glycerin matrix.",
  },
  {
    layer: "Depth",
    description:
      "Deep caramel notes from filtered date syrup, rounded by smooth citrate buffering that prevents dryness.",
  },
  {
    layer: "Floral Core",
    description:
      "Unmistakable rose hydrosol anchor, deepened in the mid-palate with rose petal extract for a layered bouquet.",
  },
  {
    layer: "Brightness / Tartness",
    description:
      "Clarified amla and sea buckthorn provide vibrant berry-tartness without tannin astringency or fermented off-notes.",
  },
  {
    layer: "Luxury Finish",
    description:
      'Trace saffron and mastic gum create a lingering "NOORIVA undertone" that remains on the palate for minutes.',
  },
];

export const FUNCTIONAL_LAYERING_PER_POUCH = [
  {
    ingredient: "Allulose / Glycerin base",
    amount: "~6.8g",
    role: "Zero-sugar smooth mouthfeel carrier and humectant balance.",
  },
  {
    ingredient: "Filtered Date Syrup",
    amount: "~4.8g",
    role: "Prebiotic fiber depth, natural caramel sweetness, and smoother GI profile.",
  },
  {
    ingredient: "Clarified Amla",
    amount: "~720mg",
    role: "Vitamin C and Ayurvedic radiance anchor with a low-tannin profile.",
  },
  {
    ingredient: "Sea Buckthorn",
    amount: "~600mg",
    role: "Omega-7 positioning for skin barrier and cellular luminescence.",
  },
  {
    ingredient: "Decolorized Hibiscus",
    amount: "~480mg",
    role: "Anthocyanin antioxidant shield and pH-stable color retention.",
  },
  {
    ingredient: "Rose Petal Extract",
    amount: "~120mg",
    role: "Floral mid-palate depth and soothing botanical positioning.",
  },
  {
    ingredient: "Saffron Extract",
    amount: "~22.5mg",
    role: "Crocin-rich luxury signal and subtle sweet aroma amplification.",
  },
  {
    ingredient: "Mastic Gum Extract",
    amount: "~7.5mg",
    role: "Ancient resinous note, water-soluble stability, and antimicrobial synergy.",
  },
  {
    ingredient: "Citric / Sodium Citrate Buffer",
    amount: "0.20%",
    role: 'Ensures "sparkling" tartness without astringency or dryness.',
  },
];

export const MANUFACTURING_PROTOCOL = [
  {
    step: "Dosing Point",
    protocol:
      "Add during Phase C of each SKU batch, after hydrocolloid hydration and before thermal processing.",
    rationale:
      "Ensures uniform dispersion without gum degradation or sweetener crystallization.",
  },
  {
    step: "Temperature",
    protocol: "Integrate at ≤70°C.",
    rationale:
      "Preserves saffron crocin, rose volatiles, and amla vitamin C from heat degradation.",
  },
  {
    step: "Shear Rate",
    protocol: "Gentle mixing at 300–400 RPM for 5 minutes.",
    rationale:
      "Prevents glycerin phase separation and volatile loss while ensuring homogeneity.",
  },
  {
    step: "pH Compatibility",
    protocol: "Compatible with universal base pH 3.75 ± 0.05.",
    rationale:
      "Citrate buffer protects anthocyanins and supports color/taste stability across SKUs.",
  },
  {
    step: "Preservation Synergy",
    protocol: "Works with potassium sorbate and EDTA.",
    rationale:
      "Supports microbial stability and reduces metal-catalyzed oxidation during hot-fill and shelf life.",
  },
];

export const STABILITY_AND_SHELF_LIFE = [
  "Zero syneresis or water leakage due to glycerin-allulose humectant balance.",
  "No sedimentation or gritty sludge because all extracts are clarified, filtered, and solubilized.",
  "No oil slick formation because mastic gum is water-dispersible and saffron/rose inputs are aqueous.",
  "Color stability maintained across 12-month ambient storage with decolorized hibiscus and amla.",
  "Hot-fill compatible at 80–85°C with less than 8-minute hold time to protect heat-labile actives.",
];

export const COMMERCIAL_NOTES = [
  "All ingredients are GRAS/EFSA food-grade approved; no novel food petitions are required for this formula profile.",
  "Frankincense was removed to eliminate regulatory complexity and resin solubility issues.",
  "Date fiber was replaced with filtered date syrup to prevent gritty texture complaints and production filtration bottlenecks.",
  "High-dose botanicals are maintained at effective but cost-efficient levels, including saffron at 0.15% and mastic at 0.05%.",
  "The formula supports premium retail positioning with measurable sensory depth and luxury brand recognition.",
];

export const FINAL_VERDICT = {
  title: "Final Verdict",
  description:
    "This is the definitive, production-ready NOORISH GOLD signature hero complex. It delivers perfume-grade aroma architecture, zero-sugar dessert-like sweetness, explicit radiance positioning, and hot-fill stability without compromising clarity, taste, or regulatory compliance. Every NOORIVA SKU shares this exact base, ensuring instant brand recognition while allowing each active layer to shine through its own jewel-toned profile.",
  status: "Ready for pilot batch scaling, supplier spec sheets, and retail label copy.",
};

export const SKUS = [
  {
    id: "rose-halo",
    slug: "rose-halo",
    name: "ROSE HALO",
    slogan: "Wake Up Luminous",
    illustrationStyle: "Rose + Lychee",
    notes: "Rose and lychee luminous ritual.",
    backgroundColour: "#D5A3AE",
    frameColour: "#4A2C1A",
    textColour: "#2A1B12",
    color: "#D5A3AE",
    colorB: "#4A2C1A",
    tags: ["rose", "lychee", "glow drink", "Pakistan"],
  },
  {
    id: "peach-dusk",
    slug: "peach-dusk",
    name: "PEACH DUSK",
    slogan: "Sleep Beautiful",
    illustrationStyle: "Peach + Chamomile",
    notes: "Peach and chamomile evening glow ritual.",
    backgroundColour: "#D6C7C8",
    frameColour: "#363636",
    textColour: "#2B2B2B",
    color: "#D6C7C8",
    colorB: "#363636",
    tags: ["peach", "chamomile", "calm drink", "Pakistan"],
  },
  {
    id: "mango-blaze",
    slug: "mango-blaze",
    name: "MANGO BLAZE",
    slogan: "Burn Bright",
    illustrationStyle: "Mango + Ginger",
    notes: "Mango and ginger energy ritual.",
    backgroundColour: "#E8A33D",
    frameColour: "#6A2F15",
    textColour: "#3E1D08",
    color: "#E8A33D",
    colorB: "#6A2F15",
    tags: ["mango", "ginger", "energy drink", "Pakistan"],
  },
  {
    id: "saffron-mist",
    slug: "saffron-mist",
    name: "SAFFRON MIST",
    slogan: "Repair in Gold",
    illustrationStyle: "Saffron + Vanilla",
    notes: "Saffron and vanilla luxury ritual.",
    backgroundColour: "#E7D3A8",
    frameColour: "#6F4A2E",
    textColour: "#4A3320",
    color: "#E7D3A8",
    colorB: "#6F4A2E",
    tags: ["saffron", "vanilla", "glow drink", "Pakistan"],
  },
  {
    id: "berry-bloom",
    slug: "berry-bloom",
    name: "BERRY BLOOM",
    slogan: "3 PM, Still Glowing",
    illustrationStyle: "Pomegranate + Berry",
    notes: "Pomegranate and berry midday glow ritual.",
    backgroundColour: "#5C2338",
    frameColour: "#F3D39B",
    textColour: "#FFF8EA",
    color: "#5C2338",
    colorB: "#F3D39B",
    tags: ["berry", "pomegranate", "fresh drink", "Pakistan"],
  },
  {
    id: "coco-glow",
    slug: "coco-glow",
    name: "COCO GLOW",
    slogan: "Reset Your Light",
    illustrationStyle: "Coconut + Moringa",
    notes: "Coconut and moringa reset ritual.",
    backgroundColour: "#557A5C",
    frameColour: "#7A8B5D",
    textColour: "#FFFFFF",
    color: "#557A5C",
    colorB: "#7A8B5D",
    tags: ["coconut", "moringa", "hydration drink", "Pakistan"],
  },
  {
    id: "cherry-veil",
    slug: "cherry-veil",
    name: "CHERRY VEIL",
    slogan: "Drift Into Glow",
    illustrationStyle: "Black Cherry + Rose",
    notes: "Black cherry and rose night glow ritual.",
    backgroundColour: "#35243F",
    frameColour: "#C2C6CA",
    textColour: "#FFFFFF",
    color: "#35243F",
    colorB: "#C2C6CA",
    tags: ["black cherry", "rose", "glow drink", "Pakistan"],
  },
  {
    id: "passion-luxe",
    slug: "passion-luxe",
    name: "PASSION LUXE",
    slogan: "Age in Reverse",
    illustrationStyle: "Papaya + Passionfruit",
    notes: "Papaya and passionfruit luxe ritual.",
    backgroundColour: "#F0725F",
    frameColour: "#C26A43",
    textColour: "#3E1713",
    color: "#F0725F",
    colorB: "#C26A43",
    tags: ["papaya", "passionfruit", "energy drink", "Pakistan"],
  },
  {
    id: "acai-dew",
    slug: "acai-dew",
    name: "ACAI DEW",
    slogan: "Pure Clarity",
    illustrationStyle: "Acai + Blueberry",
    notes: "Acai and blueberry clarity ritual.",
    backgroundColour: "#4247C9",
    frameColour: "#A69BD6",
    textColour: "#FFFFFF",
    color: "#4247C9",
    colorB: "#A69BD6",
    tags: ["acai", "blueberry", "antioxidant positioning", "Pakistan"],
  },
  {
    id: "pearl-sheen",
    slug: "pearl-sheen",
    name: "PEARL SHEEN",
    slogan: "Glow Unfiltered",
    illustrationStyle: "Dragon Fruit + Hibiscus",
    notes: "Dragon fruit and hibiscus sheen ritual.",
    backgroundColour: "#F3E9D8",
    frameColour: "#D9B7A8",
    textColour: "#3F2D30",
    color: "#F3E9D8",
    colorB: "#D9B7A8",
    tags: ["dragon fruit", "hibiscus", "fresh drink", "Pakistan"],
  },
  {
    id: "aloe-tide",
    slug: "aloe-tide",
    name: "ALOE TIDE",
    slogan: "Barrier of Light",
    illustrationStyle: "Yuzu + Aloe",
    notes: "Yuzu and aloe barrier ritual.",
    backgroundColour: "#9ADCD8",
    frameColour: "#135B63",
    textColour: "#123E42",
    color: "#9ADCD8",
    colorB: "#135B63",
    tags: ["yuzu", "aloe", "hydration drink", "Pakistan"],
  },
  {
    id: "bamboo-silk",
    slug: "bamboo-silk",
    name: "BAMBOO SILK",
    slogan: "Reflect Your Light",
    illustrationStyle: "Pearl + Bamboo",
    notes: "Pearl and bamboo silk ritual.",
    backgroundColour: "#DCC8A8",
    frameColour: "#8E6B3F",
    textColour: "#45321A",
    color: "#DCC8A8",
    colorB: "#8E6B3F",
    tags: ["pearl", "bamboo", "glow drink", "Pakistan"],
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
      "NOORISH GOLD is NOORIVA's finalized, production-ready signature hero complex. It is added at 12% w/w to every finished pouch, meaning 18g per 150ml pouch, and gives each SKU the same premium NOORIVA aroma, body, and finish.",
  },
  {
    question: "Why is it called NOORISH GOLD?",
    answer:
      "The name reflects its deep amber color and the luxury saffron and rose architecture inside the formula. Saffron provides the 'gold' note, while the rose hydrosol base gives the drink its recognizable NOORIVA identity.",
  },
  {
    question: "Is NOORISH GOLD fully water-soluble?",
    answer:
      "Yes. It is formulated as a deep amber liquid with zero sediment. Clarified date syrup, water-dispersible mastic gum, aqueous saffron extract, and decolorized botanical extracts prevent gritty sludge, oil slicks, or separation.",
  },
  {
    question: "Is NOORISH GOLD thermally stable?",
    answer:
      "Yes. The formula is designed to be integrated below 70°C during manufacturing and remains compatible with hot-fill processes at 80–85°C with controlled hold times under 8 minutes.",
  },
  {
    question: "What does NOORISH GOLD taste like?",
    answer:
      "NOORISH GOLD has a layered flavor architecture: a luxurious honey-like allulose body, deep caramel date sweetness, a clear rose floral anchor, bright amla and sea buckthorn tartness, and a lingering saffron-mastic luxury finish.",
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
