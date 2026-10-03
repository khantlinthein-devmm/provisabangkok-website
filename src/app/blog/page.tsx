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
      <PageHero title="Blog" subtitle="Visa guides, news and tips for living in Thailand." />
      <section className="py-16">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/${p.slug}/`} className="group rounded-2xl border border-gray-100 p-7 shadow-sm transition hover:shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">{p.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-navy group-hover:text-gold">{p.title}</h2>
              <p className="mt-3 text-sm text-gray-600">{p.excerpt}</p>
              <p className="mt-5 text-sm font-semibold text-navy">Read more →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
