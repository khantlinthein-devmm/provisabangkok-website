import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import VisaCard from "@/components/VisaCard";
import { visas } from "@/lib/visas";

export const metadata: Metadata = {
  title: "Thailand Visas",
  description: "Thailand Privilege, LTR, retirement, education, Muay Thai, SMART and follower visas.",
};

export default function VisasPage() {
  return (
    <>
      <PageHero
        title="Thailand Visas"
        subtitle="From short-term study to 20-year residency — we help you choose and obtain the right visa."
      />
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visas.map((v) => (
            <VisaCard key={v.slug} visa={v} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
