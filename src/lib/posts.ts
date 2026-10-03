export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "90-day-visa-thailand-your-complete-guide-to-long-term-stay",
    title: "90-Day Visa Thailand: Your Complete Guide to Long-Term Stay",
    excerpt:
      "Everything you need to know about the Thai 90-day visa and 90-day reporting for long-term residents.",
    date: "2024-06-01",
    category: "Visa Guides",
    body: [
      {
        text: "Planning to stay in Thailand for more than a short holiday? A 90-day visa — the Non-Immigrant visa — is the first step for most long-term stays, whether you want to retire, study, work or join your family.",
      },
      {
        heading: "What is a 90-day visa?",
        text: "A single-entry Non-Immigrant visa normally grants a stay of 90 days. From there, it can be extended at a Thai Immigration office for up to one year, depending on your purpose of stay (retirement, marriage, education, business and so on).",
      },
      {
        heading: "Which type is right for me?",
        text: "Non-Immigrant O is used for retirement and family purposes, Non-Immigrant ED for education, and Non-Immigrant B for business and work. Choosing the right category from the start saves time and money later.",
      },
      {
        heading: "90-day reporting",
        text: "Foreigners who stay in Thailand for more than 90 days continuously must notify Immigration of their address every 90 days. This can be done in person, by post, online, or through an agent. Missing a report can result in a fine.",
      },
      {
        heading: "How Pro Visa Bangkok can help",
        text: "We help you choose the right visa, prepare documents, apply for extensions and take care of your 90-day reporting so you can enjoy your stay without the paperwork.",
      },
    ],
  },
  {
    slug: "retirement-visa-thailand-2024-a-comprehensive-guide",
    title: "Retirement Visa Thailand 2024: A Comprehensive Guide",
    excerpt:
      "Requirements, financial criteria and step-by-step process for retiring in Thailand.",
    date: "2024-03-15",
    category: "Retirement",
    body: [
      {
        text: "Thailand's warm climate, friendly people and affordable cost of living make it one of the best places in the world to retire. Here is an overview of how the retirement visa works.",
      },
      {
        heading: "Eligibility",
        text: "You must be at least 50 years old, have no criminal record, and meet the financial requirements — either money deposited in a Thai bank, a regular monthly income, or a combination of both.",
      },
      {
        heading: "Types of retirement visas",
        text: "The Non-Immigrant O can be obtained in Thailand and extended yearly. The O-A is applied for from your home country and requires health insurance. The O-X is a 10-year visa available to selected nationalities with higher financial requirements.",
      },
      {
        heading: "The process",
        text: "Typically: obtain a Non-Immigrant O visa, open a Thai bank account and season your funds, then apply for a one-year extension of stay at Immigration. After that, renew every year and report your address every 90 days.",
      },
      {
        heading: "Let us handle it",
        text: "Pro Visa Bangkok handles the full process — bank account guidance, documents, Immigration visits, annual renewals and 90-day reports.",
      },
    ],
  },
  {
    slug: "historic-rajadamnern-stadium-where-muay-thai-champions-are-born",
    title: "Historic Rajadamnern Stadium: Where Muay Thai Champions are Born",
    excerpt:
      "A look at Bangkok's most famous Muay Thai stadium — and how you can train in Thailand legally.",
    date: "2024-02-10",
    category: "Muay Thai",
    body: [
      {
        text: "Opened in 1945, Rajadamnern Stadium is the oldest Muay Thai stadium in Bangkok and a legendary venue where many of the sport's greatest champions have fought.",
      },
      {
        heading: "A night at Rajadamnern",
        text: "Fight nights are full of energy: the traditional Wai Kru ritual, live Sarama music and an enthusiastic crowd make it an unforgettable experience for any visitor.",
      },
      {
        heading: "Want to train, not just watch?",
        text: "With a Muay Thai Education Visa, you can stay in Thailand for up to a year and train at a certified camp. Pro Visa Bangkok can connect you with schools and handle your visa.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
