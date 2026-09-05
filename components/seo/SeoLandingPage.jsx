'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND, COMMERCE, NOORISH_GOLD, SKUS, FAQS } from '@/lib/noorishGold';

const BASE_URL = 'https://nooriva.co';

const CategoryScene = dynamic(() => import('@/components/three/CategoryScene'), {
  ssr: false,
  loading: () => null,
});

function ScrollProgress({ colors }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const gradient = useMemo(() => {
    const c = colors.length >= 2 ? colors.slice(0, 4) : ['#ff8fb2', '#a78bfa', '#22d3ee'];
    return `linear-gradient(90deg, ${c.join(', ')})`;
  }, [colors]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: gradient }}
    />
  );
}

function AuroraField({ colors }) {
  const blobs = useMemo(() => {
    return colors.slice(0, 4).map((color, i) => ({
      color,
      startX: i % 2 === 0 ? -15 : 15,
      startY: i * 8 - 5,
      duration: 14 + i * 4,
      delay: i * 1.5,
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-25 blur-[60px]"
          style={{
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            width: '55vmax',
            height: '55vmax',
          }}
          initial={{ x: `${blob.startX}vw`, y: `${blob.startY}vh` }}
          animate={{
            x: [`${blob.startX}vw`, `${blob.startX * -0.5}vw`, `${blob.startX}vw`],
            y: [`${blob.startY}vh`, `${blob.startY + 8}vh`, `${blob.startY}vh`],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles({ colors }) {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      size: 3 + Math.random() * 6,
      left: Math.random() * 100,
      top: Math.random() * 100,
      drift: (Math.random() - 0.5) * 40,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 4,
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            background: p.color,
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const revealUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function SkuCard({ sku, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/drinks/${sku.slug}`}
        className="group relative block h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        aria-label={`${sku.name} — ${sku.slogan}`}
      >
        <motion.div
          className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md"
          style={{
            borderTop: `4px solid ${sku.frameColour}`,
            transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            boxShadow: hovered
              ? `0 20px 60px -10px ${sku.frameColour}40, 0 0 0 1px ${sku.frameColour}30`
              : '0 2px 12px rgba(0,0,0,0.08)',
          }}
          transition={{ transform: { duration: 0.2, ease: 'easeOut' }, boxShadow: { duration: 0.3 } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{ background: `radial-gradient(circle at 50% 0%, ${sku.frameColour}18 0%, transparent 50%)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <div className="relative mb-4 flex items-center gap-3">
            <motion.div
              className="h-14 w-14 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${sku.frameColour}, ${sku.frameColour}aa)`,
                boxShadow: `0 8px 24px ${sku.frameColour}50`,
              }}
              animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">
                {sku.illustrationStyle}
              </div>
              <h3 className="mt-1 display-heading text-2xl" style={{ color: sku.frameColour }}>
                {sku.name}
              </h3>
            </div>
          </div>
          <p className="text-sm font-semibold italic text-ink/70">"{sku.slogan}"</p>
          <motion.div
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/50"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Explore Ritual <ArrowRight size={14} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/75 backdrop-blur-md"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
        aria-label={faq.question}
      >
        <span className="font-semibold text-ink">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 text-ink/50"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SeoLandingPage({ config }) {
  const relatedSkus = SKUS.filter((sku) => config.relatedSkuIds.includes(sku.id));
  const skuColors = relatedSkus.map((sku) => sku.frameColour);
  const palette = skuColors.slice(0, 4).filter(Boolean);

  const categoryFlavors = relatedSkus.map((sku) => ({
    id: sku.id,
    name: sku.name,
    color: sku.frameColour,
    colorB: sku.frameColour,
  }));

  const relatedPages = Object.values(
    Object.fromEntries(
      Object.entries({
        'noorish-gold': {
          slug: 'noorish-gold',
          href: '/noorish-gold',
          title: 'NOORISH GOLD Signature Hero Complex',
          description: 'The production-ready gold base inside every NOORIVA pouch.',
        },
        'energy-drinks': {
          slug: 'energy-drinks',
          href: '/energy-drinks',
          title: 'Energy Drinks in Pakistan',
          description: 'Bright fruit rituals with NOORISH GOLD energy positioning.',
        },
        'glow-drinks': {
          slug: 'glow-drinks',
          href: '/glow-drinks',
          title: 'Glow Drinks in Pakistan',
          description: 'Radiance-focused rituals using NOORISH GOLD.',
        },
        'fresh-drinks': {
          slug: 'fresh-drinks',
          href: '/fresh-drinks',
          title: 'Fresh Fruit Drink Rituals',
          description: 'Clear, bright, premium fresh drink rituals.',
        },
      })
    )
  ).filter((page) => config.relatedPageSlugs.includes(page.slug));

  const pageUrl = `${BASE_URL}/${config.slug}`;
  const faqs = config.faqIndexes.map((index) => FAQS[index]).filter(Boolean);

  const ctaGradient = `linear-gradient(135deg, ${skuColors[0] || '#ff8fb2'}, ${
    skuColors[1] || '#a78bfa'
  }, ${skuColors[2] || '#22d3ee'})`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: BRAND.name, item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: config.heading, item: pageUrl },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        name: config.title,
        url: pageUrl,
        description: config.description,
        publisher: { '@type': 'Organization', name: BRAND.name },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: relatedSkus.map((sku, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${BASE_URL}/drinks/${sku.slug}`,
            name: `${sku.name} by ${BRAND.name}`,
          })),
        },
      },
      ...(faqs.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ScrollProgress colors={skuColors} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-shell relative flex min-h-[90vh] items-center justify-center py-24">
        {/* Route-specific 3D scene */}
        <div className="absolute inset-0 -z-10">
          <CategoryScene palette={palette} flavors={categoryFlavors} />
        </div>

        <AuroraField colors={skuColors} />
        <FloatingParticles colors={skuColors} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="glass relative z-10 overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/75 p-8 shadow-lg backdrop-blur-xl md:p-14"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-50"
            style={{
              background: `linear-gradient(135deg, ${skuColors[0] || '#E7D3A8'}15, ${
                skuColors[1] || skuColors[0] || '#C79A44'
              }15, transparent)`,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div variants={revealUp} className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-ink/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
                {NOORISH_GOLD.name}
              </span>
              <Sparkles size={14} className="text-ink/40" />
            </motion.div>
            <motion.h1
              variants={revealUp}
              className="display-heading text-5xl leading-none md:text-7xl"
            >
              {config.heading}
            </motion.h1>
            <motion.p
              variants={revealUp}
              className="mt-6 text-xl font-bold text-ink/75 md:text-3xl"
            >
              {config.subheading}
            </motion.p>
            <motion.p
              variants={revealUp}
              className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-ink/65 md:text-base"
            >
              {config.description}
            </motion.p>
            <motion.div variants={revealUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/#flavours" className="btn-primary">
                Shop 12 Rituals
              </Link>
              <Link href="/noorish-gold" className="btn-secondary">
                View NOORISH GOLD
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <nav
        aria-label="Breadcrumb"
        className="section-shell mb-8 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          {BRAND.name}
        </Link>
        <span>/</span>
        <span className="text-ink/70">{config.heading}</span>
      </nav>

      <section className="section-shell mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="display-heading text-4xl md:text-5xl">
            Why These {BRAND.name} Rituals Work
          </h2>
        </motion.div>
        <div className="mx-auto mt-10 max-w-4xl space-y-6">
          {config.body.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-base leading-relaxed text-ink/70 md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      <section className="section-shell mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="display-heading text-4xl md:text-5xl">
            Matched NOORISH GOLD Rituals
          </h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedSkus.map((sku, index) => (
            <SkuCard key={sku.id} sku={sku} index={index} />
          ))}
        </div>
      </section>

      <section className="section-shell mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="display-heading text-4xl md:text-5xl">
            Questions About These Drinks
          </h2>
        </motion.div>
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </section>

      <section className="section-shell mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="display-heading text-4xl md:text-5xl">
            Related NOORIVA Collections
          </h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPages.map((page, index) => (
            <motion.div
              key={page.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={page.href}
                className="glass group block h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="display-heading text-2xl">{page.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {page.description}
                </p>
                <motion.div
                  className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/50"
                  whileHover={{ x: 4 }}
                >
                  Explore <ArrowRight size={14} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: ctaGradient,
              backgroundSize: '200% 200%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <FloatingParticles colors={skuColors} />
          <div className="relative text-white">
            <h2 className="display-heading text-4xl md:text-5xl">{BRAND.tagline}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed opacity-90 md:text-base">
              Order {config.heading.toLowerCase()} in Pakistan. Single pouches, trios, and six-pouch NOORISH GOLD
              collections are available for nationwide ordering.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${COMMERCE.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${BRAND.name}! I want to order a ${config.heading.toLowerCase()} ritual.`
                )}`}
                className="btn-primary"
              >
                Order on WhatsApp
              </a>
              <Link href="/#flavours" className="btn-secondary">
                Browse All 12 Rituals
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
