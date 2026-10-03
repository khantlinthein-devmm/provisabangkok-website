import RevealObserver from "@/components/RevealObserver";

// Re-mounted on every navigation: fades the new page in and re-scans it for reveal animations.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-fade">
      {children}
      <RevealObserver />
    </div>
  );
}
