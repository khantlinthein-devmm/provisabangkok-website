import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "O Retirement Visas Features Comparison Chart",
  description: "Compare the Thai Non-Immigrant O, O-A and O-X retirement visas side by side.",
};

const rows: [string, string, string, string][] = [
  ["Minimum age", "50", "50", "50"],
  ["Where to apply", "In Thailand or abroad", "Thai embassy / consulate abroad", "Thai embassy / consulate abroad, or in Thailand"],
  ["Length of stay", "1 year (renewable)", "1 year (renewable)", "Up to 10 years (5 + 5)"],
  ["Financial requirement", "Bank deposit, monthly income, or a combination", "Bank deposit, monthly income, or a combination", "Higher deposit / income requirement"],
  ["Health insurance", "Not required", "Required", "Required"],
  ["Criminal record & medical certificate", "Not required", "Required", "Required"],
  ["Eligible nationalities", "All", "All", "Selected nationalities only"],
  ["90-day reporting", "Yes", "Yes", "Yes"],
  ["Work permitted", "No", "No", "No"],
];

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        title="O, O-A or O-X?"
        subtitle="The three Thai retirement visas, side by side."
        crumb={{ label: "Retirement Visa", href: "/retirement-visa/" }}
      />
      <section className="wrap py-16">
        <div className="overflow-x-auto border-t border-ink">
          <table className="w-full min-w-[44rem] text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-1/4 py-5 pr-6 text-sm font-normal text-muted">Feature</th>
                <th className="py-5 pr-6 font-serif text-2xl font-normal">Non-Imm O</th>
                <th className="py-5 pr-6 font-serif text-2xl font-normal">Non-Imm O-A</th>
                <th className="py-5 font-serif text-2xl font-normal">Non-Imm O-X</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([f, ...cells]) => (
                <tr key={f} className="border-b border-line align-top">
                  <th className="py-4 pr-6 text-sm font-normal text-muted">{f}</th>
                  {cells.map((c, i) => (
                    <td key={i} className="py-4 pr-6">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          Exact amounts and conditions are set by Thai Immigration and change from time to time. Contact us for the
          current requirements.
        </p>
      </section>
      <ContactBlock />
    </>
  );
}
