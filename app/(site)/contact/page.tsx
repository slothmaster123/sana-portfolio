import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import ContactClient from "./ContactClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sana Iqbal Qutb.",
};

export default async function Contact() {
  const bio = await getSiteSettings();
  return <ContactClient bio={bio} />;
}
