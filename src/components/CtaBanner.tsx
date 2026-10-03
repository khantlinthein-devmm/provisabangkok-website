import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="bg-gold">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">Not sure which visa is right for you?</h2>
          <p className="mt-2 text-navy/80">Talk to our visa experts today — the first consultation is free.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact/" className="btn-dark">Contact Us</Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
