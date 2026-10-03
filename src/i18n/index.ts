import type { Dict } from "./dictionaries/en";
import { isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  th: () => import("./dictionaries/th").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
  ko: () => import("./dictionaries/ko").then((m) => m.default),
};

export async function getDictionary(lang: string): Promise<Dict> {
  return dictionaries[isLocale(lang) ? lang : "en"]();
}

export type { Dict };
export * from "./config";
