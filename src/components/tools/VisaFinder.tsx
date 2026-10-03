"use client";

import Link from "next/link";
import { useState } from "react";
import Arrow from "@/components/Arrow";
import { localePath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import SendButtons from "./SendButtons";

type Answers = { purpose?: string; age?: string; length?: string; funds?: string };
const ORDER = ["purpose", "age", "length", "funds"] as const;

/** Suggest up to three visas from the four answers. Deliberately conservative: it is a starting point. */
export function recommend(a: Answers): string[] {
  const over50 = a.age === "over50";
  const high = a.funds === "high";
  const enough = a.funds === "standard" || high;
  const r: string[] = [];
  switch (a.purpose) {
    case "retire":
      if (over50) r.push("retirement-visa");
      if (high) r.push("long-term-resident-visa");
      r.push("thailand-privilege-membership");
      break;
    case "work":
      r.push("business-visa");
      if (high) r.push("long-term-resident-visa");
      r.push("smart-visa");
      break;
    case "remote":
      r.push("dtv-visa");
      if (high) r.push("long-term-resident-visa");
      r.push("thailand-privilege-membership");
      break;
    case "study":
      r.push("education-visa", "muay-thai-education-visa", "dtv-visa");
      break;
    case "marriage":
      r.push("marriage-visa");
      if (over50 && enough) r.push("retirement-visa");
      break;
    case "family":
      r.push("follower-visa");
      break;
    case "lifestyle":
      if (over50) r.push("retirement-visa");
      if (high) r.push("long-term-resident-visa");
      if (!over50) r.push("dtv-visa");
      r.push("thailand-privilege-membership");
      break;
  }
  return [...new Set(r)].slice(0, 3);
}

export default function VisaFinder({
  lang,
  t,
  visas,
}: {
  lang: Locale;
  t: Dict["tools"];
  visas: Record<string, { title: string; short: string }>;
}) {
  const f = t.finder;
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const done = step >= ORDER.length;
  const key = ORDER[Math.min(step, ORDER.length - 1)];
  const question = f.questions[key];
  const results = done ? recommend(answers) : [];

  const choose = (value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const summary = ORDER.map((k) => {
    const q = f.questions[k];
    const v = answers[k] as keyof typeof q.options | undefined;
    return `- ${q.q} ${v ? (q.options as Record<string, string>)[v] : ""}`;
  }).join("\n");
  const message = `${f.messageIntro}\n${summary}\n\n${f.resultTitle}: ${results.map((s) => visas[s]?.title).join(", ")}`;

  if (done) {
    return (
      <div>
        <h2 className="h-display text-4xl md:text-5xl">{f.resultTitle}</h2>
        <p className="mt-3 text-muted">{results.length ? f.resultIntro : f.noMatch}</p>
        <div className="mt-10 grid gap-5">
          {results.map((slug, i) => (
            <div
              key={slug}
              style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
              className={`hero-in border p-6 md:p-8 ${i === 0 ? "border-gold bg-paper" : "border-line"}`}
            >
              {i === 0 && <p className="label text-accent">{f.best}</p>}
              <h3 className="mt-2 font-serif text-3xl">{visas[slug]?.title}</h3>
              <p className="mt-2 text-muted">{visas[slug]?.short}</p>
              <p className="mt-4 flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {f.reasons[slug]}
              </p>
              <Link href={localePath(lang, `/${slug}/`)} className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-accent">
                {f.viewVisa} <Arrow />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-8">
          <p className="mb-4 font-medium">{t.talkToUs}</p>
          <SendButtons message={message} subject={f.title} whatsappLabel={t.sendWhatsapp} emailLabel={t.sendEmail} />
          <button type="button" onClick={() => { setAnswers({}); setStep(0); }} className="link mt-6 text-sm">
            {f.restart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {f.progress} {step + 1} {f.of} {ORDER.length}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="hover:text-accent">
            ← {f.back}
          </button>
        )}
      </div>
      <div className="mt-3 h-px bg-line">
        <div className="h-px bg-gold transition-all duration-500" style={{ width: `${((step + 1) / ORDER.length) * 100}%` }} />
      </div>
      <h2 key={key} className="hero-in h-display mt-10 text-4xl leading-tight md:text-5xl">{question.q}</h2>
      <div key={`${key}-opts`} className="mt-8 grid gap-3 sm:grid-cols-2">
        {Object.entries(question.options).map(([value, label], i) => (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
            className={`hero-in group flex items-center justify-between gap-4 border px-5 py-4 text-left transition-colors hover:border-gold hover:bg-paper-2 ${
              answers[key] === value ? "border-gold bg-paper-2" : "border-line"
            }`}
          >
            <span>{label}</span>
            <Arrow className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
