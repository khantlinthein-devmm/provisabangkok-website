import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { getPost, posts, type Post } from "@/lib/posts";
import { site } from "@/lib/site";
import { getVisa, visaFacts, visas, type Visa } from "@/lib/visas";

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

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="grid gap-4 border-t border-line pt-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 className="font-serif text-2xl italic">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-4 leading-relaxed">
            <span className="text-accent">–</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VisaPage({ visa }: { visa: Visa }) {
  const facts = visaFacts[visa.slug]?.facts ?? [["Length", visa.duration]];
  const index = visas.findIndex((v) => v.slug === visa.slug);
  const next = visas[(index + 1) % visas.length];

  return (
    <>
      <PageHero title={visa.title} subtitle={visa.short} crumb={{ label: "Visas", href: "/visas/" }} />

      <div className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
          <div className="border border-ink p-6 lg:sticky lg:top-24">
            <p className="font-serif text-xl italic">Fact sheet</p>
            <dl className="mt-4 divide-y divide-line text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {visa.highlight && <p className="mt-4 text-sm text-accent">{visa.highlight}</p>}
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact/" className="btn justify-center">Ask us about this visa</Link>
              <a href={`tel:${site.phoneIntl}`} className="btn-ghost justify-center tabular-nums">{site.phone}</a>
            </div>
          </div>
        </aside>

        <article className="space-y-12 lg:order-1 lg:col-span-7">
          <div className="prose-body text-xl leading-relaxed">
            {visa.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Section title="Who it’s for" items={visa.whoFor} />
          <Section title="What you’ll need" items={visa.requirements} />
          <Section title="What we do" items={visa.howWeHelp} />
          <p className="border-t border-line pt-6 text-sm text-muted">
            Requirements are set by the Thai authorities and change from time to time. Talk to us for the current
            checklist for your nationality.
          </p>
          {visa.slug === "retirement-visa" && (
            <Link href="/o-retirement-visas-features-comparison-chart/" className="btn">
              Compare O, O-A and O-X <Arrow />
            </Link>
          )}
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

function PostPage({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero title={post.title} crumb={{ label: "Blog", href: "/blog/" }} />
      <article className="wrap max-w-3xl py-16">
        <p className="label">
          {post.category} · {date}
        </p>
        <p className="mt-6 font-serif text-2xl leading-snug">{post.excerpt}</p>
        <div className="mt-10 space-y-8 text-lg leading-relaxed">
          {post.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2 className="mb-3 font-serif text-3xl">{b.heading}</h2>}
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <Link href="/blog/" className="link mt-14 inline-block text-sm">Back to the blog</Link>
      </article>
      <ContactBlock heading="Have a question about your own visa?" />
    </>
  );
}
