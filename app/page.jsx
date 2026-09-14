import { abs } from "@/lib/site";
import NoorivaApp from '@/components/NoorivaApp';

export const metadata = {
  title: {
    absolute: 'NOORIVA — Natural Glow Rituals | Drink Your Glow',
  },
  description:
    'Discover NOORIVA’s botanical rituals — premium glow drinks, natural energy, and skin-food hydration crafted from saffron, rose, and organic botanicals. Drink your natural glow.',
  keywords: [
    'NOORIVA',
    'natural glow drink',
    'skin food drink',
    'organic glow ritual',
    'botanical energy drink',
    'saffron rose drink',
    'plant-based wellness',
    'drink your natural glow',
    'radiance from within',
    'clean hydration',
    'rose garden drink',
    'saffron glow',
  ],
  authors: [{ name: 'NOORIVA' }],
  creator: 'NOORIVA',
  publisher: 'NOORIVA',
  alternates: {
    canonical: abs('/'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: abs('/'),
    title: 'NOORIVA — Natural Glow Rituals',
    description:
      'Botanical skin-food rituals from NOORIVA. Saffron sunrises, rose gardens, and pure natural radiance.',
    siteName: 'NOORIVA',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NOORIVA natural glow rituals — skin food straight from nature',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOORIVA — Natural Glow Rituals',
    description:
      'Botanical skin-food rituals from NOORIVA. Drink your natural glow.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <NoorivaApp />;
}
