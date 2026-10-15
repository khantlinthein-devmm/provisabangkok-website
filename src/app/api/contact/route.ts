import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Sends website messages (contact form, consultation booking, visa finder) to the office mailbox
// through Hostinger SMTP. Needs SMTP_USER and SMTP_PASS (the support@ mailbox password) in the
// environment. SMTP_HOST and SMTP_PORT default to Hostinger's settings.

const LIMITS = { name: 120, email: 200, phone: 60, nationality: 80, visa: 160, message: 5000 };
type Field = keyof typeof LIMITS;

const SUBJECTS = {
  contact: (d: Record<Field, string>) => `Visa enquiry: ${d.visa || "Not sure yet"} (${d.name})`,
  booking: (d: Record<Field, string>) => `Consultation booking (${d.name})`,
  finder: (d: Record<Field, string>) => `Visa Finder result (${d.name})`,
};

const LABELS: [Field, string][] = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["nationality", "Nationality"],
  ["visa", "Asking about"],
];

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.website) return Response.json({ ok: true });

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (value.length > LIMITS[key]) return Response.json({ ok: false }, { status: 400 });
    data[key] = key === "message" ? value : oneLine(value);
  }
  // A name and a way to reply are required: a valid email, or at least a phone number.
  if (!data.name || (data.email && !isEmail(data.email)) || (!data.email && !data.phone)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const kind = (typeof body.kind === "string" && body.kind in SUBJECTS ? body.kind : "contact") as keyof typeof SUBJECTS;

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER or SMTP_PASS is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: { name: `${site.name} website`, address: SMTP_USER },
      to: process.env.CONTACT_TO ?? site.email,
      replyTo: data.email ? { name: data.name, address: data.email } : undefined,
      subject: SUBJECTS[kind](data),
      text: [
        ...LABELS.filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`),
        "",
        data.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Contact form: sending failed", err);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
