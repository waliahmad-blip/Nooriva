import { abs } from "@/lib/site";
import OriginStory from '@/components/story/OriginStory';

export const metadata = {
  title: 'Our Origin Story — How NOORIVA Came Home',
  description:
    'A single pink pouch in Koh Samui, a promise to 40 million women, and sixty days later — NOORIVA rolled off the line in Lahore. Read the origin story behind the natural glow.',
  keywords: [
    'NOORIVA origin story', 'how NOORIVA started', 'Noorish and Wali',
    'natural glow brand story', 'Pakistani beauty brand story',
    'collagen drink Pakistan', 'glutathione drink Pakistan',
  ],
  alternates: { canonical: abs('/story') },
  openGraph: {
    type: 'article',
    url: abs('/story'),
    title: 'Our Origin Story — How NOORIVA Came Home',
    description:
      'From an island convenience-store shelf to Lahore — the story behind NOORIVA’s glow.',
    images: [{ url: abs('/og-image.png'), width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'NOORIVA Origin Story',
  description:
    'The founding story of NOORIVA: a search for pure wellness in Koh Samui that became a promise to millions of women in Pakistan.',
  url: abs('/story'),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Our Origin Story', item: abs('/story') },
  ],
};
export default function StoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <OriginStory />
    </>
  );
}
