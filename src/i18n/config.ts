export const locales = ["en", "th", "ru", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeInfo: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string; dateLocale: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US", dateLocale: "en-GB" },
  th: { label: "ไทย", short: "TH", htmlLang: "th", ogLocale: "th_TH", dateLocale: "th-TH" },
  ru: { label: "Русский", short: "RU", htmlLang: "ru", ogLocale: "ru_RU", dateLocale: "ru-RU" },
  zh: { label: "中文", short: "中文", htmlLang: "zh-Hans", ogLocale: "zh_CN", dateLocale: "zh-CN" },
  ko: { label: "한국어", short: "KO", htmlLang: "ko", ogLocale: "ko_KR", dateLocale: "ko-KR" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Path for a page in a language. English keeps the original URLs (no prefix). */
export function localePath(lang: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === defaultLocale ? clean : `/${lang}${clean === "/" ? "/" : clean}`;
}

/** Strip a language prefix from a pathname, e.g. /th/about/ -> /about/ */
export function stripLocale(pathname: string) {
  const m = pathname.match(/^\/(th|ru|zh|ko|en)(\/.*)?$/);
  return m ? m[2] || "/" : pathname;
}

export function formatDate(date: string, lang: Locale) {
  return new Date(date).toLocaleDateString(localeInfo[lang].dateLocale, { day: "numeric", month: "long", year: "numeric" });
}
