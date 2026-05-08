import type { Metadata } from "next";
import Link from "next/link";
import { artworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Acquire works by Sana Iqbal Qutb — originals and prints.",
};

const forSale = artworks.filter((a) => a.forSale !== false);

function ArtworkPlaceholder({ aspectRatio = "4/3" }: { aspectRatio?: string }) {
  return <div className="w-full bg-mist" style={{ aspectRatio }} />;
}

export default function Shop() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16">
        <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink">
          Shop
        </h1>
        <p className="font-serif font-light text-base text-ink/40 max-w-sm">
          Original works and prints. For availability and pricing, contact directly.
        </p>
      </div>

      {/* Originals */}
      <section className="mb-20">
        <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-10 border-b border-dust pb-6">
          Originals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks
            .filter((a) => a.forSale === true)
            .map((work) => (
              <div key={work.slug} className="group">
                <ArtworkPlaceholder aspectRatio={work.aspectRatio} />
                <div className="mt-4">
                  <p className="font-serif text-sm">{work.title}</p>
                  <p className="font-sans text-[10px] tracking-wider uppercase text-ink/35 mt-1">
                    {work.medium} · {work.year}
                  </p>
                  {work.dimensions && (
                    <p className="font-sans text-[10px] text-ink/25 mt-0.5">
                      {work.dimensions}
                    </p>
                  )}
                  <div className="mt-4">
                    <a
                      href={`mailto:sanaiqbalqutb@hotmail.com?subject=Enquiry: ${encodeURIComponent(work.title)}`}
                      className="font-sans text-[10px] tracking-[0.15em] uppercase border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Prints — coming soon */}
      <section>
        <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-10 border-b border-dust pb-6">
          Prints
        </h2>
        <div className="border border-dashed border-dust p-12 text-center max-w-md mx-auto">
          <p className="font-serif font-light text-lg text-ink/40">
            Print editions — coming soon
          </p>
          <p className="font-sans text-[10px] tracking-wider text-ink/25 mt-3">
            Limited edition prints will be available. Sign up for news to be notified.
          </p>
          <Link
            href="/news"
            className="font-sans text-[10px] tracking-[0.15em] uppercase mt-6 inline-block hover:opacity-60 transition-opacity"
          >
            Subscribe for updates →
          </Link>
        </div>
      </section>

      {/* Note */}
      <div className="mt-20 border-t border-dust pt-10">
        <p className="font-sans text-[10px] text-ink/30 max-w-lg leading-relaxed">
          All works are sold directly. For international enquiries, please mention
          your location. Shipping and handling will be discussed individually.
          Certificates of authenticity are provided for all original works.
        </p>
      </div>
    </div>
  );
}
