"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { visas } from "@/lib/visas";

// No backend yet: the form opens the visitor's email app with the message pre-filled.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Visa enquiry: ${data.get("visa")} — ${data.get("name")}`;
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

  const input =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input name="name" required placeholder="Full name *" className={input} />
      <input name="email" type="email" required placeholder="Email *" className={input} />
      <input name="phone" placeholder="Phone / WhatsApp" className={input} />
      <input name="nationality" placeholder="Nationality" className={input} />
      <select name="visa" className={`${input} sm:col-span-2`} defaultValue="General enquiry">
        <option>General enquiry</option>
        {visas.map((v) => (
          <option key={v.slug}>{v.title}</option>
        ))}
        <option>Other services</option>
      </select>
      <textarea name="message" rows={5} placeholder="How can we help you?" className={`${input} sm:col-span-2`} />
      <button type="submit" className="btn-primary justify-center sm:col-span-2">
        Send Message
      </button>
      {sent && (
        <p className="text-sm text-green-700 sm:col-span-2">
          Your email app should open now. If it doesn’t, email us directly at {site.email}.
        </p>
      )}
    </form>
  );
}
