import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { getFeatured } from "@/lib/artworks";
import { newsItems as staticNews } from "@/lib/data";

export const revalidate = 60;

const featuredQuery = `*[_type == "artwork" && featured == true] | order(order asc)[0...6] {
  _id, title, "slug": slug.current, year, medium, image
}`;
const newsQuery = `*[_type == "newsItem"] | order(date desc)[0...3] { _id, date, title, body }`;

type SanityArtwork = {
  _id: string; title: string; slug: string; year: string; medium: string;
  image?: { asset: { _ref: string } };
};
type SanityNews = { _id: string; date: string; title: string };

function WorkCard({ work, index }: { work: SanityArtwork; index: number }) {
  const image = work.image ? urlForImage(work.image)?.width(1100).url() : null;
  return (
    <Link href={`/work/${work.medium.toLowerCase().replace(/\s+/g, "-")}/${work.slug}`} className={`group block ${index === 0 ? "md:col-span-7" : "md:col-span-5"}`}>
      <div className={`grain relative overflow-hidden bg-mist ${index === 0 ? "aspect-[1.23/1]" : "aspect-[1/1.12]"}`}>
        {image ? <Image src={image} alt={work.title} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 768px) 100vw, 62vw" /> : <div className="absolute inset-0 bg-[linear-gradient(135deg,#ded0bd,#f5f0e6_45%,#b8a894)]" />}
        <span className="absolute top-4 left-4 z-10 font-sans text-[9px] tracking-[0.16em] uppercase text-paper mix-blend-difference">0{index + 1}</span>
      </div>
      <div className="mt-4 flex justify-between gap-4 border-t border-ink/20 pt-3">
        <p className="font-serif text-xl leading-none group-hover:text-clay transition-colors">{work.title}</p>
        <p className="shrink-0 font-sans text-[9px] tracking-[0.14em] uppercase text-ink/45">{work.medium} · {work.year}</p>
      </div>
    </Link>
  );
}

export default async function Home() {
  const [sanityWorks, sanityNews] = await Promise.all([
    sanityFetch<SanityArtwork[]>(featuredQuery),
    sanityFetch<SanityNews[]>(newsQuery),
  ]);
  const works: SanityArtwork[] = sanityWorks && sanityWorks.length > 0
    ? sanityWorks
    : getFeatured().slice(0, 6).map((w) => ({ ...w, _id: w.slug, image: undefined }));
  const news = sanityNews && sanityNews.length > 0
    ? sanityNews.map((n) => ({ ...n, body: "" }))
    : staticNews.map((n, i) => ({ ...n, _id: String(i) }));

  return (
    <>
      <section className="grain min-h-[calc(100vh-4rem)] max-w-screen-2xl mx-auto px-6 md:px-12 pt-28 pb-14 flex flex-col justify-between">
        <div className="flex items-center justify-between font-sans text-[9px] tracking-[0.2em] uppercase text-ink/50">
          <span>Artist · Educator</span><span>Lahore, Pakistan</span>
        </div>
        <div className="py-16 md:py-24">
          <div className="editorial-rule mb-8" />
          <h1 className="max-w-6xl font-serif font-light text-[clamp(4rem,12vw,12rem)] leading-[.76] tracking-[-0.055em] text-ink">
            Sana<br /><span className="italic text-clay">Iqbal Qutb</span>
          </h1>
          <p className="mt-10 max-w-md font-serif text-xl md:text-2xl font-light leading-relaxed text-ink/75">
            Work held between memory, material, and the many ways a place can be remembered.
          </p>
        </div>
        <div className="flex justify-between items-end border-t border-ink/20 pt-4">
          <p className="max-w-xs font-sans text-[9px] leading-relaxed tracking-[0.14em] uppercase text-ink/50">Multidisciplinary practice across installation, photography, textile, painting, sculpture, and digital media.</p>
          <Link href="/work" className="font-sans text-[10px] tracking-[0.17em] uppercase text-clay hover:text-ink transition-colors">Explore the archive ↗</Link>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div><p className="font-sans text-[9px] tracking-[0.2em] uppercase text-clay mb-4">Selected works</p><h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight">An evolving<br /><span className="italic">archive.</span></h2></div>
          <p className="max-w-xs font-serif text-lg leading-relaxed text-ink/65">A selection of works shaped by movement, intimacy, and collective histories.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-14">
          {works.slice(0, 4).map((work, index) => <WorkCard key={work._id} work={work} index={index} />)}
        </div>
        <div className="mt-12 text-center"><Link href="/work" className="inline-block border-b border-clay pb-1 font-sans text-[10px] tracking-[0.18em] uppercase text-clay hover:text-ink hover:border-ink transition-colors">View all work</Link></div>
      </section>

      <section className="bg-ink text-paper px-6 md:px-12 py-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-3 font-sans text-[9px] tracking-[0.2em] uppercase text-paper/50">Practice</p>
          <div className="md:col-span-8 md:col-start-5">
            <p className="font-serif text-3xl md:text-5xl font-light leading-[1.12]">Concept-driven, research-based work exploring displacement, belonging, and the <span className="italic text-ochre">politics of language.</span></p>
            <div className="mt-10 flex gap-7"><Link href="/about" className="font-sans text-[10px] tracking-[0.18em] uppercase text-paper/65 hover:text-ochre transition-colors">About the practice ↗</Link><Link href="/cv" className="font-sans text-[10px] tracking-[0.18em] uppercase text-paper/65 hover:text-ochre transition-colors">Read CV ↗</Link></div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3"><p className="font-sans text-[9px] tracking-[0.2em] uppercase text-clay">Field notes</p><h2 className="mt-5 font-serif text-4xl font-light">News &<br /><span className="italic">notice.</span></h2></div>
          <div className="md:col-span-8 md:col-start-5 border-t border-ink/20">
            {news.map((item) => <Link key={item._id} href="/news" className="group grid grid-cols-[5rem_1fr] gap-5 border-b border-ink/15 py-6"><p className="font-sans text-[9px] tracking-[0.14em] uppercase text-clay">{item.date}</p><p className="font-serif text-xl md:text-2xl group-hover:text-clay transition-colors">{item.title}</p></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
