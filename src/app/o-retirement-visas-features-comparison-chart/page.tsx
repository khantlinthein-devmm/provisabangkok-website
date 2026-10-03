import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
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
        title="O Retirement Visas Comparison Chart"
        subtitle="Non-Immigrant O vs. O-A vs. O-X — which retirement visa suits you?"
        crumb={{ label: "Retirement Visa", href: "/retirement-visa/" }}
      />
      <section className="py-16">
        <div className="container-x">
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Non-Immigrant O</th>
                  <th className="p-4">Non-Immigrant O-A</th>
                  <th className="p-4">Non-Immigrant O-X</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([f, ...cells]) => (
                  <tr key={f} className="border-t border-gray-100 even:bg-gray-50">
                    <th className="p-4 font-semibold text-navy">{f}</th>
                    {cells.map((c, i) => (
                      <td key={i} className="p-4 text-gray-700">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Exact amounts and conditions are set by Thai Immigration and change from time to time. Contact us for the
            current requirements.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
