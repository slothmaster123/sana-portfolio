import { defineField, defineType } from "sanity";

export const pressSchema = defineType({
  name: "pressItem",
  title: "Press",
  type: "document",
  description:
    "Coverage from outside sources — newspaper articles, magazine features, reviews, catalogue essays, or any mention of your work by someone else.",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Article / Feature Title",
      type: "string",
      description: "The title of the article or piece that mentions your work.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication or Source",
      type: "string",
      description: 'e.g. "Dawn", "Art Forum", "BBC Urdu", "The Guardian"',
    }),
    defineField({
      name: "location",
      title: "Country / Region (optional)",
      type: "string",
      description: 'e.g. "Pakistan", "UK", "Japan"',
    }),
    defineField({
      name: "url",
      title: "Link to article (if online)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publication" },
  },
});
