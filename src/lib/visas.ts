import type { Dict } from "@/i18n/dictionaries/en";

// Visa pages, in display order. Titles, summaries and facts are translated in src/i18n/dictionaries;
// the full text of each page lives in src/content/visas/<lang>/<slug>.md.
export const visaSlugs = [
  "retirement-visa",
  "thailand-privilege-membership",
  "long-term-resident-visa",
  "dtv-visa",
  "business-visa",
  "education-visa",
  "muay-thai-education-visa",
  "smart-visa",
  "marriage-visa",
  "follower-visa",
] as const;

export type VisaSlug = (typeof visaSlugs)[number];

export const visaImages: Record<VisaSlug, string> = {
  "retirement-visa": "/images/Retiment-visa.jpg",
  "thailand-privilege-membership": "/images/Thailand-Privilege-.jpg",
  "long-term-resident-visa": "/images/LTR-Visa.png",
  "dtv-visa": "/images/2149117778.jpg",
  "business-visa": "/images/Business-visa.jpg",
  "education-visa": "/images/Education.jpg",
  "muay-thai-education-visa": "/images/12686-1.jpg",
  "smart-visa": "/images/Smart-Visa.jpg",
  "marriage-visa": "/images/Married-visa.jpg",
  "follower-visa": "/images/Follower-Visa.jpg",
};

export function isVisaSlug(slug: string): slug is VisaSlug {
  return (visaSlugs as readonly string[]).includes(slug);
}

export function getVisas(dict: Dict) {
  return visaSlugs.map((slug) => ({ slug, image: visaImages[slug], ...dict.visas[slug] }));
}

export type LocalVisa = ReturnType<typeof getVisas>[number];
