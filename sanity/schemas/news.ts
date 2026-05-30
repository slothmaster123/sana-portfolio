import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "newsItem",
  title: "News",
  type: "document",
  description:
    "Your own updates — upcoming exhibitions, new work, announcements, residencies. Write these yourself.",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'e.g. "2025" or "March 2025" or "Spring 2025"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "A short, clear headline for the update.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Details (optional)",
      type: "text",
      rows: 4,
      description: "Add more context here if needed — dates, venues, links, etc.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
