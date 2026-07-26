import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://inkonikah.co.id";

/** 사이트의 모든 공개 경로 (locale 접두어 없이) */
const PATHS = [
  "",
  "/about",
  "/process",
  "/compliance",
  "/faq",
  "/contact",
  "/guide/female",
  "/guide/male",
] as const;

/** localePrefix: "as-needed" — 기본 로케일(ko)은 접두어가 붙지 않는다 */
function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: urlFor(routing.defaultLocale, path),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, path)])
      ),
    },
  }));
}
