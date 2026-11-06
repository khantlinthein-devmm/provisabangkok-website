import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import { localePath, type Locale } from "@/i18n";
import type { LocalVisa } from "@/lib/visas";

const HIGHLIGHT_BADGES: Record<string, Record<Locale, string>> = {
  "retirement-visa": {
    en: "⭐ Most Popular",
    th: "⭐ ยอดนิยมอันดับ 1",
    zh: "⭐ 最受欢迎",
    ru: "⭐ Популярно",
    ko: "⭐ 가장 인기",
  },
  "thailand-privilege-membership": {
    en: "👑 VIP 5–20 Years",
    th: "👑 สิทธิพิเศษ 5–20 ปี",
    zh: "👑 5–20年贵宾尊享",
    ru: "👑 VIP 5–20 лет",
    ko: "👑 VIP 5–20년",
  },
  "dtv-visa": {
    en: "🔥 New 5-Year Nomad",
    th: "🔥 วีซ่ามาแรง 5 ปี",
    zh: "🔥 热门数字游民签",
    ru: "🔥 Хит: виза номада",
    ko: "🔥 핫한 5년 노마드",
  },
  "long-term-resident-visa": {
    en: "✨ 10-Year High Earner",
    th: "✨ สิทธิ์พำนัก 10 ปี",
    zh: "✨ 10年高净值尊享",
    ru: "✨ 10 лет резиденции",
    ko: "✨ 10년 장기 거주",
  },
};

export default function FeaturedVisaCards({
  visas,
  lang,
}: {
  visas: LocalVisa[];
  lang: Locale;
}) {
  const p = (path: string) => localePath(lang, path);

  // Top 4 most requested & high-intent visas
  const featuredSlugs = [
    "retirement-visa",
    "dtv-visa",
    "thailand-privilege-membership",
    "long-term-resident-visa",
  ];

  const featured = featuredSlugs
    .map((slug) => visas.find((v) => v.slug === slug))
    .filter(Boolean) as LocalVisa[];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featured.map((v, i) => {
        const badge = HIGHLIGHT_BADGES[v.slug]?.[lang] || HIGHLIGHT_BADGES[v.slug]?.en;
        return (
          <Link
            key={v.slug}
            href={p(`/${v.slug}/`)}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
          >
            <div>
              {/* Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2">
                {v.image && (
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-deep shadow-md backdrop-blur-sm">
                    {badge}
                  </span>
                )}
                <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white/95">
                  ⏱️ {v.duration}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-accent md:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-gold-dark">
                  🎯 {v.forWhom}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-3">
                  {v.short}
                </p>
              </div>
            </div>

            {/* Card Footer Action */}
            <div className="border-t border-line/60 p-5 pt-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-ink transition-transform group-hover:translate-x-1 group-hover:text-accent">
                <span>{lang === "th" ? "ดูรายละเอียด & ยื่นขอ" : "Explore requirements"}</span>
                <Arrow className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
