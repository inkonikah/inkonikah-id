"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  ko: "🇰🇷 KO",
  en: "🇺🇸 EN",
  ja: "🇯🇵 JA",
  id: "🇮🇩 ID",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative group">
      <select
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="lg-pill appearance-none pr-9 pl-4 py-2 text-sm cursor-pointer"
        aria-label="Language"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {labels[l]}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:opacity-100"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
