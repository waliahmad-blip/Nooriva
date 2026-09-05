"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import NoorixEntrance from "@/components/noorix/NoorixEntrance";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import TopBar from "@/components/ui/TopBar";
import MobileNav from "@/components/ui/MobileNav";
import BagDrawer from "@/components/commerce/BagDrawer";
import CheckoutOverlay from "@/components/commerce/CheckoutOverlay";
import OrderWhatsApp from "@/components/OrderWhatsApp";
import Playground from "@/components/Playground";
import GlobalRipple from "@/components/ui/GlobalRipple";
import CursorTrail from "@/components/ui/CursorTrail";
import BackToTop from "@/components/ui/BackToTop";
import StickyCart from "@/components/ui/StickyCart";
import ReferralBanner from "@/components/ui/ReferralBanner";

import { WHATSAPP_NUMBER } from "@/lib/data";

import SceneStage, { AuroraField } from "@/components/SceneStage";
import { getScene } from "@/lib/scenes";
import {
  Hero,
  Collection,
  Ingredients,
  Trust,
  Rituals,
  Society,
  Makers,
  Testimonials,
  FAQ,
  ReferralSection,
} from "@/components/Sections";

const ScrollScene = dynamic(() => import("./three/ScrollScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-cream" />,
});

// Order MUST match SCENES in lib/scenes.js
const SCENE_CHILDREN = [
  <Hero key="home" />,
  <Collection key="flavours" />,
  <Fragment key="inside">
    <Ingredients />
    <Trust />
  </Fragment>,
  <Fragment key="rituals">
    <Rituals />
    <Makers />
  </Fragment>,
  <Fragment key="society">
    <Society />
    <OrderWhatsApp />
  </Fragment>,
  <Playground key="play" />,
  <Fragment key="voices">
    <Testimonials />
    <ReferralSection />
    <NoorixEntrance />
    <FAQ />
    <Footer />
  </Fragment>,
];

export default function NoorivaApp() {
  const language = useStore((s) => s.language);
  const activeScene = useStore((s) => s.activeScene);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  }, [language]);

  return (
    <div className="relative h-screen overflow-hidden bg-cream text-ink">
      <AuroraField scene={getScene(activeScene)} />
      <ScrollScene />

      <div className="relative z-10 h-full">
        <TopBar />
        <SceneStage>{SCENE_CHILDREN}</SceneStage>
      </div>

      <MobileNav />
      <BagDrawer />
      <CheckoutOverlay />
      <CursorTrail />
      <BackToTop />
      <StickyCart />
      <GlobalRipple />
    </div>
  );
}

function Footer() {
  const t = useT();

  const footerLinks = [
    { label: "NOORISH GOLD", href: "/noorish-gold" },
    { label: "Glow Drinks", href: "/glow-drinks" },
    { label: "Energy Drinks", href: "/energy-drinks" },
    { label: "Fresh Drinks", href: "/fresh-drinks" },
    { label: "All 12 Rituals", href: "/#flavours" },
    { label: "Ingredient Matrix", href: "/noorish-gold#ingredient-matrix" },
    { label: "FAQ", href: "/#faq" },
    {
      label: "Order on WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi NOORISH GOLD! I'd like to order the glow drink collection, with NOORISH GOLD signature and halal-compliant positioning.")}`,
    },

  ];

  return (
    <footer className="section-shell pb-10 pt-8">
      <div className="glass rounded-[2.5rem] bg-white/70 p-8 text-center md:p-12">
        <div className="mx-auto max-w-4xl">
          <div className="display-heading holo-text text-3xl md:text-4xl">NOORIVA</div>

          <p className="mt-2 text-sm font-semibold text-ink/65 md:text-base">
            {t("tagline")}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-ink/45 md:text-xs">
            NOORISH GOLD is the production-ready signature hero complex added at 12% w/w to every 150ml pouch, powering 12 premium energy drink, glow drink, and fresh drink rituals for Pakistan.
          </p>

          <nav aria-label="Footer navigation" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {footerLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              const className =
                "inline-flex min-h-[44px] items-center justify-center rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70 transition hover:-translate-y-0.5 hover:text-ink";

              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={className}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 grid gap-2 text-[11px] leading-relaxed text-ink/40 md:grid-cols-2">
            <p>
              {t("footer.note")}
            </p>

            <p>
              Premium drink positioning for Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and nationwide Pakistan ordering.
            </p>
          </div>

          <p className="mt-8 text-[11px] tracking-widest text-ink/35">
            © {new Date().getFullYear()} NOORIVA — {t("tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}
