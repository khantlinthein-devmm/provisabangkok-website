import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/logo.png";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";
import { visaSlugs } from "@/lib/visas";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const p = (path: string) => localePath(lang, path);
  return (
    <footer className="bg-deep text-paper/80">
      <hr className="rule-gold" />
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
        <div className="col-span-2 md:col-span-4">
          <Image src={logo} alt="Pro Visa Bangkok" className="h-auto w-32 md:w-40" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
        </div>
        <div className="md:col-span-4 md:col-start-6">
          <p className="label text-gold-light">{dict.footer.visas}</p>
          <ul className="mt-3 text-sm">
            {visaSlugs.map((slug) => (
              <li key={slug}>
                <Link href={p(`/${slug}/`)} className="inline-block py-1.5 hover:text-gold-light">{dict.visas[slug].title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label text-gold-light">{dict.footer.contact}</p>
          <ul className="mt-3 text-sm">
            <li><a href={`tel:${site.phoneIntl}`} className="inline-block py-1.5 hover:text-gold-light">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all inline-block py-1.5 hover:text-gold-light">{site.email}</a></li>
            <li><a href={site.line} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-gold-light">LINE</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-gold-light">WhatsApp</a></li>
            <li><a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-gold-light">Facebook</a></li>
            <li><Link href={p("/tools/")} className="inline-block py-1.5 hover:text-gold-light">{dict.footer.tools}</Link></li>
            <li><Link href={p("/about/")} className="inline-block py-1.5 hover:text-gold-light">{dict.nav.about}</Link></li>
            <li><Link href={p("/customer/")} className="inline-block py-1.5 hover:text-gold-light">{dict.nav.customers}</Link></li>
            <li><Link href={p("/blog/")} className="inline-block py-1.5 hover:text-gold-light">{dict.nav.blog}</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col justify-between gap-2 border-t border-paper/10 py-6 text-sm text-paper/65 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>
          {dict.footer.disclaimer} ·{" "}
          <Link href={p("/privacy-policy-2/")} className="inline-block py-1.5 hover:text-gold-light">{dict.footer.privacy}</Link>
        </span>
      </div>
    </footer>
  );
}
