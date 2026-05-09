import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "Ongoing" },
          { title: "In development", value: "In development" },
          { title: "Complete", value: "Complete" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2024" or "2024 —" for ongoing',
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "One or two sentences for the projects list.",
    }),
    defineField({
      name: "body",
      title: "Full text",
      type: "array",
      of: [{ type: "block" }],
      description: "The full project description shown on the individual project page.",
    }),
    defineField({
      name: "themes",
      title: "Themes / keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "External URL (if any)",
      type: "url",
    }),
    defineField({
      name: "placeholder",
      title: "Mark as forthcoming",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage" },
  },
});
