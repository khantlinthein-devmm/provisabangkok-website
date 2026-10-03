import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import VisaCard from "@/components/VisaCard";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { getVisa, visas, type Visa } from "@/lib/visas";
import type { Post } from "@/lib/posts";

// Visa pages and blog posts both live at the top level (e.g. /retirement-visa/),
// matching the URLs of the original site.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...visas, ...posts].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const visa = getVisa(slug);
  if (visa) return { title: visa.title, description: visa.short };
  const post = getPost(slug);
  if (post) return { title: post.title, description: post.excerpt };
  return {};
}

export default async function Page(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const visa = getVisa(slug);
  if (visa) return <VisaPage visa={visa} />;
  const post = getPost(slug);
  if (post) return <PostPage post={post} />;
  notFound();
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-gray-700">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function VisaPage({ visa }: { visa: Visa }) {
  const others = visas.filter((v) => v.slug !== visa.slug).slice(0, 3);
  return (
    <>
      <PageHero title={visa.title} subtitle={visa.short} crumb={{ label: "Visas", href: "/visas/" }} />

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <article className="space-y-12 lg:col-span-2">
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              {visa.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy">Who is this visa for?</h2>
              <List items={visa.whoFor} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy">Basic requirements</h2>
              <List items={visa.requirements} />
              <p className="mt-4 text-sm text-gray-500">
                Requirements are set by the Thai authorities and may change. Contact us for the latest checklist for
                your nationality and situation.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-navy">How Pro Visa Bangkok helps</h2>
              <List items={visa.howWeHelp} />
            </div>

            {visa.slug === "retirement-visa" && (
              <Link href="/o-retirement-visas-features-comparison-chart/" className="btn-dark">
                Compare O, O-A and O-X retirement visas <Icon name="arrow" className="h-4 w-4" />
              </Link>
            )}
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy p-8 text-white">
              <p className="text-sm text-white/70">Duration</p>
              <p className="text-2xl font-bold text-gold">{visa.duration}</p>
              {visa.highlight && <p className="mt-4 text-sm text-white/80">{visa.highlight}</p>}
              <hr className="my-6 border-white/10" />
              <p className="font-semibold">Apply with us</p>
              <p className="mt-2 text-sm text-white/70">Free consultation — reply within one business day.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact/" className="btn-primary justify-center">Get Started</Link>
                <a href={`tel:${site.phoneIntl}`} className="btn-outline justify-center">Call {site.phone}</a>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 p-6">
              <p className="font-semibold text-navy">Other visas</p>
              <ul className="mt-4 space-y-2 text-sm">
                {visas
                  .filter((v) => v.slug !== visa.slug)
                  .map((v) => (
                    <li key={v.slug}>
                      <Link href={`/${v.slug}/`} className="text-gray-600 hover:text-gold">{v.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container-x">
          <h2 className="section-title">You may also be interested in</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((v) => (
              <VisaCard key={v.slug} visa={v} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

function PostPage({ post }: { post: Post }) {
  return (
    <>
      <PageHero title={post.title} subtitle={post.excerpt} crumb={{ label: "Blog", href: "/blog/" }} />
      <article className="container-x max-w-3xl py-16">
        <p className="text-sm text-gray-500">
          {post.category} ·{" "}
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700">
          {post.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2 className="mb-3 text-2xl font-bold text-navy">{b.heading}</h2>}
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <Link href="/blog/" className="btn-outline-dark mt-12">← Back to blog</Link>
      </article>
      <CtaBanner />
    </>
  );
}
