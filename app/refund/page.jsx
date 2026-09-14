import { abs } from "@/lib/site";
import BackToHome from "@/components/ui/BackToHome";
import { RotateCcw, CheckCircle2, MessageCircle, HelpCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";

export const metadata = {
  title: "Refund & Return Policy",
  description: "NOORIVA's 7-day easy return and refund policy. Dedicated customer support across Pakistan.",
  alternates: { canonical: abs("/refund") },
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Refund & Return Policy', item: abs('/refund') },
  ],
};

export default function RefundPage() {
  return (
    <div className="relative min-h-screen w-full bg-cream text-ink pb-36">
      <div className="section-shell pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BackToHome />
      </div>

      <main className="section-shell max-w-4xl pt-12 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a78bfa] backdrop-blur-md">
          <RotateCcw size={14} /> 7-Day Guarantee
        </div>

        <h1 className="display-heading mt-6 text-5xl md:text-6xl text-ink">
          Refund & Return Policy
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Your happiness and peace of mind are paramount to our ritual.
        </p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink/80">
          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#a78bfa]" /> 7-Day Quality Guarantee
            </h2>
            <p>
              If your parcel arrives damaged, leaking, unsealed, or does not match the rituals you ordered, contact us within 7 days of receiving your package. We will immediately arrange a complimentary replacement or issue a full refund via your preferred payment method (JazzCash, EasyPaisa, or Bank Transfer).
            </p>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <HelpCircle size={20} className="text-[#a78bfa]" /> How to Initiate a Return or Replacement
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-ink/70">
              <li>Take a quick photo or video of the parcel and damaged pouches.</li>
              <li>Send the media along with your Order ID (e.g. <code>NV-928412</code>) to our WhatsApp Concierge.</li>
              <li>Our team will verify the claim and dispatch a replacement within 24 hours.</li>
            </ol>
            <div className="mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi NOORIVA! I have a question about my order and would like assistance.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <MessageCircle size={16} /> Contact Support on WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
