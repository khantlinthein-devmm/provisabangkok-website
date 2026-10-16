import type { Metadata } from "next";
import { keystaticReady } from "@/lib/keystatic";
import KeystaticApp from "./keystatic";

// The blog editor has its own root layout: none of the website's header, footer or fonts.
export const metadata: Metadata = { title: "Blog editor | Pro Visa Bangkok", robots: { index: false } };

export default function Layout() {
  return (
    <html lang="en">
      <body>
        {keystaticReady ? (
          <KeystaticApp />
        ) : (
          <p style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
            The blog editor is not set up yet. Add the Keystatic GitHub App keys to the hosting environment (see README).
          </p>
        )}
      </body>
    </html>
  );
}
