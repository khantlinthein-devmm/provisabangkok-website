import Link from "next/link";
import Arrow from "@/components/Arrow";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { tools } from "@/lib/tools";

export default function ToolCards({ lang, dict, className = "", exclude }: { lang: Locale; dict: Dict; className?: string; exclude?: string }) {
  const list = tools.filter((t) => t.key !== exclude);
  return (
    <div className={`grid gap-px border border-line bg-line sm:grid-cols-2 ${list.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} ${className}`}>
      {list.map((t, i) => {
        const copy = dict.tools[t.key];
        return (
          <Link
            key={t.key}
            href={localePath(lang, t.path)}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-2"
          >
            <span className="text-metal font-serif text-4xl lining-nums">{t.mark}</span>
            <h3 className="mt-6 font-serif text-2xl leading-tight group-hover:text-accent">{copy.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{copy.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              {dict.tools.open} <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
