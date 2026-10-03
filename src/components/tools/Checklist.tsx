"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { Dict } from "@/i18n/dictionaries/en";
import { useIsClient } from "@/lib/useClient";

// Ticks are kept in localStorage (per visa), with an in-memory fallback when storage is blocked.
const memory = new Map<string, string>();
const listeners = new Set<() => void>();
const storageKey = (slug: string) => `pvb-checklist:${slug}`;

function readRaw(slug: string) {
  try {
    return localStorage.getItem(storageKey(slug)) ?? "[]";
  } catch {
    return memory.get(slug) ?? "[]";
  }
}
function writeRaw(slug: string, value: number[]) {
  const raw = JSON.stringify(value);
  try {
    if (value.length) localStorage.setItem(storageKey(slug), raw);
    else localStorage.removeItem(storageKey(slug));
  } catch {
    memory.set(slug, raw);
  }
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export default function Checklist({ t, visas }: { t: Dict["tools"]["checklist"]; visas: { slug: string; title: string }[] }) {
  const isClient = useIsClient();
  const [picked, setPicked] = useState<string | null>(null);

  // Visa pages link here with ?visa=<slug>.
  const fromUrl = isClient ? new URLSearchParams(window.location.search).get("visa") : null;
  const slug = picked ?? (fromUrl && visas.some((v) => v.slug === fromUrl) ? fromUrl : visas[0].slug);

  const raw = useSyncExternalStore(subscribe, () => readRaw(slug), () => "[]");
  const done = useMemo<number[]>(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);

  const items = t.items[slug] ?? [];
  const title = visas.find((v) => v.slug === slug)?.title ?? "";
  const toggle = (i: number) => writeRaw(slug, done.includes(i) ? done.filter((x) => x !== i) : [...done, i]);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="no-print lg:col-span-4">
        <p className="label text-accent">{t.choose}</p>
        <ul className="mt-4 border-t border-line">
          {visas.map((v) => (
            <li key={v.slug}>
              <button
                type="button"
                onClick={() => setPicked(v.slug)}
                className={`flex w-full items-center justify-between border-b border-line py-3 text-left transition-colors hover:text-accent ${
                  v.slug === slug ? "font-medium text-accent" : ""
                }`}
              >
                {v.title}
                {v.slug === slug && <span className="h-1.5 w-1.5 rotate-45 bg-gold" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="print-area lg:col-span-7 lg:col-start-6">
        <p className="label">{t.title}</p>
        <h2 className="h-display mt-2 text-4xl">{title}</h2>
        <div className="no-print mt-5 flex items-center gap-4 text-sm text-muted">
          <div className="h-1 flex-1 bg-line">
            <div className="h-1 bg-gold transition-all duration-500" style={{ width: `${items.length ? (done.length / items.length) * 100 : 0}%` }} />
          </div>
          <span className="tabular-nums">
            {done.length}/{items.length} {t.progress}
          </span>
        </div>
        <ul className="mt-6 border-t border-ink">
          {items.map((item, i) => (
            <li key={item} className="border-b border-line">
              <label className="flex cursor-pointer items-start gap-4 py-4">
                <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-gold text-xs text-paper transition-colors peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/40"
                >
                  {done.includes(i) ? "✓" : ""}
                </span>
                <span className={done.includes(i) ? "text-muted line-through decoration-gold/60" : ""}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="no-print mt-8 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => window.print()} className="btn">{t.print}</button>
          <button type="button" onClick={() => writeRaw(slug, [])} className="link text-sm">{t.reset}</button>
        </div>
        <p className="no-print mt-4 text-xs text-muted">{t.note}</p>
      </div>
    </div>
  );
}
