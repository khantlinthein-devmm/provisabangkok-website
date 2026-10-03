import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";
import { visaSlugs } from "@/lib/visas";
import CollapsibleForm from "./CollapsibleForm";
import ContactForm from "./ContactForm";
import Ornament from "./Ornament";

// Dark closing section used at the bottom of most pages.
export default function ContactBlock({ dict, heading, intro }: { dict: Dict; heading?: string; intro?: string }) {
  const c = dict.contact;
  const rows: [string, React.ReactNode][] = [
    [c.email, <a key="e" href={`mailto:${site.email}`} className="break-all hover:text-gold-light">{site.email}</a>],
    [c.line, <a key="l" href={site.line} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">{c.lineCta}</a>],
    [c.whatsapp, <a key="w" href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">{c.whatsappCta}</a>],
    [c.office, `${site.address.line1}, ${site.address.line2}`],
    [c.facebook, <a key="f" href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">{c.facebookCta}</a>],
  ];
  return (
    <section className="bg-deep text-paper">
      <div className="wrap grid gap-10 py-14 md:py-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5" data-reveal>
          <p className="label text-gold-light">{c.eyebrow}</p>
          <Ornament className="mt-4 max-w-24" />
          <h2 className="h-display mt-6 text-3xl leading-tight md:text-5xl">{heading ?? c.heading}</h2>
          <p className="mt-6 text-paper/70">{intro ?? c.intro}</p>
          <a href={`tel:${site.phoneIntl}`} className="text-metal mt-8 inline-block font-serif text-4xl lining-nums tabular-nums md:mt-10 md:text-5xl">
            {site.phone}
          </a>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
            <a href={site.line} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center bg-[#06c755] text-sm font-medium text-white">
              LINE
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center bg-[#25d366] text-sm font-medium text-white">
              WhatsApp
            </a>
          </div>
          <dl className="mt-8 hidden space-y-3 text-sm lg:block">
            {rows.map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <dt className="w-24 shrink-0 text-paper/50">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <CollapsibleForm label={c.writeMessage}>
            <ContactForm dark form={c.form} visaTitles={visaSlugs.map((s) => dict.visas[s].title)} />
          </CollapsibleForm>
          <p className="mt-6 text-sm text-paper/60 lg:hidden">
            {c.office}: {site.address.line1}, {site.address.line2}
          </p>
        </div>
      </div>
    </section>
  );
}
