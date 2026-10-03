import type { Metadata } from "next";
import NinetyDay from "@/components/tools/NinetyDay";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary, localeInfo, localePath, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/[lang]/90-day-report-calculator">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.tools.report;
  return { title: t.title, description: t.short, alternates: alternates(lang as Locale, "/90-day-report-calculator/") };
}

export default async function Page(props: PageProps<"/[lang]/90-day-report-calculator">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  return (
    <ToolPage lang={lang} dict={dict} tool="report">
      <NinetyDay t={dict.tools.report} dateLocale={localeInfo[lang].dateLocale} helpHref={localePath(lang, "/book-consultation/")} />
    </ToolPage>
  );
}
