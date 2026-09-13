import { abs } from "@/lib/site";
import RitualOfDay from '@/components/ritual/RitualOfDay';

export const metadata = {
  title: 'Ritual of the Day — Today’s Natural Glow | NOORIVA',
  description:
    'Discover today’s NOORIVA ritual — a botanical skin-food moment matched to nature. Saffron, rose, mango, and more. Drink your natural glow.',
  keywords: [
    'ritual of the day', 'NOORIVA ritual', 'daily glow drink',
    'natural skin food', 'botanical drink today', 'rose saffron drink',
    'mango botanical energy', 'daily beauty ritual',
  ],
  alternates: { canonical: abs('/ritual-of-the-day') },
  openGraph: {
    type: 'website',
    url: abs('/ritual-of-the-day'),
    title: 'Ritual of the Day — Today’s Natural Glow',
    description:
      'A botanical skin-food moment matched to nature, every single day.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NOORIVA Ritual of the Day',
  description:
    'Daily botanical skin-food ritual matched to nature’s rhythm.',
  url: abs('/ritual-of-the-day'),
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Ritual of the Day', item: abs('/ritual-of-the-day') },
  ],
};

export default function RitualOfDayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RitualOfDay />
    </>
  );
}
