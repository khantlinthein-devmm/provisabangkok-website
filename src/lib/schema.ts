import { localePath, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import type { Post } from "@/lib/content";

// schema.org structured data (JSON-LD) so search engines understand the business and pages.
// Test changes with https://search.google.com/test/rich-results

const abs = (path: string) => new URL(path, site.url).toString();
const businessId = `${site.url}/#business`;

/** The office itself, shown on every page. */
export function businessSchema(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.name,
    description,
    url: abs(localePath(lang, "/")),
    logo: abs("/brand/logo.png"),
    image: abs("/images/hero.webp"),
    telephone: site.phoneIntl,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Suan Luang, Bangkok",
      postalCode: "10250",
      addressCountry: "TH",
    },
    hasMap: site.mapUrl,
    areaServed: { "@type": "Country", name: "Thailand" },
    knowsLanguage: ["en", "th", "ru", "zh", "ko"],
    sameAs: [site.facebook, site.line],
  };
}

/** Home > section > page trail. */
export function breadcrumbSchema(lang: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(localePath(lang, item.path)),
    })),
  };
}

/** A blog post. Posts are English only, so they always point at the English URL. */
export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "en",
    mainEntityOfPage: abs(localePath("en", `/${post.slug}/`)),
    image: post.image ? abs(post.image) : undefined,
    author: { "@id": businessId },
    publisher: { "@id": businessId },
  };
}
