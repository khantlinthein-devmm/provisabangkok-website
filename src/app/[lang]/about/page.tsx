import type { Metadata } from "next";
import Image from "next/image";
import ContactBlock from "@/components/ContactBlock";
import CountUp from "@/components/CountUp";
import GoldFrame from "@/components/GoldFrame";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.nav.about, description: dict.about.paras[0], alternates: alternates(lang as Locale, "/about/") };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const a = dict.about;
  return (
    <>
      <PageHero lang={lang} homeLabel={dict.common.home} title={a.title} crumb={{ label: dict.nav.about, href: "/about/" }} />

      <section className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="prose-content lg:col-span-7" data-reveal>
          <p className="font-serif text-2xl leading-snug">{a.welcome}</p>
          {a.paras.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <figure className="lg:sticky lg:top-28">
            <GoldFrame className="aspect-[3/4]">
              <div className="frame-photo absolute inset-0">
                <Image src="/images/miss-p.jpg" alt={a.portraitAlt} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover object-top" />
              </div>
            </GoldFrame>
            <figcaption className="mt-4">
              <p className="font-serif text-3xl">Miss P</p>
              <p className="label mt-1 text-accent">{a.role}</p>
            </figcaption>
          </figure>
        </aside>
      </section>

      <section className="border-t border-line py-14">
        <dl className="wrap grid grid-cols-3 gap-6">
          {site.stats.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dd className="text-metal font-serif text-5xl lining-nums md:text-6xl">
                <CountUp value={s.value} />
              </dd>
              <dt className="text-sm text-muted">{dict.home.stats[i]}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Testimonials t={dict.testimonials} />
      <ContactBlock dict={dict} />
    </>
  );
}
