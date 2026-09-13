import { abs } from "@/lib/site";
import AmbassadorHub from '@/components/ambassador/AmbassadorHub';

export const metadata = {
  title: 'Ambassador Hub — Grow with NOORIVA | Natural Glow Creators',
  description:
    'Join the NOORIVA Ambassador program. Share your natural glow, earn points, unlock rewards, and grow with a botanical beauty brand. Open to creators with 5,000+ engaged followers.',
  keywords: [
    'NOORIVA ambassador', 'glow creator program', 'natural drink ambassador',
    'botanical brand ambassador', 'creator rewards', 'glow influencer',
    'drink your natural glow', 'NOORIVA rewards',
  ],
  alternates: { canonical: abs('/ambassador') },
  openGraph: {
    type: 'website',
    url: abs('/ambassador'),
    title: 'Ambassador Hub — Grow with NOORIVA',
    description:
      'Share your natural glow, earn rewards, and grow with NOORIVA.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NOORIVA Ambassador Program',
  description:
    'Creator rewards program for people who love natural, botanical glow rituals.',
  url: abs('/ambassador'),
};
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Ambassador', item: abs('/ambassador') },
  ],
};

export default function AmbassadorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AmbassadorHub />
    </>
  );
}
