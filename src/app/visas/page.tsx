import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { visaFacts, visas } from "@/lib/visas";

export const metadata: Metadata = {
  title: "Thailand Visas",
  description: "Thailand Privilege, LTR, retirement, education, Muay Thai, SMART and follower visas.",
};

export default function VisasPage() {
  return (
    <>
      <PageHero
        title="Visas we handle"
        subtitle="From a year of Muay Thai training to twenty years of residency. If you’re not sure which one applies to you, ask us. That’s what the free consultation is for."
      />
      <section className="wrap py-16">
        {visas.map((v, i) => (
          <Link
            key={v.slug}
            href={`/${v.slug}/`}
            className="group grid gap-4 border-b border-line py-10 first:pt-0 md:grid-cols-12 md:gap-8"
          >
            <span className="font-serif text-xl italic text-accent md:col-span-1">{i + 1}.</span>
            <div className="md:col-span-6">
              <h2 className="font-serif text-3xl group-hover:text-accent md:text-4xl">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{v.short}</p>
            </div>
            <dl className="text-sm md:col-span-4 md:col-start-8">
              {(visaFacts[v.slug]?.facts ?? []).slice(0, 3).map(([k, val]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-t border-line py-2">
                  <dt className="text-muted">{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
            <span className="hidden justify-end md:col-span-1 md:flex">
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
      <ContactBlock />
    </>
  );
}
