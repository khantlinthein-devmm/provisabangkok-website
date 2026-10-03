import type { Metadata } from "next";
import Booking from "@/components/tools/Booking";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary, localeInfo, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getVisas } from "@/lib/visas";

export async function generateMetadata(props: PageProps<"/[lang]/book-consultation">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.tools.booking;
  return { title: t.title, description: t.short, alternates: alternates(lang as Locale, "/book-consultation/") };
}

export default async function Page(props: PageProps<"/[lang]/book-consultation">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  const visas = getVisas(dict);
  return (
    <ToolPage lang={lang} dict={dict} tool="booking">
      <Booking t={dict.tools} common={{ notSure: dict.contact.form.notSure }} dateLocale={localeInfo[lang].dateLocale} topics={visas.map((v) => v.title)} />
    </ToolPage>
  );
}
