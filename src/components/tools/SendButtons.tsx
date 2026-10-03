import { site } from "@/lib/site";

/** WhatsApp and email buttons that send a pre-written message to the office. */
export default function SendButtons({
  message,
  subject,
  whatsappLabel,
  emailLabel,
  disabled = false,
}: {
  message: string;
  subject: string;
  whatsappLabel: string;
  emailLabel: string;
  disabled?: boolean;
}) {
  const wa = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const off = disabled ? "pointer-events-none opacity-40" : "";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-disabled={disabled} className={`btn ${off}`}>
        {whatsappLabel}
      </a>
      <a href={mail} aria-disabled={disabled} className={`btn-ghost ${off}`}>
        {emailLabel}
      </a>
    </div>
  );
}
