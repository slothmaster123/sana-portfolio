import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sana Iqbal Qutb",
    template: "%s — Sana Iqbal Qutb",
  },
  description:
    "Sana Iqbal Qutb is a multidisciplinary artist and educator based in Lahore, working across installation, photography, painting, sculpture, textile, and digital media.",
  keywords: [
    "Sana Iqbal Qutb",
    "artist",
    "Lahore",
    "multidisciplinary",
    "installation art",
    "Pakistani artist",
    "contemporary art",
    "Slade",
    "UCL",
  ],
  openGraph: {
    title: "Sana Iqbal Qutb",
    description:
      "Multidisciplinary artist based in Lahore. MFA, Slade School of Fine Art, UCL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-paper text-ink min-h-screen flex flex-col">
        <LanguageProvider>
          <Nav />
          <main className="pt-14 flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
