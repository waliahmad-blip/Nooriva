// app/sitemap.js
// ─────────────────────────────────────────────────────────────────
// Generated from SITE_URL + the SKU list — never hand-maintained.
//
// Replaces the old static `app/sitemap.xml`, which had the wrong
// domain hardcoded in 30 places and a frozen `lastmod` date
// (2026-09-06) on every URL.
// ─────────────────────────────────────────────────────────────────

import { SITE_URL } from "@/lib/site";
import { SKUS } from "@/lib/noorishGold";
import { CITY_PAGES } from "@/lib/cityPages";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/noorish-gold", changeFrequency: "weekly", priority: 0.98 },
  { path: "/glow-drinks", changeFrequency: "weekly", priority: 0.95 },
  { path: "/energy-drinks", changeFrequency: "weekly", priority: 0.95 },
  { path: "/fresh-drinks", changeFrequency: "weekly", priority: 0.95 },
  { path: "/ingredients", changeFrequency: "weekly", priority: 0.92 },
  { path: "/noorix/chat", changeFrequency: "weekly", priority: 0.92 },
  { path: "/story", changeFrequency: "monthly", priority: 0.9 },
  { path: "/club", changeFrequency: "daily", priority: 0.9 },
  { path: "/weather", changeFrequency: "hourly", priority: 0.9 },
  { path: "/quiz", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ritual-of-the-day", changeFrequency: "daily", priority: 0.9 },
  { path: "/ambassador", changeFrequency: "weekly", priority: 0.88 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.7 },
  { path: "/shipping", changeFrequency: "monthly", priority: 0.7 },
  { path: "/refund", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();

  const pages = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const drinks = SKUS.map((sku) => ({
    url: `${SITE_URL}/drinks/${sku.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const cities = CITY_PAGES.map((city) => ({
    url: `${SITE_URL}/glow-drinks/${city.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...pages, ...drinks, ...cities];
}
