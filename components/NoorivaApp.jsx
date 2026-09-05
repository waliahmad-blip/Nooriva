'use client';

import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NoorixEntrance from '@/components/noorix/NoorixEntrance';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import TopBar from '@/components/ui/TopBar';
import MobileNav from '@/components/ui/MobileNav';
import BagDrawer from '@/components/commerce/BagDrawer';
import CheckoutOverlay from '@/components/commerce/CheckoutOverlay';
import OrderWhatsApp from '@/components/OrderWhatsApp';
import Playground from '@/components/Playground';
import GlobalRipple from '@/components/ui/GlobalRipple';
import CursorTrail from '@/components/ui/CursorTrail';
import BackToTop from '@/components/ui/ScrollToTop';
import StickyCart from '@/components/ui/StickyCart';

import SceneStage, { AuroraField } from '@/components/SceneStage';
import { getScene } from '@/lib/scenes';
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
} from '@/components/Sections';

import {
  RitualOfDay,
  QuizTeaser,
  ClubTeaser,
  WeatherStrip,
  GlowCards,
  GlowNotes,
  AmbassadorIngredientsCTAs,
} from '@/components/home/HomeExtras';

const ScrollScene = dynamic(() => import('./three/ScrollScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-cream" />,
});

const SCENE_CHILDREN = [
  <Fragment key="home">
    <Hero />
    <QuizTeaser />
    <ClubTeaser />
  </Fragment>,
  <Fragment key="flavours">
    <RitualOfDay />
    <Collection />
  </Fragment>,
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
    <GlowCards />
    <GlowNotes />
    <WeatherStrip />
    <AmbassadorIngredientsCTAs />
    <ReferralSection />
    <NoorixEntrance />
    <FAQ />
  </Fragment>,
];

export default function NoorivaApp() {
  const language = useStore((s) => s.language);
  const activeScene = useStore((s) => s.activeScene);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
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
