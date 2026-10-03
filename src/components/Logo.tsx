import Image from "next/image";
import mark from "../../public/brand/mark.png";

// Horizontal lockup for the header: the PV monogram plus the wordmark set like the logo.
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image src={mark} alt="" priority className="h-11 w-auto" />
      <span className="flex flex-col items-center leading-none">
        <span className={`font-brand text-[1.35rem] tracking-[0.04em] ${dark ? "text-gold-light" : "text-ink"}`}>
          PRO VISA
        </span>
        <span className={`mt-1 text-[0.6rem] font-medium tracking-[0.42em] ${dark ? "text-paper/70" : "text-accent"}`}>
          BANGKOK
        </span>
      </span>
    </span>
  );
}
