import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import { formatDate, getAllPosts, getPost, getVisaHtml } from "@/lib/content";
import { site } from "@/lib/site";
import { getVisa, visas, type Visa } from "@/lib/visas";

// Visa pages and blog posts both live at the top level (e.g. /retirement-visa/),
// exactly like the URLs of the original WordPress site.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...visas.map((v) => v.slug), ...getAllPosts().map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const visa = getVisa(slug);
  if (visa) return { title: visa.title, description: visa.short, openGraph: { images: [visa.image] } };
  const post = getPost(slug);
  if (post) {
    return {
      title: post.meta.title,
      description: post.meta.description,
      openGraph: { type: "article", images: post.meta.image ? [post.meta.image] : undefined },
    };
  }
  return {};
}

export default async function Page(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const visa = getVisa(slug);
  if (visa) return <VisaPage visa={visa} html={getVisaHtml(slug) ?? ""} />;
  const post = getPost(slug);
  if (post) return <PostPage post={post} />;
  notFound();
}

function Crumbs({ label, href }: { label: string; href: string }) {
  return (
    <nav className="label">
      <Link href="/" className="hover:text-accent">Home</Link>
      <span className="mx-2">/</span>
      <Link href={href} className="hover:text-accent">{label}</Link>
    </nav>
  );
}

function VisaPage({ visa, html }: { visa: Visa; html: string }) {
  const index = visas.findIndex((v) => v.slug === visa.slug);
  const next = visas[(index + 1) % visas.length];

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Crumbs label="Visas" href="/service/" />
            <h1 className="h-display mt-6 text-5xl leading-[1.02] md:text-7xl">{visa.title}</h1>
            <div className="mt-8 h-px w-24 bg-gold" />
            <p className="mt-6 max-w-xl text-lg text-muted">{visa.short}</p>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-gold/60 p-2 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <div className="relative h-full w-full overflow-hidden">
              <Image src={visa.image} alt="" fill priority sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
          <div className="border border-gold/60 p-6 lg:sticky lg:top-28">
            <p className="label text-accent">At a glance</p>
            <dl className="mt-4 divide-y divide-line text-sm">
              {visa.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {visa.highlight && <p className="mt-4 text-sm text-accent">{visa.highlight}</p>}
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact-us/" className="btn justify-center">Ask us about this visa</Link>
              <a href={site.line} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center">
                Chat on LINE
              </a>
            </div>
          </div>
        </aside>

        <article className="lg:order-1 lg:col-span-7">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
            Thailand’s immigration processes and requirements may change. Please contact us directly to discuss your
            needs and get the most up-to-date information.
          </p>
        </article>
      </div>

      <Link href={`/${next.slug}/`} className="group block border-t border-line">
        <div className="wrap flex items-center justify-between gap-6 py-10">
          <div>
            <p className="label">Next visa</p>
            <p className="mt-2 font-serif text-3xl group-hover:text-accent md:text-4xl">{next.title}</p>
          </div>
          <Arrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      <ContactBlock />
    </>
  );
}

function PostPage({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  const { meta, html } = post;
  const more = getAllPosts().filter((p) => p.slug !== meta.slug).slice(0, 3);
  return (
    <>
      <article>
        <header className="wrap max-w-4xl pb-10 pt-12 md:pt-16">
          <Crumbs label="Blog" href="/blog/" />
          <h1 className="h-display mt-6 text-4xl leading-[1.05] md:text-6xl">{meta.title}</h1>
          <p className="mt-6 text-sm text-muted">
            {formatDate(meta.date)}
            {meta.category && <> · {meta.category}</>}
          </p>
        </header>
        {meta.image && (
          <div className="wrap max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={meta.image} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="wrap max-w-3xl py-14">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

      <section className="border-t border-line py-16">
        <div className="wrap">
          <h2 className="h-display text-3xl">More articles</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="group">
                <p className="text-xs text-muted">{formatDate(p.date)}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug group-hover:text-accent">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock heading="Have a question about your own visa?" />
    </>
  );
}
