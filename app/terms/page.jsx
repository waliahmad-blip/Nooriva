import BackToHome from "@/components/ui/BackToHome";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { FileCheck, Sparkles, Scale, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | NOORIVA NOORISH GOLD",
  description: "Terms and conditions governing the purchase and consumption of NOORIVA NOORISH GOLD rituals in Pakistan.",
  alternates: { canonical: "https://nooriva.co/terms" },
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nooriva.co' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://nooriva.co/terms' },
  ],
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen w-full bg-cream text-ink pb-36">
      <div className="section-shell pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BackToHome />
      </div>

      <main className="section-shell max-w-4xl pt-12 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a78bfa] backdrop-blur-md">
          <Scale size={14} /> Legal & Terms
        </div>

        <h1 className="display-heading mt-6 text-5xl md:text-6xl text-ink">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Last updated: September 2026 · NOORIVA (Pvt.) Ltd.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink/80">
          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <FileCheck size={20} className="text-[#a78bfa]" /> 1. Ordering & Acceptance
            </h2>
            <p>
              By placing an order via NOORIVA website, checkout overlay, or official WhatsApp concierge, you confirm that you are at least 18 years of age or purchasing with parental consent. An order confirmation constitutes our agreement to dispatch genuine NOORISH GOLD pouches to your designated delivery address in Pakistan.
            </p>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-[#a78bfa]" /> 2. Product Specifications & Halal Compliance
            </h2>
            <p>
              All 12 NOORIVA rituals are formulated with the proprietary NOORISH GOLD botanical heart (anchored by Kashmiri saffron, sea buckthorn, and date essence). Products are prepared under strict hygiene standards and food-grade protocols aligned with Pakistani halal regulatory requirements.
            </p>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-[#a78bfa]" /> 3. Wellness & Noorix AI Disclaimer
            </h2>
            <p>
              NOORIVA drinks and Noorix AI guidance are designed for nutritional wellness, hydration, and natural skin radiance. They are food and beverage rituals, not medical pharmaceuticals or clinical diagnoses. If you are pregnant, nursing, taking prescription medications, or managing chronic conditions, consult your physician before altering your diet.
            </p>
          </section>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}
