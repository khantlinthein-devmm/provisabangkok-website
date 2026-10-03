import { site } from "@/lib/site";

// Floating LINE and WhatsApp buttons, like the chat widget on the original site.
export default function ChatButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 md:bottom-6 md:right-6">
      <a
        href={site.line}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on LINE"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#06c755] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.48 3 2 6.63 2 11.1c0 4 3.55 7.36 8.35 8 .33.07.77.22.88.5.1.25.07.65.03.9l-.14.86c-.04.25-.2 1 .87.54 1.08-.45 5.8-3.42 7.92-5.85C21.36 14.43 22 12.84 22 11.1 22 6.63 17.52 3 12 3Zm-3.6 10.5H6.42a.53.53 0 0 1-.53-.52V9.02c0-.29.24-.52.53-.52.28 0 .52.23.52.52v3.43H8.4c.29 0 .52.24.52.53 0 .28-.23.52-.52.52Zm2.05-.52a.53.53 0 0 1-1.05 0V9.02a.53.53 0 0 1 1.05 0v3.96Zm4.77 0a.52.52 0 0 1-.95.31l-2.03-2.76v2.45a.53.53 0 0 1-1.05 0V9.02a.52.52 0 0 1 .95-.31l2.03 2.76V9.02a.53.53 0 0 1 1.05 0v3.96Zm3.2-2.5c.29 0 .52.24.52.53 0 .28-.23.52-.52.52H17v.93h1.42c.29 0 .52.24.52.53 0 .28-.23.52-.52.52h-1.95a.53.53 0 0 1-.52-.52V9.02c0-.29.23-.52.52-.52h1.95c.29 0 .52.23.52.52 0 .29-.23.53-.52.53H17v.93h1.42Z" />
        </svg>
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 1 1 7.99 4.42Zm8-17.43A11.3 11.3 0 0 0 12.04.75C5.8.75.74 5.8.74 12.04c0 2 .52 3.94 1.51 5.65L.65 23.5l5.95-1.56a11.27 11.27 0 0 0 5.43 1.38h.01c6.23 0 11.3-5.06 11.3-11.29 0-3.02-1.17-5.85-3.3-7.98Z" />
        </svg>
      </a>
    </div>
  );
}
