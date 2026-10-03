// Visa list. The full text of each visa page lives in src/content/visas/<slug>.md.
export type Visa = {
  slug: string;
  title: string;
  short: string;
  forWhom: string;
  duration: string;
  image: string;
  facts: [string, string][];
  highlight?: string;
};

export const visas: Visa[] = [
  {
    slug: "retirement-visa",
    title: "Retirement Visa",
    short: "Non-Immigrant O, O-A and O-X visas for people aged 50 and over who want to retire in the Land of Smiles.",
    forWhom: "People aged 50 and over",
    duration: "1 year renewable; O-X up to 10 years",
    image: "/images/Retiment-visa.jpg",
    facts: [
      ["Minimum age", "50"],
      ["Length", "1 year, renewable (O-X: 5 + 5 years)"],
      ["Funds (O, O-A)", "฿800,000 deposit or ฿65,000/month income"],
      ["Apply", "O in Thailand; O-A and O-X at a Thai embassy abroad"],
      ["Work allowed", "No"],
    ],
  },
  {
    slug: "thailand-privilege-membership",
    title: "Thailand Privilege Membership",
    short: "Formerly the Thailand Elite Visa: exclusive residency for up to 20 years, with VIP privileges.",
    forWhom: "Anyone who wants a long, hassle-free stay",
    duration: "5 to 20 years",
    image: "/images/Thailand-Privilege-.jpg",
    highlight: "We are a registered Thailand Privilege Card agent.",
    facts: [
      ["Length", "5, 10, 15 or 20 years"],
      ["From", "฿900,000 (Gold, 5 years)"],
      ["Approval", "Usually 30 to 90 days"],
      ["Application fee", "฿50,000, included in the membership fee"],
    ],
  },
  {
    slug: "long-term-resident-visa",
    title: "Long Term Resident (LTR) Visa",
    short: "A 10-year visa for wealthy global citizens, wealthy pensioners, remote workers and highly-skilled professionals.",
    forWhom: "High earners, pensioners, remote workers, specialists",
    duration: "10 years",
    image: "/images/LTR-Visa.png",
    facts: [
      ["Length", "10 years (5 + 5)"],
      ["Visa fee", "฿50,000"],
      ["Reporting", "Once a year instead of every 90 days"],
      ["Work allowed", "Yes, with a digital work permit"],
    ],
  },
  {
    slug: "business-visa",
    title: "Business Visa",
    short: "Non-Immigrant “B” visa for working or doing business in Thailand, plus company registration and work permits.",
    forWhom: "Employees, business owners and investors",
    duration: "Up to 15 months, renewable",
    image: "/images/Business-visa.jpg",
    facts: [
      ["Categories", "B, B-A, IB"],
      ["Length", "Up to 15 months initially, renewable yearly"],
      ["Processing", "Usually 5 to 10 business days"],
      ["Work permit", "Always required to work"],
    ],
  },
  {
    slug: "education-visa",
    title: "Education Visa",
    short: "Non-Immigrant “ED” visa to study in Thailand, with school referrals and document preparation.",
    forWhom: "Students, interns and Buddhism studies",
    duration: "Up to 1 year",
    image: "/images/Education.jpg",
    facts: [
      ["Length", "Up to 1 year"],
      ["Reporting", "Every 90 days"],
      ["Requires", "Enrolment at a recognised school"],
      ["Work allowed", "No"],
    ],
  },
  {
    slug: "muay-thai-education-visa",
    title: "Muay Thai Education Visa",
    short: "Study Muay Thai at a certified training centre and stay in Thailand for up to a year.",
    forWhom: "Anyone training at a certified Muay Thai centre",
    duration: "1 year",
    image: "/images/12686-1.jpg",
    facts: [
      ["Length", "1 year"],
      ["Enrolment", "Usually two semesters of about 90 days"],
      ["Apply", "At a Thai embassy outside Thailand"],
      ["Reporting", "Every 90 days"],
    ],
  },
  {
    slug: "smart-visa",
    title: "Smart Visa",
    short: "For highly-skilled talent, investors, executives and startup entrepreneurs in Thailand’s targeted industries.",
    forWhom: "Specialists, investors, executives, founders",
    duration: "Category dependent",
    image: "/images/Smart-Visa.jpg",
    facts: [
      ["Categories", "T, I, E, S and O (family)"],
      ["Industries", "12 targeted industries"],
    ],
  },
  {
    slug: "marriage-visa",
    title: "Marriage Visa",
    short: "For foreigners married to a Thai citizen who want to build a life together in Thailand.",
    forWhom: "Spouses of Thai citizens",
    duration: "1 year, renewable",
    image: "/images/Married-visa.jpg",
    facts: [
      ["Length", "1 year, renewable"],
      ["Funds", "฿400,000 in a Thai bank or ฿40,000/month income"],
      ["Reporting", "Every 90 days"],
      ["Work allowed", "Yes"],
    ],
  },
  {
    slug: "follower-visa",
    title: "Follower Visa",
    short: "For the spouses and children of retirees or expats who will live in Thailand for a year or more.",
    forWhom: "Spouses and children of long-stay visa holders",
    duration: "Up to 1 year",
    image: "/images/Follower-Visa.jpg",
    facts: [
      ["Initial stay", "90 days, single entry"],
      ["Extension", "Up to 1 year from first entry"],
      ["Children", "Usually under 20"],
    ],
  },
];

export function getVisa(slug: string) {
  return visas.find((v) => v.slug === slug);
}
