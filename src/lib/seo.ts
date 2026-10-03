import type { Metadata } from "next";
import { localePath, locales, type Locale } from "@/i18n/config";

/** Canonical URL and hreflang links for a page that exists in every language. */
export function alternates(lang: Locale, path: string, opts: { canonicalLang?: Locale } = {}): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "zh" ? "zh-Hans" : l] = localePath(l, path);
  languages["x-default"] = localePath("en", path);
  return { canonical: localePath(opts.canonicalLang ?? lang, path), languages };
}
