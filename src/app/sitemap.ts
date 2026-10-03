import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";
import { visaSlugs } from "@/lib/visas";

// Every translated page is listed in every language, with hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/service/",
    "/tools/",
    ...tools.map((t) => t.path),
    "/about/",
    "/customer/",
    "/blog/",
    "/contact-us/",
    "/privacy-policy-2/",
    ...visaSlugs.map((s) => `/${s}/`),
  ];
  const translated = pages.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(lang, path)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l === "zh" ? "zh-Hans" : l, `${site.url}${localePath(l, path)}`])),
      },
    })),
  );
  // Articles are English only.
  const posts = getAllPosts().map((p) => ({ url: `${site.url}/${p.slug}/`, lastModified: p.date }));
  return [...translated, ...posts];
}
