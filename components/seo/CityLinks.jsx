// components/seo/CityLinks.jsx
// Internal-link block for the city landing pages. Server Component.
// Rendered on /glow-drinks so the city pages are discoverable by users
// AND crawlable via descriptive anchor text.

import Link from "next/link";
import { CITY_PAGES } from "@/lib/cityPages";

export default function CityLinks() {
  return (
    <section className="section-shell mb-24">
      <h2 className="display-heading text-3xl md:text-4xl">
        Glow drinks delivered across Pakistan
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">
        Cash on Delivery is available nationwide. Choose your city for local delivery
        timeframes and neighbourhood coverage.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CITY_PAGES.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/glow-drinks/${city.slug}`}
              className="glass flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-4 transition hover:-translate-y-1"
            >
              <span className="text-sm font-bold text-ink">
                Glow drinks in {city.name}
              </span>
              <span className="shrink-0 text-[11px] font-semibold text-ink/50">
                {city.eta}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}