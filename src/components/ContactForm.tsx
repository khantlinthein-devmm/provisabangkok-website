"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

// No backend yet: the form opens the visitor's email app with the message pre-filled.
export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Visa enquiry: ${data.get("visa")} (${data.get("name")})`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Nationality: ${data.get("nationality")}`,
      `Visa of interest: ${data.get("visa")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const tone = dark
    ? "border-paper/25 text-paper placeholder:text-paper/40 focus:border-paper"
    : "border-line text-ink placeholder:text-muted/70 focus:border-ink";
  const field = `w-full border-0 border-b bg-transparent px-0 py-3 outline-none transition-colors ${tone}`;
  const label = `block text-xs ${dark ? "text-paper/50" : "text-muted"}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className={label}>Name *<input name="name" required className={field} /></label>
      <label className={label}>Email *<input name="email" type="email" required className={field} /></label>
      <label className={label}>Phone or WhatsApp<input name="phone" className={field} /></label>
      <label className={label}>Nationality<input name="nationality" className={field} /></label>
      <label className={`${label} sm:col-span-2`}>
        I’m asking about
        <select name="visa" defaultValue="Not sure yet" className={`${field} ${dark ? "[&>option]:text-ink" : ""}`}>
          <option>Not sure yet</option>
          {visas.map((v) => (
            <option key={v.slug}>{v.title}</option>
          ))}
          <option>Extension / 90-day report</option>
          <option>Something else</option>
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Your situation (age, how long you want to stay, current visa)
        <textarea name="message" rows={4} className={`${field} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className={dark ? "btn bg-paper text-ink hover:bg-accent hover:text-paper" : "btn"}
        >
          Send message
        </button>
        {sent && (
          <p className={`text-sm ${dark ? "text-paper/70" : "text-muted"}`}>
            Your email app should open. If not, write to {site.email}.
          </p>
        )}
      </div>
    </form>
  );
}
