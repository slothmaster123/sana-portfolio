import { defineField, defineType } from "sanity";

export const pressSchema = defineType({
  name: "pressItem",
  title: "Press",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication / Organisation",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Link (if online)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publication" },
  },
});
