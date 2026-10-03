// Thin gold rule with a small diamond in the middle. The lines draw outwards when scrolled into view.
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true" data-reveal>
      <span className="ornament-line from-right h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="ornament-line from-left h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}
