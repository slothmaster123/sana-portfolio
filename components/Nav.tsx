"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const links = [
  { href: "/work", en: "Archive", ur: "کام" },
  { href: "/projects", en: "Projects", ur: "منصوبے" },
  { href: "/about", en: "About", ur: "بارے میں" },
  { href: "/cv", en: "CV", ur: "سی وی" },
  { href: "/shop", en: "Shop", ur: "دکان" },
  { href: "/inspiration", en: "Journal", ur: "الہام" },
  { href: "/news", en: "News", ur: "خبریں" },
  { href: "/press", en: "Press", ur: "پریس" },
  { href: "/contact", en: "Contact", ur: "رابطہ" },
];

export default function Nav() {
  const pathname = usePathname();
  const { t, toggle, lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink/15 bg-paper/85 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-base leading-none tracking-[0.08em] text-ink transition-colors hover:text-clay"
          onClick={() => setOpen(false)}
        >
          Sana <span className="italic">Iqbal Qutb</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {links.map(({ href, en, ur }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-[9px] tracking-[0.18em] uppercase transition-colors ${
                pathname === href ? "text-clay" : "text-ink/55 hover:text-ink"
              }`}
            >
              {t(en, ur)}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="ml-2 border-l border-ink/15 pl-4 font-sans text-[9px] tracking-[0.18em] uppercase text-ink/55 hover:text-clay transition-colors"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
        </nav>

        <button
          className="lg:hidden font-sans text-[9px] tracking-[0.18em] uppercase text-ink/70"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Index"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/15 bg-paper">
          <nav className="max-w-screen-2xl mx-auto px-6 py-10 grid grid-cols-2 gap-x-6 gap-y-6">
            {links.map(({ href, en, ur }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-serif text-xl transition-colors ${
                  pathname === href ? "text-clay italic" : "text-ink/75"
                }`}
              >
                <span className="mr-2 font-sans text-[9px] tracking-wider text-ink/35">0{index + 1}</span>
                {t(en, ur)}
              </Link>
            ))}
            <button
              onClick={() => { toggle(); setOpen(false); }}
              className="col-span-2 mt-2 border-t border-ink/15 pt-5 text-left font-sans text-[10px] tracking-[0.18em] uppercase text-ink/55"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
