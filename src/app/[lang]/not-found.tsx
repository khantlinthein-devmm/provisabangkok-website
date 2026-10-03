import Link from "next/link";

// Shown for unknown URLs. Kept language-neutral because the language may be unknown here.
export default function NotFound() {
  return (
    <section className="wrap py-32">
      <p className="label">404</p>
      <h1 className="h-display mt-4 text-6xl">This page doesn’t exist.</h1>
      <Link href="/" className="link mt-8 inline-block">Back to the home page</Link>
    </section>
  );
}
