"use client";

import { useEffect, useState } from "react";
import Ornament from "./Ornament";
import type { Dict } from "@/i18n/dictionaries/en";

// One review at a time, changing every 8 seconds. Pauses on hover or keyboard focus.
export default function Testimonials({ t: copy }: { t: Dict["testimonials"] }) {
  const testimonials = copy.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <section
      className="bg-deep py-14 text-paper md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3" data-reveal>
          <p className="label text-gold-light">{copy.title}</p>
          <Ornament className="mt-4 max-w-24" />
        </div>
        <div className="lg:col-span-9" data-reveal>
          <div className="grid" aria-live="polite">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className={`col-start-1 row-start-1 transition-all duration-700 ${
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <span className="text-metal block font-serif text-7xl leading-none">“</span>
                <blockquote className="mt-2 font-serif text-xl leading-relaxed text-paper/90 md:text-3xl">{t}</blockquote>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2">
            <button type="button" onClick={() => go(-1)} aria-label={copy.prev} className="grid h-11 w-11 place-items-center text-lg text-gold-light hover:text-paper">
              ←
            </button>
            <div className="flex">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${copy.show} ${i + 1}`}
                  className="group grid h-11 place-items-center px-1.5"
                >
                  <span
                    className={`block h-0.5 transition-all duration-500 ${
                      i === index ? "w-10 bg-gold-light" : "w-5 bg-paper/30 group-hover:bg-paper/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label={copy.next} className="grid h-11 w-11 place-items-center text-lg text-gold-light hover:text-paper">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
