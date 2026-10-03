import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/logo.png";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

export default function Footer() {
  return (
    <footer className="bg-deep text-paper/80">
      <hr className="rule-gold" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src={logo} alt="Pro Visa Bangkok" className="h-auto w-40" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
        </div>
        <div className="md:col-span-4 md:col-start-6">
          <p className="label text-gold-light">Visas</p>
          <ul className="mt-4 space-y-2 text-sm">
            {visas.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}/`} className="hover:text-gold-light">{v.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label text-gold-light">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`tel:${site.phoneIntl}`} className="hover:text-gold-light">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">{site.email}</a></li>
            <li><a href={site.line} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">LINE</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">WhatsApp</a></li>
            <li><a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">Facebook</a></li>
            <li><Link href="/about/" className="hover:text-gold-light">About us</Link></li>
            <li><Link href="/customer/" className="hover:text-gold-light">Customers</Link></li>
            <li><Link href="/blog/" className="hover:text-gold-light">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col justify-between gap-2 border-t border-paper/10 py-6 text-xs text-paper/50 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>
          Requirements change often. Always confirm with us before you apply. ·{" "}
          <Link href="/privacy-policy-2/" className="hover:text-gold-light">Privacy policy</Link>
        </span>
      </div>
    </footer>
  );
}
