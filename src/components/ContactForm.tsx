"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

// No backend yet: the form opens the visitor's email app with the message pre-filled.
export default function ContactForm({
  dark = false,
  form,
  visaTitles,
}: {
  dark?: boolean;
  form: Dict["contact"]["form"];
  visaTitles: string[];
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `${form.subject}: ${data.get("visa")} (${data.get("name")})`;
    const body = [
      `${form.name}: ${data.get("name")}`,
      `${form.email}: ${data.get("email")}`,
      `${form.phone}: ${data.get("phone")}`,
      `${form.nationality}: ${data.get("nationality")}`,
      `${form.askingAbout}: ${data.get("visa")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const tone = dark
    ? "border-paper/25 text-paper placeholder:text-paper/40 focus:border-gold-light"
    : "border-line text-ink placeholder:text-muted/70 focus:border-ink";
  const field = `w-full border-0 border-b bg-transparent px-0 py-3 outline-none transition-colors ${tone}`;
  const label = `block text-xs ${dark ? "text-paper/50" : "text-muted"}`;

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
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className={dark ? "btn-gold" : "btn"}>{form.send}</button>
        {sent && (
          <p className={`text-sm ${dark ? "text-paper/70" : "text-muted"}`}>
            {form.sent} {site.email}.
          </p>
        )}
      </div>
    </form>
  );
}
