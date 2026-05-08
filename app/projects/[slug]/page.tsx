import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const projects = [
  {
    slug: "gt-road",
    title: "GT Road",
    status: "Ongoing",
    year: "2024 —",
    description:
      "A research-based project exploring migration, memory, and identity along the Grand Trunk Road — one of Asia's oldest and longest roads, connecting Kabul to Dhaka through Pakistan and India. The work investigates the layered histories of movement, partition, and belonging embedded in the landscape.",
    body: `The Grand Trunk Road has carried traders, armies, refugees, and pilgrims for over two thousand years. It is one of the oldest and longest roads in Asia, running from Kabul through Lahore, Delhi, and Kolkata to Dhaka.

This project begins with the road as a line — a line that was also a wound. Partition in 1947 interrupted the road, cutting the territory it crosses into new nations. The road continued, but the people who moved along it were suddenly moving across borders that had not existed before.

The work draws on field research along different sections of the road, oral histories collected along the route, and archival material from families whose histories are embedded in this geography. It asks: what does it mean to remember a journey that was also a displacement? What survives in the body, in cloth, in language, in cooking?

This is a long-term research project. It does not yet have a fixed form. The making will follow the research.`,
    themes: ["Migration", "Memory", "Partition", "Landscape", "Road", "Archive"],
    medium: "Research-based, multidisciplinary",
    placeholder: true,
  },
  {
    slug: "second-wife",
    title: "Second Wife",
    status: "Ongoing",
    year: "2024 —",
    description:
      "A body of work examining the position, erasure, and interiority of second wives within South Asian domestic and social structures.",
    body: `Within many South Asian family structures, the second wife occupies a position that is legally recognised, socially complicated, and culturally silenced. She is present and absent simultaneously — written into law, but rarely written into memory.

This project began with a personal encounter — a family history that had been withheld and then, partially, returned. From that starting point, it has expanded into a research project engaging with other women in comparable positions, exploring the texture of a life lived in the shadow of a prior claim.

The work is not a critique of polygamy as a legal practice. It is an inquiry into interiority: what does it feel like to be the second? To arrive after? To exist in a domestic space where you are both welcomed and a complication? What do women in this position know that is not usually recorded?

Materials and form are still emerging. The process involves listening before making.`,
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
      "A work in development addressing mental health, stigma, and the language of care within South Asian communities.",
    body: `This work is in its earliest stages. What exists so far is a set of questions.

What language is available in South Asian communities for mental illness? What words exist in Urdu, in Punjabi, in the languages of the family, that name what someone is experiencing? What happens when those words are borrowed from elsewhere — from clinical English, from the vocabulary of diagnosis — and they do not quite fit?

What is the relationship between the stigma of mental illness and the broader structures of shame and honour that organise social life? Is mental illness understood as a private failure, a spiritual condition, a medical fact? Does the answer change depending on who is asking?

These are research questions, not yet art. But the art will come from living with them long enough.`,
    themes: ["Mental health", "Care", "Stigma", "Language"],
    medium: "TBD",
    placeholder: true,
  },
];

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      {/* Breadcrumb */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink/35 hover:text-ink transition-colors"
        >
          ← Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main content */}
        <div className="lg:col-span-8">
          <h1 className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] leading-tight tracking-tight text-ink mb-8">
            {project.title}
            {project.placeholder && (
              <span className="block font-sans text-sm tracking-widest text-ink/25 mt-2">
                — forthcoming
              </span>
            )}
          </h1>

          <div className="space-y-5 font-serif font-light text-lg leading-relaxed text-ink/70">
            {project.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 lg:col-start-10 space-y-8">
          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30 mb-3">
              Status
            </h2>
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
          </div>

          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30 mb-2">
              Year
            </h2>
            <p className="font-serif text-sm">{project.year}</p>
          </div>

          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30 mb-2">
              Medium
            </h2>
            <p className="font-serif text-sm">{project.medium}</p>
          </div>

          <div>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/30 mb-3">
              Themes
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.themes.map((t) => (
                <span
                  key={t}
                  className="font-sans text-[9px] tracking-[0.1em] uppercase text-ink/40 border border-dust px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
