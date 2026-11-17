"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";
import { trackEvent } from "../Analytics";

type Sender = { name: string; contact: string };

/**
 * WhatsApp and email buttons that send a pre-written message to the office.
 * The email goes straight to the office through /api/contact. Without a `sender`,
 * the visitor is first asked for their name and email so the office can reply.
 */
export default function SendButtons({
  message,
  kind,
  whatsappLabel,
  emailLabel,
  labels,
  sender,
  disabled = false,
}: {
  message: string;
  kind: "booking" | "finder";
  whatsappLabel: string;
  emailLabel: string;
  labels: Dict["tools"]["email"];
  sender?: Sender;
  disabled?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "asking" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const wa = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const off = disabled ? "pointer-events-none opacity-40" : "";

  async function send(from: Sender) {
    const contact = from.contact.trim();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: from.name,
          ...(contact.includes("@") ? { email: contact } : { phone: contact }),
          message,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field = "mt-2 w-full border-0 border-b border-ink/35 bg-transparent py-3 outline-none focus:border-ink";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
          onClick={() => trackEvent("send_whatsapp", "tool_send", kind)}
          className={`btn ${off}`}
        >
          {whatsappLabel}
        </a>
        <a
          href={site.line}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
          onClick={() => trackEvent("send_line", "tool_send", kind)}
          className={`inline-flex items-center justify-center gap-2 rounded bg-[#06c755] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#05b34c] transition ${off}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.48 3 2 6.63 2 11.1c0 4 3.55 7.36 8.35 8 .33.07.77.22.88.5.1.25.07.65.03.9l-.14.86c-.04.25-.2 1 .87.54 1.08-.45 5.8-3.42 7.92-5.85C21.36 14.43 22 12.84 22 11.1 22 6.63 17.52 3 12 3Zm-3.6 10.5H6.42a.53.53 0 0 1-.53-.52V9.02c0-.29.24-.52.53-.52.28 0 .52.23.52.52v3.43H8.4c.29 0 .52.24.52.53 0 .28-.23.52-.52.52Zm2.05-.52a.53.53 0 0 1-1.05 0V9.02a.53.53 0 0 1 1.05 0v3.96Zm4.77 0a.52.52 0 0 1-.95.31l-2.03-2.76v2.45a.53.53 0 0 1-1.05 0V9.02a.52.52 0 0 1 .95-.31l2.03 2.76V9.02a.53.53 0 0 1 1.05 0v3.96Zm3.2-2.5c.29 0 .52.24.52.53 0 .28-.23.52-.52.52H17v.93h1.42c.29 0 .52.24.52.53 0 .28-.23.52-.52.52h-1.95a.53.53 0 0 1-.52-.52V9.02c0-.29.23-.52.52-.52h1.95c.29 0 .52.23.52.52 0 .29-.23.53-.52.53H17v.93h1.42Z" />
          </svg>
          LINE
        </a>
        {status !== "asking" && status !== "sent" && (
          <button
            type="button"
            disabled={disabled || status === "sending"}
            onClick={() => (sender ? send(sender) : setStatus("asking"))}
            className={`btn-ghost ${off} disabled:opacity-60`}
          >
            {status === "sending" ? labels.sending : emailLabel}
          </button>
        )}
      </div>

      {status === "asking" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send({ name, contact: email });
          }}
          className="mt-6 grid gap-6 sm:grid-cols-2"
        >
          <label className="block text-sm font-medium text-ink/80">
            {labels.name} *
            <input value={name} onChange={(e) => setName(e.target.value)} required className={field} />
          </label>
          <label className="block text-sm font-medium text-ink/80">
            {labels.email} *
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={field} />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn">{labels.send}</button>
          </div>
        </form>
      )}

      <div role="status" className="mt-4 text-sm text-muted">
        {status === "sent" && labels.sent}
        {status === "error" && (
          <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 mt-2">
            <p className="text-amber-700 font-medium mb-2">
              {labels.error} You can send your booking directly via WhatsApp:
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-[#25d366] px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:opacity-90 transition"
            >
              Send on WhatsApp Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
