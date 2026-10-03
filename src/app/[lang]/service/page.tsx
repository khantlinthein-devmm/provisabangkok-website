import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]/service">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.servicePage.title, description: dict.servicePage.subtitle, alternates: alternates(lang as Locale, "/service/") };
}

export default async function ServicePage(props: PageProps<"/[lang]/service">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const sp = dict.servicePage;
  return (
    <>
      <PageHero lang={lang} homeLabel={dict.common.home} title={sp.title} subtitle={sp.subtitle} />
      <section className="wrap py-16">
        {getVisas(dict).map((v, i) => (
          <Link
            key={v.slug}
            href={localePath(lang, `/${v.slug}/`)}
            data-reveal
            className="group grid gap-6 border-b border-line py-10 first:pt-0 md:grid-cols-12 md:gap-8"
          >
            <div className="relative hidden aspect-[4/5] overflow-hidden md:col-span-2 md:block">
              <Image src={v.image} alt="" fill sizes="12rem" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="md:col-span-5">
              <span className="font-serif text-xl italic text-gold">{i + 1}.</span>
              <h2 className="mt-1 font-serif text-3xl group-hover:text-accent md:text-4xl">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{v.short}</p>
            </div>
            <dl className="self-center text-sm md:col-span-4">
              {v.facts.slice(0, 3).map(([k, val]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-t border-line py-2">
                  <dt className="text-muted">{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
            <span className="hidden items-center justify-end md:col-span-1 md:flex">
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <div className="wrap">
          <p className="label text-accent">{sp.includes}</p>
          <h2 className="h-display mt-3 text-4xl">{sp.beyond}</h2>
          <div className="mt-10 grid gap-x-16 md:grid-cols-2">
            {dict.services.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
                className="grid grid-cols-[3rem_1fr] border-t border-line py-7"
              >
                <span className="font-serif text-xl italic text-gold">{i + 1}.</span>
                <div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock dict={dict} />
    </>
  );
}
