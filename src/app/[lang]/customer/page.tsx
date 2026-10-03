import type { Metadata } from "next";
import Image from "next/image";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { customerPhotos } from "@/lib/testimonials";

export async function generateMetadata(props: PageProps<"/[lang]/customer">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.nav.customers, description: dict.customer.subtitle, alternates: alternates(lang as Locale, "/customer/") };
}

export default async function CustomerPage(props: PageProps<"/[lang]/customer">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <PageHero
        lang={lang}
        homeLabel={dict.common.home}
        title={dict.customer.title}
        subtitle={dict.customer.subtitle}
        crumb={{ label: dict.nav.customers, href: "/customer/" }}
      />
      <section className="wrap py-16">
        <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
          {customerPhotos.map((src, i) => (
            <div
              key={src}
              data-reveal
              style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
              className="relative aspect-[4/5] break-inside-avoid overflow-hidden"
            >
              <Image src={src} alt={dict.customer.photoAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <Testimonials t={dict.testimonials} />
      <ContactBlock dict={dict} />
    </>
  );
}
