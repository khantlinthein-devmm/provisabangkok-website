"use client";

import { useMemo, useState } from "react";
import { useIsClient } from "@/lib/useClient";
import type { Dict } from "@/i18n/dictionaries/en";
import { booking } from "@/lib/site";
import SendButtons from "./SendButtons";

export default function Booking({
  t,
  common,
  dateLocale,
  topics,
}: {
  t: Dict["tools"];
  common: { notSure: string };
  dateLocale: string;
  topics: string[];
}) {
  const b = t.booking;
  // Built in the browser only: the page is pre-rendered, so "today" must come from the visitor's clock.
  const isClient = useIsClient();
  const days = useMemo(() => {
    const out: Date[] = [];
    if (!isClient) return out;
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    for (let i = 1; out.length < booking.daysAhead && i < booking.daysAhead * 2; i++) {
      const next = new Date(d.getTime() + i * 86_400_000);
      if (booking.days.includes(next.getDay())) out.push(next);
    }
    return out;
  }, [isClient]);
  const fmtDay = useMemo(() => new Intl.DateTimeFormat(dateLocale, { day: "numeric" }), [dateLocale]);
  const fmtMonth = useMemo(() => new Intl.DateTimeFormat(dateLocale, { month: "short" }), [dateLocale]);
  const fmtLong = useMemo(() => new Intl.DateTimeFormat(dateLocale, { weekday: "long", day: "numeric", month: "long" }), [dateLocale]);

  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [mode, setMode] = useState<keyof typeof b.modes>("office");
  const [topic, setTopic] = useState(common.notSure);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  const ready = day !== null && time && name.trim() && contact.trim();
  const when = day !== null ? `${fmtLong.format(days[day])}, ${time ?? ""}` : "";
  const message = [
    b.message,
    `${b.when}: ${when}`,
    `${b.meeting}: ${b.modes[mode]}`,
    `${b.topic}: ${topic}`,
    `${b.name}: ${name}`,
    `${b.contact}: ${contact}`,
    notes ? `${b.notes}: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const field = "mt-2 w-full border-0 border-b border-ink/35 bg-transparent py-3 outline-none focus:border-ink";
  const chip = (active: boolean) =>
    `border px-3 py-2 text-sm transition-colors ${active ? "border-gold bg-gold/15 text-ink" : "border-line hover:border-gold"}`;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-7">
        <section>
          <p className="label text-accent">1 · {b.step1}</p>
          <div className="mt-4 grid min-h-48 grid-cols-4 gap-2 sm:grid-cols-6">
            {days.map((d, i) => (
              <button key={d.toISOString()} type="button" onClick={() => setDay(i)} className={`${chip(day === i)} flex flex-col items-center py-3`}>
                <span className="text-xs text-muted">{b.weekdaysShort[d.getDay()]}</span>
                <span className="font-serif text-2xl lining-nums">{fmtDay.format(d)}</span>
                <span className="text-xs text-muted">{fmtMonth.format(d)}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="label text-accent">2 · {b.step2}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {booking.times.map((tm) => (
              <button key={tm} type="button" onClick={() => setTime(tm)} className={`${chip(time === tm)} tabular-nums`}>
                {tm}
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="label text-accent">3 · {b.step3}</p>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-ink/80">{b.mode}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(b.modes) as (keyof typeof b.modes)[]).map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)} className={chip(mode === m)}>
                  {b.modes[m]}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block text-sm font-medium text-ink/80 sm:col-span-2">
              {b.topic}
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
                <option>{common.notSure}</option>
                {topics.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-ink/80">
              {b.name} *
              <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </label>
            <label className="block text-sm font-medium text-ink/80">
              {b.contact} *
              <input value={contact} onChange={(e) => setContact(e.target.value)} className={field} />
            </label>
            <label className="block text-sm font-medium text-ink/80 sm:col-span-2">
              {b.notes}
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${field} resize-none`} />
            </label>
          </div>
        </section>
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="border border-gold/60 p-6 lg:sticky lg:top-28">
          <p className="label text-accent">{b.summary}</p>
          <dl className="mt-4 divide-y divide-line text-sm">
            {[
              [b.when, when || "—"],
              [b.meeting, b.modes[mode]],
              [b.topic, topic],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <SendButtons message={message} subject={b.title} whatsappLabel={t.sendWhatsapp} emailLabel={t.sendEmail} disabled={!ready} />
          </div>
          <p className="mt-4 text-sm text-muted">{ready ? b.confirmNote : b.pickFirst}</p>
        </div>
      </aside>
    </div>
  );
}
