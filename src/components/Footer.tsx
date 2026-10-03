import Link from "next/link";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl tracking-tight">
            Pro Visa <em className="text-accent">Bangkok</em>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted">
            {site.address.line1}, {site.address.line2}.<br />
            {site.hours}.
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="label">Visas</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {visas.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}/`} className="hover:text-accent">{v.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label">Contact</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href={`tel:${site.phoneIntl}`} className="hover:text-accent">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-accent">{site.email}</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent">WhatsApp</a></li>
            <li><Link href="/blog/" className="hover:text-accent">Blog</Link></li>
            <li><Link href="/about/" className="hover:text-accent">About us</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Requirements change often. Always confirm with us before you apply.</span>
      </div>
    </footer>
  );
}
