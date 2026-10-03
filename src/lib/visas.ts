export type Visa = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  duration: string;
  intro: string[];
  whoFor: string[];
  requirements: string[];
  howWeHelp: string[];
  highlight?: string;
};

export type IconName =
  | "crown"
  | "sun"
  | "book"
  | "glove"
  | "chip"
  | "family"
  | "globe";

export const visas: Visa[] = [
  {
    slug: "thailand-privilege-membership",
    title: "Thailand Privilege Membership",
    short:
      "Formerly the Thailand Elite Visa — long-stay residency of up to 20 years with VIP privileges.",
    icon: "crown",
    duration: "5 – 20 years",
    highlight: "Registered Thailand Privilege Card agent",
    intro: [
      "Thailand Privilege Membership (formerly known as the Thailand Elite Visa) is a government-run long-stay program that lets members live in Thailand for up to 20 years, depending on the membership tier.",
      "As registered agents for the Thailand Privilege Card, we guide you through every step — from choosing the right package to submitting your application and welcoming you on arrival.",
    ],
    whoFor: [
      "Expats and digital nomads who want a hassle-free long stay",
      "Families who want to live in Thailand together",
      "Business people who travel in and out of Thailand often",
      "Anyone who wants to avoid repeated visa runs and border trips",
    ],
    requirements: [
      "Valid passport with at least 6 months validity",
      "Completed application form and passport-size photo",
      "No criminal record and not on any immigration blacklist",
      "Membership fee according to the selected tier",
    ],
    howWeHelp: [
      "Compare membership tiers and benefits for your situation",
      "Prepare and submit your application to Thailand Privilege Card Co., Ltd.",
      "Track your background check and approval",
      "Arrange visa stamping and VIP airport services",
    ],
  },
  {
    slug: "retirement-visa",
    title: "Retirement Visa",
    short:
      "Non-Immigrant O / O-A / O-X visas for people aged 50 and over who want to retire in Thailand.",
    icon: "sun",
    duration: "1 – 10 years",
    intro: [
      "Thailand is one of the most popular retirement destinations in the world. The retirement visa allows foreigners aged 50 and over to stay in Thailand long-term, renewable every year.",
      "There are several retirement visa options — Non-Immigrant O, O-A and O-X — each with different financial and insurance requirements. We help you pick the right one and handle the paperwork with Thai Immigration.",
    ],
    whoFor: [
      "Applicants aged 50 years or older",
      "Retirees with savings in a Thai bank account or a stable monthly pension",
      "Retirees who want to stay in Thailand without working",
    ],
    requirements: [
      "Passport valid for at least 18 months",
      "Proof of age (50+)",
      "Financial proof: bank deposit in a Thai bank, monthly income, or a combination (amounts depend on visa type)",
      "Health insurance (required for O-A and O-X)",
      "Proof of address in Thailand",
    ],
    howWeHelp: [
      "Advise on O vs. O-A vs. O-X — see our comparison chart",
      "Assist with opening a Thai bank account",
      "Prepare all documents and accompany you to Immigration",
      "Handle annual extensions and 90-day reporting",
    ],
  },
  {
    slug: "ltr-visa",
    title: "Long-Term Resident (LTR) Visa",
    short:
      "10-year visa for wealthy global citizens, pensioners, remote workers and highly-skilled professionals.",
    icon: "globe",
    duration: "10 years",
    intro: [
      "The Long-Term Resident (LTR) Visa is a 10-year visa introduced by the Thai Board of Investment (BOI) to attract high-potential foreigners to live and work in Thailand.",
      "LTR holders enjoy benefits such as 1-year reporting instead of 90-day reporting, a digital work permit and fast-track services at international airports.",
    ],
    whoFor: [
      "Wealthy Global Citizens",
      "Wealthy Pensioners",
      "Work-from-Thailand Professionals",
      "Highly-Skilled Professionals",
    ],
    requirements: [
      "Valid passport",
      "Proof of income, assets or investment depending on category",
      "Health insurance or sufficient deposit",
      "Employment or business documents (for working categories)",
    ],
    howWeHelp: [
      "Check your eligibility for each LTR category",
      "Prepare and submit your application to the BOI",
      "Follow up until endorsement and visa issuance",
      "Help with your digital work permit if needed",
    ],
  },
  {
    slug: "education-visa",
    title: "Education Visa",
    short:
      "Study Thai language or other courses in Thailand with a Non-Immigrant ED visa.",
    icon: "book",
    duration: "Up to 1 year (renewable)",
    intro: [
      "The Education Visa (Non-Immigrant ED) allows you to stay in Thailand while studying at an accredited school, language institute or university.",
      "Our comprehensive service includes school referrals, documentation preparation and ongoing support with extensions and reporting.",
    ],
    whoFor: [
      "Students of Thai language or other accredited courses",
      "Exchange students and university students",
      "Anyone who wants to learn while living in Thailand",
    ],
    requirements: [
      "Valid passport",
      "Acceptance letter from an accredited school",
      "School registration documents and license",
      "Proof of tuition payment",
    ],
    howWeHelp: [
      "Refer you to reputable, accredited schools",
      "Prepare your visa documentation",
      "Assist with visa extensions",
      "Handle 90-day reporting",
    ],
  },
  {
    slug: "muay-thai-education-visa",
    title: "Muay Thai Education Visa",
    short:
      "Train Muay Thai at a certified camp and stay in Thailand for up to one year.",
    icon: "glove",
    duration: "1 year (90-day reporting)",
    intro: [
      "Muay Thai is Thailand's national sport and a way of life. The Muay Thai Education Visa allows you to stay in Thailand to study Muay Thai at a certified training centre.",
      "The visa is valid for one year and requires renewal / reporting every 90 days. We connect you with certified camps and take care of the paperwork so you can focus on training.",
    ],
    whoFor: [
      "Fighters and enthusiasts who want to train seriously",
      "People who want to combine fitness and a long stay in Thailand",
      "Aspiring Muay Thai trainers",
    ],
    requirements: [
      "Valid passport",
      "Enrolment at a Muay Thai school certified by the Ministry of Education",
      "Acceptance letter and school documents",
      "Proof of course payment",
    ],
    howWeHelp: [
      "Recommend certified Muay Thai camps",
      "Prepare the visa application",
      "Assist with extensions every 90 days",
      "Support throughout your training stay",
    ],
  },
  {
    slug: "smart-visa",
    title: "SMART Visa",
    short:
      "For highly-skilled talents, investors, executives and startup entrepreneurs in targeted industries.",
    icon: "chip",
    duration: "Up to 4 years",
    intro: [
      "The SMART Visa is designed to attract highly-skilled workers, investors, executives and startup entrepreneurs to work or invest in Thailand's targeted industries.",
      "There are several categories: SMART T (Talent), SMART I (Investor), SMART E (Executive), SMART S (Startup) and SMART O (Other — spouses and children).",
    ],
    whoFor: [
      "T — Highly-skilled professionals in targeted industries",
      "I — Investors in technology-based companies",
      "E — Senior executives",
      "S — Startup entrepreneurs",
      "O — Spouses and children of SMART visa holders",
    ],
    requirements: [
      "Valid passport",
      "Employment contract, investment proof or startup business plan",
      "Proof of qualifications and income (depending on category)",
      "Health insurance",
    ],
    howWeHelp: [
      "Identify the correct SMART category",
      "Prepare and submit the endorsement application",
      "Coordinate with the relevant government agencies",
      "Help family members apply for SMART O",
    ],
  },
  {
    slug: "follower-visa",
    title: "Follower Visa",
    short:
      "For spouses and children of retirees or expats who plan to live in Thailand for one year or more.",
    icon: "family",
    duration: "1 year (renewable)",
    intro: [
      "The Follower Visa (Non-Immigrant O — dependent) allows the spouse or children of a retiree or expat with a valid long-term visa to live in Thailand together with them.",
      "It is ideal for families planning to stay in Thailand for a year or more.",
    ],
    whoFor: [
      "Legally married spouses of long-term visa holders",
      "Children under 20 of long-term visa holders",
    ],
    requirements: [
      "Valid passport",
      "Marriage certificate or birth certificate (translated and legalised)",
      "Copy of the main visa holder's passport and visa",
      "Financial proof as required by Immigration",
    ],
    howWeHelp: [
      "Translate and certify family documents",
      "Prepare the visa application",
      "Align the follower visa with the main applicant's visa",
      "Handle extensions and 90-day reporting",
    ],
  },
];

export function getVisa(slug: string) {
  return visas.find((v) => v.slug === slug);
}
