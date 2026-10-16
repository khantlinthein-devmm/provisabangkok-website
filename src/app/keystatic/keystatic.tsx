"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../keystatic.config";
import { useIsClient } from "@/lib/useClient";

const KeystaticPage = makePage(config);

// Keystatic reads a trailing slash (/keystatic/setup/) as an unknown page and shows "Not found".
// Browsers may still follow old cached slash redirects, and Next.js restores the URL it loaded
// when it mounts, so the slash is dropped after mounting, just before Keystatic reads the URL.
function dropTrailingSlash() {
  const { pathname, search, hash } = window.location;
  if (pathname.length > "/keystatic/".length && pathname.endsWith("/")) {
    window.history.replaceState(window.history.state, "", pathname.replace(/\/+$/, "") + search + hash);
  }
}

export default function Keystatic() {
  const isClient = useIsClient();
  if (!isClient) return null;
  dropTrailingSlash();
  return <KeystaticPage />;
}
