import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the same URL style as the original WordPress site (e.g. /retirement-visa/)
  trailingSlash: true,
  async redirects() {
    // Old WordPress pages, plus URLs used by earlier drafts of this site.
    return [
      { source: "/blog-2", destination: "/blog/", permanent: true },
      { source: "/category/blog", destination: "/blog/", permanent: true },
      { source: "/find-your-perfect-visa", destination: "/service/", permanent: true },
      { source: "/visas", destination: "/service/", permanent: true },
      { source: "/services", destination: "/service/", permanent: true },
      { source: "/contact", destination: "/contact-us/", permanent: true },
      { source: "/ltr-visa", destination: "/long-term-resident-visa/", permanent: true },
    ];
  },
};

export default nextConfig;
