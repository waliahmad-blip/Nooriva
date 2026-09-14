// components/seo/IngredientLinks.jsx
// Internal-link block for the /ingredients/[botanical] pages.
// Server Component — crawlable descriptive anchors.

import Link from "next/link";
import { INGREDIENT_PAGES } from "@/lib/ingredientPages";

export default function IngredientLinks() {
  return (
    <section className="section-shell mb-24">
      <h2 className="display-heading text-3xl md:text-4xl">
        The botanicals, one by one
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">
        What each botanical is, how it tastes in the glass, and where it sits in the
        {" "}
        NOORISH GOLD formulation — without disclosing any proprietary ratios.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INGREDIENT_PAGES.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/ingredients/${item.slug}`}
              className="glass flex h-full flex-col justify-between gap-2 rounded-2xl border border-ink/10 bg-white/70 px-5 py-4 transition hover:-translate-y-1"
            >
              <span className="text-sm font-bold text-ink">{item.name}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
                {item.role}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}