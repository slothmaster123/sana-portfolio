import type { Metadata } from "next";
import Link from "next/link";
import { bio } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sana Iqbal Qutb — multidisciplinary artist and educator based in Lahore.",
};

export default function About() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      {/* Page title */}
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        About
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Bio column */}
        <div className="lg:col-span-7">
          <div className="space-y-6 font-serif font-light text-lg leading-relaxed text-ink/80">
            {bio.long.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            <Link
              href="/cv"
              className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            >
              View CV →
            </Link>
            <Link
              href="/press"
              className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            >
              Press →
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            >
              Contact →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:col-start-9 space-y-10">
          {/* Artist Statement */}
          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/40 mb-6">
              Artist Statement
            </h2>
            <div className="space-y-5 font-serif font-light text-base leading-relaxed text-ink/70">
              {bio.statement.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Quick facts */}
          <div className="border-t border-dust pt-8">
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/40 mb-6">
              Information
            </h2>
            <dl className="space-y-3">
              <div className="flex gap-4">
                <dt className="font-sans text-[10px] tracking-wider uppercase text-ink/30 w-20 shrink-0">
                  Born
                </dt>
                <dd className="font-serif text-sm">1994, Lahore</dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-sans text-[10px] tracking-wider uppercase text-ink/30 w-20 shrink-0">
                  Based
                </dt>
                <dd className="font-serif text-sm">Lahore, Pakistan</dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-sans text-[10px] tracking-wider uppercase text-ink/30 w-20 shrink-0">
                  MFA
                </dt>
                <dd className="font-serif text-sm">
                  Slade School of Fine Art, UCL (2023, Distinction)
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-sans text-[10px] tracking-wider uppercase text-ink/30 w-20 shrink-0">
                  BFA
                </dt>
                <dd className="font-serif text-sm">
                  Beaconhouse National University (2018, Distinction)
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-sans text-[10px] tracking-wider uppercase text-ink/30 w-20 shrink-0">
                  Contact
                </dt>
                <dd className="font-serif text-sm">
                  <a
                    href={`mailto:${bio.email}`}
                    className="hover:opacity-60 transition-opacity"
                  >
                    {bio.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
