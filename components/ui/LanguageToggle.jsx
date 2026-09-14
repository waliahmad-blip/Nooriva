"use client";

import { languages } from "@/lib/i18n";
import { useStore } from "@/lib/store";

/**
 * Language selector.
 *
 * On mobile (< sm) the three-button version is too wide for the header and used
 * to push the logo and icons into each other. A single compact button is shown
 * instead, which cycles EN → UR → AR on tap. The full toggle remains on sm+.
 * Both variants are rendered and swapped with CSS so there is no hydration risk.
 */
export default function LanguageToggle() {
  const language = useStore((s) => s.language);
  const setLanguage = useStore((s) => s.setLanguage);

  const currentIndex = languages.findIndex((lang) => lang.code === language);
  const current = languages[currentIndex === -1 ? 0 : currentIndex];

  const cycleLanguage = () => {
    const next = languages[(currentIndex + 1) % languages.length];
    setLanguage(next.code);
  };

  return (
    <>
      {/* Compact single-button toggle — mobile only */}
      <button
        type="button"
        onClick={cycleLanguage}
        className="tap-target flex shrink-0 items-center justify-center rounded-full bg-white/60 px-2 text-[11px] font-bold tracking-wide text-ink backdrop-blur-md transition hover:bg-white sm:hidden"
        style={{ minWidth: "38px", minHeight: "38px" }}
        aria-label={`Language: ${current.label}. Tap to switch.`}
        title={`Language: ${current.label}`}
      >
        {current.code.toUpperCase()}
      </button>

      {/* Full toggle — tablet and up */}
      <div className="hidden items-center rounded-full bg-white/50 p-0.5 backdrop-blur-md sm:flex">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`rounded-full px-2 py-1 text-[10px] font-semibold transition sm:px-2.5 sm:py-1.5 sm:text-[11px] ${
              language === lang.code
                ? "bg-ink text-cream"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            {lang.short}
          </button>
        ))}
      </div>
    </>
  );
}
