"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const links = [
  { href: "/work", en: "Work", ur: "کام" },
  { href: "/projects", en: "Projects", ur: "منصوبے" },
  { href: "/about", en: "About", ur: "بارے میں" },
  { href: "/cv", en: "CV", ur: "سی وی" },
  { href: "/shop", en: "Shop", ur: "دکان" },
  { href: "/inspiration", en: "Inspiration", ur: "الہام" },
  { href: "/news", en: "News", ur: "خبریں" },
  { href: "/contact", en: "Contact", ur: "رابطہ" },
];

export default function Nav() {
  const pathname = usePathname();
  const { t, toggle, lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-dust">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        {/* Name / wordmark */}
        <Link
          href="/"
          className="font-serif text-xs tracking-[0.2em] uppercase text-ink hover:opacity-60 transition-opacity"
          onClick={() => setOpen(false)}
        >
          Sana Iqbal Qutb
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ href, en, ur }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-[10px] tracking-[0.15em] uppercase transition-opacity ${
                pathname === href
                  ? "opacity-100"
                  : "opacity-35 hover:opacity-100"
              }`}
            >
              {t(en, ur)}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-35 hover:opacity-100 transition-opacity ml-2 border-l border-dust pl-6"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden font-sans text-[10px] tracking-[0.15em] uppercase opacity-60"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-dust bg-paper">
          <nav className="max-w-screen-2xl mx-auto px-6 py-8 flex flex-col gap-6">
            {links.map(({ href, en, ur }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-sans text-xs tracking-[0.15em] uppercase transition-opacity ${
                  pathname === href ? "opacity-100" : "opacity-40"
                }`}
              >
                {t(en, ur)}
              </Link>
            ))}
            <button
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="font-sans text-xs tracking-[0.15em] uppercase opacity-40 text-left border-t border-dust pt-4 mt-2"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
