import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import ContactBlock from "@/components/ContactBlock";
import Ornament from "@/components/Ornament";
import Testimonials from "@/components/Testimonials";
import { formatDate, getAllPosts } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { customerPhotos } from "@/lib/testimonials";
import { visas } from "@/lib/visas";

const steps = [
  {
    title: "Fill out the form",
    text: "Tell us your nationality, the visa you need (for example education or business) and the purpose of your stay.",
  },
  {
    title: "Expert guidance and recommendations",
    text: "We don’t just tell you which visa you need, we explain everything: eligibility, the documents required and the expected processing time.",
  },
  {
    title: "Submit your documents",
    text: "Take the guesswork out of gathering paperwork. You get a checklist specific to your visa, so nothing is missing.",
  },
  {
    title: "Visa success and delivery",
    text: "As soon as your visa is approved, we let you know straight away.",
  },
];

const values = ["Expert guidance", "Personalised assistance", "Transparent communication", "Comprehensive support"];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Intro */}
      <section className="border-b border-line">
        <div className="wrap grid gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:items-center lg:pb-20">
          <div className="lg:col-span-7">
            <p className="label">Welcome to Pro Visa Bangkok</p>
            <h1 className="h-display mt-6 text-[3.25rem] leading-[0.98] sm:text-7xl lg:text-[5.25rem]">
              Your <em className="text-metal pr-1">trusted</em> visa consultant in Thailand.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Straightforward, simplified visa assistance from an experienced team. Registered agents for the Thailand
              Privilege Card, specialising in LTR, retirement and other long-stay visas.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact-us/" className="btn">
                Book a free consultation <Arrow />
              </Link>
              <a href={site.line} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Chat on LINE
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
              {site.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="label normal-case tracking-normal">{s.label}</dt>
                  <dd className="text-metal order-first font-serif text-4xl lining-nums md:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative lg:col-span-5">
            <div className="relative ml-auto aspect-[4/5] max-w-md overflow-hidden border border-gold/60 p-2">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/customers/customer-13.jpg"
                  alt="The Pro Visa Bangkok team with a client"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-right text-xs text-muted">With one of our clients in Bangkok</figcaption>
          </figure>
        </div>
      </section>

      {/* Visa index */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-accent">Our services</p>
              <h2 className="h-display mt-3 max-w-xl text-4xl leading-tight md:text-5xl">Choose the visa you need</h2>
            </div>
            <Link href="/service/" className="link text-sm">All visas</Link>
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
                <span className="col-span-10 col-start-3 text-sm text-muted md:col-span-4 md:col-start-auto md:text-base md:text-ink">{v.forWhom}</span>
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
              <p className="label text-accent">How we work</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">Our simplified visa process</h2>
              <p className="mt-5 text-muted">
                Navigating the Thai visa process can be confusing. That’s why we’re here to take the stress out of it.
              </p>
              <ul className="mt-8 space-y-2 text-sm">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map((p, i) => (
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

      {/* Clients */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-accent">Our customers</p>
              <h2 className="h-display mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
                Visa in hand, with people from all over the world
              </h2>
            </div>
            <Link href="/customer/" className="link text-sm">See all customers</Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {customerPhotos.slice(1, 9).map((src, i) => (
              <div key={src} className={`relative aspect-[4/5] overflow-hidden ${i > 3 ? "hidden md:block" : ""}`}>
                <Image src={src} alt="Pro Visa Bangkok with a client" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Other services + retirement comparison */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <p className="label text-accent">More than visas</p>
            <h2 className="h-display mt-3 text-4xl leading-tight">We go beyond just visa processing</h2>
            <ul className="mt-8 border-t border-line">
              {services.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span>{s.title}</span>
                  <span className="hidden text-right text-sm text-muted sm:block">{s.short}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start bg-deep p-8 text-paper md:p-10">
            <p className="label text-gold-light">Retirement visas compared</p>
            <Ornament className="mt-4 max-w-24" />
            <h2 className="h-display mt-6 text-4xl leading-tight">“O, O-A or O-X: which retirement visa is right for me?”</h2>
            <p className="mt-5 text-paper/70">
              Age, funds, health insurance, where to apply and how long you can stay: all three visas side by side.
            </p>
            <Link
              href="/o-retirement-visas-features-comparison-chart/"
              className="mt-8 inline-flex items-center gap-3 border-b border-gold-light/50 pb-1 text-sm text-gold-light hover:border-gold-light"
            >
              See the comparison chart <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-accent">Latest news</p>
              <h2 className="h-display mt-3 text-4xl leading-tight md:text-5xl">Guides and updates</h2>
            </div>
            <Link href="/blog/" className="link text-sm">All articles</Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="group">
                {p.image && (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <p className="mt-5 text-xs text-muted">{formatDate(p.date)}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug group-hover:text-accent">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
