import dynamic from "next/dynamic";
import { BRAND } from "@/lib/noorishGold";

/* ═══════════════════════════════════════════════════════════
   NOORIX CHAT PAGE
   ═══════════════════════════════════════════════════════════ */

const NoorixChat = dynamic(
  () => import("@/components/noorix/NoorixChat").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <NoorixChatLoadingScreen />,
  }
);

function NoorixChatLoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-40 blur-2xl animate-pulse" />
        <div className="relative h-12 w-12 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
      </div>
      <p className="mt-6 text-sm font-medium text-white/50">
        Awakening Noorix…
      </p>
    </div>
  );
}

export const metadata = {
  metadataBase: new URL("https://nooriva.co"),
  title: "Noorix Chat — Your Personal Glow Guide | NOORIVA",
  description:
    "Chat with Noorix, your personal glow guide. Skin analysis, nutrition coaching, sleep optimization, and more — no typing required.",
  keywords: [
    "Noorix chat",
    "glow guide",
    "NOORIVA AI",
    "skin analysis",
    "nutrition coach",
    "sleep coach",
    "wellness chat",
    "Pakistan wellness",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: "https://nooriva.co/noorix/chat",
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
    url: "https://nooriva.co/noorix/chat",
    title: "Noorix Chat — Your Personal Glow Guide | NOORIVA",
    description:
      "Chat with Noorix, your personal glow guide. Skin analysis, nutrition coaching, sleep optimization, and more.",
    siteName: "NOORIVA",
    locale: "en_PK",
    images: [
      {
        url: "https://nooriva.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noorix Chat — your personal glow guide by NOORIVA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorix Chat — Your Personal Glow Guide | NOORIVA",
    description:
      "Chat with Noorix, your personal glow guide. No typing required.",
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
  name: "Noorix Chat",
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
    "Chat with Noorix, your personal glow guide. Skin analysis, nutrition coaching, sleep optimization, and more.",
};

export default function NoorixChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NoorixChat />
    </>
  );
}
