import ApiHubDashboard from "@/components/api-hub/ApiHubDashboard";
import { abs } from "@/lib/site";

export const metadata = {
  title: "API Hub — Noorix Feature Console",
  alternates: { canonical: abs("/api-hub") },
  // Internal developer/API console — kept out of the index so it doesn't
  // dilute topical relevance for a beverage brand.
  robots: { index: false, follow: false },
  description: "Live nutrition, recipes, weather, and lifestyle APIs.",
};

export default function ApiHubPage() {
  return <ApiHubDashboard />;
}
