"use client";

import { useMemo, useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";

const DAY = 86_400_000;

function parse(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
function ymd(t: number) {
  return new Date(t).toISOString().slice(0, 10).replace(/-/g, "");
}

/** Report dates: the first falls on day 90 of the stay (arrival + 89 days), then every 90 days. */
export function reportDates(arrival: number, count: number) {
  const out: { due: number; from: number; to: number }[] = [];
  let due = arrival + 89 * DAY;
  for (let i = 0; i < count; i++) {
    out.push({ due, from: due - 15 * DAY, to: due + 7 * DAY });
    due += 90 * DAY;
  }
  return out;
}

export default function NinetyDay({ t, dateLocale, helpHref }: { t: Dict["tools"]["report"]; dateLocale: string; helpHref: string }) {
  const [arrival, setArrival] = useState("");
  const [count, setCount] = useState(4);
  const fmt = useMemo(
    () => new Intl.DateTimeFormat(dateLocale, { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
    [dateLocale],
  );
  const short = useMemo(() => new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", timeZone: "UTC" }), [dateLocale]);

  const rows = arrival ? reportDates(parse(arrival), count) : [];
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  function downloadIcs() {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pro Visa Bangkok//90-day report//EN", "CALSCALE:GREGORIAN"];
    rows.forEach((r, i) => {
      lines.push(
        "BEGIN:VEVENT",
        `UID:90day-${ymd(r.due)}-${i}@provisabangkok.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
        `DTSTART;VALUE=DATE:${ymd(r.due)}`,
        `DTEND;VALUE=DATE:${ymd(r.due + DAY)}`,
        `SUMMARY:${t.calendarTitle}`,
        `DESCRIPTION:${t.calendarNote}`,
        "BEGIN:VALARM",
        "TRIGGER:-P14D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${t.calendarTitle}`,
        "END:VALARM",
        "END:VEVENT",
      );
    });
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "90-day-reports.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
          <label className="block text-xs text-muted">
            {t.arrival}
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="mt-2 w-full border-0 border-b border-line bg-transparent py-3 text-lg outline-none focus:border-ink"
            />
          </label>
          <label className="block text-xs text-muted">
            {t.count}
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-2 w-full border-0 border-b border-line bg-transparent py-3 text-lg outline-none focus:border-ink"
            >
              {[4, 8, 12].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>

        {rows.length > 0 && (
          <>
            <ol className="mt-10 border-t border-ink">
              {rows.map((r, i) => {
                const left = Math.round((r.due - today) / DAY);
                const status = today > r.to ? "past" : today >= r.from ? "now" : "future";
                return (
                  <li key={r.due} className={`grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-5 ${status === "past" ? "opacity-50" : ""}`}>
                    <span className="font-serif text-2xl italic text-gold lining-nums">{i + 1}.</span>
                    <div>
                      <p className="label">{t.due}</p>
                      <p className="mt-1 font-serif text-2xl lining-nums">{fmt.format(r.due)}</p>
                      <p className="mt-1 text-sm text-muted">
                        {t.window} {short.format(r.from)} {t.to} {short.format(r.to)}
                      </p>
                    </div>
                    <span className={`text-sm tabular-nums ${status === "now" ? "font-medium text-accent" : "text-muted"}`}>
                      {left === 0 ? t.today : left > 0 ? `${left} ${t.daysLeft}` : today > r.to ? "" : t.overdue}
                    </span>
                  </li>
                );
              })}
            </ol>
            <button type="button" onClick={downloadIcs} className="btn mt-8">
              {t.addCalendar}
            </button>
          </>
        )}
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="border border-gold/60 p-6">
          <p className="label text-accent">{t.howTitle}</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {t.how.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {line}
              </li>
            ))}
          </ul>
          <a href={helpHref} className="btn mt-6 w-full justify-center">{t.helpCta}</a>
        </div>
      </aside>
    </div>
  );
}
