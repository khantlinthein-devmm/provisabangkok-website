import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

// Phones only: fixed bar with WhatsApp, LINE, Call, and Book consultation
export default function MobileActionBar({ lang, bar, label }: { lang: Locale; bar: Dict["bar"]; label: string }) {
  const cell = "flex h-14 flex-1 items-center justify-center gap-1.5 text-xs font-semibold";
  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(23,20,15,0.35)] backdrop-blur md:hidden"
    >
      <Link href={localePath(lang, "/book-consultation/")} className={`${cell} bg-ink text-paper`}>
        {bar.book}
      </Link>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={`${cell} bg-[#25d366] text-white`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 1 1 7.99 4.42Zm8-17.43A11.3 11.3 0 0 0 12.04.75C5.8.75.74 5.8.74 12.04c0 2 .52 3.94 1.51 5.65L.65 23.5l5.95-1.56a11.27 11.27 0 0 0 5.43 1.38h.01c6.23 0 11.3-5.06 11.3-11.29 0-3.02-1.17-5.85-3.3-7.98Z" />
        </svg>
        WhatsApp
      </a>
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
