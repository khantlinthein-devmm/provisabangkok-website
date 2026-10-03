// A thin gold frame that draws itself around a photo on page load.
export default function GoldFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-2 ${className}`}>
      <span className="frame-line top" aria-hidden="true" />
      <span className="frame-line right" aria-hidden="true" />
      <span className="frame-line bottom" aria-hidden="true" />
      <span className="frame-line left" aria-hidden="true" />
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
