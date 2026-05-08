import Link from "next/link";
import { getFeatured } from "@/lib/artworks";
import { newsItems } from "@/lib/data";

function ArtworkPlaceholder({
  aspectRatio = "4/3",
}: {
  aspectRatio?: string;
}) {
  return (
    <div
      className="w-full bg-mist"
      style={{ aspectRatio }}
    />
  );
}

export default function Home() {
  const featured = getFeatured().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif font-light text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-[0.05em] text-ink">
          Sana Iqbal Qutb
        </h1>
        <div className="w-16 h-px bg-ink/20 mt-8 mb-6" />
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-ink/40">
          Multidisciplinary Artist · Lahore
        </p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/25 animate-pulse">
            ↓
          </span>
        </div>
      </section>

      {/* Featured Works */}
      <section className="px-6 md:px-12 pb-24 max-w-screen-2xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif font-light text-lg tracking-wider">
            Selected Works
          </h2>
          <Link
            href="/work"
            className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.medium.toLowerCase().replace(/\s+/g, "-")}/${work.slug}`}
              className="group block"
            >
              <ArtworkPlaceholder aspectRatio={work.aspectRatio} />
              <div className="mt-3">
                <p className="font-serif text-sm group-hover:opacity-60 transition-opacity">
                  {work.title}
                </p>
                <p className="font-sans text-[10px] tracking-wider uppercase text-ink/40 mt-0.5">
                  {work.medium} · {work.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bio strip */}
      <section className="border-t border-dust px-6 md:px-12 py-16 max-w-screen-2xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="font-serif font-light text-xl leading-relaxed text-ink/70">
            Concept-driven, research-based practice exploring memory, displacement,
            belonging, and the politics of language — across installation,
            photography, textile, painting, sculpture, and digital media.
          </p>
          <div className="mt-8 flex gap-6">
            <Link
              href="/about"
              className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            >
              About →
            </Link>
            <Link
              href="/cv"
              className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            >
              CV →
            </Link>
          </div>
        </div>
      </section>

      {/* News strip */}
      <section className="border-t border-dust px-6 md:px-12 py-16 bg-mist">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/40">
              News
            </h2>
            <Link
              href="/news"
              className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-40 hover:opacity-100 transition-opacity"
            >
              All news →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <div key={i}>
                <p className="font-sans text-[10px] tracking-wider uppercase text-ink/30 mb-2">
                  {item.date}
                </p>
                <p className="font-serif text-base leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
