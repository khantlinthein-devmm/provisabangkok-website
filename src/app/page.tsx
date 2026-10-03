import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import Image from "next/image";
import Ornament from "@/components/Ornament";
import mark from "../../public/brand/mark.png";
import { posts } from "@/lib/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { visaFacts, visas } from "@/lib/visas";

const process = [
  {
    title: "We talk first",
    text: "Tell us your age, nationality, income and how long you want to stay. We’ll tell you honestly which visas you qualify for, and which ones aren’t worth the money.",
  },
  {
    title: "You get one checklist",
    text: "A single list of exactly what we need from you. We handle translations, forms, copies and photos, and we check everything before it is submitted.",
  },
  {
    title: "We go to Immigration with you",
    text: "Or for you, where the rules allow it. We know the offices, the queues and what the officers will ask.",
  },
  {
    title: "We remind you what’s next",
    text: "90-day reports, annual extensions, re-entry permits. We keep track of the dates so you don’t have to.",
  },
];

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function Home() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-line">
        <div className="wrap grid gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-8">
            <p className="label">Visa agency · On Nut, Bangkok</p>
            <h1 className="h-display mt-6 text-[3.25rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              Thai visas, sorted <em className="text-metal pr-1">properly</em>, by people who do this every day.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Retirement, LTR, Thailand Privilege, education and family visas. We prepare the paperwork, deal with
              Immigration, and keep track of your renewals and 90-day reports.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact/" className="btn">
                Book a free consultation <Arrow />
              </Link>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                WhatsApp us
              </a>
            </div>
          </div>

          {/* Fact sheet */}
          <aside className="self-end lg:col-span-4">
            <div className="relative overflow-hidden border border-gold/60 bg-paper p-7 shadow-[0_1px_0_#e3d9c4,0_20px_40px_-24px_rgba(23,20,15,0.25)]">
              <Image src={mark} alt="" className="pointer-events-none absolute -bottom-10 -right-8 w-44 opacity-[0.12]" />
              <p className="label text-accent">At a glance</p>
              <Ornament className="mt-4" />
              <dl className="relative mt-3 divide-y divide-line text-sm">
                {[
                  ["Office", `${site.address.line1}, Suan Luang`],
                  ["Hours", site.hours],
                  ["Phone", site.phone],
                  ["Status", "Registered Thailand Privilege agent"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Visa index */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display max-w-xl text-4xl leading-tight md:text-5xl">Which visa fits you?</h2>
            <Link href="/visas/" className="link text-sm">All visas</Link>
          </div>

          <div className="mt-12 border-t border-ink">
            <div className="hidden grid-cols-12 gap-6 border-b border-line py-3 text-xs text-muted md:grid">
              <span className="col-span-1">No.</span>
              <span className="col-span-4">Visa</span>
              <span className="col-span-4">Best for</span>
              <span className="col-span-2">Length</span>
            </div>
            {visas.map((v, i) => (
              <Link
                key={v.slug}
                href={`/${v.slug}/`}
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-colors hover:bg-paper-2 md:px-2"
              >
                <span className="col-span-2 text-sm tabular-nums text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 font-serif text-2xl group-hover:text-accent md:col-span-4 md:text-3xl">{v.title}</span>
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-4 md:col-start-auto md:text-base md:text-ink">
                  {visaFacts[v.slug]?.forWhom}
                </span>
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-2 md:col-start-auto">{v.duration}</span>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-line bg-paper-2/60 py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="h-display text-4xl leading-tight md:text-5xl">How it works with us</h2>
              <p className="mt-5 text-muted">
                Four steps from the first conversation to your approved visa, and beyond.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {process.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[3rem_1fr] border-t border-line py-8 first:border-t-0 first:pt-0">
                <span className="font-serif text-3xl italic text-gold">{i + 1}.</span>
                <div>
                  <h3 className="text-xl font-medium">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other services + retirement teaser */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="h-display text-4xl leading-tight">Beyond the visa</h2>
            <p className="mt-4 max-w-md text-muted">The other things you’ll need once you’re living here.</p>
            <ul className="mt-8 border-t border-line">
              {services.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span>{s.title}</span>
                  <span className="hidden text-right text-sm text-muted sm:block">{s.short}</span>
                </li>
              ))}
            </ul>
            <Link href="/services/" className="link mt-6 inline-block text-sm">More about our services</Link>
          </div>

          <div className="self-start bg-deep p-8 text-paper md:p-10">
            <p className="label text-gold-light">The question we hear most</p>
            <Ornament className="mt-4 max-w-24" />
            <h2 className="h-display mt-4 text-4xl leading-tight">
              “O, O-A or O-X: which retirement visa should I get?”
            </h2>
            <p className="mt-5 text-paper/70">
              They look similar, but they differ on where you apply, health insurance, how much money you need and how
              long you can stay. We put them side by side.
            </p>
            <Link
              href="/o-retirement-visas-features-comparison-chart/"
              className="mt-8 inline-flex items-center gap-3 border-b border-gold-light/50 pb-1 text-sm text-gold-light hover:border-gold-light"
            >
              See the comparison <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-4xl leading-tight md:text-5xl">From the blog</h2>
            <Link href="/blog/" className="link text-sm">All articles</Link>
          </div>
          <div className="mt-12 grid gap-10 border-t border-ink pt-8 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="group">
                <p className="text-xs text-muted">
                  {p.category} · {fmt(p.date)}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug group-hover:text-accent">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
