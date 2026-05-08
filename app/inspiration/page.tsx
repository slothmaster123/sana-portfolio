import type { Metadata } from "next";
import Link from "next/link";
import { inspirationPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "A personal journal of readings, quotes, and reflections by Sana Iqbal Qutb.",
};

export default function Inspiration() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="max-w-3xl">
        <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-6">
          Inspiration
        </h1>
        <p className="font-serif font-light text-lg text-ink/50 mb-16">
          Readings, quotes, and thoughts — a working archive of what stays with me.
        </p>

        <div className="space-y-0 divide-y divide-dust">
          {inspirationPosts.map((post) => (
            <article key={post.slug} className="py-12">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <h2 className="font-serif font-light text-2xl">{post.title}</h2>
                <span className="font-sans text-[10px] tracking-wider uppercase text-ink/30">
                  {post.date}
                </span>
              </div>

              <div className="space-y-4 font-serif font-light text-base leading-relaxed text-ink/70">
                {post.body.split("\n\n").map((para, i) => (
                  <p key={i} className={para.startsWith('"') ? "italic text-ink/60 text-lg pl-4 border-l-2 border-dust" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[9px] tracking-[0.1em] uppercase text-ink/30 border border-dust px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
