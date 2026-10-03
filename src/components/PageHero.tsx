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
    <section className="hero-bg text-white">
      <div className="container-x py-16 md:py-20">
        <nav className="mb-4 text-sm text-white/70">
          <Link href="/" className="hover:text-gold">Home</Link>
          {crumb && (
            <>
              {" / "}
              <Link href={crumb.href} className="hover:text-gold">{crumb.label}</Link>
            </>
          )}
          {" / "}
          <span className="text-white">{title}</span>
        </nav>
        <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>}
      </div>
    </section>
  );
}
