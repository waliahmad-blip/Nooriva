import NoorivaApp from "@/components/NoorivaApp";

export const metadata = {
  title: {
    default: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan | Drink Your Glow",
  },
  description:
    "Discover NOORISH GOLD by NOORIVA: 12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan. A production-ready 12% w/w signature hero complex with rose, saffron, date syrup, amla, sea buckthorn, hibiscus, and mastic.",
  keywords: [
    "NOORIVA",
    "NOORISH GOLD",
    "drink your glow",
    "energy drink Pakistan",
    "glow drink Pakistan",
    "fresh drink Pakistan",
    "halal drink Pakistan",
    "rose drink Pakistan",
    "saffron drink Pakistan",
    "beauty drink Pakistan",
    "pouch drink Pakistan",
  ],
  authors: [{ name: "NOORIVA" }],
  creator: "NOORIVA",
  publisher: "NOORIVA",
  alternates: {
    canonical: "https://nooriva.co/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://nooriva.co/",
    title: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan",
    description:
      "Discover NOORISH GOLD by NOORIVA: 12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan.",
    siteName: "NOORIVA",
    locale: "en_PK",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NOORIVA NOORISH GOLD premium glow drinks in Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORIVA — NOORISH GOLD Glow Drinks in Pakistan",
    description:
      "Discover NOORISH GOLD by NOORIVA: 12 premium energy drink, glow drink, and fresh fruit drink rituals for Pakistan.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <NoorivaApp />;
}
