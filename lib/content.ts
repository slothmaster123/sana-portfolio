import { sanityFetch } from "@/sanity/client";
import { bio, cvData } from "@/lib/data";

export type SiteSettings = {
  tagline: string;
  bioShort: string;
  bioLong: string;
  statement: string;
  facts: { label: string; value: string }[];
  email: string;
  instagram: string;
};

type CvData = typeof cvData;
export type Cv = CvData & { pdfUrl: string | null };

const settingsQuery = `*[_id == "siteSettings"][0]{
  tagline, bioShort, bioLong, statement, facts[]{label, value}, email, instagram
}`;

const cvQuery = `*[_id == "cv"][0]{
  "pdfUrl": pdf.asset->url,
  education[]{degree, institution, location, years, distinction, gpa, notes},
  experience[]{title, organisation, location, period, points},
  exhibitions[]{year, title, venue, location},
  residencies[]{year, title, institution, location},
  awards[]{year, description},
  additionalCourses[]{year, title, institution},
  academicProjects[]{year, title, url},
  internships[]{year, description}
}`;

const defaultFacts = [
  { label: "Born", value: "1994, Lahore" },
  { label: "Based", value: "Lahore, Pakistan" },
  { label: "MFA", value: "Slade School of Fine Art, UCL (2023, Distinction)" },
  { label: "BFA", value: "Beaconhouse National University (2018, Distinction)" },
];

// Sanity content wins; the copy in lib/data.ts is the fallback for anything
// not filled in yet (or if Sanity is unreachable).
export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await sanityFetch<Partial<SiteSettings>>(settingsQuery);
  return {
    tagline: s?.tagline || bio.tagline,
    bioShort: s?.bioShort || bio.short,
    bioLong: s?.bioLong || bio.long,
    statement: s?.statement || bio.statement,
    facts: s?.facts?.length ? s.facts : defaultFacts,
    email: s?.email || bio.email,
    instagram: s?.instagram || bio.instagram,
  };
}


export async function getCv(): Promise<Cv> {
  const c = await sanityFetch<Partial<Cv>>(cvQuery);
  const pick = <K extends keyof CvData>(k: K): CvData[K] =>
    c?.[k]?.length ? (c[k] as CvData[K]) : cvData[k];
  return {
    education: pick("education"),
    experience: pick("experience"),
    exhibitions: pick("exhibitions"),
    residencies: pick("residencies"),
    awards: pick("awards"),
    additionalCourses: pick("additionalCourses"),
    academicProjects: pick("academicProjects"),
    internships: pick("internships"),
    pdfUrl: c?.pdfUrl ?? null,
  };
}
