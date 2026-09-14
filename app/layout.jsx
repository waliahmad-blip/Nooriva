import "./globals.css";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/PageTransition";
import CommandPalette from "@/components/ui/CommandPalette";
import TopBar from "@/components/ui/TopBar";
import GlobalCommerce from "@/components/commerce/GlobalCommerce";
import LenisProvider from "@/components/ui/LenisProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Script from "next/script";

import { SessionProvider } from "next-auth/react";
import { BRAND, COMMERCE, NOORISH_GOLD, HERO, SKUS } from "@/lib/noorishGold";
import { SITE_URL as BASE_URL } from "@/lib/site";

// Google Analytics 4 — set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX) in Netlify
// environment variables. No code change needed; the tag is simply omitted
// while the variable is unset.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: BRAND.name,
      legalName: BRAND.name,
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}/icon-512.png`,
      slogan: BRAND.tagline,
      brand: { "@type": "Brand", name: BRAND.name },
      description: "NOORIVA creates botanical skin-food rituals — saffron, rose, and nature's golden heart.",
      areaServed: "PK",
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", areaServed: "PK", availableLanguage: ["en", "ur", "ar"], telephone: `+${COMMERCE.whatsappNumber}` }],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: "NOORIVA — NOORISH GOLD",
      inLanguage: "en-PK",
      publisher: { "@type": "Organization", "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      ],
    },
    {
      "@type": "ItemList",
      name: "NOORISH GOLD — 12 Glow Rituals",
      itemListElement: SKUS.map((sku, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: `${sku.name} by NOORIVA`,
          image: `${BASE_URL}/og-image.png`,
          description: `${sku.name}: ${sku.slogan}. ${sku.notes}. Part of NOORIVA's golden botanical heart.`,
          brand: { "@type": "Brand", name: BRAND.name },
          category: "Glow drink / Energy drink / Fresh drink",
          keywords: `${BRAND.name}, ${NOORISH_GOLD.name}, energy drink Pakistan, glow drink Pakistan, fresh drink Pakistan`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "128",
            bestRating: "5",
            worstRating: "1",
          },
          offers: {
            "@type": "Offer",
            url: `${BASE_URL}/drinks/${sku.slug}`,
            priceCurrency: COMMERCE.currency,
            price: COMMERCE.pricePKR,
            availability: "https://schema.org/InStock",
            acceptedPaymentMethod: ["https://schema.org/Cash"],
            shippingDetails: [
              {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: COMMERCE.standardDeliveryPKR, currency: COMMERCE.currency },
                shippingDestination: { "@type": "DefinedRegion", addressCountry: "PK" },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
                  transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
                },
              },
              {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: 0, currency: COMMERCE.currency },
                shippingDestination: { "@type": "DefinedRegion", addressCountry: "PK" },
                freeShippingThreshold: { "@type": "DeliveryChargeSpecification", price: COMMERCE.freeDeliveryThresholdPKR, priceCurrency: COMMERCE.currency },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
                  transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
                },
              },
            ],
          },
        },
      })),
    },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NOORIVA — Natural Glow Rituals | Drink Your Glow",
    template: "%s | NOORIVA",
  },
  description: "Discover NOORISH GOLD by NOORIVA — 12 botanical skin-food rituals for natural radiance. Available nationwide across Pakistan with Cash on Delivery (COD), ₨ 250 flat shipping, free delivery over ₨ 5,000 in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.",
  keywords: [
    "NOORIVA", "NOORISH", "NOORISH GOLD", "drink your glow", "premium energy drink Pakistan", "glow drink Pakistan", "fresh fruit drink Pakistan", "halal drink Pakistan", "rose drink Pakistan", "saffron drink Pakistan", "mango energy drink Pakistan", "berry glow drink Pakistan", "acai drink Pakistan", "coconut moringa drink Pakistan", "dragon fruit hibiscus drink Pakistan", "yuzu aloe drink Pakistan", "bamboo silk drink Pakistan", "pomegranate drink Pakistan", "passionfruit drink Pakistan", "cherry drink Pakistan", "peach drink Pakistan", "pearl drink Pakistan", "pouch drink Pakistan", "Pakistan beverage brand", "best energy drink in Pakistan", "healthy drink Pakistan", "natural energy drink Pakistan", "glow skin drink Pakistan", "halal energy drink Pakistan", "noorish gold base", "rose hydrosol drink", "saffron drink benefits", "mastic drink Pakistan", "amla drink Pakistan", "sea buckthorn drink Pakistan", "hibiscus drink benefits", "150ml pouch drink Pakistan", "premium drink Pakistan", "luxury drink Pakistan", "wellness drink Pakistan", "hydration drink Pakistan", "antioxidant drink Pakistan", "drink rituals Pakistan", "glow ritual Pakistan", "beauty from within Pakistan",
    "glow drink Karachi", "glow drink Lahore", "glow drink Islamabad", "glow drink Rawalpindi", "glow drink Faisalabad", "glow drink Multan", "glow drink Peshawar", "glow drink Quetta", "glow drink Sialkot", "glow drink Gujranwala",
    "energy drink Karachi", "energy drink Lahore", "energy drink Islamabad", "energy drink Rawalpindi", "energy drink Faisalabad", "energy drink Multan", "energy drink Peshawar", "energy drink Quetta", "energy drink Sialkot", "energy drink Gujranwala",
    "Cash on Delivery Pakistan drinks", "COD beauty drink Karachi", "COD wellness drink Lahore",
  ],
  authors: [{ name: BRAND.name, url: `${BASE_URL}/` }],
  creator: BRAND.name,
  publisher: BRAND.name,
  applicationName: BRAND.name,
  formatDetection: { telephone: false, address: false, email: false },
  // ── Google Search Console ownership verification ──────────────────
  // HTML-tag method. Set GOOGLE_SITE_VERIFICATION in the Netlify
  // environment variables to the token Search Console shows you under
  // "HTML tag" — no code change or redeploy of code is needed, only a
  // Netlify env var + rebuild. The HTML-FILE method is also already in
  // place at public/googlef846f8f2e22cd419.html as a second method.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["ur_PK", "ar_PK"],
    url: `${BASE_URL}/`,
    siteName: "NOORIVA",
    title: "NOORIVA — Natural Glow Rituals | Drink Your Glow Pakistan",
    description: "Discover NOORISH GOLD by NOORIVA — 12 botanical skin-food rituals for natural radiance. Available nationwide in Pakistan with Cash on Delivery (COD) across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NOORIVA NOORISH GOLD premium energy and glow drinks in Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORIVA — Natural Glow Rituals",
    description: "12 botanical skin-food rituals for natural radiance. NOORISH GOLD — drink your natural glow.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: { "en-PK": `${BASE_URL}/`, "ur-PK": `${BASE_URL}/`, "ar-PK": `${BASE_URL}/` },
  },
  category: "beverage",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "NOORIVA — NOORISH GOLD" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "NOORIVA",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "NOORIVA",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FAF7F2",
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Cairo:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="bg-cream text-ink antialiased">
        <SessionProvider>
          <LenisProvider>
            <ScrollToTop />
            <CommandPalette />
            <TopBar />
            <GlobalCommerce />
            <PageTransition>
              {children}
              <Footer />
            </PageTransition>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </LenisProvider>
        {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
              </Script>
            </>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
