import Link from "next/link";
import NoorishGoldShowcase from "@/components/seo/NoorishGoldShowcase";
import { BRAND, SKUS, FAQS } from "@/lib/noorishGold";

const BASE_URL = "https://nooriva.co";

export const metadata = {
  title: "NOORISH GOLD by NOORIVA | Nature's Golden Heart",
  description:
    "Discover NOORISH GOLD by NOORIVA — a golden botanical heart of saffron, rose, and nature's own glow. Explore the sensory story and all 12 natural skin-food rituals.",
  keywords: [
    "NOORISH GOLD",
    "NOORIVA",
    "natural golden heart",
    "drink your natural glow",
    "botanical energy drink",
    "natural glow drink",
    "skin food drink",
    "organic glow ritual",
    "rose saffron drink",
    "plant-based wellness",
    "clean hydration",
    "radiance from within",
    "nature drink story",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: { canonical: `${BASE_URL}/noorish-gold` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/noorish-gold`,
    title: "NOORISH GOLD by NOORIVA — Nature's Golden Heart",
    description: "A golden botanical heart of saffron, rose, and nature's own glow.",
    siteName: "NOORIVA",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NOORISH GOLD by NOORIVA — nature's golden heart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORISH GOLD by NOORIVA — Nature's Golden Heart",
    description: "Discover the botanical story behind NOORIVA's natural glow rituals.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/noorish-gold#webpage`,
      url: `${BASE_URL}/noorish-gold`,
      name: "NOORISH GOLD by NOORIVA",
      description: metadata.description,
      publisher: { "@type": "Organization", name: BRAND.name },
    },
    {
      "@type": "ItemList",
      name: "NOORISH GOLD Rituals",
      itemListElement: SKUS.map((sku, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/drinks/${sku.slug}`,
        name: sku.name,
        description: `${sku.slogan}. ${sku.notes}.`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function NoorishGoldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NoorishGoldShowcase />
    </>
  );
}