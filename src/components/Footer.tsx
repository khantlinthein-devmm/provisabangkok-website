import Link from "next/link";
import { nav, site } from "@/lib/site";
import { visas } from "@/lib/visas";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold text-white">
            Pro Visa <span className="text-gold">Bangkok</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            Trusted visa consultant in Thailand and registered agent for the Thailand Privilege Card.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Visas</p>
          <ul className="mt-4 space-y-2 text-sm">
            {visas.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}/`} className="hover:text-gold">
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/o-retirement-visas-features-comparison-chart/" className="hover:text-gold">
                Retirement Visa Comparison
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Contact Us</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-gold" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
            <li>
              <a href={`tel:${site.phoneIntl}`} className="flex gap-3 hover:text-gold">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-gold" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-gold">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-gold" /> {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="h-5 w-5 shrink-0 text-gold" /> {site.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
