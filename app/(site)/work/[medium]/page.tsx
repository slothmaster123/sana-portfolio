import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { artworks, mediums, type Medium } from "@/lib/artworks";

function slugToMedium(slug: string): Medium | null {
  return mediums.find((m) => m.toLowerCase().replace(/\s+/g, "-") === slug) ?? null;
}

export async function generateStaticParams() {
  return mediums.map((m) => ({ medium: m.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ medium: string }>;
}): Promise<Metadata> {
  const { medium } = await params;
  const label = slugToMedium(medium);
  if (!label) return {};
  return { title: label, description: `${label} works by Sana Iqbal Qutb.` };
}

type SanityArtwork = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  image?: { asset: { _ref: string } };
  aspectRatio?: number;
};

export default async function MediumPage({
  params,
}: {
  params: Promise<{ medium: string }>;
}) {
  const { medium } = await params;
  const mediumLabel = slugToMedium(medium);
  if (!mediumLabel) notFound();

  const query = `*[_type == "artwork" && medium == $medium] | order(order asc, year desc) {
    _id, title, "slug": slug.current, year, medium, image,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio
  }`;

  const sanityWorks = await sanityFetch<SanityArtwork[]>(query, { medium: mediumLabel });

  const works =
    sanityWorks && sanityWorks.length > 0
      ? sanityWorks.map((w) => ({
          slug: w.slug,
          title: w.title,
          year: w.year,
          aspectRatio: w.aspectRatio ? String(w.aspectRatio) : "4/3",
          imgUrl: w.image ? urlForImage(w.image)?.width(800).url() ?? null : null,
        }))
      : artworks
          .filter((a) => a.medium === mediumLabel)
          .map((w) => ({
            slug: w.slug,
            title: w.title,
            year: w.year,
            aspectRatio: w.aspectRatio ?? "4/3",
            imgUrl: null as null,
          }));

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
            {work.imgUrl ? (
              <div
                className="w-full relative overflow-hidden bg-mist"
                style={{ aspectRatio: work.aspectRatio }}
              >
                <Image
                  src={work.imgUrl}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full bg-mist" style={{ aspectRatio: work.aspectRatio }} />
            )}
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
