import type { Metadata } from "next";
import VisaFinder from "@/components/tools/VisaFinder";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]/find-your-perfect-visa">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.tools.finder;
  return { title: t.title, description: t.short, alternates: alternates(lang as Locale, "/find-your-perfect-visa/") };
}

export default async function Page(props: PageProps<"/[lang]/find-your-perfect-visa">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const visas = getVisas(dict);
  return (
    <ToolPage lang={lang} dict={dict} tool="finder">
      <VisaFinder lang={lang} t={dict.tools} visas={Object.fromEntries(visas.map((v) => [v.slug, { title: v.title, short: v.short }]))} />
    </ToolPage>
  );
}
