// A small "rubber stamp" mark, echoing the stamps in a passport.
export default function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-label="Registered Thailand Privilege agent" role="img">
      <defs>
        <path id="stamp-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
      <text fontSize="9.5" letterSpacing="2.2" fill="currentColor" fontFamily="var(--font-body)" fontWeight="600">
        <textPath href="#stamp-circle">REGISTERED AGENT · THAILAND PRIVILEGE ·</textPath>
      </text>
      <text x="60" y="57" textAnchor="middle" fontSize="15" fill="currentColor" fontFamily="var(--font-display)" fontStyle="italic">
        Pro Visa
      </text>
      <text x="60" y="73" textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="currentColor" fontFamily="var(--font-body)" fontWeight="600">
        BANGKOK
      </text>
    </svg>
  );
}
