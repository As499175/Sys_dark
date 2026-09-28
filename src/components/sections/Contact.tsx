"use client";

import { useEffect, useRef, useState } from "react";
import { Bug, Clock, Mail, Send, CheckCircle2 } from "lucide-react";

/* lucide-react v1 removed brand glyphs — inline marks keep the bundle lean. */
function BrandMark({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
const GH_PATH =
  "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.24 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z";
const LI_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z";
import { Section } from "@/components/fx/Section";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { profile } from "@/data/profile";

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  form?: string;
}

/** Live Dhaka clock (Asia/Dhaka). */
function DhakaClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="font-mono text-sm text-cyan text-glow" aria-label="Current time in Dhaka">
      {now} <span className="text-muted">· Asia/Dhaka</span>
    </p>
  );
}

function Field({
  id, label, value, onChange, error, type = "text", textarea,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const common = {
    id,
    name: id,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : undefined,
    className:
      "peer w-full border-b border-white/15 bg-transparent pt-6 pb-2 text-sm text-text outline-none transition-colors focus:border-cyan",
  };
  return (
    <div className={`relative ${error ? "shake" : ""}`}>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left transition-all duration-200 ${
          floated ? "top-1 text-[0.62rem] uppercase tracking-[0.25em] text-cyan" : "top-5 text-sm text-muted"
        }`}
      >
        {label}
      </label>
      {textarea ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
      {error && (
        <p id={`${id}-err`} className="mt-1 font-mono text-[0.62rem] text-danger" role="alert">
          ✕ {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Client-side validation mirrors the Zod schema on the API so users get
       instant inline feedback and we never spam the endpoint with bad data. */
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Name needs at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = "Enter a valid email address";
    if (values.subject.trim().length < 3) next.subject = "Subject needs at least 3 characters";
    if (values.message.trim().length < 10) next.message = "Message needs at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; errors?: Errors; mailto?: string };
      if (res.ok && data.ok) {
        setState("sent");
        formRef.current?.reset();
        setValues({ name: "", email: "", subject: "", message: "" });
        // Let the user edit & send again after the success morph has been visible.
        window.setTimeout(() => setState((s) => (s === "sent" ? "idle" : s)), 5000);
      } else if (data.errors) {
        setErrors(data.errors);
        setState("idle");
      } else if (data.mailto) {
        // No RESEND_API_KEY configured → open the visitor's mail client.
        setState("idle");
        window.location.href = data.mailto;
      } else {
        setErrors({ form: "Transmission failed. Try email directly." });
        setState("idle");
      }
    } catch {
      setErrors({ form: "Network error — email me directly instead." });
      setState("idle");
    }
  };

  return (
    <Section id="contact" kicker="CONTACT" kickerJp="接続" title="Establish uplink">
      <div className="hud-frame glass relative grid gap-10 rounded-md p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
        {/* FORM */}
        <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form">
          <div className="space-y-2">
            <Field id="name" label="Name" value={values.name} onChange={set("name")} error={errors.name} />
            <Field id="email" label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} />
            <Field id="subject" label="Subject" value={values.subject} onChange={set("subject")} error={errors.subject} />
            <Field id="message" label="Message" textarea value={values.message} onChange={set("message")} error={errors.message} />
          </div>
          {errors.form && (
            <p className="mt-3 font-mono text-[0.68rem] text-danger" role="alert">✕ {errors.form}</p>
          )}
          <div className="mt-8">
            {state === "sent" ? (
              <p className="inline-flex items-center gap-2 border border-ok/50 bg-ok/10 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ok" role="status">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Message transmitted ✔
              </p>
            ) : (
              <MagneticButton className="sweep w-full border border-cyan/60 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-cyan hover:text-void sm:w-auto">
                <Send className="h-4 w-4" aria-hidden="true" />
                {state === "sending" ? "Transmitting…" : "Transmit"}
              </MagneticButton>
            )}
          </div>
        </form>

        {/* DIRECT CHANNELS */}
        <aside className="flex flex-col gap-5 text-sm">
          <DhakaClock />
          <ul className="space-y-3" aria-label="Direct contact channels">
            {[
              { href: `mailto:${profile.email}`, Icon: Mail, label: profile.email },
              { href: profile.links.linkedin, Icon: (p:{className?:string}) => <BrandMark path={LI_PATH} className={p.className} />, label: "LinkedIn — Md. Ashiqur Rahman" },
              { href: profile.links.github, Icon: (p:{className?:string}) => <BrandMark path={GH_PATH} className={p.className} />, label: "GitHub — @ashiq0x" },
              { href: profile.links.hackerone, Icon: Bug, label: "HackerOne — @ashiq0x" },
            ].map(({ href, Icon, label }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span className="grid h-9 w-9 place-items-center border border-white/10 bg-ink transition-shadow group-hover:shadow-glow-cyan">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="truncate font-mono text-xs">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/5 pt-5">
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-ok">
              <span className="h-2 w-2 rounded-full bg-ok animate-pulse-dot" aria-hidden="true" /> {profile.availability}
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {profile.responseTime}
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
