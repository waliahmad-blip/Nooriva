import { abs } from "@/lib/site";
import NoorixChatClient from "./NoorixChatClient";
import { BRAND } from "@/lib/noorishGold";

/* ═══════════════════════════════════════════════════════════
   NOORIX CHAT PAGE
   ═══════════════════════════════════════════════════════════ */

export const metadata = {
  metadataBase: new URL(abs("")),
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
    canonical: abs("/noorix/chat"),
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
    url: abs("/noorix/chat"),
    title: "Noorix Chat — Your Personal Glow Guide | NOORIVA",
    description:
      "Chat with Noorix, your personal glow guide. Skin analysis, nutrition coaching, sleep optimization, and more.",
    siteName: "NOORIVA",
    locale: "en_PK",
    images: [
      {
        url: abs("/og-image.png"),
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
    images: [abs("/og-image.png")],
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
      <NoorixChatClient />
    </>
  );
}
