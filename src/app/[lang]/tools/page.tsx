import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import ToolCards from "@/components/tools/ToolCards";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/[lang]/tools">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.tools.hubTitle, description: dict.tools.hubSubtitle, alternates: alternates(lang as Locale, "/tools/") };
}

export default async function ToolsPage(props: PageProps<"/[lang]/tools">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <PageHero lang={lang} homeLabel={dict.common.home} title={dict.tools.hubTitle} subtitle={dict.tools.hubSubtitle} />
      <section className="wrap py-16">
        <ToolCards lang={lang} dict={dict} />
        <p className="mt-10 max-w-3xl text-sm text-muted">{dict.tools.privateNote}</p>
      </section>
      <ContactBlock dict={dict} />
    </>
  );
}
