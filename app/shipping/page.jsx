import BackToHome from "@/components/ui/BackToHome";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import { BRAND, COMMERCE } from "@/lib/noorishGold";

import { SITE_URL as BASE_URL } from "@/lib/site";

export const metadata = {
  title: "Shipping & Delivery Across Pakistan | COD",
  description: "Nationwide delivery across Pakistan in 2–4 business days. Cash on Delivery (COD) accepted. Flat ₨ 250 shipping, free delivery over ₨ 5,000 in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala.",
  keywords: [
    "NOORIVA shipping Pakistan", "Cash on Delivery drinks Pakistan", "COD beauty drink Karachi", "delivery Lahore",
    "energy drink Islamabad delivery", "glow drink Rawalpindi delivery", "Faisalabad drink delivery", "Multan wellness delivery",
    "Peshawar skin food delivery", "Quetta glow drink delivery", "Sialkot beauty delivery", "Gujranwala drink delivery",
  ],
  alternates: {
    canonical: `${BASE_URL}/shipping`,
    languages: {
      "en-PK": `${BASE_URL}/shipping`,
      "ur-PK": `${BASE_URL}/shipping`,
      "ar-PK": `${BASE_URL}/shipping`,
    },
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/shipping`,
    title: "Shipping & Delivery Across Pakistan | NOORIVA",
    description: "Fast nationwide delivery across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and Gujranwala. Flat ₨ 250, free over ₨ 5,000 with Cash on Delivery (COD).",
    locale: "en_PK",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/shipping#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Shipping & Delivery", item: `${BASE_URL}/shipping` },
      ],
    },
    {
      "@type": "DeliveryChargeSpecification",
      name: "Standard Pakistan Nationwide Shipping",
      price: COMMERCE.standardDeliveryPKR,
      priceCurrency: COMMERCE.currency,
      appliesToDeliveryMethod: "https://schema.org/DeliveryModeDirectDownload",
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
    },
    {
      "@type": "DeliveryChargeSpecification",
      name: "Free Shipping Over ₨ 5,000",
      price: 0,
      priceCurrency: COMMERCE.currency,
      minOrderAmount: {
        "@type": "MonetaryAmount",
        value: COMMERCE.freeDeliveryThresholdPKR,
        currency: COMMERCE.currency,
      },
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
    },
  ],
};

export default function ShippingPage() {
  return (
    <div className="relative min-h-screen w-full bg-cream text-ink pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-shell pt-24">
        <BackToHome />
      </div>

      <main className="section-shell max-w-4xl pt-12 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a78bfa] backdrop-blur-md">
          <Truck size={14} /> Nationwide Delivery
        </div>

        <h1 className="display-heading mt-6 text-5xl md:text-6xl text-ink">
          Shipping & Delivery
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Fast, temperature-controlled transit across all cities in Pakistan.
        </p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink/80">
          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <Clock size={20} className="text-[#a78bfa]" /> Delivery Timelines by City
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="font-bold text-ink">Karachi & Lahore</p>
                <p className="text-xs text-ink/60 mt-1">2–3 working days · Express Rider Dispatch</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="font-bold text-ink">Islamabad & Rawalpindi</p>
                <p className="text-xs text-ink/60 mt-1">2–4 working days · Air Express Courier</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="font-bold text-ink">Faisalabad, Multan & Peshawar</p>
                <p className="text-xs text-ink/60 mt-1">3–5 working days · Standard Secured Courier</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="font-bold text-ink">Other Cities & Remote Areas</p>
                <p className="text-xs text-ink/60 mt-1">4–6 working days · Insured Courier Delivery</p>
              </div>
            </div>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#a78bfa]" /> Rates & Free Shipping
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-ink/70">
              <li><strong>Free Shipping:</strong> Automatically applied at checkout on all orders exceeding <strong>₨ 5,000</strong>.</li>
              <li><strong>Standard Delivery:</strong> Flat rate of <strong>₨ 250</strong> for orders below ₨ 5,000.</li>
              <li><strong>Payment Options:</strong> Cash on Delivery (COD), JazzCash, EasyPaisa, or direct Bank Transfer.</li>
            </ul>
          </section>

          <section className="glass rounded-[2rem] p-8">
            <h2 className="display-heading text-2xl text-ink mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-[#a78bfa]" /> Packaging & Pouch Care
            </h2>
            <p>
              Each 150ml pouch is hot-filled and sealed in multi-layer foil to guarantee zero oxygen ingress and 12-month ambient stability. Shipments are packaged in reinforced, eco-friendly luxury presentation boxes to prevent impact damage during transit.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
