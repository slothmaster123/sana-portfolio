"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mediums, type Medium } from "@/lib/artworks";

type WorkItem = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions?: string;
  aspectRatio?: string;
  image?: { asset: { _ref: string } } | null;
  imgUrl?: string | null;
};

export default function WorkClient({ works }: { works: WorkItem[] }) {
  const [active, setActive] = useState<Medium | "All">("All");

  const allMediums = mediums.filter((m) =>
    works.some((w) => w.medium === m)
  );

  const filtered =
    active === "All" ? works : works.filter((w) => w.medium === active);

  const mediumSlug = (m: string) => m.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-14 border-b border-dust pb-8">
        {(["All", ...allMediums] as (Medium | "All")[]).map((m) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((work) => (
          <Link
            key={work.slug}
            href={`/work/${mediumSlug(work.medium)}/${work.slug}`}
            className="group block"
          >
            {work.imgUrl ? (
              <div
                className="w-full relative overflow-hidden bg-mist"
                style={{ aspectRatio: work.aspectRatio ?? "4/3" }}
              >
                <Image
                  src={work.imgUrl}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ) : (
              <div
                className="w-full bg-mist"
                style={{ aspectRatio: work.aspectRatio ?? "4/3" }}
              />
            )}
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
    </>
  );
}
