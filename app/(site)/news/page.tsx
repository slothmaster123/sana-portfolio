import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { newsItems as staticNews } from "@/lib/data";
import SubscribeForm from "./NewsClient";

export const metadata: Metadata = {
  title: "News",
  description: "News, exhibitions, and announcements from Sana Iqbal Qutb.",
};

const newsQuery = `*[_type == "newsItem"] | order(date desc) {
  _id, date, title, body
}`;

type SanityNews = {
  _id: string;
  date: string;
  title: string;
  body?: string;
};

export default async function News() {
  const sanityNews = await sanityFetch<SanityNews[]>(newsQuery);
  const news =
    sanityNews && sanityNews.length > 0
      ? sanityNews
      : staticNews.map((n, i) => ({ ...n, _id: String(i) }));

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
            News
          </h1>

          <div className="space-y-0 divide-y divide-dust">
            {news.map((item) => (
              <article key={item._id} className="py-10">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30">
                  {item.date}
                </span>
                <h2 className="font-serif font-light text-2xl mt-2 mb-4">
                  {item.title}
                </h2>
                {item.body && (
                  <p className="font-serif font-light text-base text-ink/60 leading-relaxed max-w-xl">
                    {item.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
