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
  const { slug } = params || {};
  const drink = getDrink(slug);
  if (!drink) {
    return {
      title: "Drink Not Found",
      description: "This NOORIVA drink was not found.",
      robots: { index: false, follow: false },
    };
  }
  const url = `${BASE_URL}/drinks/${drink.slug}`;
  const title = `${drink.name} — ${drink.slogan} | NOORISH GOLD by NOORIVA Pakistan`;
  const description = `${drink.slogan}. ${drink.name} is a 150ml squeezable ${drink.illustrationStyle} glow drink ritual in Pakistan. Built on the proprietary NOORISH GOLD core. 100% zero-sugar, Halal certified, and available nationwide with Cash on Delivery (COD).`;

  return {
    title,
    description,
    keywords: [
      drink.name,
      drink.slogan,
      drink.illustrationStyle,
      "NOORIVA",
      "NOORISH GOLD",
      "glow drink Pakistan",
      "energy drink Pakistan",
      "beauty drink Pakistan",
      "fresh drink Pakistan",
      "halal drink Pakistan",
      "collagen drink Karachi",
      "glow drink Lahore",
      "energy drink Islamabad",
      "beauty jelly Rawalpindi",
      "wellness drink Faisalabad",
      "antioxidant drink Multan",
      "skin food Peshawar",
      "hydration drink Quetta",
      "glow drink Sialkot",
      "energy drink Gujranwala",
      "Cash on Delivery drink Pakistan",
    ],
    authors: [{ name: BRAND.name, url: BASE_URL }],
    creator: BRAND.name,
    publisher: BRAND.name,
    alternates: {
      canonical: url,
      languages: {
        "en-PK": url,
        "ur-PK": url,
        "ar-PK": url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description: `${drink.slogan}. ${drink.name} is a 150ml squeezable ${drink.illustrationStyle} glow drink ritual in Pakistan. Available nationwide with Cash on Delivery (COD), ₨ 250 flat shipping, free delivery over ₨ 5,000 across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.`,
      siteName: "NOORIVA",
      locale: "en_PK",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${drink.name} — ${drink.slogan} | NOORIVA Pakistan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function DrinkPage({ params }) {
  const { slug } = params || {};
  const drink = getDrink(slug);
  if (!drink) notFound();

  const productUrl = `${BASE_URL}/drinks/${drink.slug}`;

  // 1. Schema.org Product Rich Snippet (with 4.9★ AggregateRating and Pakistan Shipping)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${drink.name} — ${drink.slogan} by ${BRAND.name}`,
    image: [`${BASE_URL}/og-image.png`],
    description: `${drink.slogan}. ${drink.name} is a 150ml bio-luminescent squeezable ${drink.illustrationStyle} glow jelly drink built on the signature NOORISH GOLD complex.`,
    sku: `NOORIVA-${drink.slug.toUpperCase()}`,
    mpn: `NOORIVA-PK-${drink.slug.toUpperCase()}`,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
      logo: `${BASE_URL}/icon-512.png`,
    },
    category: "Health & Beauty > Beverages > Glow Drinks",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: COMMERCE.currency,
      price: COMMERCE.pricePKR,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      acceptedPaymentMethod: [
        "https://schema.org/Cash",
      ],
      seller: {
        "@type": "Organization",
        name: BRAND.name,
        url: BASE_URL,
      },
      shippingDetails: [
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: COMMERCE.standardDeliveryPKR,
            currency: COMMERCE.currency,
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "PK",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
            transitTime: { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitCode": "DAY" },
          },
        },
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: COMMERCE.currency,
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "PK",
          },
          freeShippingThreshold: {
            "@type": "DeliveryChargeSpecification",
            price: COMMERCE.freeDeliveryThresholdPKR,
            priceCurrency: COMMERCE.currency,
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
            transitTime: { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitCode": "DAY" },
          },
        },
      ],
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Formulation Core", value: NOORISH_GOLD.name },
      { "@type": "PropertyValue", name: "Net Volume", value: "150 ml" },
      { "@type": "PropertyValue", name: "Illustration Style", value: drink.illustrationStyle },
      { "@type": "PropertyValue", name: "Halal Status", value: "100% Certified Halal" },
      { "@type": "PropertyValue", name: "Added Sugar", value: "0g Zero Added Sugar" },
      { "@type": "PropertyValue", name: "Payment Option", value: "Cash on Delivery (COD) Available Nationwide" },
    ],
  };

  // 2. Schema.org BreadcrumbList Snippet (Home > Glow Drinks > [Drink Name])
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Glow Drinks", "item": `${BASE_URL}/glow-drinks` },
      { "@type": "ListItem", "position": 3, "name": drink.name, "item": productUrl },
    ],
  };

  // 3. Schema.org FAQPage Rich Snippet
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What are the benefits of ${drink.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${drink.name} is a 150ml squeezable beauty jelly pouch that supports cellular radiance, stress equilibrium, and deep skin hydration with zero added sugar.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${drink.name} Halal and sugar-free in Pakistan?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${drink.name} is 100% Halal certified, formulated with zero refined sugars (sweetened with non-glycemic rare allulose and monk fruit), and contains no artificial dyes.`,
        },
      },
      {
        "@type": "Question",
        name: `How does delivery and Cash on Delivery work in Pakistan?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `NOORIVA provides nationwide Cash on Delivery (COD) across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all other cities in 2–4 business days. Free shipping on orders over ₨ 5,000.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DrinkShowcase drink={drink} />
    </>
  );
}
