import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Celebrate your Thai journey with Pro Visa Bangkok! Contact us for personalised visa assistance.",
};

export default function ContactPage() {
  return (
    <>
      <ContactBlock
        heading="Celebrate your Thai journey with Pro Visa Bangkok."
        intro="Ready to embark on your visa journey? Contact us today and let our experienced team guide you through the process, with personalised assistance and visa solutions tailored to your needs."
      />
      <section className="wrap py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="h-display text-3xl">Find our office</h2>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link text-sm">
            Open in Google Maps
          </a>
        </div>
        <iframe
          title="Pro Visa Bangkok office location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}`)}&output=embed`}
          className="mt-6 h-[28rem] w-full border border-line grayscale-[60%]"
          loading="lazy"
        />
      </section>
    </>
  );
}
