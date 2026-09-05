import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const config = getSeoLandingPage("energy-drinks");

export const metadata = {
  title: config.title,
  description: config.description,
  keywords: config.keywords,
  authors: [{ name: "NOORIVA" }],
  creator: "NOORIVA",
  publisher: "NOORIVA",
  alternates: {
    canonical: `https://nooriva.co/${config.slug}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: `https://nooriva.co/${config.slug}`,
    title: config.title,
    description: config.description,
    siteName: "NOORIVA",
    locale: "en_PK",
    images: [
      {
        url: "https://nooriva.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "NOORIVA energy drinks in Pakistan built on NOORISH GOLD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: ["https://nooriva.co/og-image.png"],
  },
};

export default function EnergyDrinksPage() {
  return <SeoLandingPage config={config} />;
}
