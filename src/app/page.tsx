import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import VisaCard from "@/components/VisaCard";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";
import { posts } from "@/lib/posts";

const whyUs = [
  { icon: "shield" as const, title: "Registered Agent", text: "Official registered agent for the Thailand Privilege Card." },
  { icon: "star" as const, title: "Expert Guidance", text: "Experienced consultants who know Thai immigration rules inside out." },
  { icon: "doc" as const, title: "Simplified Process", text: "We prepare your documents and deal with the paperwork for you." },
  { icon: "family" as const, title: "Personalised Support", text: "Advice tailored to your situation — before, during and after your visa." },
];

const steps = [
  { title: "Free Consultation", text: "Tell us your goals and we recommend the best visa option." },
  { title: "Document Preparation", text: "We give you a clear checklist and prepare your application." },
  { title: "Submission", text: "We submit and follow up with the authorities on your behalf." },
  { title: "Visa Approved", text: "Enjoy your stay — we remind you about renewals and 90-day reports." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg text-white">
        <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Trusted Visa Consultant in Thailand</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Your Thai Visa, <span className="text-gold">Made Simple.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              We specialise in Long Term Resident (LTR) visas, retirement visas, Thailand Privilege Membership and
              other commonly sought-after visas — with expert guidance and personalised support every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact/" className="btn-primary">
                Free Consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/visas/" className="btn-outline">Explore Visas</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-2 hover:text-gold">
                <Icon name="phone" className="h-5 w-5 text-gold" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
                <Icon name="mail" className="h-5 w-5 text-gold" /> {site.email}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-lg font-semibold">Popular visas</p>
            <ul className="mt-6 space-y-3">
              {visas.slice(0, 5).map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/${v.slug}/`}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4 transition hover:bg-white/15"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={v.icon} className="h-5 w-5 text-gold" />
                      {v.title}
                    </span>
                    <span className="text-xs text-white/60">{v.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why choose us</p>
            <h2 className="section-title mt-3">Straightforward, simplified visa assistance</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-7 text-center shadow-sm">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon name={w.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visas */}
      <section className="py-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our visa services</p>
              <h2 className="section-title mt-3">Find the right visa for you</h2>
            </div>
            <Link href="/visas/" className="btn-outline-dark">View all visas</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visas.slice(0, 6).map((v) => (
              <VisaCard key={v.slug} visa={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-20 text-white">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Four simple steps</h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="text-4xl font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Additional services */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">More than visas</p>
            <h2 className="section-title mt-3">Additional services</h2>
            <p className="mt-4 text-gray-600">
              Settling in Thailand involves more than a visa. We help you with everything else you need to live, work
              and do business here.
            </p>
            <Link href="/services/" className="btn-dark mt-8">All services</Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm font-medium text-navy">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-gray-50 py-20">
        <div className="container-x">
          <p className="eyebrow">Latest articles</p>
          <h2 className="section-title mt-3">Visa guides &amp; news</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}/`}
                className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{p.category}</p>
                <h3 className="mt-3 text-lg font-semibold text-navy group-hover:text-gold">{p.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="eyebrow">Get in touch</p>
            <h2 className="section-title mt-3">Book your free consultation</h2>
            <p className="mt-4 text-gray-600">
              Send us a message and our team will get back to you as soon as possible.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-gray-700">
              <li className="flex gap-3"><Icon name="pin" className="h-5 w-5 text-gold" />{site.address.line1}, {site.address.line2}</li>
              <li className="flex gap-3"><Icon name="phone" className="h-5 w-5 text-gold" />{site.phone}</li>
              <li className="flex gap-3"><Icon name="mail" className="h-5 w-5 text-gold" />{site.email}</li>
              <li className="flex gap-3"><Icon name="clock" className="h-5 w-5 text-gold" />{site.hours}</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gray-50 p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
