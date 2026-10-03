import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import Stamp from "@/components/Stamp";

export const metadata: Metadata = {
  title: "About Us",
  description: "Pro Visa Bangkok is a Bangkok visa agency and a registered Thailand Privilege Card agent.",
};

const principles = [
  ["We tell you the truth", "If you don’t qualify, or a different visa would suit you better, we say so."],
  ["Clear prices", "You know what it will cost before we start."],
  ["We stay in touch", "We keep you updated from the first call until your visa is approved."],
  ["We keep up with the rules", "Thai immigration rules change often. Keeping up with them is our job."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="A small Bangkok agency that does one thing well" />
      <section className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="prose-body text-xl leading-relaxed lg:col-span-7">
          <p>
            Pro Visa Bangkok is a visa agency based on Soi On Nut 10 in Suan Luang. We specialise in Long-Term
            Resident (LTR) visas, retirement visas and the other visas people ask about most, along with everything
            that comes after: extensions, 90-day reports and re-entry permits.
          </p>
          <p>
            We are also a registered agent for the Thailand Privilege Card (formerly the Thailand Elite Visa).
          </p>
          <p className="text-muted">
            Our goal is simple: make the process straightforward, so you can get on with living in Thailand.
          </p>
        </div>
        <div className="flex justify-center lg:col-span-4 lg:col-start-9">
          <Stamp className="h-48 w-48 rotate-[-8deg] text-accent" />
        </div>
      </section>
      <section className="border-t border-line py-16 md:py-20">
        <div className="wrap">
          <h2 className="h-display text-4xl">How we work</h2>
          <div className="mt-10 grid gap-x-16 md:grid-cols-2">
            {principles.map(([t, d]) => (
              <div key={t} className="border-t border-line py-6">
                <h3 className="font-serif text-2xl">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock />
    </>
  );
}
