"use client";

import type { Metadata } from "next";
import { bio } from "@/lib/data";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto = `mailto:${bio.email}?subject=${encodeURIComponent(form.subject || "Enquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const inputClass =
    "w-full border-b border-dust bg-transparent font-sans text-sm py-3 focus:outline-none focus:border-ink transition-colors placeholder:text-ink/25";

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        Contact
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact info */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-4">
              Email
            </h2>
            <a
              href={`mailto:${bio.email}`}
              className="font-serif text-base hover:opacity-60 transition-opacity"
            >
              {bio.email}
            </a>
          </div>

          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-4">
              Instagram
            </h2>
            <a
              href={bio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-base hover:opacity-60 transition-opacity"
            >
              @sanaiqbalqutb
            </a>
          </div>

          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-4">
              Based in
            </h2>
            <p className="font-serif text-base">Lahore, Pakistan</p>
          </div>

          <div className="border-t border-dust pt-8">
            <p className="font-serif font-light text-sm text-ink/50 leading-relaxed">
              For exhibition enquiries, commissions, press, and collaborations —
              please use the form or email directly.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/35 block mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/35 block mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/35 block mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={inputClass}
                placeholder="Exhibition enquiry, commission, press..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/35 block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="font-sans text-[10px] tracking-[0.2em] uppercase border border-ink px-8 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
              Send message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
