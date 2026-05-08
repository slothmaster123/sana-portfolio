"use client";

import { newsItems } from "@/lib/data";
import { useState } from "react";

export default function News() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email service (Resend, Mailchimp, etc.)
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* News list */}
        <div className="lg:col-span-8">
          <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
            News
          </h1>

          <div className="space-y-0 divide-y divide-dust">
            {newsItems.map((item, i) => (
              <article key={i} className="py-10">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30">
                  {item.date}
                </span>
                <h2 className="font-serif font-light text-2xl mt-2 mb-4">
                  {item.title}
                </h2>
                <p className="font-serif font-light text-base text-ink/60 leading-relaxed max-w-xl">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Subscribe sidebar */}
        <div className="lg:col-span-4">
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
        </div>
      </div>
    </div>
  );
}
