'use client';

import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import MobileNav from '@/components/ui/MobileNav';

import OrderWhatsApp from '@/components/OrderWhatsApp';
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

const Playground = dynamic(() => import('@/components/Playground'), { ssr: false });
const NoorixEntrance = dynamic(() => import('@/components/noorix/NoorixEntrance'), { ssr: false });

const ScrollScene = dynamic(() => import('./three/ScrollScene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-cream pointer-events-none" />
  ),
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

      <main className="relative z-10 h-full">
        <SceneStage>{SCENE_CHILDREN}</SceneStage>
      </main>

      <MobileNav />

      <StickyCart />
    </div>
  );
}
