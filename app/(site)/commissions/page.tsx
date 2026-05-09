import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission a work by Sana Iqbal Qutb — enquiries for original artworks and site-specific projects.",
};

export default function Commissions() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        Commissions
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Text */}
        <div className="lg:col-span-7 space-y-8">
          <p className="font-serif font-light text-xl leading-relaxed text-ink/75">
            Sana is available for commissions across a range of media — installation,
            painting, photography, textile, and digital work.
          </p>

          <div className="space-y-6 font-serif font-light text-base leading-relaxed text-ink/65">
            <p>
              Commissions may be for permanent public or private collection, site-specific
              installation, community-engaged projects, or works for institutional contexts.
            </p>
            <p>
              Each commission begins with a conversation. Sana's practice is
              research-driven, and the best outcomes emerge through a genuine
              dialogue about the context, intention, and audience for a work.
            </p>
            <p>
              Please get in touch with an outline of the project, timeline, and budget.
              All enquiries are welcome.
            </p>
          </div>

          <div className="border-t border-dust pt-8 space-y-4">
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35">
              Types of commission
            </h2>
            <ul className="space-y-2">
              {[
                "Site-specific installation",
                "Painting (original)",
                "Photography series",
                "Textile and material work",
                "Digital and AR works",
                "Community and participatory projects",
                "Institutional and public commissions",
              ].map((type) => (
                <li key={type} className="font-serif text-sm text-ink/60 flex gap-3">
                  <span className="text-ink/20">—</span>
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block font-sans text-[10px] tracking-[0.2em] uppercase border border-ink px-8 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
              Make an enquiry →
            </Link>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-4 lg:col-start-9 space-y-8">
          <div className="border border-dust p-8 space-y-6">
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35">
              Typical process
            </h2>
            {[
              ["01", "Initial conversation about the project"],
              ["02", "Research and proposal development"],
              ["03", "Agreed timeline and contract"],
              ["04", "Making — with regular communication"],
              ["05", "Delivery and installation"],
            ].map(([num, step]) => (
              <div key={num} className="flex gap-4">
                <span className="font-sans text-[10px] text-ink/25 shrink-0 w-6">
                  {num}
                </span>
                <p className="font-serif text-sm text-ink/60">{step}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-dust pt-8">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-3">
              Contact
            </p>
            <a
              href="mailto:sanaiqbalqutb@hotmail.com?subject=Commission%20Enquiry"
              className="font-serif text-sm hover:opacity-60 transition-opacity"
            >
              sanaiqbalqutb@hotmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
