import type { Metadata } from "next";
import { cvData } from "@/lib/data";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Sana Iqbal Qutb — exhibitions, education, experience, awards.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-t border-dust">
      <div className="md:col-span-3">
        <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 sticky top-20">
          {title}
        </h2>
      </div>
      <div className="md:col-span-9 space-y-8">{children}</div>
    </section>
  );
}

export default function CV() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink">
          CV
        </h1>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mt-4">
          Sana Iqbal Qutb · Lahore, Pakistan
        </p>
      </div>

      {/* Education */}
      <Section title="Education">
        {cvData.education.map((edu, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-serif text-lg">
                {edu.degree}
                {edu.distinction && (
                  <span className="font-sans text-[9px] tracking-wider uppercase text-ink/40 ml-2">
                    Distinction
                  </span>
                )}
              </h3>
              <span className="font-sans text-[10px] tracking-wider text-ink/35">
                {edu.years}
              </span>
            </div>
            <p className="font-serif text-sm text-ink/70">
              {edu.institution}, {edu.location}
            </p>
            {edu.gpa && (
              <p className="font-sans text-[10px] text-ink/35 mt-1">
                GPA: {edu.gpa}
              </p>
            )}
            {edu.notes && (
              <ul className="mt-3 space-y-1">
                {edu.notes.map((note, j) => (
                  <li key={j} className="font-sans text-xs text-ink/50 flex gap-2">
                    <span>—</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {cvData.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 className="font-serif text-lg">{exp.title}</h3>
              <span className="font-sans text-[10px] tracking-wider text-ink/35 shrink-0">
                {exp.period}
              </span>
            </div>
            <p className="font-serif text-sm text-ink/60">
              {exp.organisation}, {exp.location}
            </p>
            {exp.points && (
              <ul className="mt-3 space-y-1">
                {exp.points.map((pt, j) => (
                  <li key={j} className="font-sans text-xs text-ink/50 flex gap-2">
                    <span>—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* Exhibitions */}
      <Section title="Exhibitions">
        <div className="space-y-0">
          {cvData.exhibitions.map((ex, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 py-3 border-b border-dust last:border-0"
            >
              <span className="col-span-2 font-sans text-[10px] tracking-wider text-ink/35">
                {ex.year}
              </span>
              <div className="col-span-10">
                <p className="font-serif text-sm">
                  <em>{ex.title}</em>
                </p>
                <p className="font-sans text-[10px] text-ink/40 mt-0.5">
                  {ex.venue}, {ex.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Residencies */}
      <Section title="Residencies">
        {cvData.residencies.map((res, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-base">{res.title}</h3>
              <span className="font-sans text-[10px] tracking-wider text-ink/35">
                {res.year}
              </span>
            </div>
            <p className="font-sans text-xs text-ink/40 mt-1">
              {res.institution}, {res.location}
            </p>
          </div>
        ))}
      </Section>

      {/* Awards */}
      <Section title="Awards">
        <div className="space-y-0">
          {cvData.awards.map((award, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 py-3 border-b border-dust last:border-0"
            >
              <span className="col-span-2 font-sans text-[10px] tracking-wider text-ink/35">
                {award.year}
              </span>
              <p className="col-span-10 font-serif text-sm">{award.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Courses */}
      <Section title="Additional Courses">
        {cvData.additionalCourses.map((course, i) => (
          <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-serif text-sm">{course.title}</p>
              {course.institution && (
                <p className="font-sans text-[10px] text-ink/35 mt-0.5">
                  {course.institution}
                </p>
              )}
            </div>
            <span className="font-sans text-[10px] tracking-wider text-ink/35 shrink-0">
              {course.year}
            </span>
          </div>
        ))}
      </Section>

      {/* Academic Projects */}
      <Section title="Academic Projects">
        {cvData.academicProjects.map((proj, i) => (
          <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-serif text-sm">{proj.title}</p>
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] text-ink/35 hover:text-ink transition-colors mt-0.5 block"
                >
                  {proj.url.replace("https://", "").replace(/\/$/, "")}
                </a>
              )}
            </div>
            <span className="font-sans text-[10px] tracking-wider text-ink/35 shrink-0">
              {proj.year}
            </span>
          </div>
        ))}
      </Section>

      {/* Internships / Volunteer */}
      <Section title="Volunteer">
        {cvData.internships.map((item, i) => (
          <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-serif text-sm">{item.description}</p>
            <span className="font-sans text-[10px] tracking-wider text-ink/35 shrink-0">
              {item.year}
            </span>
          </div>
        ))}
      </Section>
    </div>
  );
}
