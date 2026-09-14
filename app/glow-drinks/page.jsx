import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";
import { abs } from "@/lib/site";
import CityLinks from "@/components/seo/CityLinks";

const config = getSeoLandingPage("glow-drinks");

export const metadata = {
  title: config.title,
  description: config.description,
  keywords: config.keywords,
  authors: [{ name: "NOORIVA" }],
  creator: "NOORIVA",
  publisher: "NOORIVA",
  alternates: {
    canonical: abs(`/${config.slug}`),
    languages: {
      "en-PK": abs(`/${config.slug}`),
      "ur-PK": abs(`/${config.slug}`),
      "ar-PK": abs(`/${config.slug}`),
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: abs(`/${config.slug}`),
    title: config.title,
    description: config.description,
    siteName: "NOORIVA",
    locale: "en_PK",
    alternateLocale: ["ur_PK", "ar_PK"],
    images: [
      {
        url: abs("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "NOORIVA glow drinks in Pakistan built on NOORISH GOLD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: [abs("/og-image.png")],
  },
};

export default function GlowDrinksPage() {
  return (
    <>
      <SeoLandingPage config={config} />
      <CityLinks />
    </>
  );
}
