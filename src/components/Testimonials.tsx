import Ornament from "./Ornament";
import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-deep py-20 text-paper md:py-28">
      <div className="wrap">
        <p className="label text-gold-light">What our clients say</p>
        <Ornament className="mt-4 max-w-24" />
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i}>
              <span className="text-metal block font-serif text-6xl leading-none">“</span>
              <blockquote className="mt-2 font-serif text-xl leading-relaxed text-paper/90">{t}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
