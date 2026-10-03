import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-3">Page not found</h1>
      <p className="mt-4 text-gray-600">The page you are looking for doesn’t exist.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
