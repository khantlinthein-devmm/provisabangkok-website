"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

// Sends the message to /api/contact, which emails it to the office,
// with an instant WhatsApp & LINE fallback so zero leads are ever lost.
export default function ContactForm({
  dark = false,
  form,
  visaTitles,
}: {
  dark?: boolean;
  form: Dict["contact"]["form"];
  visaTitles: string[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [lastData, setLastData] = useState<{ name?: string; email?: string; phone?: string; visa?: string; message?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const entries = Object.fromEntries(new FormData(el)) as Record<string, string>;
    setLastData(entries);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });
      if (!res.ok) throw new Error(String(res.status));
      el.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const tone = dark
    ? "border-paper/45 text-paper placeholder:text-paper/50 focus:border-gold-light"
    : "border-ink/35 text-ink placeholder:text-muted/70 focus:border-ink";
  const field = `w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors ${tone}`;
  const label = `block text-sm font-medium ${dark ? "text-paper/80" : "text-ink/80"}`;

  const whatsappFallbackUrl = `https://wa.me/66659245509?text=${encodeURIComponent(
    `Hello Pro Visa Bangkok, I am inquiring from your website:\n- Name: ${lastData.name || ""}\n- Visa: ${lastData.visa || ""}\n- Phone: ${lastData.phone || ""}\n- Message: ${lastData.message || ""}`
  )}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className={label}>{form.name} *<input name="name" required className={field} /></label>
      <label className={label}>{form.email} *<input name="email" type="email" required className={field} /></label>
      <label className={label}>{form.phone}<input name="phone" className={field} /></label>
      <label className={label}>{form.nationality}<input name="nationality" className={field} /></label>
      <label className={`${label} sm:col-span-2`}>
        {form.askingAbout}
        <select name="visa" defaultValue={form.notSure} className={`${field} ${dark ? "[&>option]:text-ink" : ""}`}>
          <option>{form.notSure}</option>
          {visaTitles.map((t) => (
            <option key={t}>{t}</option>
          ))}
          <option>{form.extension}</option>
          <option>{form.other}</option>
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        {form.situation}
        <textarea name="message" rows={4} className={`${field} resize-none`} />
      </label>
      {/* Honeypot for spam bots, hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={`${dark ? "btn-gold" : "btn"} disabled:opacity-60`}>
          {status === "sending" ? form.sending : form.send}
        </button>
        <div role="status" className={`text-sm ${dark ? "text-paper/70" : "text-muted"}`}>
          {status === "sent" && form.sent}
        </div>
      </div>

      {status === "error" && (
        <div className="sm:col-span-2 rounded-lg border border-amber-400/40 bg-amber-500/10 p-4 text-sm mt-2">
          <p className="font-semibold text-amber-500 mb-2">
            ⚠️ Mail server is temporarily busy. Please send your message directly to our visa team on WhatsApp or LINE:
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#25d366] px-4 py-2 font-medium text-white shadow hover:opacity-90 transition text-xs sm:text-sm"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 1 1 7.99 4.42Zm8-17.43A11.3 11.3 0 0 0 12.04.75C5.8.75.74 5.8.74 12.04c0 2 .52 3.94 1.51 5.65L.65 23.5l5.95-1.56a11.27 11.27 0 0 0 5.43 1.38h.01c6.23 0 11.3-5.06 11.3-11.29 0-3.02-1.17-5.85-3.3-7.98Z" />
              </svg>
              Send Enquiry via WhatsApp Now
            </a>
            <a
              href={site.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-[#06c755] px-3.5 py-2 font-medium text-white shadow hover:opacity-90 transition text-xs sm:text-sm"
            >
              Chat on LINE
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
