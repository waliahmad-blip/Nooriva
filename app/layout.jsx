import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://nooriva.co"),
  title: {
    default: "NOORIVA — Drink Your Glow",
    template: "%s · NOORIVA",
  },
  description:
    "Pakistan's first halal beauty elixir. Collagen, glutathione and biotin — deliciously dosed into six celestial flavours. No pills. No powders. Just liquid glow.",
  keywords: [
    "halal beauty elixir",
    "collagen drink Pakistan",
    "glutathione",
    "biotin",
    "beauty supplement",
    "NOORIVA",
    "drink your glow",
    "liquid collagen Pakistan",
    "halal skincare Pakistan",
  ],
  authors: [{ name: "NOORIVA" }],
  creator: "NOORIVA",
  publisher: "NOORIVA",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nooriva.co",
    siteName: "NOORIVA",
    title: "NOORIVA — Drink Your Glow",
    description:
      "Pakistan's first halal beauty elixir. No pills. No powders. Just liquid glow. Cash on delivery across Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOORIVA — Drink Your Glow",
    description: "Pakistan's first halal beauty elixir. No pills. No powders. Just liquid glow.",
  },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "NOORIVA" },
};

export const viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
