"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeInfo, localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";
import Logo from "./Logo";

export default function Header({ lang, nav }: { lang: Locale; nav: Dict["nav"] }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const basePath = stripLocale(usePathname() || "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const links = [
    { label: nav.visas, path: "/service/" },
    { label: nav.tools, path: "/tools/" },
    { label: nav.about, path: "/about/" },
    { label: nav.customers, path: "/customer/" },
    { label: nav.blog, path: "/blog/" },
    { label: nav.contact, path: "/contact-us/" },
  ];
  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow duration-500 ${
        scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgba(23,20,15,0.25)]" : "border-line"
      }`}
    >
      <div className={`wrap flex items-center justify-between gap-4 transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href={localePath(lang, "/")} onClick={close} aria-label="Pro Visa Bangkok">
          <Logo compact={scrolled} />
        </Link>

        <nav className="hidden items-center gap-6 text-sm xl:flex">
          {links.map((item) => (
            <Link
              key={item.path}
              href={localePath(lang, item.path)}
              className={basePath.startsWith(item.path) ? "text-accent" : "text-ink hover:text-accent"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-label={nav.language}
              className="flex min-h-10 items-center gap-1.5 rounded-sm border border-line px-3 text-xs font-medium tracking-wide hover:border-gold"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M1.5 8h13M8 1.5c1.8 1.8 2.6 4 2.6 6.5S9.8 12.7 8 14.5M8 1.5C6.2 3.3 5.4 5.5 5.4 8s.8 4.7 2.6 6.5" />
              </svg>
              {localeInfo[lang].short}
            </button>
            {langOpen && (
              <ul className="absolute right-0 top-full z-50 mt-2 min-w-36 border border-line bg-paper py-1 shadow-lg">
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={localePath(l, basePath)}
                      hrefLang={localeInfo[l].htmlLang}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-3 text-sm hover:bg-paper-2 ${l === lang ? "text-accent" : ""}`}
                    >
                      {localeInfo[l].label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href={localePath(lang, "/book-consultation/")} className="btn hidden py-2 md:inline-flex">
            {nav.book}
          </Link>
          <button type="button" className="-mr-3 min-h-11 px-3 text-sm font-medium xl:hidden" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line xl:hidden">
          <div className="wrap flex flex-col py-4">
            {links.map((item) => (
              <Link
                key={item.path}
                href={localePath(lang, item.path)}
                onClick={close}
                className="border-b border-line py-3 font-serif text-3xl last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link href={localePath(lang, "/book-consultation/")} onClick={close} className="btn mt-4 justify-center">
              {nav.book}
            </Link>
            <a href={`tel:${site.phoneIntl}`} className="btn-ghost mt-3 justify-center">
              {nav.call} {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
