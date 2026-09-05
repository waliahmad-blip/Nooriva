import Link from "next/link";
import { notFound } from "next/navigation";
import DrinkShowcase from "@/components/seo/DrinkShowcase";
import {
  BRAND,
  COMMERCE,
  NOORISH_GOLD,
  SKUS,
} from "@/lib/noorishGold";

const BASE_URL = "https://nooriva.co";

function getDrink(slug) {
  return SKUS.find((sku) => sku.slug === slug) || null;
}

export function generateStaticParams() {
  return SKUS.map((sku) => ({ slug: sku.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const drink = getDrink(slug);
  if (!drink) {
    return {
      title: "Drink Not Found",
      description: "This NOORIVA drink was not found.",
      robots: { index: false, follow: false },
    };
  }
  const url = `${BASE_URL}/drinks/${drink.slug}`;
  const title = `${drink.name} — ${drink.slogan} | NOORISH GOLD by NOORIVA`;
  const description = `${drink.slogan}. ${drink.name} is a ${drink.illustrationStyle} glow drink ritual built on the NOORISH GOLD signature hero complex. Premium energy drink and fresh drink positioning for Pakistan.`;
  return {
    title,
    description,
    keywords: [
      drink.name, drink.slogan, drink.illustrationStyle,
      "NOORIVA", "NOORISH GOLD", "energy drink Pakistan",
      "glow drink Pakistan", "fresh drink Pakistan", "halal drink Pakistan",
    ],
    authors: [{ name: BRAND.name }],
    creator: BRAND.name,
    publisher: BRAND.name,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article", url, title, description, siteName: "NOORIVA",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${drink.name} NOORISH GOLD glow drink` }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function DrinkPage({ params }) {
  const { slug } = await params;
  const drink = getDrink(slug);
  if (!drink) notFound();

  const productUrl = `${BASE_URL}/drinks/${drink.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${drink.name} by ${BRAND.name}`,
    image: `${BASE_URL}/og-image.png`,
    description: `${drink.slogan}. ${drink.name} is a ${drink.illustrationStyle} glow drink ritual built on the NOORISH GOLD signature hero complex.`,
    url: productUrl,
    category: "Glow drink / Energy drink / Fresh drink",
    keywords: `${drink.name}, ${drink.slogan}, ${drink.illustrationStyle}, NOORISH GOLD, energy drink Pakistan, glow drink Pakistan, fresh drink Pakistan`,
    brand: { "@type": "Brand", name: BRAND.name },
    isPartOf: { "@type": "ProductSeries", name: NOORISH_GOLD.name, brand: { "@type": "Brand", name: BRAND.name } },
    offers: {
      "@type": "Offer", url: productUrl,
      priceCurrency: COMMERCE.currency, price: COMMERCE.pricePKR,
      availability: "https://schema.org/InStock",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Signature Base", value: NOORISH_GOLD.name },
      { "@type": "PropertyValue", name: "Dose", value: `${NOORISH_GOLD.usageRatio} · ${NOORISH_GOLD.pouchDose}` },
      { "@type": "PropertyValue", name: "Illustration", value: drink.illustrationStyle },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DrinkShowcase drink={drink} />
    </>
  );
}
