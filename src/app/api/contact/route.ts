import { NextResponse } from "next/server";
import { z } from "zod";
import { profile } from "@/data/profile";

const contactSchema = z.object({
  name: z.string().min(2, "Name needs at least 2 characters").max(80),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject needs at least 3 characters").max(150),
  message: z.string().min(10, "Message needs at least 10 characters").max(5000),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: { form: "Invalid request body." } }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
  const apiKey = process.env.RESEND_API_KEY;

  // Fallback: no Resend key configured → hand the browser a mailto link.
  if (!apiKey || !to) {
    const mailto = `mailto:${to || profile.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`${message}\n\n— ${name} <${email}>`)}`;
    return NextResponse.json({ ok: false, mailto });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>", // TODO: verify your sending domain
        to: [to],
        reply_to: email,
        subject: `[portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, errors: { form: "Mail service rejected the request." } }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Mail service unreachable." } }, { status: 502 });
  }
}
