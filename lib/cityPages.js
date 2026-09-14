// lib/cityPages.js
// Per-city landing pages for /glow-drinks/[city].
//
// RULE: every entry MUST carry genuinely distinct copy. Ten near-identical
// pages differing only by city name is a "doorway page" pattern that
// Google ignores or demotes. Delivery windows match lib/data.js `cities`.

export const CITY_PAGES = [
  {
    slug: "karachi",
    name: "Karachi",
    region: "Sindh",
    eta: "2–3 working days",
    dispatch: "Express rider dispatch across the city",
    headline: "Glow Drinks in Karachi",
    intro:
      "Karachi's coastal humidity and long working days make steady hydration the hardest part of any glow routine. Every NOORIVA glow drink is a 150ml squeezable pouch you can finish in under a minute — zero added sugar, nothing that needs refrigeration, and small enough to live in a handbag or glovebox.",
    local: [
      "From Clifton and DHA to Gulshan-e-Iqbal, North Nazimabad, PECHS and Bahadurabad, most Karachi addresses arrive in 2–3 working days. Cash on Delivery is available on every order, so you pay when the pouch is actually in your hand.",
      "If you are choosing a first ritual, ALOE TIDE (yuzu and aloe) and PEARL SHEEN (dragon fruit and hibiscus) suit Karachi's warm, humid months, while ROSE HALO is a natural fit for an early start before the commute.",
    ],
    suggestion: ["aloe-tide", "pearl-sheen", "rose-halo"],
    faq: [
      {
        q: "Do you deliver NOORIVA glow drinks in Karachi with Cash on Delivery?",
        a: "Yes. Cash on Delivery is available on every Karachi order, with free delivery automatically applied above ₨ 5,000 and a flat ₨ 250 below that. Most Karachi addresses are reached in 2–3 working days.",
      },
      {
        q: "Which glow drink suits Karachi's humid weather best?",
        a: "ALOE TIDE, built on yuzu and cold-pressed aloe, was designed around cooling freshness, and PEARL SHEEN brings dragon fruit and hibiscus. Both are zero added sugar and need no refrigeration before opening.",
      },
    ],
  },
  {
    slug: "lahore",
    name: "Lahore",
    region: "Punjab",
    eta: "2–3 working days",
    dispatch: "Express rider dispatch across the city",
    headline: "Glow Drinks in Lahore",
    intro:
      "Lahore runs on food, late evenings and long conversations — which is exactly why a light, zero-sugar ritual works better here than another heavy drink. NOORIVA pouches are 150ml, water-soluble and built around saffron, rose and date essence rather than refined sugar.",
    local: [
      "We deliver across Gulberg, DHA, Johar Town, Model Town, Bahria Town, Iqbal Town and the Walled City in 2–3 working days, with Cash on Delivery on every order. Free delivery applies automatically above ₨ 5,000.",
      "For Lahore's hot summer months and its winter smog season alike, hydration-focused rituals tend to be the easiest habit to keep: COCO GLOW pairs coconut water with moringa, and ALOE TIDE is the lighter, cooler option.",
    ],
    suggestion: ["coco-glow", "aloe-tide", "saffron-mist"],
    faq: [
      {
        q: "How fast is NOORIVA delivery in Lahore?",
        a: "Most Lahore addresses — including Gulberg, DHA, Johar Town and Model Town — are delivered in 2–3 working days with Cash on Delivery, and delivery is free on orders above ₨ 5,000.",
      },
      {
        q: "Is there a glow drink for Lahore's summer heat?",
        a: "Yes. COCO GLOW (raw coconut water and moringa) and ALOE TIDE (yuzu and aloe) are the two most cooling profiles in the range. Both are zero added sugar and can be drunk straight from the pouch.",
      },
    ],
  },
{
    slug: "islamabad",
    name: "Islamabad",
    region: "Islamabad Capital Territory",
    eta: "2–4 working days",
    dispatch: "Air express courier",
    headline: "Glow Drinks in Islamabad",
    intro:
      "Islamabad's cooler, drier air and slower pace change what your skin actually needs — less oil control, more barrier support. NOORIVA's botanical heart leans on rose hydrosol, sea buckthorn and saffron, a gentler daily ritual than a high-stimulant energy drink.",
    local: [
      "Sectors across Islamabad — F, G, E, H, I and DHA — are covered in 2–4 working days by air express courier, with Cash on Delivery available throughout. Free delivery applies above ₨ 5,000.",
      "Because Islamabad sits cooler than the plains, SAFFRON MIST (Kashmiri saffron and vanilla) tends to suit an evening slot, while BERRY BLOOM works well as an afternoon reset.",
    ],
    suggestion: ["saffron-mist", "berry-bloom", "rose-halo"],
    faq: [
      {
        q: "Does NOORIVA deliver to all Islamabad sectors?",
        a: "Yes — F, G, E, H and I sectors plus DHA Islamabad are covered in 2–4 working days by air express courier, with Cash on Delivery available on every order.",
      },
      {
        q: "Is NOORIVA a caffeinated energy drink?",
        a: "No. NOORIVA is a botanical glow and hydration ritual, not a high-stimulant energy drink. There is no added caffeine or refined sugar — the lift comes from fruit and botanical layers built on the NOORISH GOLD base.",
      },
    ],
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    region: "Punjab",
    eta: "2–4 working days",
    dispatch: "Air express courier",
    headline: "Glow Drinks in Rawalpindi",
    intro:
      "Rawalpindi shares its weather with Islamabad but not its traffic — long days in dense markets and commutes make the pouch format genuinely useful. A 150ml NOORIVA ritual travels in a bag, needs no fridge, and contains no added sugar.",
    local: [
      "Satellite Town, Bahria Town, Chaklala, Saddar, Adiala Road and the older bazaars are all served in 2–4 working days with Cash on Delivery, and delivery is free above ₨ 5,000.",
      "For a commute-heavy day, MANGO BLAZE (Sindhri mango and ginger) is the brighter pick, while CHERRY VEIL (black cherry and rose) suits a later wind-down.",
    ],
    suggestion: ["mango-blaze", "cherry-veil", "coco-glow"],
    faq: [
      {
        q: "Which parts of Rawalpindi does NOORIVA deliver to?",
        a: "Satellite Town, Bahria Town, Chaklala, Saddar, Adiala Road and surrounding Rawalpindi areas are covered in 2–4 working days with Cash on Delivery.",
      },
      {
        q: "Can I take a NOORIVA pouch to work without refrigerating it?",
        a: "Yes. The pouch is hot-filled and sealed in multi-layer foil for 12-month ambient stability, so it can sit in a bag or desk drawer. There is no need to refrigerate before opening.",
      },
    ],
  },
{
    slug: "faisalabad",
    name: "Faisalabad",
    region: "Punjab",
    eta: "3–4 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Faisalabad",
    intro:
      "Faisalabad runs on shift work. Mills, markets and export houses mean early starts and long hours, and a ritual only survives if it is genuinely convenient. A NOORIVA pouch is one-handed, needs no fridge and carries no added sugar — so it fits a factory floor or an office desk the same way.",
    local: [
      "Delivery across Faisalabad — People's Colony, D Ground, Jaranwala Road, Sargodha Road, Madina Town and the industrial estates — takes 3–4 working days by standard secured courier, with Cash on Delivery available.",
      "For shift patterns, ROSE HALO works well as a pre-dawn ritual and MANGO BLAZE as an afternoon lift that will not leave you flat an hour later, since there is no refined sugar in the formulation.",
    ],
    suggestion: ["rose-halo", "mango-blaze", "berry-bloom"],
    faq: [
      {
        q: "How long does NOORIVA delivery take in Faisalabad?",
        a: "Faisalabad is served in 3–4 working days by standard secured courier, covering People's Colony, D Ground, Madina Town, Jaranwala Road and the industrial estates, with Cash on Delivery available.",
      },
      {
        q: "Does NOORIVA have caffeine or sugar that will disturb a shift routine?",
        a: "No. There is no added caffeine and no refined sugar. The range is sweetened with non-glycemic ingredients, so it does not produce the sharp spike-and-crash that a conventional energy drink does.",
      },
    ],
  },
  {
    slug: "multan",
    name: "Multan",
    region: "Punjab",
    eta: "3–5 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Multan",
    intro:
      "Multan is one of the hottest cities in Pakistan through the summer, and heat is where hydration stops being optional. NOORIVA pouches are built for exactly that condition — water-soluble, lightly sweetened without refined sugar and stable at ambient temperature, so nothing is lost in transit.",
    local: [
      "We deliver across Multan — Cantt, Shah Rukn-e-Alam, Bosan Road, Gulgasht Colony and Mumtazabad — in 3–5 working days with Cash on Delivery, and delivery is free above ₨ 5,000.",
      "In peak summer, COCO GLOW (coconut water and moringa) and ALOE TIDE (yuzu and aloe) are the two profiles to start with. Both were built around electrolyte-free, zero-sugar refreshment rather than a stimulant lift.",
    ],
    suggestion: ["coco-glow", "aloe-tide", "pearl-sheen"],
    faq: [
      {
        q: "Does NOORIVA survive Multan's summer heat in transit?",
        a: "Yes. The formulation is designed to be thermally stable and each pouch is hot-filled and sealed in multi-layer foil for 12-month ambient storage, so it does not need cold-chain delivery.",
      },
      {
        q: "What should I order first in Multan?",
        a: "For the hottest months, COCO GLOW and ALOE TIDE are the most cooling. A trio is a common way to start so you can find which ritual suits your routine before committing to six.",
      },
    ],
  },
{
    slug: "peshawar",
    name: "Peshawar",
    region: "Khyber Pakhtunkhwa",
    eta: "3–5 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Peshawar",
    intro:
      "Peshawar's climate swings hard between dusty summer heat and genuinely cold winters, and a routine that works in both is worth more than a seasonal one. NOORIVA is a year-round 150ml ritual: no added sugar, no refrigeration, and light enough to drink through either extreme.",
    local: [
      "Delivery across Peshawar — University Road, Hayatabad, Gulbahar, Saddar and the old city — takes 3–5 working days, with Cash on Delivery available on every order and free delivery above ₨ 5,000.",
      "Through the hot, dusty months COCO GLOW and ALOE TIDE are the most comfortable choices, while SAFFRON MIST tends to work better through the colder season when a warmer, richer profile feels right.",
    ],
    suggestion: ["coco-glow", "aloe-tide", "saffron-mist"],
    faq: [
      {
        q: "Which areas of Peshawar does NOORIVA deliver to?",
        a: "University Road, Hayatabad, Gulbahar, Saddar and the old city, plus surrounding Peshawar areas, are served in 3–5 working days with Cash on Delivery.",
      },
      {
        q: "Is NOORIVA halal-compliant?",
        a: "NOORIVA is positioned as a halal-compliant Pakistani brand. Food-grade sourcing, documentation and supplier specifications are designed to support halal positioning and retail compliance.",
      },
    ],
  },
  {
    slug: "quetta",
    name: "Quetta",
    region: "Balochistan",
    eta: "3–5 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Quetta",
    intro:
      "Quetta sits at roughly 1,700 metres, where the air is thinner, drier and far more dehydrating than coastal visitors expect. Dry air pulls moisture from skin without you feeling thirsty, so a consistent hydration ritual matters more here than the weather suggests.",
    local: [
      "We deliver across Quetta — Jinnah Road, Samungli Road, Sariab Road, Airport Road and Chaman Housing — in 3–5 working days, with Cash on Delivery available and free delivery above ₨ 5,000.",
      "Because Quetta's air is dry rather than humid, COCO GLOW's coconut water and moringa base and ROSE HALO's rose hydrosol profile are the two most commonly chosen starting points.",
    ],
    suggestion: ["coco-glow", "rose-halo", "aloe-tide"],
    faq: [
      {
        q: "How long does delivery to Quetta take?",
        a: "Quetta is served in 3–5 working days by standard secured courier, covering Jinnah Road, Samungli Road, Sariab Road and Chaman Housing, with Cash on Delivery available on every order.",
      },
      {
        q: "Why does a hydration ritual matter more in a dry climate like Quetta?",
        a: "Dry, high-altitude air increases insensible water loss from skin without triggering a strong thirst response, so intake tends to drop below what the body actually needs. A fixed daily ritual is an easier habit to sustain than reacting to thirst.",
      },
    ],
  },
{
    slug: "sialkot",
    name: "Sialkot",
    region: "Punjab",
    eta: "3–5 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Sialkot",
    intro:
      "Sialkot is an export city — early calls with buyers abroad, long production days and a working culture built around deadlines. A ritual that survives that schedule has to be fast and portable, which is why the 150ml pouch format suits Sialkot particularly well.",
    local: [
      "Delivery across Sialkot — Cantt, Paris Road, Kashmir Road, Khadim Ali Road, Sialkot city and the export-processing zones — takes 3–5 working days, with Cash on Delivery available and free delivery above ₨ 5,000.",
      "For early international calls, ROSE HALO is a light way to start the day, while BERRY BLOOM handles the mid-afternoon dip without the crash that refined sugar brings.",
    ],
    suggestion: ["rose-halo", "berry-bloom", "mango-blaze"],
    faq: [
      {
        q: "How fast is NOORIVA delivery in Sialkot?",
        a: "Sialkot and its export-processing zones are served in 3–5 working days by standard secured courier with Cash on Delivery, covering Cantt, Paris Road, Kashmir Road and Khadim Ali Road.",
      },
      {
        q: "Is there a minimum order for Sialkot delivery?",
        a: "There is no minimum. A single pouch can be ordered, though delivery is free once your order passes ₨ 5,000 — below that a flat ₨ 250 applies.",
      },
    ],
  },
  {
    slug: "gujranwala",
    name: "Gujranwala",
    region: "Punjab",
    eta: "3–5 working days",
    dispatch: "Standard secured courier",
    headline: "Glow Drinks in Gujranwala",
    intro:
      "Gujranwala has a serious food culture and a growing fitness scene, and those two things rarely agree. NOORIVA sits between them: a full-flavoured ritual with zero added sugar, so it works after a training session without undoing it.",
    local: [
      "Delivery across Gujranwala — GT Road, Satellite Town, Wapda Town, Model Town, Peoples Colony and the industrial areas — takes 3–5 working days with Cash on Delivery, free above ₨ 5,000.",
      "Post-workout, COCO GLOW's coconut water and moringa profile is the natural fit; for the food-heavy evenings Gujranwala is known for, CHERRY VEIL is the lighter follow-up.",
    ],
    suggestion: ["coco-glow", "cherry-veil", "aloe-tide"],
    faq: [
      {
        q: "Does NOORIVA deliver to Gujranwala with Cash on Delivery?",
        a: "Yes. Gujranwala — including GT Road, Satellite Town, Wapda Town, Model Town and Peoples Colony — is served in 3–5 working days with Cash on Delivery available on every order.",
      },
      {
        q: "Is NOORIVA suitable post-workout?",
        a: "COCO GLOW pairs coconut water with moringa and is the closest fit to a recovery ritual, with no added sugar and no caffeine. It is a beverage, not a sports supplement, so it complements rather than replaces a proper recovery plan.",
      },
    ],
  },
];
export function getCityPage(slug) {
  return CITY_PAGES.find((city) => city.slug === slug) || null;
}

export function allCitySlugs() {
  return CITY_PAGES.map((city) => city.slug);
}