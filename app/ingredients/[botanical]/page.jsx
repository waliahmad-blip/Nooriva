// app/ingredients/[botanical]/page.jsx
// Server Component only — pure static HTML, no client JS.

import Link from "next/link";
import { notFound } from "next/navigation";
import { abs } from "@/lib/site";
import { BRAND, COMMERCE, NOORISH_GOLD, SKUS } from "@/lib/noorishGold";
import { INGREDIENT_PAGES, getIngredientPage } from "@/lib/ingredientPages";

export function generateStaticParams() {
  return INGREDIENT_PAGES.map((item) => ({ botanical: item.slug }));
}

export function generateMetadata({ params }) {
  const item = getIngredientPage(params?.botanical);
  if (!item) {
    return { title: "Ingredient Not Found", robots: { index: false, follow: false } };
  }

  const url = abs(`/ingredients/${item.slug}`);
  const title = `${item.name} in NOORIVA Glow Drinks`;
  const description = `${item.role} — ${item.name} in the ${NOORISH_GOLD.name} botanical heart. How it tastes, its role in the formulation, and where to find it across all 12 NOORIVA rituals.`;

  return {
    title,
    description,
    keywords: [
      item.name,
      item.name.toLowerCase(),
      `${item.name} drink`,
      `${item.name} benefits`,
      `${item.latin}`,
      `${item.name} in glow drink Pakistan`,
      "NOORIVA",
      "NOORISH GOLD",
      "glow drink ingredients",
    ],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "NOORIVA",
      locale: "en_PK",
      images: [
        {
          url: abs("/og-image.png"),
          width: 1200,
          height: 630,
          alt: `${item.name} — a botanical in the NOORIVA glow drink range`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [abs("/og-image.png")],
    },
  };
}

export default function IngredientPage({ params }) {
  const item = getIngredientPage(params?.botanical);
  if (!item) notFound();

  const url = abs(`/ingredients/${item.slug}`);
  const related = item.related
    .map((slug) => SKUS.find((sku) => sku.slug === slug))
    .filter(Boolean);
  const otherBotanicals = INGREDIENT_PAGES.filter((i) => i.slug !== item.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Botanicals", item: abs("/ingredients") },
      { "@type": "ListItem", position: 3, name: item.name, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faq.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="relative min-h-screen w-full bg-cream text-ink pb-32">
        <div className="section-shell pt-24">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-ink/50">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/ingredients" className="hover:text-ink">Botanicals</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink/80">{item.name}</span>
          </nav>

          <p className="mt-6 inline-flex items-center rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a78bfa]">
            {item.role}
          </p>

          <h1 className="display-heading mt-4 text-4xl md:text-6xl">{item.headline}</h1>
          <p className="mt-3 text-sm italic text-ink/55">
            {item.name} · <span className="not-italic">{item.latin}</span>
          </p>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80">{item.what}</p>

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            How it tastes in the glass
          </h2>
          {item.sensory.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/75"
            >
              {paragraph}
            </p>
          ))}

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Where it fits in the formulation
          </h2>
          {item.also.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/75"
            >
              {paragraph}
            </p>
          ))}
          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Where to taste this note
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((sku) => (
              <Link
                key={sku.slug}
                href={`/drinks/${sku.slug}`}
                className="glass group block h-full rounded-[2rem] border border-ink/10 bg-white/70 p-6 transition hover:-translate-y-1"
                style={{ borderTop: `4px solid ${sku.frameColour}` }}
              >
                <h3 className="text-lg font-bold" style={{ color: sku.frameColour }}>
                  {sku.name}
                </h3>
                <p className="mt-2 text-xs font-semibold italic text-ink/70">{sku.slogan}</p>
                <p className="mt-3 text-xs text-ink/55">{sku.illustrationStyle}</p>
              </Link>
            ))}
          </div>

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Questions about {item.name}
          </h2>
          <div className="mt-6 max-w-3xl space-y-3">
            {item.faq.map((entry) => (
              <div key={entry.q} className="glass rounded-2xl border border-ink/10 bg-white/80 p-5">
                <h3 className="text-sm font-bold text-ink md:text-base">{entry.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{entry.a}</p>
              </div>
            ))}
          </div>

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Other botanicals in the range
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {otherBotanicals.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/ingredients/${other.slug}`}
                  className="inline-block rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-xs font-semibold text-ink/75 transition hover:bg-white hover:text-ink"
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-14 max-w-3xl rounded-2xl border border-ink/10 bg-white/50 p-5 text-xs leading-relaxed text-ink/60">
            This page describes a food ingredient and its role in a beverage
            formulation. NOORIVA drinks are food and beverage products, not
            medicines, and nothing here is a diagnosis, treatment or cure for any
            condition. The exact composition of {NOORISH_GOLD.name} is a
            proprietary trade secret; ratios are not disclosed.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMMERCE.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${BRAND.name}! I have a question about ${item.name} in your glow drinks.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Ask on WhatsApp
            </a>
            <Link href="/ingredients" className="btn-secondary">
              All botanicals
            </Link>
            <Link href="/noorish-gold#rituals" className="btn-secondary">
              Browse all 12 rituals
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}