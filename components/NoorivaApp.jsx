"use client";

import { Fragment, useEffect } from "react";
import dynamic from "next/dynamic";
import NoorixEntrance from "@/components/noorix/NoorixEntrance";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import TopBar from "@/components/ui/TopBar";
import MobileNav from "@/components/ui/MobileNav";
import NoorixChat from "@/components/noorix/NoorixChat";
import BagDrawer from "@/components/commerce/BagDrawer";
import CheckoutOverlay from "@/components/commerce/CheckoutOverlay";
import OrderWhatsApp from "@/components/OrderWhatsApp";
import Playground from "@/components/Playground";
import GlobalRipple from "@/components/ui/GlobalRipple";
import CursorTrail from "@/components/ui/CursorTrail";
import BackToTop from "@/components/ui/BackToTop";
import SocialProof from "@/components/ui/SocialProof";
import StickyCart from "@/components/ui/StickyCart";
import ReferralBanner from "@/components/ui/ReferralBanner";
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
      <NoorixChat />
      <CursorTrail />
      <BackToTop />
      <SocialProof />
      <StickyCart />
      <GlobalRipple />
    </div>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="section-shell pb-8 pt-8">
      <div className="glass rounded-[2rem] bg-white/70 p-8 text-center">
        <div className="display-heading holo-text text-2xl">NOORIVA</div>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink/50">
          {t("footer.note")}
        </p>
        <p className="mt-2 text-[11px] tracking-widest text-ink/35">
          © {new Date().getFullYear()} NOORIVA — {t("tagline")}
        </p>
      </div>
    </footer>
  );
}
