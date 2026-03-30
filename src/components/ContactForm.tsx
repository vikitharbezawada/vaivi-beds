"use client";

import { useState } from "react";
import { toast } from "sonner";

const inputClass =
  "w-full bg-transparent border-b border-border/50 py-3 text-base placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors duration-300";

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground";

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) {
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks — we’ll be in touch soon.");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <form onSubmit={submit} className="relative space-y-10">
      <div className="mb-8">
        <p className="font-heading text-xl font-medium">Send a message</p>
        <p className="text-muted-foreground text-sm mt-1">
          We&apos;ll get back to you shortly
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
        <div className="space-y-2">
          <label htmlFor="contact-first" className={labelClass}>
            First name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            maxLength={80}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-last" className={labelClass}>
            Last name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            maxLength={80}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-phone" className={labelClass}>
          Phone <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          maxLength={20}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className={labelClass}>
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          maxLength={255}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y min-h-[120px]`}
          maxLength={4000}
          placeholder="Tell us what you’re looking for…"
        />
      </div>

      {/* Honeypot — leave blank (matches common “If you are human…” pattern) */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor="contact-website">If you are human, leave this field blank.</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-foreground text-background py-4 text-xs font-medium uppercase tracking-[0.25em] hover:opacity-80 transition-all duration-300 disabled:opacity-40 rounded-sm"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
