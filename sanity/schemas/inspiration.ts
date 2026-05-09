import { defineField, defineType } from "sanity";

export const inspirationSchema = defineType({
  name: "inspiration",
  title: "Inspiration / Journal",
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
      name: "date",
      title: "Date",
      type: "string",
      description: 'e.g. "2025" or "March 2025"',
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Write freely — quotes, readings, reflections.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
