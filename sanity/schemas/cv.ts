import { defineArrayMember, defineField, defineType } from "sanity";

const str = (name: string, title: string, required = false, description?: string) =>
  defineField({
    name,
    title,
    type: "string",
    description,
    validation: required ? (r) => r.required() : undefined,
  });

const lines = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [defineArrayMember({ type: "string" })],
  });

const section = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[],
  previewTitle: string,
  previewSubtitle?: string
) =>
  defineField({
    name,
    title,
    type: "array",
    description: "Click Add item to add a row. Drag rows to reorder.",
    of: [
      defineArrayMember({
        type: "object",
        fields,
        preview: {
          select: { title: previewTitle, subtitle: previewSubtitle ?? "" },
        },
      }),
    ],
  });

export const cvSchema = defineType({
  name: "cv",
  title: "CV",
  type: "document",
  description:
    "Your CV. Each section is a list you can add to, edit, delete and drag into order. You can also upload a PDF for visitors to download.",
  fields: [
    defineField({
      name: "pdf",
      title: "CV (PDF download)",
      type: "file",
      options: { accept: "application/pdf" },
      description:
        'Upload a PDF and a "Download PDF" link appears on the CV page. Uploading a new file replaces it. Remove it to hide the link.',
    }),
    section(
      "education",
      "Education",
      [
        str("degree", "Degree", true),
        str("institution", "Institution", true),
        str("location", "Location"),
        str("years", "Years", false, 'e.g. "2020–2023"'),
        defineField({ name: "distinction", title: "With Distinction", type: "boolean", initialValue: false }),
        str("gpa", "GPA (optional)"),
        lines("notes", "Notes", "One line per bullet."),
      ],
      "degree",
      "institution"
    ),
    section(
      "experience",
      "Experience",
      [
        str("title", "Job title", true),
        str("organisation", "Organisation", true),
        str("location", "Location"),
        str("period", "Period", false, 'e.g. "September 2025 – Present"'),
        lines("points", "Description bullets", "One line per bullet."),
      ],
      "title",
      "organisation"
    ),
    section(
      "exhibitions",
      "Exhibitions",
      [
        str("year", "Year", true),
        str("title", "Exhibition title", true),
        str("venue", "Venue"),
        str("location", "Location"),
      ],
      "title",
      "year"
    ),
    section(
      "residencies",
      "Residencies",
      [
        str("year", "Year", true),
        str("title", "Title", true),
        str("institution", "Institution"),
        str("location", "Location"),
      ],
      "title",
      "year"
    ),
    section(
      "awards",
      "Awards",
      [str("year", "Year", true), str("description", "Award", true)],
      "description",
      "year"
    ),
    section(
      "additionalCourses",
      "Additional Courses",
      [str("year", "Year", true), str("title", "Course", true), str("institution", "Institution")],
      "title",
      "year"
    ),
    section(
      "academicProjects",
      "Academic Projects",
      [
        str("year", "Year", true),
        str("title", "Title", true),
        defineField({ name: "url", title: "Link", type: "url" }),
      ],
      "title",
      "year"
    ),
    section(
      "internships",
      "Volunteer",
      [str("year", "Year", true), str("description", "Description", true)],
      "description",
      "year"
    ),
  ],
  preview: { prepare: () => ({ title: "CV" }) },
});
