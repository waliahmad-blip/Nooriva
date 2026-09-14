import { abs } from "@/lib/site";
import GlowQuizPage from '@/components/quiz/GlowQuizPage';

export const metadata = {
  title: 'Glow Quiz — Find Your Natural Ritual',
  description:
    'Answer three little questions and NOORIVA will match you to your perfect botanical ritual. Find your natural glow in under a minute.',
  keywords: [
    'glow quiz', 'NOORIVA quiz', 'find my ritual', 'natural drink quiz',
    'skin food quiz', 'botanical ritual match', 'glow drink finder',
  ],
  alternates: { canonical: abs('/quiz') },
  openGraph: {
    type: 'website',
    url: abs('/quiz'),
    title: 'Glow Quiz — Find Your Natural Ritual',
    description:
      'Three questions. One perfect botanical ritual.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NOORIVA Glow Quiz',
  applicationCategory: 'LifestyleApplication',
  url: abs('/quiz'),
  description:
    'Interactive quiz that matches visitors to their ideal botanical glow ritual.',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Glow Quiz', item: abs('/quiz') },
  ],
};
export default function QuizPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GlowQuizPage />
    </>
  );
}
