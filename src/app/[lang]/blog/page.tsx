import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { formatDate, getDictionary, localePath, type Locale } from "@/i18n";
import { getAllPosts } from "@/lib/content";
import { alternates } from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.nav.blog, description: dict.blog.subtitle, alternates: alternates(lang as Locale, "/blog/") };
}

export default async function BlogPage(props: PageProps<"/[lang]/blog">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <PageHero
        lang={lang}
        homeLabel={dict.common.home}
        title={dict.blog.title}
        subtitle={lang === "en" ? dict.blog.subtitle : `${dict.blog.subtitle} ${dict.common.englishOnly}`}
        crumb={{ label: dict.nav.blog, href: "/blog/" }}
      />
      <section className="wrap py-12">
        {getAllPosts().map((post) => (
          <Link
            key={post.slug}
            href={localePath(lang, `/${post.slug}/`)}
            data-reveal
            className="group grid gap-5 border-b border-line py-10 md:grid-cols-12 md:gap-8"
          >
            <div className="relative aspect-[3/2] overflow-hidden md:col-span-3">
              {post.image && (
                <Image src={post.image} alt="" fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              )}
            </div>
            <div className="md:col-span-8" lang="en">
              <p className="text-sm text-muted">
                {formatDate(post.date, lang)}
                {post.category && <> · {post.category}</>}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-snug group-hover:text-accent">{post.title}</h2>
              <p className="mt-3 text-muted">{post.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
