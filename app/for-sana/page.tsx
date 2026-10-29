import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import DateNight from "./DateNight";
import "./date-night.css";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "A little evening, just for us",
  description: "An invitation for Sana, with love from Jaudat.",
  robots: { index: false, follow: false },
  openGraph: { title: "Sana, I saved you an evening.", description: "Two cities. One little cinema. Just us." },
};

export default async function Page() {
  const artworks = await sanityFetch<{ title: string; year: string; imageUrl: string }[]>(
    `*[_type == "artwork" && defined(image.asset)] | order(featured desc, order asc)[0...6]{title, year, "imageUrl": image.asset->url}`
  );
  return <DateNight artworks={artworks?.length ? artworks : [{ title: "Landan (film still)", year: "2023", imageUrl: "/date-night/landan.webp" }]} />;
}
