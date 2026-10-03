import { site } from "@/lib/site";
import ContactForm from "./ContactForm";
import Ornament from "./Ornament";

// Dark closing section used at the bottom of most pages.
export default function ContactBlock({ heading = "Tell us your situation. We’ll tell you your options." }: { heading?: string }) {
  return (
    <section className="bg-deep text-paper">
      <div className="wrap grid gap-14 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-gold-light">Free consultation</p>
          <Ornament className="mt-4 max-w-24" />
          <h2 className="h-display mt-6 text-4xl leading-tight md:text-5xl">{heading}</h2>
          <p className="mt-6 text-paper/70">
            The first conversation is free. Call, message us on WhatsApp, or use the form, whichever is easiest.
          </p>
          <a href={`tel:${site.phoneIntl}`} className="text-metal mt-10 inline-block font-serif text-5xl lining-nums tabular-nums hover:text-gold-light md:text-5xl">
            {site.phone}
          </a>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-paper/50">Email</dt>
              <dd><a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">{site.email}</a></dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-paper/50">WhatsApp</dt>
              <dd><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">Message us</a></dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-paper/50">Office</dt>
              <dd>{site.address.line1}, {site.address.line2}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-paper/50">Hours</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm dark />
        </div>
      </div>
    </section>
  );
}
