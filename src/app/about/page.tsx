import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Pro Visa Bangkok — trusted visa consultant and registered Thailand Privilege Card agent.",
};

const values = [
  "Honest, transparent advice",
  "Clear pricing with no hidden fees",
  "Fast, friendly communication",
  "Up-to-date knowledge of Thai immigration rules",
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Pro Visa Bangkok" subtitle="Expert guidance and personalised support for your life in Thailand." />
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-gray-700">
            <p>
              Pro Visa Bangkok is a trusted visa consultant in Thailand. We are registered agents for the Thailand
              Privilege Card, and we specialise in Long Term Resident (LTR) visas, retirement visas and other commonly
              sought-after visas, along with their associated processes.
            </p>
            <p>
              Thai immigration rules can be confusing and change often. Our mission is to make the process
              straightforward and simple — so you can focus on enjoying your life in Thailand.
            </p>
            <Link href="/contact/" className="btn-primary">Talk to an expert</Link>
          </div>
          <div className="rounded-2xl bg-navy p-10 text-white">
            <h2 className="text-2xl font-bold">Our promise</h2>
            <ul className="mt-6 space-y-4">
              {values.map((v) => (
                <li key={v} className="flex gap-3">
                  <Icon name="check" className="h-6 w-6 shrink-0 text-gold" /> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
