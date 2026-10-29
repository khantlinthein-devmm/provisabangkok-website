import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import CountUp from "@/components/CountUp";
import GoldFrame from "@/components/GoldFrame";
import PhotoMarquee from "@/components/PhotoMarquee";
import Testimonials from "@/components/Testimonials";
import ToolCards from "@/components/tools/ToolCards";
import { formatDate, getDictionary, localePath, type Locale } from "@/i18n";
import { getAllPosts } from "@/lib/content";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { getTeam } from "@/lib/team";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  return { alternates: alternates(lang as Locale, "/") };
}

export default async function Home(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const h = dict.home;
  const { groupPhotos } = await getTeam();
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
              {h.titleA}
              <em className="text-metal pr-1">{h.titleEm}</em>
              {h.titleB}
            </h1>
            <p style={{ "--d": "260ms" } as React.CSSProperties} className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {h.intro}
            </p>
            <div style={{ "--d": "380ms" } as React.CSSProperties} className="hero-in mt-10 flex flex-wrap items-center gap-4">
              <Link href={p("/book-consultation/")} className="btn">
                {dict.common.bookFree} <Arrow />
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-90 transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 1 1 7.99 4.42Zm8-17.43A11.3 11.3 0 0 0 12.04.75C5.8.75.74 5.8.74 12.04c0 2 .52 3.94 1.51 5.65L.65 23.5l5.95-1.56a11.27 11.27 0 0 0 5.43 1.38h.01c6.23 0 11.3-5.06 11.3-11.29 0-3.02-1.17-5.85-3.3-7.98Z" />
                </svg>
                WhatsApp
              </a>
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
      <section className="py-14 md:py-28">
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
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-line py-4 transition-colors hover:bg-paper-2 md:px-2 md:py-6"
              >
                <span className="col-span-2 text-sm tabular-nums text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 font-serif text-2xl group-hover:text-accent md:col-span-4 md:text-3xl">{v.title}</span>
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-4 md:col-start-auto md:text-base md:text-ink">{v.forWhom}</span>
                <span className="hidden text-sm text-muted md:col-span-2 md:block">{v.duration}</span>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href={p("/o-retirement-visas-features-comparison-chart/")}
            className="mt-6 inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium hover:text-accent"
          >
            <span>{h.compareTitle.replace(/[“”«»]/g, "")}</span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-accent">{h.compareLink} <Arrow /></span>
          </Link>
        </div>
      </section>

      {/* Free tools */}
      <section className="border-t border-line bg-paper-2/60 py-14 md:py-28">
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
      <section className="border-y border-line py-14 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="label text-accent">{h.howEyebrow}</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">{h.howTitle}</h2>
              <p className="mt-5 text-muted">{h.howIntro}</p>
              <ul className="mt-8 hidden space-y-2 text-sm lg:block">
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
                className="grid grid-cols-[3rem_1fr] border-t border-line py-6 first:border-t-0 first:pt-0 md:py-8"
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

      {/* Team and office photos (edited in Keystatic) */}
      {groupPhotos.length > 0 && (
        <section className="py-14 md:py-28">
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
            <PhotoMarquee photos={groupPhotos.map((g) => ({ src: g.photo, alt: g.caption || dict.customer.photoAlt }))} />
          </div>
        </section>
      )}

      <Testimonials t={dict.testimonials} />

      {/* Blog */}
      <section className="border-t border-line py-14 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-accent">{h.newsEyebrow}</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">{h.newsTitle}</h2>
            </div>
            <Link href={p("/blog/")} className="link text-sm">{dict.common.allArticles}</Link>
          </div>
          <div className="mt-8 grid gap-6 border-t border-line pt-6 md:mt-12 md:gap-10 md:border-0 md:pt-0 md:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={p(`/${post.slug}/`)}
                className="group"
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              >
                {post.image && (
                  <div className="relative hidden aspect-[3/2] overflow-hidden md:block">
                    <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <p className="text-xs text-muted md:mt-5">{formatDate(post.date, lang)}</p>
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
