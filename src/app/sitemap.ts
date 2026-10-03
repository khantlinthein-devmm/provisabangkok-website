import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/visas/",
    "/services/",
    "/about/",
    "/contact/",
    "/blog/",
    "/o-retirement-visas-features-comparison-chart/",
    ...visas.map((v) => `/${v.slug}/`),
    ...posts.map((p) => `/${p.slug}/`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
