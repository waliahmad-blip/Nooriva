import ClubExperience from '@/components/club/ClubExperience';

export const metadata = {
  title: 'NOORIVA Club — Everyone Blooms Here | Natural Glow Community',
  description:
    'Join the NOORIVA Club — a co-ed garden of glow. Heart-to-heart talks, weekly circles, Lady & Gentleman of the Day, and an honest, respectful safe space for everyone who drinks their natural glow.',
  keywords: [
    'NOORIVA Club', 'glow community', 'natural wellness community',
    'heart to heart', 'lady of the day', 'gentleman of the day',
    'botanical lifestyle', 'skin food community', 'glow support group',
    'respectful space', 'everyone blooms',
  ],
  alternates: { canonical: 'https://nooriva.co/club' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://nooriva.co/club',
    title: 'NOORIVA Club — Everyone Blooms Here',
    description:
      'A co-ed garden of glow. Heart-to-heart talks, weekly circles, and spotlights for everyone.',
    siteName: 'NOORIVA',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NOORIVA Club — Everyone Blooms Here' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOORIVA Club — Everyone Blooms Here',
    description: 'A co-ed garden of natural glow. Join the club.',
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NOORIVA Club',
  description:
    'A co-ed community for people who love natural, botanical glow rituals.',
  url: 'https://nooriva.co/club',
  slogan: 'Everyone blooms here.',
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nooriva.co' },
    { '@type': 'ListItem', position: 2, name: 'Club', item: 'https://nooriva.co/club' },
  ],
};

export default function ClubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ClubExperience />
    </>
  );
}
