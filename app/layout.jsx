import "./globals.css";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/PageTransition";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { BRAND, COMMERCE, NOORISH_GOLD, HERO, SKUS, FAQS } from "@/lib/noorishGold";

const BASE_URL = "https://nooriva.co";

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
      description: "NOORIVA creates premium NOORISH GOLD energy drinks, glow drinks, and fresh fruit drink rituals for Pakistan.",
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
      "@type": "ItemList",
      name: "NOORISH GOLD — 12 Glow Rituals",
      itemListElement: SKUS.map((sku, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: `${sku.name} by NOORIVA`,
          image: `${BASE_URL}/og-image.png`,
          description: `${sku.name}: ${sku.slogan}. ${sku.notes}. Part of the NOORISH GOLD signature base added at 12% w/w to every 150ml pouch.`,
          brand: { "@type": "Brand", name: BRAND.name },
          category: "Glow drink / Energy drink / Fresh drink",
          keywords: `${BRAND.name}, ${NOORISH_GOLD.name}, energy drink Pakistan, glow drink Pakistan, fresh drink Pakistan`,
          offers: { "@type": "Offer", url: `${BASE_URL}/`, priceCurrency: COMMERCE.currency, price: COMMERCE.pricePKR, availability: "https://schema.org/InStock" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan | Drink Your Glow",
    template: "%s · NOORIVA NOORISH GOLD",
  },
  description: "Discover NOORISH GOLD by NOORIVA — 12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan.",
  keywords: [
    "NOORIVA", "NOORISH", "NOORISH GOLD", "drink your glow", "premium energy drink Pakistan", "glow drink Pakistan", "fresh fruit drink Pakistan", "halal drink Pakistan", "rose drink Pakistan", "saffron drink Pakistan", "mango energy drink Pakistan", "berry glow drink Pakistan", "acai drink Pakistan", "coconut moringa drink Pakistan", "dragon fruit hibiscus drink Pakistan", "yuzu aloe drink Pakistan", "bamboo silk drink Pakistan", "pomegranate drink Pakistan", "passionfruit drink Pakistan", "cherry drink Pakistan", "peach drink Pakistan", "pearl drink Pakistan", "pouch drink Pakistan", "Pakistan beverage brand", "best energy drink in Pakistan", "healthy drink Pakistan", "natural energy drink Pakistan", "glow skin drink Pakistan", "halal energy drink Pakistan", "noorish gold base", "rose hydrosol drink", "saffron drink benefits", "mastic drink Pakistan", "amla drink Pakistan", "sea buckthorn drink Pakistan", "hibiscus drink benefits", "150ml pouch drink Pakistan", "premium drink Pakistan", "luxury drink Pakistan", "wellness drink Pakistan", "hydration drink Pakistan", "antioxidant drink Pakistan", "drink rituals Pakistan", "glow ritual Pakistan", "beauty from within Pakistan",
  ],
  authors: [{ name: BRAND.name, url: `${BASE_URL}/` }],
  creator: BRAND.name,
  publisher: BRAND.name,
  applicationName: BRAND.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["en_US", "ur_PK", "ar_AE"],
    url: `${BASE_URL}/`,
    siteName: "NOORIVA",
    title: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan | Drink Your Glow",
    description: "Discover NOORISH GOLD by NOORIVA — 12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NOORIVA NOORISH GOLD premium energy and glow drinks in Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan",
    description: "12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan. NOORISH GOLD — drink your glow.",
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
    "facebook-domain-verification": "",
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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="bg-cream-50 text-ink antialiased">
        <SessionProvider session={session}>
          <PageTransition>
            {children}
        <Footer />
          </PageTransition>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
