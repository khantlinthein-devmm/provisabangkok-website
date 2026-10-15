"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

// Sends the message to /api/contact, which emails it to the office.
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(el))),
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
        <p role="status" className={`text-sm ${dark ? "text-paper/70" : "text-muted"}`}>
          {status === "sent" && form.sent}
          {status === "error" && (
            <>
              {form.error}{" "}
              <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
