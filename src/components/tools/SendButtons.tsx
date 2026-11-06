"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { site } from "@/lib/site";

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
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-disabled={disabled} className={`btn ${off}`}>
          {whatsappLabel}
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
