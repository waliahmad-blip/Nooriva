// lib/site.js
// ─────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the canonical site origin.
//
// The domain used to be hand-typed in 120 places across 26 files,
// which is how the wrong domain (`nooriva.co`) ended up in every
// canonical, sitemap entry and JSON-LD @id.
//
// To move domains in future, set NEXT_PUBLIC_SITE_URL (Netlify env
// var) — do NOT hand-edit the domain again.
//
// NEXT_PUBLIC_ is required (not a secret) so the value is inlined at
// build time for both Server and Client Components.
// ─────────────────────────────────────────────────────────────────

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nooriva.ai"
).replace(/\/+$/, "");

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

/** Absolute URL for a path. abs("/story") -> "https://nooriva.ai/story" */
export function abs(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default SITE_URL;
