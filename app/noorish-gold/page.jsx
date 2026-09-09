import Link from "next/link";
import NoorishGoldShowcase from "@/components/seo/NoorishGoldShowcase";
import { BRAND, SKUS, FAQS } from "@/lib/noorishGold";

const BASE_URL = "https://nooriva.co";

export const metadata = {
  title: "NOORISH GOLD by NOORIVA | Nature's Golden Heart Pakistan",
  description:
    "Discover NOORISH GOLD by NOORIVA — a golden botanical heart of saffron, rose, and nature's own glow. Available nationwide in Pakistan with Cash on Delivery (COD) across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.",
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
    "NOORISH GOLD Karachi",
    "NOORISH GOLD Lahore",
    "NOORISH GOLD Islamabad",
    "NOORISH GOLD Rawalpindi",
    "NOORISH GOLD Faisalabad",
    "NOORISH GOLD Multan",
    "NOORISH GOLD Peshawar",
    "NOORISH GOLD Quetta",
    "NOORISH GOLD Sialkot",
    "NOORISH GOLD Gujranwala",
    "Cash on Delivery Pakistan drinks",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: `${BASE_URL}/noorish-gold`,
    languages: {
      "en-PK": `${BASE_URL}/noorish-gold`,
      "ur-PK": `${BASE_URL}/noorish-gold`,
      "ar-PK": `${BASE_URL}/noorish-gold`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/noorish-gold`,
    title: "NOORISH GOLD by NOORIVA — Nature's Golden Heart Pakistan",
    description: "A golden botanical heart of saffron, rose, and nature's own glow. Available nationwide with Cash on Delivery (COD) across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.",
    siteName: "NOORIVA",
    locale: "en_PK",
    alternateLocale: ["ur_PK", "ar_PK"],
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
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/noorish-gold#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "NOORISH GOLD", item: `${BASE_URL}/noorish-gold` },
      ],
    },
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
        item: {
          "@type": "Product",
          name: `${sku.name} by NOORIVA`,
          image: `${BASE_URL}/og-image.png`,
          description: `${sku.slogan}. Part of NOORIVA's proprietary golden botanical heart.`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "128",
            bestRating: "5",
            worstRating: "1",
          },
        },
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