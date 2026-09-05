import dynamic from "next/dynamic";
import { BRAND } from "@/lib/noorishGold";

/* ═══════════════════════════════════════════════════════════
   NOORIX LANDING PAGE
   ═══════════════════════════════════════════════════════════ */

const NoorixExperience = dynamic(
  () => import("@/components/noorix/NoorixExperience").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <NoorixLoadingScreen />,
  }
);

function NoorixLoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-50 blur-2xl animate-pulse" />
        <div className="relative h-16 w-16 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
      </div>
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://nooriva.co"),
  title: "Noorix — Your Personal Glow Guide | NOORIVA",
  description:
    "Meet Noorix — your personal glow guide. 49 powerful features: skin analysis, nutrition coaching, sleep optimization, supplement guidance, and more. No typing required. Crafted for Pakistan.",
  keywords: [
    "Noorix",
    "glow guide",
    "NOORIVA",
    "skin analysis Pakistan",
    "nutrition coach Pakistan",
    "supplement advice",
    "sleep coach",
    "hydration tracker",
    "glow score",
    "wellness Pakistan",
    "halal wellness",
    "beauty from within Pakistan",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: "https://nooriva.co/noorix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: "https://nooriva.co/noorix",
    title: "Noorix — Your Personal Glow Guide | NOORIVA",
    description:
      "Meet Noorix — your personal glow guide. Skin analysis, nutrition coaching, sleep optimization, supplement guidance, and more. No typing required. Crafted for Pakistan.",
    siteName: "NOORIVA",
    locale: "en_PK",
    images: [
      {
        url: "https://nooriva.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noorix — your personal glow guide by NOORIVA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorix — Your Personal Glow Guide | NOORIVA",
    description:
      "Meet Noorix — 49 powerful glow features. No typing required.",
    images: ["https://nooriva.co/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Noorix",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PKR",
  },
  publisher: {
    "@type": "Organization",
    name: BRAND.name,
  },
  description:
    "Personal glow guide with skin analysis, nutrition coaching, sleep optimization, supplement guidance, and more.",
};

export default function NoorixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NoorixExperience />
    </>
  );
}
