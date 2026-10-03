"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = nav.filter((n) => n.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" onClick={() => setOpen(false)} className="font-serif text-2xl tracking-tight">
          Pro Visa <em className="text-accent">Bangkok</em>
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "text-accent" : "text-ink hover:text-accent"}
            >
              {item.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneIntl}`} className="tabular-nums text-muted hover:text-accent">
            {site.phone}
          </a>
          <Link href="/contact/" className="btn py-2">Book a consultation</Link>
        </nav>

        <button
          type="button"
          className="text-sm font-medium lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line lg:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-serif text-2xl last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${site.phoneIntl}`} className="btn mt-4 justify-center">Call {site.phone}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
