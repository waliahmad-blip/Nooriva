import { BRAND, NOORISH_GOLD } from "./noorishGold";

export const SEO_LANDING_PAGES = {
  "energy-drinks": {
    slug: "energy-drinks",
    title: "Energy Drinks in Pakistan | NOORISH GOLD by NOORIVA",
    description:
      "Discover NOORIVA energy drink rituals built on NOORISH GOLD: Mango Blaze, Berry Bloom, Passion Luxe, Acai Dew, Saffron Mist, and Coco Glow. Premium, fresh, and designed for Pakistan.",
    keywords: [
      "energy drink Pakistan",
      "NOORIVA energy drink",
      "NOORISH GOLD",
      "mango energy drink",
      "berry energy drink",
      "acai drink Pakistan",
      "fresh energy drink Pakistan",
      "halal drink Pakistan",
    ],
    heading: "Energy Drinks in Pakistan",
    subheading: "NOORISH GOLD rituals built for brightness, refreshment, and premium glow energy.",
    body: [
      "Energy drink intent in Pakistan often combines refreshment, clean sweetness, and confidence. NOORISH GOLD creates a luxurious zero-glycemic body, bright fruit layers, and a lingering saffron-mastic finish.",
      "MANGO BLAZE pairs mango and ginger. BERRY BLOOM brings pomegranate and berry. PASSION LUXE gives papaya and passionfruit. ACAI DEW adds a bright acai and blueberry profile.",
      `Every pouch shares the ${NOORISH_GOLD.name} signature hero complex at ${NOORISH_GOLD.usageRatio}, so each drink feels unmistakably ${BRAND.name}.`,
    ],
    relatedSkuIds: ["mango-blaze", "berry-bloom", "passion-luxe", "acai-dew", "saffron-mist", "coco-glow"],
    relatedPageSlugs: ["noorish-gold", "glow-drinks", "fresh-drinks"],
    faqIndexes: [0, 1, 2, 3, 4, 5],
  },
  "glow-drinks": {
    slug: "glow-drinks",
    title: "Glow Drinks in Pakistan | NOORISH GOLD by NOORIVA",
    description:
      "Explore NOORIVA glow drink rituals built on NOORISH GOLD. Rose Halo, Saffron Mist, Berry Bloom, Cherry Veil, Pearl Sheen, Aloe Tide, and Bamboo Silk — radiant fresh drinks for Pakistan.",
    keywords: [
      "glow drink Pakistan",
      "beauty drink Pakistan",
      "skin glow drink",
      "radiance drink",
      "rose drink Pakistan",
      "saffron drink Pakistan",
      "hibiscus drink",
      "aloe drink Pakistan",
      "NOORISH GOLD",
      "NOORIVA drink your glow",
    ],
    heading: "Glow Drinks in Pakistan",
    subheading: "NOORISH GOLD glow rituals with rose, saffron, berry, cherry, hibiscus, aloe, and bamboo layers.",
    body: [
      "A glow drink should feel premium from the first aroma. NOORISH GOLD uses steam-distilled rose hydrosol, filtered date syrup, clarified amla, sea buckthorn, hibiscus, saffron, and mastic to create a layered finish.",
      "ROSE HALO is the luminous morning ritual. SAFFRON MIST repairs in gold. BERRY BLOOM is the 3 PM glow moment. CHERRY VEIL drifts into night with black cherry and rose.",
      `The ${BRAND.name} glow collection is built around one signature hero complex, keeping every SKU instantly recognizable.`,
    ],
    relatedSkuIds: ["rose-halo", "saffron-mist", "berry-bloom", "cherry-veil", "pearl-sheen", "aloe-tide", "bamboo-silk"],
    relatedPageSlugs: ["noorish-gold", "energy-drinks", "fresh-drinks"],
    faqIndexes: [0, 1, 2, 3, 4, 6],
  },
  "fresh-drinks": {
    slug: "fresh-drinks",
    title: "Fresh Fruit Drink Rituals in Pakistan | NOORIVA",
    description:
      "Discover NOORIVA fresh fruit drink rituals built on NOORISH GOLD: mango, coconut, acai, dragon fruit, aloe, bamboo, lychee, peach, passionfruit, berry, and hibiscus profiles for Pakistan.",
    keywords: [
      "fresh drink Pakistan",
      "fresh fruit drink Pakistan",
      "NOORIVA",
      "NOORISH GOLD",
      "mango drink Pakistan",
      "coconut drink",
      "acai drink Pakistan",
      "dragon fruit drink",
      "hibiscus drink Pakistan",
      "aloe drink Pakistan",
    ],
    heading: "Fresh Fruit Drink Rituals in Pakistan",
    subheading: "NOORISH GOLD brings clarity, brightness, and premium fruit architecture to every pouch.",
    body: [
      "Fresh drink intent is about brightness, clarity, and repeatable flavor. NOORISH GOLD supports this with rose hydrosol, date syrup depth, clarified amla, sea buckthorn, hibiscus tartness, and a saffron-mastic finish.",
      "MANGO BLAZE and BERRY BLOOM provide bold fruit energy. COCO GLOW offers reset-light coconut and moringa. PEARL SHEEN brings dragon fruit and hibiscus. ALOE TIDE delivers yuzu and aloe freshness.",
      `Each ritual shares ${NOORISH_GOLD.name}, so the ${BRAND.tagline} experience remains consistent across all 12 SKUs.`,
    ],
    relatedSkuIds: ["mango-blaze", "coco-glow", "acai-dew", "pearl-sheen", "aloe-tide", "bamboo-silk", "rose-halo"],
    relatedPageSlugs: ["noorish-gold", "energy-drinks", "glow-drinks"],
    faqIndexes: [0, 1, 2, 3, 4, 5],
  },
};

export function getSeoLandingPage(slug) {
  return SEO_LANDING_PAGES[slug] || null;
}

export function getSeoLandingPageConfig(slug) {
  const page = getSeoLandingPage(slug);
  if (!page) return null;
  return page;
}
