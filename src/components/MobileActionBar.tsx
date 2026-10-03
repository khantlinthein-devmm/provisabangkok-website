import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

// Phones only: one bar with the three ways to reach us, always at the bottom of the screen.
export default function MobileActionBar({ lang, bar, label }: { lang: Locale; bar: Dict["bar"]; label: string }) {
  const cell = "flex h-14 flex-1 items-center justify-center gap-2 text-sm font-medium";
  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(23,20,15,0.35)] backdrop-blur md:hidden"
    >
      <Link href={localePath(lang, "/book-consultation/")} className={`${cell} bg-ink text-paper`}>
        {bar.book}
      </Link>
      <a href={site.line} target="_blank" rel="noopener noreferrer" className={`${cell} bg-[#06c755] text-white`}>
        {bar.line}
      </a>
      <a href={`tel:${site.phoneIntl}`} className={`${cell} text-ink`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        {bar.call}
      </a>
    </nav>
  );
}
