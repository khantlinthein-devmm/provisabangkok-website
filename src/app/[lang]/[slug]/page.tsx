import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import GoldFrame from "@/components/GoldFrame";
import { formatDate, getDictionary, localePath, locales, type Dict, type Locale } from "@/i18n";
import { getAllPosts, getPost, getVisaContent } from "@/lib/content";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { getVisas, isVisaSlug, visaImages, visaSlugs, type LocalVisa } from "@/lib/visas";

// Visa pages and blog posts both live at the top level (e.g. /retirement-visa/),
// exactly like the URLs of the original WordPress site. Blog posts are in English only.
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [...visaSlugs, ...getAllPosts().map((p) => p.slug)];
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata(props: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const dict = await getDictionary(lang);
  if (isVisaSlug(slug)) {
    const v = dict.visas[slug];
    return {
      title: v.title,
      description: v.short,
      openGraph: { images: [visaImages[slug]] },
      alternates: alternates(lang as Locale, `/${slug}/`),
    };
  }
  const post = getPost(slug);
  if (post) {
    return {
      title: post.meta.title,
      description: post.meta.description,
      openGraph: { type: "article", images: post.meta.image ? [post.meta.image] : undefined },
      // Articles are English only, so every language points search engines at the English URL.
      alternates: { canonical: localePath("en", `/${slug}/`) },
    };
  }
  return {};
}

export default async function Page(props: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await props.params;
  const lang = l as Locale;
  const dict = await getDictionary(lang);
  if (isVisaSlug(slug)) {
    const visas = getVisas(dict);
    const visa = visas.find((v) => v.slug === slug)!;
    return <VisaPage lang={lang} dict={dict} visa={visa} visas={visas} content={getVisaContent(slug, lang)} />;
  }
  const post = getPost(slug);
  if (post) return <PostPage lang={lang} dict={dict} post={post} />;
  notFound();
}

function Crumbs({ lang, home, label, href }: { lang: Locale; home: string; label: string; href: string }) {
  return (
    <nav className="label">
      <Link href={localePath(lang, "/")} className="hover:text-accent">{home}</Link>
      <span className="mx-2">/</span>
      <Link href={localePath(lang, href)} className="hover:text-accent">{label}</Link>
    </nav>
  );
}

