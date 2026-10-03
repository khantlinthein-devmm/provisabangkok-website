import type { Metadata } from "next";
import Image from "next/image";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { customerPhotos } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Customers",
  description: "Thank you to all our customers for trusting Pro Visa Bangkok with their visas.",
};

export default function CustomerPage() {
  return (
    <>
      <PageHero
        title="Thank you"
        subtitle="We sincerely appreciate your trust in our services. It’s been our pleasure assisting you with your visa needs, and we look forward to serving you again."
        crumb={{ label: "Customers", href: "/customer/" }}
      />
      <section className="wrap py-16">
        <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
          {customerPhotos.map((src, i) => (
            <div
              key={src}
              data-reveal
              style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
              className="relative aspect-[4/5] break-inside-avoid overflow-hidden"
            >
              <Image src={src} alt="Pro Visa Bangkok with a customer" fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
      <ContactBlock />
    </>
  );
}
