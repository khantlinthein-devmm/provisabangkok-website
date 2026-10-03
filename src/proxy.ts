import { NextResponse, type NextRequest } from "next/server";

// English keeps the original URLs (/retirement-visa/). Other languages live under /th/, /ru/, /zh/, /ko/.
// Internally every page is under app/[lang], so un-prefixed paths are rewritten to /en/...
const PREFIXED = /^\/(th|ru|zh|ko)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PREFIXED.test(pathname)) return NextResponse.next();

  // /en/... is the same page as /... : redirect so there is only one English URL.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, static files and metadata routes.
  matcher: ["/((?!_next|api|images|brand|icon.png|favicon.ico|sitemap.xml|robots.txt|.*\\.[a-zA-Z0-9]+$).*)"],
};
