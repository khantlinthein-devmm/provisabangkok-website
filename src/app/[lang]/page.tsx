import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import CountUp from "@/components/CountUp";
import GoldFrame from "@/components/GoldFrame";
import Ornament from "@/components/Ornament";
import PhotoMarquee from "@/components/PhotoMarquee";
import Testimonials from "@/components/Testimonials";
import ToolCards from "@/components/tools/ToolCards";
import { formatDate, getDictionary, localePath, type Locale } from "@/i18n";
import { getAllPosts } from "@/lib/content";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { customerPhotos } from "@/lib/testimonials";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  return { alternates: alternates(lang as Locale, "/") };
}

export default async function Home(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const h = dict.home;
  const p = (path: string) => localePath(lang, path);
  const visas = getVisas(dict);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Intro */}
      <section className="border-b border-line">
        <div className="wrap grid gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:items-center lg:pb-20">
          <div className="lg:col-span-7">
            <p className="label hero-in">{h.eyebrow}</p>
            <h1
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="hero-in h-display mt-6 text-[3.25rem] leading-[1.02] sm:text-7xl lg:text-[5.25rem]"
            >
              {h.titleA} <em className="text-metal pr-1">{h.titleEm}</em> {h.titleB}
            </h1>
            <p style={{ "--d": "260ms" } as React.CSSProperties} className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {h.intro}
            </p>
            <div style={{ "--d": "380ms" } as React.CSSProperties} className="hero-in mt-10 flex flex-wrap items-center gap-4">
              <Link href={p("/book-consultation/")} className="btn">
                {dict.common.bookFree} <Arrow />
              </Link>
              <a href={site.line} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {dict.common.chatLine}
              </a>
            </div>
            <dl
              style={{ "--d": "500ms" } as React.CSSProperties}
              className="hero-in mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
            >
              {site.stats.map((s, i) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="label normal-case tracking-normal">{h.stats[i]}</dt>
                  <dd className="text-metal order-first font-serif text-4xl lining-nums md:text-5xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative lg:col-span-5">
            <GoldFrame className="ml-auto aspect-square max-w-lg">
              <div className="frame-photo absolute inset-0">
                <Image src="/images/hero.webp" alt={h.heroAlt} fill priority sizes="(min-width: 1024px) 32rem, 100vw" className="object-cover" />
              </div>
            </GoldFrame>
          </figure>
        </div>
      </section>

      {/* Visa index */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-accent">{h.servicesEyebrow}</p>
              <h2 className="h-display mt-3 max-w-xl text-4xl leading-tight md:text-5xl">{h.servicesTitle}</h2>
            </div>
            <Link href={p("/service/")} className="link text-sm">{dict.common.allVisas}</Link>
          </div>

          <div className="mt-12 border-t border-ink">
            <div className="hidden grid-cols-12 gap-6 border-b border-line py-3 text-xs text-muted md:grid">
              <span className="col-span-1">{h.colNo}</span>
              <span className="col-span-4">{h.colVisa}</span>
              <span className="col-span-4">{h.colBestFor}</span>
              <span className="col-span-2">{h.colLength}</span>
            </div>
            {visas.map((v, i) => (
              <Link
                key={v.slug}
                href={p(`/${v.slug}/`)}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-colors hover:bg-paper-2 md:px-2"
              >
                <span className="col-span-2 text-sm tabular-nums text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 font-serif text-2xl group-hover:text-accent md:col-span-4 md:text-3xl">{v.title}</span>
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-4 md:col-start-auto md:text-base md:text-ink">{v.forWhom}</span>
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-2 md:col-start-auto">{v.duration}</span>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="border-t border-line bg-paper-2/60 py-20 md:py-28">
        <div className="wrap">
          <div className="max-w-2xl" data-reveal>
            <p className="label text-accent">{h.toolsEyebrow}</p>
            <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">{h.toolsTitle}</h2>
            <p className="mt-4 text-muted">{h.toolsIntro}</p>
          </div>
          <ToolCards lang={lang} dict={dict} className="mt-12" />
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-line py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="label text-accent">{h.howEyebrow}</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">{h.howTitle}</h2>
              <p className="mt-5 text-muted">{h.howIntro}</p>
              <ul className="mt-8 space-y-2 text-sm">
                {h.values.map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {h.steps.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="grid grid-cols-[3rem_1fr] border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <span className="font-serif text-3xl italic text-gold">{i + 1}.</span>
                <div>
                  <h3 className="text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-accent">{h.customersEyebrow}</p>
              <h2 className="h-display mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">{h.customersTitle}</h2>
            </div>
            <Link href={p("/customer/")} className="link text-sm">{h.seeAllCustomers}</Link>
          </div>
        </div>
        <div className="mt-12" data-reveal>
          <PhotoMarquee photos={customerPhotos} alt={dict.customer.photoAlt} />
        </div>
      </section>

      <Testimonials t={dict.testimonials} />

      {/* Other services + retirement comparison */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div data-reveal>
            <p className="label text-accent">{h.moreEyebrow}</p>
            <h2 className="h-display mt-3 text-4xl leading-tight">{h.moreTitle}</h2>
            <ul className="mt-8 border-t border-line">
              {dict.services.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span>{s.title}</span>
                  <span className="hidden text-right text-sm text-muted sm:block">{s.short}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start bg-deep p-8 text-paper md:p-10" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <p className="label text-gold-light">{h.compareEyebrow}</p>
            <Ornament className="mt-4 max-w-24" />
            <h2 className="h-display mt-6 text-4xl leading-tight">{h.compareTitle}</h2>
            <p className="mt-5 text-paper/70">{h.compareText}</p>
            <Link
              href={p("/o-retirement-visas-features-comparison-chart/")}
              className="mt-8 inline-flex items-center gap-3 border-b border-gold-light/50 pb-1 text-sm text-gold-light hover:border-gold-light"
            >
              {h.compareLink} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-accent">{h.newsEyebrow}</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">{h.newsTitle}</h2>
            </div>
            <Link href={p("/blog/")} className="link text-sm">{dict.common.allArticles}</Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={p(`/${post.slug}/`)}
                className="group"
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              >
                {post.image && (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <p className="mt-5 text-xs text-muted">{formatDate(post.date, lang)}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug group-hover:text-accent">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock dict={dict} />
    </>
  );
}
