import Link from "next/link";
import NoorishGoldShowcase from "@/components/seo/NoorishGoldShowcase";
import {
  BRAND, COMMERCE, NOORISH_GOLD, SKUS, FAQS,
} from "@/lib/noorishGold";

const BASE_URL = "https://nooriva.co";

export const metadata = {
  title: "NOORISH GOLD by NOORIVA | The Flawless Signature Hero Complex",
  description:
    "Discover NOORISH GOLD by NOORIVA — a deep amber base of rose hydrosol, saffron, and mastic added at 12% w/w to every 150ml pouch. Explore the ingredient matrix, flavor architecture, and all 12 glow rituals crafted for Pakistan.",
  keywords: [
    "NOORISH GOLD", "NOORIVA", "signature hero complex", "drink your glow",
    "premium energy drink Pakistan", "glow drink Pakistan", "fresh fruit drink Pakistan",
    "halal drink Pakistan", "rose drink Pakistan", "saffron drink Pakistan",
    "beauty drink Pakistan", "pouch drink Pakistan", "rose hydrosol drink",
    "saffron drink benefits", "mastic drink Pakistan", "amla drink Pakistan",
    "sea buckthorn drink Pakistan", "150ml pouch drink Pakistan",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: { canonical: `${BASE_URL}/noorish-gold` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website", url: `${BASE_URL}/noorish-gold`,
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description: "A deep amber base of rose hydrosol, saffron, and mastic added at 12% w/w to every NOORIVA pouch.",
    siteName: "NOORIVA", locale: "en_PK",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "NOORISH GOLD signature hero complex by NOORIVA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORISH GOLD by NOORIVA — The Flawless Signature Hero Complex",
    description: "Discover the NOORISH GOLD signature hero complex for NOORIVA glow drinks in Pakistan.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${BASE_URL}/noorish-gold#webpage`, url: `${BASE_URL}/noorish-gold`, name: "NOORISH GOLD by NOORIVA", description: metadata.description, publisher: { "@type": "Organization", name: BRAND.name } },
    { "@type": "ItemList", name: "NOORISH GOLD Rituals", itemListElement: SKUS.map((sku, index) => ({ "@type": "ListItem", position: index + 1, url: `${BASE_URL}/drinks/${sku.slug}`, name: sku.name, description: `${sku.slogan}. ${sku.notes}.` })) },
    { "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ],
};

export default function NoorishGoldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NoorishGoldShowcase />
    </>
  );
}
