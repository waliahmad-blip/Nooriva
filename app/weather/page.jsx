import { abs } from "@/lib/site";
import WeatherGlow from '@/components/weather/WeatherGlow';

export const metadata = {
  title: 'Weather Glow — Your Skin, Tuned to the Sky | NOORIVA',
  description:
    'Live weather, UV, and air quality — matched to your natural NOORIVA glow ritual. Drink your natural glow, whatever the sky says.',
  keywords: [
    'Weather Glow', 'NOORIVA weather', 'UV skincare', 'skin weather',
    'natural glow weather', 'air quality skin', 'botanical hydration',
    'weather ritual', 'skin protection timeline',
  ],
  alternates: { canonical: abs('/weather') },
  openGraph: {
    type: 'website',
    url: abs('/weather'),
    title: 'Weather Glow — Your Skin, Tuned to the Sky',
    description:
      'Live weather, UV, and air — matched to your natural glow ritual.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NOORIVA Weather Glow',
  applicationCategory: 'LifestyleApplication',
  url: abs('/weather'),
  description:
    'Live weather and UV guidance matched to botanical skin-food rituals.',
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Weather Glow', item: abs('/weather') },
  ],
};

export default function WeatherPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WeatherGlow />
    </>
  );
}
