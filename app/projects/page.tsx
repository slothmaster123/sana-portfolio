import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects and bodies of work by Sana Iqbal Qutb.",
};

const projects = [
  {
    slug: "gt-road",
    title: "GT Road",
    status: "Ongoing",
    year: "2024 —",
    description:
      "A research-based project exploring migration, memory, and identity along the Grand Trunk Road — one of Asia's oldest and longest roads, connecting Kabul to Dhaka through Pakistan and India. The work investigates the layered histories of movement, partition, and belonging embedded in the landscape.",
    themes: ["Migration", "Memory", "Partition", "Landscape", "Road"],
    medium: "Research-based, multidisciplinary",
    placeholder: true,
  },
  {
    slug: "second-wife",
    title: "Second Wife",
    status: "Ongoing",
    year: "2024 —",
    description:
      "A body of work examining the position, erasure, and interiority of second wives within South Asian domestic and social structures. The project draws on personal histories, oral testimonies, and archival research to surface what is routinely made invisible.",
    themes: ["Gender", "Power", "Erasure", "Domestic space", "Inheritance"],
    medium: "Multidisciplinary",
    placeholder: true,
  },
  {
    slug: "mental-health",
    title: "Untitled (Mental Health)",
    status: "In development",
    year: "2025 —",
    description:
      "A work in development addressing mental health, stigma, and the language of care within South Asian communities. The project explores what language is available — and what remains unspeakable.",
    themes: ["Mental health", "Care", "Stigma", "Language"],
    medium: "TBD",
    placeholder: true,
  },
  {
    slug: "52-percent-spiritual",
    title: "52% Spiritual",
    status: "Complete",
    year: "2022",
    description:
      "A collaborative digital work with UCL's Digital Anthropology department, exploring augmented reality as a medium for cultural memory and lived experience. Part of the MA MFA programme at the Slade School of Fine Art.",
    themes: ["AR", "Digital", "Memory", "Collaboration"],
    medium: "Digital / Augmented Reality",
    placeholder: false,
    url: "https://www.ucl.ac.uk/slade/patrickwhite/52%25%20spirtual/sana-iqbal-jane-davies.html",
  },
  {
    slug: "exit-strategy",
    title: "Exit Strategy",
    status: "Complete",
    year: "2019",
    description:
      "Exhibited at the National Art Gallery, PNCA, Islamabad. An installation interrogating the conditions of departure, belonging, and the bureaucracy of movement.",
    themes: ["Movement", "Belonging", "Border", "Bureaucracy"],
    medium: "Installation",
    placeholder: false,
  },
];

export default function Projects() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-16">
        Projects
      </h1>

      <div className="space-y-0 divide-y divide-dust">
        {projects.map((project) => (
          <div key={project.slug} className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: meta */}
            <div className="lg:col-span-3 space-y-2">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35">
                {project.year}
              </p>
              <span
                className={`inline-block font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${
                  project.status === "Ongoing"
                    ? "bg-ink text-paper"
                    : project.status === "In development"
                    ? "bg-dust text-ink/60"
                    : "border border-dust text-ink/40"
                }`}
              >
                {project.status}
              </span>
              <p className="font-sans text-[10px] text-ink/30 mt-2">
                {project.medium}
              </p>
            </div>

            {/* Right: content */}
            <div className="lg:col-span-9">
              <h2 className="font-serif font-light text-3xl mb-4">
                {project.title}
                {project.placeholder && (
                  <span className="font-sans text-xs tracking-wider text-ink/25 ml-3">
                    — forthcoming
                  </span>
                )}
              </h2>
              <p className="font-serif font-light text-base leading-relaxed text-ink/70 max-w-2xl mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.themes.map((t) => (
                  <span
                    key={t}
                    className="font-sans text-[9px] tracking-[0.1em] uppercase text-ink/40 border border-dust px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
                >
                  View project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
