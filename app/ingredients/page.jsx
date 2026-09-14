import { abs } from "@/lib/site";
import IngredientStory from '@/components/ingredients/IngredientStory';

export const metadata = {
  title: 'Inside Nature’s Golden Heart',
  description:
    'Discover the botanical soul of NOORIVA — saffron, rose, mastic, amla, sea buckthorn, and hibiscus. A sensory journey through nature’s golden heart, without revealing the recipe.',
  keywords: [
    'NOORIVA ingredients', 'botanical story', 'saffron rose drink',
    'natural skin food', 'golden botanical heart', 'organic glow ritual',
    'mastic amla hibiscus', 'nature drink story',
  ],
  alternates: { canonical: abs('/ingredients') },
  openGraph: {
    type: 'website',
    url: abs('/ingredients'),
    title: 'Inside Nature’s Golden Heart',
    description:
      'The botanical soul of NOORIVA — a sensory journey through nature’s golden heart.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'NOORIVA Ingredient Story',
  description:
    'The botanical story behind NOORIVA’s natural glow rituals.',
  url: abs('/ingredients'),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Botanicals', item: abs('/ingredients') },
  ],
};
export default function IngredientsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <IngredientStory />
    </>
  );
}
