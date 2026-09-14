// app/glow-drinks/[city]/page.jsx
// Server Component only — no client JS, so these pages are pure static HTML
// (best possible Core Web Vitals for long-tail SEO landing pages).

import Link from "next/link";
import { notFound } from "next/navigation";
import { abs } from "@/lib/site";
import { BRAND, COMMERCE, SKUS } from "@/lib/noorishGold";
import { CITY_PAGES, getCityPage } from "@/lib/cityPages";

export function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ city: city.slug }));
}

export function generateMetadata({ params }) {
  const city = getCityPage(params?.city);
  if (!city) {
    return { title: "City Not Found", robots: { index: false, follow: false } };
  }

  const url = abs(`/glow-drinks/${city.slug}`);
  const title = `Glow Drinks in ${city.name} — COD Delivery`;
  const description = `Order NOORIVA glow drinks in ${city.name} with Cash on Delivery. ${city.eta} delivery across ${city.region}, free above ₨ ${COMMERCE.freeDeliveryThresholdPKR.toLocaleString()}, zero added sugar.`;

  return {
    title,
    description,
    keywords: [
      `glow drink ${city.name}`,
      `glow drinks ${city.name}`,
      `beauty drink ${city.name}`,
      `energy drink ${city.name}`,
      `hydration drink ${city.name}`,
      `halal drink ${city.name}`,
      `COD glow drink ${city.name}`,
      "NOORIVA",
      "NOORISH GOLD",
    ],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
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
          alt: `NOORIVA glow drinks delivered in ${city.name}`,
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

export default function CityGlowPage({ params }) {
  const city = getCityPage(params?.city);
  if (!city) notFound();

  const url = abs(`/glow-drinks/${city.slug}`);
  const picks = city.suggestion
    .map((slug) => SKUS.find((sku) => sku.slug === slug))
    .filter(Boolean);
  const otherCities = CITY_PAGES.filter((c) => c.slug !== city.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Glow Drinks", item: abs("/glow-drinks") },
      { "@type": "ListItem", position: 3, name: city.name, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const facts = [
    { label: "Cash on Delivery", value: "Available on every order" },
    { label: `Delivery to ${city.name}`, value: city.eta },
    {
      label: "Free delivery",
      value: `On orders above ₨ ${COMMERCE.freeDeliveryThresholdPKR.toLocaleString()}`,
    },
  ];

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
            <Link href="/glow-drinks" className="hover:text-ink">Glow Drinks</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink/80">{city.name}</span>
          </nav>

          <h1 className="display-heading mt-6 text-4xl md:text-6xl">{city.headline}</h1>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a78bfa]">
            {city.region} · {city.eta} delivery
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80">{city.intro}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Delivering glow drinks across {city.name}
          </h2>
          {city.local.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/75"
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm text-ink/55">{city.dispatch}.</p>

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Where to start in {city.name}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {picks.map((sku) => (
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
            {city.name} delivery questions
          </h2>
          <div className="mt-6 max-w-3xl space-y-3">
            {city.faq.map((item) => (
              <div key={item.q} className="glass rounded-2xl border border-ink/10 bg-white/80 p-5">
                <h3 className="text-sm font-bold text-ink md:text-base">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.a}</p>
              </div>
            ))}
          </div>

          <h2 className="display-heading mt-14 text-3xl md:text-4xl">
            Other cities we deliver to
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {otherCities.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/glow-drinks/${other.slug}`}
                  className="inline-block rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-xs font-semibold text-ink/75 transition hover:bg-white hover:text-ink"
                >
                  Glow drinks in {other.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMMERCE.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${BRAND.name}! I want to order a glow drink ritual in ${city.name}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Order on WhatsApp
            </a>
            <Link href="/noorish-gold#rituals" className="btn-secondary">
              Browse all 12 rituals
            </Link>
            <Link href="/glow-drinks" className="btn-secondary">
              All glow drinks
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}