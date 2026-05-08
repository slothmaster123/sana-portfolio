"use client";

import Link from "next/link";
import { useState } from "react";
import { artworks, mediums, type Medium } from "@/lib/artworks";

function ArtworkPlaceholder({ aspectRatio = "4/3" }: { aspectRatio?: string }) {
  return (
    <div className="w-full bg-mist" style={{ aspectRatio }} />
  );
}

export default function Work() {
  const [active, setActive] = useState<Medium | "All">("All");

  const filtered =
    active === "All"
      ? artworks
      : artworks.filter((a) => a.medium === active);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-12">
        Work
      </h1>

      {/* Medium filter */}
      <div className="flex flex-wrap gap-4 mb-14 border-b border-dust pb-8">
        {(["All", ...mediums] as (Medium | "All")[]).map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className={`font-sans text-[10px] tracking-[0.15em] uppercase transition-opacity ${
              active === m ? "opacity-100" : "opacity-30 hover:opacity-70"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((work) => (
          <Link
            key={work.slug}
            href={`/work/${work.medium.toLowerCase().replace(/\s+/g, "-")}/${work.slug}`}
            className="group block"
          >
            <ArtworkPlaceholder aspectRatio={work.aspectRatio} />
            <div className="mt-3">
              <p className="font-serif text-sm group-hover:opacity-50 transition-opacity">
                {work.title}
              </p>
              <p className="font-sans text-[10px] tracking-wider uppercase text-ink/35 mt-1">
                {work.medium} · {work.year}
              </p>
              {work.dimensions && (
                <p className="font-sans text-[10px] text-ink/25 mt-0.5">
                  {work.dimensions}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-serif text-base text-ink/30 py-16 text-center">
          No works in this medium yet.
        </p>
      )}
    </div>
  );
}
