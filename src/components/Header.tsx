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
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-90 transition"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 1 1 7.99 4.42Zm8-17.43A11.3 11.3 0 0 0 12.04.75C5.8.75.74 5.8.74 12.04c0 2 .52 3.94 1.51 5.65L.65 23.5l5.95-1.56a11.27 11.27 0 0 0 5.43 1.38h.01c6.23 0 11.3-5.06 11.3-11.29 0-3.02-1.17-5.85-3.3-7.98Z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a href={`tel:${site.phoneIntl}`} className="btn-ghost mt-3 justify-center">
              {nav.call} {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
