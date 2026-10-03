import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/service/", "/about/", "/customer/", "/blog/", "/contact-us/", "/privacy-policy-2/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...visas.map((v) => ({ url: `${site.url}/${v.slug}/` })),
    ...getAllPosts().map((p) => ({ url: `${site.url}/${p.slug}/`, lastModified: p.date })),
  ];
}
