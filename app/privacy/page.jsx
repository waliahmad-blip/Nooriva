import { abs } from "@/lib/site";
import BackToHome from "@/components/ui/BackToHome";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | NOORIVA NOORISH GOLD",
  description: "NOORIVA's privacy policy. Learn how we handle customer data, order details, and privacy with discretion.",
  alternates: { canonical: abs("/privacy") },
};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('') },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: abs('/privacy') },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen w-full bg-cream text-ink pb-36">
      <div className="section-shell pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BackToHome />
      </div>

      <main className="section-shell max-w-4xl pt-12 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a78bfa] backdrop-blur-md">
          <ShieldCheck size={14} /> Trust & Privacy
        </div>

        <h1 className="display-heading mt-6 text-5xl md:text-6xl text-ink">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Last updated: September 2026 · NOORIVA (Pvt.) Ltd.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink/80">
          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <Lock size={20} className="text-[#a78bfa]" /> 1. Commitment to Discretion
            </h2>
            <p>
              At NOORIVA, your personal glow journey is private. We collect only the information necessary to fulfill your orders, deliver pouches to your doorstep across Pakistan, and personalize your wellness recommendations through Noorix AI. We never sell, rent, or trade your personal information.
            </p>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <Eye size={20} className="text-[#a78bfa]" /> 2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-ink/70">
              <li><strong>Order Information:</strong> Full name, shipping address, telephone number, and order notes to coordinate Cash on Delivery and courier dispatch.</li>
              <li><strong>Noorix AI Interactions:</strong> Wellness queries, skin observations, and quiz inputs used to generate real-time recommendations. Images uploaded for triage are processed in memory and never stored permanently.</li>
              <li><strong>Device & Browsing Data:</strong> Anonymous telemetry, browser type, and page performance metrics to optimize 3D WebGL scenes and device battery life.</li>
            </ul>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#a78bfa]" /> 3. Data Protection & Security
            </h2>
            <p>
              All customer transmissions are encrypted using industry-standard TLS 1.3 protocol. Order records are stored within secure database environments with strict row-level security. Payment on delivery (COD) ensures financial credentials are never held on our servers.
            </p>
            <p className="mt-4">
              For privacy inquiries, contact our customer concierge at <a href="mailto:hello@nooriva.ai" className="font-bold underline text-[#a78bfa]">hello@nooriva.ai</a> or WhatsApp <a href="https://wa.me/923210550303" className="font-bold underline text-[#a78bfa]">+92 321 0550303</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