function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <ol className="mt-3 space-y-0.5 text-sm">
      {headings.map((h, i) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="flex gap-3 py-1.5 hover:text-accent">
            <span className="w-5 shrink-0 tabular-nums text-muted">{i + 1}.</span>
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function VisaPage({
  lang,
  dict,
  visa,
  visas,
  content,
}: {
  lang: Locale;
  dict: Dict;
  visa: LocalVisa;
  visas: LocalVisa[];
  content: ReturnType<typeof getVisaContent>;
}) {
  const { html, headings } = content;
  const index = visas.findIndex((v) => v.slug === visa.slug);
  const next = visas[(index + 1) % visas.length];
  const p = (path: string) => localePath(lang, path);

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap grid gap-10 py-10 md:py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="hero-in">
              <Crumbs lang={lang} home={dict.common.home} label={dict.nav.visas} href="/service/" />
            </div>
            <h1 style={{ "--d": "120ms" } as React.CSSProperties} className="hero-in h-display mt-6 text-5xl leading-[1.05] md:text-7xl">
              {visa.title}
            </h1>
            <div className="rule-draw mt-8 h-px w-24 bg-gold" data-reveal />
            <p style={{ "--d": "260ms" } as React.CSSProperties} className="hero-in mt-6 max-w-xl text-lg text-muted">
              {visa.short}
            </p>
          </div>
          <GoldFrame className="hidden aspect-[4/5] w-full max-w-sm lg:col-span-4 lg:col-start-9 lg:block lg:justify-self-end">
            <div className="frame-photo absolute inset-0">
              <Image src={visa.image} alt="" fill priority sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover object-top" />
            </div>
          </GoldFrame>
        </div>
      </section>

      <div className="wrap grid gap-10 py-10 md:py-20 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
          <div className="border border-gold/60 p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" data-reveal>
            <p className="label text-accent">{dict.common.atAGlance}</p>
            <dl className="mt-4 divide-y divide-line text-sm">
              {visa.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {visa.slug === "thailand-privilege-membership" && <p className="mt-4 text-sm text-accent">{dict.common.registeredAgent}</p>}
            <div className="mt-6 flex flex-col gap-3">
              <Link href={p("/book-consultation/")} className="btn justify-center">{dict.common.askAboutVisa}</Link>
              <Link href={`${p("/document-checklist/")}?visa=${visa.slug}`} className="btn-ghost justify-center">
                {dict.tools.checklist.title}
              </Link>
              <a href={site.line} target="_blank" rel="noopener noreferrer" className="link text-center text-sm">
                {dict.common.chatLine}
              </a>
            </div>
            {headings.length > 2 && (
              <div className="mt-6 hidden border-t border-line pt-5 lg:block">
                <p className="label text-accent">{dict.common.onThisPage}</p>
                <Toc headings={headings} />
              </div>
            )}
          </div>
        </aside>

        <article className="lg:order-1 lg:col-span-7">
          {headings.length > 2 && (
            <details className="mb-10 border border-line px-5 lg:hidden">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between font-medium">
                {dict.common.onThisPage}
                <span className="text-muted">{headings.length}</span>
              </summary>
              <div className="pb-4">
                <Toc headings={headings} />
              </div>
            </details>
          )}
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">{dict.common.changesNote}</p>
        </article>
      </div>

      <Link href={p(`/${next.slug}/`)} className="group block border-t border-line">
        <div className="wrap flex items-center justify-between gap-6 py-10">
          <div>
            <p className="label">{dict.common.nextVisa}</p>
            <p className="mt-2 font-serif text-3xl group-hover:text-accent md:text-4xl">{next.title}</p>
          </div>
          <Arrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      <ContactBlock dict={dict} />
    </>
  );
}

function PostPage({ lang, dict, post }: { lang: Locale; dict: Dict; post: NonNullable<ReturnType<typeof getPost>> }) {
  const { meta, html } = post;
  const more = getAllPosts().filter((x) => x.slug !== meta.slug).slice(0, 3);
  const p = (path: string) => localePath(lang, path);
  return (
    <>
      <article>
        <header className="wrap max-w-4xl pb-10 pt-12 md:pt-16">
          <div className="hero-in">
            <Crumbs lang={lang} home={dict.common.home} label={dict.nav.blog} href="/blog/" />
          </div>
          <h1 style={{ "--d": "120ms" } as React.CSSProperties} className="hero-in h-display mt-6 text-4xl leading-[1.05] md:text-6xl" lang="en">
            {meta.title}
          </h1>
          <p className="mt-6 text-sm text-muted">
            {formatDate(meta.date, lang)}
            {meta.category && <> · {meta.category}</>}
          </p>
          {lang !== "en" && <p className="mt-4 inline-block border border-gold/60 px-3 py-1.5 text-sm text-accent">{dict.common.englishOnly}</p>}
        </header>
        {meta.image && (
          <div className="wrap max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={meta.image} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="frame-photo object-cover" />
            </div>
          </div>
        )}
        <div className="wrap max-w-3xl py-14" lang="en">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

      <section className="border-t border-line py-16">
        <div className="wrap">
          <h2 className="h-display text-3xl">{dict.common.moreArticles}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {more.map((x) => (
              <Link key={x.slug} href={p(`/${x.slug}/`)} className="group">
                <p className="text-xs text-muted">{formatDate(x.date, lang)}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug group-hover:text-accent" lang="en">{x.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock dict={dict} heading={dict.contact.postHeading} />
    </>
  );
}
