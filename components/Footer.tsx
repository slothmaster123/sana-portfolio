import Link from "next/link";
import { bio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-ink/15 px-6 md:px-12 py-10">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <p className="font-serif text-2xl leading-none text-ink/80">
          Made slowly,<br /><span className="italic text-clay">with attention.</span>
        </p>
        <p className="font-sans text-[9px] leading-relaxed tracking-[0.14em] uppercase text-ink/45 md:text-center">
          © {new Date().getFullYear()}<br />Sana Iqbal Qutb · Lahore
        </p>
        <div className="flex md:justify-end items-center gap-6">
          <a href={bio.instagram} target="_blank" rel="noopener noreferrer" className="font-sans text-[9px] tracking-[0.16em] uppercase text-ink/55 hover:text-clay transition-colors">Instagram</a>
          <Link href="/contact" className="font-sans text-[9px] tracking-[0.16em] uppercase text-ink/55 hover:text-clay transition-colors">Contact</Link>
          <Link href="/cv" className="font-sans text-[9px] tracking-[0.16em] uppercase text-ink/55 hover:text-clay transition-colors">CV</Link>
        </div>
      </div>
    </footer>
  );
}
