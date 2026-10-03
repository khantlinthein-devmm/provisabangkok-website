"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";

type Status = "meets" | "maybe" | "no" | "ageNo";

/** Thai funds rules as described on the visa pages. */
export function checkFunds(age: number | null, deposit: number, monthly: number) {
  const yearly = monthly * 12;
  const tooYoung = age !== null && age < 50;
  const retirement: Status = tooYoung
    ? "ageNo"
    : deposit >= 800_000 || monthly >= 65_000
      ? "meets"
      : deposit + yearly >= 800_000
        ? "maybe"
        : "no";
  const ox: Status = tooYoung ? "ageNo" : deposit >= 3_000_000 || (deposit >= 1_800_000 && yearly >= 1_200_000) ? "meets" : "no";
  const marriage: Status =
    deposit >= 400_000 || monthly >= 40_000 ? "meets" : deposit + yearly >= 400_000 ? "maybe" : "no";
  // Roughly US$80,000 a year: worth asking about the LTR visa.
  const ltrHint = yearly >= 2_700_000;
  return { retirement, ox, marriage, ltrHint };
}

const tone: Record<Status, string> = {
  meets: "border-[#3f7d4e] text-[#2f6a3e]",
  maybe: "border-gold text-accent",
  no: "border-line text-muted",
  ageNo: "border-line text-muted",
};
const icon: Record<Status, string> = { meets: "✓", maybe: "~", no: "✕", ageNo: "✕" };

function toNumber(v: string) {
  const n = Number(v.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function FundsChecker({ t, ltrHref }: { t: Dict["tools"]["funds"]; ltrHref: string }) {
  const [age, setAge] = useState("");
  const [deposit, setDeposit] = useState("");
  const [income, setIncome] = useState("");
  const touched = deposit !== "" || income !== "";
  const r = checkFunds(age ? toNumber(age) : null, toNumber(deposit), toNumber(income));
  const fmt = (v: string) => (v ? Number(toNumber(v)).toLocaleString("en-US") : "");

  const label = (s: Status) => (s === "meets" ? t.meets : s === "maybe" ? t.maybe : s === "ageNo" ? t.ageNo : t.no);
  const rows: [string, string, Status, string?][] = [
    [t.retirement, t.retirementRule, r.retirement, r.retirement === "maybe" ? t.combo : undefined],
    [t.ox, t.oxRule, r.ox],
    [t.marriage, t.marriageRule, r.marriage, r.marriage === "maybe" ? t.combo : undefined],
  ];
  const field = "mt-2 w-full border-0 border-b border-line bg-transparent py-3 text-lg tabular-nums outline-none focus:border-ink";

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-5">
        <label className="block text-xs text-muted">
          {t.age}
          <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 3))} className={field} />
        </label>
        <label className="block text-xs text-muted">
          {t.deposit}
          <input inputMode="numeric" value={fmt(deposit)} onChange={(e) => setDeposit(e.target.value)} placeholder="800,000" className={field} />
        </label>
        <label className="block text-xs text-muted">
          {t.income}
          <input inputMode="numeric" value={fmt(income)} onChange={(e) => setIncome(e.target.value)} placeholder="65,000" className={field} />
        </label>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <p className="label text-accent">{t.resultTitle}</p>
        <ul className="mt-4 space-y-3">
          {rows.map(([name, rule, status, note]) => (
            <li key={name} className={`border-l-2 bg-paper-2/60 p-5 transition-colors ${touched ? tone[status] : "border-line text-muted"}`}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-2xl text-ink">{name}</span>
                {touched && (
                  <span className="shrink-0 text-sm font-medium">
                    {icon[status]} {label(status)}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{rule}</p>
              {touched && note && <p className="mt-2 text-sm">{note}</p>}
            </li>
          ))}
        </ul>
        {r.ltrHint && (
          <a href={ltrHref} className="mt-4 block border border-gold p-4 text-sm hover:bg-paper-2">
            {t.ltrNote} →
          </a>
        )}
      </div>
    </div>
  );
}
