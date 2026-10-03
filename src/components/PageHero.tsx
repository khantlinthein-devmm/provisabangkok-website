import Link from "next/link";

export default function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb?: { label: string; href: string };
}) {
  return (
    <section className="border-b border-line">
      <div className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
        <nav className="label hero-in">
          <Link href="/" className="hover:text-accent">Home</Link>
          {crumb && (
            <>
              <span className="mx-2">/</span>
              <Link href={crumb.href} className="hover:text-accent">{crumb.label}</Link>
            </>
          )}
        </nav>
        <h1 style={{ "--d": "120ms" } as React.CSSProperties} className="hero-in h-display mt-6 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
        <div className="rule-draw mt-8 h-px w-24 bg-gold" data-reveal />
        {subtitle && (
          <p style={{ "--d": "260ms" } as React.CSSProperties} className="hero-in mt-6 max-w-2xl text-lg text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
