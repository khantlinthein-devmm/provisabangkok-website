import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thailand visa guides, news and tips from Pro Visa Bangkok.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" subtitle="Guides and notes on visas and living in Thailand." />
      <section className="wrap py-12">
        {posts.map((p) => (
          <Link key={p.slug} href={`/${p.slug}/`} className="group grid gap-3 border-b border-line py-10 md:grid-cols-12 md:gap-8">
            <p className="text-sm text-muted md:col-span-3">
              {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              <br />
              {p.category}
            </p>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl leading-snug group-hover:text-accent">{p.title}</h2>
              <p className="mt-3 text-muted">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
