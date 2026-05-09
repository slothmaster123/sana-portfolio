import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { artworks } from "@/lib/artworks";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description: "Artworks by Sana Iqbal Qutb across installation, photography, painting, sculpture, textile, 3D printing, and digital media.",
};

const allWorksQuery = `*[_type == "artwork"] | order(order asc, year desc) {
  _id, title, "slug": slug.current, year, medium, dimensions, image,
  "aspectRatio": image.asset->metadata.dimensions.aspectRatio
}`;

type SanityArtwork = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  medium: string;
  dimensions?: string;
  image?: { asset: { _ref: string } };
  aspectRatio?: number;
};

export default async function Work() {
  const sanityWorks = await sanityFetch<SanityArtwork[]>(allWorksQuery);

  const works =
    sanityWorks && sanityWorks.length > 0
      ? sanityWorks.map((w) => ({
          slug: w.slug,
          title: w.title,
          year: w.year,
          medium: w.medium,
          dimensions: w.dimensions,
          aspectRatio: w.aspectRatio ? String(w.aspectRatio) : "4/3",
          imgUrl: w.image ? urlForImage(w.image)?.width(800).url() ?? null : null,
        }))
      : artworks.map((w) => ({
          slug: w.slug,
          title: w.title,
          year: w.year,
          medium: w.medium,
          dimensions: w.dimensions,
          aspectRatio: w.aspectRatio ?? "4/3",
          imgUrl: null as null,
        }));

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-12">
        Work
      </h1>
      <WorkClient works={works} />
    </div>
  );
}
