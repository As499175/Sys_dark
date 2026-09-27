"use client";

import { useEffect, useRef, useState } from "react";
import { Bug, Clock, Github, Linkedin, Mail, Send, CheckCircle2 } from "lucide-react";
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
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("idle");
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
      } else if (data.errors) {
        setErrors(data.errors);
      } else if (data.mailto) {
        // server told us to fall back to mailto
        setState("mailto");
        window.location.href = data.mailto;
      } else {
        setErrors({ form: "Transmission failed. Try email directly." });
      }
    } catch {
      setErrors({ form: "Network error — email me directly instead." });
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
                {state === "sending" ? "Transmitting…" : state === "mailto" ? "Opening mail client…" : "Transmit"}
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
              { href: profile.links.linkedin, Icon: Linkedin, label: "LinkedIn — Md. Ashiqur Rahman" },
              { href: profile.links.github, Icon: Github, label: "GitHub — @ashiq0x" },
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
