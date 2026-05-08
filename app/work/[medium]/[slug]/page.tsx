import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, mediums } from "@/lib/artworks";

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
  const work = artworks.find((a) => a.slug === slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description ?? `${work.title} — ${work.medium}, ${work.year}`,
  };
}

function ArtworkPlaceholder({ aspectRatio = "4/3" }: { aspectRatio?: string }) {
  return (
    <div
      className="w-full bg-mist"
      style={{ aspectRatio }}
    />
  );
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ medium: string; slug: string }>;
}) {
  const { slug } = await params;
  const work = artworks.find((a) => a.slug === slug);
  if (!work) notFound();

  const relatedWorks = artworks
    .filter((a) => a.medium === work.medium && a.slug !== work.slug)
    .slice(0, 3);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      {/* Breadcrumb */}
      <div className="mb-12 flex gap-4 items-center">
        <Link
          href="/work"
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35 hover:text-ink transition-colors"
        >
          Work
        </Link>
        <span className="text-ink/20 text-[10px]">/</span>
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35">
          {work.medium}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Image */}
        <div className="lg:col-span-8">
          <ArtworkPlaceholder aspectRatio={work.aspectRatio} />
          <p className="font-sans text-[9px] text-ink/20 mt-2">
            Image: work in progress — documentation forthcoming
          </p>
        </div>

        {/* Details */}
        <div className="lg:col-span-4 lg:col-start-9">
          <h1 className="font-serif font-light text-3xl md:text-4xl leading-tight mb-6">
            {work.title}
          </h1>

          <dl className="space-y-4 mb-8">
            <div>
              <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">
                Year
              </dt>
              <dd className="font-serif text-base">{work.year}</dd>
            </div>
            <div>
              <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">
                Medium
              </dt>
              <dd className="font-serif text-base">{work.medium}</dd>
            </div>
            {work.dimensions && (
              <div>
                <dt className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/30 mb-1">
                  Dimensions
                </dt>
                <dd className="font-serif text-base">{work.dimensions}</dd>
              </div>
            )}
          </dl>

          {work.description && (
            <div className="border-t border-dust pt-6 mb-8">
              <p className="font-serif font-light text-sm leading-relaxed text-ink/65">
                {work.description}
              </p>
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

      {/* Related works */}
      {relatedWorks.length > 0 && (
        <div className="mt-24 border-t border-dust pt-12">
          <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-10">
            More {work.medium.toLowerCase()} works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedWorks.map((rel) => (
              <Link
                key={rel.slug}
                href={`/work/${rel.medium.toLowerCase().replace(/\s+/g, "-")}/${rel.slug}`}
                className="group block"
              >
                <ArtworkPlaceholder aspectRatio={rel.aspectRatio} />
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
