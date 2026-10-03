import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import type { ToolKey } from "@/lib/tools";
import ToolCards from "./ToolCards";

/** Shared frame for every tool page: heading, the tool, a disclaimer and links to the other tools. */
export default function ToolPage({ lang, dict, tool, children }: { lang: Locale; dict: Dict; tool: ToolKey; children: React.ReactNode }) {
  const copy = dict.tools[tool];
  return (
    <>
      <PageHero
        lang={lang}
        homeLabel={dict.common.home}
        title={copy.title}
        subtitle={copy.short}
        crumb={{ label: dict.nav.tools, href: "/tools/" }}
      />
      <section className="wrap py-14 md:py-20">
        {children}
        <p className="mt-14 max-w-3xl border-t border-line pt-6 text-sm text-muted">
          {dict.tools.disclaimer} {dict.tools.privateNote}
        </p>
      </section>
      <section className="border-t border-line bg-paper-2/60 py-16">
        <div className="wrap">
          <p className="label text-accent">{dict.tools.hubTitle}</p>
          <ToolCards lang={lang} dict={dict} exclude={tool} className="mt-8" />
        </div>
      </section>
      <ContactBlock dict={dict} />
    </>
  );
}
