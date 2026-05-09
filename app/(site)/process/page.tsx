import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Behind the work — research, materials, and making with Sana Iqbal Qutb.",
};

const processNotes = [
  {
    title: "Research-first",
    body: "Most works begin with research: archival material, interviews, field observation, reading. The artwork comes late — often the last thing, not the first. The research is the work.",
  },
  {
    title: "Materials as language",
    body: "I am drawn to materials that carry history in themselves — cloth, found objects, earth, photographs. A dupatta is not neutral. A printed image is not neutral. The choice of material is already an argument.",
  },
  {
    title: "Participation and collaboration",
    body: "Many works involve others in their making — community members, family, strangers who become collaborators. I am interested in what happens when a work is not made alone. Whose hands are in it? Whose voice?",
  },
  {
    title: "Technology as a question",
    body: "Augmented reality and AI enter the practice not as solutions, but as additional questions. What does this medium make visible that traditional forms cannot? What does it hide or flatten?",
  },
  {
    title: "The studio",
    body: "The studio is where thinking becomes physical. Notes become drawings, drawings become maquettes, maquettes become space. The process is iterative, and error is part of the method.",
  },
];

export default function Process() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
      <h1 className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-ink mb-6">
        Process
      </h1>
      <p className="font-serif font-light text-lg text-ink/50 mb-20 max-w-xl">
        Notes on how the work is made — research methods, material choices, and the
        conditions of practice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
        {processNotes.map((note, i) => (
          <div key={i}>
            <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-4">
              {String(i + 1).padStart(2, "0")}
            </h2>
            <h3 className="font-serif text-2xl mb-4">{note.title}</h3>
            <p className="font-serif font-light text-base leading-relaxed text-ink/65">
              {note.body}
            </p>
          </div>
        ))}
      </div>

      {/* Placeholder: studio images / documentation */}
      <div className="mt-24 border-t border-dust pt-16">
        <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink/35 mb-10">
          Documentation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-mist aspect-square" />
          ))}
        </div>
        <p className="font-sans text-[10px] text-ink/25 mt-4">
          Studio and process documentation — images forthcoming.
        </p>
      </div>
    </div>
  );
}
