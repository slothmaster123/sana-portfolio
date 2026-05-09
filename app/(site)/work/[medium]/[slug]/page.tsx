import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { artworks } from "@/lib/artworks";

type SanityArtwork = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  medium: string;
  dimensions?: string;
  description?: unknown[];
  forSale?: boolean;
  price?: string;
  image?: { asset: { _ref: string } };
  aspectRatio?: number;
};

const artworkQuery = `*[_type == "artwork" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, year, medium, dimensions, description, forSale, price,
  image, "aspectRatio": image.asset->metadata.dimensions.aspectRatio
}`;

const relatedQuery = `*[_type == "artwork" && medium == $medium && slug.current != $slug] | order(order asc)[0...3] {
  _id, title, "slug": slug.current, year, medium, image,
  "aspectRatio": image.asset->metadata.dimensions.aspectRatio
}`;

export async function generateStaticParams() {
  return artworks.map((a) => ({
    medium: a.medium.toLowerCase().replace(/\s+/g, "-"),
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sanityWork = await sanityFetch<SanityArtwork>(artworkQuery, { slug });
  if (sanityWork) {
    return {
      title: sanityWork.title,
      description: `${sanityWork.title} — ${sanityWork.medium}, ${sanityWork.year}`,
    };
  }
  const work = artworks.find((a) => a.slug === slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description ?? `${work.title} — ${work.medium}, ${work.year}`,
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ medium: string; slug: string }>;
}) {
  const { medium, slug } = await params;

  const [sanityWork, sanityRelated] = await Promise.all([
    sanityFetch<SanityArtwork>(artworkQuery, { slug }),
    sanityFetch<SanityArtwork[]>(relatedQuery, {
      medium: medium.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      slug,
    }),
  ]);

  const staticWork = artworks.find((a) => a.slug === slug);
  if (!sanityWork && !staticWork) notFound();

  const work = sanityWork
    ? {
        title: sanityWork.title,
        year: sanityWork.year,
        medium: sanityWork.medium,
        dimensions: sanityWork.dimensions,
        forSale: sanityWork.forSale,
        price: sanityWork.price,
        imgUrl: sanityWork.image
          ? urlForImage(sanityWork.image)?.width(1600).url() ?? null
          : null,
        aspectRatio: sanityWork.aspectRatio ? String(sanityWork.aspectRatio) : "4/3",
        descriptionBlocks: sanityWork.description ?? null,
        descriptionText: null as string | null,
      }
    : {
        title: staticWork!.title,
        year: staticWork!.year,
        medium: staticWork!.medium,
        dimensions: staticWork!.dimensions,
        forSale: staticWork!.forSale,
        price: staticWork!.price,
        imgUrl: null as null,
        aspectRatio: staticWork!.aspectRatio ?? "4/3",
        descriptionBlocks: null,
        descriptionText: staticWork!.description ?? null,
      };

  const related =
    sanityRelated && sanityRelated.length > 0
      ? sanityRelated.map((r) => ({
          slug: r.slug,
          title: r.title,
          year: r.year,
          medium: r.medium,
          aspectRatio: r.aspectRatio ? String(r.aspectRatio) : "4/3",
          imgUrl: r.image ? urlForImage(r.image)?.width(600).url() ?? null : null,
        }))
      : artworks
          .filter((a) => a.medium === staticWork?.medium && a.slug !== slug)
          .slice(0, 3)
          .map((r) => ({
            slug: r.slug,
            title: r.title,
            year: r.year,
            medium: r.medium,
            aspectRatio: r.aspectRatio ?? "4/3",
            imgUrl: null as null,
          }));

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="mb-12 flex gap-4 items-center">
        <Link
          href="/work"
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35 hover:text-ink transition-colors"
        >
          Work
        </Link>
        <span className="text-ink/20 text-[10px]">/</span>
        <Link
          href={`/work/${medium}`}
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35 hover:text-ink transition-colors"
        >
          {work.medium}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          {work.imgUrl ? (
            <div
              className="w-full relative overflow-hidden"
              style={{ aspectRatio: work.aspectRatio }}
            >
              <Image
                src={work.imgUrl}
                alt={work.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 67vw"
                priority
              />
            </div>
          ) : (
            <>
              <div className="w-full bg-mist" style={{ aspectRatio: work.aspectRatio }} />
              <p className="font-sans text-[9px] text-ink/20 mt-2">
                Image: work in progress — documentation forthcoming
              </p>
            </>
          )}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h1 className="font-serif font-light text-3xl md:text-4xl leading-tight mb-6">
            {work.title}
          </h1>

          <dl className="space-y-4 mb-8">
            <div>
              <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">Year</dt>
              <dd className="font-serif text-base">{work.year}</dd>
            </div>
            <div>
              <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">Medium</dt>
              <dd className="font-serif text-base">{work.medium}</dd>
            </div>
            {work.dimensions && (
              <div>
                <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">Dimensions</dt>
                <dd className="font-serif text-base">{work.dimensions}</dd>
              </div>
            )}
          </dl>

          {(work.descriptionBlocks || work.descriptionText) && (
            <div className="border-t border-dust pt-6 mb-8">
              {work.descriptionBlocks ? (
                <div className="font-serif font-light text-sm leading-relaxed text-ink/65 prose-sm">
                  <PortableText value={work.descriptionBlocks as Parameters<typeof PortableText>[0]["value"]} />
                </div>
              ) : (
                <p className="font-serif font-light text-sm leading-relaxed text-ink/65">
                  {work.descriptionText}
                </p>
              )}
            </div>
          )}

          {work.forSale && (
            <div className="border-t border-dust pt-6">
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/35 mb-3">
                Availability
              </p>
              <p className="font-serif text-sm text-ink/60 mb-4">
                {work.price ?? "Contact for pricing"}
              </p>
              <a
                href={`mailto:sanaiqbalqutb@hotmail.com?subject=Enquiry: ${encodeURIComponent(work.title)}`}
                className="font-sans text-[10px] tracking-[0.2em] uppercase border border-ink px-6 py-2.5 hover:bg-ink hover:text-paper transition-colors inline-block"
              >
                Enquire →
              </a>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 border-t border-dust pt-12">
          <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-10">
            More {work.medium.toLowerCase()} works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/work/${rel.medium.toLowerCase().replace(/\s+/g, "-")}/${rel.slug}`}
                className="group block"
              >
                {rel.imgUrl ? (
                  <div
                    className="w-full relative overflow-hidden bg-mist"
                    style={{ aspectRatio: rel.aspectRatio }}
                  >
                    <Image
                      src={rel.imgUrl}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-mist" style={{ aspectRatio: rel.aspectRatio }} />
                )}
                <p className="font-serif text-sm mt-3 group-hover:opacity-50 transition-opacity">
                  {rel.title}
                </p>
                <p className="font-sans text-[10px] tracking-wider uppercase text-ink/35 mt-1">
                  {rel.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
