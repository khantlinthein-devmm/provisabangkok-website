import type { Metadata } from "next";
import FundsChecker from "@/components/tools/FundsChecker";
import ToolPage from "@/components/tools/ToolPage";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/[lang]/visa-funds-checker">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = dict.tools.funds;
  return { title: t.title, description: t.short, alternates: alternates(lang as Locale, "/visa-funds-checker/") };
}

export default async function Page(props: PageProps<"/[lang]/visa-funds-checker">) {
  const lang = (await props.params).lang as Locale;
  const dict = await getDictionary(lang);
  return (
    <ToolPage lang={lang} dict={dict} tool="funds">
      <FundsChecker t={dict.tools.funds} ltrHref={localePath(lang, "/long-term-resident-visa/")} />
    </ToolPage>
  );
}
