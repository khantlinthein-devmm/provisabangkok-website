import type { Metadata } from "next";
import Image from "next/image";
import ContactBlock from "@/components/ContactBlock";
import CountUp from "@/components/CountUp";
import GoldFrame from "@/components/GoldFrame";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Pro Visa Bangkok is a trusted visa agent in Thailand and a registered agent for the Thailand Privilege Card.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="We are a trusted visa agent" crumb={{ label: "About", href: "/about/" }} />

      <section className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="prose-content lg:col-span-7" data-reveal>
          <p className="font-serif text-2xl leading-snug">Welcome to Miss P’s ProVisa Bangkok information portal!</p>
          <p>
            Experience straightforward and simplified visa assistance with the expert team at ProVisa Bangkok. As
            seasoned visa services specialists, we are proud to be registered agents for the Thailand Privilege Card,
            offering in-depth expertise and personalised guidance. We also specialise in Long Term Visas (LTR),
            retirement visas, and other commonly sought-after visas, along with their associated processes. Our
            experience ensures a streamlined experience for our clients at every step.
          </p>
          <p>
            Navigating the visa process, especially those with financial requirements, can present challenges. It’s
            crucial to gather information from trustworthy sources, as Thailand Immigration policies may change. For
            instance, relying solely on a combination of income and a deposit to fulfil retirement visa requirements
            isn’t assured, despite what some sources may indicate. Our team strongly cautions against such dependence.
            Banking practices in Thailand may not always align with commonly stated online information.
          </p>
          <p>
            Visa application processes vary in complexity, and Immigration Officers have the authority to exercise
            discretion. Their decisions may not always adhere strictly to standard requirements, and they can reject
            applications without providing reasons. Citizens of certain countries may also face added document
            requirements or eligibility constraints.
          </p>
          <p>
            Strict adherence to visa regulations is paramount for a hassle-free stay in Thailand. You can trust that we
            offer up-to-date information on all immigration matters and will provide guidance and support at every step
            of the way. If you ever feel uncertain about your next move, don’t hesitate to reach out. We are dedicated
            to ensuring that our actions match our commitments.
          </p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <figure className="lg:sticky lg:top-28">
            <GoldFrame className="aspect-[3/4]">
              <div className="frame-photo absolute inset-0">
                <Image src="/images/miss-p.jpg" alt="Miss P, Managing Director of Pro Visa Bangkok" fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover object-top" />
              </div>
            </GoldFrame>
            <figcaption className="mt-4">
              <p className="font-serif text-3xl">Miss P</p>
              <p className="label mt-1 text-accent">Managing Director</p>
            </figcaption>
          </figure>
        </aside>
      </section>

      <section className="border-t border-line py-14">
        <dl className="wrap grid grid-cols-3 gap-6">
          {site.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dd className="text-metal font-serif text-5xl lining-nums md:text-6xl">
                <CountUp value={s.value} />
              </dd>
              <dt className="text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Testimonials />
      <ContactBlock />
    </>
  );
}
