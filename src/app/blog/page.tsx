import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { formatDate, getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thailand visa guides, news and tips from Pro Visa Bangkok.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero title="Latest news for you" subtitle="Guides on Thai visas, work permits, retirement and life in Thailand." crumb={{ label: "Blog", href: "/blog/" }} />
      <section className="wrap py-12">
        {posts.map((p) => (
          <Link key={p.slug} href={`/${p.slug}/`} data-reveal className="group grid gap-5 border-b border-line py-10 md:grid-cols-12 md:gap-8">
            <div className="relative aspect-[3/2] overflow-hidden md:col-span-3">
              {p.image && <Image src={p.image} alt="" fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
            </div>
            <div className="md:col-span-8">
              <p className="text-sm text-muted">
                {formatDate(p.date)}
                {p.category && <> · {p.category}</>}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-snug group-hover:text-accent">{p.title}</h2>
              <p className="mt-3 text-muted">{p.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
