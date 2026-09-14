// lib/ingredientPages.js
// Per-botanical pages for /ingredients/[botanical].
//
// Grounded in INGREDIENT_MATRIX / PILLARS in lib/noorishGold.js.
// ⚠️ No formula ratios are revealed (NOORISH GOLD is shielded as a trade
// secret) and no medical or treatment claims are made — these are food
// ingredients described by role and sensory contribution only.

export const INGREDIENT_PAGES = [
  {
    slug: "saffron",
    name: "Kashmiri Saffron",
    latin: "Crocus sativus",
    role: "Signature Luminescence",
    headline: "Kashmiri Saffron in NOORIVA",
    what:
      "Saffron is the dried stigma of the Crocus sativus flower, picked by hand thread by thread. It is one of the most expensive spices in the world by weight, which is why it is used here as a trace ingredient rather than a bulk one — enough to perfume the finish, never enough to dominate it.",
    sensory: [
      "In NOORIVA, saffron is the closing note. It arrives after the fruit and florals have faded and leaves a warm honey-spice signature that stays on the palate for minutes. Our formulation notes call this the NOORIVA undertone.",
      "Crocin, the compound responsible for saffron's deep red-gold colour, is also why a saffron-forward pouch reads as amber in the glass rather than clear.",
    ],
    also: [
      "Saffron appears in every SKU as part of the shared NOORISH GOLD botanical heart, and is most prominent in the golden, floral profiles.",
    ],
    related: ["saffron-mist", "rose-halo", "cherry-veil"],
    faq: [
      {
        q: "Why is saffron used in a glow drink?",
        a: "Saffron works as the aromatic signature of the range. It carries the warm honey-spice finish that identifies a NOORIVA ritual, and it is dosed as a trace ingredient so the flavour stays refined rather than medicinal.",
      },
      {
        q: "Is Kashmiri saffron different from other saffron?",
        a: "Kashmiri saffron is prized for its deep colour and concentrated aroma. We specify it by name in the ingredient matrix, and the exact quantity used is part of the shielded NOORISH GOLD formulation.",
      },
    ],
  },
  {
    slug: "rose-hydrosol",
    name: "Rose Hydrosol",
    latin: "Rosa damascena",
    role: "Perfume-Grade Aroma",
    headline: "Rose Hydrosol in NOORIVA",
    what:
      "Rose hydrosol — arq-e-gulab — is produced by steam-distilling rose petals. Unlike a fragrance, it is a water-based distillate, which is why it integrates into a drink cleanly and gives aroma without any oil slick or sediment.",
    sensory: [
      "Rose is the floral anchor of the entire range. Our formulation notes describe it as the mid-palate core: the layer you notice after the sweetness of the base and before the tartness of the fruit.",
      "Because it is a distillate rather than an extract, rose hydrosol reads as fresh and lifted rather than syrupy — closer to the scent of a garden after rain than to a rose syrup.",
    ],
    also: [
      "Rose hydrosol is the single most consistent thread running through the range, and it is the reason two very different NOORIVA rituals still taste unmistakably like the same brand.",
    ],
    related: ["rose-halo", "peach-dusk", "cherry-veil"],
    faq: [
      {
        q: "Is rose hydrosol the same as rose water?",
        a: "Rose hydrosol is the concentrated distillate captured when rose petals are steam-distilled — the aromatic water that carries the plant's volatile compounds. It is a more defined ingredient than a diluted rose water.",
      },
      {
        q: "Does rose hydrosol make a drink taste like perfume?",
        a: "No. It is dosed as a mid-palate floral layer rather than a top note, so it reads as fresh and botanical. The formulation deliberately deepens it in the mid-palate to avoid a sharp, soapy edge.",
      },
    ],
  },
{
    slug: "sea-buckthorn",
    name: "Clarified Sea Buckthorn",
    latin: "Hippophae rhamnoides",
    role: "Cellular Hydrolipid Shield",
    headline: "Sea Buckthorn in NOORIVA",
    what:
      "Sea buckthorn is a hardy berry that grows on thorny shrubs across high-altitude Asia. It is naturally tart and vividly orange. In NOORIVA it is used as a clarified concentrate — the oil and pulp solids are removed, which is what keeps the finished liquid bright and sediment-free.",
    sensory: [
      "Sea buckthorn supplies the brightness layer. Our formulation notes describe it as vibrant berry-citrus tartness with deep acidity, and specifically without the harsh tannin astringency that unclarified fruit can leave behind.",
      "Its omega-7 fatty acid content is the reason it is often discussed in skin nutrition contexts. In a beverage, the clarification step matters more than anything else: it is what allows the berry's sharpness to survive without the drink turning dull or oily.",
    ],
    also: [
      "Sea buckthorn is one of the three public botanical anchors named in the NOORISH GOLD ingredient matrix, alongside Kashmiri saffron and date essence.",
    ],
    related: ["berry-bloom", "pearl-sheen", "acai-dew"],
    faq: [
      {
        q: "What does clarified sea buckthorn mean?",
        a: "Clarification removes the oil and pulp solids from the fruit concentrate. That keeps the finished drink bright and fully water-soluble, with zero sediment and no oil film on the surface.",
      },
      {
        q: "Why is sea buckthorn so tart compared to other berries?",
        a: "Sea buckthorn has a naturally high acid content for a berry, which is why it reads as sharp and citrus-like. In NOORIVA that sharpness is used deliberately as the brightness layer rather than being masked with sweetener.",
      },
    ],
  },
  {
    slug: "date-essence",
    name: "Cold-Filtered Date Essence",
    latin: "Phoenix dactylifera",
    role: "Prebiotic Foundation",
    headline: "Date Essence in NOORIVA",
    what:
      "Date essence is produced from dates by cold filtration rather than heat reduction. That distinction matters: heat-reduced date syrup darkens and thickens quickly, while cold filtration retains a clean caramel character and stays fully water-soluble.",
    sensory: [
      "Dates give NOORIVA its depth. Our formulation notes describe the effect as warm caramel sweetness and rounded body — the layer that sits underneath the fruit and stops a tart profile from tasting thin.",
      "It is also the ingredient that makes the range feel dessert-like without refined sugar. The base is built on non-glycemic sweetening, and date essence supplies the perceived richness that a sugar-free formulation would otherwise lack.",
    ],
    also: [
      "An earlier version of the formula used date fibre, which produced gritty texture and caused filtration problems in production. It was replaced with cold-filtered date essence — a change made specifically to keep the liquid smooth and sediment-free.",
    ],
    related: ["mango-blaze", "coco-glow", "saffron-mist"],
    faq: [
      {
        q: "Does date essence mean the drink contains added sugar?",
        a: "Date essence contributes natural sweetness from the fruit itself, but the range carries no refined sugar, no added cane sugar and no high-fructose syrup. The sweetening system is non-glycemic.",
      },
      {
        q: "Why cold-filtered rather than boiled down?",
        a: "Cold filtration preserves a cleaner caramel profile and avoids the darkening and viscosity you get from heat reduction. It also kept the liquid reliably soluble, which was the reason date fibre was dropped from the formula.",
      },
    ],
  },
{
    slug: "amla",
    name: "Clarified Amla",
    latin: "Phyllanthus emblica",
    role: "Radiance-Focused Botanical",
    headline: "Amla in NOORIVA",
    what:
      "Amla, or Indian gooseberry, is a small, sharply sour fruit that has been used across South Asia for centuries. Eaten raw it is intensely astringent — it will dry your mouth out — which is precisely why NOORIVA uses a clarified form rather than the whole fruit.",
    sensory: [
      "Amla contributes a bright, sour lift. In our formulation notes it sits in the radiance-focused botanical layer alongside sea buckthorn and hibiscus, adding sharpness that keeps a sweet profile from becoming cloying.",
      "The clarification step is doing the real work here. It strips out the harsh tannins that make raw amla taste drying, which is what allows the fruit's acidity to survive into the finished drink as brightness rather than bitterness.",
    ],
    also: [
      "Amla is one of the three botanicals named together in the radiance-focused layer of the NOORISH GOLD architecture, together with clarified sea buckthorn and hibiscus.",
    ],
    related: ["berry-bloom", "acai-dew", "aloe-tide"],
    faq: [
      {
        q: "What does amla taste like on its own?",
        a: "Raw amla is extremely sour and astringent — it dries the mouth. That is why it is used in a clarified form here, which removes the tannins and leaves the clean acidity behind.",
      },
      {
        q: "Is amla the same as gooseberry?",
        a: "Amla is the Indian gooseberry (Phyllanthus emblica). The name is sometimes used interchangeably with the European gooseberry, but they are different fruits — amla is noticeably more sour and more astringent.",
      },
    ],
  },
  {
    slug: "hibiscus",
    name: "Hibiscus",
    latin: "Hibiscus sabdariffa",
    role: "Radiance-Focused Botanical",
    headline: "Hibiscus in NOORIVA",
    what:
      "The hibiscus used in drinks is not the ornamental garden flower but the dried calyces of Hibiscus sabdariffa — the fleshy red cups that form around the seed pod. They are deeply crimson and intensely tart, closer to cranberry than to a floral taste.",
    sensory: [
      "Hibiscus does two jobs at once. It contributes tartness to the brightness layer, and it contributes colour: the deep red of a hibiscus infusion is water-soluble and needs no dye to appear in a drink.",
      "Because it is naturally high in acidity, hibiscus has to be balanced rather than simply added. Our formulation notes describe using it to prevent harsh tannins and colour drift — meaning it is dosed so the red stays stable rather than turning muddy over shelf life.",
    ],
    also: [
      "Hibiscus is most prominent in PEARL SHEEN, where it sits behind white dragon fruit as the tart and colour counterpoint.",
    ],
    related: ["pearl-sheen", "cherry-veil", "berry-bloom"],
    faq: [
      {
        q: "Does hibiscus give the drink its colour?",
        a: "Hibiscus is a natural water-soluble colour source, so it contributes to the deep red and jewel tones in the range. NOORIVA does not use artificial dyes.",
      },
      {
        q: "Is hibiscus tea the same thing?",
        a: "Hibiscus tea is an infusion of the same dried calyces, so the tart, cranberry-like direction is similar — but a tea infusion is steeped in water, whereas here the calyces are used as a formulating botanical inside a blended beverage.",
      },
    ],
  },
];

export function getIngredientPage(slug) {
  return INGREDIENT_PAGES.find((item) => item.slug === slug) || null;
}

export function allIngredientSlugs() {
  return INGREDIENT_PAGES.map((item) => item.slug);
}