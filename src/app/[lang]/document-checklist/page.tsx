import type { Metadata } from "next";
import Checklist from "@/components/tools/Checklist";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]/document-checklist">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.tools.checklist;
  return { title: t.title, description: t.short, alternates: alternates(lang as Locale, "/document-checklist/") };
}

export default async function Page(props: PageProps<"/[lang]/document-checklist">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const visas = getVisas(dict);
  return (
    <ToolPage lang={lang} dict={dict} tool="checklist">
      <Checklist t={dict.tools.checklist} visas={visas.map((v) => ({ slug: v.slug, title: v.title }))} />
    </ToolPage>
  );
}
