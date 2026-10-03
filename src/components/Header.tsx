"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="hidden bg-navy text-sm text-white/90 md:block">
        <div className="container-x flex items-center justify-between py-2">
          <span>{site.tagline}</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-2 hover:text-gold">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
              <Icon name="mail" className="h-4 w-4" /> {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy font-bold text-gold">PV</span>
          <span className="text-xl font-bold tracking-tight text-navy">
            Pro Visa <span className="text-gold">Bangkok</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "text-gold" : "text-navy hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact/" className="btn-primary ml-3">
            Free Consultation
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t bg-white lg:hidden">
          <div className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-gray-100 py-3 font-medium text-navy last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn-primary my-3 justify-center">
              Free Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
