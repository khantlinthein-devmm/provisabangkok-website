import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Visa extensions, 90-day reporting, bank accounts, driving licences, insurance, translation and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Beyond the visa"
        subtitle="Getting the visa is step one. These are the other things we help with once you’re living here."
      />
      <section className="wrap grid gap-x-16 py-16 md:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.title} className="grid grid-cols-[3rem_1fr] border-b border-line py-8">
            <span className="font-serif text-xl italic text-gold">{i + 1}.</span>
            <div>
              <h2 className="text-xl font-medium">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </section>
      <ContactBlock />
    </>
  );
}
