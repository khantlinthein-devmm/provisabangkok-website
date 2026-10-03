import Link from "next/link";
import type { Visa } from "@/lib/visas";
import Icon from "./Icon";

export default function VisaCard({ visa }: { visa: Visa }) {
  return (
    <Link
      href={`/${visa.slug}/`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="grid h-14 w-14 place-items-center rounded-xl bg-navy/5 text-gold transition group-hover:bg-navy">
        <Icon name={visa.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-navy">{visa.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{visa.duration}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{visa.short}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold">
        Learn more <Icon name="arrow" className="h-4 w-4" />
      </span>
    </Link>
  );
}
