import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Visa extensions, 90-day reporting, bank accounts, driver licenses, insurance, translation and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Beyond visa processing, we support you with everything you need to settle in Thailand."
      />
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-gray-100 p-7 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                <Icon name="check" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-navy">{s.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
