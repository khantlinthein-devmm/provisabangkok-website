import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Pro Visa Bangkok — ${site.phone} · ${site.email}`,
};

export default function ContactPage() {
  const items = [
    { icon: "pin" as const, label: "Office", value: `${site.address.line1}, ${site.address.line2}`, href: site.mapUrl },
    { icon: "phone" as const, label: "Phone", value: site.phone, href: `tel:${site.phoneIntl}` },
    { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "clock" as const, label: "Opening hours", value: site.hours },
  ];
  return (
    <>
      <PageHero title="Contact Us" subtitle="Book your free consultation — we’re happy to help." />
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          <ul className="space-y-6 lg:col-span-2">
            {items.map((i) => (
              <li key={i.label} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon name={i.icon} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">{i.label}</p>
                  {i.href ? (
                    <a href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-all font-semibold text-navy hover:text-gold">
                      {i.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy">{i.value}</p>
                  )}
                </div>
              </li>
            ))}
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-dark">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <div className="rounded-2xl bg-gray-50 p-8 lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-navy">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
        <div className="container-x mt-16">
          <iframe
            title="Pro Visa Bangkok office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}`)}&output=embed`}
            className="h-96 w-full rounded-2xl border-0"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
