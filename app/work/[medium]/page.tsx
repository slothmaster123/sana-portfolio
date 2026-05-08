import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, mediums, type Medium } from "@/lib/artworks";

function slugToMedium(slug: string): Medium | null {
  return (
    mediums.find((m) => m.toLowerCase().replace(/\s+/g, "-") === slug) ?? null
  );
}

export async function generateStaticParams() {
  return mediums.map((m) => ({
    medium: m.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ medium: string }>;
}): Promise<Metadata> {
  const { medium } = await params;
  const mediumLabel = slugToMedium(medium);
  if (!mediumLabel) return {};
  return {
    title: mediumLabel,
    description: `${mediumLabel} works by Sana Iqbal Qutb.`,
  };
}

function ArtworkPlaceholder({ aspectRatio = "4/3" }: { aspectRatio?: string }) {
  return <div className="w-full bg-mist" style={{ aspectRatio }} />;
}

export default async function MediumPage({
  params,
}: {
  params: Promise<{ medium: string }>;
}) {
  const { medium } = await params;
  const mediumLabel = slugToMedium(medium);
  if (!mediumLabel) notFound();

  const works = artworks.filter((a) => a.medium === mediumLabel);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="mb-12">
        <Link
          href="/work"
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35 hover:text-ink transition-colors"
        >
          ← All work
        </Link>
      </div>

      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        {mediumLabel}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work) => (
          <Link
            key={work.slug}
            href={`/work/${medium}/${work.slug}`}
            className="group block"
          >
            <ArtworkPlaceholder aspectRatio={work.aspectRatio} />
            <div className="mt-3">
              <p className="font-serif text-sm group-hover:opacity-50 transition-opacity">
                {work.title}
              </p>
              <p className="font-sans text-[10px] tracking-wider uppercase text-ink/35 mt-1">
                {work.year}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {works.length === 0 && (
        <p className="font-serif text-base text-ink/30 py-16 text-center">
          No works yet in this medium.
        </p>
      )}
    </div>
  );
}
