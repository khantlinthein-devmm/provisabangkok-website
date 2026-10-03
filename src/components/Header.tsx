"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = nav.filter((n) => n.href !== "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow duration-500 ${
        scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgba(23,20,15,0.25)]" : "border-line"
      }`}
    >
      <div className={`wrap flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" onClick={() => setOpen(false)} aria-label="Pro Visa Bangkok, home">
          <Logo compact={scrolled} />
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
          <Link href="/contact-us/" className="btn py-2">Book a consultation</Link>
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
                className="border-b border-line py-3 font-serif text-3xl last:border-0"
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
