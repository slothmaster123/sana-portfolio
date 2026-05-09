"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email service (Resend, Mailchimp, etc.)
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="sticky top-24 border border-dust p-8">
      <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/40 mb-4">
        Stay in touch
      </h2>
      <p className="font-serif font-light text-sm text-ink/60 leading-relaxed mb-8">
        Subscribe to receive updates on exhibitions, new work, and news.
      </p>

      {subscribed ? (
        <p className="font-serif text-sm text-ink/60">
          Thank you — you're subscribed.
        </p>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border-b border-dust bg-transparent font-sans text-sm py-2 focus:outline-none focus:border-ink transition-colors placeholder:text-ink/25"
          />
          <button
            type="submit"
            className="font-sans text-[10px] tracking-[0.2em] uppercase border border-ink px-6 py-2.5 hover:bg-ink hover:text-paper transition-colors w-full"
          >
            Subscribe →
          </button>
        </form>
      )}
    </div>
  );
}
