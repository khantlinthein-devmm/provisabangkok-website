import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[lang]/privacy-policy-2">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return { title: dict.privacy.title, alternates: alternates(lang as Locale, "/privacy-policy-2/") };
}

export default async function PrivacyPage(props: PageProps<"/[lang]/privacy-policy-2">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const pr = dict.privacy;
  return (
    <>
      <PageHero lang={lang} homeLabel={dict.common.home} title={pr.title} />
      <div className="wrap max-w-3xl py-16">
        <div className="prose-content">
          <p>
            {pr.website} {site.url}.
          </p>
          <h2>{pr.collectTitle}</h2>
          <p>{pr.collect}</p>
          <h2>{pr.useTitle}</h2>
          <p>{pr.use}</p>
          <h2>{pr.choicesTitle}</h2>
          <p>
            {pr.choices} <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
