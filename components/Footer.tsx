import Link from "next/link";
import { bio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-dust mt-32 py-12 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="font-serif text-xs tracking-wider uppercase text-ink opacity-30">
          © {new Date().getFullYear()} Sana Iqbal Qutb
        </p>
        <div className="flex items-center gap-8">
          <a
            href={bio.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-100 transition-opacity"
          >
            Instagram
          </a>
          <Link
            href="/contact"
            className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-100 transition-opacity"
          >
            Contact
          </Link>
          <Link
            href="/cv"
            className="font-sans text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-100 transition-opacity"
          >
            CV
          </Link>
        </div>
      </div>
    </footer>
  );
}
