import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "newsItem",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'e.g. "2025" or "March 2025"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Full text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
