import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[lang]/contact-us">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.nav.contact, description: dict.contact.pageIntro, alternates: alternates(lang as Locale, "/contact-us/") };
}

export default async function ContactPage(props: PageProps<"/[lang]/contact-us">) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return (
    <>
      <ContactBlock dict={dict} heading={dict.contact.pageHeading} intro={dict.contact.pageIntro} />
      <section className="wrap py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="h-display text-3xl">{dict.contact.findOffice}</h2>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link text-sm">
            {dict.contact.openMaps}
          </a>
        </div>
        <iframe
          title={dict.contact.findOffice}
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}`)}&output=embed`}
          className="mt-6 h-[28rem] w-full border border-line grayscale-[60%]"
          loading="lazy"
        />
      </section>
    </>
  );
}
