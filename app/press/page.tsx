import type { Metadata } from "next";
import { pressItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press coverage and publications featuring Sana Iqbal Qutb.",
};

export default function Press() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        Press
      </h1>

      <div className="max-w-3xl space-y-0 divide-y divide-dust">
        {pressItems.map((item, i) => (
          <div key={i} className="py-10 grid grid-cols-12 gap-4">
            <span className="col-span-2 font-sans text-[10px] tracking-wider text-ink/30 pt-1">
              {item.year}
            </span>
            <div className="col-span-10">
              <h2 className="font-serif text-xl mb-1">{item.title}</h2>
              <p className="font-sans text-[10px] tracking-wider uppercase text-ink/35">
                {item.publication} · {item.location}
              </p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/40 hover:text-ink transition-colors mt-3 inline-block"
                >
                  Read →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-dust pt-12 max-w-md">
        <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-4">
          Press enquiries
        </h2>
        <p className="font-serif font-light text-base text-ink/60 leading-relaxed">
          For press enquiries, image requests, and interview requests, please get in
          touch directly.
        </p>
        <a
          href="mailto:sanaiqbalqutb@hotmail.com?subject=Press%20Enquiry"
          className="font-sans text-[10px] tracking-[0.15em] uppercase mt-4 inline-block hover:opacity-60 transition-opacity"
        >
          sanaiqbalqutb@hotmail.com →
        </a>
      </div>
    </div>
  );
}
