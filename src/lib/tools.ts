// The free tools, their URLs and dictionary keys.
export const tools = [
  { key: "finder", path: "/find-your-perfect-visa/", mark: "?" },
  { key: "funds", path: "/visa-funds-checker/", mark: "฿" },
  { key: "checklist", path: "/document-checklist/", mark: "✓" },
  { key: "report", path: "/90-day-report-calculator/", mark: "90" },
  { key: "booking", path: "/book-consultation/", mark: "◷" },
] as const;

export type ToolKey = (typeof tools)[number]["key"];
