"use client";

import { languages } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function LanguageToggle() {
  const language = useStore((s) => s.language);
  const setLanguage = useStore((s) => s.setLanguage);

  return (
    <div className="flex items-center rounded-full bg-white/50 p-0.5 backdrop-blur-md">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition ${
            language === lang.code
              ? "bg-ink text-cream"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
}
