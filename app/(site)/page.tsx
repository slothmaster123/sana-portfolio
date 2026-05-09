import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { getFeatured } from "@/lib/artworks";
import { newsItems as staticNews } from "@/lib/data";

const featuredQuery = `*[_type == "artwork" && featured == true] | order(order asc)[0...6] {
  _id, title, "slug": slug.current, year, medium, image
}`;

const newsQuery = `*[_type == "newsItem"] | order(date desc)[0...3] {
  _id, date, title, body
}`;

type SanityArtwork = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  medium: string;
  image?: { asset: { _ref: string } };
};

type SanityNews = { _id: string; date: string; title: string };

function ArtworkCard({
  title,
  year,
  medium,
  href,
  image,
}: {
  title: string;
  year: string;
  medium: string;
  href: string;
  image?: { asset: { _ref: string } } | null;
}) {
  const imgUrl = image ? urlForImage(image)?.width(800).url() : null;
  return (
    <Link href={href} className="group block">
      {imgUrl ? (
        <div className="w-full aspect-[4/3] relative overflow-hidden bg-mist">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-mist" />
      )}
      <div className="mt-3">
        <p className="font-serif text-sm group-hover:opacity-60 transition-opacity">
          {title}
        </p>
        <p className="font-sans text-[10px] tracking-wider uppercase text-ink/40 mt-0.5">
          {medium} · {year}
        </p>
      </div>
    </Link>
  );
}

export default async function Home() {
  const [sanityWorks, sanityNews] = await Promise.all([
    sanityFetch<SanityArtwork[]>(featuredQuery),
    sanityFetch<SanityNews[]>(newsQuery),
  ]);

  const works =
    sanityWorks && sanityWorks.length > 0
      ? sanityWorks
      : getFeatured()
          .slice(0, 6)
          .map((w) => ({ ...w, _id: w.slug, image: undefined }));

  const news =
    sanityNews && sanityNews.length > 0
      ? sanityNews.map((n) => ({ ...n, body: "" }))
      : staticNews.map((n, i) => ({ ...n, _id: String(i) }));

  return (
    <>
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 text-center relative">
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
          {works.map((work) => (
            <ArtworkCard
              key={work._id}
              title={work.title}
              year={work.year}
              medium={work.medium}
              href={`/work/${work.medium.toLowerCase().replace(/\s+/g, "-")}/${work.slug}`}
              image={work.image}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-dust px-6 md:px-12 py-16 max-w-screen-2xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="font-serif font-light text-xl leading-relaxed text-ink/70">
            Concept-driven, research-based practice exploring memory,
            displacement, belonging, and the politics of language — across
            installation, photography, textile, painting, sculpture, and digital
            media.
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
            {news.map((item) => (
              <div key={item._id}>
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
