// app/robots.js
// Generated from SITE_URL so the Sitemap line can never drift from
// the real domain again. Replaces the static app/robots.txt.
//
// NOTE: `Disallow: /_next/` was previously present and blocked
// Googlebot from the site's own CSS/JS — deliberately omitted.

import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
